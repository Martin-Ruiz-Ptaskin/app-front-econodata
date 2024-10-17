import { Component ,OnInit,inject} from '@angular/core';
import {LoginService} from '../../common/services/login.service'
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormGroup,FormArray } from '@angular/forms';
import { pipe,take  } from 'rxjs';
import {FinanzasService} from '../service/finanzas.service'

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
  message:Array<any>=[]
  requestEnviado:number=0 //0 no se envio //1 en progreso //2 resultado

  // Declaras la variable loginService con el prefijo private
  constructor(private loginService: LoginService,private FinanzasService:FinanzasService) {
    this.ingresos = this._formBuilder.group({
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
  this.cargarValoresIniciales();

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
crearCampo(valor?: { categoria: string, monto: number }) {
  return this._formBuilder.group({
    categoria: [valor ? valor.categoria : '', Validators.required],
    monto: [valor ? valor.monto : 0, Validators.required]
  });
}

// Función para agregar un nuevo campo
agregarCampo(categoria: string) {
  console.log("invoca")
  switch (categoria) {
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
eliminarCampo(categoria: string, indice: number) {
  switch (categoria) {
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
  this.requestEnviado=1
    this.FinanzasService.MsgGPTApi(datos).subscribe((resp:any)=>{
      if(resp.respuesta){
        this.requestEnviado=2
        this.message.push({sendBy:"assistant",content:resp.respuesta})
      }

    })

}


CharlaChatGptEvento(mensaje: string) {
  console.log(mensaje)
  this.message.push({sendBy:"user",content:mensaje})
  this.FinanzasService.ConversacionGPTApi(this.message).subscribe((resp:any)=>{
    console.log(resp)
    if(resp.respuesta){
      this.message.push({sendBy:"assistant",content:resp.respuesta})
    }

  })

}

cargarValoresIniciales() {
  this.ingresos = this._formBuilder.group({
    campos: this._formBuilder.array([
      this.crearCampo({ categoria: 'sueldo', monto: 2200000 }),
      this.crearCampo({ categoria: 'empresa', monto: 800000 })
    ])
  });

  this.gastos = this._formBuilder.group({
    campos: this._formBuilder.array([
      this.crearCampo({ categoria: 'servicios', monto: 100000 }),
      this.crearCampo({ categoria: 'autos', monto: 1000000 }),
      this.crearCampo({ categoria: 'supermercado', monto: 250000 }),
      this.crearCampo({ categoria: 'varios', monto: 100000 }),
      this.crearCampo({ categoria: 'educación', monto: 70000 })
    ])
  });

  this.ahorros = this._formBuilder.group({
    campos: this._formBuilder.array([
      this.crearCampo({ categoria: 'acciones', monto: 150000 }),
      this.crearCampo({ categoria: 'ahorro', monto: 150000 })
    ])
  });

  this.deudas = this._formBuilder.group({
    campos: this._formBuilder.array([
      this.crearCampo({ categoria: 'hipoteca', monto: 0 }),  // Suponiendo que no hay hipoteca
      this.crearCampo({ categoria: 'tarjeta de crédito', monto: 50000 }) // Ejemplo de deuda
    ])
  });
}

}
