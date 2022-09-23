import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import { PersonalDac } from 'src/app/_models/personaldac';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalpersonaldacComponent } from '../modalpersonaldac/modalpersonaldac.component';
import { AccesopersonaldacService } from 'src/app/_services/accesopersonaldac.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-listapersonaldac',
  templateUrl: './listapersonaldac.component.html',
  styleUrls: ['./listapersonaldac.component.css']
})
export class ListapersonaldacComponent implements OnInit {

  filtrarPorNombrePersonalDac: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['personalDacID', 'nombrePersonalDac', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesopersonaldac: AccesopersonaldacService ,
    private dialog: MatDialog,
    private notificationService: NotificationService) {
  }


  ngOnInit(): void {

    this.listarPersonalDac();
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
    this.filtrarPorNombrePersonalDac = "";
  }
  onRefrescar() {
    this.listarPersonalDac();
  }
  //llamar al servicio para listar todos 
  listarPersonalDac() {
    this.accesopersonaldac.getListarPersonalDac().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();
    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre Personal Dac
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda

    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesopersonaldac.getDatosPersonalDacPorNombre(nombre).subscribe((response: responseModel) => {
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
        this.notificationService.warn("Digite el nombre Personal Dac para hacer el filtro");
      }
    }
  }
  //metodo para crear Personal Dac
  onCreatePersonalDac() {
    if (confirm('¿ Estas seguro de crear un nuevo Personal Dac?')) {
      this.emitirDatosService.habilitarCargando();
      const today = new Date();
      let dataPersonalDac: PersonalDac = {
        personalDacID: 0, nombrePersonalDac: null, activo: true,
        userIDCreacion: 1, fechaCreacion: today, userIDModificacion: null,
        fechaModificacion: null, title: 'Nuevo PersonalDac'
      };
      this.openDialog(dataPersonalDac);
    }

  }
  //método para editar los datos del Personal Dac
  onEditarDatosPersonalDac(personalDacID: number) {
    if (confirm('¿ Estas seguro de editar los datos Personal Dac?')) {

      //llama al servicio getDatoTipoClasePorId
      this.accesopersonaldac.getDatoPersonalDacPorId(personalDacID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          let dataPersonalDac: PersonalDac = response.data;
          dataPersonalDac.title = 'Editar Personal Dac';
          this.openDialog(dataPersonalDac);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  onEliminarDatosPersonalDac(personalDacID: number) {
    if (confirm('¿ Estas seguro de eliminar PersonalDac ?')) {
      this.accesopersonaldac.deletePersonalDac(personalDacID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar tipo clase
          this.listarPersonalDac();
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }
  //Metodo para abrir la ventana modal
  openDialog(dataPersonalDac: PersonalDac): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataPersonalDac;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalpersonaldacComponent, dialogConfig);
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarPersonalDac();
    });
  }


}
