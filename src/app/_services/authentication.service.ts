import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { responseModel } from '../_models/responseModel';
//import { user } from '../_models/user';
import { ComunicacionService } from '../_services/comunicacion.service';
import { UrlapiService } from './urlapi.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  public config = new EventEmitter<any>();
  readonly ISLOGGEDKEY = 'islogged';
  public urlUsuarioIntentaAcceder: string = '';
  public changeLoginStatusSubject = new Subject<boolean>();
  public changeLoginStatus$ = this.changeLoginStatusSubject.asObservable();

  api_url: string;

  constructor(private _http: HttpClient, private urlapi: UrlapiService, private comunicacionService: ComunicacionService) {
    //obtener la url de la api
    this.api_url = urlapi.getUrlApi();
    /* this.appS.enviarMensajeObservable.subscribe(response =>{
   //obtener la oportunidadid
   this.oportunidadIDInput=response;
   //listar todas las llamadas
   this.onListarLlamadasVendedor(this.oportunidadIDInput);    
 });*/
  }


  //logearse
  /*
   login(usuario: user) : false{

    let Estalogeado: boolean=false;
    //acceder a la base de datos
    this.getDatologin(usuario).subscribe((response: responseModel) => {
      //si la respuesta del servidor es 1 es exito
      if (response.exito == 1) {

        //indicar que el usuario esta logeado
        Estalogeado=true;
        localStorage.setItem(this.ISLOGGEDKEY, 'true');
        this.changeLoginStatusSubject.next(true);
        this.comunicacionService.EviarComprobacion(true);
        
      }
      else {
        //console.log(response.mensaje);
        Estalogeado=false;
        //establecer falso
        localStorage.setItem(this.ISLOGGEDKEY, 'false');
        this.changeLoginStatusSubject.next(false);
        this.comunicacionService.EviarComprobacion(false);
      }

    });

    return;
   
   }
   */




  //cerrar sesion
  logout() {
    //eliminar de la cache
    localStorage.removeItem(this.ISLOGGEDKEY);
    this.changeLoginStatusSubject.next(false);
  }

  //verificar si esta logeado
  isLoggedIn(url: string) {
    //obtener el valor de la cache
    let isLogged = localStorage.getItem(this.ISLOGGEDKEY);

    if (isLogged) {
      this.comunicacionService.EviarComprobacion(true);
      return true;

    }
    else {
      this.comunicacionService.EviarComprobacion(false);
      return false;
    }

  }

  //obtener el acceso al sistema
  obtenerAccesoDelsistema( itemAcceso: string[]): boolean {

    const accesos = JSON.parse(localStorage.getItem('accesos'));
  
    let index=0;
    let itemLocalizado:boolean=false;
    while(index < itemAcceso.length && !itemLocalizado ){
        
      for(var rows=0; rows < accesos.length; ++ rows){        
        //comprobar si 
        if (itemAcceso[index] === accesos[rows] ){
          itemLocalizado=true;
          break;
        }
      }


  /*

      switch(accesos[index]){

        case "CRUD_CL": itemLocalizado=true;
        break;
        case "NV_CL": itemLocalizado=true;
        break;
        case "EDT_CL": itemLocalizado=true;
        break;
        case "ELIM_CL": itemLocalizado=true;
        break;
        case "NV_OP": itemLocalizado=true;
        break;
        case "EDT_OP": itemLocalizado=true;
        break;
        case "ELIM_OP": itemLocalizado=true;
        break;
        case "CONS_CL": itemLocalizado=true;
        break;
        case "CONS_OP": itemLocalizado=true;
        break;
        case "CRUD_OP": itemLocalizado=true;
        break;
      }*/
      ++index;
    }

    return itemLocalizado;
  }

}
