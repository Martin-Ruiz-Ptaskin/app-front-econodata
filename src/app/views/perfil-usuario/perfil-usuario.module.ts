import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import {perfilUsuariosRoutingModule} from  './perfil-rounting.module'



import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PagesModule } from '../pages/pages.module';
import { ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import {FinanzasModule} from '../finanzas/finanzas.module'
import { CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';


@NgModule({
  declarations: [PerfilComponent],
  imports: [
    ChartjsModule,
    CommonModule,
    FinanzasModule,
        MatTooltipModule,
        MatInputModule,
        FormsModule,
        perfilUsuariosRoutingModule,
        PagesModule,
        CardModule,
        GridModule,
        MatFormFieldModule,
        MatStepperModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatIcon,
        ColComponent,IconDirective,
        RowComponent, TemplateIdDirective, WidgetStatFComponent,PagesModule

  ]
})
export class PerfilUsuarioModule { }
