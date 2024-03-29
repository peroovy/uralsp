import {
    S as Rt,
    i as Vt,
    s as Ot,
    k as u,
    a as E,
    v as jt,
    D as Mt,
    l as d,
    m as p,
    h as o,
    c as g,
    w as Ut,
    E as rt,
    n as _,
    T as j,
    p as H,
    B as e,
    b as M,
    x as xt,
    f as Yt,
    t as zt,
    y as Ft,
    I as Gt,
    o as Kt,
    K as Qt,
    e as St,
    Q as Jt,
    q as D,
    r as A,
    A as Wt,
    P as yt,
} from "../../../../chunks/index-af757d0f.js";
import { p as Xt } from "../../../../chunks/stores-0b118143.js";
import { d as Zt } from "../../../../chunks/dots-63d78b83.js";
import { N as te, l as $t } from "../../../../chunks/navbar-6efa5a58.js";
import { s as ee } from "../../../../chunks/sessionDuration-e379fb60.js";
import { b as ae } from "../../../../chunks/paths-9678c1af.js";
function Ct(n, t, l) {
    const r = n.slice();
    r[15] = t[l];
    const a = new Date(Date.parse(r[15].created_at));
    return (r[16] = a), r;
}
function se(n) {
    let t,
        l = n[1],
        r = [];
    for (let a = 0; a < l.length; a += 1) r[a] = Lt(Ct(n, l, a));
    return {
        c() {
            for (let a = 0; a < r.length; a += 1) r[a].c();
            t = St();
        },
        l(a) {
            for (let c = 0; c < r.length; c += 1) r[c].l(a);
            t = St();
        },
        m(a, c) {
            for (let f = 0; f < r.length; f += 1) r[f].m(a, c);
            M(a, t, c);
        },
        p(a, c) {
            if (c & 114) {
                l = a[1];
                let f;
                for (f = 0; f < l.length; f += 1) {
                    const i = Ct(a, l, f);
                    r[f] ? r[f].p(i, c) : ((r[f] = Lt(i)), r[f].c(), r[f].m(t.parentNode, t));
                }
                for (; f < r.length; f += 1) r[f].d(1);
                r.length = l.length;
            }
        },
        d(a) {
            Jt(r, a), a && o(t);
        },
    };
}
function le(n) {
    let t, l, r, a, c, f, i, s, v;
    return {
        c() {
            (t = u("div")), (l = u("lottie-player")), (a = E()), (c = u("h2")), (f = D("No requests found")), (i = E()), (s = u("small")), (v = D("Please, try later.")), this.h();
        },
        l(I) {
            t = d(I, "DIV", { class: !0, style: !0 });
            var b = p(t);
            (l = d(b, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                style: !0,
                speed: !0,
                nocontrols: !0,
            })),
                p(l).forEach(o),
                (a = g(b)),
                (c = d(b, "H2", { class: !0 }));
            var w = p(c);
            (f = A(w, "No requests found")), w.forEach(o), (i = g(b)), (s = d(b, "SMALL", { style: !0 }));
            var T = p(s);
            (v = A(T, "Please, try later.")), T.forEach(o), b.forEach(o), this.h();
        },
        h() {
            rt(l.src, (r = $t)) || j(l, "src", r),
                j(l, "background", "transparent"),
                H(l, "max-width", "500px"),
                j(l, "speed", "1"),
                j(l, "nocontrols", ""),
                _(c, "class", "svelte-10xkaob"),
                H(s, "margin-top", "-10px"),
                H(s, "display", "block"),
                H(s, "opacity", "0.7"),
                _(t, "class", "text-center p-3 notFound svelte-10xkaob"),
                H(t, "width", "fit-content "),
                H(t, "background", "white");
        },
        m(I, b) {
            M(I, t, b), e(t, l), e(t, a), e(t, c), e(c, f), e(t, i), e(t, s), e(s, v);
        },
        p: Wt,
        d(I) {
            I && o(t);
        },
    };
}
function re(n) {
    let t, l, r, a, c;
    function f() {
        return n[10](n[15]);
    }
    return {
        c() {
            (t = u("button")),
                (l = u("li")),
                (r = D(`
                    Renew`)),
                this.h();
        },
        l(i) {
            t = d(i, "BUTTON", { class: !0 });
            var s = p(t);
            (l = d(s, "LI", { class: !0 })),
                p(l).forEach(o),
                (r = A(
                    s,
                    `
                    Renew`
                )),
                s.forEach(o),
                this.h();
        },
        h() {
            _(l, "class", "fa fa-trash-restore svelte-10xkaob"), _(t, "class", "btn btn-success btn-sm");
        },
        m(i, s) {
            M(i, t, s), e(t, l), e(t, r), a || ((c = yt(t, "click", f)), (a = !0));
        },
        p(i, s) {
            n = i;
        },
        d(i) {
            i && o(t), (a = !1), c();
        },
    };
}
function oe(n) {
    let t, l, r, a, c;
    function f() {
        return n[9](n[15]);
    }
    return {
        c() {
            (t = u("button")),
                (l = u("li")),
                (r = D(`
                    Cancel`)),
                this.h();
        },
        l(i) {
            t = d(i, "BUTTON", { class: !0 });
            var s = p(t);
            (l = d(s, "LI", { class: !0 })),
                p(l).forEach(o),
                (r = A(
                    s,
                    `
                    Cancel`
                )),
                s.forEach(o),
                this.h();
        },
        h() {
            _(l, "class", "fa fa-trash svelte-10xkaob"), _(t, "class", "btn btn-danger btn-sm");
        },
        m(i, s) {
            M(i, t, s), e(t, l), e(t, r), a || ((c = yt(t, "click", f)), (a = !0));
        },
        p(i, s) {
            n = i;
        },
        d(i) {
            i && o(t), (a = !1), c();
        },
    };
}
function Lt(n) {
    let t,
        l,
        r,
        a,
        c = (n[15].team_name || n[15].competition_name || "No name") + "",
        f,
        i,
        s,
        v,
        I = (n[15].description ? n[15].description : "No description") + "",
        b,
        w,
        T,
        y,
        N,
        q,
        P,
        m,
        R,
        V = n[15].status + "",
        O,
        h,
        k,
        U,
        F,
        S,
        L,
        J = n[16].toDateString() + "",
        ot,
        nt,
        kt = n[16].getHours() + ":" + n[16].getMinutes() + ":" + n[16].getSeconds(),
        ct,
        it,
        z,
        G,
        ut,
        dt,
        W,
        Et = n[15].participants.join(" ,") + "",
        ft,
        pt,
        x,
        Y,
        X,
        _t,
        ht,
        mt,
        vt,
        gt;
    function Bt() {
        return n[8](n[15]);
    }
    function Ht(C, B) {
        if (C[15].status != "canceled" && C[15].status != "cancelled") return oe;
        if (C[15].status == "canceled" || C[15].status == "cancelled") return re;
    }
    let It = Ht(n),
        $ = It && It(n);
    return {
        c() {
            (t = u("div")),
                (l = u("h4")),
                (r = u("li")),
                (a = E()),
                (f = D(c)),
                (i = E()),
                (s = u("div")),
                (v = u("p")),
                (b = D(I)),
                (w = E()),
                (T = u("table")),
                (y = u("tbody")),
                (N = u("tr")),
                (q = u("th")),
                (P = D("Status")),
                (m = E()),
                (R = u("td")),
                (O = D(V)),
                (h = E()),
                (k = u("tr")),
                (U = u("th")),
                (F = D("Created at")),
                (S = E()),
                (L = u("td")),
                (ot = D(J)),
                (nt = D(", ")),
                (ct = D(kt)),
                (it = E()),
                (z = u("tr")),
                (G = u("th")),
                (ut = D("Participants IDs")),
                (dt = E()),
                (W = u("td")),
                (ft = D(Et)),
                (pt = E()),
                (x = u("div")),
                (Y = u("button")),
                (X = u("li")),
                (_t = D(`
                  Edit`)),
                (ht = E()),
                $ && $.c(),
                (mt = E()),
                this.h();
        },
        l(C) {
            t = d(C, "DIV", { class: !0, style: !0 });
            var B = p(t);
            l = d(B, "H4", { class: !0 });
            var Z = p(l);
            (r = d(Z, "LI", { class: !0 })), p(r).forEach(o), (a = g(Z)), (f = A(Z, c)), Z.forEach(o), (i = g(B)), (s = d(B, "DIV", { class: !0 }));
            var K = p(s);
            v = d(K, "P", { class: !0 });
            var Tt = p(v);
            (b = A(Tt, I)), Tt.forEach(o), (w = g(K)), (T = d(K, "TABLE", { class: !0 }));
            var wt = p(T);
            y = d(wt, "TBODY", {});
            var Q = p(y);
            N = d(Q, "TR", {});
            var tt = p(N);
            q = d(tt, "TH", { scope: !0 });
            var Dt = p(q);
            (P = A(Dt, "Status")), Dt.forEach(o), (m = g(tt)), (R = d(tt, "TD", {}));
            var At = p(R);
            (O = A(At, V)), At.forEach(o), tt.forEach(o), (h = g(Q)), (k = d(Q, "TR", {}));
            var et = p(k);
            U = d(et, "TH", { scope: !0 });
            var qt = p(U);
            (F = A(qt, "Created at")), qt.forEach(o), (S = g(et)), (L = d(et, "TD", {}));
            var at = p(L);
            (ot = A(at, J)), (nt = A(at, ", ")), (ct = A(at, kt)), at.forEach(o), et.forEach(o), (it = g(Q)), (z = d(Q, "TR", {}));
            var st = p(z);
            G = d(st, "TH", { scope: !0 });
            var Nt = p(G);
            (ut = A(Nt, "Participants IDs")), Nt.forEach(o), (dt = g(st)), (W = d(st, "TD", {}));
            var Pt = p(W);
            (ft = A(Pt, Et)), Pt.forEach(o), st.forEach(o), Q.forEach(o), wt.forEach(o), (pt = g(K)), (x = d(K, "DIV", { class: !0 }));
            var lt = p(x);
            Y = d(lt, "BUTTON", { class: !0 });
            var bt = p(Y);
            (X = d(bt, "LI", { class: !0 })),
                p(X).forEach(o),
                (_t = A(
                    bt,
                    `
                  Edit`
                )),
                bt.forEach(o),
                (ht = g(lt)),
                $ && $.l(lt),
                lt.forEach(o),
                K.forEach(o),
                (mt = g(B)),
                B.forEach(o),
                this.h();
        },
        h() {
            _(r, "class", "fa fa-paper-plane me-1 svelte-10xkaob"),
                _(l, "class", "card-header p-4 m-0 svelte-10xkaob"),
                _(v, "class", "request-description svelte-10xkaob"),
                _(q, "scope", "row"),
                _(U, "scope", "row"),
                _(G, "scope", "row"),
                _(T, "class", "table table-striped table-hover"),
                _(X, "class", "fa fa-edit svelte-10xkaob"),
                _(Y, "class", "btn btn-primary btn-sm"),
                _(x, "class", "btn gap-2"),
                _(s, "class", "card-body"),
                _(t, "class", "card p-0 border-0 shadow-sm"),
                H(t, "width", "500px"),
                H(t, "flex-flow", "column nowrap");
        },
        m(C, B) {
            M(C, t, B),
                e(t, l),
                e(l, r),
                e(l, a),
                e(l, f),
                e(t, i),
                e(t, s),
                e(s, v),
                e(v, b),
                e(s, w),
                e(s, T),
                e(T, y),
                e(y, N),
                e(N, q),
                e(q, P),
                e(N, m),
                e(N, R),
                e(R, O),
                e(y, h),
                e(y, k),
                e(k, U),
                e(U, F),
                e(k, S),
                e(k, L),
                e(L, ot),
                e(L, nt),
                e(L, ct),
                e(y, it),
                e(y, z),
                e(z, G),
                e(G, ut),
                e(z, dt),
                e(z, W),
                e(W, ft),
                e(s, pt),
                e(s, x),
                e(x, Y),
                e(Y, X),
                e(Y, _t),
                e(x, ht),
                $ && $.m(x, null),
                e(t, mt),
                vt || ((gt = yt(Y, "click", Bt)), (vt = !0));
        },
        p(C, B) {
            (n = C), $ && $.p(n, B);
        },
        d(C) {
            C && o(t), $ && $.d(), (vt = !1), gt();
        },
    };
}
function ne(n) {
    let t, l, r, a, c, f, i, s, v, I, b, w, T, y, N, q, P, m;
    y = new te({ props: { userId: n[3], paricipantName: n[2], active: ce } });
    function R(h, k) {
        return h[1].length == 0 ? le : se;
    }
    let O = R(n)(n);
    return {
        c() {
            (t = u("script")),
                (r = E()),
                (a = u("div")),
                (c = u("lottie-player")),
                (i = E()),
                (s = u("section")),
                (v = u("img")),
                (b = E()),
                (w = u("div")),
                (T = E()),
                jt(y.$$.fragment),
                (N = E()),
                (q = u("div")),
                (P = u("div")),
                O.c(),
                this.h();
        },
        l(h) {
            const k = Mt('[data-svelte="svelte-1o6vthh"]', document.head);
            t = d(k, "SCRIPT", { src: !0 });
            var U = p(t);
            U.forEach(o), k.forEach(o), (r = g(h)), (a = d(h, "DIV", { class: !0 }));
            var F = p(a);
            (c = d(F, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                speed: !0,
                style: !0,
                loop: !0,
                autoplay: !0,
            })),
                p(c).forEach(o),
                F.forEach(o),
                (i = g(h)),
                (s = d(h, "SECTION", { class: !0 }));
            var S = p(s);
            (v = d(S, "IMG", { class: !0, src: !0, alt: !0 })),
                (b = g(S)),
                (w = d(S, "DIV", { class: !0 })),
                p(w).forEach(o),
                (T = g(S)),
                Ut(y.$$.fragment, S),
                (N = g(S)),
                (q = d(S, "DIV", { class: !0 }));
            var L = p(q);
            P = d(L, "DIV", { class: !0, id: !0 });
            var J = p(P);
            O.l(J), J.forEach(o), L.forEach(o), S.forEach(o), this.h();
        },
        h() {
            (document.title = "User requests"),
                (t.defer = !0),
                rt(t.src, (l = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js")) || _(t, "src", l),
                rt(c.src, (f = $t)) || j(c, "src", f),
                j(c, "background", "transparent"),
                j(c, "speed", "1"),
                H(c, "width", "300px"),
                H(c, "height", "300px"),
                j(c, "loop", ""),
                j(c, "autoplay", ""),
                _(a, "class", "loading svelte-10xkaob"),
                _(v, "class", "d1 svelte-10xkaob"),
                rt(v.src, (I = Zt)) || _(v, "src", I),
                _(v, "alt", ""),
                _(w, "class", "d2 svelte-10xkaob"),
                _(P, "class", "row part_4 justify-content-center align-items-center gap-3 p-0 m-0 svelte-10xkaob"),
                _(P, "id", "requests"),
                _(q, "class", "part_4 d-flex justify-content-center align-items-start svelte-10xkaob"),
                _(s, "class", "participant-container svelte-10xkaob");
        },
        m(h, k) {
            e(document.head, t),
                M(h, r, k),
                M(h, a, k),
                e(a, c),
                n[7](a),
                M(h, i, k),
                M(h, s, k),
                e(s, v),
                e(s, b),
                e(s, w),
                e(s, T),
                xt(y, s, null),
                e(s, N),
                e(s, q),
                e(q, P),
                O.m(P, null),
                (m = !0);
        },
        p(h, [k]) {
            O.p(h, k);
        },
        i(h) {
            m || (Yt(y.$$.fragment, h), (m = !0));
        },
        o(h) {
            zt(y.$$.fragment, h), (m = !1);
        },
        d(h) {
            o(t), h && o(r), h && o(a), n[7](null), h && o(i), h && o(s), Ft(y), O.d();
        },
    };
}
let ce = "requests";
function ie(n, t, l) {
    let r;
    Gt(n, Xt, (m) => l(11, (r = m)));
    let a = r.data,
        c = a.requests,
        f = a.API,
        i = a.userInfo;
    ee();
    let s = i.name + " " + i.surname,
        v = i.id,
        I = "";
    function b(m) {
        !confirm("Are you sure you want to renew your application?") ||
            fetch(`${f}/users/current/requests/${m}/renew`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            }).then((V) => {
                V.status == 200 ? location.reload() : console.error(V);
            });
    }
    function w(m) {
        window.location.href = `${ae}/contests/apply/${m}`;
    }
    function T(m) {
        !confirm("Are you sure you want to cancel your application?") ||
            fetch(`${f}/users/current/requests/${m}/cancel`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            }).then((V) => {
                V.status == 200 ? location.reload() : console.error(V);
            });
    }
    Kt(() => {
        l(0, (I.style.display = "none"), I);
    });
    function y(m) {
        Qt[m ? "unshift" : "push"](() => {
            (I = m), l(0, I);
        });
    }
    return [I, c, s, v, b, w, T, y, (m) => w(m.competition), (m) => T(m.id), (m) => b(m.id)];
}
class me extends Rt {
    constructor(t) {
        super(), Vt(this, t, ie, ne, Ot, {});
    }
}
export { me as default };
