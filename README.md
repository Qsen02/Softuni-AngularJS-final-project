# Social media
Site for posting publications and interact with them like in social media.
# Technologies
-Angular for front-end.

-Express.js and MongoDB for back-end.
# API Reference
-Base URL: http://localhost:3000

-Users:

-login (POST)-/users/login

-register (POST)-/users/register

-logout (GET)-/users/logout

-get user by id (GET)-/users/{userId}

-get your profile (GET)-/users/me

-search users (GET)-/users/search/{query}

-edit your profile (PUT)-/users/update/{userId}

-change password (PUT)-/users/changePassword/{userId}

-get user posts (GET)-/users/{userId}/posts

-Posts:

-get next posts (GET)-/posts/count/${count}

-get post by id (GET)-/posts/{postId}

-create post (POST)-/posts

-delete post (DELETE)-/posts/{postId}

-edit post (PUT)-/posts/{postId}

-like post (POST)-/posts/{postId}/like

-unlike post (POST)-/posts/{postId}/unlike

-Comments:

-get comment by id (GET)-/comments/{commentId}

-create commment (POST)-/comments/in/{postId}

-delete comment (DELETE)-/comments/{commentId}/in/{postId}

-edit comment (PUT)-/comments/{commentId}

-like comment (POST)-/comments/{commentId}/like

-unlike comment (POST)-/comments/{commentId}/unlike

# Features:
-Authenticated users can create posts and edit or delete their own posts. Users can like and comment other users posts and they can search other user profiles.Every user has profile and can edit his profile and change his password too.

-Guests only see user profiles and their publications and comments without interacting them with liking or commenting and they can't create or edit and delete posts.

# How to start client and server
-First in config/mongoose add localDB constant in mongoose.connect and next write the command `npm start` or `node server.js` in terminal.

-First in auth interceptor uncomment constant environment and comment environmentProd and next write the command `npm start` or `ng serve` in terminal.

# Deployment link:
-https://softuni-angularjs-final-project.onrender.com

# Screenshots
-Home
![Screenshot 2024-12-02 223935](https://github.com/user-attachments/assets/210bb52e-4318-4e38-8db3-1709201c47ea)

-Profile page
![Screenshot 2024-12-02 223956](https://github.com/user-attachments/assets/c3d52d37-c5e9-4238-8f16-64b52cd96b2a)

-Post details in profile page
![Screenshot 2024-12-02 224013](https://github.com/user-attachments/assets/46eb5c46-23de-4c67-94c7-12cfacc3b51f)


