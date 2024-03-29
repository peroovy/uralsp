import {
    S as Yr,
    i as Wr,
    s as Gr,
    k as l,
    a as m,
    q as T,
    D as Kr,
    l as r,
    m as o,
    h as i,
    c as v,
    r as k,
    E as xs,
    n as t,
    p as R,
    T as Oe,
    M as zr,
    B as e,
    b as me,
    N as x,
    O as Qs,
    P as z,
    V as Jr,
    A as Zs,
    R as Rl,
    I as Xr,
    o as $r,
    J as ei,
    e as Pr,
    Q as ti,
    u as si,
    K as Ye,
    L as Cr,
} from "../../../../../chunks/index-af757d0f.js";
import { d as li } from "../../../../../chunks/dots-63d78b83.js";
import { b as Ar } from "../../../../../chunks/paths-9678c1af.js";
import { s as ri } from "../../../../../chunks/sessionDuration-e379fb60.js";
import { p as ii } from "../../../../../chunks/stores-0b118143.js";
const ni = "" + new URL("../../../../../assets/lottie-info-48823f28.json", import.meta.url).href,
    oi = "" + new URL("../../../../../assets/lottie-empty-12812e10.json", import.meta.url).href;
const { document: Ml } = ei;
function Or(a, u, s) {
    const h = a.slice();
    return (h[92] = u[s]), (h[94] = s), h;
}
function Ur(a) {
    let u,
        s = a[5],
        h = [];
    for (let f = 0; f < s.length; f += 1) h[f] = Br(Or(a, s, f));
    return {
        c() {
            for (let f = 0; f < h.length; f += 1) h[f].c();
            u = Pr();
        },
        l(f) {
            for (let p = 0; p < h.length; p += 1) h[p].l(f);
            u = Pr();
        },
        m(f, p) {
            for (let y = 0; y < h.length; y += 1) h[y].m(f, p);
            me(f, u, p);
        },
        p(f, p) {
            if ((p[0] & 32) | (p[1] & 8)) {
                s = f[5];
                let y;
                for (y = 0; y < s.length; y += 1) {
                    const q = Or(f, s, y);
                    h[y] ? h[y].p(q, p) : ((h[y] = Br(q)), h[y].c(), h[y].m(u.parentNode, u));
                }
                for (; y < h.length; y += 1) h[y].d(1);
                h.length = s.length;
            }
        },
        d(f) {
            ti(h, f), f && i(u);
        },
    };
}
function Br(a) {
    let u,
        s,
        h = a[94] + 1 + "",
        f,
        p,
        y,
        q = a[92].id + "",
        g,
        w,
        S,
        A;
    function M() {
        return a[53](a[92]);
    }
    return {
        c() {
            (u = l("tr")), (s = l("th")), (f = T(h)), (p = m()), (y = l("td")), (g = T(q)), (w = m()), this.h();
        },
        l(V) {
            u = r(V, "TR", { style: !0 });
            var C = o(u);
            s = r(C, "TH", { scope: !0, class: !0 });
            var Q = o(s);
            (f = k(Q, h)), Q.forEach(i), (p = v(C)), (y = r(C, "TD", { class: !0 }));
            var J = o(y);
            (g = k(J, q)), J.forEach(i), (w = v(C)), C.forEach(i), this.h();
        },
        h() {
            t(s, "scope", "row"), t(s, "class", "ps-1 p-0"), t(y, "class", "p-0 pe-1 ps-2"), R(u, "cursor", "pointer");
        },
        m(V, C) {
            me(V, u, C), e(u, s), e(s, f), e(u, p), e(u, y), e(y, g), e(u, w), S || ((A = z(u, "click", M)), (S = !0));
        },
        p(V, C) {
            (a = V), C[0] & 32 && q !== (q = a[92].id + "") && si(g, q);
        },
        d(V) {
            V && i(u), (S = !1), A();
        },
    };
}
function Hr(a) {
    let u, s, h, f, p, y, q, g, w, S, A, M, V, C, Q, J, se, Y, F, Z, le, L, W;
    return {
        c() {
            (u = l("div")),
                (s = l("label")),
                (h = T("Select field category")),
                (f = m()),
                (p = l("select")),
                (y = l("option")),
                (q = T("Select field category ... ")),
                (g = l("option")),
                (w = T("Text ")),
                (S = l("option")),
                (A = T("Number ")),
                (M = l("option")),
                (V = T("Date ")),
                (C = l("option")),
                (Q = T("Time ")),
                (J = l("option")),
                (se = T("Email ")),
                (Y = l("option")),
                (F = T("Phone ")),
                (Z = l("option")),
                (le = T("URL")),
                this.h();
        },
        l(I) {
            u = r(I, "DIV", { class: !0 });
            var O = o(u);
            s = r(O, "LABEL", { for: !0 });
            var H = o(s);
            (h = k(H, "Select field category")), H.forEach(i), (f = v(O)), (p = r(O, "SELECT", { class: !0 }));
            var j = o(p);
            y = r(j, "OPTION", {});
            var D = o(y);
            (q = k(D, "Select field category ... ")), D.forEach(i), (g = r(j, "OPTION", {}));
            var he = o(g);
            (w = k(he, "Text ")), he.forEach(i), (S = r(j, "OPTION", {}));
            var ke = o(S);
            (A = k(ke, "Number ")), ke.forEach(i), (M = r(j, "OPTION", {}));
            var oe = o(M);
            (V = k(oe, "Date ")), oe.forEach(i), (C = r(j, "OPTION", {}));
            var re = o(C);
            (Q = k(re, "Time ")), re.forEach(i), (J = r(j, "OPTION", {}));
            var N = o(J);
            (se = k(N, "Email ")), N.forEach(i), (Y = r(j, "OPTION", {}));
            var ie = o(Y);
            (F = k(ie, "Phone ")), ie.forEach(i), (Z = r(j, "OPTION", {}));
            var ve = o(Z);
            (le = k(ve, "URL")), ve.forEach(i), j.forEach(i), O.forEach(i), this.h();
        },
        h() {
            t(s, "for", "inputCategories"),
                (y.selected = !0),
                (y.__value = " Select field category ... "),
                (y.value = y.__value),
                (g.__value = " Text "),
                (g.value = g.__value),
                (S.__value = " Number "),
                (S.value = S.__value),
                (M.__value = " Date "),
                (M.value = M.__value),
                (C.__value = " Time "),
                (C.value = C.__value),
                (J.__value = " Email "),
                (J.value = J.__value),
                (Y.__value = " Phone "),
                (Y.value = Y.__value),
                (Z.__value = " URL "),
                (Z.value = Z.__value),
                t(p, "class", "form-select svelte-5fpjhc"),
                a[30] === void 0 && zr(() => a[57].call(p)),
                t(u, "class", "form-group");
        },
        m(I, O) {
            me(I, u, O),
                e(u, s),
                e(s, h),
                e(u, f),
                e(u, p),
                e(p, y),
                e(y, q),
                e(p, g),
                e(g, w),
                e(p, S),
                e(S, A),
                e(p, M),
                e(M, V),
                e(p, C),
                e(C, Q),
                e(p, J),
                e(J, se),
                e(p, Y),
                e(Y, F),
                e(p, Z),
                e(Z, le),
                Qs(p, a[30]),
                L || ((W = z(p, "change", a[57])), (L = !0));
        },
        p(I, O) {
            O[0] & 1073741824 && Qs(p, I[30]);
        },
        d(I) {
            I && i(u), (L = !1), W();
        },
    };
}
function Mr(a) {
    let u, s, h, f, p, y, q;
    return {
        c() {
            (u = l("div")), (s = l("label")), (h = T("Default Value")), (f = m()), (p = l("input")), this.h();
        },
        l(g) {
            u = r(g, "DIV", { class: !0 });
            var w = o(u);
            s = r(w, "LABEL", { for: !0 });
            var S = o(s);
            (h = k(S, "Default Value")), S.forEach(i), (f = v(w)), (p = r(w, "INPUT", { type: !0, id: !0, class: !0, placeholder: !0 })), w.forEach(i), this.h();
        },
        h() {
            t(s, "for", "defaultValue"),
                t(p, "type", "text"),
                t(p, "id", "defaultValue"),
                t(p, "class", "form-control svelte-5fpjhc"),
                t(p, "placeholder", "Specify the default value ..."),
                t(u, "class", "form-group");
        },
        m(g, w) {
            me(g, u, w), e(u, s), e(s, h), e(u, f), e(u, p), x(p, a[3]), y || ((q = z(p, "input", a[58])), (y = !0));
        },
        p(g, w) {
            w[0] & 8 && p.value !== g[3] && x(p, g[3]);
        },
        d(g) {
            g && i(u), (y = !1), q();
        },
    };
}
function Fr(a) {
    let u, s, h, f, p, y, q;
    return {
        c() {
            (u = l("button")), (s = T("Update field")), (h = m()), (f = l("button")), (p = T("Remove field")), this.h();
        },
        l(g) {
            u = r(g, "BUTTON", { class: !0 });
            var w = o(u);
            (s = k(w, "Update field")), w.forEach(i), (h = v(g)), (f = r(g, "BUTTON", { class: !0 }));
            var S = o(f);
            (p = k(S, "Remove field")), S.forEach(i), this.h();
        },
        h() {
            t(u, "class", "btn btn-secondary btn-sm btn-block mt-3 svelte-5fpjhc"), t(f, "class", "btn btn-danger btn-sm btn-block mt-3 svelte-5fpjhc");
        },
        m(g, w) {
            me(g, u, w), e(u, s), me(g, h, w), me(g, f, w), e(f, p), y || ((q = [z(u, "click", a[36]), z(f, "click", a[37])]), (y = !0));
        },
        p: Zs,
        d(g) {
            g && i(u), g && i(h), g && i(f), (y = !1), Rl(q);
        },
    };
}
function Rr(a) {
    let u, s;
    return {
        c() {
            (u = l("lottie-player")), this.h();
        },
        l(h) {
            (u = r(h, "LOTTIE-PLAYER", {
                src: !0,
                background: !0,
                speed: !0,
                style: !0,
                loop: !0,
                nocontrols: !0,
            })),
                o(u).forEach(i),
                this.h();
        },
        h() {
            xs(u.src, (s = oi)) || Oe(u, "src", s),
                Oe(u, "background", "transparent"),
                Oe(u, "speed", "1"),
                R(u, "height", "300px"),
                R(u, "margin-top", "30px"),
                Oe(u, "loop", ""),
                Oe(u, "nocontrols", "");
        },
        m(h, f) {
            me(h, u, f);
        },
        p: Zs,
        d(h) {
            h && i(u);
        },
    };
}
function ai(a) {
    let u, s, h, f, p, y, q, g, w, S, A, M, V, C, Q, J, se, Y;
    return {
        c() {
            (u = l("div")),
                (s = l("div")),
                (h = l("div")),
                (f = l("h1")),
                (p = l("i")),
                (y = T(`
								Set admin`)),
                (q = m()),
                (g = l("div")),
                (w = l("div")),
                (S = m()),
                (A = l("input")),
                (M = m()),
                (V = l("button")),
                (C = T("Add")),
                (Q = m()),
                (J = l("div")),
                this.h();
        },
        l(F) {
            u = r(F, "DIV", { class: !0 });
            var Z = o(u);
            s = r(Z, "DIV", { class: !0 });
            var le = o(s);
            h = r(le, "DIV", { class: !0 });
            var L = o(h);
            f = r(L, "H1", { class: !0, style: !0 });
            var W = o(f);
            (p = r(W, "I", { class: !0 })),
                o(p).forEach(i),
                (y = k(
                    W,
                    `
								Set admin`
                )),
                W.forEach(i),
                (q = v(L)),
                (g = r(L, "DIV", { class: !0 }));
            var I = o(g);
            (w = r(I, "DIV", { class: !0, style: !0 })),
                o(w).forEach(i),
                (S = v(I)),
                (A = r(I, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })),
                (M = v(I)),
                (V = r(I, "BUTTON", { type: !0, class: !0 }));
            var O = o(V);
            (C = k(O, "Add")), O.forEach(i), I.forEach(i), (Q = v(L)), (J = r(L, "DIV", { style: !0 }));
            var H = o(J);
            H.forEach(i), L.forEach(i), le.forEach(i), Z.forEach(i), this.h();
        },
        h() {
            t(p, "class", "fa-solid fa-gear me-1"),
                t(f, "class", "card-header"),
                R(f, "padding", "20px"),
                t(w, "class", "showSelectedAdmin d-flex"),
                R(w, "width", "fit-content"),
                R(w, "flex-flow", "row wrap"),
                t(A, "type", "text"),
                t(A, "class", "form-control svelte-5fpjhc"),
                t(A, "id", "admin"),
                t(A, "placeholder", "Enter admin id ..."),
                t(V, "type", "button"),
                t(V, "class", "btn btn-primary btn-sm svelte-5fpjhc"),
                t(g, "class", "card-body"),
                R(J, "background-color", "white"),
                t(h, "class", "card p-0 mb-3 col-md-5 svelte-5fpjhc"),
                t(s, "class", "row col-12 justify-content-center"),
                t(u, "class", "slide svelte-5fpjhc");
        },
        m(F, Z) {
            me(F, u, Z),
                e(u, s),
                e(s, h),
                e(h, f),
                e(f, p),
                e(f, y),
                e(h, q),
                e(h, g),
                e(g, w),
                a[63](w),
                e(g, S),
                e(g, A),
                x(A, a[6]),
                e(g, M),
                e(g, V),
                e(V, C),
                e(h, Q),
                e(h, J),
                (J.innerHTML = a[40]),
                a[66](J),
                se || ((Y = [z(A, "input", a[64]), z(V, "click", a[65])]), (se = !0));
        },
        p(F, Z) {
            Z[0] & 64 && A.value !== F[6] && x(A, F[6]);
        },
        d(F) {
            F && i(u), a[63](null), a[66](null), (se = !1), Rl(Y);
        },
    };
}
function ci(a) {
    let u,
        s,
        h,
        f,
        p,
        y,
        q,
        g,
        w,
        S,
        A,
        M,
        V,
        C,
        Q,
        J,
        se,
        Y,
        F,
        Z,
        le,
        L,
        W,
        I,
        O,
        H,
        j,
        D,
        he,
        ke,
        oe,
        re,
        N,
        ie,
        ve,
        ae,
        We,
        te,
        K,
        $,
        ne,
        Ie,
        X,
        _e,
        jt,
        Dt,
        es,
        ts,
        Ue,
        Se,
        E,
        Be,
        He,
        Te,
        ss,
        U,
        ls,
        Ft,
        Ve,
        rt,
        Le,
        rs,
        it,
        je,
        is,
        Nt,
        ns,
        os,
        Me,
        nt,
        De,
        as,
        ot,
        Ne,
        cs,
        qt,
        ds,
        us,
        at,
        be,
        fs,
        ge,
        ys,
        ps,
        ct,
        hs,
        Ge,
        ye,
        Fe,
        Ke,
        dt,
        ms,
        vs,
        G,
        n,
        d,
        c,
        _,
        B,
        ut,
        _s,
        Pe,
        Ys,
        Re,
        Rt,
        Ws,
        ze,
        zt,
        Gs,
        Ks,
        Vt,
        Xs,
        $s,
        Ce,
        el,
        ft,
        Jt,
        tl,
        sl,
        Ee,
        Xe,
        ll,
        pt,
        rl,
        ht,
        il,
        mt,
        nl,
        ol,
        Es,
        ws,
        vt,
        _t,
        $e,
        al,
        Pt,
        cl,
        dl,
        bt,
        et,
        ul,
        Ct,
        fl,
        pl,
        tt,
        gt,
        hl,
        Ts,
        ml,
        vl,
        Ae,
        st,
        bs,
        _l,
        bl,
        ks,
        xt,
        gl,
        At,
        yl,
        El,
        Qt,
        Is,
        yt,
        Ot,
        Zt,
        wl,
        Ss,
        Et,
        wt,
        qe,
        Yt,
        Tl,
        kl,
        Tt,
        Je,
        Il,
        Ut,
        Sl,
        Ll,
        kt,
        xe,
        jl,
        Bt,
        Dl,
        Nl,
        It,
        Qe,
        ql,
        Ht,
        Vl,
        Pl,
        Mt,
        Cl,
        Al,
        zl,
        ce = a[5].length != 0 && Ur(a),
        de = a[4] === "Short answer question/ Single-line text input field" && Hr(a),
        ue = (a[4] === "Long answer question/ Multi-line text input field" || a[4] === "Short answer question/ Single-line text input field") && Mr(a),
        fe = a[29] && Fr(a),
        pe = a[18].length == 0 && Rr(),
        lt = a[32] === "super_admin" && ai(a);
    return {
        c() {
            (u = l("script")),
                (h = m()),
                (f = l("section")),
                (p = l("img")),
                (q = m()),
                (g = l("div")),
                (w = m()),
                (S = l("nav")),
                (A = l("div")),
                (M = l("div")),
                (V = l("span")),
                (C = m()),
                (Q = l("h4")),
                (J = T("Create new contest")),
                (se = m()),
                (Y = l("div")),
                (F = l("button")),
                (Z = l("i")),
                (le = T(`
					Back`)),
                (L = m()),
                (W = l("div")),
                (I = l("div")),
                (O = l("div")),
                (H = l("div")),
                (j = l("div")),
                (D = l("h1")),
                (he = l("i")),
                (ke = T(`
							Basic info`)),
                (oe = m()),
                (re = l("div")),
                (N = l("form")),
                (ie = l("div")),
                (ve = l("h6")),
                (ae = T("Contest name")),
                (We = m()),
                (te = l("input")),
                (K = m()),
                ($ = l("div")),
                (ne = l("h6")),
                (Ie = T("Contest Link")),
                (X = m()),
                (_e = l("input")),
                (jt = m()),
                (Dt = l("h6")),
                (es = T("Start")),
                (ts = m()),
                (Ue = l("div")),
                (Se = l("div")),
                (E = l("input")),
                (Be = m()),
                (He = l("div")),
                (Te = l("input")),
                (ss = m()),
                (U = l("h6")),
                (ls = T("Registration start")),
                (Ft = m()),
                (Ve = l("div")),
                (rt = l("div")),
                (Le = l("input")),
                (rs = m()),
                (it = l("div")),
                (je = l("input")),
                (is = m()),
                (Nt = l("h6")),
                (ns = T("Registration end")),
                (os = m()),
                (Me = l("div")),
                (nt = l("div")),
                (De = l("input")),
                (as = m()),
                (ot = l("div")),
                (Ne = l("input")),
                (cs = m()),
                (qt = l("h6")),
                (ds = T("Number of contestants per team")),
                (us = m()),
                (at = l("div")),
                (be = l("input")),
                (fs = m()),
                (ge = l("lottie-player")),
                (ps = m()),
                (ct = l("div")),
                (hs = m()),
                (Ge = l("div")),
                (ye = l("div")),
                (Fe = l("div")),
                (Ke = l("h1")),
                (dt = l("i")),
                (ms = T(`
							Create Field`)),
                (vs = m()),
                (G = l("div")),
                (n = l("div")),
                (d = l("label")),
                (c = T("Question Id")),
                (_ = m()),
                (B = l("i")),
                (ut = T(">> Internal name")),
                (_s = m()),
                (Pe = l("input")),
                (Ys = m()),
                (Re = l("table")),
                (Rt = l("tbody")),
                ce && ce.c(),
                (Ws = m()),
                (ze = l("div")),
                (zt = l("label")),
                (Gs = T("Question title")),
                (Ks = m()),
                (Vt = l("i")),
                (Xs = T(">> Displayed name")),
                ($s = m()),
                (Ce = l("input")),
                (el = m()),
                (ft = l("div")),
                (Jt = l("label")),
                (tl = T("Question Type")),
                (sl = m()),
                (Ee = l("select")),
                (Xe = l("option")),
                (ll = T("Select question type ... ")),
                (pt = l("option")),
                (rl = T("Long answer question/ Multi-line text input field")),
                (ht = l("option")),
                (il = T("Short answer question/ Single-line text input field")),
                (mt = l("option")),
                (nl = T("Upload file")),
                (ol = m()),
                de && de.c(),
                (Es = m()),
                ue && ue.c(),
                (ws = m()),
                (vt = l("div")),
                (_t = l("div")),
                ($e = l("input")),
                (al = m()),
                (Pt = l("label")),
                (cl = T("Visible")),
                (dl = m()),
                (bt = l("div")),
                (et = l("input")),
                (ul = m()),
                (Ct = l("label")),
                (fl = T("Required")),
                (pl = m()),
                (tt = l("div")),
                (gt = l("button")),
                (hl = T("Add field")),
                (ml = m()),
                fe && fe.c(),
                (vl = m()),
                (Ae = l("div")),
                (st = l("h6")),
                (bs = l("i")),
                (_l = T(`
							Form Preview`)),
                (bl = m()),
                pe && pe.c(),
                (ks = m()),
                (xt = l("div")),
                (gl = m()),
                (At = l("div")),
                (yl = m()),
                lt && lt.c(),
                (El = m()),
                (Qt = l("div")),
                (Is = m()),
                (yt = l("div")),
                (Ot = l("div")),
                (Zt = l("span")),
                (wl = T("Loading...")),
                (Ss = m()),
                (Et = l("div")),
                (wt = l("div")),
                (qe = l("div")),
                (Yt = l("h5")),
                (Tl = T("What do you want to update?")),
                (kl = m()),
                (Tt = l("div")),
                (Je = l("input")),
                (Il = m()),
                (Ut = l("label")),
                (Sl = T("Everything")),
                (Ll = m()),
                (kt = l("div")),
                (xe = l("input")),
                (jl = m()),
                (Bt = l("label")),
                (Dl = T("Admins list")),
                (Nl = m()),
                (It = l("div")),
                (Qe = l("input")),
                (ql = m()),
                (Ht = l("label")),
                (Vl = T("Application' form")),
                (Pl = m()),
                (Mt = l("button")),
                (Cl = T("Update")),
                this.h();
        },
        l(b) {
            const P = Kr('[data-svelte="svelte-1xsxech"]', Ml.head);
            u = r(P, "SCRIPT", { src: !0 });
            var xr = o(u);
            xr.forEach(i), P.forEach(i), (h = v(b)), (f = r(b, "SECTION", { class: !0 }));
            var Ze = o(f);
            (p = r(Ze, "IMG", { class: !0, src: !0, alt: !0 })), (q = v(Ze)), (g = r(Ze, "DIV", { class: !0 })), o(g).forEach(i), (w = v(Ze)), (S = r(Ze, "NAV", { class: !0 }));
            var Jl = o(S);
            A = r(Jl, "DIV", { class: !0 });
            var Ls = o(A);
            M = r(Ls, "DIV", { class: !0 });
            var js = o(M);
            (V = r(js, "SPAN", { class: !0 })), o(V).forEach(i), (C = v(js)), (Q = r(js, "H4", { class: !0 }));
            var xl = o(Q);
            (J = k(xl, "Create new contest")), xl.forEach(i), js.forEach(i), (se = v(Ls)), (Y = r(Ls, "DIV", { class: !0 }));
            var Ql = o(Y);
            F = r(Ql, "BUTTON", { class: !0 });
            var Ol = o(F);
            (Z = r(Ol, "I", { class: !0 })),
                o(Z).forEach(i),
                (le = k(
                    Ol,
                    `
					Back`
                )),
                Ol.forEach(i),
                Ql.forEach(i),
                Ls.forEach(i),
                Jl.forEach(i),
                (L = v(Ze)),
                (W = r(Ze, "DIV", { class: !0 }));
            var Zl = o(W);
            I = r(Zl, "DIV", { class: !0 });
            var Wt = o(I);
            O = r(Wt, "DIV", { class: !0, style: !0 });
            var Yl = o(O);
            H = r(Yl, "DIV", { class: !0, style: !0 });
            var Gt = o(H);
            j = r(Gt, "DIV", { class: !0, style: !0 });
            var Ds = o(j);
            D = r(Ds, "H1", { class: !0, style: !0 });
            var Ul = o(D);
            (he = r(Ul, "I", { class: !0 })),
                o(he).forEach(i),
                (ke = k(
                    Ul,
                    `
							Basic info`
                )),
                Ul.forEach(i),
                (oe = v(Ds)),
                (re = r(Ds, "DIV", { class: !0 }));
            var Wl = o(re);
            N = r(Wl, "FORM", {});
            var ee = o(N);
            ie = r(ee, "DIV", { class: !0 });
            var Ns = o(ie);
            ve = r(Ns, "H6", {});
            var Gl = o(ve);
            (ae = k(Gl, "Contest name")),
                Gl.forEach(i),
                (We = v(Ns)),
                (te = r(Ns, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })),
                Ns.forEach(i),
                (K = v(ee)),
                ($ = r(ee, "DIV", { class: !0 }));
            var qs = o($);
            ne = r(qs, "H6", {});
            var Kl = o(ne);
            (Ie = k(Kl, "Contest Link")), Kl.forEach(i), (X = v(qs)), (_e = r(qs, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), qs.forEach(i), (jt = v(ee)), (Dt = r(ee, "H6", {}));
            var Xl = o(Dt);
            (es = k(Xl, "Start")), Xl.forEach(i), (ts = v(ee)), (Ue = r(ee, "DIV", { class: !0 }));
            var Vs = o(Ue);
            Se = r(Vs, "DIV", { class: !0 });
            var $l = o(Se);
            (E = r($l, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), $l.forEach(i), (Be = v(Vs)), (He = r(Vs, "DIV", { class: !0 }));
            var er = o(He);
            (Te = r(er, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), er.forEach(i), Vs.forEach(i), (ss = v(ee)), (U = r(ee, "H6", {}));
            var tr = o(U);
            (ls = k(tr, "Registration start")), tr.forEach(i), (Ft = v(ee)), (Ve = r(ee, "DIV", { class: !0 }));
            var Ps = o(Ve);
            rt = r(Ps, "DIV", { class: !0 });
            var sr = o(rt);
            (Le = r(sr, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), sr.forEach(i), (rs = v(Ps)), (it = r(Ps, "DIV", { class: !0 }));
            var lr = o(it);
            (je = r(lr, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), lr.forEach(i), Ps.forEach(i), (is = v(ee)), (Nt = r(ee, "H6", {}));
            var rr = o(Nt);
            (ns = k(rr, "Registration end")), rr.forEach(i), (os = v(ee)), (Me = r(ee, "DIV", { class: !0 }));
            var Cs = o(Me);
            nt = r(Cs, "DIV", { class: !0 });
            var ir = o(nt);
            (De = r(ir, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), ir.forEach(i), (as = v(Cs)), (ot = r(Cs, "DIV", { class: !0 }));
            var nr = o(ot);
            (Ne = r(nr, "INPUT", { type: !0, class: !0, id: !0, placeholder: !0 })), nr.forEach(i), Cs.forEach(i), (cs = v(ee)), (qt = r(ee, "H6", {}));
            var or = o(qt);
            (ds = k(or, "Number of contestants per team")), or.forEach(i), (us = v(ee)), (at = r(ee, "DIV", { class: !0 }));
            var ar = o(at);
            (be = r(ar, "INPUT", {
                type: !0,
                min: !0,
                class: !0,
                id: !0,
                placeholder: !0,
            })),
                ar.forEach(i),
                ee.forEach(i),
                Wl.forEach(i),
                Ds.forEach(i),
                (fs = v(Gt)),
                (ge = r(Gt, "LOTTIE-PLAYER", {
                    class: !0,
                    src: !0,
                    style: !0,
                    background: !0,
                    speed: !0,
                    loop: !0,
                    nocontrols: !0,
                })),
                o(ge).forEach(i),
                (ps = v(Gt)),
                (ct = r(Gt, "DIV", {}));
            var Qr = o(ct);
            Qr.forEach(i), Gt.forEach(i), Yl.forEach(i), (hs = v(Wt)), (Ge = r(Wt, "DIV", { class: !0, style: !0 }));
            var cr = o(Ge);
            ye = r(cr, "DIV", { class: !0, style: !0 });
            var Kt = o(ye);
            Fe = r(Kt, "DIV", { class: !0 });
            var As = o(Fe);
            Ke = r(As, "H1", { class: !0 });
            var Bl = o(Ke);
            (dt = r(Bl, "I", { class: !0 })),
                o(dt).forEach(i),
                (ms = k(
                    Bl,
                    `
							Create Field`
                )),
                Bl.forEach(i),
                (vs = v(As)),
                (G = r(As, "DIV", { class: !0 }));
            var we = o(G);
            n = r(we, "DIV", { class: !0, style: !0 });
            var St = o(n);
            d = r(St, "LABEL", { for: !0 });
            var dr = o(d);
            (c = k(dr, "Question Id")), dr.forEach(i), (_ = v(St)), (B = r(St, "I", { class: !0, style: !0 }));
            var ur = o(B);
            (ut = k(ur, ">> Internal name")),
                ur.forEach(i),
                (_s = v(St)),
                (Pe = r(St, "INPUT", { type: !0, class: !0, placeholder: !0 })),
                (Ys = v(St)),
                (Re = r(St, "TABLE", { class: !0, style: !0 }));
            var fr = o(Re);
            Rt = r(fr, "TBODY", {});
            var pr = o(Rt);
            ce && ce.l(pr), pr.forEach(i), fr.forEach(i), St.forEach(i), (Ws = v(we)), (ze = r(we, "DIV", { class: !0 }));
            var Xt = o(ze);
            zt = r(Xt, "LABEL", { for: !0 });
            var hr = o(zt);
            (Gs = k(hr, "Question title")), hr.forEach(i), (Ks = v(Xt)), (Vt = r(Xt, "I", { class: !0, style: !0 }));
            var mr = o(Vt);
            (Xs = k(mr, ">> Displayed name")),
                mr.forEach(i),
                ($s = v(Xt)),
                (Ce = r(Xt, "INPUT", { type: !0, id: !0, class: !0, placeholder: !0 })),
                Xt.forEach(i),
                (el = v(we)),
                (ft = r(we, "DIV", { class: !0 }));
            var Os = o(ft);
            Jt = r(Os, "LABEL", { for: !0 });
            var vr = o(Jt);
            (tl = k(vr, "Question Type")), vr.forEach(i), (sl = v(Os)), (Ee = r(Os, "SELECT", { class: !0, id: !0 }));
            var gs = o(Ee);
            Xe = r(gs, "OPTION", {});
            var _r = o(Xe);
            (ll = k(_r, "Select question type ... ")), _r.forEach(i), (pt = r(gs, "OPTION", {}));
            var br = o(pt);
            (rl = k(br, "Long answer question/ Multi-line text input field")), br.forEach(i), (ht = r(gs, "OPTION", {}));
            var gr = o(ht);
            (il = k(gr, "Short answer question/ Single-line text input field")), gr.forEach(i), (mt = r(gs, "OPTION", {}));
            var yr = o(mt);
            (nl = k(yr, "Upload file")), yr.forEach(i), gs.forEach(i), Os.forEach(i), (ol = v(we)), de && de.l(we), (Es = v(we)), ue && ue.l(we), (ws = v(we)), (vt = r(we, "DIV", { class: !0 }));
            var Us = o(vt);
            _t = r(Us, "DIV", { class: !0 });
            var Bs = o(_t);
            ($e = r(Bs, "INPUT", { class: !0, type: !0, id: !0 })), (al = v(Bs)), (Pt = r(Bs, "LABEL", { class: !0, for: !0 }));
            var Er = o(Pt);
            (cl = k(Er, "Visible")), Er.forEach(i), Bs.forEach(i), (dl = v(Us)), (bt = r(Us, "DIV", { class: !0 }));
            var Hs = o(bt);
            (et = r(Hs, "INPUT", { class: !0, type: !0, id: !0 })), (ul = v(Hs)), (Ct = r(Hs, "LABEL", { class: !0, for: !0 }));
            var wr = o(Ct);
            (fl = k(wr, "Required")), wr.forEach(i), Hs.forEach(i), Us.forEach(i), (pl = v(we)), (tt = r(we, "DIV", { class: !0 }));
            var Ms = o(tt);
            gt = r(Ms, "BUTTON", { class: !0 });
            var Tr = o(gt);
            (hl = k(Tr, "Add field")), Tr.forEach(i), (ml = v(Ms)), fe && fe.l(Ms), Ms.forEach(i), we.forEach(i), As.forEach(i), (vl = v(Kt)), (Ae = r(Kt, "DIV", { class: !0 }));
            var $t = o(Ae);
            st = r($t, "H6", { class: !0, style: !0 });
            var Hl = o(st);
            (bs = r(Hl, "I", { class: !0 })),
                o(bs).forEach(i),
                (_l = k(
                    Hl,
                    `
							Form Preview`
                )),
                Hl.forEach(i),
                (bl = v($t)),
                pe && pe.l($t),
                (ks = v($t)),
                (xt = r($t, "DIV", { class: !0 })),
                o(xt).forEach(i),
                $t.forEach(i),
                (gl = v(Kt)),
                (At = r(Kt, "DIV", { style: !0 }));
            var Zr = o(At);
            Zr.forEach(i),
                Kt.forEach(i),
                cr.forEach(i),
                (yl = v(Wt)),
                lt && lt.l(Wt),
                Wt.forEach(i),
                Zl.forEach(i),
                (El = v(Ze)),
                (Qt = r(Ze, "DIV", { class: !0 })),
                o(Qt).forEach(i),
                Ze.forEach(i),
                (Is = v(b)),
                (yt = r(b, "DIV", { class: !0 }));
            var kr = o(yt);
            Ot = r(kr, "DIV", { class: !0, role: !0 });
            var Ir = o(Ot);
            Zt = r(Ir, "SPAN", { class: !0 });
            var Sr = o(Zt);
            (wl = k(Sr, "Loading...")), Sr.forEach(i), Ir.forEach(i), kr.forEach(i), (Ss = v(b)), (Et = r(b, "DIV", { class: !0 }));
            var Lr = o(Et);
            wt = r(Lr, "DIV", { class: !0 });
            var Fs = o(wt);
            qe = r(Fs, "DIV", { class: !0 });
            var Lt = o(qe);
            Yt = r(Lt, "H5", { class: !0 });
            var jr = o(Yt);
            (Tl = k(jr, "What do you want to update?")), jr.forEach(i), (kl = v(Lt)), (Tt = r(Lt, "DIV", { class: !0 }));
            var Rs = o(Tt);
            (Je = r(Rs, "INPUT", { class: !0, type: !0, role: !0, id: !0 })), (Il = v(Rs)), (Ut = r(Rs, "LABEL", { class: !0, for: !0 }));
            var Dr = o(Ut);
            (Sl = k(Dr, "Everything")), Dr.forEach(i), Rs.forEach(i), (Ll = v(Lt)), (kt = r(Lt, "DIV", { class: !0 }));
            var zs = o(kt);
            (xe = r(zs, "INPUT", { class: !0, type: !0, role: !0, id: !0 })), (jl = v(zs)), (Bt = r(zs, "LABEL", { class: !0, for: !0 }));
            var Nr = o(Bt);
            (Dl = k(Nr, "Admins list")), Nr.forEach(i), zs.forEach(i), (Nl = v(Lt)), (It = r(Lt, "DIV", { class: !0 }));
            var Js = o(It);
            (Qe = r(Js, "INPUT", { class: !0, type: !0, role: !0, id: !0 })), (ql = v(Js)), (Ht = r(Js, "LABEL", { class: !0, for: !0 }));
            var qr = o(Ht);
            (Vl = k(qr, "Application' form")), qr.forEach(i), Js.forEach(i), Lt.forEach(i), (Pl = v(Fs)), (Mt = r(Fs, "BUTTON", { class: !0 }));
            var Vr = o(Mt);
            (Cl = k(Vr, "Update")), Vr.forEach(i), Fs.forEach(i), Lr.forEach(i), this.h();
        },
        h() {
            (Ml.title = "App Name| Create contests"),
                (u.defer = !0),
                xs(u.src, (s = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js")) || t(u, "src", s),
                t(p, "class", "d1 svelte-5fpjhc"),
                xs(p.src, (y = li)) || t(p, "src", y),
                t(p, "alt", ""),
                t(g, "class", "d2 svelte-5fpjhc"),
                t(V, "class", "fa fa-plus-circle ms-3 me-3 svelte-5fpjhc"),
                t(Q, "class", "p-0 m-0"),
                t(M, "class", "navbar-brand d-flex col align-items-center svelte-5fpjhc"),
                t(Z, "class", "fa fa-arrow-left svelte-5fpjhc"),
                t(F, "class", "btn d-flex gap-3 align-items-center"),
                t(Y, "class", "navbar-nav"),
                t(A, "class", "container"),
                t(S, "class", "navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm svelte-5fpjhc"),
                t(he, "class", "fa fa-info-circle me-2 svelte-5fpjhc"),
                t(D, "class", "card-title"),
                R(D, "padding", "15px"),
                R(D, "margin-bottom", "10px"),
                t(te, "type", "text"),
                t(te, "class", "form-control svelte-5fpjhc"),
                t(te, "id", "name"),
                t(te, "placeholder", "Contest name"),
                t(ie, "class", "form-group"),
                t(_e, "type", "text"),
                t(_e, "class", "form-control svelte-5fpjhc"),
                t(_e, "id", "link"),
                t(_e, "placeholder", "Contest link"),
                t($, "class", "form-group"),
                t(E, "type", "date"),
                t(E, "class", "form-control svelte-5fpjhc"),
                t(E, "id", "startDate"),
                t(E, "placeholder", "Start date"),
                t(Se, "class", "col-md-7 form-group"),
                t(Te, "type", "time"),
                t(Te, "class", "form-control svelte-5fpjhc"),
                t(Te, "id", "startTime"),
                t(Te, "placeholder", "Start time"),
                t(He, "class", "col-md-5 form-group"),
                t(Ue, "class", "row p-0"),
                t(Le, "type", "date"),
                t(Le, "class", "form-control svelte-5fpjhc"),
                t(Le, "id", "regStart"),
                t(Le, "placeholder", "Registration start date"),
                t(rt, "class", "col-md-7 form-group"),
                t(je, "type", "time"),
                t(je, "class", "form-control svelte-5fpjhc"),
                t(je, "id", "regStartTime"),
                t(je, "placeholder", "Registration start time"),
                t(it, "class", "col-md-5 form-group"),
                t(Ve, "class", "row p-0"),
                t(De, "type", "date"),
                t(De, "class", "form-control svelte-5fpjhc"),
                t(De, "id", "regEnd"),
                t(De, "placeholder", "Registration end date"),
                t(nt, "class", "col-md-7 form-group"),
                t(Ne, "type", "time"),
                t(Ne, "class", "form-control svelte-5fpjhc"),
                t(Ne, "id", "regEndTime"),
                t(Ne, "placeholder", "Registration end time"),
                t(ot, "class", "col-md-5 form-group"),
                t(Me, "class", "row p-0"),
                t(be, "type", "number"),
                t(be, "min", "1"),
                t(be, "class", "form-control"),
                t(be, "id", "contestantsPerTeam"),
                t(be, "placeholder", "Enter a Number ... "),
                t(at, "class", "form-group"),
                t(re, "class", "card-body"),
                t(j, "class", "card mb-4 col-md p-0 basicInfo"),
                R(j, "border", "10px solid white"),
                Oe(ge, "class", "col-md lottie lottieInfo svelte-5fpjhc"),
                xs(ge.src, (ys = ni)) || Oe(ge, "src", ys),
                R(ge, "width", "400px"),
                Oe(ge, "background", "transparent m-4"),
                Oe(ge, "speed", "1"),
                Oe(ge, "loop", ""),
                Oe(ge, "nocontrols", ""),
                t(H, "class", "row shadow-sm justify-content-betweens align-items-center p-0 m-0"),
                R(H, "position", "relative"),
                R(H, "z-index", "10"),
                R(H, "background-color", "white"),
                t(O, "class", "slide svelte-5fpjhc"),
                R(O, "position", "relative"),
                t(dt, "class", "fa-brands fa-wpforms me-2"),
                R(dt, "font-size", "30px", !1),
                t(Ke, "class", "m-0 card-title d-flex align-items-center p-3 border-0 rounded-0"),
                t(d, "for", "question"),
                t(B, "class", "ms-2"),
                R(B, "font-size", "13px"),
                t(Pe, "type", "text"),
                t(Pe, "class", "form-control m-0 svelte-5fpjhc"),
                t(Pe, "placeholder", "Enter question id"),
                t(Re, "class", "table table-striped collapse"),
                R(Re, "position", "absolute"),
                R(Re, "background-color", "white"),
                R(Re, "font-size", "13px"),
                t(n, "class", "form-group"),
                R(n, "position", "relative"),
                R(n, "margin-bottom", "20px"),
                t(zt, "for", "question"),
                t(Vt, "class", "ms-2"),
                R(Vt, "font-size", "13px"),
                t(Ce, "type", "text"),
                t(Ce, "id", "question"),
                t(Ce, "class", "form-control svelte-5fpjhc"),
                t(Ce, "placeholder", "Add a field"),
                t(ze, "class", "form-group"),
                t(Jt, "for", "QuestionType"),
                (Xe.selected = !0),
                (Xe.__value = " Select question type ... "),
                (Xe.value = Xe.__value),
                (pt.__value = "Long answer question/ Multi-line text input field"),
                (pt.value = pt.__value),
                (ht.__value = "Short answer question/ Single-line text input field"),
                (ht.value = ht.__value),
                (mt.__value = "Upload file"),
                (mt.value = mt.__value),
                t(Ee, "class", "form-select svelte-5fpjhc"),
                t(Ee, "id", "QuestionType"),
                a[4] === void 0 && zr(() => a[56].call(Ee)),
                t(ft, "class", "form-group"),
                t($e, "class", "form-check-input"),
                t($e, "type", "checkbox"),
                t($e, "id", "Visible"),
                t(Pt, "class", "form-check-label"),
                t(Pt, "for", "Visible"),
                t(_t, "class", "form-check form-switch svelte-5fpjhc"),
                t(et, "class", "form-check-input"),
                t(et, "type", "checkbox"),
                t(et, "id", "Required"),
                t(Ct, "class", "form-check-label"),
                t(Ct, "for", "Required"),
                t(bt, "class", "form-check form-switch svelte-5fpjhc"),
                t(vt, "class", "form-group field_options"),
                t(gt, "class", (Ts = "btn btn-primary btn-sm btn-block mt-3 " + (a[29] ? "disabled" : "") + " svelte-5fpjhc")),
                t(tt, "class", "btn-group gap-1 col-12 justify-content-center align-items-center"),
                t(G, "class", "card-body form-creator"),
                t(Fe, "class", "card col-md border-0 rounded-0 svelte-5fpjhc"),
                t(bs, "class", "fa-regular fa-eye me-2"),
                t(st, "class", "card-title form-preview-title border-bottom"),
                R(st, "margin", "0px -12px"),
                R(st, "padding", "15px"),
                t(xt, "class", "card-body"),
                t(Ae, "class", "card col-md form-preview rounded-0 border-bottom-0 svelte-5fpjhc"),
                R(At, "background-color", "white"),
                t(ye, "class", "row shadow p-0 m-0 justify-content-between"),
                R(ye, "position", "relative"),
                R(ye, "z-index", "10"),
                t(Ge, "class", "slide svelte-5fpjhc"),
                R(Ge, "position", "relative"),
                t(I, "class", "slideCont svelte-5fpjhc"),
                t(W, "class", "container-fluid p-0"),
                t(Qt, "class", "alertCont svelte-5fpjhc"),
                t(f, "class", "createContest svelte-5fpjhc"),
                t(Zt, "class", "visually-hidden"),
                t(Ot, "class", "spinner-border svelte-5fpjhc"),
                t(Ot, "role", "status"),
                t(yt, "class", "loading svelte-5fpjhc"),
                t(Yt, "class", "card-title"),
                t(Je, "class", "form-check-input"),
                t(Je, "type", "checkbox"),
                t(Je, "role", "switch"),
                t(Je, "id", "flexSwitchCheck1"),
                t(Ut, "class", "form-check-label"),
                t(Ut, "for", "flexSwitchCheck1"),
                t(Tt, "class", "form-check form-switch svelte-5fpjhc"),
                t(xe, "class", "form-check-input"),
                t(xe, "type", "checkbox"),
                t(xe, "role", "switch"),
                t(xe, "id", "flexSwitchCheck2"),
                t(Bt, "class", "form-check-label"),
                t(Bt, "for", "flexSwitchCheck2"),
                t(kt, "class", "form-check form-switch svelte-5fpjhc"),
                t(Qe, "class", "form-check-input"),
                t(Qe, "type", "checkbox"),
                t(Qe, "role", "switch"),
                t(Qe, "id", "flexSwitchCheck3"),
                t(Ht, "class", "form-check-label"),
                t(Ht, "for", "flexSwitchCheck3"),
                t(It, "class", "form-check form-switch svelte-5fpjhc"),
                t(qe, "class", "card-body"),
                t(Mt, "class", "btn btn-primary btn-sm svelte-5fpjhc"),
                t(wt, "class", "card svelte-5fpjhc"),
                t(Et, "class", "choose-update shadow svelte-5fpjhc");
        },
        m(b, P) {
            e(Ml.head, u),
                me(b, h, P),
                me(b, f, P),
                e(f, p),
                e(f, q),
                e(f, g),
                e(f, w),
                e(f, S),
                e(S, A),
                e(A, M),
                e(M, V),
                e(M, C),
                e(M, Q),
                e(Q, J),
                e(A, se),
                e(A, Y),
                e(Y, F),
                e(F, Z),
                e(F, le),
                e(f, L),
                e(f, W),
                e(W, I),
                e(I, O),
                e(O, H),
                e(H, j),
                e(j, D),
                e(D, he),
                e(D, ke),
                e(j, oe),
                e(j, re),
                e(re, N),
                e(N, ie),
                e(ie, ve),
                e(ve, ae),
                e(ie, We),
                e(ie, te),
                x(te, a[26]),
                e(N, K),
                e(N, $),
                e($, ne),
                e(ne, Ie),
                e($, X),
                e($, _e),
                x(_e, a[25]),
                e(N, jt),
                e(N, Dt),
                e(Dt, es),
                e(N, ts),
                e(N, Ue),
                e(Ue, Se),
                e(Se, E),
                x(E, a[24]),
                e(Ue, Be),
                e(Ue, He),
                e(He, Te),
                x(Te, a[23]),
                e(N, ss),
                e(N, U),
                e(U, ls),
                e(N, Ft),
                e(N, Ve),
                e(Ve, rt),
                e(rt, Le),
                x(Le, a[22]),
                e(Ve, rs),
                e(Ve, it),
                e(it, je),
                x(je, a[21]),
                e(N, is),
                e(N, Nt),
                e(Nt, ns),
                e(N, os),
                e(N, Me),
                e(Me, nt),
                e(nt, De),
                x(De, a[20]),
                e(Me, as),
                e(Me, ot),
                e(ot, Ne),
                x(Ne, a[19]),
                e(N, cs),
                e(N, qt),
                e(qt, ds),
                e(N, us),
                e(N, at),
                e(at, be),
                x(be, a[7]),
                e(H, fs),
                e(H, ge),
                e(H, ps),
                e(H, ct),
                (ct.innerHTML = a[40]),
                a[51](ct),
                e(I, hs),
                e(I, Ge),
                e(Ge, ye),
                e(ye, Fe),
                e(Fe, Ke),
                e(Ke, dt),
                e(Ke, ms),
                e(Fe, vs),
                e(Fe, G),
                e(G, n),
                e(n, d),
                e(d, c),
                e(n, _),
                e(n, B),
                e(B, ut),
                e(n, _s),
                e(n, Pe),
                x(Pe, a[1]),
                e(n, Ys),
                e(n, Re),
                e(Re, Rt),
                ce && ce.m(Rt, null),
                a[54](Re),
                e(G, Ws),
                e(G, ze),
                e(ze, zt),
                e(zt, Gs),
                e(ze, Ks),
                e(ze, Vt),
                e(Vt, Xs),
                e(ze, $s),
                e(ze, Ce),
                x(Ce, a[2]),
                e(G, el),
                e(G, ft),
                e(ft, Jt),
                e(Jt, tl),
                e(ft, sl),
                e(ft, Ee),
                e(Ee, Xe),
                e(Xe, ll),
                e(Ee, pt),
                e(pt, rl),
                e(Ee, ht),
                e(ht, il),
                e(Ee, mt),
                e(mt, nl),
                Qs(Ee, a[4]),
                e(G, ol),
                de && de.m(G, null),
                e(G, Es),
                ue && ue.m(G, null),
                e(G, ws),
                e(G, vt),
                e(vt, _t),
                e(_t, $e),
                ($e.checked = a[16]),
                e(_t, al),
                e(_t, Pt),
                e(Pt, cl),
                e(vt, dl),
                e(vt, bt),
                e(bt, et),
                (et.checked = a[17]),
                e(bt, ul),
                e(bt, Ct),
                e(Ct, fl),
                e(G, pl),
                e(G, tt),
                e(tt, gt),
                e(gt, hl),
                e(tt, ml),
                fe && fe.m(tt, null),
                e(ye, vl),
                e(ye, Ae),
                e(Ae, st),
                e(st, bs),
                e(st, _l),
                e(Ae, bl),
                pe && pe.m(Ae, null),
                e(Ae, ks),
                e(Ae, xt),
                a[61](xt),
                e(ye, gl),
                e(ye, At),
                (At.innerHTML = a[40]),
                a[62](At),
                e(I, yl),
                lt && lt.m(I, null),
                a[67](I),
                e(f, El),
                e(f, Qt),
                a[68](Qt),
                me(b, Is, P),
                me(b, yt, P),
                e(yt, Ot),
                e(Ot, Zt),
                e(Zt, wl),
                a[69](yt),
                me(b, Ss, P),
                me(b, Et, P),
                e(Et, wt),
                e(wt, qe),
                e(qe, Yt),
                e(Yt, Tl),
                e(qe, kl),
                e(qe, Tt),
                e(Tt, Je),
                (Je.checked = a[0]),
                e(Tt, Il),
                e(Tt, Ut),
                e(Ut, Sl),
                e(qe, Ll),
                e(qe, kt),
                e(kt, xe),
                (xe.checked = a[27]),
                e(kt, jl),
                e(kt, Bt),
                e(Bt, Dl),
                e(qe, Nl),
                e(qe, It),
                e(It, Qe),
                (Qe.checked = a[28]),
                e(It, ql),
                e(It, Ht),
                e(Ht, Vl),
                e(wt, Pl),
                e(wt, Mt),
                e(Mt, Cl),
                a[74](Et),
                Al ||
                    ((zl = [
                        z(F, "click", a[41]),
                        z(te, "input", a[42]),
                        z(_e, "input", a[43]),
                        z(E, "input", a[44]),
                        z(Te, "input", a[45]),
                        z(Le, "input", a[46]),
                        z(je, "input", a[47]),
                        z(De, "input", a[48]),
                        z(Ne, "input", a[49]),
                        z(be, "input", a[50]),
                        z(Pe, "input", a[52]),
                        z(Pe, "input", a[33]),
                        z(Ce, "input", a[55]),
                        z(Ee, "change", a[56]),
                        z($e, "change", a[59]),
                        z(et, "change", a[60]),
                        z(gt, "click", a[35]),
                        z(Je, "change", a[70]),
                        z(xe, "change", a[71]),
                        z(Qe, "change", a[72]),
                        z(Mt, "click", a[73]),
                    ]),
                    (Al = !0));
        },
        p(b, P) {
            P[0] & 67108864 && te.value !== b[26] && x(te, b[26]),
                P[0] & 33554432 && _e.value !== b[25] && x(_e, b[25]),
                P[0] & 16777216 && x(E, b[24]),
                P[0] & 8388608 && x(Te, b[23]),
                P[0] & 4194304 && x(Le, b[22]),
                P[0] & 2097152 && x(je, b[21]),
                P[0] & 1048576 && x(De, b[20]),
                P[0] & 524288 && x(Ne, b[19]),
                P[0] & 128 && Jr(be.value) !== b[7] && x(be, b[7]),
                P[0] & 2 && Pe.value !== b[1] && x(Pe, b[1]),
                b[5].length != 0 ? (ce ? ce.p(b, P) : ((ce = Ur(b)), ce.c(), ce.m(Rt, null))) : ce && (ce.d(1), (ce = null)),
                P[0] & 4 && Ce.value !== b[2] && x(Ce, b[2]),
                P[0] & 16 && Qs(Ee, b[4]),
                b[4] === "Short answer question/ Single-line text input field" ? (de ? de.p(b, P) : ((de = Hr(b)), de.c(), de.m(G, Es))) : de && (de.d(1), (de = null)),
                b[4] === "Long answer question/ Multi-line text input field" || b[4] === "Short answer question/ Single-line text input field"
                    ? ue
                        ? ue.p(b, P)
                        : ((ue = Mr(b)), ue.c(), ue.m(G, ws))
                    : ue && (ue.d(1), (ue = null)),
                P[0] & 65536 && ($e.checked = b[16]),
                P[0] & 131072 && (et.checked = b[17]),
                P[0] & 536870912 && Ts !== (Ts = "btn btn-primary btn-sm btn-block mt-3 " + (b[29] ? "disabled" : "") + " svelte-5fpjhc") && t(gt, "class", Ts),
                b[29] ? (fe ? fe.p(b, P) : ((fe = Fr(b)), fe.c(), fe.m(tt, null))) : fe && (fe.d(1), (fe = null)),
                b[18].length == 0 ? (pe ? pe.p(b, P) : ((pe = Rr()), pe.c(), pe.m(Ae, ks))) : pe && (pe.d(1), (pe = null)),
                b[32] === "super_admin" && lt.p(b, P),
                P[0] & 1 && (Je.checked = b[0]),
                P[0] & 134217728 && (xe.checked = b[27]),
                P[0] & 268435456 && (Qe.checked = b[28]);
        },
        i: Zs,
        o: Zs,
        d(b) {
            i(u),
                b && i(h),
                b && i(f),
                a[51](null),
                ce && ce.d(),
                a[54](null),
                de && de.d(),
                ue && ue.d(),
                fe && fe.d(),
                pe && pe.d(),
                a[61](null),
                a[62](null),
                lt && lt.d(),
                a[67](null),
                a[68](null),
                b && i(Is),
                b && i(yt),
                a[69](null),
                b && i(Ss),
                b && i(Et),
                a[74](null),
                (Al = !1),
                Rl(zl);
        },
    };
}
let Fl = "";
function di(a, u, s) {
    let h, f, p, y, q, g, w, S, A, M, V, C, Q, J;
    Xr(a, ii, (n) => s(79, (J = n))), ri();
    const se = J.data;
    let Y = se.id,
        F = se.permission,
        Z = se.fields_data,
        le = se.access_token,
        L = se.contest,
        W = se.API,
        I = "",
        O = "",
        H = "",
        j,
        D = {},
        he = [],
        ke,
        oe,
        re,
        N,
        ie,
        ve,
        ae,
        We,
        te,
        K = [Fl, Fl, Fl],
        $ = !1,
        ne = !1,
        Ie = Z,
        X = [];
    function _e() {
        s(5, (he = Ie.filter((n) => !(I !== "" && n.name.toLowerCase().indexOf(I.toLowerCase()) === -1)))), he.length != 0 && (re.classList.contains("show") || re.classList.add("show"));
    }
    function jt(n) {
        (D = Ie.find((d) => d.id === n)),
            D &&
                (s(1, (I = D.id)),
                s(2, (O = D.name)),
                D.type == 0
                    ? s(4, (j = "Short answer question/ Single-line text input field"))
                    : D.type == 1
                    ? s(4, (j = "Long answer question/ Multi-line text input field"))
                    : D.type == 2 && s(4, (j = "Upload file"))),
            s(16, ($ = D.is_visible)),
            s(17, (ne = D.is_required)),
            s(3, (H = D.default_values[0]));
    }
    function Dt() {
        let n = !1;
        return (
            X.forEach((d) => {
                d.id === I && (n = !0);
            }),
            n
        );
    }
    async function es() {
        if (I == "") {
            E("error", "Please enter question id.");
            return;
        }
        if (O == "") {
            E("error", "Please enter question title");
            return;
        }
        if (j == "") {
            E("error", "Please select question type.");
            return;
        }
        if (Dt()) {
            E("error", "Duplicate question id found!");
            return;
        }
        let n;
        j === "Short answer question/ Single-line text input field" ? (n = 0) : j === "Long answer question/ Multi-line text input field" ? (n = 1) : j === "Upload file" && (n = 2);
        let d = {
            id: I,
            name: O,
            type: n,
            is_required: ne,
            is_visible: $,
            default_values: [H],
        };
        if (D && D.id == d.id) {
            let c = Ie.findIndex((_) => _.id === I);
            JSON.stringify(D) != JSON.stringify(d)
                ? confirm(`Do you want to update the selected field with the id: ${I}?`) && ((Ie[c] = d), E("Success", "Field updated successfully!"))
                : E("Success", "no changes on the selected field.");
        } else
            E("Success", "New field has been added."),
                await fetch(`${W}/fields`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + le,
                    },
                    body: JSON.stringify(d),
                })
                    .then((c) => {
                        c.status === 200 && Ie.push(d);
                    })
                    .catch((c) => {
                        E("error", "Error adding new field.");
                    })
                    .finally(() => {
                        s(1, (I = "")), s(2, (O = "")), s(4, (j = "")), s(16, ($ = !0)), s(17, (ne = !0)), s(3, (H = ""));
                    })
                    .then(() => {
                        _e();
                    });
        X.push(d), s(1, (I = "")), s(2, (O = "")), s(4, (j = void 0)), s(16, ($ = !1)), s(17, (ne = !1)), s(3, (H = "")), (D = {}), s(5, (he = [])), re.classList.remove("show"), Se();
    }
    async function ts() {
        let n = 0;
        j === "Short answer question/ Single-line text input field" ? (n = 0) : j === "Long answer question/ Multi-line text input field" ? (n = 1) : j === "Upload file" && (n = 2),
            await fetch(`${W}/fields/${I}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + le,
                },
                body: JSON.stringify({
                    name: O,
                    type: n,
                    is_required: ne,
                    is_visible: $,
                    default_values: [H],
                }),
            })
                .then((d) => {
                    d.status === 200 ? E("Success", "Field updated successfully!") : E("Error", "Something went wrong!");
                })
                .catch((d) => {
                    E("Error", "Something went wrong!: " + d);
                }),
            (D = {
                id: I,
                name: O,
                type: n,
                is_required: ne,
                is_visible: $,
                default_values: [H],
            }),
            X.filter((d, c) => {
                d.id === D.id &&
                    (s(18, (X[c] = D), X),
                    Se(),
                    E("Success", "The field has been updated."),
                    s(1, (I = "")),
                    s(2, (O = "")),
                    s(4, (j = void 0)),
                    s(16, ($ = !1)),
                    s(17, (ne = !1)),
                    s(3, (H = "")),
                    (D = {}),
                    s(5, (he = [])),
                    re.classList.remove("show"));
            }),
            s(29, (M = !1));
    }
    async function Ue() {
        if (D && confirm(`Do you want to delete the selected field with the id: ${D.id}?`)) {
            let n = Ie.findIndex((d) => d.id === D.id);
            Ie.splice(n, 1),
                await fetch(`${W}/fields/${D.id}`, {
                    method: "DELETE",
                    body: JSON.stringify({ fields: Ie }),
                })
                    .then((d) => {
                        if (d.status === 200) E("Success", "Field deleted successfully!");
                        else {
                            E("Error", "Something went wrong!");
                            return;
                        }
                    })
                    .catch((d) => {
                        E("Error", "Something went wrong!");
                    }),
                s(18, (X = X.filter((d) => d.id !== D.id))),
                (D = {}),
                s(5, (he = [])),
                re.classList.remove("show"),
                s(1, (I = "")),
                s(2, (O = "")),
                s(4, (j = "")),
                s(16, ($ = !1)),
                s(17, (ne = !1)),
                s(3, (H = ""));
        }
        Se(), s(29, (M = !1));
    }
    function Se() {
        s(10, (ie.innerHTML = ""), ie),
            X.forEach((n) => {
                let d = "text";
                n.type == 0 ? (d = "text") : n.type === 1 ? (d = "textarea") : n.type == 2 && (d = "file");
                let c = document.createElement("div");
                c.classList.add("form-field"),
                    d == "textarea"
                        ? (c.innerHTML = `<div class="d-flex row col-12 m-0" data-id="${n.id.trim()}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${n.id}">${n.name}</label>
												${n.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ""}
											</div>
											<div class="d-flex gap-2 align-items-center" style="font-size: 13px">
												${n.is_visible ? '<span class="text-success">Visible</span>' : '<span class="text-danger">Hidden</span>'}
												<div class="mb-1">
													<li class="fa fa-edit me-1" data-click="${n.id}" style="cursor:pointer"/>
													<li class="fa fa-trash" data-click="${n.id}" style="cursor:pointer"/>
												</div>
											</div>
										</div>
									 	<textarea class="form-control" id="${n.id}" rows="3" ${n.is_required ? "required" : ""}>${n.default_values[0]}</textarea>
									  </div>`)
                        : (c.innerHTML = `<div class="d-flex row col-12 m-0 justify-content-between align-items-baseline" data-id="${n.id}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${n.id}" class="mb-1">${n.name}</label>
												${n.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ""}
											</div>
											<div class="d-flex gap-2 align-items-center" style="font-size: 13px">
												${n.is_visible ? '<span class="text-success">Visible</span>' : '<span class="text-danger">Hidden</span>'}
												<div class="mb-1">
													<li class="fa fa-edit me-1" data-click="${n.id}" class="editField" style="cursor:pointer"/>
													<li class="fa fa-trash" data-click="${n.id}" class="rmField" style="cursor:pointer"/>
												</div>
											</div>
										</div>
										<input type="${d}" class="form-control" placeholder="Enter ${n.name}" value="${n.default_values[0]}" ${n.is_required ? "required" : ""}">
									</div>`),
                    ie.appendChild(c);
                let _ = c.children[0].children[0].children[1].children[1].children[0],
                    B = c.children[0].children[0].children[1].children[1].children[1];
                _.addEventListener("click", () => {
                    if (_.dataset.click) {
                        let ut = _.dataset.click;
                        if ((s(29, (M = !0)), !ut)) return;
                        jt(ut);
                    }
                }),
                    B.addEventListener("click", () => {
                        if (B.dataset.click) {
                            let ut = B.dataset.click;
                            s(18, (X = X.filter((_s) => _s.id != ut))), Se(), E("Success", "Field removed successfully");
                        }
                    });
            });
    }
    function E(n, d) {
        n === "Success"
            ? s(
                  9,
                  (N.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
										<strong>Success</strong> ${d}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                  N
              )
            : s(
                  9,
                  (N.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error</strong> ${d}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                  N
              ),
            setTimeout(() => {
                s(9, (N.innerHTML = ""), N);
            }, 2e3);
    }
    let Be = [];
    function He(n, d = !0) {
        if (F != "super_admin") return;
        if (n === void 0) {
            E("Error", "Please enter a valid ID");
            return;
        }
        if (isNaN(n)) {
            E("Error", "Please add a valid field ID");
            return;
        }
        if (Be.includes(n)) {
            E("Error", "This ID is already in the monitor list");
            return;
        }
        Be.push(n);
        let c = document.createElement("div");
        (c.className = "admin d-flex gap-1 p-1 m-1 align-items-center justify-content-center bg-light"),
            (c.innerHTML = `<span style="font-size:18px"> ${n} </span> 
									<i class="fa fa-x ms-2" style="font-size:10px; color: gray; margin-top: 2px; cursor: pointer"></i>	`),
            (c.style.width = "fit-content"),
            (c.style.borderRadius = "40%"),
            ve.appendChild(c),
            c.children[1].addEventListener("click", () => {
                (Be = Be.filter((B) => B != B)), ve.removeChild(c);
            }),
            d && E("Success", `Monitor with id: ${n} added to monitor list.`),
            s(6, (ke = void 0));
    }
    function Te(n) {
        let d = parseInt(ae.style.marginLeft.split("vw")[0]);
        if (n === "basicInfo") {
            let c = {
                    contestName: h,
                    contestLink: f,
                    startOn: p,
                    startAt: y,
                    regStartOn: q,
                    regStartAt: g,
                    regEndOn: w,
                    regEndAt: S,
                    contestantsPerTeam: oe,
                },
                _ = !0;
            for (let B in c)
                if (B === "contestantsPerTeam") {
                    if (c[B] === void 0 || c[B] === null || c[B] === 0) {
                        _ = !1;
                        break;
                    }
                } else (c[B] === void 0 || c[B] === null || c[B] === "") && (_ = !1);
            if (!_) {
                E("Error", "Please fill all the fields");
                return;
            }
        } else if (n === "formFields" && X.length === 0) {
            E("Error", "Please add at least one field");
            return;
        }
        isNaN(d) && (d = 0), d > -(ae.children.length - 1) * 100 ? s(12, (ae.style.marginLeft = `${d - 100}vw`), ae) : s(12, (ae.style.marginLeft = "0vw"), ae);
    }
    function ss() {
        let n = parseInt(ae.style.marginLeft.split("vw")[0]);
        isNaN(n) && (n = 0), n < 0 && s(12, (ae.style.marginLeft = `${n + 100}vw`), ae);
    }
    let U = {
        name: "string",
        registration_start: "2022-08-27T20:24:53.677Z",
        registration_end: "2022-08-27T20:24:53.677Z",
        started_at: "2022-08-27T20:24:53.677Z",
        persons_amount: 1,
        request_template: "string",
        link: "string",
        fields: ["string"],
        admins: [0],
    };
    async function ls() {
        if (F != "super_admin") return;
        (U.name = h),
            (U.registration_start = q + "T" + g + ":00.000Z"),
            (U.registration_end = w + "T" + S + ":00.000Z"),
            (U.started_at = p + "T" + y + ":00.000Z"),
            oe === void 0 ? (U.persons_amount = 1) : (U.persons_amount = oe);
        let n = "";
        X.forEach((d) => {
            let c = "text";
            d.type === 1 ? (c = "textarea") : d.type == 2 && (c = "file");
            let _ = document.createElement("div");
            _.classList.add("form-field"),
                c == "textarea"
                    ? (_.innerHTML = `<div class="d-flex row col-12 m-0" data-id="${d.id.trim()}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${d.id}">${d.name}</label>
												${d.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ""}
											</div>
										</div>
									 	<textarea class="form-control" id="${d.id}" rows="3" ${d.is_required ? "required" : ""}>${d.default_values[0]}</textarea>
									  </div>`)
                    : (_.innerHTML = `<div class="d-flex row col-12 m-0 justify-content-between align-items-baseline" data-id="${d.id}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${d.id}" class="mb-1">${d.name}</label>
												${d.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ""}
											</div>
										</div>
										<input type="${c}" class="form-control" placeholder="Enter ${d.name}" value="${d.default_values[0]}" ${d.is_required ? "required" : ""}">
									</div>`),
                (n += _.innerHTML);
        }),
            (U.request_template = n),
            (U.link = f),
            (U.fields = X.map((d) => d.id)),
            (U.admins = Be),
            await fetch(`${W}/competitions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${le}`,
                },
                body: JSON.stringify(U),
            })
                .then((d) => {
                    d.status === 200
                        ? (E("Success", "Competition created successfully."),
                          setTimeout(() => {
                              window.location.href = `${Ar}/admin/${Y}`;
                          }, 1e3))
                        : (E("Error", "Something went wrong."),
                          d.json().then((c) => {
                              E(d.statusText, c.details === void 0 ? (c.detail && Array.isArray(c.detail) ? c.detail[0].msg : c.detail) : c.details);
                          }));
                })
                .catch((d) => {
                    E("Error", "Something went wrong: " + d);
                });
    }
    async function Ft(n) {
        (U.name = h),
            (U.registration_start = q + "T" + g + "Z"),
            (U.registration_end = w + "T" + S + "Z"),
            (U.started_at = p + "T" + y + "Z"),
            oe === void 0 ? (U.persons_amount = 1) : (U.persons_amount = oe);
        let d = "";
        X.forEach((c) => {
            let _ = "text";
            c.type == 1 ? (_ = "textarea") : c.type == 2 && (_ = "file");
            let B = document.createElement("div");
            B.classList.add("form-field"),
                _ == "textarea"
                    ? (B.innerHTML = `<div class="d-flex row col-12 m-0" data-id="${c.id.trim()}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${c.id}">${c.name}</label>
												${c.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ""}
											</div>
										</div>
									 	<textarea class="form-control" id="${c.id}" rows="3" ${c.is_required ? "required" : ""}>${c.default_values[0]}</textarea>
									  </div>`)
                    : (B.innerHTML = `<div class="d-flex row col-12 m-0 justify-content-between align-items-baseline" data-id="${c.id}">
										<div class="d-flex col-12 justify-content-between align-items-baseline">
											<div class="col-md-6">
												<label for="${c.id}" class="mb-1">${c.name}</label>
												${c.is_required ? '<span class="text-danger" style="font-size:19px">*</span>' : ""}
											</div>
										</div>
										<input type="${_}" class="form-control" placeholder="Enter ${c.name}" value="${c.default_values[0]}" ${c.is_required ? "required" : ""}">
									</div>`),
                (d += B.innerHTML);
        }),
            (U.request_template = d),
            (U.link = f),
            (U.fields = X.map((c) => c.id)),
            (U.admins = Be),
            s(14, (te.style.display = "none"), te),
            n.form &&
                (await fetch(`${W}/competitions/${L == null ? void 0 : L.id}/request-template`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${le}`,
                    },
                    body: JSON.stringify({ request_template: U.request_template }),
                })
                    .then((c) => {
                        c.status === 200
                            ? E("Success", "Request template updated successfully.")
                            : (E("Error", "Something went wrong."),
                              c.json().then((_) => {
                                  E(c.statusText, _.details !== void 0 ? _.details : "Please fill the form correctly!");
                              }));
                    })
                    .catch((c) => {
                        E("Error", "Something went wrong: " + c);
                    }),
                await fetch(`${W}/competitions/${L == null ? void 0 : L.id}/form`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${le}`,
                    },
                    body: JSON.stringify({ fields: U.fields }),
                })
                    .then((c) => {
                        c.status === 200
                            ? E("Success", "Form fields updated successfully.")
                            : (E("Error", "Something went wrong."),
                              c.json().then((_) => {
                                  E(c.statusText, _.details === void 0 ? (_.detail && Array.isArray(_.detail) ? _.detail[0].msg : _.detail) : _.details);
                              }));
                    })
                    .catch((c) => {
                        E("Error", "Something went wrong: " + c);
                    })),
            n.admins &&
                (await fetch(`${W}/competitions/${L == null ? void 0 : L.id}/admins`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${le}`,
                    },
                    body: JSON.stringify({ admins: U.admins }),
                })
                    .then((c) => {
                        c.status === 200
                            ? E("Success", "monitors' list updated successfully.")
                            : (E("Error", "Something went wrong."),
                              c.json().then((_) => {
                                  E(c.statusText, _.details === void 0 ? (_.detail && Array.isArray(_.detail) ? _.detail[0].msg : _.detail) : _.details);
                              }));
                    })
                    .catch((c) => {
                        E("Error", "Something went wrong: " + c);
                    })),
            n.all &&
                (await fetch(`${W}/competitions/${L == null ? void 0 : L.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${le}`,
                    },
                    body: JSON.stringify(U),
                })
                    .then((c) => {
                        c.status === 200
                            ? E("Success", "competition updated successfully.")
                            : (E("Error", "Something went wrong."),
                              c.json().then((_) => {
                                  E(c.statusText, _.details === void 0 ? (_.detail && Array.isArray(_.detail) ? _.detail[0].msg : _.detail) : _.details);
                              }));
                    })
                    .catch((c) => {
                        E("Error", "Something went wrong: " + c);
                    }));
    }
    function Ve() {
        s(14, (te.style.display = "block"), te);
    }
    let rt = `<div class="slideControls border-top">
							<div class="btn-group gap-1 col-12 justify-content-center align-items-center p-0 m-0">
								<button class="btn btn-sm btn-block p-2"><li class="me-1 fa fa-arrow-left"></li> Previous</button>
								<button class="btn btn-sm btn-block p-2">Next <li class="ms-1 fa fa-arrow-right"></li></button>
							</div>
						</div>`;
    $r(() => {
        if (
            (K.forEach((n, d) => {
                if (F !== "super_admin" && d == 2) return;
                let c = n.children[0].children[0].children;
                d == 0 && c[0].classList.add("disabled"),
                    c[0].addEventListener("click", () => {
                        d != 0 && ss();
                    }),
                    c[1].addEventListener("click", () => {
                        d != 2 && (d == 0 ? Te("basicInfo") : d == 1 && Te("formFields"));
                    });
            }),
            L !== void 0)
        ) {
            s(26, (h = L.name)), s(25, (f = L.link)), s(7, (oe = L.persons_amount));
            let n = new Date(L.started_at);
            s(24, (p = n.toISOString().split("T")[0])), s(23, (y = n.toTimeString().split(" ")[0]));
            let d = new Date(L.registration_start);
            s(22, (q = d.toISOString().split("T")[0])), s(21, (g = d.toTimeString().split(" ")[0]));
            let c = new Date(L.registration_end);
            s(20, (w = c.toISOString().split("T")[0])),
                s(19, (S = c.toTimeString().split(" ")[0])),
                L.fields.forEach((B) => {
                    B.default_values = [""];
                }),
                s(18, (X = L.fields)),
                Se(),
                F === "super_admin" &&
                    L.admins.forEach((B) => {
                        He(B, !1);
                    });
            let _ = document.createElement("button");
            F === "super_admin"
                ? ((_.className = "btn btn-sm btn-block p-2"),
                  (_.innerHTML = 'Update Contest <li class="fa fa-check-circle">'),
                  _.addEventListener("click", () => {
                      Ve();
                  }),
                  s(15, (K[2].children[0].children[0].children[1].style.display = "none"), K),
                  K[2].children[0].children[0].appendChild(_))
                : F === "admin" &&
                  ((_.className = "btn btn-sm btn-block p-2"),
                  (_.innerHTML = 'Update Contest <li class="fa fa-check-circle">'),
                  _.addEventListener("click", () => {
                      Ve();
                  }),
                  s(15, (K[1].children[0].children[0].children[1].style.display = "none"), K),
                  K[1].children[0].children[0].appendChild(_));
        } else {
            let n = document.createElement("button");
            (n.className = "btn btn-sm btn-block p-2"),
                (n.innerHTML = 'Create Contest <li class="fa fa-check-circle">'),
                n.addEventListener("click", () => {
                    ls();
                }),
                s(15, (K[2].children[0].children[0].children[1].style.display = "none"), K),
                K[2].children[0].children[0].appendChild(n);
        }
        s(13, (We.style.display = "none"), We);
    });
    const Le = () => (window.location.href = `${Ar}/admin/${Y}`);
    function rs() {
        (h = this.value), s(26, h);
    }
    function it() {
        (f = this.value), s(25, f);
    }
    function je() {
        (p = this.value), s(24, p);
    }
    function is() {
        (y = this.value), s(23, y);
    }
    function Nt() {
        (q = this.value), s(22, q);
    }
    function ns() {
        (g = this.value), s(21, g);
    }
    function os() {
        (w = this.value), s(20, w);
    }
    function Me() {
        (S = this.value), s(19, S);
    }
    function nt() {
        (oe = Jr(this.value)), s(7, oe);
    }
    function De(n) {
        Ye[n ? "unshift" : "push"](() => {
            (K[0] = n), s(15, K);
        });
    }
    function as() {
        (I = this.value), s(1, I);
    }
    const ot = (n) => jt(n.id);
    function Ne(n) {
        Ye[n ? "unshift" : "push"](() => {
            (re = n), s(8, re);
        });
    }
    function cs() {
        (O = this.value), s(2, O);
    }
    function qt() {
        (j = Cr(this)), s(4, j);
    }
    function ds() {
        (A = Cr(this)), s(30, A);
    }
    function us() {
        (H = this.value), s(3, H);
    }
    function at() {
        ($ = this.checked), s(16, $);
    }
    function be() {
        (ne = this.checked), s(17, ne);
    }
    function fs(n) {
        Ye[n ? "unshift" : "push"](() => {
            (ie = n), s(10, ie);
        });
    }
    function ge(n) {
        Ye[n ? "unshift" : "push"](() => {
            (K[1] = n), s(15, K);
        });
    }
    function ys(n) {
        Ye[n ? "unshift" : "push"](() => {
            (ve = n), s(11, ve);
        });
    }
    function ps() {
        (ke = this.value), s(6, ke);
    }
    const ct = () => {
        He(ke);
    };
    function hs(n) {
        Ye[n ? "unshift" : "push"](() => {
            (K[2] = n), s(15, K);
        });
    }
    function Ge(n) {
        Ye[n ? "unshift" : "push"](() => {
            (ae = n), s(12, ae);
        });
    }
    function ye(n) {
        Ye[n ? "unshift" : "push"](() => {
            (N = n), s(9, N);
        });
    }
    function Fe(n) {
        Ye[n ? "unshift" : "push"](() => {
            (We = n), s(13, We);
        });
    }
    function Ke() {
        (V = this.checked), s(0, V);
    }
    function dt() {
        (Q = this.checked), s(27, Q), s(0, V);
    }
    function ms() {
        (C = this.checked), s(28, C), s(0, V);
    }
    const vs = () => Ft({ all: V, admins: Q, form: C });
    function G(n) {
        Ye[n ? "unshift" : "push"](() => {
            (te = n), s(14, te);
        });
    }
    return (
        (a.$$.update = () => {
            var n, d, c, _;
            a.$$.dirty[0] & 1 &&
                (V
                    ? (s(28, (C = !1)),
                      s(27, (Q = !1)),
                      (n = document.getElementById("flexSwitchCheck2")) == null || n.setAttribute("disabled", "disabled"),
                      (d = document.getElementById("flexSwitchCheck3")) == null || d.setAttribute("disabled", "disabled"))
                    : ((c = document.getElementById("flexSwitchCheck2")) == null || c.removeAttribute("disabled"),
                      (_ = document.getElementById("flexSwitchCheck3")) == null || _.removeAttribute("disabled")));
        }),
        s(26, (h = "")),
        s(25, (f = "")),
        s(24, (p = "")),
        s(23, (y = "")),
        s(22, (q = "")),
        s(21, (g = "")),
        s(20, (w = "")),
        s(19, (S = "")),
        s(30, (A = "")),
        s(29, (M = !1)),
        s(0, (V = !1)),
        s(28, (C = !1)),
        s(27, (Q = !1)),
        [
            V,
            I,
            O,
            H,
            j,
            he,
            ke,
            oe,
            re,
            N,
            ie,
            ve,
            ae,
            We,
            te,
            K,
            $,
            ne,
            X,
            S,
            w,
            g,
            q,
            y,
            p,
            f,
            h,
            Q,
            C,
            M,
            A,
            Y,
            F,
            _e,
            jt,
            es,
            ts,
            Ue,
            He,
            Ft,
            rt,
            Le,
            rs,
            it,
            je,
            is,
            Nt,
            ns,
            os,
            Me,
            nt,
            De,
            as,
            ot,
            Ne,
            cs,
            qt,
            ds,
            us,
            at,
            be,
            fs,
            ge,
            ys,
            ps,
            ct,
            hs,
            Ge,
            ye,
            Fe,
            Ke,
            dt,
            ms,
            vs,
            G,
        ]
    );
}
class vi extends Yr {
    constructor(u) {
        super(), Wr(this, u, di, ci, Gr, {}, null, [-1, -1, -1, -1]);
    }
}
export { vi as default };
