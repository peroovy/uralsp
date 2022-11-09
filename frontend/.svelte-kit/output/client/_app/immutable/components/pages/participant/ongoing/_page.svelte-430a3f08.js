import {
    S as ce,
    i as ie,
    s as de,
    k as s,
    a as g,
    v as ue,
    D as pe,
    l,
    m as o,
    h as e,
    c as m,
    w as ve,
    E as ht,
    n as c,
    T as B,
    p as P,
    B as t,
    b as U,
    x as fe,
    f as he,
    t as _e,
    y as ge,
    I as me,
    o as be,
    K as Ee,
    e as se,
    Q as ye,
    q as T,
    r as I,
    A as oe,
} from "../../../../chunks/index-af757d0f.js";
import { p as ke } from "../../../../chunks/stores-0b118143.js";
import { d as De } from "../../../../chunks/dots-63d78b83.js";
import { N as Te, l as ne } from "../../../../chunks/navbar-6efa5a58.js";
import { s as Ie } from "../../../../chunks/sessionDuration-e379fb60.js";
function le(f, n, u) {
    const a = f.slice();
    a[8] = n[u];
    const r = Date.parse(a[8].registration_end) - Date.parse(Date());
    a[9] = r;
    const i = new Date(Date.parse(a[8].registration_start)).toDateString();
    a[10] = i;
    const d = Math.floor(a[9] / (1e3 * 60 * 60 * 24));
    a[11] = d;
    const E = Math.floor((a[9] % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60));
    a[12] = E;
    const p = Math.floor((a[9] % (1e3 * 60 * 60)) / (1e3 * 60));
    a[13] = p;
    const _ = "/contests/apply/" + a[8].id;
    return (a[14] = _), a;
}
function we(f) {
    let n,
        u = f[1],
        a = [];
    for (let r = 0; r < u.length; r += 1) a[r] = re(le(f, u, r));
    return {
        c() {
            for (let r = 0; r < a.length; r += 1) a[r].c();
            n = se();
        },
        l(r) {
            for (let i = 0; i < a.length; i += 1) a[i].l(r);
            n = se();
        },
        m(r, i) {
            for (let d = 0; d < a.length; d += 1) a[d].m(r, i);
            U(r, n, i);
        },
        p(r, i) {
            if (i & 2) {
                u = r[1];
                let d;
                for (d = 0; d < u.length; d += 1) {
                    const E = le(r, u, d);
                    a[d] ? a[d].p(E, i) : ((a[d] = re(E)), a[d].c(), a[d].m(n.parentNode, n));
                }
                for (; d < a.length; d += 1) a[d].d(1);
                a.length = u.length;
            }
        },
        d(r) {
            ye(a, r), r && e(n);
        },
    };
}
function Ne(f) {
    let n, u, a, r, i, d, E, p, _;
    return {
        c() {
            (n = s("div")), (u = s("lottie-player")), (r = g()), (i = s("h2")), (d = T("No ongoing registerations!")), (E = g()), (p = s("small")), (_ = T("Please, try later.")), this.h();
        },
        l(b) {
            n = l(b, "DIV", { class: !0, style: !0 });
            var h = o(n);
            (u = l(h, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                style: !0,
                speed: !0,
                nocontrols: !0,
            })),
                o(u).forEach(e),
                (r = m(h)),
                (i = l(h, "H2", { class: !0 }));
            var y = o(i);
            (d = I(y, "No ongoing registerations!")), y.forEach(e), (E = m(h)), (p = l(h, "SMALL", { style: !0 }));
            var k = o(p);
            (_ = I(k, "Please, try later.")), k.forEach(e), h.forEach(e), this.h();
        },
        h() {
            ht(u.src, (a = ne)) || B(u, "src", a),
                B(u, "background", "transparent"),
                P(u, "max-width", "500px"),
                B(u, "speed", "1"),
                B(u, "nocontrols", ""),
                c(i, "class", "svelte-tdg4kv"),
                P(p, "margin-top", "-10px"),
                P(p, "display", "block"),
                P(p, "opacity", "0.7"),
                c(n, "class", "text-center p-3 notFound svelte-tdg4kv"),
                P(n, "width", "fit-content "),
                P(n, "background", "white");
        },
        m(b, h) {
            U(b, n, h), t(n, u), t(n, r), t(n, i), t(i, d), t(n, E), t(n, p), t(p, _);
        },
        p: oe,
        d(b) {
            b && e(n);
        },
    };
}
function re(f) {
    let n,
        u,
        a,
        r,
        i,
        d,
        E = f[8].name + "",
        p,
        _,
        b,
        h,
        y,
        k,
        w,
        O,
        R,
        D,
        C,
        at,
        Y,
        H = f[10] + "",
        v,
        N,
        S,
        M,
        A,
        G,
        $,
        _t,
        gt,
        V,
        Mt = f[11] + "",
        mt,
        bt,
        qt = f[12] + "",
        Et,
        yt,
        Bt = f[13] + "",
        kt,
        Dt,
        Tt,
        q,
        K,
        st,
        It,
        Q,
        wt,
        Nt,
        lt,
        Ct = f[8].persons_amount + "",
        At,
        St,
        j,
        z,
        x,
        rt,
        Vt,
        J,
        Pt,
        Rt,
        W,
        L,
        ot,
        xt,
        nt,
        Lt,
        Ot;
    return {
        c() {
            (n = s("div")),
                (u = s("div")),
                (a = s("div")),
                (r = s("nav")),
                (i = s("div")),
                (d = s("h4")),
                (p = T(E)),
                (_ = g()),
                (b = s("div")),
                (h = s("table")),
                (y = s("tbody")),
                (k = s("tr")),
                (w = s("th")),
                (O = s("i")),
                (R = g()),
                (D = s("td")),
                (C = T("Start date")),
                (at = g()),
                (Y = s("td")),
                (v = T(H)),
                (N = g()),
                (S = s("tr")),
                (M = s("th")),
                (A = s("i")),
                (G = g()),
                ($ = s("td")),
                (_t = T("Registeration ends in")),
                (gt = g()),
                (V = s("td")),
                (mt = T(Mt)),
                (bt = T(" days, ")),
                (Et = T(qt)),
                (yt = T(" hours, ")),
                (kt = T(Bt)),
                (Dt = T(" mins")),
                (Tt = g()),
                (q = s("tr")),
                (K = s("th")),
                (st = s("i")),
                (It = g()),
                (Q = s("td")),
                (wt = T("Number of contestants per team")),
                (Nt = g()),
                (lt = s("td")),
                (At = T(Ct)),
                (St = g()),
                (j = s("div")),
                (z = s("button")),
                (x = s("a")),
                (rt = s("span")),
                (Vt = g()),
                (J = s("span")),
                (Pt = T("Apply")),
                (Rt = g()),
                (W = s("button")),
                (L = s("a")),
                (ot = s("span")),
                (xt = g()),
                (nt = s("span")),
                (Lt = T("View full Contest")),
                (Ot = g()),
                this.h();
        },
        l(ct) {
            n = l(ct, "DIV", { class: !0 });
            var it = o(n);
            u = l(it, "DIV", { class: !0 });
            var dt = o(u);
            a = l(dt, "DIV", { class: !0 });
            var Ht = o(a);
            r = l(Ht, "NAV", { class: !0 });
            var $t = o(r);
            i = l($t, "DIV", { class: !0 });
            var jt = o(i);
            d = l(jt, "H4", { class: !0 });
            var Yt = o(d);
            (p = I(Yt, E)), Yt.forEach(e), jt.forEach(e), $t.forEach(e), Ht.forEach(e), (_ = m(dt)), (b = l(dt, "DIV", { class: !0 }));
            var ut = o(b);
            h = l(ut, "TABLE", { class: !0 });
            var Ft = o(h);
            y = l(Ft, "TBODY", {});
            var X = o(y);
            k = l(X, "TR", {});
            var Z = o(k);
            w = l(Z, "TH", { scope: !0 });
            var Ut = o(w);
            (O = l(Ut, "I", { class: !0 })), o(O).forEach(e), Ut.forEach(e), (R = m(Z)), (D = l(Z, "TD", {}));
            var Gt = o(D);
            (C = I(Gt, "Start date")), Gt.forEach(e), (at = m(Z)), (Y = l(Z, "TD", { colspan: !0 }));
            var Kt = o(Y);
            (v = I(Kt, H)), Kt.forEach(e), Z.forEach(e), (N = m(X)), (S = l(X, "TR", {}));
            var tt = o(S);
            M = l(tt, "TH", { scope: !0 });
            var Qt = o(M);
            (A = l(Qt, "I", { class: !0 })), o(A).forEach(e), Qt.forEach(e), (G = m(tt)), ($ = l(tt, "TD", {}));
            var zt = o($);
            (_t = I(zt, "Registeration ends in")), zt.forEach(e), (gt = m(tt)), (V = l(tt, "TD", { colspan: !0 }));
            var F = o(V);
            (mt = I(F, Mt)), (bt = I(F, " days, ")), (Et = I(F, qt)), (yt = I(F, " hours, ")), (kt = I(F, Bt)), (Dt = I(F, " mins")), F.forEach(e), tt.forEach(e), (Tt = m(X)), (q = l(X, "TR", {}));
            var et = o(q);
            K = l(et, "TH", { scope: !0 });
            var Jt = o(K);
            (st = l(Jt, "I", { class: !0 })), o(st).forEach(e), Jt.forEach(e), (It = m(et)), (Q = l(et, "TD", { colspan: !0 }));
            var Wt = o(Q);
            (wt = I(Wt, "Number of contestants per team")), Wt.forEach(e), (Nt = m(et)), (lt = l(et, "TD", {}));
            var Xt = o(lt);
            (At = I(Xt, Ct)), Xt.forEach(e), et.forEach(e), X.forEach(e), Ft.forEach(e), (St = m(ut)), (j = l(ut, "DIV", { class: !0 }));
            var pt = o(j);
            z = l(pt, "BUTTON", { class: !0 });
            var Zt = o(z);
            x = l(Zt, "A", { class: !0, href: !0, target: !0 });
            var vt = o(x);
            (rt = l(vt, "SPAN", { class: !0 })), o(rt).forEach(e), (Vt = m(vt)), (J = l(vt, "SPAN", { class: !0 }));
            var te = o(J);
            (Pt = I(te, "Apply")), te.forEach(e), vt.forEach(e), Zt.forEach(e), (Rt = m(pt)), (W = l(pt, "BUTTON", { class: !0 }));
            var ee = o(W);
            L = l(ee, "A", { class: !0, href: !0, target: !0 });
            var ft = o(L);
            (ot = l(ft, "SPAN", { class: !0 })), o(ot).forEach(e), (xt = m(ft)), (nt = l(ft, "SPAN", {}));
            var ae = o(nt);
            (Lt = I(ae, "View full Contest")), ae.forEach(e), ft.forEach(e), ee.forEach(e), pt.forEach(e), ut.forEach(e), dt.forEach(e), (Ot = m(it)), it.forEach(e), this.h();
        },
        h() {
            c(d, "class", "m-0 svelte-tdg4kv"),
                c(i, "class", "navbar-brand svelte-tdg4kv"),
                c(r, "class", "navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center svelte-tdg4kv"),
                c(a, "class", "card-header bg-light svelte-tdg4kv"),
                c(O, "class", "fa-solid fa-calendar"),
                c(w, "scope", "row"),
                c(Y, "colspan", "2"),
                c(A, "class", "fa fa-clock svelte-tdg4kv"),
                c(M, "scope", "row"),
                c(V, "colspan", "2"),
                c(st, "class", "fa fa-group svelte-tdg4kv"),
                c(K, "scope", "row"),
                c(Q, "colspan", "2"),
                c(h, "class", "table"),
                c(rt, "class", "fa fa-check-square-o svelte-tdg4kv"),
                c(J, "class", "ptn-count"),
                c(x, "class", "link-light svelte-tdg4kv"),
                c(x, "href", f[14]),
                c(x, "target", "_blank"),
                c(z, "class", "btn btn-primary"),
                c(ot, "class", "fa fa-eye svelte-tdg4kv"),
                c(L, "class", "link-light svelte-tdg4kv"),
                c(L, "href", f[8].link),
                c(L, "target", "_blank"),
                c(W, "class", "btn btn-primary"),
                c(j, "class", "btn btn-group gap-2"),
                c(b, "class", "card-body gap-2"),
                c(u, "class", "card shadow-sm border-0"),
                c(n, "class", "col-md");
        },
        m(ct, it) {
            U(ct, n, it),
                t(n, u),
                t(u, a),
                t(a, r),
                t(r, i),
                t(i, d),
                t(d, p),
                t(u, _),
                t(u, b),
                t(b, h),
                t(h, y),
                t(y, k),
                t(k, w),
                t(w, O),
                t(k, R),
                t(k, D),
                t(D, C),
                t(k, at),
                t(k, Y),
                t(Y, v),
                t(y, N),
                t(y, S),
                t(S, M),
                t(M, A),
                t(S, G),
                t(S, $),
                t($, _t),
                t(S, gt),
                t(S, V),
                t(V, mt),
                t(V, bt),
                t(V, Et),
                t(V, yt),
                t(V, kt),
                t(V, Dt),
                t(y, Tt),
                t(y, q),
                t(q, K),
                t(K, st),
                t(q, It),
                t(q, Q),
                t(Q, wt),
                t(q, Nt),
                t(q, lt),
                t(lt, At),
                t(b, St),
                t(b, j),
                t(j, z),
                t(z, x),
                t(x, rt),
                t(x, Vt),
                t(x, J),
                t(J, Pt),
                t(j, Rt),
                t(j, W),
                t(W, L),
                t(L, ot),
                t(L, xt),
                t(L, nt),
                t(nt, Lt),
                t(n, Ot);
        },
        p: oe,
        d(ct) {
            ct && e(n);
        },
    };
}
function Ae(f) {
    let n, u, a, r, i, d, E, p, _, b, h, y, k, w, O, R, D, C;
    w = new Te({ props: { userId: f[3], paricipantName: f[2], active: Se } });
    function at(v, N) {
        return v[1].length == 0 ? Ne : we;
    }
    let H = at(f)(f);
    return {
        c() {
            (n = s("script")),
                (a = g()),
                (r = s("div")),
                (i = s("lottie-player")),
                (E = g()),
                (p = s("section")),
                (_ = s("img")),
                (h = g()),
                (y = s("div")),
                (k = g()),
                ue(w.$$.fragment),
                (O = g()),
                (R = s("div")),
                (D = s("div")),
                H.c(),
                this.h();
        },
        l(v) {
            const N = pe('[data-svelte="svelte-1bo6wxh"]', document.head);
            n = l(N, "SCRIPT", { src: !0 });
            var S = o(n);
            S.forEach(e), N.forEach(e), (a = m(v)), (r = l(v, "DIV", { class: !0 }));
            var M = o(r);
            (i = l(M, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                speed: !0,
                style: !0,
                loop: !0,
                autoplay: !0,
            })),
                o(i).forEach(e),
                M.forEach(e),
                (E = m(v)),
                (p = l(v, "SECTION", { class: !0 }));
            var A = o(p);
            (_ = l(A, "IMG", { class: !0, src: !0, alt: !0 })),
                (h = m(A)),
                (y = l(A, "DIV", { class: !0 })),
                o(y).forEach(e),
                (k = m(A)),
                ve(w.$$.fragment, A),
                (O = m(A)),
                (R = l(A, "DIV", { class: !0 }));
            var G = o(R);
            D = l(G, "DIV", { class: !0, style: !0, id: !0 });
            var $ = o(D);
            H.l($), $.forEach(e), G.forEach(e), A.forEach(e), this.h();
        },
        h() {
            (document.title = "Ongoing registrations"),
                (n.defer = !0),
                ht(n.src, (u = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js")) || c(n, "src", u),
                ht(i.src, (d = ne)) || B(i, "src", d),
                B(i, "background", "transparent"),
                B(i, "speed", "1"),
                P(i, "width", "300px"),
                P(i, "height", "300px"),
                B(i, "loop", ""),
                B(i, "autoplay", ""),
                c(r, "class", "loading svelte-tdg4kv"),
                c(_, "class", "d1 svelte-tdg4kv"),
                ht(_.src, (b = De)) || c(_, "src", b),
                c(_, "alt", ""),
                c(y, "class", "d2 svelte-tdg4kv"),
                c(D, "class", "row justify-content-center gap-4 justify-content-center align-items-center gap-3 p-0 m-0"),
                P(D, "flex-flow", "column nowrap"),
                P(D, "gap", "30px"),
                P(D, "width", "max-content"),
                c(D, "id", "ongoing"),
                c(R, "class", "part_4 d-flex justify-content-center align-items-start svelte-tdg4kv"),
                c(p, "class", "participant-container svelte-tdg4kv");
        },
        m(v, N) {
            t(document.head, n),
                U(v, a, N),
                U(v, r, N),
                t(r, i),
                f[4](r),
                U(v, E, N),
                U(v, p, N),
                t(p, _),
                t(p, h),
                t(p, y),
                t(p, k),
                fe(w, p, null),
                t(p, O),
                t(p, R),
                t(R, D),
                H.m(D, null),
                (C = !0);
        },
        p(v, [N]) {
            H.p(v, N);
        },
        i(v) {
            C || (he(w.$$.fragment, v), (C = !0));
        },
        o(v) {
            _e(w.$$.fragment, v), (C = !1);
        },
        d(v) {
            e(n), v && e(a), v && e(r), f[4](null), v && e(E), v && e(p), ge(w), H.d();
        },
    };
}
let Se = "ongoing";
function Ve(f, n, u) {
    let a;
    me(f, ke, (h) => u(5, (a = h)));
    let r = a.data,
        i = r.ongoing_competition,
        d = r.userInfo;
    Ie();
    let E = d.name + " " + d.surname,
        p = d.id,
        _ = "";
    be(() => {
        u(0, (_.style.display = "none"), _);
    });
    function b(h) {
        Ee[h ? "unshift" : "push"](() => {
            (_ = h), u(0, _);
        });
    }
    return [_, i, E, p, b];
}
class Me extends ce {
    constructor(n) {
        super(), ie(this, n, Ve, Ae, de, {});
    }
}
export { Me as default };
