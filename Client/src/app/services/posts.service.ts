import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/app.enviroment';
import { Post } from '../types/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  host = enviroment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllPosts(){
    return this.http.get<Post[]>(`${this.host}/posts`);
  }
  
}
