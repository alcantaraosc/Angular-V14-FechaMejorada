
--DECLARE @BANCO_ID_ACTIVO AS VARCHAR(5), @BANCO_ID_DESACTIVADO VARCHAR(5)

----BANPRO
--SELECT * FROM QA..Bancos WHERE idBanco IN ('5', '124')

----BANCO ID ACTIVO
--SELECT @BANCO_ID_ACTIVO=idBanco FROM QA..Bancos WHERE idBanco IN ('5', '124') AND Habilitado=1
----BANCO ID DESACTIVADO
--SELECT @BANCO_ID_DESACTIVADO=idBanco FROM QA..Bancos WHERE idBanco IN ('5', '124') AND Habilitado=0



---- 
--IF EXISTS(SELECT * FROM [dbo].[ANuevosOportunidades] WHERE [codBanco]='124')
--BEGIN
--	UPDATE [dbo].[ANuevosOportunidades] 
--	SET [codBanco]=@BANCO_ID_ACTIVO  WHERE [codBanco] ='124'
--END


----CODIGO 5 DE BANPRO ES EL QUE ESTA HABILITADO
--SELECT * FROM [dbo].[ANuevosOportunidades] WHERE [codBanco]='5'

----CODIGO 5 DE BANPRO ES EL QUE ESTA HABILITADO
--SELECT * FROM [dbo].[ANuevosOportunidades] WHERE [codBanco]='124'


----CODIGO 5 DE BANPRO ES EL QUE ESTA HABILITADO
--DELETE  FROM Bancos WHERE idBanco='124'


----TABLA ESTADO CIVIL -------

SELECT * FROM EstadoCivil WHERE idCivil='6'
INSERT INTO QA..EstadoCivil (idCivil, Nombre) VALUES('6', 'OTROS');

SELECT EstaCivil, * FROM QA..ANuevosClientes WHERE EstaCivil='0'

--ACTUALIZAR
UPDATE QA..ANuevosClientes SET EstaCivil='6'
WHERE EstaCivil='0'


--CONSULTAR
SELECT EstaCivil, * FROM QA..ANuevosClientes WHERE EstaCivil='6'

--ELIMINAR EL REGISTRO CERO

DELETE FROM EstadoCivil WHERE idCivil='0'





