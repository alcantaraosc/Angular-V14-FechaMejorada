import { estatusOportunidad } from './estatusOportunidad';
import { modelo } from './modelo';
import { sucursal } from './sucursal';
import { tipoClase } from './tipoClase';
import { vendedor } from './vendedor';
import { financiera } from './financiera';
import { visita } from './visita';
import { motivo } from './motivo';
import { pmfVh } from './pmfVh';
import { dropDownList } from './dropDownList';


export interface drownListOportunidades {
    exito?: number
    mensaje?: string
    sucursal?: sucursal
    estatusOportunidad?: estatusOportunidad
    tipoClase?: tipoClase
    modelo: modelo
    //pmfVh?: pmfVh
    vendedor?: vendedor
    financiera?: financiera
    visita?: visita
    motivo?: motivo
    poseeVh: dropDownList
    leInteresaAvaluo: dropDownList
    realizoAvaluo?: dropDownList
    aplicaAvaluo?: dropDownList
    añoModelo?: dropDownList
}