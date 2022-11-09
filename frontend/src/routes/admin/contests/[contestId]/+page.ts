import { redirect } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { parsePayload } from "$lib/helpers";

// @ts-ignore
export async function load({ params }) {
    if (!browser) return;
    let token = localStorage.getItem("access_token");
    const API = import.meta.env.VITE_API_URL;

    if (token == null) {
        throw redirect(301, "/");
    }
    let payload = parsePayload(token);
    let id = payload.user_id;
    let permission = payload.permission;
    if (permission != "super_admin" && permission != "admin") {
        throw redirect(301, "/");
    }

    // Retrieve all the available fields
    let fields = await fetch(`${API}/fields`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    let fields_data = await fields.json();

    // In case of something goes wrong
    if (fields_data.error || fields.status !== 200) {
        throw redirect(301, "/");
    }

    // Parse the params
    let contestId = parseInt(params.contestId);

    let contest;
    if (!isNaN(contestId)) {
        // Retrieve the contest
        contest = await fetch(`${API}/competitions/${contestId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => {
                throw redirect(301, "/");
            });
        // In case of something goes wrong
        if (contest.error != undefined) {
            throw redirect(301, "/");
        }
    }

    return {
        id,
        permission,
        fields_data,
        access_token: token,
        contest,
        API,
    };
}
