import { Component, Input,OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {  cilArrowLeft    } from '@coreui/icons';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']

})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";
  public routerSubscription: Subscription | null = null;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  showBackButton: boolean = true;
  icons = { cilArrowLeft };

  constructor(private classToggler: ClassToggleService,private location: Location,   private router: Router
  ) {
    super();


  }

  ngOnInit(): void {
    // Verificar si la ruta actual es '/'
    this.showBackButton = this.router.url !== '/dashboard';

    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verificar si la ruta actual es '/'
        console.log(event.url)
        this.showBackButton = event.url !== '/dashboard';
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
