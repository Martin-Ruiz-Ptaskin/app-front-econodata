import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FinanzasViewComponent} from './finanzas-view/finanzas-view.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cargaDeDatos',
    component: FinanzasViewComponent,
    data: {
      title: `cargaDeDAtos`
    }
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class finanzasRoutingModule {


}

