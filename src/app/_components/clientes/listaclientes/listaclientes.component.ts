import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { FormGroup, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

import { AccesoclientesService } from 'src/app/_services/accesoclientes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { dropDownList } from 'src/app/_models/dropDownList';
import { rangoFecha } from 'src/app/_models/rangoFecha';
import { listaClientes } from 'src/app/_models/listaClientes';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

//import * as moment from 'moment';
import { clientes } from 'src/app/_models/clientes';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModalclientesComponent } from '../modalclientes/modalclientes.component';
import { responseModel } from 'src/app/_models/responseModel';
import { ComunicacionService } from 'src/app/_services/comunicacion.service';
//import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_services/app.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UtlidadesService } from 'src/app/_services/utlidades.service';

//import { $ } from 'protractor';




// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
//import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
//import {default as _rollupMoment, Moment} from 'moment';

//const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/

/*export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};*/


@Component({
  selector: 'app-listaclientes',
  templateUrl:'./listaclientes.component.html',
  styleUrls: ['./listaclientes.component.css'],

})

export class ListaclientesComponent implements OnInit, AfterViewInit {
    
  public listaTipoFiltro: dropDownList[];
  public listaClientes: listaClientes;

    //variable para seleccionar por defecto 
  //el select del tipo de filtro
  public filltroSeleccionado: string;
  public textBusqueda: string;
  public accesoSistema: string[];

  public dataRangoFechas: rangoFecha;
  start = new Date();
  end = new Date();

  //rango para fecha y de tipo FormGroup.
  range: FormGroup;
  //por defecto caundo instancia un tipo de datos Date se asignan fecha y hora de hoy
  fechaStart = new Date();
  fechaEnd = new Date();

  displayedColumns: string[] = ['clienteID', 'nombreCliente', 'contacto', 'tipo', 'sucursal', 'procesado', 'revisado', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private appS: AppService,  private accesoclientes: AccesoclientesService, private comunicacionService: ComunicacionService,
    private notificationService: NotificationService, private datePipe: DatePipe, private _adapter: DateAdapter<any>,
    private dialog: MatDialog,  private authorizado: AuthenticationService, private utilidadService: UtlidadesService ){
  }

  ngOnInit(): void {
      
    //emitir un valor true para mostrar cargando.
    this.appS.config.emit(true);

    console.log(this.fechaStart);
    console.log(this.fechaEnd);

    //restar -5 dias a la fecha
    this.fechaStart = this.addDayDate(this.fechaStart, -6);

    //instanciar el formGroup
    this.range = new FormGroup({
      start: new FormControl<Date>(this.fechaStart),
      end: new FormControl<Date>(this.fechaEnd)
    });

    //this.datePipe.transform(fechaStart, "yyyy-MM-dd"); 
    // this.datePipe.transform(fechaEnd, "yyyy-MM-dd"); 


    //console.log('la fecha inicial:', fechaStart);
    //console.log('La fecha final es: ', fechaEnd);


    // this.range.controls['start'].setValue();
    // this.range.controls['end'].setValue(moment(fechaEnd).format('DD MM YYYY'));


    do{
      //seleccionar el valor del filtro (por defecto), cuando carga por primera vez
      this.filltroSeleccionado= this.onObtenerTipofiltroCache();

      if (this.filltroSeleccionado == null)
      {
        //guardar en la cache el tipo de filtro
        this.onGuardarTipoFiltroCache("ClienteID");
      }


    } while (this.filltroSeleccionado == null);
 

    this.onLlenarTipoFiltro(this.filltroSeleccionado);
    this.onListarClientes();
   
  }

  onAccesoSistema(itemAcceso: string[]): boolean{
    return this.authorizado.obtenerAccesoDelsistema(itemAcceso);
  }

  //guardar el tipo de filtro en la cache
  onGuardarTipoFiltroCache(value: string ){   

    //comprobar si el tipo de filtro de la cache es diferente al valor que se va a guardar
    if (this.onObtenerTipofiltroCache()!== value){
      //guardar el cache del navegador el tipo de filtro
      localStorage.setItem('tipofiltroCache', value);
    }    
  }

  //obtener el tipo de filtro de la cache
  onObtenerTipofiltroCache(): string {
    //obtener el ultimo tipo de filtro que se hizo
    var tipofiltroCache = localStorage.getItem('tipofiltroCache');
    return tipofiltroCache;    
  }

