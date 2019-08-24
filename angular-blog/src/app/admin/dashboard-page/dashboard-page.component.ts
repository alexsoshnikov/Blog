import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
    
    posts: Post[] = []
    pSub: Subscription
    dSUb: Subscription
    searchStr = ''
    
    constructor(private postsService: PostService) {}
    
    ngOnInit() {
        
        this.postsService.getAll().subscribe(posts => {
            this.posts = posts
        })
    }
    
    ngOnDestroy() {
        if (this.pSub) {
            this.pSub.unsubscribe()
        }
        
        if (this.dSUb) {
            this.dSUb.unsubscribe()
        }
    }
    
    remove(id: string) {
        this.postsService.remove(id).subscribe(() => {
            this.posts = this.posts.filter(post => post.id !== id)
        })
    }
}
