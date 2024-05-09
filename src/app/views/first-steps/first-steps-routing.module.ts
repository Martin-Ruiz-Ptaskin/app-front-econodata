import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{QueNecesitoComponent} from './que-necesito/que-necesito.component'
const routes: Routes = [
  {
    path: '',
    component: QueNecesitoComponent,
    data: {
      title: `initialStep`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstStepdRoutingModule {
}
