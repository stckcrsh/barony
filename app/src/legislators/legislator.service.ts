import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams} from 'angular2/http';


@Injectable()
export class LegislatorService{
		private search: URLSearchParams;
		private APIKEY: string ="00cf9f3cdee84abe85391bf122749c6d";
		private SUNLIGHTURL: string = 'http://congress.api.sunlightfoundation.com';
		private ZIPCODEKEY: string = 'zip';
		private APIKEYKEY: string = 'apikey';

		constructor(public http: Http){ 
				this.search = new URLSearchParams();
				this.search.set(this.APIKEYKEY, this.APIKEY);
			}

		getLegislators(){
				return this.http.get( this.SUNLIGHTURL + '/legislators', { search: this.search } );
		}

		getLegislatorsByZip(zipcode) {

				var updatedSearch = new URLSearchParams();
				updatedSearch.set(this.ZIPCODEKEY,  zipcode);
				updatedSearch.set(this.APIKEYKEY, this.APIKEY);
				return this.http.get( this.SUNLIGHTURL + '/legislators/locate', { search: updatedSearch });
		}

		getLegislatorUpdates(bioguide_id: string){
				var searchParams = new URLSearchParams();
				searchParams.set(this.APIKEYKEY, this.APIKEY);
				searchParams.set('legislator_ids', bioguide_id);
				return this.http.get(this.SUNLIGHTURL + '/floor_updates', { search: searchParams });
		}
}