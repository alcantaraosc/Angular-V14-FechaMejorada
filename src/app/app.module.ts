import { BrowserModule } from '@angular/platform-browser';

/* referencia https://medium.com/zurvin/angular-datepipe-cambiando-el-idioma-68e16b74c943 */
/* la importaciones LOCALE_ID son para DatePipe: para fecha y hora*/
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, DatePipe } from '@angular/common';

//framework material

import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MenuNavComponent } from './_components/menu-nav/menu-nav.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
//esta importacion se refiera a la validacion de los formulario
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatNativeDateModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
//import { MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


//components
//import { LoginComponent } from './_components/login/login.component';
import { LoginComponent } from './account/login.component';
import { InicioComponent } from './_components/inicio/inicio.component';
import { ListafinancieraComponent } from './_components/catalogos/_financiera/listafinanciera/listafinanciera.component';

import { ModalclientesComponent } from './_components/clientes/modalclientes/modalclientes.component';
import { ModaloportunidadComponent } from './_components/clientes/modaloportunidad/modaloportunidad.component';
import { ListaoportunidadesComponent } from './_components/clientes/listaoportunidades/listaoportunidades.component';
import { ListallamadasliderComponent } from './_components/seguimiento/listallamadaslider/listallamadaslider.component';
import { ListallamadasvendedorComponent } from './_components/seguimiento/listallamadasvendedor/listallamadasvendedor.component';
import { ModalllamadasliderComponent } from './_components/seguimiento/modalllamadaslider/modalllamadaslider.component';
import { ModalllamadasvendedorComponent } from './_components/seguimiento/modalllamadasvendedor/modalllamadasvendedor.component';
import { ModalllamadasfinancieroComponent } from './_components/seguimiento/modalllamadasfinanciero/modalllamadasfinanciero.component';
import { ListallamadasfinancieroComponent } from './_components/seguimiento/listallamadasfinanciero/listallamadasfinanciero.component';
import { ListaestadocivilComponent } from './_components/catalogos/_estadocivil/listaestadocivil/listaestadocivil.component';
import { ListatipoidentificacionComponent } from './_components/catalogos/_tipoidentificacion/listatipoidentificacion/listatipoidentificacion.component';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { MenuSidenavComponent } from './_components/menu-sidenav/menu-sidenav.component';
import { ModalestadocivilComponent } from './_components/catalogos/_estadocivil/modalestadocivil/modalestadocivil.component';
import { ModaltipoidentificacionComponent } from './_components/catalogos/_tipoidentificacion/modaltipoidentificacion/modaltipoidentificacion.component';
import { ListaclientesComponent } from './_components/clientes/listaclientes/listaclientes.component';
//import { ListaclientesComponent, MY_FORMATS } from './_components/clientes/listaclientes/listaclientes.component';
import { ModalfinancieraComponent } from './_components/catalogos/_financiera/modalfinanciera/modalfinanciera.component';
import { ListasucursalComponent } from './_components/catalogos/_sucursal/listasucursal/listasucursal.component';
import { ModalsucursalComponent } from './_components/catalogos/_sucursal/modalsucursal/modalsucursal.component';
import { ListadepartamentoComponent } from './_components/catalogos/_departamento/listadepartamento/listadepartamento.component';
import { ModaldepartamentoComponent } from './_components/catalogos/_departamento/modaldepartamento/modaldepartamento.component';
import { ListatiposexoComponent } from './_components/catalogos/_tiposexo/listatiposexo/listatiposexo.component';
import { ModaltiposexoComponent } from './_components/catalogos/_tiposexo/modaltiposexo/modaltiposexo.component';
import { ListamunicipioComponent } from './_components/catalogos/_municipio/listamunicipio/listamunicipio.component';
import { ModalmunicipioComponent } from './_components/catalogos/_municipio/modalmunicipio/modalmunicipio.component';
import { ListaestatusoportunidadComponent } from './_components/catalogos/_estatusoportunidad/listaestatusoportunidad/listaestatusoportunidad.component';
import { ModalestatusoportunidadComponent } from './_components/catalogos/_estatusoportunidad/modalestatusoportunidad/modalestatusoportunidad.component';
import { ListatipoclaseComponent } from './_components/catalogos/_tipoclase/listatipoclase/listatipoclase.component';
import { ModaltipoclaseComponent } from './_components/catalogos/_tipoclase/modaltipoclase/modaltipoclase.component';
import { ListavendedorComponent } from './_components/catalogos/_vendedor/listavendedor/listavendedor.component';
import { ModalvendedorComponent } from './_components/catalogos/_vendedor/modalvendedor/modalvendedor.component';
import { ListapersonaldacComponent } from './_components/catalogos/_personaldac/listapersonaldac/listapersonaldac.component';
import { ModalpersonaldacComponent } from './_components/catalogos/_personaldac/modalpersonaldac/modalpersonaldac.component';
import { ListamotivoComponent } from './_components/catalogos/_motivo/listamotivo/listamotivo.component';
import { ModalmotivoComponent } from './_components/catalogos/_motivo/modalmotivo/modalmotivo.component';
import { ListavisitaComponent } from './_components/catalogos/_visita/listavisita/listavisita.component';
import { ModalvisitaComponent } from './_components/catalogos/_visita/modalvisita/modalvisita.component';
import { ModalliderComponent } from './_components/catalogos/_lider/modallider/modallider.component';
import { ListaliderComponent } from './_components/catalogos/_lider/listalider/listalider.component';
import { ConsultasllamadasComponent } from './_components/vendedores/consultasllamadas/consultasllamadas.component';
import { ListaestatusfinancieroComponent } from './_components/catalogos/_estatusfinanciero/listaestatusfinanciero/listaestatusfinanciero.component';
import { ModalestatusfinancieroComponent } from './_components/catalogos/_estatusfinanciero/modalestatusfinanciero/modalestatusfinanciero.component';
import { ListaestatusdacComponent } from './_components/catalogos/_estatusdac/listaestatusdac/listaestatusdac.component';
import { ModalestatusdacComponent } from './_components/catalogos/_estatusdac/modalestatusdac/modalestatusdac.component';
import { ModalbuscarllamadasvendedorComponent } from './_components/vendedores/modalbuscarllamadasvendedor/modalbuscarllamadasvendedor.component';
import { ListafichaclienteComponent } from './_components/lider/listafichacliente/listafichacliente.component';
import { ListafichallamadaComponent } from './_components/lider/listafichallamada/listafichallamada.component';


