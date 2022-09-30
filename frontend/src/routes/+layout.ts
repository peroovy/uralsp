import type { Load } from "@sveltejs/kit";
import { base } from "$app/paths";

export let load: Load = async function load({ fetch }) {
    // neglict the login route 
    console.log(base.toString(), base);
    if (base.toString() == "/") return;
    let API = import.meta.env.VITE_API_URL;
    let token_respond= await fetch(`${API}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
    });
    let res = await token_respond.json();
    let token = res.access_token;
    return {
        access_token: token,
        API
    }
}