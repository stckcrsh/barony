import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skipWhile';
import { Store } from '@ngrx/store';

import { Post, PostService, PostDetailComponent } from '../posts/index';
import { CommentsList, CreateComment, CommentsService, Comment } from '../comments/index';
import { AppStore, getPost, getUser, getCommentsByPostId, CommentActions } from '../reducers/store';
import { UserSmallDetailComponent, User, UserService } from '../users/index';

@Component({
	directives: [PostDetailComponent, UserSmallDetailComponent, CommentsList, CreateComment],
	providers: [CommentActions],
	selector: 'post-maintain',
	template: `
		<h4><small><a (click)="goBack()">&lt; BACK</a></small></h4>
		<div class="row">
			<user-small-detail [user]="user$ | async" (user-changed)="userChanged($event)" ></user-small-detail>
			<post-detail [post]="post$ | async" (back)="goBack()" (change-post)="postChanged($event)"></post-detail>
			<div class="container">
				<h3>Comments</h3>
				<sa-comments-list [comments]="comments$ | async"></sa-comments-list>
				<sa-comment-create [post-id]="postId$ | async" (create-comment)="createComment($event)"></sa-comment-create>
			</div>
		</div>
	`,

})

/**
 * Post Maintain smart component 
 * Router page
 * @usage <post-maintain></post-maintain>
 */
export class PostDetailPage {

	// stream for the selected post
	public post$: Observable < Post > ;
	public postId$: Observable < String > ;

	// stream for the user for this post
	public user$: Observable < User > ;

	// list of the comments for the selected post
	public comments$: Observable < Comment[] > ;

	/**
	 * Setup the initial values. 
	 * Initialize the streams from their respective services
	 * @param {ActivatedRoute} route The Activated Route 
	 * @param {UserService}  userService User Service
	 * @param {PostService}  postService Post Service
	 */
	constructor(
		private userService: UserService,
		private postService: PostService,
		private commentsService: CommentsService,
		private commentActions: CommentActions,
		private route: ActivatedRoute,
		private store: Store < AppStore >
	) {
		this.post$ = this.route.params.switchMap((params: any) => this.store.let(getPost(params.id)));
		this.postId$ = this.post$.map(post => post.id);
		this.user$ = this.post$.switchMap((post: Post) => this.store.let(getUser(post.userId)));
		this.comments$ = this.post$.switchMap((post: Post) => this.store.let(getCommentsByPostId(post.id)));
	}

	// event handler for the back event
	public goBack() {
		window.history.back();
	}

	// event handler for the change-post event
	public postChanged(post: Post) {
		this.postService.update(post);
	}

	// event handler for the user-changed event
	public userChanged(user: User) {
		this.userService.updateUser(user);
	}

	public save(post: Post) {
		console.log(typeof post);
	}

	public createComment(comment: Comment) {
		this.store.dispatch(this.commentActions.addToCollection(comment));
	}

}
