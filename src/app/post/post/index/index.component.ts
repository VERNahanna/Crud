import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post';
import { MatDialog } from '@angular/material/dialog';
import { ManagePostComponent } from '../../manage-post/manage-post.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  posts: Post[] = [];


  constructor(public postService: PostService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[])=>{
      this.posts = data;
      console.log(this.posts);
    })
  }
  create(){
    this.dialog.open(ManagePostComponent, {width: '700px', data: {}}).afterClosed().subscribe(res => {
      if (res) {
        this.postService.create(res).subscribe(result => {
           this.posts.push(result);
         // this.posts = [result, ...this.posts];
          this._snackBar.open("Post has been added Successfully.",'Undo',{
            duration: 1200
          });

        })
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
         this.posts = this.posts.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
    })
  }

}
