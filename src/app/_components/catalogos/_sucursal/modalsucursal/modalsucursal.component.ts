import { Component, Inject, OnInit } from '@angular/core';
import { AccesodatossucursalService } from 'src/app/_services/accesodatossucursal.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { sucursal } from 'src/app/_models/sucursal';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';


@Component({

    
  selector: 'app-modalsucursal',
  templateUrl: './modalsucursal.component.html',
  styleUrls: ['./modalsucursal.component.css']
})
export class ModalsucursalComponent implements OnInit {

  sucursalForm: FormGroup;
  dataSucursal: sucursal;  
  textBotonGuardar: string; 
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoDatosSucursal: AccesodatossucursalService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalsucursalComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: sucursal,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {

  }
  
  //al iniciar el componente
  ngOnInit(): void {

    //asignar los datos
    this.dataSucursal = this.data
    this.textBotonGuardar = this.data.sucursalID === 0 ? 'Guardar' : 'Actualizar';

    //usando el servicio formBuilder
    this.sucursalForm = this.formBuilder.group({
      sucursalID: [this.data.sucursalID, Validators.required],
      nombreSucursal: [this.data.nombreSucursal, Validators.required],
      abreviatura: [this.data.abreviatura, Validators.required],
      activo: [this.data.activo, Validators.required],
      userIDCreacion: this.data.userIDCreacion,
      fechaCreacion: this.data.fechaCreacion,
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion
    });

    this.app.desactivarCargando();
  }
  //cerar
  onClose() {
    this.dialogRef.close();
  }

  get f() { return this.sucursalForm.controls }

  onGuardar() {

    //validar los textbox
    if (!this.sucursalForm.invalid) {
      let dataSucursal: sucursal = {
        "sucursalID": this.f['sucursalID'].value,
        "abreviatura": this.f['abreviatura'].value,
        "nombreSucursal": this.f['nombreSucursal'].value,
        "activo": this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }
/*
      dataSucursal.sucursalID = this.f.sucursalID.value,
      dataSucursal.abreviatura = this.f.abreviatura.value,
      dataSucursal.nombreSucursal= this.f.nombreSucursal.value,
      dataSucursal.activo= this.f.activo.value,
      dataSucursal.userIDCreacion= this.data.userIDCreacion,
      dataSucursal.fechaCreacion= this.data.fechaCreacion,
      dataSucursal.userIDModificacion= this.data.userIDModificacion,
      dataSucursal.fechaModificacion= this.data.fechaModificacion*/


      if (this.f['sucursalID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los Datos de la sucursal ?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataSucursal);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos de la sucursal ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataSucursal);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataSucursal: sucursal): void {
    //llamar al servicio para guardar
    this.accesoDatosSucursal.insertSucursal(dataSucursal).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataSucursal: sucursal): void {

    this.accesoDatosSucursal.updateSucursal(dataSucursal.sucursalID, dataSucursal).subscribe((response: any) => {
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
    if ((this.data.sucursalID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.sucursalForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }
}
