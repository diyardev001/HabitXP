import {useQuery} from "@tanstack/react-query";
import {getTasks} from "@/services/taskService";
import {Task} from "@/types/task";

export function useTasks() {
    return useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const data = await getTasks();
            return data.map(task => ({
                ...task,
                completionsCount: task.completions.length,
                isCompleted: task.completions.length >= task.times
            }));
        }
    });
}
