import { Component, Input } from '@angular/core';
import { Post } from '../../types/post';

@Component({
  selector: 'app-main-posts',
  standalone: true,
  imports: [],
  templateUrl: './post-items.component.html',
  styleUrl: './post-items.component.css'
})
export class MainPostsComponent {
  @Input("postProp") post: Post | null = null;
}
