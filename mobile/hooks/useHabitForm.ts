import {useEffect, useRef, useState} from "react";
import {Colors} from "@/constants/Colors";
import {NewTask} from "@/types/task";

export function useHabitForm(initialValues: Partial<NewTask> = {}) {
    const initialized = useRef(false);

    const [title, setTitle] = useState(initialValues.title || "");
    const [frequency, setFrequency] = useState(initialValues.frequency || "DAILY");
    const [times, setTimes] = useState((initialValues.times || 1).toString());
    const [durationValue, setDurationValue] = useState(initialValues.duration?.replace(/[^\d]/g, '') || "15");
    const [durationUnit, setDurationUnit] = useState<"MINUTES" | "HOURS">(
        initialValues.duration?.includes("h") ? "HOURS" : "MINUTES"
    );
    const [space, setSpace] = useState(initialValues.spaceId || "");
    const [selectedColorKey, setSelectedColorKey] = useState<keyof typeof Colors.habit | undefined>(initialValues.colorKey);

    useEffect(() => {
        if (initialized.current) return;
        setTitle(initialValues.title || "");
        setFrequency(initialValues.frequency || "DAILY");
        setTimes((initialValues.times || 1).toString());
        setDurationValue(initialValues.duration?.replace(/[^\d]/g, '') || "15");
        setDurationUnit(initialValues.duration?.includes("h") ? "HOURS" : "MINUTES");
        setSpace(initialValues.spaceId || "");
        setSelectedColorKey(initialValues.colorKey);
        initialized.current = true;
    }, [initialValues]);

    return {
        title, setTitle,
        frequency, setFrequency,
        times, setTimes,
        durationValue, setDurationValue,
        durationUnit, setDurationUnit,
        space, setSpace,
        selectedColorKey, setSelectedColorKey
    };
}
