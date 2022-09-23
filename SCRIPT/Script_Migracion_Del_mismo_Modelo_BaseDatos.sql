USE QAWEB


---script de Migracion---

 ---HACER LA MIGRACION DE LA TABLA BANCOS EN ORDEN ALFABETICO
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].TipoCategoria ON
INSERT INTO QAWEB_SECURITY.dbo.TipoCategoria(TipoCategoriaID, NombreTipoCategoria, Activo, UserIDCreacion, FechaCreacion)
SELECT TipoCategoriaID, NombreTipoCategoria, Activo, UserIDCreacion, FechaCreacion  FROM BD_QAWEB_USER.dbo.TipoCategoria  
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].TipoCategoria OFF



---HACER LA MIGRACION DE LA TABLA BANCOS EN ORDEN ALFABETICO
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Financiera ON
INSERT INTO QAWEB_SECURITY.dbo.Financiera(FinancieraID, NombreFinanciera, Activo, TipoCategoriaID, UserIDCreacion, FechaCreacion )
SELECT FinancieraID, NombreFinanciera, Activo, TipoCategoriaID, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.Financiera 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Financiera OFF

                    

---SUCURSAL
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].SUCURSAL ON
INSERT INTO QAWEB_SECURITY.DBO.SUCURSAL(SucursalID, NombreSucursal, Abreviatura, Activo, UserIDCreacion, FechaCreacion)
SELECT SucursalID, NombreSucursal, Abreviatura, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.SUCURSAL
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].SUCURSAL OFF


----CLIENTES
---DEPARTAMENTO
--INHABILITAR LA LA COLUMNA IDENTITY
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[Departamento] ON
--INGRESAR TODAS LOS DEPARTAMENTO MENOS EL QUE TENGA idDepto CERO.
INSERT INTO QAWEB_SECURITY.dbo.Departamento(DepartamentoID, [NombreDepartamento], Activo, UserIDCreacion, FechaCreacion)
SELECT DepartamentoID, [NombreDepartamento], Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.Departamento 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[Departamento] OFF
-----fin departamento

---MUNICIPIO
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[Municipio] ON
INSERT INTO QAWEB_SECURITY.DBO.Municipio(MunicipioID, DepartamentoID, NombreMunicipio, Activo, UserIDCreacion, FechaCreacion)
SELECT  MunicipioID, DepartamentoID, NombreMunicipio, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.Municipio
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[Municipio] OFF
--ENCONTRAR EL VALOR MAXIMO



---LIDER
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Lider ON
INSERT INTO QAWEB_SECURITY.DBO.Lider(LiderID, NombreLider, CodigoLider, Area, Empresa, UserID, Activo, Identificacion, UserIDCreacion, FechaCreacion)
SELECT LiderID, NombreLider, CodigoLider, Area, Empresa, UserID, Activo, Identificacion, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.Lider
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Lider OFF
--fin del lider

---MOTIVO
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Motivo ON
INSERT INTO QAWEB_SECURITY.DBO.Motivo(MotivoID, NombreMotivo, Activo, Departamento, Tipo, UserIDCreacion, FechaCreacion)
SELECT MotivoID, NombreMotivo, Activo, Departamento, Tipo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.Motivo
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Motivo OFF
--fin del motivo


---TIPO DE CLASE
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].TipoClase ON
INSERT INTO QAWEB_SECURITY.DBO.TipoClase(TipoClaseID, NombreTipoClase, Activo, UserIDCreacion, FechaCreacion)
SELECT TipoClaseID, NombreTipoClase, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.TipoClase
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].TipoClase OFF
--fin de la clase

---VISITA
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Visita ON
INSERT INTO QAWEB_SECURITY.DBO.Visita(VisitaID, NombreVisita, Activo, UserIDCreacion, FechaCreacion)
SELECT VisitaID, NombreVisita, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.Visita
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Visita OFF



---TIPO IDENTIFICACION
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].TipoIdentificacion ON
INSERT INTO QAWEB_SECURITY.DBO.TipoIdentificacion(TipoIdentificacionID, NombreIdentificacion, Activo, GenerarIDAutomatico, UserIDCreacion, FechaCreacion)
SELECT TipoIdentificacionID, NombreIdentificacion, Activo, GenerarIDAutomatico, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.TipoIdentificacion 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].TipoIdentificacion OFF
---fin tipo identificacion

