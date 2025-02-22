export interface IUser {
    name: string;
    place: string;
    phoneNumber: number;
    email: string;
    loggedIn:boolean
    image:string
}

export interface IRegister extends IUser {
    password: string; 
}
