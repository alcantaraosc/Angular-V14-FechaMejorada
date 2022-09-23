
import { lider } from './lider';
import { vendedor } from './vendedor';

export interface drownListLideresVendedor {
    exito: number
    mensaje: string
    lider: lider
    vendedor: vendedor
}