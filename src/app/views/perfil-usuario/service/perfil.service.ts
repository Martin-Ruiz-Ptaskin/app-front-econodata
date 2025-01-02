import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import {environment} from  '../../../../environments/environment';
import {ErrorHttpsService} from '../../common/services/error-https.service';
import { catchError, map } from 'rxjs/operators';
import {LoginService} from '../../common/services/login.service';
@Injectable({
  providedIn: 'root'
})
export class PerfilService {

 private apiUrl = environment.apiUrl+"user/"; // Usa la URL del environment
  constructor(private http: HttpClient,private error:ErrorHttpsService,private LoginService:LoginService ) { }


  getPerfilData(): Observable<any> {
    let idUsuario = this.LoginService.getId(); // Obtenemos el ID del usuario
    let url = this.apiUrl + "getProfileData.php?idUsuario="+idUsuario;
    return this.http.get<any>(url).pipe(
      map(response => {
        // Aquí validamos si el código de estado no es 200
        if (response.status !== 200) {
          // Si no es 200, llamamos al servicio de error y arrojamos un error
          this.error.error();
          throw new HttpErrorResponse({ status: response.status, statusText: response.statusText });
        }
        // Si es 200, devolvemos la respuesta
        return response;
      }),
      catchError(error => {
        // Aquí manejamos otros posibles errores que puedan ocurrir
        this.error.error();
        return throwError(() => error);
      })
    );
  }

}
