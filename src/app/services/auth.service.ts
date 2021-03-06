import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

const httpOptions = {
    headers: new HttpHeaders ({
        'Content-Type' : 'application/json'
    })
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) { 
        // console.log(this.currentUser)
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>('https://savepoint-server.herokuapp.com/user/signin', { username: username, password: password }, httpOptions)
            .pipe(map(user => {
                if (user && user.sessionToken) {
                    sessionStorage.setItem('currentUser', user.sessionToken);
                }
                console.log(user)
                return user;
            }));
    }

    loggedIn() {
        if (sessionStorage.getItem('currentUser') === null ){
            return false
        } else {
            return true
        }
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }
}