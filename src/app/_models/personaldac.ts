export interface PersonalDac {

    personalDacID: number
    nombrePersonalDac: string
    activo?: boolean
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date
    title?: string
}
