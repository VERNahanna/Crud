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
 // @Input('data') data:any
  form!: FormGroup;
  // id!: number;
  // category!: Categories;

  constructor(public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categories,
    private fromBuilder: FormBuilder,
    public postService: PostService,
   ) { }

  ngOnInit(): void {
    this.initFormModel();
    this.patchFromValue();
// console.log('TaDDDDDDDDDDDD',this.data)
//     this.postService.find(this.data.id).subscribe((data: any)=>{
//       console.log('CatTest',data)
//       this.category = data;
//         this.form = new FormGroup({
//         name: new FormControl(data.data.name, [Validators.required]),
//         lobSpaceTypeId: new FormControl('1'),


//       });

//     });

  }

  close(isUpdated: boolean): void {
    this.dialogRef.close({fireRefresh: isUpdated});
  }

  editCategory() {


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
