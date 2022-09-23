import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { llamadasLider } from 'src/app/_models/llamadasLider';
import { responseModel } from 'src/app/_models/responseModel';
import { NotificationService } from 'src/app/_services/notification.service';
import { AccesollamadasliderService } from 'src/app/_services/accesollamadaslider.service';
import { ModalllamadasliderComponent } from '../modalllamadaslider/modalllamadaslider.component';


@Component({
  selector: 'app-listallamadaslider',
  templateUrl: './listallamadaslider.component.html',
  styleUrls: ['./listallamadaslider.component.css']
})
export class ListallamadasliderComponent implements OnInit {

  public listarLlamadasLider: llamadasLider[];

  @Input() oportunidadIDInput: string;
  @Input() estadoBotonComentLiderInput: boolean;
  @Input() proximaLlamadaLiderInput: Date;
 

  constructor(private accesoLllamadaLider: AccesollamadasliderService,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.onListarLlamadasLider(this.oportunidadIDInput);  
  }

  onListarLlamadasLider(oportunidadID: string, consultarproxLlamadaLider: boolean=false): void {

    this.accesoLllamadaLider.listarLlamadasLider(oportunidadID).subscribe((response: responseModel) => {
      this.listarLlamadasLider = response.data;     

    }, (mensajeError: HttpErrorResponse) => {
      this.notificationService.warn(mensajeError.message);
    });    

    //verificar si se va consultar la proxima llamada del lider
    if (consultarproxLlamadaLider){
      this.accesoLllamadaLider.getProximaLlamadaLider(oportunidadID).subscribe((response: responseModel) => {          
      /*  let oportunidades: oportunidad;
        oportunidades = response.data;*/
       
        if (response.exito ==1 ){
          this.proximaLlamadaLiderInput=response.data;
        }
  
      }, (mensajeError: HttpErrorResponse) => {
        this.notificationService.warn(mensajeError.message);
      });  
    }
  }



  //nuevo registro de la llamada del Lider  
  onNuevaLlamadaLider() {

    if (confirm('¿ Estas seguro agregar un nuevo comentario del Lider ?')) {     
      const today = new Date(); 
     
      let dataLlamadaLider: llamadasLider = {
        llamadaLiderID: 0, oportunidadID: this.oportunidadIDInput,  comentarioLider: null, revisado: false, 
        idLlamada:3, proximaLlamadaLider: today,   userIDCreacion: 1, fechaCreacion: today, titulo: "Nueva llamada del Lider - "+  this.oportunidadIDInput ,
        nombreEstatusOportunidad:'null'
    
      };
      
                
      this.openDialog(dataLlamadaLider);
    }

  }

  onEditarLlamadaLider(llamadaLiderID: number) {
    
    if (confirm('¿ Estas seguro de editar el seguimiento de la llamada ?')) {

     
      //llama al servicio getDatosEstadoCivilPorId
      this.accesoLllamadaLider.getDatosLlamadaLiderPorId(llamadaLiderID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito == 1) {          
          const today = new Date();
          
          let dataLlamadaLider: llamadasLider = response.data;
          //indicar que la oportunidad se va editar
          //dataLlamadaLider.isNuevaOportunidad=false;
          dataLlamadaLider.titulo = 'Editar la llamada del Lider - ' + llamadaLiderID + ' / '+ dataLlamadaLider.oportunidadID ;
          this.openDialog(dataLlamadaLider);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }

      });
    }
  }

    //Metodo para abrir la ventana modal
  openDialog(dataLlamadaLider: llamadasLider): void {

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '50%';
      dialogConfig.data = dataLlamadaLider;
   
      //llamar a la ventana modal
      const dialogRef = this.dialog.open(ModalllamadasliderComponent, dialogConfig);
      //despues que se cierre la venta llama aun suscribirse 
      dialogRef.afterClosed().subscribe(result => {
        this.onListarLlamadasLider(this.oportunidadIDInput, true);
      });
  }
}

