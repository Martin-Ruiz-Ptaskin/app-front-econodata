import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError,of ,BehaviorSubject  } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { ErrorHttpsService } from 'src/app/views/common/services/error-https.service';


import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiUrl = environment.apiUrl+"user/"; // Usa la URL del environment

  constructor(private http: HttpClient,private error:ErrorHttpsService) {}



  getBarraBusqueda(search: string): Observable<any> {
    const requesUrl = this.apiUrl + "barraBusqueda.php";
    console.log(requesUrl);

    // Aquí podrías agregar una validación para incluir el parámetro de búsqueda si es necesario
    const params = search ? { params: { search } } : {};

    return this.http.get<any>(requesUrl, params).pipe(
      map(response => {
        // Verificar si el estado de la respuesta es 200
        if (response.status == '500') {
            console.log("atrapar cuando no hay")
        }
        else if(response.status == '200'){
          return response;
        }
         else {
            // Manejo del error, por ejemplo mostrar mensaje de error
            this.error.openSnackBar(response.message, "ok");
            throw new HttpErrorResponse({ status: 400, statusText: response.message })
        }
      }),
      catchError(error => {
        // Manejo de errores en caso de fallo en la petición
        this.error.error();
        return throwError(() => error);
      })
    );
  }




}
