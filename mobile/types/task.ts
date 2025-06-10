import {Colors} from "@/constants/Colors";

export type Task = {
    id: string;
    title: string;
    duration: string;
    times: number;
    frequency: string;
    completed: boolean;
    colorKey: keyof typeof Colors.habit;
    spaceId: string;
}

export type NewTask = Omit<Task, 'id'>;
