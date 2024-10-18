import { Component, Input,OnInit } from '@angular/core';
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
  styleUrls: ['./default-header.component.scss']

})

export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

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
   truncateTo8 = (value: string): string => value.length > 8 ? value.slice(0, 8) : value;

  constructor(public dialog: MatDialog,private classToggler: ClassToggleService,private location: Location,   private router: Router,private login:LoginService,private headerService :HeaderService ) {
    login.userName$. subscribe(value => {

      this.user =this.truncateTo8(value) ;
      console.log('El valor de la variable ha cambiado:', value);
    });
    super();

    this.validarCredenciales()
    this.login.validarLoginGoogle()

  }

  ngOnInit(): void {
    // Verificar si la ruta actual es '/'


  }
  openDialog(){

    this.login.openDialogLogin(true)



  }
  cerrarSesion(){
    this.login.logout()
  }

  verSesion(){
    this.login.getProfile()
  }
  onInputChange(value: string): void {

    this.headerService.getBarraBusqueda(value).subscribe((resp: any) => {
      this.listaBarra = resp.data.map((item: any) => {
        if (item.tipo === "fund") {
          item.tipo = "Fondo de inversión"; // Usar "=" en lugar de "=="
        } else if (item.tipo === "politician") {
          item.tipo = "Político";
        } else if (item.tipo === "insider") {
          item.tipo = "Insider";
        } else if (item.tipo === "activo") {
          item.tipo = "Activo"; // Aquí también corregido
        }
        return item; // Retornar el objeto modificado
      });

      this.sinResultados = resp.data.length === 0; // Simplificado
    });
  }


  onFocus() {
    this.inputFocused = true;
  }

  onBlur() {
    setTimeout(() => {
      this.inputFocused = false;
    }, 100);  // Espera un poco para no ocultar inmediatamente al hacer clic en una sugerencia
  }
  validarCredenciales(){
    this.login.getCredentialsFromLocalStorage()

  }
}
