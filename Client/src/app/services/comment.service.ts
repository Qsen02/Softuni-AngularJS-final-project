import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/app.enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    host = enviroment.apiUrl;
    constructor(private http: HttpClient) { }

    getCommentById(commentId: string | undefined): Observable<Comment> {
        return this.http.get<Comment>(`${this.host}/comments/${commentId}`);
    }
}
