# Social media
Site for posting publications and interact with them and chat with other people like in social media.
# Technologies
-Angular for front-end.

-Express.js and MongoDB for back-end.

# Features:
-Authenticated users can create posts and edit or delete their own posts. Users can like and comment other users posts and they can search other user profiles. Every user has profile and can edit his profile and change his password too. They can send requests to other users for chating and send, delete or edit messages in chat.

-Guests only see user profiles and their publications and comments without interacting them with liking or commenting and they can't create or edit and delete posts.

# How to start client and server
-Server: First in config/mongoose add localDB constant in mongoose.connect and next write the command `npm start` or `node server.js` in terminal.

-Client: First in auth interceptor uncomment constant environment and comment environmentProd and next write the command `npm start` or `ng serve` in terminal.

# Screenshots
-Home
![Screenshot 2024-12-02 223935](https://github.com/user-attachments/assets/210bb52e-4318-4e38-8db3-1709201c47ea)

-Profile page
![Screenshot 2024-12-02 223956](https://github.com/user-attachments/assets/c3d52d37-c5e9-4238-8f16-64b52cd96b2a)

-Post details in profile page
![Screenshot 2024-12-02 224013](https://github.com/user-attachments/assets/46eb5c46-23de-4c67-94c7-12cfacc3b51f)

-Chats
![Screenshot 2025-02-09 112932](https://github.com/user-attachments/assets/a3da4353-4ae6-4b7b-8862-f07d3ca08732)



