import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { sucursal } from 'src/app/_models/sucursal';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalsucursalComponent } from '../modalsucursal/modalsucursal.component';
import { AccesodatossucursalService } from 'src/app/_services/accesodatossucursal.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';


@Component({
  
  selector: 'app-listasucursal',
  templateUrl: './listasucursal.component.html',
  styleUrls: ['./listasucursal.component.css']
})
export class ListasucursalComponent implements OnInit, AfterViewInit {

  filtrarPorNombreSucursal: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['sucursalID', 'codigo', 'nombreSucursal', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoSucursal: AccesodatossucursalService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.listarSucursal();

    //console.log('aqui imprimir');

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
    this.filtrarPorNombreSucursal = "";
  }

  onRefrescar() {
    this.listarSucursal();
  }

  //llamar al servicio para listar todos 
  listarSucursal() {

    this.accesoSucursal.getListarSucursal().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();

    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre del banco
  getDatosPorFiltro(e, nombre: string) {
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda
    
    //console.log(nombre);
    if (e.keyCode === 13) {
      if (nombre.length > 0) {
        this.emitirDatosService.habilitarCargando();
        this.accesoSucursal.getDatosSucursalPorNombre(nombre).subscribe((response: responseModel) => {

          this.emitirDatosService.desactivarCargando();
          //comprobar si el filtro se encontro en la base de datos
          if (response.exito===1){
            this.dataSource.data = response.data;
          }
          else{
            
            this.dataSource.data = response.data;
            this.notificationService.warn(response.mensaje);
          }
                        
          }, (error: HttpErrorResponse) => {
            this.emitirDatosService.desactivarCargando();
            this.notificationService.warn(error.message);

          });
      } else {
        this.notificationService.warn("Digite el nombre de la sucursal para hacer el filtro");
      }
    }
  }

  //metodo para crear sucursal
  onCreateSucursal() {

    if (confirm('¿ Estas seguro de crear una nueva sucursal?')) {
      this.emitirDatosService.habilitarCargando();
      

      const today =  new Date();           
      let dataSucursal: sucursal = { sucursalID: 0, nombreSucursal: null, abreviatura: null, activo:true, 
                                     userIDCreacion:1, fechaCreacion: today, userIDModificacion:null, 
                                      fechaModificacion: null, title: 'Nueva Sucursal'};
      this.openDialog(dataSucursal);
    }
    
  }
  //método para editar los datos de la sucursal 
  onEditarDatosSucursal(sucursalID: number) {

    if (confirm('¿ Estas seguro de editar los datos de sucursal?')) {

      //console.log('entra');
      //debugger;

      //llama al servicio getDatosBancoPorId
      this.accesoSucursal.getDatoSucursalPorId(sucursalID).subscribe((response: responseModel) => {                
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {

          let dataSucursal: sucursal = response.data;
          dataSucursal.title = 'Editar Sucursal';
          this.openDialog(dataSucursal);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  } 

  onEliminarDatosSucursal(sucursalID: number) {

    if (confirm('¿ Estas seguro de eliminar la sucursal ?')) {
      this.accesoSucursal.deleteSucursal(sucursalID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar sucursales
          this.listarSucursal();

        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  //Metodo para abrir la ventana modal
  openDialog(dataSucursal: sucursal): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataSucursal;

    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalsucursalComponent, dialogConfig);

    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarSucursal();

    });
  }

}