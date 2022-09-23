
export interface usuario {
  nuevoUsuario?: boolean
  usuarioID: number
  loginUsuario: string
  nombreUsuario: string
  apellidoUsuario: string  
  correo?: string
  cambiarClave: boolean
  salt: string
  clave: string
  activo: boolean
  esAdmin: boolean
  fechaCreacion: Date
  fechaModificacion?: Date
  titulo?: string
}
