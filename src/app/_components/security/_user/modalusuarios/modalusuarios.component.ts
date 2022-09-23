import { Component, OnInit, Inject, Optional } from '@angular/core';
import { usuario } from 'src/app/_models/usuario';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { NotificationService } from 'src/app/_services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Contact } from 'src/app/_models/Contact';
import { AccesodatossecurityusuarioService } from 'src/app/_services/accesodatossecurityusuario.service';
import { viewModelSecurity } from 'src/app/_models/viewModelSecurity';
import { Subscription } from 'rxjs';
import { ComunicacionService } from 'src/app/_services/comunicacion.service';
import { rolesUsuarios } from 'src/app/_models/rolesUsuarios';
import { responseModel } from 'src/app/_models/responseModel';



@Component({
  selector: 'app-modalusuarios',
  templateUrl: './modalusuarios.component.html',
  styleUrls: ['./modalusuarios.component.css']
})
export class ModalusuariosComponent implements OnInit {

  frmUsuario: FormGroup;
  textBotonGuardar: string = "Guardar";

  //declarar esta variable para luego describirse y poder liberar recurso
  datosRolesUsuarioSubscription: Subscription;
  submitted = false;

  //en esta variable me indica si el registro del usuario es nuevo o se está editando
  nuevoUsuario: boolean;

  rolesAsignado: number[]=[];

  //esta es la variable que le transfiere el datos ventana rolesusuarios
  // IdUsuario: number;
  //public valorEstadoBotonRolUsuario: boolean

  constructor(
    private accesoSecurityUsuario: AccesodatossecurityusuarioService,
    public dialogRef: MatDialogRef<ModalusuariosComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: viewModelSecurity,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private datosComunicacion: ComunicacionService
    ) { 

      
     //(***Idreferencia=EviarDatosModalRolesFunciones***)
    //aqui se esta suscribiendo
    //aqui recibe el datos que envia el componente: app/_components/security/_componentegenerico/rolesfunciones/rolesfunciones
    //se usa servicio
    //(***Idreferencia=EviarDatosModalRolesFunciones***)
    //aqui se esta suscribiendo
    //aqui recibe el datos que envia el componente: app/_components/security/_funciones/rolesfunciones/rolesfunciones
    //se usa servicio
    this.datosRolesUsuarioSubscription=this.datosComunicacion.enviarDatosRolesUsuariosObservable.subscribe((datos: string[])=>{
       
      this.limpiarArreglo();
    
      //comproba si el arreglo tiene datos
      if (datos.length>0){
        for(let item of datos){
          //obtener la posicion del guion
          let indexGuion=item.lastIndexOf("-");
          let nuevoNumero: string="";

          for(let index=indexGuion+1; index < item.length; ++index){
            nuevoNumero=nuevoNumero + item[index];              
          }

          if (Number.isInteger(parseInt(nuevoNumero))){
            this.rolesAsignado.push(parseInt(nuevoNumero));                 
          }
        }
      }      
    });

  }


  ngOnInit(): void {

    this.submitted = true;
    this.cambiarEstadoUsuario(this.data.usuario.nuevoUsuario);

      this.frmUsuario = this.formBuilder.group({

        usuarioID: [this.data.usuario.usuarioID, Validators.required],
        nombreUsuario: [this.data.usuario.nombreUsuario, Validators.required],
        apellidoUsuario: [this.data.usuario.apellidoUsuario,Validators.required],
        loginUsuario: [this.data.usuario.loginUsuario, Validators.required],
        correo: this.data.usuario.correo,
        cambiarClave: [this.data.usuario.cambiarClave, Validators.required],
        salt: [this.data.usuario.salt,Validators.required],
        clave: [this.data.usuario.clave,Validators.required],
        activo: [this.data.usuario.activo, Validators.required],
        esAdmin: [this.data.usuario.esAdmin, Validators.required],
        fechaCreacion: [this.data.usuario.fechaCreacion, Validators.required],
        fechaModificacion: this.data.usuario.fechaModificacion
    });
  }

  //Para cerrar la venta del modal
  onClose() {
    this.dialogRef.close();
  }

