import { Component, AfterViewInit,Input ,OnInit} from '@angular/core';
import ApexSankey from 'apexsankey';

@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.component.html',
  styleUrls: ['./sankey.component.scss']
})

export class SankeyComponent implements AfterViewInit ,OnInit {
  @Input() finances:Array<{ ingresos: { categoria: string; monto: number; }[], gastos: { categoria: string; monto: number; }[] }> = [] // Accepta un arreglo de cualquier tipo

  data: Data = {
    nodes: [],
    edges: [],
    options: {
      canvasStyle: 'width: 100%; height:90%',
      width: 600,
      edgeGradientFill: false,
      nodeWidth: 10,
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 100,
      height: 400,
      spacing: 1, // Espacio entre nodos
      nodeBorderWidth: 1, // Grosor del borde de los nodos
      nodeBorderColor: '#000000', // Color del borde de los nodos

      // Opciones de tooltip
      enableTooltip: true, // Habilitar o deshabilitar el tooltip
      tooltipId: 'sankey-tooltip', // ID del tooltip
      tooltipBorderColor: '#cccccc', // Color del borde del tooltip
      tooltipBGColor: '#ffffff', // Color de fondo del tooltip

      // Opciones de fuente
      fontSize: '12px', // Tamaño de la fuente corregido a tipo string
      fontColor: '#333333', // Color de la fuente

      // Opciones de borde para las aristas
      edgeOpacity: 0.5,
    }
  };
  ngOnInit(): void {
    console.log(this.finances)
    if (this.finances) {
      const generatedData = this.generateGraphData(this.finances);

      // Reemplazamos nodes y edges con los valores generados
      generatedData.nodes.push({ id: 'presupuesto', title: 'presupuesto' }    )
      this.data.nodes = generatedData.nodes;
      this.data.edges = generatedData.edges;

      console.log(this.data)

      const graphOptions = {
        canvasStyle: 'width: 100%; height:90%',
        width: 600,
        edgeGradientFill: false,
        nodeWidth: 10,
        fontFamily: 'Quicksand, sans-serif',
        fontWeight: 100,
        height: 400,
        spacing: 1, // Espacio entre nodos
        nodeBorderWidth: 1, // Grosor del borde de los nodos
        nodeBorderColor: '#000000', // Color del borde de los nodos

        // Opciones de tooltip
        enableTooltip: true, // Habilitar o deshabilitar el tooltip
        tooltipId: 'sankey-tooltip', // ID del tooltip
        tooltipBorderColor: '#cccccc', // Color del borde del tooltip
        tooltipBGColor: '#ffffff', // Color de fondo del tooltip

        // Opciones de fuente
        fontSize: '22px', // Tamaño de la fuente corregido a tipo string
        fontColor: '#333333', // Color de la fuente

        // Opciones de borde para las aristas
        edgeOpacity: 0.5, // Define la opacidad de las conexiones (aristas)
      };




      // Renderizar el diagrama de Sankey
      const sankeyElement = document.getElementById('svg-sankey');
      if (sankeyElement) {
        const s = new ApexSankey(sankeyElement, graphOptions);
        s.render(this.data);
      }
    }
  }

  private generateGraphData(finances: any): Dato {
    const nodes: Node[] = []; // Array para nodos
    const edges: Edge[] = [];

      finances.ingresos.forEach((income: { categoria: string }) => {
      nodes.push({ id: income.categoria, title: income.categoria });
    });

    // Agregar nodos de gastos dinámicamente
    finances.gastos.forEach((expense: { categoria: string }) => {
      nodes.push({ id: expense.categoria, title: expense.categoria });
    });

    // Agregar nodos de ingresos



    // Agregar edges para ingresos
    finances.ingresos.forEach((income: { categoria: string; monto: number }) => {
      edges.push({
        source: income.categoria,
        target: 'presupuesto',
        value: income.monto,
        type: 'link'
      });
    });

    // Agregar edges para gastos
    finances.gastos.forEach((expense: { categoria: string; monto: number }) => {
      edges.push({
        source: 'presupuesto',
        target: expense.categoria,
        value: expense.monto,
        type: 'link'
      });
    });

    return {
      nodes: nodes,
      edges: edges,
    };
  }



  ngAfterViewInit(): void {

    // Datos del gráfico Sankey

   /*const data = {
      nodes: [
        { id: 'comida', title: 'comida' },
        { id: 'ingresos', title: 'ingresos' },
        { id: 'presupuesto', title: 'presupuesto' },
        { id: 'alquiler', title: 'alquiler' },
        { id: 'Electricity', title: 'Electricity' },
        { id: 'entretenimiento', title: 'entretenimiento' },
      ],
      edges: [
        { source: 'ingresos', target: 'presupuesto', value: 700000, type: 'link' },
        { source: 'presupuesto', target: 'entretenimiento', value: 20000, type: 'link' },
        { source: 'presupuesto', target: 'Electricity', value: 36000, type: 'link' },
        { source: 'presupuesto', target: 'Electricity', value: 25000, type: 'link' },
        { source: 'presupuesto', target: 'alquiler', value: 250000, type: 'link' },
        { source: 'presupuesto', target: 'entretenimiento', value: 100000, type: 'link' },
      ],
      options: {
        canvasStyle: 'width: 100%; height:90%',
      width: 400,
      edgeGradientFill: false,
      nodeWidth: 10,
      fontFamily: 'Quicksand, sans-serif',
      fontWeight: 50,
      height: 300,
      spacing: 10, // Espacio entre nodos
      nodeBorderWidth: 1, // Grosor del borde de los nodos
      nodeBorderColor: '#000000', // Color del borde de los nodos

      // Opciones de tooltip
      enableTooltip: true, // Habilitar o deshabilitar el tooltip
      tooltipId: 'sankey-tooltip', // ID del tooltip
      tooltipBorderColor: '#cccccc', // Color del borde del tooltip
      tooltipBGColor: '#ffffff', // Color de fondo del tooltip

      // Opciones de fuente
      fontSize: '12px', // Tamaño de la fuente corregido a tipo string
      fontColor: '#333333', // Color de la fuente

      // Opciones de borde para las aristas
      edgeOpacity: 0.5, // Define la opacidad de las conexiones (aristas)
      },
    };*/

    // Opciones del gráfico

}

}
interface Income {
  categoria: string;
  monto: number;
}

interface Expense {
  categoria: string;
  monto: number;
}

interface Node {
  id: string;
  title: string;
}

interface Edge {
  source: string;
  target: string;
  value: number;
  type: string;
}

interface Dato {
  nodes: Node[];
  edges: Edge[];
}
interface Data {
  nodes: Node[];
  edges: Edge[];
  options: any;
}
