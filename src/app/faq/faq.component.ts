import { FAQ, Icategories, ICategoriesViewModel, IFAQViewModel } from '../models/Category';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Categories} from '../models/Category';
import { MatDialog } from '@angular/material/dialog';
import { CreateFAQComponent } from '../faq/create-faq/create-faq.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditFAQComponent } from '../faq/edit-faq/edit-faq.component';
import { HttpClient } from '@angular/common/http';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FAQComponent implements OnInit {

  panelOpenState = false;
  categories: Categories[] = [];
  faqs: FAQ[] = [];
  expandedIndex = 0;
  selectedCategoryId = 0;

  constructor(
    public postService: PostService,
     public dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private cdRef: ChangeDetectorRef,
      private httpClient: HttpClient
      ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {

    this.getAllCategories();

  }

  onCatgoryChaneged(event:MatSelectChange): void {
    console.log('e', event.value);
    if (event.value) {
      this.postService.getAllFAQ(event.value).subscribe(res =>{
        console.log('res', res);
        this.faqs = res.data;
      })
    }
  }

  private getAllCategories(): void {
    this.postService.getAll().subscribe((result: ICategoriesViewModel) => {
      if (result.statusCode == 200) {
        this.categories = result.data;
      }
    })
  }


  create(): void {
    this.dialog.open(CreateFAQComponent, {width: '700px', data: {}}).afterClosed().subscribe((res: {fireRefresh: boolean}) => {
      if (res && res.fireRefresh) {
        this.getAllCategories();
      }
    });
  }



  updateData(category: Categories): void {
    this.dialog.open(EditFAQComponent, {width: '700px', data: category}).afterClosed().subscribe((res: {fireRefresh: boolean}) => {
      if (res && res.fireRefresh) {
        this.getAllCategories();
      }
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deletePost(faqId:number){
    this.postService.deleteFAQ(faqId).subscribe(res => {
         this.faqs = this.faqs.filter(item => item.id !== faqId);
         console.log('Post deleted successfully!');
    })
  }

  drop(event: CdkDragDrop<Categories[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


}
