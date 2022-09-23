import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { motivo } from '../_models/motivo';
import { responseModel } from '../_models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AccesodatosmotivosService {

  api_url: string;

  constructor(private _http: HttpClient, private urlApi: UrlapiService) {
  
  }

  /***************************** Métodos del modelo Motivo *************************************/

  //mr
  getListarMotivo(): Observable<motivo> {
    return this._http.get<motivo>(`${this.urlApi.getUrlApi()}/api/motivos/ListarMotivoAsync`);
  }

  //mr
  getDatosMotivoPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/motivos/ObtenerMotivoPorNombreAsync/${nombre}`);
  }

  //mr
  getDatoMotivoPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/motivos/ObtenerMotivoPorIdAsync/${id}`);
  }

  //mr
  deleteMotivo(id: number) {
    return this._http.delete(`${this.urlApi.getUrlApi()}/api/motivos/EliminarMotivoeAsync/${id}`);
  }
  //mr
  insertmotivo(dataMotivo: motivo): Observable<responseModel> {
    console.log(dataMotivo);
    return this._http.post<responseModel>(`${this.urlApi.getUrlApi()}/api/motivos/GuardarMotivoAsync`, dataMotivo);
  }

  //mr
  updateMotivo(id: number, dataMotivo: motivo) {
    console.log(dataMotivo);
    return this._http.put(`${this.urlApi.getUrlApi()}/api/motivos/ActualizarMotivoAsync/${id}`, dataMotivo);
  }


}
