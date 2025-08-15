
import { useState } from "react";
import {
    View,
    Text,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { authStyles } from "../../assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/Colors";
import { AuthService } from "@/services";
import { router } from "expo-router";
import { parseMessage } from "@/utils/parseMessage";

export default function VerifyEmail({ email, onBack }: any) {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerification = async () => {
        if (code.length !== 6) {
            Alert.alert("Error", "Codigo Incorreto");
            return;
        }
        setLoading(true);
        try {
            const authService = new AuthService()
            const response = await authService.verifyEmail({ verificationCode: code })
            console.log("response verifica codigo:", response);
            Alert.alert("Sucesso!", "Email Verificado Com Sucesso!", [
                {
                    text: 'Fazer Login',
                    onPress: () => router.push("/(auth)/sign-in" as any),
                }])
        } catch (err: any) {
            const msg = parseMessage(err.message);
            Alert.alert("Error", msg || "A verificação de Email falhou");
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={authStyles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={authStyles.keyboardView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
            >
                <ScrollView
                    contentContainerStyle={authStyles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Image Container */}
                    <View style={authStyles.imageContainer}>
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={authStyles.image}
                            contentFit="contain"
                        />
                    </View>

                    {/* Title */}
                    <Text style={authStyles.title}>Verifique seu Email</Text>
                    <Text style={authStyles.subtitle}>Enviamos um código de verificação para {email}</Text>

                    <View style={authStyles.formContainer}>
                        {/* Verification Code Input */}
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Digite o código de verificação"
                                placeholderTextColor={COLORS.textLight}
                                value={code}
                                onChangeText={setCode}
                                keyboardType="number-pad"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Verify Button */}
                        <TouchableOpacity
                            style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                            onPress={handleVerification}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={authStyles.buttonText}>{loading ? "Verificando..." : "Verificar Email"}</Text>
                        </TouchableOpacity>

                        {/* Back to Sign Up */}
                        <TouchableOpacity style={authStyles.linkContainer} onPress={onBack}>
                            <Text style={authStyles.linkText}>
                                <Text style={authStyles.link}>Voltar para o Cadastro</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
