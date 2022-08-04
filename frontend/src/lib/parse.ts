export function parsePayload(token: string): {"user_id": string, "expires_in": number, "permission": number} {
    let arr = token.split('.');
    let payload = JSON.parse(atob(arr[1]));
    return payload;
}