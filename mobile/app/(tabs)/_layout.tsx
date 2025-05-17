import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#8985e9",
                tabBarInactiveTintColor: "#99999b",
                tabBarStyle: {
                    paddingTop: 10
                },
            }}
        >
            <Tabs.Screen
                name={"index"}
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={"home"} color={color} size={size}/>
                    ),
                    headerShown:false,
                }}
            />
            <Tabs.Screen
                name={"mood"}
                options={{
                    title: "Mood Stat",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={"happy"} color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name={"report"}
                options={{
                    title: "Report",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={"bar-chart"} color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name={"habits"}
                options={{
                    title: "Habits",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={"apps"} color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name={"account"}
                options={{
                    title: "Account",
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name={"person"} color={color} size={size}/>
                    ),
                }}
            />
        </Tabs>
    );
}