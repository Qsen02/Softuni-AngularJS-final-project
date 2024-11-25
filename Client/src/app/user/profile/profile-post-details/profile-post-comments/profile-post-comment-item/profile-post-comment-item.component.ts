import { Component, Input } from '@angular/core';
import { Comment } from '../../../../../types/comment';

@Component({
  selector: 'app-profile-post-comment-item',
  standalone: true,
  imports: [],
  templateUrl: './profile-post-comment-item.component.html',
  styleUrl: './profile-post-comment-item.component.css'
})
export class ProfilePostCommentItemComponent {
@Input("commentProp") comment:Comment|undefined=undefined;
}
