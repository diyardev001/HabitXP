import api from "@/services/api";
import {Task} from "@/types/task";

export const createTask = async (task: Task) => {
    try {
        const res = await api.post("/tasks", task);
        return res.data;
    } catch (err) {
        console.error("Fehler beim Erstellen des Tasks:", err);
        throw err;
    }
};

export const getTasks = async () => {
    try {
        const res = await api.get("/tasks");
        return res.data;
    } catch (err) {
        console.error("Fehler beim Abrufen aller Tasks:", err);
    }
};

export const getTasksByUser = async (userId: string) => {
    try {
        const res = await api.get(`/tasks?userId=${userId}`);
        return res.data;
    } catch (err) {
        console.error(`Fehler beim Abrufen der Tasks für Benutzer ${userId}:`, err);
    }
};

export const getTaskById = async (id: string) => {
    try {
        const res = await api.get(`/tasks/${id}`);
        return res.data;
    } catch (err) {
        console.error(`Fehler beim Laden des Tasks mit ID ${id}:`, err);
    }
};

export const updateTask = async (task: Task) => {
    try {
        const res = await api.put(`/tasks/${task.id}`, task);
        return res.data;
    } catch (err) {
        console.error(`Fehler beim Aktualisieren des Tasks mit ID ${task.id}:`, err);
    }
};

export const deleteTask = async (id: string) => {
    try {
        await api.delete(`/tasks/${id}`);
    } catch (err) {
        console.error(`Fehler beim Löschen des Tasks mit ID ${id}:`, err);
    }
};