USE [master]
GO
/****** Object:  Database [QA]    Script Date: 28/12/2019 14:15:52 ******/
CREATE DATABASE [QA]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'QA', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\QA.mdf' , SIZE = 6610560KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'QA_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\QA_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [QA] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [QA].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [QA] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [QA] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [QA] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [QA] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [QA] SET ARITHABORT OFF 
GO
ALTER DATABASE [QA] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [QA] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [QA] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [QA] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [QA] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [QA] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [QA] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [QA] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [QA] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [QA] SET  DISABLE_BROKER 
GO
ALTER DATABASE [QA] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [QA] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [QA] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [QA] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [QA] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [QA] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [QA] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [QA] SET RECOVERY FULL 
GO
ALTER DATABASE [QA] SET  MULTI_USER 
GO
ALTER DATABASE [QA] SET PAGE_VERIFY TORN_PAGE_DETECTION  
GO
ALTER DATABASE [QA] SET DB_CHAINING OFF 
GO
ALTER DATABASE [QA] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [QA] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [QA] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'QA', N'ON'
GO
ALTER DATABASE [QA] SET QUERY_STORE = OFF
GO
USE [QA]
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [QA]
GO
/****** Object:  User [SQL]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [SQL] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [rruiz]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [rruiz] FOR LOGIN [rruiz] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [rrodriguez]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [rrodriguez] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Luisl]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [Luisl] FOR LOGIN [Luisl] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [LRodriguez]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [LRodriguez] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [EautosN]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [EautosN] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [ditsa]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [ditsa] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [ditma]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [ditma] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [AUTONICA\dit]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [AUTONICA\dit] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [appuser]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [appuser] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Alvaro]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [Alvaro] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alcantara]    Script Date: 28/12/2019 14:15:52 ******/
CREATE USER [alcantara] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [SQL]
GO
ALTER ROLE [db_accessadmin] ADD MEMBER [SQL]
GO
ALTER ROLE [db_securityadmin] ADD MEMBER [SQL]
GO
ALTER ROLE [db_owner] ADD MEMBER [ditsa]
GO
ALTER ROLE [db_owner] ADD MEMBER [ditma]
GO
ALTER ROLE [db_datareader] ADD MEMBER [alcantara]
GO
/****** Object:  Default [GPS_CHAR]    Script Date: 28/12/2019 14:15:52 ******/
CREATE DEFAULT [dbo].[GPS_CHAR] 
AS
''    

GO
/****** Object:  Default [GPS_DATE]    Script Date: 28/12/2019 14:15:52 ******/
CREATE DEFAULT [dbo].[GPS_DATE] 
AS
'1/1/1900'    

GO
/****** Object:  Default [GPS_INT]    Script Date: 28/12/2019 14:15:52 ******/
CREATE DEFAULT [dbo].[GPS_INT] 
AS
0    

GO
/****** Object:  Default [GPS_MONEY]    Script Date: 28/12/2019 14:15:52 ******/
CREATE DEFAULT [dbo].[GPS_MONEY] 
AS
0.00    

