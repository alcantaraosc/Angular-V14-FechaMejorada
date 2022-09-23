import { Component, OnInit, AfterViewInit, ViewChild  } from '@angular/core';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalestatusdacComponent } from '../modalestatusdac/modalestatusdac.component';
import { AccesoestatusdacService } from 'src/app/_services/accesoestatusdac.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';
import { Estatusdac } from 'src/app/_models/estatusDac';

@Component({
  selector: 'app-listaestatusdac',
  templateUrl: './listaestatusdac.component.html',
  styleUrls: ['./listaestatusdac.component.css']
})
export class ListaestatusdacComponent implements OnInit, AfterViewInit {
  
  filtrarPorNombreEstatusdac: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['estatusDacID', 'nombreEstatusDac', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoEstatusdac: AccesoestatusdacService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.listarEstatusDac();
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
    this.filtrarPorNombreEstatusdac = "";
  }

  onRefrescar() {

    this.listarEstatusDac();

  }

  //llamar al servicio para listar todos 
  listarEstatusDac() {

    this.accesoEstatusdac.getListarEstatusdac().subscribe((post: any) => {
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
        this.accesoEstatusdac.getDatosEstatusdacPorNombre(nombre).subscribe((response: responseModel) => {

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
        this.notificationService.warn("Digite el nombre de estatusDac para hacer el filtro");
      }
    }
  }

  //metodo para crear estatusDac
  onCreateEstatusDac() {

    if (confirm('¿ Estas seguro de crear un nuevo EstatusDac?')) {
      this.emitirDatosService.habilitarCargando();
      

      const today =  new Date();           
      let dataEstatusDac: Estatusdac = {estatusDacID: 0, nombreEstatusDac: null, activo:true, 
                                     userIDCreacion:1, fechaCreacion: today, userIDModificacion:null, 
                                      fechaModificacion: null, titulo: 'Nueva EstatusDac'};
      this.openDialog(dataEstatusDac);
    }
    
  }
  //método para editar los datos de EstatusDac 
  onEditarDatosEstatusDac(estatusDacId: number) {

    if (confirm('¿ Estas seguro de editar los datos de EstatusDac?')) {

      //llama al servicio getDatoEstatusDacPorId
      this.accesoEstatusdac.getDatoEstatusDacPorId(estatusDacId).subscribe((response: responseModel) => {                
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {

          let dataEstatusDac: Estatusdac = response.data;
          dataEstatusDac.titulo = 'Editar EstatusDac';
          this.openDialog(dataEstatusDac);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  } 

  onEliminarDatosEstatusDac(estatusDacId: number) {

    if (confirm('¿ Estas seguro de eliminar la Estatus Dac?')) {
      this.accesoEstatusdac.deleteEstatusDac(estatusDacId).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar EstatusDac
          this.listarEstatusDac();

        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  //Metodo para abrir la ventana modal
  openDialog(dataEstatusDac: Estatusdac): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    dialogConfig.data = dataEstatusDac;

    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalestatusdacComponent, dialogConfig);

    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarEstatusDac();

    });
  }
}
