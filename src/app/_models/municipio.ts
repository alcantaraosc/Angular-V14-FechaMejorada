export interface municipio {
    
    municipioID: number
    nombreMunicipio: string
    activo: boolean
    departamentoID: number
    nombreDepartamento?:string
    userIDCreacion: number
    fechaCreacion: Date
    userIDModificacion?: number
    fechaModificacion?: Date   
    titulo? : string 
    
}