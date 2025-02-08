import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatsAndMessagesService } from '../../services/chats-and-messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SocketServiceService } from '../../services/socket-service.service';

@Component({
    selector: 'app-chats-message-edit',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './chats-message-edit.component.html',
    styleUrl: './chats-message-edit.component.css',
})
export class ChatsMessageEditComponent implements OnInit, OnDestroy {
    editMessageFrom=new FormGroup({
        text:new FormControl("",Validators.required)
    })

    getMessageSubscription: Subscription | null = null;

    constructor(
        private chatsAndMessage: ChatsAndMessagesService,
        private route: ActivatedRoute,
        private router:Router,
        private socketService:SocketServiceService
    ) {}

    ngOnInit(): void {
        this.socketService.connectSocket();
        const messageId=this.route.snapshot.params['messageId'];
        this.chatsAndMessage.getMessageById(messageId).subscribe((message)=>{
            this.editMessageFrom.get("text")?.setValue(message.text);
        })
    }

    onEdit(){
        const messageId=this.route.snapshot.params['messageId'];
        const userId=this.route.snapshot.params['userId'];
        const text=this.editMessageFrom.value.text;
        this.chatsAndMessage.editMessage(messageId,text).subscribe((message)=>{
            this.editMessageFrom.reset();
            this.router.navigate([`/chats/${userId}`]);
            this.socketService.updateMessage(message);
        })
    }

    onCancel(){
        const userId=this.route.snapshot.params['userId'];
        this.router.navigate([`/chats/${userId}`]);
    }

    ngOnDestroy(): void {
        this.getMessageSubscription?.unsubscribe();
        this.socketService.disconnectSocket();
    }
}
