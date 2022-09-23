USE [QAWEB]
GO

/****** Object:  View [dbo].[ListaCliente]    Script Date: 16/7/2021 11:31:22 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[ListaCliente]
AS
SELECT        dbo.Cliente.ClienteID, dbo.Cliente.NombreCliente, dbo.Cliente.Contacto, dbo.TipoIdentificacion.NombreIdentificacion, dbo.Sucursal.NombreSucursal, dbo.Cliente.Procesado, dbo.Cliente.Revisado, dbo.Cliente.Celular, 
                         dbo.Cliente.Telefonos, dbo.Cliente.Fax, dbo.Cliente.TelefonoHab
FROM            dbo.Cliente INNER JOIN
                         dbo.Sucursal ON dbo.Cliente.SucursalID = dbo.Sucursal.SucursalID INNER JOIN
                         dbo.TipoIdentificacion ON dbo.Cliente.TipoIdentificacionID = dbo.TipoIdentificacion.TipoIdentificacionID

GO

