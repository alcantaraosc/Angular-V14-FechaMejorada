USE [QAWEB]
-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE SepeararValorBooleano
	-- Add the parameters for the stored procedure here
	@codCliente AS VARCHAR(50), @idOportunidad INT
AS
BEGIN

	DECLARE @VehiculosTiene VARCHAR(MAX), @BANDERA INT=1, @ROWS INT=1,
			@VALOR VARCHAR(500)=''; --@LeInteresaAvaluo BIT=0, @RealizoAvaluo BIT, @AplicaAvaluo BIT, @AñoModelo VARCHAR(500), ModeloVHquePosee
	
	SELECT @VehiculosTiene=VehiculosTiene FROM qa.dbo.ANuevosOportunidades WHERE codCliente=@codCliente AND idOportunidad=@idOportunidad

	--SELECT @VehiculosTiene;

	--SELECT * FROM ANuevosOportunidades WHERE codCliente='J0810000091440';
	SET @ROWS=1;
	WHILE (@BANDERA=1) AND (@ROWS <= LEN(@VehiculosTiene))
	BEGIN		
		IF (SUBSTRING(@VehiculosTiene, @ROWS, 1) = ';')
		BEGIN
			IF (@VALOR IN ('True', 'False')) SET @BANDERA=0;
			ELSE SET @BANDERA = -1;
		END
		ELSE
			SET @VALOR = @VALOR + SUBSTRING(@VehiculosTiene,  @ROWS, 1);

		

		SET @ROWS = @ROWS + 1;
	END


	IF (@BANDERA=0)
	BEGIN
		---USE [master]

		DECLARE @PoseeVH BIT, @LeInteresaAvaluo BIT, @AñoModelo BIT, @AñoModeloString VARCHAR(50), @RealizoAvaluo BIT,  @AplicaAvaluo BIT, @ModeloVHquePosee varchar(100);

		SELECT value
		--INTO #RegistroVehiculoTiene FROM  STRING_SPLIT((SELECT VehiculosTiene FROM QA.DBO.ANuevosOportunidades WHERE  codCliente=@codCliente AND idOportunidad=@idOportunidad),';')
		INTO #RegistroVehiculoTiene FROM  STRING_SPLIT((SELECT VehiculosTiene FROM QA.DBO.ANuevosOportunidades WHERE  codCliente=@codCliente AND idOportunidad=@idOportunidad),';')
		--OBTENER PoseeVh 
		SELECT TOP (1) @PoseeVH = CONVERT(bit,value)  FROM #RegistroVehiculoTiene
		--SELECT @PoseeVH;
		--SELECT * FROM #RegistroVehiculoTiene		
		--BORRAR EL REGISTRO
		DELETE TOP (1)  FROM #RegistroVehiculoTiene
					

		--OBTENER @LeInteresaAvaluo 
		SELECT TOP (1) @LeInteresaAvaluo = CONVERT(bit,value)  FROM #RegistroVehiculoTiene
		--SELECT @LeInteresaAvaluo;
		--SELECT * FROM #RegistroVehiculoTiene				
		--BORRAR EL REGISTRO
		DELETE TOP (1)  FROM #RegistroVehiculoTiene

		
		--OBTENER @AñoModelo 
		SELECT TOP (1) @AñoModelo = CONVERT(bit,value)  FROM #RegistroVehiculoTiene
		--SELECT @AñoModelo;
		--SELECT * FROM #RegistroVehiculoTiene			
		--BORRAR EL REGISTRO
		DELETE TOP (1)  FROM #RegistroVehiculoTiene

		IF (@AñoModelo=1)
			SET @AñoModeloString='2010 O MAYOR';
		ELSE IF (@AñoModelo=0)
			SET @AñoModeloString='2009 O MENOR';
		

		--OBTENER @RealizoAvaluo 
		SELECT TOP (1) @RealizoAvaluo = CONVERT(bit, value)  FROM #RegistroVehiculoTiene
		--SELECT @RealizoAvaluo;
		--SELECT * FROM #RegistroVehiculoTiene				
		--BORRAR EL REGISTRO
		DELETE TOP (1)  FROM #RegistroVehiculoTiene


		--OBTENER @ModeloVHquePosee 
		SELECT TOP (1) @ModeloVHquePosee =value  FROM #RegistroVehiculoTiene
		--SELECT @ModeloVHquePosee;
		--SELECT * FROM #RegistroVehiculoTiene				
		--BORRAR EL REGISTRO
		DELETE TOP (1)  FROM #RegistroVehiculoTiene


		--OBTENER @AplicaAvaluo 
		SELECT TOP (1) @AplicaAvaluo = CONVERT(bit, value)  FROM #RegistroVehiculoTiene
		--SELECT @AplicaAvaluo;
		--SELECT * FROM #RegistroVehiculoTiene				
		--BORRAR EL REGISTRO
		DELETE TOP (1)  FROM #RegistroVehiculoTiene

			
		--ACTUALIZAR EL REGISTRO=
		UPDATE QAWEB.dbo.Oportunidad SET PoseeVh =@PoseeVH, 
							   LeInteresaAvaluo=@LeInteresaAvaluo, 
							   AñoModelo=@AñoModeloString, 
							   RealizoAvaluo= @RealizoAvaluo, 
							   [ModeloVHquePosee]=@ModeloVHquePosee,
							   AplicaAvaluo=@AplicaAvaluo
		FROM QA.DBO.ANuevosOportunidades WHERE  ClienteID=@codCliente AND OportunidadID=@idOportunidad

		--SELECT * FROM QAWEB.dbo.Oportunidad  WHERE ClienteID=@codCliente AND OportunidadID=@idOportunidad

		--SELECT * FROM QA.dbo.ANuevosOportunidades  WHERE codCliente=@codCliente AND idOportunidad=@idOportunidad

		DROP TABLE #RegistroVehiculoTiene
	END
END




