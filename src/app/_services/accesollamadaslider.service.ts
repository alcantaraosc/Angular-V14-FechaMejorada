import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { llamadasLider } from '../_models/llamadasLider';
import { responseModel } from '../_models/responseModel';
import { UrlapiService } from './urlapi.service';

@Injectable({
  providedIn: 'root'
})
export class AccesollamadasliderService {


  constructor(private _http: HttpClient, private url_api: UrlapiService ) 
  {
       
  }

  listarLlamadasLider(oportunidadID: string){
    return this._http.get<responseModel>(`${this.url_api.getUrlApi()}/api/LlamadasLideres/ListarLlamadasLiderAsync/${oportunidadID}` );
  }

  getDatosLlamadaLiderPorId(llamadaLiderID: number){
    return this._http.get<responseModel>(`${this.url_api.getUrlApi()}/api/LlamadasLideres/ObtenerLlamadaLiderIdAsync/${llamadaLiderID}`);
  }

  //obtener la proxima llamada del Lider 
  getProximaLlamadaLider(oportunidadID: string){
    //return this._http.get<responseModel>(`${this.url_api.getUrlApi()}/api/oportunidades/ObtenerOportunidadPorIdAsync/${oportunidadID}`);
    return this._http.get<responseModel>(`${this.url_api.getUrlApi()}/api/oportunidades/ObtenerProximaLlamadaLider/${oportunidadID}`)
  }

  insertLlamadasLider(llamadasLider: llamadasLider){
    return this._http.post(`${this.url_api.getUrlApi()}/api/LlamadasLideres/GuardarLlamadaLiderAsync`, llamadasLider);
  }

  updateLlamadasLider(llamadaLiderID: number, llamadasLider: llamadasLider, ){
    return this._http.put(`${this.url_api.getUrlApi()}/api/LlamadasLideres/ActualizarLlamadaLiderAsync/${llamadaLiderID}`, llamadasLider);
  }


}

