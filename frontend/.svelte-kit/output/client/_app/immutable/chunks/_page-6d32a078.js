import { p as u } from "./parse-20d1a128.js";
import { r as h } from "./index-de586565.js";
let d = async function ({ parent: n }) {
    let r = await n(),
        { access_token: i, API: a } = r,
        t = i;
    if (t == null) throw h(307, "/");
    u(t).user_id;
    let s = await fetch(`${a}/users/current/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + t,
            },
        }),
        o = await fetch(`${a}/users/current/requests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + t,
            },
        }).then((e) => e.json());
    if (o.length > 0)
        for (let e = 0; e < o.length; e++) {
            let l = o[e].competition,
                p = await fetch(`${a}/competitions/${l}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + t,
                    },
                }).then((c) => c.json());
            o[e].competition_name = p.name;
        }
    return { userInfo: await s.json(), requests: o, API: a };
};
const T = Object.freeze(
    Object.defineProperty({ __proto__: null, load: d }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { T as _, d as l };
