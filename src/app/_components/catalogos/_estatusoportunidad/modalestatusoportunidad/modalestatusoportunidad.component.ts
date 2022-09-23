import { Component, Inject, OnInit } from '@angular/core';
import { AccesoestatusoportunidadService } from 'src/app/_services/accesoestatusoportunidad.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { estatusOportunidad } from 'src/app/_models/estatusOportunidad';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';


@Component({
  selector: 'app-modalestatusoportunidad',
  templateUrl: './modalestatusoportunidad.component.html',
  styleUrls: ['./modalestatusoportunidad.component.css']
})
export class ModalestatusoportunidadComponent implements OnInit {

  estatusOportunidadForm: FormGroup;
  dataEstatusOportunidad: estatusOportunidad;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoEstatusOportunidad: AccesoestatusoportunidadService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalestatusoportunidadComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: estatusOportunidad,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
  }

  //al iniciar el componente 
  ngOnInit(): void {
    //asignar los datos
    this.dataEstatusOportunidad = this.data
    this.textBotonGuardar = this.data.estatusOportunidadID === 0 ? 'Guardar' : 'Actualizar';
    //usando el servicio formBuilder
    this.estatusOportunidadForm = this.formBuilder.group({
      estatusOportunidadID: [this.data.estatusOportunidadID, Validators.required],
      nombreEstatusOportunidad: [this.data.nombreEstatusOportunidad, Validators.required],
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
  get f() { return this.estatusOportunidadForm.controls }

  onGuardar() {

    //validar los textbox
    if (!this.estatusOportunidadForm.invalid) {
      let dataEstatusOportunidad: estatusOportunidad = {
        "estatusOportunidadID": this.f['estatusOportunidadID'].value,        
        "nombreEstatusOportunidad": this.f['nombreEstatusOportunidad'].value,
        "activo": this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }    

      if (this.f['estatusOportunidadID'].value=== 0) {
        if (confirm('¿ Estas seguro de guardar los Datos del Estatus Oportunidad?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataEstatusOportunidad);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos Estatus Oportunidad ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataEstatusOportunidad);
      }
    }
  }
  //llamar el servicio Guardar
  ServicioGuardar(dataEstatusOportunidad: estatusOportunidad): void {
    this.accesoEstatusOportunidad.insertEstatusOportunida(dataEstatusOportunidad).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataEstatusOportunidad: estatusOportunidad): void {
    this.accesoEstatusOportunidad.updateEstatusOportunida(dataEstatusOportunidad.estatusOportunidadID, dataEstatusOportunidad).subscribe((response: any) => {
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
    if ((this.data.estatusOportunidadID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.estatusOportunidadForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }
}