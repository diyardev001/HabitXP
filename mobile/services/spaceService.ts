import api from "@/services/api";
import {Space} from "@/types/space";

export const getSpaceById = async (id: string): Promise<Space> => {
    const res = await api.get(`/spaces/${id}`);
    return res.data;
};
