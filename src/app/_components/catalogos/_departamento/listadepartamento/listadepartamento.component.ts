import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModaldepartamentoComponent } from '../modaldepartamento/modaldepartamento.component'
import {AccesodatosdepartamentoService } from 'src/app/_services/accesodatosdepartamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';
import { departamento } from 'src/app/_models/departamento';

@Component({
  selector: 'app-listadepartamento',
  templateUrl: './listadepartamento.component.html',
  styleUrls: ['./listadepartamento.component.css']
})
export class ListadepartamentoComponent implements OnInit, AfterViewInit {

  filtrarPorNombreDepartamento: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['departamentoID', 'nombreDepartamento', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoDepartamento: AccesodatosdepartamentoService, 
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    
    this.listarDepartamento();
    
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
    this.filtrarPorNombreDepartamento= "";
    document.getElementById("buscardepartamento").focus();
  }
  onRefrescar() {
    this.listarDepartamento();
  }
  //llamar al servicio para listar todos 
  listarDepartamento() {
    this.accesoDepartamento.getListarDepartamento().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();
    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }
  //llamar al servicio para hacer un filtro por nombre del departamento
  getDatosPorFiltro(e, nombre: string) {

    //si la tecla (13 es enter) es enter, entonces realizar la busqueda

    //console.log(nombre);
    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoDepartamento.getDatosDepartamentoPorNombre(nombre).subscribe((response: responseModel) => {
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
        this.notificationService.warn("Digite el nombre del departamento para hacer el filtro");
      }
    }
  }
  //metodo para crear Departamento
  onCreateDepartamento() {
    if (confirm('¿ Estas seguro de crear el nuevo departamento?')) {
      this.emitirDatosService.habilitarCargando();
      const today = new Date();
      let dataDepartamento: departamento = {
        departamentoID: 0, nombreDepartamento: null, activo: true,
        userIDCreacion: 1, fechaCreacion: today, userIDModificacion: null,
        fechaModificacion: null, titulo: 'Nuevo Departamento'
      };
      this.openDialog(dataDepartamento);
    }

  }
  //método para editar los datos del departamento
  onEditarDatosDepartamento(departamentoID: number) {
    if (confirm('¿ Estas seguro de editar los datos del departamento?')) {   
      //llama al servicio getDatosdepartamentoPorId     
      this.accesoDepartamento.getDatoDepartamentoPorId(departamentoID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          let dataDepartamento: departamento = response.data;
          dataDepartamento.titulo = 'Editar Departamento';
          this.openDialog(dataDepartamento);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  onEliminarDatosDepartamento(departamentoID: number) {
    if (confirm('¿ Estas seguro de eliminar la departamento ?')) {
      this.accesoDepartamento.deleteDepartamento(departamentoID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar departamentos
          this.listarDepartamento();
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  //Metodo para abrir la ventana modal
   openDialog(dataDepartamento: departamento): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataDepartamento;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModaldepartamentoComponent, dialogConfig);
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarDepartamento();
    });
  }
}
