import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MediaMatcher, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.css']
})
export class MenuSidenavComponent {

  panelOpenState = true;
  showLoadingIndicator: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public router: Router,
    public authService: AuthenticationService) {

    /*
    this.router.events.subscribe((routerEvent: Event) => {

      //este es el link del video para cargar la pagina  https://www.youtube.com/watch?v=V_64FqedqW0
      if (routerEvent instanceof NavigationStart) {
        console.log('inicia cargando');
        //alert("inicia");
        this.showLoadingIndicator = true;
      }

      if (routerEvent instanceof NavigationEnd) { 
        //alert("finaliza");       
        console.log('finaliza cargando');
        this.showLoadingIndicator = false;
      }

    });
    */
  }
  shouldRun = true;
}
