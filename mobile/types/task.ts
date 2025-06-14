import {Colors} from "@/constants/Colors";

export type NewTask = {
    userId: string;
    title: string;
    duration: string;
    frequency: string;
    times: number;
    colorKey: keyof typeof Colors.habit;
    spaceId: string;
}

export type Task = NewTask & {
    id: string;
    completions: string[];
    completionsCount: number;
    isCompleted: boolean;
}
