import {
    S as Na,
    i as Sa,
    s as Aa,
    k as r,
    a as v,
    q as E,
    D as Pa,
    l as n,
    m as i,
    h as o,
    c as m,
    r as k,
    E as Ql,
    n as s,
    U as ca,
    M as Ll,
    T as ss,
    p as ot,
    B as e,
    b as ae,
    N as Ht,
    O as Ze,
    P as Z,
    u as Tt,
    A as At,
    Q as Kt,
    R as Xl,
    I as Oa,
    o as Va,
    J as Ua,
    K as Zt,
    L as Tl,
    e as gs,
} from "../../../../chunks/index-af757d0f.js";
import { b as Wl } from "../../../../chunks/paths-9678c1af.js";
import { p as ja } from "../../../../chunks/stores-0b118143.js";
import { u as Cs, w as Ba } from "../../../../chunks/xlsx-84570272.js";
import { s as Ha } from "../../../../chunks/logo-ed4c505e.js";
import { t as Ra } from "../../../../chunks/temp-photo-9fe1d42c.js";
import { d as Ma } from "../../../../chunks/dots-63d78b83.js";
import { r as ua } from "../../../../chunks/republics-74048aea.js";
import { s as qa } from "../../../../chunks/sessionDuration-e379fb60.js";
const Ya = "" + new URL("../../../../assets/lottie-search-7327e10f.json", import.meta.url).href,
    Fa = "" + new URL("../../../../assets/lottie-select-12673578.gif", import.meta.url).href;
