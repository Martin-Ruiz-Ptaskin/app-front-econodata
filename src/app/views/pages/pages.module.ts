import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { MatTableModule } from '@angular/material/table';

import { SimpleTableComponent } from './simple-table/simple-table.component';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,

    SimpleTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    DocsComponentsModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule
  ],
  exports:[

  SimpleTableComponent],
})
export class PagesModule {
}
