import { ICategoriesViewModel } from '../../models/Category';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Categories} from '../../models/Category';
import { MatDialog } from '@angular/material/dialog';
import { ManagePostComponent } from '../manage-post/manage-post.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  panelOpenState = false;
  categories: Categories[] = [];

  expandedIndex = 0;
  constructor(
    public postService: PostService,
     public dialog: MatDialog,
      private _snackBar: MatSnackBar,
      private cdRef: ChangeDetectorRef
      ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {

    this.getAllCategories();

  }

  private getAllCategories(): void {
    this.postService.getAll().subscribe((result: ICategoriesViewModel) => {
      if (result.statusCode == 200) {
        this.categories = result.data;
      }
    })
  }


  create(): void {
    this.dialog.open(ManagePostComponent, {width: '700px', data: {}}).afterClosed().subscribe(res => {
      if (res) {
        this.postService.create(res).subscribe(result => {
          this.categories.push(result.data);
          //this.posts = [result, ...this.posts];
          this.cdRef.detectChanges();
          this._snackBar.open("Category has been added Successfully.",'',{
            duration: 1000
          });

        })
      }
    });
  }

  updateData(category: Categories): void {
    this.dialog.open(EditCategoryComponent, {width: '700px', data: category}).afterClosed().subscribe((res: {fireRefresh: boolean}) => {
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
  deletePost(id:number){
    this.postService.delete(id).subscribe(res => {
         this.categories = this.categories.filter(item => item.id !== id);
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
