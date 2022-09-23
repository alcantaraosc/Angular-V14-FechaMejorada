import { sucursal } from './sucursal';
import { lider } from './lider';
import { usuario } from './usuario';

export interface drowListLiderSucUsuario {

    exito?: number
    mensaje?: string
    sucursal?: sucursal[]
    lider?: lider[]
    usuario?:usuario[]
}

