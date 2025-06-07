export type Task = {
    id: string;
    title: string;
    duration: string;
    times: number;
    frequency: string;
    isCompleted: boolean;
    color: string;
    accent: string;
    colorCompleted: string;
}

export type NewTask = Omit<Task, 'id'>;
