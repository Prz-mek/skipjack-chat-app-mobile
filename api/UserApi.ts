const LOCAL_URL = "/api/users"
import {API_ADDRESS} from '@env';
import { getAccessToken } from './AuthUtils';

export default class UserApi {
    static async getContacts(): Promise<Response> {
        console.log(`${API_ADDRESS}${LOCAL_URL}/contacts`);
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/contacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getAccessToken()
            }
        });

        return response;
    }

    static async filterUsers(quary: string): Promise<Response> {
        const body = JSON.stringify({ quary });
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/filter`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getAccessToken()
            },
            body: body
        });

        return response;
    }

    static async addContact(userId: string): Promise<Response> {
        const body = JSON.stringify({ userId });
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/contacts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getAccessToken()
            },
            body: body
        });

        return response;
    }

    static async getProfile(): Promise<Response> {
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getAccessToken()
            }
        });

        return response;
    }

    static async uploadAvatar(image: FormData): Promise<Response> {
        console.log(image)
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/avatar`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + getAccessToken()
            },
            body: image
        });

        return response;
    }

    // static async removeAvatar(): Promise<Response> {
    //     let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/avatar`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + getAccessToken()
    //         }
    //     });

    //     return response;
    // }
}