import {Pipe, PipeFactory} from 'angular2/core';

@Pipe({name: 'capitalize'})
export class Capitalize {
		transform(v, args) { 
			return v.charAt(0).toUpperCase() + v.slice(1); 
		}
}