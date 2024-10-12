import { Component, Input,OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {  cilArrowLeft    } from '@coreui/icons';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/views/pages/login/login.component';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']

})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  icons = { cilArrowLeft };

  constructor(public dialog: MatDialog,private classToggler: ClassToggleService,private location: Location,   private router: Router
  ) {
    super();


  }

  ngOnInit(): void {
    // Verificar si la ruta actual es '/'

  }



}
