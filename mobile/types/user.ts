export interface UserData {
    id: string;
    refreshToken: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    health: number;
    maxHealth: number;
    coins: number;
    streak: number;
    streakBroken: boolean;
    xpFactor: number;
    xpBonusActive: boolean;
    level: number;
    xp: number;
    currentXP: number;
    xpGoal: number;
    taskLimit: number;
    spaceIds: string[];
    bonusIds: string[];
    avatars: string[];
}