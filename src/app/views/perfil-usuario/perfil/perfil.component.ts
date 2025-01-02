import { Component, OnInit } from '@angular/core';
import { cilCash, cilUser , cilClipboard} from '@coreui/icons';
import { PerfilService } from '../service/perfil.service';
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
  message:Array<any>=[]
  finances:any=null
  requestEnviado:number=0 //0 no se envio //1 en progreso //2 resultado
  isLoading:boolean=false;




  constructor( private PerfilService:PerfilService) { }
   ngOnInit(): void {
       this.PerfilService.getPerfilData().subscribe((resp:any)=>{
          this.finances = this.processFinanceData(resp.data);
          console.log(this.finances)
       })
   }
    CharlaChatGptEvento(mensaje: string) {
    console.log(mensaje)
    this.message.push({role:"user",content:mensaje})
   /* this.FinanzasService.ConversacionGPTApi(this.message).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.respuesta){
        this.message.push({role:"assistant",content:resp.respuesta})
      }

    })
  */
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
