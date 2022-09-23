export interface llamadasFinanciero {
    llamadaFinancieroID: number
    oportunidadID: string
    comentarioFinanciero: string    
    idLlamada: number
    proximaLlamadaFinanciero: Date    
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    titulo?: string
    cantidadLlamadas?: number
    nombreEstatusOportunidad?: string    
}