import { r as t } from "./index-de586565.js";
import { p as h } from "./parse-20d1a128.js";
async function f({ params: d }) {
    let o = localStorage.getItem("access_token");
    const a = "http://localhost:8000";
    if (o == null) throw t(301, "/");
    let n = h(o),
        p = n.user_id,
        r = n.permission;
    if (r != "super_admin" && r != "admin") throw t(301, "/");
    let i = await fetch(`${a}/fields`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }),
        l = await i.json();
    if (l.error || i.status !== 200) throw t(301, "/");
    let c = parseInt(d.contestId),
        s;
    if (
        !isNaN(c) &&
        ((s = await fetch(`${a}/competitions/${c}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((e) => e.json())
            .then((e) => e)
            .catch((e) => {
                throw t(301, "/");
            })),
        s.error != null)
    )
        throw t(301, "/");
    return {
        id: p,
        permission: r,
        fields_data: l,
        access_token: o,
        contest: s,
        API: a,
    };
}
const u = Object.freeze(
    Object.defineProperty({ __proto__: null, load: f }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { u as _, f as l };
