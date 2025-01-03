import { Injectable } from '@angular/core';
import {pastelColors} from './colors'
@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }
   generarColoresPastel(cantidad: number): string[] {
    if (cantidad > 360) {
      throw new Error("La cantidad de colores solicitada supera el límite de colores únicos posibles.");
    }

    const colores: string[] = [];
    const paso = 360 / cantidad; // Divide el círculo de color en partes iguales

    for (let i = 0; i < cantidad; i++) {
      const hue = i * paso; // Asegura una distribución uniforme del matiz
      const color = this.hslToHex(hue, 70, 80); // Saturación 70% y luminosidad 80% para tonos pastel
      console.log(color)
      colores.push(color);
    }

    return colores;
  }

  // Función auxiliar para convertir HSL a HEX
   hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }


  crearGraficoTorta(data:any){
    console.log(data)
    let totalValue = 0;
    const colores=this.generarColoresPastel((data.length))
    const chartDoughnutData = {
      labels: [] as string[],
      datasets: [
        {
          backgroundColor:colores, // Colores personalizados
          data: [] as number[],
        }
      ]
    };
    data.forEach((item: any) => {
      totalValue += item.monto;
    });
    const activosConPorcentaje = data.map((item: any) => {

      const percentage = (item.monto / totalValue) * 100;
      return {
        name: item.categoria,
        percentage: percentage
      };
    });
    activosConPorcentaje.forEach((item: any) => {
      chartDoughnutData.labels.push(item.name);
      chartDoughnutData.datasets[0].data.push(parseFloat(item.percentage.toFixed(2))); // Redondear a 2 decimales
    });

  return chartDoughnutData

  }
}
