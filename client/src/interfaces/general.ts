export interface IUser {
    github: string;
    name: string;
}

export interface IInitialState {
    users: IUser[];
}