//services
import { AccesodatosService } from './_services/accesodatos.service';
import { AuthenticationService } from './_services/authentication.service';
import { AccesooportunidadService } from './_services/accesooportunidad.service';
import { UrlapiService } from './_services/urlapi.service';
import { NotificationService } from './_services/notification.service';
import { AccesoclientesService  } from './_services/accesoclientes.service';
import { ComunicacionService } from './_services/comunicacion.service';
import { AccesollamadasvendedorService } from './_services/accesollamadasvendedor.service';
import { AccesollamadasliderService } from './_services/accesollamadaslider.service';
import { AccesollamadasfinancieroService } from './_services/accesollamadasfinanciero.service';
import { EnviardatosService } from './_services/enviardatos.service';
import { AccesoestatusfinancieroService } from './_services/accesoestatusfinanciero.service';
import { AccesodatossucursalService } from './_services/accesodatossucursal.service';
import { AccesodatostiposexoService } from './_services/accesodatostiposexo.service';
import { AccesodatosdepartamentoService } from './_services/accesodatosdepartamento.service';
import { AccesodatosmunicipioService } from './_services/accesodatosmunicipio.service';
import { AccesoestatusoportunidadService } from './_services/accesoestatusoportunidad.service';
import { AccesodatostipoclaseService } from './_services/accesodatostipoclase.service';
import { AccesodatosvendedorService } from './_services/accesodatosvendedor.service';
import { AccesoestatusdacService } from './_services/accesoestatusdac.service';
import { AccesodatosvisitaService } from './_services/accesodatosvisita.service';
import { AccesodatosmotivosService } from './_services/accesodatosmotivos.service';
import { AccesopersonaldacService } from './_services/accesopersonaldac.service';
import { LayoutComponent } from './account/layout.component';


//import { fakeBackendProvider } from './_helpers';
//import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { ErrorInterceptor } from './guard';
import { JwtInterceptor } from './guard/jwt.interceptor';
import { RevisionfclientesComponent } from './_components/lider/revisionfclientes/revisionfclientes.component';
import { ListausuariosComponent } from './_components/security/_user/listausuarios/listausuarios.component';
import { ModalusuariosComponent } from './_components/security/_user/modalusuarios/modalusuarios.component';
import { RolesusuariosComponent } from './_components/security/_roles/rolesusuarios/rolesusuarios.component';
import { ListasrolesComponent } from './_components/security/_roles/listasroles/listasroles.component';
import { ModalrolesComponent } from './_components/security/_roles/modalroles/modalroles.component';

import { SecurityModule } from './_components/security/security.module';
import { ModalfuncionesComponent } from './_components/security/_funciones/modalfunciones/modalfunciones.component';

import { ListafuncionesComponent } from './_components/security/_funciones/listafunciones/listafunciones.component';
import { RouterModule } from '@angular/router';
import { RolesfuncionesComponent } from './_components/security/_componentegenerico/rolesfunciones/rolesfunciones.component';

/** estas importaciones son para DatePipe: para fecha y hora*/
import  localeEs  from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { UtlidadesService } from './_services/utlidades.service';
registerLocaleData(localeEs, 'es');
/** fin  importaciones DatePipe */




