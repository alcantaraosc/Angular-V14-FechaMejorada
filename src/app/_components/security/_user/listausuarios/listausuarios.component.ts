import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

//Material
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

//Services
import { NotificationService } from 'src/app/_services/notification.service';
import { usuario } from 'src/app/_models/usuario';
import { ModalusuariosComponent } from '../modalusuarios/modalusuarios.component';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';
import { AccesodatossecurityusuarioService } from 'src/app/_services/accesodatossecurityusuario.service';
import { viewModelSecurity } from 'src/app/_models/viewModelSecurity';

@Component({

  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']

})

export class ListausuariosComponent implements OnInit {

  filtrarPorNombreUsuario: string;
  loading:boolean=false;

  displayedColumns: string[] = ['usuarioID', 'nombreUsuario', 'apellidoUsuario', 'loginUsuario','activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private accesoSecurityUsuario: AccesodatossecurityusuarioService,
    private notificationService: NotificationService,private emitirDatosService: AppService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    // llamar al método Listar los usuarios existentes
    this.listarUsuario();
  }

  //Este método se ejecuta al momento de la visualización
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 //Listar los usuarios existentes
  listarUsuario()  {

     //habilitar cargando
     this.emitirDatosService.habilitarCargando();

    this.accesoSecurityUsuario.getListadoUsuario().subscribe(post=>{(this.dataSource.data=post)
       //Dehabilitar cargando
      this.emitirDatosService.desactivarCargando();

    }, (error: HttpErrorResponse)=>{
      //Dehabilitar cargando
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
    
  }


  onReset(){
    //limpiar el filtro
    this.filtrarPorNombreUsuario = "";
    document.getElementById("buscarUsuario").focus();
  }

  onRefrescar(){
    //habilitar cargando
    this.emitirDatosService.habilitarCargando();
    this.listarUsuario();
  }

  //crear nuevo usuario
  onCreateNuevoUsuario(){

    if (confirm('¿Estas seguro de crear un nuevo usuario ?')){

      let today = new Date();

      let dataUsuario : viewModelSecurity = {
        usuario : {
          nuevoUsuario: true, 
          usuarioID: 0, 
          nombreUsuario: null, 
          apellidoUsuario: null,
          loginUsuario: null, 
          correo:null, 
          clave: null, 
          cambiarClave: false,
          salt: null, 
          esAdmin:false, 
          activo: true, 
          fechaCreacion: today, 
          fechaModificacion: null,
          titulo: 'Nuevo Usuario'
        },

        rolesUsuarios: []
      };
      

      console.log(dataUsuario);
      this.openDialog(dataUsuario);
    }

  }
 //llamar al servicio para hacer un filtro por nombre del usuario
  getDatosPorFiltro(e, nombreUsuario: string){

     //si la tecla (13 es enter) es enter, entonces realizar la busqueda
    //console.log(nombre);
    if (e.keyCode === 13) {
      if (nombreUsuario.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoSecurityUsuario.getDatosUsuarioPorNombre(nombreUsuario).subscribe(
            (response: responseModel) => {
              this.emitirDatosService.desactivarCargando();
              //comprobar si el filtro se encontro en la base de datos
              if (response.exito === 1) {
                this.dataSource.data = response.data;
              } else {
                this.dataSource.data = response.data;
                this.notificationService.warn(response.mensaje);
              }
            },
            (error: HttpErrorResponse) => {
              this.emitirDatosService.desactivarCargando();
              this.notificationService.warn(error.message);
            }
          );
      } else {
        this.notificationService.warn(
          'Digite el nombre de la función  para hacer el filtro'
        );
      }
    }

  }

  //editar los datos del usuario
  onEditarDatosUsuario(usuarioID: number) {

    if (confirm('¿ Estas seguro de editar los datos del cliente ?')) {

      //llama al servicio
      this.accesoSecurityUsuario.getDatosUsuarioPorId(usuarioID).subscribe((response: responseModel) => {        
        //si la respuesta del servidor es 1 es exito
        if (response.exito == 1) {          
          //const today = new Date();
          let dataUsuario: viewModelSecurity = response.data;
          dataUsuario.usuario.titulo = 'Editar registro del usuario';
          this.openDialog(dataUsuario);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }

      });

    }

  }

  //eliminar el registro del usuario
  onEliminarDatosUsuario(usuarioID:number){

    if (confirm('¿ Estas seguro de eliminar los datos del usuario ?')){

      this.accesoSecurityUsuario.deleteUsuario(usuarioID).subscribe((response: responseModel)=>{
        //si exito es 1
        if (response.exito === 1){
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar todos los usuarios
          this.listarUsuario();

        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });

    }

  }

  //Metodo para abrir la ventana modal
  openDialog(dataUsuario: viewModelSecurity): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '980px';
    dialogConfig.data = dataUsuario;


    //despues que se cierre la venta modal se ejecuta
    const dialogRef = this.dialog.open(ModalusuariosComponent, dialogConfig);

    //despues que se cierre la ventana,  llama aun suscribirse
    dialogRef.afterClosed().subscribe(result => {
      this.listarUsuario();

    });

  }



}
