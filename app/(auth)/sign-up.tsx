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
import { useRouter } from "expo-router";
import { useState } from "react";
import { authStyles } from "../../assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/Colors";

import { Ionicons } from "@expo/vector-icons";
import VerifyEmail from "./verify-email";
import { AuthService } from "@/services";

export default function SignUpScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) return Alert.alert("Error", "Por favor preencha todos os campos");
        if (!email.includes("@") && !email.includes(".")) {
            Alert.alert("Error", "Formato de Email Incorreto");
            return;
        }
        if (password.length < 6) return Alert.alert("Error", "A senha deve ter pelo menos 6 caracteres");
        if (confirmPassword !== password) return Alert.alert("Error", "As senhas devem ser iguais");

        setLoading(true);

        try {
            const authService = new AuthService()
            const response = await authService.signUp({ name, email, password, confirmPassword })
            console.log("response cadastro:", response);
            setPendingVerification(true);
        } catch (err: any) {
            Alert.alert("Error", JSON.parse(err.message).message || "Falha ao criar conta");
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    };

    if (pendingVerification)
        return <VerifyEmail email={email} onBack={() => setPendingVerification(false)} />;

    return (
        <View style={authStyles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                style={authStyles.keyboardView}
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

                    <Text style={authStyles.title}>Crie sua Conta</Text>

                    <View style={authStyles.formContainer}>
                        {/* name Input */}
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Digite seu Nome Completo"
                                placeholderTextColor={COLORS.textLight}
                                value={name}
                                onChangeText={setName}
                                keyboardType="default"
                                autoCapitalize="words"
                            />
                        </View>

                        {/* Email Input */}
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Digite seu Email"
                                placeholderTextColor={COLORS.textLight}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Digite sua Senha"
                                placeholderTextColor={COLORS.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={authStyles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={COLORS.textLight}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={authStyles.inputContainer}>
                            <TextInput
                                style={authStyles.textInput}
                                placeholder="Comfirme sua Senha"
                                placeholderTextColor={COLORS.textLight}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={authStyles.eyeButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color={COLORS.textLight}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Sign Up Button */}
                        <TouchableOpacity
                            style={[authStyles.authButton, loading && authStyles.buttonDisabled]}
                            onPress={handleSignUp}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text style={authStyles.buttonText}>
                                {loading ? "Criando sua Conta..." : "Cadastrar"}
                            </Text>
                        </TouchableOpacity>

                        {/* Sign In Link */}
                        <TouchableOpacity style={authStyles.linkContainer} onPress={() => router.back()}>
                            <Text style={authStyles.linkText}>
                                Já tem uma conta? <Text style={authStyles.link}>Fazer Login</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};
