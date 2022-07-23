import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FAQComponent } from '../faq/faq.component';

import { IndexComponent } from './index/index.component';



const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full'},
  { path: '', component: IndexComponent },
  { path: 'FAQ', component: FAQComponent },
  { path: '**', component: IndexComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
