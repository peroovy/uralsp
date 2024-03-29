import {
    S as We,
    i as Me,
    s as Xe,
    a as Ye,
    e as B,
    c as Qe,
    b as G,
    g as le,
    t as F,
    d as ce,
    f as J,
    h as K,
    j as Ze,
    o as ye,
    k as et,
    l as tt,
    m as nt,
    n as ge,
    p as C,
    q as rt,
    r as at,
    u as ot,
    v as W,
    w as Re,
    x as M,
    y as X,
    z as Ce,
} from "./chunks/index-af757d0f.js";
import { g as xe, f as Be, s as z, a as be, i as st } from "./chunks/singletons-58bd1d19.js";
import { R as Fe, H as ve } from "./chunks/control-03134885.js";
import { s as it } from "./chunks/paths-9678c1af.js";
const lt = (function () {
        const e = document.createElement("link").relList;
        return e && e.supports && e.supports("modulepreload") ? "modulepreload" : "preload";
    })(),
    ct = function (a, e) {
        return new URL(a, e).href;
    },
    Je = {},
    V = function (e, t, c) {
        return !t || t.length === 0
            ? e()
            : Promise.all(
                  t.map((s) => {
                      if (((s = ct(s, c)), s in Je)) return;
                      Je[s] = !0;
                      const d = s.endsWith(".css"),
                          r = d ? '[rel="stylesheet"]' : "";
                      if (document.querySelector(`link[href="${s}"]${r}`)) return;
                      const f = document.createElement("link");
                      if (((f.rel = d ? "stylesheet" : lt), d || ((f.as = "script"), (f.crossOrigin = "")), (f.href = s), document.head.appendChild(f), d))
                          return new Promise((_, m) => {
                              f.addEventListener("load", _), f.addEventListener("error", () => m(new Error(`Unable to preload CSS for ${s}`)));
                          });
                  })
              ).then(() => e());
    };
