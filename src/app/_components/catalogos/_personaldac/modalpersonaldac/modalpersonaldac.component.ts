import { Component, Inject, OnInit } from '@angular/core';
import {AccesopersonaldacService } from 'src/app/_services/accesopersonaldac.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { PersonalDac } from 'src/app/_models/personaldac';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';


@Component({
  selector: 'app-modalpersonaldac',
  templateUrl: './modalpersonaldac.component.html',
  styleUrls: ['./modalpersonaldac.component.css']
})
export class ModalpersonaldacComponent implements OnInit {

  personalDacForm: FormGroup;
  dataPersonalDac: PersonalDac;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoPersonalDac: AccesopersonaldacService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalpersonaldacComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: PersonalDac,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {

  }

    //al iniciar el componente
    ngOnInit(): void {
      //asignar los datos
      this.dataPersonalDac = this.data
      this.textBotonGuardar = this.data.personalDacID === 0 ? 'Guardar' : 'Actualizar';
      //usando el servicio formBuilder
      this.personalDacForm = this.formBuilder.group({
        personalDacID: [this.data.personalDacID, Validators.required],
        nombrePersonalDac: [this.data.nombrePersonalDac, Validators.required],
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
  
    get f() { return this.personalDacForm.controls }
  
    onGuardar() {
  
      //validar los textbox
      if (!this.personalDacForm.invalid) {
        let dataPersonalDac: PersonalDac = {
          "personalDacID": this.f['personalDacID'].value,
          "nombrePersonalDac": this.f['nombrePersonalDac'].value,
          "activo": this.f['activo'].value,
          "userIDCreacion": this.data.userIDCreacion,
          "fechaCreacion": this.data.fechaCreacion,
          "userIDModificacion": this.data.userIDModificacion,
          "fechaModificacion": this.data.fechaModificacion
        }
  
        if (this.f['personalDacID'].value === 0) {
          if (confirm('¿ Estas seguro de guardar los datos de PersonalDac ?')) {
            this.app.habilitarCargando();
            this.ServicioGuardar(dataPersonalDac);
          }
        }
        else if (confirm('¿ Estas seguro de actualizar los datos de PersonalDac?')) {
          this.app.habilitarCargando();
          this.ServicioActualizar(dataPersonalDac);
        }
      }
    }
  
    //llamar el servicio Guardar
    ServicioGuardar(dataPersonalDac: PersonalDac): void {
  
      this.accesoPersonalDac.InsertPersonalDac(dataPersonalDac).subscribe((response: responseModel) => {
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
    ServicioActualizar(dataPersonalDac: PersonalDac): void {
  
      this.accesoPersonalDac.UpdatePersonalDac(dataPersonalDac.personalDacID, dataPersonalDac).subscribe((response: any) => {
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
      
      if ((this.data.personalDacID === 0) && (this.f['activo'].value)) {
        //establecer true
        this.personalDacForm.get('activo').patchValue(false);
        this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
      }
    }

}
