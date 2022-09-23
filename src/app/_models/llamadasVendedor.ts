export interface llamadasVendedor{
    llamadaVendedorID: number
    oportunidadID: string
    comentarioVendedor: string
    revisado: boolean
    idLlamada: number
    proximaLlamadaVendedor: Date
    estatusOportunidadID: number
    nombreStatusOportunidad: string
    comentarioLider?: string
    visita: boolean
    llamada: boolean
    avaluo: boolean
    correo: boolean
    importancia: boolean
    cantidadLlamadas?: number
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    titulo?: string
    notificationType?: string
}