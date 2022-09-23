import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { drownListOportunidades } from '../_models/drownListOportunidades';
import { filtroClientesFechLlamada } from '../_models/filtroClientesFechLlamada';
import { oportunidad } from '../_models/oportunidad';
import { responseModel } from '../_models/responseModel';
import { vendedor } from '../_models/vendedor';
import { UrlapiService } from './urlapi.service';

@Injectable({
  providedIn: 'root'
})
export class AccesooportunidadService {

  private api_url: string

  constructor(private _http: HttpClient, private urlapi: UrlapiService ) 
  {
       //obtener la url de la api
       this.api_url=urlapi.getUrlApi();
  }


  listarDrownListOportunidades(data: oportunidad) {  
    return this._http.post<drownListOportunidades>(`${this.api_url}/api/oportunidades/LlenarDrownListOportunidades`, data);
  }

  listarDrownListOportunidadesNuevo() {
    return this._http.get<drownListOportunidades>(`${this.api_url}/api/oportunidades/LlenarDrownListOportunidadesNueva`);
  }



  listarPmf(modeloID: number){
    return this._http.get<responseModel>(`${this.api_url}/api/PmfModelos/ListarPmf/${modeloID}`);
  }

  listarLideres(vendedorID: number){
    return this._http.get<responseModel>(`${this.api_url}/api/Lideres/ListarLideres/${vendedorID}`);
  }
    
  listarOportunidad(clienteID: string){    
    return this._http.get<responseModel>(`${this.api_url}/api/Oportunidades/ListarOportunidadesAsync/${clienteID}`);
  }

  listarClientesOportunidad(dataFiltro: filtroClientesFechLlamada){
    
    return this._http.post<responseModel>(`${this.api_url}/api/Oportunidades/ListarClienteOportunidadesAsync`, dataFiltro);
  }

  getDatosOportunidadPorId(oportunidadID: string ){
    return this._http.get<responseModel>(`${this.api_url}/api/Oportunidades/ObtenerOportunidadPorIdAsync/${oportunidadID}`);
  }

  //obtener algunas datos de la oportunidad
  getAlgunosDatosOportunidadPorId(oportunidadID: string ){  
    return this._http.get<responseModel>(`${this.api_url}/api/Oportunidades/ObtenerAlgunosDatosOportunidadIdAsync/${oportunidadID}`);
  }

  insertOportunidades(oportunidades: oportunidad){
    return this._http.post(`${this.api_url}/api/oportunidades/GuardarOportunidadAsync`, oportunidades);
  }

  updateOportunidades(oportunidadID: string, oportunidades: oportunidad){
    return this._http.put<responseModel>(`${this.api_url}/api/oportunidades/ActualizarOportunidadAsync/${oportunidadID}`, oportunidades);
  }

  ListarOportunidades
}
