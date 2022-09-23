import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { vendedor } from '../_models/vendedor';
import { responseModel } from '../_models/responseModel';
//import { sucursal } from '../_models/sucursal';
//import { lider } from '../_models/lider';
import { drowListLiderSucUsuario } from '../_models/drownListLiderSucUsuario';


@Injectable({
  providedIn: 'root'
})
export class AccesodatosvendedorService {

  api_url: string;

  constructor(private _http: HttpClient, private urlapi: UrlapiService) {
    //obtener la url de la api
    this.api_url = urlapi.getUrlApi();
  }

  /***************************** Métodos del modelo Vendedor *************************************/
   
  /*
  //este método llena la listSucursal en el modalvendedor
  ListaSucursal(){
    return this._http.get<sucursal>(`${this.api_url}/api/sucursales/ListarSucursalesAsync`);
  }

   ListaLider(){
     return this._http.get<lider>(`${this.api_url}/api/Lideres/ListarlideressAsync`);
   }
   */

  /*listarDrownLisClientes() {
    return this._http.get<drownListClientes>(`${this.api_url}/api/clientes/LlenarDrownListClientes`);
  }*/

  //mer 28/09/2021
  //llenar el drownList por medio del liderId
  listarDrownListVendedorPorLiderId(liderId:number) {
    return this._http.get<responseModel>(`${this.api_url}/api/vendedores/listarDrownListVendedorPorLiderId/${liderId}`);
  }


  //mer 28/09/2021
 // listarDrownlistVendedor() {
 //   return this._http.get<vendedor>(`${this.api_url}/api/Vendedores/LlenarDrownListVendedor`);
 // }


  /* 29-09-2021 drownlist*/
 // listarVendedor(id: number){
 //   return this._http.get<responseModel>(`${this.api_url}/api/Vendedores/ListarVendedor/${id}`);
//  }


  //llenar el drownLista de vendedores activos 
  listarDrownListVendedoresActivos(){    
    return this._http.get<responseModel>(`${this.api_url}/api/vendedores/LlenarDrownListVendedorActivos`);
  }

  listarDrownLisSucLiderUsuario(){
    return this._http.get<drowListLiderSucUsuario>(`${this.api_url}/api/vendedores/LlenarDrownListLidSucUsuario`);
  }

  getListarVendedor(): Observable<vendedor> {
    return this._http.get<vendedor>(`${this.api_url}/api/Vendedores/ListarVendedoresAsync`);
  }

  getDatosVendedorPorNombre(nombre: string) {
    return this._http.get<responseModel>(`${this.api_url}/api/Vendedores/ObtenerVendedorPorNombreAsync/${nombre}`);
  }

  getDatoVendedorPorId(id: number): Observable<responseModel> {
    return this._http.get<responseModel>(`${this.api_url}/api/Vendedores/ObtenerVendedorPorIdAsync/${id}`);
  }

  insertVendedor(dataVendedor: vendedor): Observable<responseModel> {
  return this._http.post<responseModel>(`${this.api_url}/api/Vendedores/GuardarVendedorAsync`, dataVendedor);
  }

  updateVendedor(id: number, dataVendedor: vendedor) {
    return this._http.put(`${this.api_url}/api/Vendedores/ActualizarVendedorAsync/${id}`, dataVendedor);
  }

  deleteVendedor(id: number) {
    return this._http.delete(`${this.api_url}/api/Vendedores/EliminarVendedorAsync/${id}`);
    
  }
}
