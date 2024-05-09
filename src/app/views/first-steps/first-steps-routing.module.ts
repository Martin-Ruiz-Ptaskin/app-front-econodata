import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import{QueNecesitoComponent} from './que-necesito/que-necesito.component'
import {RiskComponent} from './risk/risk.component'
import {ObjetivosComponent} from './objetivos/objetivos.component'
import {InflacionComponent} from './inflacion/inflacion.component'
import {HorizonteComponent} from './horizonte/horizonte.component'
const routes: Routes = [
  {
    path: 'QueNecesito',
    component: QueNecesitoComponent,
    data: {
      title: `que nececito`
    }
  },
  {
    path: 'riesgo-retorno',
    component: RiskComponent,
    data: {
      title: `riesgo-retorno`
    }
  },
  {
    path: 'horizonte',
    component: HorizonteComponent,
    data: {
      title: `horizonte`
    }
  },
  {
    path: 'objetivos',
    component: ObjetivosComponent,
    data: {
      title: `objetivos`
    }
  },
  {
    path: 'inflacion-tasas',
    component: InflacionComponent,
    data: {
      title: `inflacion-tasas`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstStepdRoutingModule {
}
