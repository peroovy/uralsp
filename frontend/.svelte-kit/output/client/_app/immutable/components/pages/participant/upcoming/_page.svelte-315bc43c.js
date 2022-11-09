import {
    S as Wt,
    i as Xt,
    s as Zt,
    k as a,
    a as y,
    v as te,
    D as ee,
    l as s,
    m as l,
    h as e,
    c as E,
    w as ae,
    E as ut,
    n,
    T as $,
    p as C,
    B as t,
    b as et,
    x as se,
    f as le,
    t as re,
    y as oe,
    Q as ne,
    I as ce,
    o as ie,
    q as z,
    r as N,
    A as Qt,
    K as de,
} from "../../../../chunks/index-af757d0f.js";
import { p as ue } from "../../../../chunks/stores-0b118143.js";
import { d as fe } from "../../../../chunks/dots-63d78b83.js";
import { N as pe, l as Jt } from "../../../../chunks/navbar-6efa5a58.js";
import { s as he } from "../../../../chunks/sessionDuration-e379fb60.js";
function Gt(v, o, u) {
    const c = v.slice();
    c[8] = o[u];
    const p = Date.parse(c[8].registration_start) - Date.parse(Date());
    c[9] = p;
    const i = Date.parse(c[8].registration_start);
    c[10] = i;
    const b = Math.floor(c[9] / (1e3 * 60 * 60 * 24));
    c[11] = b;
    const k = Math.floor((c[9] % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60));
    c[12] = k;
    const d = Math.floor((c[9] % (1e3 * 60 * 60)) / (1e3 * 60));
    c[13] = d;
    const _ = Math.floor((c[9] % (1e3 * 60)) / 1e3);
    return (c[14] = _), c;
}
function _e(v) {
    let o, u, c, p, i, b, k, d, _;
    return {
        c() {
            (o = a("div")), (u = a("lottie-player")), (p = y()), (i = a("h2")), (b = z("No Upcomming registerations!")), (k = y()), (d = a("small")), (_ = z("Please, try later.")), this.h();
        },
        l(j) {
            o = s(j, "DIV", { class: !0, style: !0 });
            var h = l(o);
            (u = s(h, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                style: !0,
                speed: !0,
                nocontrols: !0,
            })),
                l(u).forEach(e),
                (p = E(h)),
                (i = s(h, "H2", { class: !0 }));
            var I = l(i);
            (b = N(I, "No Upcomming registerations!")), I.forEach(e), (k = E(h)), (d = s(h, "SMALL", { style: !0 }));
            var T = l(d);
            (_ = N(T, "Please, try later.")), T.forEach(e), h.forEach(e), this.h();
        },
        h() {
            ut(u.src, (c = Jt)) || $(u, "src", c),
                $(u, "background", "transparent"),
                C(u, "max-width", "500px"),
                $(u, "speed", "1"),
                $(u, "nocontrols", ""),
                n(i, "class", "svelte-fyijzj"),
                C(d, "margin-top", "-10px"),
                C(d, "display", "block"),
                C(d, "opacity", "0.7"),
                n(o, "class", "text-center p-3 notFound svelte-fyijzj"),
                C(o, "width", "fit-content"),
                C(o, "background", "white");
        },
        m(j, h) {
            et(j, o, h), t(o, u), t(o, p), t(o, i), t(i, b), t(o, k), t(o, d), t(d, _);
        },
        p: Qt,
        d(j) {
            j && e(o);
        },
    };
}
function Kt(v) {
    let o,
        u,
        c,
        p,
        i,
        b,
        k = v[8].name + "",
        d,
        _,
        j,
        h,
        I,
        T,
        V,
        M,
        P,
        D,
        U,
        q,
        w,
        x = new Date(v[10]).toDateString() + "",
        g,
        r,
        m,
        f,
        A,
        S,
        H,
        B,
        Y,
        R,
        kt = v[11] + "",
        ft,
        pt,
        zt = v[12] + "",
        ht,
        _t,
        Nt = v[13] + "",
        vt,
        mt,
        gt,
        O,
        G,
        at,
        yt,
        K,
        Et,
        bt,
        st,
        Vt = v[8].persons_amount + "",
        jt,
        Dt,
        Q,
        J,
        L,
        lt,
        It,
        rt,
        Tt,
        wt;
    return {
        c() {
            (o = a("div")),
                (u = a("div")),
                (c = a("div")),
                (p = a("nav")),
                (i = a("div")),
                (b = a("h4")),
                (d = z(k)),
                (_ = y()),
                (j = a("div")),
                (h = a("table")),
                (I = a("tbody")),
                (T = a("tr")),
                (V = a("th")),
                (M = a("i")),
                (P = y()),
                (D = a("td")),
                (U = z("Start date")),
                (q = y()),
                (w = a("td")),
                (g = z(x)),
                (r = y()),
                (m = a("tr")),
                (f = a("th")),
                (A = a("i")),
                (S = y()),
                (H = a("td")),
                (B = z("Registeration will start in:")),
                (Y = y()),
                (R = a("td")),
                (ft = z(kt)),
                (pt = z(" day, ")),
                (ht = z(zt)),
                (_t = z(" hour, ")),
                (vt = z(Nt)),
                (mt = z(" min")),
                (gt = y()),
                (O = a("tr")),
                (G = a("th")),
                (at = a("i")),
                (yt = y()),
                (K = a("td")),
                (Et = z("Number of Contestant per team")),
                (bt = y()),
                (st = a("td")),
                (jt = z(Vt)),
                (Dt = y()),
                (Q = a("div")),
                (J = a("button")),
                (L = a("a")),
                (lt = a("span")),
                (It = y()),
                (rt = a("span")),
                (Tt = z("View full Contest")),
                (wt = y()),
                this.h();
        },
        l(ot) {
            o = s(ot, "DIV", { class: !0 });
            var nt = l(o);
            u = s(nt, "DIV", { class: !0 });
            var ct = l(u);
            c = s(ct, "DIV", { class: !0 });
            var St = l(c);
            p = s(St, "NAV", { class: !0 });
            var At = l(p);
            i = s(At, "DIV", { class: !0 });
            var Ct = l(i);
            b = s(Ct, "H4", { class: !0 });
            var Pt = l(b);
            (d = N(Pt, k)), Pt.forEach(e), Ct.forEach(e), At.forEach(e), St.forEach(e), (_ = E(ct)), (j = s(ct, "DIV", { class: !0 }));
            var it = l(j);
            h = s(it, "TABLE", { class: !0 });
            var Rt = l(h);
            I = s(Rt, "TBODY", {});
            var W = l(I);
            T = s(W, "TR", {});
            var X = l(T);
            V = s(X, "TH", { scope: !0 });
            var Lt = l(V);
            (M = s(Lt, "I", { class: !0 })), l(M).forEach(e), Lt.forEach(e), (P = E(X)), (D = s(X, "TD", {}));
            var Mt = l(D);
            (U = N(Mt, "Start date")), Mt.forEach(e), (q = E(X)), (w = s(X, "TD", { colspan: !0 }));
            var xt = l(w);
            (g = N(xt, x)), xt.forEach(e), X.forEach(e), (r = E(W)), (m = s(W, "TR", {}));
            var Z = l(m);
            f = s(Z, "TH", { scope: !0 });
            var Ht = l(f);
            (A = s(Ht, "I", { class: !0 })), l(A).forEach(e), Ht.forEach(e), (S = E(Z)), (H = s(Z, "TD", { colspan: !0 }));
            var Ot = l(H);
            (B = N(Ot, "Registeration will start in:")), Ot.forEach(e), (Y = E(Z)), (R = s(Z, "TD", {}));
            var F = l(R);
            (ft = N(F, kt)), (pt = N(F, " day, ")), (ht = N(F, zt)), (_t = N(F, " hour, ")), (vt = N(F, Nt)), (mt = N(F, " min")), F.forEach(e), Z.forEach(e), (gt = E(W)), (O = s(W, "TR", {}));
            var tt = l(O);
            G = s(tt, "TH", { scope: !0 });
            var $t = l(G);
            (at = s($t, "I", { class: !0 })), l(at).forEach(e), $t.forEach(e), (yt = E(tt)), (K = s(tt, "TD", { colspan: !0 }));
            var qt = l(K);
            (Et = N(qt, "Number of Contestant per team")), qt.forEach(e), (bt = E(tt)), (st = s(tt, "TD", {}));
            var Bt = l(st);
            (jt = N(Bt, Vt)), Bt.forEach(e), tt.forEach(e), W.forEach(e), Rt.forEach(e), (Dt = E(it)), (Q = s(it, "DIV", { class: !0 }));
            var Ut = l(Q);
            J = s(Ut, "BUTTON", { class: !0 });
            var Yt = l(J);
            L = s(Yt, "A", { class: !0, href: !0, target: !0 });
            var dt = l(L);
            (lt = s(dt, "SPAN", { class: !0 })), l(lt).forEach(e), (It = E(dt)), (rt = s(dt, "SPAN", {}));
            var Ft = l(rt);
            (Tt = N(Ft, "View full Contest")), Ft.forEach(e), dt.forEach(e), Yt.forEach(e), Ut.forEach(e), it.forEach(e), ct.forEach(e), (wt = E(nt)), nt.forEach(e), this.h();
        },
        h() {
            n(b, "class", "m-0 svelte-fyijzj"),
                n(i, "class", "navbar-brand svelte-fyijzj"),
                n(p, "class", "navbar navbar-expand-lg bg-light navbar-light mb-3 align-items-center svelte-fyijzj"),
                n(c, "class", "card-header bg-light svelte-fyijzj"),
                n(M, "class", "fa-solid fa-calendar"),
                n(V, "scope", "row"),
                n(w, "colspan", "2"),
                n(A, "class", "fa fa-clock svelte-fyijzj"),
                n(f, "scope", "row"),
                n(H, "colspan", "2"),
                n(at, "class", "fa fa-group svelte-fyijzj"),
                n(G, "scope", "row"),
                n(K, "colspan", "2"),
                n(h, "class", "table"),
                n(lt, "class", "fa fa-eye svelte-fyijzj"),
                n(L, "class", "link-light svelte-fyijzj"),
                n(L, "href", v[8].link),
                n(L, "target", "_blank"),
                n(J, "class", "btn btn-primary"),
                n(Q, "class", "btn btn-group gap-2"),
                n(j, "class", "card-body gap-2"),
                n(u, "class", "card shadow-sm border-0"),
                n(o, "class", "col-md");
        },
        m(ot, nt) {
            et(ot, o, nt),
                t(o, u),
                t(u, c),
                t(c, p),
                t(p, i),
                t(i, b),
                t(b, d),
                t(u, _),
                t(u, j),
                t(j, h),
                t(h, I),
                t(I, T),
                t(T, V),
                t(V, M),
                t(T, P),
                t(T, D),
                t(D, U),
                t(T, q),
                t(T, w),
                t(w, g),
                t(I, r),
                t(I, m),
                t(m, f),
                t(f, A),
                t(m, S),
                t(m, H),
                t(H, B),
                t(m, Y),
                t(m, R),
                t(R, ft),
                t(R, pt),
                t(R, ht),
                t(R, _t),
                t(R, vt),
                t(R, mt),
                t(I, gt),
                t(I, O),
                t(O, G),
                t(G, at),
                t(O, yt),
                t(O, K),
                t(K, Et),
                t(O, bt),
                t(O, st),
                t(st, jt),
                t(j, Dt),
                t(j, Q),
                t(Q, J),
                t(J, L),
                t(L, lt),
                t(L, It),
                t(L, rt),
                t(rt, Tt),
                t(o, wt);
        },
        p: Qt,
        d(ot) {
            ot && e(o);
        },
    };
}
function ve(v) {
    let o, u, c, p, i, b, k, d, _, j, h, I, T, V, M, P, D, U, q;
    V = new pe({ props: { userId: v[3], paricipantName: v[2], active: me } });
    let w = v[1].length == 0 && _e(),
        x = v[1],
        g = [];
    for (let r = 0; r < x.length; r += 1) g[r] = Kt(Gt(v, x, r));
    return {
        c() {
            (o = a("script")),
                (c = y()),
                (p = a("div")),
                (i = a("lottie-player")),
                (k = y()),
                (d = a("section")),
                (_ = a("img")),
                (h = y()),
                (I = a("div")),
                (T = y()),
                te(V.$$.fragment),
                (M = y()),
                (P = a("div")),
                (D = a("div")),
                w && w.c(),
                (U = y());
            for (let r = 0; r < g.length; r += 1) g[r].c();
            this.h();
        },
        l(r) {
            const m = ee('[data-svelte="svelte-7bk648"]', document.head);
            o = s(m, "SCRIPT", { src: !0 });
            var f = l(o);
            f.forEach(e), m.forEach(e), (c = E(r)), (p = s(r, "DIV", { class: !0 }));
            var A = l(p);
            (i = s(A, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                speed: !0,
                style: !0,
                loop: !0,
                autoplay: !0,
            })),
                l(i).forEach(e),
                A.forEach(e),
                (k = E(r)),
                (d = s(r, "SECTION", { class: !0 }));
            var S = l(d);
            (_ = s(S, "IMG", { class: !0, src: !0, alt: !0 })),
                (h = E(S)),
                (I = s(S, "DIV", { class: !0 })),
                l(I).forEach(e),
                (T = E(S)),
                ae(V.$$.fragment, S),
                (M = E(S)),
                (P = s(S, "DIV", { class: !0 }));
            var H = l(P);
            D = s(H, "DIV", { class: !0, style: !0, id: !0 });
            var B = l(D);
            w && w.l(B), (U = E(B));
            for (let Y = 0; Y < g.length; Y += 1) g[Y].l(B);
            B.forEach(e), H.forEach(e), S.forEach(e), this.h();
        },
        h() {
            (document.title = "Upcoming registrations"),
                (o.defer = !0),
                ut(o.src, (u = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js")) || n(o, "src", u),
                ut(i.src, (b = Jt)) || $(i, "src", b),
                $(i, "background", "transparent"),
                $(i, "speed", "1"),
                C(i, "width", "300px"),
                C(i, "height", "300px"),
                $(i, "loop", ""),
                $(i, "autoplay", ""),
                n(p, "class", "loading svelte-fyijzj"),
                n(_, "class", "d1 svelte-fyijzj"),
                ut(_.src, (j = fe)) || n(_, "src", j),
                n(_, "alt", ""),
                n(I, "class", "d2 svelte-fyijzj"),
                n(D, "class", "row justify-content-center align-items-center gap-3 p-0 m-0"),
                C(D, "flex-flow", "column nowrap"),
                C(D, "gap", "30px"),
                C(D, "width", "max-content"),
                n(D, "id", "upcomming"),
                n(P, "class", "part_4 d-flex justify-content-center align-items-start svelte-fyijzj"),
                n(d, "class", "participant-container svelte-fyijzj");
        },
        m(r, m) {
            t(document.head, o),
                et(r, c, m),
                et(r, p, m),
                t(p, i),
                v[4](p),
                et(r, k, m),
                et(r, d, m),
                t(d, _),
                t(d, h),
                t(d, I),
                t(d, T),
                se(V, d, null),
                t(d, M),
                t(d, P),
                t(P, D),
                w && w.m(D, null),
                t(D, U);
            for (let f = 0; f < g.length; f += 1) g[f].m(D, null);
            q = !0;
        },
        p(r, [m]) {
            if ((r[1].length == 0 && w.p(r, m), m & 2)) {
                x = r[1];
                let f;
                for (f = 0; f < x.length; f += 1) {
                    const A = Gt(r, x, f);
                    g[f] ? g[f].p(A, m) : ((g[f] = Kt(A)), g[f].c(), g[f].m(D, null));
                }
                for (; f < g.length; f += 1) g[f].d(1);
                g.length = x.length;
            }
        },
        i(r) {
            q || (le(V.$$.fragment, r), (q = !0));
        },
        o(r) {
            re(V.$$.fragment, r), (q = !1);
        },
        d(r) {
            e(o), r && e(c), r && e(p), v[4](null), r && e(k), r && e(d), oe(V), w && w.d(), ne(g, r);
        },
    };
}
let me = "upcoming";
function ge(v, o, u) {
    let c;
    ce(v, ue, (h) => u(5, (c = h)));
    let p = c.data,
        i = p.upComming_competitions,
        b = p.userInfo;
    he();
    let k = b.name + " " + b.surname,
        d = b.id,
        _ = "";
    ie(() => {
        u(0, (_.style.display = "none"), _);
    });
    function j(h) {
        de[h ? "unshift" : "push"](() => {
            (_ = h), u(0, _);
        });
    }
    return [_, i, k, d, j];
}
class Ie extends Wt {
    constructor(o) {
        super(), Xt(this, o, ge, ve, Zt, {});
    }
}
export { Ie as default };
