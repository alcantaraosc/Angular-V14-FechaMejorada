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
CREATE PROCEDURE [dbo].[SP_InsertOrUpdateUsuario]
	@NuevoUsuario AS BIT, @UsuarioID AS INT, @LoginUsuario AS VARCHAR(30), @NombreUsuario AS VARCHAR(100), @ApellidoUsuario AS VARCHAR(100), @Correo AS VARCHAR(60), 
	@EsAdmin AS BIT, @CambiarClave AS BIT, @Salt AS VARCHAR(16), @Clave AS VARCHAR(44), @Activo AS BIT,  @ARRAY AS VARCHAR(MAX)
AS
BEGIN TRY  	
	BEGIN TRANSACTION
	
	IF (@NuevoUsuario=1)
	BEGIN
		INSERT INTO [dbo].[Usuario] (LoginUsuario, NombreUsuario, ApellidoUsuario, Correo, EsAdmin, CambiarClave, Salt, Clave, Activo, FechaCreacion)
		VALUES (@LoginUsuario, @NombreUsuario, @ApellidoUsuario, @Correo, @EsAdmin, @CambiarClave, @Salt, @Clave, @Activo, GETDATE())

		SET @UsuarioID=SCOPE_IDENTITY();
	END
	ELSE BEGIN
		UPDATE [dbo].[Usuario] SET LoginUsuario=@LoginUsuario, NombreUsuario=@NombreUsuario, ApellidoUsuario=@ApellidoUsuario, 
								Correo=@Correo, EsAdmin=EsAdmin, CambiarClave=@CambiarClave, Salt=@Salt, Clave=@Clave, Activo=@Activo, 
								FechaModificacion=GETDATE()
		WHERE UsuarioID=@UsuarioID
	END

	--ELIMINAR REGISTRO DE LA TABLA [FuncionesRoles]
	DELETE FROM [dbo].[RolesUsuarios] WHERE UsuarioID=@UsuarioID

	--Comprobar si tiene registro el arreglo
	IF (LEN(@ARRAY)>0)
	BEGIN
		CREATE TABLE #DatosRoles (RolID varchar(MAX))
		INSERT INTO #DatosRoles
		EXECUTE  [dbo].[SP_ListarArray] @ARRAY, 0


		---GUARDAR EL REGISTRO
		INSERT INTO [dbo].[RolesUsuarios] (RolID, UsuarioID, FechaCreacion)
		(SELECT  RolID, @UsuarioID, GETDATE() FROM #DatosRoles)

		DROP TABLE #DatosRoles
	END

	COMMIT TRANSACTION; 

END TRY  
BEGIN CATCH  
	ROLLBACK	
	RETURN	ERROR_MESSAGE();    
END CATCH
