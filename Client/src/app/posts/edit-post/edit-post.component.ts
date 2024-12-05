import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-post',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './edit-post.component.html',
    styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit,OnDestroy {
    imagePatter = /^https?:\/\//;
    editForm = new FormGroup({
        description: new FormControl("", [Validators.required, Validators.maxLength(250)]),
        imageUrl: new FormControl("", [Validators.required, Validators.pattern(this.imagePatter)])
    })

    postSubscription:Subscription|null=null;
    editSubscription:Subscription|null=null;

    constructor(private postService: PostsService, private route:ActivatedRoute) { }

    ngOnInit(): void {
        const postId=this.route.snapshot.params["postId"];
        this.postSubscription=this.postService.getPostById(postId).subscribe((post)=>{
            this.editForm.get("description")?.setValue(post.description);
            this.editForm.get("imageUrl")?.setValue(post.imageUrl);
        })
    }

    onEdit(){
        const postId=this.route.snapshot.params["postId"];
        const description=this.editForm.value.description;
        const imageUrl=this.editForm.value.imageUrl;
        this.editSubscription=this.postService.updatePost(postId,{description,imageUrl}).subscribe(()=>{
            history.back();
        })
    }

    onBack(event:Event){
        event.preventDefault();
        history.back();
    }

    ngOnDestroy(): void {
        this.editSubscription?.unsubscribe();
        this.postSubscription?.unsubscribe();
    }
}
