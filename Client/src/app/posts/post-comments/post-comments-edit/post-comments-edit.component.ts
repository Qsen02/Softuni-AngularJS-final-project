import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-post-comments-edit',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './post-comments-edit.component.html',
    styleUrl: './post-comments-edit.component.css'
})
export class PostCommentsEditComponent implements OnInit,OnDestroy{
    editCommentForm = new FormGroup({
        content: new FormControl("", Validators.required)
    })

    commentSubscription:Subscription|null=null;
    editSubscription:Subscription|null=null;

    constructor(private commentService:CommentService,private route:ActivatedRoute){}

    ngOnInit(): void {
        const commentId=this.route.snapshot.params['commentId'];
        this.commentSubscription=this.commentService.getCommentById(commentId).subscribe((comment)=>{
          this.editCommentForm.get("content")?.setValue(comment.content);
        })
    }

    onEdit(){
         const content=this.editCommentForm.value.content;
         const commentId=this.route.snapshot.params["commentId"]
         this.editSubscription=this.commentService.editComment(commentId,content).subscribe(()=>{
            history.back();
         })
    }

    onBack(event:Event){
        event.preventDefault();
        history.back();
    }

    ngOnDestroy(): void {
        this.commentSubscription?.unsubscribe();
        this.editSubscription?.unsubscribe();
    }
}
