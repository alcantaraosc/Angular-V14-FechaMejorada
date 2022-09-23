export interface listarOportunidades {
    noOportunidad: number
    oportunidadID: number
    nombrePmf: string
    sucursal? : string
    clase?: string
    statusVendedor? : string 
    cantidad:number
    nombreLider: string
    llamadaDelDia?: boolean
    proximaLlamadaVendedor? : Date 
}
