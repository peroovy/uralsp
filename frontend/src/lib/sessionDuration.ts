import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { base } from "$app/paths";

export function sessionDuration(): void {
    const now = new Date().getTime();
    if (browser) {
        const expiresDate = parseInt(localStorage.getItem("expires_in")!) * 1000;
        let re = (expiresDate - now) / (1000 * 60);
        if (re <= 0) {
            goto("/");
        }
        setInterval(() => {
            if (re <= 0) {
                localStorage.clear();
                window.location.href = base;
            }
        }, re * 1000 * 60);
    }
}
