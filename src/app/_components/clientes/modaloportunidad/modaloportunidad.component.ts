import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
//servicio
import { AccesooportunidadService } from 'src/app/_services/accesooportunidad.service';
import { NotificationService } from 'src/app/_services/notification.service';
//modelo
import { drownListOportunidades } from 'src/app/_models/drownListOportunidades';
import { sucursal } from 'src/app/_models/sucursal';
import { estatusOportunidad } from 'src/app/_models/estatusOportunidad';
import { tipoClase } from 'src/app/_models/tipoClase';
import { modelo } from 'src/app/_models/modelo';
import { vendedor } from 'src/app/_models/vendedor';
import { financiera } from 'src/app/_models/financiera';
import { visita } from 'src/app/_models/visita';
import { motivo } from 'src/app/_models/motivo';
import { oportunidad } from 'src/app/_models/oportunidad';
import { responseModel } from 'src/app/_models/responseModel';
import { pmfVh } from 'src/app/_models/pmfVh';
import { lider } from 'src/app/_models/lider';
import { dropDownList } from 'src/app/_models/dropDownList';

import { AppService } from 'src/app/_services/app.service';
//import * as moment from 'moment';
import { listFinanciera } from 'src/app/_models/listFinanciera';
import { Subscription } from 'rxjs';
import { AccesodatosvendedorService } from 'src/app/_services/accesodatosvendedor.service';

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
  selector: 'app-modaloportunidad',
  templateUrl: './modaloportunidad.component.html',
  styleUrls: ['./modaloportunidad.component.css']
})
export class ModaloportunidadComponent implements OnInit, OnDestroy {

  textBotonGuardar: string = "Guardar";
  textBotonGuardaryCerrar: string = "Guardar y Cerrar";
  estatusFinanSuscript: Subscription;

  //clienteID: string;

  frmGroupOportunidad: FormGroup;
  listaDrownListClientes: drownListOportunidades;
  listSucursales: sucursal[];
  listEstatusOportunidad: estatusOportunidad[];
  listTipoClase: tipoClase[];
  listModelo: modelo[];
  listPmfVh: pmfVh[];
  listVendedores: vendedor[];
  listLideres: lider[];
  listFinanciera: listFinanciera[];
  listVisita: visita[];
  listMotivo: motivo[];
  listPoseeVh: dropDownList[];
  listLeInteresaAvaluo: dropDownList[];
  listRealizoAvaluo: dropDownList[];
  listAplicaAvaluo: dropDownList[];
  listAnoModelo: dropDownList[];
  //en esta variable me indica si el registro del cliente es nuevo o se esta editando
  isNuevaOportunidad: boolean;
  //deshabilitar y activar los combox drownList.
  public isDisabledSelecccion: boolean = false;
  public desahabilitarBotonGuardar: boolean = false;

  public fechaCreada: string;

  @ViewChild('inputFechaCreacion', { static: true }) inputFechaCreacion: ElementRef;


  constructor(private datePipe: DatePipe,
    private appS: AppService,
    private accesoOportunidad: AccesooportunidadService,
    private accesoVendedor: AccesodatosvendedorService,
    //hace referencia al ventana modal abierta
    public dialogRef: MatDialogRef<ModaloportunidadComponent>,
    //@Inject(MAT_DIALOG_DATA) para inyectar los datos del componente que se esta llamando a la ventana modal
    //data: es de tipo DialogData( DialogData es una interface)
    @Inject(MAT_DIALOG_DATA) public data: oportunidad,
    private formBuilder: FormBuilder, //){
    private notificationService: NotificationService
  ) { }


