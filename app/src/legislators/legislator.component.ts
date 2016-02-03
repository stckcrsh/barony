import {Component, OnChanges, SimpleChange, Pipe} from 'angular2/core';
import {FloorUpdate} from './floorupdate';
import {LegislatorService} from './legislator.service';
import {Legislator} from './legislator';
import {Capitalize} from './capitalize.pipe';

@Component({
	selector: 'legislator',
	templateUrl: './src/legislators/legislator.template.html',
	styles: [`
		.title {
			height:100%;
			border-top: 1px solid #ddd;
			border-right: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			margin-left: -30px;
			padding-left: 15px;
			padding-right: 15px;
		}

		.floor-updates ul{
			list-style: none;
			padding: 0px;
		}

		.floor-updates li{
			border-bottom: 1px solid #ddd;
			padding-bottom: 5px;
    	padding-top: 12px;
		}

		.floor-updates li .legislative-day {
			display: block;
			font-weight: 700;
		}

		.list-empty {
			display: block;
		}

		li + .list-empty {
			display: none;
		}

	`],
	inputs: ['legislator'],
	providers: [LegislatorService],
	pipes: [Capitalize]
})

export class LegislatorComp implements OnChanges{
	public floorUpdates: FloorUpdate[];

	constructor(private _legislatorService: LegislatorService){}

	ngOnChanges(changes: {[propName: string]: SimpleChange}) {
		var legislator: Legislator = changes['legislator'].currentValue;

		if  (legislator && legislator.in_office){ 
			this._legislatorService.getLegislatorUpdates(changes['legislator'].currentValue.bioguide_id).subscribe(
        res => {
            this.floorUpdates = res.json().results;
        }
      );
		}
	}
}