  //vaciar el arreglo
  limpiarArreglo(){
    //en este ciclo vacio el arreglo
    for (let i = this.rolesAsignado.length; i > 0; i--) {
      //vaciar el arreglo
      this.rolesAsignado.pop();
    }
  }

  get f() { return this.frmUsuario.controls }

  //boton guardar de la ventana modal usuario
  onGuardar(){
    //debugger;
    //validar los textbox
    if(!this.frmUsuario.invalid){

      let dataUsuario: viewModelSecurity = {
        usuario : {
          "nuevoUsuario": this.data.usuario.nuevoUsuario,
          "usuarioID": parseInt(this.f['usuarioID'].value),
          "nombreUsuario": this.f['nombreUsuario'].value,
          "apellidoUsuario": this.f['apellidoUsuario'].value,
          "loginUsuario": this.f['loginUsuario'].value,
          "correo": this.f['correo'].value,
          "cambiarClave": this.f['cambiarClave'].value,
          "salt": this.f['salt'].value,
          "clave": this.f['clave'].value,
          "activo": this.f['activo'].value,
          "esAdmin": this.f['esAdmin'].value,
          "fechaCreacion": this.data.usuario.fechaCreacion,
          "fechaModificacion": this.data.usuario.fechaModificacion
        },
        rolesUsuarios: []
      };

      
      for (var index=0; index < this.rolesAsignado.length ; index ++){
        var datosd_: rolesUsuarios = {                
          "rolID": this.rolesAsignado[index],
          "usuarioID" :this.f['usuarioID'].value,            
          "FechaCreacion": this.data.usuario.fechaCreacion, 
          "fechaModificacion" : this.data.usuario.fechaModificacion
        } 
        //agregar push para agregar un nuevo registro en los arreglos.
        dataUsuario.rolesUsuarios.push(datosd_);        
      }

      console.log('dataUsuario: ', dataUsuario);
      console.log('usuario: ', dataUsuario.usuario);
      console.log('rolesUsuarios: ', dataUsuario.rolesUsuarios);

       //activar el boton Oportunidad
       //this.valorEstadoBotonRolUsuario = false;

      if (this.nuevoUsuario) {
        if (confirm('¿ Estas seguro de guardar los Datos del usuario ?')) {
          this.ServicioGuardar(dataUsuario);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos del usuario ?')) {
        this.ServicioActualizar(dataUsuario);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataUsuario: viewModelSecurity): void {

    this.accesoSecurityUsuario.insertUsuario(dataUsuario).subscribe((response: responseModel) => {
      //comprobar si fue exito ==1
      if (response.exito === 1) {
        //mostrar la notificacion exitoso
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        this.onClose();

      }
      else {

        this.notificationService.warn(response.mensaje);
      }
    }, (dataError: HttpErrorResponse) => {
      if (dataError.status == 404) {
        alert(dataError["mensaje"]);
      } else {
        console.log(dataError);
      }

    });
  }


  //actualizar el estado del Usuario
  cambiarEstadoUsuario(isUsuarioNuevo: boolean ) {

    //en esta variable me indica si el registro del Usuario es nuevo o se esta editando
    // o indicar que ya no es nuevo registro
    this.nuevoUsuario = isUsuarioNuevo
    this.data.usuario.nuevoUsuario = isUsuarioNuevo;
    this.data.usuario.titulo =(isUsuarioNuevo) ? 'Nuevo usuario': 'Editar registro del usuario';

    //cambiar nombre a la etiqueta
    this.textBotonGuardar = (isUsuarioNuevo) ? "Guardar" : "Actualizar";
  }


  //llamar al servicio actualizar
  ServicioActualizar(dataUsuario: viewModelSecurity): void {

    this.accesoSecurityUsuario.updateUsuario(dataUsuario.usuario.usuarioID, dataUsuario).subscribe((response: any) => {
      //comprobar si fue exito ==1
      if (response.exito === 1) {
        //mostrar la notificacion exitoso
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        this.onClose();

      }
      else {
        this.notificationService.warn(response.mensaje);
      }
    }, (dataError: HttpErrorResponse) => {
      if (dataError.status == 404) {
        alert(dataError["mensaje"]);
      } else {
        console.log(dataError);
      }

    });

  }

  validarStatuActivo() {
    if ((this.data.usuario.usuarioID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.frmUsuario.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }
}
