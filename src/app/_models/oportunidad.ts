export interface oportunidad {
    
    oportunidadID: string
    noOportunidad: number
    clienteID: string
    comentarioVendedor: string
    isNuevaOportunidad?: boolean
    cantidad: number
    financieraID: number
    prima: string 
    visitaID: number   
    proximaLlamadaVendedor:Date
    ultimaLlamadaVendedorID?: number
    motivoID: number
    modeloID: number
    liderID:number
    vendedorID:number
    pruebaManejo:boolean    
    sucursalID: number
    procesado: boolean
    pmfVhID: number    
    codVendeOrigen?:number
    nombreVendeOrigen?: string
    tipoClaseID: number
    proximaLlamadaLider?:Date
    estatusDacID:number
    proximaLlamadaDac?:Date
    codStaLIDER?:string   
    estatusFinancieroID:number
    proximaLlamadaFinanciero?:Date
    hora_Op?: Date
    estatusTeleID:number    
    proximaLlamadaTele?:Date
    ventaPerdida:boolean  
    contacto?:string
    correo?:string//direccionOportunidad?:string
    celular?:string
    telefono?: string
    programado?: boolean
    estatusOportunidadID: number
    fechaCierreOport?:Date
    poseeVh?:boolean   
    leInteresaAvaluo?:boolean
    añoModelo?:string  
    realizoAvaluo?: boolean
    modeloVHquePosee?:string     
    aplicaAvaluo?:boolean
    userIDCreacion: number
    fechaCreacion: string
    userIDModificacion?: number
    fechaModificacion?: Date   
    cantidadLlamada?: number
    poseeVhValorString?:string   
    leInteresaAvaluoValorString?:string    
    titulo? : string 
    aplicaAvaluoValorString?:string
    realizoAvaluoValorString?: string
    añoModeloValorString?:string   
    modeloVHquePoseeValorString?:string            
}