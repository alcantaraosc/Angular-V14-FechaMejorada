import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { Estatusdac } from '../_models/estatusDac';
import { responseModel } from '../_models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class AccesoestatusdacService {

  api_url: string;

  constructor(private _http: HttpClient, private urlapi: UrlapiService) {
    //obtener la url de la api
    this.api_url = urlapi.getUrlApi();
  }
      
  /******************* Métodos del modelo Sucursal *******************/

  getListarEstatusdac(): Observable<Estatusdac> {
    return this._http.get<Estatusdac>(`${this.api_url}/api/EstatusDAC/ListarEstatusDACsync`);
  }

  getDatosEstatusdacPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.api_url}/api/EstatusDAC/ObtenerEstatusDacPorNombreAsync/${nombre}`);
  }

  getDatoEstatusDacPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.api_url}/api/EstatusDAC/ObtenerEstatusDacPorIdAsync/${id}`);
  }  

  insertEstatusDac(dataEstatusDac: Estatusdac): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.api_url}/api/EstatusDAC/GuardarEstatusDacAsync`, dataEstatusDac);
  }

  updateEstatusDac(id: number, dataEstatusDac: Estatusdac) {
    console.log(dataEstatusDac);
    return this._http.put(`${this.api_url}/api/EstatusDAC/ActualizarEstatusDacAsync/${id}`, dataEstatusDac);
  }
  
  deleteEstatusDac(id: number) {
    return this._http.delete(`${this.api_url}/api/EstatusDAC/EliminarEstatusDacAsync/${id}`);
  }

}
