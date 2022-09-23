import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { dropDownList } from 'src/app/_models/dropDownList';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { responseModel } from 'src/app/_models/responseModel';
import { NotificationService } from 'src/app/_services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccesoclientesService } from 'src/app/_services/accesoclientes.service';
import { vistaFichaClientes } from 'src/app/_models/vistaFichaClientes';
import { lider } from 'src/app/_models/lider';
import { AccesodatosliderService } from 'src/app/_services/accesodatoslider.service';
import { drownListLideresVendedor } from 'src/app/_models/drownListLideresVendedor';
import { vendedor } from 'src/app/_models/vendedor';
import { AccesodatosvendedorService } from 'src/app/_services/accesodatosvendedor.service';
import { NumberSymbol } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from 'src/app/_services/app.service';
import { parametrostemporales } from 'src/app/_models/parametrostemporales';

@Component({
  selector: 'app-revisionfclientes',
  templateUrl: './revisionfclientes.component.html',
  styleUrls: ['./revisionfclientes.component.css'],
})
export class RevisionfclientesComponent implements OnInit {

  //FormGroup.
  /*frmGroupfechaRevisionCliente: FormGroup;
  frmGroupListLider: FormGroup;*/

  frmRevisionCliente: FormGroup;

  public filtroselect: string;

  public filtroTipoRevision: dropDownList[];
  listaLideresVendedor: drownListLideresVendedor;

  //Para listar los drwonlins vendededor y lider
  listLideres: lider[];
  listVendedor: vendedor[];

  //variable para seleccionar por defecto
  //el select del tipo de filtro
  public tipoFilltroSeleccionado: string;
  public liderID: string = '0';
  public vendedorID: string = '0';
  public onSeleccionarVend: number;

  /*displayedColumns: string[] = [
    'clienteID',
    'nombreCliente',
    'contacto',
    'nombreIdentificacion',
    'comentarioLider',
    'fechaCreacion',
    'nombreLider',
    'nombreVendedor',
  ];
  dataSource = new MatTableDataSource();*/

  /* @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
   @ViewChild(MatSort, { static: true }) sort: MatSort;*/

  //constructor
  constructor(
    private appS: AppService,
    private accesoclientes: AccesoclientesService,
    private accesodatoslider: AccesodatosliderService,
    private accesovendedor: AccesodatosvendedorService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,

  ) {
    // console.log('primero');
    //llamar el metodo del llenado el drownlist
    this.onLlenarFiltroTipoCliente('FichasdeClientes');

    //primero llenar los DrownList del lider
    this.llenarDrownListLideres();
    //console.log('el valor del liderID: ' + this.liderID.toString());
    // this.onSeleccionarLiderId(this.liderID);

    //this.onListarLideresVendedores();
  }

  //Inicio del programa
  ngOnInit(): void {
    //console.log('segundo');

    //emitir un valor true para mostrar cargando.
    this.appS.config.emit(true);

    //seleccionar el valor del filtro (por defecto), cuando carga por primera vez
    this.tipoFilltroSeleccionado = 'FichasdeClientes';
    //por defecto caundo instancia un tipo de datos Date se asignan la fecha de hoy
    let fechaStar = new Date();

    this.frmRevisionCliente = this.formBuilder.group({
      filtroTipoCliente: this.tipoFilltroSeleccionado,
      seleccionarFecha: fechaStar,
      //lider_ID es formControlName del html
      //this.liderID es la variable declarada
      lider_ID: this.liderID.toString(),
      vendedor_ID: this.vendedorID.toString(),
    });

    //this.onSeleccionarVend = this.listLideres.liderID;

    /*
    this.frmRevisionCliente =   new FormGroup({

      value : new FormControl(this.tipoFilltroSeleccionado),
      seleccionarFecha: new FormControl(fechaStar),
      //liderID es formControlName del html
      //this.liderID es la variable declarada
      liderID: new FormControl(this.liderID),
      venderdorID: new FormControl(vendedorId)

    });*/

    //eliminar muy pronto
    //instanciar el formGroup
    // this.frmRevisionCliente = new FormGroup({
    //  seleccionarFecha: new FormControl(fechaStar)
    //  })


    //instanciar el formGroup de la lista de lideres
    /* this.frmGroupListLider = new FormGroup({
       //liderId es formControlName del html
       //liderID es la variable declarada
       liderId: new FormControl(this.liderID)
     })*/

    // continue 12 10 2021
    // Llamado para listar VistaFichaCliente
    //al iniciar el componente
    /*this.onListarVistaFichaCliente();*/



  }

  get f() {
    return this.frmRevisionCliente.controls;
  }

