USE [QAWEB]
GO
/****** Object:  Trigger [dbo].[Trg_Ins_LlamadaVendedor]    Script Date: 14/4/2021 16:39:31 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,Oscar Alcantara >
-- Create date: <Create Date: 2020-12-02>
-- Description:	<Actualizar la fecha de la proxima llamada del vendedor en la Oportunidad>
-- =============================================
CREATE TRIGGER [dbo].[Trg_Ins_LlamadaVendedor]
   ON  [dbo].[LlamadasVendedor]
   AFTER INSERT, UPDATE
AS 
BEGIN
	 DECLARE @OportunidadID varchar(50),  @ProximaLlamadaVendedor date;
	   

	   (SELECT  @OportunidadID=OportunidadID FROM INSERTED);
       (SELECT @ProximaLlamadaVendedor=ProximaLlamadaVendedor FROM INSERTED);
     

       UPDATE Oportunidad SET ProximaLlamadaVendedor=@ProximaLlamadaVendedor   WHERE [OportunidadID]=@OportunidadID 


END
