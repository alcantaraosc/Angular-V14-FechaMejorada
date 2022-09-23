import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { estadoCivil } from 'src/app/_models/estadoCivil';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services/notification.service';
import { EnviardatosService } from 'src/app/_services/enviardatos.service';
import { ModaltipoidentificacionComponent } from '../modaltipoidentificacion/modaltipoidentificacion.component';
import { tipoIdentificacion } from 'src/app/_models/tipoIdentificacion';
import { responseModel } from 'src/app/_models/responseModel';
//import { ModaltipoIdentificacionComponent } from './_components/catalogos/_tipoidentificacion/modaltipoidentificacion.component';


@Component({
  selector: 'app-listatipoidentificacion',
  templateUrl: './listatipoidentificacion.component.html',
  styleUrls: ['./listatipoidentificacion.component.css']
})

export class ListatipoidentificacionComponent implements  OnInit, AfterViewInit {

  filtrarPorNombreIdentificacion : string;
  loading: boolean = true;
  isActivo : boolean = true;

  displayedColumns: string[] = ['tipoIdentificacionID', 'nombreIdentificacion', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  
  //datosTipoCliente: tipoClientes = { tipoClienteID: 0, nombre: "", activo:true, title : "Nuevo registro" };


  constructor(private accesoDatosService: AccesodatosService,
              private dialog: MatDialog,
              private notificationService: NotificationService ) { }

  ngOnInit(): void {
    this.listarTipoIdentificacion(); 
  }

  
  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit(){    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onReset(){   
    //limpiar el filtro
    this.filtrarPorNombreIdentificacion = "";    
  }

  onRefrescar(){    
    this.listarTipoIdentificacion();
  }

  //llamar al servicio para listar todos 
  listarTipoIdentificacion() {
    this.loading=true;
     this.accesoDatosService.getListadoTipoIdentificacion().subscribe(post=>{(this.dataSource.data=post)
                 
     }, (error: HttpErrorResponse)=>{
      this.loading=false;
      this.notificationService.warn(error.message);  
     });

     this.loading=false;
  }

  //llamar al servicio para hacer un filtro por nombre del banco
  getDatosPorFiltro(e, nombre: string){
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda
    if (e.keyCode===13){   
      if (nombre.length>0){

        this.accesoDatosService.getDatosTipoIdentificacionPorNombre(nombre)
        .subscribe(post=>{(this.dataSource.data=post)                 
        }, (error: HttpErrorResponse)=>{
              console.log(error.message);
              this.notificationService.warn(error.message);     
    
        });
      } else {
        this.notificationService.warn("Digite el tipo identificacion para hacer el filtro");
      }

    } 
  }


  onCreateTipoIdentificacion(){
    if (confirm('¿ Estas seguro de crear un nuevo registro ?')){

      const today =  new Date();           
      let dataTipoIdentif: tipoIdentificacion = { tipoIdentificacionID: 0, nombreIdentificacion: null, activo: true, 
                                          userIDCreacion:1, fechaCreacion: today };      
      //enviar la los datos por medio del servicio.
      //this.enviarDatos.SendDataEstadoCivil$.emit(dataEstadoCivil);
      //llamar al metodo 
      dataTipoIdentif.titulo = 'Nuevo tipo identificacion'; 
      this.openDialog(dataTipoIdentif);
           
    }
  }
  
  //editar los datos del banco
  editarDatosTipoIdentificacion(id: number){
    if (confirm('¿ Estas seguro de editar tipo identificacion ?')){

        //llama al servicio getDatosEstadoCivilPorId
        this.accesoDatosService.getDatosTipoIdentificacionPorId(id).subscribe((response: responseModel )=>{
          //si la respuesta del servidor es 1 es exito
          if (response.exito == 1)
          {

            const today =  new Date();           
            /*let dataEstadoCivil: estadoCivil = { estadoCivilID: 0, descripcion: "", activo: true, 
                                                userIDCreacion:0, fechaCreacion: today, userIDModificacion: 0,
                                                fechaModificacion: today };   */
              let datatipoCliente : tipoIdentificacion = response.data;           
              datatipoCliente.titulo = 'Editar tipo identificacion';        
              this.openDialog(datatipoCliente);
          }
          else{
            this.notificationService.warn(response.mensaje);
          }

        });

    }
  }

  eliminarDatosTipoIdentificacion(id:number){

    if (confirm('¿ Estas seguro de eliminar el tipo identificacion ?')){
      this.accesoDatosService.deleteTipoIdentificacion(id).subscribe((response: responseModel)=>{
        //si exito es 1
        if (response.exito === 1){
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar todos los bancos
          this.listarTipoIdentificacion();
          
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });  
    }
  }


  //Metodo para abrir la ventana modal
  openDialog(dataTipoIdentificacion: tipoIdentificacion): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ='500px';      
    dialogConfig.data = dataTipoIdentificacion;

    //despues que se cierre la venta modal se ejecuta 
    const dialogRef = this.dialog.open(ModaltipoidentificacionComponent, dialogConfig);
  
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarTipoIdentificacion();     
   
    });

  }

}
