import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../common/services/login.service'; // Asegúrate de importar el servicio correctamente


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoginVisible  = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorLogIn:string=""
  errorRegistro:string="";

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    // Inicializa los formularios
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });
  }
   toggleForms() {
  this.isLoginVisible=!this.isLoginVisible
}

login(): void {
  console.log(this.loginForm.valid)
  console.log(this.loginForm.value)
  if (this.loginForm.valid) {
    console.log("entra")
    const { email, password } = this.loginForm.value;
    this.loginService.SignIn(email, password).subscribe(response => {
      // Manejar la respuesta de login
      if (response.status == '200') {
        this.errorLogIn=""
        //this.loginService.closeDialog()
        // Redirigir o manejar sesión
      } else {
        // Manejar error de login
       this.errorLogIn=response.message;
      }
    });
  }  else{
    console.log("es else")
    this.errorLogIn="Email y contraseña requeridos"}

}

register(): void {
  if (this.registerForm.valid) {
    const { email, password } = this.registerForm.value;
    this.loginService.Registraese(email, password).subscribe(response => {
      // Manejar la respuesta de registro
      if (response.status == '200') {
        this.errorRegistro=""
        //this.loginService.closeDialog()
       } else {
        // Manejar error de registro
        this.errorRegistro=response.message
      }
    });
  }
  else{
        this.errorRegistro="Email y contraseña requeridos"
      }
}



}
