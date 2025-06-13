import {useQuery} from '@tanstack/react-query';
import {fetchUserData} from '@/services/userService';
import {UserData} from "@/types/user";

export function useUserData() {
    return useQuery<UserData>({
        queryKey: ['userData'],
        queryFn: fetchUserData,
        staleTime: 1000 * 60 * 5, // 5 Minuten Cache
    });
}
