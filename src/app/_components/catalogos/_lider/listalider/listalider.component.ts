import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { lider } from 'src/app/_models/lider';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalliderComponent } from '../modallider/modallider.component';

import { AccesodatosliderService } from 'src/app/_services/accesodatoslider.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';

@Component({
  selector: 'app-listalider',
  templateUrl: './listalider.component.html',
  styleUrls: ['./listalider.component.css']
})
export class ListaliderComponent implements OnInit {

  filtrarPorNombreLider: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['liderID',  'identificacion',  'codigoLider', 'nombreLider', 'area', 'empresa','activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesolider: AccesodatosliderService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.listarLider();

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
    this.filtrarPorNombreLider = "";
    //establecer el focus en el input de la busqueda del lider
    document.getElementById("buscarLider").focus();
  }

  

  onRefrescar() {
    this.listarLider();
  }

  //llamar al servicio para listar todos 
  listarLider() {

    this.accesolider.getListarLider().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();

    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre del lider
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda

    //console.log(nombre);
    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesolider.getDatosLiderPorNombre(nombre).subscribe((response: responseModel) => {

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
        this.notificationService.warn("Digite el nombre del lider para hacer el filtro");
      }
    }
  }

  //método para crear Lider
  onCreateLider() {

    if (confirm('¿ Estas seguro de crear un nuevo registro lider?')) {
      this.emitirDatosService.habilitarCargando();

      const today = new Date();
      let dataLider: lider = {
        liderID: 0, nombreLider: null, codigoLider: null,
        area: null, empresa: null, identificacion: null,
        userIDCreacion: 1, fechaCreacion: today, userIDModificacion: null,
        fechaModificacion: null, title: 'Nuevo Lider', activo: true
      };
      this.openDialog(dataLider);
    }
  }

  //método para editar los datos del Lider 
  onEditarDatosLider(liderID: number) {

    if (confirm('¿Estas seguro de editar los datos del Lider?')) {
          
      //llama al servicio getDatoLiderPorId
      this.accesolider.getDatoLiderPorId(liderID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          const today = new Date();
          let dataLider: lider = response.data;
          dataLider.title = 'Editar Lider';
          this.openDialog(dataLider);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  onEliminarDatosLider(liderID: number) {

    if (confirm('¿ Estas seguro de eliminar la lider?')) {
      this.accesolider.deleteLider(liderID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar lider
          this.listarLider();

        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  //Metodo para abrir la ventana modal
  openDialog(dataLider: lider): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.data = dataLider;

    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalliderComponent, dialogConfig);

    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarLider();

    });
  }
}
