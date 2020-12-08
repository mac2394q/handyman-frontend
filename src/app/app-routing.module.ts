import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculadoraHorasComponent } from './components/calculadora-horas/calculadora-horas.component';
import { RegistroServicioComponent } from './components/registro-servicio/registro-servicio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
    },
  {
    path: 'servicios',
    component: RegistroServicioComponent
  },
  {
    path: 'calculadora',
    component: CalculadoraHorasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
