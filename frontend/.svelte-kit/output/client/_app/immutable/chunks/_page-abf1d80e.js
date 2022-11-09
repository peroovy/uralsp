import { r as _ } from "./index-de586565.js";
import { p as y } from "./parse-20d1a128.js";
let $ = async function ({ params: r, parent: h, fetch: o }) {
    let i = await h();
    const e = i.access_token,
        t = i.API;
    if (r.application === void 0) throw new Error("No application specified");
    const s = parseInt(r.application);
    if (e === null || isNaN(s)) throw _(307, "/");
    let p = y(e),
        l = p.user_id,
        f = p.permission,
        d = await o(`${t}/requests/${s}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${e}`,
            },
        });
    if (d.status != 200) throw _(307, "/admin/" + l);
    let a = await d.json(),
        n = "",
        c,
        u = await o(`${t}/users/${a.owner}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${e}`,
            },
        });
    if (u.status == 200) {
        let w = await u.json();
        n = w.name + " " + w.surname;
    } else n = "Unknown";
    let m = await o(`${t}/competitions/${a.competition}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${e}`,
        },
    });
    if (m.status == 200) c = await m.json();
    else throw Error("Competition not found");
    return {
        app: a,
        comp: c,
        ownerName: n,
        permission: f,
        real_id: l,
        access_token: e,
        API: t,
    };
};
const E = Object.freeze(
    Object.defineProperty({ __proto__: null, load: $ }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { E as _, $ as l };
