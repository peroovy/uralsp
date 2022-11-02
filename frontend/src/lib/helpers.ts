export function parsePayload(token: string): {"user_id": number, "expires_in": number, "permission": string} {
    let payload = token.split('.')[1];
    let decoded = atob(payload);
    return JSON.parse(decoded);
}

interface ErrorObject {error: string, msg: [] | string };

export function handleErrorMsg(msg: ErrorObject): string{
    return (msg != undefined)? (Array.isArray(msg)? msg[0].msg : msg) : "Something went wrong"; 
}   

export function printMsg(msg: string, type: string, alertCont : HTMLElement) {
    let alert = `<div class="alert ${(type === "success")? "alert-success": "alert-danger"} alert-dismissible fade show" role="alert">
                    <strong>${type}!</strong> ${msg}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
    
    alertCont.innerHTML = alert;

    setTimeout(() => {
        alertCont.innerHTML = "";
    }, 3000);
}