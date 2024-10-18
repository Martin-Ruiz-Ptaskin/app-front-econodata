import { Injectable } from '@angular/core';
import {LoginComponent} from '../../pages/login/login.component'
import { MatDialog } from '@angular/material/dialog';
import { HttpClient,HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable,throwError,of ,BehaviorSubject  } from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ErrorHttpsService} from '../../common/services/error-https.service';
import { catchError, map } from 'rxjs/operators';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl+"user/"; // Usa la URL del environment
  isLogedIn:boolean=false
  private myVariableSubject = new BehaviorSubject<string>(''); // Creamos un BehaviorSubject
  userName$ = this.myVariableSubject.asObservable(); // Creamos un observable a partir del BehaviorSubject
  role:any
  constructor(public dialog: MatDialog,private http: HttpClient,private error:ErrorHttpsService,private oauthService:OAuthService,private router: Router) {
    this.GoogleLoginConfig()
  }
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
    console.log(requesUrl);

    return this.http.post<any>(requesUrl, body).pipe(
      map(response => {
        // Verificar si el valor "status" es 200 (éxito)
        if (response.status != 200) {
          this.error.openSnackBar(response.message, "ok");
          throw new HttpErrorResponse({ status: 400, statusText: response.message });
        } else {
          // Guardar email y pass en el localStorage

         /*
          localStorage.setItem('email', email);
          localStorage.setItem('pass', pass);
          localStorage.setItem('id', response.idUsuario);
          */
          // Realizar las demás acciones necesarias
          this.role = "user";
          this.idUser= response.idUsuario
          this.myVariableSubject.next(email);
          this.isLogedIn = true;
          this.closeDialog();
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


getCredentialsFromLocalStorage(){
  console.log("se ejecuta get credeniales")
  const email = localStorage.getItem('email');
  const pass = localStorage.getItem('pass');
  const id=localStorage.getItem('id')
  if(email && pass){
    this.role = "user";
    this.idUser=id
          this.myVariableSubject.next(email);
          this.isLogedIn = true;
  }
  // Retorna un objeto con los valores obtenidos del localStorage (pueden ser null si no están guardados)
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
          localStorage.setItem('email', email);
          localStorage.setItem('pass', pass);
          localStorage.setItem('id', response.idUsuario);

          this.role="user"
          this.idUser= response.idUsuario

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





//@Params
  openDialogLogin(delay:boolean) {

    if(delay){
      setTimeout(() => {
        if(!this.isLogedIn){
           this.dialog.open(LoginComponent, {
                maxWidth:'800px',
                data: { /* puedes pasar datos aquí */ }
              });

            }    }, 10000);
    }

    else{
        if(!this.isLogedIn){
          this.dialog.open(LoginComponent, {
          maxWidth:'800px',
          data: { /* puedes pasar datos aquí */ }
            });

          }
        }


  }

  closeDialog(){
    this.dialog.closeAll()
  }



  SaveGoogleUser(email: string): Observable<any> {
    const requesUrl = this.apiUrl + "loginGoogle.php";
    const body = { email }; // Datos de inicio de sesión
    console.log(requesUrl);

    return this.http.post<any>(requesUrl, body).pipe(
      map(response => {
        console.log(response)
        // Verificar si el valor "status" es 200 (éxito)
        if (response.status != 200) {
          this.error.openSnackBar(response.message, "ok");
          throw new HttpErrorResponse({ status: 400, statusText: response.message });
        } else {
          // Guardar email y pass en el localStorage
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


GoogleLoginConfig(){
  const config: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    clientId: '850910230302-sgorn3o2cgl03pks7vaj8bvt6tq6dejg.apps.googleusercontent.com',
    redirectUri: window.location.origin +this.router.url,
    scope: 'openid profile email',
  }
  this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  GoogleLogin() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getProfile() {
    console.log(this.oauthService.getIdentityClaims())
    return this.oauthService.getIdentityClaims();
  }

  validarLoginGoogle(){
      const datosGoogle=this.oauthService.getIdentityClaims()
      if(datosGoogle){
        console.log(datosGoogle['email'])
        this.isLogedIn=true;
        this.SaveGoogleUser(datosGoogle['email']).subscribe((resp:any)=>{
        this.idUser=resp.id;
        this.myVariableSubject.next(datosGoogle['email'])

        })

      }

    }

}
