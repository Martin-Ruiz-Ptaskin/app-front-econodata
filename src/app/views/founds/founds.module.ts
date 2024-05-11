import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {FoundsComponent} from './founds/founds.component'
import {FoundsListComponent} from './founds-list/founds-list.component'
import { FoundsRoutingModule } from './founds-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FoundsComponent,
    RouterModule,
    FoundsRoutingModule,
    FoundsListComponent,

  ]
})
export class FoundsModule { }
