import { UserData } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setUser(value: UserData) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('CasalFuturo@User', jsonValue);
    } catch (error) {
        console.log("erro storage set user", error);
    }
};

export async function getUser() {
    try {
        const value = await AsyncStorage.getItem('CasalFuturo@User');
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.log("erro storage get user", error);
    }
}

export async function clearUser() {
    try {
        await AsyncStorage.removeItem('CasalFuturo@User');
    } catch (error) {
        console.log("erro storage remove user", error);
    }
}

export async function setToken(value: string) {
    try {
        await AsyncStorage.setItem('CasalFuturo@Token', value);
    } catch (error) {
        console.log("erro storage set user", error);
    }
};

export async function getToken() {
    try {
        const value = await AsyncStorage.getItem('CasalFuturo@Token');
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.log("erro storage get token", error);

    }
}

export async function clearToken() {
    try {
        await AsyncStorage.removeItem('CasalFuturo@Token');
    } catch (error) {
        console.log("erro storage remove token", error);

    }
}