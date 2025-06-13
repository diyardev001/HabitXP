import {Slot} from "expo-router";
import {AuthProvider} from "@/context/AuthContext";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/queryClient";

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Slot/>
            </AuthProvider>
        </QueryClientProvider>
    );
}
