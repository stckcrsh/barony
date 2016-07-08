import {
	Router,
	RouterConfig,
	ActivatedRoute,
	RouterOutletMap,
	UrlSerializer,
	DefaultUrlSerializer
} from '@angular/router';

import {
	async,
	inject,
	addProviders,
	ComponentFixture
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component, ComponentResolver, Injector } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { PostContainerComponent } from './posts/index';
import { AppComponent } from './app.component';

@Component({
	directives: [AppComponent],
	selector: 'as-test',
	template: '<div><tu-app></tu-app></div>'
})
class TestComponent {}
let config: RouterConfig = [
	{ component: PostContainerComponent, path: '' },
];

// TODO: Use ROUTER_FAKE_PROVIDERS when it's available
describe('AppComponent', () => {
	beforeEach(() => {
		addProviders([
			RouterOutletMap,
			{ provide: LocationStrategy, useClass: SpyLocation },
			{ provide: UrlSerializer, useClass: DefaultUrlSerializer },
			{ provide: Location, useClass: SpyLocation }, {
				deps: [ComponentResolver, UrlSerializer, RouterOutletMap, Location, Injector],
				provide: Router,
				useFactory: (
					resolver: ComponentResolver,
					urlSerializer: UrlSerializer,
					outletMap: RouterOutletMap,
					location: Location,
					injector: Injector) => {
					const r = new Router(TestComponent, resolver, urlSerializer, outletMap, location, injector, config);
					return r;
				}
			},
			{ deps: [Router], provide: ActivatedRoute, useFactory: (r: Router) => r.routerState.root },
		]);
	});

	it('should have brand Angular 2 Starter', async(inject([TestComponentBuilder],
		(tsb: TestComponentBuilder) => {
			tsb.createAsync(TestComponent).then((fixture: ComponentFixture < TestComponent > ) => {
				fixture.detectChanges();
				let compiled = fixture.debugElement.nativeElement;
				expect(compiled).toBeDefined();
				expect(compiled.querySelector('tu-header #applicationName'))
					.toContainText('Toolbox');
			});
		})));
});
