import { Injectable } from '@angular/core';
import {LoginComponent} from '../../pages/login/login.component'
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public dialog: MatDialog) {}

  enviarMensaje(){
    console.log("llego")
  }
  openDialog() {
    this.dialog.open(LoginComponent, {
width:'auto',
      data: { /* puedes pasar datos aquí */ }
    });
  }
}
