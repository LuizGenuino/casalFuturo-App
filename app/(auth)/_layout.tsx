import { getToken, getUser } from "@/utils/storage";
import { Redirect, Stack } from "expo-router"

export default function AuthRoutesLayout() {
    const user = getUser() // futuramente verificação
    const token = getToken()
    if (!user || !token) return <Redirect href={"/"} />


    return <Stack screenOptions={{ headerShown: false }} />;
}