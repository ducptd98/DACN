import { IUser } from './user.model';

export interface IComment {
    id: number;
    post_id: number;
    content: string;
    user_id: number;
    user: IUser;
}
