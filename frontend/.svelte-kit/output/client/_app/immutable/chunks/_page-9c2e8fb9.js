import { p as u } from "./parse-20d1a128.js";
import { r as d } from "./index-de586565.js";
let h = async function ({ parent: a }) {
    let o = await a(),
        { access_token: r, API: e } = o,
        t = r;
    if (t == null) throw d(307, "/");
    u(t).user_id;
    let n = await fetch(`${e}/users/current/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + t,
            },
        }),
        s = await fetch(`${e}/competitions?started=true`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }),
        i = await fetch(`${e}/users/current/requests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + t,
            },
        }).then((c) => c.json()),
        l = await n.json(),
        p = await s.json();
    return { userInfo: l, started_competitions: p, requests: i, API: e };
};
const j = Object.freeze(
    Object.defineProperty({ __proto__: null, load: h }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { j as _, h as l };
