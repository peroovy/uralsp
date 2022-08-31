export function parsePayload(token: string): {"user_id": number, "expires_in": number, "permission": string} {
    let arr = token.split('.');
    let payload = JSON.parse(atob(arr[1]));
    return payload;
}