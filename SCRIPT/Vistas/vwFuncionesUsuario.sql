USE [QAWEB]
GO

/****** Object:  View [dbo].[ListaCliente]    Script Date: 15/7/2022 15:10:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwFuncionesDelUsuario]
AS

SELECT        Usuario.UsuarioID, Usuario.LoginUsuario, Usuario.NombreUsuario, Usuario.ApellidoUsuario, Usuario.Correo, Usuario.EsAdmin, Usuario.CambiarClave, Usuario.Salt, Usuario.Clave, Usuario.Activo, Usuario.FechaCreacion, 
                         Usuario.FechaModificacion, Roles.RolID, Roles.NombreRol, Roles.Descripcion, Funciones.FuncionID, Funciones.NombreFuncion, Funciones.Codigo, Funciones.Descripcion AS FuncionDescripcion
FROM            Usuario INNER JOIN
                         RolesUsuarios ON Usuario.UsuarioID = RolesUsuarios.UsuarioID INNER JOIN
                         Roles ON RolesUsuarios.RolID = Roles.RolID INNER JOIN
                         FuncionesRoles ON Roles.RolID = FuncionesRoles.RolID INNER JOIN
                         Funciones ON FuncionesRoles.FuncionID = Funciones.FuncionID



GO


