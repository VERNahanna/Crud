import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories} from 'src/app/models/Category';
import { PostService } from 'src/app/services/post.service';




interface IMangePost {
id:number
}

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  form!: FormGroup;


  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categories,
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


  submit(): void {
    if (this.form.valid) {

      this.postService.update({...this.data, name: this.form.value.name}).subscribe(res => {
        if (res) {

          this.close(true)
        }

        // console.log('res', res);
      });
    }
  }

  private initFormModel(): void {
    this.form = this.fromBuilder.group({
      name: ['', Validators.required]
    });
  }

  private patchFromValue(): void {
    if (this.data && this.data != null) {
      this.form.patchValue({
        name: this.data.name
      });
    }
  }

}
