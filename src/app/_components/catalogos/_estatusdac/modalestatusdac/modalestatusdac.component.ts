import { Component, Inject, OnInit } from '@angular/core';
import { AccesoestatusdacService } from 'src/app/_services/accesoestatusdac.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';
import { Estatusdac } from 'src/app/_models/estatusDac';


@Component({
  selector: 'app-modalestatusdac',
  templateUrl: './modalestatusdac.component.html',
  styleUrls: ['./modalestatusdac.component.css']
})
export class ModalestatusdacComponent implements OnInit {

  estatusdacForm: FormGroup;
  dataEstatusDac: Estatusdac ;  
  textBotonGuardar: string; 
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoestatusdac: AccesoestatusdacService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalestatusdacComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: Estatusdac,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
  }

  //al iniciar el componente
  ngOnInit(): void {

    //asignar los datos
    this.dataEstatusDac = this.data
    this.textBotonGuardar = this.data.estatusDacID === 0 ? 'Guardar' : 'Actualizar';

    //usando el servicio formBuilder
    this.estatusdacForm = this.formBuilder.group({
      estatusDacID: [this.data.estatusDacID, Validators.required],
      nombreEstatusDac: [this.data.nombreEstatusDac, Validators.required],
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

  get f() { return this.estatusdacForm.controls }

  onGuardar() {

    //validar los textbox
    if (!this.estatusdacForm.invalid) {
      let dataEstatusDac: Estatusdac = {
        "estatusDacID": this.f['estatusDacID'].value,
        "nombreEstatusDac": this.f['nombreEstatusDac'].value,
        "activo": this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

      if (this.f['estatusDacID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los Datos de Estatus Dac ?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataEstatusDac);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos de Estatus Dac  ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataEstatusDac);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataEstatusDac: Estatusdac): void {
    //llamar al servicio para guardar
    this.accesoestatusdac.insertEstatusDac(dataEstatusDac).subscribe((response: responseModel) => {
      if (response.exito === 1) {
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        this.onClose()
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
  ServicioActualizar(dataEstatusDac: Estatusdac): void {

    this.accesoestatusdac.updateEstatusDac(dataEstatusDac.estatusDacID, dataEstatusDac).subscribe((response: any) => {
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
    if ((this.data.estatusDacID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.estatusdacForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }
}