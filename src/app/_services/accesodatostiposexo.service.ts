import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { tipoSexo } from '../_models/tipoSexo';
import { responseModel } from '../_models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AccesodatostiposexoService {
 

  constructor(private _http: HttpClient, private urlApi: UrlapiService) {}

  /***************************** Métodos del modelo Tipo Sexo *************************************/

  getListarTipoSexo(): Observable<tipoSexo> {
    return this._http.get<tipoSexo>(`${this.urlApi.getUrlApi()}/api/TipoSexo/ListarTipoSexoAsync`);
  }

  getDatosTipoSexoPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/TipoSexo/ObtenerTipoSexoPorNombreAsync/${nombre}`);
  }

  getDatoTipoSexoPorId(id: number) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/TipoSexo/ObtenerTipoSexoPorIdAsync/${id}`);
  }

  insertTipoSexo(dataTipoSexo: tipoSexo): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.urlApi.getUrlApi()}/api/TipoSexo/GuardarTipoSexoAsync`, dataTipoSexo);
  }

  updateTipoSexo(id: number, dataTipoSexo: tipoSexo) {  
    return this._http.put(`${this.urlApi.getUrlApi()}/api/TipoSexo/ActualizarTipoSexoAsync/${id}`, dataTipoSexo);
  }

  deleteTipoSexo(id: number) {
    return this._http.delete(`${this.urlApi.getUrlApi()}/api/TipoSexo/EliminarTipoSexoAsync/${id}`);
  }

}