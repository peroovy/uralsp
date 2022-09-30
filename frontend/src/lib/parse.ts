export function parsePayload(token: string): {"user_id": number, "expires_in": number, "permission": string} {
    let payload = token.split('.')[1];
    let decoded = atob(payload);
    return JSON.parse(decoded);
}