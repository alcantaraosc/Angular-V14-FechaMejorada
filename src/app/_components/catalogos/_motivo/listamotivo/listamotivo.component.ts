import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { motivo } from 'src/app/_models/motivo';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalmotivoComponent } from '../modalmotivo/modalmotivo.component';
import { AccesodatosmotivosService } from 'src/app/_services/accesodatosmotivos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-listamotivo',
  templateUrl: './listamotivo.component.html',
  styleUrls: ['./listamotivo.component.css']
})
export class ListamotivoComponent implements OnInit {

  filtrarPorNombreMotivo: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['motivoID', 'nombreMotivo', 'departamento','tipo','activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoMotivo: AccesodatosmotivosService,
    private dialog: MatDialog,
    private notificationService: NotificationService) {

  }

  ngOnInit(): void {

    this.listarMotivo();

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
    this.filtrarPorNombreMotivo = "";
  }
  onRefrescar() {
    this.listarMotivo();
  }
  //llamar al servicio para listar todos 
  listarMotivo() {
    this.accesoMotivo.getListarMotivo().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();
    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre Motivo
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda

    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoMotivo.getDatosMotivoPorNombre(nombre).subscribe((response: responseModel) => {
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
        this.notificationService.warn("Digite el nombre Motivo para hacer el filtro");
      }
    }
  }
  //metodo para crear Motivo
  onCreateMotivo() {
    if (confirm('¿ Estas seguro de crear un nuevo Motivo?')) {
      this.emitirDatosService.habilitarCargando();
      const today = new Date();
      let dataMotivo: motivo = {
        motivoID: 0, nombreMotivo: null, departamento:0, tipo:0, activo:true,
        userIDCreacion: 1, fechaCreacion: today, userIDModificacion: null,
        fechaModificacion: null, title: 'Nuevo Motivo'
      };
      this.openDialog(dataMotivo);
    }

  }
  //método para editar los datos del motivo 
  onEditarDatosMotivo(motivoID: number) {
    if (confirm('¿ Estas seguro de editar los datos motivo?')) {

      //llama al servicio getDatoMotivoPorId
      this.accesoMotivo.getDatoMotivoPorId(motivoID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          let dataMotivo: motivo = response.data;
          dataMotivo.title = 'Editar Motivo';
          this.openDialog(dataMotivo);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  onEliminarDatosMotivo(motivoID: number) {
    if (confirm('¿ Estas seguro de eliminar tipo clase ?')) {
      this.accesoMotivo.deleteMotivo(motivoID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar motivo
          this.listarMotivo();
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }
  
  //Metodo para abrir la ventana modal
  openDialog(dataMotivo: motivo): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataMotivo;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalmotivoComponent, dialogConfig);
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarMotivo();
    });
  }
}