---vendedores
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Vendedor ON
INSERT INTO QAWEB_SECURITY.DBO.Vendedor(
					VendedorID, 
					NombreVendedor, 
					CodigoVendedor, 
					Activo, 
					UserID, 
					SucursalID, 
					LiderID, 
					Identificacion, 
					UserIDCreacion, 
					FechaCreacion)
		
SELECT			VendedorID, 
					NombreVendedor, 
					CodigoVendedor, 
					Activo, 
					UserID, 
					SucursalID, 
					LiderID, 
					Identificacion, 
					UserIDCreacion, 
					FechaCreacion
	FROM BD_QAWEB_USER.dbo.Vendedor
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Vendedor OFF



---TIPO DE SEXO
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].TipoSexo ON
INSERT INTO QAWEB_SECURITY.DBO.TipoSexo(TipoSexoID, NombreSexo, Activo, UserIDCreacion, FechaCreacion)
SELECT TipoSexoID, NombreSexo, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.DBO.TipoSexo
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].TipoSexo OFF

---ESTADO CIVIL
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[EstadoCivil] ON
INSERT INTO QAWEB_SECURITY.DBO.EstadoCivil(EstadoCivilID, NombreEstadoCivil, Activo, UserIDCreacion, FechaCreacion)
SELECT EstadoCivilID, NombreEstadoCivil, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.EstadoCivil 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[EstadoCivil] OFF
--fin estado Civil



---PERSONERIA
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].PERSONERIA ON
INSERT INTO QAWEB_SECURITY.[dbo].[Personeria] (PersoneriaID, NombrePersoneria, Activo, UserIDCreacion, FechaCreacion)
SELECT PersoneriaID, NombrePersoneria, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.Personeria 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].PERSONERIA OFF


---MODELO
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].Modelo	 ON
INSERT INTO QAWEB_SECURITY.DBO.Modelo(ModeloID, NombreModelo, Activo, Empresa, UserIDCreacion, FechaCreacion)
SELECT ModeloID, NombreModelo, Activo, Empresa, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.Modelo
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].MODELO OFF

---PMF
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].PmfVh ON
INSERT INTO QAWEB_SECURITY.DBO.PmfVh(PmfVhID, ModeloID, NombrePMF, Activo, UserIDCreacion, FechaCreacion)
SELECT PmfVhID, ModeloID, NombrePMF, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.PmfVh 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].PmfVh	 OFF


---Estatus de la oportunidad------ 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].EstatusOportunidad ON
INSERT INTO QAWEB_SECURITY.DBO.EstatusOportunidad(EstatusOportunidadID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, NombreEstatusOportunidad, Activo)
--estatus de la oportunidad 
SELECT EstatusOportunidadID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, NombreEstatusOportunidad, Activo FROM BD_QAWEB_USER.dbo.EstatusOportunidad
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].EstatusOportunidad	OFF


---Estatus del DAC------ 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].EstatusDac ON
INSERT INTO QAWEB_SECURITY.DBO.EstatusDac(EstatusDacID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, NombreEstatusDac, Activo)
SELECT EstatusDacID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, NombreEstatusDac, Activo FROM BD_QAWEB_USER.dbo.EstatusDac 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].EstatusDac	OFF
---FIN Estatus del DAC------ 


---[EstatusFinanciero] ------ 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[EstatusFinanciero] ON
INSERT INTO QAWEB_SECURITY.DBO.[EstatusFinanciero](EstatusFinancieroID,  NombreEstatusFinanciero, Activo, UserIDCreacion, FechaCreacion)
SELECT EstatusFinancieroID,  NombreEstatusFinanciero, Activo, UserIDCreacion, FechaCreacion FROM BD_QAWEB_USER.dbo.[EstatusFinanciero]
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[EstatusFinanciero]	OFF
---FIN Estatus del EstatusFinanciero------ 


---MIGRACION DE CLIENTE---
INSERT INTO QAWEB_SECURITY.DBO.Cliente (ClienteID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, TipoIdentificacionID, NombreCliente, Direccion, Contacto, 
Edad, TipoSexoID, EstadoCivilID, Procesado, Email, Email2, Email3, Telefonos, TelefonoHab, Celular, Fax, DepartamentoID, MunicipioID, Ocupacion, SucursalID, Revisado, 
UserRevisado, ComentarioRevisado, HoraRegistrada, ClienteIndesable, PersoneriaID, PEP)
SELECT ClienteID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, TipoIdentificacionID, NombreCliente, Direccion, Contacto, Edad, TipoSexoID, EstadoCivilID, Procesado, Email, Email2, Email3, Telefonos, TelefonoHab, Celular, Fax, DepartamentoID, MunicipioID, Ocupacion, SucursalID, Revisado, UserRevisado, ComentarioRevisado, HoraRegistrada, ClienteIndesable, PersoneriaID, PEP
FROM BD_QAWEB_USER.dbo.Cliente
		



