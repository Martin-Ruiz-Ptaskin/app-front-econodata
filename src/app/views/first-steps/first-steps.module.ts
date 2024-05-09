import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import{QueNecesitoComponent} from './que-necesito/que-necesito.component'
import {RiskComponent} from './risk/risk.component'
import {ObjetivosComponent} from './objetivos/objetivos.component'
import {InflacionComponent} from './inflacion/inflacion.component'
import {HorizonteComponent} from './horizonte/horizonte.component'


import{FirstStepdRoutingModule} from './first-steps-routing.module'
@NgModule({
  declarations: [QueNecesitoComponent],
  imports: [
    FirstStepdRoutingModule,
    RiskComponent,
    ObjetivosComponent,
    InflacionComponent,
    HorizonteComponent,
    CommonModule,

  ]
})
export class FirstStepsModule { }
