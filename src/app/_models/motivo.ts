

export interface motivo {

    motivoID: number
    nombreMotivo: string
    departamento: number
    tipo ?: number
    activo?: boolean
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    title?: string
}