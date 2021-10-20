import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent{

  readonly ROOT_URL = 'http://jsonplaceholder.typicode.com';

  posts: any;

  constructor(private http: HttpClient) { }

  getPosts(){
    this.posts = this.http.get(this.ROOT_URL + "/posts")
  }
}
