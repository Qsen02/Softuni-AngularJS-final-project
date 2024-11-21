import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/app.enviroment';
import { Post } from '../types/post';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    host = enviroment.apiUrl;
    constructor(private http: HttpClient) {}

    getAllPosts() {
        return this.http.get<Post[]>(`${this.host}/posts`);
    }

    getPostById(id: string) {
        return this.http.get<Post>(`${this.host}/posts/${id}`);
    }

    likePost(postId: string | undefined) {
        return this.http.post(`${this.host}/posts/${postId}/like`, {}).subscribe();
    }

    unlikePost(postId: string | undefined) {
        return this.http.post(`${this.host}/posts/${postId}/unlike`, {}).subscribe();
    }
}
