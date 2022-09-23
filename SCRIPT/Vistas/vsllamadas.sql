USE [QAWEB]
GO

/****** Object:  View [dbo].[vwfichasLlamadas]    Script Date: 06/08/2021 9:12:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vwfichasLlamadas]
AS
SELECT        dbo.Cliente.ClienteID, dbo.Cliente.NombreCliente, dbo.Oportunidad.NoOportunidad, dbo.Oportunidad.ProximaLlamadaVendedor, dbo.Financiera.NombreFinanciera AS Financiera, 
                         dbo.EstatusOportunidad.NombreEstatusOportunidad AS EstatusOportunidad, dbo.Lider.NombreLider, dbo.Vendedor.NombreVendedor
FROM            dbo.Cliente INNER JOIN
                         dbo.Oportunidad ON dbo.Cliente.ClienteID = dbo.Oportunidad.ClienteID INNER JOIN
                         dbo.Financiera ON dbo.Oportunidad.FinancieraID = dbo.Financiera.FinancieraID INNER JOIN
                         dbo.EstatusOportunidad ON dbo.Oportunidad.EstatusOportunidadID = dbo.EstatusOportunidad.EstatusOportunidadID INNER JOIN
                         dbo.Lider ON dbo.Oportunidad.LiderID = dbo.Lider.LiderID INNER JOIN
                         dbo.Vendedor ON dbo.Oportunidad.VendedorID = dbo.Vendedor.VendedorID AND dbo.Lider.LiderID = dbo.Vendedor.LiderID

GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[50] 4[2] 2[34] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Cliente"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 136
               Right = 237
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Oportunidad"
            Begin Extent = 
               Top = 6
               Left = 275
               Bottom = 136
               Right = 508
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Financiera"
            Begin Extent = 
               Top = 6
               Left = 546
               Bottom = 136
               Right = 739
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "EstatusOportunidad"
            Begin Extent = 
               Top = 6
               Left = 777
               Bottom = 136
               Right = 1015
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Lider"
            Begin Extent = 
               Top = 138
               Left = 38
               Bottom = 268
               Right = 231
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Vendedor"
            Begin Extent = 
               Top = 138
               Left = 269
               Bottom = 268
               Right = 462
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 9
         Width = 284
         Width = 1500
         Width ' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vwfichasLlamadas'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'= 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vwfichasLlamadas'
GO

EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'vwfichasLlamadas'
GO


