import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlapiService } from './urlapi.service';
import { usuario } from '../_models/usuario';
import { responseModel } from '../_models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AccesodatosusuarioService {


  constructor(private _http: HttpClient, private urlApi: UrlapiService) { }

 /**********************************Accesos a datos del Usuarios********************************** */

 //acceso a datos de la tabla Usuario
 getListadoUsuario() {
    return this._http.get<any>(`${this.urlApi.getUrlApi()}/api/security/ListarUsuariosAsync`);
  }


  //Para guardar un nuevo usuario
  insertUsuario(usuario: usuario) {
    return this._http.post(`${this.urlApi.getUrlApi()}/api/security/GuardarUsuarioAsync`, usuario);
  }

   //getDatosUsuarioPorId para editar los datos del usuario
   getDatosUsuarioPorId(usuarioID: number) {
    return this._http.get<responseModel>(`${this.urlApi.getUrlApi()}/api/security/ObtenerUsuarioPorIdAsync/${usuarioID}`);
  }

  updateUsuario(usuarioID: number, usuario: usuario) {
    return this._http.put(
      `${this.urlApi.getUrlApi()}/api/security/ActualizarUsuarioAsync/${usuarioID}`, usuario);
  }



}
