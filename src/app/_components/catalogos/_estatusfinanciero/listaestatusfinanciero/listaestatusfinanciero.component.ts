import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { estatusFinanciero } from 'src/app/_models/estatusFinanciero';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/_services/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalestatusfinancieroComponent } from '../modalestatusfinanciero/modalestatusfinanciero.component';
import { AccesoestatusfinancieroService } from 'src/app/_services/accesoestatusfinanciero.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-listaestatusfinanciero',
  templateUrl: './listaestatusfinanciero.component.html',
  styleUrls: ['./listaestatusfinanciero.component.css']
})
export class ListaestatusfinancieroComponent implements OnInit, AfterViewInit {

  filtrarPorNombreStatusFinanciero: string;
  isActivo: boolean = false;
    
  displayedColumns: string[] = ['estatusFinancieroID', 'nombreEstatusFinanciero', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoStatusFinanciero: AccesoestatusfinancieroService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.listarStatusFinanciero();
  }

  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit() {
    //habilitar cargando 
    this.emitirDatosService.habilitarCargando();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  //evento
  onReset() {
    //limpiar el filtro
    this.filtrarPorNombreStatusFinanciero = "";
  }
  onRefrescar() {
    this.listarStatusFinanciero();
  }
  
  //llamar al servicio para listar todos 
  listarStatusFinanciero() {
    this.accesoStatusFinanciero.getListarStatusFinanciero().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();
    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }
  //llamar al servicio para hacer un filtro por nombre estatus Financiero
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la búsqueda

    //console.log(nombre);
    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoStatusFinanciero.getDatosEstatusFinancieroPorNombre(nombre).subscribe((response: responseModel) => {
          this.emitirDatosService.desactivarCargando();
          //comprobar si el filtro se encontro en la base de datos
          if (response.exito === 1) {
            this.dataSource.data = response.data;
          }
          else {

            this.dataSource.data = response.data;
            this.notificationService.warn(response.mensaje);
          }

        }, (error: HttpErrorResponse) => {
          this.emitirDatosService.desactivarCargando();
          this.notificationService.warn(error.message);
        });
      } else {
        this.notificationService.warn("Digite el nombre del Estatus Financiero para hacer el filtro");
      }
    }
  }

  //metodo para crear un Estatus Financiero
  onCreateStatusFinanciero() {
    if (confirm('¿ Estas seguro de crear un nuevo nombre del Estatus Financiero')) {
      this.emitirDatosService.habilitarCargando();
      const today = new Date();
      let dataStatusFinanciero: estatusFinanciero = {estatusFinancieroID: 0,
                                nombreEstatusFinanciero: null, activo: true, 
                                userIDCreacion: 1, fechaCreacion: today,
                                userIDModificacion: null, fechaModificacion: null,
                                titulo: 'Nuevo Estatus financiero'};
      this.openDialog(dataStatusFinanciero);
    }

  }
  //Método para editar los datos de Estatus Financiero 
  onEditarDatosEstatusFinanc(estatusFinancieroID: number) {
    if (confirm('¿ Estas seguro de editar los datos del Status Financiero?')) {
      //console.log('entra');
      //debugger;
      //llama al servicio getDatosEstatusFinancPorId
      this.accesoStatusFinanciero.getDatosEstatusFinancPorId(estatusFinancieroID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          let dataStatusFinanciero: estatusFinanciero = response.data;
          dataStatusFinanciero.titulo = 'Editar EstatusFinanciero';
          this.openDialog(dataStatusFinanciero);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  onEliminarDatosEstatusFinanc(estatusFinancieroID: number) {
    if (confirm('¿ Estas seguro de eliminar el Estatus Financiero ?')) {
      this.accesoStatusFinanciero.deleteStatusFinanc(estatusFinancieroID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar Estatus Financiero
          this.listarStatusFinanciero();
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }
  
  //Metodo para abrir la ventana modal
  openDialog(dataStatusFinanciero: estatusFinanciero): void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataStatusFinanciero;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalestatusfinancieroComponent, dialogConfig);
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarStatusFinanciero();
    });
  }

}
