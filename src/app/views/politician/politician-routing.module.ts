import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {PoliticianComponent} from './politician/politician.component'
import {PoliticianListComponent} from './politician-list/politician-list.component'
const routes: Routes = [
  {
    path: 'politicianTrack/name:',
    component: PoliticianComponent,
    data: {
      title: `politician`
    }
  },
  {
    path: 'politician-list',
    component: PoliticianListComponent,
    data: {
      title: `PoliticianList`
    }
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class politicianRoutingModule {
}
