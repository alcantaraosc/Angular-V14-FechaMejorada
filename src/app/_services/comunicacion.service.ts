import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  mensaje: string;
  user: boolean;

  //permite enviar mensaje a multiple observadoredes
  private enviarMensajeSubject = new Subject<string>();
  enviarMensajeObservable = this.enviarMensajeSubject.asObservable();

  //enviar usuario al autenticarse
  private enviarComprobacionSubject = new Subject<boolean>();
  enviarComprobacionObservable = this.enviarComprobacionSubject.asObservable();

  //(***Idreferencia=EviarDatosModalRolesFunciones***)
  //enviar  datos desde el componente: _components/security/_funciones/rolesfunciones/rolesfunciones.component
  //al componente _components/security/_funciones/modalfunciones/modalfunciones.component
  private enviarDatosrolesfuncionesStringSubject = new Subject<string[]>();
  enviarDatosRolesFuncionesObservable = this.enviarDatosrolesfuncionesStringSubject.asObservable();

  //enviar un datos desde el componente: _components/security/_funciones/rolesfunciones/rolesfunciones.component
  //al componente _components/security/_roles/modalroles/modalroles.component
  private enviarDatosrolesfuncionesStringSubjectRoles = new Subject<string[]>();
  enviarDatosRolesFuncionesObservableRoles = this.enviarDatosrolesfuncionesStringSubjectRoles.asObservable();


  //enviar un datos desde el componente: _components/security/_funciones/rolesfunciones/rolesfunciones.component
  //al componente _components/security/_roles/modalroles/modalroles.component
  private enviarDatosRolesUsuariosStringSubject = new Subject<string[]>();
  enviarDatosRolesUsuariosObservable = this.enviarDatosRolesUsuariosStringSubject.asObservable();

  NoIdentificacion: string;
  OportunidadID: string;

  constructor() { }

  enviarMensaje(mensaje: string) {
    this.mensaje = mensaje;
    this.enviarMensajeSubject.next(mensaje);
  }

  //enviar la informacion al usuario al logearse
  EviarComprobacion(user: boolean) {
    this.user = user;
    this.enviarComprobacionSubject.next(user);
  }


  //enviar la informacion al usuario al logearse
  EviarDatosModalRolesFunciones(valor: string[], ventanaDelComponenteaMostrar: string) {

    if (ventanaDelComponenteaMostrar === 'roles') {

      this.enviarDatosrolesfuncionesStringSubject.next(valor);
    }
    else if (ventanaDelComponenteaMostrar === 'funciones') {
      this.enviarDatosrolesfuncionesStringSubjectRoles.next(valor);
    }
    else if (ventanaDelComponenteaMostrar === 'rolesusuarios') {
      //console.log('********** aqui esta enviando los roles por servicio **************');
      //console.log(valor);
      this.enviarDatosRolesUsuariosStringSubject.next(valor);
    }
  }

  //asignar el numero de identificacion del cliente
  setNoIdentificacionCliente(clienteID: string) {
    this.NoIdentificacion = clienteID;
  }

  //retornar el numero de identificacion del cliente
  getNoIdentificacionCliente() {
    return this.NoIdentificacion;
  }

  //asignar el numero de oportunidad del cliente
  setOportunidadCliente(numOportunidadID: string) {
    this.OportunidadID = numOportunidadID;
  }


  //retornar el numero de oportunidad del cliente
  getOportunidadCliente(numOportunidadID: string) {
    return this.OportunidadID;
  }

  public destroy() {

  }
}
