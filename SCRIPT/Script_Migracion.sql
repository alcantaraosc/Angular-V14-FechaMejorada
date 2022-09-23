USE QAWEB

---script de Migracion---

 ---HACER LA MIGRACION DE LA TABLA BANCOS EN ORDEN ALFABETICO
SET IDENTITY_INSERT QAWEB.[dbo].TipoCategoria ON
INSERT INTO [QAWEB].dbo.TipoCategoria(TipoCategoriaID, NombreTipoCategoria, Activo, UserIDCreacion, FechaCreacion)
SELECT IdTipoCategoria, [Description], 1, 1, GETDATE()  FROM QA.dbo.TipoCategoria  
SET IDENTITY_INSERT QAWEB.[dbo].TipoCategoria OFF



---HACER LA MIGRACION DE LA TABLA BANCOS EN ORDEN ALFABETICO
SET IDENTITY_INSERT QAWEB.[dbo].Financiera ON
INSERT INTO [QAWEB].dbo.Financiera(FinancieraID, NombreFinanciera, Activo, TipoCategoriaID, UserIDCreacion, FechaCreacion )
SELECT idBanco, Nombre, Habilitado, IdTipoCategoria,  1, GETDATE()  FROM QA.dbo.Bancos  WHERE IDBANCO<>0--ORDER BY Nombre

--asignar solo cuando VALE 0
INSERT INTO QAWEB.DBO.Financiera(FinancieraID, NombreFinanciera, Activo, TipoCategoriaID, UserIDCreacion, FechaCreacion)
SELECT  (SELECT MAX(CONVERT(INT, IDBANCO))+1 FROM QA.dbo.Bancos), Nombre,  Habilitado, IdTipoCategoria, 1, GETDATE() FROM QA.DBO.Bancos WHERE idBanco=0
SET IDENTITY_INSERT QAWEB.[dbo].Financiera OFF

--ALTER TABLE QAWEB.DBO.Municipio
--ALTER COLUMN MunicipioID INTEGER NOT NULL;---IDENTITY(1,1) NOT NULL,


--	ALTER TABLE PRUEBA_ID DROP ID_N IDENTITY;                      

---SUCURSAL
SET IDENTITY_INSERT QAWEB.[dbo].SUCURSAL ON
INSERT INTO QAWEB.DBO.SUCURSAL(SucursalID, NombreSucursal, Abreviatura, Activo, UserIDCreacion, FechaCreacion)
SELECT IdSucursal, Nombre, Abreviatura, Habilitado, 1, GETDATE() FROM QA.DBO.Sucursales
INSERT INTO QAWEB.DBO.SUCURSAL(SucursalID, NombreSucursal, Abreviatura, Activo, UserIDCreacion, FechaCreacion)
VALUES ((SELECT MAX(CONVERT(INT, IdSucursal))+1 FROM QA.dbo.Sucursales), 'SIN INFORMACION', 'SINF', 1, 1, GETDATE())
SET IDENTITY_INSERT QAWEB.[dbo].SUCURSAL OFF


---DEPARTAMENTO
--INHABILITAR LA LA COLUMNA IDENTITY
SET IDENTITY_INSERT QAWEB.[dbo].[Departamento] ON
--INGRESAR TODAS LOS DEPARTAMENTO MENOS EL QUE TENGA idDepto CERO.
INSERT INTO QAWEB.dbo.Departamento(DepartamentoID, [NombreDepartamento], Activo, UserIDCreacion, FechaCreacion)
SELECT idDepto, Nombre, 1, 1, GETDATE() FROM QA.dbo.Departamentos WHERE idDepto<>0

---DEPARTAMENTO 0
INSERT INTO QAWEB.dbo.Departamento(DepartamentoID, [NombreDepartamento], Activo, UserIDCreacion, FechaCreacion )
SELECT (SELECT MAX(CONVERT(INT, idDepto))+1 FROM QA.dbo.Departamentos), Nombre, 1, 1, GETDATE() FROM QA.dbo.Departamentos WHERE idDepto=0
SET IDENTITY_INSERT QAWEB.[dbo].[Departamento] OFF
-----fin departamento

---MUNICIPIO
SET IDENTITY_INSERT QAWEB.[dbo].[Municipio] ON
INSERT INTO QAWEB.DBO.Municipio(MunicipioID, DepartamentoID, NombreMunicipio, Activo, UserIDCreacion, FechaCreacion)
SELECT  idMuni, codDepto, Nombre, active,  1, GETDATE() FROM QA.DBO.Municipios WHERE idMuni<>0
--ENCONTRAR EL VALOR MAXIMO

