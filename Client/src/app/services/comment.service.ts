import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/app.enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../types/comment';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    constructor(private http: HttpClient) { }

    getCommentById(commentId: string | undefined): Observable<Comment> {
        return this.http.get<Comment>(`/api/comments/${commentId}`);
    }

    createComment(postId:string,content:string | null | undefined){
        return this.http.post<Comment>(`/api/comments/in/${postId}`,{content});
    }

    editComment(commentId:string,content:string){
        return this.http.put(`/api/comments/${commentId}`,{content});
    }

    deleteComment(commentId:string,postId:string){
        return this.http.delete(`/api/comments/${commentId}/in/${postId}`);
    }

    likeComment(commentId:string){
        return this.http.post(`/api/comments/${commentId}/like`,{});
    }

    unlikeComment(commentId:string){
        return this.http.post(`/api/comments/${commentId}/unlike`,{});
    }
}
