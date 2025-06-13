import {Colors} from "@/constants/Colors";

export type Task = {
    id: string;
    title: string;
    duration: string;
    times: number;
    frequency: string;
    colorKey: keyof typeof Colors.habit;
    spaceId: string;
    completions: string[];

    completionsCount: number;
    isCompleted: boolean;
}

export type NewTask = {
    title: string;
    duration: string;
    frequency: string;
    times: number;
    colorKey: keyof typeof Colors.habit;
    spaceId: string;
}
