import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IMangePost {

}

@Component({
  selector: 'app-manage-post',
  templateUrl: './manage-post.component.html',
  styleUrls: ['./manage-post.component.scss']
})
export class ManagePostComponent implements OnInit {

  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ManagePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMangePost) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      // lobSpaceTypeId: new FormControl('1'),
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  createPost() {

  }

  submit() {
    if (this.form.valid) {

    }
  }

}