@NgModule({
  declarations: [
    AppComponent, MenuNavComponent, InicioComponent, ListafinancieraComponent,
    ModalfinancieraComponent, ListaestadocivilComponent,  ListatipoidentificacionComponent, SidenavComponent, MenuSidenavComponent,
    ModalestadocivilComponent, ModaltipoidentificacionComponent, ListaclientesComponent, ModalclientesComponent,
    ModaloportunidadComponent, ListaoportunidadesComponent, ModalllamadasvendedorComponent, ListallamadasliderComponent, ListallamadasvendedorComponent,
    ModalllamadasliderComponent, ModalllamadasvendedorComponent, ModalllamadasfinancieroComponent, ListallamadasfinancieroComponent, ListasucursalComponent,
    ModalsucursalComponent, ListatiposexoComponent, ModaltiposexoComponent, ListadepartamentoComponent, ModaldepartamentoComponent, ListamunicipioComponent,
    ModalmunicipioComponent, ListaestatusoportunidadComponent, ModalestatusoportunidadComponent, ListatipoclaseComponent, ModaltipoclaseComponent,
    ListavendedorComponent, ModalvendedorComponent, ModalliderComponent, ListaliderComponent, ConsultasllamadasComponent, ListaestatusfinancieroComponent,
    ModalestatusfinancieroComponent, ListaestatusdacComponent, ModalestatusdacComponent, ModalbuscarllamadasvendedorComponent,
    ListavisitaComponent, ModalvisitaComponent, ListamotivoComponent, ModalmotivoComponent, ListapersonaldacComponent, ModalpersonaldacComponent,
    HomeComponent, RevisionfclientesComponent, ListausuariosComponent, ModalusuariosComponent, RolesusuariosComponent,  ListafichaclienteComponent, ListafichallamadaComponent,
    ModalfuncionesComponent, ListasrolesComponent, ModalrolesComponent, ListafuncionesComponent, RolesfuncionesComponent,
  ],

  imports: [
              CommonModule,
              RouterModule,
              FormsModule,
              ReactiveFormsModule,
              BrowserModule,
              AppRoutingModule,
              NoopAnimationsModule,        
              HttpClientModule,
              BrowserAnimationsModule, MatSliderModule, MatSidenavModule, MatDividerModule, MatCardModule, MatPaginatorModule,
              MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule, LayoutModule, MatButtonModule, MatListModule,
              MatExpansionModule, MatGridListModule,MatSnackBarModule, MatDialogModule, FormsModule, ReactiveFormsModule,
              MatFormFieldModule, MatCheckboxModule, MatRadioModule, MatSelectModule, MatDatepickerModule, MatInputModule,
              MatSlideToggleModule, MatProgressSpinnerModule, MatSortModule, MatNativeDateModule, 
              MatTabsModule, 
              //MatMomentDateModule no se que es esto
              //hace referencia a este un modulo que se encuentra en app/_components/security/security.module.ts
              SecurityModule
  ],

  entryComponents: [ ModalfinancieraComponent, ModalestadocivilComponent, ModaltipoidentificacionComponent, ModalsucursalComponent,
    ModalclientesComponent, ModaloportunidadComponent, ModalllamadasvendedorComponent, ModalllamadasliderComponent,
    ModaltiposexoComponent, ModaldepartamentoComponent, ModalmunicipioComponent, ModalestatusoportunidadComponent,
    ModaltipoclaseComponent, ModalvendedorComponent, ModalliderComponent, ModalestatusfinancieroComponent,
    ModalestatusdacComponent, ModalbuscarllamadasvendedorComponent, ModalvisitaComponent, ModalmotivoComponent,
    ModalpersonaldacComponent
  ],

  providers: [
                AuthenticationService, AccesodatosService, AccesoclientesService, UrlapiService, NotificationService,
                ComunicacionService, AccesooportunidadService, AccesollamadasvendedorService, AccesollamadasliderService,
                AccesollamadasfinancieroService, AccesoestatusfinancieroService, AccesodatossucursalService,
                AccesodatostiposexoService, AccesodatosdepartamentoService, AccesodatosmunicipioService,
                AccesoestatusoportunidadService, AccesodatostipoclaseService, AccesodatosvendedorService,
                AccesoestatusdacService, AccesodatosvisitaService, AccesodatosmotivosService, AccesopersonaldacService, UtlidadesService,


               /* { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  
                { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },*/
               // { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }, MatDatepickerModule,  MatNativeDateModule,
                EnviardatosService, DatePipe,
               // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
                //{provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
               // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
               // { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'accent' } },
  
                //esto corresponde al pipeDate para fecha y hora
                { provide: LOCALE_ID, useValue:'es'}
  

              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
