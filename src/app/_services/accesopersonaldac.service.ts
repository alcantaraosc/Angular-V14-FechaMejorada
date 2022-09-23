import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { PersonalDac } from '../_models/personaldac';
import { responseModel } from '../_models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class AccesopersonaldacService {

  api_url: string;

  constructor(private _http: HttpClient, private urlapi: UrlapiService) {
    //obtener la url de la api
    this.api_url = urlapi.getUrlApi();
  }

/***************************** Métodos del modelo PersonalDac *************************************/

getListarPersonalDac(): Observable<PersonalDac> {
  return this._http.get<PersonalDac>(`${this.api_url}/api/PersonalDacs/ListarPersonalDacAsync`);
}

getDatosPersonalDacPorNombre(nombre: string) {
  return this._http.get<responseModel>(`${this.urlapi.getUrlApi()}/api/PersonalDacs/ObtenerPersonalDacPorNombreAsync/${nombre}`);
}

getDatoPersonalDacPorId(id: number): Observable<responseModel> {
  return this._http.get<responseModel>(`${this.api_url}/api/PersonalDacs/ObtenerPersonalDacPorIdAsync/${id}`);
}

deletePersonalDac(id: number) {
  return this._http.delete(`${this.api_url}/api/PersonalDacs/EliminarPersonalDacAsync/${id}`);
}

InsertPersonalDac(dataPersonalDac: PersonalDac): Observable<responseModel> {
  return this._http.post<responseModel>(`${this.api_url}/api/PersonalDacs/GuardarPersonalDacAsync`, dataPersonalDac);
}

UpdatePersonalDac(id: number, dataPersonalDac: PersonalDac) {
  console.log(dataPersonalDac);
   return this._http.put(`${this.api_url}/api/PersonalDacs/ActualizarPersonalDacAsync/${id}`, dataPersonalDac);
 }


  
}
