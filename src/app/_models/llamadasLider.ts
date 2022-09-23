export interface llamadasLider {
    llamadaLiderID: number
    oportunidadID: string
    comentarioLider: string
    revisado: boolean
    idLlamada: number
    proximaLlamadaLider: Date
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    titulo?: string
    cantidadLlamadas?: number
    nombreEstatusOportunidad?: string    
}