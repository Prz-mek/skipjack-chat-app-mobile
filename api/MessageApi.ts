const LOCAL_URL = "/api/messages"
import {API_ADDRESS} from "@env";
import { getAccessToken } from "./AuthUtils";

export default class MessageApi {
    // static async sendMessage(conversationId: string, text: string): Promise<Response> {
    //     const body = JSON.stringify({ conversationId, text });
    //     let response = await fetch(`${API_ADDRESS}${LOCAL_URL}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + getAccessToken()
    //         },
    //         body: body
    //     });

    //     return response;
    // }

    static async getMessages(conversationId: string): Promise<Response> {
        console.log(conversationId);
        const body = JSON.stringify({ conversationId });
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getAccessToken()
            },
            body: body
        });

        return response;
    }
}