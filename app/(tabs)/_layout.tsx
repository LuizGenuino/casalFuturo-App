import { Redirect, Stack } from "expo-router";

export default function TabsLayout(){
        const isSignedIn = false // futuramente verificação
    
        if (!isSignedIn) return <Redirect href={"/(auth)/sign-in"} />
    
    return <Stack />
}