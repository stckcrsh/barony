import { Injectable } from '@angular/core';
import { Http ,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { AppStore } from '../../core/store';
import { User } from './user.model';
const BASE_URL: string = 'http://jsonplaceholder.typicode.com/';
const COMMENTURL: string = 'users/';

@Injectable()
export class UserService {
  public users$: Observable<Array<User>>;
  private http: Http;

  constructor(http: Http, private store: Store<AppStore>) {
    this.http = http;
    this.users$ = <Observable<Array<User>>>store.select('users');
  }

  getUsers() {
    this.http.get(`${BASE_URL}${COMMENTURL}`)
      .map(res => res.json())
      .map(payload => ({ type: 'ADD_USER', payload }))
      .subscribe(action => this.store.dispatch(action));
  }

  getUserDetail(id: Number){
    var searchParams = new URLSearchParams();
    searchParams.set('id', id.toString());
    return this.http.get(`${BASE_URL}${COMMENTURL}`, { search: searchParams })
    .map(res => res.json());
  }

  saveUser(user: User) {
    (user.id) ? this.updateUser(user) : this.createUser(user);
  }

  updateUser(user: User) {
    this.http.put(`${BASE_URL}${COMMENTURL}${user.id}`, JSON.stringify(user))
      .subscribe(action => this.store.dispatch({ type: 'UPDATE_USER', payload: user }));
  }

  createUser(user: User) {
    this.http.post(`${BASE_URL}${COMMENTURL}`, JSON.stringify(user))
      .map(res => res.json())
      .map(payload => ({ type: 'CREATE_USER', payload }))
      .subscribe(action => this.store.dispatch(action));
  }
};