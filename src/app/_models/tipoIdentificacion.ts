
export interface tipoIdentificacion {
    tipoIdentificacionID: number
    nombreIdentificacion: string
    activo: boolean
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion? : number
    fechaModificacion? : Date    
    titulo? : string
}
