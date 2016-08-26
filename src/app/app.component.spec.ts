import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { provideRoutes, Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { UserService } from './users/shared/index';
import { CommentsService } from './comments/shared/index';
import { PostService } from './posts/shared/index';
import { store, UserActions, PostActions, CommentActions } from './reducers/store';


@Component({
	selector: 'sa-test-cmp',
	template: '<div class="title">Hello test</div>'
})
class TestRouterComponent {

}

let config: Routes = [
	{ path: '', component: TestRouterComponent }
];

describe('AppComponent', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TestRouterComponent,
				AppComponent
			],
			imports: [RouterTestingModule, RouterModule, HttpModule, store],
			providers: [
				provideRoutes(config),
				UserService,
				CommentsService,
				PostService,

				UserActions, CommentActions, PostActions
			]
		});
	});
	it('should have a title Hello world', async(() => {
		TestBed.compileComponents().then(() => {
			let fixture: ComponentFixture < AppComponent > ;
			fixture = TestBed.createComponent(AppComponent);
			fixture.detectChanges();
			let compiled = fixture.debugElement.nativeElement;
			expect(compiled).toBeDefined();
		});
	}));
});
