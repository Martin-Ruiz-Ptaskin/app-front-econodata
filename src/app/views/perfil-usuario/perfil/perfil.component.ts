import { Component, OnInit } from '@angular/core';
import { cilCash, cilUser , cilClipboard} from '@coreui/icons';
import { PerfilService } from '../service/perfil.service';
import {FinanzasService} from '../../finanzas/service/finanzas.service'

import { FunctionsService } from '../../common/services/functions.service';
type FinanceData = {
  id: number;
  idUsuario: number;
  datos: string; // JSON string
  fecha: string; // ISO date string
};
type ParsedFinanceData = {
  ingresos: { categoria: string; monto: number }[];
  gastos: { categoria: string; monto: number }[];
  ahorros: { categoria: string; monto: number }[];
  deudas: { categoria: string; monto: number }[];
};
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',

  styleUrl: './perfil.component.scss'
})

export class PerfilComponent implements OnInit {
  icons = { cilCash, cilUser,cilClipboard };
  chartDoughnutData:any
  response:boolean=false
  message:Array<any>=[]
  finances:any=null
  requestEnviado:number=0 //0 no se envio //1 en progreso //2 resultado
  isLoading:boolean=false;
  cantidadMensajes:number=0




  constructor( private PerfilService:PerfilService,private FunctionsService:FunctionsService,private FinanzasService:FinanzasService) { }
   ngOnInit(): void {
    this.FinanzasService.ConsultaEnCurso$.subscribe((resp:boolean)=>{
      this.isLoading=resp;
    })

       this.PerfilService.getPerfilData().subscribe((resp:any)=>{
          console.log(resp)
          this.response=true
          this.finances = resp==false?false: this.processFinanceData(resp.data);
          console.log(this.finances)
          this.chartDoughnutData=this.FunctionsService.crearGraficoTorta(this.finances.finances.gastos)
          this.message.push({role:"assistant",content:"Hola! ¿tienes preguntas sobre tus finanzas?"})

       })
   }
    CharlaChatGptEvento(mensaje: string) {
    console.log(this.finances.finances)
    let pregunta
    if(this.cantidadMensajes==0){
      pregunta=this.finances.finances
      pregunta.pregunta=mensaje
      console.log(pregunta)
      this.message.push({role:"user",content:mensaje})
      this.FinanzasService.ConversacionGPTApi({role:"user",content:pregunta}).subscribe((resp:any)=>{

        if(resp.respuesta){
          this.requestEnviado=2
          this.message.push({role:"assistant",content:resp.respuesta})
        }

      })

    }
    else{
      pregunta=mensaje
      this.message.push({role:"user",content:mensaje})
      this.FinanzasService.ConversacionGPTApi({role:"user",content:mensaje}).subscribe((resp:any)=>{
        console.log(resp)
        if(resp.respuesta){
          this.message.push({role:"assistant",content:resp.respuesta})
        }

      })

    }
    this.cantidadMensajes++



  }
   processFinanceData(financeArray: FinanceData[]) {
    if (financeArray.length === 0) {
      throw new Error("El arreglo está vacío.");
    }

    // Ordenar por fecha (más reciente primero)
    const sortedArray = financeArray.sort(
      (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );

    // Obtener el objeto más reciente
    const mostRecent = sortedArray[0];

    // Parsear los datos JSON
    const finances: ParsedFinanceData = JSON.parse(mostRecent.datos);

    // Calcular las sumas para cada categoría
    const ingresosSum = finances.ingresos.reduce((sum, item) => sum + item.monto, 0);
    const gastosSum = finances.gastos.reduce((sum, item) => sum + item.monto, 0);
    const ahorrosSum = finances.ahorros.reduce((sum, item) => sum + item.monto, 0);
    const deudasSum = finances.deudas.reduce((sum, item) => sum + item.monto, 0);

    return {
      finances,
      ingresosSum,
      gastosSum,
      ahorrosSum,
      deudasSum,
    };
  }
}
