import { rolesUsuarios } from "./rolesUsuarios";
import { usuario } from "./usuario";

export interface listaRolesUsuarios{
    usuario: usuario;
    rolesUsuario?: rolesUsuarios[];   
}