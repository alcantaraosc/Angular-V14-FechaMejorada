import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { municipio } from '../_models/municipio';
import { responseModel } from '../_models/responseModel';
import { departamento } from '../_models/departamento';


@Injectable({
  providedIn: 'root'
})
export class AccesodatosmunicipioService {

  api_url: string;

  constructor(private _http: HttpClient, private urlApi: UrlapiService) { }
  /***************************** Métodos del modelo municipio *************************************/
  getListarMunicipio(): Observable<municipio> {
    return this._http.get<municipio>(`${this.urlApi.getUrlApi()}/api/Municipios/ListarMunicipioAsync`);
  }

  listarDepartamento() {
    return this._http.get<departamento[]>(`${this.urlApi.getUrlApi()}/api/Municipios/ListarDepartamentoAsync`);
  }

  getDatosMunicipioPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/Municipios/ObtenerMunicipioPorNombreAsync/${nombre}`);
  }

  getDatosMunicipioPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/Municipios/ObtenerMunicipioPorIdAsync/${id}`);
  }

  //guardar los datos del municipio
  insertMunicipio(dataMunicipio: municipio): Observable<responseModel> {
    return this._http.post<responseModel>(`${this.urlApi.getUrlApi()}/api/Municipios/GuardarMunicipioAsync`, dataMunicipio);
  }

  updateMunicipio(id: number, dataMunicipio: municipio) {
    console.log(dataMunicipio);
    return this._http.put(`${this.urlApi.getUrlApi()}/api/Municipios/ActualizarMunicipioAsync/${id}`, dataMunicipio);
  }

  deleteMunicipio(id: number) {
    return this._http.delete(`${this.urlApi.getUrlApi()}/api/Municipios/EliminarMunicipioAsync/${id}`);
  }

}