  ngOnInit(): void {

    this.appS.habilitarCargando();

    //var fecha1 = moment(this.data.fechaCreacion);
    //var fecha = fecha1.format('DD/MM/YYYY hh:mm:ss A')


    //cambiar o agregar el estado de la oportunidad
    this.cambiarEstadoOportunidad(this.data.isNuevaOportunidad);
    //primero llenar los DrownList de la oportunidades
    this.llenarDrownList(this.data);

    this.frmGroupOportunidad = this.formBuilder.group({

      oportunidadID: this.data.oportunidadID,
      clienteID: this.data.clienteID.toString(),
      noOportunidad: this.data.noOportunidad,
      sucursalID: [this.data.sucursalID.toString(), Validators.required],
      estatusOportunidadID: [this.data.estatusOportunidadID.toString(), Validators.required],
      tipoClaseID: [this.data.tipoClaseID.toString(), Validators.required],
      modeloID: [this.data.modeloID.toString()],
      pmfVhID: [this.data.pmfVhID.toString(), Validators.required],
      cantidad: [this.data.cantidad, Validators.required],
      vendedorID: [this.data.vendedorID.toString(), Validators.required],
      liderID: [this.data.liderID.toString()],
      prima: [this.data.prima, Validators.required],
      financieraID: [this.data.financieraID.toString(), Validators.required],
      visitaID: [this.data.visitaID.toString(), Validators.required],
      motivoID: [this.data.motivoID.toString(), Validators.required],
      contacto: [this.data.contacto],
      correo: [this.data.correo],
      celular: [this.data.celular],
      telefono: [this.data.telefono],
      //fechaCreacion: [fecha, Validators.required],
      fechaCreacion: [this.data.fechaCreacion, Validators.required],
      proximaLlamadaVendedor: [this.data.proximaLlamadaVendedor, Validators.required],
      cantidadLlamada: [this.data.cantidadLlamada],
      pruebaManejo: [this.data.pruebaManejo],
      fechaCierreOport: [this.data.fechaCierreOport, Validators.required],
      poseeVhValorString: [(this.isNuevaOportunidad) ? "Si" : this.data.poseeVhValorString],
      leInteresaAvaluoValorString: [(this.isNuevaOportunidad) ? "Si" : (this.data.leInteresaAvaluoValorString)],
      aplicaAvaluoValorString: [(this.isNuevaOportunidad) ? "No" : this.data.aplicaAvaluoValorString],
      realizoAvaluoValorString: [(this.isNuevaOportunidad) ? "No" : this.data.realizoAvaluoValorString],
      anoModelo: [(this.isNuevaOportunidad) ? "2010 O MAYOR" : this.data.añoModelo],
      modeloVHquePosee: [this.data.modeloVHquePosee],
      comentarioVendedor: [this.data.comentarioVendedor, Validators.required]

    });

    //si estas editando la oportunidad
    if (!this.isNuevaOportunidad) {
      //seleccionar el modelo
      this.onChangeModelo(this.data.modeloID);
      //seleccionar el lider
      this.onChangeVendedor(this.data.vendedorID);

      //desactivar la proxima llamada del vendedor
      this.frmGroupOportunidad.controls['proximaLlamadaVendedor'].disable();

      if (this.data.poseeVhValorString === "No") {
        this.frmGroupOportunidad.controls['leInteresaAvaluoValorString'].disable();
        this.frmGroupOportunidad.controls['anoModelo'].disable();
        this.frmGroupOportunidad.controls['realizoAvaluoValorString'].disable();
        this.frmGroupOportunidad.controls['modeloVHquePosee'].disable();
        this.frmGroupOportunidad.controls['aplicaAvaluoValorString'].disable();
      }
    }

    this.appS.desactivarCargando();

    //asignar el tipoIdentificacionID
    //this.frmGroupOportunidad.get('tipoIdentificacionID').patchValue(this.data.tipoIdentificacionID.toString());
    this.subscribirseEstatusFinaciero();
  }


