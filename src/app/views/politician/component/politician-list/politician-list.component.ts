import { Component ,OnInit} from '@angular/core';
import { SimpleTableComponent } from '../../../pages/simple-table/simple-table.component';
import { TableModule } from '@coreui/angular';
import { PruebaComponent } from '../../../common/prueba/prueba.component'; // Replace with the actual path to your component
import { PagesModule } from '../../../pages/pages.module';
import {PoliticianListService} from '../../service/politician-list.service'
@Component({
  selector: 'app-politician-list',
  standalone: true,
  imports: [PagesModule],
  templateUrl: './politician-list.component.html',
  styleUrl: './politician-list.component.scss'
})
export class PoliticianListComponent {
FoundsList: any=[];
  next_Page:boolean=true


  constructor(private PoliticianListService: PoliticianListService) {}
  displayedColumns: string[] = ['Nombre', 'Ticker', 'partido', 'Fecha', 'Monto', 'Trade'];
  ngOnInit(): void {
    this.PoliticianListService.getData().subscribe(
      response => {
        this.FoundsList = response.data.map((item:any) => {
          return {
            Nombre:  {nombre:item.name,    tipo:"link",  accion:"/"},
            Ticker:  {nombre:item.asset , tipo:"texto", accion:"/"},
            partido: {nombre:item.party ,    tipo:"texto", accion:"/"},
            Fecha:   {nombre:item.pubDate ,    tipo:"texto", accion:"/"},
            Monto:   {nombre:item.value ,  tipo:"texto", accion:"/"},
            Trade:   {nombre: item.value ,  tipo:"texto", accion:"/"}

          };
        });;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }


  nextPage(pagina:any){
    console.log(pagina)
    this.PoliticianListService.getNextPage(pagina).subscribe(
      response => {
        console.log(response)
        this.next_Page=response.next
        this.FoundsList = this.FoundsList.concat(response.data.map((item:any) => {

          return {
            Fondo: {nombre:item.name,tipo:"link",accion:"/"},
            Ultima_modificación:  {nombre:item.date,tipo:"texto"},
          };
        }));

        console.log(this.FoundsList);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );

  }
}