function ft(a, e) {
    return a === "/" || e === "ignore" ? a : e === "never" ? (a.endsWith("/") ? a.slice(0, -1) : a) : e === "always" && !a.endsWith("/") ? a + "/" : a;
}
function ut(a) {
    for (const e in a)
        a[e] = a[e]
            .replace(/%23/g, "#")
            .replace(/%3[Bb]/g, ";")
            .replace(/%2[Cc]/g, ",")
            .replace(/%2[Ff]/g, "/")
            .replace(/%3[Ff]/g, "?")
            .replace(/%3[Aa]/g, ":")
            .replace(/%40/g, "@")
            .replace(/%26/g, "&")
            .replace(/%3[Dd]/g, "=")
            .replace(/%2[Bb]/g, "+")
            .replace(/%24/g, "$");
    return a;
}
const dt = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function pt(a, e) {
    const t = new URL(a);
    for (const c of dt) {
        let s = t[c];
        Object.defineProperty(t, c, {
            get() {
                return e(), s;
            },
            enumerable: !0,
            configurable: !0,
        });
    }
    return (t[Symbol.for("nodejs.util.inspect.custom")] = (c, s, d) => d(a, s)), ht(t), t;
}
function ht(a) {
    Object.defineProperty(a, "hash", {
        get() {
            throw new Error("Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead");
        },
    });
}
function mt(a) {
    let e = 5381,
        t = a.length;
    if (typeof a == "string") for (; t; ) e = (e * 33) ^ a.charCodeAt(--t);
    else for (; t; ) e = (e * 33) ^ a[--t];
    return (e >>> 0).toString(36);
}
const Le = window.fetch;
window.fetch = (a, e) => {
    if ((a instanceof Request ? a.method : (e == null ? void 0 : e.method) || "GET") !== "GET") {
        const c = new URL(a instanceof Request ? a.url : a.toString(), document.baseURI).href;
        ie.delete(c);
    }
    return Le(a, e);
};
const ie = new Map();
function _t(a, e, t) {
    let s = `script[data-sveltekit-fetched][data-url=${JSON.stringify(a instanceof Request ? a.url : a)}]`;
    t && typeof t.body == "string" && (s += `[data-hash="${mt(t.body)}"]`);
    const d = document.querySelector(s);
    if (d != null && d.textContent) {
        const { body: r, ...f } = JSON.parse(d.textContent),
            _ = d.getAttribute("data-ttl");
        return _ && ie.set(e, { body: r, init: f, ttl: 1e3 * Number(_) }), Promise.resolve(new Response(r, f));
    }
    return Le(a, t);
}
function gt(a, e) {
    const t = ie.get(a);
    if (t) {
        if (performance.now() < t.ttl) return new Response(t.body, t.init);
        ie.delete(a);
    }
    return Le(a, e);
}
const wt = /^(\.\.\.)?(\w+)(?:=(\w+))?$/;
function yt(a) {
    const e = [],
        t = [];
    let c = !0;
    return {
        pattern:
            a === ""
                ? /^\/$/
                : new RegExp(
                      `^${a
                          .split(/(?:\/|$)/)
                          .filter(bt)
                          .map((d, r, f) => {
                              const _ = decodeURIComponent(d),
                                  m = /^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(_);
                              if (m) return e.push(m[1]), t.push(m[2]), "(?:/(.*))?";
                              const y = r === f.length - 1;
                              return (
                                  _ &&
                                  "/" +
                                      _.split(/\[(.+?)\]/)
                                          .map((P, R) => {
                                              if (R % 2) {
                                                  const D = wt.exec(P);
                                                  if (!D) throw new Error(`Invalid param: ${P}. Params and matcher names can only have underscores and alphanumeric characters.`);
                                                  const [, q, N, j] = D;
                                                  return e.push(N), t.push(j), q ? "(.*?)" : "([^/]+?)";
                                              }
                                              return (
                                                  y && P.includes(".") && (c = !1),
                                                  P.normalize()
                                                      .replace(/%5[Bb]/g, "[")
                                                      .replace(/%5[Dd]/g, "]")
                                                      .replace(/#/g, "%23")
                                                      .replace(/\?/g, "%3F")
                                                      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                                              );
                                          })
                                          .join("")
                              );
                          })
                          .join("")}${c ? "/?" : ""}$`
                  ),
        names: e,
        types: t,
    };
}
function bt(a) {
    return !/^\([^)]+\)$/.test(a);
}
function vt(a, e, t, c) {
    const s = {};
    for (let d = 0; d < e.length; d += 1) {
        const r = e[d],
            f = t[d],
            _ = a[d + 1] || "";
        if (f) {
            const m = c[f];
            if (!m) throw new Error(`Missing "${f}" param matcher`);
            if (!m(_)) return;
        }
        s[r] = _;
    }
    return s;
}
function Et(a, e, t, c) {
    const s = new Set(e);
    return Object.entries(t).map(([f, [_, m, y]]) => {
        const { pattern: P, names: R, types: D } = yt(f),
            q = {
                id: f,
                exec: (N) => {
                    const j = P.exec(N);
                    if (j) return vt(j, R, D, c);
                },
                errors: [1, ...(y || [])].map((N) => a[N]),
                layouts: [0, ...(m || [])].map(r),
                leaf: d(_),
            };
        return (q.errors.length = q.layouts.length = Math.max(q.errors.length, q.layouts.length)), q;
    });
    function d(f) {
        const _ = f < 0;
        return _ && (f = ~f), [_, a[f]];
    }
    function r(f) {
        return f === void 0 ? f : [s.has(f), a[f]];
    }
}
function kt(a) {
    let e, t, c;
    var s = a[0][0];
    function d(r) {
        return { props: { data: r[2], form: r[1] } };
    }
    return (
        s && (e = new s(d(a))),
        {
            c() {
                e && W(e.$$.fragment), (t = B());
            },
            l(r) {
                e && Re(e.$$.fragment, r), (t = B());
            },
            m(r, f) {
                e && M(e, r, f), G(r, t, f), (c = !0);
            },
            p(r, f) {
                const _ = {};
                if ((f & 4 && (_.data = r[2]), f & 2 && (_.form = r[1]), s !== (s = r[0][0]))) {
                    if (e) {
                        le();
                        const m = e;
                        F(m.$$.fragment, 1, 0, () => {
                            X(m, 1);
                        }),
                            ce();
                    }
                    s ? ((e = new s(d(r))), W(e.$$.fragment), J(e.$$.fragment, 1), M(e, t.parentNode, t)) : (e = null);
                } else s && e.$set(_);
            },
            i(r) {
                c || (e && J(e.$$.fragment, r), (c = !0));
            },
            o(r) {
                e && F(e.$$.fragment, r), (c = !1);
            },
            d(r) {
                r && K(t), e && X(e, r);
            },
        }
    );
}
function Rt(a) {
    let e, t, c;
    var s = a[0][0];
    function d(r) {
        return {
            props: { data: r[2], $$slots: { default: [Lt] }, $$scope: { ctx: r } },
        };
    }
    return (
        s && (e = new s(d(a))),
        {
            c() {
                e && W(e.$$.fragment), (t = B());
            },
            l(r) {
                e && Re(e.$$.fragment, r), (t = B());
            },
            m(r, f) {
                e && M(e, r, f), G(r, t, f), (c = !0);
            },
            p(r, f) {
                const _ = {};
                if ((f & 4 && (_.data = r[2]), f & 523 && (_.$$scope = { dirty: f, ctx: r }), s !== (s = r[0][0]))) {
                    if (e) {
                        le();
                        const m = e;
                        F(m.$$.fragment, 1, 0, () => {
                            X(m, 1);
                        }),
                            ce();
                    }
                    s ? ((e = new s(d(r))), W(e.$$.fragment), J(e.$$.fragment, 1), M(e, t.parentNode, t)) : (e = null);
                } else s && e.$set(_);
            },
            i(r) {
                c || (e && J(e.$$.fragment, r), (c = !0));
            },
            o(r) {
                e && F(e.$$.fragment, r), (c = !1);
            },
            d(r) {
                r && K(t), e && X(e, r);
            },
        }
    );
}
function Lt(a) {
    let e, t, c;
    var s = a[0][1];
    function d(r) {
        return { props: { data: r[3], form: r[1] } };
    }
    return (
        s && (e = new s(d(a))),
        {
            c() {
                e && W(e.$$.fragment), (t = B());
            },
            l(r) {
                e && Re(e.$$.fragment, r), (t = B());
            },
            m(r, f) {
                e && M(e, r, f), G(r, t, f), (c = !0);
            },
            p(r, f) {
                const _ = {};
                if ((f & 8 && (_.data = r[3]), f & 2 && (_.form = r[1]), s !== (s = r[0][1]))) {
                    if (e) {
                        le();
                        const m = e;
                        F(m.$$.fragment, 1, 0, () => {
                            X(m, 1);
                        }),
                            ce();
                    }
                    s ? ((e = new s(d(r))), W(e.$$.fragment), J(e.$$.fragment, 1), M(e, t.parentNode, t)) : (e = null);
                } else s && e.$set(_);
            },
            i(r) {
                c || (e && J(e.$$.fragment, r), (c = !0));
            },
            o(r) {
                e && F(e.$$.fragment, r), (c = !1);
            },
            d(r) {
                r && K(t), e && X(e, r);
            },
        }
    );
}
function Ke(a) {
    let e,
        t = a[5] && ze(a);
    return {
        c() {
            (e = et("div")), t && t.c(), this.h();
        },
        l(c) {
            e = tt(c, "DIV", {
                id: !0,
                "aria-live": !0,
                "aria-atomic": !0,
                style: !0,
            });
            var s = nt(e);
            t && t.l(s), s.forEach(K), this.h();
        },
        h() {
            ge(e, "id", "svelte-announcer"),
                ge(e, "aria-live", "assertive"),
                ge(e, "aria-atomic", "true"),
                C(e, "position", "absolute"),
                C(e, "left", "0"),
                C(e, "top", "0"),
                C(e, "clip", "rect(0 0 0 0)"),
                C(e, "clip-path", "inset(50%)"),
                C(e, "overflow", "hidden"),
                C(e, "white-space", "nowrap"),
                C(e, "width", "1px"),
                C(e, "height", "1px");
        },
        m(c, s) {
            G(c, e, s), t && t.m(e, null);
        },
        p(c, s) {
            c[5] ? (t ? t.p(c, s) : ((t = ze(c)), t.c(), t.m(e, null))) : t && (t.d(1), (t = null));
        },
        d(c) {
            c && K(e), t && t.d();
        },
    };
}
function ze(a) {
    let e;
    return {
        c() {
            e = rt(a[6]);
        },
        l(t) {
            e = at(t, a[6]);
        },
        m(t, c) {
            G(t, e, c);
        },
        p(t, c) {
            c & 64 && ot(e, t[6]);
        },
        d(t) {
            t && K(e);
        },
    };
}
function St(a) {
    let e, t, c, s, d;
    const r = [Rt, kt],
        f = [];
    function _(y, P) {
        return y[0][1] ? 0 : 1;
    }
    (e = _(a)), (t = f[e] = r[e](a));
    let m = a[4] && Ke(a);
    return {
        c() {
            t.c(), (c = Ye()), m && m.c(), (s = B());
        },
        l(y) {
            t.l(y), (c = Qe(y)), m && m.l(y), (s = B());
        },
        m(y, P) {
            f[e].m(y, P), G(y, c, P), m && m.m(y, P), G(y, s, P), (d = !0);
        },
        p(y, [P]) {
            let R = e;
            (e = _(y)),
                e === R
                    ? f[e].p(y, P)
                    : (le(),
                      F(f[R], 1, 1, () => {
                          f[R] = null;
                      }),
                      ce(),
                      (t = f[e]),
                      t ? t.p(y, P) : ((t = f[e] = r[e](y)), t.c()),
                      J(t, 1),
                      t.m(c.parentNode, c)),
                y[4] ? (m ? m.p(y, P) : ((m = Ke(y)), m.c(), m.m(s.parentNode, s))) : m && (m.d(1), (m = null));
        },
        i(y) {
            d || (J(t), (d = !0));
        },
        o(y) {
            F(t), (d = !1);
        },
        d(y) {
            f[e].d(y), y && K(c), m && m.d(y), y && K(s);
        },
    };
}
function Pt(a, e, t) {
    let { stores: c } = e,
        { page: s } = e,
        { components: d } = e,
        { form: r } = e,
        { data_0: f = null } = e,
        { data_1: _ = null } = e;
    Ze(c.page.notify);
    let m = !1,
        y = !1,
        P = null;
    return (
        ye(() => {
            const R = c.page.subscribe(() => {
                m && (t(5, (y = !0)), t(6, (P = document.title || "untitled page")));
            });
            return t(4, (m = !0)), R;
        }),
        (a.$$set = (R) => {
            "stores" in R && t(7, (c = R.stores)),
                "page" in R && t(8, (s = R.page)),
                "components" in R && t(0, (d = R.components)),
                "form" in R && t(1, (r = R.form)),
                "data_0" in R && t(2, (f = R.data_0)),
                "data_1" in R && t(3, (_ = R.data_1));
        }),
        (a.$$.update = () => {
            a.$$.dirty & 384 && c.page.set(s);
        }),
        [d, r, f, _, m, y, P, c, s]
    );
}
class $t extends We {
    constructor(e) {
        super(),
            Me(this, e, Pt, St, Xe, {
                stores: 7,
                page: 8,
                components: 0,
                form: 1,
                data_0: 2,
                data_1: 3,
            });
    }
}
const It = {},
    fe = [
        () =>
            V(
                () => import("./chunks/0-9e2c4838.js"),
                ["chunks/0-9e2c4838.js", "chunks/_layout-43d6079a.js", "components/pages/_layout.svelte-e1f27d6a.js", "assets/_layout-554f1dec.css", "chunks/index-af757d0f.js"],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/1-5c28882a.js"),
                ["chunks/1-5c28882a.js", "components/error.svelte-17c224e8.js", "chunks/index-af757d0f.js", "chunks/stores-0b118143.js", "chunks/singletons-58bd1d19.js", "chunks/paths-9678c1af.js"],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/2-78158c6a.js"),
                [
                    "chunks/2-78158c6a.js",
                    "components/pages/_page.svelte-fc9a1d1f.js",
                    "assets/_page-068c8852.css",
                    "chunks/index-af757d0f.js",
                    "chunks/logo-ed4c505e.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/parse-20d1a128.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/3-69137402.js"),
                [
                    "chunks/3-69137402.js",
                    "chunks/_page-f6194905.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "chunks/parse-20d1a128.js",
                    "components/pages/admin/_adminId_/users/_...q_/_page.svelte-6c69e11c.js",
                    "assets/_page-f12235d8.css",
                    "chunks/index-af757d0f.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/xlsx-84570272.js",
                    "chunks/stores-0b118143.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/republics-74048aea.js",
                    "chunks/sessionDuration-e379fb60.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/4-1374eda7.js"),
                [
                    "chunks/4-1374eda7.js",
                    "chunks/_page-e35258a9.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "chunks/parse-20d1a128.js",
                    "components/pages/admin/_admin_/_page.svelte-70d1a678.js",
                    "assets/_page-ee457a93.css",
                    "chunks/index-af757d0f.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/stores-0b118143.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/xlsx-84570272.js",
                    "chunks/logo-ed4c505e.js",
                    "chunks/temp-photo-9fe1d42c.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/republics-74048aea.js",
                    "chunks/sessionDuration-e379fb60.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/5-887278d6.js"),
                [
                    "chunks/5-887278d6.js",
                    "chunks/_page-d0b9a850.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "chunks/parse-20d1a128.js",
                    "components/pages/admin/contests/_contestId_/_page.svelte-12e3d50d.js",
                    "assets/_page-f898422b.css",
                    "chunks/index-af757d0f.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/sessionDuration-e379fb60.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/stores-0b118143.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/6-a12f254d.js"),
                [
                    "chunks/6-a12f254d.js",
                    "chunks/_page-abf1d80e.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "chunks/parse-20d1a128.js",
                    "components/pages/admin/requests/_application_/_page.svelte-e1814497.js",
                    "assets/_page-47b60074.css",
                    "chunks/index-af757d0f.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/stores-0b118143.js",
                    "chunks/singletons-58bd1d19.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/7-95e3f31e.js"),
                [
                    "chunks/7-95e3f31e.js",
                    "chunks/_page-9a73f9d1.js",
                    "chunks/parse-20d1a128.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "components/pages/contests/apply/_application_/_page.svelte-e0bb4116.js",
                    "assets/_page-2b34f11b.css",
                    "chunks/index-af757d0f.js",
                    "chunks/sessionDuration-e379fb60.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/stores-0b118143.js",
                    "chunks/dots-63d78b83.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/8-f2fab0d2.js"),
                [
                    "chunks/8-f2fab0d2.js",
                    "chunks/_page-d416d860.js",
                    "chunks/parse-20d1a128.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "components/pages/info/_info_/_page.svelte-6879ac38.js",
                    "assets/_page-d7b74a8d.css",
                    "chunks/index-af757d0f.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/republics-74048aea.js",
                    "chunks/sessionDuration-e379fb60.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/stores-0b118143.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/9-e70ff6e3.js"),
                [
                    "chunks/9-e70ff6e3.js",
                    "chunks/_page-faf51b4e.js",
                    "chunks/parse-20d1a128.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "components/pages/participant/ongoing/_page.svelte-430a3f08.js",
                    "assets/_page-e07051d2.css",
                    "chunks/index-af757d0f.js",
                    "chunks/stores-0b118143.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/navbar-6efa5a58.js",
                    "assets/navbar-5426d2bc.css",
                    "chunks/logo-ed4c505e.js",
                    "chunks/temp-photo-9fe1d42c.js",
                    "chunks/sessionDuration-e379fb60.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/10-6dad9bc3.js"),
                [
                    "chunks/10-6dad9bc3.js",
                    "chunks/_page-9c2e8fb9.js",
                    "chunks/parse-20d1a128.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "components/pages/participant/past/_page.svelte-4c1c9932.js",
                    "assets/_page-e07051d2.css",
                    "chunks/index-af757d0f.js",
                    "chunks/stores-0b118143.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/navbar-6efa5a58.js",
                    "assets/navbar-5426d2bc.css",
                    "chunks/logo-ed4c505e.js",
                    "chunks/temp-photo-9fe1d42c.js",
                    "chunks/sessionDuration-e379fb60.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/11-9b62304f.js"),
                [
                    "chunks/11-9b62304f.js",
                    "chunks/_page-6d32a078.js",
                    "chunks/parse-20d1a128.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "components/pages/participant/requests/_page.svelte-4aab84be.js",
                    "assets/_page-721cbdbb.css",
                    "chunks/index-af757d0f.js",
                    "chunks/stores-0b118143.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/navbar-6efa5a58.js",
                    "assets/navbar-5426d2bc.css",
                    "chunks/logo-ed4c505e.js",
                    "chunks/temp-photo-9fe1d42c.js",
                    "chunks/sessionDuration-e379fb60.js",
                ],
                import.meta.url
            ),
        () =>
            V(
                () => import("./chunks/12-0c047538.js"),
                [
                    "chunks/12-0c047538.js",
                    "chunks/_page-08afc2d2.js",
                    "chunks/parse-20d1a128.js",
                    "chunks/index-de586565.js",
                    "chunks/control-03134885.js",
                    "components/pages/participant/upcoming/_page.svelte-315bc43c.js",
                    "assets/_page-f88f54c5.css",
                    "chunks/index-af757d0f.js",
                    "chunks/stores-0b118143.js",
                    "chunks/singletons-58bd1d19.js",
                    "chunks/paths-9678c1af.js",
                    "chunks/dots-63d78b83.js",
                    "chunks/navbar-6efa5a58.js",
                    "assets/navbar-5426d2bc.css",
                    "chunks/logo-ed4c505e.js",
                    "chunks/temp-photo-9fe1d42c.js",
                    "chunks/sessionDuration-e379fb60.js",
                ],
                import.meta.url
            ),
    ],
    Ot = [],
    At = {
        "": [2],
        "participant/ongoing": [9],
        "participant/past": [10],
        "participant/requests": [11],
        "participant/upcoming": [12],
        "admin/contests/[contestId]": [5],
        "admin/requests/[application]": [6],
        "contests/apply/[application]": [7],
        "admin/[admin]": [4],
        "info/[info]": [8],
        "admin/[adminId]/users/[...q]": [3],
    },
    Ut = {
        handleError: ({ error: a }) => {
            console.error(a);
        },
    },
    Tt = "/__data.js";
