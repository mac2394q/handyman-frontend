import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { Servicios } from 'src/app/models/servicios';
import { Reporte } from 'src/app/models/reporte';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ServicioService } from 'src/app/services/servicio.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-calculadora-horas',
  templateUrl: './calculadora-horas.component.html',
  styleUrls: ['./calculadora-horas.component.css']
})
export class CalculadoraHorasComponent implements OnInit {
  semanasAno = 521429;
  semanaActual = this.getWeekNr();
  seleccion = 1;
  validacionReporte : boolean;
  alertValidacion: boolean;
  documentoTecnico = '';
  objReporte:  Reporte = {
    identificacion_tecnico: '',
    semana: 0
  };

  horasDiurnas = 0;
  horasNocturnas = 0;
  horaDominicales = 0;
  horasDiurnaExtra = 0;
  horasNocturnaExtra = 0;
  horaDominicalesExtra = 0;

  constructor(private servicios: ServicioService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private tecnico: TecnicoService) { }
  ngOnInit(): void {
    this.semanaActual = this.getWeekNr();
    this.validacionReporte = false;
    this.alertValidacion = false;
  }
  getWeekNr() {
    var now = new Date(), i = 0, f, sem = (new Date(now.getFullYear(), 0, 1).getDay() > 0) ? 1 : 0;
    while ((f = new Date(now.getFullYear(), 0, ++i)) < now) {
      if (!f.getDay()) {
        sem++;
      }
    }
    return sem;
  }
  generarReporte(){
    if (this.documentoTecnico.length > 0) {
      swal({
        title: 'Generar reporte',
        text: 'Esta seguro que desea generar el reporte con los datos ingresados ?',
        icon: 'success',
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            this.objReporte.identificacion_tecnico = this.documentoTecnico;
            this.objReporte.semana = this.seleccion;
            this.servicios.generarReporte(this.objReporte).subscribe(
              res => {
                console.log(res);
                if (res.status == 1){
                  this.validacionReporte = true;
                  this.horasDiurnas = JSON.parse(res.data).horaDiurna;
                  this.horasNocturnas = JSON.parse(res.data).horaNocturna;
                  this.horaDominicales = JSON.parse(res.data).horaDominicales;
                  this.horasDiurnaExtra = JSON.parse(res.data).horasDiurnaExtra;
                  this.horasNocturnaExtra = JSON.parse(res.data).horasNocturnaExtra;
                  this.horaDominicalesExtra = JSON.parse(res.data).horaDominicalesExtra;
                }else{
                  swal(res.message + '', 'danger');
                  this.alertValidacion = true;
                }
              },
              err => {
                console.error(err);
              }
            );
          }
        });
    } else {
      swal('Error', 'El campo documento no debe estar vacio!', 'success');
    }
  }

  closeAlertValidacion() {
    document.getElementById('AlertValidacion').classList.remove('show');
  }

}
