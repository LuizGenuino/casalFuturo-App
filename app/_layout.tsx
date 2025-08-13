import SafeScreen from "@/components/SafeScreen";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {

    return (
        <SafeScreen>
            <Slot />
        </SafeScreen>
    )
}