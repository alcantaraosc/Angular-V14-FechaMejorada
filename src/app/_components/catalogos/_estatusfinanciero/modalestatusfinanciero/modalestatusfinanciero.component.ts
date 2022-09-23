import { Component, Inject, OnInit } from '@angular/core';
import { AccesoestatusfinancieroService } from 'src/app/_services/accesoestatusfinanciero.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { estatusFinanciero } from 'src/app/_models/estatusFinanciero';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-modalestatusfinanciero',
  templateUrl: './modalestatusfinanciero.component.html',
  styleUrls: ['./modalestatusfinanciero.component.css']
})
export class ModalestatusfinancieroComponent implements OnInit {

  statusfinancieroForm: FormGroup;
  dataStatusFinanciero: estatusFinanciero;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoDatosEstatusFinanc: AccesoestatusfinancieroService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalestatusfinancieroComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: estatusFinanciero,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
  }

  //al iniciar el componente
  ngOnInit(): void {

    this.textBotonGuardar = this.data.estatusFinancieroID === 0 ? 'Guardar' : 'Actualizar';

    //usando el servicio formBuilder
    this.statusfinancieroForm = this.formBuilder.group({
      estatusFinancieroID: [this.data.estatusFinancieroID, Validators.required],
      nombreEstatusFinanciero: [this.data.nombreEstatusFinanciero, Validators.required],
      activo: [this.data.activo, Validators.required],
      userIDCreacion: this.data.userIDCreacion,
      fechaCreacion: this.data.fechaCreacion,
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion

    });

    this.app.desactivarCargando();
  }


  onGuardar() {

    //validar los textbox
    if (!this.statusfinancieroForm.invalid) {

      let dataStatusFinanciero: estatusFinanciero = {
        "estatusFinancieroID": this.f['estatusFinancieroID'].value,
        "nombreEstatusFinanciero": this.f['nombreEstatusFinanciero'].value,
        "activo": this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

      //console.log(dataStatusFinanciero.activo);
      //console.log(dataStatusFinanciero);

      if (this.f['estatusFinancieroID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los Datos del Estatus Financiero?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataStatusFinanciero);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos del Estatus Financiero ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataStatusFinanciero);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataStatusFinanciero: estatusFinanciero): void {

    this.accesoDatosEstatusFinanc.InsertEstatusFinanc(dataStatusFinanciero).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataStatusFinanciero: estatusFinanciero): void {

    this.accesoDatosEstatusFinanc.UpdateEstatusFinanc(dataStatusFinanciero.estatusFinancieroID, dataStatusFinanciero).subscribe((response: any) => {
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

  //cerrar
  onClose() {
    this.dialogRef.close();
  }

  get f() { return this.statusfinancieroForm.controls }
  //*************
  validarStatuActivo() {
    if ((this.data.estatusFinancieroID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.statusfinancieroForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }
}
