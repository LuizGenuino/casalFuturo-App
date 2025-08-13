import { Redirect, Stack } from "expo-router"

export default function AuthRoutesLayout() {
    const isSignedIn = false

    if (isSignedIn) return <Redirect href={"/"} />;

    return <Stack screenOptions={{ headerShown: false }} />;
}