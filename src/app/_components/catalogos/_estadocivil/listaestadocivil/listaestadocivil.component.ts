import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from 'src/app/_services/notification.service';
import { estadoCivil } from 'src/app/_models/estadoCivil';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalestadocivilComponent } from '../modalestadocivil/modalestadocivil.component';
import { responseModel } from 'src/app/_models/responseModel';
import { AppService } from 'src/app/_services/app.service';
import { UtlidadesService } from 'src/app/_services/utlidades.service';


@Component({
  selector: 'app-listaestadocivil',
  templateUrl: './listaestadocivil.component.html',
  styleUrls: ['./listaestadocivil.component.css']
})
export class ListaestadocivilComponent implements OnInit, AfterViewInit {
 
  filtrarPorNombreEstadoCivil: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['estadoCivilID', 'nombreEstadoCivil', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
              private accesoDatosService: AccesodatosService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private utilidadService: UtlidadesService ) { }

  ngOnInit(): void {   
   
    this.listarEstadoCivil(); 
  }

  
  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit(){    

     //habilitar cargando 
    this.emitirDatosService.habilitarCargando();
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onReset(){   
    //limpiar el filtro
    this.filtrarPorNombreEstadoCivil="";    
  }

  onRefrescar(){    
    this.listarEstadoCivil();
  }

  //llamar al servicio para listar todos 
  listarEstadoCivil() {
    
     this.accesoDatosService.getListadoEstadoCivil().subscribe((post) =>{
       this.dataSource.data=post;
       this.emitirDatosService.desactivarCargando();
                       
     }, (error: HttpErrorResponse)=>{
       this.emitirDatosService.desactivarCargando();
       this.notificationService.warn(error.message);  
     });     
  }

  //llamar al servicio para hacer un filtro por nombre del banco
  getDatosPorFiltro(e, nombre: string){
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda
    if (e.keyCode===13){   
      if (nombre.length>0){

        this.emitirDatosService.habilitarCargando();

        this.accesoDatosService.getDatosEstadoCivilPorNombre(nombre).subscribe(post=>{
          this.dataSource.data=post;
          this.emitirDatosService.desactivarCargando();

        }, (error: HttpErrorResponse)=>{
              this.emitirDatosService.desactivarCargando();
              this.notificationService.warn(error.message);     
    
        });
      } else {
        this.notificationService.warn("Digite el estado civil para hacer el filtro");
      }

    } 
  }



  onCreateEstadoCivil(){
    if (confirm('¿ Estas seguro de crear un nuevo registro ?')){
      this.emitirDatosService.habilitarCargando();

      const today =  new Date();       
      
    

      let dataEstadoCivil: estadoCivil = { estadoCivilID: 0, nombreEstadoCivil: null, activo: true, 
                                          userIDCreacion:1, fechaCreacion: this.utilidadService.convertDateHourString(today), 
                                          }; 

                                             
      //enviar la los datos por medio del servicio.
      //this.enviarDatos.SendDataEstadoCivil$.emit(dataEstadoCivil);
      //llamar al metodo 
      dataEstadoCivil.titulo = 'Nuevo estado civil';   
      this.openDialog(dataEstadoCivil);
      
    }
  }

  
  //editar los datos del banco
  editarDatosEstadoCivil(estadoCivilId: number){
    if (confirm('¿ Estas seguro de editar el estado civil ?')){

        //llama al servicio getDatosBancoPorId
        this.accesoDatosService.getDatosEstadoCivilPorId(estadoCivilId).subscribe((response: responseModel)=>{
          //si la respuesta del servidor es 1 es exito
          if (response.exito ==1)
          {
              const today =  new Date();                         
              let dataEstadoCivil : estadoCivil = response.data;           
              dataEstadoCivil.titulo = 'Editar estado civil';              
              dataEstadoCivil.fechaModificacion=this.utilidadService.convertDateHourString(today);                            
              
              this.openDialog(dataEstadoCivil);
          }
          else{
            this.notificationService.warn(response.mensaje);
          }

        });

    }
  }

  eliminarDatosEstadoCivil(id:number){
    if (confirm('¿ Estas seguro de eliminar el estado civil ?')){
      this.accesoDatosService.deleteEstadoCivil(id).subscribe((response: responseModel)=>{
        //si exito es 1
        if (response.exito === 1){
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar todos los bancos
          this.listarEstadoCivil();
          
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });  
    }
  }


  //Metodo para abrir la ventana modal
  openDialog(dataEstadoCivil: estadoCivil): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width ='500px';      
    dialogConfig.data = dataEstadoCivil;

    //despues que se cierre la venta modal se ejecuta 
    const dialogRef = this.dialog.open(ModalestadocivilComponent, dialogConfig);
  
    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarEstadoCivil();     
   
    });

  }

}


