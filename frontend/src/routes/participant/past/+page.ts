import { parsePayload } from "$lib/helpers";
import { redirect, type Load } from "@sveltejs/kit";

export let load: Load = async function load({ parent }) {
    let parentLayout = await parent();
    let { access_token, API } = parentLayout;

    let token = access_token;
    if (token == null) {
        throw redirect(307, "/");
    }
    let payload = parsePayload(token);
    let real_id = payload.user_id;

    let userData = await fetch(`${API}/users/current/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
    let Started_competitions = await fetch(`${API}/competitions?registration=past`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let requests = await fetch(`${API}/users/current/requests`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    }).then((res) => res.json());

    let userInfo = await userData.json();
    let started_competitions = await Started_competitions.json();
    return {
        userInfo,
        started_competitions,
        requests,
        API,
    };
};
