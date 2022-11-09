import {
    S as At,
    i as Pt,
    s as xt,
    k as o,
    a as k,
    v as Ct,
    D as Lt,
    l as n,
    m as c,
    h as e,
    c as I,
    w as Ot,
    E as st,
    n as u,
    T as L,
    p as C,
    B as t,
    b as j,
    x as Rt,
    f as $t,
    t as qt,
    y as Bt,
    I as Ht,
    o as jt,
    K as Mt,
    e as Tt,
    Q as Yt,
    q as B,
    r as H,
    A as wt,
} from "../../../../chunks/index-af757d0f.js";
import { p as Ft } from "../../../../chunks/stores-0b118143.js";
import { d as Gt } from "../../../../chunks/dots-63d78b83.js";
import { N as Kt, l as St } from "../../../../chunks/navbar-6efa5a58.js";
import { s as Qt } from "../../../../chunks/sessionDuration-e379fb60.js";
function Nt(h, a, i) {
    const r = h.slice();
    r[8] = a[i];
    const s = new Date(Date.parse(r[8].started_at)).toDateString();
    return (r[9] = s), r;
}
function Ut(h) {
    let a,
        i = h[1],
        r = [];
    for (let s = 0; s < i.length; s += 1) r[s] = Vt(Nt(h, i, s));
    return {
        c() {
            for (let s = 0; s < r.length; s += 1) r[s].c();
            a = Tt();
        },
        l(s) {
            for (let l = 0; l < r.length; l += 1) r[l].l(s);
            a = Tt();
        },
        m(s, l) {
            for (let d = 0; d < r.length; d += 1) r[d].m(s, l);
            j(s, a, l);
        },
        p(s, l) {
            if (l & 2) {
                i = s[1];
                let d;
                for (d = 0; d < i.length; d += 1) {
                    const b = Nt(s, i, d);
                    r[d] ? r[d].p(b, l) : ((r[d] = Vt(b)), r[d].c(), r[d].m(a.parentNode, a));
                }
                for (; d < r.length; d += 1) r[d].d(1);
                r.length = i.length;
            }
        },
        d(s) {
            Yt(r, s), s && e(a);
        },
    };
}
function zt(h) {
    let a, i, r, s, l, d, b, v, _;
    return {
        c() {
            (a = o("div")), (i = o("lottie-player")), (s = k()), (l = o("h2")), (d = B("No past registerations!")), (b = k()), (v = o("small")), (_ = B("Please, try later.")), this.h();
        },
        l(g) {
            a = n(g, "DIV", { class: !0, style: !0 });
            var f = c(a);
            (i = n(f, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                style: !0,
                speed: !0,
                nocontrols: !0,
            })),
                c(i).forEach(e),
                (s = I(f)),
                (l = n(f, "H2", { class: !0 }));
            var E = c(l);
            (d = H(E, "No past registerations!")), E.forEach(e), (b = I(f)), (v = n(f, "SMALL", { style: !0 }));
            var y = c(v);
            (_ = H(y, "Please, try later.")), y.forEach(e), f.forEach(e), this.h();
        },
        h() {
            st(i.src, (r = St)) || L(i, "src", r),
                L(i, "background", "transparent"),
                C(i, "max-width", "500px"),
                L(i, "speed", "1"),
                L(i, "nocontrols", ""),
                u(l, "class", "svelte-tdg4kv"),
                C(v, "margin-top", "-10px"),
                C(v, "display", "block"),
                C(v, "opacity", "0.7"),
                u(a, "class", "text-center p-3 notFound svelte-tdg4kv"),
                C(a, "width", "fit-content "),
                C(a, "background", "white");
        },
        m(g, f) {
            j(g, a, f), t(a, i), t(a, s), t(a, l), t(l, d), t(a, b), t(a, v), t(v, _);
        },
        p: wt,
        d(g) {
            g && e(a);
        },
    };
}
function Vt(h) {
    let a,
        i,
        r,
        s,
        l,
        d,
        b = h[8].name + "",
        v,
        _,
        g,
        f,
        E,
        y,
        D,
        A,
        V,
        T,
        w,
        O,
        R,
        rt = h[9] + "",
        P,
        p,
        m,
        $,
        q,
        N,
        x,
        M,
        Y,
        U,
        dt = h[8].persons_amount + "",
        lt,
        ot,
        F,
        G,
        S,
        z,
        nt,
        J,
        ct,
        it;
    return {
        c() {
            (a = o("div")),
                (i = o("div")),
                (r = o("div")),
                (s = o("nav")),
                (l = o("div")),
                (d = o("h4")),
                (v = B(b)),
                (_ = k()),
                (g = o("div")),
                (f = o("table")),
                (E = o("tbody")),
                (y = o("tr")),
                (D = o("th")),
                (A = o("i")),
                (V = k()),
                (T = o("td")),
                (w = B("Start date")),
                (O = k()),
                (R = o("td")),
                (P = B(rt)),
                (p = k()),
                (m = o("tr")),
                ($ = o("th")),
                (q = o("i")),
                (N = k()),
                (x = o("td")),
                (M = B("Number of Contestant per team")),
                (Y = k()),
                (U = o("td")),
                (lt = B(dt)),
                (ot = k()),
                (F = o("div")),
                (G = o("button")),
                (S = o("a")),
                (z = o("span")),
                (nt = k()),
                (J = o("span")),
                (ct = B("View full Contest")),
                (it = k()),
                this.h();
        },
        l(W) {
            a = n(W, "DIV", { class: !0 });
            var X = c(a);
            i = n(X, "DIV", { class: !0 });
            var Z = c(i);
            r = n(Z, "DIV", { class: !0 });
            var ut = c(r);
            s = n(ut, "NAV", { class: !0 });
            var vt = c(s);
            l = n(vt, "DIV", { class: !0 });
            var pt = c(l);
            d = n(pt, "H4", { class: !0 });
            var ft = c(d);
            (v = H(ft, b)), ft.forEach(e), pt.forEach(e), vt.forEach(e), ut.forEach(e), (_ = I(Z)), (g = n(Z, "DIV", { class: !0 }));
            var tt = c(g);
            f = n(tt, "TABLE", { class: !0 });
            var _t = c(f);
            E = n(_t, "TBODY", {});
            var et = c(E);
            y = n(et, "TR", {});
            var K = c(y);
            D = n(K, "TH", { scope: !0 });
            var ht = c(D);
            (A = n(ht, "I", { class: !0 })), c(A).forEach(e), ht.forEach(e), (V = I(K)), (T = n(K, "TD", {}));
            var mt = c(T);
            (w = H(mt, "Start date")), mt.forEach(e), (O = I(K)), (R = n(K, "TD", { colspan: !0 }));
            var gt = c(R);
            (P = H(gt, rt)), gt.forEach(e), K.forEach(e), (p = I(et)), (m = n(et, "TR", {}));
            var Q = c(m);
            $ = n(Q, "TH", { scope: !0 });
            var bt = c($);
            (q = n(bt, "I", { class: !0 })), c(q).forEach(e), bt.forEach(e), (N = I(Q)), (x = n(Q, "TD", { colspan: !0 }));
            var Et = c(x);
            (M = H(Et, "Number of Contestant per team")), Et.forEach(e), (Y = I(Q)), (U = n(Q, "TD", {}));
            var yt = c(U);
            (lt = H(yt, dt)), yt.forEach(e), Q.forEach(e), et.forEach(e), _t.forEach(e), (ot = I(tt)), (F = n(tt, "DIV", { class: !0 }));
            var kt = c(F);
            G = n(kt, "BUTTON", { class: !0 });
            var It = c(G);
            S = n(It, "A", { class: !0, href: !0, target: !0 });
            var at = c(S);
            (z = n(at, "SPAN", { class: !0 })), c(z).forEach(e), (nt = I(at)), (J = n(at, "SPAN", {}));
            var Dt = c(J);
            (ct = H(Dt, "View full Contest")), Dt.forEach(e), at.forEach(e), It.forEach(e), kt.forEach(e), tt.forEach(e), Z.forEach(e), (it = I(X)), X.forEach(e), this.h();
        },
        h() {
            u(d, "class", "m-0 svelte-tdg4kv"),
                u(l, "class", "navbar-brand svelte-tdg4kv"),
                u(s, "class", "navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center svelte-tdg4kv"),
                u(r, "class", "card-header bg-light svelte-tdg4kv"),
                u(A, "class", "fa-solid fa-calendar"),
                u(D, "scope", "row"),
                u(R, "colspan", "2"),
                u(q, "class", "fa fa-group svelte-tdg4kv"),
                u($, "scope", "row"),
                u(x, "colspan", "2"),
                u(f, "class", "table"),
                u(z, "class", "fa fa-eye svelte-tdg4kv"),
                u(S, "class", "link-light svelte-tdg4kv"),
                u(S, "href", h[8].link),
                u(S, "target", "_blank"),
                u(G, "class", "btn btn-primary"),
                u(F, "class", "btn btn-group gap-2"),
                u(g, "class", "card-body gap-2"),
                u(i, "class", "card shadow-sm border-0"),
                u(a, "class", "col-md-5"),
                C(a, "width", "fit-content", !1);
        },
        m(W, X) {
            j(W, a, X),
                t(a, i),
                t(i, r),
                t(r, s),
                t(s, l),
                t(l, d),
                t(d, v),
                t(i, _),
                t(i, g),
                t(g, f),
                t(f, E),
                t(E, y),
                t(y, D),
                t(D, A),
                t(y, V),
                t(y, T),
                t(T, w),
                t(y, O),
                t(y, R),
                t(R, P),
                t(E, p),
                t(E, m),
                t(m, $),
                t($, q),
                t(m, N),
                t(m, x),
                t(x, M),
                t(m, Y),
                t(m, U),
                t(U, lt),
                t(g, ot),
                t(g, F),
                t(F, G),
                t(G, S),
                t(S, z),
                t(S, nt),
                t(S, J),
                t(J, ct),
                t(a, it);
        },
        p: wt,
        d(W) {
            W && e(a);
        },
    };
}
function Jt(h) {
    let a, i, r, s, l, d, b, v, _, g, f, E, y, D, A, V, T, w, O;
    D = new Kt({ props: { userId: h[3], paricipantName: h[2], active: Wt } });
    function R(p, m) {
        return p[1].length == 0 ? zt : Ut;
    }
    let P = R(h)(h);
    return {
        c() {
            (a = o("script")),
                (r = k()),
                (s = o("div")),
                (l = o("lottie-player")),
                (b = k()),
                (v = o("section")),
                (_ = o("img")),
                (f = k()),
                (E = o("div")),
                (y = k()),
                Ct(D.$$.fragment),
                (A = k()),
                (V = o("div")),
                (T = o("div")),
                (w = o("div")),
                P.c(),
                this.h();
        },
        l(p) {
            const m = Lt('[data-svelte="svelte-x3fctm"]', document.head);
            a = n(m, "SCRIPT", { src: !0 });
            var $ = c(a);
            $.forEach(e), m.forEach(e), (r = I(p)), (s = n(p, "DIV", { class: !0 }));
            var q = c(s);
            (l = n(q, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                speed: !0,
                style: !0,
                loop: !0,
                autoplay: !0,
            })),
                c(l).forEach(e),
                q.forEach(e),
                (b = I(p)),
                (v = n(p, "SECTION", { class: !0 }));
            var N = c(v);
            (_ = n(N, "IMG", { class: !0, src: !0, alt: !0 })),
                (f = I(N)),
                (E = n(N, "DIV", { class: !0 })),
                c(E).forEach(e),
                (y = I(N)),
                Ot(D.$$.fragment, N),
                (A = I(N)),
                (V = n(N, "DIV", { class: !0 }));
            var x = c(V);
            T = n(x, "DIV", { class: !0, id: !0 });
            var M = c(T);
            w = n(M, "DIV", { class: !0 });
            var Y = c(w);
            P.l(Y), Y.forEach(e), M.forEach(e), x.forEach(e), N.forEach(e), this.h();
        },
        h() {
            (document.title = "Past registrations"),
                (a.defer = !0),
                st(a.src, (i = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js")) || u(a, "src", i),
                st(l.src, (d = St)) || L(l, "src", d),
                L(l, "background", "transparent"),
                L(l, "speed", "1"),
                C(l, "width", "300px"),
                C(l, "height", "300px"),
                L(l, "loop", ""),
                L(l, "autoplay", ""),
                u(s, "class", "loading svelte-tdg4kv"),
                u(_, "class", "d1 svelte-tdg4kv"),
                st(_.src, (g = Gt)) || u(_, "src", g),
                u(_, "alt", ""),
                u(E, "class", "d2 svelte-tdg4kv"),
                u(w, "class", "col-md"),
                u(T, "class", "row justify-content-center align-items-center gap-3 p-0 m-0 "),
                u(T, "id", "past"),
                u(V, "class", "part_4 d-flex justify-content-center align-items-start svelte-tdg4kv"),
                u(v, "class", "participant-container svelte-tdg4kv");
        },
        m(p, m) {
            t(document.head, a),
                j(p, r, m),
                j(p, s, m),
                t(s, l),
                h[4](s),
                j(p, b, m),
                j(p, v, m),
                t(v, _),
                t(v, f),
                t(v, E),
                t(v, y),
                Rt(D, v, null),
                t(v, A),
                t(v, V),
                t(V, T),
                t(T, w),
                P.m(w, null),
                (O = !0);
        },
        p(p, [m]) {
            P.p(p, m);
        },
        i(p) {
            O || ($t(D.$$.fragment, p), (O = !0));
        },
        o(p) {
            qt(D.$$.fragment, p), (O = !1);
        },
        d(p) {
            e(a), p && e(r), p && e(s), h[4](null), p && e(b), p && e(v), Bt(D), P.d();
        },
    };
}
let Wt = "past";
function Xt(h, a, i) {
    let r;
    Ht(h, Ft, (f) => i(5, (r = f)));
    let s = r.data,
        l = s.started_competitions,
        d = s.userInfo;
    Qt();
    let b = d.name + " " + d.surname,
        v = d.id,
        _ = "";
    jt(() => {
        i(0, (_.style.display = "none"), _);
    });
    function g(f) {
        Mt[f ? "unshift" : "push"](() => {
            (_ = f), i(0, _);
        });
    }
    return [_, l, b, v, g];
}
class re extends At {
    constructor(a) {
        super(), Pt(this, a, Xt, Jt, xt, {});
    }
}
export { re as default };
