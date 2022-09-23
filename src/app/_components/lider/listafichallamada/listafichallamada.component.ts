import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/_services/notification.service';
import { AppService } from 'src/app/_services/app.service';
import { AccesoclientesService } from 'src/app/_services/accesoclientes.service';

@Component({
  selector: 'app-listafichallamada',
  templateUrl: './listafichallamada.component.html',
  styleUrls: ['./listafichallamada.component.css'],
})
export class ListafichallamadaComponent implements OnInit {
  displayedColumns: string[] = [
    'clienteID',
    'nombreCliente',
    'noOportunidad',
    'proximaLlamadaVendedor',
    'comentarioLider',
    'financiera',
    'estatusOportunidad',
    'nombreLider',
    'nombreVendedor',
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private accesoclientes: AccesoclientesService,
    private appS: AppService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    // continue 24 11 2021
    // Llamado para listar VistaFichaLlamada
    //al iniciar el componente
    this.onListarVistaFichaLlamadas();
  }

  //este metodo se ejecuta al momento de la visualizacion
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /* continue 24 11 2021  */
  /*Listar  fichasLlamadas al iniciar el componente*/
  onListarVistaFichaLlamadas(): void {
    
    this.accesoclientes.listarfichallamadas().subscribe(
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
