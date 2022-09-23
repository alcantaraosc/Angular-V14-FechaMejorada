import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { visita } from 'src/app/_models/visita';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalvisitaComponent } from '../modalvisita/modalvisita.component';
import { AccesodatosvisitaService } from 'src/app/_services/accesodatosvisita.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';
import { ModalclientesComponent } from 'src/app/_components/clientes/modalclientes/modalclientes.component';


@Component({
  selector: 'app-listavisita',
  templateUrl: './listavisita.component.html',
  styleUrls: ['./listavisita.component.css']
})
export class ListavisitaComponent implements OnInit {

  filtrarPorNombreVisita: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['visitaID', 'nombreVisita', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoVisita: AccesodatosvisitaService,
    private dialog: MatDialog,
    private notificationService: NotificationService) {

  }
  ngOnInit(): void {

    this.listarVisita();

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
    this.filtrarPorNombreVisita = "";
  }

  onRefrescar() {
    this.listarVisita();
  }
  //llamar al servicio para listar todos 
  listarVisita() {
    this.accesoVisita.getListarVisita().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();
    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre Visita
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda

    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoVisita.getDatosVisitaPorNombre(nombre).subscribe((response: responseModel) => {
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
        this.notificationService.warn("Digite la Descripción visita para hacer el filtro");
      }
    }
  }

  //metodo para crear Visita
  onCreateVisita() {

    if (confirm('¿ Estas seguro de crear un nuevo registro?')) {
      this.emitirDatosService.habilitarCargando();
      const today = new Date();
      let dataVisita: visita = {
        visitaID: 0, nombreVisita: null, activo: true,
        userIDCreacion: 1, fechaCreacion: today, userIDModificacion: null,
        fechaModificacion: null, title: 'Nueva Visita'
      };
      this.openDialog(dataVisita);
    }

  }
  
  //método para editar los datos del visita
  onEditarDatosVisita(visitaID: number) {

    if (confirm('¿ Estas seguro de editar los datos visita?')) {

      //llama al servicio getDatoVisitaPorId
      this.accesoVisita.getDatoVisitaPorId(visitaID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          let dataVisita: visita = response.data;
          dataVisita.title = 'Editar Visita';
          this.openDialog(dataVisita);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }

      });
    }
  }

  onEliminarDatosVisita(visitaID: number) {
    if (confirm('¿ Estas seguro de eliminar visita ?')) {
      this.accesoVisita.deleteVisita(visitaID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mensaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar visita
          this.listarVisita();
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  //Metodo para abrir la ventana modal
  openDialog(dataVisita: visita): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataVisita;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalvisitaComponent, dialogConfig);
    //Despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarVisita();
    });
  }
}
