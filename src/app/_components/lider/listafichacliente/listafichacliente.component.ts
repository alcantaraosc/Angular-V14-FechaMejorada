import { Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/_services/notification.service';
import { AppService } from 'src/app/_services/app.service';
import { AccesoclientesService } from 'src/app/_services/accesoclientes.service';
//import { EventEmitter } from 'stream';
import { Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-listafichacliente',
  templateUrl: './listafichacliente.component.html',
  styleUrls: ['./listafichacliente.component.css']
})
export class ListafichaclienteComponent implements OnInit {

  // @Output('FichasdeClientes')FichasdeClientes:EventEmitter<boolean> = new EventEmitter(false);
 //formListaCliente: FormGroup;


 //esta variable es utilizada para recibir el numero de identificacion del cliente que envia el componente modalclientes.
 //@Input() tipof: string;

 displayedColumns: string[] = [
  'clienteID',
  'nombreCliente',
  'contacto',
  'nombreIdentificacion',
  'comentarioLider',
  'fechaCreacion',
  'nombreLider',
  'nombreVendedor',
];
dataSource = new MatTableDataSource();

@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;

constructor(
  private accesoclientes: AccesoclientesService,
  private appS: AppService,
  private notificationService: NotificationService,
) { }


  ngOnInit(): void {

    // continue 12 10 2021
    // Llamado para listar VistaFichaCliente
    //al iniciar el componente
    this.onListarVistaFichaCliente();

  }


  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

/* continue 12 10 2021  */
  /*Listar  fichasdeCliente al iniciar el componente*/
  onListarVistaFichaCliente(): void {
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
  }

}
