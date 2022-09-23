import { Injectable, EventEmitter } from '@angular/core';
import { estadoCivil } from 'src/app/_models/estadoCivil';

@Injectable({
  providedIn: 'root'
})
export class EnviardatosService {

  //sendDataTipoClientes$ = new EventEmitter<tipoClientes>();
  SendDataEstadoCivil$ = new EventEmitter<string>();

  constructor() { }
}
