import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/_services/comunicacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
    
  }

}
