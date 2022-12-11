import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveSecure(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export async function getSecure(key: string) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
        return result;
    } else {
        return null;
    }
}

export async function removeSecure(key: string) {
    await SecureStore.deleteItemAsync(key);
}

export async function saveAsync(key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (err) {
        // saving error
    }
}

export async function getAsync(key: string) {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (err) {
        return null;
    }
}

export async function removeAsync(key: string) {
    await AsyncStorage.removeItem(key);
}