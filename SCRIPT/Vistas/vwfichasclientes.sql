USE [QAWEB]
GO

/****** Object:  View [dbo].[vwfichasClientes]    Script Date: 13/10/2021 10:33:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[vwfichasClientes]
AS
SELECT        dbo.Cliente.ClienteID, dbo.Cliente.NombreCliente, dbo.Cliente.Contacto, dbo.TipoIdentificacion.NombreIdentificacion, 'COMENTARIO' AS ComentarioLider, dbo.Cliente.FechaCreacion, dbo.Lider.LiderID, dbo.Lider.NombreLider, 
                         dbo.Vendedor.VendedorID, dbo.Vendedor.NombreVendedor, dbo.Cliente.Revisado, dbo.Cliente.UserRevisado
FROM            dbo.Cliente INNER JOIN
                         dbo.Oportunidad ON dbo.Cliente.ClienteID = dbo.Oportunidad.ClienteID INNER JOIN
                         dbo.Lider ON dbo.Oportunidad.LiderID = dbo.Lider.LiderID INNER JOIN
                         dbo.Vendedor ON dbo.Oportunidad.VendedorID = dbo.Vendedor.VendedorID AND dbo.Lider.LiderID = dbo.Vendedor.LiderID INNER JOIN
                         dbo.TipoIdentificacion ON dbo.Cliente.TipoIdentificacionID = dbo.TipoIdentificacion.TipoIdentificacionID INNER JOIN
                         dbo.Sucursal ON dbo.Cliente.SucursalID = dbo.Sucursal.SucursalID AND dbo.Oportunidad.SucursalID = dbo.Sucursal.SucursalID


GO


