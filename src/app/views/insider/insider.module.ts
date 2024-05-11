import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {InsiderComponent} from './insider/insider.component'
import {InsiderListComponent} from './insider-list/insider-list.component'
import { TableModule } from '@coreui/angular';
import { InsiderRoutingModule } from './insider-routing.module';
import { PagesModule } from '../pages/pages.module';
import { SimpleTableComponent } from '../pages/simple-table/simple-table.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    InsiderComponent,
    InsiderListComponent,
    InsiderRoutingModule,



  ]
})
export class InsiderModule { }
