import { Component, Input } from '@angular/core';
import { Post } from '../../types/post';

@Component({
  selector: 'app-main-posts',
  standalone: true,
  imports: [],
  templateUrl: './main-posts.component.html',
  styleUrl: './main-posts.component.css'
})
export class MainPostsComponent {
  @Input("postProp") post: Post | null = null;
}
