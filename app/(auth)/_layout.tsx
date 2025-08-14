import { getToken, getUser } from "@/utils/storage";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function AuthRoutesLayout() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // <-- controle de carregamento

    useEffect(() => {
        (async () => {
            const storedUser = await getUser();
            const storedToken = await getToken();
            setUser(storedUser || null);
            setToken(storedToken || null);
            setLoading(false); // <-- terminou de buscar
        })();
    }, []);

    if (loading) {
        return null; // ou <LoadingScreen />
    }

    if (user && token) {
        return <Redirect href="/" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}
