import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import 'rxjs/Rx';

import { Post } from './post.model'

@Injectable()
export class PostService {

    private POSTS: string = 'http://jsonplaceholder.typicode.com/posts';
    private BY_ID: string = 'http://jsonplaceholder.typicode.com/posts/{1}';
    private UPDATE_POST: string = 'http://jsonplaceholder.typicode.com/posts/{1}';
    private CREATE_POST: string = 'http://jsonplaceholder.typicode.com/posts';

    constructor(private http:Http) {}

    getAll():Observable<Post[]> {
      
      return this.http.get(this.POSTS)
                  .map(this.extractData)
                  .catch(this.handleError)
                       
    }

    getByID(id:number):Observable<Post> {
        
        return this.http.get(this.BY_ID.replace('{1}', id.toString())).map(this.extractData).catch(this.handleError)
    }

    add(post:Post):Observable<Post> {

      let body = JSON.stringify(post);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.CREATE_POST, body, options).map(this.extractData).catch(this.handleError);

    }

    update(post:Post):Observable<Post> {

      let body = JSON.stringify(post);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.put(this.UPDATE_POST.replace('{1}', post.id.toString()), body, options).map(this.extractData).catch(this.handleError);

    }



    private extractData(res:Response) {

       if(res.status <200 || res.status>=300) {
    		throw new Error("Response Status :" + res.status)
    	}
       let body = res.json();
       return body;
    }

    private handleError(error:any) {
      
    	console.log(error)
    	let errorMsg = error.message;
    	console.log(errorMsg);
    	return Observable.throw(errorMsg);
    
    }

}
