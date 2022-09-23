export interface vendedor {
    vendedorID: number
    identificacion: string
    codigoVendedor: string
    nombreVendedor: string    
    activo: boolean
    sucursalID?: number
    nombreSucursal?: string
    liderID?: number
    nombreLider?: string
    usuarioID: number
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    title?: string
}


export interface datosVendedor {
    vendedorID: number
    nombreVendedor: string
}