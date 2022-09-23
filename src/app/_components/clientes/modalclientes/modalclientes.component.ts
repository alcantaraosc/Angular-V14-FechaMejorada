import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, RequiredValidator } from '@angular/forms';
import { AccesoclientesService } from 'src/app/_services/accesoclientes.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { drownListClientes } from 'src/app/_models/drownListClientes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { clientes } from 'src/app/_models/clientes';
import { tipoIdentificacion } from 'src/app/_models/tipoIdentificacion';
import { sucursal } from 'src/app/_models/sucursal';
import { estadoCivil } from 'src/app/_models/estadoCivil';
import { tipoSexo } from 'src/app/_models/tipoSexo';
import { departamento } from 'src/app/_models/departamento';
import { personeria } from 'src/app/_models/personeria';
import { dropDownList } from 'src/app/_models/dropDownList';
import { municipio } from 'src/app/_models/municipio';                  
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';
//import * as moment from 'moment';
import { DatePipe } from '@angular/common';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-modalclientes',
  templateUrl: './modalclientes.component.html',
  styleUrls: ['./modalclientes.component.css']
})
export class ModalclientesComponent implements OnInit {

  private isValidEmail = /\s+@\.\s+/;
  textBotonGuardar: string = "Guardar";
  textBotonGuardaryCerrar: string = "Guardar y Cerrar";
  frmClientes: FormGroup;
  listaDrownListClientes: drownListClientes;
  //en esta variable me indica si el registro del cliente es nuevo o se esta editando
  nuevoCliente: boolean;

  listTipoIdentificacion?: tipoIdentificacion[];
  listSucursal: sucursal[];
  listEstadoCivil?: estadoCivil[];
  listTipoSexo?: tipoSexo[];
  listDepartamento: departamento[];
  listPersoneria: personeria[];
  listPep: dropDownList[];
  listMunicipio: municipio[];

  //esta es la variable que le transfiere el datos ventana modal de la oportunidad
  NoIdentificacionCliente: string;
  public valorEstadoBotonOport: boolean



  options: FormGroup;
  colorControl = new FormControl('primary');
  edadControl = new FormControl(0, Validators.min(0));


  getFontSize() {
    return Math.max(90, this.edadControl.value);
  }


  /*
    constructor(private accesoClientes: AccesoclientesService,
      private notification: NotificationService, fb: FormBuilder) {
        
        this.options = fb.group({      
          edad: this.edadControl,
        });
       }
       */
  constructor( private appS: AppService,
    private accesoClientes: AccesoclientesService,
    private datePipe: DatePipe,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalclientesComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: clientes,
    private formBuilder: FormBuilder, //){
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    
      //emitis al receptor para que reciba el valor true y muestre una imagen que esta cargando
      this.appS.habilitarCargando();
      
      this.cambiarEstadoCliente(this.data.nuevoCliente);
      
      //primero llenar los DrownList del clientes
      this.llenarDrownList();
      
      //comprobar si se esta editando el registro del cliente
      if (!this.nuevoCliente) {
        //seleccionar el municipio
        this.onSeleccionarMunicipio(this.data.departamentoID);      
      }
      
    this.frmClientes = this.formBuilder.group({

        clienteID: [this.data.clienteID, Validators.required],
        tipoIdentificacionID: [this.data.tipoIdentificacionID, Validators.required],
        nombreCliente: [this.data.nombreCliente, Validators.required],
        fechaCreacion: [this.data.fechaCreacion, Validators.required],
        sucursalID: [this.data.sucursalID.toString(), Validators.required],

        direccion: [this.data.direccion, Validators.required],
        contacto: [this.data.contacto, Validators.required],
        telefonos: [this.data.telefonos],
        edad: [this.data.edad, Validators.required],
        tipoSexoID: [this.data.tipoSexoID.toString(), Validators.required],
        estadoCivilID: [this.data.estadoCivilID.toString(), Validators.required],
        procesado: [this.data.procesado],
        email: [this.data.email],
        email2: [this.data.email2],
        email3: [this.data.email3],
        celular: [this.data.celular, Validators.required],
        telefonoHab: [this.data.telefonoHab],
        departamentoID: [this.data.departamentoID.toString(), Validators.required],
        municipioID: [this.data.municipioID.toString(), Validators.required],
        ocupacion: [this.data.ocupacion, Validators.required],
        fax: [this.data.fax],
        revisado: [this.data.revisado],
        //userIDRevisado: []
        //comentarioRevisado: string
        //horaRegistradad?: Date

        //nombreUsuario?: string
        clienteIndeseable: [this.data.clienteIndeseable],
        personeriaID: [this.data.personeriaID.toString(), Validators.required],
        pep: [this.data.pep, Validators.required]

        //departamento?: string
        //nombreMunicipio: string

     
    });
    
    //asignar el tipoIdentificacionID
    this.frmClientes.get('tipoIdentificacionID').patchValue(this.data.tipoIdentificacionID.toString());
       
    //this.appS.desactivarCargando();
    //this.appS.config.emit(false);
  }

