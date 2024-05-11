import { Component } from '@angular/core';
import { SimpleTableComponent } from '../../pages/simple-table/simple-table.component';
import { TableModule } from '@coreui/angular';

@Component({
  selector: 'app-insider-list',
  standalone: true,
  imports: [],
  templateUrl: './insider-list.component.html',
  styleUrl: './insider-list.component.scss'
})
export class InsiderListComponent {
  constructor(private basic:SimpleTableComponent){
    console.log(basic)
  }

}
