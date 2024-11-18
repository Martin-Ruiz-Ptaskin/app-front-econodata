import { Component, Input,OnInit,HostListener,ChangeDetectionStrategy,OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {  cilArrowLeft    } from '@coreui/icons';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/views/common/services/login.service';
import { HeaderService } from '../services/header.service';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,


})

export class DefaultHeaderComponent extends HeaderComponent implements OnInit,OnDestroy {

  @Input() sidebarId: string = "sidebar";
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public listaBarra:Array<any>=[];
  sinResultados:boolean=false
  searchTerm: string = ''
  icons = { cilArrowLeft };
  user:string=""
  inputFocused:boolean=false
  verMenu:boolean=true
  color:string="red"
  logintime:number=1
   truncateTo8 = (value: string): string => value.length > 8 ? value.slice(0, 8) : value;

  constructor(public dialog: MatDialog,private classToggler: ClassToggleService,private location: Location,   private router: Router,private login:LoginService,private headerService :HeaderService ) {

    super();

    this.validarCredenciales()


  }
  //@HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    // Verificar si la ruta actual es '/'
    console.log('Header Component Initialized');

    setTimeout(() => {
      this.login.validarLoginGoogle()

    }, 1000);

    setTimeout(() => {
      this.login.openDialogLogin(false)
      this.logintime+1
    }, 4000 *this.logintime);

    this.login.userName$. subscribe(value => {
      if(value){      this.color="green"
      }
      else{
        this.color="red"
      }
      this.user =this.truncateTo8(value) ;
    });

  }

  ngOnDestroy(): void {
    console.log('Header Destroyed');
  }
  openDialog(){


    this.login.openDialogLogin(false)



  }

  obtnerRuta (item:any):string{
    let path:string="";
    switch (item.tipo) {
      case "Activo":
        path = "insider/ticket/" + item.dato;
        break;
      case "Fondo de inversión":
        path = "founds/founds-view/" + item.dato;
        break;
      default:
        path = "";
        break;
    }
return path
  }
  cerrarSesion(){
    this.login.logout()
  }

  verSesion(){
    this.login.getProfile()
  }
  onInputChange(value: string): void {

    this.headerService.getBarraBusqueda(value).subscribe((resp: any) => {
      this.listaBarra = resp.data.filter((item: any) => item.tipo !== "insider" && item.tipo !== "politician")


      .map((item: any) => {
        if (item.tipo === "fund") {
          item.tipo = "Fondo de inversión"; // Usar "=" en lugar de "=="
        } else if (item.tipo === "activo") {
          item.tipo = "Activo"; // Aquí también corregido
        }
/*
        else if (item.tipo === "politician") {
          item.tipo = "Político";
        } else if (item.tipo === "insider") {
          item.tipo = "Insider";
        }
        */
        return item; // Retornar el objeto modificado
      });

      this.sinResultados = resp.data.length === 0; // Simplificado
    });
  }


  onFocus() {
    this.inputFocused = true;
    if(window.innerWidth<500){
      this.verMenu=false
    }
  }

  onBlur() {

    setTimeout(() => {
      this.inputFocused = false;
      this.verMenu=true
    }, 100);  // Espera un poco para no ocultar inmediatamente al hacer clic en una sugerencia
  }
  validarCredenciales(){
    this.login.getCredentialsFromLocalStorage()

  }
}
