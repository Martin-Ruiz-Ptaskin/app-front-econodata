import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import {ErrorHttpsService} from '../../common/services/error-https.service';
import { catchError, map } from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PoliticianListService {

  private apiUrl = environment.apiUrl+"politicos/"; // Usa la URL del environment
  constructor(private http: HttpClient,private error:ErrorHttpsService ) { }
  currentPage:number=0
  getData(): Observable<any> {
    let url = this.apiUrl + "getPolitician.php";
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
getNextPage(page:number){
  let url = this.apiUrl + "getPolitician.php"+"?page="+page;
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
