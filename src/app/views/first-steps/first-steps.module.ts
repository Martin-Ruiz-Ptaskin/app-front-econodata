import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import{QueNecesitoComponent} from './que-necesito/que-necesito.component'
import{FirstStepdRoutingModule} from './first-steps-routing.module'
@NgModule({
  declarations: [QueNecesitoComponent],
  imports: [
    FirstStepdRoutingModule,
    CommonModule,

  ]
})
export class FirstStepsModule { }
