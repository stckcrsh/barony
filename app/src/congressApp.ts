import {Component} from 'angular2/core';
import {LegislatorsComp} from './legislators/legislators.component';

@Component({
	template: `
	<div class="container">
		<h1>Legislators</h1>
		<div class="row">
			<div class="form-group col-xs-8" >
				<input class="form-control" placeholder="Zipcode" maxlength="5" [(ngModel)]="zipcode" />
			</div>
		</div>
		<legislators [zipcode]="zipcode" ></legislators>
	</div>
	`,
	selector: 'congress-app',
	directives: [LegislatorsComp]
})

export class CongressApp{
		public zipcode: number;
}