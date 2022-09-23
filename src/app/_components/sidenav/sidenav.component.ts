import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AppService } from 'src/app/_services/app.service'
import { ComunicacionService } from 'src/app/_services/comunicacion.service'
 
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy {

  panelOpenState = true;
  isLogeado: boolean= false;
  loading:boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public router: Router, 
    public authService: AuthenticationService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private comunicacionService:ComunicacionService) {
      
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  
    //recibir la informacion cuando se logee
    this.comunicacionService.enviarComprobacionObservable.subscribe(response =>{
      console.log("Entro al servicio enviarMensajeObservable");
      this.router.navigate(['/']);
      this.isLogeado = true;
    });

    console.log(this.isLogeado);
  }

   mobileQuery: MediaQueryList;

  //fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);




  private _mobileQueryListener: () => void;

  /*
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }*/

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;//[/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));


}
