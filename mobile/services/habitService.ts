import api from "@/services/api";

export const createHabit = async (habit: any) => {
    const res = await api.post("/habits", habit);
    return res.data;
};

export const getHabits = async () => {
    const res = await api.get("/habits");
    return res.data;
}