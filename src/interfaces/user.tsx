export interface IUser{
    email:string,
    passsword:string,
}

export interface IRegistrationData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "admin" | "user"

  }