  llenarDrownList() 
  {

      this.accesoClientes.listarDrownLisClientes().subscribe((response: drownListClientes) => {
          //llenar cada uno de los DrowmList.
          this.listaDrownListClientes = response
          this.listTipoIdentificacion= response.tipoIdentificacion;
          this.listSucursal=response.sucursal
          this.listEstadoCivil=response.estadoCivil;
          this.listTipoSexo=response.tipoSexo;
          this.listDepartamento=response.departamento;
          this.listPersoneria=response.personeria;
          this.listPep=response.pep;

      }, (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);

      });
  }

 //seleccionar el departamento
 onSeleccionarMunicipio(id: number) 
 {   
   
      this.accesoClientes.listarMunicipio(id).subscribe((response: responseModel) => {      
        if (response.exito === 1) {
          this.listMunicipio = response.data;
        }
        else {
          this.notificationService.warn(response.mensaje);
        }

      }, (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      });
  }

  //onGuardar(event: Event, cerrarVentanaModal: boolean) 
  //boton guardar de la ventana modal cliente
  onGuardar(cerrarVentanaModal: boolean) {
    //cancelar para que no recargue toda la pagina
    //event.preventDefault();


    //validar los textbox  
    if (this.frmClientes.valid) {

      let dataClientes: clientes = {
        "nuevoCliente": this.nuevoCliente,
        "tipoIdentificacionID": parseInt(this.f['tipoIdentificacionID'].value),
        "clienteID": this.f['clienteID'].value,
        "sucursalID": parseInt(this.f['sucursalID'].value),
        "nombreCliente": this.f['nombreCliente'].value,
        "contacto": this.f['contacto'].value,
        "tipoSexoID": parseInt(this.f['tipoSexoID'].value),
        "edad": parseInt(this.f['edad'].value),
        "estadoCivilID": parseInt(this.f['estadoCivilID'].value),
        "ocupacion": this.f['ocupacion'].value,
        "personeriaID": parseInt(this.f['personeriaID'].value),
        "pep": this.f['pep'].value,
        "fechaCreacion":this.data.fechaCreacion,        
        "departamentoID": parseInt(this.f['departamentoID'].value),
        "municipioID": parseInt(this.f['municipioID'].value),
        "email": this.f['email'].value,
        "email2": this.f['email2'].value,
        "email3": this.f['email3'].value,
        "clienteIndeseable": this.f['clienteIndeseable'].value,
        "direccion": this.f['direccion'].value,
        "telefonos": this.f['telefonos'].value,
        "celular": this.f['celular'].value,
        "telefonoHab": this.f['telefonoHab'].value,
        "fax": this.f['fax'].value,
        "procesado": this.f['procesado'].value,
        "revisado": this.f['revisado'].value,
        "userRevisado": null,
        "comentarioRevisado": null
      }

      this.data.clienteID = dataClientes.clienteID;
      this.NoIdentificacionCliente = dataClientes.clienteID;
      //activar el boton Oportunidad
      this.valorEstadoBotonOport = false;

      if (this.nuevoCliente) 
      {
        
          if (confirm('¿ Estas seguro de guardar los Datos del cliente ?')) 
          {
            this.ServicioGuardar(dataClientes, cerrarVentanaModal);
          }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos del cliente ?')) 
      {
          this.ServicioActualizar(dataClientes, cerrarVentanaModal);
      }

    }
    else 
    {
        //aqui le indico que me marque todo los campos que son requerido
        this.frmClientes.markAllAsTouched();
        //this.notificationService.warn("Existen campos vacios");
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataClientes: clientes, cerrarVentanaModal: boolean): void {

    this.accesoClientes.insertClientes(dataClientes).subscribe((response: any) => {
      //comprobar si fue exito ==1
      if (response.exito === 1) {
        //mostrar la notificacion exitoso
        this.notificationService.success('<< ' + response.mensaje + ' >>');
       
        //comprobar si la ventana modal se va a cerrar.
        if (cerrarVentanaModal) {
          this.onClose();
        } 
        else  
          //cambiar el estado del cliente, indicando que ahora se puede actualizar
          this.cambiarEstadoCliente(false);
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

  //llamar al servicio actualizar
  ServicioActualizar(dataClientes: clientes, cerrarVentanaModal: boolean): void {

    this.accesoClientes.updateClientes(dataClientes.clienteID, dataClientes).subscribe((response: any) => {
      //comprobar si fue exito ==1
      if (response.exito === 1) {
        //mostrar la notificacion exitoso
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        //llamar al metodo para cerra la ventana modal
        if (cerrarVentanaModal) this.onClose();
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



  onClose() {
    this.dialogRef.close();
  }

  get f() { return this.frmClientes.controls }


  getErrorMensage(field: string): string {
    let mensaje: string;
    if (this.frmClientes.get(field).errors['required']) {
      mensaje = 'Nombre del campo requerido';
    }
    else if (this.frmClientes.get(field).hasError('pattern')) {
      mensaje = 'Correo no valido';
    }

    return mensaje;
  }


  isValidField(field: string): boolean {
    return (
      (this.frmClientes.get(field).touched || this.frmClientes.get(field).dirty) &&
      !this.frmClientes.get(field).valid
    );
  }


  //actualizar el estado del cliente
  cambiarEstadoCliente(isClienteNuevo: boolean ) {

    //en esta variable me indica si el registro del cliente es nuevo o se esta editando
    // o indicar que ya no es nuevo registro
    this.nuevoCliente = isClienteNuevo
    this.data.nuevoCliente = isClienteNuevo;
    this.data.titulo = "Editar datos del cliente";
    this.data.titulo =(isClienteNuevo) ? 'Nuevo cliente': 'Editar registro del cliente';
    //cambiar nombre a la etiqueta
    this.textBotonGuardar = (isClienteNuevo) ? "Guardar" : "Actualizar";
    this.textBotonGuardaryCerrar = (isClienteNuevo) ? "Guardar y Cerrar" : "Actualizar y Cerrar";
    
  }

}



