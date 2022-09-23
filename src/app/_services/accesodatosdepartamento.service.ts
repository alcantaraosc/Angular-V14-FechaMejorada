import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { departamento } from '../_models/departamento';
import { responseModel } from '../_models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AccesodatosdepartamentoService {

 
  constructor(private _http: HttpClient, private urlApi: UrlapiService) { }
  
  /***************************** Métodos del modelo Departamento *************************************/
  getListarDepartamento(): Observable<departamento> {
    return this._http.get<departamento>(`${this.urlApi.getUrlApi()}/api/Departamentos/ListarDepartamentoAsync`);
  }
  getDatosDepartamentoPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/Departamentos/ObtenerDepartamentoPorNombreAsync/${nombre}`);
  }
  getDatoDepartamentoPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/Departamentos/ObtenerDepartamentoPorIdAsync/${id}`);
  }
  insertDepartamento(dataDepartamento: departamento): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.urlApi.getUrlApi()}/api/Departamentos/GuardarDepartamentoAsync`, dataDepartamento)
  }
  updateDepartamento(id: number, dataDepartamento: departamento) {
    console.log(dataDepartamento);
    return this._http.put(`${this.urlApi.getUrlApi()}/api/Departamentos/ActualizarDepartamentoAsync/${id}`, dataDepartamento);
  }
  deleteDepartamento(id: number) {
    return this._http.delete(`${this.urlApi.getUrlApi()}/api/Departamentos/EliminarDepartamentoAsync/${id}`);
  }

}