--asignar solo cuando 
INSERT INTO QAWEB.DBO.Municipio(MunicipioID, DepartamentoID, NombreMunicipio, Activo, UserIDCreacion, FechaCreacion)
SELECT  (SELECT MAX(CONVERT(INT, idMuni))+1 FROM QA.dbo.Municipios), (SELECT MAX(CONVERT(INT, idDepto))+1 FROM QA.dbo.Departamentos), Nombre, active,  1, GETDATE() FROM QA.DBO.Municipios WHERE idMuni=0
SET IDENTITY_INSERT QAWEB.[dbo].[Municipio] OFF

SELECT * FROM Lideres

---LIDER
SET IDENTITY_INSERT QAWEB.[dbo].Lider ON
INSERT INTO QAWEB.DBO.Lider(LiderID, NombreLider, CodigoLider, Area, Empresa, UserID, Activo, Identificacion, UserIDCreacion, FechaCreacion)
SELECT idLider, Nombre, Codigo, AREA, EMPRESA, ISNULL(IDUSER, -1) AS IDUSER, (CASE WHEN ACTIVE =0 THEN 1 ELSE 0 END) AS ACTIVO, IDENTIFICACION, 1, GETDATE() FROM QA.dbo.Lideres 

--INSERTAR UN LIDER SIN INFORMACION
INSERT INTO QAWEB.DBO.Lider(LiderID, NombreLider, CodigoLider, Area, Empresa, UserID, Activo, Identificacion, UserIDCreacion, FechaCreacion)
VALUES ((SELECT MAX(CONVERT(INT,idLider))+1 FROM QA.dbo.Lideres), 'SIN LIDER', 'SNL', 'S/D', 'S/D', -1, 0, 'S/D', 1, GETDATE())
SET IDENTITY_INSERT QAWEB.[dbo].Lider OFF
--fin del lider

---MOTIVO
SET IDENTITY_INSERT QAWEB.[dbo].Motivo ON
INSERT INTO QAWEB.DBO.Motivo(MotivoID, NombreMotivo, Activo, Departamento, Tipo, UserIDCreacion, FechaCreacion)
SELECT idMotivo, Nombre, (case when Baja=1 THEN 0 ELSE 1 END) AS Activo, 1/*(case when Departamento IS NULL THEN 'S/D' ELSE Departamento END) AS Departamento*/, tipo, 1, GETDATE() 
FROM QA.DBO.MotivoVisita WHERE idMotivo <> 0

INSERT INTO QAWEB.DBO.Motivo(MotivoID, NombreMotivo, Activo, Departamento, Tipo, UserIDCreacion, FechaCreacion)
SELECT (SELECT MAX(CONVERT(INT, idMotivo))+1 FROM QA.DBO.MotivoVisita), Nombre, (case when Baja=1 THEN 0 ELSE 1 END) AS Activo, 1/*(case when Departamento IS NULL THEN 'S/D' ELSE Departamento END) AS Departamento*/, tipo, 1, GETDATE() 
FROM QA.DBO.MotivoVisita WHERE idMotivo = 0
SET IDENTITY_INSERT QAWEB.[dbo].Motivo OFF
--fin del motivo


---TIPO DE CLASE
SET IDENTITY_INSERT QAWEB.[dbo].TipoClase ON
INSERT INTO QAWEB.DBO.TipoClase(TipoClaseID, NombreTipoClase, Activo, UserIDCreacion, FechaCreacion)
SELECT idClase, Nombre, Habilitado, 1, GETDATE() FROM QA.DBO.ClasesOportunidad WHERE idClase<>0

INSERT INTO QAWEB.DBO.TipoClase(TipoClaseID, NombreTipoClase, Activo, UserIDCreacion, FechaCreacion)
SELECT (SELECT MAX(CONVERT(INT, idClase))+1 FROM QA.DBO.ClasesOportunidad ), Nombre, Habilitado, 1, GETDATE() FROM QA.DBO.ClasesOportunidad WHERE idClase=0
SET IDENTITY_INSERT QAWEB.[dbo].TipoClase OFF
--fin de la clase


