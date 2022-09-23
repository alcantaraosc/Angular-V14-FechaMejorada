import { Component, ChangeDetectorRef, OnDestroy, TRANSLATIONS } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { ComunicacionService } from './_services/comunicacion.service';
import { AccountService } from './_services';
import { User } from './_models';
import { AppService } from './_services/app.service';
import { accesoMenuDelSistema, opcionesVendedores, opcionesLideres, opcionesCatalogo, opcionesSeguridad } from './_models/accesoMenuDelSistema';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QANet-Web';

  loading: boolean = false;
  user: User;
  public accesoMenu: accesoMenuDelSistema = { admin: true, fichaCliente: false, vendedores: false, lideres: false, reportes: false, catalogos: false, seguridad: false };
  public accesoSubMenuVendedor: opcionesVendedores = { llamadasVendedor: false };
  public accesoSubMenuLider: opcionesLideres = { llamadasLider: false, revisionFichaCliente: false };
  public accesoSubMenuCatalogo: opcionesCatalogo = {
    financiera: false, tipoIdentificacion: false, estadoCivil: false, sucursal: false, tipoSexo: false, departamentos: false, municipio: false,
    estatusOportunidad: false, estatusFincnaciero: false, estatusDac: false, tipoClase: false, lider: false, verdedor: false, visita: false,
    motivo: false, personalDac: false
  };
  public accesoSubMenuSeguridad: opcionesSeguridad = { usuario: false, roles: false, funciones: false };

  
  public accesos: string[]=["ADMIN", "MEN_CL", "MEN_VEND", "MEN_LID", "SB_MEN_LLAM_LID", 
                          "MEN_CAT", "SB_MEN_FIN", "SB_MEN_TIP_IDEN", "SB_MEN_EST_CIV", "MEN_SEG",
                          "SB_MEN_US", "SB_MEN_ROL", "SB_MEN_FUN"];

  /*public accesos: string[] = ["MEN_CL", "MEN_VEND", "SB_MEN_LLAM_VEND", "CRUD_CL", "NV_CL"];*/



  constructor(private accountService: AccountService, private appS: AppService, private enviaDatos: ComunicacionService) {
    localStorage.setItem('accesos', JSON.stringify(this.accesos));

    this.accountService.user.subscribe(x => {
      this.user = x;
      this.onEstablecerPermiso(this.accesos);
    });
  }

  ngOnInit(): void {
    //aqui se subscribe para cargar
    this.appS.config.subscribe(config => {
      setTimeout(() => {
        this.loading = config
      }, 50);
    });

  }

  logout() {
    let usuario: User;
    usuario = JSON.parse(localStorage.getItem('user').toString());

    if (confirm('¿ seguro de cerrar la sesion del usuario ' + usuario.username + ' ?')) {
      
     // localStorage.removeItem('user');
      localStorage.removeItem('accesos');
      window.location.reload();
      this.accountService.logout();
    }
  }


  onEstablecerPermiso(menu: string[]) {

    for (var index = 0; index < menu.length; ++index) {

      switch (menu[index]) {

        case "ACCESO_ADMIN": this.accesoMenu.admin = true;
          break;

        case "MEN_CL": this.accesoMenu.fichaCliente = true;
          break;

        /****************************** FICHA_CLIENTE ***************************/

        case "MEN_VEND":
          this.accesoMenu.vendedores = true;
          break;
        case "SB_MEN_LLAM_VEND": this.accesoSubMenuVendedor.llamadasVendedor = true;
          break;

        /****************************** LIDERES ***************************/

        case "MEN_LID": this.accesoMenu.lideres = true;
          break;
        case "SB_MEN_LLAM_LID": this.accesoSubMenuLider.llamadasLider = true;
          break;

        /****************************** CATALOGO ***************************/

        case "MEN_CAT": this.accesoMenu.catalogos = true;
          break;
        case "SB_MEN_FIN": this.accesoSubMenuCatalogo.financiera = true;
          break
        case "SB_MEN_TIP_ID": this.accesoSubMenuCatalogo.tipoIdentificacion = true;
          break
        case "SB_MEN_EST_CIV": this.accesoSubMenuCatalogo.estadoCivil = true;
          break

        /******************* SEGURIDAD    ***********************************/
        case "MEN_SEG": this.accesoMenu.seguridad = true;
          break;
        case "SB_MEN_US": this.accesoSubMenuSeguridad.usuario = true;
          break;
        case "SB_MEN_ROL": this.accesoSubMenuSeguridad.roles = true;
          break;
        case "SB_MEN_FUN": this.accesoSubMenuSeguridad.funciones = true;
          break;
      }
    }

  }
}
