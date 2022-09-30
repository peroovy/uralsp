// @ts-nocheck
import { store_token } from "$lib/stores";
import type { Load } from "@sveltejs/kit";

export let load = async function load({ fetch }: Parameters<Load>[0]) {
    // neglict the login route 
    if (window.location.href === "https://reg.uralsp.ru/") return;
    let API = import.meta.env.VITE_API_URL;
    let token_respond= await fetch(`${API}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
    });
    let res = await token_respond.json();
    let token;
    store_token.subscribe(value => {
		token = value;
	});

    console.log('token', token);
    return {
        access_token: token,
        API
    }
}