import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PerfilComponent} from './perfil/perfil.component'

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'miPerfil',
    component: PerfilComponent,
    data: {
      title: `perfil`
    }
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class perfilUsuariosRoutingModule {


}

