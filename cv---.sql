 select * from util..vcaPROGRAMACIONES where Identificacion='0011406890019Y' order by Fecha  --'00250620152026'--'0012410820028U'  0011710850027M

--EM  8882507900001F 
--LM 0011004880001N 
 --0011202960003N
-- 0012206920063X
--0420308880002N ESTA ES
--0010409001011J 	 
--0880910790001M
--0011010930017S 


SELECT * FROM UTIL..vcaRazones ; ---2412011760008C

SELECT *  FROM [UTIL].[dbo].[vcaEMPLEADOS] WHERE NOMBRE like '%BRA%' --Identificacion='0011012930030U'  0011406890019Y 0012709970008R  0012709920019F 0011010930017S  ---APELLIDO like '%castillo solis%'--- IDENTIFICACION='0012410820028U'

--0011707920007Hr

SELECT *  FROM [UTIL].[dbo].[vcaMarcas] WHERE Identificacion ='0011603900051N' AND  Fecha >='2022-09-01'  --and Hora >  DATEADD(ss, 59, config) and Tipo not in (2,4)
 ORDER BY Row_Id


 
--SELECT *  FROM [UTIL].[dbo].[vcaMarcasInvalidas] WHERE Identificacion='0011012930030U' AND Fecha ='2019-10-12' -- and Hora >  DATEADD(ss, 59, config) and Tipo not in (2,4)
-- ORDER BY Row_Id


--justificacion
SELECT *  FROM [UTIL].[dbo].[vca_Justificacion] WHERE Identificacion='0011603900051N '


  SELECT  *  FROM [UTIL].[dbo].[vcaEmpEst] WHERE IDENTIFICACION='0012410820028U' ORDER BY FECHA

  SELECT *   FROM [UTIL].[dbo].[vcaDEPARTAMENTOS]

  ---CONFIGURACION DEL DIA DE LA SEMANA
  SELECT *  FROM [UTIL].[dbo].[vcaCONFIGHORARIO] WHERE [IDENTIFICACION]='0011406890019Y'
   -- dia de la semana de hoy 
  select datepart(DW, GETDATE());


--saldo
SELECT *  FROM [UTIL].[dbo].[vcaSALDOS] where Identificacion='0012410820028U'

select SUM(SaldoAfec) from  util..vcaPROGRAMACIONES where Identificacion='0012410820028U' AND MONTH(Fecha)=1 AND YEAR(FECHA)=2019

select * from  util..vcaPROGRAMACIONES where Identificacion='0012410820028U' AND MONTH(Fecha)=1 AND YEAR(FECHA)=2019


 SELECT STRTDATE, *
 FROM ansa..UPR00100 LEFT OUTER JOIN
  ansa..UPR00300 ON UPR00100.EMPLOYID = UPR00300.EMPLOYID where upr00300.EMPLOYID='0880910790001M '


  

  SELECT *  FROM [UTIL].[dbo].[Vca_MM02] WHERE IDENTIFICACION='0012410820028U' ORDER BY UTIL.dbo.Vca_MM02.FECHA


/*********************************************** calculo DCV *****************************************************/

SELECT EMPL.Identificacion, EMPL.NOM, 
	   SALDO_VAC.Fecha, 	   
	--   SALDO_VAC.SaldoFin - (SELECT ISNULL(SUM(PROG.SaldoAfec), 0) FROM UTIL..vcaPROGRAMACIONES AS PROG WHERE PROG.Identificacion=EMPL.IDENTIFICACION AND MONTH(PROG.FECHA)=MONTH(GETDATE()) AND YEAR(PROG.Fecha)=YEAR(GETDATE())) AS TOTAL_DIAS_DISPONIBLE_VACACIONES,
	    SALDO_VAC.SaldoFin - (SELECT ISNULL(SUM(PROG.SaldoAfec), 0) FROM UTIL..vcaPROGRAMACIONES AS PROG WHERE PROG.Identificacion=EMPL.IDENTIFICACION AND MONTH(PROG.FECHA)>=MONTH(GETDATE()) AND YEAR(PROG.Fecha)>=YEAR(GETDATE())) AS TOTAL_DIAS_DISPONIBLE_VACACIONES

FROM UTIL..vcaEMPLEADOS AS EMPL
	INNER JOIN (SELECT * FROM [UTIL].[dbo].[vcaSALDOS] 
				 WHERE M=MONTH(GETDATE()) AND A=YEAR(GETDATE())) AS SALDO_VAC ON SALDO_VAC.Identificacion=EMPL.Identificacion
	
WHERE 
	EMPL.Identificacion='0012410820028U'
	--EMPL.NOM LIKE '%elieth%%' 
	 AND MONTH(SALDO_VAC.Fecha)=MONTH(GETDATE()) AND YEAR(SALDO_VAC.FECHA)=YEAR(GETDATE())


DECLARE @IDENTIF VARCHAR(50)='0030509880006A'
SELECT	((SELECT SUM(SaldoAcred)  FROM [UTIL].[dbo].[vcaSALDOS] where Identificacion=@IDENTIF) + 
		(SELECT ISNULL(SaldoIni,0)  FROM [UTIL].[dbo].[vcaSALDOS] where Coment='INI' AND Identificacion=@IDENTIF) -
		(SELECT SUM(SaldoAfec) from util..vcaPROGRAMACIONES where Identificacion=@IDENTIF)) AS TOTAL_VAC

   

SELECT * FROM UTIL..vcaINFLABORAL WHERE NAP LIKE '%Haydee%'
IDENTIFICACION='0012410820028U'

--acumulado
SELECT * FROM vca_AcuEmpleados WHERE IDENTIFICACION = '0011012930030U'
select * from vcaEmpIncidenc



      


















































