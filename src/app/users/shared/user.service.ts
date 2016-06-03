import { Injectable } from '@angular/core';
import { Http ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from './user.model';
const userUrl: string = 'http://jsonplaceholder.typicode.com/users';
const BY_ID: string = 'http://jsonplaceholder.typicode.com/users/1';

@Injectable()
export class UserService {
    
    private http:Http;

    constructor(http:Http) {
      this.http = http;
    }

    getUsers():Observable<User[]> {      
      return this.http.get(userUrl)
      .map(res => res.json());
                       
    }

    getUserDetail(id:number):Observable<User[]>{
      return this.http.get(BY_ID)
      .map(res => res.json());
    }

    createUser( userId:number, user: User): Observable < User[] > {
    return this.http.post(userUrl, JSON.stringify(user))
      .map(res => {
        let newUser = res.json();
        return Object.assign({}, user, newUser);
      });
  }

   

}
