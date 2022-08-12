import { browser } from '$app/env';
import { goto } from '$app/navigation'
export function sessionDuration(): void{
    setInterval(() => {
        const now = new Date().getTime();
        if(browser){
            const expiresDate = parseInt(localStorage.getItem('expires_in')!) * 1000;
            let re = (expiresDate - now) / (1000*60);
            if(re <= 0){
                goto('/');
            }
        }
    }, 30000);
}