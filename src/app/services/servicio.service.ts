import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servicios  } from '../models/servicios';
import { Reporte } from '../models/reporte';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  API_URI = 'http://localhost:8083/api';

  constructor(private http: HttpClient) { }

  registrarServicio(servicio: Servicios){
    return this.http.post<any>(this.API_URI + '/registrarServicio',servicio);
  }

  generarReporte(reporte: Reporte){
    return this.http.post<any>(this.API_URI + '/reporteHoras',reporte);
  }

}
