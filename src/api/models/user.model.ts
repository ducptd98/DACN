
export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string;
    avatar_path: {
        encoded: string,
        mine: string,
        dirname: string,
        basename: string,
        extension: string,
        filename: string
    };
    remember_token: string;
    created_at: Date;
    updated_at: Date;
}
