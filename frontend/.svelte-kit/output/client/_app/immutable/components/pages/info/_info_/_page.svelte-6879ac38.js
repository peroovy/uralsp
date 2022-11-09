import {
    S as Ss,
    i as Ns,
    s as Ps,
    k as o,
    l as r,
    m as u,
    h as A,
    n as s,
    b as R,
    A as ue,
    W as Ds,
    o as zs,
    K as tt,
    a as b,
    q as w,
    D as Vs,
    c as E,
    r as T,
    E as Ol,
    M as ht,
    B as e,
    N as F,
    O as ve,
    P as W,
    t as Ml,
    d as Hs,
    f as jl,
    Q as Jt,
    R as sl,
    I as Js,
    u as Us,
    g as Os,
    L as ft,
    v as Ms,
    w as js,
    x as Rs,
    y as Ys,
} from "../../../../chunks/index-af757d0f.js";
import { d as qs } from "../../../../chunks/dots-63d78b83.js";
import { r as ps } from "../../../../chunks/republics-74048aea.js";
import { s as Gs } from "../../../../chunks/sessionDuration-e379fb60.js";
import { p as Ks } from "../../../../chunks/stores-0b118143.js";
const Fs =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABy5JREFUeJzt2bFNw1AARVEbeQnoUdrslClhBiRa6hRp4yqRaEzNAv8X95wJXnmltywAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAP+vH1/UxewQAMNa67/sxewQAMNbL7AEAwHgCAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAIAEAAEECAACCBAAABAkAAAgSAAAQJAAAIEgAAECQAACAoPXt8nnMHgEAjLXd7r+zNwAAg7kAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAIEgAAECQAACBIAABAkAAAgCABAABBAgAAggQAAAQJAAAI2l4f++wNAMBg689yOmaPAADGcgEAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgSAAAQJAAAIAgAQAAQQIAAIIEAAAECQAACBIAABAkAAAgaPt+Pz9njwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgKn+AEosFPi/tfWpAAAAAElFTkSuQmCC";
function Ws(a) {
    let l;
    return {
        c() {
            (l = o("div")), this.h();
        },
        l(t) {
            (l = r(t, "DIV", { class: !0 })), u(l).forEach(A), this.h();
        },
        h() {
            s(l, "class", "svelte-jfwjhx");
        },
        m(t, i) {
            R(t, l, i), a[7](l);
        },
        p: ue,
        i: ue,
        o: ue,
        d(t) {
            t && A(l), a[7](null);
        },
    };
}
function Xs(a, l, t) {
    let i,
        n,
        { username: c = "" } = l,
        { size: f = "medium" } = l,
        { authType: g = "callback" } = l,
        { redirectURL: B = "" } = l,
        { requestAccess: k = !1 } = l,
        { buttonRadius: z = 10 } = l;
    const M = Ds(),
        _ = (h) => {
            M("auth", h);
        },
        v = () => {
            try {
                if (
                    (t(0, (i.innerHTML = ""), i),
                    (n = document.createElement("script")),
                    (n.src = "https://telegram.org/js/telegram-widget.js?19"),
                    n.setAttribute("async", "true"),
                    n.setAttribute("data-telegram-login", c),
                    n.setAttribute("data-size", f),
                    n.setAttribute("data-radius", `${z}`),
                    g === "callback")
                )
                    n.setAttribute("data-onauth", "window.telegramCallback(user)");
                else if (g === "redirect") {
                    if (!B) throw new Error("Redirect URL is required if authType is set to redirect");
                    n.setAttribute("data-auth-url", B);
                }
                k && n.setAttribute("data-request-access", "write"), i.appendChild(n);
            } catch (h) {
                console.error(h);
            }
        };
    zs(() => {
        (window.telegramCallback = _), v();
    });
    function d(h) {
        tt[h ? "unshift" : "push"](() => {
            (i = h), t(0, i);
        });
    }
    return (
        (a.$$set = (h) => {
            "username" in h && t(1, (c = h.username)),
                "size" in h && t(2, (f = h.size)),
                "authType" in h && t(3, (g = h.authType)),
                "redirectURL" in h && t(4, (B = h.redirectURL)),
                "requestAccess" in h && t(5, (k = h.requestAccess)),
                "buttonRadius" in h && t(6, (z = h.buttonRadius));
        }),
        [i, c, f, g, B, k, z, d]
    );
}
class Zs extends Ss {
    constructor(l) {
        super(),
            Ns(this, l, Xs, Ws, Ps, {
                username: 1,
                size: 2,
                authType: 3,
                redirectURL: 4,
                requestAccess: 5,
                buttonRadius: 6,
            });
    }
}
function vs(a, l, t) {
    const i = a.slice();
    return (i[56] = l[t]), i;
}
function bs(a, l, t) {
    const i = a.slice();
    return (i[59] = l[t]), i;
}
function Es(a, l, t) {
    const i = a.slice();
    return (i[59] = l[t]), i;
}
function xs(a, l, t) {
    const i = a.slice();
    return (i[64] = l[t]), (i[66] = t), i;
}
function Is(a, l, t) {
    const i = a.slice();
    return (i[67] = l[t]), i;
}
function Cs(a) {
    let l,
        t = a[67] + "",
        i;
    return {
        c() {
            (l = o("option")), (i = w(t)), this.h();
        },
        l(n) {
            l = r(n, "OPTION", {});
            var c = u(l);
            (i = T(c, t)), c.forEach(A), this.h();
        },
        h() {
            (l.__value = a[67]), (l.value = l.__value);
        },
        m(n, c) {
            R(n, l, c), e(l, i);
        },
        p: ue,
        d(n) {
            n && A(l);
        },
    };
}
function ys(a) {
    let l,
        t,
        i,
        n,
        c,
        f,
        g,
        B,
        k,
        z,
        M,
        _,
        v,
        d,
        h,
        y,
        H,
        V,
        L = Array(11),
        S = [];
    for (let D = 0; D < L.length; D += 1) S[D] = $s(xs(a, L, D));
    return {
        c() {
            (l = o("div")),
                (t = o("div")),
                (i = o("div")),
                (n = o("div")),
                (c = o("label")),
                (f = w("School Name")),
                (g = b()),
                (B = o("input")),
                (k = b()),
                (z = o("div")),
                (M = o("label")),
                (_ = w("School Year")),
                (v = b()),
                (d = o("select")),
                (h = o("option")),
                (y = w("Choose..."));
            for (let D = 0; D < S.length; D += 1) S[D].c();
            this.h();
        },
        l(D) {
            l = r(D, "DIV", { class: !0 });
            var C = u(l);
            t = r(C, "DIV", { class: !0 });
            var Y = u(t);
            i = r(Y, "DIV", { class: !0 });
            var U = u(i);
            n = r(U, "DIV", { class: !0 });
            var Q = u(n);
            c = r(Q, "LABEL", { for: !0 });
            var I = u(c);
            (f = T(I, "School Name")), I.forEach(A), (g = E(Q)), (B = r(Q, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), Q.forEach(A), (k = E(U)), (z = r(U, "DIV", { class: !0 }));
            var P = u(z);
            M = r(P, "LABEL", { for: !0 });
            var p = u(M);
            (_ = T(p, "School Year")), p.forEach(A), (v = E(P)), (d = r(P, "SELECT", { class: !0, "aria-label": !0 }));
            var j = u(d);
            h = r(j, "OPTION", {});
            var ee = u(h);
            (y = T(ee, "Choose...")), ee.forEach(A);
            for (let q = 0; q < S.length; q += 1) S[q].l(j);
            j.forEach(A), P.forEach(A), U.forEach(A), Y.forEach(A), C.forEach(A), this.h();
        },
        h() {
            s(c, "for", "school"),
                s(B, "type", "text"),
                s(B, "class", "form-control svelte-zs98s6"),
                s(B, "id", "school"),
                s(B, "placeholder", "Enter your school name"),
                s(n, "class", "form-group p-0 col-md-7"),
                s(M, "for", "schoolYear"),
                (h.selected = !0),
                (h.__value = "Choose..."),
                (h.value = h.__value),
                s(d, "class", "form-select form-select svelte-zs98s6"),
                s(d, "aria-label", "Default select example"),
                a[13] === void 0 && ht(() => a[31].call(d)),
                s(z, "class", "form-group p-0 col-md-4"),
                s(i, "class", "row col-md-11 m-0 justify-content-between"),
                s(t, "class", "form-group col-md-11 justify-content-between"),
                s(l, "class", "d-flex col-md-11");
        },
        m(D, C) {
            R(D, l, C), e(l, t), e(t, i), e(i, n), e(n, c), e(c, f), e(n, g), e(n, B), F(B, a[14]), e(i, k), e(i, z), e(z, M), e(M, _), e(z, v), e(z, d), e(d, h), e(h, y);
            for (let Y = 0; Y < S.length; Y += 1) S[Y].m(d, null);
            ve(d, a[13]), H || ((V = [W(B, "input", a[30]), W(d, "change", a[31])]), (H = !0));
        },
        p(D, C) {
            C[0] & 16384 && B.value !== D[14] && F(B, D[14]), C[0] & 8192 && ve(d, D[13]);
        },
        d(D) {
            D && A(l), Jt(S, D), (H = !1), sl(V);
        },
    };
}
function $s(a) {
    let l,
        t = a[66] + 1 + "",
        i;
    return {
        c() {
            (l = o("option")), (i = w(t)), this.h();
        },
        l(n) {
            l = r(n, "OPTION", {});
            var c = u(l);
            (i = T(c, t)), c.forEach(A), this.h();
        },
        h() {
            (l.__value = a[66] + 1), (l.value = l.__value);
        },
        m(n, c) {
            R(n, l, c), e(l, i);
        },
        p: ue,
        d(n) {
            n && A(l);
        },
    };
}
function Bs(a) {
    let l,
        t,
        i,
        n,
        c,
        f,
        g,
        B,
        k,
        z,
        M,
        _,
        v,
        d,
        h,
        y,
        H,
        V,
        L,
        S,
        D,
        C,
        Y,
        U = a[17],
        Q = [];
    for (let I = 0; I < U.length; I += 1) Q[I] = ks(Es(a, U, I));
    return {
        c() {
            (l = o("div")),
                (t = o("div")),
                (i = o("div")),
                (n = o("label")),
                (c = w("Institute Name")),
                (f = b()),
                (g = o("input")),
                (B = b()),
                (k = o("div")),
                (z = o("label")),
                (M = w("Faculty/Institute")),
                (_ = b()),
                (v = o("input")),
                (d = b()),
                (h = o("div")),
                (y = o("label")),
                (H = w("Institute Year")),
                (V = b()),
                (L = o("select")),
                (S = o("option")),
                (D = w("Choose..."));
            for (let I = 0; I < Q.length; I += 1) Q[I].c();
            this.h();
        },
        l(I) {
            l = r(I, "DIV", { class: !0 });
            var P = u(l);
            t = r(P, "DIV", { class: !0 });
            var p = u(t);
            i = r(p, "DIV", { class: !0 });
            var j = u(i);
            n = r(j, "LABEL", { for: !0 });
            var ee = u(n);
            (c = T(ee, "Institute Name")), ee.forEach(A), (f = E(j)), (g = r(j, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), j.forEach(A), (B = E(p)), (k = r(p, "DIV", { class: !0 }));
            var q = u(k);
            z = r(q, "LABEL", { for: !0 });
            var Z = u(z);
            (M = T(Z, "Faculty/Institute")),
                Z.forEach(A),
                (_ = E(q)),
                (v = r(q, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })),
                q.forEach(A),
                (d = E(p)),
                (h = r(p, "DIV", { class: !0 }));
            var re = u(h);
            y = r(re, "LABEL", { for: !0 });
            var x = u(y);
            (H = T(x, "Institute Year")), x.forEach(A), (V = E(re)), (L = r(re, "SELECT", { class: !0, "aria-label": !0 }));
            var he = u(L);
            S = r(he, "OPTION", {});
            var $ = u(S);
            (D = T($, "Choose...")), $.forEach(A);
            for (let te = 0; te < Q.length; te += 1) Q[te].l(he);
            he.forEach(A), re.forEach(A), p.forEach(A), P.forEach(A), this.h();
        },
        h() {
            s(n, "for", "Institute"),
                s(g, "type", "text"),
                s(g, "class", "form-control svelte-zs98s6"),
                s(g, "id", "Institute"),
                s(g, "placeholder", "Enter your Institute name"),
                s(i, "class", "form-group col-md-8"),
                s(z, "for", "Institute"),
                s(v, "type", "text"),
                s(v, "class", "form-control svelte-zs98s6"),
                s(v, "id", "Institute"),
                s(v, "placeholder", "Enter your Institute name"),
                s(k, "class", "form-group col-md-8"),
                s(y, "for", "Institute Year"),
                (S.selected = !0),
                (S.__value = "Choose..."),
                (S.value = S.__value),
                s(L, "class", "form-select svelte-zs98s6"),
                s(L, "aria-label", "select"),
                a[13] === void 0 && ht(() => a[34].call(L)),
                s(h, "class", "form-group col-md-4"),
                s(t, "class", "row"),
                s(l, "class", "d-flex col-md-11 justify-content-between p-0");
        },
        m(I, P) {
            R(I, l, P),
                e(l, t),
                e(t, i),
                e(i, n),
                e(n, c),
                e(i, f),
                e(i, g),
                F(g, a[14]),
                e(t, B),
                e(t, k),
                e(k, z),
                e(z, M),
                e(k, _),
                e(k, v),
                F(v, a[12]),
                e(t, d),
                e(t, h),
                e(h, y),
                e(y, H),
                e(h, V),
                e(h, L),
                e(L, S),
                e(S, D);
            for (let p = 0; p < Q.length; p += 1) Q[p].m(L, null);
            ve(L, a[13]), C || ((Y = [W(g, "input", a[32]), W(v, "input", a[33]), W(L, "change", a[34])]), (C = !0));
        },
        p(I, P) {
            if ((P[0] & 16384 && g.value !== I[14] && F(g, I[14]), P[0] & 4096 && v.value !== I[12] && F(v, I[12]), P[0] & 131072)) {
                U = I[17];
                let p;
                for (p = 0; p < U.length; p += 1) {
                    const j = Es(I, U, p);
                    Q[p] ? Q[p].p(j, P) : ((Q[p] = ks(j)), Q[p].c(), Q[p].m(L, null));
                }
                for (; p < Q.length; p += 1) Q[p].d(1);
                Q.length = U.length;
            }
            P[0] & 8192 && ve(L, I[13]);
        },
        d(I) {
            I && A(l), Jt(Q, I), (C = !1), sl(Y);
        },
    };
}
function ks(a) {
    let l,
        t = a[59] + "",
        i;
    return {
        c() {
            (l = o("option")), (i = w(t)), this.h();
        },
        l(n) {
            l = r(n, "OPTION", {});
            var c = u(l);
            (i = T(c, t)), c.forEach(A), this.h();
        },
        h() {
            (l.__value = a[59]), (l.value = l.__value);
        },
        m(n, c) {
            R(n, l, c), e(l, i);
        },
        p: ue,
        d(n) {
            n && A(l);
        },
    };
}
function Qs(a) {
    let l,
        t,
        i,
        n,
        c,
        f,
        g,
        B,
        k,
        z,
        M,
        _,
        v,
        d,
        h,
        y,
        H,
        V,
        L,
        S,
        D,
        C,
        Y,
        U = a[18],
        Q = [];
    for (let I = 0; I < U.length; I += 1) Q[I] = ws(bs(a, U, I));
    return {
        c() {
            (l = o("div")),
                (t = o("div")),
                (i = o("div")),
                (n = o("label")),
                (c = w("College name")),
                (f = b()),
                (g = o("input")),
                (B = b()),
                (k = o("div")),
                (z = o("label")),
                (M = w("Direction (specialty)")),
                (_ = b()),
                (v = o("input")),
                (d = b()),
                (h = o("div")),
                (y = o("label")),
                (H = w("College Year")),
                (V = b()),
                (L = o("select")),
                (S = o("option")),
                (D = w("Choose..."));
            for (let I = 0; I < Q.length; I += 1) Q[I].c();
            this.h();
        },
        l(I) {
            l = r(I, "DIV", { class: !0 });
            var P = u(l);
            t = r(P, "DIV", { class: !0 });
            var p = u(t);
            i = r(p, "DIV", { class: !0 });
            var j = u(i);
            n = r(j, "LABEL", { for: !0 });
            var ee = u(n);
            (c = T(ee, "College name")), ee.forEach(A), (f = E(j)), (g = r(j, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), j.forEach(A), (B = E(p)), (k = r(p, "DIV", { class: !0 }));
            var q = u(k);
            z = r(q, "LABEL", { for: !0 });
            var Z = u(z);
            (M = T(Z, "Direction (specialty)")),
                Z.forEach(A),
                (_ = E(q)),
                (v = r(q, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })),
                q.forEach(A),
                (d = E(p)),
                (h = r(p, "DIV", { class: !0 }));
            var re = u(h);
            y = r(re, "LABEL", { for: !0 });
            var x = u(y);
            (H = T(x, "College Year")), x.forEach(A), (V = E(re)), (L = r(re, "SELECT", { class: !0, "aria-label": !0 }));
            var he = u(L);
            S = r(he, "OPTION", {});
            var $ = u(S);
            (D = T($, "Choose...")), $.forEach(A);
            for (let te = 0; te < Q.length; te += 1) Q[te].l(he);
            he.forEach(A), re.forEach(A), p.forEach(A), P.forEach(A), this.h();
        },
        h() {
            s(n, "for", "Institute"),
                s(g, "type", "text"),
                s(g, "class", "form-control svelte-zs98s6"),
                s(g, "id", "Institute"),
                s(g, "placeholder", "Enter your Institute name"),
                s(i, "class", "form-group col-md-8"),
                s(z, "for", "Institute"),
                s(v, "type", "text"),
                s(v, "class", "form-control svelte-zs98s6"),
                s(v, "id", "Institute"),
                s(v, "placeholder", "Enter your Institute name"),
                s(k, "class", "form-group col-md-8"),
                s(y, "for", "Institute Year"),
                (S.selected = !0),
                (S.__value = "Choose..."),
                (S.value = S.__value),
                s(L, "class", "form-select svelte-zs98s6"),
                s(L, "aria-label", "select"),
                a[13] === void 0 && ht(() => a[37].call(L)),
                s(h, "class", "form-group col-md-4"),
                s(t, "class", "row"),
                s(l, "class", "d-flex col-md-11 justify-content-between p-0");
        },
        m(I, P) {
            R(I, l, P),
                e(l, t),
                e(t, i),
                e(i, n),
                e(n, c),
                e(i, f),
                e(i, g),
                F(g, a[14]),
                e(t, B),
                e(t, k),
                e(k, z),
                e(z, M),
                e(k, _),
                e(k, v),
                F(v, a[12]),
                e(t, d),
                e(t, h),
                e(h, y),
                e(y, H),
                e(h, V),
                e(h, L),
                e(L, S),
                e(S, D);
            for (let p = 0; p < Q.length; p += 1) Q[p].m(L, null);
            ve(L, a[13]), C || ((Y = [W(g, "input", a[35]), W(v, "input", a[36]), W(L, "change", a[37])]), (C = !0));
        },
        p(I, P) {
            if ((P[0] & 16384 && g.value !== I[14] && F(g, I[14]), P[0] & 4096 && v.value !== I[12] && F(v, I[12]), P[0] & 262144)) {
                U = I[18];
                let p;
                for (p = 0; p < U.length; p += 1) {
                    const j = bs(I, U, p);
                    Q[p] ? Q[p].p(j, P) : ((Q[p] = ws(j)), Q[p].c(), Q[p].m(L, null));
                }
                for (; p < Q.length; p += 1) Q[p].d(1);
                Q.length = U.length;
            }
            P[0] & 8192 && ve(L, I[13]);
        },
        d(I) {
            I && A(l), Jt(Q, I), (C = !1), sl(Y);
        },
    };
}
function ws(a) {
    let l,
        t = a[59] + "",
        i;
    return {
        c() {
            (l = o("option")), (i = w(t)), this.h();
        },
        l(n) {
            l = r(n, "OPTION", {});
            var c = u(l);
            (i = T(c, t)), c.forEach(A), this.h();
        },
        h() {
            (l.__value = a[59]), (l.value = l.__value);
        },
        m(n, c) {
            R(n, l, c), e(l, i);
        },
        p: ue,
        d(n) {
            n && A(l);
        },
    };
}
function Ts(a) {
    let l,
        t,
        i,
        n,
        c,
        f,
        g,
        B,
        k,
        z,
        M,
        _,
        v,
        d = a[10],
        h = [];
    for (let y = 0; y < d.length; y += 1) h[y] = Ls(vs(a, d, y));
    return {
        c() {
            (l = o("h5")),
                (t = o("i")),
                (i = w(`\r
            Permission`)),
                (n = b()),
                (c = o("div")),
                (f = o("label")),
                (g = w("Permission")),
                (B = b()),
                (k = o("select")),
                (z = o("option")),
                (M = w("Choose..."));
            for (let y = 0; y < h.length; y += 1) h[y].c();
            this.h();
        },
        l(y) {
            l = r(y, "H5", { class: !0 });
            var H = u(l);
            (t = r(H, "I", { class: !0 })),
                u(t).forEach(A),
                (i = T(
                    H,
                    `\r
            Permission`
                )),
                H.forEach(A),
                (n = E(y)),
                (c = r(y, "DIV", { class: !0 }));
            var V = u(c);
            f = r(V, "LABEL", { for: !0 });
            var L = u(f);
            (g = T(L, "Permission")), L.forEach(A), (B = E(V)), (k = r(V, "SELECT", { class: !0, "aria-label": !0 }));
            var S = u(k);
            z = r(S, "OPTION", {});
            var D = u(z);
            (M = T(D, "Choose...")), D.forEach(A);
            for (let C = 0; C < h.length; C += 1) h[C].l(S);
            S.forEach(A), V.forEach(A), this.h();
        },
        h() {
            s(t, "class", "fa-solid fa-lock"),
                s(l, "class", "card-title m-4 mt-2 svelte-zs98s6"),
                s(f, "for", "region"),
                (z.selected = !0),
                (z.__value = "Choose..."),
                (z.value = z.__value),
                s(k, "class", "form-select form-select-sm svelte-zs98s6"),
                s(k, "aria-label", "Default select example"),
                a[9] === void 0 && ht(() => a[38].call(k)),
                s(c, "class", "card-body ms-4 mt-0");
        },
        m(y, H) {
            R(y, l, H), e(l, t), e(l, i), R(y, n, H), R(y, c, H), e(c, f), e(f, g), e(c, B), e(c, k), e(k, z), e(z, M);
            for (let V = 0; V < h.length; V += 1) h[V].m(k, null);
            ve(k, a[9]), _ || ((v = W(k, "change", a[38])), (_ = !0));
        },
        p(y, H) {
            if (H[0] & 1024) {
                d = y[10];
                let V;
                for (V = 0; V < d.length; V += 1) {
                    const L = vs(y, d, V);
                    h[V] ? h[V].p(L, H) : ((h[V] = Ls(L)), h[V].c(), h[V].m(k, null));
                }
                for (; V < h.length; V += 1) h[V].d(1);
                h.length = d.length;
            }
            H[0] & 1536 && ve(k, y[9]);
        },
        d(y) {
            y && A(l), y && A(n), y && A(c), Jt(h, y), (_ = !1), v();
        },
    };
}
function Ls(a) {
    let l,
        t = a[56] + "",
        i,
        n;
    return {
        c() {
            (l = o("option")), (i = w(t)), this.h();
        },
        l(c) {
            l = r(c, "OPTION", {});
            var f = u(l);
            (i = T(f, t)), f.forEach(A), this.h();
        },
        h() {
            (l.__value = n = a[56]), (l.value = l.__value);
        },
        m(c, f) {
            R(c, l, f), e(l, i);
        },
        p(c, f) {
            f[0] & 1024 && t !== (t = c[56] + "") && Us(i, t), f[0] & 1024 && n !== (n = c[56]) && ((l.__value = n), (l.value = l.__value));
        },
        d(c) {
            c && A(l);
        },
    };
}
function eA(a) {
    let l, t, i, n;
    return {
        c() {
            (l = o("span")), (t = w("Unlink your Google")), this.h();
        },
        l(c) {
            l = r(c, "SPAN", { class: !0 });
            var f = u(l);
            (t = T(f, "Unlink your Google")), f.forEach(A), this.h();
        },
        h() {
            s(l, "class", "me-2");
        },
        m(c, f) {
            R(c, l, f), e(l, t), i || ((n = W(l, "click", a[40])), (i = !0));
        },
        p: ue,
        d(c) {
            c && A(l), (i = !1), n();
        },
    };
}
function tA(a) {
    let l, t, i, n;
    return {
        c() {
            (l = o("span")), (t = w("Link your Google")), (i = b()), (n = o("div")), this.h();
        },
        l(c) {
            l = r(c, "SPAN", { class: !0 });
            var f = u(l);
            (t = T(f, "Link your Google")), f.forEach(A), (i = E(c)), (n = r(c, "DIV", { class: !0 })), u(n).forEach(A), this.h();
        },
        h() {
            s(l, "class", "me-2"), s(n, "class", "googleBtnHolder svelte-zs98s6");
        },
        m(c, f) {
            R(c, l, f), e(l, t), R(c, i, f), R(c, n, f), a[39](n);
        },
        p: ue,
        d(c) {
            c && A(l), c && A(i), c && A(n), a[39](null);
        },
    };
}
function lA(a) {
    let l, t, i, n;
    return {
        c() {
            (l = o("span")), (t = w("Unlink your VK")), this.h();
        },
        l(c) {
            l = r(c, "SPAN", { class: !0 });
            var f = u(l);
            (t = T(f, "Unlink your VK")), f.forEach(A), this.h();
        },
        h() {
            s(l, "class", "me-2");
        },
        m(c, f) {
            R(c, l, f), e(l, t), i || ((n = W(l, "click", a[42])), (i = !0));
        },
        p: ue,
        d(c) {
            c && A(l), (i = !1), n();
        },
    };
}
function sA(a) {
    let l, t, i, n;
    return {
        c() {
            (l = o("span")), (t = w("Link your VK")), (i = b()), (n = o("div")), this.h();
        },
        l(c) {
            l = r(c, "SPAN", { class: !0 });
            var f = u(l);
            (t = T(f, "Link your VK")), f.forEach(A), (i = E(c)), (n = r(c, "DIV", { id: !0, class: !0 })), u(n).forEach(A), this.h();
        },
        h() {
            s(l, "class", "me-2"), s(n, "id", "vk_auth"), s(n, "class", "vkHolder svelte-zs98s6");
        },
        m(c, f) {
            R(c, l, f), e(l, t), R(c, i, f), R(c, n, f);
        },
        p: ue,
        d(c) {
            c && A(l), c && A(i), c && A(n);
        },
    };
}
function AA(a) {
    let l, t, i, n;
    return {
        c() {
            (l = o("span")), (t = w("Unlink your Telegram")), this.h();
        },
        l(c) {
            l = r(c, "SPAN", { class: !0 });
            var f = u(l);
            (t = T(f, "Unlink your Telegram")), f.forEach(A), this.h();
        },
        h() {
            s(l, "class", "me-2");
        },
        m(c, f) {
            R(c, l, f), e(l, t), i || ((n = W(l, "click", a[44])), (i = !0));
        },
        p: ue,
        i: ue,
        o: ue,
        d(c) {
            c && A(l), (i = !1), n();
        },
    };
}
function aA(a) {
    let l, t, i, n, c, f;
    return (
        (t = new Zs({ props: { username: a[15] } })),
        t.$on("auth", a[21]),
        {
            c() {
                (l = o("div")), Ms(t.$$.fragment), (i = b()), (n = o("span")), (c = w("Link your Telegram")), this.h();
            },
            l(g) {
                l = r(g, "DIV", { class: !0 });
                var B = u(l);
                js(t.$$.fragment, B), B.forEach(A), (i = E(g)), (n = r(g, "SPAN", { class: !0 }));
                var k = u(n);
                (c = T(k, "Link your Telegram")), k.forEach(A), this.h();
            },
            h() {
                s(l, "class", "telegramBtnHolder svelte-zs98s6"), s(n, "class", "me-2");
            },
            m(g, B) {
                R(g, l, B), Rs(t, l, null), R(g, i, B), R(g, n, B), e(n, c), (f = !0);
            },
            p: ue,
            i(g) {
                f || (jl(t.$$.fragment, g), (f = !0));
            },
            o(g) {
                Ml(t.$$.fragment, g), (f = !1);
            },
            d(g) {
                g && A(l), Ys(t), g && A(i), g && A(n);
            },
        }
    );
}
function oA(a) {
    let l,
        t,
        i,
        n,
        c,
        f,
        g,
        B,
        k,
        z,
        M,
        _,
        v,
        d,
        h,
        y,
        H,
        V,
        L,
        S,
        D,
        C,
        Y,
        U,
        Q,
        I,
        P,
        p,
        j,
        ee,
        q,
        Z,
        re,
        x,
        he,
        $,
        te,
        _t,
        mt,
        de,
        gt,
        Se,
        pt,
        vt,
        me,
        Je,
        bt,
        Et,
        ne,
        It,
        Ne,
        Ct,
        yt,
        ye,
        Ue,
        Bt,
        kt,
        Be,
        N,
        G,
        O,
        be,
        Pe,
        ie,
        Qt,
        ze,
        Ze,
        wt,
        Ut,
        Oe,
        Me,
        lt,
        Al,
        al,
        _e,
        De,
        ol,
        rl,
        je,
        st,
        nl,
        il,
        Ee,
        cl,
        xe,
        Tt,
        ul,
        dl,
        ce,
        Re,
        At,
        fl,
        hl,
        fe,
        Ve,
        _l,
        Ye,
        ml,
        qe,
        gl,
        Ge,
        pl,
        vl,
        Ot,
        Mt,
        bl,
        jt,
        $e,
        Lt,
        El,
        Il,
        at,
        ke,
        Qe,
        St,
        Cl,
        yl,
        we,
        Nt,
        Bl,
        kl,
        Te,
        Pt,
        Ql,
        ge,
        pe,
        wl,
        ot,
        Ke,
        zt,
        Tl,
        Ll,
        rt,
        Rt,
        Fe,
        et,
        nt,
        Sl,
        Dt,
        Nl,
        Rl;
    document.title = i = "App Name | " + a[2].name + " " + a[2].surname;
    let it = ps,
        le = [];
    for (let m = 0; m < it.length; m += 1) le[m] = Cs(Is(a, it, m));
    let se = a[11] === "School" && ys(a),
        Ae = a[11] === "University" && Bs(a),
        ae = a[11] == "College" && Qs(a),
        oe = a[16] != a[2].id && Ts(a);
    function Yl(m, J) {
        return m[1].google == null ? tA : eA;
    }
    let Yt = Yl(a),
        Ie = Yt(a);
    function ql(m, J) {
        return m[1].vk == null ? sA : lA;
    }
    let qt = ql(a),
        Ce = qt(a);
    const Gl = [aA, AA],
        We = [];
    function Kl(m, J) {
        return m[1].tele == null ? 0 : 1;
    }
    return (
        (ge = Kl(a)),
        (pe = We[ge] = Gl[ge](a)),
        {
            c() {
                (l = o("meta")),
                    (t = o("link")),
                    (n = o("script")),
                    (f = b()),
                    (g = o("section")),
                    (B = o("img")),
                    (z = b()),
                    (M = o("div")),
                    (_ = b()),
                    (v = o("nav")),
                    (d = o("div")),
                    (h = o("span")),
                    (y = b()),
                    (H = o("h4")),
                    (V = w("Settings")),
                    (L = b()),
                    (S = o("div")),
                    (D = o("div")),
                    (C = o("div")),
                    (Y = o("h5")),
                    (U = o("i")),
                    (Q = w(`\r
          Basic Information`)),
                    (I = b()),
                    (P = o("div")),
                    (p = o("label")),
                    (j = w("Full Name")),
                    (ee = b()),
                    (q = o("div")),
                    (Z = o("input")),
                    (re = b()),
                    (x = o("input")),
                    (he = b()),
                    ($ = o("div")),
                    (te = o("label")),
                    (_t = w("Email address")),
                    (mt = b()),
                    (de = o("input")),
                    (gt = b()),
                    (Se = o("small")),
                    (pt = w("We'll never share your email with anyone else.")),
                    (vt = b()),
                    (me = o("div")),
                    (Je = o("label")),
                    (bt = w("User ID")),
                    (Et = b()),
                    (ne = o("input")),
                    (It = b()),
                    (Ne = o("small")),
                    (Ct = w("You won't be able to change this Id!")),
                    (yt = b()),
                    (ye = o("div")),
                    (Ue = o("label")),
                    (Bt = w("Phone Number")),
                    (kt = b()),
                    (Be = o("div")),
                    (N = o("div")),
                    (G = o("span")),
                    (O = o("img")),
                    (Pe = b()),
                    (ie = o("input")),
                    (Qt = b()),
                    (ze = o("h5")),
                    (Ze = o("i")),
                    (wt = w(`\r
          Address`)),
                    (Ut = b()),
                    (Oe = o("div")),
                    (Me = o("div")),
                    (lt = o("label")),
                    (Al = w("Region")),
                    (al = b()),
                    (_e = o("select")),
                    (De = o("option")),
                    (ol = w("Choose..."));
                for (let m = 0; m < le.length; m += 1) le[m].c();
                (rl = b()),
                    (je = o("div")),
                    (st = o("label")),
                    (nl = w("City")),
                    (il = b()),
                    (Ee = o("input")),
                    (cl = b()),
                    (xe = o("h5")),
                    (Tt = o("i")),
                    (ul = w(`\r
          Education`)),
                    (dl = b()),
                    (ce = o("div")),
                    (Re = o("div")),
                    (At = o("label")),
                    (fl = w("Education type")),
                    (hl = b()),
                    (fe = o("select")),
                    (Ve = o("option")),
                    (_l = w("Choose...")),
                    (Ye = o("option")),
                    (ml = w("School")),
                    (qe = o("option")),
                    (gl = w("University")),
                    (Ge = o("option")),
                    (pl = w("College")),
                    (vl = b()),
                    se && se.c(),
                    (Ot = b()),
                    Ae && Ae.c(),
                    (Mt = b()),
                    ae && ae.c(),
                    (bl = b()),
                    oe && oe.c(),
                    (jt = b()),
                    ($e = o("h5")),
                    (Lt = o("i")),
                    (El = w(`\r
          Social Media`)),
                    (Il = b()),
                    (at = o("div")),
                    (ke = o("div")),
                    (Qe = o("button")),
                    (St = o("i")),
                    (Cl = b()),
                    Ie.c(),
                    (yl = b()),
                    (we = o("button")),
                    (Nt = o("i")),
                    (Bl = b()),
                    Ce.c(),
                    (kl = b()),
                    (Te = o("button")),
                    (Pt = o("i")),
                    (Ql = b()),
                    pe.c(),
                    (wl = b()),
                    (ot = o("div")),
                    (Ke = o("button")),
                    (zt = o("i")),
                    (Tl = w(`\r
            Save`)),
                    (Ll = b()),
                    (rt = o("div")),
                    (Rt = b()),
                    (Fe = o("div")),
                    (et = o("div")),
                    (nt = o("span")),
                    (Sl = w("Loading...")),
                    this.h();
            },
            l(m) {
                const J = Vs('[data-svelte="svelte-1b57mjl"]', document.head);
                (l = r(J, "META", { name: !0, content: !0 })), (t = r(J, "LINK", { rel: !0, href: !0 })), (n = r(J, "SCRIPT", { src: !0, type: !0, charset: !0 }));
                var He = u(n);
                He.forEach(A), J.forEach(A), (f = E(m)), (g = r(m, "SECTION", { class: !0 }));
                var K = u(g);
                (B = r(K, "IMG", { class: !0, src: !0, alt: !0 })), (z = E(K)), (M = r(K, "DIV", { class: !0 })), u(M).forEach(A), (_ = E(K)), (v = r(K, "NAV", { class: !0 }));
                var Vt = u(v);
                d = r(Vt, "DIV", { class: !0 });
                var Gt = u(d);
                (h = r(Gt, "SPAN", { class: !0 })), u(h).forEach(A), (y = E(Gt)), (H = r(Gt, "H4", { class: !0 }));
                var Fl = u(H);
                (V = T(Fl, "Settings")), Fl.forEach(A), Gt.forEach(A), Vt.forEach(A), (L = E(K)), (S = r(K, "DIV", { class: !0 }));
                var Wl = u(S);
                D = r(Wl, "DIV", { class: !0 });
                var Xl = u(D);
                C = r(Xl, "DIV", { class: !0 });
                var X = u(C);
                Y = r(X, "H5", { class: !0 });
                var Pl = u(Y);
                (U = r(Pl, "I", { class: !0 })),
                    u(U).forEach(A),
                    (Q = T(
                        Pl,
                        `\r
          Basic Information`
                    )),
                    Pl.forEach(A),
                    (I = E(X)),
                    (P = r(X, "DIV", { class: !0 }));
                var Le = u(P);
                p = r(Le, "LABEL", { for: !0 });
                var Zl = u(p);
                (j = T(Zl, "Full Name")), Zl.forEach(A), (ee = E(Le)), (q = r(Le, "DIV", { class: !0 }));
                var Kt = u(q);
                (Z = r(Kt, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })),
                    (re = E(Kt)),
                    (x = r(Kt, "INPUT", {
                        type: !0,
                        class: !0,
                        id: !0,
                        placeholder: !0,
                    })),
                    Kt.forEach(A),
                    (he = E(Le)),
                    ($ = r(Le, "DIV", { class: !0 }));
                var ct = u($);
                te = r(ct, "LABEL", { for: !0 });
                var xl = u(te);
                (_t = T(xl, "Email address")),
                    xl.forEach(A),
                    (mt = E(ct)),
                    (de = r(ct, "INPUT", {
                        type: !0,
                        class: !0,
                        id: !0,
                        "aria-describedby": !0,
                        placeholder: !0,
                    })),
                    (gt = E(ct)),
                    (Se = r(ct, "SMALL", { id: !0, class: !0 }));
                var $l = u(Se);
                (pt = T($l, "We'll never share your email with anyone else.")), $l.forEach(A), ct.forEach(A), (vt = E(Le)), (me = r(Le, "DIV", { class: !0 }));
                var ut = u(me);
                Je = r(ut, "LABEL", { for: !0 });
                var es = u(Je);
                (bt = T(es, "User ID")),
                    es.forEach(A),
                    (Et = E(ut)),
                    (ne = r(ut, "INPUT", {
                        type: !0,
                        class: !0,
                        id: !0,
                        "aria-describedby": !0,
                        placeholder: !0,
                    })),
                    (It = E(ut)),
                    (Ne = r(ut, "SMALL", { id: !0, class: !0 }));
                var ts = u(Ne);
                (Ct = T(ts, "You won't be able to change this Id!")), ts.forEach(A), ut.forEach(A), (yt = E(Le)), (ye = r(Le, "DIV", { class: !0 }));
                var Ft = u(ye);
                Ue = r(Ft, "LABEL", { for: !0 });
                var ls = u(Ue);
                (Bt = T(ls, "Phone Number")), ls.forEach(A), (kt = E(Ft)), (Be = r(Ft, "DIV", { class: !0 }));
                var Wt = u(Be);
                N = r(Wt, "DIV", { class: !0 });
                var ss = u(N);
                G = r(ss, "SPAN", { class: !0, id: !0 });
                var As = u(G);
                (O = r(As, "IMG", { src: !0, alt: !0, class: !0 })),
                    As.forEach(A),
                    ss.forEach(A),
                    (Pe = E(Wt)),
                    (ie = r(Wt, "INPUT", {
                        type: !0,
                        class: !0,
                        id: !0,
                        placeholder: !0,
                        "data-mask": !0,
                    })),
                    Wt.forEach(A),
                    Ft.forEach(A),
                    Le.forEach(A),
                    (Qt = E(X)),
                    (ze = r(X, "H5", { class: !0 }));
                var zl = u(ze);
                (Ze = r(zl, "I", { class: !0 })),
                    u(Ze).forEach(A),
                    (wt = T(
                        zl,
                        `\r
          Address`
                    )),
                    zl.forEach(A),
                    (Ut = E(X)),
                    (Oe = r(X, "DIV", { class: !0 }));
                var Xt = u(Oe);
                Me = r(Xt, "DIV", { class: !0 });
                var Zt = u(Me);
                lt = r(Zt, "LABEL", { for: !0 });
                var as = u(lt);
                (Al = T(as, "Region")), as.forEach(A), (al = E(Zt)), (_e = r(Zt, "SELECT", { class: !0, "aria-label": !0 }));
                var Dl = u(_e);
                De = r(Dl, "OPTION", {});
                var os = u(De);
                (ol = T(os, "Choose...")), os.forEach(A);
                for (let Ul = 0; Ul < le.length; Ul += 1) le[Ul].l(Dl);
                Dl.forEach(A), Zt.forEach(A), (rl = E(Xt)), (je = r(Xt, "DIV", { class: !0 }));
                var xt = u(je);
                st = r(xt, "LABEL", { for: !0 });
                var rs = u(st);
                (nl = T(rs, "City")),
                    rs.forEach(A),
                    (il = E(xt)),
                    (Ee = r(xt, "INPUT", {
                        type: !0,
                        class: !0,
                        id: !0,
                        placeholder: !0,
                    })),
                    xt.forEach(A),
                    Xt.forEach(A),
                    (cl = E(X)),
                    (xe = r(X, "H5", { class: !0 }));
                var Vl = u(xe);
                (Tt = r(Vl, "I", { class: !0 })),
                    u(Tt).forEach(A),
                    (ul = T(
                        Vl,
                        `\r
          Education`
                    )),
                    Vl.forEach(A),
                    (dl = E(X)),
                    (ce = r(X, "DIV", { class: !0 }));
                var Xe = u(ce);
                Re = r(Xe, "DIV", { class: !0 });
                var $t = u(Re);
                At = r($t, "LABEL", { for: !0 });
                var ns = u(At);
                (fl = T(ns, "Education type")), ns.forEach(A), (hl = E($t)), (fe = r($t, "SELECT", { class: !0, "aria-label": !0 }));
                var Ht = u(fe);
                Ve = r(Ht, "OPTION", {});
                var is = u(Ve);
                (_l = T(is, "Choose...")), is.forEach(A), (Ye = r(Ht, "OPTION", {}));
                var cs = u(Ye);
                (ml = T(cs, "School")), cs.forEach(A), (qe = r(Ht, "OPTION", {}));
                var us = u(qe);
                (gl = T(us, "University")), us.forEach(A), (Ge = r(Ht, "OPTION", {}));
                var ds = u(Ge);
                (pl = T(ds, "College")),
                    ds.forEach(A),
                    Ht.forEach(A),
                    $t.forEach(A),
                    (vl = E(Xe)),
                    se && se.l(Xe),
                    (Ot = E(Xe)),
                    Ae && Ae.l(Xe),
                    (Mt = E(Xe)),
                    ae && ae.l(Xe),
                    Xe.forEach(A),
                    (bl = E(X)),
                    oe && oe.l(X),
                    (jt = E(X)),
                    ($e = r(X, "H5", { class: !0 }));
                var Hl = u($e);
                (Lt = r(Hl, "I", { class: !0 })),
                    u(Lt).forEach(A),
                    (El = T(
                        Hl,
                        `\r
          Social Media`
                    )),
                    Hl.forEach(A),
                    (Il = E(X)),
                    (at = r(X, "DIV", { class: !0 }));
                var fs = u(at);
                ke = r(fs, "DIV", { class: !0 });
                var dt = u(ke);
                Qe = r(dt, "BUTTON", { class: !0 });
                var el = u(Qe);
                (St = r(el, "I", { class: !0 })), u(St).forEach(A), (Cl = E(el)), Ie.l(el), el.forEach(A), (yl = E(dt)), (we = r(dt, "BUTTON", { class: !0 }));
                var tl = u(we);
                (Nt = r(tl, "I", { class: !0 })), u(Nt).forEach(A), (Bl = E(tl)), Ce.l(tl), tl.forEach(A), (kl = E(dt)), (Te = r(dt, "BUTTON", { class: !0 }));
                var ll = u(Te);
                (Pt = r(ll, "I", { class: !0 })), u(Pt).forEach(A), (Ql = E(ll)), pe.l(ll), ll.forEach(A), dt.forEach(A), fs.forEach(A), (wl = E(X)), (ot = r(X, "DIV", { class: !0 }));
                var hs = u(ot);
                Ke = r(hs, "BUTTON", { class: !0 });
                var Jl = u(Ke);
                (zt = r(Jl, "I", { class: !0 })),
                    u(zt).forEach(A),
                    (Tl = T(
                        Jl,
                        `\r
            Save`
                    )),
                    Jl.forEach(A),
                    hs.forEach(A),
                    X.forEach(A),
                    Xl.forEach(A),
                    Wl.forEach(A),
                    (Ll = E(K)),
                    (rt = r(K, "DIV", { class: !0 })),
                    u(rt).forEach(A),
                    K.forEach(A),
                    (Rt = E(m)),
                    (Fe = r(m, "DIV", { class: !0 }));
                var _s = u(Fe);
                et = r(_s, "DIV", { class: !0, role: !0 });
                var ms = u(et);
                nt = r(ms, "SPAN", { class: !0 });
                var gs = u(nt);
                (Sl = T(gs, "Loading...")), gs.forEach(A), ms.forEach(A), _s.forEach(A), this.h();
            },
            h() {
                s(l, "name", "description"),
                    s(l, "content", "Some description!"),
                    s(t, "rel", "stylesheet"),
                    s(t, "href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"),
                    (n.async = !0),
                    (n.defer = !0),
                    Ol(n.src, (c = "https://vk.com/js/api/openapi.js")) || s(n, "src", c),
                    s(n, "type", "text/javascript"),
                    s(n, "charset", "windows-1251"),
                    s(B, "class", "d1 svelte-zs98s6"),
                    Ol(B.src, (k = qs)) || s(B, "src", k),
                    s(B, "alt", ""),
                    s(M, "class", "d2 svelte-zs98s6"),
                    s(h, "class", "fa fa-gears ms-3 me-3"),
                    s(H, "class", "p-0 m-0"),
                    s(d, "class", "navbar-brand d-flex col align-items-center"),
                    s(v, "class", "navbar navbar-light sticky-top shadow svelte-zs98s6"),
                    s(U, "class", "fa fa-info-circle"),
                    s(Y, "class", "card-title m-4 mt-4 svelte-zs98s6"),
                    s(p, "for", "name"),
                    s(Z, "type", "text"),
                    s(Z, "class", "form-control svelte-zs98s6"),
                    s(Z, "id", "name"),
                    s(Z, "placeholder", "Enter first name"),
                    s(x, "type", "text"),
                    s(x, "class", "form-control svelte-zs98s6"),
                    s(x, "id", "name"),
                    s(x, "placeholder", "Enter last name"),
                    s(q, "class", "form-group d-flex gap-3 col-md-11"),
                    s(te, "for", "Email Address"),
                    s(de, "type", "email"),
                    s(de, "class", "form-control svelte-zs98s6"),
                    s(de, "id", "Email Address"),
                    s(de, "aria-describedby", "emailHelp"),
                    s(de, "placeholder", "Enter email"),
                    s(Se, "id", "emailHelp"),
                    s(Se, "class", "form-text text-muted svelte-zs98s6"),
                    s($, "class", "form-group col-md-11"),
                    s(Je, "for", "Email Address"),
                    s(ne, "type", "email"),
                    s(ne, "class", "form-control svelte-zs98s6"),
                    s(ne, "id", "Email Address"),
                    s(ne, "aria-describedby", "emailHelp"),
                    s(ne, "placeholder", "Enter email"),
                    (ne.disabled = !0),
                    s(Ne, "id", "emailHelp"),
                    s(Ne, "class", "form-text text-muted svelte-zs98s6"),
                    s(me, "class", "form-group col-md-11"),
                    s(Ue, "for", "phoneNumber"),
                    Ol(O.src, (be = Fs)) || s(O, "src", be),
                    s(O, "alt", "The Russian flag"),
                    s(O, "class", "flag svelte-zs98s6"),
                    s(G, "class", "input-group-text rounded-0 bg-white svelte-zs98s6"),
                    s(G, "id", "basic-addon3"),
                    s(N, "class", "input-group-prepend "),
                    s(ie, "type", "text"),
                    s(ie, "class", "form-control svelte-zs98s6"),
                    s(ie, "id", "phoneNumber"),
                    s(ie, "placeholder", "Enter phone number"),
                    s(ie, "data-mask", "+7"),
                    s(Be, "class", "input-group mb-3"),
                    s(ye, "class", "form-group col-md-11"),
                    s(P, "class", "card-body ms-4"),
                    s(Ze, "class", "fa fa-map-marker"),
                    s(ze, "class", "card-title m-4 mt-0 svelte-zs98s6"),
                    s(lt, "for", "region"),
                    (De.selected = !0),
                    (De.__value = "Choose..."),
                    (De.value = De.__value),
                    s(_e, "class", "form-select form-select-sm svelte-zs98s6"),
                    s(_e, "aria-label", "Default select example"),
                    a[2].region === void 0 && ht(() => a[27].call(_e)),
                    s(Me, "class", "form-group col-md-11"),
                    s(st, "for", "city"),
                    s(Ee, "type", "text"),
                    s(Ee, "class", "form-control svelte-zs98s6"),
                    s(Ee, "id", "city"),
                    s(Ee, "placeholder", "Enter city"),
                    s(je, "class", "form-group col-md-11"),
                    s(Oe, "class", "card-body ms-4"),
                    s(Tt, "class", "fa fa-book"),
                    s(xe, "class", "card-title m-4 mt-0 svelte-zs98s6"),
                    s(At, "for", "education"),
                    (Ve.selected = !0),
                    (Ve.__value = "Choose..."),
                    (Ve.value = Ve.__value),
                    (Ye.__value = "School"),
                    (Ye.value = Ye.__value),
                    (qe.__value = "University"),
                    (qe.value = qe.__value),
                    (Ge.__value = "College"),
                    (Ge.value = Ge.__value),
                    s(fe, "class", "form-select form-select-sm svelte-zs98s6"),
                    s(fe, "aria-label", "Default select example"),
                    a[11] === void 0 && ht(() => a[29].call(fe)),
                    s(Re, "class", "form-group col-md-11"),
                    s(ce, "class", "card-body ms-4"),
                    s(Lt, "class", "fa-solid fa-share-nodes"),
                    s($e, "class", "card-title m-4 mt-0 me-0 pe-0 svelte-zs98s6"),
                    s(St, "class", "fa fa-google me-3 svelte-zs98s6"),
                    s(Qe, "class", "btn social btn-sm mt-2 mb-2 p-2 svelte-zs98s6"),
                    s(Nt, "class", "fa fa-vk me-3 svelte-zs98s6"),
                    s(we, "class", "btn social btn-sm mt-2 mb-2 p-2 svelte-zs98s6"),
                    s(Pt, "class", "fa fa-telegram me-3 svelte-zs98s6"),
                    s(Te, "class", "btn social btn-sm mt-2 mb-2 p-2 svelte-zs98s6"),
                    s(ke, "class", "btn-group gap-2 form-group col-md-11"),
                    s(at, "class", "card-body pt-0 mt-0 d-flex justify-content-center align-items-center"),
                    s(zt, "class", "fa fa-save"),
                    s(Ke, "class", "btn btn-lg btn-primary mt-2 mb-2"),
                    s(ot, "class", "form-group col-md-11 m-4 mt-0"),
                    s(C, "class", "card shadow col-lg-6 svelte-zs98s6"),
                    s(D, "class", "row p-0 m-0 col-12 justify-content-center"),
                    s(S, "class", "container d-flex justify-content-center mt-5"),
                    s(rt, "class", "alertCont svelte-zs98s6"),
                    s(g, "class", "user-info svelte-zs98s6"),
                    s(nt, "class", "visually-hidden"),
                    s(et, "class", "spinner-border svelte-zs98s6"),
                    s(et, "role", "status"),
                    s(Fe, "class", "loading svelte-zs98s6");
            },
            m(m, J) {
                e(document.head, l),
                    e(document.head, t),
                    e(document.head, n),
                    R(m, f, J),
                    R(m, g, J),
                    e(g, B),
                    e(g, z),
                    e(g, M),
                    e(g, _),
                    e(g, v),
                    e(v, d),
                    e(d, h),
                    e(d, y),
                    e(d, H),
                    e(H, V),
                    e(g, L),
                    e(g, S),
                    e(S, D),
                    e(D, C),
                    e(C, Y),
                    e(Y, U),
                    e(Y, Q),
                    e(C, I),
                    e(C, P),
                    e(P, p),
                    e(p, j),
                    e(P, ee),
                    e(P, q),
                    e(q, Z),
                    F(Z, a[2].name),
                    e(q, re),
                    e(q, x),
                    F(x, a[2].surname),
                    e(P, he),
                    e(P, $),
                    e($, te),
                    e(te, _t),
                    e($, mt),
                    e($, de),
                    F(de, a[2].email),
                    e($, gt),
                    e($, Se),
                    e(Se, pt),
                    e(P, vt),
                    e(P, me),
                    e(me, Je),
                    e(Je, bt),
                    e(me, Et),
                    e(me, ne),
                    F(ne, a[3]),
                    e(me, It),
                    e(me, Ne),
                    e(Ne, Ct),
                    e(P, yt),
                    e(P, ye),
                    e(ye, Ue),
                    e(Ue, Bt),
                    e(ye, kt),
                    e(ye, Be),
                    e(Be, N),
                    e(N, G),
                    e(G, O),
                    e(Be, Pe),
                    e(Be, ie),
                    F(ie, a[2].phone),
                    e(C, Qt),
                    e(C, ze),
                    e(ze, Ze),
                    e(ze, wt),
                    e(C, Ut),
                    e(C, Oe),
                    e(Oe, Me),
                    e(Me, lt),
                    e(lt, Al),
                    e(Me, al),
                    e(Me, _e),
                    e(_e, De),
                    e(De, ol);
                for (let He = 0; He < le.length; He += 1) le[He].m(_e, null);
                ve(_e, a[2].region),
                    e(Oe, rl),
                    e(Oe, je),
                    e(je, st),
                    e(st, nl),
                    e(je, il),
                    e(je, Ee),
                    F(Ee, a[2].city),
                    e(C, cl),
                    e(C, xe),
                    e(xe, Tt),
                    e(xe, ul),
                    e(C, dl),
                    e(C, ce),
                    e(ce, Re),
                    e(Re, At),
                    e(At, fl),
                    e(Re, hl),
                    e(Re, fe),
                    e(fe, Ve),
                    e(Ve, _l),
                    e(fe, Ye),
                    e(Ye, ml),
                    e(fe, qe),
                    e(qe, gl),
                    e(fe, Ge),
                    e(Ge, pl),
                    ve(fe, a[11]),
                    e(ce, vl),
                    se && se.m(ce, null),
                    e(ce, Ot),
                    Ae && Ae.m(ce, null),
                    e(ce, Mt),
                    ae && ae.m(ce, null),
                    e(C, bl),
                    oe && oe.m(C, null),
                    e(C, jt),
                    e(C, $e),
                    e($e, Lt),
                    e($e, El),
                    e(C, Il),
                    e(C, at),
                    e(at, ke),
                    e(ke, Qe),
                    e(Qe, St),
                    e(Qe, Cl),
                    Ie.m(Qe, null),
                    a[41](Qe),
                    e(ke, yl),
                    e(ke, we),
                    e(we, Nt),
                    e(we, Bl),
                    Ce.m(we, null),
                    a[43](we),
                    e(ke, kl),
                    e(ke, Te),
                    e(Te, Pt),
                    e(Te, Ql),
                    We[ge].m(Te, null),
                    a[45](Te),
                    e(C, wl),
                    e(C, ot),
                    e(ot, Ke),
                    e(Ke, zt),
                    e(Ke, Tl),
                    e(g, Ll),
                    e(g, rt),
                    a[46](rt),
                    R(m, Rt, J),
                    R(m, Fe, J),
                    e(Fe, et),
                    e(et, nt),
                    e(nt, Sl),
                    a[47](Fe),
                    (Dt = !0),
                    Nl ||
                        ((Rl = [
                            W(Z, "input", a[22]),
                            W(x, "input", a[23]),
                            W(de, "input", a[24]),
                            W(ne, "input", a[25]),
                            W(ie, "input", a[26]),
                            W(_e, "change", a[27]),
                            W(Ee, "input", a[28]),
                            W(fe, "change", a[29]),
                            W(Ke, "click", a[19]),
                        ]),
                        (Nl = !0));
            },
            p(m, J) {
                if (
                    ((!Dt || J[0] & 4) && i !== (i = "App Name | " + m[2].name + " " + m[2].surname) && (document.title = i),
                    J[0] & 4 && Z.value !== m[2].name && F(Z, m[2].name),
                    J[0] & 4 && x.value !== m[2].surname && F(x, m[2].surname),
                    J[0] & 4 && de.value !== m[2].email && F(de, m[2].email),
                    J[0] & 8 && ne.value !== m[3] && F(ne, m[3]),
                    J[0] & 4 && ie.value !== m[2].phone && F(ie, m[2].phone),
                    J & 0)
                ) {
                    it = ps;
                    let K;
                    for (K = 0; K < it.length; K += 1) {
                        const Vt = Is(m, it, K);
                        le[K] ? le[K].p(Vt, J) : ((le[K] = Cs(Vt)), le[K].c(), le[K].m(_e, null));
                    }
                    for (; K < le.length; K += 1) le[K].d(1);
                    le.length = it.length;
                }
                J[0] & 4 && ve(_e, m[2].region),
                    J[0] & 4 && Ee.value !== m[2].city && F(Ee, m[2].city),
                    J[0] & 2048 && ve(fe, m[11]),
                    m[11] === "School" ? (se ? se.p(m, J) : ((se = ys(m)), se.c(), se.m(ce, Ot))) : se && (se.d(1), (se = null)),
                    m[11] === "University" ? (Ae ? Ae.p(m, J) : ((Ae = Bs(m)), Ae.c(), Ae.m(ce, Mt))) : Ae && (Ae.d(1), (Ae = null)),
                    m[11] == "College" ? (ae ? ae.p(m, J) : ((ae = Qs(m)), ae.c(), ae.m(ce, null))) : ae && (ae.d(1), (ae = null)),
                    m[16] != m[2].id ? (oe ? oe.p(m, J) : ((oe = Ts(m)), oe.c(), oe.m(C, jt))) : oe && (oe.d(1), (oe = null)),
                    Yt === (Yt = Yl(m)) && Ie ? Ie.p(m, J) : (Ie.d(1), (Ie = Yt(m)), Ie && (Ie.c(), Ie.m(Qe, null))),
                    qt === (qt = ql(m)) && Ce ? Ce.p(m, J) : (Ce.d(1), (Ce = qt(m)), Ce && (Ce.c(), Ce.m(we, null)));
                let He = ge;
                (ge = Kl(m)),
                    ge === He
                        ? We[ge].p(m, J)
                        : (Os(),
                          Ml(We[He], 1, 1, () => {
                              We[He] = null;
                          }),
                          Hs(),
                          (pe = We[ge]),
                          pe ? pe.p(m, J) : ((pe = We[ge] = Gl[ge](m)), pe.c()),
                          jl(pe, 1),
                          pe.m(Te, null));
            },
            i(m) {
                Dt || (jl(pe), (Dt = !0));
            },
            o(m) {
                Ml(pe), (Dt = !1);
            },
            d(m) {
                A(l),
                    A(t),
                    A(n),
                    m && A(f),
                    m && A(g),
                    Jt(le, m),
                    se && se.d(),
                    Ae && Ae.d(),
                    ae && ae.d(),
                    oe && oe.d(),
                    Ie.d(),
                    a[41](null),
                    Ce.d(),
                    a[43](null),
                    We[ge].d(),
                    a[45](null),
                    a[46](null),
                    m && A(Rt),
                    m && A(Fe),
                    a[47](null),
                    (Nl = !1),
                    sl(Rl);
            },
        }
    );
}
function rA(a, l, t) {
    let i, n, c, f, g;
    Js(a, Ks, (N) => t(49, (g = N))), Gs();
    const B = g.data,
        k = "868612228164-4rrjlhpktkg005qd25qp0f5sa55fuu5j.apps.googleusercontent.com",
        z = "51395235",
        M = "zeyaddevbot";
    let _,
        v = { google: null, tele: null, vk: null },
        d = B.userInfo,
        h = B.real_id,
        y = B.real_permission,
        H = B.API,
        V = d.id,
        L,
        S,
        D,
        C,
        Y,
        U,
        Q = ["default", "teacher", "admin", "super_admin"];
    zs(() => {
        let N = d.institution_type;
        t(11, (i = N ? N.charAt(0).toUpperCase() + d.institution_type.slice(1) : "Choose ...")),
            t(1, (v.google = d.google_id), v),
            t(1, (v.tele = d.telegram_id), v),
            t(1, (v.vk = d.vkontakte_id), v),
            t(14, (n = d.institution_name)),
            t(13, (c = d.institution_course)),
            t(12, (f = d.institution_faculty)),
            t(9, (U = d.permission)),
            (v.google === null || v.google === void 0 || v.google === "") && D.classList.add("disabled"),
            (v.tele === null || v.tele === void 0 || v.tele === "") && Y.classList.add("disabled"),
            (v.vk === null || v.vk === void 0 || v.vk === "") && C.classList.add("disabled"),
            y == "admin" && t(10, (Q = ["default", "teacher"])),
            setTimeout(() => {
                let G = window.VK || {};
                window.google &&
                    (window.google.accounts.id.initialize({
                        client_id: k,
                        allowed_parent_origin: "https://reg.uralsp.ru/",
                        callback: Z,
                    }),
                    window.google.accounts.id.renderButton(L, {})),
                    G &&
                        (G.init({ apiId: z }),
                        G.Widgets.Auth("vk_auth", {
                            async onAuth(O) {
                                if (h != d.id) {
                                    t(
                                        0,
                                        (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong> You can't link social networks for other users! </strong>
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                                        _
                                    );
                                    return;
                                }
                                let be = O.uid,
                                    Pe = O.hash,
                                    ie = O.first_name,
                                    Qt = O.last_name,
                                    ze = { uid: be, first_name: ie, last_name: Qt, hash: Pe };
                                await fetch(`${H}/users/current/link-vkontakte`, {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json",
                                        Authorization: "Bearer " + ee,
                                    },
                                    body: JSON.stringify(ze),
                                })
                                    .then((Ze) => {
                                        Ze.json().then((wt) => {
                                            wt.details === "Success"
                                                ? (t(2, (d.telegram_id = ""), d),
                                                  t(
                                                      0,
                                                      (_.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
													<strong> Success! </strong>
													<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
												</div>`),
                                                      _
                                                  ),
                                                  window.location.reload())
                                                : t(
                                                      0,
                                                      (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
																		<strong> VK account already exists! </strong>
																		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
																	</div>`),
                                                      _
                                                  );
                                        });
                                    })
                                    .catch(() => {
                                        t(
                                            0,
                                            (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
														<strong> VK account should be unique! </strong>
														<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
													</div>`),
                                            _
                                        );
                                    });
                            },
                        }));
            }, 1e3),
            t(5, (S.style.display = "none"), S);
    });
    let I = [
            "1st year undergraduate/specialist",
            "2nd year undergraduate/specialist",
            "3rd year undergraduate/specialist",
            "4th year undergraduate/specialist",
            "5 course specialist",
            "6 (specialty)",
            "1st Master's course",
            "2nd year master's degree",
            "Graduate student",
        ],
        P = ["1 course", "2 course", "3 course", "4 course", "5 course"];
    async function p() {
        t(2, (d.institution_type = i.charAt(0).toLowerCase() + i.slice(1)), d),
            t(2, (d.institution_name = n), d),
            t(2, (d.institution_course = c), d),
            t(2, (d.institution_faculty = f), d),
            t(0, (_.innerHTML = ""), _),
            i != d.institution_type && t(2, (d.institution_type = ""), d);
        let N = {
            name: d.name,
            surname: d.surname,
            email: d.email,
            phone: d.phone,
            city: d.city,
            region: d.region,
            institution_type: d.institution_type == "" ? null : d.institution_type,
            institution_name: d.institution_name,
            institution_course: d.institution_course,
            institution_faculty: d.institution_faculty,
            permission: U,
        };
        h == d.id
            ? await fetch(`${H}/users/current/profile`, {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("access_token"),
                  },
                  body: JSON.stringify(N),
              })
                  .then((G) => {
                      G.status === 200
                          ? (t(
                                0,
                                (_.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
									<strong> Success! </strong>
									<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
								</div>`),
                                _
                            ),
                            window.location.reload())
                          : G.json().then((O) => {
                                t(
                                    0,
                                    (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
									<strong> ${O.detail ? O.detail[0].msg : O.error} </strong>
									<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
								</div>`),
                                    _
                                );
                            });
                  })
                  .catch(() => {
                      t(
                          0,
                          (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
							<strong> Email address already exists! </strong> Please, try again with unique email address!
							<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
						</div>`),
                          _
                      );
                  })
            : ((N.permission = U),
              await fetch(`${H}/users/${d.id}`, {
                  method: "PUT",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: "Bearer " + localStorage.getItem("access_token"),
                  },
                  body: JSON.stringify(N),
              })
                  .then((G) => {
                      G.status === 200
                          ? (t(
                                0,
                                (_.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
									<strong> Success! </strong>
									<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
								</div>`),
                                _
                            ),
                            window.location.reload())
                          : G.json().then((O) => {
                                t(
                                    0,
                                    (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
									<strong> ${O.detail ? O.detail[0].msg : O.error} </strong>
									<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
								</div>`),
                                    _
                                );
                            });
                  })
                  .catch(() => {
                      t(
                          0,
                          (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
							<strong> Email address already exists! </strong> Please, try again with unique email address!
							<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
						</div>`),
                          _
                      );
                  }));
    }
    async function j(N) {
        if (h != d.id) {
            t(
                0,
                (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
					<strong> You can't unlink social networks from other users! </strong>
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>`),
                _
            );
            return;
        }
        let G = 0;
        for (let O in v) v[O] != null && G++;
        if (G == 1) {
            t(
                0,
                (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong> You can't unlink all social networks! </strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`),
                _
            );
            return;
        }
        t(0, (_.innerHTML = ""), _),
            await fetch(`${H}/users/current/unlink-${N}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            }).then((O) => {
                O.json().then((be) => {
                    be.details === "Success"
                        ? (t(2, (d.google_id = ""), d),
                          t(
                              0,
                              (_.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
									<strong> Success! </strong>
									<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
								</div>`),
                              _
                          ),
                          window.location.reload())
                        : t(
                              0,
                              (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
														<strong> Google account already exists! </strong>
														<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
													</div>`),
                              _
                          );
                });
            });
    }
    let ee;
    ee = localStorage.getItem("access_token");
    async function q(N) {
        let G = {
            id: N.detail.id,
            first_name: N.detail.first_name,
            last_name: N.detail.last_name,
            username: N.detail.username,
            photo_url: N.detail.photo_url,
            auth_date: N.detail.auth_date,
            hash: N.detail.hash,
        };
        if (h != d.id) {
            t(
                0,
                (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
					<strong> You can't link social networks fom other users! </strong>
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>`),
                _
            );
            return;
        }
        await fetch(`${H}/users/current/link-telegram`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + ee,
            },
            body: JSON.stringify(G),
        })
            .then((O) => {
                O.json().then((be) => {
                    be.details === "Success"
                        ? (t(2, (d.telegram_id = ""), d),
                          t(
                              0,
                              (_.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong> Success! </strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`),
                              _
                          ),
                          window.location.reload())
                        : t(
                              0,
                              (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong> Telegram account already exists! </strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`),
                              _
                          );
                });
            })
            .catch((O) => {
                t(
                    0,
                    (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong> Telegram account should be unique! </strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`),
                    _
                );
            });
    }
    async function Z(N) {
        let G = N.credential;
        if (h != d.id) {
            t(
                0,
                (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
					<strong> You can't link social networks fom other users! </strong>
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</div>`),
                _
            );
            return;
        }
        let O = { id_token: G };
        await fetch(`${H}/users/current/link-google`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + ee,
            },
            body: JSON.stringify(O),
        })
            .then((be) => {
                be.json().then((Pe) => {
                    Pe.details === "Success"
                        ? (t(2, (d.google_id = ""), d),
                          t(
                              0,
                              (_.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                    <strong> Success! </strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>`),
                              _
                          ),
                          window.location.reload())
                        : t(
                              0,
                              (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                        <strong> Google account already exists! </strong>
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                    </div>`),
                              _
                          );
                });
            })
            .catch((be) => {
                t(
                    0,
                    (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                        <strong> Google account should be unique! </strong>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>`),
                    _
                );
            });
    }
    function re() {
        (d.name = this.value), t(2, d);
    }
    function x() {
        (d.surname = this.value), t(2, d);
    }
    function he() {
        (d.email = this.value), t(2, d);
    }
    function $() {
        (V = this.value), t(3, V);
    }
    function te() {
        (d.phone = this.value), t(2, d);
    }
    function _t() {
        (d.region = ft(this)), t(2, d);
    }
    function mt() {
        (d.city = this.value), t(2, d);
    }
    function de() {
        (i = ft(this)), t(11, i);
    }
    function gt() {
        (n = this.value), t(14, n);
    }
    function Se() {
        (c = ft(this)), t(13, c);
    }
    function pt() {
        (n = this.value), t(14, n);
    }
    function vt() {
        (f = this.value), t(12, f);
    }
    function me() {
        (c = ft(this)), t(13, c);
    }
    function Je() {
        (n = this.value), t(14, n);
    }
    function bt() {
        (f = this.value), t(12, f);
    }
    function Et() {
        (c = ft(this)), t(13, c);
    }
    function ne() {
        (U = ft(this)), t(9, U), t(10, Q);
    }
    function It(N) {
        tt[N ? "unshift" : "push"](() => {
            (L = N), t(4, L);
        });
    }
    const Ne = () => j("google");
    function Ct(N) {
        tt[N ? "unshift" : "push"](() => {
            (D = N), t(6, D);
        });
    }
    const yt = () => j("vkontakte");
    function ye(N) {
        tt[N ? "unshift" : "push"](() => {
            (C = N), t(7, C);
        });
    }
    const Ue = () => j("telegram");
    function Bt(N) {
        tt[N ? "unshift" : "push"](() => {
            (Y = N), t(8, Y);
        });
    }
    function kt(N) {
        tt[N ? "unshift" : "push"](() => {
            (_ = N), t(0, _);
        });
    }
    function Be(N) {
        tt[N ? "unshift" : "push"](() => {
            (S = N), t(5, S);
        });
    }
    return (
        t(11, (i = "")),
        t(14, (n = "")),
        t(13, (c = "")),
        t(12, (f = "")),
        [_, v, d, V, L, S, D, C, Y, U, Q, i, f, c, n, M, h, I, P, p, j, q, re, x, he, $, te, _t, mt, de, gt, Se, pt, vt, me, Je, bt, Et, ne, It, Ne, Ct, yt, ye, Ue, Bt, kt, Be]
    );
}
class fA extends Ss {
    constructor(l) {
        super(), Ns(this, l, rA, oA, Ps, {}, null, [-1, -1, -1]);
    }
}
export { fA as default };
