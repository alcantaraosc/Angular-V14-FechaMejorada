import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { estatusOportunidad } from '../_models/estatusOportunidad';
import { responseModel } from '../_models/responseModel';


@Injectable({
  providedIn: 'root'
})

export class AccesoestatusoportunidadService {

  api_url: string;

  constructor(private _http: HttpClient, private urlapi: UrlapiService) {

    //obtener la url de la api
    this.api_url = urlapi.getUrlApi();
  }

  /***************************** Métodos del modelo Estatus Oportunidad *************************************/


  getListarEstatusOportunidad(): Observable<estatusOportunidad> {
    return this._http.get<estatusOportunidad>(`${this.api_url}/api/EstatusOportunidades/ListarEstatusOportunidadAsync`);
  }

  getDatosEstatusOportunidadPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.api_url}/api/EstatusOportunidades/ObtenerEstatusOportunidadPorNombreAsync/${nombre}`);
  }

  getDatoEstatusOportunidadPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.api_url}/api/EstatusOportunidades/ObtenerEstatusOportunidadPorIdAsync/${id}`);
  }

  insertEstatusOportunida(dataEstatusOportunidad: estatusOportunidad): Observable < responseModel > {
   return this._http.post<responseModel>(`${this.api_url}/api/EstatusOportunidades/GuardarEstatusOportunidadAsync`, dataEstatusOportunidad);
  }

  updateEstatusOportunida(id: number, dataEstatusOportunidad: estatusOportunidad) {
  console.log(dataEstatusOportunidad);
  return this._http.put(`${this.api_url}/api/EstatusOportunidades/ActualizarEstatusOportunidadAsync/${id}`, dataEstatusOportunidad);
  }

  deleteEstatusOportunidad(id: number) {
    return this._http.delete(`${this.api_url}/api/EstatusOportunidades/EliminarEstatusOportunidadAsync/${id}`);
  }

}