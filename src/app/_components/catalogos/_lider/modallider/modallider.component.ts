import { Component, OnInit, Inject } from '@angular/core';
import { AccesodatosliderService } from 'src/app/_services/accesodatoslider.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { lider } from 'src/app/_models/lider';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-modallider',
  templateUrl: './modallider.component.html',
  styleUrls: ['./modallider.component.css']
})
export class ModalliderComponent implements OnInit {

  liderForm: FormGroup;
  dataLider: lider;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoDatosLider: AccesodatosliderService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalliderComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: lider,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
  }

  //al iniciar el componente
  ngOnInit(): void {

    //asignar los datos
    this.dataLider = this.data
    this.textBotonGuardar = this.data.liderID === 0 ? 'Guardar' : 'Actualizar';

    //usando el servicio formBuilder
    this.liderForm = this.formBuilder.group({
      liderID: [this.data.liderID, Validators.required],
      nombreLider: [this.data.nombreLider, Validators.required],
      codigoLider: [this.data.codigoLider, Validators.required],
      area: [this.data.area, Validators.required],
      empresa: [this.data.empresa, Validators.required],
      identificacion: [this.data.identificacion, Validators.required],
      activo: [this.data.activo, Validators.required],
      userIDCreacion: this.data.userIDCreacion,
      fechaCreacion: this.data.fechaCreacion,
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion

    });

    this.app.desactivarCargando();
  }

  get f() { return this.liderForm.controls }

  //evento guardar
  onGuardar() {
    //validar los input
    if (!this.liderForm.invalid) {
      let dataLider: lider = {
        "liderID": this.f['liderID'].value,
        "nombreLider": this.f['nombreLider'].value,
        "codigoLider": this.f['codigoLider'].value,
        "area": this.f['area'].value,
        "empresa": this.f['empresa'].value,
        "identificacion": this.f['identificacion'].value,
        "activo": this.f['activo'].value,

        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

      
      if (this.f['liderID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los datos del líder ?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataLider);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos del líder ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataLider);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataLider: lider): void {

    this.accesoDatosLider.insertLider(dataLider).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataLider: lider): void {
    this.accesoDatosLider.updateLider(dataLider.liderID, dataLider).subscribe((response: any) => {
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

  //cerrar la ventana modal del vendedor
  onClose(cerrarAutomatico: boolean=true) {   

    if (cerrarAutomatico){
      this.dialogRef.close();
    }
    else if(confirm('¿ Estas seguro de cerrar la ventana del lider ?')){
      this.dialogRef.close();
    }
    
  }
  
  validarStatuActivo() {
    if ((this.data.liderID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.liderForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }
  
  getErrorMensage(field: string): string {
    let mensaje: string;
    if (this.liderForm.get(field).errors['required']) {
      mensaje = 'Nombre del campo requerido';
    }
    return mensaje;
  }

  isValidField(field: string): boolean {
    return (
      (this.liderForm.get(field).touched || this.liderForm.get(field).dirty) &&
      !this.liderForm.get(field).valid
    );
  }


}
