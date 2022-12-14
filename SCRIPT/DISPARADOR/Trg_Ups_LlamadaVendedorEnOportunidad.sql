USE [QAWEB]
GO
/****** Object:  Trigger [dbo].[Trg_Ups_LlamadaVendedorEnOportunidad]    Script Date: 27/7/2022 08:02:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,Oscar Alcantara >
-- Create date: <Create Date: 2020-12-04>
-- Description:	<Actualizar la fecha de la proxima llamada del vendedor en la Oportunidad>
-- =============================================
ALTER TRIGGER [dbo].[Trg_Ups_LlamadaVendedorEnOportunidad]
   ON  [dbo].[Oportunidad]
   FOR UPDATE
AS 
BEGIN
	 DECLARE @OportunidadID varchar(50),  @ProximaLlamadaVendedor date, @ProximaLlamadaVendedorLider date,
	 @LlamadaVendedorID int, @LlamadaLiderID int,  @ProximaLlamada date;
	   

	   (SELECT  @OportunidadID=OportunidadID FROM INSERTED);
       (SELECT @ProximaLlamadaVendedor=ProximaLlamadaVendedor FROM INSERTED);
	   ---(SELECT @ProximaLlamadaVendedor=@ProximaLlamadaVendedor FROM DELETED);
	   	   	   
	   --OBTENER EL MAXIMO DEL ID DE LA LLAMADA DEL VENDEDOR
	   SELECT @LlamadaVendedorID=MAX(LlamadaVendedorID) FROM [dbo].[LlamadasVendedor] WHERE (OportunidadID=@OportunidadID) 
	   IF (@LlamadaVendedorID IS NOT NULL)
	   BEGIN
			SELECT @ProximaLlamada=ProximaLlamadaVendedor FROM LlamadasVendedor WHERE (LlamadaVendedorID=@LlamadaVendedorID)
			IF (@ProximaLlamada <> @ProximaLlamadaVendedor)
				UPDATE Oportunidad SET ProximaLlamadaVendedor=@ProximaLlamada, UltimaLlamadaVendedorID=@LlamadaVendedorID FROM Oportunidad WHERE (OportunidadID=@OportunidadID)
	   END

	   SELECT @LlamadaLiderID=MAX(LlamadaLiderID) FROM [dbo].[LlamadasLider] WHERE (OportunidadID=@OportunidadID) 
	   IF (@LlamadaLiderID IS NOT NULL)
	   BEGIN
			SET @ProximaLlamada=NULL;
			SELECT @ProximaLlamada=ProximaLlamadaLider FROM LlamadasLider WHERE (LlamadaLiderID=@LlamadaLiderID)
			IF (@ProximaLlamada <> @ProximaLlamada)
				UPDATE Oportunidad SET ProximaLlamadaLider=@ProximaLlamada, UltimaLlamadaVendedorID=@LlamadaVendedorID FROM Oportunidad WHERE (OportunidadID=@OportunidadID)
	   END

END
