import "dotenv/config";

export default {
    expo: {
        name: "HabitXP",
        slug: "habitxp",
        scheme: "habitxp",
        extra: {
            API_URL: process.env.API_URL,
        },
        plugins: [
            "expo-secure-store",
        ]
    },
};