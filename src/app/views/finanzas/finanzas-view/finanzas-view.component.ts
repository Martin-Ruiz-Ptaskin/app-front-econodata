import { Component ,OnInit,inject} from '@angular/core';
import {LoginService} from '../../common/services/login.service'
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormGroup,FormArray } from '@angular/forms';
import { pipe,take  } from 'rxjs';

@Component({
  selector: 'app-finanzas-view',

  templateUrl: './finanzas-view.component.html',
  styleUrl: './finanzas-view.component.scss'
})
export class FinanzasViewComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  ingresos: FormGroup;
  gastos: FormGroup;
  ahorros: FormGroup;
  deudas: FormGroup;
  isLinear = false;


  // Declaras la variable loginService con el prefijo private
  constructor(private loginService: LoginService) { this.ingresos = this._formBuilder.group({
    campos: this._formBuilder.array([this.crearCampo()])
  });
  this.gastos = this._formBuilder.group({
    campos: this._formBuilder.array([this.crearCampo()])
  });
  this.ahorros = this._formBuilder.group({
    campos: this._formBuilder.array([this.crearCampo()])
  });
  this.deudas = this._formBuilder.group({
    campos: this._formBuilder.array([this.crearCampo()])
  });
}

ngOnInit(): void {
  this.loginService.getLogedIn() .pipe (take(1)).subscribe (resp=>{
  if(!resp){
    this.loginService.openDialogLogin()
  }

  })
//this.loginService.openDialogLogin()
}
// Getters para obtener los FormArrays
get campos() {
  return this.ingresos.get('campos') as FormArray;
}

get gastosCampos() {
  return this.gastos.get('campos') as FormArray;
}

get ahorrosCampos() {
  return this.ahorros.get('campos') as FormArray;
}

get deudasCampos() {
  return this.deudas.get('campos') as FormArray;
}

// Función para crear un nuevo campo
crearCampo(): FormGroup {
  return this._formBuilder.group({
    categoria: ['', Validators.required],
    monto: ['', Validators.required]
  });
}

// Función para agregar un nuevo campo
agregarCampo(tipo: string) {
  console.log("invoca")
  switch (tipo) {
    case 'ingresos':
      this.campos.push(this.crearCampo());
      break;
    case 'gastos':
      this.gastosCampos.push(this.crearCampo());
      break;
    case 'ahorros':
      this.ahorrosCampos.push(this.crearCampo());
      break;
    case 'deudas':
      this.deudasCampos.push(this.crearCampo());
      break;
  }
}

// Función para eliminar un campo
eliminarCampo(tipo: string, indice: number) {
  switch (tipo) {
    case 'ingresos':
      this.campos.removeAt(indice);
      break;
    case 'gastos':
      this.gastosCampos.removeAt(indice);
      break;
    case 'ahorros':
      this.ahorrosCampos.removeAt(indice);
      break;
    case 'deudas':
      this.deudasCampos.removeAt(indice);
      break;
  }
}
recogerDatos() {
  const datos = {
    ingresos: this.campos.value,
    gastos: this.gastosCampos.value,
    ahorros: this.ahorrosCampos.value,
    deudas: this.deudasCampos.value,
  };

  return datos;
}
finalizar(){
  let datos =this.recogerDatos()
    console.log(datos)

}

}
