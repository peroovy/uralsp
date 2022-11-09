import { p as h } from "./parse-20d1a128.js";
import { r as t } from "./index-de586565.js";
let I = async function ({ params: a, parent: f, fetch: r }) {
    if (a.application === void 0) throw Error("Application id is not defined");
    t(307, "/");
    const e = parseInt(a.application);
    if (isNaN(e)) return t(307, "/");
    let _ = await f(),
        { access_token: w, API: s } = _;
    const o = w;
    o == null && t(307, "/");
    let i = h(o);
    const c = i.user_id,
        m = i.permission,
        p = await r(`${s}/competitions/${e}`),
        l = await r(`${s}/users/current/requests`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${o}`,
            },
        });
    (l.status != 200 || p.status != 200) && t(307, "/");
    const y = await l.json(),
        n = await p.json(),
        d = Date.now(),
        g = Date.parse(n.registration_start),
        j = Date.parse(n.registration_end);
    if (d < g || d > j) return alert("The contest is not open for registration"), t(307, "/");
    const T = y.find((u) => u.owner == e || u.participants.includes(c));
    return {
        contest: n,
        oldRequest: T,
        userId: c,
        accessToken: o,
        permissions: m,
        API: s,
    };
};
const A = Object.freeze(
    Object.defineProperty({ __proto__: null, load: I }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { A as _, I as l };
