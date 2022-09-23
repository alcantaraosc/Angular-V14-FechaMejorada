import { Component, Inject, OnInit } from '@angular/core';
import { AccesodatosmotivosService } from 'src/app/_services/accesodatosmotivos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { motivo } from 'src/app/_models/motivo';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';
//import { parse } from 'path';


@Component({
  selector: 'app-modalmotivo',
  templateUrl: './modalmotivo.component.html',
  styleUrls: ['./modalmotivo.component.css']
})
export class ModalmotivoComponent implements OnInit {

  MotivoForm: FormGroup;
  dataMotivo: motivo;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoMotivo: AccesodatosmotivosService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalmotivoComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: motivo,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {

  }

  //al iniciar el componente
  ngOnInit(): void {
    //asignar los datos
    this.dataMotivo = this.data
    this.textBotonGuardar = this.data.motivoID === 0 ? 'Guardar' : 'Actualizar';
    //usando el servicio formBuilder
    this.MotivoForm = this.formBuilder.group({
      motivoID: [this.data.motivoID, Validators.required],
      nombreMotivo: [this.data.nombreMotivo, Validators.required],
      departamento: [this.data.departamento, Validators.required],
      tipo: this.data.tipo,
      activo: [this.data.activo, Validators.required],
      userIDCreacion: this.data.userIDCreacion,
      fechaCreacion: this.data.fechaCreacion,
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion
    });

    this.app.desactivarCargando();
  }

  //cerrar
  onClose() {
    this.dialogRef.close();
  }

  get f() { return this.MotivoForm.controls }

  onGuardar() {

    //validar los textbox
    if (!this.MotivoForm.invalid) {
      let dataMotivo: motivo = {
        "motivoID": this.f['motivoID'].value,
        "nombreMotivo": this.f['nombreMotivo'].value,
        "departamento": parseInt(this.f['departamento'].value),
        "tipo": parseInt(this.f['tipo'].value),
        "activo": this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

      if (this.f['motivoID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los datos de tipo motivo ?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataMotivo);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos de tipo motivo?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataMotivo);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataMotivo: motivo): void {

    this.accesoMotivo.insertmotivo(dataMotivo).subscribe((response: responseModel) => {
      if (response.exito === 1) {
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        this.onClose();
      }
      else {
        this.app.desactivarCargando();
        this.notificationService.warn(response.mensaje);
      }
    }, (dataError: HttpErrorResponse) => {
      this.app.desactivarCargando();
      if (dataError.status == 404) {
        alert(dataError["mensaje"]);
      } else {
        console.log(dataError);
      }
    });
  }
  //llamar al servicio actualizar
  ServicioActualizar(dataMotivo: motivo): void {

    this.accesoMotivo.updateMotivo(dataMotivo.motivoID, dataMotivo).subscribe((response: any) => {
      if (response.exito === 1) {
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        this.onClose();
      }
      else {
        this.app.desactivarCargando();
        this.notificationService.warn(response.mensaje);
      }
    }, (dataError: HttpErrorResponse) => {
      this.app.desactivarCargando();
      if (dataError.status == 404) {
        alert(dataError["mensaje"]);
      } else {
        console.log(dataError);
      }
    });
  }

  validarStatuActivo() {
    
    if ((this.data.motivoID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.MotivoForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }

}
