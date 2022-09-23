import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AccesollamadasvendedorService } from 'src/app/_services/accesollamadasvendedor.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { llamadasVendedor } from 'src/app/_models/llamadasVendedor';
import { responseModel } from 'src/app/_models/responseModel';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalllamadasvendedorComponent } from '../modalllamadasvendedor/modalllamadasvendedor.component';
import { AppService } from 'src/app/_services/app.service';
import { Subscription } from 'rxjs';
import { parametros } from 'src/app/_models/parametros';




@Component({
  selector: 'app-listallamadasvendedor',
  templateUrl: './listallamadasvendedor.component.html',
  styleUrls: ['./listallamadasvendedor.component.css']
})
export class ListallamadasvendedorComponent implements OnInit  {

  public listarLlamadas: llamadasVendedor[] = null;
  public cantidadLlamadas: number = 0;

  @Input() oportunidadIDInput: string = "";
  @Input() estadoBotonLlamadVendInput: boolean;

  private enviarOportRef: Subscription = null;


  constructor(private accesoLllamadaVendedor: AccesollamadasvendedorService,
    private notificationService: NotificationService,
    private appS: AppService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

    //recibe el numero de la oportunidad del componente: _components/vendedores/consultasllamadas/consultas.component.ts
    this.enviarOportRef= this.appS.enviarOportunidadObservable$.subscribe((model: parametros) => {
      
      //obtener la oportunidadid
      this.oportunidadIDInput = model.oportunidadID

      //si oportunidadIDVendedor tiene datos entonces el sistema realiza la busqueda.
      if (this.oportunidadIDInput !== "") {
        //listar todas las llamadas
        this.onListarLlamadasVendedor(this.oportunidadIDInput);
        //activar el boton agregar llamada del vendedor
        this.estadoBotonLlamadVendInput = false;
      }
      else {
        //limpiar el grid
        this.listarLlamadas = null;
        //desactivar el boton agregar llamada del vendedor, esto cuando 
        this.estadoBotonLlamadVendInput = true;
        this.cantidadLlamadas = 0;
      }

    });


    //listar las llamadas del vendedor
    this.onListarLlamadasVendedor(this.oportunidadIDInput);
  }

  //Listar las llamadas del vendedor 
  onListarLlamadasVendedor(oportunidadID: string, consultarproxLlamadaVendedor: boolean = false): void {

    //comprobar si la variable oportunidadID no tiene registro
    if (oportunidadID !== "") {
      this.accesoLllamadaVendedor.listarLlamadasVendedor(oportunidadID).subscribe({

        next: (response: responseModel) => {
          this.listarLlamadas = response.data;
          this.cantidadLlamadas = this.listarLlamadas.length;
        },
        //error
        error: (mensajeError: HttpErrorResponse) => {
          this.notificationService.warn(mensajeError.message);
        }
      });
    }

    //verificar si se va consultar la proxima llamada del lider
    if (consultarproxLlamadaVendedor) {
      this.accesoLllamadaVendedor.getProximaLlamadaVendedor(oportunidadID).subscribe({

        next: (response: responseModel) => {
          let paramientras = response.data;
        },

        error: (mensajeError: HttpErrorResponse) => {
          this.notificationService.warn(mensajeError.message);
        }
      });

    }
  }


  //nuevo registro de la llamada del vendedor  
  onNuevaLlamadaVendedor() {

    if (confirm('¿ Estas seguro agregar un nuevo comentario del vendedor ?')) {
      const today = new Date();

      let dataLlamadaVendedor: llamadasVendedor = {
        llamadaVendedorID: 0, oportunidadID: this.oportunidadIDInput, comentarioVendedor: null, revisado: false, idLlamada: 1/* 1--llamada del vendedor */,
        proximaLlamadaVendedor: today, estatusOportunidadID: 1 /* 1 es en proceso */, nombreStatusOportunidad: 'En Proceso', comentarioLider: null,
        visita: true, llamada: false, avaluo: false, correo: false, importancia: false, userIDCreacion: 1, fechaCreacion: today, titulo: "Nueva llamada del vendedor",
        notificationType: 'visita'
      };

      this.openDialog(dataLlamadaVendedor);
    }

  }

  onEditarLlamadaVendedor(llamadaVendedorID: number) {

    if (confirm('¿ Estas seguro de editar el seguimiento de la llamada ?')) {

      //llama al servicio getDatosEstadoCivilPorId
      this.accesoLllamadaVendedor.getDatosLlamadaVendedorPorId(llamadaVendedorID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito == 1) {
          const today = new Date();

          let dataLlamadaVendedor: llamadasVendedor = response.data;
          //indicar que la oportunidad se va editar
          //dataLlamadaVendedor.isNuevaOportunidad=false;
          dataLlamadaVendedor.titulo = 'Editar llamada del vendedor: ' + dataLlamadaVendedor.oportunidadID;
          this.openDialog(dataLlamadaVendedor);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }

      });
    }
  }

  //Metodo para abrir la ventana modal
  openDialog(dataLlamadaVendedor: llamadasVendedor): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '650px';
    dialogConfig.data = dataLlamadaVendedor;

    //llamar a la ventana modal
    const dialogRef = this.dialog.open(ModalllamadasvendedorComponent, dialogConfig);
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.onListarLlamadasVendedor(this.oportunidadIDInput);
    });
  }

  onConsultar() {
    this.appS
  }

  ngOnDestroy(){
    //this.appS.destroy();
    this.enviarOportRef.unsubscribe();
  }

}
