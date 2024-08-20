import { Component ,OnInit} from '@angular/core';
import { SimpleTableComponent } from '../../pages/simple-table/simple-table.component';
import { TableModule } from '@coreui/angular';
import { PruebaComponent } from '../../common/prueba/prueba.component'; // Replace with the actual path to your component
import { PagesModule } from '../../pages/pages.module';
import {FoundListServiceService} from '../service/found-list-service.service'

@Component({
  selector: 'app-founds-list',
  standalone: true,
  imports: [PruebaComponent,PagesModule],
  templateUrl: './founds-list.component.html',
  styleUrl: './founds-list.component.scss'
})
export class FoundsListComponent implements OnInit {
  FoundsList: any=[];
  next_Page:boolean=true


  constructor(private FoundListServiceService: FoundListServiceService) {}
  displayedColumns: any[] = ["Fondo","Ultima_modificación"];
  ngOnInit(): void {
    this.FoundListServiceService.getData().subscribe(
      response => {
        this.FoundsList = response.data.map((item:any) => {
          return {
            Fondo: {nombre:item.name,tipo:"link",accion:"/"},
            Ultima_modificación:  {nombre:item.date,tipo:"texto"},

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
    this.FoundListServiceService.getNextPage(pagina).subscribe(
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
