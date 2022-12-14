USE [QAWEB]
GO
/****** Object:  StoredProcedure [dbo].[SP_ListarArray]    Script Date: 2/7/2022 14:53:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[SP_ListarArray] @Parametros varchar(MAX), @MostrarIndice BIT=1
--@Parametros es la cadena de entrada
AS
--Creamos una tabla temporal por simplificar el trabajo
--y almacenar los parametros que vayamos obteniendo
CREATE TABLE #parametros (NoReferencia int, parametro varchar(MAX))
SET NOCOUNT ON
--El separador de nuestros parametros sera una ,
DECLARE @Posicion int;
DECLARE @Index int=1;
--@Posicion es la posicion de cada uno de nuestros separadores
DECLARE @Parametro varchar(MAX)
--@Parametro es cada uno de los valores obtenidos
--que almacenaremos en #parametros
SET @Parametros = @Parametros + '*'

--Colocamos un separador al final de los parametros
--para que funcione bien nuestro codigo
--Hacemos un bucle que se repite mientras haya separadores
WHILE patindex('%*%' , @Parametros) <> 0
--patindex busca un patron en una cadena y nos devuelve su posicion
BEGIN
  SELECT @Posicion =  patindex('%*%' , @Parametros)
  --Buscamos la posicion de la primera ,
  SELECT @Parametro = left(@Parametros, @Posicion - 1)
  --Y cogemos los caracteres hasta esa posicion
  INSERT INTO #parametros values (@index, @Parametro)
  --y ese parámetro lo guardamos en la tabla temporal
  --Reemplazamos lo procesado con nada con la funcion stuff
  SELECT @Parametros = stuff(@Parametros, 1, @Posicion, '')
  SET @Index = @Index +1;
END

IF (@MostrarIndice=1)
	SELECT NoReferencia, parametro FROM #parametros
ELSE
	--Y cuando se han recorrido todos los parametros sacamos por pantalla el resultado
	SELECT parametro FROM #parametros
SET NOCOUNT OFF
