import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../shared/post.service";
import {Observable} from "rxjs";
import {Post, Comment} from "../shared/interfaces";
import {switchMap} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../shared/comment.service";
import {AlertService} from "../admin/shared/components/alert.service";

@Component({
    selector: 'app-post-page',
    templateUrl: './post-page.component.html',
    styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
    
    post$: Observable<Post>
    form: FormGroup
    idpost = ''
    
    constructor(private route: ActivatedRoute,
                private postService: PostService,
                private title: Title,
                private commentService: CommentService) {
        this.title.setTitle('Ебучий пост')
    }
    
    ngOnInit() {
    
        this.form = new FormGroup({
            author: new FormControl(null, [Validators.required]),
            text: new FormControl(null, Validators.required)
        })
        
        this.post$ = this.route.params
            .pipe(
                switchMap((params: Params) => {
                    return this.postService.getById(params['id'])
                })
            )
        
        this.post$.subscribe(res => {
            this.idpost = res.id
        })
    }
    
    submit() {
        if (this.form.invalid) {
            return
        }
        
        const comment: Comment = {
            idPost: this.idpost,
            text: this.form.value.text,
            author: this.form.value.author,
            date: new Date()
        }
        
        this.commentService.create(comment).subscribe(() => {
            this.form.reset()
        })
        
    }
    
}
