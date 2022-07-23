import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categories, ICategoriesViewModel, IFAQViewModel } from 'src/app/models/Category';
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
    @Inject(MAT_DIALOG_DATA) public data: IMangePost) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.form = new FormGroup({
       categoryId: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      answer: new FormControl('', [Validators.required]),

    });
  }

  onNoClick() {
    this.dialogRef.close();
  }



  createPost() {
    if (this.form.valid) {
      this.postService.createFAQ(this.form.value).subscribe(res=>{
        console.log('res', res);
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
