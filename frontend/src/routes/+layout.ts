import type { Load } from "@sveltejs/kit";

export let load: Load = async function load({ fetch }) {
    // neglict the login route 
    // wait for a second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let API = import.meta.env.VITE_API_URL;
    let token_respond = await fetch(`${API}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
    });

    if(!token_respond.ok && window.location.href != "https://reg.uralsp.ru/") {
        document.cookie = "sp_rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // window.location.href = 'https://reg.uralsp.ru/';
    }

    let res = await token_respond.json();
    let token = res.access_token;
    
    return {
        access_token: token,
        API
    }
}