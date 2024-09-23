import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {TickerService} from '../ticker/service/ticker.service'
import { PagesModule } from '../../pages/pages.module';
import { IconDirective } from '@coreui/icons-angular';
import { cilCash, cilUser , cilClipboard} from '@coreui/icons';


import { ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent } from '@coreui/angular';


@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  standalone:true,
  imports: [PagesModule,RowComponent,ColComponent, WidgetStatFComponent, TemplateIdDirective,IconDirective],
  styleUrl: './ticker.component.scss'
})
export class TickerComponent implements OnInit{
  ticker:string="";
  insiders:any=[]
  icons = { cilCash, cilUser,cilClipboard };
  totalValue:number=0
  interesados:number=0
  accionesCompradas:number=0
  displayedColumns: string[] = ['operador', 'activo', 'cantidad', 'value', 'movimiento', 'tipo', 'fecha'];


  constructor(private route: ActivatedRoute,private service:TickerService) { }


  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('ticker')){
      this.ticker = this.route.snapshot.paramMap.get('ticker')|| ''.toUpperCase();
      this.ticker.toUpperCase()

    }

    this.service.getData(this.ticker).subscribe(


      response => {
        this.updatedData(response.data)

        this.insiders = response.data.map((item:any) => {
          this.interesados++
          return {
            operador: {nombre:item.operador,tipo:"texto"},
            activo:  {nombre:item.activo,tipo:"texto"},
            cantidad:  {nombre:item.cantidad,tipo:"texto"},
            value:  {nombre:item.value,tipo:"texto"},
            movimiento:  {nombre:item.movimiento,tipo:"texto"},
            tipo:  {nombre:item.tipo_investor,tipo:"texto"},
            fecha:  {nombre:item.fecha,tipo:"texto"},


          };
        });;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );

  }
 updatedData(data:any){

  data.map((item: any) => {
    if(item.cantidad){
      console.log(item.cantidad)
      this.accionesCompradas += parseInt(item.cantidad.replace(/,/g, ''))
    }
    if (item.tipo_investor === 'fund' || item.tipo_investor === 'insider') {
        // Remover los dos primeros caracteres de 'value'
        const numericValue = parseFloat(item.value.slice(2).replace(/,/g, '')); // Convierte el string en número

        // Sumar al acumulado
        this.totalValue += numericValue;

        // Actualizar el valor en el objeto si es necesario

    }
    else{
      this.totalValue += parseFloat(item.value)  ;

    }

});
 }





}
