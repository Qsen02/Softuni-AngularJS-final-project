import { Routes } from '@angular/router';
import { MainComponent } from './posts/posts.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { LogoutComponent } from './user/logout/logout.component';
import { guestGuard } from '../guards/guest.guard';
import { userGuard } from '../guards/user.guard';
import { PostLikesComponent } from './posts/post-likes/post-likes.component';
import { PostCommentsComponent } from './posts/post-comments/post-comments.component';
import { PostCommentLikesComponent } from './posts/post-comments/post-comment-likes/post-comment-likes.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PostImageComponent } from './posts/post-image/post-image.component';
import { ProfileImageComponent } from './user/profile/profile-image/profile-image.component';
import { ProfilePostDetailsComponent } from './user/profile/profile-post-details/profile-post-details.component';
import { ErrMessageComponent } from './err-message/err-message/err-message.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { DeletePostComponent } from './posts/delete-post/delete-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    {
        path: "home", children: [
            { path: "", component: MainComponent },
            { path: "posts/:postId/likes", component: PostLikesComponent },
            { path: "posts/:postId/comments", component: PostCommentsComponent },
            { path: "posts/:postId/comments/:commentId/likes", component: PostCommentLikesComponent },
            { path: "posts/:postId/image", component: PostImageComponent },
            { path: "posts/:postId/delete", component: DeletePostComponent, canActivate: [userGuard] },
            { path: "posts/:postId/edit", component: EditPostComponent, canActivate: [userGuard] }
        ]
    },
    {
        path: "profile", children: [
            { path: ":userId", component: ProfileComponent },
            { path: ":userId/image", component: ProfileImageComponent },
            { path: ":userId/post/:postId/details", component: ProfilePostDetailsComponent }
        ]
    },
    { path: "create", component: CreatePostComponent, canActivate: [userGuard] },
    { path: "register", component: RegisterComponent, canActivate: [guestGuard] },
    { path: "login", component: LoginComponent, canActivate: [guestGuard] },
    { path: "logout", component: LogoutComponent, canActivate: [userGuard] },
    { path: "error", component: ErrMessageComponent },
    { path: "**", component: ErrorPageComponent },
];
