import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import * as moment from 'moment';

import { dropDownList } from 'src/app/_models/dropDownList';
import { filtroClientesFechLlamada } from 'src/app/_models/filtroClientesFechLlamada';
import { filtroLlamadaVendedor } from 'src/app/_models/filtroLlamadaVendedor';
import { listaLlamadasDelDiaVendedor } from 'src/app/_models/listaLlamadasDelDiaVendedor';
import { responseModel } from 'src/app/_models/responseModel';
import { datosVendedor } from 'src/app/_models/vendedor';
import { AccesollamadasvendedorService } from 'src/app/_services/accesollamadasvendedor.service';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { UtlidadesService } from 'src/app/_services/utlidades.service';

/*
export const MY_FORMATS = {
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
  selector: 'app-modalbuscarllamadasvendedor',
  templateUrl: './modalbuscarllamadasvendedor.component.html',
  styleUrls: ['./modalbuscarllamadasvendedor.component.css']
})
export class ModalbuscarllamadasvendedorComponent implements OnInit, AfterViewInit {

  frmGroupConsultaVendedor: FormGroup;
    
  displayedColumns: string[] = ['clienteID', 'nombreCliente', 'proximaLlamada', 'accion'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private emitirDatosService: AppService, private datePipe: DatePipe,
    private appS: AppService, private accesoLlamadaVendedor: AccesollamadasvendedorService,

    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModalbuscarllamadasvendedorComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: datosVendedor,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private utilidadService: UtlidadesService
  ) { }

  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit() {
    //habilitar cargando 
    this.emitirDatosService.habilitarCargando();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    //por defecto caundo instancia un tipo de datos Date se asignan fecha y hora de hoy
    let datafechaLlamada = new Date();
    //instanciar el formGroup
    this.frmGroupConsultaVendedor = new FormGroup({
        proximaLlamadaVendedor: new FormControl(datafechaLlamada),
        busquedaLlamadaVendedor: new FormControl('')
    });

    //llamar al metodo de buscar las llamadas
    this.onBuscarLlamadasVendedor();
  }

  //buscar las llamadas del vendedor
  onBuscarLlamadasVendedor(): void 
  {
      console.log('**** aqui voy ******')

      //mostrar la ruedita que esta cargando
      this.emitirDatosService.habilitarCargando();

      let fechaProxLlamada= new Date;
      fechaProxLlamada= this.f['proximaLlamadaVendedor'].value;
      console.log('fechaProxLlamada: ', fechaProxLlamada);

      let dataFiltroLlamadVend: filtroLlamadaVendedor = {
          vendedorID: this.data.vendedorID,
          //convertir la proxima llamada del vendedor(fecha) seleccionada en string         
          ProximaLlamadaVendedor:this.utilidadService.convertDateString(fechaProxLlamada),
          //obtener la busqueda diigitada por el usuario
          busqueda: this.f['busquedaLlamadaVendedor'].value
      }

      this.accesoLlamadaVendedor.listarLlamadasDelDiaVendedor(dataFiltroLlamadVend).subscribe({

          next: (response: responseModel) => {  
            //limpiar el grid      
            this.dataSource.data = null;
            //comprobar si el servidor retorno 1
            if (response.exito == 1) {
              console.log(response.data);
              //asignar los datos
              this.dataSource.data = response.data;
            }
            else {
              this.notificationService.warn(response.mensaje);
            }
            this.emitirDatosService.desactivarCargando();
          },

          error: (mensajeError: HttpErrorResponse) => {
            this.emitirDatosService.habilitarCargando();

          }
      });
  }

  onBuscarCliente(dataClienteID: string) {
    this.onClose(dataClienteID);
  }

  //cerar
  onClose(dataClienteID: string) 
  {

      let dataFiltro: filtroClientesFechLlamada =
      {
        clienteID: dataClienteID,
        vendedorID: this.data.vendedorID,
        fechaLlamada: new Date(this.frmGroupConsultaVendedor.get('proximaLlamadaVendedor').value)
      };

      //cerrar la ventana modal
      this.dialogRef.close(dataFiltro);
  }

  //buscar los datos 
  onBuscarDatosFiltrado(evento) 
  {

      console.log("***** el metodo se llama: onBuscarDatosFiltrado  ****")

      //si presiona la tecla de enter
      if (evento.keyCode == 13)
      {
          //obtener la busqueda
          let busqueda: string = this.frmGroupConsultaVendedor.get('busquedaLlamadaVendedor').value;

          let dataFiltroLlamadVend: filtroLlamadaVendedor = 
          {
            vendedorID: this.data.vendedorID,
            //convertir la proxima llamada del vendedor(fecha) seleccionada en string 
            ProximaLlamadaVendedor: this.utilidadService.convertDateString(this.frmGroupConsultaVendedor.get('proximaLlamadaVendedor').value),
            //obtener la busqueda diigitada por el usuario
            busqueda: busqueda
          }

        if (busqueda.length > 0)
        {
            this.emitirDatosService.habilitarCargando();    

            this.accesoLlamadaVendedor.listarLlamadasDelDiaVendedorPorFiltronombre(dataFiltroLlamadVend).subscribe(
              { 
                next: (response: responseModel) => {
                  this.dataSource.data=null;
                  //comprobar si el servidor retorno 1
                  if (response.exito == 1) {
                    this.dataSource.data = response.data;
                  }
                  else {
                    this.notificationService.warn(response.mensaje);
                  }
                  this.emitirDatosService.desactivarCargando();
                },
        
                error: (mensajeError: HttpErrorResponse) => {
                  this.emitirDatosService.habilitarCargando();
        
                }
            });        
        }
        else
        {
          this.onBuscarLlamadasVendedor();
        }

      }
  }


  get f() { return this.frmGroupConsultaVendedor.controls }

  obtenerColorTexto(llamadaDelDia: boolean): string {
    let color:string;
    color=llamadaDelDia? 'red': 'black';
    return color;
  }


  obtenerColorFondo(importancia: boolean): string {
    let color:string;
    color=importancia ? 'yellowgreen': 'white';    
    return color;
  }


}

