import { Injectable } from '@angular/core';
import {LoginComponent} from '../../pages/login/login.component'
import { MatDialog } from '@angular/material/dialog';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError,of  } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ErrorHttpsService} from '../../common/services/error-https.service';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl+"user/"; // Usa la URL del environment
  isLogedIn:boolean=false
  role:any
  constructor(public dialog: MatDialog,private http: HttpClient,private error:ErrorHttpsService) {}

  enviarMensaje(){
    console.log("llego")
  }
  getLogedIn() :Observable<boolean>{
    return of(this.isLogedIn)
  }
  getRole(){
    return this.role
  }

  SignIn(email: string, pass: string): Observable<any> {
    const requesUrl = this.apiUrl + "login.php";
    const body = { email, pass }; // Datos de inicio de sesión
    console.log(requesUrl)

    return this.http.post<any>(requesUrl, body).pipe(
      map(response => {
        // Verificar si el valor "ok" es true
        if ( response.status!=200) {
          this.error.openSnackBar( response.message ,"ok");
          throw new HttpErrorResponse({ status: 400, statusText: response.message });
        }
        else{
          this.role="user"
          this.isLogedIn=true
        }
        // Si ok es true, devolvemos la respuesta con el rol del usuario
        return response;
      }),
      catchError(error => {
        this.error.error();
        return throwError(() => error);
      })
    );
  }
  Registraese(email: string, pass: string): Observable<any> {
    const requesUrl = this.apiUrl + "registro.php";
    const body = { email, pass }; // Datos de registro
    console.log(requesUrl)
    return this.http.post<any>(requesUrl, body).pipe(
      map(response => {
        // Verificar si el valor "ok" es true
        if ( response.status!=200) {
          this.error.openSnackBar( response.message ,"ok");
        }
        else{
          this.role="user"
          this.isLogedIn=true
        }
        // Si ok es true, devolvemos la respuesta con el mensaje de éxito
        return response;
      }),
      catchError(error => {
        this.error.error();
        return throwError(() => error);
      })
    );
  }

  openDialogLogin() {
    this.dialog.open(LoginComponent, {
maxWidth:'800px',
      data: { /* puedes pasar datos aquí */ }
    });
  }

  closeDialog(){
    this.dialog.closeAll()
  }
}
