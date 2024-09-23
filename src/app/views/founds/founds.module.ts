import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {FoundsComponent} from './founds/founds.component'
import {FoundsListComponent} from './founds-list/founds-list.component'
import { FoundsRoutingModule } from './founds-routing.module';
import { PagesModule } from '../pages/pages.module';
import { IconDirective } from '@coreui/icons-angular';
import { cilCash, cilUser , cilClipboard} from '@coreui/icons';
import { ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent } from '@coreui/angular';
import { ChartsModule } from '../charts/charts.module';

import { ChartsComponent } from '../charts/charts.component';
import { CardModule, GridModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
@NgModule({
  declarations: [FoundsComponent],
  imports: [
    CommonModule,
    ChartsModule,

    RouterModule,
    FoundsRoutingModule,
    FoundsListComponent,
    ChartsModule,
    PagesModule,RowComponent,ColComponent, WidgetStatFComponent, TemplateIdDirective,IconDirective,CommonModule,
     // Importa los módulos de CoreUI necesarios
     CardModule,
     GridModule,
     ChartjsModule,
     RowComponent,
     ColComponent,
     WidgetStatFComponent

  ]
})
export class FoundsModule { }
