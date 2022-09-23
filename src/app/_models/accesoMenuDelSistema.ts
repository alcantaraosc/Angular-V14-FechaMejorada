export interface accesoMenuDelSistema {
    admin: boolean
    fichaCliente: boolean
    vendedores: boolean
    lideres: boolean
    reportes: boolean
    catalogos: boolean
    seguridad: boolean
}


export interface opcionesVendedores {
    llamadasVendedor: boolean
}


export interface opcionesLideres {
    llamadasLider: boolean
    revisionFichaCliente: boolean
}

export interface opcionesCatalogo {
    financiera: boolean
    tipoIdentificacion: boolean
    estadoCivil: boolean
    sucursal: boolean
    tipoSexo: boolean
    departamentos: boolean
    municipio: boolean
    estatusOportunidad: boolean
    estatusFincnaciero: boolean
    estatusDac: boolean
    tipoClase: boolean
    lider: boolean
    verdedor: boolean
    visita: boolean
    motivo: boolean
    personalDac: boolean
}

export interface opcionesSeguridad {
    usuario: boolean
    roles: boolean
    funciones: boolean
}


