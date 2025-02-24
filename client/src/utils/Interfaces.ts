export interface IUser {
    name: string;
    place: string;
    phoneNumber: string;
    email: string;
    loggedIn:boolean
    image:string
}

export interface IRegister extends IUser {
    password: string; 
}
export interface IAdmin{
  admin:boolean
}
export interface IAdminUser{
    _id: string,
    isBlocked:boolean
    name: string,
    place: string,
    phoneNumber: string,
    email: string,
    password: string,
    image:string
}
export interface IEdit{
    name: string,
    phoneNumber: string,
    image:string
}