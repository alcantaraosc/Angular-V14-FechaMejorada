
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//servicio
import { NotificationService } from 'src/app/_services/notification.service';
import { AccesooportunidadService } from 'src/app/_services/accesooportunidad.service';
//modelo
import { oportunidad } from 'src/app/_models/oportunidad';
import { responseModel } from 'src/app/_models/responseModel';
//otros
import {MatTableModule} from '@angular/material/table';
import { ModaloportunidadComponent } from '../modaloportunidad/modaloportunidad.component';
import { AppService } from 'src/app/_services/app.service';
import { UtlidadesService } from 'src/app/_services/utlidades.service';
//import * as moment from 'moment';


@Component({
  selector: 'app-listaoportunidades',
  templateUrl: './listaoportunidades.component.html',
  styleUrls: ['./listaoportunidades.component.css']
})
export class ListaoportunidadesComponent implements OnInit, AfterViewInit {

  //esta variable es utilizada para recibir el numero de identificacion del cliente que envia el componente modalclientes. 
  @Input() NoIdentificacionCliente: string;
  @Input() NoOportunidadID: number
  @Input() estadoBotonNuevoOport: boolean

  
  //public listaTipoFiltro: dropDownList;
  //public listaClientes: listaClientes;
  public textBoxConsultaCliente: string;
  public tipoFilltro: string;
  
  //public dataRangoFechas: rangoFecha;
  //start = new Date();
  //end = new Date();
  
  displayedColumns: string[] = ['oportunidadID', 'nombrePmf', 'sucursal', 'clase', 'statusVendedor', 'proximaLlamadaVendedor', 'accion'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private appS:AppService,private accesoOportunidad: AccesooportunidadService,
    private notificationService: NotificationService, private datePipe: DatePipe, private _adapter: DateAdapter<any>,
    private dialog: MatDialog, private utilidadService: UtlidadesService ) {

  }

  //al iniciar el componente
  ngOnInit(): void { 
        
     //verificar si el cliente es diferente a vacio entonces siginifica que es nuevo.
    if (this.NoIdentificacionCliente != null)
    {
        this.onListarOportunidades();        
        //activar el boton el nueva oportunidad
        this.estadoBotonNuevoOport = false;        
    }
    else
    {
       //desactivar el boton el nueva oportunidad
       this.estadoBotonNuevoOport = true;   
        //desactivar cargando ...
        this.appS.desactivarCargando();
    }
    
  }


  valueChanged(): void {    
    this.onListarOportunidades();
  }



  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit() {
      //this.fech = new Date();    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

  }

  /* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
  addDayDate(fecha: Date, dias: number) {
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
  }


  //Listar las oportunidades
  onListarOportunidades(): void {
      //llama al servicio para obtener la lista de Oportunidades   
      this.accesoOportunidad.listarOportunidad(this.NoIdentificacionCliente).subscribe((post: responseModel ) => {  
        
        if (post.exito==1)
        {
          this.dataSource.data = post.data               
        }
        //emitir el valor false, para detener cargando..
        this.appS.desactivarCargando();

        }, (mensajeError: HttpErrorResponse) => {
          //emitir el valor false, para detener cargando..
          this.appS.desactivarCargando();
          this.notificationService.warn(mensajeError.message);

      });
    
  }


  onBuscarCliente() {
    
  }

  //buscar al cliente por Id
  onBuscarPorIdClientes(e, idCliente: string) {
    //si el usuario presiona la tecla enter
    if (e.KeyCode === 13) {
      if (idCliente.length > 0) {
        this.notificationService.warn("En Desarrollo");
      }
    }
  }



  onReset() {

  }


  onCrearNuevaOportunidad() {

    if (confirm('¿ Estas seguro de crear una nueva oportunidad ?')) 
    {
        //let fechaToday = new Date(); 
        var nowToday = new Date();
        let dataOportunidad: oportunidad = 
        {
          oportunidadID: null, noOportunidad:0, clienteID: this.NoIdentificacionCliente, comentarioVendedor: null, cantidad:0, financieraID:0, 
          prima:null, visitaID: 0, proximaLlamadaVendedor:null, motivoID: 0, liderID: 0, vendedorID: 0,  pruebaManejo:false, sucursalID:0, 
          procesado: false, pmfVhID:0, modeloID:0, codVendeOrigen:null, nombreVendeOrigen:null, tipoClaseID: 0, proximaLlamadaLider:null, 
          estatusDacID:1, codStaLIDER: null, proximaLlamadaDac:null, estatusFinancieroID:1, fechaModificacion:null, proximaLlamadaFinanciero:null, 
          hora_Op:null, proximaLlamadaTele: null, estatusTeleID: 1, ventaPerdida:null, contacto:null, correo:null, celular:null, telefono: null, 
          programado: false, estatusOportunidadID:0, fechaCierreOport: null, poseeVhValorString: null, leInteresaAvaluoValorString:null, 
          añoModelo:null, realizoAvaluoValorString:null, aplicaAvaluoValorString:null,  modeloVHquePosee: null, 
          userIDCreacion: 0, fechaCreacion: this.utilidadService.convertDateHourString(nowToday), userIDModificacion: 0, isNuevaOportunidad:true
        };
        dataOportunidad.titulo = "Nueva oportunidad";
        this.openDialog(dataOportunidad);

    }

  }

  onEditarOportunidad(oportunidadID: string) {
    if (confirm('¿ Estas seguro de editar los datos de Oportunidad ?')) {
     
      //llama al servicio getDatosEstadoCivilPorId
      this.accesoOportunidad.getDatosOportunidadPorId(oportunidadID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito == 1) {          
          const today = new Date();

          let dataOportunidad: oportunidad = response.data;
          //indicar que la oportunidad se va editar
          dataOportunidad.isNuevaOportunidad=false;
          dataOportunidad.titulo = 'Editar registro de la oportunidad - ' + dataOportunidad.oportunidadID  ;
          this.openDialog(dataOportunidad);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }

      });
    }

  }

  onEliminarOportunidad(oportunidadID: string) {

  }

  //Metodo para abrir la ventana modal
  openDialog(dataOportunidad: oportunidad): void 
  {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '80%';
      dialogConfig.data = dataOportunidad;
  
      //llamar a la ventana modal
      const dialogRef = this.dialog.open(ModaloportunidadComponent, dialogConfig);
      //despues que se cierre la venta llama aun suscribirse 
      dialogRef.afterClosed().subscribe(result => {
        this.onListarOportunidades();
      });
  }

  

}