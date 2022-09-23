
---fichas del cliente
SELECT        Cliente.ClienteID, Cliente.NombreCliente, Cliente.Contacto, TipoIdentificacion.NombreIdentificacion, 
 'COMENTARIO' AS ComentarioLider, 
                         TipoIdentificacion.NombreIdentificacion, Cliente.FechaCreacion, Lider.NombreLider, Vendedor.NombreVendedor
FROM            Cliente INNER JOIN
                         Oportunidad ON Cliente.ClienteID = Oportunidad.ClienteID INNER JOIN
                         Lider ON Oportunidad.LiderID = Lider.LiderID INNER JOIN
                         Vendedor ON Oportunidad.VendedorID = Vendedor.VendedorID AND Lider.LiderID = Vendedor.LiderID INNER JOIN
                         TipoIdentificacion ON Cliente.TipoIdentificacionID = TipoIdentificacion.TipoIdentificacionID INNER JOIN
                         Sucursal ON Cliente.SucursalID = Sucursal.SucursalID AND Oportunidad.SucursalID = Sucursal.SucursalID



---fichas de llamadas
SELECT        Cliente.ClienteID, Cliente.NombreCliente, Oportunidad.NoOportunidad, Oportunidad.ProximaLlamadaVendedor, 'COMENTARIO' AS ComentarioLider, Financiera.NombreFinanciera AS Financiera, 
                         EstatusOportunidad.NombreEstatusOportunidad AS EstatusOportunidad, Lider.NombreLider, Vendedor.NombreVendedor
FROM            Cliente INNER JOIN
                         Oportunidad ON Cliente.ClienteID = Oportunidad.ClienteID INNER JOIN
                         Financiera ON Oportunidad.FinancieraID = Financiera.FinancieraID INNER JOIN
                         EstatusOportunidad ON Oportunidad.EstatusOportunidadID = EstatusOportunidad.EstatusOportunidadID INNER JOIN
                         Lider ON Oportunidad.LiderID = Lider.LiderID INNER JOIN
                         Vendedor ON Oportunidad.VendedorID = Vendedor.VendedorID AND Lider.LiderID = Vendedor.LiderID




