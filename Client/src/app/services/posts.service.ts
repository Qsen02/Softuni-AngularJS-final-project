import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../types/post';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    endpoint = 'posts';

    constructor(private http: HttpClient) {}

    getNexPosts(count: number) {
        return this.http.get<Post[]>(`/api/${this.endpoint}/count/${count}`);
    }

    getPostById(id: string) {
        return this.http.get<Post>(`/api/${this.endpoint}/${id}`);
    }

    likePost(postId: string | undefined) {
        return this.http.post<Post>(`/api/${this.endpoint}/${postId}/like`, {});
    }

    unlikePost(postId: string | undefined) {
        return this.http.post<Post>(`/api/${this.endpoint}/${postId}/unlike`, {});
    }

    createPost(
        description: string | null | undefined,
        imageUrl: string | null | undefined
    ) {
        return this.http.post<Post>(`/api/${this.endpoint}`, { description, imageUrl });
    }

    deletePost(postId: string) {
        return this.http.delete(`/api/${this.endpoint}/${postId}`);
    }

    updatePost(postId: string, data: {}) {
        return this.http.put(`/api/${this.endpoint}/${postId}`, data);
    }
}
