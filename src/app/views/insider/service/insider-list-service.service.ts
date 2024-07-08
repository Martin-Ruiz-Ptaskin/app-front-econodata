import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InsiderListServiceService {
  private apiUrl = environment.apiUrl; // Usa la URL del environment
  constructor(private http: HttpClient ) { }

  getData(): Observable<any> {
    let url= this.apiUrl +"getInsider.php"
    return this.http.get<any>(url);
  }
}
