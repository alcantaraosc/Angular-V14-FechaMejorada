import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { financiera } from 'src/app/_models/financiera';
import { tipoCategoria } from 'src/app/_models/tipoCategoria';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';



@Component({
  selector: 'app-modalfinanciera',
  templateUrl: './modalfinanciera.component.html',
  styleUrls: ['./modalfinanciera.component.css']
})
export class ModalfinancieraComponent implements OnInit {

  financieraForm: FormGroup;  
  dataTipoCategoria: tipoCategoria[];
  textBotonGuardar:string;
  isTextBotId:boolean=true;
  
  constructor( 
    public serviceDato: AccesodatosService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalfinancieraComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: financiera,
    private formBuilder: FormBuilder, //){
    private notificationService: NotificationService) {
      
      
  }

  //al iniciar el componente
  ngOnInit(): void {  
    
    this.textBotonGuardar = this.data.financieraID ===0 ? 'Guardar' : 'Actualizar';

    //usando el servicio formBuilder
    this.financieraForm=this.formBuilder.group({
      financieraID: [this.data.financieraID, Validators.required],
      nombreFinanciera: [this.data.nombreFinanciera, Validators.required],
      activo: [this.data.activo, Validators.required],
      tipoCategoriaID: [this.data.tipoCategoriaID, Validators.required],
      userIDCreacion: this.data.userIDCreacion,
      fechaCreacion: this.data.fechaCreacion, 
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion
      
    });    

    //llamar al servicio para llenar el listaTipoCategoria
    this.llenarListaTipoCategoria();
    //asignar el tipoCategoriaID
    this.financieraForm.get('tipoCategoriaID').patchValue(this.data.tipoCategoriaID.toString());    

  }

  // metodo llenarListaTipoCategoria
  llenarListaTipoCategoria(){
      this.serviceDato.listarTipoCategoria().subscribe((post: tipoCategoria[])=>
        {
          this.dataTipoCategoria=post;           
        }, 
        
        (error: HttpErrorResponse)=>{
        alert(error.message);   
     });

  }

  onGuardar(){
    
    //validar los textbox
    if (!this.financieraForm.invalid){

      let dataFinanciera: financiera = {
        "financieraID" : this.f['financieraID'].value,
        "nombreFinanciera" : this.f['nombreFinanciera'].value,
        "activo" : this.f['activo'].value,
        "tipoCategoriaID" : parseInt(this.f['tipoCategoriaID'].value),
        "nombreTipoCategoria" : "",        
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion, 
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }
      

      if (this.f['financieraID'].value === 0){
        if (confirm('¿ Estas seguro de guardar los Datos del Financiera ?')){
          
          this.ServicioGuardar(dataFinanciera);

        } 
      }      
      else if (confirm('¿ Estas seguro de actualizar los datos del financiera ?')) {          
        this.ServicioActualizar(dataFinanciera);        
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataFinanciera: financiera): void {
    
    this.serviceDato.insertFinanciera(dataFinanciera).subscribe((response: any)=>{
      if (response.exito ===1){
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

  //llamar al servicio actualizar
  ServicioActualizar(dataFinanciera: financiera): void {
    
    this.serviceDato.updateFinanciera(dataFinanciera.financieraID, dataFinanciera).subscribe((response: any)=>{
      if (response.exito ===1){
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

  //cerar
  onClose(){
    this.dialogRef.close();    
  }

  get f(){ return this.financieraForm.controls }

  validarStatuActivo(){
    if ((this.data.financieraID===0) && (this.f['activo'].value)){
      //establecer true
      this.financieraForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');    
    }
  }

}
