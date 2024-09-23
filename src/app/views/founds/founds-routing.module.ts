import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {FoundsComponent} from './founds/founds.component'
import {FoundsListComponent} from './founds-list/founds-list.component'
const routes: Routes = [
  {
    path: 'founds-view/:name',
    component: FoundsComponent,
    data: {
      title: `Found view`
    }
  },
  {
    path: 'founds-list',
    component: FoundsListComponent,
    data: {
      title: `que nececito`
    }
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundsRoutingModule {
}
