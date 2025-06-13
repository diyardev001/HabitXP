import {UserData} from "@/types/user";
import api from "@/services/api";

export async function fetchUserData(): Promise<UserData> {
    const response = await api.get<UserData>("/user/profile");
    return response.data;
}