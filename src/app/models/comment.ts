import { User } from "./user";

export class Comment{
    comment_id:number;
    event_id:number;
    assistant:string;
    comment:string;
    date:Date;
    user:User;
}