import { getToken, getUser } from "@/utils/storage";
import { Redirect, Stack } from "expo-router";

export default function TabsLayout(){
        const user = getUser() // futuramente verificação
        const token = getToken()
        if (!user || !token) return <Redirect href={"/(auth)/sign-in"} />
    
    return <Stack />
}