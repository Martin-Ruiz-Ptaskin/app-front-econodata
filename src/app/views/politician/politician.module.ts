import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import {PoliticianComponent} from './politician/politician.component'
import {PoliticianListComponent} from './politician-list/politician-list.component'
import { politicianRoutingModule } from './politician-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PoliticianComponent,
    PoliticianListComponent,
    politicianRoutingModule
  ]
})
export class PoliticianModule { }
