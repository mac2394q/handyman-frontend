import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Tecnico } from 'src/app/models/tecnico';
import { Servicios } from 'src/app/models/servicios';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ServicioService } from 'src/app/services/servicio.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-registro-servicio',
  templateUrl: './registro-servicio.component.html',
  styleUrls: ['./registro-servicio.component.css']
})
export class RegistroServicioComponent implements OnInit {

  documentoTecnico = '';
  desactivarBoton: boolean;
  desactivarInputs: boolean;
  desactivarInputs2: boolean;
  fechaInicio: string;
  fechaFin: string;
  nombreTecnico: string;

  objServicio:  Servicios = {
    identificacion_tecnico: '',
    fecha_inicio: '',
    fecha_fin: ''
  };

  alertGuardar: boolean;
  alertError: boolean;
  alertValidacion: boolean;
  status = '1';




  constructor(
    private servicios: ServicioService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private tecnico: TecnicoService) { }

  ngOnInit(): void {
    this.desactivarBoton = true;
    this.desactivarInputs = true;
    this.desactivarInputs2 = true;

    this.alertGuardar = false;
    this.alertError = false;
    this.alertValidacion = false;
  }


  validacion_documento() {

    this.tecnico.validarDocumento(this.documentoTecnico).subscribe(
      res => {
        console.log(res);
        if (res.status == '1') {
          this.desactivarBoton = false;
          this.desactivarInputs = false;
          this.desactivarInputs2 = false;
          this.nombreTecnico = JSON.parse(res.data).nombre_completo;

          console.log(this.documentoTecnico + " " + this.fechaInicio + " " + this.fechaFin);
          //swal('Gracias por su pago oportuno.', 'Su nuevo saldo es $000', 'success');

        } else {
          this.desactivarBoton = true;
          var form = document.getElementById('needs-validation');
          this.alertValidacion = true;
        }
      },
      err => {
        console.error(err);
        document.getElementById('needs-validation').classList.add('was-validated');
        this.desactivarBoton = true;
        this.alertValidacion = true;
      }
    );
  }

  registrarServicio() {


    if (typeof this.fechaInicio != 'undefined' || this.fechaInicio != '') {

      swal({
        title: "Registrar Servicio",
        text: "Esta seguro de registrar el servicio ?",
        icon: "success",
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {


            this.objServicio.fecha_inicio = this.fechaInicio;
            this.objServicio.fecha_fin = this.fechaFin;
            this.objServicio.identificacion_tecnico = this.documentoTecnico;

            this.servicios.registrarServicio( this.objServicio).subscribe(
              res => {
                console.log(res);
                if(res.status == 1){
                  swal(res.message+'', 'success');
                }else{
                  swal(res.message+'', 'danger');
                }

              },
              err => {
                console.error(err);

              }
            );

          }
        });

    } else {
      swal('Error', 'Ha ocurrido un error en el registro del servicio.', 'success');
    }




  }


  closeAlertGuardar() {
    document.getElementById('AlertGuardar').classList.remove('show');
  }

  closeAlertError() {
    document.getElementById('AlertGuardar').classList.remove('show');
  }

  closeAlertValidacion() {
    document.getElementById('AlertValidacion').classList.remove('show');
  }

}
