export interface tipoSexo {
    tipoSexoID: number
    nombreSexo: string
    activo: boolean    
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    title?: string
}
