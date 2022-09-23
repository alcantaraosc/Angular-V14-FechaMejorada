
import { listarOportunidades } from "./listarOportunidades";

export interface clientesOportunidades {
    clienteID: string
    tipoCliente: string
    cliente: string
    telefOfic: string
    telefHabit: string
    celular: string
    email: string
   listarOportunidades: listarOportunidades[]

}
