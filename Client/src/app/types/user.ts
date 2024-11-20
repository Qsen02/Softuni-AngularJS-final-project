export interface User{
    _id:string,
    username:string,
    email:string,
    password:string,
    profileImage:string
}

export interface AuthUser{
    _id:string,
    username:string,
    email:string,
    profileImage:string,
    accessToken:string
}