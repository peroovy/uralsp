import { r as o } from "./index-de586565.js";
import { p } from "./parse-20d1a128.js";
async function u({ params: e }) {
    const a = "http://localhost:8000";
    let c = e.q,
        n = e.adminId,
        t = localStorage.getItem("access_token");
    if (t == null) throw o(301, "/");
    let s = p(t),
        i = s.user_id,
        l = s.permission;
    if (i != n) throw o(301, "/");
    if (l != "admin" && l != "super_admin") throw o(301, "/");
    let d;
    return (
        await fetch(`${a}/users?${c}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((r) => r.json())
            .then((r) => {
                d = r;
            }),
        {
            adminId: n,
            searchQueries: e.q,
            usersOrErr: d,
            token: t,
            real_id: i,
            API: a,
        }
    );
}
const _ = Object.freeze(
    Object.defineProperty({ __proto__: null, load: u }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { _, u as l };
