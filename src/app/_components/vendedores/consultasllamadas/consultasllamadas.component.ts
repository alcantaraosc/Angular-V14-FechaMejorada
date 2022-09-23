import { DatePipe } from '@angular/common';

import { listaLlamadasDelDiaVendedor } from 'src/app/_models/listaLlamadasDelDiaVendedor';
import { AccesollamadasvendedorService } from 'src/app/_services/accesollamadasvendedor.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { estadoCivil } from 'src/app/_models/estadoCivil';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/_services/notification.service';
import { EnviardatosService } from 'src/app/_services/enviardatos.service';
import { tipoIdentificacion } from 'src/app/_models/tipoIdentificacion';
import { responseModel } from 'src/app/_models/responseModel';
import { ModalbuscarllamadasvendedorComponent } from '../modalbuscarllamadasvendedor/modalbuscarllamadasvendedor.component';
import { AccesoclientesService } from 'src/app/_services/accesoclientes.service';
import { FormControl, FormGroup } from '@angular/forms';
import { datosVendedor, vendedor } from 'src/app/_models/vendedor';
import { AccesodatosvendedorService } from 'src/app/_services/accesodatosvendedor.service';
import { clientes } from 'src/app/_models/clientes';
import { AccesooportunidadService } from 'src/app/_services/accesooportunidad.service';
import { listarOportunidades } from 'src/app/_models/listarOportunidades';
import { AppService } from 'src/app/_services/app.service';
import { Subscription } from 'rxjs';
import { ComunicacionService } from 'src/app/_services/comunicacion.service';
import { User } from 'src/app/_models';
import { dropDownList } from 'src/app/_models/dropDownList';
import { filtroClientesFechLlamada } from 'src/app/_models/filtroClientesFechLlamada';
import { clientesOportunidades } from 'src/app/_models/clientesOportunidades';






// Declaramos las variables para jQuery
declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-consultasllamadas',
  templateUrl: './consultasllamadas.component.html',
  styleUrls: ['./consultasllamadas.component.css']
})
export class ConsultasllamadasComponent implements OnInit {

  mensaje: string;

  //FormGroup.
  formGroupListVendedor: FormGroup;

  dataUser: User;
  dataVendedorId: number;
  dataVendedor: string;
  public cantidadOportunidad: number=0;
  
  listVendedores: vendedor[];
  public clienteID: string;
  public tipoCliente: string;
  public cliente: string;
  public telefono: string;
  public telefonoHabit: string;
  public celular: string;
  public email: string;

  public dataOportunidad: listarOportunidades[];
  public nombreContato: string;
  public emailContacto: string;
  public celularContacto: string;
  public telefonoContacto: string;
  public getOportunidadID: string;
  datosAccesosSubscription: Subscription;
  public accesoSistema: string[];

