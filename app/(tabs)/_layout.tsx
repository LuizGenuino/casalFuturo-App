import { getToken, getUser } from "@/utils/storage";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function TabsLayout() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const storedUser = await getUser();
            const storedToken = await getToken();
            setUser(storedUser || null);
            setToken(storedToken || null);
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return null; // ou componente de loading
    }

    if (!user || !token) {
        return <Redirect href={"/(auth)/sign-in"} />;
    }

    return <Stack />;
}
