import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories, FAQ } from 'src/app/models/Category';
import { PostService } from 'src/app/services/post.service';




interface IMangePost {
id:number
}

@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.scss']
})
export class EditFAQComponent implements OnInit {

  form!: FormGroup;
  categories: Categories[] = [];
  faqs: FAQ[] = [];

  constructor(public dialogRef: MatDialogRef<EditFAQComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FAQ,
    private fromBuilder: FormBuilder,
    public postService: PostService,
   ) { }

  ngOnInit(): void {
    this.initFormModel();
    this.patchFromValue();


  }

  close(isUpdated: boolean): void {
    this.dialogRef.close({fireRefresh: isUpdated});
  }

  // onNoClick() {
  //   this.dialogRef.close();
  // }

  updateCat(): void {
    if (this.form.valid) {

      this.postService.updateFAQ({...this.data,
        categoryId: this.form.value.categoryId,
        question:this.form.value.question,
        answer:this.form.value.answer,
      }).subscribe(res => {
        if (res) {

          this.close(true)
        }

        // console.log('res', res);
      });
    }
  }

  private initFormModel(): void {
    this.form = this.fromBuilder.group({
      categoryId: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),
    });
  }

  private patchFromValue(): void {
    if (this.data && this.data != null) {
      this.form.patchValue({
        categoryId: this.data.categoryId,
        question:this.data.question,
        answer:this.data.answer,

      });
    }
  }

}