--esta tabla no existe en la base de datos QA
---VISITA
SET IDENTITY_INSERT QAWEB.[dbo].Visita ON
INSERT INTO QAWEB.DBO.Visita(VisitaID, NombreVisita, Activo, UserIDCreacion, FechaCreacion)
VALUES (4, 'Personal', 1, 1,  GETDATE())
INSERT INTO QAWEB.DBO.Visita(VisitaID, NombreVisita, Activo, UserIDCreacion, FechaCreacion)
VALUES (1, 'Telefonica', 1, 1,  GETDATE())
INSERT INTO QAWEB.DBO.Visita(VisitaID, NombreVisita, Activo, UserIDCreacion, FechaCreacion)
VALUES (2, 'Correo', 1, 1,  GETDATE())
INSERT INTO QAWEB.DBO.Visita(VisitaID, NombreVisita, Activo, UserIDCreacion, FechaCreacion)
VALUES (3, 'VISITA QA', 1, 1,  GETDATE())
SET IDENTITY_INSERT QAWEB.[dbo].Visita OFF



---TIPO IDENTIFICACION
SET IDENTITY_INSERT QAWEB.[dbo].TipoIdentificacion ON
INSERT INTO QAWEB.DBO.TipoIdentificacion(TipoIdentificacionID, NombreIdentificacion, Activo, GenerarIDAutomatico, UserIDCreacion, FechaCreacion)
SELECT idTipo, Nombre, 1,0, 1, GETDATE() FROM QA.DBO.TipoCliente WHERE idTipo<>0

INSERT INTO QAWEB.DBO.TipoIdentificacion(TipoIdentificacionID, NombreIdentificacion, Activo, GenerarIDAutomatico, UserIDCreacion, FechaCreacion)
SELECT (SELECT MAX(CONVERT(INT, idTipo))+1 FROM QA.DBO.TipoCliente ), Nombre, 1,1, 1, GETDATE() FROM QA.DBO.TipoCliente WHERE idTipo=0
SET IDENTITY_INSERT QAWEB.[dbo].TipoIdentificacion OFF
---fin tipo identificacion

