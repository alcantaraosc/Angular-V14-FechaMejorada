import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { listaClientes } from '../_models/listaClientes';
import { dropDownList } from '../_models/dropDownList';
import { rangoFecha } from '../_models/rangoFecha';
import { drownListClientes } from '../_models/drownListClientes';
import { responseModel } from '../_models/responseModel';
import { clientes } from '../_models/clientes';
import { Observable } from 'rxjs';
import { vistaFichaClientes } from '../_models/vistaFichaClientes';
import { parametrostemporales } from '../_models/parametrostemporales';
import { vistaFichasLlamadas } from '../_models/vistaFichasLlamadas';
import { filtroClientesFechLlamada } from '../_models/filtroClientesFechLlamada';



@Injectable({
  providedIn: 'root',
})

export class AccesoclientesService {
  constructor(private _http: HttpClient, private urlApi: UrlapiService) {}
  /* ************************************METODOS PARA EL MODELO CLIENTES ***********************  */

  //continue 27/09/2021 Llenar el drowpDownList revisionLider tipo
  tipoFiltroRevision(tipoFiltro: string): Observable<responseModel> {
    return this._http.get<responseModel>(
      `${this.urlApi.getUrlApi()}/api/clientes/ListarTipoRevision/${tipoFiltro}`
    );

  }

  // continue 13/10/2021 es para filtrar la consulta con la fecha, tipodefiltro, lider
  getSelecciontipofiltro(parametros:parametrostemporales) {
    return this._http.get<any>(
      `${this.urlApi.getUrlApi()}/api/clientes/ListarxfichasClientes/${parametros}`);
  }

  //listar VistaFichaClientes continue 12 10 2021
  listarfichacliente(): Observable<vistaFichaClientes> {
    return this._http.get<vistaFichaClientes>(`${this.urlApi.getUrlApi()}/api/clientes/ListarFichaClientes`);
  }

  //listar VistaFichaLlamadas continue 24 11 2021
  listarfichallamadas(): Observable<vistaFichasLlamadas> {
    return this._http.get<vistaFichasLlamadas>(`${this.urlApi.getUrlApi()}/api/clientes/ListarFichaLlamadas`);
  }


  listarTipoFiltroCliente(datoFiltro: string) {
    return this._http.post<dropDownList[]>(
      `${this.urlApi.getUrlApi()}/api/clientes/ListarTipoConsulta`,
      datoFiltro
    );
  }

  listarClientes(rangoFecha: Array<string>) {
    return this._http.post<any>(
      `${this.urlApi.getUrlApi()}/api/clientes/ListarClientesAsync`,
      rangoFecha
    );
  }

  listarDrownLisClientes() {
    return this._http.get<drownListClientes>(
      `${this.urlApi.getUrlApi()}/api/clientes/LlenarDrownListClientes`
    );
  }

  listarMunicipio(id: number) {
    return this._http.get<responseModel>(
      `${this.urlApi.getUrlApi()}/api/Municipios/ListarMunicipio/${id}`
    );
  }

  getDatosClientePorId(clienteID : string) {
    return this._http.get<responseModel>(
      `${this.urlApi.getUrlApi()}/api/clientes/ObtenerClientePorIdAsync/${clienteID}`
    );
  }

  //obtener la lista de clientes
  getListaClientesPorFiltros(tipofiltro: string, busqueda: string) {
    return this._http.get<any>(
      `${this.urlApi.getUrlApi()}/api/Clientes/ListarClienteAsync/${tipofiltro}/${busqueda}`
    );
  }

  insertClientes(clientes: clientes) {
    return this._http.post(
      `${this.urlApi.getUrlApi()}/api/clientes/GuardarClienteAsync`,
      clientes
    );
  }

  updateClientes(clienteID: string, clientes: clientes) {
    return this._http.put(
      `${this.urlApi.getUrlApi()}/api/clientes/ActualizarClienteAsync/${clienteID}`,
      clientes
    );
  }
}
