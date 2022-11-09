import { r as redirect } from "../../../../../chunks/index2.js";
import { p as parsePayload } from "../../../../../chunks/parse.js";
let load = async function load2({ params, parent, fetch }) {
    let layoutReturn = await parent();
    const token = layoutReturn.access_token;
    const API = layoutReturn.API;
    if (params.application === void 0) throw new Error("No application specified");
    const requestId = parseInt(params.application);
    if (token === null || isNaN(requestId)) throw redirect(307, "/");
    let payload = parsePayload(token);
    let real_id = payload.user_id;
    let permission = payload.permission;
    let app_respond = await fetch(`${API}/requests/${requestId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (app_respond.status != 200) throw redirect(307, "/admin/" + real_id);
    let app = await app_respond.json();
    let ownerName = "";
    let comp;
    let owner_respond = await fetch(`${API}/users/${app.owner}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (owner_respond.status == 200) {
        let owner = await owner_respond.json();
        ownerName = owner.name + " " + owner.surname;
    } else {
        ownerName = "Unknown";
    }
    let comp_respond = await fetch(`${API}/competitions/${app.competition}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    if (comp_respond.status == 200) {
        comp = await comp_respond.json();
    } else {
        throw Error("Competition not found");
    }
    return {
        app,
        comp,
        ownerName,
        permission,
        real_id,
        access_token: token,
        API,
    };
};
export { load };
