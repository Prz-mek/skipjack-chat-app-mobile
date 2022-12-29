const LOCAL_URL = "/api/conversations"
import { API_ADDRESS } from "@env";
import { getAccessToken } from "./AuthUtils";

export default class ConversationApi {
    static async createConveration(name: string, participantsIds: string[]): Promise<Response> {
        const body = JSON.stringify({ name, participantsIds });
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/group`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await getAccessToken()
            },
            body: body
        });

        return response;
    }

    static async accessDirectConveration(id: string): Promise<Response> {
        const body = JSON.stringify({ userId: id });
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/direct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await getAccessToken()
            },
            body: body
        });

        return response;
    }

    static async getCoversations(): Promise<Response> {
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/short`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await getAccessToken()
            }
        });

        return response;
    }
}