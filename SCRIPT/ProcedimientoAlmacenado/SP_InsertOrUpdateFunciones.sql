USE [QAWEB]
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertOrUpdateFuncionesRoles]    Script Date: 9/7/2022 13:46:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InsertOrUpdateFunciones]
	@FuncionID INT=0, @NombreFuncion varchar(100), @Codigo VARCHAR(50), @Descripcion VARCHAR(100), 
	@Activo BIT, @ARRAY VARCHAR(MAX)
AS
BEGIN TRY  	
	BEGIN TRANSACTION
	
	IF (@FuncionID=0)
	BEGIN
		INSERT INTO Funciones (NombreFuncion, Codigo, Descripcion, Activo, FechaCreacion)
		VALUES (@NombreFuncion, @Codigo, @Descripcion, @Activo, GETDATE())
		SET @FuncionID=SCOPE_IDENTITY();
	END
	ELSE BEGIN
		UPDATE [dbo].[Funciones] SET NombreFuncion=@NombreFuncion, 
									Codigo=@Codigo, 
									Descripcion=@Descripcion, 
									Activo=@Activo, 
									FechaModificacion=GETDATE()
		WHERE FuncionID=@FuncionID
	END

	--ELIMINAR REGISTRO DE LA TABLA [FuncionesRoles]
	DELETE FROM [dbo].[FuncionesRoles] WHERE FuncionID=@FuncionID

	--Comprobar si tiene registro el arreglo
	IF (LEN(@ARRAY)>0)
	BEGIN
		CREATE TABLE #DatosFunciones (RolID varchar(MAX))
		INSERT INTO #DatosFunciones
		EXECUTE  [dbo].[SP_ListarArray] @ARRAY, 0


		---GUARDAR EL REGISTRO
		INSERT INTO [dbo].[FuncionesRoles] (FuncionID, RolID, FechaCreacion)
		SELECT  @FuncionID, RolID, GETDATE() FROM #DatosFunciones

		DROP TABLE #DatosFunciones
	END

	COMMIT TRANSACTION; 

END TRY  
BEGIN CATCH  
	ROLLBACK	
	RETURN	ERROR_MESSAGE();    
END CATCH
