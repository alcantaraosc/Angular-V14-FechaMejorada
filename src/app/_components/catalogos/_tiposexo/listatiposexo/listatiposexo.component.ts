import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { tipoSexo } from 'src/app/_models/tipoSexo';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModaltiposexoComponent } from '../modaltiposexo/modaltiposexo.component';
import { AccesodatostiposexoService } from 'src/app/_services/accesodatostiposexo.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-listatiposexo',
  templateUrl: './listatiposexo.component.html',
  styleUrls: ['./listatiposexo.component.css']
})
export class ListatiposexoComponent implements OnInit, AfterViewInit {

  filtrarPorNombreTipoSexo: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['tipoSexoID', 'nombreSexo', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoTiposexo: AccesodatostiposexoService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.listarTipoSexo();

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
    this.filtrarPorNombreTipoSexo = "";
  }

  onRefrescar() {
    this.listarTipoSexo();
  }

  //llamar al servicio para listar todos 
  listarTipoSexo() {

    this.accesoTiposexo.getListarTipoSexo().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();

    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre 
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda

    //console.log(nombre);
    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoTiposexo.getDatosTipoSexoPorNombre(nombre).subscribe((response: responseModel) => {

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
        this.notificationService.warn("Digite el tipo de sexo para hacer el filtro");
      }
    }
  }

  //metodo para crear tipo de sexo
  onCreateTipoSexo() {

    if (confirm('¿ Estas seguro de crear un nuevo registro?')) {
      this.emitirDatosService.habilitarCargando();

      const today = new Date();
      let dataTipoSexo: tipoSexo = {
        tipoSexoID: 0, nombreSexo: null, activo: true,
        userIDCreacion: 1, fechaCreacion: today, userIDModificacion: null,
        fechaModificacion: null, title: 'Nuevo tipo sexo'
      };
      this.openDialog(dataTipoSexo);
    }

  }
  //método para editar los datos tipo sexo
  onEditarDatosTipoSexo(tipoSexoID: number) {

    if (confirm('¿ Estas seguro de editar los datos de tipo sexo?')) {
      //llama al servicio getDatostiposexoPorId
      this.accesoTiposexo.getDatoTipoSexoPorId(tipoSexoID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          console.log(response.data);
          debugger;
          let dataTipoSexo: tipoSexo = response.data;
          dataTipoSexo.title = 'Editar Tipo Sexo';
          this.openDialog(dataTipoSexo);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  onEliminarDatosTipoSexo(tipoSexoID: number) {

    if (confirm('¿ Estas seguro de eliminar el registro ?')) {
      this.accesoTiposexo.deleteTipoSexo(tipoSexoID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar sucursales
          this.listarTipoSexo();

        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }

  }

  //Metodo para abrir la ventana modal
  openDialog(dataTipoSexo: tipoSexo): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataTipoSexo;

    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModaltiposexoComponent, dialogConfig);

    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarTipoSexo();

    });
  }

}
