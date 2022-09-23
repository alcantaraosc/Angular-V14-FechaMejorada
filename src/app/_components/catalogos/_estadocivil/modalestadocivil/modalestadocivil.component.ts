import { Component, OnInit, Inject } from '@angular/core';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/notification.service';
import { EnviardatosService } from 'src/app/_services/enviardatos.service';
import { estadoCivil } from 'src/app/_models/estadoCivil';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';


@Component({
  selector: 'app-modalestadocivil',
  templateUrl: './modalestadocivil.component.html',
  styleUrls: ['./modalestadocivil.component.css']
})
export class ModalestadocivilComponent implements OnInit {
  estadoCivilForm: FormGroup;  
  dataEstadoCivil: estadoCivil;
  textBotonGuardar: string;
  titulo: string;
  isTextBotId: boolean=true;

  nombreSucription: Subscription;

  constructor(private app: AppService,
              //hace referencia al ventana modal abierta
              public dialogRef: MatDialogRef<ModalestadocivilComponent>,
              //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
              //data: es de tipo DialogData( DialogData es una interface)
              @Inject(MAT_DIALOG_DATA) public data: estadoCivil,
              private formBuilder: FormBuilder, //){
              private notificationService: NotificationService,
              private serviceDato : AccesodatosService
    ) { }
    

  ngOnInit(): void {

    //asignar los datos
    this.dataEstadoCivil=this.data
    this.textBotonGuardar= this.data.estadoCivilID ===0 ? 'Guardar' : 'Actualizar';
    this.titulo= this.data.titulo;    

    //usando el servicio formBuilder
    this.estadoCivilForm=this.formBuilder.group({
      estadoCivilID: [this.data.estadoCivilID, Validators.required],
      nombreEstadoCivil: [this.data.nombreEstadoCivil, Validators.required],
      activo: [this.data.activo, Validators.required],
      userIDCreacion: this.data.userIDCreacion,
      fechaCreacion: this.data.fechaCreacion, 
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion      
    });

    this.app.desactivarCargando();
  }
  
  //cerar
  onClose(){
    this.dialogRef.close();    
  }

  get f(){ return this.estadoCivilForm.controls }

  validarStatuActivo(){   
    if ((this.dataEstadoCivil.estadoCivilID===0) && (this.f['activo'].value)){
      //establecer true
      this.estadoCivilForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo >>');    
    }
  }

  onGuardar() : void{
            
    //validar los textbox
    if (!this.estadoCivilForm.invalid){
      
      let datEstadoCivil: estadoCivil = {
        "estadoCivilID" : this.f['estadoCivilID'].value,
        "nombreEstadoCivil" : this.f['nombreEstadoCivil'].value,
        "activo" : this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion, 
       // "fechaHoraString": this.data.fechaHoraString,
        "userIDModificacion" : this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion    
      }

      if (this.f['estadoCivilID'].value === 0){
        if (confirm('¿ Estas seguro de guardar el estado civil ?')){
          this.app.habilitarCargando();
          this.ServicioGuardar(datEstadoCivil);

        } 
      }      
      else if (confirm('¿ Estas seguro de actualizar el estado civil ?')) { 
        this.app.habilitarCargando();        
        this.ServicioActualizar(datEstadoCivil);          
      }
    }
  }

  //llamar el servicio actualizar
  ServicioGuardar(dataEstadoCivil: estadoCivil): void {

      this.serviceDato.insertEstadoCivil(dataEstadoCivil).subscribe((response: any)=>{
        //desactivar cargando.
        this.app.desactivarCargando();

        if (response.exito ===1){          
          this.notificationService.success('<< ' +  response.mensaje + ' >>');
          this.onClose();
        }
        else{
          this.notificationService.warn(response.mensaje);
        }
      }, (dataError : HttpErrorResponse)=>{
         //desactivar cargando.
         this.app.desactivarCargando();
        if(dataError.status == 404){
          alert(dataError["mensaje"]);
        }else{
          console.log(dataError);
        }
  
      });
    }
  
    //al servicio actualizar
    ServicioActualizar(data: estadoCivil): void {
      
      this.serviceDato.updateEstadoCivil(data.estadoCivilID, data).subscribe((response: any)=>{
         //desactivar cargando.
         this.app.desactivarCargando();

        if (response.exito ===1){
          this.notificationService.success('<< ' +  response.mensaje + ' >>');
          this.onClose();
        }
        else{
          this.notificationService.warn(response.mensaje);
        }
      }, (dataError : HttpErrorResponse)=>{

         //desactivar cargando.
         this.app.desactivarCargando();

        if(dataError.status == 404){
          alert(dataError["mensaje"]);
        }else{
          console.log(dataError);
        }
  
      });
  
    }

}

