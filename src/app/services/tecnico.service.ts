import { Injectable } from '@angular/core';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Tecnico } from '../models/tecnico';
import { Observable } from 'rxjs'

const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  API_URI = 'http://localhost:8083/api';

  constructor(private http: HttpClient) { }

  validarDocumento( identificacion_tecnico: string ): Observable<any> {
    return this.http.get<any>(  '/api/verificarTecnico/' + identificacion_tecnico );
  }


}
