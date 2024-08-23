import { Component,Input,OnChanges,SimpleChanges,Output,EventEmitter  } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table'; // Si estás usando Angular Material

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrl: './simple-table.component.scss',

})


export class SimpleTableComponent implements OnChanges {
  @Input() displayedColumns2: string | undefined;
  @Input() dataSource2: string | undefined;
  @Input() inputdataSource: any;
  @Input() nextPageBtn: boolean | undefined =false;
  @Input() titulo: string | undefined;
  @Output() dataEmitter: EventEmitter<number> = new EventEmitter<number>();
  pagina:number=0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource(); // Inicializa dataSource
  @Input() displayedColumns:any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    // Maneja las actualizaciones de las propiedades @Input
    if (changes['inputdataSource']) {
      console.log(this.displayedColumns)
      console.log(this.inputdataSource)
      this.dataSource = this.inputdataSource ;
    }


  }

  sendData() {
    this.pagina++
    this.dataEmitter.emit(this.pagina);
  }

}
