function parsePayload(token) {
    let payload = token.split(".")[1];
    let decoded = atob(payload);
    return JSON.parse(decoded);
}
export { parsePayload as p };
