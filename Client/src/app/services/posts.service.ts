import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../types/post';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    constructor(private http: HttpClient) { }

    getNexPosts(count:number) {
        return this.http.get<Post[]>(`/api/posts/count/${count}`);
    }

    getPostById(id: string) {
        return this.http.get<Post>(`/api/posts/${id}`)
    }

    likePost(postId: string | undefined) {
        return this.http.post<Post>(`/api/posts/${postId}/like`, {})
    }

    unlikePost(postId: string | undefined) {
        return this.http.post<Post>(`/api/posts/${postId}/unlike`, {})
    }

    createPost(description: string | null | undefined, imageUrl: string | null | undefined) {
        return this.http.post<Post>(`/api/posts`, { description, imageUrl });
    }

    deletePost(postId: string) {
        return this.http.delete(`/api/posts/${postId}`);
    }

    updatePost(postId: string, data: {}) {
        return this.http.put(`/api/posts/${postId}`, data);
    }
}
