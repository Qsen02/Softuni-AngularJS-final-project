import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../types/requests';
import { User } from '../types/user';
import { Chat } from '../types/chats';

@Injectable({
    providedIn: 'root',
})
export class RequestsService {
    endpoint = 'requests';

    constructor(private http: HttpClient) {}

    getRequestById(requestId: string) {
        return this.http.get<Request>(`/api/${this.endpoint}/${requestId}`);
    }

    sendRequest(userId: string | undefined) {
        return this.http.post<Request>(`/api/${this.endpoint}`, {
            _id: userId,
        });
    }

    declineRequest(requestId: string | undefined) {
        return this.http.delete<Request>(`/api/${this.endpoint}/${requestId}`);
    }

    acceptRequest(requestId: string | undefined) {
        return this.http.post<{ chat: Chat; request: Request }>(
            `/api/${this.endpoint}/${requestId}`,
            {}
        );
    }
}
