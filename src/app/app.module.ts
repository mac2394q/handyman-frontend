import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroServicioComponent } from './components/registro-servicio/registro-servicio.component';
import { CalculadoraHorasComponent } from './components/calculadora-horas/calculadora-horas.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';

import { ServicioService } from './services/servicio.service';
import { TecnicoService } from './services/tecnico.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistroServicioComponent,
    CalculadoraHorasComponent,
    NavigationComponent,
    SidebarMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ServicioService,
    TecnicoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
