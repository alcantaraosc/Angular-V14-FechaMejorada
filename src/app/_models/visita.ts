export interface visita{
    visitaID: number
    nombreVisita: string
    activo?: boolean
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    title?: string
}