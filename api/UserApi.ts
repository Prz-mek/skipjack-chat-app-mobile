const LOCAL_URL = "/api/users"
import {API_ADDRESS} from '@env';

import * as SecureStore from 'expo-secure-store';
import { getAccessToken } from './AuthUtils';

export default class UserApi {
    static async getContacts(): Promise<Response> {
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/contacts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getAccessToken()
            }
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
        console.log("Please work");
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/avatar`, {
            method: "POST",
            // headers: {
            //     "Authorization": "Bearer " + getAccessToken()
            // },
            body: image
        });

        console.log(response);

        return response;
    }

    static async removeAvatar(): Promise<Response> {
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/avatar`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getAccessToken()
            }
        });

        return response;
    }
}