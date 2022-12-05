const LOCAL_URL = "/api/messages"
import {API_ADDRESS} from "@env";

import * as SecureStore from 'expo-secure-store';

export default class MessageApi {
    static async sendMessage(conversationId: string, text: string): Promise<Response> {
        const body = JSON.stringify({ conversationId, text });
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await SecureStore.getItemAsync("authToken")
                
            },
            body: body
        });

        return response;
    }

    static async getMessages(conversationId: string): Promise<Response> {
        const body = JSON.stringify({ conversationId });
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await SecureStore.getItemAsync("authToken")
                
            },
            body: body
        });

        return response;
    }
}