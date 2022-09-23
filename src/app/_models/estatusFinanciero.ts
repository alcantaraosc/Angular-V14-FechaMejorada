export interface estatusFinanciero {
  
    estatusFinancieroID: number
    nombreEstatusFinanciero: string
    activo?: boolean
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date   
    titulo?: string 
}