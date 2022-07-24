import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categories, ICategoriesViewModel } from 'src/app/models/Category';
import { PostService } from 'src/app/services/post.service';

interface IMangePost {

}

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.scss']
})
export class CreateFAQComponent implements OnInit {

  categories: Categories[] = [];

  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateFAQComponent>,
    public postService: PostService,
    private _snackBar: MatSnackBar,
    private fromBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IMangePost) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.initFormModel();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  private initFormModel(): void {
    this.form = this.fromBuilder.group({
      categoryId: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
    });
  }
  close(isUpdated: boolean): void {
    this.dialogRef.close({fireRefresh: isUpdated});
  }


  createPost() {
    if (this.form.valid) {
      this.postService.createFAQ(this.form.value).subscribe(res=>{
        console.log('res', res);
        if (res) {

          this.close(true)
          this._snackBar.open("Category has been added Successfully.",'',{
            duration: 1000
          });
        }
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

}
