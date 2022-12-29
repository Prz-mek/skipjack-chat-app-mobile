import { getSecure } from "../src/contexts/storageUtils";

export async function getAccessToken() {
    //return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMWVjMTJkYmJjMTZkYzM0ZDEwMDQ1MSIsInVzZXJuYW1lIjoiQWxhIiwiaWF0IjoxNjY5ODk4ODA0LCJleHAiOjE2Nzg1Mzg4MDR9.f3k37MWqKXX-uYri15tnNt3uw34P4Sl0lDC9UOpF1Vk"
    const token = await getSecure("authToken");
    console.log(token);
    return token;
}