import {Component, OnInit, OnChanges, SimpleChange} from 'angular2/core';
import {Legislator} from './legislator';
import {LegislatorService} from './legislator.service';
import {LegislatorComp} from './legislator.component';


@Component({
	selector: 'legislators',
	templateUrl: './src/legislators/legislators.template.html',
      inputs: ['zipcode'],
	directives: [LegislatorComp],
      providers: [LegislatorService],
      styles: [`
            .list-group-item.active::after {
                  border-top: 15px solid transparent;
                  border-bottom: 15px solid transparent;
                  border-right: 15px solid white;
                  content: ' ';
                  right: -2px;
                  position: absolute;
                  top: 9px;
             }
      `]
})

export class LegislatorsComp implements OnChanges{
	public legislators: Legislator[] = [];
	public selectedLegislator: Legislator;

      ngOnChanges(changes: {[propName: string]: SimpleChange}) {
            this.selectedLegislator = undefined;

            if (changes['zipcode'].currentValue && changes['zipcode'].currentValue.length >= 5) {
                  this._legislatorService.getLegislatorsByZip(changes['zipcode'].currentValue).subscribe(
                        res => {
                              this.legislators = res.json().results;
                        }
                  );
            }
      }

      onKey(event: any){
            console.log(event);
      }

      getLegislators(){
            this._legislatorService.getLegislators().subscribe(
                  res => {
                        this.legislators = res.json().results;
                  }
            );
      }

      private updateLegislators(x){
            console.log(x);
            this.legislators = x;
      }

	constructor(private _legislatorService: LegislatorService){
		this.getLegislators();
	}

	onSelect(legislator: Legislator){
		this.selectedLegislator = legislator;
	}

		
}