import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { IndexComponent } from './index/index.component';

import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { ControlsModule } from '../core/controls/controls.module';
import {MatIconModule} from '@angular/material/icon';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FAQComponent } from '../faq/faq.component';
import { CreateFAQComponent } from '../faq/create-faq/create-faq.component';
import { EditFAQComponent } from '../faq/edit-faq/edit-faq.component';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [
    IndexComponent,
    ManagePostComponent,
     EditCategoryComponent,
     FAQComponent,
     CreateFAQComponent,
     EditFAQComponent,
    ],
  imports: [
    CdkAccordionModule,
    DragDropModule,
    MatIconModule,
    MatExpansionModule,
    CommonModule,
    CategoryRoutingModule,

    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ControlsModule,
    MatTableModule
  ]
})
export class CategoryModule { }
