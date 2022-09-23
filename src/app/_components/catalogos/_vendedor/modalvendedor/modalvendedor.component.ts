import { Component, Inject, OnInit } from '@angular/core';
import { AccesodatosvendedorService } from 'src/app/_services/accesodatosvendedor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NotificationService } from 'src/app/_services/notification.service';
import { vendedor } from 'src/app/_models/vendedor';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';
//  import { selectListSucursales } from 'src/app/_models/selectListSucursales';
//import { selectListLideres } from 'src/app/_models/selectListLideres';
import { drowListLiderSucUsuario } from 'src/app/_models/drownListLiderSucUsuario';
import { sucursal } from 'src/app/_models/sucursal';
import { lider } from 'src/app/_models/lider';
import { usuario } from 'src/app/_models/usuario';


@Component({

  selector: 'app-modalvendedor',
  templateUrl: './modalvendedor.component.html',
  styleUrls: ['./modalvendedor.component.css']
})

export class ModalvendedorComponent implements OnInit {

  vendedorForm: FormGroup;
  dataVendedor: vendedor;
  textBotonGuardar: string;
  isTextBotId: boolean = true;  
  //listaDrownLis
  listSucursal: sucursal[];
  listLider: lider[];
  listUsuario: usuario[];


 // listSucursal: selectListSucursales;  
 // listLider: selectListLideres;     


  constructor(private app: AppService,
    public accesoDatosVendedor: AccesodatosvendedorService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalvendedorComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: vendedor,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
  }

  //al iniciar el componente
  ngOnInit(): void {
    
    //asignar los datos
    this.dataVendedor = this.data
    this.textBotonGuardar = this.data.vendedorID === 0 ? 'Guardar' : 'Actualizar';


    //primero llenar los DrownList del lista sucursales usuarios
    this.llenarDrownListSucLiderUsuario();

    //usando el servicio formBuilder
    this.vendedorForm = this.formBuilder.group({

      vendedorID: [this.data.vendedorID, Validators.required],
      nombreVendedor: [this.data.nombreVendedor, Validators.required],
      codigoVendedor: [this.data.codigoVendedor, Validators.required],
      identificacion: [this.data.identificacion, Validators.required],
      activo: [this.data.activo, Validators.required],
      sucursalID: [this.data.sucursalID.toString(), Validators.required],      
      liderID: [this.data.liderID.toString(), Validators.required],
      usuarioID:[this.data.usuarioID.toString(), Validators.required],
      userIDCreacion: [this.data.userIDCreacion, Validators.required],
      fechaCreacion: [this.data.fechaCreacion, Validators.required],
      userIDModificacion: this.data.userIDCreacion,
      fechaModificacion: this.data.fechaModificacion

    });

   
    this.app.desactivarCargando();

    //llamar al servicio para llenar listSucursal
    //this.llenarListaSucursal();
    
    

    //llamar al servicio para llenar listaLider
    //this.LLenarListaLider();
    //asignar el LiderID
    // this.vendedorForm.get('liderID').patchValue(this.data.liderID.toString());


    //llamar al servicio para cargar

  }

  //Método LLenar el Drownlist
  llenarDrownListSucLiderUsuario() {
    
    this.accesoDatosVendedor.listarDrownLisSucLiderUsuario().subscribe((response: drowListLiderSucUsuario) => {

      //llenar cada uno de los DrowmList.
      this.listSucursal=response.sucursal;
      this.listLider=response.lider;
      this.listUsuario=response.usuario;

    }, (mensajeError:HttpErrorResponse)=>{
      this.notificationService.warn(mensajeError.message);
    });
  }


  /*
  // metodo llenarListaSucursal
  llenarListaSucursal() {
    this.accesoDatosVendedor.ListaSucursal().subscribe((post: sucursal) => {
      this.listSucursal = post;
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

  //método Llenar Lista Lider
  LLenarListaLider() {
    this.accesoDatosVendedor.ListaLider().subscribe((post: lider) => {
      this.listLider = post;
    },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }*/
  
  


  get f() { return this.vendedorForm.controls }

  //evento guardar los datos del vendedor
  onGuardar() {

    //validar los inputs
    if (!this.vendedorForm.invalid) {
      let dataVendedor: vendedor = {
        "vendedorID": this.f['vendedorID'].value,
        "codigoVendedor": this.f['codigoVendedor'].value,
        "nombreVendedor": this.f['nombreVendedor'].value,
        "identificacion": this.f['identificacion'].value,
        "activo": this.f['activo'].value,

        "sucursalID": parseInt(this.f['sucursalID'].value),
        "liderID": parseInt(this.f['liderID'].value),
        "usuarioID": parseInt(this.f['usuarioID'].value),
        
        "userIDCreacion": this.data.userIDCreacion,
        "fechaCreacion": this.data.fechaCreacion,
        "userIDModificacion": this.data.userIDModificacion,
        "fechaModificacion": this.data.fechaModificacion
      }

      //console.log(dataVendedor.activo);

      if (this.f['vendedorID'].value === 0) {
        if (confirm('¿ Estas seguro de guardar los datos del vendedor ?')) {
          this.app.habilitarCargando();          
          this.ServicioGuardar(dataVendedor);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos del vendedor ?')) {
        this.app.habilitarCargando();
        this.ServicioActualizar(dataVendedor);
      }
    }
  }

  //llamar el servicio Guardar
  ServicioGuardar(dataVendedor: vendedor): void {

    this.accesoDatosVendedor.insertVendedor(dataVendedor).subscribe((response: responseModel) => {
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
  ServicioActualizar(dataVendedor: vendedor): void {

    this.accesoDatosVendedor.updateVendedor(dataVendedor.vendedorID, dataVendedor).subscribe((response: any) => {
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
    else if(confirm('¿ Estas seguro de cerrar la ventana del vendedor ?')){
      this.dialogRef.close();
    }
    
  }

  validarStatuActivo() {
    if ((this.data.vendedorID === 0) && (this.f['activo'].value)) {
      //establecer true
      this.vendedorForm.get('activo').patchValue(false);
      this.notificationService.success('<< no puedes cambiar el estatus del campo activo cuando es registro nuevo >>');
    }
  }

  getErrorMensage(field: string): string {
    let mensaje: string;
    if (this.vendedorForm.get(field).errors['required']) {
      mensaje = 'Nombre del campo requerido';
    }
    return mensaje;
  }
  

  isValidField(field: string): boolean {
    return (
      (this.vendedorForm.get(field).touched || this.vendedorForm.get(field).dirty) &&
      !this.vendedorForm.get(field).valid
    );
  }

}
