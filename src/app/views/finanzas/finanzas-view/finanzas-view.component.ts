import { Component ,OnInit,inject,ElementRef, ViewChild,Renderer2} from '@angular/core';
import {LoginService} from '../../common/services/login.service'
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule,FormGroup,FormArray } from '@angular/forms';
import { pipe,take  } from 'rxjs';
import {FinanzasService} from '../service/finanzas.service'
import {FunctionsService} from '../../common/services/functions.service'
@Component({
  selector: 'app-finanzas-view',

  templateUrl: './finanzas-view.component.html',
  styleUrl: './finanzas-view.component.scss'
})
export class FinanzasViewComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  @ViewChild('bottom') bottomDiv!: ElementRef; // Referencia al div con id="bottom"

  ingresos: FormGroup;
  gastos: FormGroup;
  ahorros: FormGroup;
  deudas: FormGroup;
  isLinear = false;
  chartDoughnutData:any
  message:Array<any>=[]
  messageApi:Array<any>=[]

  finances:any
  requestEnviado:number=0 //0 no se envio //1 en progreso //2 resultado
  isLoading:boolean=false
  cargarValoresInicialesContador=0

  // Declaras la variable loginService con el prefijo private
  constructor(private renderer: Renderer2, private el: ElementRef,private loginService: LoginService,private FinanzasService:FinanzasService,private FunctionsService:FunctionsService) {
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


  //this.cargarValoresIniciales();
  this.FinanzasService.ConsultaEnCurso$.subscribe((resp:boolean)=>{
    this.isLoading=resp;
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
  if(this.loginService.isLogedIn){
    let datos =this.recogerDatos()
    this.finances=this.recogerDatos()
    this.chartDoughnutData=this.FunctionsService.crearGraficoTorta(datos.gastos)
    console.log(this.chartDoughnutData)
    this.requestEnviado=1
    this.scrollToBottom();
      this.FinanzasService.ConversacionGPTApi({role:"user",content:datos}).subscribe((resp:any)=>{

        if(resp.respuesta){
          this.requestEnviado=2
          this.message.push({role:"assistant",content:resp.respuesta})
        }

      })

  }
  else{
    this.loginService.openDialogLogin(false)
  }




}



CharlaChatGptEvento(mensaje: string) {
  console.log(mensaje)
  this.message.push({role:"user",content:mensaje})
  this.messageApi.push({role:"user",content:mensaje})
  this.FinanzasService.ConversacionGPTApi(this.message).subscribe((resp:any)=>{
    if(resp.respuesta){
      this.message.push({role:"assistant",content:resp.respuesta})
      this.messageApi.push({role:"assistant",content:resp.respuesta})

    }

  })

}

cargarValoresIniciales() {
  this.cargarValoresInicialesContador++;
  if (this.cargarValoresInicialesContador > 9) {

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


scrollToBottom(): void {
  try {
    setTimeout(() => {
      const bottomElement = this.el.nativeElement.querySelector('#view');
      if (bottomElement) {
        bottomElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // Ajusta el tiempo si es necesario (100 ms por defecto)
  } catch (err) {
    console.error('Error al hacer scroll:', err);
  }
}
}
