import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {InsiderComponent} from './insider/insider.component'
import {InsiderListComponent} from './insider-list/insider-list.component'
import {TickerComponent} from './ticker/ticker.component'
const routes: Routes = [
  {
    path: 'insiderTrack/name:',
    component: InsiderComponent,
    data: {
      title: `Insider`
    }
  },
  {
    path: 'ticket/:ticker',
    component: TickerComponent,
    data: {
      title: `ticket`
    }
  },
  {
    path: 'insider-list',
    component: InsiderListComponent,
    data: {
      title: `InsiderList`
    }
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsiderRoutingModule {
}
