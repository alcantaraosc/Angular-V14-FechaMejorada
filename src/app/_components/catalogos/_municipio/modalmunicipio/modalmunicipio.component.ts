import { Component, Inject, OnInit } from '@angular/core';
import { AccesodatosmunicipioService } from 'src/app/_services/accesodatosmunicipio.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { municipio } from 'src/app/_models/municipio';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';
import { departamento } from 'src/app/_models/departamento';

@Component({
  selector: 'app-modalmunicipio',
  templateUrl: './modalmunicipio.component.html',
  styleUrls: ['./modalmunicipio.component.css']
})
export class ModalmunicipioComponent implements OnInit {

  municipioForm: FormGroup;
  //dataMunicipio: municipio;
  datadepartamento: departamento[];
  textBotonGuardar: string;
  isTextBotId: boolean = true;

  constructor(private app: AppService,
    public accesoDatosMunicipio: AccesodatosmunicipioService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalmunicipioComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: municipio,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
  }

  //al iniciar el componente
  ngOnInit(): void {


    //this.dataMunicipio = this.data
    this.textBotonGuardar = this.data.municipioID === 0 ? 'Guardar' : 'Actualizar';

    //usando el servicio formBuilder
    this.municipioForm = this.formBuilder.group({
      municipioID: [this.data.municipioID, Validators.required],
      nombreMunicipio: [this.data.nombreMunicipio, Validators.required],
      activo: [this.data.activo, Validators.required],
      departamentoID: [this.data.departamentoID, Validators.required],
      //nombreDepartamento: [this.data.nombreDepartamento, Validators.required],
      userIDCreacion: this.data.userIDCreacion,
      fechaCreacion: this.data.fechaCreacion,
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion

    });

    //llamar al servicio para llenar el listaDepartamento
    this.llenarListaDepartamento();
    //asignar el departamentoID
    this.municipioForm.get('departamentoID').patchValue(this.data.departamentoID.toString());

    this.app.desactivarCargando();
  }

  // metodo llenarListaTipoCategoria
  llenarListaDepartamento() {
    this.accesoDatosMunicipio.listarDepartamento().subscribe((post: departamento[]) => {
      this.datadepartamento = post;
    },

      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  onGuardar() {

    //validar los textbox
    if (!this.municipioForm.invalid) {
      
      let dataMunicipio: municipio = {
        "municipioID": this.f['municipioID'].value,
        "nombreMunicipio": this.f['nombreMunicipio'].value,
        "activo": this.f['activo'].value,
        "departamentoID": parseInt(this.f['departamentoID'].value),
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

      //console.log(dataMunicipio.activo);
      //console.log(dataMunicipio);

      if (this.f['municipioID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los Datos del municipio ?')) {
          this.app.habilitarCargando();
          this.ServicioGuardar(dataMunicipio);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos del municipio ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataMunicipio);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataMunicipio: municipio): void {

    this.accesoDatosMunicipio.insertMunicipio(dataMunicipio).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataMunicipio: municipio): void {

    this.accesoDatosMunicipio.updateMunicipio(dataMunicipio.municipioID, dataMunicipio).subscribe((response: any) => {
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

  get f() { return this.municipioForm.controls }

  validarStatuActivo() {
    if ((this.data.municipioID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.municipioForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }
}
