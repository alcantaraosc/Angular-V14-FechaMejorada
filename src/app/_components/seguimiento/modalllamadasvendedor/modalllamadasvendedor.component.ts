import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

//import * as moment from 'moment';
import { estatusOportunidad } from 'src/app/_models/estatusOportunidad';
import { llamadasVendedor } from 'src/app/_models/llamadasVendedor';
import { responseModel } from 'src/app/_models/responseModel';
import { AccesollamadasvendedorService } from 'src/app/_services/accesollamadasvendedor.service';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';


/*export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};*/

@Component({
  selector: 'app-modalllamadasvendedor',
  templateUrl: './modalllamadasvendedor.component.html',
  styleUrls: ['./modalllamadasvendedor.component.css']
})
export class ModalllamadasvendedorComponent implements OnInit {
  textBotonGuardar: string = "Guardar";
  frmGroupLlamadaVendedor: FormGroup;
  listEstatusOportunidad: estatusOportunidad[];
  @ViewChild('selectListStatusOportunidad', { static: true }) selectListStatusOportunidad: ElementRef;

  @Output() change: EventEmitter<MatRadioChange>

  //mrChange: MatRadioChange;

  //en esta variable me indica si el registro del cliente es nuevo o se esta editando
  isNuevaLlamadaVendedor: boolean = false;
  //deshabilitar y activar los combox drownList.
  public isDisabledSelecccion: boolean = false;
  public fechaCreada: string = "";

  /*
    onChange(mrChange: MatRadioChange) {
      console.log(mrChange.value);
      let mrButton: MatRadioButton = mrChange.source;
      console.log(mrButton.name);
      console.log(mrButton.checked);
      console.log(mrButton.inputId);
   }*/

  //@ViewChild('inputFechaCreacion', { static: true }) inputFechaCreacion: ElementRef;


  constructor(private datePipe: DatePipe,
    private appS: AppService,
    private accesoLlamadaVendedor: AccesollamadasvendedorService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalllamadasvendedorComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: llamadasVendedor,
    private formBuilder: FormBuilder, //){
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.appS.habilitarCargando();
    //this.getValueBoolVisita(dataLlamadasVendedor);

    this.textBotonGuardar = (this.data.llamadaVendedorID === 0) ? "Guardar" : "Actualizar";

    //primero llenar los DrownList de la oportunidades
    this.llenarDrownList(this.data);

    this.frmGroupLlamadaVendedor = this.formBuilder.group({
        llamadaVendedorID: [this.data.llamadaVendedorID.toString(), Validators.required],
        oportunidadID: [this.data.oportunidadID, Validators.required],
        comentarioVendedor: [this.data.comentarioVendedor, Validators.required],
        revisado: [this.data.revisado, Validators.required],
        idLlamada: [this.data.idLlamada, Validators.required],
        proximaLlamadaVendedor: [this.data.proximaLlamadaVendedor, Validators.required],
        estatusOportunidadID: [this.data.estatusOportunidadID.toString(), Validators.required],
        nombreStatusOportunidad: [this.data.nombreStatusOportunidad, Validators.required],
        comentarioLider: [this.data.comentarioVendedor],
        /* visita: [this.data.visita,  Validators.required ],
        llamada: [this.data.llamada,  Validators.required],
        avaluo:[this.data.avaluo,  Validators.required],
        correo:[this.data.correo,  Validators.required],*/
        cantidadLlamadas: [this.data.cantidadLlamadas],
        importancia: [this.data.importancia, Validators.required],
        userIDCreacion: [this.data.userIDCreacion, Validators.required],
        fechaCreacion: [this.data.fechaCreacion, Validators.required],
        titulo: [this.data.titulo],
        notificationType: this.getValueBoolVisita(this.data)
    });


    this.appS.desactivarCargando();

    //asignar el tipoIdentificacionID
    //this.frmGroupOportunidad.get('tipoIdentificacionID').patchValue(this.data.tipoIdentificacionID.toString());
  }



  //llenar los drownList
  llenarDrownList(data: llamadasVendedor) {

      //llamar al servicio para llenar el drownList de cada oportunidad    
      this.accesoLlamadaVendedor.listarDrownListEstatusOportunidad().subscribe({

        next: (response: responseModel) => {
          //comprobar si fue exito
          if (response.exito === 1) {
            this.listEstatusOportunidad = response.data;
          }
          else {
            this.notificationService.warn(response.mensaje);
          }
        },

        error: (mensajeError: HttpErrorResponse) => {
          this.notificationService.warn(mensajeError.message);
        }
      });
  }

