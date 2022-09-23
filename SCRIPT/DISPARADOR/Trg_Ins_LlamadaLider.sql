USE [QAWEB]
GO
/****** Object:  Trigger [dbo].[Trg_Ins_LlamadaLider]    Script Date: 14/4/2021 16:37:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,Oscar Alcantara >
-- Create date: <Create Date: 2020-12-03>
-- Description:	<insert o Actualizar la fecha de la proxima llamada del Lider en la Oportunidad>
-- =============================================
CREATE TRIGGER [dbo].[Trg_Ins_LlamadaLider]
   ON  [dbo].[LlamadasLider]
   AFTER INSERT, UPDATE
AS 
BEGIN
	 DECLARE @OportunidadID varchar(50),  @ProximaLlamadaLider date;
	   

	   (SELECT  @OportunidadID=OportunidadID FROM INSERTED);
       (SELECT @ProximaLlamadaLider=ProximaLlamadaLider	FROM INSERTED);
     

       UPDATE Oportunidad SET ProximaLlamadaLider=@ProximaLlamadaLider   WHERE [OportunidadID]=@OportunidadID 


END
