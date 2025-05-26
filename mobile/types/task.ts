export type Task = {
    id?: string;
    title: string;
    deadline?: {
        time: string;
        duration?: string;
    } | null;
    frequency: string;
    isCompleted: boolean;
    color: string;
    accent?: string;
}