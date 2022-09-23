import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { municipio } from 'src/app/_models/municipio';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/_services/app.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalmunicipioComponent } from '../modalmunicipio/modalmunicipio.component';
import { AccesodatosmunicipioService } from 'src/app/_services/accesodatosmunicipio.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-listamunicipio',
  templateUrl: './listamunicipio.component.html',
  styleUrls: ['./listamunicipio.component.css']
})

export class ListamunicipioComponent implements OnInit, AfterViewInit {

  filtrarPorNombreMunicipio: string;
  isActivo: boolean = false;
    
  displayedColumns: string[] = ['municipioID', 'nombreMunicipio', 'activo', 'nombreDepartamento', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoMunicipio: AccesodatosmunicipioService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.listarMunicipio();

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
    this.filtrarPorNombreMunicipio = "";
  }
  onRefrescar() {
    this.listarMunicipio();
  }

  //llamar al servicio para listar todos 
  listarMunicipio() {
    this.accesoMunicipio.getListarMunicipio().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();
    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }
  //llamar al servicio para hacer un filtro por nombre del municipio
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda

    //console.log(nombre);
    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoMunicipio.getDatosMunicipioPorNombre(nombre).subscribe((response: responseModel) => {
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
        this.notificationService.warn("Digite el nombre del municipio para hacer el filtro");
      }
    }
  }
  //metodo para crear un nuevo municipio
  onCreateMunicipio() {
    if (confirm('¿ Estas seguro de crear un nuevo nombre del municipio')) {
      this.emitirDatosService.habilitarCargando();
      const today = new Date();
      let dataMunicipio: municipio = {
        municipioID: 0, nombreMunicipio: null, departamentoID: 0, nombreDepartamento: null,
        activo: true, userIDCreacion: 1, fechaCreacion: today, userIDModificacion: null,
        fechaModificacion: null, titulo: 'Nuevo Municipio'
      };
      this.openDialog(dataMunicipio);
    }

  }
  //método para editar los datos del municipio 
  onEditarDatosMunicipio(municipioID: number) {
    if (confirm('¿ Estas seguro de editar los datos del municipio?')) {
      //console.log('entra');
      //debugger;
      //llama al servicio getDatosMunicipioPorId
      this.accesoMunicipio.getDatosMunicipioPorId(municipioID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          let dataMunicipio: municipio = response.data;
          dataMunicipio.titulo = 'Editar Municipio';
          this.openDialog(dataMunicipio);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  onEliminarDatosMunicipio(municipioID: number) {
    if (confirm('¿ Estas seguro de eliminar la sucursal ?')) {
      this.accesoMunicipio.deleteMunicipio(municipioID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar sucursales
          this.listarMunicipio();
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }
  
  //Metodo para abrir la ventana modal
  openDialog(dataMunicipio: municipio): void {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataMunicipio;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalmunicipioComponent, dialogConfig);
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarMunicipio();
    });
  }
}
