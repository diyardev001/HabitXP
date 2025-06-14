import {useQuery} from "@tanstack/react-query";
import {getTasks} from "@/services/taskService";
import {Task} from "@/types/task";
import {useAuth} from "@/context/AuthContext";

export function useTasks() {
    const {userId} = useAuth();

    return useQuery<Task[]>({
        queryKey: ['tasks', userId],
        queryFn: async () => {
            const data = await getTasks();
            return data.map(task => ({
                ...task,
                completionsCount: task.completions.length,
                isCompleted: task.completions.length >= task.times
            }));
        },
        enabled: !!userId,
    });
}
