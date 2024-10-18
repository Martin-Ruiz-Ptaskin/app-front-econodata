import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError,of ,BehaviorSubject  } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { ErrorHttpsService } from 'src/app/views/common/services/error-https.service';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {LoginService} from '../../common/services/login.service'


@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  constructor(private http: HttpClient,private error:ErrorHttpsService,private loginService: LoginService) {}
  private myVariableSubject = new BehaviorSubject<boolean>(false); // Creamos un BehaviorSubject
  ConsultaEnCurso$ = this.myVariableSubject.asObservable(); // Creamos un observable a partir del BehaviorSubject
  private apiUrl = environment.apiUrl+"GPT/"; // Usa la URL del environment
  //no se me ocurrio como sacar el prompt de aca para la cola de msj
  private msjEnviados:Array<any>=[{
    'role' : 'system',
    'content' :'Eres un asesor financiero con más de 15 años de experiencia en la revisión y optimización de la situación financiera de individuos y familias. Tu especialidad es proporcionar asesoría personalizada que abarca desde la creación de fondos de emergencia hasta la diversificación de inversiones. Tu tarea es revisar la información financiera que se te proporcione a continuación y ofrecer recomendaciones concretas sobre cómo mejorar la situación financiera del cliente. Aquí están los datos que necesitas considerar: los datos recibidos Ten en cuenta que las recomendaciones deben ser prácticas y adaptadas a la situación específica del cliente, abarcando aspectos como la reducción de deudas, la optimización de ahorros y estrategias de inversión. Al final de tu respuesta, incluye algunas preguntas que el cliente podría hacer para profundizar en sus opciones financieras. Por favor, proporciona una revisión completa y asegurándote de cuidadosamente considerar todos los datos proporcionados para ofrecer las mejores soluciones adaptadas a la situación del cliente.'  }];
  private uuid:string=""


  MsgGPTApi(data: any): Observable<any> {
    let id=this.loginService.getId()
    console.log(id)
    const requesUrl = this.apiUrl + "revision.php";
    this.msjEnviados.push({role:"user",content:data})
    const body = { consulta:data,idUsuario: id}; // Datos de inicio de sesión
    this.myVariableSubject.next(true)

    return this.http.post<any>(requesUrl, body).pipe(
      map(response => {
        this.myVariableSubject.next(false)

        // Verificar si el valor "status" es 200 (éxito)
        if (response.status != 200) {
          this.error.openSnackBar(response.message, "ok");
          throw new HttpErrorResponse({ status: 400, statusText: response.message });
        } else {
          // Guardo el msj recibido  y enviado para la cola de msj

          this.uuid=response.uuid

          console.log(response)
          // Realizar las demás acciones necesarias

        }

        // Si ok es true, devolvemos la respuesta con el rol del usuario
        return response;
      }),
      catchError(error => {
        this.myVariableSubject.next(false)

        this.error.error();
        return throwError(() => error);
      })
    );
}


ConversacionGPTApi(data: any): Observable<any> {
  let id=this.loginService.getId()
  console.log(id)
  const requesUrl = this.apiUrl + "conversacion.php";
  const resultado = this.msjEnviados.concat(data);
  console.log(resultado)
  const body = { historial:resultado,idUsuario: id,uuid:this.uuid}; // Datos de inicio de sesión
  this.myVariableSubject.next(true )

  return this.http.post<any>(requesUrl, body).pipe(
    map(response => {
      this.myVariableSubject.next(false)

      // Verificar si el valor "status" es 200 (éxito)
      if (response.status != 200) {
        this.error.openSnackBar(response.message, "ok");
      } else {
        // Guardo el msj recibido  y enviado para la cola de msj

        this.uuid=response.uuid

        // Realizar las demás acciones necesarias

      }

      // Si ok es true, devolvemos la respuesta con el rol del usuario
      return response;
    }),
    catchError(error => {
      this.myVariableSubject.next(false)

      this.error.error();
      return throwError(() => error);
    })
  );
}


}