async function Dt(a) {
    var e;
    for (const t in a) if (typeof ((e = a[t]) == null ? void 0 : e.then) == "function") return Object.fromEntries(await Promise.all(Object.entries(a).map(async ([c, s]) => [c, await s])));
    return a;
}
const He = "sveltekit:scroll",
    x = "sveltekit:index",
    ae = Et(fe, Ot, At, It),
    Ee = fe[0],
    ke = fe[1];
Ee();
ke();
let ee = {};
try {
    ee = JSON.parse(sessionStorage[He]);
} catch {}
function we(a) {
    ee[a] = be();
}
function jt({ target: a, base: e, trailing_slash: t }) {
    var Ve;
    const c = [];
    let s = null;
    const d = { before_navigate: [], after_navigate: [] };
    let r = { branch: [], error: null, url: null },
        f = !1,
        _ = !1,
        m = !0,
        y = !1,
        P = !1,
        R,
        D = (Ve = history.state) == null ? void 0 : Ve[x];
    D || ((D = Date.now()), history.replaceState({ ...history.state, [x]: D }, "", location.href));
    const q = ee[D];
    q && ((history.scrollRestoration = "manual"), scrollTo(q.x, q.y));
    let N = !1,
        j,
        Se,
        te;
    async function Pe() {
        (te = te || Promise.resolve()), await te, (te = null);
        const n = new URL(location.href),
            l = he(n, !0);
        (s = null), await Ie(l, n, []);
    }
    async function ue(n, { noscroll: l = !1, replaceState: u = !1, keepfocus: o = !1, state: i = {} }, p, h) {
        return (
            typeof n == "string" && (n = new URL(n, xe(document))),
            me({
                url: n,
                scroll: l ? be() : null,
                keepfocus: o,
                redirect_chain: p,
                details: { state: i, replaceState: u },
                nav_token: h,
                accepted: () => {},
                blocked: () => {},
                type: "goto",
            })
        );
    }
    async function $e(n) {
        const l = he(n, !1);
        if (!l) throw new Error("Attempted to prefetch a URL that does not belong to this app");
        return (s = { id: l.id, promise: Ue(l) }), s.promise;
    }
    async function Ie(n, l, u, o, i = {}, p) {
        var E, v;
        Se = i;
        let h = n && (await Ue(n));
        if (
            (h ||
                (h = await je(
                    l,
                    null,
                    Z(new Error(`Not found: ${l.pathname}`), {
                        url: l,
                        params: {},
                        routeId: null,
                    }),
                    404
                )),
            (l = (n == null ? void 0 : n.url) || l),
            Se !== i)
        )
            return !1;
        if (h.type === "redirect")
            if (u.length > 10 || u.includes(l.pathname))
                h = await ne({
                    status: 500,
                    error: Z(new Error("Redirect loop"), {
                        url: l,
                        params: {},
                        routeId: null,
                    }),
                    url: l,
                    routeId: null,
                });
            else return ue(new URL(h.location, l).href, {}, [...u, l.pathname], i), !1;
        else ((v = (E = h.props) == null ? void 0 : E.page) == null ? void 0 : v.status) >= 400 && (await z.updated.check()) && (await re(l));
        if (((c.length = 0), (P = !1), (y = !0), o && o.details)) {
            const { details: w } = o,
                b = w.replaceState ? 0 : 1;
            (w.state[x] = D += b), history[w.replaceState ? "replaceState" : "pushState"](w.state, "", l);
        }
        if (((s = null), _)) {
            (r = h.state), h.props.page && (h.props.page.url = l);
            const w = se();
            R.$set(h.props), w();
        } else Oe(h);
        if (o) {
            const { scroll: w, keepfocus: b } = o;
            if (!b) {
                const L = document.body,
                    $ = L.getAttribute("tabindex");
                (L.tabIndex = -1),
                    L.focus({ preventScroll: !0 }),
                    setTimeout(() => {
                        var I;
                        (I = getSelection()) == null || I.removeAllRanges();
                    }),
                    $ !== null ? L.setAttribute("tabindex", $) : L.removeAttribute("tabindex");
            }
            if ((await Ce(), m)) {
                const L = l.hash && document.getElementById(l.hash.slice(1));
                w ? scrollTo(w.x, w.y) : L ? L.scrollIntoView() : scrollTo(0, 0);
            }
        } else await Ce();
        (m = !0), h.props.page && (j = h.props.page), p && p(), (y = !1);
    }
    function Oe(n) {
        var i, p;
        r = n.state;
        const l = document.querySelector("style[data-sveltekit]");
        l && l.remove(), (j = n.props.page);
        const u = se();
        (R = new $t({ target: a, props: { ...n.props, stores: z }, hydrate: !0 })), u();
        const o = {
            from: null,
            to: oe("to", {
                params: r.params,
                routeId: (p = (i = r.route) == null ? void 0 : i.id) != null ? p : null,
                url: new URL(location.href),
            }),
            type: "load",
        };
        d.after_navigate.forEach((h) => h(o)), (_ = !0);
    }
    async function Y({ url: n, params: l, branch: u, status: o, error: i, route: p, form: h }) {
        var $;
        const E = u.filter(Boolean),
            v = {
                type: "loaded",
                state: { url: n, params: l, branch: u, error: i, route: p },
                props: { components: E.map((I) => I.node.component) },
            };
        h !== void 0 && (v.props.form = h);
        let w = {},
            b = !j;
        for (let I = 0; I < E.length; I += 1) {
            const U = E[I];
            (w = { ...w, ...U.data }), (b || !r.branch.some((T) => T === U)) && ((v.props[`data_${I}`] = w), (b = b || Object.keys(($ = U.data) != null ? $ : {}).length > 0));
        }
        if ((b || (b = Object.keys(j.data).length !== Object.keys(w).length), !r.url || n.href !== r.url.href || r.error !== i || b)) {
            v.props.page = {
                error: i,
                params: l,
                routeId: p && p.id,
                status: o,
                url: n,
                data: b ? w : j.data,
            };
            const I = (U, T) => {
                Object.defineProperty(v.props.page, U, {
                    get: () => {
                        throw new Error(`$page.${U} has been replaced by $page.url.${T}`);
                    },
                });
            };
            I("origin", "origin"), I("path", "pathname"), I("query", "searchParams");
        }
        return v;
    }
    async function de({ loader: n, parent: l, url: u, params: o, routeId: i, server_data_node: p }) {
        var w, b, L, $, I;
        let h = null;
        const E = {
                dependencies: new Set(),
                params: new Set(),
                parent: !1,
                url: !1,
            },
            v = await n();
        if ((w = v.shared) != null && w.load) {
            let U = function (...S) {
                for (const g of S) {
                    const { href: k } = new URL(g, u);
                    E.dependencies.add(k);
                }
            };
            const T = {
                routeId: i,
                params: new Proxy(o, { get: (S, g) => (E.params.add(g), S[g]) }),
                data: (b = p == null ? void 0 : p.data) != null ? b : null,
                url: pt(u, () => {
                    E.url = !0;
                }),
                async fetch(S, g) {
                    let k;
                    S instanceof Request
                        ? ((k = S.url),
                          (g = {
                              body: S.method === "GET" || S.method === "HEAD" ? void 0 : await S.blob(),
                              cache: S.cache,
                              credentials: S.credentials,
                              headers: S.headers,
                              integrity: S.integrity,
                              keepalive: S.keepalive,
                              method: S.method,
                              mode: S.mode,
                              redirect: S.redirect,
                              referrer: S.referrer,
                              referrerPolicy: S.referrerPolicy,
                              signal: S.signal,
                              ...g,
                          }))
                        : (k = S);
                    const A = new URL(k, u).href;
                    return U(A), _ ? gt(A, g) : _t(k, A, g);
                },
                setHeaders: () => {},
                depends: U,
                parent() {
                    return (E.parent = !0), l();
                },
            };
            Object.defineProperties(T, {
                props: {
                    get() {
                        throw new Error("@migration task: Replace `props` with `data` stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693");
                    },
                    enumerable: !1,
                },
                session: {
                    get() {
                        throw new Error("session is no longer available. See https://github.com/sveltejs/kit/discussions/5883");
                    },
                    enumerable: !1,
                },
                stuff: {
                    get() {
                        throw new Error("@migration task: Remove stuff https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693");
                    },
                    enumerable: !1,
                },
            }),
                (h = (L = await v.shared.load.call(null, T)) != null ? L : null),
                (h = h ? await Dt(h) : null);
        }
        return {
            node: v,
            loader: n,
            server: p,
            shared: ($ = v.shared) != null && $.load ? { type: "data", data: h, uses: E } : null,
            data: (I = h != null ? h : p == null ? void 0 : p.data) != null ? I : null,
        };
    }
    function Ae(n, l, u, o) {
        if (P) return !0;
        if (!u) return !1;
        if ((u.parent && l) || (u.url && n)) return !0;
        for (const i of u.params) if (o[i] !== r.params[i]) return !0;
        for (const i of u.dependencies) if (c.some((p) => p(new URL(i)))) return !0;
        return !1;
    }
    function pe(n, l) {
        var u, o;
        return (n == null ? void 0 : n.type) === "data"
            ? {
                  type: "data",
                  data: n.data,
                  uses: {
                      dependencies: new Set((u = n.uses.dependencies) != null ? u : []),
                      params: new Set((o = n.uses.params) != null ? o : []),
                      parent: !!n.uses.parent,
                      url: !!n.uses.url,
                  },
              }
            : (n == null ? void 0 : n.type) === "skip" && l != null
            ? l
            : null;
    }
    async function Ue({ id: n, invalidating: l, url: u, params: o, route: i }) {
        var S;
        if ((s == null ? void 0 : s.id) === n) return s.promise;
        const { errors: p, layouts: h, leaf: E } = i,
            v = [...h, E];
        p.forEach((g) => (g == null ? void 0 : g().catch(() => {}))), v.forEach((g) => (g == null ? void 0 : g[1]().catch(() => {})));
        let w = null;
        const b = r.url ? n !== r.url.pathname + r.url.search : !1,
            L = v.reduce((g, k, A) => {
                var Q;
                const O = r.branch[A],
                    H = !!(k != null && k[0]) && ((O == null ? void 0 : O.loader) !== k[1] || Ae(b, g.some(Boolean), (Q = O.server) == null ? void 0 : Q.uses, o));
                return g.push(H), g;
            }, []);
        if (L.some(Boolean)) {
            try {
                w = await Ge(u, L);
            } catch (g) {
                return ne({
                    status: 500,
                    error: Z(g, { url: u, params: o, routeId: i.id }),
                    url: u,
                    routeId: i.id,
                });
            }
            if (w.type === "redirect") return w;
        }
        const $ = w == null ? void 0 : w.nodes;
        let I = !1;
        const U = v.map(async (g, k) => {
            var Q;
            if (!g) return;
            const A = r.branch[k],
                O = $ == null ? void 0 : $[k];
            if ((!O || O.type === "skip") && g[1] === (A == null ? void 0 : A.loader) && !Ae(b, I, (Q = A.shared) == null ? void 0 : Q.uses, o)) return A;
            if (((I = !0), (O == null ? void 0 : O.type) === "error")) throw O;
            return de({
                loader: g[1],
                url: u,
                params: o,
                routeId: i.id,
                parent: async () => {
                    var Ne;
                    const qe = {};
                    for (let _e = 0; _e < k; _e += 1) Object.assign(qe, (Ne = await U[_e]) == null ? void 0 : Ne.data);
                    return qe;
                },
                server_data_node: pe(O === void 0 && g[0] ? { type: "skip" } : O != null ? O : null, A == null ? void 0 : A.server),
            });
        });
        for (const g of U) g.catch(() => {});
        const T = [];
        for (let g = 0; g < v.length; g += 1)
            if (v[g])
                try {
                    T.push(await U[g]);
                } catch (k) {
                    if (k instanceof Fe) return { type: "redirect", location: k.location };
                    let A = 500,
                        O;
                    $ != null && $.includes(k)
                        ? ((A = (S = k.status) != null ? S : A), (O = k.error))
                        : k instanceof ve
                        ? ((A = k.status), (O = k.body))
                        : (O = Z(k, { params: o, url: u, routeId: i.id }));
                    const H = await Te(g, T, p);
                    return H
                        ? await Y({
                              url: u,
                              params: o,
                              branch: T.slice(0, H.idx).concat(H.node),
                              status: A,
                              error: O,
                              route: i,
                          })
                        : await je(u, i.id, O, A);
                }
            else T.push(void 0);
        return await Y({
            url: u,
            params: o,
            branch: T,
            status: 200,
            error: null,
            route: i,
            form: l ? void 0 : null,
        });
    }
    async function Te(n, l, u) {
        for (; n--; )
            if (u[n]) {
                let o = n;
                for (; !l[o]; ) o -= 1;
                try {
                    return {
                        idx: o + 1,
                        node: {
                            node: await u[n](),
                            loader: u[n],
                            data: {},
                            server: null,
                            shared: null,
                        },
                    };
                } catch {
                    continue;
                }
            }
    }
    async function ne({ status: n, error: l, url: u, routeId: o }) {
        var w;
        const i = {},
            p = await Ee();
        let h = null;
        if (p.server)
            try {
                const b = await Ge(u, [!0]);
                if (b.type !== "data" || (b.nodes[0] && b.nodes[0].type !== "data")) throw 0;
                h = (w = b.nodes[0]) != null ? w : null;
            } catch {
                (u.origin !== location.origin || u.pathname !== location.pathname || f) && (await re(u));
            }
        const E = await de({
                loader: Ee,
                url: u,
                params: i,
                routeId: o,
                parent: () => Promise.resolve({}),
                server_data_node: pe(h),
            }),
            v = {
                node: await ke(),
                loader: ke,
                shared: null,
                server: null,
                data: null,
            };
        return await Y({
            url: u,
            params: i,
            branch: [E, v],
            status: n,
            error: l,
            route: null,
        });
    }
    function he(n, l) {
        if (De(n)) return;
        const u = decodeURI(n.pathname.slice(e.length) || "/");
        for (const o of ae) {
            const i = o.exec(u);
            if (i) {
                const p = new URL(n.origin + ft(n.pathname, t) + n.search + n.hash);
                return {
                    id: p.pathname + p.search,
                    invalidating: l,
                    route: o,
                    params: ut(i),
                    url: p,
                };
            }
        }
    }
    function De(n) {
        return n.origin !== location.origin || !n.pathname.startsWith(e);
    }
    async function me({ url: n, scroll: l, keepfocus: u, redirect_chain: o, details: i, type: p, delta: h, nav_token: E, accepted: v, blocked: w }) {
        var U, T, S, g;
        let b = !1;
        const L = he(n, !1),
            $ = {
                from: oe("from", {
                    params: r.params,
                    routeId: (T = (U = r.route) == null ? void 0 : U.id) != null ? T : null,
                    url: r.url,
                }),
                to: oe("to", {
                    params: (S = L == null ? void 0 : L.params) != null ? S : null,
                    routeId: (g = L == null ? void 0 : L.route.id) != null ? g : null,
                    url: n,
                }),
                type: p,
            };
        h !== void 0 && ($.delta = h);
        const I = {
            ...$,
            cancel: () => {
                b = !0;
            },
        };
        if ((d.before_navigate.forEach((k) => k(I)), b)) {
            w();
            return;
        }
        we(D),
            v(),
            _ && z.navigating.set($),
            await Ie(L, n, o, { scroll: l, keepfocus: u, details: i }, E, () => {
                d.after_navigate.forEach((k) => k($)), z.navigating.set(null);
            });
    }
    async function je(n, l, u, o) {
        return n.origin === location.origin && n.pathname === location.pathname && !f ? await ne({ status: o, error: u, url: n, routeId: l }) : await re(n);
    }
    function re(n) {
        return (location.href = n.href), new Promise(() => {});
    }
    return {
        after_navigate: (n) => {
            ye(
                () => (
                    d.after_navigate.push(n),
                    () => {
                        const l = d.after_navigate.indexOf(n);
                        d.after_navigate.splice(l, 1);
                    }
                )
            );
        },
        before_navigate: (n) => {
            ye(
                () => (
                    d.before_navigate.push(n),
                    () => {
                        const l = d.before_navigate.indexOf(n);
                        d.before_navigate.splice(l, 1);
                    }
                )
            );
        },
        disable_scroll_handling: () => {
            (y || !_) && (m = !1);
        },
        goto: (n, l = {}) => ue(n, l, []),
        invalidate: (n) => {
            if (n === void 0) throw new Error("`invalidate()` (with no arguments) has been replaced by `invalidateAll()`");
            if (typeof n == "function") c.push(n);
            else {
                const { href: l } = new URL(n, location.href);
                c.push((u) => u.href === l);
            }
            return Pe();
        },
        invalidateAll: () => ((P = !0), Pe()),
        prefetch: async (n) => {
            const l = new URL(n, xe(document));
            await $e(l);
        },
        prefetch_routes: async (n) => {
            const u = (n ? ae.filter((o) => n.some((i) => o.exec(i))) : ae).map((o) => Promise.all([...o.layouts, o.leaf].map((i) => (i == null ? void 0 : i[1]()))));
            await Promise.all(u);
        },
        apply_action: async (n) => {
            if (n.type === "error") {
                const l = new URL(location.href),
                    { branch: u, route: o } = r;
                if (!o) return;
                const i = await Te(r.branch.length, u, o.errors);
                if (i) {
                    const p = await Y({
                        url: l,
                        params: r.params,
                        branch: u.slice(0, i.idx).concat(i.node),
                        status: 500,
                        error: n.error,
                        route: o,
                    });
                    r = p.state;
                    const h = se();
                    R.$set(p.props), h();
                }
            } else if (n.type === "redirect") ue(n.location, {}, []);
            else {
                const l = { form: n.data };
                n.status !== j.status && ((j = { ...j, status: n.status }), (l.page = j));
                const u = se();
                R.$set(l), u();
            }
        },
        _start_router: () => {
            (history.scrollRestoration = "manual"),
                addEventListener("beforeunload", (o) => {
                    var h, E;
                    let i = !1;
                    const p = {
                        from: oe("from", {
                            params: r.params,
                            routeId: (E = (h = r.route) == null ? void 0 : h.id) != null ? E : null,
                            url: r.url,
                        }),
                        to: null,
                        type: "unload",
                        cancel: () => (i = !0),
                    };
                    d.before_navigate.forEach((v) => v(p)), i ? (o.preventDefault(), (o.returnValue = "")) : (history.scrollRestoration = "auto");
                }),
                addEventListener("visibilitychange", () => {
                    if (document.visibilityState === "hidden") {
                        we(D);
                        try {
                            sessionStorage[He] = JSON.stringify(ee);
                        } catch {}
                    }
                });
            const n = (o) => {
                const { url: i, options: p } = Be(o);
                if (i && p.prefetch) {
                    if (De(i)) return;
                    $e(i);
                }
            };
            let l;
            const u = (o) => {
                clearTimeout(l),
                    (l = setTimeout(() => {
                        var i;
                        (i = o.target) == null || i.dispatchEvent(new CustomEvent("sveltekit:trigger_prefetch", { bubbles: !0 }));
                    }, 20));
            };
            addEventListener("touchstart", n),
                addEventListener("mousemove", u),
                addEventListener("sveltekit:trigger_prefetch", n),
                addEventListener("click", (o) => {
                    if (o.button || o.which !== 1 || o.metaKey || o.ctrlKey || o.shiftKey || o.altKey || o.defaultPrevented) return;
                    const { a: i, url: p, options: h } = Be(o);
                    if (!i || !p) return;
                    const E = i instanceof SVGAElement;
                    if (!E && !(p.protocol === "https:" || p.protocol === "http:")) return;
                    const v = (i.getAttribute("rel") || "").split(/\s+/);
                    if (i.hasAttribute("download") || v.includes("external") || h.reload || (E ? i.target.baseVal : i.target)) return;
                    const [w, b] = p.href.split("#");
                    if (b !== void 0 && w === location.href.split("#")[0]) {
                        (N = !0), we(D), (r.url = p), z.page.set({ ...j, url: p }), z.page.notify();
                        return;
                    }
                    me({
                        url: p,
                        scroll: h.noscroll ? be() : null,
                        keepfocus: !1,
                        redirect_chain: [],
                        details: { state: {}, replaceState: p.href === location.href },
                        accepted: () => o.preventDefault(),
                        blocked: () => o.preventDefault(),
                        type: "link",
                    });
                }),
                addEventListener("popstate", (o) => {
                    if (o.state) {
                        if (o.state[x] === D) return;
                        const i = o.state[x] - D;
                        me({
                            url: new URL(location.href),
                            scroll: ee[o.state[x]],
                            keepfocus: !1,
                            redirect_chain: [],
                            details: null,
                            accepted: () => {
                                D = o.state[x];
                            },
                            blocked: () => {
                                history.go(-i);
                            },
                            type: "popstate",
                            delta: i,
                        });
                    }
                }),
                addEventListener("hashchange", () => {
                    N && ((N = !1), history.replaceState({ ...history.state, [x]: ++D }, "", location.href));
                });
            for (const o of document.querySelectorAll("link")) o.rel === "icon" && (o.href = o.href);
            addEventListener("pageshow", (o) => {
                o.persisted && z.navigating.set(null);
            });
        },
        _hydrate: async ({ status: n, error: l, node_ids: u, params: o, routeId: i, data: p, form: h }) => {
            var w;
            f = !0;
            const E = new URL(location.href);
            let v;
            try {
                const b = u.map(async (L, $) => {
                    const I = p[$];
                    return de({
                        loader: fe[L],
                        url: E,
                        params: o,
                        routeId: i,
                        parent: async () => {
                            const U = {};
                            for (let T = 0; T < $; T += 1) Object.assign(U, (await b[T]).data);
                            return U;
                        },
                        server_data_node: pe(I),
                    });
                });
                v = await Y({
                    url: E,
                    params: o,
                    branch: await Promise.all(b),
                    status: n,
                    error: l,
                    form: h,
                    route: (w = ae.find((L) => L.id === i)) != null ? w : null,
                });
            } catch (b) {
                if (b instanceof Fe) {
                    await re(new URL(b.location, location.href));
                    return;
                }
                v = await ne({
                    status: b instanceof ve ? b.status : 500,
                    error: Z(b, { url: E, params: o, routeId: i }),
                    url: E,
                    routeId: i,
                });
            }
            Oe(v);
        },
    };
}
let Vt = 1;
async function Ge(a, e) {
    const t = new URL(a);
    (t.pathname = a.pathname.replace(/\/$/, "") + Tt),
        t.searchParams.set("__invalid", e.map((s) => (s ? "y" : "n")).join("")),
        t.searchParams.set("__id", String(Vt++)),
        await V(() => import(t.href), [], import.meta.url);
    const c = window.__sveltekit_data;
    return delete window.__sveltekit_data, c;
}
function Z(a, e) {
    var t;
    return a instanceof ve ? a.body : (t = Ut.handleError({ error: a, event: e })) != null ? t : { message: e.routeId != null ? "Internal Error" : "Not Found" };
}
const qt = ["hash", "href", "host", "hostname", "origin", "pathname", "port", "protocol", "search", "searchParams", "toString", "toJSON"];
function oe(a, e) {
    for (const t of qt)
        Object.defineProperty(e, t, {
            get() {
                throw new Error(`The navigation shape changed - ${a}.${t} should now be ${a}.url.${t}`);
            },
            enumerable: !1,
        });
    return e;
}
function se() {
    return () => {};
}
async function Ft({ env: a, hydrate: e, paths: t, target: c, trailing_slash: s }) {
    it(t);
    const d = jt({ target: c, base: t.base, trailing_slash: s });
    st({ client: d }), e ? await d._hydrate(e) : d.goto(location.href, { replaceState: !0 }), d._start_router();
}
export { Ft as start };
