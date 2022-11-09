import { p as u } from "./parse-20d1a128.js";
import { r as d } from "./index-de586565.js";
let h = async function ({ parent: o }) {
    let a = await o(),
        { access_token: n, API: e } = a,
        t = n;
    if (t == null) throw d(307, "/");
    u(t).user_id;
    let r = await fetch(`${e}/users/current/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + t,
            },
        }),
        i = await fetch(`${e}/competitions?opened=true`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }),
        s = await fetch(`${e}/users/current/requests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + t,
            },
        }).then((c) => c.json()),
        l = await r.json(),
        p = await i.json();
    return { userInfo: l, ongoing_competition: p, requests: s, API: e };
};
const j = Object.freeze(
    Object.defineProperty({ __proto__: null, load: h }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { j as _, h as l };
