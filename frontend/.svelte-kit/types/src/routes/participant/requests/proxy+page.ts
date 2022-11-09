// @ts-nocheck
import { parsePayload } from "$lib/parse";
import { redirect, type Load } from "@sveltejs/kit";

export let load = async function load({ parent }: Parameters<Load>[0]) {
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
    let requests = await fetch(`${API}/users/current/requests`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    }).then((res) => res.json());
    if (requests.length > 0) {
        for (let i = 0; i < requests.length; i++) {
            let competition_id = requests[i].competition;
            let competition = await fetch(`${API}/competitions/${competition_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }).then((res) => res.json());
            requests[i].competition_name = competition.name;
        }
    }
    let userInfo = await userData.json();
    return {
        userInfo,
        requests,
        API,
    };
};
