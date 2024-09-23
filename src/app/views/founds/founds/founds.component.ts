import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import {FoundListServiceService} from '../service/found-list-service.service'
import { cilCash, cilUser , cilClipboard} from '@coreui/icons';


@Component({
  selector: 'app-founds',
  templateUrl: './founds.component.html',
  styleUrl: './founds.component.scss'
})

export class FoundsComponent implements OnInit {
  foundName:string="";
  foundAssets:any;
  tenencias:any
  icons = { cilCash, cilUser,cilClipboard };
  cantidadPosiciones:number =0;
  valortotal:any
  assets:any
  chartDoughnutData:any
  displayedColumns: string[] = ['Ticker', 'Cantidad_acciones', 'Porcentaje', 'Dinero', 'Movimiento'];

  constructor(private route: ActivatedRoute,private FoundListServiceService: FoundListServiceService  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('name')){

      this.FoundListServiceService.getFoundById( this.foundName).subscribe(

        response => {
          this.foundAssets = response.data.map((item:any) => {
            this.foundName=item.name

            this.tenencias=this.calcularResumenFromString(item.assets)

            this.chartDoughnutData=  this.crearGrafico(this.assets)
            this.cantidadPosiciones=this.assets.length
            this.assets=  this.assets.map((item:any) => {
              let movimiento = "";

              if (item.movimiento) {
                if (item.movimiento.toLowerCase().includes("add")) {
                  movimiento = `Compra ${item.movimiento.match(/\d+(\.\d+)?%/g) || ''}`; // Extrae el porcentaje si existe
                } else if (item.movimiento.toLowerCase().includes("reduce")) {
                  movimiento = `Venta ${item.movimiento.match(/\d+(\.\d+)?%/g) || ''}`; // Extrae el porcentaje si existe
                }
              } else {
                movimiento = "Nueva compra";
              }

              return {
                Ticker:  {nombre:item.name,tipo:"texto"},
                Cantidad_acciones:  {nombre:item.cantidad,tipo:"texto"},
                Porcentaje:  {nombre:item.portfolioPart +"%",tipo:"texto"},
                Dinero:  {nombre:item.value,tipo:"texto"},
                Movimiento:  {nombre:movimiento,tipo:"texto"},


              };
            });
          });
        },
        error => {
          console.error('Error fetching data:', error);
        }
      );


    }
}


 calcularResumenFromString(jsonString: string) {
  // Convertir el string JSON a un arreglo de objetos

  this.assets = JSON.parse(jsonString);

  // Contar el total de objetos
  const totalObjetos = this.assets.length;

  // Sumar el valor total de "value"
  this.valortotal = this.assets.reduce((acc: number, obj: { value: string }) => {
    // Eliminar el símbolo de dólar y las comas para convertir el valor en número
    const valorNumerico = parseFloat(obj.value.replace(/[$,]/g, ''));
    return acc + valorNumerico;
  }, 0);

  // Formatear los resultados como JSON
  return JSON.stringify({
    totalObjetos,
    totalValue: `$${this.valortotal.toLocaleString()}` // Formatear como valor en dólares
  });
}

crearGrafico(data:any){
  const colores=this.generarColoresPastel((data.length/2))
  const chartDoughnutData = {
    labels: [] as string[],
    datasets: [
      {
        backgroundColor:colores, // Colores personalizados
        data: [] as number[],
      }
    ]
  };
  let totalValue = 0;

  // Calcular el valor total de los activos
  data.forEach((item: any) => {
    const valueStr = item.value.replace(/\$|,/g, ''); // Remover símbolos y comas
    const value = parseFloat(valueStr);
    totalValue += value;
  });

  // Crear un array de activos con porcentajes
  const activosConPorcentaje = data.map((item: any) => {
    const valueStr = item.value.replace(/\$|,/g, '');
    const value = parseFloat(valueStr);
    const percentage = (value / totalValue) * 100;
    return {
      name: item.name,
      percentage: percentage
    };
  });

  // Ordenar por porcentaje de mayor a menor
  activosConPorcentaje.sort((a: any, b: any) => b.percentage - a.percentage);

  // Tomar las primeras 9 acciones con mayor porcentaje
  const top9 = activosConPorcentaje.slice(0, 15);

  // Calcular el porcentaje acumulado del resto
  const otrosPorcentaje = activosConPorcentaje.slice(15).reduce((acc: number, item: any) => acc + item.percentage, 0);

  // Agregar las 9 acciones a labels y data
  top9.forEach((item: any) => {
    chartDoughnutData.labels.push(item.name);
    chartDoughnutData.datasets[0].data.push(parseFloat(item.percentage.toFixed(2))); // Redondear a 2 decimales
  });

  // Agregar "Otros" con el porcentaje acumulado del resto
  chartDoughnutData.labels.push('Otros');
  chartDoughnutData.datasets[0].data.push(parseFloat(otrosPorcentaje.toFixed(2))); // Redondear a 2 decimales
  console.log(chartDoughnutData)
  return chartDoughnutData;
}
 generarColoresPastel(cantidad: number): string[] {
  const colores: string[] = [];

  for (let i = 0; i < cantidad; i++) {
    // Genera valores RGB aleatorios para un color pastel
    const red = Math.floor((Math.random() * 127) + 127);   // Valores entre 127 y 255
    const green = Math.floor((Math.random() * 127) + 127); // Valores entre 127 y 255
    const blue = Math.floor((Math.random() * 127) + 127);  // Valores entre 127 y 255

    // Convierte los valores RGB a formato hexadecimal y los agrega a la lista
    const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    colores.push(color);
  }

  return colores;
}


}
