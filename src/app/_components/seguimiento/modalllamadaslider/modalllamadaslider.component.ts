import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import * as moment from 'moment';
import { llamadasLider } from 'src/app/_models/llamadasLider';
import { responseModel } from 'src/app/_models/responseModel';
import { AccesollamadasliderService } from 'src/app/_services/accesollamadaslider.service';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-modalllamadaslider',
  templateUrl: './modalllamadaslider.component.html',
  styleUrls: ['./modalllamadaslider.component.css']
})
export class ModalllamadasliderComponent implements OnInit {

  textBotonGuardar: string = "Guardar";  
  frmGroupLlamadaLider: FormGroup; 
 
  //@ViewChild('selectListStatusOportunidad', { static: true }) selectListStatusOportunidad: ElementRef;

 
  //en esta variable me indica si el registro del cliente es nuevo o se esta editando
  isNuevaLlamadaVendedor: boolean;

  public fechaCreada: string;
  
  constructor(private datePipe: DatePipe,
    private appS: AppService,
    private accesoLlamadaLider: AccesollamadasliderService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalllamadasliderComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: llamadasLider,
    private formBuilder: FormBuilder, //){
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.appS.habilitarCargando();
   
    //var fecha1 = moment(this.data.fechaCreacion);
    //var fecha = fecha1.format('DD/MM/YYYY hh:mm:ss A')
    
    this.textBotonGuardar = (this.data.llamadaLiderID === 0 ) ? "Guardar" : "Actualizar";
     
    this.frmGroupLlamadaLider = this.formBuilder.group({

      llamadaLiderID: [this.data.llamadaLiderID,  Validators.required],
      oportunidadID: [this.data.oportunidadID,  Validators.required],
      comentarioLider: [this.data.comentarioLider,  Validators.required],
      revisado: [this.data.revisado,  Validators.required],
      idLlamada: [this.data.idLlamada,  Validators.required],
      proximaLlamadaLider: [this.data.proximaLlamadaLider,  Validators.required],   
      cantidadLlamadas: [this.data.cantidadLlamadas],
      nombreEstatusOportunidad: [this.data.nombreEstatusOportunidad]
    });



         
    this.appS.desactivarCargando();

    //asignar el tipoIdentificacionID
    //this.frmGroupOportunidad.get('tipoIdentificacionID').patchValue(this.data.tipoIdentificacionID.toString());
  }




  //seleccionar el vendedor de la lista
  /*onChangeVendedor(id: number) {

    this.accesoOportunidad.listarLideres(id).subscribe((response: responseModel) => {

      if (response.exito === 1) {
        this.listLideres = response.data;
      }
      else {
        this.notificationService.warn(response.mensaje);
      }

    }, (mensajeError: HttpErrorResponse) => {
      this.notificationService.warn(mensajeError.message);
    });

  }*/


  //seleccionar el modelo
  /*onChangeModelo(id: number) {

    this.accesoOportunidad.listarPmf(id).subscribe((response: responseModel) => {

      if (response.exito === 1) {
        this.listPmfVh = response.data;
      }
      else {
        this.notificationService.warn(response.mensaje);
      }

    }, (mensajeError: HttpErrorResponse) => {
      this.notificationService.warn(mensajeError.message);
    });

  }*/


  onGuardar(cerrarVentanaModal: boolean) {

    //let dataLlamadasVendedor:llamadasLider = this.frmGroupLlamadaLider.value;
    
    
    
    //validar los textbox  
    if (!this.frmGroupLlamadaLider.invalid) {

      //this.f.nombreStatusOportunidad.setValue(this.f.)
      let dataLlamadasLider: llamadasLider = {

        "llamadaLiderID": this.data.llamadaLiderID,
        "oportunidadID" : this.data.oportunidadID,
        "comentarioLider": this.f['comentarioLider'].value,
        "revisado": this.data.revisado,
        "idLlamada": this.data.idLlamada, 
        "proximaLlamadaLider": this.f['proximaLlamadaLider'].value,                                   
        "userIDCreacion": this.data.userIDCreacion, 
        "fechaCreacion": this.data.fechaCreacion,
        "nombreEstatusOportunidad": this.data.nombreEstatusOportunidad,   
      }
          
       
      if (this.data.llamadaLiderID === 0) {
        if (confirm('¿ Estas seguro de guardar el comentario del lider ?')) {

          this.ServicioGuardar(dataLlamadasLider, cerrarVentanaModal);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar ?')) {
        this.ServicioActualizar(dataLlamadasLider, cerrarVentanaModal);
      }

    }
    else {

      this.notificationService.warn("Existen campos vacios");
    }

  }


  //llamar el servicio Guardar
  ServicioGuardar(dataLider: llamadasLider, cerrarVentanaModal: boolean): void {

    this.accesoLlamadaLider.insertLlamadasLider(dataLider).subscribe((response: responseModel) => {
      //comprobar si fue exito ==1
      if (response.exito === 1) {
        //mostrar la notificacion exitoso
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        //obtener el valor de la oportunidad que se guardo en base de datos
        //ej.: 001271082258-2
        //this.data.oportunidadID = response.id;   
        //llamar al metodo para cerra la ventana modal
        this.onClose();
      }
      else {
        this.notificationService.warn(response.mensaje);
      }
    }, (dataError: HttpErrorResponse) => {
      if (dataError.status == 404) {
        alert(dataError["mensaje"]);
      } else {
        console.log(dataError);
      }

    });

  }


  //llamar al servicio actualizar
  ServicioActualizar(dataLlamadasLider: llamadasLider, cerrarVentanaModal: boolean): void {

    this.accesoLlamadaLider.updateLlamadasLider(dataLlamadasLider.llamadaLiderID, dataLlamadasLider).subscribe((response: any) => {
      //comprobar si fue exito ==1
      if (response.exito === 1) {
        //mostrar la notificacion exitoso
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        //llamar al metodo para cerra la ventana modal
         this.onClose();
      }
      else {
        this.notificationService.warn(response.mensaje);
      }
    }, (dataError: HttpErrorResponse) => {
      if (dataError.status == 404) {
        alert(dataError["mensaje"]);
      } else {
        console.log(dataError);
      }

    });

  }

  onClose() {
    this.dialogRef.close();
  }

  get f() { return this.frmGroupLlamadaLider.controls }


  getErrorMensage(field: string): string {
    let mensaje: string;
    if (this.frmGroupLlamadaLider.get(field).errors['required']) {
      mensaje = 'Nombre del campo requerido';
    }
    else if (this.frmGroupLlamadaLider.get(field).hasError('pattern')) {
      mensaje = 'Correo no valido';
    }

    return mensaje;
  }

  isValidField(field: string): boolean {
    return (
      (this.frmGroupLlamadaLider.get(field).touched || this.frmGroupLlamadaLider.get(field).dirty) &&
      !this.frmGroupLlamadaLider.get(field).valid
    );
  }

}
