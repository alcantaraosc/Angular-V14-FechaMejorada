
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { InicioComponent } from './_components/inicio/inicio.component';
import { ListafinancieraComponent } from './_components/catalogos/_financiera/listafinanciera/listafinanciera.component';
import { ListatipoidentificacionComponent } from './_components/catalogos/_tipoidentificacion/listatipoidentificacion/listatipoidentificacion.component';
import { ListaestadocivilComponent } from './_components/catalogos/_estadocivil/listaestadocivil/listaestadocivil.component';
import { ListaclientesComponent } from './_components/clientes/listaclientes/listaclientes.component';
import { ModalclientesComponent } from './_components/clientes/modalclientes/modalclientes.component';
import { ListaoportunidadesComponent } from './_components/clientes/listaoportunidades/listaoportunidades.component';
import { ListasucursalComponent } from './_components/catalogos/_sucursal/listasucursal/listasucursal.component';
import { ListatiposexoComponent } from './_components/catalogos/_tiposexo/listatiposexo/listatiposexo.component';
import { ListadepartamentoComponent } from './_components/catalogos/_departamento/listadepartamento/listadepartamento.component';
import { ListamunicipioComponent } from './_components/catalogos/_municipio/listamunicipio/listamunicipio.component';
import { ListaestatusoportunidadComponent } from './_components/catalogos/_estatusoportunidad/listaestatusoportunidad/listaestatusoportunidad.component';
import { ListatipoclaseComponent } from './_components/catalogos/_tipoclase/listatipoclase/listatipoclase.component';
import { ListaliderComponent } from './_components/catalogos/_lider/listalider/listalider.component';
import { ListavendedorComponent } from './_components/catalogos/_vendedor/listavendedor/listavendedor.component';
import { ConsultasllamadasComponent } from './_components/vendedores/consultasllamadas/consultasllamadas.component';
import { ListaestatusfinancieroComponent } from './_components/catalogos/_estatusfinanciero/listaestatusfinanciero/listaestatusfinanciero.component';
//import { ModalestatusdacComponent } from './_components/catalogos/_estatusdac/modalestatusdac/modalestatusdac.component';
import { ListaestatusdacComponent } from './_components/catalogos/_estatusdac/listaestatusdac/listaestatusdac.component';
import { ListavisitaComponent } from './_components/catalogos/_visita/listavisita/listavisita.component';
import { ListamotivoComponent } from './_components/catalogos/_motivo/listamotivo/listamotivo.component';
import { ListapersonaldacComponent } from './_components/catalogos/_personaldac/listapersonaldac/listapersonaldac.component';
import { HomeComponent } from './home';
import { RevisionfclientesComponent } from './_components/lider/revisionfclientes/revisionfclientes.component';
import { ListausuariosComponent } from './_components/security/_user/listausuarios/listausuarios.component';
import { ListasrolesComponent } from './_components/security/_roles/listasroles/listasroles.component';
import { ListafuncionesComponent } from './_components/security/_funciones/listafunciones/listafunciones.component';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  //esta es la pagina de inicio, el sistema de obliga que estes auntenticado
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  { path: 'account', loadChildren: accountModule },
  { path: 'clientes/lista', component: ListaclientesComponent, canActivate: [AuthGuard]  },
  { path: 'clientes/nuevos', component: ModalclientesComponent, canActivate: [AuthGuard]  },
  { path: 'lideres/revision-ficha-clientes', component:RevisionfclientesComponent, canActivate: [AuthGuard]  },


  { path: 'catalogo/financiera/listar', component: ListafinancieraComponent, canActivate: [AuthGuard]  },
  { path: 'catalogo/tipo-identificacion/listar', component:ListatipoidentificacionComponent, canActivate: [AuthGuard]  },
  { path: 'catalogo/estado-civil/listar', component:ListaestadocivilComponent, canActivate: [AuthGuard]  },
  { path: 'catalogo/sucursal/listar', component:ListasucursalComponent, canActivate: [AuthGuard]  },  
  { path: 'clientes/oportunidad', component:ListaoportunidadesComponent, canActivate: [AuthGuard]  },
  { path: 'catalogo/tipo-sexo/listar', component:ListatiposexoComponent, canActivate: [AuthGuard]  },
  { path: 'catalogo/departamento/listar', component:ListadepartamentoComponent }, // canActivate: [AuthGuard]  },
  { path: 'catalogo/municipio/listar', component: ListamunicipioComponent, canActivate: [AuthGuard]  },
  { path: 'catalogo/estatus-oportunidad/listar', component: ListaestatusoportunidadComponent,  canActivate: [AuthGuard] },
  { path: 'catalogo/tipo-clase/listar', component: ListatipoclaseComponent, canActivate: [AuthGuard]  },
  { path: 'catalogo/lider/listar', component: ListaliderComponent,  canActivate: [AuthGuard]  },
  { path: 'catalogo/vendedor/listar', component: ListavendedorComponent,  canActivate: [AuthGuard]  },
  { path: 'catalogo/financiera', component: ListafinancieraComponent, canActivate: [AuthGuard]  },
  { path: 'vendedores/llamadas', component: ConsultasllamadasComponent  },
  { path: 'catalogo/estatus-financiero/listar', component: ListaestatusfinancieroComponent, canActivate: [AuthGuard]  },
  { path: 'catalogo/estatus-dac/listar', component: ListaestatusdacComponent },
  { path: 'catalogo/visita/listar', component: ListavisitaComponent, canActivate: [AuthGuard] },
  { path: 'catalogo/motivo/listar', component: ListamotivoComponent, canActivate: [AuthGuard] },
  { path: 'catalogo/personal-dac/listar', component: ListapersonaldacComponent, canActivate: [AuthGuard] },
  { path: 'seguridad/usuarios/listar', component: ListausuariosComponent, canActivate: [AuthGuard] },
  { path: 'seguridad/roles/listar', component: ListasrolesComponent, canActivate: [AuthGuard] },
  { path: 'seguridad/funciones/listar', component: ListafuncionesComponent, canActivate: [AuthGuard] },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [],
 // imports: [ CommonModule],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
