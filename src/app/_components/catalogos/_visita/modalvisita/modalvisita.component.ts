import { Component, Inject, OnInit } from '@angular/core';
import { AccesodatosvisitaService } from 'src/app/_services/accesodatosvisita.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { visita } from 'src/app/_models/visita';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';


@Component({
  selector: 'app-modalvisita',
  templateUrl: './modalvisita.component.html',
  styleUrls: ['./modalvisita.component.css']
})
export class ModalvisitaComponent implements OnInit {

  visitaForm: FormGroup;
  dataVisita: visita;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesovisita: AccesodatosvisitaService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalvisitaComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: visita,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {

  }

  //al iniciar el componente
  ngOnInit(): void {
    //asignar los datos
    this.dataVisita = this.data
    this.textBotonGuardar = this.data.visitaID === 0 ? 'Guardar' : 'Actualizar';
    //usando el servicio formBuilder
    this.visitaForm = this.formBuilder.group({
      visitaID: [this.data.visitaID, Validators.required],
      nombreVisita: [this.data.nombreVisita, Validators.required],
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

  get f() { return this.visitaForm.controls }

  onGuardar() {

    //validar los textbox
    if (!this.visitaForm.invalid) {
      let dataVisita: visita = {
        "visitaID": this.f['visitaID'].value,
        "nombreVisita": this.f['nombreVisita'].value,
        "activo": this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

      if (this.f['visitaID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los datos visita ?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataVisita);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos de visita?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataVisita);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataVisita: visita): void {

    this.accesovisita.InsertVisita(dataVisita).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataVisita: visita): void {

    this.accesovisita.UpdateVisita(dataVisita.visitaID, dataVisita).subscribe((response: any) => {
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
    
    if ((this.data.visitaID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.visitaForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }

}
