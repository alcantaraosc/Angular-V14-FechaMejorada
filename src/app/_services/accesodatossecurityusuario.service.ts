import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { responseModel } from '../_models/responseModel';
import { UrlapiService } from './urlapi.service';
import { usuario } from '../_models/usuario'; 
import { viewModelSecurity } from '../_models/viewModelSecurity';

@Injectable({
  providedIn: 'root'
})
export class AccesodatossecurityusuarioService {

  constructor(private _http: HttpClient, private urlApi: UrlapiService) { }

  //acceso a datos de la tabla Usuario
  getListadoUsuario() {
    return this._http.get<any>(
      `${this.urlApi.getUrlApi()}/api/securityusuario/ListarUsuariosAsync`
    );
  }

//para el filtroxnombreusuario en la pantalla de inicio del listado
getDatosUsuarioPorNombre(nombrerUsuario: string) {
  return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/securityusuario/ObtenerUsuarioPorNombre/${nombrerUsuario}`);
}


  //Para guardar un nuevo usuario
  insertUsuario(model: viewModelSecurity) {
    console.log(`${this.urlApi.getUrlApi()}/api/securityusuario/GuardarUsuarioAsync`);
    console.log('model=', model);
    return this._http.post<responseModel>(`${this.urlApi.getUrlApi()}/api/securityusuario/GuardarUsuarioAsync`, model );
  }

  //getDatosUsuarioPorId para editar los datos del usuario
  getDatosUsuarioPorId(usuarioID: number) {
    return this._http.get<responseModel>(
      `${this.urlApi.getUrlApi()}/api/securityusuario/ObtenerUsuarioPorIdAsync/${usuarioID}`
    );
  }
 //Actualizar los datos del usuario
  updateUsuario(usuarioID: number, usuario: viewModelSecurity) {
    return this._http.put(
      `${this.urlApi.getUrlApi()}/api/securityusuario/ActualizarUsuarioAsync/${usuarioID}`,
      usuario
    );
  }

   //Elimina el usuario  continue 20 12 2021
   deleteUsuario(usuarioID: number) {
    return this._http.delete(
      `${this.urlApi.getUrlApi()}/api/securityusuario/EliminarUsuarioAsync/${usuarioID}`
    );
  }
}
