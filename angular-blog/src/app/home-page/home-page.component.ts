import { Component, OnInit } from '@angular/core';
import {PostService} from "../shared/post.service";
import {Observable} from "rxjs";
import {Post} from "../shared/interfaces";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
  posts$: Observable<Post[]>
  constructor(private postService: PostService, private title: Title) {
      title.setTitle('Home page')
  }
  
  ngOnInit() {
     this.posts$ = this.postService.getAll()
  }
  
}
