import { Component ,OnInit} from '@angular/core';
import { SimpleTableComponent } from '../../pages/simple-table/simple-table.component';
import { TableModule } from '@coreui/angular';
import { PruebaComponent } from '../../common/prueba/prueba.component'; // Replace with the actual path to your component
import { PagesModule } from '../../pages/pages.module';
import {InsiderListServiceService} from '../service/insider-list-service.service'

@Component({
  selector: 'app-insider-list',
  standalone: true,
  imports: [PruebaComponent,PagesModule],
  templateUrl: './insider-list.component.html',
  styleUrl: './insider-list.component.scss'
})

export class InsiderListComponent implements OnInit {
  insiderList: Array<any>=[];
  next_Page:boolean=false
  constructor(private InsiderListServiceService: InsiderListServiceService) {}
  displayedColumns: string[] = ['Nombre', 'Ticker', 'Empresa', 'Fecha', 'Monto', 'Trade'];
  ngOnInit(): void {
    this.InsiderListServiceService.getData().subscribe(
      response => {
        this.next_Page=response.next

        console.log(response)
        this.insiderList = response.data.map((item:any) => {
          return {
            Nombre:  {nombre:item.name,    tipo:"texto",  accion:"/"},
            Ticker:  {nombre:item.company , tipo:"link", accion:"/insider/ticket/"+item.company},
            Empresa: {nombre:item.clave ,    tipo:"texto", accion:"/"},
            Fecha:   {nombre:item.date ,    tipo:"texto", accion:"/"},
            Monto:   {nombre:item.amount ,  tipo:"texto", accion:"/"},
            Trade:   {nombre: item.trade ,  tipo:"texto", accion:"/"}
          };
        });

        console.log(this.insiderList);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  nextPage(pagina:any){
    console.log(pagina)
    this.InsiderListServiceService.getNextPage(pagina).subscribe(
      response => {
        console.log(response)
        this.next_Page=response.next
        this.insiderList = this.insiderList.concat(response.data.map((item:any) => {

          return {
            Nombre:  {nombre:item.name,    tipo:"link",  accion:"/"},
            Ticker:  {nombre:item.company , tipo:"texto", accion:"/"},
            Empresa: {nombre:item.clave ,    tipo:"texto", accion:"/"},
            Fecha:   {nombre:item.date ,    tipo:"texto", accion:"/"},
            Monto:   {nombre:item.amount ,  tipo:"texto", accion:"/"},
            Trade:   {nombre: item.trade ,  tipo:"texto", accion:"/"}
          };
        }));

        console.log(this.insiderList);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );

  }
}
