import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {ErrorHttpsService} from '../../../common/services/error-https.service';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TickerService {

  private apiUrl = environment.apiUrl+"insider/"; // Usa la URL del environment
  constructor(private http: HttpClient,private error:ErrorHttpsService ) { }


  getData(activo:string): Observable<any> {
    activo.toUpperCase()
    let url = this.apiUrl + "getTickerInfo.php?activo="+activo;
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
