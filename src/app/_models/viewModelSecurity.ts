import { funciones } from "./funciones"
import { funcionesRoles } from "./funcionesRoles"
import { roles } from "./roles"
import { rolesUsuarios } from "./rolesUsuarios"
import { usuario } from "./usuario"


export interface viewModelSecurity {
    funciones?: funciones
    roles?: roles
    funcionesRoles?: funcionesRoles[]
    usuario?: usuario
    rolesUsuarios?: rolesUsuarios[]
}
