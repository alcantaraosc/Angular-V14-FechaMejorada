import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { estatusOportunidad } from 'src/app/_models/estatusOportunidad';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalestatusoportunidadComponent } from '../modalestatusoportunidad/modalestatusoportunidad.component';
import { AccesoestatusoportunidadService } from 'src/app/_services/accesoestatusoportunidad.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-listaestatusoportunidad',
  templateUrl: './listaestatusoportunidad.component.html',
  styleUrls: ['./listaestatusoportunidad.component.css']
})
export class ListaestatusoportunidadComponent implements OnInit, AfterViewInit {

  filtrarPorNombreStatusOportunidad: string;
  isActivo: boolean = false;
  displayedColumns: string[] = ['estatusOportunidadID','nombreEstatusOportunidad', 'activo', 'accion'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoEstatusOportunidad: AccesoestatusoportunidadService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.listarEstatusOportunidad();
  }

  
  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit() {
    //habilitar cargando 
    this.emitirDatosService.habilitarCargando();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //evento
  onReset() 
  {
      //limpiar el filtro
      this.filtrarPorNombreStatusOportunidad = "";
  }

  onRefrescar() 
  {
      this.listarEstatusOportunidad();
  }

  //llamar al servicio para listar todos 
  listarEstatusOportunidad() {

    this.accesoEstatusOportunidad.getListarEstatusOportunidad().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();

    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre del EstatusOportunidad
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda
    
    //console.log(nombre);
    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoEstatusOportunidad.getDatosEstatusOportunidadPorNombre(nombre).subscribe({
          next:(response: responseModel) =>{

              this.emitirDatosService.desactivarCargando();
              //comprobar si el filtro se encontro en la base de datos
              if (response.exito===1)
              {
                  this.dataSource.data = response.data;
              }
              else
              {              
                  this.dataSource.data = response.data;
                  this.notificationService.warn(response.mensaje);
              }
          },

          error: (error: HttpErrorResponse) =>{
              this.emitirDatosService.desactivarCargando();
              this.notificationService.warn(error.message);
          }

        });
      } 
      else 
      {
        this.notificationService.warn("Digite el nombre del Estatus Oportunidad para hacer el filtro");
      }
    }
  }

  //metodo para crear Estatus Oportunidad
  onCreateStatusoportunidad() {

    if (confirm('¿ Estas seguro de crear una nueva Estatus Oportunidad?')) {
      this.emitirDatosService.habilitarCargando();

      const today =  new Date();           
      let dataEstatusOportunidad: estatusOportunidad = { estatusOportunidadID: 0, nombreEstatusOportunidad: null,
                                  activo:true, userIDCreacion:1, fechaCreacion: today, userIDModificacion:null, 
                                  fechaModificacion: null, title: 'Nueva Estatus Oportunidad'};
      this.openDialog(dataEstatusOportunidad);
    }
    
  }
  //método para editar los datos de Estatus Oportunidad 
  onEditarDatosEstatusOportunidad(estatusOportunidadID: number) {

    if (confirm('¿ Estas seguro de editar los datos de Estatus Oportunidad?')) {

      //llama al servicio getDatoEstatusOportunidadPorId
      this.accesoEstatusOportunidad.getDatoEstatusOportunidadPorId(estatusOportunidadID).subscribe((response: responseModel) => {                
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {

          let dataEstatusOportunidad: estatusOportunidad = response.data;
          dataEstatusOportunidad.title = 'Editar Estatus Oportunidad';
          this.openDialog(dataEstatusOportunidad);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  } 

  onEliminarDatosEstatusOportunidad(estatusOportunidadID: number) {

    if (confirm('¿ Estas seguro de eliminar la EstatusOportunidad ?')) {
      this.accesoEstatusOportunidad.deleteEstatusOportunidad(estatusOportunidadID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar Estatus Oportunidad
          this.listarEstatusOportunidad();
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  //Metodo para abrir la ventana modal
  openDialog(dataEstatusOportunidad: estatusOportunidad): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataEstatusOportunidad;

    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalestatusoportunidadComponent, dialogConfig);

    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarEstatusOportunidad();

    });
  }
}
