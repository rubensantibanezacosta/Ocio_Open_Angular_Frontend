import { Asisstant } from "./assistant";
import { User } from "./user";
import { Comment } from "./comment"
import { Image } from "./image";

export class Event{
    event_id: number;
    tittle: string;
    date: Date;
    zone: string;
    place: string;
    description: string;
    punctuation_avg: number;
    organizer: string;
    image_id: number;
    organizerdata:User;
    assistants:Asisstant[];
    comments:Comment[];
    images:Image;
}