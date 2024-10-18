import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FinanzasViewComponent} from './finanzas-view/finanzas-view.component'
import {finanzasRoutingModule} from './finanzas-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import { ChatComponent } from './components/chat/chat.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SankeyComponent} from './components/sankey/sankey.component';
import { ChartsComponent } from '../charts/charts.component';
import { CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
@NgModule({
  declarations: [FinanzasViewComponent,ChatComponent,SankeyComponent],
  imports: [
    CommonModule,
    finanzasRoutingModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    CardModule,
    GridModule,
    ChartjsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon
  ]
})
export class FinanzasModule { }
