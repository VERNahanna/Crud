import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { IndexComponent } from '../post/post/index/index.component';
import { ViewComponent } from '../post/post/view/view.component';

import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { ControlsModule } from '../core/controls/controls.module';

@NgModule({
  declarations: [IndexComponent, ViewComponent, ManagePostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    MatTableModule
  ]
})
export class PostModule { }
