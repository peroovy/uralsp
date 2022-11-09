import {
    S as L,
    i as M,
    s as O,
    k as p,
    q as w,
    l as _,
    m as $,
    r as T,
    h as r,
    n,
    b,
    B as d,
    A as I,
    C as K,
    a as N,
    v as P,
    D,
    c as S,
    w as H,
    E as F,
    x as U,
    F as W,
    G as Y,
    H as G,
    f as B,
    t as C,
    y as Q,
} from "../../chunks/index-af757d0f.js";
function X(f) {
    let t, s, m, i, c;
    return {
        c() {
            (t = p("footer")), (s = p("p")), (m = w("\xA9 ")), (i = w(f[0])), (c = w(" AppName")), this.h();
        },
        l(o) {
            t = _(o, "FOOTER", { class: !0 });
            var h = $(t);
            s = _(h, "P", { class: !0 });
            var l = $(s);
            (m = T(l, "\xA9 ")), (i = T(l, f[0])), (c = T(l, " AppName")), l.forEach(r), h.forEach(r), this.h();
        },
        h() {
            n(s, "class", "svelte-26xoul"), n(t, "class", "svelte-26xoul");
        },
        m(o, h) {
            b(o, t, h), d(t, s), d(s, m), d(s, i), d(s, c);
        },
        p: I,
        i: I,
        o: I,
        d(o) {
            o && r(t);
        },
    };
}
function z(f) {
    return [new Date().getFullYear()];
}
class Z extends L {
    constructor(t) {
        super(), M(this, t, z, X, O, {});
    }
}
function J(f) {
    let t, s, m, i, c, o, h, l, q, k, y, E, v, g;
    const j = f[1].default,
        u = K(j, f, f[0], null);
    return (
        (v = new Z({})),
        {
            c() {
                (t = p("link")),
                    (s = p("link")),
                    (m = p("link")),
                    (i = p("meta")),
                    (c = p("meta")),
                    (o = p("script")),
                    (l = p("script")),
                    (k = N()),
                    (y = p("main")),
                    u && u.c(),
                    (E = N()),
                    P(v.$$.fragment),
                    this.h();
            },
            l(e) {
                const a = D('[data-svelte="svelte-13k34gs"]', document.head);
                (t = _(a, "LINK", {
                    rel: !0,
                    href: !0,
                    integrity: !0,
                    crossorigin: !0,
                })),
                    (s = _(a, "LINK", { rel: !0, href: !0 })),
                    (m = _(a, "LINK", { rel: !0, href: !0 })),
                    (i = _(a, "META", { name: !0, content: !0 })),
                    (c = _(a, "META", { name: !0, content: !0 })),
                    (o = _(a, "SCRIPT", { src: !0, integrity: !0, crossorigin: !0 }));
                var R = $(o);
                R.forEach(r), (l = _(a, "SCRIPT", { src: !0 }));
                var x = $(l);
                x.forEach(r), a.forEach(r), (k = S(e)), (y = _(e, "MAIN", {}));
                var A = $(y);
                u && u.l(A), A.forEach(r), (E = S(e)), H(v.$$.fragment, e), this.h();
            },
            h() {
                n(t, "rel", "stylesheet"),
                    n(t, "href", "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"),
                    n(t, "integrity", "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"),
                    n(t, "crossorigin", "anonymous"),
                    n(s, "rel", "stylesheet"),
                    n(s, "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"),
                    n(m, "rel", "stylesheet"),
                    n(m, "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"),
                    n(i, "name", "viewport"),
                    n(i, "content", "width=device-width, initial-scale=1, shrink-to-fit=no"),
                    n(c, "name", "description"),
                    n(c, "content", "Some description!"),
                    F(o.src, (h = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js")) || n(o, "src", h),
                    n(o, "integrity", "sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"),
                    n(o, "crossorigin", "anonymous"),
                    F(l.src, (q = "https://accounts.google.com/gsi/client")) || n(l, "src", q),
                    (l.async = !0),
                    (l.defer = !0);
            },
            m(e, a) {
                d(document.head, t),
                    d(document.head, s),
                    d(document.head, m),
                    d(document.head, i),
                    d(document.head, c),
                    d(document.head, o),
                    d(document.head, l),
                    b(e, k, a),
                    b(e, y, a),
                    u && u.m(y, null),
                    b(e, E, a),
                    U(v, e, a),
                    (g = !0);
            },
            p(e, [a]) {
                u && u.p && (!g || a & 1) && W(u, j, e, e[0], g ? G(j, e[0], a, null) : Y(e[0]), null);
            },
            i(e) {
                g || (B(u, e), B(v.$$.fragment, e), (g = !0));
            },
            o(e) {
                C(u, e), C(v.$$.fragment, e), (g = !1);
            },
            d(e) {
                r(t), r(s), r(m), r(i), r(c), r(o), r(l), e && r(k), e && r(y), u && u.d(e), e && r(E), Q(v, e);
            },
        }
    );
}
function V(f, t, s) {
    let { $$slots: m = {}, $$scope: i } = t;
    return (
        (f.$$set = (c) => {
            "$$scope" in c && s(0, (i = c.$$scope));
        }),
        [i, m]
    );
}
class te extends L {
    constructor(t) {
        super(), M(this, t, V, J, O, {});
    }
}
export { te as default };
