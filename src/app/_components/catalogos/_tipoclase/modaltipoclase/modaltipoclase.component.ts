import { Component, Inject, OnInit } from '@angular/core';
import { AccesodatostipoclaseService } from 'src/app/_services/accesodatostipoclase.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { tipoClase } from 'src/app/_models/tipoClase';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-modaltipoclase',
  templateUrl: './modaltipoclase.component.html',
  styleUrls: ['./modaltipoclase.component.css']
})
export class ModaltipoclaseComponent implements OnInit {

  tipoClaseForm: FormGroup;
  dataTipoClase: tipoClase;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoTipoClase: AccesodatostipoclaseService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModaltipoclaseComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: tipoClase,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {

  }

  //al iniciar el componente
  ngOnInit(): void {
    //asignar los datos
    this.dataTipoClase = this.data
    this.textBotonGuardar = this.data.tipoClaseID === 0 ? 'Guardar' : 'Actualizar';
    //usando el servicio formBuilder
    this.tipoClaseForm = this.formBuilder.group({
      tipoClaseID: [this.data.tipoClaseID, Validators.required],
      nombreTipoClase: [this.data.nombreTipoClase, Validators.required],
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

  get f() { return this.tipoClaseForm.controls }

  onGuardar() {

    //validar los textbox
    if (!this.tipoClaseForm.invalid) {
      let dataTipoClase: tipoClase = {
        "tipoClaseID": this.f['tipoClaseID'].value,
        "nombreTipoClase": this.f['nombreTipoClase'].value,
        "activo": this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

      if (this.f['tipoClaseID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los datos de tipo clase ?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataTipoClase);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos de tipo clase?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataTipoClase);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataTipoClase: tipoClase): void {

    this.accesoTipoClase.insertTipoClase(dataTipoClase).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataTipoClase: tipoClase): void {

    this.accesoTipoClase.updateTipoClase(dataTipoClase.tipoClaseID, dataTipoClase).subscribe((response: any) => {
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
    
    if ((this.data.tipoClaseID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.tipoClaseForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }

}
