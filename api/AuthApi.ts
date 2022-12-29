const LOCAL_URL = "/api/auth"
import {API_ADDRESS} from '@env';

export default class AuthApi {
    static async register(username: string, email: string, password: string) {
        let body = JSON.stringify({username, email, password});
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/register`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: body
        });

        return response;
    }

    static async login(email: string, password: string) {
        console.log(`${API_ADDRESS}${LOCAL_URL}/login`);
        let body = JSON.stringify({email: email, password: password});
        console.log("login");
        let response = await fetch(`${API_ADDRESS}${LOCAL_URL}/login`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: body
        });

        return response;
    }
}