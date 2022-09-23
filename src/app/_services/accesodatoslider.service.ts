import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { lider } from '../_models/lider';
import { responseModel } from '../_models/responseModel';
import { drownListLideresVendedor } from '../_models/drownListLideresVendedor';


@Injectable({
  providedIn: 'root'
})
export class AccesodatosliderService {

  constructor(private _http: HttpClient, private urlApi: UrlapiService) {
   
  }

    /***************************** Métodos del modelo Lider *************************************/

  // aqui llenar el drownlist lider y vendedor

  listarDrownLideresVendedores() {
    return this._http.get<drownListLideresVendedor>(`${this.urlApi.getUrlApi()}/api/lideres/DrownListLiderVendedor`);
  }

  listarDrownLideres() {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/lideres/DrownListLider`);
  }


  listarLideresPorVendedorId(liderID: number){
  return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/lideres/ListaLideresPorVendedorId/${liderID}`);
  }


  getListarLider(): Observable<lider> {
  return this._http.get<lider>(`${this.urlApi.getUrlApi()}/api/lideres/ListarlideressAsync`);
  }

  getDatosLiderPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/lideres/ObtenerLiderPorNombreAsync/${nombre}`);
  }
  getDatoLiderPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/lideres/ObtenerLiderPorIdAsync/${id}`);
  }

  insertLider(dataLider: lider): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.urlApi.getUrlApi()}/api/lideres/GuardarLiderAsync`, dataLider);
  }

  updateLider(id: number, dataLider: lider) {
    console.log(dataLider);
    return this._http.put(`${this.urlApi.getUrlApi()}/api/lideres/ActualizarLiderAsync/${id}`, dataLider);
  }

  deleteLider(id: number) {
    return this._http.delete(`${this.urlApi.getUrlApi()}/api/lideres/EliminarLiderAsync/${id}`);
  }



}