---vendedores
SET IDENTITY_INSERT QAWEB.[dbo].Vendedor ON
INSERT INTO QAWEB.dbo.Vendedor(
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
		
SELECT			idVendedor, 
				Nombre, 
				Codigo, 
				(CASE		
					WHEN Baja=0 THEN 1 
					WHEN BAJA=1 THEN 0 
				END) AS ACTIVO, 
				ISNULL(IDUSER, -1) AS UserID,  
				--en caso que sucursal este null entonces agregar una sucursal sin definicion
				(CASE WHEN Sucursal IS NULL THEN (SELECT MAX(CONVERT(INT, IdSucursal))+1 FROM QA.dbo.Sucursales)
					 ELSE Sucursal 
				END) AS Sucursal,
				 --tomar el id del lider que esta vinculado, en el caso que el lider tenga null entonces prodecer agregar un lider sin 
				ISNULL((SELECT idLider FROM QA.dbo.Lideres WHERE Lideres.Codigo=Vendedores.LIDER), (SELECT MAX(idLider)+1 FROM QA.dbo.Lideres)) AS LIDERID, 				
				(CASE WHEN IDENTIFICACION IS NULL THEN 'S/D'
						ELSE IDENTIFICACION 
				END) AS IDENTIFICACION,
				1,
				GETDATE() 
	FROM QA.DBO.Vendedores WHERE idVendedor NOT IN (131, 246)
SET IDENTITY_INSERT QAWEB.[dbo].Vendedor OFF



---TIPO DE SEXO
SET IDENTITY_INSERT QAWEB.[dbo].TipoSexo ON
INSERT INTO QAWEB.DBO.TipoSexo(TipoSexoID,NombreSexo, Activo, UserIDCreacion, FechaCreacion)
VALUES (1, 'Masculino', 1, 1, GETDATE())
INSERT INTO QAWEB.DBO.TipoSexo(TipoSexoID,NombreSexo, Activo, UserIDCreacion, FechaCreacion)
VALUES (2, 'OTROS', 1, 1, GETDATE())
INSERT INTO QAWEB.DBO.TipoSexo(TipoSexoID,NombreSexo, Activo, UserIDCreacion, FechaCreacion)
VALUES (3, 'Femenino', 1, 1, GETDATE())
SET IDENTITY_INSERT QAWEB.[dbo].TipoSexo OFF



---ESTADO CIVIL
SET IDENTITY_INSERT QAWEB.[dbo].[EstadoCivil] ON
INSERT INTO QAWEB.DBO.EstadoCivil(EstadoCivilID, NombreEstadoCivil, Activo, UserIDCreacion, FechaCreacion)
SELECT idCivil, Nombre, 1, 1, GETDATE() FROM QA.DBO.EstadoCivil WHERE idCivil<>0

INSERT INTO QAWEB.DBO.[EstadoCivil](EstadoCivilID, NombreEstadoCivil, Activo, UserIDCreacion, FechaCreacion)
SELECT (SELECT MAX(CONVERT(INT, idCivil))+1 FROM QA.DBO.[EstadoCivil]), Nombre, 1, 1, GETDATE() FROM QA.DBO.[EstadoCivil] WHERE idCivil=0
SET IDENTITY_INSERT QAWEB.[dbo].[EstadoCivil] OFF
--fin estado Civil



---PERSONERIA
SET IDENTITY_INSERT QAWEB.[dbo].PERSONERIA ON
INSERT INTO [dbo].[Personeria] (PersoneriaID, NombrePersoneria, Activo, UserIDCreacion, FechaCreacion)
VALUES (1, 'NATURAL', 1, 1, GETDATE())
INSERT INTO [dbo].[Personeria] (PersoneriaID, NombrePersoneria, Activo, UserIDCreacion, FechaCreacion)
VALUES (2, 'JURIDICA', 1, 1, GETDATE())
INSERT INTO [dbo].[Personeria] (PersoneriaID, NombrePersoneria, Activo, UserIDCreacion, FechaCreacion)
VALUES (3, 'S/D', 1, 1, GETDATE())
SET IDENTITY_INSERT QAWEB.[dbo].PERSONERIA OFF


---MODELO
SET IDENTITY_INSERT QAWEB.[dbo].Modelo	 ON
INSERT INTO QAWEB.DBO.Modelo(ModeloID, NombreModelo, Activo, Empresa, UserIDCreacion, FechaCreacion)
SELECT idModelo, Nombre, Activo, (CASE WHEN EMPRESA IS NULL THEN '' ELSE EMPRESA END) AS EMPRESA, 1, GETDATE() FROM QA.DBO.Modelos
SET IDENTITY_INSERT QAWEB.[dbo].MODELO OFF

---PMF
SET IDENTITY_INSERT QAWEB.[dbo].PmfVh ON
INSERT INTO QAWEB.DBO.PmfVh(PmfVhID, ModeloID, NombrePMF, Activo, UserIDCreacion, FechaCreacion)
SELECT CONVERT(int, idPmf) AS idPmf, codModelo, Nombre, 1, 1, GETDATE() FROM QA.DBO.Pmf ORDER by idPmf
SET IDENTITY_INSERT QAWEB.[dbo].PmfVh	 OFF


---Estatus de la oportunidad------ 
SET IDENTITY_INSERT QAWEB.[dbo].EstatusOportunidad ON
INSERT INTO QAWEB.DBO.EstatusOportunidad(EstatusOportunidadID, NombreEstatusOportunidad, Activo, UserIDCreacion, FechaCreacion)
--estatus de la oportunidad 
SELECT CONVERT(int, idPerdida) AS idPerdida, Nombre, Habilitado, 1, GETDATE() FROM QA.DBO.VentasPerdidas ORDER by CONVERT(int, idPerdida)

INSERT INTO QAWEB.DBO.EstatusOportunidad(EstatusOportunidadID, NombreEstatusOportunidad, Activo, UserIDCreacion, FechaCreacion)
SELECT (SELECT MAX(CONVERT(INT, idPerdida))+1 FROM QA.DBO.VentasPerdidas), 'S/D', 1, 1, GETDATE() 
 
SET IDENTITY_INSERT QAWEB.[dbo].EstatusOportunidad	OFF


---Estatus del DAC------ 
SET IDENTITY_INSERT QAWEB.[dbo].EstatusDAC ON
INSERT INTO EstatusDac(EstatusDacID, NombreEstatusDac, Activo, UserIDCreacion, FechaCreacion)
SELECT idStaDAC, Nombre, 1, 1, GETDATE() FROM QA..EstatusDAC WHERE idStaDAC<>0

INSERT INTO EstatusDac(EstatusDacID, NombreEstatusDac, Activo, UserIDCreacion, FechaCreacion)
SELECT  (SELECT MAX(CONVERT(INT, [EstatusDacID]))+1  FROM EstatusDac), Nombre,  1, 1, GETDATE() FROM QA..EstatusDAC WHERE idStaDAC=0
SET IDENTITY_INSERT QAWEB.[dbo].EstatusDAC	OFF
--SELECT * FROM [dbo].[EstatusDac]
---FIN Estatus del DAC------ 


---[EstatusFinanciero] ------ 
SET IDENTITY_INSERT QAWEB.[dbo].[EstatusFinanciero] ON
INSERT INTO [EstatusFinanciero](EstatusFinancieroID,  NombreEstatusFinanciero, Activo, UserIDCreacion, FechaCreacion)
SELECT idStaFinanza, Nombre, 1, 1, GETDATE()   FROM QA..EstatusFINANCIERO WHERE idStaFinanza<>0

INSERT INTO [EstatusFinanciero](EstatusFinancieroID,  NombreEstatusFinanciero, Activo, UserIDCreacion, FechaCreacion)
SELECT (SELECT MAX(CONVERT(INT, EstatusFinancieroID))+1  FROM EstatusFinanciero), Nombre, 1, 1, GETDATE()   FROM QA..EstatusFINANCIERO WHERE idStaFinanza=0
SET IDENTITY_INSERT QAWEB.[dbo].[EstatusFinanciero]	OFF
---FIN Estatus del DAC------ 



---[DAC] ------ 
SET IDENTITY_INSERT QAWEB.[dbo].PersonalDac ON
INSERT INTO PersonalDac(PersonalDacID, NombrePersonalDac, UserIDCreacion, FechaCreacion,  Activo)
SELECT idDAC, Nombre, 1, GETDATE(), (CASE 
											WHEN Baja=1 THEN 0 
											WHEN Baja=0 THEN 1
									END) AS Activo FROM QA..DAC  WHERE idDAC<>0

INSERT INTO PersonalDac(PersonalDacID, NombrePersonalDac, UserIDCreacion, FechaCreacion,  Activo)
SELECT (SELECT MAX(CONVERT(INT, PersonalDacID))+1  FROM dbo.PersonalDac) AS PersonalDacID, Nombre,  1 AS UserIDCreacion, GETDATE(), (CASE 
											WHEN Baja=1 THEN 0 
											WHEN Baja=0 THEN 1
									END) AS Activo FROM QA..DAC WHERE idDAC=0 
SET IDENTITY_INSERT QAWEB.[dbo].[EstatusFinanciero]	OFF



---MIGRACION DE CLIENTE---
INSERT INTO QAWEB.DBO.Cliente (
		ClienteID,  
		TipoIdentificacionID, 
		NombreCliente, 
		Direccion,  
		Contacto, 
		FechaCreacion,
		Telefonos, 
		Edad, 
		TipoSexoID, 
		EstadoCivilID, 
		Procesado, 
		UserIDCreacion, 
		Email, 
		Email2, 
		Email3, 
		TelefonoHab, 
		Celular,
		DepartamentoID,
		MunicipioID, 
		Ocupacion, 
		SucursalID, 
		Fax, 
		Revisado, 
		UserRevisado, 
		ComentarioRevisado, 
		HoraRegistrada, 
		ClienteIndesable, 
		UserIDModificacion, 
		FechaModificacion, 
		PersoneriaID, 
		PEP )

SELECT rtrim(ltrim(idCliente)) AS idCliente,	
		(CASE WHEN  codTipo='0' THEN (SELECT MAX(CONVERT(INT, idTipo))+1 FROM QA.DBO.TipoCliente )  
			  ELSE codTipo 
		END  ) AS TipoIdentificacion, 
		 Nombre, 
		 Direccion, 
		 Contacto, 
		--concantenar la fecha + hora
		 CONVERT(DATETIME, CONVERT(CHAR(8), FechaApertura, 112)  + ' ' + CONVERT(CHAR(8), Hora_Apertura, 108)) AS FechaCreacion,	
		Telefonos,
		( CASE WHEN Edad IS NULL THEN 0 ELSE Edad END) AS Edad, 
		(CASE
			WHEN Sexo='0' THEN 3
			WHEN sexo='1' THEN 1
			WHEN sexo='2' THEN 2   
		END) AS Sexo, 

		(CASE 
			WHEN EstaCivil = 0 THEN (SELECT MAX(CONVERT(INT, idCivil))+1 FROM QA.DBO.[EstadoCivil])
				ELSE EstaCivil 
		END) AS ESTADO_CIVIL,

		(CASE WHEN Procesado IS NULL THEN 0 
			ELSE Procesado
		END) AS PROCESADO,
		codUser,		
		Email, 
		Email2, 
		Email3, 
		TelefonoHab, 
		Celular, 
		(CASE WHEN codDepto=0 THEN (SELECT DepartamentoID FROM Municipio WHERE NombreMunicipio='Default') 
			  ELSE codDepto END ) codDep,	
			  	
		(CASE WHEN codMuni=0 THEN (SELECT MunicipioID FROM Municipio WHERE NombreMunicipio='Default') 
		ELSE codMuni END ) codMuni,
		Ocupacion, 
		CONVERT(INT, codSucursal) AS codSucursal, 
		Fax, 
		(CASE WHEN Revisado IS NULL THEN 0 
			  ELSE Revisado 
		END) AS Revisado, 

		UserRevisado AS UserRevisado, 
		ComentarioRevisado,  
		Hora_Apertura, 
		(CASE WHEN INDESEABLE IS NULL THEN 0 ELSE INDESEABLE END) AS ClienteIndesable, 
		MODIFICADO_POR,   
		MODIFICADO_EL,
		(CASE 
				WHEN Persona IS NULL THEN 3 /*'S/D'*/ 
				WHEN PERSONA ='Natural' THEN 1
				WHEN Persona='Juridica' THEN 2
		END) AS Personeria,
 
		(CASE WHEN PEP IS NULL THEN 'S/D' ELSE PEP END) AS PEP
		 FROM QA.DBO.ANuevosClientes --WHERE codTipo IS NULL 

		 
 
 ---SELECT CONVERT(DATE, FechaApertura) AS FechaCreacion, FechaApertura, convert(TIME, Hora_Apertura) AS Hora_Creacion, Hora_Apertura, CONVERT(varchar(50), CONVERT(DATE, FechaApertura) + ' '+ convert(TIME, Hora_Apertura) AS CONVINADA,* FROM QA.DBO.ANuevosClientes

-----MIGRACION PARA PROBAR..
--INSERT INTO QAWEB.DBO.Clientes (ClienteID,  TipoClienteID, NombreCliente, Direccion,  Contacto, FechaCreacion,
--Telefonos, Edad, TipoSexoID, EstadoCivilID, Procesado, UserIDCreacion, Email, Email2, Email3, 
--TelefonoHab, Celular, MunicipioID, Ocupacion, SucursalID, Fax, Revisado, UserIDRevisado, ComentarioRevisado, 
--HoraRegistrada, ClienteIndesable, UserIDModificacion, FechaModificacion, Persona, PEP )

--SELECT TOP 100 idCliente,  1 AS tipoCliente, Nombre, Direccion, Contacto, CONVERT(DATE, FechaApertura) AS FechaCreacion, 
--Telefonos,( CASE WHEN Edad IS NULL THEN 0 ELSE Edad END) AS edad, 1, 1 AS ESTADO_CIVIL, 1/*PROCESADO*/, 1, Email, Email2, Email3, 
--TelefonoHab, Celular, 2, Ocupacion, 1, Fax, 1/*Revisado*/, 1, /*UserRevisado,*/ 'NO PUDO MIGRAR EL COMENTARIO'/*ComentRevisado*/, 
--Hora_Apertura, (CASE WHEN INDESEABLE IS NULL THEN 0 ELSE INDESEABLE END), MODIFICADO_POR,   MODIFICADO_EL, (CASE WHEN Persona IS NULL THEN 'S/D' ELSE PERSONA END),(CASE WHEN PEP IS NULL THEN 'S/D' ELSE PEP END) FROM QA.DBO.ANuevosClientes 



---nota
--codPerdida: se refiere al estatus de la oportunidad
--SELECT * FROM [QA].[dbo].[VentasPerdidas]

---PerdidaID y EstatusOportunidadID es el mismo campo
  --SELECT PerdidaID, EstatusOportunidadID, * FROM QAWEB..Oportunidad
 


---tabla Oportunidad, NO ESTA BIEN MIGRADO LOS DATOS
INSERT INTO QAWEB.[dbo].[Oportunidad] (
									OportunidadID, 
									NoOportunidad,
									ClienteID, 									
									ComentarioVendedor, 
									Cantidad, 
									FinancieraID, 
									Prima, 
									VisitaID,  
									ProximaLlamadaVendedor, 
									MotivoID, 
									LiderID, 
									VendedorID, 
									PruebaManejo, 
									SucursalID, 
									Procesado, 
									PmfVhID, 
									codVendeOrigen, 
									NombreVendeOrigen, 
									TipoClaseID, 
									ProximaLlamadaLider, 									 
									EstatusDacID,
									codStaLIDER, 
									ProximaLlamadaDAC, 
									EstatusFinancieroID,
									ProximaLlamadaFinanciero, 
									Hora_Op, 
									ProximaLlamadaTELE, 
									EstatusTeleID,								 
									VentaPerdida,  
									Contacto, 
									Correo, 
									Celular, 
									Telefono, 
									Programado, 
									EstatusOportunidadID,   
									FechaCreacion, 
									FechaCierreOport, 
--PoseeVH, LeInteresaAvaluo, AplicaAvaluo,		RealizoAvaluo, ModeloVHquePosee, 
UserIDCreacion
)

(SELECT  rtrim(ltrim(codCliente)) + '-' + CONVERT(varchar(50), idOportunidad), 
			idOportunidad,
			rtrim(ltrim(codCliente)) AS codCliente, 			
			Descripcion, 
			Cantidad, 
			(CASE 
				WHEN codBanco = 0 THEN (SELECT MAX(CONVERT(INT, IDBANCO))+1 FROM QA.dbo.Bancos)
				ELSE codBanco END) AS codBanco, 
			Prima,  
			(CASE codVisita
					WHEN -1 THEN 3
					--0=personal
					WHEN 0 THEN 4
					--1=Telefonica			
					ELSE codVisita
			END) AS codVisita,
			ProxiLlama, 
			(CASE 
					WHEN codMotivo=0 THEN (SELECT MAX(CONVERT(INT, idMotivo))+1 FROM QA.DBO.MotivoVisita)
					ELSE codMotivo 
			END) AS codMotivo,  
			
			codLider, 
			codVendedor, 
			PruebaManejo, 
			codSucursal, 
			Procesado, 
			codPmf,  
			codVendeOrigen,
			NombreVendeOrigen, 
			(CASE 
					WHEN codClase=0 THEN (SELECT MAX(CONVERT(INT, idClase))+1 FROM QA.DBO.ClasesOportunidad )
					ELSE codClase 
			END) AS TipoClaseID,  

			ProxiLlamaLider, 
			(CASE  WHEN codStaDAC=0 THEN (SELECT MAX(EstatusDacID)  FROM EstatusDac)
			 ELSE codStaDAC END) AS codStaDAC, ---AQUI
			codStaLIDER, 
			ProxiLlamaDAC, 				
			CASE WHEN codStaFinanza=0 THEN (SELECT MAX(EstatusFinancieroID)  FROM EstatusFinanciero)
			ELSE  codStaFinanza END AS EstatusFinanciero,
			ProxiLlamaFinanza, 
			Hora_Op,
			ProxiLlamaTELE, 
			codStaTELE, 
			ISNULL(VentaPerdida, 0) AS VentaPerdida,  
			CONTACTOOPORTUNIDAD, 
			DIRECCIONOPORTUNIDAD, 
			CELULAROPORTUNIDAD, 
			TELEFONOOPORTUNIDAD, 
			Programado, 
			codPerdida AS EstatusOportunidadID, --(CASE WHEN IdStatusOportunidad IS NULL THEN 1 ELSE IdStatusOportunidad END) AS IdStatusOportunidad,  
			cFechaApertura, 
			cFechaCierre,
			1
--LeInteresaAvaluo,  AñoModeloSuperior2010, RealizoAvaluo, ModeloVHquePosee, AplicaAvaluo, 

  FROM QA.dbo.ANuevosOportunidades)
  

  
SELECT * 
INTO #temp_Oportunidad
FROM QAWEB.dbo.Oportunidad WHERE [PoseeVH] IS  null

DECLARE @Bandera1 bit=1,  @ClienteID varchar(100), @OportunidadID int;

SELECT * FROM #temp_Oportunidad

WHILE (@bandera1=1)
BEGIN
	SELECT TOP(1) @ClienteID=ClienteID, @OportunidadID=OportunidadID FROM #temp_Oportunidad	

				DECLARE	@return_value int

				EXEC	@return_value =  [QAWEB].[dbo].[SepeararValorBooleano]
						@codCliente =@ClienteID,
						@idOportunidad = @OportunidadID;

				SELECT	'Return Value' = @return_value

				


	DELETE TOP(1) FROM #temp_Oportunidad;

IF NOT EXISTS(SELECT * FROM #temp_Oportunidad) 
		SET @bandera1=0;
END

DROP TABLE #temp_Oportunidad
 

---[LlamadasVendedor] ------ 
SET IDENTITY_INSERT QAWEB.[dbo].[LlamadasVendedor] ON
INSERT [QAWEB].dbo.[LlamadasVendedor] (LlamadaVendedorID,
								 OportunidadID, 
								 ComentarioVendedor, 
								 Revisado, 
								 IDLlamada, 
								 ProximaLlamadaVendedor,								 
								 EstatusOportunidadID, 
								 NombreStatusOportunidad, ComentarioLider, Visita, Llamada, Avaluo, Importancia, Correo,
								 UserIDCreacion, FechaCreacion)
SELECT   ANuevosLlamadas.ROW_ID,   rtrim(ltrim(ANuevosLlamadas.codClientes)) + '-' + CONVERT(VARCHAR(20), ANuevosLlamadas.codOportunidad) AS OportunidadID, 
			ANuevosLlamadas.Referencias AS COMENTARIO, 
			ANuevosLlamadas.Revisado, 
            ANuevosLlamadas.IDLlamada, 
			ISNULL(CONVERT(DATE, ANuevosLlamadas.cProxiLlama), '1900-01-01') AS cProxiLlama, 
						 
		CASE WHEN ANuevosLlamadas.codEstaVende IS NULL THEN  
		(SELECT MAX(CONVERT(INT, idPerdida))+1 FROM [192.168.0.7].QA.dbo.VentasPerdidas) 
		ELSE
		ANuevosLlamadas.codEstaVende
		END AS EstatusOportunidadID,
						
		CASE WHEN ANuevosLlamadas.Nombre IS NULL THEN  
		'S/D' 
		ELSE
		ANuevosLlamadas.Nombre
		END AS NombreStatusOportunidad,						 						
		ANuevosLlamadas.ComentRevisado, ISNULL(ANuevosLlamadas.Visita, 0) AS Visita, ISNULL(ANuevosLlamadas.Llamada, 0) AS LLAMADA, ISNULL(ANuevosLlamadas.Avaluo, 0) AS AVALUO, 
		ISNULL(ANuevosLlamadas.Importancia, 0) AS Importancia, ISNULL(ANuevosLlamadas.Correo, 0) AS correo, 1 AS UserIDCreacion, 
		CONVERT(DATETIME, CONVERT(CHAR(8), ANuevosLlamadas.cFecha, 112) + ' ' + CONVERT(CHAR(8), ANuevosLlamadas.Hora, 108)) AS FechaCreacion					 
FROM            Oportunidad INNER JOIN
                        QA.dbo.ANuevosLlamadas ON Oportunidad.OportunidadID = Ltrim(Rtrim(ANuevosLlamadas.codClientes)) +'-' + convert(varchar(50), ANuevosLlamadas.codOportunidad)
--WHERE        (ANuevosLlamadas.codClientes <> '') 
ORDER BY ANuevosLlamadas.ROW_ID
SET IDENTITY_INSERT QAWEB.[dbo].[LlamadasVendedor]	OFF
--fin del vendedor

			
---[LlamadasLider] ------ 
SET IDENTITY_INSERT QAWEB.[dbo].[LlamadasLider] ON
INSERT INTO [QAWEB].dbo.[LlamadasLider](LlamadaLiderID, OportunidadID, ComentarioLider, Revisado, IdLlamada, ProximaLlamadaLider, UserIDCreacion, FechaCreacion)
SELECT   ANuevosLlamadasLider.ROW_ID, rtrim(ltrim(ANuevosLlamadasLider.codClientes)) + '-' + CONVERT(VARCHAR(20), ANuevosLlamadasLider.codOportunidad) AS OportunidadID, 
			ANuevosLlamadasLider.Referencias AS COMENTARIO, 
			ANuevosLlamadasLider.Revisado, 
            ANuevosLlamadasLider.IDLlamada, 
			ISNULL(CONVERT(DATE, ANuevosLlamadasLider.cProxiLlama), '1900-01-01') AS cProxiLlama, 				
			1 AS UserIDCreacion,
			CONVERT(DATETIME, CONVERT(CHAR(8), ANuevosLlamadasLider.cFecha, 112) + ' ' + CONVERT(CHAR(8), ANuevosLlamadasLider.Hora, 108)) AS FechaCreacion				 	
FROM            Oportunidad INNER JOIN
                QA.dbo.ANuevosLlamadasLider ON Oportunidad.OportunidadID = Ltrim(Rtrim(ANuevosLlamadasLider.codClientes)) +'-' + convert(varchar(50), ANuevosLlamadasLider.codOportunidad)
--WHERE        (ANuevosLlamadasLider.codClientes <> '') 
ORDER BY ANuevosLlamadasLider.ROW_ID
SET IDENTITY_INSERT QAWEB.[dbo].[LlamadasLider] OFF



---migracion para obtener el Id de: LlamadaVendedorID y guardarlo en la tabla Oportunidad
-- del campo UltimaLlamadaVendedorID
WITH C AS
(
SELECT OportunidadID, MAX(LlamadaVendedorID) AS LlamadaVendedorID 
FROM [dbo].[LlamadasVendedor]
GROUP BY OportunidadID)

UPDATE Oportunidad SET UltimaLlamadaVendedorID=C.LlamadaVendedorID 
FROM Oportunidad INNER JOIN C ON Oportunidad.OportunidadID=C.OportunidadID

					









