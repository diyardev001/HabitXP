export const frequencyOptions = [
    {label: "Täglich", value: "DAILY"},
    {label: "Wöchentlich", value: "WEEKLY"},
    {label: "Monatlich", value: "MONTHLY"},
    {label: "Keine", value: "NONE"},
];

export const frequencyLabels: Record<string, string> = {
    DAILY: "Tag",
    WEEKLY: "Woche",
    MONTHLY: "Monat"
};

export const getDurationLabel = (unit: "MINUTES" | "HOURS", value: string) =>
    unit === "HOURS"
        ? value === "1" ? "Stunde" : "Stunden"
        : value === "1" ? "Minute" : "Minuten";