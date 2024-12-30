import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../types/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    endpoint="comments";

    constructor(private http: HttpClient) { }

    getCommentById(commentId: string | undefined) {
        return this.http.get<Comment>(`/api/${this.endpoint}/${commentId}`);
    }

    createComment(postId: string, content: string | null | undefined) {
        return this.http.post<Comment>(`/api/${this.endpoint}/in/${postId}`, { content });
    }

    editComment(commentId: string, content: string | null | undefined) {
        return this.http.put(`/api/${this.endpoint}/${commentId}`, { content: content });
    }

    deleteComment(commentId: string, postId: string) {
        return this.http.delete(`/api/${this.endpoint}/${commentId}/in/${postId}`);
    }

    likeComment(commentId: string |undefined) {
        return this.http.post<Comment>(`/api/${this.endpoint}/${commentId}/like`, {});
    }

    unlikeComment(commentId: string|undefined) {
        return this.http.post<Comment>(`/api/${this.endpoint}/${commentId}/unlike`, {});
    }
}
