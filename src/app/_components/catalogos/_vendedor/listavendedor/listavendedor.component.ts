import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { vendedor } from 'src/app/_models/vendedor';
import { AppService } from 'src/app/_services/app.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalvendedorComponent } from '../modalvendedor/modalvendedor.component';
import { AccesodatosvendedorService } from 'src/app/_services/accesodatosvendedor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { responseModel } from 'src/app/_models/responseModel';
import { ControlContainer } from '@angular/forms';


//import { DialogService, M4FormGroup, ActivityService } from 'ng-metro4';

@Component({
  selector: 'app-listavendedor',
  templateUrl: './listavendedor.component.html',
  styleUrls: ['./listavendedor.component.css']
})

export class ListavendedorComponent implements OnInit, AfterViewInit {
 

  filtrarPorNombreVendedor: string;
  isActivo: boolean = false;

  displayedColumns: string[] = ['vendedorID', 'identificacion', 'codigoVendedor', 'nombreVendedor', 'activo', 'accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private emitirDatosService: AppService,
    private accesoVendedor: AccesodatosvendedorService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.listarVendedor();  
  }

  //este método se ejecuta al momento de la visualización
  ngAfterViewInit() {
    //habilitar cargando 
    this.emitirDatosService.habilitarCargando();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //evento
  onReset() {
    //limpiar el filtro
    this.filtrarPorNombreVendedor = "";
    //establecer el focus en el input de la busqueda del vendedor
    document.getElementById("buscarVendedor").focus();

  }

  onRefrescar() {
    //listar todos los vendedores.
    this.listarVendedor();
  }

  //llamar al servicio para listar todos los vendedores
  listarVendedor() {
    //subscribirse para obtener toda la lista de los vendedores
    this.accesoVendedor.getListarVendedor().subscribe((post: any) => {
      this.dataSource.data = post;
      this.emitirDatosService.desactivarCargando();

    }, (error: HttpErrorResponse) => {
      this.emitirDatosService.desactivarCargando();
      this.notificationService.warn(error.message);
    });
  }

  //llamar al servicio para hacer un filtro por nombre del vendedor
  getDatosPorFiltro(e, nombre: string) {
    
    //si la tecla (13 es enter) es enter, entonces realizar la busqueda
    if (e.keyCode === 13) {
      if (nombre.length > 0) {

        this.emitirDatosService.habilitarCargando();
        this.accesoVendedor.getDatosVendedorPorNombre(nombre).subscribe((response: responseModel) => {

          this.emitirDatosService.desactivarCargando();
          //comprobar si el filtro se encontro en la base de datos
          if (response.exito === 1) {
            this.dataSource.data = response.data;
          }
          else {

            this.dataSource.data = response.data;
            this.notificationService.warn(response.mensaje);
          }

        }, (error: HttpErrorResponse) => {
          this.emitirDatosService.desactivarCargando();
          this.notificationService.warn(error.message);

        });

      } else {
        this.notificationService.warn("Digite el nombre del vendedor para hacer el filtro");
      }
    }
  }

  //metodo para crear el vendedor
  onCreateVendedor() {

    if (confirm('¿ Estas seguro de crear un nuevo vendedor ?')) {
      this.emitirDatosService.habilitarCargando();
      const today = new Date();
      let dataVendedor: vendedor = { vendedorID: 0, nombreVendedor: null, codigoVendedor: null, activo: true,
                                    identificacion: null, sucursalID:0, liderID:0, usuarioID:0,  fechaCreacion: today, 
                                    userIDModificacion: null, fechaModificacion: null, userIDCreacion: 1, title: 'Nuevo Vendedor'};
      this.openDialog(dataVendedor);
    }

  }

  //método para editar los datos del Vendedor
  onEditarDatosVendedor(vendedorID: number) {

    if (confirm('¿ Estas seguro de editar los datos del vendedor ?')) {

      //llama al servicio getDatoVendedorPorId
      this.accesoVendedor.getDatoVendedorPorId(vendedorID).subscribe((response: responseModel) => {
        //si la respuesta del servidor es 1 es exito
        if (response.exito === 1) {
          const today = new Date();
          let dataVendedor: vendedor = response.data;
          dataVendedor.title = 'Editar Vendedor';
          this.openDialog(dataVendedor);
        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }
  
  onEliminarDatosVendedor(vendedorID: number) {

    if (confirm('¿ Estas seguro de eliminar el vendedor?')) {
      this.accesoVendedor.deleteVendedor(vendedorID).subscribe((response: responseModel) => {
        //si exito es 1
        if (response.exito === 1) {
          //mostrar un mesaje de exito
          this.notificationService.success('<< ' + response.mensaje + ' >>');
          //listar sucursales
          this.listarVendedor();

        }
        else {
          this.notificationService.warn(response.mensaje);
        }
      });
    }
  }

  //Metodo para abrir la ventana modal
  openDialog(dataVendedor: vendedor): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.data = dataVendedor;
    //dialogRef despues que se cierre la ventana modal se ejecuta 
    const dialogRef = this.dialog.open(ModalvendedorComponent, dialogConfig);



    //despues que se cierre la venta llama aun suscribirse 
    dialogRef.afterClosed().subscribe((result) => {
        this.listarVendedor();
      
    });
  }
}
