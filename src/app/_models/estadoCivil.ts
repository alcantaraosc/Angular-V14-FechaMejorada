import { dateTimeCustomer } from "./dateTimeCustomer"

export interface estadoCivil {
    
    estadoCivilID: number
    nombreEstadoCivil: string
    activo: boolean
    userIDCreacion: number
    fechaCreacion: string    
    userIDModificacion?: number
    fechaModificacion?: string   
    titulo? : string
}
