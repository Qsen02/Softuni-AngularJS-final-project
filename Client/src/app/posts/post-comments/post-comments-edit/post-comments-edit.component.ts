import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-post-comments-edit',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './post-comments-edit.component.html',
    styleUrl: './post-comments-edit.component.css'
})
export class PostCommentsEditComponent implements OnInit{
    editCommentForm = new FormGroup({
        content: new FormControl("", Validators.required)
    })

    constructor(private commentService:CommentService,private route:ActivatedRoute){}

    ngOnInit(): void {
        const commentId=this.route.snapshot.params['commentId'];
        this.commentService.getCommentById(commentId).subscribe((comment)=>{
          this.editCommentForm.get("content")?.setValue(comment.content);
        })
    }

    onEdit(){
         const content=this.editCommentForm.value.content;
         const commentId=this.route.snapshot.params["commentId"]
         this.commentService.editComment(commentId,content).subscribe(()=>{
            history.back();
         })
    }

    onBack(event:Event){
        event.preventDefault();
        history.back();
    }
}
