import { p as u } from "./parse-20d1a128.js";
import { r as a } from "./index-de586565.js";
let m = async function ({ params: s, parent: d }) {
    let l = await d();
    const e = l.access_token,
        n = l.API;
    let o = s.info ? parseInt(s.info) : null;
    if (o === null) throw new Error("No info specified");
    if (e == null || e == "") throw a(307, "/");
    let p = u(e),
        t = p.permission,
        i = p.user_id;
    if (i != o && t != "admin" && t != "super_admin") throw a(307, "/");
    let r;
    if (
        (i == o
            ? (r = await (
                  await fetch(`${n}/users/current/profile`, {
                      method: "GET",
                      headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${e}`,
                      },
                  })
              ).json())
            : (r = await (
                  await fetch(`${n}/users/${o}`, {
                      method: "GET",
                      headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${e}`,
                      },
                  })
              ).json()),
        i != o && ((t == "admin" && r.permission == "super_admin") || (t == "admin" && r.permission == "admin")))
    )
        throw a(307, "/");
    return { real_id: i, real_permission: t, userInfo: r, API: n };
};
const w = Object.freeze(
    Object.defineProperty({ __proto__: null, load: m }, Symbol.toStringTag, {
        value: "Module",
    })
);
export { w as _, m as l };
