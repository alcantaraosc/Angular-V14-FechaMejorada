import { Component, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';
import { FormGroup } from '@angular/forms';

//material
import { MatDialogConfig } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, /*MatDialogConfig,*/ MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//components
import { ModalfinancieraComponent } from '../modalfinanciera/modalfinanciera.component';

//models
import { listFinanciera } from 'src/app/_models/listFinanciera';
import { financiera } from 'src/app/_models/financiera';
import { responseModel } from 'src/app/_models/responseModel' ;

//service
import { AccesodatosService } from 'src/app/_services/accesodatos.service';
import { NotificationService } from 'src/app/_services/notification.service';



export interface DialogData {
  id: number;
  animal: string;
  name: string;
  title: string
}

@Component({
  selector: 'app-listafinanciera',
  templateUrl: './listafinanciera.component.html',
  styleUrls: ['./listafinanciera.component.css']
})
export class ListafinancieraComponent implements OnInit, AfterViewInit {

  filtrarPorNombreFinanciera: string;
  loading:boolean=false;
  isActivo: boolean = false;
  

  displayedColumns: string[] = ['financieraID', 'nombreFinanciera', 'activo', 'nombreTipoCategoria', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

    
  dataFinanciera: financiera = { financieraID: 0, nombreFinanciera: null, activo:true, tipoCategoriaID:0, nombreTipoCategoria:null, 
                                  userIDCreacion:1, fechaCreacion: null, userIDModificacion:0, fechaModificacion: null   };
    

  constructor(private accesoDatosService: AccesodatosService,
              private dialog: MatDialog,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.listarFinanciera();    
  }

  
  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit(){    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onReset(){   
    //limpiar el filtro
    this.filtrarPorNombreFinanciera="";
    
  }

  onRefrescar(){    
    this.listarFinanciera();
  }

  //llamar al servicio para listar todos los financieras
  listarFinanciera() {
    this.loading=true;
     this.accesoDatosService.getListadoFinanciera().subscribe(post=>{(this.dataSource.data=post)
                 
     }, (error: HttpErrorResponse)=>{
      this.loading=false;
      this.notificationService.warn(error.message);

     });

     this.loading=false;
  }

  //llamar al servicio para hacer un filtro por nombre del financiera
  getDatosPorFiltro(e, nombre: string){
    
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda
    if (e.keyCode===13){   
      if (nombre.length>0){

        this.accesoDatosService.getDatosFinancieraPorNombre(nombre)
        .subscribe(post=>{(this.dataSource.data=post)
              
        }, (error: HttpErrorResponse)=>{
          alert(error.message);     
    
        });
      } else {
        this.notificationService.warn("Digite el nombre del financiera para hacer el filtro");
      }

    } 
  }


  onCreateFinanciera(){
    if (confirm('¿ Estas seguro de crear un nuevo registro ?')){
      const today = new Date(); 
      let data: financiera = { financieraID: 0, nombreFinanciera:null, activo:true, tipoCategoriaID:0, nombreTipoCategoria: null, 
                                userIDCreacion:1, fechaCreacion: today , title : "Nuevo registro"  };
         

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "250px";
      //dialogConfig.width = '250px',
      dialogConfig.data = data;
      //llamar al metodo 
      this.openDialog(data);

      
      //MatDialogConfig es para configura la ventana modal
      /*
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "60%";
      dialogConfig.data = {
        id: 1,
        title: 'Nuevo registro'
      }
      
           
      //abrir la venta modal
      this.dialog.open(ModalfinancieraComponent, dialogConfig);*/
    }
  }

  /*
  getData():financiera{
      return this.dataFinanciera;
  }
*/
 /*agregarDatosFinanciera(financiera: financiera){

  }*/

  //editar los datos del financiera
  editarDatosFinanciera(financieraId: number){
    this.isActivo=true;
    
    if (confirm('¿ Estas seguro de editar los datos de la financiera ?')){

      let data: financiera;

      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
     // dialogConfig.width = "60%";
      dialogConfig.width = '250px',
      dialogConfig.data = data;

      //llama al servicio getDatosFinancieraPorId
      this.accesoDatosService.getDatosFinancieraPorId(financieraId).subscribe((response: any)=>{
        //si la respuesta del servidor es 1
        if (response.exito ==1)
        {
          data=response.data;
          this.dataFinanciera= response;
          data.title='Editar Datos de la Financiera';        
          this.openDialog(data);
        }
        else{
          this.notificationService.warn(response.mensaje);
        }
  
      });
      
   

    

     
      /*
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        
        title: 'Editar registro'

      }
      
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "70%";
      this.dialog.open(ModalfinancieraComponent, dialogConfig);
      */
     
      //this.modalService.open(ventModal);
    }
 
    
  }

  openDialog(data: financiera): void {
    //despues que se cierre la venta modal se ejecuta 
    const dialogRef = this.dialog.open(ModalfinancieraComponent, {
      disableClose : true,
      autoFocus : true,
      // dialogConfig.width = "60%";
      width  : '40%',
      //width  : '250px',
      data : data
    });

  //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe(result => {
      this.listarFinanciera();
    });

  }

  eliminarDatosFinanciera(id:number){
    if (confirm('¿ Estas seguro de eliminar los datos de la financiera ?')){
      this.accesoDatosService.deleteFinanciera(id).subscribe((response: responseModel)=>{
        //si exito es 1
        if (response.exito === 1){
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar todos de las financieras
          this.listarFinanciera();
          
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });  
    }
  }


}

/*
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  accion: string;
}

*/