---tabla Oportunidad
INSERT INTO QAWEB_SECURITY.[dbo].[Oportunidad] (OportunidadID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, NoOportunidad, ClienteID, 
ComentarioVendedor, Cantidad, FinancieraID, Prima, VisitaID, ProximaLlamadaVendedor, MotivoID, LiderID, VendedorID, PruebaManejo, SucursalID, Procesado, PmfVhID, 
codVendeOrigen, NombreVendeOrigen, TipoClaseID, ProximaLlamadaLider, EstatusDacID, ProximaLlamadaDac, codStaLIDER, EstatusFinancieroID, ProximaLlamadaFinanciero, 
Hora_Op, EstatusTeleID, ProximaLlamadaTele, VentaPerdida, Contacto, Correo, Celular, Telefono, Programado, EstatusOportunidadID, FechaCierreOport,
 PoseeVH, LeInteresaAvaluo, AñoModelo, RealizoAvaluo, ModeloVHquePosee, AplicaAvaluo)
SELECT OportunidadID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, NoOportunidad, ClienteID, 
ComentarioVendedor, Cantidad, FinancieraID, Prima, VisitaID, ProximaLlamadaVendedor, MotivoID, LiderID, VendedorID, PruebaManejo, SucursalID, Procesado, PmfVhID, 
codVendeOrigen, NombreVendeOrigen, TipoClaseID, ProximaLlamadaLider, EstatusDacID, ProximaLlamadaDac, codStaLIDER, EstatusFinancieroID, ProximaLlamadaFinanciero, 
Hora_Op, EstatusTeleID, ProximaLlamadaTele, VentaPerdida, Contacto, Correo, Celular, Telefono, Programado, EstatusOportunidadID, FechaCierreOport,
 PoseeVH, LeInteresaAvaluo, AñoModelo, RealizoAvaluo, ModeloVHquePosee, AplicaAvaluo FROM BD_QAWEB_USER.DBO.Oportunidad




  


---[LlamadasVendedor] ------ 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[LlamadasVendedor] ON
INSERT QAWEB_SECURITY.dbo.[LlamadasVendedor] (LlamadaVendedorID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, OportunidadID, 
ComentarioVendedor, Revisado, IdLlamada, ProximaLlamadaVendedor, 
EstatusOportunidadID, NombreStatusOportunidad, ComentarioLider, Visita, Llamada, Avaluo, Correo, Importancia)
SELECT LlamadaVendedorID, UserIDCreacion, FechaCreacion, UserIDModificacion, FechaModificacion, OportunidadID, 
ComentarioVendedor, Revisado, IdLlamada, ProximaLlamadaVendedor, 
EstatusOportunidadID, NombreStatusOportunidad, ComentarioLider, Visita, Llamada, Avaluo, Correo, Importancia
FROM BD_QAWEB_USER.[dbo].[LlamadasVendedor]
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[LlamadasVendedor]	OFF
--fin LlamadasVendedor



---[usuario] ------ 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[Usuario] ON
INSERT QAWEB_SECURITY.dbo.[Usuario] (UsuarioID, LoginUsuario, NombreUsuario, ApellidoUsuario, Correo, EsAdmin, CambiarContraseña, Salt, Contraseña, Activo, FechaCreacion, FechaModificacion)

SELECT UsuarioID, LoginUsuario, NombreUsuario, ApellidoUsuario, Correo, EsAdmin, CambiarContraseña, Salt, Contraseña, Activo, GETDATE(), FechaModificacion FROM  [BD_QAWEB_USER].[dbo].[UsuarioS]

SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[Usuario]	OFF
--fin usuario


			
---[LlamadasLider] ------ 
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[LlamadasLider] ON
INSERT INTO QAWEB_SECURITY.dbo.[LlamadasLider](LlamadaLiderID, OportunidadID, ComentarioLider, Revisado, IdLlamada, ProximaLlamadaLider, UserIDCreacion, FechaCreacion)
SELECT LlamadaLiderID, OportunidadID, ComentarioLider, Revisado, IdLlamada, ProximaLlamadaLider, UserIDCreacion, FechaCreacion			 	
FROM BD_QAWEB_USER.dbo.[LlamadasLider]
SET IDENTITY_INSERT QAWEB_SECURITY.[dbo].[LlamadasLider] OFF
