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
}
