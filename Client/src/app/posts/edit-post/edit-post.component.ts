import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-post',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './edit-post.component.html',
    styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
    imagePatter = /^https?:\/\//;
    editForm = new FormGroup({
        description: new FormControl("", [Validators.required, Validators.maxLength(250)]),
        imageUrl: new FormControl("", [Validators.required, Validators.pattern(this.imagePatter)])
    })

    constructor(private postService: PostsService, private route:ActivatedRoute) { }

    ngOnInit(): void {
        const postId=this.route.snapshot.params["postId"];
        this.postService.getPostById(postId).subscribe((post)=>{
            console.log(post);
            this.editForm.get("description")?.setValue(post.description);
            this.editForm.get("imageUrl")?.setValue(post.imageUrl);
        })
    }

    onEdit(){
        const postId=this.route.snapshot.params["postId"];
        const description=this.editForm.value.description;
        const imageUrl=this.editForm.value.imageUrl;
        this.postService.updatePost(postId,{description,imageUrl}).subscribe(()=>{
            history.back();
        })
    }

    onBack(event:Event){
        event.preventDefault();
        history.back();
    }
}