  get notificationType() {
    return this.frmGroupLlamadaVendedor.get('notificationType');
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

  /*
    onChangePoseeVh(id: string) {

    this.frmGroupOportunidad.get('poseeVhValorString').valueChanges.subscribe(
      valor => {


        if (valor === "Si") {
          //deshabilitar la seleccion
          this.isDisabledSelecccion = false;
          this.f.leInteresaAvaluoValorString.setValue("Si");
          this.f.anoModelo.setValue("2010 O MAYOR");
          this.f.realizoAvaluoValorString.setValue("No");
          this.f.aplicaAvaluoValorString.setValue("No");
          //this.f.modeloVHquePosee.setValue("");
          this.frmGroupOportunidad.controls['leInteresaAvaluoValorString'].enable();
          this.frmGroupOportunidad.controls['anoModelo'].enable();
          this.frmGroupOportunidad.controls['realizoAvaluoValorString'].enable();          
          this.frmGroupOportunidad.controls['modeloVHquePosee'].enable();
          this.frmGroupOportunidad.controls['aplicaAvaluoValorString'].enable();


        }
        else if (valor === "No") {
          //deshabilitar la seleccion
          this.isDisabledSelecccion = true;
          this.f.leInteresaAvaluoValorString.setValue("No");
          this.f.anoModelo.setValue("2010 O MAYOR");
          this.f.realizoAvaluoValorString.setValue("No");
          this.f.modeloVHquePosee.setValue("");                         
          this.f.aplicaAvaluoValorString.setValue("No");
          this.frmGroupOportunidad.controls['leInteresaAvaluoValorString'].disable();
          this.frmGroupOportunidad.controls['anoModelo'].disable();
          this.frmGroupOportunidad.controls['realizoAvaluoValorString'].disable();          
          this.frmGroupOportunidad.controls['modeloVHquePosee'].disable();
          this.frmGroupOportunidad.controls['aplicaAvaluoValorString'].disable();


          //this.frmGroupOportunidad.enable();


        }

      }
    )
  }
  */



  private setValueBoolVisitas(dataLlamadasVendedor: llamadasVendedor): void {
    //actualizar los radio button
    dataLlamadasVendedor.visita = false;
    dataLlamadasVendedor.llamada = false;
    dataLlamadasVendedor.avaluo = false;
    dataLlamadasVendedor.correo = false;

    if (this.notificationType.value === 'visita') {
      dataLlamadasVendedor.visita = true;
    }
    else if (this.notificationType.value === 'llamada') {
      dataLlamadasVendedor.llamada = true;
    }
    else if (this.notificationType.value === 'avaluo') {
      dataLlamadasVendedor.avaluo = true;
    }
    else if (this.notificationType.value === 'correo') {
      dataLlamadasVendedor.correo = true;
    }
  }


  private getValueBoolVisita(dataLlamadasVendedor: llamadasVendedor): string {
    let vueVisita: string = '';

    if (dataLlamadasVendedor.visita) {
      vueVisita = 'visita';
    }
    else if (dataLlamadasVendedor.llamada) {
      vueVisita = 'llamada';
    }
    else if (dataLlamadasVendedor.avaluo) {
      vueVisita = 'avaluo';
    }
    else if (dataLlamadasVendedor.correo) {
      vueVisita = 'correo';
    }

    return vueVisita;
  }

  onGuardar(cerrarVentanaModal: boolean) {

    //let dataLlamadasVendedor:llamadasVendedor = this.frmGroupLlamadaVendedor.value;

    //validar los textbox  
    if (!this.frmGroupLlamadaVendedor.invalid) {

      //this.f.nombreStatusOportunidad.setValue(this.f.)
      let dataLlamadasVendedor: llamadasVendedor = {

        "llamadaVendedorID": this.data.llamadaVendedorID,
        "oportunidadID": this.data.oportunidadID,
        "comentarioVendedor": this.f['comentarioVendedor'].value,
        "revisado": this.data.revisado,
        "idLlamada": this.data.idLlamada,
        "proximaLlamadaVendedor": this.f['proximaLlamadaVendedor'].value,
        "estatusOportunidadID": parseInt(this.f['estatusOportunidadID'].value),
        "nombreStatusOportunidad": this.data.nombreStatusOportunidad,
        "visita": this.data.visita,
        "llamada": this.data.llamada,
        "avaluo": this.data.avaluo,
        "correo": this.data.correo,
        "importancia": this.f['importancia'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion
      }

      this.setValueBoolVisitas(dataLlamadasVendedor);

      if (this.data.llamadaVendedorID === 0) {
        if (confirm('¿ Estas seguro de guardar el comentario del vendedor ?')) {

          this.ServicioGuardar(dataLlamadasVendedor, cerrarVentanaModal);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar ?')) {
        this.ServicioActualizar(dataLlamadasVendedor, cerrarVentanaModal);
      }

    }
    else {

      this.notificationService.warn("Existen campos vacios");
    }

  }


  //llamar el servicio Guardar
  ServicioGuardar(dataVendedor: llamadasVendedor, cerrarVentanaModal: boolean): void {

    this.appS.habilitarCargando();
    this.accesoLlamadaVendedor.insertLlamadasVendedor(dataVendedor).subscribe({

      next: (response: responseModel) => {
        this.appS.desactivarCargando();
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

      },

      error: (dataError: HttpErrorResponse) => {
        this.appS.desactivarCargando();
        if (dataError.status == 404) {
          alert(dataError["mensaje"]);
        } else {
          console.log(dataError);
        }
      }

    });
  }


  //llamar al servicio actualizar
  ServicioActualizar(dataLlamadasVendedor: llamadasVendedor, cerrarVentanaModal: boolean): void {

    this.accesoLlamadaVendedor.updateLlamadasVendedor(dataLlamadasVendedor.llamadaVendedorID, dataLlamadasVendedor).subscribe((response: any) => {
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
        alert(dataError["mensaje"].toString());
      } else {
        console.log(dataError);
      }

    });

  }

  onClose() {
    this.dialogRef.close();
  }

  get f() { return this.frmGroupLlamadaVendedor.controls }


  getErrorMensage(field: string): string {
    let mensaje: string;
    if (this.frmGroupLlamadaVendedor.get(field).errors['required']) {
      mensaje = 'Nombre del campo requerido';
    }
    else if (this.frmGroupLlamadaVendedor.get(field).hasError('pattern')) {
      mensaje = 'Correo no valido';
    }

    return mensaje;
  }


  isValidField(field: string): boolean {
    return (
      (this.frmGroupLlamadaVendedor.get(field).touched || this.frmGroupLlamadaVendedor.get(field).dirty) &&
      !this.frmGroupLlamadaVendedor.get(field).valid
    );
  }

}
