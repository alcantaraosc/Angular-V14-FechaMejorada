import { Component, Inject, OnInit } from '@angular/core';
import { AccesodatostiposexoService } from 'src/app/_services/accesodatostiposexo.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { tipoSexo } from 'src/app/_models/tipoSexo';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-modaltiposexo',
  templateUrl: './modaltiposexo.component.html',
  styleUrls: ['./modaltiposexo.component.css']
})
export class ModaltiposexoComponent implements OnInit {

  tipoSexoForm: FormGroup;
  dataTipoSexo: tipoSexo;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,


    public accesoDatosTiposexo: AccesodatostiposexoService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModaltiposexoComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: tipoSexo,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {

  }
  //al iniciar el componente
  ngOnInit(): void {


    this.textBotonGuardar = this.data.tipoSexoID === 0 ? 'Guardar' : 'Actualizar';

    //usando el servicio formBuilder
    this.tipoSexoForm = this.formBuilder.group({
      tipoSexoID: [this.data.tipoSexoID, Validators.required],
      nombreSexo: [this.data.nombreSexo, Validators.required],
      activo: [this.data.activo, Validators.required],
      userIDCreacion: [this.data.userIDCreacion, Validators.required],
      fechaCreacion: [this.data.fechaCreacion, Validators.required],
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion

    });


    this.app.desactivarCargando();
  }
  //cerar
  onClose() {
    this.dialogRef.close();
  }

  get f() { return this.tipoSexoForm.controls }

  onGuardar() {

    //validar los textbox
    if (!this.tipoSexoForm.invalid) {
      let dataTipoSexo: tipoSexo = {
        tipoSexoID : this.f['tipoSexoID'].value,
        nombreSexo: this.f['nombreSexo'].value,
        activo: this.f['activo'].value,
        userIDCreacion: this.data.userIDCreacion,
        fechaCreacion: this.data.fechaCreacion,
        userIDModificacion: this.data.userIDModificacion,
        fechaModificacion: this.data.fechaModificacion
      }

      if (this.f['tipoSexoID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los Datos Tipo Sexo?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataTipoSexo);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos Tipo Sexo ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataTipoSexo);
      }
    }
  }
  //llamar el servicio Guardar
  ServicioGuardar(dataTipoSexo: tipoSexo): void {

    this.accesoDatosTiposexo.insertTipoSexo(dataTipoSexo).subscribe((response: responseModel) => {

      if (response.exito === 1) {
        this.app.desactivarCargando();
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
  ServicioActualizar(dataTipoSexo: tipoSexo): void {
  
    this.accesoDatosTiposexo.updateTipoSexo(dataTipoSexo.tipoSexoID, dataTipoSexo).subscribe((response: responseModel) => {
      if (response.exito === 1) {
        this.app.desactivarCargando();
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
    if ((this.data.tipoSexoID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.tipoSexoForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }

}

