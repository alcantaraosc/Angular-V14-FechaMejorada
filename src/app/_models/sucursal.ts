
export interface sucursal {
    sucursalID: number,
    nombreSucursal: string,
    abreviatura: string
    activo: boolean
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    title?: string
    
}