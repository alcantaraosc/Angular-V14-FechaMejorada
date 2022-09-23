import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filtroLlamadaVendedor } from '../_models/filtroLlamadaVendedor';
import { llamadasVendedor } from '../_models/llamadasVendedor';
import { responseModel } from '../_models/responseModel';
import { UrlapiService } from './urlapi.service';

@Injectable({
  providedIn: 'root'
})
export class AccesollamadasvendedorService {
  private api_url: string

  constructor(private _http: HttpClient, private urlapi: UrlapiService ) 
  {
       //obtener la url de la api
       this.api_url=urlapi.getUrlApi();    
  }

  listarLlamadasVendedor(oportunidadID: string){    
    return this._http.get<responseModel>(`${this.api_url}/api/LlamadasVendedores/ListarLlamadasVendedorAsync/${oportunidadID}` );
  }

  getDatosLlamadaVendedorPorId(llamadaVendedorID: number){
    return this._http.get<responseModel>(`${this.api_url}/api/LlamadasVendedores/ObtenerLlamadaVendedorIdAsync/${llamadaVendedorID}`);
  }

  listarDrownListEstatusOportunidad()  {
    return this._http.get<responseModel>(`${this.api_url}/api/EstatusOportunidades/LlenarDrownListEstatusOportunidad`);
  }

  //obtener la proxima llamada del Vendedor 
  getProximaLlamadaVendedor(oportunidadID: string){
    return this._http.get<responseModel>(`${this.api_url}/api/Oportunidades/ObtenerProximaLlamadaVendedor/${oportunidadID}`);
  }
  

  insertLlamadasVendedor(llamadasVendedor: llamadasVendedor){
  return this._http.post(`${this.api_url}/api/LlamadasVendedores/GuardarLlamadaVendedorAsync`, llamadasVendedor);
}

  updateLlamadasVendedor(llamadaVendedorID: number, llamadasVendedor: llamadasVendedor, ){
    return this._http.put(`${this.api_url}/api/LlamadasVendedores/ActualizarLlamadaVendedorAsync/${llamadaVendedorID}`, llamadasVendedor);
  }

  listarLlamadasDelDiaVendedor(filtroLlamadVend: filtroLlamadaVendedor){    
    console.log(filtroLlamadVend);
    return this._http.post<responseModel>(`${this.api_url}/api/LlamadasVendedores/ListarLlamadasDelDiaVendedorAsync`, filtroLlamadVend );
  }

  listarLlamadasDelDiaVendedorPorFiltronombre(dataFiltroLlamadVend: filtroLlamadaVendedor){   
    console.log('****  oscar aqui va listarLlamadasDelDiaVendedorPorFiltronombre ******');
    return this._http.post<responseModel>(`${this.api_url}/api/LlamadasVendedores/ListarLlamadasDelDiaVendedorPorNombreAsync`, dataFiltroLlamadVend );
  }

}