  //la variable displayedColumns no esta funcionando
  displayedColumns: string[] = ['noOportunidad', 'Lider', 'nombrePmf', 'cantidad', 'sucursal', 'statusVendedor', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  //constructor
  constructor(private accesoDatosService: AccesodatosService,
    private accesoClientesService: AccesoclientesService,
    private accesoOportunidadService: AccesooportunidadService,
    private accesoVendedor: AccesodatosvendedorService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private appS: AppService) { }

  ngOnInit(): void {

    this.dataUser = JSON.parse(localStorage.getItem('user').toString());

    //llamar al metodo para llenar el drownList del vendedor
    this.onListarVendedores();
    this.dataVendedorId = this.dataUser.vendedorID;

    //instanciar el formGroup
    this.formGroupListVendedor = new FormGroup({
      vendedorID: new FormControl(this.dataVendedorId)
    });
    //asignar el id del vendedor.
    this.formGroupListVendedor.get('vendedorID').patchValue(this.dataUser.vendedorID.toString());

  }


  get f() { return this.formGroupListVendedor.controls }


  //metodo para ara llenar el DrownList del vendedor.
  onListarVendedores() {
    //llamar al servicio para llenar el DrownList del vendedor.
    this.accesoVendedor.listarDrownListVendedoresActivos().subscribe((response: responseModel) => {
      //revisar si la respuesta del servidor fue exitosa
      if (response.exito == 1) {
        this.listVendedores = response.data;

      }
      else {
        this.notificationService.warn(response.mensaje);
      }

    }, (mensajeError: HttpErrorResponse) => {
      this.notificationService.warn(mensajeError.message);

    });
  }

  //metodo buscar las llamadas del vendedoor
  onBuscarLlamadasVendedor() {
    //abrir la ventana modal
    this.openDialog();
  }

  //Metodo para abrir la ventana modal
  openDialog(): void {

    //obtener el vendedorID del drownList
    this.dataVendedorId = parseInt(this.f['vendedorID'].value);
    //consultar para obtener el nombre del vendedor
    var dataNombreVendedor = this.listVendedores.find(({ vendedorID }) => vendedorID === this.dataVendedorId).nombreVendedor.toString();

    //asignarlo en un arreglo
    let dataArray: datosVendedor = { vendedorID: this.dataVendedorId, nombreVendedor: dataNombreVendedor };

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '730px';
    //asignar el vendedorID y el nombre del vendedor
    dialogConfig.data = dataArray;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalbuscarllamadasvendedorComponent, dialogConfig);

    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe((dataFiltro: filtroClientesFechLlamada) => {

      //verificar si no fue cancelado la ventana modal (-1 cancelado)
      if (dataFiltro.clienteID !== '-1') {

        this.accesoOportunidadService.listarClientesOportunidad(dataFiltro).subscribe({
          next: (response: responseModel) => {
           
            if (response.exito === 1) {
              
              //obtener el registro de la respuesta del servidor
              this.dataOportunidad = response.data.listarOportunidades;
              //obtener la cantidad de oportunidad
              this.cantidadOportunidad=this.dataOportunidad.length;
              this.clienteID = response.data.clienteID;
              this.tipoCliente = response.data.tipoCliente;
              this.cliente = response.data.cliente;
              this.telefono = response.data.telefOfic;
              this.telefonoHabit = response.data.telefHabit;
              this.celular = response.data.celular;
              this.email = response.data.email;

              const fechaHoy=new Date();             
              
              //llamar al metodo para para limpiar las listas de llamadas                                    
              this.onBuscarOportunidad("", fechaHoy);
            }

          },

          error: (error: HttpErrorResponse) => {           
            console.log(error.message);        
          }
        });

      }
    });

  }


  //evento para buscar la oportunidad.
  onBuscarOportunidad(oportunidadID: string, fechaProximaLlamada: Date): void {
    //enviar el numero de oportunidad por servicio
    this.appS.enviarOportunidadToListaLlamadaVendendor(oportunidadID, fechaProximaLlamada);
    //llamar obtener algunos datos oportunidad de la base de datos
    this.onObteneralgunosDatosOportonudad(oportunidadID);
  }

  //evento para seleccionar el vendedorID del cliente
  onSeleccionarVendedor($event): void {
    this.dataVendedorId = $event.value;
    this.dataVendedor = $event.source.selected.viewValue;
  }

  onObteneralgunosDatosOportonudad(oportunidadId: string) {

    //comprobar si la variable oportunidadId tiene registro
    if (oportunidadId !== '') {
      this.accesoOportunidadService.getAlgunosDatosOportunidadPorId(oportunidadId).subscribe((response: responseModel) => {
        if (response.exito === 1) {
          let oportunidad = response.data;          
          this.nombreContato = oportunidad.contacto;
          this.emailContacto = oportunidad.correo;
          this.celularContacto = oportunidad.celular;
          this.telefonoContacto = oportunidad.telefono;
        }
      });
    }
  }

  obtenerColorTexto(llamadaDelDia: boolean){
    let color:string;
    color=llamadaDelDia? 'red': 'black';
    return color;
  }
}