const { document: ms } = Ua;
function Ja(l, t, a) {
    const c = l.slice();
    return (c[112] = t[a]), c;
}
function da(l, t, a) {
    const c = l.slice();
    return (c[115] = t[a]), (c[112] = a), c;
}
function fa(l, t, a) {
    const c = l.slice();
    return (c[117] = t[a]), (c[118] = t), (c[112] = a), c;
}
function za(l, t, a) {
    const c = l.slice();
    return (c[112] = t[a]), c;
}
function ha(l, t, a) {
    const c = l.slice();
    return (c[115] = t[a]), (c[112] = a), c;
}
function _a(l, t, a) {
    const c = l.slice();
    return (c[122] = t[a]), (c[123] = t), (c[112] = a), c;
}
function pa(l, t, a) {
    const c = l.slice();
    return (c[124] = t[a]), c;
}
function va(l, t, a) {
    const c = l.slice();
    return (c[124] = t[a]), c;
}
function Ga(l, t, a) {
    const c = l.slice();
    return (c[115] = t[a]), (c[112] = a), c;
}
function ma(l, t, a) {
    const c = l.slice();
    return (c[130] = t[a]), c;
}
function Za(l, t, a) {
    const c = l.slice();
    return (c[38] = t[a]), c;
}
function ga(l) {
    let t, a, c, u, f;
    return {
        c() {
            (t = r("li")), (a = r("span")), (c = E("Create Competitions")), this.h();
        },
        l(_) {
            t = n(_, "LI", { class: !0 });
            var p = i(t);
            a = n(p, "SPAN", { class: !0 });
            var C = i(a);
            (c = k(C, "Create Competitions")), C.forEach(o), p.forEach(o), this.h();
        },
        h() {
            s(a, "class", "nav-link"), ot(a, "color", "rgba(0,0,0,.55)", !1), s(t, "class", "nav-item svelte-1xk55ym");
        },
        m(_, p) {
            ae(_, t, p), e(t, a), e(a, c), u || ((f = Z(t, "click", l[64])), (u = !0));
        },
        p: At,
        d(_) {
            _ && o(t), (u = !1), f();
        },
    };
}
function Ka(l) {
    let t, a;
    return {
        c() {
            (t = r("option")), (a = E(l[38])), this.h();
        },
        l(c) {
            t = n(c, "OPTION", {});
            var u = i(t);
            (a = k(u, l[38])), u.forEach(o), this.h();
        },
        h() {
            (t.__value = l[38]), (t.value = t.__value);
        },
        m(c, u) {
            ae(c, t, u), e(t, a);
        },
        p: At,
        d(c) {
            c && o(t);
        },
    };
}
function ba(l) {
    let t,
        a = l[130] + "",
        c;
    return {
        c() {
            (t = r("option")), (c = E(a)), this.h();
        },
        l(u) {
            t = n(u, "OPTION", {});
            var f = i(t);
            (c = k(f, a)), f.forEach(o), this.h();
        },
        h() {
            (t.__value = l[130]), (t.value = t.__value);
        },
        m(u, f) {
            ae(u, t, f), e(t, c);
        },
        p: At,
        d(u) {
            u && o(t);
        },
    };
}
function Ea(l) {
    let t,
        a,
        c,
        u,
        f,
        _,
        p,
        C,
        b,
        P,
        j,
        q,
        I,
        T,
        V,
        U,
        R,
        Y = Array(11),
        D = [];
    for (let g = 0; g < Y.length; g += 1) D[g] = Qa(Ga(l, Y, g));
    return {
        c() {
            (t = r("div")),
                (a = r("div")),
                (c = r("div")),
                (u = r("label")),
                (f = E("School Name")),
                (_ = v()),
                (p = r("input")),
                (C = v()),
                (b = r("div")),
                (P = r("label")),
                (j = E("School Year")),
                (q = v()),
                (I = r("select")),
                (T = r("option")),
                (V = E("Choose..."));
            for (let g = 0; g < D.length; g += 1) D[g].c();
            this.h();
        },
        l(g) {
            t = n(g, "DIV", { class: !0 });
            var L = i(t);
            a = n(L, "DIV", { class: !0 });
            var y = i(a);
            c = n(y, "DIV", { class: !0 });
            var H = i(c);
            u = n(H, "LABEL", { for: !0 });
            var ee = i(u);
            (f = k(ee, "School Name")), ee.forEach(o), (_ = m(H)), (p = n(H, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), H.forEach(o), (C = m(y)), (b = n(y, "DIV", { class: !0 }));
            var J = i(b);
            P = n(J, "LABEL", { for: !0 });
            var x = i(P);
            (j = k(x, "School Year")), x.forEach(o), (q = m(J)), (I = n(J, "SELECT", { class: !0, "aria-label": !0 }));
            var K = i(I);
            T = n(K, "OPTION", {});
            var $ = i(T);
            (V = k($, "Choose...")), $.forEach(o);
            for (let B = 0; B < D.length; B += 1) D[B].l(K);
            K.forEach(o), J.forEach(o), y.forEach(o), L.forEach(o), this.h();
        },
        h() {
            s(u, "for", "school"),
                s(p, "type", "text"),
                s(p, "class", "form-control svelte-1xk55ym"),
                s(p, "id", "school"),
                s(p, "placeholder", "Enter your school name"),
                s(c, "class", "form-group col-md-8 svelte-1xk55ym"),
                s(P, "for", "schoolYear"),
                (T.selected = !0),
                (T.__value = "Choose..."),
                (T.value = T.__value),
                s(I, "class", "form-select form-select svelte-1xk55ym"),
                s(I, "aria-label", "Default select example"),
                l[14] === void 0 && Ll(() => l[72].call(I)),
                s(b, "class", "form-group col-md-4 svelte-1xk55ym"),
                s(a, "class", "row"),
                s(t, "class", "d-flex justify-content-between p-0");
        },
        m(g, L) {
            ae(g, t, L), e(t, a), e(a, c), e(c, u), e(u, f), e(c, _), e(c, p), Ht(p, l[13]), e(a, C), e(a, b), e(b, P), e(P, j), e(b, q), e(b, I), e(I, T), e(T, V);
            for (let y = 0; y < D.length; y += 1) D[y].m(I, null);
            Ze(I, l[14]), U || ((R = [Z(p, "input", l[71]), Z(I, "change", l[72])]), (U = !0));
        },
        p(g, L) {
            L[0] & 8192 && p.value !== g[13] && Ht(p, g[13]), L[0] & 16384 && Ze(I, g[14]);
        },
        d(g) {
            g && o(t), Kt(D, g), (U = !1), Xl(R);
        },
    };
}
function Qa(l) {
    let t,
        a = l[112] + 1 + "",
        c;
    return {
        c() {
            (t = r("option")), (c = E(a)), this.h();
        },
        l(u) {
            t = n(u, "OPTION", {});
            var f = i(t);
            (c = k(f, a)), f.forEach(o), this.h();
        },
        h() {
            (t.__value = l[112] + 1), (t.value = t.__value);
        },
        m(u, f) {
            ae(u, t, f), e(t, c);
        },
        p: At,
        d(u) {
            u && o(t);
        },
    };
}
function ka(l) {
    let t,
        a,
        c,
        u,
        f,
        _,
        p,
        C,
        b,
        P,
        j,
        q,
        I,
        T,
        V,
        U,
        R,
        Y = l[39],
        D = [];
    for (let g = 0; g < Y.length; g += 1) D[g] = ya(va(l, Y, g));
    return {
        c() {
            (t = r("div")),
                (a = r("div")),
                (c = r("div")),
                (u = r("label")),
                (f = E("Institute Name")),
                (_ = v()),
                (p = r("input")),
                (C = v()),
                (b = r("div")),
                (P = r("label")),
                (j = E("Institute Year")),
                (q = v()),
                (I = r("select")),
                (T = r("option")),
                (V = E("Choose..."));
            for (let g = 0; g < D.length; g += 1) D[g].c();
            this.h();
        },
        l(g) {
            t = n(g, "DIV", { class: !0 });
            var L = i(t);
            a = n(L, "DIV", { class: !0 });
            var y = i(a);
            c = n(y, "DIV", { class: !0 });
            var H = i(c);
            u = n(H, "LABEL", { for: !0 });
            var ee = i(u);
            (f = k(ee, "Institute Name")), ee.forEach(o), (_ = m(H)), (p = n(H, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), H.forEach(o), (C = m(y)), (b = n(y, "DIV", { class: !0 }));
            var J = i(b);
            P = n(J, "LABEL", { for: !0 });
            var x = i(P);
            (j = k(x, "Institute Year")), x.forEach(o), (q = m(J)), (I = n(J, "SELECT", { class: !0, "aria-label": !0 }));
            var K = i(I);
            T = n(K, "OPTION", {});
            var $ = i(T);
            (V = k($, "Choose...")), $.forEach(o);
            for (let B = 0; B < D.length; B += 1) D[B].l(K);
            K.forEach(o), J.forEach(o), y.forEach(o), L.forEach(o), this.h();
        },
        h() {
            s(u, "for", "Institute"),
                s(p, "type", "text"),
                s(p, "class", "form-control svelte-1xk55ym"),
                s(p, "id", "Institute"),
                s(p, "placeholder", "Enter your Institute name"),
                s(c, "class", "form-group col-md-8 svelte-1xk55ym"),
                s(P, "for", "Institute Year"),
                (T.selected = !0),
                (T.__value = "Choose..."),
                (T.value = T.__value),
                s(I, "class", "form-select form-select svelte-1xk55ym"),
                s(I, "aria-label", "Default select example"),
                l[14] === void 0 && Ll(() => l[74].call(I)),
                s(b, "class", "form-group col-md-4 svelte-1xk55ym"),
                s(a, "class", "row"),
                s(t, "class", "d-flex justify-content-between p-0");
        },
        m(g, L) {
            ae(g, t, L), e(t, a), e(a, c), e(c, u), e(u, f), e(c, _), e(c, p), Ht(p, l[13]), e(a, C), e(a, b), e(b, P), e(P, j), e(b, q), e(b, I), e(I, T), e(T, V);
            for (let y = 0; y < D.length; y += 1) D[y].m(I, null);
            Ze(I, l[14]), U || ((R = [Z(p, "input", l[73]), Z(I, "change", l[74])]), (U = !0));
        },
        p(g, L) {
            if ((L[0] & 8192 && p.value !== g[13] && Ht(p, g[13]), L[1] & 256)) {
                Y = g[39];
                let y;
                for (y = 0; y < Y.length; y += 1) {
                    const H = va(g, Y, y);
                    D[y] ? D[y].p(H, L) : ((D[y] = ya(H)), D[y].c(), D[y].m(I, null));
                }
                for (; y < D.length; y += 1) D[y].d(1);
                D.length = Y.length;
            }
            L[0] & 16384 && Ze(I, g[14]);
        },
        d(g) {
            g && o(t), Kt(D, g), (U = !1), Xl(R);
        },
    };
}
function ya(l) {
    let t,
        a = l[124] + "",
        c;
    return {
        c() {
            (t = r("option")), (c = E(a)), this.h();
        },
        l(u) {
            t = n(u, "OPTION", {});
            var f = i(t);
            (c = k(f, a)), f.forEach(o), this.h();
        },
        h() {
            (t.__value = l[124]), (t.value = t.__value);
        },
        m(u, f) {
            ae(u, t, f), e(t, c);
        },
        p: At,
        d(u) {
            u && o(t);
        },
    };
}
function Ia(l) {
    let t,
        a,
        c,
        u,
        f,
        _,
        p,
        C,
        b,
        P,
        j,
        q,
        I,
        T,
        V,
        U,
        R,
        Y = l[46],
        D = [];
    for (let g = 0; g < Y.length; g += 1) D[g] = Ta(pa(l, Y, g));
    return {
        c() {
            (t = r("div")),
                (a = r("div")),
                (c = r("div")),
                (u = r("label")),
                (f = E("College Name")),
                (_ = v()),
                (p = r("input")),
                (C = v()),
                (b = r("div")),
                (P = r("label")),
                (j = E("College Year")),
                (q = v()),
                (I = r("select")),
                (T = r("option")),
                (V = E("Choose..."));
            for (let g = 0; g < D.length; g += 1) D[g].c();
            this.h();
        },
        l(g) {
            t = n(g, "DIV", { class: !0 });
            var L = i(t);
            a = n(L, "DIV", { class: !0 });
            var y = i(a);
            c = n(y, "DIV", { class: !0 });
            var H = i(c);
            u = n(H, "LABEL", { for: !0 });
            var ee = i(u);
            (f = k(ee, "College Name")), ee.forEach(o), (_ = m(H)), (p = n(H, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), H.forEach(o), (C = m(y)), (b = n(y, "DIV", { class: !0 }));
            var J = i(b);
            P = n(J, "LABEL", { for: !0 });
            var x = i(P);
            (j = k(x, "College Year")), x.forEach(o), (q = m(J)), (I = n(J, "SELECT", { class: !0, "aria-label": !0 }));
            var K = i(I);
            T = n(K, "OPTION", {});
            var $ = i(T);
            (V = k($, "Choose...")), $.forEach(o);
            for (let B = 0; B < D.length; B += 1) D[B].l(K);
            K.forEach(o), J.forEach(o), y.forEach(o), L.forEach(o), this.h();
        },
        h() {
            s(u, "for", "College"),
                s(p, "type", "text"),
                s(p, "class", "form-control svelte-1xk55ym"),
                s(p, "id", "College"),
                s(p, "placeholder", "Enter your College name"),
                s(c, "class", "form-group col-md-8 svelte-1xk55ym"),
                s(P, "for", "College Year"),
                (T.selected = !0),
                (T.__value = "Choose..."),
                (T.value = T.__value),
                s(I, "class", "form-select form-select svelte-1xk55ym"),
                s(I, "aria-label", "Default select example"),
                l[14] === void 0 && Ll(() => l[76].call(I)),
                s(b, "class", "form-group col-md-4 svelte-1xk55ym"),
                s(a, "class", "row"),
                s(t, "class", "d-flex justify-content-between p-0");
        },
        m(g, L) {
            ae(g, t, L), e(t, a), e(a, c), e(c, u), e(u, f), e(c, _), e(c, p), Ht(p, l[13]), e(a, C), e(a, b), e(b, P), e(P, j), e(b, q), e(b, I), e(I, T), e(T, V);
            for (let y = 0; y < D.length; y += 1) D[y].m(I, null);
            Ze(I, l[14]), U || ((R = [Z(p, "input", l[75]), Z(I, "change", l[76])]), (U = !0));
        },
        p(g, L) {
            if ((L[0] & 8192 && p.value !== g[13] && Ht(p, g[13]), L[1] & 32768)) {
                Y = g[46];
                let y;
                for (y = 0; y < Y.length; y += 1) {
                    const H = pa(g, Y, y);
                    D[y] ? D[y].p(H, L) : ((D[y] = Ta(H)), D[y].c(), D[y].m(I, null));
                }
                for (; y < D.length; y += 1) D[y].d(1);
                D.length = Y.length;
            }
            L[0] & 16384 && Ze(I, g[14]);
        },
        d(g) {
            g && o(t), Kt(D, g), (U = !1), Xl(R);
        },
    };
}
function Ta(l) {
    let t,
        a = l[124] + "",
        c;
    return {
        c() {
            (t = r("option")), (c = E(a)), this.h();
        },
        l(u) {
            t = n(u, "OPTION", {});
            var f = i(t);
            (c = k(f, a)), f.forEach(o), this.h();
        },
        h() {
            (t.__value = l[124]), (t.value = t.__value);
        },
        m(u, f) {
            ae(u, t, f), e(t, c);
        },
        p: At,
        d(u) {
            u && o(t);
        },
    };
}
function Wa(l) {
    let t, a, c;
    return {
        c() {
            (t = r("div")),
                (a = r("span")),
                (c = E(`\r
									No competitions found, If you think that this is an error, please refresh the page.`)),
                this.h();
        },
        l(u) {
            t = n(u, "DIV", { class: !0, role: !0 });
            var f = i(t);
            (a = n(f, "SPAN", { class: !0 })),
                i(a).forEach(o),
                (c = k(
                    f,
                    `\r
									No competitions found, If you think that this is an error, please refresh the page.`
                )),
                f.forEach(o),
                this.h();
        },
        h() {
            s(a, "class", "fa fa-exclamation-triangle svelte-1xk55ym"), s(t, "class", "alert alert-warning"), s(t, "role", "alert");
        },
        m(u, f) {
            ae(u, t, f), e(t, a), e(t, c);
        },
        p: At,
        d(u) {
            u && o(t);
        },
    };
}
function Xa(l) {
    let t,
        a = l[34],
        c = [];
    for (let u = 0; u < a.length; u += 1) c[u] = La(_a(l, a, u));
    return {
        c() {
            for (let u = 0; u < c.length; u += 1) c[u].c();
            t = gs();
        },
        l(u) {
            for (let f = 0; f < c.length; f += 1) c[f].l(u);
            t = gs();
        },
        m(u, f) {
            for (let _ = 0; _ < c.length; _ += 1) c[_].m(u, f);
            ae(u, t, f);
        },
        p(u, f) {
            if ((f[0] & 128) | (f[1] & 65544)) {
                a = u[34];
                let _;
                for (_ = 0; _ < a.length; _ += 1) {
                    const p = _a(u, a, _);
                    c[_] ? c[_].p(p, f) : ((c[_] = La(p)), c[_].c(), c[_].m(t.parentNode, t));
                }
                for (; _ < c.length; _ += 1) c[_].d(1);
                c.length = a.length;
            }
        },
        d(u) {
            Kt(c, u), u && o(t);
        },
    };
}
function xa(l) {
    let t,
        a,
        c = l[122].name + "",
        u,
        f,
        _,
        p,
        C,
        b = l[112],
        P,
        j;
    function q() {
        return l[83](l[122]);
    }
    const I = () => l[84](t, b),
        T = () => l[84](null, b);
    return {
        c() {
            (t = r("div")), (a = r("span")), (u = E(c)), (f = v()), (_ = r("i")), (C = v()), this.h();
        },
        l(V) {
            t = n(V, "DIV", { class: !0 });
            var U = i(t);
            a = n(U, "SPAN", { class: !0 });
            var R = i(a);
            (u = k(R, c)), R.forEach(o), (f = m(U)), (_ = n(U, "I", { class: !0, id: !0, style: !0 })), i(_).forEach(o), (C = m(U)), U.forEach(o), this.h();
        },
        h() {
            s(a, "class", "d-inline"),
                s(_, "class", "fa fa-edit m-1 svelte-1xk55ym"),
                s(_, "id", (p = l[122].id + "")),
                ot(_, "cursor", "pointer"),
                ot(_, "color", "#3490dc"),
                s(t, "class", "comp hide d-flex flex-row align-items-stretch justify-content-between svelte-1xk55ym");
        },
        m(V, U) {
            ae(V, t, U), e(t, a), e(a, u), e(t, f), e(t, _), e(t, C), I(), P || ((j = Z(_, "click", q)), (P = !0));
        },
        p(V, U) {
            (l = V), U[1] & 8 && c !== (c = l[122].name + "") && Tt(u, c), U[1] & 8 && p !== (p = l[122].id + "") && s(_, "id", p), b !== l[112] && (T(), (b = l[112]), I());
        },
        d(V) {
            V && o(t), T(), (P = !1), j();
        },
    };
}
function $a(l) {
    let t,
        a,
        c = l[122].name + "",
        u,
        f,
        _,
        p,
        C,
        b = l[112],
        P,
        j;
    function q() {
        return l[81](l[122]);
    }
    const I = () => l[82](t, b),
        T = () => l[82](null, b);
    return {
        c() {
            (t = r("div")), (a = r("span")), (u = E(c)), (f = v()), (_ = r("i")), (C = v()), this.h();
        },
        l(V) {
            t = n(V, "DIV", { class: !0 });
            var U = i(t);
            a = n(U, "SPAN", { class: !0 });
            var R = i(a);
            (u = k(R, c)), R.forEach(o), (f = m(U)), (_ = n(U, "I", { class: !0, id: !0, style: !0 })), i(_).forEach(o), (C = m(U)), U.forEach(o), this.h();
        },
        h() {
            s(a, "class", "d-inline"),
                s(_, "class", "fa fa-edit m-1 svelte-1xk55ym"),
                s(_, "id", (p = l[122].id + "")),
                ot(_, "cursor", "pointer"),
                ot(_, "color", "#3490dc"),
                s(t, "class", "comp even hide d-flex flex-row align-items-stretch justify-content-between svelte-1xk55ym");
        },
        m(V, U) {
            ae(V, t, U), e(t, a), e(a, u), e(t, f), e(t, _), e(t, C), I(), P || ((j = Z(_, "click", q)), (P = !0));
        },
        p(V, U) {
            (l = V), U[1] & 8 && c !== (c = l[122].name + "") && Tt(u, c), U[1] & 8 && p !== (p = l[122].id + "") && s(_, "id", p), b !== l[112] && (T(), (b = l[112]), I());
        },
        d(V) {
            V && o(t), T(), (P = !1), j();
        },
    };
}
function La(l) {
    let t;
    function a(f, _) {
        return f[112] % 2 == 0 ? $a : xa;
    }
    let u = a(l)(l);
    return {
        c() {
            u.c(), (t = gs());
        },
        l(f) {
            u.l(f), (t = gs());
        },
        m(f, _) {
            u.m(f, _), ae(f, t, _);
        },
        p(f, _) {
            u.p(f, _);
        },
        d(f) {
            u.d(f), f && o(t);
        },
    };
}
function Ca(l) {
    let t,
        a = l[112] + 1 + "",
        c,
        u,
        f;
    function _() {
        return l[85](l[112]);
    }
    return {
        c() {
            (t = r("li")), (c = E(a)), this.h();
        },
        l(p) {
            t = n(p, "LI", { class: !0 });
            var C = i(t);
            (c = k(C, a)), C.forEach(o), this.h();
        },
        h() {
            s(t, "class", "page-item page-link svelte-1xk55ym");
        },
        m(p, C) {
            ae(p, t, C), e(t, c), u || ((f = Z(t, "click", _)), (u = !0));
        },
        p(p, C) {
            l = p;
        },
        d(p) {
            p && o(t), (u = !1), f();
        },
    };
}
function eo(l) {
    let t, a;
    return {
        c() {
            (t = r("option")), (a = E(l[112])), this.h();
        },
        l(c) {
            t = n(c, "OPTION", { class: !0 });
            var u = i(t);
            (a = k(u, l[112])), u.forEach(o), this.h();
        },
        h() {
            s(t, "class", "dropdown-item svelte-1xk55ym"), (t.__value = l[112]), (t.value = t.__value);
        },
        m(c, u) {
            ae(c, t, u), e(t, a);
        },
        p: At,
        d(c) {
            c && o(t);
        },
    };
}
function to(l) {
    let t,
        a,
        c,
        u,
        f,
        _,
        p,
        C,
        b,
        P,
        j,
        q,
        I,
        T,
        V,
        U,
        R,
        Y,
        D,
        g,
        L,
        y,
        H,
        ee,
        J,
        x,
        K,
        $,
        B,
        Pe,
        ue,
        ge,
        be,
        Ke,
        _t,
        pe,
        Xe,
        Ie,
        z,
        Ee,
        oe,
        ke,
        de,
        Oe,
        Q,
        pt,
        Ve,
        Te,
        Qe,
        ve,
        Lt,
        rt,
        Ue,
        xe,
        nt,
        it,
        te,
        le,
        Le,
        Qt,
        ct,
        vt,
        se,
        Rt,
        ol,
        je,
        ut,
        dt,
        re,
        Pt,
        Mt,
        We,
        rl,
        $e,
        et,
        Wt,
        nl,
        Je,
        ce,
        Ot,
        tt,
        lt,
        fe,
        Ct,
        il,
        Be,
        He,
        cl,
        ul,
        ne,
        mt,
        Vt,
        Dt,
        dl,
        Ce,
        Re,
        fl,
        gt,
        Ut,
        bt,
        Et,
        ze,
        hl,
        _l,
        ft,
        Xt,
        pl,
        st,
        kt,
        wt,
        jt,
        d,
        N,
        S,
        A,
        W,
        Nt,
        xt,
        X,
        vl,
        Me,
        St,
        ql;
    function qt(w, F) {
        return w[25].length == 0 ? ao : so;
    }
    let Cl = qt(l),
        De = Cl(l),
        $t = l[22],
        ie = [];
    for (let w = 0; w < $t.length; w += 1) ie[w] = Da(fa(l, $t, w));
    let el = Array(Math.ceil(l[22].length / l[35]) === 0 ? 1 : Math.ceil(l[22].length / l[35])),
        we = [];
    for (let w = 0; w < el.length; w += 1) we[w] = wa(da(l, el, w));
    let ml = [5, 10, 15, 20, 25, 50],
        gl = [];
    for (let w = 0; w < 6; w += 1) gl[w] = oo(Ja(l, ml, w));
    return {
        c() {
            (t = r("div")),
                (a = r("div")),
                (c = r("span")),
                (u = E(`\r
								Information`)),
                (f = v()),
                (_ = r("div")),
                (p = r("div")),
                (C = r("table")),
                (b = r("tbody")),
                (P = r("tr")),
                (j = r("th")),
                (q = E("ID")),
                (I = v()),
                (T = r("td")),
                (V = E(l[33])),
                (U = v()),
                (R = r("tr")),
                (Y = r("th")),
                (D = E("Title")),
                (g = v()),
                (L = r("td")),
                (y = E(l[32])),
                (H = v()),
                (ee = r("tr")),
                (J = r("th")),
                (x = E("Registration time")),
                (K = v()),
                ($ = r("td")),
                (B = E("From ")),
                (Pe = E(l[31])),
                (ue = v()),
                (ge = r("br")),
                (be = E(`\r
													To `)),
                (Ke = E(l[30])),
                (_t = v()),
                (pe = r("tr")),
                (Xe = r("th")),
                (Ie = E("Start")),
                (z = v()),
                (Ee = r("td")),
                (oe = E(l[29])),
                (ke = v()),
                (de = r("tr")),
                (Oe = r("th")),
                (Q = E("Registration link")),
                (pt = v()),
                (Ve = r("td")),
                (Te = r("a")),
                (Qe = E("Link")),
                (ve = v()),
                (Lt = r("tr")),
                (rt = r("th")),
                (Ue = E("Contestants per team")),
                (xe = v()),
                (nt = r("td")),
                (it = E(l[27])),
                (te = v()),
                (le = r("tr")),
                (Le = r("th")),
                (Qt = E("Monitors' IDs")),
                (ct = v()),
                De.c(),
                (vt = v()),
                (se = r("div")),
                (Rt = r("span")),
                (ol = E(`\r
								Form`)),
                (je = v()),
                (ut = r("div")),
                (dt = v()),
                (re = r("div")),
                (Pt = r("div")),
                (Mt = r("span")),
                (We = E(`\r
									Applications`)),
                (rl = v()),
                ($e = r("div")),
                (et = r("span")),
                (Wt = E(l[24])),
                (nl = E(" available")),
                (Je = v()),
                (ce = r("div")),
                (Ot = r("div")),
                (tt = r("table")),
                (lt = r("thead")),
                (fe = r("tr")),
                (Ct = r("th")),
                (il = E("#")),
                (Be = v()),
                (He = r("th")),
                (cl = E("Id")),
                (ul = v()),
                (ne = r("th")),
                (mt = E("Status")),
                (Vt = v()),
                (Dt = r("th")),
                (dl = E("\u2116 of participants")),
                (Ce = v()),
                (Re = r("th")),
                (fl = E("Actions")),
                (gt = v()),
                (Ut = r("tbody"));
            for (let w = 0; w < ie.length; w += 1) ie[w].c();
            (bt = v()),
                (Et = r("div")),
                (ze = r("i")),
                (hl = E(">> Print selected as xlsx")),
                (_l = v()),
                (ft = r("i")),
                (Xt = E(">> Select all")),
                (pl = v()),
                (st = r("div")),
                (kt = r("div")),
                (wt = r("ul"));
            for (let w = 0; w < we.length; w += 1) we[w].c();
            (jt = v()), (d = r("select"));
            for (let w = 0; w < 6; w += 1) gl[w].c();
            (N = v()), (S = r("div")), (A = r("button")), (W = r("i")), (Nt = E(" Edit")), (xt = v()), (X = r("button")), (vl = r("i")), (Me = E(" Delete")), this.h();
        },
        l(w) {
            t = n(w, "DIV", { class: !0, style: !0 });
            var F = i(t);
            a = n(F, "DIV", {
                class: !0,
                "data-bs-toggle": !0,
                href: !0,
                role: !0,
                "aria-expanded": !0,
                "aria-controls": !0,
            });
            var O = i(a);
            (c = n(O, "SPAN", { class: !0 })),
                i(c).forEach(o),
                (u = k(
                    O,
                    `\r
								Information`
                )),
                O.forEach(o),
                (f = m(F)),
                (_ = n(F, "DIV", { class: !0, id: !0 }));
            var ye = i(_);
            p = n(ye, "DIV", { class: !0 });
            var Yt = i(p);
            C = n(Yt, "TABLE", { class: !0 });
            var Dl = i(C);
            b = n(Dl, "TBODY", {});
            var Ge = i(b);
            P = n(Ge, "TR", {});
            var wl = i(P);
            j = n(wl, "TH", { scope: !0, class: !0 });
            var tl = i(j);
            (q = k(tl, "ID")), tl.forEach(o), (I = m(wl)), (T = n(wl, "TD", {}));
            var Yl = i(T);
            (V = k(Yl, l[33])), Yl.forEach(o), wl.forEach(o), (U = m(Ge)), (R = n(Ge, "TR", {}));
            var Ft = i(R);
            Y = n(Ft, "TH", { class: !0 });
            var Jt = i(Y);
            (D = k(Jt, "Title")), Jt.forEach(o), (g = m(Ft)), (L = n(Ft, "TD", {}));
            var ll = i(L);
            (y = k(ll, l[32])), ll.forEach(o), Ft.forEach(o), (H = m(Ge)), (ee = n(Ge, "TR", {}));
            var Nl = i(ee);
            J = n(Nl, "TH", { class: !0 });
            var yt = i(J);
            (x = k(yt, "Registration time")), yt.forEach(o), (K = m(Nl)), ($ = n(Nl, "TD", {}));
            var zt = i($);
            (B = k(zt, "From ")),
                (Pe = k(zt, l[31])),
                (ue = m(zt)),
                (ge = n(zt, "BR", {})),
                (be = k(
                    zt,
                    `\r
													To `
                )),
                (Ke = k(zt, l[30])),
                zt.forEach(o),
                Nl.forEach(o),
                (_t = m(Ge)),
                (pe = n(Ge, "TR", {}));
            var Sl = i(pe);
            Xe = n(Sl, "TH", { class: !0 });
            var bl = i(Xe);
            (Ie = k(bl, "Start")), bl.forEach(o), (z = m(Sl)), (Ee = n(Sl, "TD", {}));
            var Fl = i(Ee);
            (oe = k(Fl, l[29])), Fl.forEach(o), Sl.forEach(o), (ke = m(Ge)), (de = n(Ge, "TR", {}));
            var Al = i(de);
            Oe = n(Al, "TH", { class: !0 });
            var El = i(Oe);
            (Q = k(El, "Registration link")), El.forEach(o), (pt = m(Al)), (Ve = n(Al, "TD", {}));
            var jl = i(Ve);
            Te = n(jl, "A", { href: !0 });
            var Gt = i(Te);
            (Qe = k(Gt, "Link")), Gt.forEach(o), jl.forEach(o), Al.forEach(o), (ve = m(Ge)), (Lt = n(Ge, "TR", {}));
            var Bt = i(Lt);
            rt = n(Bt, "TH", { class: !0 });
            var kl = i(rt);
            (Ue = k(kl, "Contestants per team")), kl.forEach(o), (xe = m(Bt)), (nt = n(Bt, "TD", {}));
            var Jl = i(nt);
            (it = k(Jl, l[27])), Jl.forEach(o), Bt.forEach(o), (te = m(Ge)), (le = n(Ge, "TR", {}));
            var Pl = i(le);
            Le = n(Pl, "TH", { class: !0 });
            var xl = i(Le);
            (Qt = k(xl, "Monitors' IDs")),
                xl.forEach(o),
                (ct = m(Pl)),
                De.l(Pl),
                Pl.forEach(o),
                Ge.forEach(o),
                Dl.forEach(o),
                Yt.forEach(o),
                ye.forEach(o),
                (vt = m(F)),
                (se = n(F, "DIV", {
                    class: !0,
                    "data-bs-toggle": !0,
                    href: !0,
                    role: !0,
                    "aria-expanded": !0,
                    "aria-controls": !0,
                }));
            var Ne = i(se);
            (Rt = n(Ne, "SPAN", { class: !0 })),
                i(Rt).forEach(o),
                (ol = k(
                    Ne,
                    `\r
								Form`
                )),
                Ne.forEach(o),
                (je = m(F)),
                (ut = n(F, "DIV", { class: !0, id: !0 }));
            var bs = i(ut);
            bs.forEach(o),
                (dt = m(F)),
                (re = n(F, "DIV", {
                    class: !0,
                    "data-bs-toggle": !0,
                    href: !0,
                    role: !0,
                    "aria-expanded": !0,
                    "aria-controls": !0,
                }));
            var sl = i(re);
            Pt = n(sl, "DIV", {});
            var al = i(Pt);
            (Mt = n(al, "SPAN", { class: !0 })),
                i(Mt).forEach(o),
                (We = k(
                    al,
                    `\r
									Applications`
                )),
                al.forEach(o),
                (rl = m(sl)),
                ($e = n(sl, "DIV", {}));
            var qe = i($e);
            et = n(qe, "SPAN", { class: !0 });
            var Se = i(et);
            (Wt = k(Se, l[24])), (nl = k(Se, " available")), Se.forEach(o), qe.forEach(o), sl.forEach(o), (Je = m(F)), (ce = n(F, "DIV", { class: !0, id: !0 }));
            var he = i(ce);
            Ot = n(he, "DIV", { class: !0 });
            var Ye = i(Ot);
            tt = n(Ye, "TABLE", { class: !0 });
            var Bl = i(tt);
            lt = n(Bl, "THEAD", {});
            var Hl = i(lt);
            fe = n(Hl, "TR", { class: !0 });
            var me = i(fe);
            Ct = n(me, "TH", { scope: !0, class: !0 });
            var yl = i(Ct);
            (il = k(yl, "#")), yl.forEach(o), (Be = m(me)), (He = n(me, "TH", { scope: !0, class: !0 }));
            var Fe = i(He);
            (cl = k(Fe, "Id")), Fe.forEach(o), (ul = m(me)), (ne = n(me, "TH", { scope: !0, class: !0 }));
            var as = i(ne);
            (mt = k(as, "Status")), as.forEach(o), (Vt = m(me)), (Dt = n(me, "TH", { scope: !0, class: !0 }));
            var Ol = i(Dt);
            (dl = k(Ol, "\u2116 of participants")), Ol.forEach(o), (Ce = m(me)), (Re = n(me, "TH", { scope: !0, class: !0 }));
            var $l = i(Re);
            (fl = k($l, "Actions")), $l.forEach(o), me.forEach(o), Hl.forEach(o), (gt = m(Bl)), (Ut = n(Bl, "TBODY", {}));
            var Rl = i(Ut);
            for (let Ae = 0; Ae < ie.length; Ae += 1) ie[Ae].l(Rl);
            Rl.forEach(o), Bl.forEach(o), Ye.forEach(o), (bt = m(he)), (Et = n(he, "DIV", { class: !0 }));
            var at = i(Et);
            ze = n(at, "I", { class: !0 });
            var h = i(ze);
            (hl = k(h, ">> Print selected as xlsx")), h.forEach(o), (_l = m(at)), (ft = n(at, "I", { class: !0 }));
            var G = i(ft);
            (Xt = k(G, ">> Select all")), G.forEach(o), at.forEach(o), (pl = m(he)), (st = n(he, "DIV", { class: !0 }));
            var M = i(st);
            kt = n(M, "DIV", { class: !0 });
            var _e = i(kt);
            wt = n(_e, "UL", { class: !0 });
            var es = i(wt);
            for (let Ae = 0; Ae < we.length; Ae += 1) we[Ae].l(es);
            es.forEach(o), (jt = m(_e)), (d = n(_e, "SELECT", { class: !0 }));
            var Il = i(d);
            for (let Ae = 0; Ae < 6; Ae += 1) gl[Ae].l(Il);
            Il.forEach(o), _e.forEach(o), M.forEach(o), he.forEach(o), (N = m(F)), (S = n(F, "DIV", { class: !0 }));
            var Ml = i(S);
            A = n(Ml, "BUTTON", { class: !0, style: !0 });
            var zl = i(A);
            (W = n(zl, "I", { class: !0 })), i(W).forEach(o), (Nt = k(zl, " Edit")), zl.forEach(o), (xt = m(Ml)), (X = n(Ml, "BUTTON", { class: !0 }));
            var Gl = i(X);
            (vl = n(Gl, "I", { class: !0 })), i(vl).forEach(o), (Me = k(Gl, " Delete")), Gl.forEach(o), Ml.forEach(o), F.forEach(o), this.h();
        },
        h() {
            s(c, "class", "fa fa-info-circle svelte-1xk55ym"),
                s(a, "class", "card-header"),
                s(a, "data-bs-toggle", "collapse"),
                s(a, "href", "#info"),
                s(a, "role", "button"),
                s(a, "aria-expanded", "false"),
                s(a, "aria-controls", "info"),
                s(j, "scope", "row"),
                s(j, "class", "svelte-1xk55ym"),
                s(Y, "class", "svelte-1xk55ym"),
                s(J, "class", "svelte-1xk55ym"),
                s(Xe, "class", "svelte-1xk55ym"),
                s(Oe, "class", "svelte-1xk55ym"),
                s(Te, "href", l[28]),
                s(rt, "class", "svelte-1xk55ym"),
                s(Le, "class", "svelte-1xk55ym"),
                s(C, "class", "table table-striped table-sm svelte-1xk55ym"),
                s(p, "class", "row"),
                s(_, "class", "collapse card-body pt-0 pb-0"),
                s(_, "id", "info"),
                s(Rt, "class", "fa-solid fa-tasks"),
                s(se, "class", "card-header"),
                s(se, "data-bs-toggle", "collapse"),
                s(se, "href", "#form"),
                s(se, "role", "button"),
                s(se, "aria-expanded", "false"),
                s(se, "aria-controls", "form"),
                s(ut, "class", "card-body collapse"),
                s(ut, "id", "form"),
                s(Mt, "class", "fa fa-users svelte-1xk55ym"),
                s(et, "class", "badge badge-light text-primary"),
                s(re, "class", "card-header d-flex justify-content-between align-items-center"),
                s(re, "data-bs-toggle", "collapse"),
                s(re, "href", "#applications"),
                s(re, "role", "button"),
                s(re, "aria-expanded", "false"),
                s(re, "aria-controls", "applications"),
                ot(re, "margin-bottom", "38px", !1),
                s(Ct, "scope", "col"),
                s(Ct, "class", "ms-1 text-center svelte-1xk55ym"),
                s(He, "scope", "col"),
                s(He, "class", "ms-1 text-center svelte-1xk55ym"),
                s(ne, "scope", "col"),
                s(ne, "class", "text-center svelte-1xk55ym"),
                s(Dt, "scope", "col"),
                s(Dt, "class", "text-center svelte-1xk55ym"),
                s(Re, "scope", "col"),
                s(Re, "class", "text-center svelte-1xk55ym"),
                s(fe, "class", "table-light"),
                s(tt, "class", "table table-striped table-sm svelte-1xk55ym"),
                ot(tt, "margin-top", "-38px", !1),
                ot(tt, "margin-bottom", "100px", !1),
                s(Ot, "class", "table"),
                s(ze, "class", "svelte-1xk55ym"),
                s(ft, "class", "svelte-1xk55ym"),
                s(Et, "class", "manage svelte-1xk55ym"),
                s(wt, "class", "pagination m-0 p-3 svelte-1xk55ym"),
                s(d, "class", "form-select svelte-1xk55ym"),
                l[35] === void 0 && Ll(() => l[95].call(d)),
                s(kt, "class", "row col-md-6 bg-light stickyBottom paginationNav apppag justify-content-center align-items-center svelte-1xk55ym"),
                s(st, "class", "container-fluid p-0 pt-3 d-flex justify-content-center"),
                s(ce, "class", "card-body collapse show"),
                s(ce, "id", "applications"),
                ot(ce, "position", "relative", !1),
                s(W, "class", "fa fa-edit svelte-1xk55ym"),
                s(A, "class", "btn btn-primary rounded-0 svelte-1xk55ym"),
                ot(A, "background-color", "#3490dc"),
                ot(A, "border", "none"),
                s(vl, "class", "fa fa-trash svelte-1xk55ym"),
                s(X, "class", "btn btn-danger rounded-0 svelte-1xk55ym"),
                s(S, "class", "btn-group stickyBottom svelte-1xk55ym"),
                s(t, "class", "card col-md-5 p-0 svelte-1xk55ym"),
                ot(t, "min-width", "fit-content");
        },
        m(w, F) {
            ae(w, t, F),
                e(t, a),
                e(a, c),
                e(a, u),
                e(t, f),
                e(t, _),
                e(_, p),
                e(p, C),
                e(C, b),
                e(b, P),
                e(P, j),
                e(j, q),
                e(P, I),
                e(P, T),
                e(T, V),
                e(b, U),
                e(b, R),
                e(R, Y),
                e(Y, D),
                e(R, g),
                e(R, L),
                e(L, y),
                e(b, H),
                e(b, ee),
                e(ee, J),
                e(J, x),
                e(ee, K),
                e(ee, $),
                e($, B),
                e($, Pe),
                e($, ue),
                e($, ge),
                e($, be),
                e($, Ke),
                e(b, _t),
                e(b, pe),
                e(pe, Xe),
                e(Xe, Ie),
                e(pe, z),
                e(pe, Ee),
                e(Ee, oe),
                e(b, ke),
                e(b, de),
                e(de, Oe),
                e(Oe, Q),
                e(de, pt),
                e(de, Ve),
                e(Ve, Te),
                e(Te, Qe),
                e(b, ve),
                e(b, Lt),
                e(Lt, rt),
                e(rt, Ue),
                e(Lt, xe),
                e(Lt, nt),
                e(nt, it),
                e(b, te),
                e(b, le),
                e(le, Le),
                e(Le, Qt),
                e(le, ct),
                De.m(le, null),
                e(t, vt),
                e(t, se),
                e(se, Rt),
                e(se, ol),
                e(t, je),
                e(t, ut),
                (ut.innerHTML = l[26]),
                e(t, dt),
                e(t, re),
                e(re, Pt),
                e(Pt, Mt),
                e(Pt, We),
                e(re, rl),
                e(re, $e),
                e($e, et),
                e(et, Wt),
                e(et, nl),
                e(t, Je),
                e(t, ce),
                e(ce, Ot),
                e(Ot, tt),
                e(tt, lt),
                e(lt, fe),
                e(fe, Ct),
                e(Ct, il),
                e(fe, Be),
                e(fe, He),
                e(He, cl),
                e(fe, ul),
                e(fe, ne),
                e(ne, mt),
                e(fe, Vt),
                e(fe, Dt),
                e(Dt, dl),
                e(fe, Ce),
                e(fe, Re),
                e(Re, fl),
                e(tt, gt),
                e(tt, Ut);
            for (let O = 0; O < ie.length; O += 1) ie[O].m(Ut, null);
            e(ce, bt), e(ce, Et), e(Et, ze), e(ze, hl), e(Et, _l), e(Et, ft), e(ft, Xt), l[93](ft), e(ce, pl), e(ce, st), e(st, kt), e(kt, wt);
            for (let O = 0; O < we.length; O += 1) we[O].m(wt, null);
            e(kt, jt), e(kt, d);
            for (let O = 0; O < 6; O += 1) gl[O].m(d, null);
            Ze(d, l[35]),
                e(t, N),
                e(t, S),
                e(S, A),
                e(A, W),
                e(A, Nt),
                e(S, xt),
                e(S, X),
                e(X, vl),
                e(X, Me),
                St || ((ql = [Z(ze, "click", l[50]), Z(ft, "click", l[49]), Z(d, "change", l[95]), Z(d, "change", l[96]), Z(A, "click", l[97]), Z(X, "click", l[98])]), (St = !0));
        },
        p(w, F) {
            if (
                (F[1] & 4 && Tt(V, w[33]),
                F[1] & 2 && Tt(y, w[32]),
                F[1] & 1 && Tt(Pe, w[31]),
                F[0] & 1073741824 && Tt(Ke, w[30]),
                F[0] & 536870912 && Tt(oe, w[29]),
                F[0] & 268435456 && s(Te, "href", w[28]),
                F[0] & 134217728 && Tt(it, w[27]),
                Cl === (Cl = qt(w)) && De ? De.p(w, F) : (De.d(1), (De = Cl(w)), De && (De.c(), De.m(le, null))),
                F[0] & 67108864 && (ut.innerHTML = w[26]),
                F[0] & 16777216 && Tt(Wt, w[24]),
                (F[0] & 5242880) | (F[1] & 14811136))
            ) {
                $t = w[22];
                let O;
                for (O = 0; O < $t.length; O += 1) {
                    const ye = fa(w, $t, O);
                    ie[O] ? ie[O].p(ye, F) : ((ie[O] = Da(ye)), ie[O].c(), ie[O].m(Ut, null));
                }
                for (; O < ie.length; O += 1) ie[O].d(1);
                ie.length = $t.length;
            }
            if ((F[0] & 4194304) | (F[1] & 4112)) {
                el = Array(Math.ceil(w[22].length / w[35]) === 0 ? 1 : Math.ceil(w[22].length / w[35]));
                let O;
                for (O = 0; O < el.length; O += 1) {
                    const ye = da(w, el, O);
                    we[O] ? we[O].p(ye, F) : ((we[O] = wa(ye)), we[O].c(), we[O].m(wt, null));
                }
                for (; O < we.length; O += 1) we[O].d(1);
                we.length = el.length;
            }
            F[1] & 16 && Ze(d, w[35]);
        },
        d(w) {
            w && o(t), De.d(), Kt(ie, w), l[93](null), Kt(we, w), Kt(gl, w), (St = !1), Xl(ql);
        },
    };
}
function lo(l) {
    let t, a, c, u, f, _, p, C, b, P;
    return {
        c() {
            (t = r("div")), (a = r("div")), (c = r("div")), (u = r("img")), (_ = v()), (p = r("p")), (C = E("No Competition Selected, please click on ")), (b = r("i")), (P = E(".")), this.h();
        },
        l(j) {
            t = n(j, "DIV", { class: !0, style: !0 });
            var q = i(t);
            a = n(q, "DIV", { class: !0 });
            var I = i(a);
            c = n(I, "DIV", { class: !0 });
            var T = i(c);
            (u = n(T, "IMG", { src: !0, alt: !0, class: !0 })), (_ = m(T)), (p = n(T, "P", { class: !0 }));
            var V = i(p);
            (C = k(V, "No Competition Selected, please click on ")), (b = n(V, "I", { class: !0 })), i(b).forEach(o), (P = k(V, ".")), V.forEach(o), T.forEach(o), I.forEach(o), q.forEach(o), this.h();
        },
        h() {
            Ql(u.src, (f = Fa)) || s(u, "src", f),
                s(u, "alt", ""),
                s(u, "class", "gif svelte-1xk55ym"),
                s(b, "class", "fa fa-edit svelte-1xk55ym"),
                s(p, "class", "svelte-1xk55ym"),
                s(c, "class", "noComp svelte-1xk55ym"),
                s(a, "class", "card-body p-0 pt-1 shadow"),
                s(t, "class", "card p-0 col-md-5 svelte-1xk55ym"),
                ot(t, "max-width", "500px");
        },
        m(j, q) {
            ae(j, t, q), e(t, a), e(a, c), e(c, u), e(c, _), e(c, p), e(p, C), e(p, b), e(p, P);
        },
        p: At,
        d(j) {
            j && o(t);
        },
    };
}
function so(l) {
    let t,
        a = l[25].join(" ,") + "",
        c;
    return {
        c() {
            (t = r("td")), (c = E(a));
        },
        l(u) {
            t = n(u, "TD", {});
            var f = i(t);
            (c = k(f, a)), f.forEach(o);
        },
        m(u, f) {
            ae(u, t, f), e(t, c);
        },
        p(u, f) {
            f[0] & 33554432 && a !== (a = u[25].join(" ,") + "") && Tt(c, a);
        },
        d(u) {
            u && o(t);
        },
    };
}
function ao(l) {
    let t, a;
    return {
        c() {
            (t = r("td")), (a = E("No monitors"));
        },
        l(c) {
            t = n(c, "TD", {});
            var u = i(t);
            (a = k(u, "No monitors")), u.forEach(o);
        },
        m(c, u) {
            ae(c, t, u), e(t, a);
        },
        p: At,
        d(c) {
            c && o(t);
        },
    };
}
function Da(l) {
    let t,
        a,
        c,
        u,
        f,
        _ = l[117].id + "",
        p,
        C,
        b,
        P = l[117].status + "",
        j,
        q,
        I,
        T = l[117].participants.length + "",
        V,
        U,
        R,
        Y,
        D,
        g,
        L,
        y,
        H,
        ee,
        J,
        x,
        K,
        $,
        B = l[112],
        Pe,
        ue;
    function ge() {
        return l[88](l[112]);
    }
    function be() {
        return l[89](l[117]);
    }
    function Ke() {
        return l[90](l[117]);
    }
    function _t() {
        return l[91](l[117]);
    }
    const pe = () => l[92](t, B),
        Xe = () => l[92](null, B);
    return {
        c() {
            (t = r("tr")),
                (a = r("td")),
                (c = r("li")),
                (u = v()),
                (f = r("td")),
                (p = E(_)),
                (C = v()),
                (b = r("td")),
                (j = E(P)),
                (q = v()),
                (I = r("td")),
                (V = E(T)),
                (U = v()),
                (R = r("td")),
                (Y = r("div")),
                (D = r("button")),
                (g = r("i")),
                (L = v()),
                (y = r("button")),
                (H = r("i")),
                (ee = v()),
                (J = r("button")),
                (x = r("i")),
                (K = v()),
                this.h();
        },
        l(Ie) {
            t = n(Ie, "TR", { id: !0, class: !0 });
            var z = i(t);
            a = n(z, "TD", {});
            var Ee = i(a);
            (c = n(Ee, "LI", { class: !0 })), i(c).forEach(o), Ee.forEach(o), (u = m(z)), (f = n(z, "TD", {}));
            var oe = i(f);
            (p = k(oe, _)), oe.forEach(o), (C = m(z)), (b = n(z, "TD", {}));
            var ke = i(b);
            (j = k(ke, P)), ke.forEach(o), (q = m(z)), (I = n(z, "TD", { class: !0 }));
            var de = i(I);
            (V = k(de, T)), de.forEach(o), (U = m(z)), (R = n(z, "TD", {}));
            var Oe = i(R);
            Y = n(Oe, "DIV", { class: !0 });
            var Q = i(Y);
            D = n(Q, "BUTTON", { class: !0 });
            var pt = i(D);
            (g = n(pt, "I", { class: !0 })), i(g).forEach(o), pt.forEach(o), (L = m(Q)), (y = n(Q, "BUTTON", { class: !0 }));
            var Ve = i(y);
            (H = n(Ve, "I", { class: !0 })), i(H).forEach(o), Ve.forEach(o), (ee = m(Q)), (J = n(Q, "BUTTON", { class: !0 }));
            var Te = i(J);
            (x = n(Te, "I", { class: !0 })), i(x).forEach(o), Te.forEach(o), Q.forEach(o), Oe.forEach(o), (K = m(z)), z.forEach(o), this.h();
        },
        h() {
            s(c, "class", "fa fa-square-o svelte-1xk55ym"),
                s(I, "class", "text-center"),
                s(g, "class", "fa fa-check-square svelte-1xk55ym"),
                s(D, "class", "btn btn-success btn-sm svelte-1xk55ym"),
                s(H, "class", "fa fa-ban svelte-1xk55ym"),
                s(y, "class", "btn btn-danger btn-sm svelte-1xk55ym"),
                s(x, "class", "fa fa-eye svelte-1xk55ym"),
                s(J, "class", "btn btn-primary btn-sm svelte-1xk55ym"),
                s(Y, "class", "btn-group"),
                s(t, "id", ($ = l[117].id + "")),
                s(t, "class", "text-center");
        },
        m(Ie, z) {
            ae(Ie, t, z),
                e(t, a),
                e(a, c),
                e(t, u),
                e(t, f),
                e(f, p),
                e(t, C),
                e(t, b),
                e(b, j),
                e(t, q),
                e(t, I),
                e(I, V),
                e(t, U),
                e(t, R),
                e(R, Y),
                e(Y, D),
                e(D, g),
                e(Y, L),
                e(Y, y),
                e(y, H),
                e(Y, ee),
                e(Y, J),
                e(J, x),
                e(t, K),
                pe(),
                Pe || ((ue = [Z(c, "click", ge), Z(D, "click", be), Z(y, "click", Ke), Z(J, "click", _t)]), (Pe = !0));
        },
        p(Ie, z) {
            (l = Ie),
                z[0] & 4194304 && _ !== (_ = l[117].id + "") && Tt(p, _),
                z[0] & 4194304 && P !== (P = l[117].status + "") && Tt(j, P),
                z[0] & 4194304 && T !== (T = l[117].participants.length + "") && Tt(V, T),
                z[0] & 4194304 && $ !== ($ = l[117].id + "") && s(t, "id", $),
                B !== l[112] && (Xe(), (B = l[112]), pe());
        },
        d(Ie) {
            Ie && o(t), Xe(), (Pe = !1), Xl(ue);
        },
    };
}
function wa(l) {
    let t,
        a = l[112] + 1 + "",
        c,
        u,
        f,
        _;
    function p() {
        return l[94](l[112]);
    }
    return {
        c() {
            (t = r("li")), (c = E(a)), (u = v()), this.h();
        },
        l(C) {
            t = n(C, "LI", { class: !0 });
            var b = i(t);
            (c = k(b, a)), (u = m(b)), b.forEach(o), this.h();
        },
        h() {
            s(t, "class", "page-item page-link svelte-1xk55ym");
        },
        m(C, b) {
            ae(C, t, b), e(t, c), e(t, u), f || ((_ = Z(t, "click", p)), (f = !0));
        },
        p(C, b) {
            l = C;
        },
        d(C) {
            C && o(t), (f = !1), _();
        },
    };
}
function oo(l) {
    let t, a;
    return {
        c() {
            (t = r("option")), (a = E(l[112])), this.h();
        },
        l(c) {
            t = n(c, "OPTION", { class: !0 });
            var u = i(t);
            (a = k(u, l[112])), u.forEach(o), this.h();
        },
        h() {
            s(t, "class", "dropdown-item svelte-1xk55ym"), (t.__value = l[112]), (t.value = t.__value);
        },
        m(c, u) {
            ae(c, t, u), e(t, a);
        },
        p: At,
        d(c) {
            c && o(t);
        },
    };
}
function ro(l) {
    let t,
        a,
        c,
        u,
        f,
        _,
        p,
        C,
        b,
        P,
        j,
        q,
        I,
        T,
        V,
        U,
        R,
        Y,
        D,
        g,
        L,
        y,
        H,
        ee,
        J,
        x,
        K,
        $,
        B,
        Pe,
        ue,
        ge,
        be,
        Ke,
        _t,
        pe,
        Xe,
        Ie,
        z,
        Ee,
        oe,
        ke,
        de,
        Oe,
        Q,
        pt,
        Ve,
        Te,
        Qe,
        ve,
        Lt,
        rt,
        Ue,
        xe,
        nt,
        it,
        te,
        le,
        Le,
        Qt,
        ct,
        vt,
        se,
        Rt,
        ol,
        je,
        ut,
        dt,
        re,
        Pt,
        Mt,
        We,
        rl,
        $e,
        et,
        Wt,
        nl,
        Je,
        ce,
        Ot,
        tt,
        lt,
        fe,
        Ct,
        il,
        Be,
        He,
        cl,
        ul,
        ne,
        mt,
        Vt,
        Dt,
        dl,
        Ce,
        Re,
        fl,
        gt,
        Ut,
        bt,
        Et,
        ze,
        hl,
        _l,
        ft,
        Xt,
        pl,
        st,
        kt,
        wt,
        jt,
        d,
        N,
        S,
        A,
        W,
        Nt,
        xt,
        X,
        vl,
        Me,
        St,
        ql,
        qt,
        Cl,
        De,
        $t,
        ie,
        el,
        we,
        ml,
        gl,
        w,
        F,
        O,
        ye,
        Yt,
        Dl,
        Ge,
        wl,
        tl,
        Yl,
        Ft,
        Jt,
        ll,
        Nl,
        yt,
        zt,
        Sl,
        bl,
        Fl,
        Al,
        El,
        jl,
        Gt,
        Bt,
        kl,
        Jl,
        Pl,
        xl;
    ms.title = c = "App Name| " + l[1];
    let Ne = l[38] === "super_admin" && ga(l),
        bs = ["default", "teacher", "admin", "super_admin"],
        sl = [];
    for (let h = 0; h < 4; h += 1) sl[h] = Ka(Za(l, bs, h));
    let al = ua,
        qe = [];
    for (let h = 0; h < al.length; h += 1) qe[h] = ba(ma(l, al, h));
    let Se = l[12] === "School" && Ea(l),
        he = l[12] === "University" && ka(l),
        Ye = l[12] === "College" && Ia(l);
    function Bl(h, G) {
        return h[34].length > 0 ? Xa : Wa;
    }
    let Hl = Bl(l),
        me = Hl(l),
        yl = Array(Math.ceil(l[17] / l[36])),
        Fe = [];
    for (let h = 0; h < yl.length; h += 1) Fe[h] = Ca(ha(l, yl, h));
    let as = [5, 10, 15, 20, 25, 50],
        Ol = [];
    for (let h = 0; h < 6; h += 1) Ol[h] = eo(za(l, as, h));
    function $l(h, G) {
        return h[23] === "" ? lo : to;
    }
    let Rl = $l(l),
        at = Rl(l);
    return {
        c() {
            (t = r("script")),
                (u = v()),
                (f = r("section")),
                (_ = r("img")),
                (C = v()),
                (b = r("div")),
                (P = v()),
                (j = r("nav")),
                (q = r("div")),
                (I = r("div")),
                (T = r("img")),
                (U = v()),
                (R = r("button")),
                (Y = r("span")),
                (D = v()),
                (g = r("div")),
                (L = r("ul")),
                (y = r("li")),
                (H = r("span")),
                (ee = E("Users control")),
                (J = v()),
                (x = r("li")),
                (K = r("span")),
                ($ = E("Competitions control")),
                (B = v()),
                Ne && Ne.c(),
                (Pe = v()),
                (ue = r("li")),
                (ge = r("div")),
                (be = r("img")),
                (_t = v()),
                (pe = r("span")),
                (Xe = E(l[1])),
                (Ie = v()),
                (z = r("ul")),
                (Ee = r("li")),
                (oe = r("a")),
                (ke = r("span")),
                (de = E(`\r
									Settings`)),
                (Q = v()),
                (pt = r("li")),
                (Ve = r("hr")),
                (Te = v()),
                (Qe = r("button")),
                (ve = r("span")),
                (Lt = E(`\r
								Sign out`)),
                (rt = v()),
                (Ue = r("div")),
                (xe = r("div")),
                (nt = r("div")),
                (it = r("div")),
                (te = r("div")),
                (le = r("h1")),
                (Le = r("span")),
                (Qt = E(`\r
							Search`)),
                (ct = v()),
                (vt = r("div")),
                (se = r("label")),
                (Rt = E("Email address")),
                (ol = v()),
                (je = r("input")),
                (ut = v()),
                (dt = r("div")),
                (re = r("label")),
                (Pt = E("First name, surname or patronymic")),
                (Mt = v()),
                (We = r("input")),
                (rl = v()),
                ($e = r("div")),
                (et = r("label")),
                (Wt = E("Permission")),
                (nl = v()),
                (Je = r("select")),
                (ce = r("option")),
                (Ot = E("Choose..."));
            for (let h = 0; h < 4; h += 1) sl[h].c();
            (tt = v()), (lt = r("div")), (fe = r("label")), (Ct = E("Region")), (il = v()), (Be = r("select")), (He = r("option")), (cl = E("Choose..."));
            for (let h = 0; h < qe.length; h += 1) qe[h].c();
            (ul = v()),
                (ne = r("div")),
                (mt = r("div")),
                (Vt = r("label")),
                (Dt = E("Education type")),
                (dl = v()),
                (Ce = r("select")),
                (Re = r("option")),
                (fl = E("Choose...")),
                (gt = r("option")),
                (Ut = E("School")),
                (bt = r("option")),
                (Et = E("University")),
                (ze = r("option")),
                (hl = E("College")),
                (_l = v()),
                Se && Se.c(),
                (ft = v()),
                he && he.c(),
                (Xt = v()),
                Ye && Ye.c(),
                (pl = v()),
                (st = r("button")),
                (kt = E("Search")),
                (wt = v()),
                (jt = r("div")),
                (d = r("lottie-player")),
                (S = v()),
                (A = r("div")),
                (W = r("div")),
                (Nt = r("li")),
                (xt = v()),
                (X = r("input")),
                (vl = v()),
                (Me = r("select")),
                (St = r("option")),
                (ql = E("Choose competition status ...")),
                (qt = r("option")),
                (Cl = E("Ongoing")),
                (De = r("option")),
                ($t = E("Upcoming")),
                (ie = r("option")),
                (el = E("Finished")),
                (we = v()),
                (ml = r("button")),
                (gl = E("Filter")),
                (w = v()),
                (F = r("div")),
                (O = r("div")),
                (ye = r("div")),
                (Yt = r("h4")),
                (Dl = r("span")),
                (Ge = E(`\r
							Competitions`)),
                (wl = v()),
                (tl = r("div")),
                me.c(),
                (Yl = v()),
                (Ft = r("div")),
                (Jt = r("div")),
                (ll = r("ul"));
            for (let h = 0; h < Fe.length; h += 1) Fe[h].c();
            (Nl = v()), (yt = r("select"));
            for (let h = 0; h < 6; h += 1) Ol[h].c();
            (zt = v()),
                at.c(),
                (Sl = v()),
                (bl = r("div")),
                (Fl = E("keephideClass")),
                (Al = v()),
                (El = r("div")),
                (jl = v()),
                (Gt = r("div")),
                (Bt = r("div")),
                (kl = r("span")),
                (Jl = E("Loading...")),
                this.h();
        },
        l(h) {
            const G = Pa('[data-svelte="svelte-b3wssk"]', ms.head);
            t = n(G, "SCRIPT", { src: !0 });
            var M = i(t);
            M.forEach(o), G.forEach(o), (u = m(h)), (f = n(h, "SECTION", { class: !0 }));
            var _e = i(f);
            (_ = n(_e, "IMG", { class: !0, src: !0, alt: !0 })), (C = m(_e)), (b = n(_e, "DIV", { class: !0 })), i(b).forEach(o), (P = m(_e)), (j = n(_e, "NAV", { class: !0 }));
            var es = i(j);
            q = n(es, "DIV", { class: !0 });
            var Il = i(q);
            I = n(Il, "DIV", { class: !0 });
            var Ml = i(I);
            (T = n(Ml, "IMG", { src: !0, alt: !0, class: !0 })),
                Ml.forEach(o),
                (U = m(Il)),
                (R = n(Il, "BUTTON", {
                    class: !0,
                    type: !0,
                    "data-bs-toggle": !0,
                    "data-bs-target": !0,
                    "aria-controls": !0,
                    "aria-expanded": !0,
                    "aria-label": !0,
                }));
            var zl = i(R);
            (Y = n(zl, "SPAN", { class: !0 })), i(Y).forEach(o), zl.forEach(o), (D = m(Il)), (g = n(Il, "DIV", { class: !0, id: !0 }));
            var Gl = i(g);
            L = n(Gl, "UL", { class: !0 });
            var Ae = i(L);
            y = n(Ae, "LI", { class: !0 });
            var Ds = i(y);
            H = n(Ds, "SPAN", { class: !0, id: !0 });
            var ws = i(H);
            (ee = k(ws, "Users control")), ws.forEach(o), Ds.forEach(o), (J = m(Ae)), (x = n(Ae, "LI", { class: !0 }));
            var Ns = i(x);
            K = n(Ns, "SPAN", { class: !0, id: !0 });
            var Ss = i(K);
            ($ = k(Ss, "Competitions control")), Ss.forEach(o), Ns.forEach(o), (B = m(Ae)), Ne && Ne.l(Ae), (Pe = m(Ae)), (ue = n(Ae, "LI", { class: !0 }));
            var os = i(ue);
            ge = n(os, "DIV", {
                class: !0,
                role: !0,
                "data-bs-toggle": !0,
                "aria-expanded": !0,
            });
            var rs = i(ge);
            (be = n(rs, "IMG", { src: !0, alt: !0, class: !0 })), (_t = m(rs)), (pe = n(rs, "SPAN", {}));
            var As = i(pe);
            (Xe = k(As, l[1])), As.forEach(o), rs.forEach(o), (Ie = m(os)), (z = n(os, "UL", { class: !0 }));
            var Zl = i(z);
            Ee = n(Zl, "LI", {});
            var Ps = i(Ee);
            oe = n(Ps, "A", {
                "sveltekit:prefetch": !0,
                href: !0,
                content: !0,
                class: !0,
            });
            var Es = i(oe);
            (ke = n(Es, "SPAN", { class: !0 })),
                i(ke).forEach(o),
                (de = k(
                    Es,
                    `\r
									Settings`
                )),
                Es.forEach(o),
                Ps.forEach(o),
                (Q = m(Zl)),
                (pt = n(Zl, "LI", {}));
            var Os = i(pt);
            (Ve = n(Os, "HR", { class: !0 })), Os.forEach(o), (Te = m(Zl)), (Qe = n(Zl, "BUTTON", { class: !0 }));
            var ks = i(Qe);
            (ve = n(ks, "SPAN", { class: !0 })),
                i(ve).forEach(o),
                (Lt = k(
                    ks,
                    `\r
								Sign out`
                )),
                ks.forEach(o),
                Zl.forEach(o),
                os.forEach(o),
                Ae.forEach(o),
                Gl.forEach(o),
                Il.forEach(o),
                es.forEach(o),
                (rt = m(_e)),
                (Ue = n(_e, "DIV", { class: !0 }));
            var ns = i(Ue);
            xe = n(ns, "DIV", { class: !0 });
            var Vs = i(xe);
            nt = n(Vs, "DIV", { class: !0 });
            var Us = i(nt);
            it = n(Us, "DIV", { class: !0 });
            var is = i(it);
            te = n(is, "DIV", { class: !0 });
            var It = i(te);
            le = n(It, "H1", { class: !0 });
            var ys = i(le);
            (Le = n(ys, "SPAN", { class: !0 })),
                i(Le).forEach(o),
                (Qt = k(
                    ys,
                    `\r
							Search`
                )),
                ys.forEach(o),
                (ct = m(It)),
                (vt = n(It, "DIV", { class: !0 }));
            var cs = i(vt);
            se = n(cs, "LABEL", { for: !0, class: !0 });
            var js = i(se);
            (Rt = k(js, "Email address")),
                js.forEach(o),
                (ol = m(cs)),
                (je = n(cs, "INPUT", {
                    type: !0,
                    class: !0,
                    id: !0,
                    "aria-describedby": !0,
                    placeholder: !0,
                })),
                cs.forEach(o),
                (ut = m(It)),
                (dt = n(It, "DIV", { class: !0 }));
            var us = i(dt);
            re = n(us, "LABEL", { for: !0, class: !0 });
            var Bs = i(re);
            (Pt = k(Bs, "First name, surname or patronymic")),
                Bs.forEach(o),
                (Mt = m(us)),
                (We = n(us, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })),
                us.forEach(o),
                (rl = m(It)),
                ($e = n(It, "DIV", { class: !0 }));
            var ds = i($e);
            et = n(ds, "LABEL", { for: !0 });
            var Hs = i(et);
            (Wt = k(Hs, "Permission")), Hs.forEach(o), (nl = m(ds)), (Je = n(ds, "SELECT", { class: !0, "aria-label": !0 }));
            var Is = i(Je);
            ce = n(Is, "OPTION", {});
            var Rs = i(ce);
            (Ot = k(Rs, "Choose...")), Rs.forEach(o);
            for (let ht = 0; ht < 4; ht += 1) sl[ht].l(Is);
            Is.forEach(o), ds.forEach(o), (tt = m(It)), (lt = n(It, "DIV", { class: !0 }));
            var fs = i(lt);
            fe = n(fs, "LABEL", { for: !0 });
            var Ms = i(fe);
            (Ct = k(Ms, "Region")), Ms.forEach(o), (il = m(fs)), (Be = n(fs, "SELECT", { class: !0, "aria-label": !0 }));
            var Ts = i(Be);
            He = n(Ts, "OPTION", {});
            var qs = i(He);
            (cl = k(qs, "Choose...")), qs.forEach(o);
            for (let ht = 0; ht < qe.length; ht += 1) qe[ht].l(Ts);
            Ts.forEach(o), fs.forEach(o), (ul = m(It)), (ne = n(It, "DIV", { class: !0 }));
            var Vl = i(ne);
            mt = n(Vl, "DIV", { class: !0 });
            var hs = i(mt);
            Vt = n(hs, "LABEL", { for: !0 });
            var Ys = i(Vt);
            (Dt = k(Ys, "Education type")), Ys.forEach(o), (dl = m(hs)), (Ce = n(hs, "SELECT", { class: !0, "aria-label": !0 }));
            var ts = i(Ce);
            Re = n(ts, "OPTION", {});
            var Fs = i(Re);
            (fl = k(Fs, "Choose...")), Fs.forEach(o), (gt = n(ts, "OPTION", {}));
            var Js = i(gt);
            (Ut = k(Js, "School")), Js.forEach(o), (bt = n(ts, "OPTION", {}));
            var zs = i(bt);
            (Et = k(zs, "University")), zs.forEach(o), (ze = n(ts, "OPTION", {}));
            var Gs = i(ze);
            (hl = k(Gs, "College")),
                Gs.forEach(o),
                ts.forEach(o),
                hs.forEach(o),
                (_l = m(Vl)),
                Se && Se.l(Vl),
                (ft = m(Vl)),
                he && he.l(Vl),
                (Xt = m(Vl)),
                Ye && Ye.l(Vl),
                Vl.forEach(o),
                (pl = m(It)),
                (st = n(It, "BUTTON", { class: !0 }));
            var Zs = i(st);
            (kt = k(Zs, "Search")), Zs.forEach(o), It.forEach(o), (wt = m(is)), (jt = n(is, "DIV", { class: !0 }));
            var Ks = i(jt);
            (d = n(Ks, "LOTTIE-PLAYER", {
                class: !0,
                src: !0,
                speed: !0,
                loop: !0,
                nocontrols: !0,
            })),
                i(d).forEach(o),
                Ks.forEach(o),
                is.forEach(o),
                Us.forEach(o),
                Vs.forEach(o),
                (S = m(ns)),
                (A = n(ns, "DIV", { class: !0 }));
            var _s = i(A);
            W = n(_s, "DIV", { class: !0 });
            var Ul = i(W);
            (Nt = n(Ul, "LI", { class: !0 })),
                i(Nt).forEach(o),
                (xt = m(Ul)),
                (X = n(Ul, "INPUT", { type: !0, class: !0, placeholder: !0, id: !0 })),
                (vl = m(Ul)),
                (Me = n(Ul, "SELECT", { class: !0, "aria-label": !0, id: !0 }));
            var ls = i(Me);
            St = n(ls, "OPTION", {});
            var Qs = i(St);
            (ql = k(Qs, "Choose competition status ...")), Qs.forEach(o), (qt = n(ls, "OPTION", {}));
            var Ws = i(qt);
            (Cl = k(Ws, "Ongoing")), Ws.forEach(o), (De = n(ls, "OPTION", {}));
            var Xs = i(De);
            ($t = k(Xs, "Upcoming")), Xs.forEach(o), (ie = n(ls, "OPTION", {}));
            var xs = i(ie);
            (el = k(xs, "Finished")), xs.forEach(o), ls.forEach(o), (we = m(Ul)), (ml = n(Ul, "BUTTON", { class: !0 }));
            var $s = i(ml);
            (gl = k($s, "Filter")), $s.forEach(o), Ul.forEach(o), (w = m(_s)), (F = n(_s, "DIV", { class: !0 }));
            var ea = i(F);
            O = n(ea, "DIV", { class: !0 });
            var ps = i(O);
            ye = n(ps, "DIV", { class: !0, style: !0 });
            var Kl = i(ye);
            Yt = n(Kl, "H4", { class: !0 });
            var Ls = i(Yt);
            (Dl = n(Ls, "SPAN", { class: !0 })),
                i(Dl).forEach(o),
                (Ge = k(
                    Ls,
                    `\r
							Competitions`
                )),
                Ls.forEach(o),
                (wl = m(Kl)),
                (tl = n(Kl, "DIV", { class: !0 }));
            var ta = i(tl);
            me.l(ta), ta.forEach(o), (Yl = m(Kl)), (Ft = n(Kl, "DIV", { class: !0 }));
            var la = i(Ft);
            Jt = n(la, "DIV", { class: !0 });
            var vs = i(Jt);
            ll = n(vs, "UL", { class: !0 });
            var sa = i(ll);
            for (let ht = 0; ht < Fe.length; ht += 1) Fe[ht].l(sa);
            sa.forEach(o), (Nl = m(vs)), (yt = n(vs, "SELECT", { class: !0 }));
            var aa = i(yt);
            for (let ht = 0; ht < 6; ht += 1) Ol[ht].l(aa);
            aa.forEach(o),
                vs.forEach(o),
                la.forEach(o),
                Kl.forEach(o),
                (zt = m(ps)),
                at.l(ps),
                ps.forEach(o),
                ea.forEach(o),
                _s.forEach(o),
                ns.forEach(o),
                (Sl = m(_e)),
                (bl = n(_e, "DIV", { class: !0 }));
            var oa = i(bl);
            (Fl = k(oa, "keephideClass")), oa.forEach(o), (Al = m(_e)), (El = n(_e, "DIV", { class: !0 })), i(El).forEach(o), _e.forEach(o), (jl = m(h)), (Gt = n(h, "DIV", { class: !0 }));
            var ra = i(Gt);
            Bt = n(ra, "DIV", { class: !0, role: !0 });
            var na = i(Bt);
            kl = n(na, "SPAN", { class: !0 });
            var ia = i(kl);
            (Jl = k(ia, "Loading...")), ia.forEach(o), na.forEach(o), ra.forEach(o), this.h();
        },
        h() {
            (t.defer = !0),
                Ql(t.src, (a = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js")) || s(t, "src", a),
                s(_, "class", "d1 svelte-1xk55ym"),
                Ql(_.src, (p = Ma)) || s(_, "src", p),
                s(_, "alt", ""),
                s(b, "class", "d2 svelte-1xk55ym"),
                Ql(T.src, (V = Ha)) || s(T, "src", V),
                s(T, "alt", "Logo"),
                s(T, "class", "svelte-1xk55ym"),
                s(I, "class", "navbar-brand svelte-1xk55ym"),
                s(Y, "class", "navbar-toggler-icon"),
                s(R, "class", "navbar-toggler svelte-1xk55ym"),
                s(R, "type", "button"),
                s(R, "data-bs-toggle", "collapse"),
                s(R, "data-bs-target", "#participant-menu"),
                s(R, "aria-controls", "participant-menu"),
                s(R, "aria-expanded", "false"),
                s(R, "aria-label", "Toggle navigation"),
                s(H, "class", "nav-link active"),
                s(H, "id", "Users"),
                s(y, "class", "nav-item svelte-1xk55ym"),
                s(K, "class", "nav-link"),
                s(K, "id", "Competitions"),
                s(x, "class", "nav-item svelte-1xk55ym"),
                Ql(be.src, (Ke = Ra)) || s(be, "src", Ke),
                s(be, "alt", "Logo"),
                s(be, "class", "part-photo svelte-1xk55ym"),
                s(ge, "class", "nav-link dropdown-toggle d-flex align-items-center"),
                s(ge, "role", "button"),
                s(ge, "data-bs-toggle", "dropdown"),
                s(ge, "aria-expanded", "false"),
                s(ke, "class", "fa fa-gears svelte-1xk55ym"),
                s(oe, "sveltekit:prefetch", ""),
                s(oe, "href", (Oe = Wl + "/info/" + l[0])),
                s(oe, "content", "Home"),
                s(oe, "class", "dropdown-item nav-link svelte-1xk55ym"),
                ca(Ee, "active", l[37].url.pathname === "/info"),
                s(Ve, "class", "dropdown-divider"),
                s(ve, "class", "fa fa-sign-out svelte-1xk55ym"),
                s(Qe, "class", "dropdown-item nav-link signOut svelte-1xk55ym"),
                s(z, "class", "dropdown-menu mt-2 ms-3 rounded-0 svelte-1xk55ym"),
                s(ue, "class", "nav-item dropdown svelte-1xk55ym"),
                s(L, "class", "navbar-nav me-auto mb-20 mb-lg-0 col-12 justify-content-around svelte-1xk55ym"),
                s(g, "class", "collapse navbar-collapse flex-grow-0"),
                s(g, "id", "participant-menu"),
                s(q, "class", "container-fluid p-0 d-flex justify-content-lg-around"),
                s(j, "class", "navbar navbar-expand-lg navbar-light mb-5 sticky-top shadow-sm svelte-1xk55ym"),
                s(Le, "class", "fa fa-search svelte-1xk55ym"),
                s(le, "class", "form-header svelte-1xk55ym"),
                s(se, "for", "email"),
                s(se, "class", "form-label"),
                s(je, "type", "email"),
                s(je, "class", "form-control svelte-1xk55ym"),
                s(je, "id", "email"),
                s(je, "aria-describedby", "emailHelp"),
                s(je, "placeholder", "Enter the user email"),
                s(vt, "class", "mb-3"),
                s(re, "for", "fullName"),
                s(re, "class", "form-label mb-0"),
                s(We, "type", "text"),
                s(We, "class", "form-control svelte-1xk55ym"),
                s(We, "id", "fullName"),
                s(We, "placeholder", "Enter the user name"),
                s(dt, "class", "mb-3"),
                s(et, "for", "region"),
                (ce.selected = !0),
                (ce.__value = "Choose..."),
                (ce.value = ce.__value),
                s(Je, "class", "form-select form-select-sm svelte-1xk55ym"),
                s(Je, "aria-label", "Default select example"),
                l[15] === void 0 && Ll(() => l[68].call(Je)),
                s($e, "class", "mb-3"),
                s(fe, "for", "region"),
                (He.selected = !0),
                (He.__value = "Choose..."),
                (He.value = He.__value),
                s(Be, "class", "form-select form-select-sm svelte-1xk55ym"),
                s(Be, "aria-label", "Default select example"),
                l[11] === void 0 && Ll(() => l[69].call(Be)),
                s(lt, "class", "mb-3"),
                s(Vt, "for", "education"),
                (Re.selected = !0),
                (Re.__value = "Choose..."),
                (Re.value = Re.__value),
                (gt.__value = "School"),
                (gt.value = gt.__value),
                (bt.__value = "University"),
                (bt.value = bt.__value),
                (ze.__value = "College"),
                (ze.value = ze.__value),
                s(Ce, "class", "form-select form-select-sm svelte-1xk55ym"),
                s(Ce, "aria-label", "Default select example"),
                l[12] === void 0 && Ll(() => l[70].call(Ce)),
                s(mt, "class", "form-group svelte-1xk55ym"),
                s(ne, "class", "mb-3"),
                s(st, "class", "btn svelte-1xk55ym"),
                s(te, "class", "form col-lg-6 p-4 m-0 svelte-1xk55ym"),
                ss(d, "class", "lottie-animations svelte-1xk55ym"),
                Ql(d.src, (N = Ya)) || ss(d, "src", N),
                ss(d, "speed", "1"),
                ss(d, "loop", ""),
                ss(d, "nocontrols", ""),
                s(jt, "class", "lottie-container col-lg-6 p-0"),
                s(it, "class", "row justify-content-center align-items-stretch shadow"),
                s(nt, "class", "container pt-5"),
                s(xe, "class", "slide svelte-1xk55ym"),
                s(Nt, "class", "fa fa-filter svelte-1xk55ym"),
                s(X, "type", "text"),
                s(X, "class", "form-control svelte-1xk55ym"),
                s(X, "placeholder", "Search by competition title ..."),
                s(X, "id", "compName"),
                (St.selected = !0),
                (St.__value = "Choose competition status ..."),
                (St.value = St.__value),
                (qt.__value = "Ongoing"),
                (qt.value = qt.__value),
                (De.__value = "Upcoming"),
                (De.value = De.__value),
                (ie.__value = "Finished"),
                (ie.value = ie.__value),
                s(Me, "class", "form-select form-select-sm svelte-1xk55ym"),
                s(Me, "aria-label", "Default select example"),
                s(Me, "id", "compType"),
                l[19] === void 0 && Ll(() => l[79].call(Me)),
                s(ml, "class", "btn btn-light rounded-0 svelte-1xk55ym"),
                s(W, "class", "card menu svelte-1xk55ym"),
                s(Dl, "class", "fa fa-book svelte-1xk55ym"),
                s(Yt, "class", "card-header"),
                ot(Yt, "padding-right", "100px", !1),
                s(tl, "class", "card-body p-0 pt-1 shadow"),
                s(ll, "class", "pagination m-0 p-3 svelte-1xk55ym"),
                s(yt, "class", "form-select svelte-1xk55ym"),
                l[36] === void 0 && Ll(() => l[86].call(yt)),
                s(Jt, "class", "row col-md-6 paginationNav justify-content-center align-items-center svelte-1xk55ym"),
                s(Ft, "class", "container-fluid p-0 pt-3 bg-light d-flex justify-content-center"),
                s(ye, "class", "card col-md-5 comps compt-holder p-0 col-sm-6 shadow mt-0 svelte-1xk55ym"),
                ot(ye, "max-width", "500px"),
                ot(ye, "min-width", "min-content"),
                s(O, "class", "row p-0 m-0 col-md gap-3 justify-content-center align-items-stretch"),
                s(F, "class", "container col-12 p-0 d-flex align-items-center justify-content-center mt-5"),
                s(A, "class", "slide svelte-1xk55ym"),
                s(Ue, "class", "sliderCont svelte-1xk55ym"),
                s(bl, "class", "hide svelte-1xk55ym"),
                s(El, "class", "alertCont svelte-1xk55ym"),
                s(f, "class", "admin-container svelte-1xk55ym"),
                s(kl, "class", "visually-hidden"),
                s(Bt, "class", "spinner-border svelte-1xk55ym"),
                s(Bt, "role", "status"),
                s(Gt, "class", "loading svelte-1xk55ym");
        },
        m(h, G) {
            e(ms.head, t),
                ae(h, u, G),
                ae(h, f, G),
                e(f, _),
                e(f, C),
                e(f, b),
                e(f, P),
                e(f, j),
                e(j, q),
                e(q, I),
                e(I, T),
                e(q, U),
                e(q, R),
                e(R, Y),
                e(q, D),
                e(q, g),
                e(g, L),
                e(L, y),
                e(y, H),
                e(H, ee),
                e(L, J),
                e(L, x),
                e(x, K),
                e(K, $),
                e(L, B),
                Ne && Ne.m(L, null),
                e(L, Pe),
                e(L, ue),
                e(ue, ge),
                e(ge, be),
                e(ge, _t),
                e(ge, pe),
                e(pe, Xe),
                e(ue, Ie),
                e(ue, z),
                e(z, Ee),
                e(Ee, oe),
                e(oe, ke),
                e(oe, de),
                e(z, Q),
                e(z, pt),
                e(pt, Ve),
                e(z, Te),
                e(z, Qe),
                e(Qe, ve),
                e(Qe, Lt),
                l[65](j),
                e(f, rt),
                e(f, Ue),
                e(Ue, xe),
                e(xe, nt),
                e(nt, it),
                e(it, te),
                e(te, le),
                e(le, Le),
                e(le, Qt),
                e(te, ct),
                e(te, vt),
                e(vt, se),
                e(se, Rt),
                e(vt, ol),
                e(vt, je),
                Ht(je, l[9]),
                e(te, ut),
                e(te, dt),
                e(dt, re),
                e(re, Pt),
                e(dt, Mt),
                e(dt, We),
                Ht(We, l[10]),
                e(te, rl),
                e(te, $e),
                e($e, et),
                e(et, Wt),
                e($e, nl),
                e($e, Je),
                e(Je, ce),
                e(ce, Ot);
            for (let M = 0; M < 4; M += 1) sl[M].m(Je, null);
            Ze(Je, l[15]), e(te, tt), e(te, lt), e(lt, fe), e(fe, Ct), e(lt, il), e(lt, Be), e(Be, He), e(He, cl);
            for (let M = 0; M < qe.length; M += 1) qe[M].m(Be, null);
            Ze(Be, l[11]),
                e(te, ul),
                e(te, ne),
                e(ne, mt),
                e(mt, Vt),
                e(Vt, Dt),
                e(mt, dl),
                e(mt, Ce),
                e(Ce, Re),
                e(Re, fl),
                e(Ce, gt),
                e(gt, Ut),
                e(Ce, bt),
                e(bt, Et),
                e(Ce, ze),
                e(ze, hl),
                Ze(Ce, l[12]),
                e(ne, _l),
                Se && Se.m(ne, null),
                e(ne, ft),
                he && he.m(ne, null),
                e(ne, Xt),
                Ye && Ye.m(ne, null),
                e(te, pl),
                e(te, st),
                e(st, kt),
                l[77](te),
                e(it, wt),
                e(it, jt),
                e(jt, d),
                e(Ue, S),
                e(Ue, A),
                e(A, W),
                e(W, Nt),
                e(W, xt),
                e(W, X),
                Ht(X, l[18]),
                e(W, vl),
                e(W, Me),
                e(Me, St),
                e(St, ql),
                e(Me, qt),
                e(qt, Cl),
                e(Me, De),
                e(De, $t),
                e(Me, ie),
                e(ie, el),
                Ze(Me, l[19]),
                e(W, we),
                e(W, ml),
                e(ml, gl),
                l[80](W),
                e(A, w),
                e(A, F),
                e(F, O),
                e(O, ye),
                e(ye, Yt),
                e(Yt, Dl),
                e(Yt, Ge),
                e(ye, wl),
                e(ye, tl),
                me.m(tl, null),
                e(ye, Yl),
                e(ye, Ft),
                e(Ft, Jt),
                e(Jt, ll);
            for (let M = 0; M < Fe.length; M += 1) Fe[M].m(ll, null);
            e(Jt, Nl), e(Jt, yt);
            for (let M = 0; M < 6; M += 1) Ol[M].m(yt, null);
            Ze(yt, l[36]),
                e(O, zt),
                at.m(O, null),
                l[99](O),
                l[100](Ue),
                e(f, Sl),
                e(f, bl),
                e(bl, Fl),
                e(f, Al),
                e(f, El),
                l[101](El),
                ae(h, jl, G),
                ae(h, Gt, G),
                e(Gt, Bt),
                e(Bt, kl),
                e(kl, Jl),
                l[102](Gt),
                Pl ||
                    ((xl = [
                        Z(H, "click", l[62]),
                        Z(K, "click", l[63]),
                        Z(Qe, "click", l[55]),
                        Z(je, "input", l[66]),
                        Z(We, "input", l[67]),
                        Z(Je, "change", l[68]),
                        Z(Be, "change", l[69]),
                        Z(Ce, "change", l[70]),
                        Z(st, "click", l[41]),
                        Z(Nt, "click", l[44]),
                        Z(X, "input", l[78]),
                        Z(Me, "change", l[79]),
                        Z(ml, "click", l[45]),
                        Z(yt, "change", l[86]),
                        Z(yt, "change", l[87]),
                    ]),
                    (Pl = !0));
        },
        p(h, G) {
            if (
                (G[0] & 2 && c !== (c = "App Name| " + h[1]) && (ms.title = c),
                h[38] === "super_admin" ? (Ne ? Ne.p(h, G) : ((Ne = ga(h)), Ne.c(), Ne.m(L, Pe))) : Ne && (Ne.d(1), (Ne = null)),
                G[0] & 2 && Tt(Xe, h[1]),
                G[0] & 1 && Oe !== (Oe = Wl + "/info/" + h[0]) && s(oe, "href", Oe),
                G[1] & 64 && ca(Ee, "active", h[37].url.pathname === "/info"),
                G[0] & 512 && je.value !== h[9] && Ht(je, h[9]),
                G[0] & 1024 && We.value !== h[10] && Ht(We, h[10]),
                G[0] & 32768 && Ze(Je, h[15]),
                G & 0)
            ) {
                al = ua;
                let M;
                for (M = 0; M < al.length; M += 1) {
                    const _e = ma(h, al, M);
                    qe[M] ? qe[M].p(_e, G) : ((qe[M] = ba(_e)), qe[M].c(), qe[M].m(Be, null));
                }
                for (; M < qe.length; M += 1) qe[M].d(1);
                qe.length = al.length;
            }
            if (
                (G[0] & 2048 && Ze(Be, h[11]),
                G[0] & 4096 && Ze(Ce, h[12]),
                h[12] === "School" ? (Se ? Se.p(h, G) : ((Se = Ea(h)), Se.c(), Se.m(ne, ft))) : Se && (Se.d(1), (Se = null)),
                h[12] === "University" ? (he ? he.p(h, G) : ((he = ka(h)), he.c(), he.m(ne, Xt))) : he && (he.d(1), (he = null)),
                h[12] === "College" ? (Ye ? Ye.p(h, G) : ((Ye = Ia(h)), Ye.c(), Ye.m(ne, null))) : Ye && (Ye.d(1), (Ye = null)),
                G[0] & 262144 && X.value !== h[18] && Ht(X, h[18]),
                G[0] & 524288 && Ze(Me, h[19]),
                Hl === (Hl = Bl(h)) && me ? me.p(h, G) : (me.d(1), (me = Hl(h)), me && (me.c(), me.m(tl, null))),
                (G[0] & 131072) | (G[1] & 2080))
            ) {
                yl = Array(Math.ceil(h[17] / h[36]));
                let M;
                for (M = 0; M < yl.length; M += 1) {
                    const _e = ha(h, yl, M);
                    Fe[M] ? Fe[M].p(_e, G) : ((Fe[M] = Ca(_e)), Fe[M].c(), Fe[M].m(ll, null));
                }
                for (; M < Fe.length; M += 1) Fe[M].d(1);
                Fe.length = yl.length;
            }
            G[1] & 32 && Ze(yt, h[36]), Rl === (Rl = $l(h)) && at ? at.p(h, G) : (at.d(1), (at = Rl(h)), at && (at.c(), at.m(O, null)));
        },
        i: At,
        o: At,
        d(h) {
            o(t),
                h && o(u),
                h && o(f),
                Ne && Ne.d(),
                l[65](null),
                Kt(sl, h),
                Kt(qe, h),
                Se && Se.d(),
                he && he.d(),
                Ye && Ye.d(),
                l[77](null),
                l[80](null),
                me.d(),
                Kt(Fe, h),
                Kt(Ol, h),
                at.d(),
                l[99](null),
                l[100](null),
                l[101](null),
                h && o(jl),
                h && o(Gt),
                l[102](null),
                (Pl = !1),
                Xl(xl);
        },
    };
}
function no(l, t, a) {
    let c, u, f, _, p, C, b, P, j, q, I, T, V, U, R, Y, D;
    Oa(l, ja, (d) => a(37, (D = d)));
    let g = D.data,
        { userInfo: L = g.userInfo, competitionsInfo: y = g.competitionsInfo, access_token: H = g.access_token } = t,
        { permission: ee = g.permission, API: J = g.API } = t,
        { real_id: x = g.real_id } = t;
    qa();
    let K = "",
        $ = ["1 (bachelor / specialty)", "2 (bachelor / specialty)", "3 (bachelor / specialty)", "4 (bachelor / specialty)", "5 (specialty)", "6 (specialty)", "1 (master)", "2 (master)"],
        B = "",
        Pe = "",
        ue = "",
        ge = "",
        be = "",
        Ke = [],
        _t = "";
    function pe(d) {
        Xe(d),
            d === "Users"
                ? (a(16, (ve.style.visibility = "hidden"), ve), localStorage.setItem("oldLocation", d), a(4, (ue.style.marginLeft = "0px"), ue))
                : (localStorage.setItem("oldLocation", d), a(4, (ue.style.marginLeft = "-100vw"), ue), a(16, (ve.style.visibility = "visible"), ve));
    }
    function Xe(d) {
        let N = _t.querySelectorAll(".nav-link");
        for (let S in N) if (N[S].nodeName == "SPAN" && N[S].id === d && N[S].classList.contains("active")) return;
        for (let S = 0; S < N.length; S++) N[S].nodeName == "SPAN" && N[S].classList.toggle("active");
    }
    let Ie, z, Ee, oe, ke, de, Oe;
    oe = "Choose...";
    let Q = {
        email: "",
        search: "",
        region: "",
        institution_type: "",
        institution_name: "",
        institution_course: "",
        permission: "",
    };
    function pt() {
        if (
            ((Q.email = Ie),
            (Q.search = z),
            (Q.region = Ee),
            (Q.institution_type = oe),
            (Q.institution_name = ke),
            (Q.institution_course = de),
            (Q.permission = Oe),
            Object.values(Q).every((S) => S === void 0))
        ) {
            a(
                2,
                (B.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please fill at least one field.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                B
            );
            return;
        }
        for (let S in Q) (Q[S] === "" || Q[S] == "Choose..." || Q[S] == null) && (Q[S] = void 0);
        a(2, (B.innerHTML = ""), B), (Q = JSON.parse(JSON.stringify(Q)));
        const N = new URLSearchParams(Q);
        window.location.href = `${Wl}/admin/${x}/users/${N.toString()}`;
    }
    let Ve = [];
    function Te(d) {
        let N = d * c,
            S = N + c;
        S > rt && (S = f.length);
        for (let A = 0; A < rt; A++) Ke[A].classList.add("hide");
        for (let A = N; A < S; A++) Ke[A].classList.remove("hide");
    }
    function Qe(d) {
        let N = d * u,
            S = N + u;
        S > p && (S = p);
        for (let A = 0; A < p; A++) le[A].classList.add("hide");
        for (let A = N; A < S; A++) le[A].classList.remove("hide");
    }
    let ve = "";
    function Lt() {
        ve.style.marginRight == "0px" ? a(16, (ve.style.marginRight = "-220px"), ve) : a(16, (ve.style.marginRight = "0px"), ve);
    }
    let rt = Ve.length,
        Ue = "",
        xe = "Choose competition status ...";
    function nt() {
        a(
            34,
            (f = Ve.filter((d) => {
                let N = new Date();
                if (Ue !== "" && d.name.toLowerCase().indexOf(Ue.toLowerCase()) === -1) return !1;
                if (xe !== "Choose competition status ...") {
                    let S = "",
                        A = new Date(d.registration_start),
                        W = new Date(d.registration_end);
                    if ((A > N ? (S = "Upcoming") : W > N ? (S = "Ongoing") : (S = "Finished"), S !== xe)) return !1;
                }
                return !0;
            }))
        ),
            a(17, (rt = f.length)),
            setTimeout(() => {
                Te(0);
            }, 0);
    }
    let it = ["1 course", "2 course", "3 course", "4 course", "5 course"];
    async function te(d) {
        let N = {};
        await fetch(`${J}/competitions/${d}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${H}`,
            },
        })
            .then((X) => X.json())
            .then((X) => {
                N = X;
            });
        let S = N.registration_start.replace("Z", "").trim().split("T"),
            A = N.registration_end.replace("Z", "").trim().split("T"),
            W = N.started_at.replace("Z", "").trim().split("T");
        a(33, (b = N.id)),
            a(32, (P = N.name)),
            a(31, (j = S[0] + ", at: " + S[1].split(":").slice(0, -1).join(":"))),
            a(30, (q = A[0] + ", at: " + A[1].split(":").slice(0, -1).join(":"))),
            a(29, (I = W[0] + ", at: " + W[1].split(":").slice(0, -1).join(":"))),
            a(28, (T = N.link)),
            a(27, (V = N.persons_amount)),
            a(26, (U = N.request_template)),
            a(25, (R = N.admins));
        let Nt = [],
            xt = be.classList.contains("align-items-stretch");
        if (!R.includes(x) && ee != "super_admin") {
            a(23, (_ = "")), alert("You are not a monitor for this competition!"), xt || be.classList.add("align-items-stretch");
            return;
        }
        xt && (be.classList.remove("align-items-stretch"), be.classList.add("align-items-start")),
            await fetch(`${J}/competitions/${N.id}/requests`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + H,
                },
            })
                .then((X) => X.json())
                .then((X) => {
                    (Nt = X), a(24, (p = X.length));
                })
                .catch((X) => {
                    alert(X);
                }),
            a(23, (_ = "comp")),
            a(22, (C = Nt));
    }
    let le = [],
        Le = new Set();
    function Qt(d) {
        let N = le[d].children[0].children[0],
            S = le[d],
            A = parseInt(S.id);
        Le.has(A) ? (Le.delete(A), N.classList.remove("fa-check-square"), N.classList.add("fa-square-o")) : (Le.add(A), N.classList.remove("fa-square-o"), N.classList.add("fa-check-square"));
    }
    let ct = "";
    function vt() {
        for (let d = 0; d < le.length; d++) {
            let N = le[d].children[0].children[0],
                S = le[d],
                A = parseInt(S.id);
            Le.has(A)
                ? (Le.delete(A), N.classList.remove("fa-check-square"), N.classList.add("fa-square-o"), a(21, (ct.innerHTML = ">> Select All"), ct))
                : (Le.add(A), N.classList.remove("fa-square-o"), N.classList.add("fa-check-square"), a(21, (ct.innerHTML = ">> Deselect All"), ct));
        }
    }
    let se = new Set();
    function Rt() {
        se = new Set();
        for (let d = 0; d < C.length; d++) Le.has(C[d].id) && se.add(C[d]);
    }
    async function ol() {
        if ((Rt(), console.log(se), se.size === 0)) {
            a(
                2,
                (B.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please sellect at least one user.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                B
            );
            return;
        }
        a(2, (B.innerHTML = ""), B);
        let d = prompt("Enter file name:", "New request");
        if (!d) return;
        d == null && (d = "New request");
        for (let W of se) W.participants = W.participants.join(", ");
        let N = JSON.parse(JSON.stringify(Array.from(se))),
            S = Cs.book_new(),
            A = Cs.json_to_sheet(N);
        Cs.book_append_sheet(S, A, "Sheet1"), Ba(S, `${d}.xlsx`);
    }
    Va(() => {
        L.name == null && a(1, (K = L.email || L.phone || "")),
            L.surname ? a(1, (K = L.name + " " + L.surname)) : a(1, (K = L.name || L.email || L.phone || "")),
            a(61, (Ve = y)),
            a(3, (Pe.style.display = "none"), Pe),
            nt();
        {
            let d = localStorage.getItem("oldLocation");
            d == null || d == null || d == "" ? localStorage.setItem("basicNav", "users") : d == "users" ? pe("users") : pe("comp");
        }
        Te(0), Qe(0);
    });
    async function je(d) {
        if (isNaN(d)) {
            a(
                2,
                (B.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Something went wrong.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                B
            );
            return;
        }
        !confirm("Are you sure you want to delete this competition?") ||
            (await fetch(`${J}/competitions/${d}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + H,
                },
            })
                .then((S) => S.json())
                .then((S) => {
                    a(
                        2,
                        (B.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
											<strong>Success!</strong> ${S.message}
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                        B
                    );
                })
                .catch((S) => {
                    console.error(S);
                })
                .finally(() => {
                    window.location.reload();
                }));
    }
    async function ut(d) {
        if (!confirm("Are you sure you want to accept this application?")) return;
        let S = prompt("Enter description:", "Accepted");
        await fetch(`${J}/requests/${d}/process`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + H,
            },
            body: JSON.stringify({ status: "accepted", description: S }),
        })
            .then((A) => {
                A.status == 200
                    ? (a(
                          2,
                          (B.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
											<strong>Success!</strong>
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                          B
                      ),
                      window.location.reload())
                    : a(
                          2,
                          (B.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
											<strong>Error!</strong> Something went wrong.
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                          B
                      );
            })
            .catch((A) => {
                console.error(A);
            });
    }
    async function dt(d) {
        if (!confirm("Are you sure you want to reject this application?")) return;
        let S = prompt("Enter description:", "Rejected");
        await fetch(`${J}/requests/${d}/process`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + H,
            },
            body: JSON.stringify({ status: "rejected", description: S }),
        })
            .then((A) => {
                A.status == 200
                    ? (a(
                          2,
                          (B.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
											<strong>Success!</strong>
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                          B
                      ),
                      window.location.reload())
                    : a(
                          2,
                          (B.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
											<strong>Error!</strong> Something went wrong.
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                          B
                      );
            })
            .catch((A) => {
                console.error(A);
            });
    }
    function re(d) {
        let N = document.createElement("a");
        (N.href = `${Wl}/admin/requests/${d}`), N.click();
    }
    function Pt() {
        localStorage.clear(), (window.location.href = Wl + "/");
    }
    const Mt = () => pe("Users"),
        We = () => pe("Competitions"),
        rl = () => (window.location.href = "./contests/create-competition");
    function $e(d) {
        Zt[d ? "unshift" : "push"](() => {
            (_t = d), a(8, _t);
        });
    }
    function et() {
        (Ie = this.value), a(9, Ie);
    }
    function Wt() {
        (z = this.value), a(10, z);
    }
    function nl() {
        (Oe = Tl(this)), a(15, Oe);
    }
    function Je() {
        (Ee = Tl(this)), a(11, Ee);
    }
    function ce() {
        (oe = Tl(this)), a(12, oe);
    }
    function Ot() {
        (ke = this.value), a(13, ke);
    }
    function tt() {
        (de = Tl(this)), a(14, de);
    }
    function lt() {
        (ke = this.value), a(13, ke);
    }
    function fe() {
        (de = Tl(this)), a(14, de);
    }
    function Ct() {
        (ke = this.value), a(13, ke);
    }
    function il() {
        (de = Tl(this)), a(14, de);
    }
    function Be(d) {
        Zt[d ? "unshift" : "push"](() => {
            (ge = d), a(5, ge);
        });
    }
    function He() {
        (Ue = this.value), a(18, Ue);
    }
    function cl() {
        (xe = Tl(this)), a(19, xe);
    }
    function ul(d) {
        Zt[d ? "unshift" : "push"](() => {
            (ve = d), a(16, ve);
        });
    }
    const ne = (d) => te(d.id);
    function mt(d, N) {
        Zt[d ? "unshift" : "push"](() => {
            (Ke[N] = d), a(7, Ke);
        });
    }
    const Vt = (d) => te(d.id);
    function Dt(d, N) {
        Zt[d ? "unshift" : "push"](() => {
            (Ke[N] = d), a(7, Ke);
        });
    }
    const dl = (d) => Te(d);
    function Ce() {
        (c = Tl(this)), a(36, c);
    }
    const Re = () => Te(0),
        fl = (d) => Qt(d),
        gt = (d) => ut(d.id),
        Ut = (d) => dt(d.id),
        bt = (d) => re(d.id);
    function Et(d, N) {
        Zt[d ? "unshift" : "push"](() => {
            (le[N] = d), a(20, le);
        });
    }
    function ze(d) {
        Zt[d ? "unshift" : "push"](() => {
            (ct = d), a(21, ct);
        });
    }
    const hl = (d) => Qe(d);
    function _l() {
        (u = Tl(this)), a(35, u);
    }
    const ft = () => Qe(0),
        Xt = () => (window.location.href = Wl + "contests/" + b),
        pl = () => je(b);
    function st(d) {
        Zt[d ? "unshift" : "push"](() => {
            (be = d), a(6, be);
        });
    }
    function kt(d) {
        Zt[d ? "unshift" : "push"](() => {
            (ue = d), a(4, ue);
        });
    }
    function wt(d) {
        Zt[d ? "unshift" : "push"](() => {
            (B = d), a(2, B);
        });
    }
    function jt(d) {
        Zt[d ? "unshift" : "push"](() => {
            (Pe = d), a(3, Pe);
        });
    }
    return (
        (l.$$set = (d) => {
            "userInfo" in d && a(56, (L = d.userInfo)),
                "competitionsInfo" in d && a(57, (y = d.competitionsInfo)),
                "access_token" in d && a(58, (H = d.access_token)),
                "permission" in d && a(59, (ee = d.permission)),
                "API" in d && a(60, (J = d.API)),
                "real_id" in d && a(0, (x = d.real_id));
        }),
        (l.$$.update = () => {
            l.$$.dirty[1] & 1073741824 && a(34, (f = Ve)), l.$$.dirty[1] & 268435456 && a(38, (Y = ee));
        }),
        a(36, (c = 20)),
        a(35, (u = 5)),
        a(23, (_ = "")),
        a(24, (p = 0)),
        a(22, (C = [])),
        a(33, (b = 0)),
        a(32, (P = "")),
        a(31, (j = "")),
        a(30, (q = "")),
        a(29, (I = "")),
        a(28, (T = "")),
        a(27, (V = 0)),
        a(26, (U = "")),
        a(25, (R = [])),
        [
            x,
            K,
            B,
            Pe,
            ue,
            ge,
            be,
            Ke,
            _t,
            Ie,
            z,
            Ee,
            oe,
            ke,
            de,
            Oe,
            ve,
            rt,
            Ue,
            xe,
            le,
            ct,
            C,
            _,
            p,
            R,
            U,
            V,
            T,
            I,
            q,
            j,
            P,
            b,
            f,
            u,
            c,
            D,
            Y,
            $,
            pe,
            pt,
            Te,
            Qe,
            Lt,
            nt,
            it,
            te,
            Qt,
            vt,
            ol,
            je,
            ut,
            dt,
            re,
            Pt,
            L,
            y,
            H,
            ee,
            J,
            Ve,
            Mt,
            We,
            rl,
            $e,
            et,
            Wt,
            nl,
            Je,
            ce,
            Ot,
            tt,
            lt,
            fe,
            Ct,
            il,
            Be,
            He,
            cl,
            ul,
            ne,
            mt,
            Vt,
            Dt,
            dl,
            Ce,
            Re,
            fl,
            gt,
            Ut,
            bt,
            Et,
            ze,
            hl,
            _l,
            ft,
            Xt,
            pl,
            st,
            kt,
            wt,
            jt,
        ]
    );
}
class go extends Na {
    constructor(t) {
        super(),
            Sa(
                this,
                t,
                no,
                ro,
                Aa,
                {
                    userInfo: 56,
                    competitionsInfo: 57,
                    access_token: 58,
                    permission: 59,
                    API: 60,
                    real_id: 0,
                },
                null,
                [-1, -1, -1, -1, -1]
            );
    }
}
export { go as default };
