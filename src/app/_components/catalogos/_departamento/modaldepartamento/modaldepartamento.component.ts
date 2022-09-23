import { Component, Inject, OnInit } from '@angular/core';
import { AccesodatosdepartamentoService } from 'src/app/_services/accesodatosdepartamento.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { departamento } from 'src/app/_models/departamento';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-modaldepartamento',
  templateUrl: './modaldepartamento.component.html',
  styleUrls: ['./modaldepartamento.component.css']
})
export class ModaldepartamentoComponent implements OnInit {

  departamentoForm: FormGroup;
  dataDepartamento: departamento;
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoDatosDepartamento: AccesodatosdepartamentoService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModaldepartamentoComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: departamento,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {

  }

  //al iniciar el componente
  ngOnInit(): void {

    //asignar los datos
    this.dataDepartamento = this.data
    this.textBotonGuardar = this.data.departamentoID === 0 ? 'Guardar' : 'Actualizar';

    //usando el servicio formBuilder
    this.departamentoForm = this.formBuilder.group({
      departamentoID: [this.data.departamentoID, Validators.required],
      nombreDepartamento: [this.data.nombreDepartamento, Validators.required],
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

  get f() { return this.departamentoForm.controls }

  onGuardar() {

    //validar los textbox
    if (!this.departamentoForm.invalid) {
      let dataDepartamento: departamento = {
        "departamentoID": this.f['departamentoID'].value,
        "nombreDepartamento": this.f['nombreDepartamento'].value,
        "activo": this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

     
      if (this.f['departamentoID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los Datos del departamento ?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataDepartamento);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos del departamento ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataDepartamento);
      }
    }
  }
  //llamar el servicio Guardar
  ServicioGuardar(dataDepartamento: departamento): void {

    this.accesoDatosDepartamento.insertDepartamento(dataDepartamento).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataDepartamento: departamento): void {

    this.accesoDatosDepartamento.updateDepartamento(dataDepartamento.departamentoID, dataDepartamento).subscribe((response: any) => {
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
    if ((this.data.departamentoID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.departamentoForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }
}
