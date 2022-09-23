export interface departamento {    
    departamentoID: number
    nombreDepartamento: string
    activo: boolean
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date   
    titulo? : string 
}