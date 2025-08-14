export interface UserData {
    id: string;
    name: string;
    email: string;
    lastLogin: string;
    isVerified: boolean;
    cor_hex: string;
    salary: string;
    planId: string;
    subscriptionExpiresAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    success: boolean,
    message: string;
    data?: UserData;
    token?: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface SignUpData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string

}

export interface VerifyEmailData {
    verificationCode: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    resetPasswordToken: string;
    password: string;
    confirmPassword: string;
}
