import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { estatusFinanciero } from '../_models/estatusFinanciero';
import { responseModel } from '../_models/responseModel';
import { UrlapiService } from './urlapi.service';





@Injectable({
  providedIn: 'root'
})
export class AccesoestatusfinancieroService {
  private api_url: string
  constructor(private _http: HttpClient, private urlapi: UrlapiService) {
      //obtener la url de la api
      this.api_url=urlapi.getUrlApi();   
   }


     /************************** Métodos del modelo Estatus Financiero *********************************/
      
   //osc
   listarEstatusFinanciero(){
    return this._http.get<responseModel>(`${this.api_url}/api/EstatusFinancieros/ListarEstatusFinanciero` );
  }

  //mr
  getListarStatusFinanciero(): Observable<estatusFinanciero> {
    return this._http.get<estatusFinanciero>(`${this.api_url}/api/EstatusFinancieros/ListarEstatusFinancieroAsync`);
  }

  //mr  
  getDatosEstatusFinancieroPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.api_url}/api/EstatusFinancieros/ObtenerStatusFinancieroPorNombreAsync/${nombre}`);
  }

  //mr
  getDatosEstatusFinancPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.api_url}/api/EstatusFinancieros/ObtenerEstatusFinancieroIdAsync/${id}`);
  }

  //mr
  deleteStatusFinanc(id: number) {
    return this._http.delete(`${this.api_url}/api/EstatusFinancieros/EliminarStatusFinancieroAsync/${id}`);
  }

  //mr
  InsertEstatusFinanc(dataStatusFinanciero: estatusFinanciero): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.api_url}/api/EstatusFinancieros/GuardarStatusFinancieroAsync`, dataStatusFinanciero);
  }

  //mr
  UpdateEstatusFinanc(id: number, dataStatusFinanciero: estatusFinanciero) {
    console.log(dataStatusFinanciero);
    return this._http.put(`${this.api_url}/api/EstatusFinancieros/ActualizarStatusFinancieroAsync/${id}`, dataStatusFinanciero);
  }
}
