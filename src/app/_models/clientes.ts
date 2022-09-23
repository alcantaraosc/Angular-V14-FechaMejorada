import { departamento } from './departamento';

export interface clientes {
    nuevoCliente: boolean
    clienteID: string
    tipoIdentificacionID: number
    nombreTipoIdentificacion?: string;
    nombreCliente: string
    direccion: string
    contacto: string
    telefonos: string
    edad: number
    tipoSexoID: number
    estadoCivilID: number    
    //nombreUsuario?: string
    procesado?: boolean
    email?: string
    email2?: string
    email3?: string
    telefonoHab?: string
    celular?: string   
    departamentoID: number
    municipioID: number       
    ocupacion: string;
    sucursalID: number   
    fax?: string
    revisado: boolean
    userRevisado?: string
    comentarioRevisado?: string
    //horaRegistradad?: Date
    clienteIndeseable?: boolean
    personeriaID: number
    pep?: string 
    fechaCreacion: string    
    titulo?: string
}