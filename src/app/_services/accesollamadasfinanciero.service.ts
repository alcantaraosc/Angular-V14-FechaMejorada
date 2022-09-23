import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { llamadasFinanciero } from '../_models/llamadasFinanciero';
import { responseModel } from '../_models/responseModel';
import { UrlapiService } from './urlapi.service';


@Injectable({
  providedIn: 'root'
})

export class AccesollamadasfinancieroService {

  private api_url: string

  constructor(private _http: HttpClient, private urlapi: UrlapiService ) 
  {
       //obtener la url de la api
       this.api_url=urlapi.getUrlApi();    
  }

  listarLlamadasFinanciero(oportunidadID: string){
    return this._http.get<responseModel>(`${this.api_url}/api/LlamadasFinanciero/ListarLlamadasFinancieroAsync/${oportunidadID}` );
  }

  getDatosLlamadaFinancieroPorId(llamadaFinancieroID: number){
    return this._http.get<responseModel>(`${this.api_url}/api/LlamadasFinanciero/ObtenerLlamadaFinancieroIdAsync/${llamadaFinancieroID}`);
  }

  //obtener la proxima llamada del Financiero 
  getProximaLlamadaFinanciero(oportunidadID: string){
    //return this._http.get<responseModel>(`${this.api_url}/api/oportunidades/ObtenerOportunidadPorIdAsync/${oportunidadID}`);
    return this._http.get<responseModel>(`${this.api_url}/api/oportunidades/ObtenerProximaLlamadaFinanciero/${oportunidadID}`)
  }

  insertLlamadasFinanciero(llamadasFinanciero: llamadasFinanciero){
    return this._http.post(`${this.api_url}/api/LlamadasFinanciero/GuardarLlamadaFinancieroAsync`, llamadasFinanciero);
  }

  updateLlamadasFinanciero(llamadaFinancieroID: number, llamadasFinanciero: llamadasFinanciero, ){
    return this._http.put(`${this.api_url}/api/LlamadasFinanciero/ActualizarLlamadaFinancieroAsync/${llamadaFinancieroID}`, llamadasFinanciero);
  }


}

