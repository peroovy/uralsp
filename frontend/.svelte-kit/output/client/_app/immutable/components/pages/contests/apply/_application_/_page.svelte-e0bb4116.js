import {
    S as la,
    i as ra,
    s as na,
    a as k,
    k as r,
    q as y,
    D as oa,
    h as s,
    c as D,
    l as n,
    m as i,
    r as A,
    n as l,
    E as ia,
    p as fe,
    b as F,
    B as e,
    P as He,
    u as Ie,
    A as Ue,
    Q as ca,
    I as da,
    o as ua,
    N as Wt,
    K as St,
} from "../../../../../chunks/index-af757d0f.js";
import { s as fa, g as pa } from "../../../../../chunks/sessionDuration-e379fb60.js";
import { b as ot } from "../../../../../chunks/paths-9678c1af.js";
import { p as ha } from "../../../../../chunks/stores-0b118143.js";
import { d as ma } from "../../../../../chunks/dots-63d78b83.js";
function Xt(o, t, a) {
    const c = o.slice();
    return (c[26] = t[a]), (c[27] = t), (c[28] = a), c;
}
function Zt(o) {
    let t, a, c, f, v, d, u, b, m;
    return {
        c() {
            (t = r("div")), (a = r("label")), (c = y("Team Name ")), (f = r("span")), (v = y("*")), (d = k()), (u = r("input")), this.h();
        },
        l(I) {
            t = n(I, "DIV", { class: !0 });
            var E = i(t);
            a = n(E, "LABEL", { for: !0 });
            var _ = i(a);
            (c = A(_, "Team Name ")), (f = n(_, "SPAN", { class: !0 }));
            var q = i(f);
            (v = A(q, "*")), q.forEach(s), _.forEach(s), (d = D(E)), (u = n(E, "INPUT", { type: !0, id: !0, class: !0, placeholder: !0 })), E.forEach(s), this.h();
        },
        h() {
            l(f, "class", "text-danger"),
                fe(f, "font-size", "19px", !1),
                l(a, "for", "teamName"),
                l(u, "type", "text"),
                l(u, "id", "teamName"),
                l(u, "class", "form-control"),
                l(u, "placeholder", "Team Name"),
                l(t, "class", "form-field mb-3");
        },
        m(I, E) {
            F(I, t, E), e(t, a), e(a, c), e(a, f), e(f, v), e(t, d), e(t, u), Wt(u, o[7]), b || ((m = He(u, "input", o[14])), (b = !0));
        },
        p(I, E) {
            E & 128 && u.value !== I[7] && Wt(u, I[7]);
        },
        d(I) {
            I && s(t), (b = !1), m();
        },
    };
}
function xt(o) {
    let t,
        a,
        c = o[28] + 1 + "",
        f;
    return {
        c() {
            (t = r("button")), (a = y("Application Number: ")), (f = y(c)), this.h();
        },
        l(v) {
            t = n(v, "BUTTON", {
                class: !0,
                type: !0,
                "data-bs-toggle": !0,
                "data-bs-target": !0,
                "aria-expanded": !0,
                "aria-controls": !0,
            });
            var d = i(t);
            (a = A(d, "Application Number: ")), (f = A(d, c)), d.forEach(s), this.h();
        },
        h() {
            l(t, "class", "btn mb-0 btn-light border-0 rounded-0 btn-block"),
                l(t, "type", "button"),
                l(t, "data-bs-toggle", "collapse"),
                l(t, "data-bs-target", "#appLicationNum" + o[28]),
                l(t, "aria-expanded", "false"),
                l(t, "aria-controls", "appLicationNum" + o[28]);
        },
        m(v, d) {
            F(v, t, d), e(t, a), e(t, f);
        },
        d(v) {
            v && s(t);
        },
    };
}
function $t(o) {
    let t, a, c, f, v, d, u;
    return {
        c() {
            (t = r("div")), (a = r("label")), (c = y("Applicant Id ")), (f = r("span")), (v = y("*")), (d = k()), (u = r("input")), this.h();
        },
        l(b) {
            t = n(b, "DIV", { class: !0 });
            var m = i(t);
            a = n(m, "LABEL", { for: !0 });
            var I = i(a);
            (c = A(I, "Applicant Id ")), (f = n(I, "SPAN", { class: !0 }));
            var E = i(f);
            (v = A(E, "*")), E.forEach(s), I.forEach(s), (d = D(m)), (u = n(m, "INPUT", { type: !0, class: !0, placeholder: !0 })), m.forEach(s), this.h();
        },
        h() {
            l(f, "class", "text-danger"),
                fe(f, "font-size", "19px", !1),
                l(a, "for", "teamName"),
                l(u, "type", "text"),
                l(u, "class", "form-control"),
                l(u, "placeholder", "Enter applicant Id ..."),
                l(t, "class", "form-field mb-3");
        },
        m(b, m) {
            F(b, t, m), e(t, a), e(a, c), e(a, f), e(f, v), e(t, d), e(t, u);
        },
        d(b) {
            b && s(t);
        },
    };
}
function ea(o) {
    let t,
        a,
        c,
        f,
        v = o[0].request_template + "",
        d,
        u = o[28],
        b = o[0].persons_amount > 1 && xt(o),
        m = o[0].persons_amount > 1 && $t();
    const I = () => o[15](a, u),
        E = () => o[15](null, u);
    return {
        c() {
            b && b.c(), (t = k()), (a = r("div")), m && m.c(), (c = k()), (f = r("div")), (d = k()), this.h();
        },
        l(_) {
            b && b.l(_), (t = D(_)), (a = n(_, "DIV", { class: !0, id: !0 }));
            var q = i(a);
            m && m.l(q), (c = D(q)), (f = n(q, "DIV", {}));
            var J = i(f);
            J.forEach(s), (d = D(q)), q.forEach(s), this.h();
        },
        h() {
            l(a, "class", "collapse mt-0 multi-collapse bg-light " + (o[28] == 0 ? "show" : "")), l(a, "id", "appLicationNum" + o[28]);
        },
        m(_, q) {
            b && b.m(_, q), F(_, t, q), F(_, a, q), m && m.m(a, null), e(a, c), e(a, f), (f.innerHTML = v), e(a, d), I();
        },
        p(_, q) {
            (o = _),
                o[0].persons_amount > 1 ? b || ((b = xt(o)), b.c(), b.m(t.parentNode, t)) : b && (b.d(1), (b = null)),
                o[0].persons_amount > 1 ? m || ((m = $t()), m.c(), m.m(a, c)) : m && (m.d(1), (m = null)),
                q & 1 && v !== (v = o[0].request_template + "") && (f.innerHTML = v),
                u !== o[28] && (E(), (u = o[28]), I());
        },
        d(_) {
            b && b.d(_), _ && s(t), _ && s(a), m && m.d(), E();
        },
    };
}
function ta(o) {
    let t, a, c, f, v;
    return {
        c() {
            (t = r("button")),
                (a = r("i")),
                (c = y(`\r
                Update Application`)),
                this.h();
        },
        l(d) {
            t = n(d, "BUTTON", { class: !0, style: !0 });
            var u = i(t);
            (a = n(u, "I", { class: !0 })),
                i(a).forEach(s),
                (c = A(
                    u,
                    `\r
                Update Application`
                )),
                u.forEach(s),
                this.h();
        },
        h() {
            l(a, "class", "fas fa-refresh me-1"), l(t, "class", "btn btn-block btn-primary rounded-0"), fe(t, "background-color", "#3490dc"), fe(t, "border-color", "#3490dc");
        },
        m(d, u) {
            F(d, t, u), e(t, a), e(t, c), f || ((v = He(t, "click", o[9])), (f = !0));
        },
        p: Ue,
        d(d) {
            d && s(t), (f = !1), v();
        },
    };
}
function aa(o) {
    let t, a, c, f, v;
    return {
        c() {
            (t = r("button")),
                (a = r("i")),
                (c = y(`\r
                Add another Application`)),
                this.h();
        },
        l(d) {
            t = n(d, "BUTTON", { class: !0 });
            var u = i(t);
            (a = n(u, "I", { class: !0 })),
                i(a).forEach(s),
                (c = A(
                    u,
                    `\r
                Add another Application`
                )),
                u.forEach(s),
                this.h();
        },
        h() {
            l(a, "class", "fas fa-plus me-1"), l(t, "class", "btn btn-block btn-outline-primary rounded-0 svelte-akqv6t");
        },
        m(d, u) {
            F(d, t, u), e(t, a), e(t, c), f || ((v = He(t, "click", o[8])), (f = !0));
        },
        p: Ue,
        d(d) {
            d && s(t), (f = !1), v();
        },
    };
}
function sa(o) {
    let t, a, c, f, v;
    return {
        c() {
            (t = r("button")),
                (a = r("li")),
                (c = y(`\r
                Submit`)),
                this.h();
        },
        l(d) {
            t = n(d, "BUTTON", { class: !0, style: !0 });
            var u = i(t);
            (a = n(u, "LI", { class: !0 })),
                i(a).forEach(s),
                (c = A(
                    u,
                    `\r
                Submit`
                )),
                u.forEach(s),
                this.h();
        },
        h() {
            l(a, "class", "fa fa-paper-plane me-1 svelte-akqv6t"), l(t, "class", "btn btn-block btn-primary rounded-0"), fe(t, "background-color", "#3490dc"), fe(t, "border-color", "#3490dc");
        },
        m(d, u) {
            F(d, t, u), e(t, a), e(t, c), f || ((v = He(t, "click", o[8])), (f = !0));
        },
        p: Ue,
        d(d) {
            d && s(t), (f = !1), v();
        },
    };
}
function va(o) {
    let t,
        a,
        c,
        f,
        v,
        d,
        u,
        b,
        m,
        I,
        E,
        _,
        q,
        J,
        pe,
        V,
        $,
        j,
        W,
        he,
        Te,
        ee,
        Y,
        te,
        G,
        X,
        le,
        qe,
        h = o[0].name + "",
        g,
        K,
        N,
        H,
        w,
        B,
        C,
        U,
        Z,
        re,
        ye,
        it,
        Ae,
        ct,
        dt,
        Ne,
        we = new Date(Date.parse(o[0].started_at)).toDateString() + "",
        ze,
        ut,
        ne,
        oe,
        Se,
        ft,
        Ve,
        pt,
        ht,
        x,
        Pe = Math.floor((Date.parse(o[0].registration_end) - Date.parse(Date())) / (1e3 * 60 * 60 * 24)) + "",
        Ge,
        mt,
        Le = Math.floor(((Date.parse(o[0].registration_end) - Date.parse(Date())) % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)) + "",
        Fe,
        vt,
        Oe = Math.floor(((Date.parse(o[0].registration_end) - Date.parse(Date())) % (1e3 * 60 * 60)) / (1e3 * 60)) + "",
        Je,
        _t,
        bt,
        ie,
        ae,
        Me,
        gt,
        Re,
        Et,
        kt,
        je,
        Be = o[0].persons_amount + "",
        Ye,
        Dt,
        Q,
        Ke,
        ce,
        It,
        me,
        z,
        Qe,
        We,
        Tt = o[1] === void 0 || Object.keys(o[1]).length <= 0,
        qt,
        ve,
        Xe,
        se,
        de,
        _e,
        yt,
        At,
        Vt;
    document.title = t = "App Name | " + o[0].name + "-form";
    let P = o[0].persons_amount > 1 && Zt(o),
        be = Array(o[0].persons_amount),
        L = [];
    for (let p = 0; p < be.length; p += 1) L[p] = ea(Xt(o, be, p));
    let O = o[5] && ta(o),
        M = o[2] === "teacher" && aa(o),
        R = Tt && sa(o);
    return {
        c() {
            (a = k()),
                (c = r("section")),
                (f = r("img")),
                (d = k()),
                (u = r("div")),
                (b = k()),
                (m = r("nav")),
                (I = r("div")),
                (E = r("div")),
                (_ = r("span")),
                (q = k()),
                (J = r("h4")),
                (pe = y("Contest application")),
                (V = k()),
                ($ = r("div")),
                (j = r("button")),
                (W = r("i")),
                (he = y(`\r
          Back`)),
                (Te = k()),
                (ee = r("div")),
                (Y = r("div")),
                (te = r("nav")),
                (G = r("div")),
                (X = r("div")),
                (le = r("li")),
                (qe = k()),
                (g = y(h)),
                (K = k()),
                (N = r("button")),
                (H = r("span")),
                (w = k()),
                (B = r("div")),
                (C = r("ul")),
                (U = r("table")),
                (Z = r("tr")),
                (re = r("td")),
                (ye = r("i")),
                (it = k()),
                (Ae = r("strong")),
                (ct = y("Starts on:")),
                (dt = k()),
                (Ne = r("td")),
                (ze = y(we)),
                (ut = k()),
                (ne = r("tr")),
                (oe = r("td")),
                (Se = r("i")),
                (ft = k()),
                (Ve = r("strong")),
                (pt = y("Ends in:")),
                (ht = k()),
                (x = r("td")),
                (Ge = y(Pe)),
                (mt = y(` days,\r
                    `)),
                (Fe = y(Le)),
                (vt = y(` hours,\r
                    `)),
                (Je = y(Oe)),
                (_t = y(" minutes")),
                (bt = k()),
                (ie = r("tr")),
                (ae = r("td")),
                (Me = r("i")),
                (gt = k()),
                (Re = r("strong")),
                (Et = y("Contestants:")),
                (kt = k()),
                (je = r("td")),
                (Ye = y(Be)),
                (Dt = k()),
                (Q = r("div")),
                P && P.c(),
                (Ke = k()),
                (ce = r("div"));
            for (let p = 0; p < L.length; p += 1) L[p].c();
            (It = k()),
                (me = r("div")),
                (z = r("div")),
                O && O.c(),
                (Qe = k()),
                M && M.c(),
                (We = k()),
                R && R.c(),
                (qt = k()),
                (ve = r("div")),
                (Xe = k()),
                (se = r("div")),
                (de = r("div")),
                (_e = r("span")),
                (yt = y("Loading...")),
                this.h();
        },
        l(p) {
            oa('[data-svelte="svelte-c91xqj"]', document.head).forEach(s), (a = D(p)), (c = n(p, "SECTION", { class: !0 }));
            var T = i(c);
            (f = n(T, "IMG", { class: !0, src: !0, alt: !0 })), (d = D(T)), (u = n(T, "DIV", { class: !0 })), i(u).forEach(s), (b = D(T)), (m = n(T, "NAV", { class: !0 }));
            var Ce = i(m);
            I = n(Ce, "DIV", { class: !0 });
            var Ze = i(I);
            E = n(Ze, "DIV", { class: !0 });
            var xe = i(E);
            (_ = n(xe, "SPAN", { class: !0 })), i(_).forEach(s), (q = D(xe)), (J = n(xe, "H4", { class: !0 }));
            var Pt = i(J);
            (pe = A(Pt, "Contest application")), Pt.forEach(s), xe.forEach(s), (V = D(Ze)), ($ = n(Ze, "DIV", { class: !0 }));
            var Lt = i($);
            j = n(Lt, "BUTTON", { class: !0 });
            var Nt = i(j);
            (W = n(Nt, "I", { class: !0 })),
                i(W).forEach(s),
                (he = A(
                    Nt,
                    `\r
          Back`
                )),
                Nt.forEach(s),
                Lt.forEach(s),
                Ze.forEach(s),
                Ce.forEach(s),
                (Te = D(T)),
                (ee = n(T, "DIV", { class: !0 }));
            var Ot = i(ee);
            Y = n(Ot, "DIV", { class: !0, style: !0 });
            var $e = i(Y);
            te = n($e, "NAV", { class: !0 });
            var Mt = i(te);
            G = n(Mt, "DIV", { class: !0 });
            var ge = i(G);
            X = n(ge, "DIV", { class: !0 });
            var et = i(X);
            (le = n(et, "LI", { class: !0 })),
                i(le).forEach(s),
                (qe = D(et)),
                (g = A(et, h)),
                et.forEach(s),
                (K = D(ge)),
                (N = n(ge, "BUTTON", {
                    class: !0,
                    type: !0,
                    "data-bs-toggle": !0,
                    "data-bs-target": !0,
                    "aria-controls": !0,
                    "aria-expanded": !0,
                    "aria-label": !0,
                }));
            var Rt = i(N);
            (H = n(Rt, "SPAN", { class: !0 })), i(H).forEach(s), Rt.forEach(s), (w = D(ge)), (B = n(ge, "DIV", { class: !0, id: !0 }));
            var jt = i(B);
            C = n(jt, "UL", { class: !0 });
            var Bt = i(C);
            U = n(Bt, "TABLE", { class: !0 });
            var Ee = i(U);
            Z = n(Ee, "TR", {});
            var tt = i(Z);
            re = n(tt, "TD", {});
            var at = i(re);
            (ye = n(at, "I", { class: !0 })), i(ye).forEach(s), (it = D(at)), (Ae = n(at, "STRONG", {}));
            var Ct = i(Ae);
            (ct = A(Ct, "Starts on:")), Ct.forEach(s), at.forEach(s), (dt = D(tt)), (Ne = n(tt, "TD", {}));
            var Ut = i(Ne);
            (ze = A(Ut, we)), Ut.forEach(s), tt.forEach(s), (ut = D(Ee)), (ne = n(Ee, "TR", {}));
            var st = i(ne);
            oe = n(st, "TD", {});
            var lt = i(oe);
            (Se = n(lt, "I", { class: !0 })), i(Se).forEach(s), (ft = D(lt)), (Ve = n(lt, "STRONG", {}));
            var Ht = i(Ve);
            (pt = A(Ht, "Ends in:")), Ht.forEach(s), lt.forEach(s), (ht = D(st)), (x = n(st, "TD", {}));
            var ue = i(x);
            (Ge = A(ue, Pe)),
                (mt = A(
                    ue,
                    ` days,\r
                    `
                )),
                (Fe = A(ue, Le)),
                (vt = A(
                    ue,
                    ` hours,\r
                    `
                )),
                (Je = A(ue, Oe)),
                (_t = A(ue, " minutes")),
                ue.forEach(s),
                st.forEach(s),
                (bt = D(Ee)),
                (ie = n(Ee, "TR", {}));
            var rt = i(ie);
            ae = n(rt, "TD", { class: !0 });
            var nt = i(ae);
            (Me = n(nt, "I", { class: !0 })), i(Me).forEach(s), (gt = D(nt)), (Re = n(nt, "STRONG", {}));
            var zt = i(Re);
            (Et = A(zt, "Contestants:")), zt.forEach(s), nt.forEach(s), (kt = D(rt)), (je = n(rt, "TD", {}));
            var Gt = i(je);
            (Ye = A(Gt, Be)), Gt.forEach(s), rt.forEach(s), Ee.forEach(s), Bt.forEach(s), jt.forEach(s), ge.forEach(s), Mt.forEach(s), (Dt = D($e)), (Q = n($e, "DIV", { class: !0 }));
            var ke = i(Q);
            P && P.l(ke), (Ke = D(ke)), (ce = n(ke, "DIV", { class: !0 }));
            var Ft = i(ce);
            for (let wt = 0; wt < L.length; wt += 1) L[wt].l(Ft);
            Ft.forEach(s), (It = D(ke)), (me = n(ke, "DIV", { class: !0 }));
            var Jt = i(me);
            z = n(Jt, "DIV", { class: !0 });
            var De = i(z);
            O && O.l(De),
                (Qe = D(De)),
                M && M.l(De),
                (We = D(De)),
                R && R.l(De),
                De.forEach(s),
                Jt.forEach(s),
                ke.forEach(s),
                $e.forEach(s),
                Ot.forEach(s),
                (qt = D(T)),
                (ve = n(T, "DIV", { class: !0 })),
                i(ve).forEach(s),
                T.forEach(s),
                (Xe = D(p)),
                (se = n(p, "DIV", { class: !0 }));
            var Yt = i(se);
            de = n(Yt, "DIV", { class: !0, role: !0 });
            var Kt = i(de);
            _e = n(Kt, "SPAN", { class: !0 });
            var Qt = i(_e);
            (yt = A(Qt, "Loading...")), Qt.forEach(s), Kt.forEach(s), Yt.forEach(s), this.h();
        },
        h() {
            l(f, "class", "d1 svelte-akqv6t"),
                ia(f.src, (v = ma)) || l(f, "src", v),
                l(f, "alt", ""),
                l(u, "class", "d2 svelte-akqv6t"),
                l(_, "class", "fa-brands fa-wpforms ms-3 me-3"),
                l(J, "class", "p-0 m-0"),
                l(E, "class", "navbar-brand d-flex col align-items-center svelte-akqv6t"),
                l(W, "class", "fa fa-arrow-left svelte-akqv6t"),
                l(j, "class", "btn d-flex gap-3 align-items-center"),
                l($, "class", "navbar-nav svelte-akqv6t"),
                l(I, "class", "container"),
                l(m, "class", "navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm mb-3 p-0 svelte-akqv6t"),
                l(le, "class", "fa fa-certificate svelte-akqv6t"),
                l(X, "class", "d-flex navbar-brand mb-0 justify-content-left align-items-center gap-3 p-3 svelte-akqv6t"),
                l(H, "class", "fa fa-ellipsis-v svelte-akqv6t"),
                l(N, "class", "navbar-toggler"),
                l(N, "type", "button"),
                l(N, "data-bs-toggle", "collapse"),
                l(N, "data-bs-target", "#compDetails"),
                l(N, "aria-controls", "compDetails"),
                l(N, "aria-expanded", "false"),
                l(N, "aria-label", "Toggle navigation"),
                l(ye, "class", "fa fa-calendar svelte-akqv6t"),
                l(Se, "class", "fa fa-clock svelte-akqv6t"),
                l(Me, "class", "fa fa-group svelte-akqv6t"),
                l(ae, "class", "d-flex"),
                l(U, "class", "table table-borderless"),
                l(C, "class", "navbar-nav gap-2 svelte-akqv6t"),
                l(B, "class", "collapse navbar-collapse"),
                l(B, "id", "compDetails"),
                l(G, "class", "container-fluid justify-content-left"),
                l(te, "class", "navbar card-header svelte-akqv6t"),
                l(ce, "class", "row gap-1"),
                l(z, "class", "btn-group col-12 gap-1 d-flex justify-content-center align-items-center"),
                l(me, "class", "btn-group col-12 pt-3 "),
                l(Q, "class", "card-body"),
                l(Y, "class", "card col-md-5 p-0 svelte-akqv6t"),
                fe(Y, "max-width", "500px"),
                l(ee, "class", "row col-12 m-0 p-0 justify-content-center"),
                l(ve, "class", "alert svelte-akqv6t"),
                l(c, "class", "container-fluid p-0 contestForm justify-content-center align-items-start svelte-akqv6t"),
                l(_e, "class", "visually-hidden"),
                l(de, "class", "spinner-border svelte-akqv6t"),
                l(de, "role", "status"),
                l(se, "class", "loading svelte-akqv6t");
        },
        m(p, S) {
            F(p, a, S),
                F(p, c, S),
                e(c, f),
                e(c, d),
                e(c, u),
                e(c, b),
                e(c, m),
                e(m, I),
                e(I, E),
                e(E, _),
                e(E, q),
                e(E, J),
                e(J, pe),
                e(I, V),
                e(I, $),
                e($, j),
                e(j, W),
                e(j, he),
                e(c, Te),
                e(c, ee),
                e(ee, Y),
                e(Y, te),
                e(te, G),
                e(G, X),
                e(X, le),
                e(X, qe),
                e(X, g),
                e(G, K),
                e(G, N),
                e(N, H),
                e(G, w),
                e(G, B),
                e(B, C),
                e(C, U),
                e(U, Z),
                e(Z, re),
                e(re, ye),
                e(re, it),
                e(re, Ae),
                e(Ae, ct),
                e(Z, dt),
                e(Z, Ne),
                e(Ne, ze),
                e(U, ut),
                e(U, ne),
                e(ne, oe),
                e(oe, Se),
                e(oe, ft),
                e(oe, Ve),
                e(Ve, pt),
                e(ne, ht),
                e(ne, x),
                e(x, Ge),
                e(x, mt),
                e(x, Fe),
                e(x, vt),
                e(x, Je),
                e(x, _t),
                e(U, bt),
                e(U, ie),
                e(ie, ae),
                e(ae, Me),
                e(ae, gt),
                e(ae, Re),
                e(Re, Et),
                e(ie, kt),
                e(ie, je),
                e(je, Ye),
                e(Y, Dt),
                e(Y, Q),
                P && P.m(Q, null),
                e(Q, Ke),
                e(Q, ce);
            for (let T = 0; T < L.length; T += 1) L[T].m(ce, null);
            e(Q, It),
                e(Q, me),
                e(me, z),
                O && O.m(z, null),
                e(z, Qe),
                M && M.m(z, null),
                e(z, We),
                R && R.m(z, null),
                e(c, qt),
                e(c, ve),
                o[16](ve),
                F(p, Xe, S),
                F(p, se, S),
                e(se, de),
                e(de, _e),
                e(_e, yt),
                o[17](se),
                At || ((Vt = He(j, "click", o[13])), (At = !0));
        },
        p(p, [S]) {
            if (
                (S & 1 && t !== (t = "App Name | " + p[0].name + "-form") && (document.title = t),
                S & 1 && h !== (h = p[0].name + "") && Ie(g, h),
                S & 1 && we !== (we = new Date(Date.parse(p[0].started_at)).toDateString() + "") && Ie(ze, we),
                S & 1 && Pe !== (Pe = Math.floor((Date.parse(p[0].registration_end) - Date.parse(Date())) / (1e3 * 60 * 60 * 24)) + "") && Ie(Ge, Pe),
                S & 1 && Le !== (Le = Math.floor(((Date.parse(p[0].registration_end) - Date.parse(Date())) % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)) + "") && Ie(Fe, Le),
                S & 1 && Oe !== (Oe = Math.floor(((Date.parse(p[0].registration_end) - Date.parse(Date())) % (1e3 * 60 * 60)) / (1e3 * 60)) + "") && Ie(Je, Oe),
                S & 1 && Be !== (Be = p[0].persons_amount + "") && Ie(Ye, Be),
                p[0].persons_amount > 1 ? (P ? P.p(p, S) : ((P = Zt(p)), P.c(), P.m(Q, Ke))) : P && (P.d(1), (P = null)),
                S & 65)
            ) {
                be = Array(p[0].persons_amount);
                let T;
                for (T = 0; T < be.length; T += 1) {
                    const Ce = Xt(p, be, T);
                    L[T] ? L[T].p(Ce, S) : ((L[T] = ea(Ce)), L[T].c(), L[T].m(ce, null));
                }
                for (; T < L.length; T += 1) L[T].d(1);
                L.length = be.length;
            }
            p[5] ? (O ? O.p(p, S) : ((O = ta(p)), O.c(), O.m(z, Qe))) : O && (O.d(1), (O = null)),
                p[2] === "teacher" ? (M ? M.p(p, S) : ((M = aa(p)), M.c(), M.m(z, We))) : M && (M.d(1), (M = null)),
                S & 2 && (Tt = p[1] === void 0 || Object.keys(p[1]).length <= 0),
                Tt ? (R ? R.p(p, S) : ((R = sa(p)), R.c(), R.m(z, null))) : R && (R.d(1), (R = null));
        },
        i: Ue,
        o: Ue,
        d(p) {
            p && s(a), p && s(c), P && P.d(), ca(L, p), O && O.d(), M && M.d(), R && R.d(), o[16](null), p && s(Xe), p && s(se), o[17](null), (At = !1), Vt();
        },
    };
}
function _a(o, t, a) {
    let c, f;
    da(o, ha, (h) => a(20, (f = h))), fa();
    const v = f.data;
    let { contest: d = v.contest, oldRequest: u = v.oldRequest, userId: b = v.userId, accessToken: m = v.accessToken, permissions: I = v.permissions, API: E = v.API } = t,
        _,
        q,
        J = !1,
        pe = !0;
    (Object.keys(d).length == 0 || b === void 0 || m == null || I == null) && (pe = !1);
    let V = { team_name: c, team: [], competition: d.id },
        $ = {};
    for (let h = 0; h < d.persons_amount; h++) V.team.push($);
    let j = [];
    function W(h, g) {
        h === "Success"
            ? a(
                  3,
                  (_.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
										<strong>Success</strong> ${g}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                  _
              )
            : a(
                  3,
                  (_.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error</strong> ${g}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                  _
              ),
            setTimeout(() => {
                a(3, (_.innerHTML = ""), _);
            }, 2e3);
    }
    function he(h, g = "msg") {
        let K = [],
            N = j[h].children[d.persons_amount > 1 ? 1 : 0].children;
        for (let w = 0; w < N.length; w++) {
            let B = N[w].dataset.id,
                C = N[w].children[1].value;
            if (d.fields.find((Z) => Z.id == B).is_required && C == "") return a(3, (_.style.display = "block"), _), "error";
            K.push({ field_id: B, value: C });
        }
        let H = d.persons_amount;
        if (H == 1) V.team = [{ user_id: b, form: K }];
        else if (H > 1) {
            let w = j[h].children[1].children[1].value;
            if (w == "") return "error";
            if (isNaN(parseInt(w))) return "error";
            let B = V.team.find((C) => C.user_id == parseInt(w));
            if (B) {
                let C = 0;
                V.team.every((U, Z) => {
                    U.user_id == parseInt(w);
                }),
                    (V.team[C].form = K);
            } else if (!B && V.team.length < H) V.team.push({ user_id: parseInt(w), form: K });
            else return "error";
        }
        return "success";
    }
    async function Te() {
        for (let g = 0; g < d.persons_amount; g++)
            if (he(g, "noMsg") === "error") {
                alert("Please fill all the required fields");
                return;
            }
        if (V.team.length < d.persons_amount) {
            alert("Please add save all the applications first");
            return;
        }
        if (((V.team_name = c), V.team_name === "" && d.persons_amount > 1)) {
            alert("Please enter a team name");
            return;
        }
        V.team_name = c;
        const h = await fetch(`${E}/requests`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${m}`,
            },
            body: JSON.stringify(V),
        });
        if (h.status == 200)
            W("Success", "Your request has been sent successfully"),
                setTimeout(() => {
                    window.location.href = `${ot}/participant/requests`;
                }, 1e3);
        else {
            let g = await h.json();
            W("Error", Array.isArray(g.detail) ? (g.detail[0] ? g.detail[0].msg : "Something went wrong!") : g.detail);
        }
    }
    async function ee() {
        for (let g = 0; g < d.persons_amount; g++)
            if (he(g, "noMsg") == "error") {
                alert("Please fill all the required fields");
                return;
            }
        if (((V.team_name = c), V.team_name === "" && d.persons_amount > 1)) {
            alert("Please enter a team name");
            return;
        }
        const h = await fetch(`${E}/requests/${u.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${m}`,
            },
            body: JSON.stringify(V),
        });
        if (h.status == 200)
            W("Success", "Your request has been updated successfully"),
                setTimeout(() => {
                    window.location.href = `${ot}/participant/requests`;
                }, 1e3);
        else {
            let g = await h.json();
            W("Error", Array.isArray(g.detail) ? (g.detail[0] ? g.detail[0].msg : "Something went wrong!") : g.detail);
        }
    }
    async function Y() {
        let h = await fetch(`${E}/requests/` + d.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${m}`,
            },
        });
        if (h.ok) {
            let g = await h.json();
            if (!(g.competition == d.id)) return;
            a(5, (J = !0));
            for (let N = 0; N < d.persons_amount; N++) {
                let H = j[N].children[d.persons_amount > 1 ? 1 : 0].children;
                a(7, (c = g.team_name));
                for (let w = 0; w < H.length; w++) {
                    let B = H[w].dataset.id,
                        C = g.participants[w].form.find((U) => U.field_id == B).value;
                    H[w].children[1].value = C;
                }
            }
        }
    }
    ua(() => {
        pe || pa(ot + "/"), u && Y(), a(4, (q.style.display = "none"), q);
    });
    const te = () => (window.location.href = `${ot}/participant/ongoing`);
    function G() {
        (c = this.value), a(7, c);
    }
    function X(h, g) {
        St[h ? "unshift" : "push"](() => {
            (j[g] = h), a(6, j);
        });
    }
    function le(h) {
        St[h ? "unshift" : "push"](() => {
            (_ = h), a(3, _);
        });
    }
    function qe(h) {
        St[h ? "unshift" : "push"](() => {
            (q = h), a(4, q);
        });
    }
    return (
        (o.$$set = (h) => {
            "contest" in h && a(0, (d = h.contest)),
                "oldRequest" in h && a(1, (u = h.oldRequest)),
                "userId" in h && a(10, (b = h.userId)),
                "accessToken" in h && a(11, (m = h.accessToken)),
                "permissions" in h && a(2, (I = h.permissions)),
                "API" in h && a(12, (E = h.API));
        }),
        a(7, (c = "")),
        [d, u, I, _, q, J, j, c, Te, ee, b, m, E, te, G, X, le, qe]
    );
}
class Ia extends la {
    constructor(t) {
        super(),
            ra(this, t, _a, va, na, {
                contest: 0,
                oldRequest: 1,
                userId: 10,
                accessToken: 11,
                permissions: 2,
                API: 12,
            });
    }
}
export { Ia as default };
