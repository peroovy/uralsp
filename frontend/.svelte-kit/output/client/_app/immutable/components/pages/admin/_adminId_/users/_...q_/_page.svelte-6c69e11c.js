import {
    S as bs,
    i as gs,
    s as Es,
    k as i,
    a as T,
    q as S,
    e as $l,
    D as ws,
    l as n,
    m as c,
    h as r,
    c as D,
    r as O,
    E as Tl,
    n as a,
    B as e,
    b as z,
    A as Se,
    I as Is,
    o as ys,
    J as ks,
    K as et,
    L as tt,
    M as lt,
    p as Ne,
    N as Ce,
    O as ne,
    P as Q,
    Q as ze,
    R as ht,
    T as dt,
    u as vs,
} from "../../../../../../chunks/index-af757d0f.js";
import { d as Ls } from "../../../../../../chunks/dots-63d78b83.js";
import { b as $t } from "../../../../../../chunks/paths-9678c1af.js";
import { u as ft, w as es } from "../../../../../../chunks/xlsx-84570272.js";
import { p as Ts } from "../../../../../../chunks/stores-0b118143.js";
import { r as ts } from "../../../../../../chunks/republics-74048aea.js";
import { s as Ds } from "../../../../../../chunks/sessionDuration-e379fb60.js";
const Ns = "" + new URL("../../../../../../assets/lottie-notFound-94fa8d3d.json", import.meta.url).href;
const { document: Ll } = ks;
function Cs(l, t, s) {
    const o = l.slice();
    return (o[69] = t[s]), o;
}
function ls(l, t, s) {
    const o = l.slice();
    return (o[72] = t[s]), (o[69] = s), o;
}
function ss(l, t, s) {
    const o = l.slice();
    return (o[74] = t[s]), (o[75] = t), (o[69] = s), o;
}
function as(l, t, s) {
    const o = l.slice();
    return (o[76] = t[s]), o;
}
function rs(l, t, s) {
    const o = l.slice();
    return (o[76] = t[s]), o;
}
function Ss(l, t, s) {
    const o = l.slice();
    return (o[72] = t[s]), (o[69] = s), o;
}
function os(l, t, s) {
    const o = l.slice();
    return (o[82] = t[s]), o;
}
function Os(l, t, s) {
    const o = l.slice();
    return (o[85] = t[s]), o;
}
function Vs(l) {
    let t,
        s,
        o,
        h,
        p,
        k,
        v,
        E,
        g,
        N,
        C,
        L,
        d,
        m,
        q,
        U,
        j,
        M,
        y,
        f,
        w,
        b,
        V,
        H,
        J,
        F,
        G,
        R,
        A,
        _e,
        fe,
        Ge,
        X,
        _t,
        we,
        Oe,
        Ke,
        vt,
        re,
        We,
        ve,
        Ue,
        pt,
        mt,
        ie,
        pe,
        bt,
        gt,
        Ie,
        je,
        Et,
        wt,
        oe,
        me,
        It,
        yt,
        Z,
        ye,
        qe,
        kt,
        Lt,
        x,
        be,
        Tt,
        ke,
        Dt,
        Le,
        Nt,
        Te,
        Ct,
        u,
        P,
        B,
        K,
        ce,
        st,
        jt,
        De,
        Xe,
        el,
        at,
        Me,
        Ze,
        tl,
        ge,
        ll,
        Ve,
        rt,
        sl,
        ue,
        Pe,
        St,
        al,
        rl,
        Ae,
        Ot,
        ol,
        il,
        Be,
        Vt,
        nl,
        cl,
        He,
        Ee,
        Pt,
        ul,
        dl,
        Re,
        ot,
        Ye,
        fl,
        hl,
        it,
        Je,
        _l,
        qt,
        xe,
        Mt,
        $e,
        vl,
        pl,
        Dl,
        ps = ["default", "teacher", "admin", "super_admin"],
        At = [];
    for (let _ = 0; _ < 4; _ += 1) At[_] = Bs(Os(l, ps, _));
    let nt = ts,
        $ = [];
    for (let _ = 0; _ < nt.length; _ += 1) $[_] = is(os(l, nt, _));
    let ee = l[9] === "School" && ns(l),
        te = l[9] === "University" && cs(l),
        le = l[9] === "College" && ds(l),
        ct = l[14],
        se = [];
    for (let _ = 0; _ < ct.length; _ += 1) se[_] = hs(ss(l, ct, _));
    let ut = Array(Math.ceil(l[15] / l[16])),
        ae = [];
    for (let _ = 0; _ < ut.length; _ += 1) ae[_] = _s(ls(l, ut, _));
    let ms = [5, 10, 15, 20, 25, 50],
        Bt = [];
    for (let _ = 0; _ < 6; _ += 1) Bt[_] = Ms(Cs(l, ms, _));
    return {
        c() {
            (t = i("section")),
                (s = i("img")),
                (h = T()),
                (p = i("div")),
                (k = T()),
                (v = i("nav")),
                (E = i("div")),
                (g = i("div")),
                (N = i("span")),
                (C = T()),
                (L = i("h4")),
                (d = S("Search results")),
                (m = T()),
                (q = i("div")),
                (U = i("button")),
                (j = i("i")),
                (M = S(`\r
						Back`)),
                (y = T()),
                (f = i("div")),
                (w = i("div")),
                (b = i("div")),
                (V = i("h4")),
                (H = i("span")),
                (J = S(`\r
						Filter`)),
                (F = T()),
                (G = i("div")),
                (R = i("div")),
                (A = i("div")),
                (_e = i("label")),
                (fe = S("Email address")),
                (Ge = T()),
                (X = i("input")),
                (_t = T()),
                (we = i("div")),
                (Oe = i("label")),
                (Ke = S("First name, surname or patronymic")),
                (vt = T()),
                (re = i("input")),
                (We = T()),
                (ve = i("div")),
                (Ue = i("label")),
                (pt = S("Permission")),
                (mt = T()),
                (ie = i("select")),
                (pe = i("option")),
                (bt = S("Choose..."));
            for (let _ = 0; _ < 4; _ += 1) At[_].c();
            (gt = T()), (Ie = i("div")), (je = i("label")), (Et = S("Region")), (wt = T()), (oe = i("select")), (me = i("option")), (It = S("Choose..."));
            for (let _ = 0; _ < $.length; _ += 1) $[_].c();
            (yt = T()),
                (Z = i("div")),
                (ye = i("div")),
                (qe = i("label")),
                (kt = S("Education type")),
                (Lt = T()),
                (x = i("select")),
                (be = i("option")),
                (Tt = S("Choose...")),
                (ke = i("option")),
                (Dt = S("School")),
                (Le = i("option")),
                (Nt = S("University")),
                (Te = i("option")),
                (Ct = S("College")),
                (u = T()),
                ee && ee.c(),
                (P = T()),
                te && te.c(),
                (B = T()),
                le && le.c(),
                (K = T()),
                (ce = i("button")),
                (st = S("Search")),
                (jt = T()),
                (De = i("div")),
                (Xe = i("div"));
            for (let _ = 0; _ < se.length; _ += 1) se[_].c();
            (el = T()), (at = i("div")), (Me = i("div")), (Ze = i("ul"));
            for (let _ = 0; _ < ae.length; _ += 1) ae[_].c();
            (tl = T()), (ge = i("select"));
            for (let _ = 0; _ < 6; _ += 1) Bt[_].c();
            (ll = T()),
                (Ve = i("div")),
                (rt = i("i")),
                (sl = T()),
                (ue = i("div")),
                (Pe = i("button")),
                (St = i("i")),
                (al = S(`\r
					Select all`)),
                (rl = T()),
                (Ae = i("button")),
                (Ot = i("i")),
                (ol = S(`\r
					Deselect all`)),
                (il = T()),
                (Be = i("button")),
                (Vt = i("i")),
                (nl = S(`\r
					Merge selected`)),
                (cl = T()),
                (He = i("div")),
                (Ee = i("button")),
                (Pt = i("i")),
                (ul = S(`\r
						Download selected`)),
                (dl = T()),
                (Re = i("ul")),
                (ot = i("li")),
                (Ye = i("span")),
                (fl = S("CSV")),
                (hl = T()),
                (it = i("li")),
                (Je = i("span")),
                (_l = S("Excel (.xlsx)")),
                (qt = T()),
                (xe = i("div")),
                (Mt = T()),
                ($e = i("div")),
                (vl = S("keephideClass")),
                this.h();
        },
        l(_) {
            t = n(_, "SECTION", { class: !0 });
            var Y = c(t);
            (s = n(Y, "IMG", { class: !0, src: !0, alt: !0 })), (h = D(Y)), (p = n(Y, "DIV", { class: !0 })), c(p).forEach(r), (k = D(Y)), (v = n(Y, "NAV", { class: !0 }));
            var I = c(v);
            E = n(I, "DIV", { class: !0 });
            var de = c(E);
            g = n(de, "DIV", { class: !0 });
            var Ht = c(g);
            (N = n(Ht, "SPAN", { class: !0 })), c(N).forEach(r), (C = D(Ht)), (L = n(Ht, "H4", { class: !0 }));
            var Nl = c(L);
            (d = O(Nl, "Search results")), Nl.forEach(r), Ht.forEach(r), (m = D(de)), (q = n(de, "DIV", { class: !0 }));
            var Cl = c(q);
            U = n(Cl, "BUTTON", { class: !0 });
            var ml = c(U);
            (j = n(ml, "I", { class: !0 })),
                c(j).forEach(r),
                (M = O(
                    ml,
                    `\r
						Back`
                )),
                ml.forEach(r),
                Cl.forEach(r),
                de.forEach(r),
                I.forEach(r),
                (y = D(Y)),
                (f = n(Y, "DIV", { class: !0 }));
            var Sl = c(f);
            w = n(Sl, "DIV", { class: !0 });
            var Rt = c(w);
            b = n(Rt, "DIV", { class: !0, style: !0 });
            var Yt = c(b);
            V = n(Yt, "H4", { class: !0 });
            var bl = c(V);
            (H = n(bl, "SPAN", { class: !0 })),
                c(H).forEach(r),
                (J = O(
                    bl,
                    `\r
						Filter`
                )),
                bl.forEach(r),
                (F = D(Yt)),
                (G = n(Yt, "DIV", { class: !0 }));
            var Ol = c(G);
            R = n(Ol, "DIV", { class: !0 });
            var he = c(R);
            A = n(he, "DIV", { class: !0 });
            var Jt = c(A);
            _e = n(Jt, "LABEL", { for: !0, class: !0 });
            var Vl = c(_e);
            (fe = O(Vl, "Email address")),
                Vl.forEach(r),
                (Ge = D(Jt)),
                (X = n(Jt, "INPUT", {
                    type: !0,
                    class: !0,
                    id: !0,
                    "aria-describedby": !0,
                    placeholder: !0,
                })),
                Jt.forEach(r),
                (_t = D(he)),
                (we = n(he, "DIV", { class: !0 }));
            var Ft = c(we);
            Oe = n(Ft, "LABEL", { for: !0, class: !0 });
            var Pl = c(Oe);
            (Ke = O(Pl, "First name, surname or patronymic")),
                Pl.forEach(r),
                (vt = D(Ft)),
                (re = n(Ft, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })),
                Ft.forEach(r),
                (We = D(he)),
                (ve = n(he, "DIV", { class: !0 }));
            var Qt = c(ve);
            Ue = n(Qt, "LABEL", { for: !0 });
            var Al = c(Ue);
            (pt = O(Al, "Permission")), Al.forEach(r), (mt = D(Qt)), (ie = n(Qt, "SELECT", { class: !0, "aria-label": !0 }));
            var gl = c(ie);
            pe = n(gl, "OPTION", {});
            var Bl = c(pe);
            (bt = O(Bl, "Choose...")), Bl.forEach(r);
            for (let W = 0; W < 4; W += 1) At[W].l(gl);
            gl.forEach(r), Qt.forEach(r), (gt = D(he)), (Ie = n(he, "DIV", { class: !0 }));
            var zt = c(Ie);
            je = n(zt, "LABEL", { for: !0 });
            var Ul = c(je);
            (Et = O(Ul, "Region")), Ul.forEach(r), (wt = D(zt)), (oe = n(zt, "SELECT", { class: !0, "aria-label": !0 }));
            var El = c(oe);
            me = n(El, "OPTION", {});
            var jl = c(me);
            (It = O(jl, "Choose...")), jl.forEach(r);
            for (let W = 0; W < $.length; W += 1) $[W].l(El);
            El.forEach(r), zt.forEach(r), (yt = D(he)), (Z = n(he, "DIV", { class: !0 }));
            var Fe = c(Z);
            ye = n(Fe, "DIV", { class: !0 });
            var Gt = c(ye);
            qe = n(Gt, "LABEL", { for: !0 });
            var ql = c(qe);
            (kt = O(ql, "Education type")), ql.forEach(r), (Lt = D(Gt)), (x = n(Gt, "SELECT", { class: !0, "aria-label": !0 }));
            var Ut = c(x);
            be = n(Ut, "OPTION", {});
            var Ml = c(be);
            (Tt = O(Ml, "Choose...")), Ml.forEach(r), (ke = n(Ut, "OPTION", {}));
            var Hl = c(ke);
            (Dt = O(Hl, "School")), Hl.forEach(r), (Le = n(Ut, "OPTION", {}));
            var Rl = c(Le);
            (Nt = O(Rl, "University")), Rl.forEach(r), (Te = n(Ut, "OPTION", {}));
            var Yl = c(Te);
            (Ct = O(Yl, "College")),
                Yl.forEach(r),
                Ut.forEach(r),
                Gt.forEach(r),
                (u = D(Fe)),
                ee && ee.l(Fe),
                (P = D(Fe)),
                te && te.l(Fe),
                (B = D(Fe)),
                le && le.l(Fe),
                Fe.forEach(r),
                (K = D(he)),
                (ce = n(he, "BUTTON", { class: !0 }));
            var Jl = c(ce);
            (st = O(Jl, "Search")), Jl.forEach(r), he.forEach(r), Ol.forEach(r), Yt.forEach(r), (jt = D(Rt)), (De = n(Rt, "DIV", { class: !0, style: !0 }));
            var Kt = c(De);
            Xe = n(Kt, "DIV", { class: !0 });
            var Fl = c(Xe);
            for (let W = 0; W < se.length; W += 1) se[W].l(Fl);
            Fl.forEach(r), (el = D(Kt)), (at = n(Kt, "DIV", { class: !0 }));
            var Ql = c(at);
            Me = n(Ql, "DIV", { class: !0 });
            var Wt = c(Me);
            Ze = n(Wt, "UL", { class: !0 });
            var zl = c(Ze);
            for (let W = 0; W < ae.length; W += 1) ae[W].l(zl);
            zl.forEach(r), (tl = D(Wt)), (ge = n(Wt, "SELECT", { class: !0 }));
            var Gl = c(ge);
            for (let W = 0; W < 6; W += 1) Bt[W].l(Gl);
            Gl.forEach(r), Wt.forEach(r), Ql.forEach(r), Kt.forEach(r), Rt.forEach(r), Sl.forEach(r), (ll = D(Y)), (Ve = n(Y, "DIV", { class: !0 }));
            var Xt = c(Ve);
            (rt = n(Xt, "I", { class: !0 })), c(rt).forEach(r), (sl = D(Xt)), (ue = n(Xt, "DIV", { class: !0, role: !0 }));
            var Qe = c(ue);
            Pe = n(Qe, "BUTTON", { type: !0, class: !0 });
            var wl = c(Pe);
            (St = n(wl, "I", { class: !0 })),
                c(St).forEach(r),
                (al = O(
                    wl,
                    `\r
					Select all`
                )),
                wl.forEach(r),
                (rl = D(Qe)),
                (Ae = n(Qe, "BUTTON", { type: !0, class: !0 }));
            var Il = c(Ae);
            (Ot = n(Il, "I", { class: !0 })),
                c(Ot).forEach(r),
                (ol = O(
                    Il,
                    `\r
					Deselect all`
                )),
                Il.forEach(r),
                (il = D(Qe)),
                (Be = n(Qe, "BUTTON", { type: !0, class: !0 }));
            var yl = c(Be);
            (Vt = n(yl, "I", { class: !0 })),
                c(Vt).forEach(r),
                (nl = O(
                    yl,
                    `\r
					Merge selected`
                )),
                yl.forEach(r),
                (cl = D(Qe)),
                (He = n(Qe, "DIV", { class: !0 }));
            var Zt = c(He);
            Ee = n(Zt, "BUTTON", {
                class: !0,
                type: !0,
                id: !0,
                "data-bs-toggle": !0,
                "aria-expanded": !0,
            });
            var kl = c(Ee);
            (Pt = n(kl, "I", { class: !0 })),
                c(Pt).forEach(r),
                (ul = O(
                    kl,
                    `\r
						Download selected`
                )),
                kl.forEach(r),
                (dl = D(Zt)),
                (Re = n(Zt, "UL", { class: !0 }));
            var xt = c(Re);
            ot = n(xt, "LI", { class: !0 });
            var Kl = c(ot);
            Ye = n(Kl, "SPAN", { class: !0 });
            var Wl = c(Ye);
            (fl = O(Wl, "CSV")), Wl.forEach(r), Kl.forEach(r), (hl = D(xt)), (it = n(xt, "LI", { class: !0 }));
            var Xl = c(it);
            Je = n(Xl, "SPAN", { class: !0 });
            var Zl = c(Je);
            (_l = O(Zl, "Excel (.xlsx)")),
                Zl.forEach(r),
                Xl.forEach(r),
                xt.forEach(r),
                Zt.forEach(r),
                Qe.forEach(r),
                Xt.forEach(r),
                Y.forEach(r),
                (qt = D(_)),
                (xe = n(_, "DIV", { class: !0 })),
                c(xe).forEach(r),
                (Mt = D(_)),
                ($e = n(_, "DIV", { class: !0 }));
            var xl = c($e);
            (vl = O(xl, "keephideClass")), xl.forEach(r), this.h();
        },
        h() {
            a(s, "class", "d1 svelte-pvwixh"),
                Tl(s.src, (o = Ls)) || a(s, "src", o),
                a(s, "alt", ""),
                a(p, "class", "d2 svelte-pvwixh"),
                a(N, "class", "fa fa-group ms-3 me-3"),
                a(L, "class", "p-0 m-0"),
                a(g, "class", "navbar-brand d-flex col align-items-center"),
                a(j, "class", "fa fa-arrow-left"),
                a(U, "class", "btn d-flex gap-3 align-items-center svelte-pvwixh"),
                a(q, "class", "navbar-nav"),
                a(E, "class", "container"),
                a(v, "class", "navbar navbar-expand-sm navbar-light sticky-top shadow svelte-pvwixh"),
                a(H, "class", "fa fa-search"),
                a(V, "class", "card-header"),
                a(_e, "for", "email"),
                a(_e, "class", "form-label mb-0"),
                a(X, "type", "email"),
                a(X, "class", "form-control svelte-pvwixh"),
                a(X, "id", "email"),
                a(X, "aria-describedby", "emailHelp"),
                a(X, "placeholder", "Enter the user email"),
                a(A, "class", "mb-3"),
                a(Oe, "for", "fullName"),
                a(Oe, "class", "form-label mb-0"),
                a(re, "type", "text"),
                a(re, "class", "form-control svelte-pvwixh"),
                a(re, "id", "fullName"),
                a(re, "placeholder", "Enter the user name"),
                a(we, "class", "mb-3"),
                a(Ue, "for", "region"),
                (pe.selected = !0),
                (pe.__value = "Choose..."),
                (pe.value = pe.__value),
                a(ie, "class", "form-select form-select-sm svelte-pvwixh"),
                a(ie, "aria-label", "Default select example"),
                l[12] === void 0 && lt(() => l[39].call(ie)),
                a(ve, "class", "mb-3"),
                a(je, "for", "region"),
                (me.selected = !0),
                (me.__value = "Choose..."),
                (me.value = me.__value),
                a(oe, "class", "form-select form-select-sm svelte-pvwixh"),
                a(oe, "aria-label", "Default select example"),
                l[8] === void 0 && lt(() => l[40].call(oe)),
                a(Ie, "class", "mb-3"),
                a(qe, "for", "education"),
                (be.selected = !0),
                (be.__value = "Choose..."),
                (be.value = be.__value),
                (ke.__value = "School"),
                (ke.value = ke.__value),
                (Le.__value = "University"),
                (Le.value = Le.__value),
                (Te.__value = "College"),
                (Te.value = Te.__value),
                a(x, "class", "form-select form-select-sm svelte-pvwixh"),
                a(x, "aria-label", "Default select example"),
                l[9] === void 0 && lt(() => l[41].call(x)),
                a(ye, "class", "form-group"),
                a(Z, "class", "mb-3"),
                a(ce, "class", "btn svelte-pvwixh"),
                a(R, "class", "form p-4 m-0 svelte-pvwixh"),
                a(G, "class", "card-body p-3"),
                a(b, "class", "card filter p-0 col-sm shadow svelte-pvwixh"),
                Ne(b, "max-width", "350px"),
                Ne(b, "min-width", "max-content"),
                a(Xe, "class", "card-body"),
                a(Ze, "class", "pagination m-0 p-3 svelte-pvwixh"),
                a(ge, "class", "form-select svelte-pvwixh"),
                l[16] === void 0 && lt(() => l[57].call(ge)),
                a(Me, "class", "row col-md-6 paginationNav justify-content-center align-items-center svelte-pvwixh"),
                a(at, "class", "container-fluid p-0 pt-3 bg-light d-flex justify-content-center"),
                a(De, "class", "card results p-0 col-sm shadow svelte-pvwixh"),
                Ne(De, "max-width", "350px"),
                Ne(De, "min-width", "max-content"),
                a(w, "class", "row justify-content-center align-items-start"),
                a(f, "class", "container-fluid"),
                a(rt, "class", "fa fa-cogs me-3 d-flex justify-contnet-center align-items-center svelte-pvwixh"),
                a(St, "class", "fa fa-plus me-3"),
                a(Pe, "type", "button"),
                a(Pe, "class", "toolbarBtn d-flex align-items-center rounded-1 svelte-pvwixh"),
                a(Ot, "class", "fa fa-minus me-3"),
                a(Ae, "type", "button"),
                a(Ae, "class", "toolbarBtn d-flex align-items-center rounded-1 svelte-pvwixh"),
                a(Vt, "class", "fa-solid fa-code-merge me-3"),
                a(Be, "type", "button"),
                a(Be, "class", "toolbarBtn d-flex align-items-center rounded-1 svelte-pvwixh"),
                a(Pt, "class", "fa fa-download m-0 me-3"),
                a(Ee, "class", "btn toolbarBtn dropdown-toggle svelte-pvwixh"),
                a(Ee, "type", "button"),
                a(Ee, "id", "dropdownMenuButton1"),
                a(Ee, "data-bs-toggle", "dropdown"),
                a(Ee, "aria-expanded", "false"),
                a(Ye, "class", "dropdown-item"),
                Ne(Ye, "cursor", "pointer", !1),
                a(ot, "class", "dropdown-item"),
                a(Je, "class", "dropdown-item"),
                Ne(Je, "cursor", "pointer", !1),
                a(it, "class", "dropdown-item"),
                a(Re, "class", "dropdown-menu"),
                a(He, "class", "dropdown toolbarBtn d-flex align-items-center rounded-1 p-0 svelte-pvwixh"),
                a(ue, "class", "btn-group-vertical gap-2 me-2 align-items-stretch"),
                a(ue, "role", "group"),
                a(Ve, "class", "toolbar shadow d-flex flex-row align-items-stretch svelte-pvwixh"),
                a(t, "class", "found svelte-pvwixh"),
                a(xe, "class", "alertCont svelte-pvwixh"),
                a($e, "class", "hide svelte-pvwixh");
        },
        m(_, Y) {
            z(_, t, Y),
                e(t, s),
                e(t, h),
                e(t, p),
                e(t, k),
                e(t, v),
                e(v, E),
                e(E, g),
                e(g, N),
                e(g, C),
                e(g, L),
                e(L, d),
                e(E, m),
                e(E, q),
                e(q, U),
                e(U, j),
                e(U, M),
                e(t, y),
                e(t, f),
                e(f, w),
                e(w, b),
                e(b, V),
                e(V, H),
                e(V, J),
                e(b, F),
                e(b, G),
                e(G, R),
                e(R, A),
                e(A, _e),
                e(_e, fe),
                e(A, Ge),
                e(A, X),
                Ce(X, l[6]),
                e(R, _t),
                e(R, we),
                e(we, Oe),
                e(Oe, Ke),
                e(we, vt),
                e(we, re),
                Ce(re, l[7]),
                e(R, We),
                e(R, ve),
                e(ve, Ue),
                e(Ue, pt),
                e(ve, mt),
                e(ve, ie),
                e(ie, pe),
                e(pe, bt);
            for (let I = 0; I < 4; I += 1) At[I].m(ie, null);
            ne(ie, l[12]), e(R, gt), e(R, Ie), e(Ie, je), e(je, Et), e(Ie, wt), e(Ie, oe), e(oe, me), e(me, It);
            for (let I = 0; I < $.length; I += 1) $[I].m(oe, null);
            ne(oe, l[8]),
                e(R, yt),
                e(R, Z),
                e(Z, ye),
                e(ye, qe),
                e(qe, kt),
                e(ye, Lt),
                e(ye, x),
                e(x, be),
                e(be, Tt),
                e(x, ke),
                e(ke, Dt),
                e(x, Le),
                e(Le, Nt),
                e(x, Te),
                e(Te, Ct),
                ne(x, l[9]),
                e(Z, u),
                ee && ee.m(Z, null),
                e(Z, P),
                te && te.m(Z, null),
                e(Z, B),
                le && le.m(Z, null),
                e(R, K),
                e(R, ce),
                e(ce, st),
                l[48](R),
                e(w, jt),
                e(w, De),
                e(De, Xe);
            for (let I = 0; I < se.length; I += 1) se[I].m(Xe, null);
            e(De, el), e(De, at), e(at, Me), e(Me, Ze);
            for (let I = 0; I < ae.length; I += 1) ae[I].m(Ze, null);
            e(Me, tl), e(Me, ge);
            for (let I = 0; I < 6; I += 1) Bt[I].m(ge, null);
            ne(ge, l[16]),
                e(t, ll),
                e(t, Ve),
                e(Ve, rt),
                e(Ve, sl),
                e(Ve, ue),
                e(ue, Pe),
                e(Pe, St),
                e(Pe, al),
                e(ue, rl),
                e(ue, Ae),
                e(Ae, Ot),
                e(Ae, ol),
                e(ue, il),
                e(ue, Be),
                e(Be, Vt),
                e(Be, nl),
                e(ue, cl),
                e(ue, He),
                e(He, Ee),
                e(Ee, Pt),
                e(Ee, ul),
                e(He, dl),
                e(He, Re),
                e(Re, ot),
                e(ot, Ye),
                e(Ye, fl),
                e(Re, hl),
                e(Re, it),
                e(it, Je),
                e(Je, _l),
                l[59](Ve),
                z(_, qt, Y),
                z(_, xe, Y),
                l[60](xe),
                z(_, Mt, Y),
                z(_, $e, Y),
                e($e, vl),
                pl ||
                    ((Dl = [
                        Q(U, "click", l[36]),
                        Q(X, "input", l[37]),
                        Q(re, "input", l[38]),
                        Q(ie, "change", l[39]),
                        Q(oe, "change", l[40]),
                        Q(x, "change", l[41]),
                        Q(ce, "click", l[19]),
                        Q(ge, "change", l[57]),
                        Q(ge, "change", l[58]),
                        Q(rt, "click", l[21]),
                        Q(Pe, "click", l[22]),
                        Q(Ae, "click", l[23]),
                        Q(Be, "click", l[25]),
                        Q(Ye, "click", l[27]),
                        Q(Je, "click", l[28]),
                    ]),
                    (pl = !0));
        },
        p(_, Y) {
            if ((Y[0] & 64 && X.value !== _[6] && Ce(X, _[6]), Y[0] & 128 && re.value !== _[7] && Ce(re, _[7]), Y[0] & 4096 && ne(ie, _[12]), Y & 0)) {
                nt = ts;
                let I;
                for (I = 0; I < nt.length; I += 1) {
                    const de = os(_, nt, I);
                    $[I] ? $[I].p(de, Y) : (($[I] = is(de)), $[I].c(), $[I].m(oe, null));
                }
                for (; I < $.length; I += 1) $[I].d(1);
                $.length = nt.length;
            }
            if (
                (Y[0] & 256 && ne(oe, _[8]),
                Y[0] & 512 && ne(x, _[9]),
                _[9] === "School" ? (ee ? ee.p(_, Y) : ((ee = ns(_)), ee.c(), ee.m(Z, P))) : ee && (ee.d(1), (ee = null)),
                _[9] === "University" ? (te ? te.p(_, Y) : ((te = cs(_)), te.c(), te.m(Z, B))) : te && (te.d(1), (te = null)),
                _[9] === "College" ? (le ? le.p(_, Y) : ((le = ds(_)), le.c(), le.m(Z, null))) : le && (le.d(1), (le = null)),
                Y[0] & 68182018)
            ) {
                ct = _[14];
                let I;
                for (I = 0; I < ct.length; I += 1) {
                    const de = ss(_, ct, I);
                    se[I] ? se[I].p(de, Y) : ((se[I] = hs(de)), se[I].c(), se[I].m(Xe, null));
                }
                for (; I < se.length; I += 1) se[I].d(1);
                se.length = ct.length;
            }
            if (Y[0] & 16875520) {
                ut = Array(Math.ceil(_[15] / _[16]));
                let I;
                for (I = 0; I < ut.length; I += 1) {
                    const de = ls(_, ut, I);
                    ae[I] ? ae[I].p(de, Y) : ((ae[I] = _s(de)), ae[I].c(), ae[I].m(Ze, null));
                }
                for (; I < ae.length; I += 1) ae[I].d(1);
                ae.length = ut.length;
            }
            Y[0] & 65536 && ne(ge, _[16]);
        },
        d(_) {
            _ && r(t),
                ze(At, _),
                ze($, _),
                ee && ee.d(),
                te && te.d(),
                le && le.d(),
                l[48](null),
                ze(se, _),
                ze(ae, _),
                ze(Bt, _),
                l[59](null),
                _ && r(qt),
                _ && r(xe),
                l[60](null),
                _ && r(Mt),
                _ && r($e),
                (pl = !1),
                ht(Dl);
        },
    };
}
function Ps(l) {
    let t, s, o, h, p, k, v, E, g, N, C, L, d, m, q;
    return {
        c() {
            (t = i("section")),
                (s = i("lottie-player")),
                (h = T()),
                (p = i("h1")),
                (k = S("No results found")),
                (v = T()),
                (E = i("p")),
                (g = S("Try to search for something else.")),
                (N = T()),
                (C = i("button")),
                (L = i("i")),
                (d = S(`\r
			Back`)),
                this.h();
        },
        l(U) {
            t = n(U, "SECTION", { class: !0 });
            var j = c(t);
            (s = n(j, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                speed: !0,
                loop: !0,
                nocontrols: !0,
                class: !0,
            })),
                c(s).forEach(r),
                (h = D(j)),
                (p = n(j, "H1", {}));
            var M = c(p);
            (k = O(M, "No results found")), M.forEach(r), (v = D(j)), (E = n(j, "P", { class: !0 }));
            var y = c(E);
            (g = O(y, "Try to search for something else.")), y.forEach(r), (N = D(j)), (C = n(j, "BUTTON", { class: !0 }));
            var f = c(C);
            (L = n(f, "I", { class: !0 })),
                c(L).forEach(r),
                (d = O(
                    f,
                    `\r
			Back`
                )),
                f.forEach(r),
                j.forEach(r),
                this.h();
        },
        h() {
            Tl(s.src, (o = Ns)) || dt(s, "src", o),
                dt(s, "background", "transparent"),
                dt(s, "speed", "1"),
                dt(s, "loop", ""),
                dt(s, "nocontrols", ""),
                dt(s, "class", "svelte-pvwixh"),
                a(E, "class", "svelte-pvwixh"),
                a(L, "class", "fa fa-arrow-left"),
                a(C, "class", "btn btn-primary d-flex gap-3 align-items-center"),
                a(t, "class", "notfound svelte-pvwixh");
        },
        m(U, j) {
            z(U, t, j), e(t, s), e(t, h), e(t, p), e(p, k), e(t, v), e(t, E), e(E, g), e(t, N), e(t, C), e(C, L), e(C, d), m || ((q = Q(C, "click", l[35])), (m = !0));
        },
        p: Se,
        d(U) {
            U && r(t), (m = !1), q();
        },
    };
}
function As(l) {
    let t, s, o;
    return {
        c() {
            (t = i("div")), (s = i("h1")), (o = S("Searching...")), this.h();
        },
        l(h) {
            t = n(h, "DIV", { class: !0 });
            var p = c(t);
            s = n(p, "H1", {});
            var k = c(s);
            (o = O(k, "Searching...")), k.forEach(r), p.forEach(r), this.h();
        },
        h() {
            a(t, "class", "loading svelte-pvwixh");
        },
        m(h, p) {
            z(h, t, p), e(t, s), e(s, o);
        },
        p: Se,
        d(h) {
            h && r(t);
        },
    };
}
function Bs(l) {
    let t, s;
    return {
        c() {
            (t = i("option")), (s = S(l[85])), this.h();
        },
        l(o) {
            t = n(o, "OPTION", {});
            var h = c(t);
            (s = O(h, l[85])), h.forEach(r), this.h();
        },
        h() {
            (t.__value = l[85]), (t.value = t.__value);
        },
        m(o, h) {
            z(o, t, h), e(t, s);
        },
        p: Se,
        d(o) {
            o && r(t);
        },
    };
}
function is(l) {
    let t,
        s = l[82] + "",
        o;
    return {
        c() {
            (t = i("option")), (o = S(s)), this.h();
        },
        l(h) {
            t = n(h, "OPTION", {});
            var p = c(t);
            (o = O(p, s)), p.forEach(r), this.h();
        },
        h() {
            (t.__value = l[82]), (t.value = t.__value);
        },
        m(h, p) {
            z(h, t, p), e(t, o);
        },
        p: Se,
        d(h) {
            h && r(t);
        },
    };
}
function ns(l) {
    let t,
        s,
        o,
        h,
        p,
        k,
        v,
        E,
        g,
        N,
        C,
        L,
        d,
        m,
        q,
        U,
        j,
        M = Array(11),
        y = [];
    for (let f = 0; f < M.length; f += 1) y[f] = Us(Ss(l, M, f));
    return {
        c() {
            (t = i("div")),
                (s = i("div")),
                (o = i("div")),
                (h = i("label")),
                (p = S("School Name")),
                (k = T()),
                (v = i("input")),
                (E = T()),
                (g = i("div")),
                (N = i("label")),
                (C = S("School Year")),
                (L = T()),
                (d = i("select")),
                (m = i("option")),
                (q = S("Choose..."));
            for (let f = 0; f < y.length; f += 1) y[f].c();
            this.h();
        },
        l(f) {
            t = n(f, "DIV", { class: !0 });
            var w = c(t);
            s = n(w, "DIV", { class: !0 });
            var b = c(s);
            o = n(b, "DIV", { class: !0 });
            var V = c(o);
            h = n(V, "LABEL", { for: !0 });
            var H = c(h);
            (p = O(H, "School Name")), H.forEach(r), (k = D(V)), (v = n(V, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), V.forEach(r), (E = D(b)), (g = n(b, "DIV", { class: !0 }));
            var J = c(g);
            N = n(J, "LABEL", { for: !0 });
            var F = c(N);
            (C = O(F, "School Year")), F.forEach(r), (L = D(J)), (d = n(J, "SELECT", { class: !0, "aria-label": !0 }));
            var G = c(d);
            m = n(G, "OPTION", {});
            var R = c(m);
            (q = O(R, "Choose...")), R.forEach(r);
            for (let A = 0; A < y.length; A += 1) y[A].l(G);
            G.forEach(r), J.forEach(r), b.forEach(r), w.forEach(r), this.h();
        },
        h() {
            a(h, "for", "school"),
                a(v, "type", "text"),
                a(v, "class", "form-control svelte-pvwixh"),
                a(v, "id", "school"),
                a(v, "placeholder", "Enter your school name"),
                a(o, "class", "form-group col-md-8"),
                a(N, "for", "schoolYear"),
                (m.selected = !0),
                (m.__value = "Choose..."),
                (m.value = m.__value),
                a(d, "class", "form-select form-select svelte-pvwixh"),
                a(d, "aria-label", "Default select example"),
                l[11] === void 0 && lt(() => l[43].call(d)),
                a(g, "class", "form-group col-md-4"),
                a(s, "class", "row"),
                a(t, "class", "d-flex justify-content-between p-0");
        },
        m(f, w) {
            z(f, t, w), e(t, s), e(s, o), e(o, h), e(h, p), e(o, k), e(o, v), Ce(v, l[10]), e(s, E), e(s, g), e(g, N), e(N, C), e(g, L), e(g, d), e(d, m), e(m, q);
            for (let b = 0; b < y.length; b += 1) y[b].m(d, null);
            ne(d, l[11]), U || ((j = [Q(v, "input", l[42]), Q(d, "change", l[43])]), (U = !0));
        },
        p(f, w) {
            w[0] & 1024 && v.value !== f[10] && Ce(v, f[10]), w[0] & 2048 && ne(d, f[11]);
        },
        d(f) {
            f && r(t), ze(y, f), (U = !1), ht(j);
        },
    };
}
function Us(l) {
    let t,
        s = l[69] + 1 + "",
        o;
    return {
        c() {
            (t = i("option")), (o = S(s)), this.h();
        },
        l(h) {
            t = n(h, "OPTION", {});
            var p = c(t);
            (o = O(p, s)), p.forEach(r), this.h();
        },
        h() {
            (t.__value = l[69] + 1), (t.value = t.__value);
        },
        m(h, p) {
            z(h, t, p), e(t, o);
        },
        p: Se,
        d(h) {
            h && r(t);
        },
    };
}
function cs(l) {
    let t,
        s,
        o,
        h,
        p,
        k,
        v,
        E,
        g,
        N,
        C,
        L,
        d,
        m,
        q,
        U,
        j,
        M = l[17],
        y = [];
    for (let f = 0; f < M.length; f += 1) y[f] = us(rs(l, M, f));
    return {
        c() {
            (t = i("div")),
                (s = i("div")),
                (o = i("div")),
                (h = i("label")),
                (p = S("Institute Name")),
                (k = T()),
                (v = i("input")),
                (E = T()),
                (g = i("div")),
                (N = i("label")),
                (C = S("Institute Year")),
                (L = T()),
                (d = i("select")),
                (m = i("option")),
                (q = S("Choose..."));
            for (let f = 0; f < y.length; f += 1) y[f].c();
            this.h();
        },
        l(f) {
            t = n(f, "DIV", { class: !0 });
            var w = c(t);
            s = n(w, "DIV", { class: !0 });
            var b = c(s);
            o = n(b, "DIV", { class: !0 });
            var V = c(o);
            h = n(V, "LABEL", { for: !0 });
            var H = c(h);
            (p = O(H, "Institute Name")), H.forEach(r), (k = D(V)), (v = n(V, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), V.forEach(r), (E = D(b)), (g = n(b, "DIV", { class: !0 }));
            var J = c(g);
            N = n(J, "LABEL", { for: !0 });
            var F = c(N);
            (C = O(F, "Institute Year")), F.forEach(r), (L = D(J)), (d = n(J, "SELECT", { class: !0, "aria-label": !0 }));
            var G = c(d);
            m = n(G, "OPTION", {});
            var R = c(m);
            (q = O(R, "Choose...")), R.forEach(r);
            for (let A = 0; A < y.length; A += 1) y[A].l(G);
            G.forEach(r), J.forEach(r), b.forEach(r), w.forEach(r), this.h();
        },
        h() {
            a(h, "for", "Institute"),
                a(v, "type", "text"),
                a(v, "class", "form-control svelte-pvwixh"),
                a(v, "id", "Institute"),
                a(v, "placeholder", "Enter your Institute name"),
                a(o, "class", "form-group col-md-8"),
                a(N, "for", "Institute Year"),
                (m.selected = !0),
                (m.__value = "Choose..."),
                (m.value = m.__value),
                a(d, "class", "form-select form-select svelte-pvwixh"),
                a(d, "aria-label", "Default select example"),
                l[11] === void 0 && lt(() => l[45].call(d)),
                a(g, "class", "form-group col-md-4"),
                a(s, "class", "row"),
                a(t, "class", "d-flex justify-content-between p-0");
        },
        m(f, w) {
            z(f, t, w), e(t, s), e(s, o), e(o, h), e(h, p), e(o, k), e(o, v), Ce(v, l[10]), e(s, E), e(s, g), e(g, N), e(N, C), e(g, L), e(g, d), e(d, m), e(m, q);
            for (let b = 0; b < y.length; b += 1) y[b].m(d, null);
            ne(d, l[11]), U || ((j = [Q(v, "input", l[44]), Q(d, "change", l[45])]), (U = !0));
        },
        p(f, w) {
            if ((w[0] & 1024 && v.value !== f[10] && Ce(v, f[10]), w[0] & 131072)) {
                M = f[17];
                let b;
                for (b = 0; b < M.length; b += 1) {
                    const V = rs(f, M, b);
                    y[b] ? y[b].p(V, w) : ((y[b] = us(V)), y[b].c(), y[b].m(d, null));
                }
                for (; b < y.length; b += 1) y[b].d(1);
                y.length = M.length;
            }
            w[0] & 2048 && ne(d, f[11]);
        },
        d(f) {
            f && r(t), ze(y, f), (U = !1), ht(j);
        },
    };
}
function us(l) {
    let t,
        s = l[76] + "",
        o;
    return {
        c() {
            (t = i("option")), (o = S(s)), this.h();
        },
        l(h) {
            t = n(h, "OPTION", {});
            var p = c(t);
            (o = O(p, s)), p.forEach(r), this.h();
        },
        h() {
            (t.__value = l[76]), (t.value = t.__value);
        },
        m(h, p) {
            z(h, t, p), e(t, o);
        },
        p: Se,
        d(h) {
            h && r(t);
        },
    };
}
function ds(l) {
    let t,
        s,
        o,
        h,
        p,
        k,
        v,
        E,
        g,
        N,
        C,
        L,
        d,
        m,
        q,
        U,
        j,
        M = l[18],
        y = [];
    for (let f = 0; f < M.length; f += 1) y[f] = fs(as(l, M, f));
    return {
        c() {
            (t = i("div")),
                (s = i("div")),
                (o = i("div")),
                (h = i("label")),
                (p = S("College Name")),
                (k = T()),
                (v = i("input")),
                (E = T()),
                (g = i("div")),
                (N = i("label")),
                (C = S("College Year")),
                (L = T()),
                (d = i("select")),
                (m = i("option")),
                (q = S("Choose..."));
            for (let f = 0; f < y.length; f += 1) y[f].c();
            this.h();
        },
        l(f) {
            t = n(f, "DIV", { class: !0 });
            var w = c(t);
            s = n(w, "DIV", { class: !0 });
            var b = c(s);
            o = n(b, "DIV", { class: !0 });
            var V = c(o);
            h = n(V, "LABEL", { for: !0 });
            var H = c(h);
            (p = O(H, "College Name")), H.forEach(r), (k = D(V)), (v = n(V, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), V.forEach(r), (E = D(b)), (g = n(b, "DIV", { class: !0 }));
            var J = c(g);
            N = n(J, "LABEL", { for: !0 });
            var F = c(N);
            (C = O(F, "College Year")), F.forEach(r), (L = D(J)), (d = n(J, "SELECT", { class: !0, "aria-label": !0 }));
            var G = c(d);
            m = n(G, "OPTION", {});
            var R = c(m);
            (q = O(R, "Choose...")), R.forEach(r);
            for (let A = 0; A < y.length; A += 1) y[A].l(G);
            G.forEach(r), J.forEach(r), b.forEach(r), w.forEach(r), this.h();
        },
        h() {
            a(h, "for", "College"),
                a(v, "type", "text"),
                a(v, "class", "form-control svelte-pvwixh"),
                a(v, "id", "College"),
                a(v, "placeholder", "Enter your College name"),
                a(o, "class", "form-group col-md-8"),
                a(N, "for", "College Year"),
                (m.selected = !0),
                (m.__value = "Choose..."),
                (m.value = m.__value),
                a(d, "class", "form-select form-select svelte-pvwixh"),
                a(d, "aria-label", "Default select example"),
                l[11] === void 0 && lt(() => l[47].call(d)),
                a(g, "class", "form-group col-md-4"),
                a(s, "class", "row"),
                a(t, "class", "d-flex justify-content-between p-0");
        },
        m(f, w) {
            z(f, t, w), e(t, s), e(s, o), e(o, h), e(h, p), e(o, k), e(o, v), Ce(v, l[10]), e(s, E), e(s, g), e(g, N), e(N, C), e(g, L), e(g, d), e(d, m), e(m, q);
            for (let b = 0; b < y.length; b += 1) y[b].m(d, null);
            ne(d, l[11]), U || ((j = [Q(v, "input", l[46]), Q(d, "change", l[47])]), (U = !0));
        },
        p(f, w) {
            if ((w[0] & 1024 && v.value !== f[10] && Ce(v, f[10]), w[0] & 262144)) {
                M = f[18];
                let b;
                for (b = 0; b < M.length; b += 1) {
                    const V = as(f, M, b);
                    y[b] ? y[b].p(V, w) : ((y[b] = fs(V)), y[b].c(), y[b].m(d, null));
                }
                for (; b < y.length; b += 1) y[b].d(1);
                y.length = M.length;
            }
            w[0] & 2048 && ne(d, f[11]);
        },
        d(f) {
            f && r(t), ze(y, f), (U = !1), ht(j);
        },
    };
}
function fs(l) {
    let t,
        s = l[76] + "",
        o;
    return {
        c() {
            (t = i("option")), (o = S(s)), this.h();
        },
        l(h) {
            t = n(h, "OPTION", {});
            var p = c(t);
            (o = O(p, s)), p.forEach(r), this.h();
        },
        h() {
            (t.__value = l[76]), (t.value = t.__value);
        },
        m(h, p) {
            z(h, t, p), e(t, o);
        },
        p: Se,
        d(h) {
            h && r(t);
        },
    };
}
function js(l) {
    let t,
        s,
        o,
        h,
        p = l[69],
        k,
        v,
        E,
        g,
        N = l[74].name + " " + l[74].surname,
        C,
        L,
        d,
        m,
        q;
    const U = () => l[52](o, p),
        j = () => l[52](null, p);
    function M() {
        return l[53](l[69]);
    }
    function y() {
        return l[54](l[74]);
    }
    return {
        c() {
            (t = i("div")), (s = i("div")), (o = i("i")), (k = T()), (v = i("div")), (E = i("div")), (g = i("span")), (C = S(N)), (L = T()), (d = i("i")), this.h();
        },
        l(f) {
            t = n(f, "DIV", { class: !0 });
            var w = c(t);
            s = n(w, "DIV", { class: !0 });
            var b = c(s);
            (o = n(b, "I", { class: !0, id: !0 })), c(o).forEach(r), b.forEach(r), (k = D(w)), (v = n(w, "DIV", { class: !0 }));
            var V = c(v);
            E = n(V, "DIV", { class: !0 });
            var H = c(E);
            g = n(H, "SPAN", { class: !0 });
            var J = c(g);
            (C = O(J, N)), J.forEach(r), (L = D(H)), (d = n(H, "I", { class: !0, style: !0 })), c(d).forEach(r), H.forEach(r), V.forEach(r), w.forEach(r), this.h();
        },
        h() {
            a(o, "class", "select fa fa-square-o svelte-pvwixh"),
                a(o, "id", (h = l[74].id)),
                a(s, "class", "selectBox m-1 me-4 mb-0"),
                a(g, "class", "d-inline"),
                a(d, "class", "fa fa-edit m-1"),
                Ne(d, "cursor", "pointer"),
                Ne(d, "color", "#3490dc"),
                a(E, "class", "d-flex justify-content-between align-items-center"),
                a(v, "class", "info svelte-pvwixh"),
                a(t, "class", "userInfo d-flex flex-row align-items-center svelte-pvwixh");
        },
        m(f, w) {
            z(f, t, w), e(t, s), e(s, o), U(), e(t, k), e(t, v), e(v, E), e(E, g), e(g, C), e(E, L), e(E, d), m || ((q = [Q(o, "click", M, !0), Q(d, "click", y)]), (m = !0));
        },
        p(f, w) {
            (l = f), w[0] & 16384 && h !== (h = l[74].id) && a(o, "id", h), p !== l[69] && (j(), (p = l[69]), U()), w[0] & 16384 && N !== (N = l[74].name + " " + l[74].surname) && vs(C, N);
        },
        d(f) {
            f && r(t), j(), (m = !1), ht(q);
        },
    };
}
function qs(l) {
    let t,
        s,
        o,
        h,
        p = l[69],
        k,
        v,
        E,
        g,
        N = l[74].name + " " + l[74].surname,
        C,
        L,
        d,
        m,
        q;
    const U = () => l[49](o, p),
        j = () => l[49](null, p);
    function M() {
        return l[50](l[69]);
    }
    function y() {
        return l[51](l[74]);
    }
    return {
        c() {
            (t = i("div")), (s = i("div")), (o = i("i")), (k = T()), (v = i("div")), (E = i("div")), (g = i("span")), (C = S(N)), (L = T()), (d = i("i")), this.h();
        },
        l(f) {
            t = n(f, "DIV", { class: !0 });
            var w = c(t);
            s = n(w, "DIV", { class: !0 });
            var b = c(s);
            (o = n(b, "I", { class: !0, id: !0 })), c(o).forEach(r), b.forEach(r), (k = D(w)), (v = n(w, "DIV", { class: !0 }));
            var V = c(v);
            E = n(V, "DIV", { class: !0 });
            var H = c(E);
            g = n(H, "SPAN", { class: !0 });
            var J = c(g);
            (C = O(J, N)), J.forEach(r), (L = D(H)), (d = n(H, "I", { class: !0, style: !0 })), c(d).forEach(r), H.forEach(r), V.forEach(r), w.forEach(r), this.h();
        },
        h() {
            a(o, "class", "select fa fa-square-o svelte-pvwixh"),
                a(o, "id", (h = l[74].id)),
                a(s, "class", "selectBox m-1 me-4 mb-0"),
                a(g, "class", "d-inline"),
                a(d, "class", "fa fa-edit m-1"),
                Ne(d, "cursor", "pointer"),
                Ne(d, "color", "#3490dc"),
                a(E, "class", "d-flex justify-content-between align-items-center"),
                a(v, "class", "info svelte-pvwixh"),
                a(t, "class", "userInfo even d-flex flex-row align-items-center svelte-pvwixh");
        },
        m(f, w) {
            z(f, t, w), e(t, s), e(s, o), U(), e(t, k), e(t, v), e(v, E), e(E, g), e(g, C), e(E, L), e(E, d), m || ((q = [Q(o, "click", M, !0), Q(d, "click", y)]), (m = !0));
        },
        p(f, w) {
            (l = f), w[0] & 16384 && h !== (h = l[74].id) && a(o, "id", h), p !== l[69] && (j(), (p = l[69]), U()), w[0] & 16384 && N !== (N = l[74].name + " " + l[74].surname) && vs(C, N);
        },
        d(f) {
            f && r(t), j(), (m = !1), ht(q);
        },
    };
}
function hs(l) {
    let t, s;
    function o(k, v) {
        return k[69] % 2 == 0 ? qs : js;
    }
    let p = o(l)(l);
    return {
        c() {
            (t = i("div")), p.c(), (s = T()), this.h();
        },
        l(k) {
            t = n(k, "DIV", { class: !0 });
            var v = c(t);
            p.l(v), (s = D(v)), v.forEach(r), this.h();
        },
        h() {
            a(t, "class", "user hide d-flex flex-row align-items-stretch svelte-pvwixh");
        },
        m(k, v) {
            z(k, t, v), p.m(t, null), e(t, s), l[55](t);
        },
        p(k, v) {
            p.p(k, v);
        },
        d(k) {
            k && r(t), p.d(), l[55](null);
        },
    };
}
function _s(l) {
    let t,
        s = l[69] + 1 + "",
        o,
        h,
        p;
    function k() {
        return l[56](l[69]);
    }
    return {
        c() {
            (t = i("li")), (o = S(s)), this.h();
        },
        l(v) {
            t = n(v, "LI", { class: !0 });
            var E = c(t);
            (o = O(E, s)), E.forEach(r), this.h();
        },
        h() {
            a(t, "class", "page-item page-link svelte-pvwixh");
        },
        m(v, E) {
            z(v, t, E), e(t, o), h || ((p = Q(t, "click", k)), (h = !0));
        },
        p(v, E) {
            l = v;
        },
        d(v) {
            v && r(t), (h = !1), p();
        },
    };
}
function Ms(l) {
    let t, s;
    return {
        c() {
            (t = i("option")), (s = S(l[69])), this.h();
        },
        l(o) {
            t = n(o, "OPTION", { class: !0 });
            var h = c(t);
            (s = O(h, l[69])), h.forEach(r), this.h();
        },
        h() {
            a(t, "class", "dropdown-item"), (t.__value = l[69]), (t.value = t.__value);
        },
        m(o, h) {
            z(o, t, h), e(t, s);
        },
        p: Se,
        d(o) {
            o && r(t);
        },
    };
}
function Hs(l) {
    let t, s, o, h, p, k, v, E, g;
    function N(d, m) {
        if (d[15] == null) return As;
        if (d[15] == 0) return Ps;
        if (d[15] > 0) return Vs;
    }
    let C = N(l),
        L = C && C(l);
    return {
        c() {
            (t = i("script")), (o = T()), (h = i("div")), (p = i("div")), (k = i("span")), (v = S("Loading...")), (E = T()), L && L.c(), (g = $l()), this.h();
        },
        l(d) {
            const m = ws('[data-svelte="svelte-5ay6di"]', Ll.head);
            t = n(m, "SCRIPT", { src: !0 });
            var q = c(t);
            q.forEach(r), m.forEach(r), (o = D(d)), (h = n(d, "DIV", { class: !0 }));
            var U = c(h);
            p = n(U, "DIV", { class: !0, role: !0 });
            var j = c(p);
            k = n(j, "SPAN", { class: !0 });
            var M = c(k);
            (v = O(M, "Loading...")), M.forEach(r), j.forEach(r), U.forEach(r), (E = D(d)), L && L.l(d), (g = $l()), this.h();
        },
        h() {
            (t.defer = !0),
                Tl(t.src, (s = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js")) || a(t, "src", s),
                (Ll.title = "Search results"),
                a(k, "class", "visually-hidden"),
                a(p, "class", "spinner-border svelte-pvwixh"),
                a(p, "role", "status"),
                a(h, "class", "loading svelte-pvwixh");
        },
        m(d, m) {
            e(Ll.head, t), z(d, o, m), z(d, h, m), e(h, p), e(p, k), e(k, v), l[34](h), z(d, E, m), L && L.m(d, m), z(d, g, m);
        },
        p(d, m) {
            C === (C = N(d)) && L ? L.p(d, m) : (L && L.d(1), (L = C && C(d)), L && (L.c(), L.m(g.parentNode, g)));
        },
        i: Se,
        o: Se,
        d(d) {
            r(t), d && r(o), d && r(h), l[34](null), d && r(E), L && L.d(d), d && r(g);
        },
    };
}
function Rs(l, t, s) {
    let o, h;
    Is(l, Ts, (u) => s(63, (h = u))), Ds();
    let p = h.data,
        { searchQueries: k = p.searchQueries, adminId: v = p.adminId, usersOrErr: E = p.usersOrErr } = t,
        { token: g = p.token, real_id: N = p.real_id, API: C = p.API } = t,
        L,
        d,
        m,
        q,
        U = ["1 (bachelor / specialty)", "2 (bachelor / specialty)", "3 (bachelor / specialty)", "4 (bachelor / specialty)", "5 (specialty)", "6 (specialty)", "1 (master)", "2 (master)"],
        j = ["1 course", "2 course", "3 course", "4 course", "5 course"],
        M,
        y,
        f,
        w,
        b,
        V,
        H,
        J;
    b = "Choose...";
    let F = {
        email: "",
        search: "",
        region: "",
        institution_type: "",
        institution_name: "",
        institution_course: "",
        permission: "",
    };
    function G() {
        if (
            ((F.email = y),
            (F.search = f),
            (F.region = w),
            (F.institution_type = b),
            (F.institution_name = V),
            (F.institution_course = H),
            (F.permission = J),
            Object.values(F).every((B) => B == null))
        ) {
            s(
                3,
                (m.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please fill at least one field.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                m
            );
            return;
        }
        for (let B in F) (F[B] === "" || F[B] == "Choose..." || F[B] == null) && (F[B] = void 0);
        s(3, (m.innerHTML = ""), m), (F = JSON.parse(JSON.stringify(F)));
        const P = new URLSearchParams(F);
        window.location.href = `${$t}/admin/${N}/users/${P.toString()}`;
    }
    let R = new Set(),
        A = [];
    function _e(u) {
        let P = A[u],
            B = P == null ? void 0 : P.getAttribute("id");
        P.classList.contains("fa-square-o")
            ? (P.classList.remove("fa-square-o"), P.classList.add("fa-check-square-o"), R.add(B))
            : (P.classList.remove("fa-check-square-o"), P.classList.add("fa-square-o"), R.delete(B));
    }
    let fe = [],
        Ge = "",
        X;
    ys(() => {
        if ((E.details === void 0 && E.detail === void 0 ? (s(14, (fe = E.items)), s(15, (X = fe.length))) : (s(14, (fe = [])), s(15, (X = 0))), k !== "")) {
            let u = new URLSearchParams(k);
            s(6, (y = u.get("email") ? u.get("email") : void 0)),
                s(7, (f = u.get("search") ? u.get("search") : void 0)),
                s(8, (w = u.get("region") ? u.get("region") : void 0)),
                s(9, (b = u.get("institution_type") ? u.get("institution_type") : void 0)),
                s(10, (V = u.get("institution_name") ? u.get("institution_name") : void 0)),
                s(11, (H = u.get("institution_course") ? u.get("institution_course") : void 0)),
                s(12, (J = u.get("permission") ? u.get("permission") : void 0));
        }
        s(4, (q.style.display = "none"), q),
            s(13, (A = Array(X).fill(document.createElement("div")))),
            fe !== void 0 &&
                (Object.keys(fe[0]).map((u) => (Ge += `${u},`)),
                (Ge = Ge.slice(0, -1)),
                setTimeout(() => {
                    for (let u = 0; u < o; u++) A[u].parentElement.parentElement.parentElement.classList.remove("hide");
                }, 0));
    });
    function _t() {
        d.style.marginRight == "0px" ? s(2, (d.style.marginRight = "-220px"), d) : s(2, (d.style.marginRight = "0px"), d);
    }
    function we() {
        for (let u in A) {
            let P = A[u],
                B = P == null ? void 0 : P.getAttribute("id");
            P.classList.contains("fa-square-o") && (P.classList.remove("fa-square-o"), P.classList.add("fa-check-square-o"), R.add(B));
        }
    }
    function Oe() {
        for (let u in A) {
            let P = A[u],
                B = P == null ? void 0 : P.getAttribute("id");
            P.classList.contains("fa-check-square-o") && (P.classList.remove("fa-check-square-o"), P.classList.add("fa-square-o"), R.delete(B));
        }
    }
    function Ke(u) {
        let P = u * o,
            B = P + o;
        B > fe.length && (B = fe.length);
        for (let K = 0; K < A.length; K++) A[K].parentElement.parentElement.parentElement.classList.add("hide");
        for (let K = P; K < B; K++) A[K].parentElement.parentElement.parentElement.classList.remove("hide");
    }
    async function vt() {
        let u = Array.from(R);
        if (u.length < 2 || u.length > 2) {
            s(
                3,
                (m.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> Please sellect two users.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                m
            );
            return;
        }
        s(3, (m.innerHTML = ""), m),
            confirm(`Are you sure you want to merge these users-(${u[0]}-${u[1]})?`) &&
                (await fetch(`${C}/users/merge`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${g}`,
                    },
                    body: JSON.stringify({ from_id: u[0], to_id: u[1] }),
                }).then((B) => {
                    if (B.status === 200) {
                        s(
                            3,
                            (m.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
												<strong>Success!</strong> Users merged successfully.
												<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
											</div>`),
                            m
                        );
                        for (let K in A) {
                            let ce = A[K],
                                st = ce == null ? void 0 : ce.getAttribute("id");
                            (st === u[0] || st === u[1]) && A[K].parentElement.parentElement.parentElement.classList.add("hide");
                        }
                    } else
                        B.json().then((K) => {
                            s(
                                3,
                                (m.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
													<strong>Error!</strong> ${K.details}.
													<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
												</div>`),
                                m
                            );
                        });
                }));
    }
    function re(u) {
        window.location.href = `${$t}/info/${u}`;
    }
    let We = [];
    async function ve() {
        for (let u = 0; u < Array.from(R).length; u++) {
            let P = Array.from(R)[u];
            await fetch(`${C}/users/${P}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${g}`,
                },
            })
                .then((B) => B.json())
                .then((B) => {
                    B.error === void 0
                        ? We.push(B)
                        : s(
                              3,
                              (m.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error!</strong> ${B.error}.
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                              m
                          );
                });
        }
    }
    async function Ue() {
        await ve(), s(3, (m.innerHTML = ""), m);
        let u = prompt("Enter file name:", "users");
        if (!u) return;
        u == null && (u = "users");
        let P = JSON.parse(JSON.stringify(Array.from(We))),
            B = ft.book_new(),
            K = ft.json_to_sheet(P);
        ft.book_append_sheet(B, K, "Sheet1"), es(B, `${u}.csv`);
    }
    async function pt() {
        await ve(), s(3, (m.innerHTML = ""), m);
        let u = prompt("Enter file name:", "users");
        if (!u) return;
        u == null && (u = "users");
        let P = JSON.parse(JSON.stringify(Array.from(We))),
            B = ft.book_new(),
            K = ft.json_to_sheet(P);
        ft.book_append_sheet(B, K, "Sheet1"), es(B, `${u}.xlsx`);
    }
    function mt(u) {
        et[u ? "unshift" : "push"](() => {
            (q = u), s(4, q);
        });
    }
    const ie = () => (window.location.href = `${$t}/admin/${v}`),
        pe = () => (window.location.href = `${$t}/admin/${v}`);
    function bt() {
        (y = this.value), s(6, y);
    }
    function gt() {
        (f = this.value), s(7, f);
    }
    function Ie() {
        (J = tt(this)), s(12, J);
    }
    function je() {
        (w = tt(this)), s(8, w);
    }
    function Et() {
        (b = tt(this)), s(9, b);
    }
    function wt() {
        (V = this.value), s(10, V);
    }
    function oe() {
        (H = tt(this)), s(11, H);
    }
    function me() {
        (V = this.value), s(10, V);
    }
    function It() {
        (H = tt(this)), s(11, H);
    }
    function yt() {
        (V = this.value), s(10, V);
    }
    function Z() {
        (H = tt(this)), s(11, H);
    }
    function ye(u) {
        et[u ? "unshift" : "push"](() => {
            (M = u), s(5, M);
        });
    }
    function qe(u, P) {
        et[u ? "unshift" : "push"](() => {
            (A[P] = u), s(13, A);
        });
    }
    const kt = (u) => _e(u),
        Lt = (u) => re(u.id);
    function x(u, P) {
        et[u ? "unshift" : "push"](() => {
            (A[P] = u), s(13, A);
        });
    }
    const be = (u) => _e(u),
        Tt = (u) => re(u.id);
    function ke(u) {
        et[u ? "unshift" : "push"](() => {
            (L = u), s(1, L);
        });
    }
    const Dt = (u) => Ke(u);
    function Le() {
        (o = tt(this)), s(16, o);
    }
    const Nt = () => Ke(0);
    function Te(u) {
        et[u ? "unshift" : "push"](() => {
            (d = u), s(2, d);
        });
    }
    function Ct(u) {
        et[u ? "unshift" : "push"](() => {
            (m = u), s(3, m);
        });
    }
    return (
        (l.$$set = (u) => {
            "searchQueries" in u && s(29, (k = u.searchQueries)),
                "adminId" in u && s(0, (v = u.adminId)),
                "usersOrErr" in u && s(30, (E = u.usersOrErr)),
                "token" in u && s(31, (g = u.token)),
                "real_id" in u && s(32, (N = u.real_id)),
                "API" in u && s(33, (C = u.API));
        }),
        s(16, (o = 5)),
        [
            v,
            L,
            d,
            m,
            q,
            M,
            y,
            f,
            w,
            b,
            V,
            H,
            J,
            A,
            fe,
            X,
            o,
            U,
            j,
            G,
            _e,
            _t,
            we,
            Oe,
            Ke,
            vt,
            re,
            Ue,
            pt,
            k,
            E,
            g,
            N,
            C,
            mt,
            ie,
            pe,
            bt,
            gt,
            Ie,
            je,
            Et,
            wt,
            oe,
            me,
            It,
            yt,
            Z,
            ye,
            qe,
            kt,
            Lt,
            x,
            be,
            Tt,
            ke,
            Dt,
            Le,
            Nt,
            Te,
            Ct,
        ]
    );
}
class Ws extends bs {
    constructor(t) {
        super(),
            gs(
                this,
                t,
                Rs,
                Hs,
                Es,
                {
                    searchQueries: 29,
                    adminId: 0,
                    usersOrErr: 30,
                    token: 31,
                    real_id: 32,
                    API: 33,
                },
                null,
                [-1, -1, -1]
            );
    }
}
export { Ws as default };
