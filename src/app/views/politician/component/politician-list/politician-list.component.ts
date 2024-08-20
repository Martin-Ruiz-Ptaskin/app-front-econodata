import { Component } from '@angular/core';
import { PagesModule } from '../../../pages/pages.module';

@Component({
  selector: 'app-politician-list',
  standalone: true,
  imports: [PagesModule],
  templateUrl: './politician-list.component.html',
  styleUrl: './politician-list.component.scss'
})
export class PoliticianListComponent {

}
