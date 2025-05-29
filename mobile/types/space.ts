import {List} from "postcss/lib/list";

export type Space = {
    id?: string;
    userId: string;
    name: string;
    taskIds: List;
    color: string;
}