  //llenar el tipo de Filtro el DrownList
  onLlenarTipoFiltro(datoFiltro: string): void {

    this.accesoclientes.listarTipoFiltroCliente(datoFiltro).subscribe((response: dropDownList[]) => {
      this.listaTipoFiltro=response;
    }, (mensajeError: HttpErrorResponse) => {
      this.notificationService.warn(mensajeError.message);
    });
  }


  valueChanged(): void {
    
    this.onListarClientes();
  }



  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit() {
    //this.fech = new Date();    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  /* Función que suma o resta días a una fecha, si el parámetro  días es negativo restará los días*/
  addDayDate(fecha: Date, dias: number) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }


  //Listar las fecha de rango
  onListarClientes(): void {

    //declarar un arreglo de tipo fecha con la fecha de incio y fecha final
    let dataRango: Array<string> = [
      this.utilidadService.convertDateString(this.range.get('start').value),
      this.utilidadService.convertDateString(this.range.get('end').value)
    ]
    
    //comprobar si la fecha de inicio esta vacia y la fecha final esta vacio. (el filtro de fecha es la fecha de creacion del registro del cliente)
    if (this.range.get('start').value != null && this.range.get('end').value != null) {
      //habilitar la ruedita cargando 
      this.appS.habilitarCargando();

      this.accesoclientes.listarClientes(dataRango).subscribe(post => {
        (this.dataSource.data = post)
        this.appS.config.emit(false);

      }, (mensajeError: HttpErrorResponse) => {
        this.appS.config.emit(false);
        this.notificationService.warn(mensajeError.message);

      });
    }

  }

  //buscar datos del cliente 
  onBuscarCliente() {

    this.appS.habilitarCargando();
    //guardar el tpo de filtro para que la proxima vez me muestre la ultimo filtro
    this.onGuardarTipoFiltroCache(this.filltroSeleccionado);
   
    //llama al servicio
    this.accesoclientes.getListaClientesPorFiltros(this.filltroSeleccionado, this.textBusqueda).subscribe(post => {

      (this.dataSource.data = post);
      this.appS.config.emit(false);

    }, (mensajeError: HttpErrorResponse) => {
      this.appS.config.emit(false);
      this.notificationService.warn(mensajeError.message);

    });
  }


  //evento Key  KeyPress
  onEventoKeyPressBuscar(e, nombre: string) {
      
    //si el usuario presiona la tecla enter (13 es enter), entonces realizar la busqueda
    if (e.keyCode===13) {
      //console.log('has presionado enter');
      this.onBuscarCliente();
    }
  }


  onReset() {
    this.textBusqueda="";
    //poner en el focus en la busqueda.
    document.getElementById("busquedaCliente").focus();
  }

  //nuevo cliente
  onCrearNuevoClientes() {

    if (confirm('¿ Estas seguro de crear un nuevo cliente ?')) 
    {
      const dateNowToday = new Date();      
     
      let dataClientes: clientes = 
      {
          nuevoCliente: true, clienteID: null, nombreCliente: null, direccion: null, contacto: null, telefonos: null, edad: 0, tipoSexoID: 0, procesado: false,
          email: null, email2: null, email3: null, telefonoHab: null, tipoIdentificacionID: 0, estadoCivilID: 0,
          celular: null, departamentoID: 0, municipioID: 0, sucursalID: 0, ocupacion: null, fax: null, revisado: false, clienteIndeseable: false, personeriaID: 0,
          pep: null, fechaCreacion: this.utilidadService.convertDateHourString(dateNowToday)
      };
      dataClientes.titulo = "Nuevo cliente";
      this.openDialog(dataClientes);
    }

  }

  //editar la tarjeta del cliente
  onEditarClientes(clienteID: string) {
    if (confirm('¿ Estas seguro de editar los datos del cliente ?')) {

      //llama al servicio
      this.accesoclientes.getDatosClientePorId(clienteID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito == 1) {

          const today = new Date();

          let dataCliente: clientes = response.data;
          dataCliente.titulo = 'Editar registro del cliente';
          this.openDialog(dataCliente);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }

      });

    }

  }

  onEliminarClientes(clienteID: string) {

  }

  //Metodo para abrir la ventana modal
  openDialog(dataClientes: clientes): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '980px';
    dialogConfig.data = dataClientes;


    //despues que se cierre la venta modal se ejecuta 
    const dialogRef = this.dialog.open(ModalclientesComponent, dialogConfig);

    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.onListarClientes();

    });

  }


  onEnviarDatosCliente(clienteID: string){
    //this.comunicacionService.enviarMensaje(clienteID);    
    this.comunicacionService.setNoIdentificacionCliente(clienteID);
    
  }

}
