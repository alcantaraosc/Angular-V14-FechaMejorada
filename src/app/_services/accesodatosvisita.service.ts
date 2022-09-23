import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { visita } from '../_models/visita';
import { responseModel } from '../_models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AccesodatosvisitaService {

  api_url: string;

  constructor(private _http: HttpClient, private urlapi: UrlapiService) {
    //obtener la url de la api
    this.api_url = urlapi.getUrlApi();
  }

  /************************ Métodos del modelo Visita *************************************/


  getListarVisita(): Observable<visita> {
    return this._http.get<visita>(`${this.api_url}/api/Visita/ListarVisitaAsync`);
  }

  getDatosVisitaPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.api_url}/api/Visita/ObtenerVisitaPorNombreAsync/${nombre}`);
  }

  getDatoVisitaPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.api_url}/api/Visita/ObtenerVisitaPorIdAsync/${id}`);
  }

  deleteVisita(id: number) {
    return this._http.delete(`${this.api_url}/api/Visita/EliminarVisitaAsync/${id}`);
  }

  InsertVisita(dataVisita: visita): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.api_url}/api/Visita/GuardarVisitaAsync`, dataVisita);
  }

  UpdateVisita(id: number, dataVisita: visita) {
    console.log(dataVisita);
     return this._http.put(`${this.api_url}/api/Visita/ActualizarVisitaAsync/${id}`, dataVisita);
   }
 


}
