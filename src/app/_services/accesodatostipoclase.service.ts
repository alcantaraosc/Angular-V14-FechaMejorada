import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { tipoClase } from '../_models/tipoClase';
import { responseModel } from '../_models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AccesodatostipoclaseService {


  constructor(private _http: HttpClient, private urlApi: UrlapiService) {
  
  }

  /***************************** Métodos del modelo Tipo Clase *************************************/

  getListarTipoClase(): Observable<tipoClase> {
    return this._http.get<tipoClase>(`${this.urlApi.getUrlApi()}/api/TipoClase/ListarTipoClaseAsync`);
  }

  getDatosTipoClasePorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/TipoClase/ObtenerTipoClasePorNombreAsync/${nombre}`);
  }

  getDatoTipoClasePorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/TipoClase/ObtenerTipoClasesPorIdAsync/${id}`);
  }

  insertTipoClase(dataTipoClase: tipoClase): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.urlApi.getUrlApi()}/api/TipoClase/GuardarTipoClaseAsync`, dataTipoClase);
  }

  updateTipoClase(id: number, dataTipoClase: tipoClase) {
   console.log(dataTipoClase);
    return this._http.put(`${this.urlApi.getUrlApi()}/api/TipoClase/ActualizarTipoClaseAsync/${id}`, dataTipoClase);
  }

  deleteTipoClase(id: number) {
    return this._http.delete(`${this.urlApi.getUrlApi()}/api/TipoClase/EliminarTipoClaseAsync/${id}`);
  }
}
