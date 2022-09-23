import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { financiera } from '../_models/financiera';
import { UrlapiService } from './urlapi.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { tipoCategoria } from '../_models/tipoCategoria';
import { tipoIdentificacion } from '../_models/tipoIdentificacion';
import { estadoCivil } from '../_models/estadoCivil';


@Injectable({
  providedIn: 'root'
})
export class AccesodatosService {


  
  //otra forma de declara el form
  form: FormGroup = new FormGroup({
    bancoId: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    activo: new FormControl(true, Validators.required),
    tipoCategoriaID: new FormControl(0, Validators.required)
  });


  //                                      obtener la url de la api
  constructor(private _http: HttpClient, private urlApi: UrlapiService) 
  {  }

  /***************************** acceso a datos de BANCOS **************************************************/

  //acceso a datos de la tabla financiera
  getListadoFinanciera() {
    return this._http.get<any>(`${this.urlApi.getUrlApi()}/api/financieras/ListarFinancieraAsync`);
  }

  
  listarTipoCategoria(){
    return this._http.get<tipoCategoria[]>(`${this.urlApi.getUrlApi()}/api/financieras/listartipocategoriaasync`);

    /*
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });*/
  }

  getDatosFinancieraPorId(id: number){
    return this._http.get(`${this.urlApi.getUrlApi()}/api/financieras/GetFinancieraAsync/${id}`);
  }

  getDatosFinancieraPorNombre(nombre: string){
    return this._http.get<any>(`${this.urlApi.getUrlApi()}/api/financieras/GetFinancieraPorNombreAsync/${nombre}`);
  }

  insertFinanciera(banco: financiera){
    return this._http.post(`${this.urlApi.getUrlApi()}/api/financieras/GuardarFinancieraAsync`, banco);
  }

  updateFinanciera(id: number, financiera: financiera){
    return this._http.put(`${this.urlApi.getUrlApi()}/api/financieras/ActualizarFinancieraAsync/${id}`, financiera);
  }


  deleteFinanciera(id:number){    
    return this._http.delete(`${this.urlApi.getUrlApi()}/api/financieras/DeleteClientes/${id}`);
  }
  /**************************************** fin de acceso a datos de financiera   ******************************************/

  /***************************** acceso a datos TIPOIDENTIFICACION **************************************************/
    //acceso a datos de la tabla TIPOIDENTIFICACION
    getListadoTipoIdentificacion() {
      return this._http.get<any>(`${this.urlApi.getUrlApi()}/api/tipoidentificacion/ListarTipoIdentificacionAsync`);
    }
  
      
    getDatosTipoIdentificacionPorId(id: number){
      return this._http.get(`${this.urlApi.getUrlApi()}/api/tipoidentificacion/ObtenerTipoIdentificacionPorIdAsync/${id}`);
    }
      
    getDatosTipoIdentificacionPorNombre(nombre: string){
      return this._http.get<any>(`${this.urlApi.getUrlApi()}/api/tipoidentificacion/ObtenerTipoIdentificacionPorNombreAsync/${nombre}`);
    }
  
    insertTipoIdentificacion(tipoIdentificacion: tipoIdentificacion){
      return this._http.post(`${this.urlApi.getUrlApi()}/api/tipoidentificacion/GuardarTipoIdentificacionAsync`, tipoIdentificacion);
    }
  
    updateTipoIdentificacion(id: number, tipoIdentificacion: tipoIdentificacion){
      return this._http.put(`${this.urlApi.getUrlApi()}/api/tipoidentificacion/ActualizarTipoIdentificacionAsync/${id}`, tipoIdentificacion);
    }
  
  
    deleteTipoIdentificacion(id:number){    
      return this._http.delete(`${this.urlApi.getUrlApi()}/api/tipoidentificacion/EliminarTipoIdentificacionAsync/${id}`);
    }


    /***************************** acceso a datos ESTADO CIVIL **************************************************/
    //acceso a datos de la tabla Estado Civil
    getListadoEstadoCivil() {
      return this._http.get<any>(`${this.urlApi.getUrlApi()}/api/estadocivil/ListarEstadoCivilAsync`);
    }
     
    getDatosEstadoCivilPorId(id: number){
      return this._http.get(`${this.urlApi.getUrlApi()}/api/estadocivil/ObtenerEstadoCivilPorIdAsync/${id}`);
    }
  
    getDatosEstadoCivilPorNombre(nombre: string){
      return this._http.get<any>(`${this.urlApi.getUrlApi()}/api/estadocivil/ObtenerEstadoCivilPorNombreAsync/${nombre}`);
    }
  
    insertEstadoCivil(estadoCivil: estadoCivil){
      return this._http.post(`${this.urlApi.getUrlApi()}/api/estadocivil/GuardarEstadoCivilAsync`, estadoCivil);
    }
  
    updateEstadoCivil(id: number, estadoCivil: estadoCivil){
      return this._http.put(`${this.urlApi.getUrlApi()}/api/estadocivil/ActualizarEstadoCivilAsync/${id}`, estadoCivil);
    }
  
  
    deleteEstadoCivil(id:number){    
      return this._http.delete(`${this.urlApi.getUrlApi()}/api/estadocivil/EliminarEstadoCivilAsync/${id}`);
    }
  
  
}