  optipo(tipoFiltro: string) {
    //debugger

    if (tipoFiltro == 'FichasdeClientes') {
      //debugger
      this.filtroselect = tipoFiltro;
      console.log('tipo', this.filtroselect);

    } else {
      this.filtroselect = tipoFiltro;
      console.log('tipo', this.filtroselect);
    }
  }


  //este metodo se ejecuta al momento de la visualizacion
  /*ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }*/

  //continue 13 10 2021 , esto es cuando seleccion tipofiltro, fecha,lider
  onFiltrando(): void {

    /*OSCAR ESTE CODIGO LO TENGO QUE CAMBIAR  LO QUE ESTA AQUI POR
     POR EL MOMENTO NO ES VALIDO*/

    /*this.appS.habilitarCargando();*/

    //declarar un arreglo de tipo fecha
    //  let fechacrecion: Array<Date> = [
    //    this.frmRevisionCliente.get('seleccionarFecha').value,
    //this.range.get('end').value
    // ]



    //llama al
    //getSelecionporfiltro esto es cuando se selecciona ya sea por fichasclientes o por fichasLlamadas


    /*  this.accesoclientes.getSelecciontipofiltro(this.liderID, fechaStar).subscribe(post => {
  
        (this.dataSource.data = post);
        this.appS.config.emit(false);
  
      }, (mensajeError: HttpErrorResponse) => {
        this.appS.config.emit(false);
        this.notificationService.warn(mensajeError.message);
  
      });*/

  }



  //listar los lideres y vendedores de la lista
  onListarLideresVendedores() {
    this.accesodatoslider.listarDrownLideresVendedores().subscribe(
      (response: drownListLideresVendedor) => {
        //si la respuesta del servidor fue 1
        if (response.exito === 1) {
          console.log('entra');

          //asignar la lista de los lideres activos
          this.listLideres.push(response.lider);
          this.listVendedor.push(response.vendedor);
          //this.f.lider_ID.setValue(this.listLideres[0].liderID.toString());
          //this.f.vendedor_ID.setValue(this.listVendedor[0].vendedorID.toString());
          //asignar el primer elemento de la lista del Lista y convertirlo a string
          this.liderID = this.listLideres[0].liderID.toString();
          this.vendedorID = this.listVendedor[0].vendedorID.toString();
        } else {
          this.notificationService.warn(response.mensaje);
        }
      },
      (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      }
    );
  }

  onSeleccionarFiltroTipoRevision(value: string): void {
    //actualizar la variable
    this.tipoFilltroSeleccionado = value;
    console.log(value);
  }

  //llenar el tipo de Filtro del cliente en el DrownList
  onLlenarFiltroTipoCliente(tipoFiltro: string): void {

    this.accesoclientes.tipoFiltroRevision(tipoFiltro).subscribe(
      (response: responseModel) => {
        //si la respuesta es 1 entonces es exitoso
        if (response.exito === 1) {
          this.filtroTipoRevision = response.data;
        } else {
          this.notificationService.warn(response.mensaje);
        }
      },

      (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      }
    );
  }

  //Metodo para llenar los drownlist lider
  llenarDrownListLideres() {
    this.accesodatoslider.listarDrownLideres().subscribe(
      (response: responseModel) => {
        //si la respuesta del servidor fue 1
        if (response.exito === 1) {
          //asignar la lista de los lideres activos
          this.listLideres = response.data;
          this.f['lider_ID'].setValue(this.listLideres[0].liderID.toString());
          //asignar el primer elemento de la lista del Lista y convertirlo a string
          this.liderID = this.listLideres[0].liderID.toString();
        } else {
          this.notificationService.warn(response.mensaje);
        }
      },
      (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      }
    );
  }

  //seleccionar el vendedor
  onSeleccionarLiderId(id: number) {
    //console.log("El value del lider es: ", id);
    //console.log("El value del lider es: lider_ID ", this.f.lider_ID.value);
    //console.log(this.frmRevisionCliente.controls);
    //.patchValue(this.data.tipoIdentificacionID.toString());

    this.accesovendedor.listarDrownListVendedorPorLiderId(id).subscribe(
      (response: responseModel) => {
        //si la respuesta del servidor es 1
        if (response.exito === 1) {
          //listar los vendedores
          this.listVendedor = response.data;
        } else {
          this.notificationService.warn(response.mensaje);
        }
      },
      (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      }
    );
  }




  /* continue 12 10 2021  */
  /*Listar  fichasdeCliente al iniciar el componente*/
  /*onListarVistaFichaCliente(): void {
      this.accesoclientes.listarfichacliente().subscribe(
        (post: any) => {
          this.dataSource.data = post;
          this.appS.desactivarCargando();
        },
        (error: HttpErrorResponse) => {
          this.appS.desactivarCargando();
          this.notificationService.warn(error.message);
        }
      );
    }*/



}
