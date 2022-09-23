USE [QAWEB]
GO

/****** Object:  View [dbo].[vwLlamadaDelDiaVendedor]    Script Date: 28/7/2022 08:20:36 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[vwLlamadaDelDiaVendedor]
AS
SELECT        dbo.Cliente.ClienteID, dbo.Cliente.NombreCliente, dbo.Oportunidad.OportunidadID, dbo.Oportunidad.NoOportunidad, dbo.Oportunidad.VendedorID, dbo.Oportunidad.ProximaLlamadaVendedor, dbo.Oportunidad.VentaPerdida, 
                         dbo.Oportunidad.LiderID, ISNULL(dbo.LlamadasVendedor.Importancia,0) AS Importancia, dbo.Oportunidad.UltimaLlamadaVendedorID, dbo.LlamadasVendedor.LlamadaVendedorID
FROM            dbo.Cliente INNER JOIN
                         dbo.Oportunidad ON dbo.Cliente.ClienteID = dbo.Oportunidad.ClienteID LEFT OUTER JOIN
                         dbo.LlamadasVendedor ON dbo.Oportunidad.UltimaLlamadaVendedorID = dbo.LlamadasVendedor.LlamadaVendedorID AND dbo.Oportunidad.OportunidadID = dbo.LlamadasVendedor.OportunidadID

GO


