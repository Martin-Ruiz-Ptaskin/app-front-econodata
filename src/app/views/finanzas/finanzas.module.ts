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
@NgModule({
  declarations: [FinanzasViewComponent,ChatComponent],
  imports: [
    CommonModule,
    finanzasRoutingModule,
    MatTooltipModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon
  ]
})
export class FinanzasModule { }
