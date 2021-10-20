import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent{
  posts: any;

  constructor(private http: HttpClient) { }

  getPosts(){
    this.posts = this.http.get<any>("/event/list").subscribe((result: Response) => {
      console.log(result);
    });
  }
}
