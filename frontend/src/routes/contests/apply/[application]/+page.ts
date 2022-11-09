import { parsePayload } from "$lib/helpers";
import { redirect, type Load } from "@sveltejs/kit";

export let load: Load = async function load({ params, parent, fetch }) {
    if (params.application === undefined) throw Error("Application id is not defined");
    redirect(307, "/");

    const contestId = parseInt(params.application);
    if (isNaN(contestId)) return redirect(307, "/");
    let parentLayout = await parent();
    let { access_token, API } = parentLayout;

    // Check the access token in the local storage
    const accessToken = access_token;
    if (accessToken == null) redirect(307, "/");

    let payload = parsePayload(accessToken);
    const userId = payload.user_id;
    const permissions = payload.permission;

    // Get the competition info
    const contest = await fetch(`${API}/competitions/${contestId}`);
    // Get the user old requests
    const oldRequests = await fetch(`${API}/users/current/requests`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (oldRequests.status != 200 || contest.status != 200) {
        redirect(307, "/");
    }
    const oldRequestsJson = await oldRequests.json();
    const contestJson = await contest.json();

    // check if the contest is overdue or upcoming
    const now = Date.now();
    const contestStart = Date.parse(contestJson.registration_start);
    const contestEnd = Date.parse(contestJson.registration_end);

    if (now < contestStart || now > contestEnd) {
        return redirect(307, "/");
    }

    return {
        contest: contestJson,
        oldRequests: oldRequestsJson,
        userId,
        accessToken,
        permissions,
        API,
    };
};
