import { p as s } from "./parse-20d1a128.js";
import { r as c } from "./index-de586565.js";
let d = async function ({ parent: o }) {
    let a = await o(),
        { access_token: n, API: e } = a,
        t = n;
    if (t == null) throw c(307, "/");
    s(t).user_id;
    let r = await fetch(`${e}/users/current/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + t,
            },
        }),
        i = await fetch(`${e}/competitions?opened=false`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }),
        l = await r.json(),
        p = await i.json();
    return { userInfo: l, upComming_competitions: p, API: e };
};
const y = Object.freeze(
    Object.defineProperty({ __proto__: null, load: d }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { y as _, d as l };
