import { SignInData, AuthResponse, SignUpData, VerifyEmailData, ForgotPasswordData, ResetPasswordData } from "@/types";
import { getToken } from "@/utils/storage";

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

const DEFAULT_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.2.141:3000/api/v1";
const REQUEST_TIMEOUT = 5000;

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

class NetworkError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

class ApiService {
    private readonly url: string;
    private tokenCache: string | null | undefined = null;

    constructor(
        path: string,
        private baseUrl: string = DEFAULT_BASE_URL
    ) {
        this.url = baseUrl + path;
    }

    public async get<T>(endpoint: string = ""): Promise<T> {
        return this.request<T>(HttpMethod.GET, endpoint);
    }

    public async post<T>(endpoint: string = "", data: any): Promise<T> {
        return this.request<T>(HttpMethod.POST, endpoint, data);
    }

    public clearTokenCache(): void {
        this.tokenCache = null;
    }

    private async request<T>(
        method: HttpMethod,
        endpoint: string = "",
        body?: any
    ): Promise<T> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        try {
            const token = await this.getToken();
            const headers = new Headers({
                "Content-Type": "application/json",
                ...(token && { "Authorization": token })
            });

            const options: RequestInit = {
                method,
                headers,
                signal: controller.signal,
                ...(body && { body: JSON.stringify(body) })
            };

            this.logRequest(options, endpoint);

            const url = `${this.url}${endpoint ? `/${endpoint}` : ''}`;
            const response = await fetch(url, options);

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new ApiError(response.status, await response.text());
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                console.error(`API Error ${error.status}: ${error.message}`);
                throw error;
            }

            console.error("Network error:", error);
            throw new NetworkError(
                error instanceof DOMException && error.name === 'AbortError'
                    ? "Request timeout"
                    : "Erro de conexão com o servidor"
            );
        }
    }

    private async getToken(): Promise<string | null> {
        if (this.tokenCache !== null) return this.tokenCache || null;

        try {
            this.tokenCache = await getToken();
            return this.tokenCache || null;
        } catch (err) {
            console.warn('Erro ao buscar token:', err);
            return null;
        }
    }

    private logRequest(options: RequestInit, endpoint: string): void {
        console.info({
            message: "API Request",
            endpoint,
            method: options.method,
            body: options.body,
            timestamp: new Date().toISOString()
        });
    }
}


export class AuthService {
    private api: ApiService;

    constructor() {
        this.api = new ApiService("/auth");
    }

    public async signIn(data: SignInData): Promise<AuthResponse> {
        return this.api.post<AuthResponse>("signin", data);
    }

    public async signUp(data: SignUpData): Promise<AuthResponse> {
        return this.api.post<AuthResponse>("signup", data);
    }

    public async verifyEmail(data: VerifyEmailData): Promise<AuthResponse> {
        return this.api.post<AuthResponse>("verify-email", data);
    }

    public async ResendVerificationEmail(data: object = {}): Promise<AuthResponse> {
        return this.api.post<AuthResponse>("resend-verification-email", data);
    }

    public async ForgotPassword(data: ForgotPasswordData): Promise<AuthResponse> {
        return this.api.post<AuthResponse>("forgot-password", data);
    }

    public async ResetPassword(data: ResetPasswordData): Promise<AuthResponse> {
        return this.api.post<AuthResponse>("reset-password", data);
    }

    public clearTokenCache(): void {
        this.api.clearTokenCache();
    }
}