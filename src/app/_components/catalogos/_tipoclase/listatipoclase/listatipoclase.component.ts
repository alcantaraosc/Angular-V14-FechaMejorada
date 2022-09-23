import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { tipoClase } from 'src/app/_models/tipoClase';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModaltipoclaseComponent } from '../modaltipoclase/modaltipoclase.component';
import { AccesodatostipoclaseService } from 'src/app/_services/accesodatostipoclase.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-listatipoclase',
  templateUrl: './listatipoclase.component.html',
  styleUrls: ['./listatipoclase.component.css']
})

export class ListatipoclaseComponent implements OnInit, AfterViewInit {

  filtrarPorNombreTipoClase: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['tipoClaseID', 'nombreTipoClase', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoTipoClase: AccesodatostipoclaseService,
    private dialog: MatDialog,
    private notificationService: NotificationService) {

  }

  ngOnInit(): void {

    this.listarTipoClase();

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
    this.filtrarPorNombreTipoClase = "";
  }
  onRefrescar() {
    this.listarTipoClase();
  }
  //llamar al servicio para listar todos 
  listarTipoClase() {
    this.accesoTipoClase.getListarTipoClase().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();
    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre tipo clase
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda

    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoTipoClase.getDatosTipoClasePorNombre(nombre).subscribe((response: responseModel) => {
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
        this.notificationService.warn("Digite el nombre Tipo Clase para hacer el filtro");
      }
    }
  }
  //metodo para crear tipo clase
  onCreateTipoClase() {
    if (confirm('¿ Estas seguro de crear un nuevo tipo clase?')) {
      this.emitirDatosService.habilitarCargando();
      const today = new Date();
      let dataTipoClase: tipoClase = {
        tipoClaseID: 0, nombreTipoClase: null, activo: true,
        userIDCreacion: 1, fechaCreacion: today, userIDModificacion: null,
        fechaModificacion: null, title: 'Nuevo Tipo Clase'
      };
      this.openDialog(dataTipoClase);
    }

  }
  //método para editar los datos del tipo clase 
  onEditarDatosTipoClase(tipoClaseID: number) {
    if (confirm('¿ Estas seguro de editar los datos tipo clase?')) {

      //llama al servicio getDatoTipoClasePorId
      this.accesoTipoClase.getDatoTipoClasePorId(tipoClaseID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          let dataTipoClase: tipoClase = response.data;
          dataTipoClase.title = 'Editar Tipo Clase';
          this.openDialog(dataTipoClase);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  onEliminarDatosTipoClase(tipoClaseID: number) {
    if (confirm('¿ Estas seguro de eliminar tipo clase ?')) {
      this.accesoTipoClase.deleteTipoClase(tipoClaseID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar tipo clase
          this.listarTipoClase();
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }
  //Metodo para abrir la ventana modal
  openDialog(dataTipoClase: tipoClase): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataTipoClase;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModaltipoclaseComponent, dialogConfig);
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarTipoClase();
    });
  }
}
