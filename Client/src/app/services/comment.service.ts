import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../types/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor(private http: HttpClient) { }

    getCommentById(commentId: string | undefined) {
        return this.http.get<Comment>(`/api/comments/${commentId}`);
    }

    createComment(postId: string, content: string | null | undefined) {
        return this.http.post<Comment>(`/api/comments/in/${postId}`, { content });
    }

    editComment(commentId: string, content: string | null | undefined) {
        return this.http.put(`/api/comments/${commentId}`, { content: content });
    }

    deleteComment(commentId: string, postId: string) {
        return this.http.delete(`/api/comments/${commentId}/in/${postId}`);
    }

    likeComment(commentId: string |undefined) {
        return this.http.post<Comment>(`/api/comments/${commentId}/like`, {});
    }

    unlikeComment(commentId: string|undefined) {
        return this.http.post<Comment>(`/api/comments/${commentId}/unlike`, {});
    }
}
