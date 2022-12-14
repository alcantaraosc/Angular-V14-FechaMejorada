USE [QAWEB]
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertOrUpdateFuncionesRoles]    Script Date: 11/7/2022 08:23:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[SP_InsertOrUpdateRoles]
	@RolID INT=0, @NombreRol varchar(100), @Descripcion VARCHAR(100), 
	@Activo BIT, @ARRAY VARCHAR(MAX)
AS
BEGIN TRY  	
	BEGIN TRANSACTION
	
	IF (@RolID=0)
	BEGIN
		INSERT INTO Roles (NombreRol, Descripcion, Activo, FechaCreacion)
		VALUES (@NombreRol, @Descripcion, @Activo, GETDATE())
		SET @RolID=SCOPE_IDENTITY();
	END
	ELSE BEGIN
		UPDATE [dbo].[Roles] SET NombreRol=@NombreRol, 									
									Descripcion=@Descripcion, 
									Activo=@Activo, 
									FechaModificacion=GETDATE()
		WHERE RolID=@RolID
	END

	--ELIMINAR REGISTRO DE LA TABLA [FuncionesRoles]
	DELETE FROM [dbo].[FuncionesRoles] WHERE RolID=@RolID

	--Comprobar si tiene registro el arreglo
	IF (LEN(@ARRAY)>0)
	BEGIN
		--crear una table
		CREATE TABLE #DatosRoles (FuncionID varchar(MAX))
		INSERT INTO #DatosRoles
		EXECUTE  [dbo].[SP_ListarArray] @ARRAY, 0
		
		---GUARDAR EL REGISTRO
		INSERT INTO [dbo].[FuncionesRoles] (FuncionID, RolID, FechaCreacion)
		(SELECT  FuncionID, @RolID, GETDATE() FROM #DatosRoles)

		DROP TABLE #DatosRoles;
	END

	COMMIT TRANSACTION; 

END TRY  
BEGIN CATCH  
	ROLLBACK	
	RETURN	ERROR_MESSAGE();    
END CATCH
