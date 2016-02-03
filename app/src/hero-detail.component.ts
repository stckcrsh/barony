import {Component} from 'angular2/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  selector: 'my-hero-detail',
		 template: `
		   <div *ngIf="hero">
		     <h2>{{hero.name}} details!</h2>
      <div><label>id: </label>{{hero.id}}</div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
    </div>
  `,
  inputs: ['hero']
})

export class HeroDetailComponent {

	constructor(private _heroService: HeroService){}
  public hero: Hero;
}

