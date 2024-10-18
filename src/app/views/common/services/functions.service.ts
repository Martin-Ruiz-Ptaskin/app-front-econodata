import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }
  generarColoresPastel(cantidad: number): string[] {
    const colores: string[] = [];
    const paso = 360 / cantidad;  // Divide el círculo de color en partes iguales para asegurar diversidad

    for (let i = 0; i < cantidad; i++) {
      // El valor del tono se incrementa en un paso fijo para asegurar una amplia diferencia entre colores
      const hue = i * paso;

      // Convertimos HSL a formato RGB en hexadecimal, asegurando tonos pastel con alta luminosidad y saturación media
      const color = this.hslToHex(hue, 70, 60);  // Saturación 70% y luminosidad 60% para mantener tonos claros pero distintos
      colores.push(color);
    }

    return colores;
  }

  // Función auxiliar para convertir HSL a formato hexadecimal
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
    } else {
      r = c; g = 0; b = x;
    }

    // Convertimos los valores RGB a formato hexadecimal
    const rHex = Math.floor((r + m) * 255).toString(16).padStart(2, '0');
    const gHex = Math.floor((g + m) * 255).toString(16).padStart(2, '0');
    const bHex = Math.floor((b + m) * 255).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  }

}
