import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import { environment } from '@environments/environment';
import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { responseModel } from '../_models/responseModel';
import { NotificationService } from './notification.service';
import { UrlapiService } from './urlapi.service';
//import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private notificationService: NotificationService,
        private urlapi: UrlapiService
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {             
        return this.userSubject.value;
    }


    /*
    login(username: string, password: string) {
     
     return this.http.post<User>(`${this.urlapi.getUrlApi()}/api/login/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log('servicio account usuario');
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }
    */
    


    login(username: string, password: string) {

        var userId=0;
     
        //return this.http.post<responseModel>(`http://localhost:9090/Security/authenticate`, { username, password, userId })
        return this.http.post<responseModel>(`${this.urlapi.getUrlApi()}/api/login/authenticate`, { username, password, userId })
               .pipe(map((response: responseModel) => {     
                   var user = response.data;

                   if (response.exito == 1){
                        //store user details and jwt token in local storage to keep user logged in between page refreshes                                        
                        localStorage.setItem('user', JSON.stringify(user));
                        
                        this.userSubject.next(user);                    
                        return user;
                   }
                   else{
                       this.notificationService.warn("Usuario o Contraseña incorrecta");

                   }
               }));
       }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    
    register(user: User) {
        return this.http.post(`${this.urlapi.getUrlApi()}/users/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${this.urlapi.getUrlApi()}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${this.urlapi.getUrlApi()}/users/${id}`);
    }

    
    update(id: number, params: User) {
        return this.http.put(`${this.urlapi.getUrlApi()}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.userID) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }
    

    
    delete(id: number) {
        return this.http.delete(`${this.urlapi.getUrlApi()}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.userID) {
                    this.logout();
                }
                return x;
            }));
    }  
}

  /*
  getDatologin(usuario: user): Observable<responseModel> {     
    return this._http.post<responseModel>(`${this.api_url}/api/Login/LogearAsync`, usuario);
  }
  */




