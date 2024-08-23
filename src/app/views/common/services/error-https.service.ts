import { Injectable,inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ErrorHttpsService {
  private _snackBar = inject(MatSnackBar);
  constructor() { }

  error(){
    console.log("error")
    this.openSnackBar('Error al cargar la informacion', 'OK')
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