GO
/****** Object:  UserDefinedFunction [dbo].[cUnionLlamadas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Soza>
-- Create date: <04/Abril/2011>
-- Description:	<Realiza la Union de las Llamadas>
-- =============================================
CREATE FUNCTION [dbo].[cUnionLlamadas] 
(
	-- Add the parameters for the function here
	@_codCliente nVarchar(30),
	@_codOportunidad int
)
RETURNS @TEMPO TABLE
(
    -- Columns returned by the function
    IDLlamada int NOT NULL, 
    codClientes nvarchar(30) NULL, 
    codOportunidad int, 
    Fecha DateTime,
    ComentarioVende nVarChar(MAX) NULL,
    ComentarioDAC nVarChar(MAX) NULL,
    ComentarioLider nVarChar(MAX) NULL,
    Hora DateTime,
    IDMASTER nVarChar(MAX) NULL,
    HoraDAC DateTime,
    HoraLider DateTime
)

AS
BEGIN
DECLARE @IDLlamada int, @codClientes nVarchar(30), @codOportunidad int, @Fecha DateTime, 
@ComentarioVende nVarChar(MAX),@ComentarioDAC nVarChar(MAX), @ComentarioLider nVarChar(MAX), 
@Hora DateTime,  @IDMaster nVarChar(50), @HoraDAC DateTime, @HoraLider DateTime

declare rs_var cursor for 
SELECT IDLlamada, codClientes, codOportunidad, cFecha, 
CASE IDLlamada WHEN 1 THEN Referencias ElSE '' END as ComentarioVende,
CASE IDLlamada WHEN 2 THEN Referencias ElSE '' END as ComentarioDAC,
CASE IDLlamada WHEN 3 THEN Referencias ElSE '' END as ComentarioLider,
CASE IDLlamada WHEN 1 THEN Hora ElSE '1900.01.01' END as HoraVende,
'' as IDMASTER,
CASE IDLlamada WHEN 2 THEN Hora ElSE '1900.01.01' END as HoraDAC,
CASE IDLlamada WHEN 3 THEN Hora ElSE '1900.01.01' END as HoraLider
FROM viewUNION_Llamadas WHERE codClientes = @_codCliente AND codOportunidad = @_codOportunidad
ORDER BY codClientes, codOportunidad, cFecha  
 
open rs_var 
fetch next from rs_var into  @IDLlamada, @codClientes, @codOportunidad, @Fecha, @ComentarioVende, @ComentarioDAC, @ComentarioLider, @Hora, @IDMASTER, @HoraDAC, @HoraLider

while @@fetch_status=0 
begin 
    insert into @Tempo values ( @IDLlamada, @codClientes, @codOportunidad, @Fecha, @ComentarioVende, @ComentarioDAC, @ComentarioLider, @Hora, @IDMASTER,  @HoraDAC, @HoraLider) 

fetch next from rs_var into @IDLlamada, @codClientes, @codOportunidad, @Fecha, @ComentarioVende, @ComentarioDAC, @ComentarioLider, @Hora, @IDMASTER, @HoraDAC, @HoraLider
end 
close rs_var 
deallocate rs_var 
RETURN -- REGRESA LA TABLA INSERTADA
END


GO
/****** Object:  UserDefinedFunction [dbo].[fnc_ConsecutivoTemporal]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:          CARLOS SOZA
-- Create date: Jueves, 07 de octubre de 2010
-- Description:     
-- =============================================
CREATE FUNCTION [dbo].[fnc_ConsecutivoTemporal]() RETURNS VARCHAR(15)
AS
begin
       --este es el codigo oficial
       --DECLARE @CONSECUTIVO VARCHAR(15)
       --            ,@AÑO VARCHAR(2)
       --            ,@MINIMOCONSECUTIVO AS INT
       --            ,@SIGUIENTE AS INT
       --            ,@PREFIJO AS VARCHAR(5)
       --            ,@DOCUMENTO AS VARCHAR(50)
       
       --DECLARE @TABLACONSECUTIVOS TABLE (CONSEC INT)
       
       --SET @AÑO = SUBSTRING(CAST(YEAR(GETDATE()) AS VARCHAR),3,2)
       --SET @DOCUMENTO = 'TEMPORAL'
       --SET @PREFIJO = 'T' + @AÑO
       
       --INSERT INTO @TABLACONSECUTIVOS
       --SELECT (CAST(SUBSTRING(idCliente,len(@PREFIJO)+1,LEN(idCliente)-len(@PREFIJO)) AS INT)) CONS
       --   FROM ANuevosClientes where substring(idCliente,1,3) =@PREFIJO --AND codTipo='0'
       -- and CAST(SUBSTRING(idCliente,2,2) AS INT) = @AÑO
       --UNION
       --SELECT  (CAST(SUBSTRING(consecutivo,len(@PREFIJO)+1,LEN(consecutivo)-len(@PREFIJO)) AS INT)) CONS 
       --  FROM Consecutivos2
       -- WHERE [DOCUMENTO]=@DOCUMENTO AND SUBSTRING(CONSECUTIVO,LEN(@PREFIJO)-LEN(@AÑO)+1,LEN(@AÑO)) = @AÑO
       -- ORDER BY CONS
       
       --SELECT @MINIMOCONSECUTIVO = MIN(CONSEC) FROM @TABLACONSECUTIVOS
       
       --IF ISNULL(@MINIMOCONSECUTIVO,999) > 1
       --BEGIN
       --     return dbo.fnc_FormatoCadena(@PREFIJO,10,1)
       --END
       
             
       --SELECT TOP 1 @SIGUIENTE = CONSEC+1 FROM @TABLACONSECUTIVOS A
       --WHERE NOT EXISTS (SELECT * FROM @TABLACONSECUTIVOS B WHERE A.CONSEC+1 = B.CONSEC)
       ----AND NOT EXISTS(SELECT codCliente FROM ANuevosOportunidades O WHERE A.CONSEC+1=O.codCliente)
       
       --SET @SIGUIENTE = ISNULL(@SIGUIENTE,1)
       --SET @CONSECUTIVO = dbo.fnc_FormatoCadena(@PREFIJO,10,@SIGUIENTE)
       --return @CONSECUTIVO
       --end

       --este es el codigo editado por oscar alcantara
             DECLARE @CONSECUTIVO VARCHAR(30)
                    ,@AÑO VARCHAR(2),
                    @MES VARCHAR(2),
                    @DIA VARCHAR(2),
                    
                    @TIEMPO VARCHAR(15),
                    @MINUTOS VARCHAR(2),
                    @SEGUNDO VARCHAR(2)
                    ,@MINIMOCONSECUTIVO AS INT
                    ,@SIGUIENTE AS INT
                    ,@PREFIJO AS VARCHAR(5)
                    ,@DOCUMENTO AS VARCHAR(50)
                    ,@CONSECUTIVO_EXISTE BIT=0
       
       DECLARE @TABLACONSECUTIVOS TABLE (CONSEC INT)

       SET @AÑO = SUBSTRING(CAST(YEAR(GETDATE()) AS VARCHAR),3,2)
       SET @MES = CAST(MONTH(GETDATE()) AS VARCHAR)
       IF (LEN(@MES)=1) SET @MES='0'+@MES;

       SET @DIA = CAST(DAY(GETDATE()) AS VARCHAR)
       IF (LEN(@DIA)=1) SET @DIA='0'+@DIA;

       SET @TIEMPO=CONVERT(TIME(2),GETDATE())
       SET @TIEMPO=REPLACE(@TIEMPO, ':', '')
       SET @TIEMPO=REPLACE(@TIEMPO, '.', '')
       --PRINT @TIEMPO

       SET @CONSECUTIVO = 'T' + @AÑO + @MES + @DIA + @TIEMPO
       --PRINT @CONSECUTIVO

       WHILE (@CONSECUTIVO_EXISTE=0)
       BEGIN

             IF EXISTS(SELECT * FROM QA..ANuevosClientes WHERE idCliente=@CONSECUTIVO) OR EXISTS(SELECT * FROM [dbo].[Consecutivos2] WHERE [Consecutivo]=@CONSECUTIVO) 
             BEGIN
                           SET @TIEMPO=CONVERT(TIME(2),GETDATE())
                           SET @TIEMPO=REPLACE(@TIEMPO, ':', '')
                           SET @TIEMPO=REPLACE(@TIEMPO, '.', '')
                           SET @CONSECUTIVO = 'T' + @AÑO + @MES + @DIA + @TIEMPO
             END
             ELSE
                    SET @CONSECUTIVO_EXISTE=1;
       END
       
       return @CONSECUTIVO
       end

GO
/****** Object:  UserDefinedFunction [dbo].[fnc_FormatoCadena]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		Paúl Somarriba
-- Create date: Jueves, 07 de octubre de 2010
-- Description:	Formatea una cadena
-- =============================================
CREATE FUNCTION [dbo].[fnc_FormatoCadena]
(
	@PREFIJO AS VARCHAR(10)
	,@TAMAÑO AS INT
	,@NUMERO AS INT
)
RETURNS VARCHAR(MAX)
AS
BEGIN
	DECLARE @RESULT VARCHAR(MAX)
	
	--SELECT @RESULT = @PREFIJO + '-' + RIGHT(REPLICATE('0',@TAMAÑO) + CAST(@NUMERO AS VARCHAR),@TAMAÑO)
	SELECT @RESULT = @PREFIJO +  RIGHT(REPLICATE('0',@TAMAÑO) + CAST(@NUMERO AS VARCHAR),@TAMAÑO)
	
	RETURN @RESULT

END



GO
/****** Object:  UserDefinedFunction [dbo].[fnSprintf]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <17/Mayo/2010>
-- Description:	<Da formato al IdCliente dependiendo
--				de su enmascaramiento correspondiente>
-- =============================================
CREATE function [dbo].[fnSprintf] 
(@Cadena VARCHAR(MAX),                   
@Mascara VARCHAR(MAX), 
@Separador CHAR(1) = '-')  
RETURNS VARCHAR(MAX)

AS
BEGIN
DECLARE @Posicion AS INT = 1
	WHILE @Posicion <= DATALENGTH(@Mascara)
		BEGIN
		  IF  CHAR(ASCII(SUBSTRING(@Mascara, @Posicion, 1))) = '-'
			BEGIN
				SET @Cadena = stuff(@Cadena,@Posicion,0,@Separador)
			END
		  SET @Posicion = @Posicion + 1
		END
RETURN @Cadena 
END 

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Banco]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <28/Mayo/2010>
-- Description:	<Regresa el nombre del Banco>
-- =============================================
Create FUNCTION [dbo].[FUNC_Banco]
(
	-- Add the parameters for the function here
	@iBanco as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM Bancos WHERE IdBanco = @iBanco
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_DAC]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <21/Mayo/2010>
-- Description:	<Regresa el nombre del DAC>
-- =============================================
create FUNCTION [dbo].[FUNC_DAC]
(
	-- Add the parameters for the function here
	@iDAC as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM DAC WHERE IdDAC = @iDAC
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Departamento]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa el nombre del departamento>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_Departamento]
(
	-- Add the parameters for the function here
	@iDepto as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM Departamentos WHERE idDepto = @iDepto
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_EstadoCivil]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa el estado civil>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_EstadoCivil]
(
	-- Add the parameters for the function here
	@iCivil as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM EstadoCivil WHERE idCivil = @iCivil
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_EstatusDAC]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <21/Mayo/2010>
-- Description:	<Regresa el nombre del DAC>
-- =============================================
create FUNCTION [dbo].[FUNC_EstatusDAC]
(
	-- Add the parameters for the function here
	@iStaDAC as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM EstatusDAC WHERE idStaDAC = @iStaDAC
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_EstatusFINANCIERO]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <12/Junio/2010>
-- Description:	<Regresa el nombre del Estatus Lider>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_EstatusFINANCIERO]
(
	-- Add the parameters for the function here
	@iStaFINANCIERO as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM EstatusFINANCIERO WHERE idStaFinanza = @iStaFINANCIERO
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END


GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_EstatusLIDER]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <12/Junio/2010>
-- Description:	<Regresa el nombre del Estatus Lider>
-- =============================================
create FUNCTION [dbo].[FUNC_EstatusLIDER]
(
	-- Add the parameters for the function here
	@iStaLIDER as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM EstatusLIDER WHERE idStaLider = @iStaLIDER
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END


GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Lideres]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <21/Mayo/2010>
-- Description:	<Regresa el nombre del vendedor>
-- =============================================
create FUNCTION [dbo].[FUNC_Lideres]
(
	-- Add the parameters for the function here
	@iLider as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM Lideres WHERE idLider = @iLider
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Modelo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <21/Mayo/2010>
-- Description:	<Regresa el nombre del vendedor>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_Modelo]
(
	-- Add the parameters for the function here
	@iModelo as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	--SELECT @oVarcharValuestring = Nombre FROM Modelos WHERE IdModelo = @iModelo
	SELECT @oVarcharValuestring= NOMBRE FROM VMT.dbo.T_NOMBREMODELOS WHERE NOMBREMODELOID = @iModelo
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END


GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_MotivoVisita]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <12/Abril/2011>
-- Description:	<Regresa el nombre del Motivo Visita>
-- =============================================
CREATE  FUNCTION [dbo].[FUNC_MotivoVisita]
(
	-- Add the parameters for the function here
	@iMotivo as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM MotivoVisita WHERE idMotivo = @iMotivo
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END


GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Municipio]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa el nombre del municipio>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_Municipio]
(
	-- Add the parameters for the function here
	@iMuni as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM Municipios WHERE idMuni = @iMuni
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_NombreCliente]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <22/SEPTIEMBRE/2010>
-- Description:	<Regresa el nombre del Cliente>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_NombreCliente]
(
	-- Add the parameters for the function here
	@iCliente as nVarChar(30)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(250) 

	SELECT @oVarcharValuestring = Nombre FROM ANuevosClientes WHERE idCliente = @iCliente
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END


GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_ObtenerMES]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Ing. Carlos Fernando Soza Chavarria
--	OBTENER MES
-- =============================================
CREATE FUNCTION [dbo].[FUNC_ObtenerMES]
(
	-- Add the parameters for the function here
	@ID as INT
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 
	
SET @oVarcharValuestring = CASE  @ID
									WHEN 1 THEN  'ENERO'
									WHEN 2 THEN  'FEBRERO'
									WHEN 3 THEN  'MARZO'
									WHEN 4 THEN  'ABRIL'
									WHEN 5 THEN  'MAYO'
									WHEN 6 THEN  'JUNIO'	
									WHEN 7 THEN  'JULIO'
									WHEN 8 THEN  'AGOSTO'
									WHEN 9 THEN  'SEPTIEMBRE'
									WHEN 10 THEN 'OCTUBRE'
									WHEN 11 THEN 'NOVIEMBRE'
									WHEN 12 THEN 'DICIEMBRE'
								END
-- Return the result of the function
RETURN(@oVarcharValuestring)  
END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_PMF]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <21/Mayo/2010>
-- Description:	<Regresa el nombre del vendedor>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_PMF]
(
	-- Add the parameters for the function here
	@iPmf as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	--SELECT @oVarcharValuestring = Nombre FROM Pmf WHERE IdPmf = @iPmf
	SELECT @oVarcharValuestring = CODIGO FROM VMT.dbo.T_PMF where PMFID = @iPmf
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END


GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Sexo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa el Sexo>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_Sexo] 
(@iSexo INTEGER) 
RETURNS VARCHAR(100) 
AS 
BEGIN
 DECLARE @oVarcharValuestring VARCHAR(100) 
 SET @oVarcharValuestring = CASE  WHEN @iSexo = 0 THEN
									'Femenino' 
									WHEN @iSexo = 1 THEN
									'Masculino' 
									WHEN @iSexo = 2 THEN
									'OTROS' 
									ELSE ''  
							END 
 RETURN(@oVarcharValuestring)  
END  
GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Status_Procesado]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa el Estatus del Procesado>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_Status_Procesado] 
(@iStatus INTEGER) 
RETURNS VARCHAR(100) 
AS 
BEGIN
 DECLARE @oVarcharValuestring VARCHAR(100) 
 SET @oVarcharValuestring = CASE  WHEN @iStatus = 1 THEN
									'Procesado' 
									WHEN @iStatus = 0 THEN
									'Sin Procesar' 
									ELSE ''  
							END 
 RETURN(@oVarcharValuestring)  
END  
GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Status_Revisado]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER OFF
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa El Estatus del Revisado>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_Status_Revisado] 
(@iStatus INTEGER) 
RETURNS VARCHAR(100) 
AS 
BEGIN
 DECLARE @oVarcharValuestring VARCHAR(100) 
 SET @oVarcharValuestring = CASE  WHEN @iStatus = 1 THEN
									'REVISADO' 
									WHEN @iStatus = 0 THEN
									'*** No Revisado ***' 
									ELSE ''  
							END 
 RETURN(@oVarcharValuestring)  
END  
GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Sucursal]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa la Abreviatura de la Sucursal>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_Sucursal]
(
	-- Add the parameters for the function here
	@iSucursal as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Abreviatura FROM Sucursales WHERE IdSucursal = @iSucursal
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_TipoCiente]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa el tipo de cliente>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_TipoCiente]
(
	-- Add the parameters for the function here
	@iTipo as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM TipoCliente WHERE idTipo = @iTipo
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_TipoClienteMASCARA]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <21/Mayo/2010>
-- Description:	<Regresa la Mascara del cliente>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_TipoClienteMASCARA]
(
	-- Add the parameters for the function here
	@iTipoC as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Mascara FROM TipoCliente WHERE idTipo = @iTipoC
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END


GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_User]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <18/Mayo/2010>
-- Description:	<Regresa el Nombre del Usuario>
-- =============================================
CREATE FUNCTION [dbo].[FUNC_User]
(
	-- Add the parameters for the function here
	@iUser as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Description FROM Users WHERE IDUser = @iUser
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_Vendedores]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <21/Mayo/2010>
-- Description:	<Regresa el nombre del vendedor>
-- =============================================
create FUNCTION [dbo].[FUNC_Vendedores]
(
	-- Add the parameters for the function here
	@iVendedor as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM Vendedores WHERE IdVendedor = @iVendedor
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END


GO
/****** Object:  UserDefinedFunction [dbo].[FUNC_VentasPerdidas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Ing. Carlos Fernando Soza Chavarria>
-- Create date: <21/Mayo/2010>
-- Description:	<Regresa el nombre de Ventas Perdidas>
-- =============================================
create FUNCTION [dbo].[FUNC_VentasPerdidas]
(
	-- Add the parameters for the function here
	@iVp as nVarChar(5)
)
RETURNS VARCHAR(100) 
AS
BEGIN
	-- Declare the return variable here
	DECLARE @oVarcharValuestring VARCHAR(100) 

	SELECT @oVarcharValuestring = Nombre FROM VentasPerdidas WHERE IdPerdida = @iVp
	-- Return the result of the function
	RETURN(@oVarcharValuestring)  

END

GO
/****** Object:  Table [dbo].[ANuevosClientes]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosClientes](
	[idCliente] [nvarchar](30) NOT NULL,
	[codTipo] [nvarchar](5) NULL,
	[Nombre] [nvarchar](250) NULL,
	[Direccion] [nvarchar](430) NULL,
	[Contacto] [nvarchar](250) NULL,
	[FechaApertura] [smalldatetime] NULL,
	[Telefonos] [nvarchar](50) NULL,
	[Edad] [int] NULL,
	[Sexo] [int] NULL,
	[EstaCivil] [nvarchar](5) NULL,
	[Ingresos] [decimal](18, 2) NULL,
	[codUser] [nvarchar](5) NULL,
	[Procesado] [bit] NULL,
	[Email] [nvarchar](50) NULL,
	[TelefonoHab] [nvarchar](20) NULL,
	[Celular] [nvarchar](20) NULL,
	[codDepto] [int] NULL,
	[codMuni] [int] NULL,
	[Ocupacion] [nvarchar](150) NULL,
	[codSucursal] [nvarchar](5) NULL,
	[ImagenDireccion] [nvarchar](150) NULL,
	[Fax] [nvarchar](20) NULL,
	[Revisado] [bit] NULL,
	[UserRevisado] [nvarchar](50) NULL,
	[ComentRevisado] [text] NULL,
	[Hora_Apertura] [datetime] NULL,
	[INDESEABLE] [bit] NULL,
	[MODIFICADO_POR] [nchar](5) NULL,
	[MODIFICADO_EL] [datetime] NULL,
	[Persona] [nvarchar](30) NULL,
	[PEP] [nvarchar](10) NULL,
	[Email2] [nvarchar](75) NULL,
	[Email3] [nvarchar](75) NULL,
	[IdSexo] [int] NULL,
	[IdEstadoCivil] [int] NULL,
	[ComentarioRevisado] [varchar](max) NULL,
	[FechaAperturaCliente] [datetime] NULL,
 CONSTRAINT [PK_ANuevosClientes_1] PRIMARY KEY CLUSTERED 
(
	[idCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Vendedores]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vendedores](
	[idVendedor] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Codigo] [nvarchar](5) NULL,
	[Baja] [bit] NULL,
	[IDUSER] [nvarchar](5) NULL,
	[LIDER] [nvarchar](5) NULL,
	[SUCURSAL] [int] NULL,
	[IDENTIFICACION] [varchar](50) NULL,
	[SiglaLider] [nvarchar](5) NULL,
	[IdSucursal] [int] NULL,
	[Habilitado] [bit] NULL,
 CONSTRAINT [PK_Vendedores_1] PRIMARY KEY CLUSTERED 
(
	[idVendedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Lideres]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lideres](
	[idLider] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Codigo] [nvarchar](5) NULL,
	[AREA] [nchar](10) NULL,
	[EMPRESA] [nvarchar](20) NULL,
	[IDUSER] [nvarchar](5) NULL,
	[ACTIVE] [bit] NULL,
	[IDENTIFICACION] [varchar](50) NULL,
	[Habilitado] [bit] NULL,
 CONSTRAINT [PK_Lideres] PRIMARY KEY CLUSTERED 
(
	[idLider] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosOportunidades]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosOportunidades](
	[codCliente] [nvarchar](30) NOT NULL,
	[idOportunidad] [int] NOT NULL,
	[Descripcion] [varchar](max) NULL,
	[Cantidad] [int] NULL,
	[codBanco] [nvarchar](5) NULL,
	[Prima] [nvarchar](50) NULL,
	[codVisita] [int] NULL,
	[VehiculosTiene] [nvarchar](350) NULL,
	[ProxiLlama] [smalldatetime] NULL,
	[codMotivo] [nvarchar](5) NULL,
	[codLider] [nvarchar](5) NULL,
	[codVendedor] [nvarchar](5) NULL,
	[cFechaApertura] [smalldatetime] NULL,
	[cFechaCierre] [smalldatetime] NULL,
	[PruebaManejo] [bit] NULL,
	[codSucursal] [nvarchar](5) NULL,
	[Procesado] [bit] NULL,
	[codModelo] [nvarchar](5) NULL,
	[codPmf] [nvarchar](5) NULL,
	[codPerdida] [nvarchar](5) NULL,
	[codVendeOrigen] [nvarchar](5) NULL,
	[NombreVendeOrigen] [nvarchar](50) NULL,
	[codClase] [nvarchar](5) NULL,
	[cFechaHistorico] [datetime] NULL,
	[ProxiLlamaLider] [datetime] NULL,
	[codStaDAC] [nvarchar](5) NULL,
	[codStaLIDER] [nvarchar](5) NULL,
	[ProxiLlamaDAC] [datetime] NULL,
	[codStaFinanza] [nvarchar](5) NULL,
	[ProxiLlamaFinanza] [datetime] NULL,
	[Hora_Op] [datetime] NULL,
	[ProxiLlamaTELE] [datetime] NULL,
	[codStaTELE] [nvarchar](5) NULL,
	[VentaPerdida] [bit] NULL,
	[Observacion] [varchar](max) NULL,
	[Version] [int] NULL,
	[VentaPerdidaLider] [bit] NULL,
	[CONTACTOOPORTUNIDAD] [varchar](100) NULL,
	[DIRECCIONOPORTUNIDAD] [varchar](max) NULL,
	[CELULAROPORTUNIDAD] [varchar](100) NULL,
	[TELEFONOOPORTUNIDAD] [varchar](100) NULL,
	[Programado] [bit] NULL,
	[IdStatusOportunidad] [int] NULL,
	[IdVisita] [int] NULL,
	[ProximaLlamadaVendedor] [date] NULL,
	[FechaAperturaOport] [date] NULL,
	[FechaCierreOport] [date] NULL,
	[PoseeVH] [bit] NULL,
	[LeInteresaAvaluo] [bit] NULL,
	[RealizoAvaluo] [bit] NULL,
	[AplicaAvaluo] [bit] NULL,
	[AñoModeloSuperior2010] [bit] NULL,
	[ModeloVHquePosee] [varchar](100) NULL,
 CONSTRAINT [PK_Oportunidades2] PRIMARY KEY CLUSTERED 
(
	[codCliente] ASC,
	[idOportunidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  View [dbo].[ProximaLlamadaVendedor]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[ProximaLlamadaVendedor]
AS
SELECT        dbo.ANuevosOportunidades.codCliente AS codClientes, dbo.ANuevosOportunidades.idOportunidad AS codOportunidad, dbo.ANuevosClientes.Nombre AS Cliente, dbo.ANuevosClientes.Telefonos, 
                         dbo.ANuevosOportunidades.CELULAROPORTUNIDAD, dbo.ANuevosOportunidades.TELEFONOOPORTUNIDAD, dbo.ANuevosOportunidades.codLider, dbo.Lideres.Nombre AS Lider, dbo.Vendedores.idVendedor, 
                         dbo.Vendedores.Nombre AS Vendedor, dbo.ANuevosClientes.TelefonoHab, dbo.ANuevosClientes.Celular, dbo.ANuevosOportunidades.ProximaLlamadaVendedor As cProxiLlama, dbo.ANuevosOportunidades.VentaPerdida
FROM            dbo.ANuevosClientes INNER JOIN
                         dbo.ANuevosOportunidades ON dbo.ANuevosClientes.idCliente = dbo.ANuevosOportunidades.codCliente INNER JOIN
                         dbo.Lideres ON dbo.ANuevosOportunidades.codLider = dbo.Lideres.idLider INNER JOIN
                         dbo.Vendedores ON dbo.ANuevosOportunidades.codVendedor = dbo.Vendedores.idVendedor
GO
/****** Object:  Table [dbo].[VentasPerdidas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VentasPerdidas](
	[idPerdida] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](150) NULL,
	[Habilitado] [bit] NOT NULL,
	[SoloAdmin] [bit] NOT NULL,
 CONSTRAINT [PK_VentasPerdidas] PRIMARY KEY CLUSTERED 
(
	[idPerdida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[viewProxi_Llamada_Vendedor]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewProxi_Llamada_Vendedor]
AS
SELECT     dbo.ANuevosClientes.idCliente, dbo.ANuevosClientes.Nombre, dbo.ANuevosClientes.Contacto, dbo.ANuevosClientes.Telefonos, 
                      dbo.ANuevosClientes.TelefonoHab, dbo.ANuevosClientes.Celular, ISNULL(dbo.FUNC_PMF(dbo.ANuevosOportunidades.codPmf), N'') AS PMF, 
                      dbo.ANuevosOportunidades.ProxiLlama, dbo.FUNC_PMF(dbo.ANuevosOportunidades.codPmf) 
                      + ' - ' + CAST(dbo.ANuevosOportunidades.Cantidad AS nVarchar) AS PMF_CANTIDAD, dbo.fnSprintf(dbo.ANuevosOportunidades.codCliente, 
                      dbo.FUNC_TipoClienteMASCARA(dbo.ANuevosClientes.codTipo), '-') AS cCliente, dbo.FUNC_Vendedores(dbo.ANuevosOportunidades.codVendedor) 
                      AS cVendedor, dbo.ANuevosOportunidades.codVendedor, dbo.ANuevosOportunidades.Procesado, dbo.ANuevosOportunidades.ProxiLlamaLider, 
                      dbo.ANuevosOportunidades.codLider, ISNULL(dbo.FUNC_Modelo(dbo.ANuevosOportunidades.codModelo), N'') AS nModelo, 
                      dbo.ANuevosOportunidades.cFechaApertura, dbo.FUNC_Sucursal(dbo.ANuevosOportunidades.codSucursal) AS nSucursal, 
                      dbo.ANuevosOportunidades.codMotivo, dbo.FUNC_MotivoVisita(dbo.ANuevosOportunidades.codMotivo) AS nMotivo, 
                      dbo.ANuevosOportunidades.idOportunidad, dbo.ANuevosOportunidades.codModelo, dbo.VentasPerdidas.Nombre AS Estatus
FROM         dbo.ANuevosClientes INNER JOIN
                      dbo.ANuevosOportunidades ON dbo.ANuevosClientes.idCliente = dbo.ANuevosOportunidades.codCliente INNER JOIN
                      dbo.VentasPerdidas ON dbo.ANuevosOportunidades.codPerdida = dbo.VentasPerdidas.idPerdida

GO
/****** Object:  Table [dbo].[EstadoCivil]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadoCivil](
	[idCivil] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_EstadoCivil] PRIMARY KEY CLUSTERED 
(
	[idCivil] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Departamentos]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departamentos](
	[idDepto] [int] NOT NULL,
	[Nombre] [nvarchar](80) NOT NULL,
 CONSTRAINT [PK_Departamentos] PRIMARY KEY CLUSTERED 
(
	[idDepto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Municipios]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Municipios](
	[idMuni] [int] IDENTITY(1,1) NOT NULL,
	[codDepto] [int] NOT NULL,
	[Nombre] [varchar](80) NOT NULL,
	[active] [bit] NULL,
 CONSTRAINT [PK_Municipios] PRIMARY KEY CLUSTERED 
(
	[idMuni] ASC,
	[codDepto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TipoCliente]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoCliente](
	[idTipo] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](100) NULL,
	[Mascara] [nvarchar](100) NULL,
 CONSTRAINT [PK_TipoCliente] PRIMARY KEY CLUSTERED 
(
	[idTipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[viewEletroClientes]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewEletroClientes]
AS
SELECT     dbo.ElectroClientes.Nombre, dbo.ElectroClientes.Direccion, dbo.ElectroClientes.Contacto, dbo.ElectroClientes.FechaApertura, 
                      dbo.ElectroClientes.Telefonos, dbo.ElectroClientes.Edad, dbo.ElectroClientes.Sexo, dbo.ElectroClientes.Ingresos, dbo.EstadoCivil.Nombre AS EstaCivil,
                       dbo.ElectroClientes.idCliente, dbo.ElectroClientes.Email, dbo.ElectroClientes.TelefonoHab, dbo.ElectroClientes.Celular, dbo.ElectroClientes.Ocupacion, 
                      dbo.Departamentos.Nombre AS Depto, dbo.Municipios.Nombre AS Municipios, dbo.ElectroClientes.codSucursal, 
                      dbo.TipoCliente.Nombre AS TipoCliente
FROM         dbo.ElectroClientes INNER JOIN
                      dbo.EstadoCivil ON dbo.ElectroClientes.EstaCivil = dbo.EstadoCivil.idCivil INNER JOIN
                      dbo.Municipios ON dbo.ElectroClientes.codMuni = dbo.Municipios.idMuni AND dbo.ElectroClientes.codDepto = dbo.Municipios.codDepto INNER JOIN
                      dbo.Departamentos ON dbo.Municipios.codDepto = dbo.Departamentos.idDepto INNER JOIN
                      dbo.TipoCliente ON dbo.ElectroClientes.codTipo = dbo.TipoCliente.idTipo

GO
/****** Object:  Table [dbo].[MotivoVisita]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MotivoVisita](
	[idMotivo] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](150) NOT NULL,
	[Baja] [bit] NULL,
	[Departamento] [varchar](50) NULL,
	[Tipo] [int] NULL,
 CONSTRAINT [PK_MotivoVisita] PRIMARY KEY CLUSTERED 
(
	[idMotivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Bancos]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bancos](
	[idBanco] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Habilitado] [bit] NULL,
	[IdTipoCategoria] [int] NOT NULL,
 CONSTRAINT [PK_Bancos] PRIMARY KEY CLUSTERED 
(
	[idBanco] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[viewElectroOportunidades]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewElectroOportunidades]
AS
SELECT     dbo.ElectroOportunidades.idOportunidad, dbo.ElectroOportunidades.Descripcion, dbo.ElectroOportunidades.Cantidad, dbo.Bancos.Nombre, 
                      dbo.ElectroOportunidades.Prima, dbo.ElectroOportunidades.codVisita, dbo.ElectroOportunidades.ProxiLlama, dbo.ElectroOportunidades.codCliente, 
                      dbo.Vendedores.Nombre AS Vendedores, dbo.MotivoVisita.Nombre AS Motivo, dbo.ElectroOportunidades.codVendedor, 
                      dbo.ElectroOportunidades.cFechaApertura, dbo.ElectroOportunidades.cFechaCierre, dbo.ElectroOportunidades.codSucursal, 
                      dbo.ElectroOportunidades.Procesado
FROM         dbo.ElectroOportunidades INNER JOIN
                      dbo.Bancos ON dbo.ElectroOportunidades.codBanco = dbo.Bancos.idBanco INNER JOIN
                      dbo.Vendedores ON dbo.ElectroOportunidades.codVendedor = dbo.Vendedores.idVendedor INNER JOIN
                      dbo.MotivoVisita ON dbo.ElectroOportunidades.codMotivo = dbo.MotivoVisita.idMotivo

GO
/****** Object:  Table [dbo].[Pmf]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pmf](
	[idPmf] [nvarchar](5) NOT NULL,
	[codModelo] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](250) NULL,
	[Observacion] [nvarchar](250) NULL,
	[Ano] [int] NULL,
	[Motor] [nvarchar](250) NULL,
	[Potencia] [nvarchar](250) NULL,
	[CajaVelocidad] [nvarchar](250) NULL,
	[Transmision] [nvarchar](250) NULL,
	[SuspDelantera] [nvarchar](250) NULL,
	[SuspTrasera] [nvarchar](250) NULL,
	[AmorDelantera] [nvarchar](250) NULL,
	[AmorTrasera] [nvarchar](250) NULL,
	[SistFrenos] [nvarchar](250) NULL,
	[SisteDireccion] [nvarchar](250) NULL,
	[CapaTanqueCombustible] [nvarchar](250) NULL,
	[CapaCargaTina] [nvarchar](250) NULL,
	[CapaPasajeros] [nvarchar](50) NULL,
	[NPuertas] [nvarchar](50) NULL,
	[PaisOrigen] [nvarchar](250) NULL,
	[Llantas] [nvarchar](250) NULL,
	[Combustible] [nvarchar](250) NULL,
	[Precio_Lista] [float] NULL,
 CONSTRAINT [PK_Pmf] PRIMARY KEY CLUSTERED 
(
	[idPmf] ASC,
	[codModelo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Sucursales]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sucursales](
	[IdSucursal] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Abreviatura] [nvarchar](5) NOT NULL,
	[Habilitado] [bit] NOT NULL,
 CONSTRAINT [PK_Sucursales] PRIMARY KEY CLUSTERED 
(
	[IdSucursal] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EstatusOportunidad]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstatusOportunidad](
	[IdEstatusOportunidad] [int] NOT NULL,
	[Descripcion] [varchar](150) NOT NULL,
	[Habilitado] [bit] NOT NULL,
 CONSTRAINT [PK_EstatusOportunidad] PRIMARY KEY CLUSTERED 
(
	[IdEstatusOportunidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[DatosOportunidad]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

create VIEW [dbo].[DatosOportunidad]
AS
SELECT        dbo.ANuevosOportunidades.idOportunidad, dbo.ANuevosOportunidades.codCliente, dbo.ANuevosOportunidades.codPmf, dbo.Pmf.Nombre AS PMF, dbo.ANuevosOportunidades.Cantidad, dbo.Sucursales.IdSucursal, 
                         dbo.Sucursales.Nombre AS Sucursal, dbo.ANuevosOportunidades.IdStatusOportunidad, dbo.EstatusOportunidad.Descripcion AS EstatusOportunidad, dbo.ANuevosOportunidades.Descripcion, 
                         dbo.ANuevosOportunidades.codBanco, dbo.ANuevosOportunidades.Prima, dbo.ANuevosOportunidades.codVisita, dbo.ANuevosOportunidades.VehiculosTiene, dbo.ANuevosOportunidades.ProxiLlama, 
                         dbo.ANuevosOportunidades.codMotivo, dbo.ANuevosOportunidades.codLider,  dbo.Lideres.Nombre AS Lider, dbo.ANuevosOportunidades.codVendedor, dbo.Vendedores.Nombre AS Vendedor,  dbo.ANuevosOportunidades.cFechaApertura
                        
FROM            dbo.ANuevosOportunidades INNER JOIN
                         dbo.Pmf ON dbo.ANuevosOportunidades.codModelo = dbo.Pmf.codModelo AND dbo.ANuevosOportunidades.codPmf = dbo.Pmf.idPmf INNER JOIN
                         dbo.Sucursales ON dbo.ANuevosOportunidades.codSucursal = dbo.Sucursales.IdSucursal INNER JOIN
                         dbo.EstatusOportunidad ON dbo.ANuevosOportunidades.IdStatusOportunidad = dbo.EstatusOportunidad.IdEstatusOportunidad INNER JOIN
                         dbo.Vendedores ON dbo.ANuevosOportunidades.codVendedor = dbo.Vendedores.idVendedor INNER JOIN
                         dbo.Lideres ON dbo.ANuevosOportunidades.codLider = dbo.Lideres.idLider


GO
/****** Object:  Table [dbo].[ANuevosLlamadasDAC]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadasDAC](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[Revisado] [bit] NULL,
	[codDAC] [nvarchar](5) NULL,
	[IDLlamada] [int] NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[cProxiLlama] [datetime] NULL,
	[codStaDAC] [nvarchar](5) NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_ANuevosLlamadasDAC] PRIMARY KEY CLUSTERED 
(
	[codClientes] ASC,
	[codOportunidad] ASC,
	[cFecha] ASC,
	[Hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  View [dbo].[viewGRupoLlamadasDAC]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewGRupoLlamadasDAC]
AS
SELECT     dbo.FUNC_EstatusDAC(codStaDAC) AS StatusDAC, COUNT(codPerdida) AS CuentaSTATUS_Vende, codStaDAC
FROM         dbo.ANuevosOportunidades
WHERE     (codCliente IN
                          (SELECT     codClientes
                            FROM          dbo.ANuevosLlamadasDAC
                            WHERE      (cFecha BETWEEN '2010.01.05' AND '2010.30.05'))) AND (idOportunidad IN
                          (SELECT     codOportunidad
                            FROM          dbo.ANuevosLlamadasDAC AS ANuevosLlamadasDAC_1
                            WHERE      (cFecha BETWEEN '2010.01.05' AND '2010.30.05')))
GROUP BY dbo.FUNC_EstatusDAC(codStaDAC), codStaDAC


GO
/****** Object:  Table [dbo].[ANuevosLlamadas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadas](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[Revisado] [bit] NULL,
	[IDLlamada] [int] NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[cProxiLlama] [datetime] NULL,
	[codEstaVende] [nvarchar](5) NULL,
	[Nombre] [nvarchar](150) NULL,
	[ComentRevisado] [text] NULL,
	[Visita] [bit] NULL,
	[Llamada] [bit] NULL,
	[Avaluo] [bit] NULL,
	[Importancia] [bit] NULL,
	[Correo] [bit] NULL,
	[FechaRegistro] [date] NULL,
	[ComentarioVendedor] [varchar](max) NULL,
	[ComentarioLider] [varchar](max) NULL,
 CONSTRAINT [PK_DetalleClientes2] PRIMARY KEY CLUSTERED 
(
	[codClientes] ASC,
	[codOportunidad] ASC,
	[cFecha] ASC,
	[Hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosLlamadasLider]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadasLider](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[Revisado] [bit] NULL,
	[IDLlamada] [int] NULL,
	[cProxiLlama] [datetime] NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_ANuevosLlamadasLider] PRIMARY KEY CLUSTERED 
(
	[codClientes] ASC,
	[codOportunidad] ASC,
	[cFecha] ASC,
	[Hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  View [dbo].[viewUNION_Llamadas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewUNION_Llamadas]
AS
SELECT IDLlamada, codClientes, codOportunidad, cFecha, Referencias, Hora FROM ANuevosLlamadas
UNION ALL
SELECT IDLlamada, codClientes, codOportunidad, cFecha, Referencias, Hora FROM ANuevosLlamadasdac
UNION ALL
SELECT IDLlamada, codClientes, codOportunidad, cFecha, Referencias, Hora FROM ANuevosLlamadasLider



GO
/****** Object:  View [dbo].[viewLlamadas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewLlamadas]
AS
SELECT     dbo.viewUNION_Llamadas.codClientes, dbo.viewUNION_Llamadas.codOportunidad, dbo.viewUNION_Llamadas.cFecha, 
                      dbo.ANuevosLlamadas.Referencias AS ComentaVende, dbo.ANuevosLlamadas.Hora AS HoraVende, 
                      dbo.ANuevosLlamadasDAC.Referencias AS ComentaDAC, dbo.ANuevosLlamadasDAC.Hora AS HoraDAC, 
                      dbo.ANuevosLlamadasLider.Referencias AS ComentaLider, dbo.ANuevosLlamadasLider.Hora AS HoraLider
FROM         dbo.viewUNION_Llamadas LEFT OUTER JOIN
                      dbo.ANuevosLlamadasDAC ON dbo.viewUNION_Llamadas.codClientes = dbo.ANuevosLlamadasDAC.codClientes AND 
                      dbo.viewUNION_Llamadas.codOportunidad = dbo.ANuevosLlamadasDAC.codOportunidad AND 
                      dbo.viewUNION_Llamadas.cFecha = dbo.ANuevosLlamadasDAC.cFecha AND 
                      dbo.viewUNION_Llamadas.IDLlamada = dbo.ANuevosLlamadasDAC.IDLlamada LEFT OUTER JOIN
                      dbo.ANuevosLlamadas ON dbo.viewUNION_Llamadas.codClientes = dbo.ANuevosLlamadas.codClientes AND 
                      dbo.viewUNION_Llamadas.codOportunidad = dbo.ANuevosLlamadas.codOportunidad AND 
                      dbo.viewUNION_Llamadas.cFecha = dbo.ANuevosLlamadas.cFecha AND 
                      dbo.viewUNION_Llamadas.IDLlamada = dbo.ANuevosLlamadas.IDLlamada LEFT OUTER JOIN
                      dbo.ANuevosLlamadasLider ON dbo.viewUNION_Llamadas.codClientes = dbo.ANuevosLlamadasLider.codClientes AND 
                      dbo.viewUNION_Llamadas.codOportunidad = dbo.ANuevosLlamadasLider.codOportunidad AND 
                      dbo.viewUNION_Llamadas.cFecha = dbo.ANuevosLlamadasLider.cFecha AND 
                      dbo.viewUNION_Llamadas.IDLlamada = dbo.ANuevosLlamadasLider.IDLlamada
WHERE     (dbo.viewUNION_Llamadas.codClientes = N'0411849538') AND (dbo.viewUNION_Llamadas.codOportunidad = 3)


GO
/****** Object:  View [dbo].[viewSegui_Master]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewSegui_Master]
AS
SELECT     dbo.ANuevosLlamadasDAC.cFecha, dbo.ANuevosOportunidades.cFechaApertura, dbo.FUNC_Vendedores(dbo.ANuevosOportunidades.codVendedor) 
                      AS nVendedor, dbo.fnSprintf(dbo.ANuevosOportunidades.codCliente, dbo.FUNC_TipoClienteMASCARA(dbo.ANuevosClientes.codTipo), '-') AS IDCliente, 
                      dbo.ANuevosClientes.Nombre, dbo.ANuevosClientes.Telefonos, dbo.ANuevosOportunidades.idOportunidad, 
                      dbo.FUNC_PMF(dbo.ANuevosOportunidades.codPmf) AS nPMF, dbo.ANuevosLlamadasDAC.Referencias, dbo.ANuevosOportunidades.codLider, 
                      dbo.ANuevosOportunidades.codStaDAC, dbo.ANuevosClientes.idCliente AS codCliente, dbo.FUNC_DAC(dbo.ANuevosLlamadasDAC.codDAC) AS nDAC, 
                      dbo.ANuevosLlamadasDAC.IDLlamada, dbo.ANuevosLlamadasDAC.codDAC, dbo.ANuevosClientes.TelefonoHab, dbo.ANuevosClientes.Celular, 
                      dbo.ANuevosClientes.Contacto, dbo.ANuevosOportunidades.codStaLIDER, dbo.ANuevosLlamadasDAC.ROW_ID, 
                      dbo.FUNC_EstatusDAC(dbo.ANuevosOportunidades.codStaDAC) AS EstaDAC, dbo.ANuevosLlamadasDAC.Hora
FROM         dbo.ANuevosOportunidades INNER JOIN
                      dbo.ANuevosClientes ON dbo.ANuevosOportunidades.codCliente = dbo.ANuevosClientes.idCliente INNER JOIN
                      dbo.ANuevosLlamadasDAC ON dbo.ANuevosOportunidades.codCliente = dbo.ANuevosLlamadasDAC.codClientes AND 
                      dbo.ANuevosOportunidades.idOportunidad = dbo.ANuevosLlamadasDAC.codOportunidad

GO
/****** Object:  View [dbo].[viewANuevosProximaLlama]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewANuevosProximaLlama]
AS
SELECT        dbo.ANuevosOportunidades.codCliente, dbo.ANuevosClientes.Nombre, dbo.ANuevosOportunidades.codVendedor, dbo.ANuevosOportunidades.ProxiLlama, 
                         dbo.ANuevosOportunidades.idOportunidad, dbo.ANuevosOportunidades.Descripcion, dbo.ANuevosClientes.Contacto, dbo.ANuevosClientes.Telefonos, 
                         dbo.ANuevosOportunidades.Cantidad, dbo.ANuevosOportunidades.codSucursal, dbo.ANuevosClientes.codTipo, dbo.ANuevosOportunidades.cFechaApertura, 
                         dbo.ANuevosOportunidades.codPerdida
FROM            dbo.ANuevosClientes INNER JOIN
                         dbo.ANuevosOportunidades ON dbo.ANuevosClientes.idCliente = dbo.ANuevosOportunidades.codCliente

GO
/****** Object:  View [dbo].[viewANuevosOportunidades]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewANuevosOportunidades]
AS
SELECT        TOP (100) PERCENT dbo.ANuevosOportunidades.idOportunidad, dbo.ANuevosOportunidades.Descripcion, dbo.ANuevosOportunidades.Cantidad, dbo.Bancos.Nombre, dbo.ANuevosOportunidades.Prima, 
                         dbo.ANuevosOportunidades.codVisita, dbo.ANuevosOportunidades.VehiculosTiene, dbo.ANuevosOportunidades.ProxiLlama, dbo.ANuevosOportunidades.codCliente, dbo.Vendedores.Nombre AS Vendedores, 
                         dbo.Lideres.Nombre AS Lideres, dbo.MotivoVisita.Nombre AS Motivo, dbo.ANuevosOportunidades.codVendedor, dbo.ANuevosOportunidades.cFechaApertura, dbo.ANuevosOportunidades.cFechaCierre, 
                         dbo.ANuevosOportunidades.PruebaManejo, dbo.ANuevosOportunidades.codSucursal, dbo.ANuevosOportunidades.Procesado, ISNULL(dbo.FUNC_PMF(dbo.ANuevosOportunidades.codPmf), N'') AS PMF, 
                         dbo.ANuevosClientes.Procesado AS xProcesado, dbo.ANuevosOportunidades.codClase, dbo.ANuevosOportunidades.codPerdida
FROM            dbo.ANuevosOportunidades INNER JOIN
                         dbo.Bancos ON dbo.ANuevosOportunidades.codBanco = dbo.Bancos.idBanco INNER JOIN
                         dbo.Vendedores ON dbo.ANuevosOportunidades.codVendedor = dbo.Vendedores.idVendedor INNER JOIN
                         dbo.MotivoVisita ON dbo.ANuevosOportunidades.codMotivo = dbo.MotivoVisita.idMotivo INNER JOIN
                         dbo.Lideres ON dbo.ANuevosOportunidades.codLider = dbo.Lideres.idLider INNER JOIN
                         dbo.ANuevosClientes ON dbo.ANuevosOportunidades.codCliente = dbo.ANuevosClientes.idCliente
ORDER BY dbo.ANuevosOportunidades.idOportunidad DESC

GO
/****** Object:  View [dbo].[viewANuevosClientes]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewANuevosClientes]
AS
SELECT        dbo.ANuevosClientes.Nombre, dbo.ANuevosClientes.Direccion, dbo.ANuevosClientes.Contacto, dbo.ANuevosClientes.FechaApertura, dbo.ANuevosClientes.Telefonos, dbo.ANuevosClientes.Edad, dbo.ANuevosClientes.Sexo, 
                         dbo.ANuevosClientes.Ingresos, dbo.EstadoCivil.Nombre AS EstaCivil, dbo.ANuevosClientes.idCliente, dbo.ANuevosClientes.Email, dbo.ANuevosClientes.TelefonoHab, dbo.ANuevosClientes.Celular, 
                         dbo.ANuevosClientes.Ocupacion, dbo.Departamentos.Nombre AS Depto, dbo.Municipios.Nombre AS Municipios, dbo.ANuevosClientes.codSucursal, dbo.TipoCliente.Nombre AS TipoCliente, dbo.ANuevosClientes.Email2, 
                         dbo.ANuevosClientes.Email3
FROM            dbo.ANuevosClientes INNER JOIN
                         dbo.EstadoCivil ON dbo.ANuevosClientes.EstaCivil = dbo.EstadoCivil.idCivil INNER JOIN
                         dbo.Municipios ON dbo.ANuevosClientes.codMuni = dbo.Municipios.idMuni AND dbo.ANuevosClientes.codDepto = dbo.Municipios.codDepto INNER JOIN
                         dbo.Departamentos ON dbo.Municipios.codDepto = dbo.Departamentos.idDepto INNER JOIN
                         dbo.TipoCliente ON dbo.ANuevosClientes.codTipo = dbo.TipoCliente.idTipo

GO
/****** Object:  View [dbo].[viwSegui_MASTER_Lider]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viwSegui_MASTER_Lider]
AS
SELECT     dbo.ANuevosLlamadasLider.cFecha, dbo.ANuevosOportunidades.cFechaApertura, dbo.FUNC_Vendedores(dbo.ANuevosOportunidades.codVendedor) 
                      AS nVendedor, dbo.fnSprintf(dbo.ANuevosOportunidades.codCliente, dbo.FUNC_TipoClienteMASCARA(dbo.ANuevosClientes.codTipo), '-') AS IDCliente, 
                      dbo.ANuevosClientes.Nombre, dbo.ANuevosClientes.Telefonos, dbo.ANuevosOportunidades.idOportunidad, 
                      dbo.FUNC_PMF(dbo.ANuevosOportunidades.codPmf) AS nPMF, dbo.ANuevosLlamadasLider.Referencias, dbo.ANuevosOportunidades.codLider, 
                      dbo.ANuevosOportunidades.codStaLIDER, dbo.ANuevosClientes.idCliente AS codCliente, dbo.ANuevosLlamadasLider.IDLlamada, 
                      dbo.ANuevosClientes.TelefonoHab, dbo.ANuevosClientes.Celular, dbo.ANuevosClientes.Contacto, 
                      dbo.FUNC_Lideres(dbo.ANuevosOportunidades.codLider) AS nLIDER, dbo.FUNC_EstatusLIDER(dbo.ANuevosOportunidades.codStaLIDER) 
                      AS nSTALIDER
FROM         dbo.ANuevosOportunidades INNER JOIN
                      dbo.ANuevosClientes ON dbo.ANuevosOportunidades.codCliente = dbo.ANuevosClientes.idCliente INNER JOIN
                      dbo.ANuevosLlamadasLider ON dbo.ANuevosOportunidades.codCliente = dbo.ANuevosLlamadasLider.codClientes AND 
                      dbo.ANuevosOportunidades.idOportunidad = dbo.ANuevosLlamadasLider.codOportunidad


GO
/****** Object:  Table [dbo].[TipoSexo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoSexo](
	[IdSexo] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Habilitado] [bit] NOT NULL,
 CONSTRAINT [PK_TipoSexo] PRIMARY KEY CLUSTERED 
(
	[IdSexo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EstadoCivilCliente]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadoCivilCliente](
	[IdEstadoCivil] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Habilitado] [bit] NOT NULL,
 CONSTRAINT [PK_EstadoCivilCliente] PRIMARY KEY CLUSTERED 
(
	[IdEstadoCivil] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[DatosClientes]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[DatosClientes]
AS
SELECT        dbo.ANuevosClientes.idCliente, dbo.TipoCliente.idTipo AS IdTipoCliente, dbo.TipoCliente.Nombre AS TipoCliente, dbo.ANuevosClientes.Nombre, dbo.ANuevosClientes.Direccion, dbo.ANuevosClientes.Contacto, 
                         dbo.ANuevosClientes.FechaApertura, dbo.ANuevosClientes.Telefonos, dbo.ANuevosClientes.Edad, dbo.ANuevosClientes.Ingresos, dbo.ANuevosClientes.Email, dbo.ANuevosClientes.TelefonoHab, dbo.ANuevosClientes.Celular, 
                         dbo.ANuevosClientes.Ocupacion, dbo.ANuevosClientes.codDepto, dbo.Departamentos.Nombre AS Departamento, dbo.ANuevosClientes.codMuni, dbo.Municipios.Nombre AS Municipio, dbo.ANuevosClientes.codSucursal, 
                         dbo.Sucursales.Nombre AS NombreSucursal, dbo.ANuevosClientes.Procesado, dbo.ANuevosClientes.Revisado, dbo.ANuevosClientes.Fax, dbo.ANuevosClientes.codUser, dbo.ANuevosClientes.UserRevisado, 
                         dbo.ANuevosClientes.ComentRevisado, dbo.ANuevosClientes.Hora_Apertura, dbo.ANuevosClientes.INDESEABLE, dbo.ANuevosClientes.MODIFICADO_POR, dbo.ANuevosClientes.MODIFICADO_EL, 
                         dbo.ANuevosClientes.Persona, dbo.ANuevosClientes.PEP, dbo.ANuevosClientes.Email2, dbo.ANuevosClientes.Email3, dbo.ANuevosClientes.IdSexo, dbo.TipoSexo.Descripcion AS Sexo, dbo.ANuevosClientes.IdEstadoCivil, 
                         dbo.EstadoCivilCliente.Descripcion AS EstadoCivil, dbo.ANuevosClientes.ComentarioRevisado, dbo.ANuevosClientes.FechaAperturaCliente
FROM            dbo.ANuevosClientes INNER JOIN
                         dbo.Municipios ON dbo.ANuevosClientes.codMuni = dbo.Municipios.idMuni AND dbo.ANuevosClientes.codDepto = dbo.Municipios.codDepto INNER JOIN
                         dbo.Departamentos ON dbo.Municipios.codDepto = dbo.Departamentos.idDepto INNER JOIN
                         dbo.TipoCliente ON dbo.ANuevosClientes.codTipo = dbo.TipoCliente.idTipo INNER JOIN
                         dbo.Sucursales ON dbo.ANuevosClientes.codSucursal = dbo.Sucursales.IdSucursal INNER JOIN
                         dbo.EstadoCivilCliente ON dbo.ANuevosClientes.IdEstadoCivil = dbo.EstadoCivilCliente.IdEstadoCivil INNER JOIN
                         dbo.TipoSexo ON dbo.ANuevosClientes.IdSexo = dbo.TipoSexo.IdSexo



GO
/****** Object:  View [dbo].[viewANuevosDetails]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewANuevosDetails]
AS
SELECT        TOP (100) PERCENT dbo.ANuevosOportunidades.codCliente, dbo.ANuevosOportunidades.idOportunidad, VMT.dbo.T_PMF.CODIGO AS Nombre, dbo.ANuevosOportunidades.codSucursal, 
                         dbo.ANuevosOportunidades.Descripcion, dbo.ANuevosOportunidades.Cantidad, dbo.ANuevosOportunidades.codBanco, dbo.ANuevosOportunidades.Prima, dbo.ANuevosOportunidades.codVisita, 
                         dbo.ANuevosOportunidades.VehiculosTiene, dbo.ANuevosOportunidades.ProxiLlama, dbo.ANuevosOportunidades.codMotivo, dbo.ANuevosOportunidades.codLider, dbo.ANuevosOportunidades.codVendedor, 
                         dbo.ANuevosOportunidades.cFechaApertura, dbo.ANuevosOportunidades.cFechaCierre, dbo.ANuevosOportunidades.PruebaManejo, dbo.ANuevosOportunidades.Procesado, 
                         dbo.ANuevosOportunidades.codModelo, dbo.ANuevosOportunidades.codPmf, dbo.ANuevosOportunidades.codPerdida, dbo.ANuevosOportunidades.codClase, dbo.ANuevosOportunidades.ProxiLlamaLider, 
                         dbo.ANuevosOportunidades.codStaDAC, dbo.ANuevosOportunidades.codStaLIDER, dbo.ANuevosOportunidades.ProxiLlamaDAC, dbo.ANuevosOportunidades.codStaFinanza, 
                         dbo.ANuevosOportunidades.ProxiLlamaFinanza, dbo.ANuevosOportunidades.CONTACTOOPORTUNIDAD, dbo.ANuevosOportunidades.DIRECCIONOPORTUNIDAD, 
                         dbo.ANuevosOportunidades.CELULAROPORTUNIDAD, dbo.ANuevosOportunidades.TELEFONOOPORTUNIDAD
FROM            dbo.ANuevosOportunidades INNER JOIN
                         VMT.dbo.T_PMF ON dbo.ANuevosOportunidades.codPmf = VMT.dbo.T_PMF.PMFID
ORDER BY dbo.ANuevosOportunidades.idOportunidad DESC

GO
/****** Object:  Table [dbo].[PropuestaNegocio]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PropuestaNegocio](
	[idPropuesta] [nvarchar](21) NOT NULL,
	[codCliente] [nvarchar](30) NULL,
	[codOportunidad] [int] NULL,
	[nPMF] [nvarchar](250) NULL,
	[Fecha] [datetime] NULL,
	[TipoCambio] [decimal](18, 2) NULL,
	[Nombre] [nvarchar](250) NULL,
	[Direccion] [nvarchar](430) NULL,
	[Telefono] [nvarchar](100) NULL,
	[Contacto] [nvarchar](250) NULL,
	[NombreTipo] [nvarchar](100) NULL,
	[Email] [nvarchar](150) NULL,
	[mPrecio1Dolar] [decimal](18, 2) NULL,
	[mAccesoriosDolar] [decimal](18, 2) NULL,
	[mSubTotal2Dolar] [decimal](18, 2) NULL,
	[mRebEspecialDolar] [decimal](18, 2) NULL,
	[mPrecioEspecialDolar] [decimal](18, 2) NULL,
	[mImpAduanasDolar] [decimal](18, 2) NULL,
	[mSubTotal4Dolar] [decimal](18, 2) NULL,
	[mIVADolar] [decimal](18, 2) NULL,
	[mSubTotal5Dolar] [decimal](18, 2) NULL,
	[mPrimaDolar] [decimal](18, 2) NULL,
	[mAutoUsadoDolar] [decimal](18, 2) NULL,
	[mSaldoDolar] [decimal](18, 2) NULL,
	[mPrecio1Cordoba] [decimal](18, 2) NULL,
	[mAccesoriosCordoba] [decimal](18, 2) NULL,
	[mSubTotal2Cordoba] [decimal](18, 2) NULL,
	[mRebEspecialCordoba] [decimal](18, 2) NULL,
	[mPrecioEspecialCordoba] [decimal](18, 2) NULL,
	[mImpAduanasCordoba] [decimal](18, 2) NULL,
	[mSubTotal4Cordoba] [decimal](18, 2) NULL,
	[mIVACordoba] [decimal](18, 2) NULL,
	[mSubTotal5Cordoba] [decimal](18, 2) NULL,
	[mPrimaCordoba] [decimal](18, 2) NULL,
	[mAutoUsadoCordoba] [decimal](18, 2) NULL,
	[mSaldoCordoba] [decimal](18, 2) NULL,
	[Marca] [nvarchar](250) NULL,
	[Modelo] [nvarchar](250) NULL,
	[Kilometraje] [decimal](18, 2) NULL,
	[mPrecioAUsado] [decimal](18, 2) NULL,
	[AnoUsado] [int] NULL,
	[Comentario] [nvarchar](500) NULL,
	[AnoNuevo] [int] NULL,
	[Color] [nvarchar](50) NULL,
	[nBanco] [nvarchar](50) NULL,
	[TipoPago] [int] NULL,
	[codVendedor] [nvarchar](5) NULL,
	[NombreVendedor] [nvarchar](50) NULL,
	[codLider] [nvarchar](5) NULL,
	[NombreLider] [nvarchar](50) NULL,
	[codTipoPropuesta] [nvarchar](5) NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[TelfHab] [nvarchar](20) NULL,
	[Celular] [nvarchar](20) NULL,
	[Fax] [nvarchar](20) NULL,
	[nChasis] [nvarchar](50) NULL,
	[Motor] [nvarchar](50) NULL,
	[FechaReserva] [datetime] NULL,
	[idVH] [nvarchar](50) NULL,
	[ISmPrecio1Dolar] [bit] NULL,
	[ISmAccesoriosDolar] [bit] NULL,
	[ISmSubTotal2Dolar] [bit] NULL,
	[ISmRebEspecialDolar] [bit] NULL,
	[ISmPrecioEspecialDolar] [bit] NULL,
	[ISmImpAduanasDolar] [bit] NULL,
	[ISmSubTotal4Dolar] [bit] NULL,
	[ISmIVADolar] [bit] NULL,
	[ISmSubTotal5Dolar] [bit] NULL,
	[ISmPrimaDolar] [bit] NULL,
	[ISmAutoUsadoDolar] [bit] NULL,
	[ISmSaldoDolar] [bit] NULL,
	[Tipo] [int] NULL,
	[FORMAPAGOID] [int] NULL,
	[BANCOID] [int] NULL,
	[ComentariosPMF] [nvarchar](max) NULL,
	[FechaProgramacion] [date] NULL,
	[Empresa] [varchar](50) NULL,
	[PI] [varchar](50) NULL,
	[DepositoALQ] [varchar](50) NULL,
	[CanonALQ] [varchar](50) NULL,
	[SeguroVidaALQ] [varchar](50) NULL,
	[SeguroVHALQ] [varchar](50) NULL,
	[KMetrajePermitidoALQ] [varchar](50) NULL,
	[KMetrajeExtraALQ] [varchar](50) NULL,
	[ValorReventaALQ] [varchar](50) NULL,
	[Plazo] [varchar](50) NULL,
 CONSTRAINT [PK_PropuestaNegocio_1] PRIMARY KEY CLUSTERED 
(
	[idPropuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[MatrizRiesgoDePropNegocio]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MatrizRiesgoDePropNegocio](
	[CodOportunidad] [int] NOT NULL,
	[CodCliente] [nvarchar](30) NOT NULL,
	[ProcedenciaDinero] [varchar](100) NOT NULL,
	[FrecuenciaCompra] [varchar](100) NOT NULL,
	[NivelRiesgos] [varchar](50) NOT NULL,
	[Observacion] [varchar](100) NOT NULL,
	[FechaRegistrada] [datetime] NOT NULL,
	[FechaActualizada] [datetime] NULL,
 CONSTRAINT [PK_MatrizRiesgoDePropNegocio] PRIMARY KEY CLUSTERED 
(
	[CodOportunidad] ASC,
	[CodCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[ViewMatrizDeRiesgo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--7
------------ CREAR VISTA -------------------

CREATE VIEW [dbo].[ViewMatrizDeRiesgo]
AS
SELECT    dbo.MatrizRiesgoDePropNegocio.CodCliente, dbo.MatrizRiesgoDePropNegocio.CodOportunidad,    dbo.PropuestaNegocio.idPropuesta, dbo.ANuevosClientes.Nombre, dbo.ANuevosClientes.Persona, dbo.ANuevosClientes.PEP, dbo.ANuevosClientes.idCliente, 
                         dbo.ANuevosClientes.Ocupacion, dbo.ANuevosClientes.Direccion, dbo.PropuestaNegocio.mSaldoDolar, dbo.Vendedores.idVendedor, 
                         dbo.Vendedores.Nombre AS Vendedor, dbo.Lideres.idLider, dbo.Lideres.Nombre AS Lider, dbo.MatrizRiesgoDePropNegocio.ProcedenciaDinero, 
                         dbo.MatrizRiesgoDePropNegocio.FrecuenciaCompra, dbo.MatrizRiesgoDePropNegocio.NivelRiesgos, dbo.MatrizRiesgoDePropNegocio.Observacion, 
                         dbo.MatrizRiesgoDePropNegocio.FechaRegistrada
FROM            dbo.PropuestaNegocio INNER JOIN
                         dbo.ANuevosClientes ON dbo.PropuestaNegocio.codCliente = dbo.ANuevosClientes.idCliente INNER JOIN
                         dbo.Lideres ON dbo.PropuestaNegocio.codLider = dbo.Lideres.idLider INNER JOIN
                         dbo.Vendedores ON dbo.PropuestaNegocio.codVendedor = dbo.Vendedores.idVendedor INNER JOIN
                        dbo.MatrizRiesgoDePropNegocio ON dbo.PropuestaNegocio.codOportunidad = dbo.MatrizRiesgoDePropNegocio.CodOportunidad AND 
                         dbo.PropuestaNegocio.codCliente = dbo.MatrizRiesgoDePropNegocio.CodCliente



GO
/****** Object:  Table [dbo].[ClasesOportunidad]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClasesOportunidad](
	[idClase] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Plasma] [char](1) NULL,
	[Habilitado] [bit] NULL,
 CONSTRAINT [PK_ClasesOportunidad] PRIMARY KEY CLUSTERED 
(
	[idClase] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  View [dbo].[ListadosOportunidad]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[ListadosOportunidad]
AS
SELECT        dbo.ANuevosOportunidades.idOportunidad, dbo.ANuevosClientes.idCliente, dbo.ANuevosClientes.Nombre AS Cliente, dbo.ANuevosClientes.Telefonos, dbo.ANuevosClientes.TelefonoHab, dbo.ANuevosClientes.Celular, dbo.ANuevosOportunidades.codVendedor, dbo.Vendedores.Nombre AS Vendedor, 
                         dbo.ANuevosOportunidades.codSucursal, dbo.Sucursales.Nombre AS Sucursal, dbo.ANuevosOportunidades.codPmf, dbo.Pmf.Nombre AS PMF, dbo.ANuevosOportunidades.Cantidad, dbo.ANuevosOportunidades.codClase, 
                         dbo.ClasesOportunidad.Nombre AS Clase, dbo.ANuevosOportunidades.IdStatusOportunidad, dbo.EstatusOportunidad.Descripcion AS statusOportunidad, dbo.PropuestaNegocio.idPropuesta, dbo.PropuestaNegocio.nChasis, 
                         dbo.PropuestaNegocio.Motor, dbo.ANuevosOportunidades.ProximaLlamadaVendedor
FROM            dbo.ANuevosClientes INNER JOIN
                         dbo.ANuevosOportunidades ON dbo.ANuevosClientes.idCliente = dbo.ANuevosOportunidades.codCliente INNER JOIN
                         dbo.Vendedores ON dbo.ANuevosOportunidades.codVendedor = dbo.Vendedores.idVendedor INNER JOIN
                         dbo.Sucursales ON dbo.ANuevosOportunidades.codSucursal = dbo.Sucursales.IdSucursal INNER JOIN
                         dbo.Pmf ON dbo.ANuevosOportunidades.codPmf = dbo.Pmf.idPmf AND dbo.ANuevosOportunidades.codModelo = dbo.Pmf.codModelo INNER JOIN
                         dbo.ClasesOportunidad ON dbo.ANuevosOportunidades.codClase = dbo.ClasesOportunidad.idClase INNER JOIN
                         dbo.EstatusOportunidad ON dbo.ANuevosOportunidades.IdStatusOportunidad = dbo.EstatusOportunidad.IdEstatusOportunidad LEFT OUTER JOIN
                         dbo.PropuestaNegocio ON dbo.ANuevosOportunidades.codCliente = dbo.PropuestaNegocio.codCliente AND dbo.ANuevosOportunidades.idOportunidad = dbo.PropuestaNegocio.codOportunidad




GO
/****** Object:  Table [dbo].[Users]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[IDUser] [nvarchar](5) NOT NULL,
	[Description] [nvarchar](50) NOT NULL,
	[Salt] [nvarchar](16) NOT NULL,
	[Hash] [nvarchar](44) NOT NULL,
	[Correo] [nvarchar](50) NULL,
	[GRUPO] [nvarchar](50) NULL,
	[Activo] [bit] NULL,
	[Privilegio] [bit] NULL,
	[Nombre] [varchar](100) NULL,
	[LoginUser] [nvarchar](50) NULL,
	[PasswordUser] [varchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[IDUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  View [dbo].[LiderDelVendedor]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE VIEW [dbo].[LiderDelVendedor]
AS
SELECT        dbo.Vendedores.idVendedor, dbo.Vendedores.Nombre As NombreVendedor, dbo.Vendedores.Codigo, dbo.Vendedores.IDUSER, dbo.Users.[Description],  dbo.Lideres.idLider, dbo.Vendedores.SiglaLider, dbo.Lideres.Nombre AS NombreLider, dbo.Vendedores.IdSucursal, 
                         dbo.Sucursales.Nombre AS NombreSucursal, dbo.Vendedores.IDENTIFICACION, dbo.Vendedores.Habilitado
FROM            dbo.Vendedores INNER JOIN
                         dbo.Users ON dbo.Vendedores.IDUSER = dbo.Users.IDUser INNER JOIN
                         dbo.Sucursales ON dbo.Vendedores.IdSucursal = dbo.Sucursales.IdSucursal INNER JOIN
                         dbo.Lideres ON dbo.Vendedores.SiglaLider = dbo.Lideres.Codigo



GO
/****** Object:  View [dbo].[viewMaster_Financiero]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewMaster_Financiero]
AS
SELECT     dbo.ANuevosOportunidades.codCliente, dbo.ANuevosClientes.Nombre, dbo.ANuevosClientes.Contacto, dbo.ANuevosClientes.Telefonos, 
                      dbo.ANuevosClientes.TelefonoHab, dbo.ANuevosClientes.Celular, dbo.FUNC_PMF(dbo.ANuevosOportunidades.codPmf) AS nPMF, 
                      dbo.ANuevosOportunidades.Cantidad, dbo.ANuevosOportunidades.idOportunidad, dbo.fnSprintf(dbo.ANuevosOportunidades.codCliente, 
                      dbo.FUNC_TipoClienteMASCARA(dbo.ANuevosClientes.codTipo), '-') AS cCliente, dbo.FUNC_Vendedores(dbo.ANuevosOportunidades.codVendedor) 
                      AS nVendedor, dbo.ANuevosOportunidades.codStaFinanza, dbo.ANuevosOportunidades.ProxiLlamaFinanza, 
                      dbo.FUNC_EstatusFINANCIERO(dbo.ANuevosOportunidades.codStaFinanza) AS nEstatusFinancia
FROM         dbo.ANuevosOportunidades INNER JOIN
                      dbo.ANuevosClientes ON dbo.ANuevosOportunidades.codCliente = dbo.ANuevosClientes.idCliente

GO
/****** Object:  View [dbo].[viewElectroProximaLlama]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[viewElectroProximaLlama]
AS
SELECT     dbo.ElectroOportunidades.codCliente, dbo.ElectroClientes.Nombre, dbo.ElectroOportunidades.codVendedor, dbo.ElectroOportunidades.ProxiLlama, 
                      dbo.ElectroOportunidades.idOportunidad, dbo.ElectroOportunidades.Descripcion, dbo.ElectroClientes.Contacto, dbo.ElectroClientes.Telefonos, 
                      dbo.ElectroOportunidades.Cantidad, dbo.ElectroOportunidades.codSucursal
FROM         dbo.ElectroClientes INNER JOIN
                      dbo.ElectroOportunidades ON dbo.ElectroClientes.idCliente = dbo.ElectroOportunidades.codCliente

GO
/****** Object:  Table [dbo].[Acces_Segr]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Acces_Segr](
	[codPropuesta] [nvarchar](21) NOT NULL,
	[Sequencia] [int] NOT NULL,
	[idAcc_Seg] [nvarchar](50) NOT NULL,
	[Nombre] [nvarchar](100) NULL,
	[mPVenta] [decimal](18, 2) NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[Procesado] [int] NULL,
	[Fecha] [date] NULL,
 CONSTRAINT [PK_Acces_Segr] PRIMARY KEY CLUSTERED 
(
	[codPropuesta] ASC,
	[Sequencia] ASC,
	[idAcc_Seg] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Access_SegrSinInventario]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Access_SegrSinInventario](
	[codPropuesta] [nvarchar](21) NOT NULL,
	[Sequencia] [int] NOT NULL,
	[idAcc_Seg] [nvarchar](50) NOT NULL,
	[Nombre] [nvarchar](100) NULL,
	[mPVenta] [decimal](18, 2) NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[Procesado] [int] NULL,
	[Fecha] [date] NULL,
	[Servicio] [bit] NULL,
 CONSTRAINT [PK_Access_SegrSinInventario] PRIMARY KEY CLUSTERED 
(
	[codPropuesta] ASC,
	[Sequencia] ASC,
	[idAcc_Seg] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Administrator]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Administrator](
	[Salt] [nvarchar](16) NULL,
	[Hash] [nvarchar](44) NULL,
	[SaltS] [nvarchar](16) NULL,
	[HashS] [nvarchar](44) NULL,
	[SaltC] [nvarchar](16) NULL,
	[HashC] [nvarchar](44) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[anuevasOportunidades_BACK]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[anuevasOportunidades_BACK](
	[codCliente] [nvarchar](30) NOT NULL,
	[idOportunidad] [int] NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Cantidad] [int] NULL,
	[codBanco] [nvarchar](5) NULL,
	[Prima] [nvarchar](50) NULL,
	[codVisita] [int] NULL,
	[VehiculosTiene] [nvarchar](350) NULL,
	[ProxiLlama] [smalldatetime] NULL,
	[codMotivo] [nvarchar](5) NULL,
	[codLider] [nvarchar](5) NULL,
	[codVendedor] [nvarchar](5) NULL,
	[cFechaApertura] [smalldatetime] NULL,
	[cFechaCierre] [smalldatetime] NULL,
	[PruebaManejo] [bit] NULL,
	[codSucursal] [nvarchar](5) NULL,
	[Procesado] [bit] NULL,
	[codModelo] [nvarchar](5) NULL,
	[codPmf] [nvarchar](5) NULL,
	[codPerdida] [nvarchar](5) NULL,
	[codVendeOrigen] [nvarchar](5) NULL,
	[NombreVendeOrigen] [nvarchar](50) NULL,
	[codClase] [nvarchar](5) NULL,
	[cFechaHistorico] [datetime] NULL,
	[ProxiLlamaLider] [datetime] NULL,
	[codStaDAC] [nvarchar](5) NULL,
	[codStaLIDER] [nvarchar](5) NULL,
	[ProxiLlamaDAC] [datetime] NULL,
	[codStaFinanza] [nvarchar](5) NULL,
	[ProxiLlamaFinanza] [datetime] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosLlamadasDACRespaldo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadasDACRespaldo](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[Revisado] [bit] NULL,
	[codDAC] [nvarchar](5) NULL,
	[IDLlamada] [int] NULL,
	[ROW_ID] [int] NOT NULL,
	[cProxiLlama] [datetime] NULL,
	[codStaDAC] [nvarchar](5) NULL,
	[Nombre] [nvarchar](50) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosLlamadasEvaluador]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadasEvaluador](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [date] NULL,
	[Referencias] [nvarchar](100) NULL,
	[Hora] [time](7) NULL,
	[Revisado] [bit] NULL,
	[codEstaVende] [nvarchar](50) NULL,
	[Nombre] [nvarchar](100) NULL,
	[cProxiLlama] [date] NULL,
	[Visita] [bit] NULL,
	[Llamada] [bit] NULL,
	[Avaluo] [bit] NULL,
	[Importancia] [bit] NULL,
	[Correo] [bit] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AnuevosLlamadasFinanciero]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnuevosLlamadasFinanciero](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[IDLlamada] [int] NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[cProxiLlama] [datetime] NULL,
 CONSTRAINT [PK_AnuevosLlamadasFinanciero] PRIMARY KEY CLUSTERED 
(
	[codClientes] ASC,
	[codOportunidad] ASC,
	[cFecha] ASC,
	[Hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosLlamadasLiderRespaldo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadasLiderRespaldo](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[Revisado] [bit] NULL,
	[IDLlamada] [int] NULL,
	[cProxiLlama] [datetime] NULL,
	[ROW_ID] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosLlamadasRecompraDAC]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadasRecompraDAC](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[Revisado] [bit] NULL,
	[codDAC] [nvarchar](5) NULL,
	[IDLlamada] [int] NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[cProxiLlama] [datetime] NULL,
	[codStaDAC] [nvarchar](5) NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_ANuevosLlamadasRecompraDAC] PRIMARY KEY CLUSTERED 
(
	[codClientes] ASC,
	[codOportunidad] ASC,
	[cFecha] ASC,
	[Hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosLlamadasRespaldo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadasRespaldo](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[Revisado] [bit] NULL,
	[IDLlamada] [int] NULL,
	[ROW_ID] [int] NOT NULL,
	[cProxiLlama] [datetime] NULL,
	[codEstaVende] [nvarchar](5) NULL,
	[Nombre] [nvarchar](150) NULL,
	[ComentRevisado] [text] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AnuevosLlamadasSuperDAC]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AnuevosLlamadasSuperDAC](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[IDLlamada] [int] NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_AnuevosLlamadasSuperDAC] PRIMARY KEY CLUSTERED 
(
	[codClientes] ASC,
	[codOportunidad] ASC,
	[cFecha] ASC,
	[Hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosLlamadasTELEMARKETING]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosLlamadasTELEMARKETING](
	[codClientes] [nvarchar](30) NOT NULL,
	[codOportunidad] [int] NOT NULL,
	[cFecha] [smalldatetime] NOT NULL,
	[Referencias] [text] NULL,
	[Hora] [datetime] NOT NULL,
	[Revisado] [bit] NULL,
	[codDAC] [nvarchar](5) NULL,
	[IDLlamada] [int] NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[cProxiLlama] [datetime] NULL,
	[codStaDAC] [nvarchar](5) NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_ANuevosLlamadasTELEMARKETING] PRIMARY KEY CLUSTERED 
(
	[codClientes] ASC,
	[codOportunidad] ASC,
	[cFecha] ASC,
	[Hora] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ANuevosOportunidadesRespaldo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ANuevosOportunidadesRespaldo](
	[codCliente] [nvarchar](30) NOT NULL,
	[idOportunidad] [int] NOT NULL,
	[Descripcion] [nvarchar](500) NULL,
	[Cantidad] [int] NULL,
	[codBanco] [nvarchar](5) NULL,
	[Prima] [nvarchar](50) NULL,
	[codVisita] [int] NULL,
	[VehiculosTiene] [nvarchar](350) NULL,
	[ProxiLlama] [smalldatetime] NULL,
	[codMotivo] [nvarchar](5) NULL,
	[codLider] [nvarchar](5) NULL,
	[codVendedor] [nvarchar](5) NULL,
	[cFechaApertura] [smalldatetime] NULL,
	[cFechaCierre] [smalldatetime] NULL,
	[PruebaManejo] [bit] NULL,
	[codSucursal] [nvarchar](5) NULL,
	[Procesado] [bit] NULL,
	[codModelo] [nvarchar](5) NULL,
	[codPmf] [nvarchar](5) NULL,
	[codPerdida] [nvarchar](5) NULL,
	[codVendeOrigen] [nvarchar](5) NULL,
	[NombreVendeOrigen] [nvarchar](50) NULL,
	[codClase] [nvarchar](5) NULL,
	[cFechaHistorico] [datetime] NULL,
	[ProxiLlamaLider] [datetime] NULL,
	[codStaDAC] [nvarchar](5) NULL,
	[codStaLIDER] [nvarchar](5) NULL,
	[ProxiLlamaDAC] [datetime] NULL,
	[codStaFinanza] [nvarchar](5) NULL,
	[ProxiLlamaFinanza] [datetime] NULL,
	[Hora_Op] [datetime] NULL,
	[ProxiLlamaTELE] [datetime] NULL,
	[codStaTELE] [nvarchar](5) NULL,
	[VentaPerdida] [bit] NULL,
	[Observacion] [varchar](max) NULL,
	[Version] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Auditoria_ANuevosClientes]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auditoria_ANuevosClientes](
	[IdReferencia] [bigint] IDENTITY(1,1) NOT NULL,
	[idCliente] [nvarchar](30) NULL,
	[codTipo] [nvarchar](5) NULL,
	[Nombre] [nvarchar](250) NULL,
	[Direccion] [nvarchar](430) NULL,
	[Contacto] [nvarchar](250) NULL,
	[FechaApertura] [smalldatetime] NULL,
	[Telefonos] [nvarchar](50) NULL,
	[Edad] [int] NULL,
	[Sexo] [int] NULL,
	[EstaCivil] [nvarchar](5) NULL,
	[Ingresos] [decimal](18, 2) NULL,
	[codUser] [nvarchar](5) NULL,
	[Procesado] [bit] NULL,
	[Email] [nvarchar](50) NULL,
	[TelefonoHab] [nvarchar](20) NULL,
	[Celular] [nvarchar](20) NULL,
	[codDepto] [int] NULL,
	[codMuni] [int] NULL,
	[Ocupacion] [nvarchar](150) NULL,
	[codSucursal] [nvarchar](5) NULL,
	[ImagenDireccion] [nvarchar](150) NULL,
	[Fax] [nvarchar](20) NULL,
	[Revisado] [bit] NULL,
	[UserRevisado] [nvarchar](50) NULL,
	[ComentRevisado] [text] NULL,
	[Hora_Apertura] [datetime] NULL,
	[INDESEABLE] [bit] NULL,
	[MODIFICADO_POR] [nchar](5) NULL,
	[MODIFICADO_EL] [datetime] NULL,
	[Persona] [nvarchar](50) NULL,
	[PEP] [nvarchar](10) NULL,
	[Email2] [nvarchar](75) NULL,
	[Email3] [nvarchar](75) NULL,
	[FechaRegistro] [datetime] NOT NULL,
	[Equipo] [varchar](100) NOT NULL,
	[UsuarioID] [int] NULL,
	[Operacion] [varchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Auditoria_ANuevosOportunidades]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Auditoria_ANuevosOportunidades](
	[IdReferencia] [bigint] IDENTITY(1,1) NOT NULL,
	[codCliente] [nvarchar](30) NULL,
	[idOportunidad] [int] NULL,
	[Descripcion] [varchar](max) NULL,
	[Cantidad] [int] NULL,
	[codBanco] [nvarchar](5) NULL,
	[Prima] [nvarchar](50) NULL,
	[codVisita] [int] NULL,
	[VehiculosTiene] [nvarchar](350) NULL,
	[ProxiLlama] [smalldatetime] NULL,
	[codMotivo] [nvarchar](5) NULL,
	[codLider] [nvarchar](5) NULL,
	[codVendedor] [nvarchar](5) NULL,
	[cFechaApertura] [smalldatetime] NULL,
	[cFechaCierre] [smalldatetime] NULL,
	[PruebaManejo] [bit] NULL,
	[codSucursal] [nvarchar](5) NULL,
	[Procesado] [bit] NULL,
	[codModelo] [nvarchar](5) NULL,
	[codPmf] [nvarchar](5) NULL,
	[codPerdida] [nvarchar](5) NULL,
	[codVendeOrigen] [nvarchar](5) NULL,
	[NombreVendeOrigen] [nvarchar](50) NULL,
	[codClase] [nvarchar](5) NULL,
	[cFechaHistorico] [datetime] NULL,
	[ProxiLlamaLider] [datetime] NULL,
	[codStaDAC] [nvarchar](5) NULL,
	[codStaLIDER] [nvarchar](5) NULL,
	[ProxiLlamaDAC] [datetime] NULL,
	[codStaFinanza] [nvarchar](5) NULL,
	[ProxiLlamaFinanza] [datetime] NULL,
	[Hora_Op] [datetime] NULL,
	[ProxiLlamaTELE] [datetime] NULL,
	[codStaTELE] [nvarchar](5) NULL,
	[VentaPerdida] [bit] NULL,
	[Observacion] [varchar](max) NULL,
	[Version] [int] NULL,
	[VentaPerdidaLider] [bit] NULL,
	[CONTACTOOPORTUNIDAD] [varchar](100) NULL,
	[DIRECCIONOPORTUNIDAD] [varchar](max) NULL,
	[CELULAROPORTUNIDAD] [varchar](100) NULL,
	[TELEFONOOPORTUNIDAD] [varchar](100) NULL,
	[Programado] [bit] NULL,
	[FechaRegistro] [datetime] NOT NULL,
	[Equipo] [varchar](100) NOT NULL,
	[UsuarioID] [int] NULL,
	[Operacion] [varchar](50) NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CamposTecGene]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CamposTecGene](
	[Tipo] [int] NOT NULL,
	[idCampo] [nvarchar](50) NOT NULL,
	[Texto] [nvarchar](250) NULL,
	[Orden] [int] NULL,
 CONSTRAINT [PK_CamposTecGene] PRIMARY KEY CLUSTERED 
(
	[Tipo] ASC,
	[idCampo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CataAccesorios]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CataAccesorios](
	[idAcceso] [nvarchar](50) NOT NULL,
	[Nombre] [nvarchar](250) NULL,
 CONSTRAINT [PK_CataAccesorios] PRIMARY KEY CLUSTERED 
(
	[idAcceso] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CatalogoServicio]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoServicio](
	[IdServicio] [varchar](50) NOT NULL,
	[NombreServicio] [varchar](100) NOT NULL,
	[Precio] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_CatalogoServicio] PRIMARY KEY CLUSTERED 
(
	[IdServicio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CataTipoPropuesta]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CataTipoPropuesta](
	[idTipoP] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_CataTipoPropuesta] PRIMARY KEY CLUSTERED 
(
	[idTipoP] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[COMBO]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMBO](
	[IDCOMBO] [int] IDENTITY(1,1) NOT NULL,
	[NOMCOMBO] [varchar](50) NOT NULL,
	[NOMMODELO] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDCOMBO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[COMBOLINEAS]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[COMBOLINEAS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CODIGO] [varchar](31) NOT NULL,
	[IDCOMBO] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Comentarios]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comentarios](
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[FIRST] [varchar](100) NULL,
	[SECOND] [varchar](100) NULL,
	[THIRD] [varchar](100) NULL,
	[NIVEL] [int] NULL,
	[ACTIVE] [bit] NULL,
	[COMENT] [varchar](max) NULL,
 CONSTRAINT [PK_Comentarios] PRIMARY KEY CLUSTERED 
(
	[ROW_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ConfigCantLlamadas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConfigCantLlamadas](
	[ID] [nvarchar](50) NOT NULL,
	[Cantidad] [int] NULL,
 CONSTRAINT [PK_ConfigCantLlamadas] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Consecutivos]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consecutivos](
	[IdDocumento] [nvarchar](5) NULL,
	[Numero] [nvarchar](21) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Consecutivos2]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Consecutivos2](
	[Documento] [varchar](50) NOT NULL,
	[Consecutivo] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Consecutivos2] PRIMARY KEY CLUSTERED 
(
	[Documento] ASC,
	[Consecutivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CONSECUTIVOTEM]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CONSECUTIVOTEM](
	[Documento] [varchar](50) NOT NULL,
	[Consecutivo] [varchar](50) NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Cotizacion]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cotizacion](
	[IdCotizacion] [nvarchar](21) NOT NULL,
	[codPropuesta] [nvarchar](21) NOT NULL,
	[codCliente] [nvarchar](30) NULL,
	[codOportunidad] [int] NULL,
	[Nombre] [nvarchar](250) NULL,
	[nPMF] [nvarchar](250) NULL,
	[Fecha] [datetime] NULL,
	[Contacto] [nvarchar](250) NULL,
	[codVendedor] [nvarchar](5) NULL,
	[NombreVendedor] [nvarchar](50) NULL,
	[codLider] [nvarchar](5) NULL,
	[NombreLider] [nvarchar](50) NULL,
	[codPMF] [nvarchar](5) NULL,
	[codModelo] [nvarchar](5) NULL,
	[nModelo] [nvarchar](50) NULL,
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[Precio_Lista] [float] NULL,
 CONSTRAINT [PK_Cotizacion] PRIMARY KEY CLUSTERED 
(
	[IdCotizacion] ASC,
	[codPropuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DAC]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DAC](
	[idDAC] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Baja] [bit] NULL,
 CONSTRAINT [PK_DAC] PRIMARY KEY CLUSTERED 
(
	[idDAC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DetallePruebaDeManejo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetallePruebaDeManejo](
	[codCliente] [nvarchar](30) NOT NULL,
	[idOportunidad] [int] NOT NULL,
	[codPmf] [nvarchar](5) NOT NULL,
	[dispLlaves] [bit] NOT NULL,
	[buenaCarroceria] [bit] NOT NULL,
	[buenasLlantas] [bit] NOT NULL,
	[limpio] [bit] NOT NULL,
	[buenOlor] [bit] NOT NULL,
	[encendio] [bit] NOT NULL,
 CONSTRAINT [PK_GrupPruebaManejo] PRIMARY KEY CLUSTERED 
(
	[codCliente] ASC,
	[idOportunidad] ASC,
	[codPmf] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DiasFeriado]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiasFeriado](
	[IdDiaFeriado] [int] IDENTITY(1,1) NOT NULL,
	[Dia] [int] NOT NULL,
	[Mes] [int] NOT NULL,
 CONSTRAINT [PK_DiasFeriado] PRIMARY KEY CLUSTERED 
(
	[IdDiaFeriado] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ertableNOTIFICAONES]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ertableNOTIFICAONES](
	[IDREGISTRO] [int] IDENTITY(1,1) NOT NULL,
	[idCliente] [varchar](50) NOT NULL,
	[NoCORREO] [int] NOT NULL,
	[SMS] [varchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IDREGISTRO] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[idCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Especificaciones]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especificaciones](
	[idEspeci] [nvarchar](20) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_Especificaciones] PRIMARY KEY CLUSTERED 
(
	[idEspeci] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EstatusDAC]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstatusDAC](
	[idStaDAC] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_EstatusDAC] PRIMARY KEY CLUSTERED 
(
	[idStaDAC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EstatusFINANCIERO]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstatusFINANCIERO](
	[idStaFinanza] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
 CONSTRAINT [PK_EstatusFINANCIERO] PRIMARY KEY CLUSTERED 
(
	[idStaFinanza] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[EstatusLIDER]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstatusLIDER](
	[idStaLider] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Visible] [bit] NULL,
 CONSTRAINT [PK_EstatusLIDER] PRIMARY KEY CLUSTERED 
(
	[idStaLider] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[jjmayorga]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[jjmayorga](
	[idUser] [nvarchar](5) NOT NULL,
	[ToolStrip] [nvarchar](100) NOT NULL,
	[TextStrip] [nvarchar](250) NOT NULL,
	[Permitir] [bit] NOT NULL,
	[ParentText] [nvarchar](250) NOT NULL,
	[idMenuStrip] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Modelos]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Modelos](
	[idModelo] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Activo] [char](1) NULL,
	[EMPRESA] [varchar](50) NULL,
 CONSTRAINT [PK_Modelos] PRIMARY KEY CLUSTERED 
(
	[idModelo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NETFechaActual]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NETFechaActual](
	[cFecha] [smalldatetime] NULL,
	[cHora] [smalldatetime] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NETMenu_Permises]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NETMenu_Permises](
	[idUser] [nvarchar](5) NOT NULL,
	[ToolStrip] [nvarchar](100) NOT NULL,
	[TextStrip] [nvarchar](250) NOT NULL,
	[Permitir] [bit] NOT NULL,
	[ParentText] [nvarchar](250) NOT NULL,
	[idMenuStrip] [int] NOT NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[RatesExchange]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RatesExchange](
	[Fecha] [smalldatetime] NOT NULL,
	[Valor] [real] NOT NULL,
 CONSTRAINT [PK_RatesExchange] PRIMARY KEY CLUSTERED 
(
	[Fecha] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Roles]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[rolId] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[active] [bit] NOT NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[rolId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_COMENTARIOS]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_COMENTARIOS](
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[NOMBRE] [varchar](100) NOT NULL,
	[NIVEL] [int] NOT NULL,
	[ACTIVE] [bit] NOT NULL,
	[COMENTARIOS] [varchar](200) NOT NULL,
 CONSTRAINT [PK_T_COMENTARIOS] PRIMARY KEY CLUSTERED 
(
	[ROW_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_er_MATRIS_DE_TIEMPO]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_er_MATRIS_DE_TIEMPO](
	[IDREGISTRO] [int] IDENTITY(1,1) NOT NULL,
	[TIMEINICIAL] [datetime] NOT NULL,
	[NOM_CLIENTE] [varchar](200) NOT NULL,
	[MOTIVO] [varchar](10) NOT NULL,
	[COD_VENDEDOR] [nvarchar](5) NOT NULL,
	[COD_LIDER] [nvarchar](5) NOT NULL,
	[F1] [datetime] NULL,
	[F2] [datetime] NULL,
	[F3] [datetime] NULL,
	[F4] [datetime] NULL,
	[F5] [datetime] NULL,
	[F6] [datetime] NULL,
	[F7] [datetime] NULL,
	[TOTALTIME] [int] NULL,
	[idCliente] [nvarchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[TIMEINICIAL] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[T_VENTASPERDIDAS]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_VENTASPERDIDAS](
	[ROW_ID] [int] IDENTITY(1,1) NOT NULL,
	[codcliente] [varchar](50) NOT NULL,
	[codoportunidad] [int] NOT NULL,
	[cliente] [varchar](max) NOT NULL,
	[contacto] [varchar](max) NOT NULL,
	[fechaapertura] [date] NOT NULL,
	[codvendedor] [int] NOT NULL,
	[codlider] [int] NOT NULL,
	[codmodelo] [int] NOT NULL,
	[comentariovendedor] [varchar](max) NOT NULL,
	[comentariolider] [varchar](max) NOT NULL,
	[fecha] [date] NOT NULL,
 CONSTRAINT [PK_T_VENTASPERDIDAS] PRIMARY KEY CLUSTERED 
(
	[ROW_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TecnicasCaracteristicasPMF]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TecnicasCaracteristicasPMF](
	[codPMF] [nvarchar](5) NOT NULL,
	[Tipo] [int] NOT NULL,
	[Id] [int] NOT NULL,
	[Caracteristica] [text] NULL,
 CONSTRAINT [PK_TecnicasCaracteristicasPMF] PRIMARY KEY CLUSTERED 
(
	[codPMF] ASC,
	[Tipo] ASC,
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TecnicasGeneralesPMF]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TecnicasGeneralesPMF](
	[codModelo] [nvarchar](5) NOT NULL,
	[idCampo] [nvarchar](50) NOT NULL,
	[Texto] [nvarchar](250) NULL,
	[Activado] [bit] NULL,
	[Orden] [int] NULL,
 CONSTRAINT [PK_TecnicasGeneralesPMF] PRIMARY KEY CLUSTERED 
(
	[codModelo] ASC,
	[idCampo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Temp_Histo]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Temp_Histo](
	[codCliente] [nvarchar](30) NULL,
	[codOportunidad] [int] NULL,
	[Cantidad] [int] NULL,
	[Banco] [nvarchar](50) NULL,
	[Prima] [nvarchar](50) NULL,
	[Lider] [nvarchar](50) NULL,
	[Vendedor] [nvarchar](50) NULL,
	[Sucursal] [nvarchar](50) NULL,
	[cProxiLlama] [datetime] NOT NULL,
	[cFechaHisto] [datetime] NULL,
	[PMF] [nvarchar](50) NULL,
	[Modelo] [nvarchar](50) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TEMP_PMF]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TEMP_PMF](
	[idPmf] [nvarchar](5) NOT NULL,
	[codModelo] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](250) NULL,
	[Observacion] [nvarchar](250) NULL,
	[Ano] [int] NULL,
	[Motor] [nvarchar](250) NULL,
	[Potencia] [nvarchar](250) NULL,
	[CajaVelocidad] [nvarchar](250) NULL,
	[Transmision] [nvarchar](250) NULL,
	[SuspDelantera] [nvarchar](250) NULL,
	[SuspTrasera] [nvarchar](250) NULL,
	[AmorDelantera] [nvarchar](250) NULL,
	[AmorTrasera] [nvarchar](250) NULL,
	[SistFrenos] [nvarchar](250) NULL,
	[SisteDireccion] [nvarchar](250) NULL,
	[CapaTanqueCombustible] [nvarchar](250) NULL,
	[CapaCargaTina] [nvarchar](250) NULL,
	[CapaPasajeros] [nvarchar](50) NULL,
	[NPuertas] [nvarchar](50) NULL,
	[PaisOrigen] [nvarchar](250) NULL,
	[Llantas] [nvarchar](250) NULL,
	[Combustible] [nvarchar](250) NULL,
	[Precio_Lista] [float] NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TipoCambioDolar]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoCambioDolar](
	[IdTipoCambio] [int] IDENTITY(1,1) NOT NULL,
	[TipoCambio] [varchar](50) NOT NULL,
	[FechaRegistrada] [datetime] NOT NULL,
 CONSTRAINT [PK_TipoCambio] PRIMARY KEY CLUSTERED 
(
	[IdTipoCambio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TipoCategoria]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoCategoria](
	[IdTipoCategoria] [int] IDENTITY(1,1) NOT NULL,
	[Description] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoCategoria] PRIMARY KEY CLUSTERED 
(
	[IdTipoCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TRMP_MODELOS]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRMP_MODELOS](
	[idModelo] [nvarchar](5) NOT NULL,
	[Nombre] [nvarchar](50) NULL,
	[Activo] [char](1) NULL
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UnionesLlamadas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UnionesLlamadas](
	[IDLlamada] [int] NULL,
	[codClientes] [nvarchar](30) NULL,
	[codOportunidad] [int] NULL,
	[Fecha] [datetime] NULL,
	[ComentarioVende] [nvarchar](max) NULL,
	[ComentarioDAC] [nvarchar](max) NULL,
	[ComentarioLider] [nvarchar](max) NULL,
	[Hora] [datetime] NULL,
	[IDMaster] [nvarchar](max) NULL,
	[HoraDAC] [datetime] NULL,
	[HoraLider] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[UserId] [int] NOT NULL,
	[rolId] [int] NOT NULL,
 CONSTRAINT [PK_RolesUsers] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[rolId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[VentaPerdida]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VentaPerdida](
	[codCliente] [nvarchar](30) NOT NULL,
	[idOportunidad] [int] NOT NULL,
	[Nombre] [nvarchar](250) NOT NULL,
	[Contacto] [nvarchar](250) NOT NULL,
	[cFechaApertura] [smalldatetime] NULL,
	[codVendedor] [nvarchar](5) NULL,
	[codLider] [nvarchar](5) NULL,
	[codModelo] [nvarchar](5) NULL,
	[ProxiLlama] [smalldatetime] NULL,
	[ComentVendedor] [varchar](max) NULL,
	[ComentLider] [varchar](max) NULL,
	[Fecha] [date] NULL,
 CONSTRAINT [PK_VentaPerdida] PRIMARY KEY CLUSTERED 
(
	[codCliente] ASC,
	[idOportunidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Visita]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Visita](
	[IdVisita] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](50) NOT NULL,
	[Habilitado] [bit] NOT NULL,
 CONSTRAINT [PK_Visita] PRIMARY KEY CLUSTERED 
(
	[IdVisita] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[ANuevosClientes] ADD  CONSTRAINT [DF_ANuevosClientes_Hora_Apertura]  DEFAULT (getdate()) FOR [Hora_Apertura]
GO
ALTER TABLE [dbo].[ANuevosLlamadas] ADD  CONSTRAINT [DF_ANuevosLlamadas_IDLlamada]  DEFAULT ((1)) FOR [IDLlamada]
GO
ALTER TABLE [dbo].[ANuevosLlamadas] ADD  CONSTRAINT [DF_ANuevosLlamadas_Importancia]  DEFAULT ((0)) FOR [Importancia]
GO
ALTER TABLE [dbo].[ANuevosLlamadasDAC] ADD  CONSTRAINT [DF_ANuevosLlamadasDAC_IDLlamada]  DEFAULT ((2)) FOR [IDLlamada]
GO
ALTER TABLE [dbo].[AnuevosLlamadasFinanciero] ADD  CONSTRAINT [DF_AnuevosLlamadasFinanciero_IDLlamada]  DEFAULT ((4)) FOR [IDLlamada]
GO
ALTER TABLE [dbo].[ANuevosLlamadasLider] ADD  CONSTRAINT [DF_ANuevosLlamadasLider_IDLlamada]  DEFAULT ((3)) FOR [IDLlamada]
GO
ALTER TABLE [dbo].[ANuevosLlamadasRecompraDAC] ADD  CONSTRAINT [DF_ANuevosLlamadasRecompraDAC_IDLlamada]  DEFAULT ((2)) FOR [IDLlamada]
GO
ALTER TABLE [dbo].[AnuevosLlamadasSuperDAC] ADD  CONSTRAINT [DF_AnuevosLlamadasSuperDAC_IDLlamada]  DEFAULT ((5)) FOR [IDLlamada]
GO
ALTER TABLE [dbo].[ANuevosLlamadasTELEMARKETING] ADD  CONSTRAINT [DF_ANuevosLlamadasTELEMARKETING_IDLlamada]  DEFAULT ((2)) FOR [IDLlamada]
GO
ALTER TABLE [dbo].[ANuevosOportunidades] ADD  CONSTRAINT [DF_Oportunidades2_Cantidad]  DEFAULT ((0)) FOR [Cantidad]
GO
ALTER TABLE [dbo].[ANuevosOportunidades] ADD  CONSTRAINT [DF_Oportunidades2_Prima]  DEFAULT ((0)) FOR [Prima]
GO
ALTER TABLE [dbo].[ANuevosOportunidades] ADD  CONSTRAINT [DF_ANuevosOportunidades_codStaDAC]  DEFAULT ('0') FOR [codStaDAC]
GO
ALTER TABLE [dbo].[ANuevosOportunidades] ADD  CONSTRAINT [DF_ANuevosOportunidades_codStaLIDER]  DEFAULT ('0') FOR [codStaLIDER]
GO
ALTER TABLE [dbo].[ANuevosOportunidades] ADD  CONSTRAINT [DF_ANuevosOportunidades_codStaFinanza]  DEFAULT ((0)) FOR [codStaFinanza]
GO
ALTER TABLE [dbo].[ANuevosOportunidades] ADD  CONSTRAINT [DF_ANuevosOportunidades_Hora_Oportunidad]  DEFAULT (getdate()) FOR [Hora_Op]
GO
ALTER TABLE [dbo].[ANuevosOportunidades] ADD  CONSTRAINT [DF_ANuevosOportunidades_codStaTELE]  DEFAULT ('0') FOR [codStaTELE]
GO
ALTER TABLE [dbo].[ClasesOportunidad] ADD  CONSTRAINT [DF_ClasesOportunidad_Plasma]  DEFAULT ((0)) FOR [Plasma]
GO
ALTER TABLE [dbo].[ConfigCantLlamadas] ADD  CONSTRAINT [DF_ConfigCantLlamadas_Cantidad]  DEFAULT ((0)) FOR [Cantidad]
GO
ALTER TABLE [dbo].[Cotizacion] ADD  CONSTRAINT [DF_Cotizacion_Precio_Lista]  DEFAULT ((0)) FOR [Precio_Lista]
GO
ALTER TABLE [dbo].[Lideres] ADD  CONSTRAINT [DF_Lideres_Codigo]  DEFAULT ('') FOR [Codigo]
GO
ALTER TABLE [dbo].[Modelos] ADD  CONSTRAINT [DF_Modelos_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Municipios] ADD  CONSTRAINT [DF_Municipios_active]  DEFAULT ((1)) FOR [active]
GO
ALTER TABLE [dbo].[Pmf] ADD  CONSTRAINT [DF_Pmf_Precio_Lista]  DEFAULT ((0)) FOR [Precio_Lista]
GO
ALTER TABLE [dbo].[PropuestaNegocio] ADD  CONSTRAINT [DF_PropuestaNegocio_Tipo]  DEFAULT ((1)) FOR [Tipo]
GO
ALTER TABLE [dbo].[T_COMENTARIOS] ADD  CONSTRAINT [DF_T_COMENTARIOS_ACTIVE]  DEFAULT ((1)) FOR [ACTIVE]
GO
ALTER TABLE [dbo].[T_er_MATRIS_DE_TIEMPO] ADD  CONSTRAINT [DF_TOTALTIME]  DEFAULT ((0)) FOR [TOTALTIME]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Salt]  DEFAULT (N'NBGuH4HKQjtEpt4=') FOR [Salt]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Hash]  DEFAULT (N'TgN4pmBNMnJZWTrbvD9xR3b5edoabEV0mAtKNtxJUL8=') FOR [Hash]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_Activo]  DEFAULT ((1)) FOR [Activo]
GO
ALTER TABLE [dbo].[Vendedores] ADD  CONSTRAINT [DF_Vendedores_Codigo]  DEFAULT ('') FOR [Codigo]
GO
ALTER TABLE [dbo].[VentaPerdida] ADD  CONSTRAINT [DF_VentaPerdida_Fecha]  DEFAULT (getdate()) FOR [Fecha]
GO
ALTER TABLE [dbo].[Acces_Segr]  WITH CHECK ADD  CONSTRAINT [FK_Acces_Segr_PropuestaNegocio] FOREIGN KEY([codPropuesta])
REFERENCES [dbo].[PropuestaNegocio] ([idPropuesta])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Acces_Segr] CHECK CONSTRAINT [FK_Acces_Segr_PropuestaNegocio]
GO
ALTER TABLE [dbo].[ANuevosClientes]  WITH CHECK ADD  CONSTRAINT [FK_Clientes2_EstadoCivil] FOREIGN KEY([EstaCivil])
REFERENCES [dbo].[EstadoCivil] ([idCivil])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosClientes] CHECK CONSTRAINT [FK_Clientes2_EstadoCivil]
GO
ALTER TABLE [dbo].[ANuevosClientes]  WITH CHECK ADD  CONSTRAINT [FK_Clientes2_Municipios] FOREIGN KEY([codMuni], [codDepto])
REFERENCES [dbo].[Municipios] ([idMuni], [codDepto])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosClientes] CHECK CONSTRAINT [FK_Clientes2_Municipios]
GO
ALTER TABLE [dbo].[ANuevosClientes]  WITH CHECK ADD  CONSTRAINT [FK_Clientes2_TipoCliente] FOREIGN KEY([codTipo])
REFERENCES [dbo].[TipoCliente] ([idTipo])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosClientes] CHECK CONSTRAINT [FK_Clientes2_TipoCliente]
GO
ALTER TABLE [dbo].[ANuevosLlamadasDAC]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosLlamadasDAC_ANuevosOportunidades] FOREIGN KEY([codClientes], [codOportunidad])
REFERENCES [dbo].[ANuevosOportunidades] ([codCliente], [idOportunidad])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosLlamadasDAC] CHECK CONSTRAINT [FK_ANuevosLlamadasDAC_ANuevosOportunidades]
GO
ALTER TABLE [dbo].[ANuevosLlamadasDAC]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosLlamadasDAC_DAC] FOREIGN KEY([codDAC])
REFERENCES [dbo].[DAC] ([idDAC])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosLlamadasDAC] CHECK CONSTRAINT [FK_ANuevosLlamadasDAC_DAC]
GO
ALTER TABLE [dbo].[AnuevosLlamadasFinanciero]  WITH CHECK ADD  CONSTRAINT [FK_AnuevosLlamadasFinanciero_ANuevosOportunidades] FOREIGN KEY([codClientes], [codOportunidad])
REFERENCES [dbo].[ANuevosOportunidades] ([codCliente], [idOportunidad])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[AnuevosLlamadasFinanciero] CHECK CONSTRAINT [FK_AnuevosLlamadasFinanciero_ANuevosOportunidades]
GO
ALTER TABLE [dbo].[ANuevosLlamadasLider]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosLlamadasLider_ANuevosOportunidades] FOREIGN KEY([codClientes], [codOportunidad])
REFERENCES [dbo].[ANuevosOportunidades] ([codCliente], [idOportunidad])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosLlamadasLider] CHECK CONSTRAINT [FK_ANuevosLlamadasLider_ANuevosOportunidades]
GO
ALTER TABLE [dbo].[ANuevosLlamadasRecompraDAC]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosLlamadasRecompraDAC_ANuevosOportunidades] FOREIGN KEY([codClientes], [codOportunidad])
REFERENCES [dbo].[ANuevosOportunidades] ([codCliente], [idOportunidad])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosLlamadasRecompraDAC] CHECK CONSTRAINT [FK_ANuevosLlamadasRecompraDAC_ANuevosOportunidades]
GO
ALTER TABLE [dbo].[ANuevosLlamadasRecompraDAC]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosLlamadasRecompraDAC_DAC] FOREIGN KEY([codDAC])
REFERENCES [dbo].[DAC] ([idDAC])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosLlamadasRecompraDAC] CHECK CONSTRAINT [FK_ANuevosLlamadasRecompraDAC_DAC]
GO
ALTER TABLE [dbo].[AnuevosLlamadasSuperDAC]  WITH CHECK ADD  CONSTRAINT [FK_AnuevosLlamadasSuperDAC_ANuevosOportunidades] FOREIGN KEY([codClientes], [codOportunidad])
REFERENCES [dbo].[ANuevosOportunidades] ([codCliente], [idOportunidad])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[AnuevosLlamadasSuperDAC] CHECK CONSTRAINT [FK_AnuevosLlamadasSuperDAC_ANuevosOportunidades]
GO
ALTER TABLE [dbo].[ANuevosLlamadasTELEMARKETING]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosLlamadasTELEMARKETING_ANuevosOportunidades] FOREIGN KEY([codClientes], [codOportunidad])
REFERENCES [dbo].[ANuevosOportunidades] ([codCliente], [idOportunidad])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosLlamadasTELEMARKETING] CHECK CONSTRAINT [FK_ANuevosLlamadasTELEMARKETING_ANuevosOportunidades]
GO
ALTER TABLE [dbo].[ANuevosLlamadasTELEMARKETING]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosLlamadasTELEMARKETING_DAC] FOREIGN KEY([codDAC])
REFERENCES [dbo].[DAC] ([idDAC])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosLlamadasTELEMARKETING] CHECK CONSTRAINT [FK_ANuevosLlamadasTELEMARKETING_DAC]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosOportunidades_ANuevosClientes1] FOREIGN KEY([codCliente])
REFERENCES [dbo].[ANuevosClientes] ([idCliente])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_ANuevosOportunidades_ANuevosClientes1]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosOportunidades_ClasesOportunidad] FOREIGN KEY([codClase])
REFERENCES [dbo].[ClasesOportunidad] ([idClase])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_ANuevosOportunidades_ClasesOportunidad]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosOportunidades_EstatusDAC] FOREIGN KEY([codStaDAC])
REFERENCES [dbo].[EstatusDAC] ([idStaDAC])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_ANuevosOportunidades_EstatusDAC]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosOportunidades_EstatusFINANCIERO] FOREIGN KEY([codStaFinanza])
REFERENCES [dbo].[EstatusFINANCIERO] ([idStaFinanza])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_ANuevosOportunidades_EstatusFINANCIERO]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosOportunidades_EstatusLIDER] FOREIGN KEY([codStaLIDER])
REFERENCES [dbo].[EstatusLIDER] ([idStaLider])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_ANuevosOportunidades_EstatusLIDER]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosOportunidades_EstatusTELE] FOREIGN KEY([codStaTELE])
REFERENCES [dbo].[EstatusDAC] ([idStaDAC])
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_ANuevosOportunidades_EstatusTELE]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_ANuevosOportunidades_VentasPerdidas] FOREIGN KEY([codPerdida])
REFERENCES [dbo].[VentasPerdidas] ([idPerdida])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_ANuevosOportunidades_VentasPerdidas]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_Oportunidades2_Bancos] FOREIGN KEY([codBanco])
REFERENCES [dbo].[Bancos] ([idBanco])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_Oportunidades2_Bancos]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_Oportunidades2_Lideres] FOREIGN KEY([codLider])
REFERENCES [dbo].[Lideres] ([idLider])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_Oportunidades2_Lideres]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_Oportunidades2_MotivoVisita] FOREIGN KEY([codMotivo])
REFERENCES [dbo].[MotivoVisita] ([idMotivo])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_Oportunidades2_MotivoVisita]
GO
ALTER TABLE [dbo].[ANuevosOportunidades]  WITH CHECK ADD  CONSTRAINT [FK_Oportunidades2_Vendedores] FOREIGN KEY([codVendedor])
REFERENCES [dbo].[Vendedores] ([idVendedor])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[ANuevosOportunidades] CHECK CONSTRAINT [FK_Oportunidades2_Vendedores]
GO
ALTER TABLE [dbo].[Bancos]  WITH CHECK ADD  CONSTRAINT [FK_Bancos_TipoCategoria] FOREIGN KEY([IdTipoCategoria])
REFERENCES [dbo].[TipoCategoria] ([IdTipoCategoria])
GO
ALTER TABLE [dbo].[Bancos] CHECK CONSTRAINT [FK_Bancos_TipoCategoria]
GO
ALTER TABLE [dbo].[COMBOLINEAS]  WITH CHECK ADD  CONSTRAINT [FK_COMBOLINEAS_COMBO] FOREIGN KEY([IDCOMBO])
REFERENCES [dbo].[COMBO] ([IDCOMBO])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[COMBOLINEAS] CHECK CONSTRAINT [FK_COMBOLINEAS_COMBO]
GO
ALTER TABLE [dbo].[Cotizacion]  WITH CHECK ADD  CONSTRAINT [FK_Cotizacion_PropuestaNegocio] FOREIGN KEY([codPropuesta])
REFERENCES [dbo].[PropuestaNegocio] ([idPropuesta])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Cotizacion] CHECK CONSTRAINT [FK_Cotizacion_PropuestaNegocio]
GO
ALTER TABLE [dbo].[Municipios]  WITH CHECK ADD  CONSTRAINT [FK_Municipios_Departamentos] FOREIGN KEY([codDepto])
REFERENCES [dbo].[Departamentos] ([idDepto])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Municipios] CHECK CONSTRAINT [FK_Municipios_Departamentos]
GO
ALTER TABLE [dbo].[Pmf]  WITH CHECK ADD  CONSTRAINT [FK_Pmf_Modelos] FOREIGN KEY([codModelo])
REFERENCES [dbo].[Modelos] ([idModelo])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Pmf] CHECK CONSTRAINT [FK_Pmf_Modelos]
GO
ALTER TABLE [dbo].[PropuestaNegocio]  WITH CHECK ADD  CONSTRAINT [FK_PropuestaNegocio_ANuevosClientes] FOREIGN KEY([codCliente])
REFERENCES [dbo].[ANuevosClientes] ([idCliente])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[PropuestaNegocio] CHECK CONSTRAINT [FK_PropuestaNegocio_ANuevosClientes]
GO
ALTER TABLE [dbo].[PropuestaNegocio]  WITH CHECK ADD  CONSTRAINT [FK_PropuestaNegocio_CataTipoPropuesta] FOREIGN KEY([codTipoPropuesta])
REFERENCES [dbo].[CataTipoPropuesta] ([idTipoP])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[PropuestaNegocio] CHECK CONSTRAINT [FK_PropuestaNegocio_CataTipoPropuesta]
GO
ALTER TABLE [dbo].[T_er_MATRIS_DE_TIEMPO]  WITH CHECK ADD  CONSTRAINT [FK_T_er_MATRIS_DE_TIEMPO_Lideres] FOREIGN KEY([COD_LIDER])
REFERENCES [dbo].[Lideres] ([idLider])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[T_er_MATRIS_DE_TIEMPO] CHECK CONSTRAINT [FK_T_er_MATRIS_DE_TIEMPO_Lideres]
GO
ALTER TABLE [dbo].[T_er_MATRIS_DE_TIEMPO]  WITH CHECK ADD  CONSTRAINT [FK_T_er_MATRIS_DE_TIEMPO_Vendedores] FOREIGN KEY([COD_VENDEDOR])
REFERENCES [dbo].[Vendedores] ([idVendedor])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[T_er_MATRIS_DE_TIEMPO] CHECK CONSTRAINT [FK_T_er_MATRIS_DE_TIEMPO_Vendedores]
GO
ALTER TABLE [dbo].[Vendedores]  WITH CHECK ADD  CONSTRAINT [FK_Vendedores_Users] FOREIGN KEY([IDUSER])
REFERENCES [dbo].[Users] ([IDUser])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[Vendedores] CHECK CONSTRAINT [FK_Vendedores_Users]
GO
ALTER TABLE [dbo].[VentaPerdida]  WITH CHECK ADD  CONSTRAINT [FK_VentaPerdida_Lideres] FOREIGN KEY([codLider])
REFERENCES [dbo].[Lideres] ([idLider])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VentaPerdida] CHECK CONSTRAINT [FK_VentaPerdida_Lideres]
GO
ALTER TABLE [dbo].[VentaPerdida]  WITH CHECK ADD  CONSTRAINT [FK_VentaPerdida_Vendedores] FOREIGN KEY([codVendedor])
REFERENCES [dbo].[Vendedores] ([idVendedor])
ON UPDATE CASCADE
GO
ALTER TABLE [dbo].[VentaPerdida] CHECK CONSTRAINT [FK_VentaPerdida_Vendedores]
GO
ALTER TABLE [dbo].[ertableNOTIFICAONES]  WITH CHECK ADD CHECK  (([NoCORREO]>=(0)))
GO
ALTER TABLE [dbo].[T_er_MATRIS_DE_TIEMPO]  WITH CHECK ADD  CONSTRAINT [CK_MOTIVO] CHECK  (([MOTIVO]='PERSONAL' OR [MOTIVO]='TELEFONICO' OR [MOTIVO]='WEB'))
GO
ALTER TABLE [dbo].[T_er_MATRIS_DE_TIEMPO] CHECK CONSTRAINT [CK_MOTIVO]
GO
/****** Object:  StoredProcedure [dbo].[BuscaHora]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[BuscaHora] @CodCliente as nvarchar(25), @IdOportunidad as int as
SELECT CASE WHEN DATEPART(HOUR, Hora_Op) BETWEEN 1 AND 11 THEN CONVERT(CHAR(5), Hora_Op, 108) + ' a.m.'
WHEN DATEPART(HOUR, Hora_Op) BETWEEN 13 AND 23 THEN CONVERT(CHAR(5), DATEADD( HOUR, -12, Hora_Op), 108) + ' p.m.'
WHEN DATEPART(HOUR, Hora_Op) = 12 THEN CONVERT(CHAR(5), Hora_Op, 108) + ' p.m.'
WHEN DATEPART(HOUR, Hora_Op) = 0 THEN CONVERT(CHAR(5), DATEADD( HOUR, 12, Hora_Op), 108) + ' a.m'
END AS HORA FROM ANuevosOportunidades where CodCliente=@CodCliente and idOportunidad=@IdOportunidad  ORDER BY Hora_Op


GO
/****** Object:  StoredProcedure [dbo].[BuscaHoraCliente]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[BuscaHoraCliente] @CodCliente as nvarchar(25) as
SELECT CASE WHEN DATEPART(HOUR, Hora_Apertura) BETWEEN 1 AND 11 THEN CONVERT(CHAR(5), Hora_Apertura, 108) + ' a.m.'
WHEN DATEPART(HOUR, Hora_Apertura) BETWEEN 13 AND 23 THEN CONVERT(CHAR(5), DATEADD( HOUR, -12, Hora_Apertura), 108) + ' p.m.'
WHEN DATEPART(HOUR, Hora_Apertura) = 12 THEN CONVERT(CHAR(5), Hora_Apertura, 108) + ' p.m.'
WHEN DATEPART(HOUR, Hora_Apertura) = 0 THEN CONVERT(CHAR(5), DATEADD( HOUR, 12, Hora_Apertura), 108) + ' a.m'
END AS HORA FROM ANuevosClientes where idCliente=@CodCliente  ORDER BY Hora_Apertura

GO
/****** Object:  StoredProcedure [dbo].[ClientesSinLlamar]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[ClientesSinLlamar]
	@_Tipo Int,
	@_codClase nVarchar(15),
	@_FechaIni DateTime,
	@_FechaFin DateTime 
		
AS
BEGIN
	IF @_Tipo = 0 --UNION AMBOS
	BEGIN
		 SELECT * FROM (
			SELECT codCliente, dbo.FUNC_NombreCliente(codcliente) as Nombre, cFechaApertura as FechaOportunidad, idOportunidad, 
			dbo.FUNC_Lideres(codLider) as Lider, dbo.FUNC_Vendedores(codVendedor) as Vendedor, 
			dbo.fnSprintf(dbo.ANuevosOportunidades.codCliente, dbo.FUNC_TipoClienteMASCARA(dbo.ANuevosClientes.codTipo), '-') AS cCodCliente 
			FROM ANuevosOportunidades INNER JOIN ANuevosClientes ON ANuevosOportunidades.codCliente = ANuevosClientes.idCliente 
			WHERE NOT EXISTS (
			SELECT * FROM ANuevosLlamadas WHERE ANuevosLlamadas.codClientes = ANuevosOportunidades.codCliente and ANuevosLlamadas.codOportunidad = ANuevosOportunidades.idOportunidad ) and codClase = @_codClase AND
			ANuevosOportunidades.cFechaApertura BETWEEN @_FechaIni AND @_FechaFin
			UNION
			SELECT codCliente, dbo.FUNC_NombreCliente(codcliente) as Nombre, cFechaApertura as FechaOportunidad, idOportunidad, 
			dbo.FUNC_Lideres(codLider) as Lider, dbo.FUNC_Vendedores(codVendedor) as Vendedor, 
			dbo.fnSprintf(dbo.ANuevosOportunidades.codCliente, dbo.FUNC_TipoClienteMASCARA(dbo.ANuevosClientes.codTipo), '-') AS cCodCliente 
			FROM ANuevosOportunidades INNER JOIN ANuevosClientes ON ANuevosOportunidades.codCliente = ANuevosClientes.idCliente 
			WHERE NOT EXISTS (
			SELECT * FROM ANuevosLlamadasDAC WHERE ANuevosLlamadasDAC.codClientes = ANuevosOportunidades.codCliente and ANuevosLlamadasDAC.codOportunidad = ANuevosOportunidades.idOportunidad ) and codClase = @_codClase AND
			ANuevosOportunidades.cFechaApertura BETWEEN @_FechaIni AND @_FechaFin
		) A ORDER BY A.FechaOportunidad
	END
	ELSE IF @_Tipo = 1 --DAC
	BEGIN
		SELECT codCliente, dbo.FUNC_NombreCliente(codcliente) as Nombre, cFechaApertura as FechaOportunidad, idOportunidad, 
		dbo.FUNC_Lideres(codLider) as Lider, dbo.FUNC_Vendedores(codVendedor) as Vendedor, 
		dbo.fnSprintf(dbo.ANuevosOportunidades.codCliente, dbo.FUNC_TipoClienteMASCARA(dbo.ANuevosClientes.codTipo), '-') AS cCodCliente 
		FROM ANuevosOportunidades INNER JOIN ANuevosClientes ON ANuevosOportunidades.codCliente = ANuevosClientes.idCliente 
		WHERE NOT EXISTS (
		SELECT * FROM ANuevosLlamadasDAC WHERE ANuevosLlamadasDAC.codClientes = ANuevosOportunidades.codCliente and ANuevosLlamadasDAC.codOportunidad = ANuevosOportunidades.idOportunidad ) and codClase = @_codClase AND
		ANuevosOportunidades.cFechaApertura BETWEEN @_FechaIni AND @_FechaFin ORDER BY cFechaApertura
	END
	ELSE IF @_Tipo = 2 --VENDEDORES
	BEGIN
		SELECT codCliente, dbo.FUNC_NombreCliente(codcliente) as Nombre, cFechaApertura as FechaOportunidad, idOportunidad, 
		dbo.FUNC_Lideres(codLider) as Lider, dbo.FUNC_Vendedores(codVendedor) as Vendedor, 
		dbo.fnSprintf(dbo.ANuevosOportunidades.codCliente, dbo.FUNC_TipoClienteMASCARA(dbo.ANuevosClientes.codTipo), '-') AS cCodCliente 
		FROM ANuevosOportunidades INNER JOIN ANuevosClientes ON ANuevosOportunidades.codCliente = ANuevosClientes.idCliente 
		WHERE NOT EXISTS (
		SELECT * FROM ANuevosLlamadas WHERE ANuevosLlamadas.codClientes = ANuevosOportunidades.codCliente and ANuevosLlamadas.codOportunidad = ANuevosOportunidades.idOportunidad ) and codClase = @_codClase AND
		ANuevosOportunidades.cFechaApertura BETWEEN @_FechaIni AND @_FechaFin ORDER BY cFechaApertura
	END
END

GO
/****** Object:  StoredProcedure [dbo].[ConsultaLlamadas]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO






CREATE PROCEDURE [dbo].[ConsultaLlamadas]
@cod_Clientes VARCHAR(30),
@cod_Oportunidad INT
AS 

CREATE TABLE #ProductInfo(
codClientes nvarchar(30),
codOportunidad int,
cFecha DateTime,
ComentaVende Text,
ComentaDAC Text,
ComentaLider Text, 
Hora DateTime
)

DECLARE @_CODCLIENTES NVARCHAR(30);
DECLARE @_CODOPORTUNIDAD INT;
DECLARE @_CFECHA DATETIME;
DECLARE @_COMENTAVENDE nVarchar(MAX);
DECLARE @_COMENTADAC nVarchar(MAX);
DECLARE @_COMENTALIDER nVarchar(MAX);
DECLARE @_HORA DATETIME;

-- SELECCION DE COMENTARIOS DEL VENDEDOR
SELECT @_CODCLIENTES = codClientes, @_CODOPORTUNIDAD = codOportunidad, @_CFECHA = cFecha, @_COMENTAVENDE = Referencias, @_HORA = Hora FROM ANuevosLlamadas
WHERE codClientes = @cod_Clientes  AND codOportunidad = @cod_Oportunidad 

-- SELECCION DE COMENTARIOS DEL DAC
SELECT @_CODCLIENTES = codClientes, @_CODOPORTUNIDAD = codOportunidad, @_CFECHA = cFecha, @_COMENTADAC = Referencias, @_HORA = Hora FROM ANuevosLlamadasDAC
WHERE codClientes = @cod_Clientes  AND codOportunidad = @cod_Oportunidad 

-- SELECCION DE COMENTARIOS DEL LIDER
SELECT @_CODCLIENTES = codClientes, @_CODOPORTUNIDAD = codOportunidad, @_CFECHA = cFecha, @_COMENTALIDER = Referencias, @_HORA = Hora FROM ANuevosLlamadasLider
WHERE codClientes = @cod_Clientes  AND codOportunidad = @cod_Oportunidad 


INSERT #ProductInfo

VALUES(@_CODCLIENTES, @_CODOPORTUNIDAD, @_CFECHA, @_COMENTAVENDE, @_COMENTADAC, @_COMENTALIDER, @_HORA)

IF (SELECT COUNT(*) FROM #ProductInfo) = 0
BEGIN
	DECLARE @NEW_ID nvarchar(16)
	IF @NEW_ID = NULL
		SELECT * FROM #ProductInfo

	END
ELSE SELECT * FROM #ProductInfo













GO
/****** Object:  StoredProcedure [dbo].[crmListUsers]    Script Date: 28/12/2019 14:15:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Alvaro Romero>
-- Create date: <18/01/2015>
-- Description:	<Mustra uno o muchos usuarios registrados en la base de datos>
-- =============================================
CREATE PROCEDURE [dbo].[crmListUsers]
	@USERNAME AS VARCHAR(20) = NULL,
	@USERID AS INT = NULL,
	@ACTIVE AS BIT = 1
AS
BEGIN
	SET NOCOUNT ON;
	SELECT
		Users.IDUser AS userId, Description AS userName, Salt AS salt,Hash AS hash, Correo AS email, Activo AS active
	FROM
		Users 
	WHERE 
		(Description = @USERNAME OR @USERNAME IS NULL)
		AND (Activo = @ACTIVE OR @ACTIVE IS NULL)
		AND (IDUser = @USERID OR @USERID IS NULL)
END

GO
