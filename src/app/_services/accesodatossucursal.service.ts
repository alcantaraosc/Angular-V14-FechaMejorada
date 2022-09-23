import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { sucursal } from '../_models/sucursal';
import { responseModel } from '../_models/responseModel';

@Injectable({
  providedIn: 'root'
})

export class AccesodatossucursalService {
  
  constructor(private _http: HttpClient, private urlApi: UrlapiService) { }
  
  /***************************** Métodos del modelo Sucursal *************************************/

  getListarSucursal(): Observable<sucursal> {
    return this._http.get<sucursal>(`${this.urlApi.getUrlApi()}/api/Sucursales/ListarSucursalesAsync`);
  }

  getDatosSucursalPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/Sucursales/ObtenerSucursalPorNombreAsync/${nombre}`);
  }

  getDatoSucursalPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/Sucursales/ObtenerSucursalPorIdAsync/${id}`);
  }

  insertSucursal(dataSucursal: sucursal): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.urlApi.getUrlApi()}/api/Sucursales/GuardarSucursalAsync`, dataSucursal);
  }

  updateSucursal(id: number, dataSucursal: sucursal) {
    return this._http.put(`${this.urlApi.getUrlApi()}/api/Sucursales/ActualizarSucursalAsync/${id}`, dataSucursal);
  }

  deleteSucursal(id: number) {
    return this._http.delete(`${this.urlApi.getUrlApi()}/api/Sucursales/EliminarSucursalAsync/${id}`);
  }

}