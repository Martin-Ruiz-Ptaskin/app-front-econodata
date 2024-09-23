import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { SimpleTableComponent } from '../../pages/simple-table/simple-table.component';
import { PagesModule } from '../../pages/pages.module';
import { IconDirective } from '@coreui/icons-angular';
import { cilCash, cilUser , cilClipboard} from '@coreui/icons';
import { ColComponent, RowComponent, TemplateIdDirective, WidgetStatFComponent } from '@coreui/angular';
import {FoundListServiceService} from '../service/found-list-service.service'
import { ChartsModule } from '../../charts/charts.module';

@Component({
  selector: 'app-founds',
  templateUrl: './founds.component.html',
  styleUrl: './founds.component.scss'
})

export class FoundsComponent implements OnInit {
  foundName:string="";
  foundAssets:any;
  tenencias:any
  valortotal:any
  assets:any
  chartPieData:any
  constructor(private route: ActivatedRoute,private FoundListServiceService: FoundListServiceService  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('name')){

      this.FoundListServiceService.getFoundById( this.foundName).subscribe(

        response => {
          this.foundAssets = response.data.map((item:any) => {
            this.foundName=item.name

            this.tenencias=this.calcularResumenFromString(item.assets)
            console.log(this.tenencias)
            console.log(this.assets)
          this.chartPieData=  this.crearGrafico(this.assets)

            /*
            return {
              Fondo: {nombre:item.name,tipo:"link",accion:"/"},
              Ultima_modificación:  {nombre:item.date,tipo:"texto"},

            };*/
          });;
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
  console.log(data)
  const chartDoughnutData = {
    labels: [] as string[],
    datasets: [
      {
        backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'], // Colores personalizados
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
  const top9 = activosConPorcentaje.slice(0, 9);

  // Calcular el porcentaje acumulado del resto
  const otrosPorcentaje = activosConPorcentaje.slice(9).reduce((acc: number, item: any) => acc + item.percentage, 0);

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


}
