import { Injectable } from '@angular/core';
import {LoginComponent} from '../../pages/login/login.component'
import { MatDialog } from '@angular/material/dialog';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError,of ,BehaviorSubject  } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ErrorHttpsService} from '../../common/services/error-https.service';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl+"user/"; // Usa la URL del environment
  isLogedIn:boolean=false
  private myVariableSubject = new BehaviorSubject<string>(''); // Creamos un BehaviorSubject
  userName$ = this.myVariableSubject.asObservable(); // Creamos un observable a partir del BehaviorSubject
  role:any
  constructor(public dialog: MatDialog,private http: HttpClient,private error:ErrorHttpsService) {}
  idUser:any;
  enviarMensaje(){
    console.log("llego")
  }
  getLogedIn() :Observable<boolean>{
    return of(this.isLogedIn)
  }
  getRole(){
    return this.role
  }
  getId(){
    return this.idUser
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
          this.myVariableSubject.next(email)
          this.isLogedIn=true
          this.closeDialog()
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
          this.myVariableSubject.next(email)
          this.closeDialog()
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


  obtenerLoginPorSession(): Observable<any> {
    console.log("se llama");
    const requestUrl = this.apiUrl + "obtenerVariablesSession.php";
    console.log(requestUrl);
    return this.http.get<any>(requestUrl).pipe(
      map(response => {
        // Verificar la respuesta
        console.log(response);
        if (response.status !== 200) {
          // Mostrar un error si el status no es 200
          this.error.openSnackBar(response.message, "ok");
        } else {
          // Asignar valores si el login fue exitoso
          this.role = "user";
          this.isLogedIn = true;

          console.log(response.idUsuario);
          console.log(response.email);

          // Asignar los valores correctamente
          this.idUser = response.idUsuario;

          // También puedes almacenar el email si es necesario
          this.myVariableSubject.next(response.email)
        }
        // Devolver la respuesta
        return response;
      }),
      catchError(error => {
        // Manejo del error
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
