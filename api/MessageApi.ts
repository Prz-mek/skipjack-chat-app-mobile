const LOCAL_URL = "/api/messages"
import {API_ADDRESS} from "@env";
import { getAccessToken } from "./AuthUtils";

export default class MessageApi {

    static async getMessages(conversationId: string): Promise<Response> {
        const body = JSON.stringify({ conversationId });
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await getAccessToken()
            },
            body: body
        });

        return response;
    }
}