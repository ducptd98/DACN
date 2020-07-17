import { IUser } from './user.model';
import { IComment } from './comment.model';

export interface IPost {
    id: number;
    title: string;
    content: string;
    tag: string;
    like: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    link: string;
    comments: Array<IComment>;
    user: IUser;
}
