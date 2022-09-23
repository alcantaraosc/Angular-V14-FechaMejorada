import { Injectable } from '@angular/core';

//url de la API
const api_url: string='https://localhost:5001'

//'https://localhost:5001';

@Injectable({
  providedIn: 'root'
})

export class UrlapiService {
  constructor() { }

  getUrlApi(): string {
      return api_url;
  }
}





