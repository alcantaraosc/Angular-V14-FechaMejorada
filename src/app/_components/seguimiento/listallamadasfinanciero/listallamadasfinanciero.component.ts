import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

//components
import { ModalllamadasliderComponent } from '../modalllamadaslider/modalllamadaslider.component';
import { AccesoestatusfinancieroService } from 'src/app/_services/accesoestatusfinanciero.service';

//models
import { responseModel } from 'src/app/_models/responseModel';
import { estatusFinanciero } from 'src/app/_models/estatusFinanciero';
import { listaLlamadasFinanciero } from 'src/app/_models/listaLlamadasFinanciero';

//services
import { AccesollamadasfinancieroService } from 'src/app/_services/accesollamadasfinanciero.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/_services/app.service';
import { llamadasFinanciero } from 'src/app/_models/llamadasFinanciero';


@Component({
  selector: 'app-listallamadasfinanciero',
  templateUrl: './listallamadasfinanciero.component.html',
  styleUrls: ['./listallamadasfinanciero.component.css']
})
export class ListallamadasfinancieroComponent implements OnInit {

  public frmGroupListaFinanciero:FormGroup;

  public listarEstatusFinanciero: estatusFinanciero[];
  public listarLlamadasFinanciero: listaLlamadasFinanciero[];

  @Input() oportunidadIDInput: string;
  @Input() estadoBotonComentFinanInput: boolean;
  @Input() proximaLlamadaFinancieroInput: Date;
  @Input() estatusFinancieroInput: number;
 

  constructor(private accesoLlamadasFinanciero: AccesollamadasfinancieroService, 
    private accesoEstatusFinanciero: AccesoestatusfinancieroService,
    private formBuilder: FormBuilder, 
    private notificationService: NotificationService, private dialog: MatDialog,
    private appS: AppService  ){ }

  ngOnInit(): void {    
    this.onListarLlamadasFinanciero(this.oportunidadIDInput);  

    console.log(this.estatusFinancieroInput);

    this.frmGroupListaFinanciero = this.formBuilder.group({      
      estatusFinancieroID : this.estatusFinancieroInput.toString()
    });

  }

  onListarLlamadasFinanciero(oportunidadID: string, consultarproxLlamadaFinanciero: boolean=false): void {
      
    //llenar el listado del financiero.
    this.onLlenarDrownListEstatusFinanciero();
       
    this.accesoLlamadasFinanciero.listarLlamadasFinanciero(oportunidadID).subscribe((response: responseModel) => {
      //si 1 es exito entonces mostra los datos
      if (response.exito==1){
        this.listarLlamadasFinanciero = response.data;     
      }

    }, (mensajeError: HttpErrorResponse) => {
      this.notificationService.warn(mensajeError.message);
    });    

    //verificar si se va consultar la proxima llamada del lider
    if (consultarproxLlamadaFinanciero){
      this.accesoLlamadasFinanciero.getProximaLlamadaFinanciero(oportunidadID).subscribe((response: responseModel) => {          
      /*  let oportunidades: oportunidad;
        oportunidades = response.data;*/
       
        if (response.exito ==1 ){
          this.proximaLlamadaFinancieroInput=response.data;
        }
  
      }, (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      });  
    }
  }

  onLlenarDrownListEstatusFinanciero(){    

    this.accesoEstatusFinanciero.listarEstatusFinanciero().subscribe((response: responseModel) => {          
    
        if (response.exito ==1 ){
          this.listarEstatusFinanciero=response.data;
        }
  
      }, (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      }); 
  }



  //nuevo registro de la llamada del Financiero  
  onNuevaLlamadaFinanciero() {

    if (confirm('¿ Estas seguro agregar un nuevo comentario del Financiero ?')) {     
      const today = new Date(); 
     
      let dataLlamadaFinanciero: llamadasFinanciero = {
        llamadaFinancieroID: 0, oportunidadID: this.oportunidadIDInput,  comentarioFinanciero: null, idLlamada:3,
        proximaLlamadaFinanciero: today,   userIDCreacion: 1, fechaCreacion: today, titulo: "Nueva llamada del Financiero - "+  this.oportunidadIDInput ,
        nombreEstatusOportunidad:'null'
    
      };
      
                
      this.openDialog(dataLlamadaFinanciero);
    }

  }

  onEditarLlamadaFinanciero(llamadaFinancieroID: number) {
    
    if (confirm('¿ Estas seguro de editar el seguimiento de la llamada ?')) {

     
      //llama al servicio getDatosEstadoCivilPorId
      this.accesoLlamadasFinanciero.getDatosLlamadaFinancieroPorId(llamadaFinancieroID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito == 1) {          
          const today = new Date();
          
          let dataLlamadaFinanciero: llamadasFinanciero
          dataLlamadaFinanciero=response.data;
          //indicar que la oportunidad se va editar
          //dataLlamadaFinanciero.isNuevaOportunidad=false;
          dataLlamadaFinanciero.titulo = 'Editar la llamada del Financiero - ' + llamadaFinancieroID + ' / '+ dataLlamadaFinanciero.oportunidadID ;
          this.openDialog(dataLlamadaFinanciero);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }

      });
    }
  }

    //Metodo para abrir la ventana modal
  openDialog(dataLlamadaFinanciero: llamadasFinanciero): void {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '50%';
      dialogConfig.data = dataLlamadaFinanciero;
   
      //llamar a la ventana modal
      const dialogRef = this.dialog.open(ModalllamadasliderComponent, dialogConfig);
      //despues que se cierre la venta llama aun suscribirse 
      dialogRef.afterClosed().subscribe(result => {
        this.onListarLlamadasFinanciero(this.oportunidadIDInput, true);
      });
  }

  //seleccionar el status del financiero
  onChangeEstatusFinan(id: number){
    this.appS.tipo$.emit(id);

  }


}


