import { r } from "./index-de586565.js";
import { p as u } from "./parse-20d1a128.js";
const t = "http://localhost:8000",
    _ = async function ({ params: i, fetch: o, parent: h }) {
        let s = i.admin,
            e = localStorage.getItem("access_token");
        if (e == null) throw r(307, "/");
        let a = u(e),
            n = a.user_id,
            l = a.permission;
        if (n != s) throw r(307, "/");
        let p = await o(`${t}/users/current/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + e,
                },
            }),
            c = await o(`${t}/competitions`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }),
            d = await p.json(),
            m = await c.json();
        return {
            userInfo: d,
            competitionsInfo: m,
            permission: l,
            real_id: n,
            access_token: e,
            API: t,
        };
    },
    w = Object.freeze(
        Object.defineProperty({ __proto__: null, load: _ }, Symbol.toStringTag, {
            value: "Module",
        })
    );
export { w as _, _ as l };
