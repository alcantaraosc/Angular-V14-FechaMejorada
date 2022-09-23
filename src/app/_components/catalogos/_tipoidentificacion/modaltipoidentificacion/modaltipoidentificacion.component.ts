import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services/notification.service';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tipoIdentificacion } from 'src/app/_models/tipoIdentificacion';



@Component({
  selector: 'app-modaltipoidentificacion',
  templateUrl: './modaltipoidentificacion.component.html',
  styleUrls: ['./modaltipoidentificacion.component.css']
})
export class ModaltipoidentificacionComponent implements OnInit {

  tipoIdentificacionForm : FormGroup;  
  dataTipoIdentificacion : tipoIdentificacion;
  textBotonGuardar : string;
  titulo : string;
  isTextBotId : boolean = true;

  nombreSucription : Subscription;

    constructor( 
      //hace referencia al ventana modal abierta
      public dialogRef: MatDialogRef<ModaltipoidentificacionComponent>,
      //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
      //data: es de tipo DialogData( DialogData es una interface)
      @Inject(MAT_DIALOG_DATA) public data: tipoIdentificacion,
      private formBuilder: FormBuilder, //){
      private notificationService: NotificationService,
      private serviceDato : AccesodatosService
      ) { }
    

  ngOnInit(): void {

     //asignar los datos
     this.dataTipoIdentificacion=this.data;

    this.textBotonGuardar= this.data.tipoIdentificacionID === 0 ? 'Guardar' : 'Actualizar';
    this.titulo= this.data.titulo;

    //usando el servicio formBuilder
    this.tipoIdentificacionForm=this.formBuilder.group({
      tipoIdentificacionID: [this.data.tipoIdentificacionID, Validators.required],
      nombreIdentificacion: [this.data.nombreIdentificacion, Validators.required],
      activo: [this.data.activo, Validators.required],
      userIDCreacion: this.data.userIDCreacion,
      fechaCreacion: this.data.fechaCreacion, 
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion
      
    });
  }
  
  //cerar
  onClose(){
    this.dialogRef.close();    
  }

  get f(){ return this.tipoIdentificacionForm.controls }

  validarStatuActivo(){   
    if ((this.dataTipoIdentificacion.tipoIdentificacionID === 0) && (this.f['activo'].value)){
      //establecer true
      this.tipoIdentificacionForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo >>');    
    }
  }

  onGuardar() : void{
        
    //validar los textbox
    if (!this.tipoIdentificacionForm.invalid){
      
      let datTipoIdentificacion : tipoIdentificacion = {
        "tipoIdentificacionID" : this.f['tipoIdentificacionID'].value,
        "nombreIdentificacion" : this.f['nombreIdentificacion'].value,
        "activo" : this.f['activo'].value,
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion, 
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion      
      }

      if (this.f['tipoIdentificacionID'].value === 0){
        if (confirm('¿ Estas seguro de guardar el tipo identificacion ?')){          
          this.ServicioGuardar(datTipoIdentificacion);
        } 
      }      
      else if (confirm('¿ Estas seguro de actualizar el tipo identificacion ?')) {         
        this.ServicioActualizar(datTipoIdentificacion);   
      }
    }
  }

    //llamar el servicio actualizar
  ServicioGuardar(dataTipoIdentificacion: tipoIdentificacion): void {

      this.serviceDato.insertTipoIdentificacion(dataTipoIdentificacion).subscribe((response: any)=>{
        if (response.exito === 1){
          this.notificationService.success('<< ' +  response.mensaje + ' >>');
          this.onClose();
        }
        else{
          this.notificationService.warn(response.mensaje);
        }
      }, (dataError : HttpErrorResponse)=>{
        if(dataError.status == 404){
          alert(dataError["mensaje"]);
        }else{
          console.log(dataError);
        }
  
      });
  }
  
    //al servicio actualizar
    ServicioActualizar(model: tipoIdentificacion): void {
      
      this.serviceDato.updateTipoIdentificacion(model.tipoIdentificacionID, model).subscribe((response: any)=>{
        if (response.exito === 1){
          this.notificationService.success('<< ' +  response.mensaje + ' >>');
          this.onClose();
        }
        else{
          this.notificationService.warn(response.mensaje);
        }
      }, (dataError : HttpErrorResponse)=>{
        if(dataError.status == 404){
          alert(dataError["mensaje"]);
        }else{
          console.log(dataError);
        }
  
      });
  
    }


}

