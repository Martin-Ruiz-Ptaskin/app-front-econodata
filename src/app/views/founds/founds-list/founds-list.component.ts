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
  FoundsList: any;

  constructor(private FoundListServiceService: FoundListServiceService) {}
  displayedColumns: any[] = ["Fondo","Ultima_modificación"];
  ngOnInit(): void {
    this.FoundListServiceService.getData().subscribe(
      response => {
        console.log(response)
        this.FoundsList = response.data.map((item:any) => {
          return {
            Fondo: {nombre:item.name,tipo:"link",accion:"/"},
            Ultima_modificación:  {nombre:item.date,tipo:"link",accion:"/"},

          };
        });;
        console.log(this.FoundsList);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
