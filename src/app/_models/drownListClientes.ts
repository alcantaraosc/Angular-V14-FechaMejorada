import { tipoIdentificacion } from  './tipoIdentificacion';
import { sucursal } from './sucursal';
import { estadoCivil } from './estadoCivil';
import { tipoSexo } from './tipoSexo';
import { departamento } from './departamento';
import { personeria } from './personeria';
import { dropDownList } from './dropDownList';

export interface drownListClientes {
    exito?: number
    mensaje?: string
    tipoIdentificacion: tipoIdentificacion[]
    sucursal?: sucursal[]
    estadoCivil?: estadoCivil[]
    tipoSexo?: tipoSexo[]
    departamento?: departamento[]
    personeria?: personeria[]
    pep?: dropDownList[]
    
}
