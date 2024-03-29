// @ts-nocheck
import { redirect, type Load } from "@sveltejs/kit";

export let load = async function load({ fetch }: Parameters<Load>[0]) {
    // neglict the login route
    await new Promise((resolve) => setTimeout(resolve, 500));

    let API = import.meta.env.VITE_API_URL;
    let token_respond = await fetch(`${API}/auth/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!token_respond.ok && window.location.href != `https://reg.uralsp.ru/`) {
        document.cookie = "sp_rt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        redirect(307, "/");
    }

    let res = await token_respond.json();
    let token = res.access_token;

    return {
        access_token: token,
        API,
    };
};
