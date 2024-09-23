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
@NgModule({
  declarations: [FoundsComponent],
  imports: [
    CommonModule,

    RouterModule,
    FoundsRoutingModule,
    FoundsListComponent,
    ChartsModule,
    PagesModule,RowComponent,ColComponent, WidgetStatFComponent, TemplateIdDirective,IconDirective,CommonModule

  ]
})
export class FoundsModule { }
