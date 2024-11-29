import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/app.enviroment';
import { Post } from '../types/post';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) { }

    getAllPosts() {
        return this.http.get<Post[]>("/api/posts");
    }

    getPostById(id: string) {
        return this.http.get<Post>(`/api/posts/${id}`)
    }

    likePost(postId: string | undefined) {
        return this.http.post(`/api/posts/${postId}/like`, {})
    }

    unlikePost(postId: string | undefined) {
        return this.http.post(`/api/posts/${postId}/unlike`, {})
    }

    createPost(description: string, imageUrl: string) {
        return this.http.post<Post>(`/api/posts`, { description, imageUrl });
    }

    deletePost(postId: string) {
        return this.http.delete(`/api/posts/${postId}`);
    }

    updatePost(postId:string,data:{}){
        return this.http.put(`/api/posts/${postId}`,data);
    }
}
