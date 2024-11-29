import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-post',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './create-post.component.html',
    styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
    imagePatter = /^https?:\/\//;
    createForm = new FormGroup({
        description: new FormControl("", [Validators.required, Validators.maxLength(250)]),
        imageUrl: new FormControl("", [Validators.required, Validators.pattern(this.imagePatter)])
    })

    constructor(private postService: PostsService, private router: Router) { }

    onCreate() {
        const description = this.createForm.value.description;
        const imageUrl = this.createForm.value.imageUrl;
        this.postService.createPost(description, imageUrl).subscribe((post) => {
            this.router.navigate(['/home']);
        })
    }
}
