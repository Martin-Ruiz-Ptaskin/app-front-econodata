import { NgModule } from '@angular/core';
import {  LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesModule } from './views/pages/pages.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { HttpClientModule } from '@angular/common/http';
import {MatTooltipModule} from '@angular/material/tooltip';
import { OAuthModule } from 'angular-oauth2-oidc';

// Import routing module
import { AppRoutingModule } from './app-routing.module';
import {MatButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
// Import app component
import { AppComponent } from './app.component';
import { MatDialogModule } from '@angular/material/dialog';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';
import { PruebaComponent } from './views/common/prueba/prueba.component';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,

  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,

  UtilitiesModule
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';

import { MatIcon } from '@angular/material/icon';
import { HeaderService } from './containers/default-layout/services/header.service';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatMenuModule} from '@angular/material/menu';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    AvatarModule,
    BreadcrumbModule,
    OAuthModule.forRoot(),
    MatDialogModule,
    FooterModule,
    HttpClientModule,
    MatTooltipModule,
    FormsModule,
    DropdownModule,
    MatButton,
    MatButtonModule,
    MatTooltip,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    MatIcon,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule,
    PagesModule,
    PruebaComponent
  ],
  providers: [

    IconSetService,
    Title,
    HeaderService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
