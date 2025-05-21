export type Habit = {
    id: string;
    title: string;
    deadline?: {
        time: string;
        duration?: string;
    };
    frequency: string;
    isCompleted: boolean;
    color: string;
    accent?: string;
}