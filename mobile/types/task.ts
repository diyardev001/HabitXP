import {Colors} from "@/constants/Colors";
import {Completion} from "@/types/completion";

export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'NONE';

export type NewTask = {
    userId: string;
    title: string;
    duration: string;
    frequency: Frequency;
    times: number;
    colorKey: keyof typeof Colors.habit;
    spaceId: string;
}

export type Task = NewTask & {
    id: string;
    completions: Completion[];
    completionsCount: number;
    completed: boolean;
}
