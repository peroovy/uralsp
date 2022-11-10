export function parsePayload(token: string): {
    user_id: number;
    expires_in: number;
    permission: string;
} {
    let payload = token.split(".")[1];
    let decoded = atob(payload);
    return JSON.parse(decoded);
}

interface ErrorObject {
    error: string;
    message: Array<{msg: string}> | string;
}

export function handleErrorMsg(msg: ErrorObject): string {
    let error_message = msg.message;
    if (typeof error_message === "string") {
        return error_message;
    } else if (Array.isArray(error_message)) {
        return error_message[0].msg;
    } else {
        return "Something went wrong";
    }
}

export function printMsg(msg: string, type: string, alertCont: HTMLElement): void {
    let alert = `<div class="alert ${type === "success" ? "alert-success" : "alert-danger"} alert-dismissible fade show" role="alert">
                    <strong>${type}!</strong> ${msg}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;

    alertCont.innerHTML = alert;

    setTimeout(() => {
        alertCont.innerHTML = "";
    }, 3000);
}