  //llenar los drownList
  llenarDrownList(data: oportunidad) {

    //comprobar si es una nueva oportunidad
    if (data.isNuevaOportunidad) {
      //llamar al servicio para llenar el drowmList de cada oportunidad
      this.accesoOportunidad.listarDrownListOportunidadesNuevo().subscribe((response: drownListOportunidades) => {
        //asignar los datos de la lista
        this.asignarValoresDrownList(response);

      }, (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);

      });
    }
    else {
      //llamar al servicio para llenar el drowmList de cada oportunidad
      this.accesoOportunidad.listarDrownListOportunidades(data).subscribe((response: drownListOportunidades) => {

        //asignar datos de lista
        this.asignarValoresDrownList(response);

      }, (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);

      });
    }


    //llamar al servicio para llenar el DrownList del vendedor.
    this.accesoVendedor.listarDrownListVendedoresActivos().subscribe((response: responseModel) => {
      //llenar cada uno de los DrowmList.
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

  //asignar los valores
  asignarValoresDrownList(response) {

    if (response.exito === 1) {

      //llenar cada uno de los DrowmList.
      this.listaDrownListClientes = response;
      this.listSucursales = response.sucursal;
      this.listEstatusOportunidad = response.estatusOportunidad;
      this.listTipoClase = response.tipoClase;
      this.listModelo = response.modelo;
      //this.listPmfVh = response.pmfVh;
      //this.listVendedores = response.vendedor;
      this.listFinanciera = response.financiera;
      this.listVisita = response.visita;
      this.listMotivo = response.motivo;
      this.listPoseeVh = response.poseeVh;
      this.listLeInteresaAvaluo = response.leInteresaAvaluo;
      this.listRealizoAvaluo = response.realizoAvaluo;
      this.listAplicaAvaluo = response.aplicaAvaluo;
      this.listAnoModelo = response.añoModelo;

    }
    else {
      this.notificationService.warn(response.mensaje);
    }
  }

  //seleccionar el vendedor de la lista
  onChangeVendedor(id: number) {
    //listar los lideres
    this.accesoOportunidad.listarLideres(id).subscribe({

      next: (response: responseModel) => {
        if (response.exito === 1) {
          this.listLideres = response.data;
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      },

      error: (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      }
    });

  }

  //seleccionar el modelo
  onChangeModelo(id: number) {

    this.accesoOportunidad.listarPmf(id).subscribe((response: responseModel) => {

      if (response.exito === 1) {
        this.listPmfVh = response.data;
      }
      else {
        this.notificationService.warn(response.mensaje);
      }

    }, (mensajeError: HttpErrorResponse) => {
      this.notificationService.warn(mensajeError.message);
    });

  }

  //cambios
  onChangePoseeVh() {

    this.frmGroupOportunidad.get('poseeVhValorString').valueChanges.subscribe(valor => {

        if (valor === "Si") 
        {
            //deshabilitar la seleccion
            this.isDisabledSelecccion = false;
            this.f['leInteresaAvaluoValorString'].setValue("Si");
            this.f['anoModelo'].setValue("2010 O MAYOR");
            this.f['realizoAvaluoValorString'].setValue("No");
            this.f['aplicaAvaluoValorString'].setValue("No");
            //this.f.modeloVHquePosee.setValue("");
            this.frmGroupOportunidad.controls['leInteresaAvaluoValorString'].enable();
            this.frmGroupOportunidad.controls['anoModelo'].enable();
            this.frmGroupOportunidad.controls['realizoAvaluoValorString'].enable();
            this.frmGroupOportunidad.controls['modeloVHquePosee'].enable();
            this.frmGroupOportunidad.controls['aplicaAvaluoValorString'].enable();

        }
        else if (valor === "No") 
        {
            //deshabilitar la seleccion
            this.isDisabledSelecccion = true;
            this.f['leInteresaAvaluoValorString'].setValue("No");
            this.f['anoModelo'].setValue("2010 O MAYOR");
            this.f['realizoAvaluoValorString'].setValue("No");
            this.f['modeloVHquePosee'].setValue("");
            this.f['aplicaAvaluoValorString'].setValue("No");
            this.frmGroupOportunidad.controls['leInteresaAvaluoValorString'].disable();
            this.frmGroupOportunidad.controls['anoModelo'].disable();
            this.frmGroupOportunidad.controls['realizoAvaluoValorString'].disable();
            this.frmGroupOportunidad.controls['modeloVHquePosee'].disable();
            this.frmGroupOportunidad.controls['aplicaAvaluoValorString'].disable();
        }

      }
    )
  }

  //metodos para guardar
  onGuardar(cerrarVentanaModal: boolean) 
  {
    //validar los textbox  
    if (!this.frmGroupOportunidad.invalid) 
    {

      let dataOportunidad: oportunidad = {
        "isNuevaOportunidad": this.isNuevaOportunidad,
        "oportunidadID": this.f['oportunidadID'].value,
        "noOportunidad": this.f['noOportunidad'].value,
        "clienteID": this.f['clienteID'].value,
        "comentarioVendedor": this.f['comentarioVendedor'].value,
        "sucursalID": parseInt(this.f['sucursalID'].value),
        "estatusOportunidadID": parseInt(this.f['estatusOportunidadID'].value),
        "tipoClaseID": parseInt(this.f['tipoClaseID'].value),
        "modeloID": parseInt(this.f['modeloID'].value),
        "pmfVhID": parseInt(this.f['pmfVhID'].value),
        "cantidad": parseInt(this.f['cantidad'].value),
        "vendedorID": parseInt(this.f['vendedorID'].value),
        "liderID": parseInt(this.f['liderID'].value),
        "prima": this.f['prima'].value,
        "financieraID": parseInt(this.f['financieraID'].value),
        "visitaID": parseInt(this.f['visitaID'].value),
        "motivoID": parseInt(this.f['motivoID'].value),
        "contacto": this.f['contacto'].value,
        "correo": this.f['correo'].value,
        "celular": this.f['celular'].value,
        "telefono": this.f['telefono'].value,
        //"fechaCreacion": Date.parse(this.f.fechaCreacion.value),
        "fechaCreacion": this.data.fechaCreacion, //this.f.fechaCreacion.value,
        "proximaLlamadaVendedor": this.f['proximaLlamadaVendedor'].value,
        "cantidadLlamada": this.f['cantidadLlamada'].value,
        "pruebaManejo": this.f['pruebaManejo'].value,
        "fechaCierreOport": this.f['fechaCierreOport'].value,
        "estatusDacID": this.data.estatusDacID,
        "estatusFinancieroID": parseInt(this.data.estatusFinancieroID.toString()),
        "estatusTeleID": this.data.estatusTeleID,
        "ventaPerdida": false,
        /* "poseeVh": (this.f.poseeVh.value === 'Si') ? true : false,
            "leInteresaAvaluo": (this.f.leInteresaAvaluo.value == 'Si') ? true : false,
            "realizoAvaluo": (this.f.realizoAvaluo.value === 'Si') ? true : false,
            "aplicaAvaluo": (this.f.aplicaAvaluo.value === 'Si') ? true : false,
            "añoModelo": this.f.anoModelo.value,
            "modeloVHquePosee": this.f.modeloVHquePosee.value,*/

        "poseeVhValorString": this.f['poseeVhValorString'].value,
        "leInteresaAvaluoValorString": this.f['leInteresaAvaluoValorString'].value,
        "realizoAvaluoValorString": this.f['realizoAvaluoValorString'].value,
        "aplicaAvaluoValorString": this.f['aplicaAvaluoValorString'].value,
        "añoModelo": this.f['anoModelo'].value,
        "modeloVHquePosee": this.f['modeloVHquePosee'].value,
        "procesado": false,
        "userIDCreacion": 1
      }

      if (this.isNuevaOportunidad) 
      {
        if (confirm('¿ Estas seguro de guardar los Datos de la Oportunidad ?')) 
        {
            this.ServicioGuardar(dataOportunidad, cerrarVentanaModal);
        }
      }
      else if (confirm('¿ Estas seguro de actualizar los datos de la Oportunidad ?')) 
      {
          this.ServicioActualizar(dataOportunidad, cerrarVentanaModal);
      }

    }
    else {

      this.notificationService.warn("Existen campos vacios");
    }

  }

  //llamar el servicio Guardar
  ServicioGuardar(dataOportunidad: oportunidad, cerrarVentanaModal: boolean): void {

    this.accesoOportunidad.insertOportunidades(dataOportunidad).subscribe((response: responseModel) => {
      //comprobar si fue exito ==1
      if (response.exito === 1) {
        //mostrar la notificacion exitoso
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        //obtener el valor de la oportunidad que se guardo en base de datos
        //ej.: 001271082258-2
        this.data.oportunidadID = response.resultIdString;
        this.data.noOportunidad = response.id;
        this.f['noOportunidad'].setValue(response.id);
        //desactivar el boton
        this.desahabilitarBotonGuardar = true;
        this.cambiarEstadoOportunidad(false);
        //desactivar la proxima llamada del vendedor
        this.frmGroupOportunidad.controls['proximaLlamadaVendedor'].disable();

        //llamar al metodo para cerra la ventana modal
        if (cerrarVentanaModal) this.onClose();
      }
      else {
        this.notificationService.warn(response.mensaje);
      }
    }, (dataError: HttpErrorResponse) => {
      if (dataError.status == 404) {
        alert(dataError["mensaje"]);
      } else {
        console.log(dataError);
      }

    });

  }


  //llamar al servicio actualizar
  ServicioActualizar(dataOportunidad: oportunidad, cerrarVentanaModal: boolean): void {

    this.accesoOportunidad.updateOportunidades(dataOportunidad.oportunidadID, dataOportunidad).subscribe((response: any) => {
      //comprobar si fue exito ==1
      if (response.exito === 1) {
        //mostrar la notificacion exitoso
        this.notificationService.success('<< ' + response.mensaje + ' >>');
        //llamar al metodo para cerra la ventana modal
        if (cerrarVentanaModal) this.onClose();
      }
      else {
        this.notificationService.warn(response.mensaje);
      }
    }, (dataError: HttpErrorResponse) => {
      if (dataError.status == 404) {
        alert(dataError["mensaje"]);
      } else {
        console.log(dataError);
      }

    });

  }

  onClose(cerrarVentanClienteAutomaticamente: boolean = true) {

    if (cerrarVentanClienteAutomaticamente) {
      this.dialogRef.close();

    } else if (confirm("¿ Estas seguro de cancelar ?")) {
      this.dialogRef.close();
    }

  }

  get f() { return this.frmGroupOportunidad.controls }


  getErrorMensage(field: string): string {
    let mensaje: string;
    if (this.frmGroupOportunidad.get(field).errors['required']) {
      mensaje = 'Nombre del campo requerido';
    }
    else if (this.frmGroupOportunidad.get(field).hasError('pattern')) {
      mensaje = 'Correo no valido';
    }

    return mensaje;
  }


  isValidField(field: string): boolean {
    return (
      (this.frmGroupOportunidad.get(field).touched || this.frmGroupOportunidad.get(field).dirty) &&
      !this.frmGroupOportunidad.get(field).valid
    );
  }

  //actualizar el estado del cliente
  cambiarEstadoOportunidad(isOportunidadNueva: boolean) {

    //en esta variable me indica si el registro de la oportunidad es nuevo o se va a editar
    this.isNuevaOportunidad = isOportunidadNueva
    this.data.isNuevaOportunidad = isOportunidadNueva;
    this.data.titulo = (isOportunidadNueva) ? 'Nueva Oportunidad' : 'Editar datos de la oportunidad - ' + this.data.oportunidadID;
    //cambiar nombre a la etiqueta
    this.textBotonGuardar = (isOportunidadNueva) ? "Guardar" : "Actualizar";
    this.textBotonGuardaryCerrar = (isOportunidadNueva) ? "Guardar y Cerrar" : "Actualizar y Cerrar";
  }

  //aqui se subscribe para cargar
  subscribirseEstatusFinaciero() {

    this.estatusFinanSuscript = this.appS.tipo$.subscribe((datos: number) => {
      this.data.estatusFinancieroID = datos

    });
  }

  ngOnDestroy(): void {
    this.estatusFinanSuscript.unsubscribe();
  }


}

