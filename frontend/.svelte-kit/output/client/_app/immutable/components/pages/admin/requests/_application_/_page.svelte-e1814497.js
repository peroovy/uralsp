import {
    S as Ms,
    i as Os,
    s as Us,
    a as h,
    k as a,
    q as _,
    D as zs,
    h as e,
    c as m,
    l,
    m as r,
    r as b,
    n as s,
    E as Js,
    p as st,
    b as F,
    B as t,
    P as Ct,
    u as Fs,
    A as Hs,
    Q as Ys,
    R as Gs,
    I as Ks,
    o as Qs,
    N as qs,
    K as ns,
} from "../../../../../chunks/index-af757d0f.js";
import { b as Bs } from "../../../../../chunks/paths-9678c1af.js";
import { d as Ws } from "../../../../../chunks/dots-63d78b83.js";
import { p as Xs } from "../../../../../chunks/stores-0b118143.js";
function Cs(o, i, n) {
    const p = o.slice();
    return (p[30] = i[n]), (p[31] = i), (p[32] = n), p;
}
function Zs(o) {
    let i, n, p, v, E, j, w, g, y;
    return {
        c() {
            (i = a("div")), (n = a("label")), (p = _("Team Name ")), (v = a("span")), (E = _("*")), (j = h()), (w = a("input")), this.h();
        },
        l(d) {
            i = l(d, "DIV", { class: !0 });
            var I = r(i);
            n = l(I, "LABEL", { for: !0 });
            var A = r(n);
            (p = b(A, "Team Name ")), (v = l(A, "SPAN", { class: !0 }));
            var S = r(v);
            (E = b(S, "*")), S.forEach(e), A.forEach(e), (j = m(I)), (w = l(I, "INPUT", { type: !0, id: !0, class: !0, placeholder: !0 })), I.forEach(e), this.h();
        },
        h() {
            s(v, "class", "text-danger"),
                st(v, "font-size", "19px", !1),
                s(n, "for", "teamName"),
                s(w, "type", "text"),
                s(w, "id", "teamName"),
                s(w, "class", "form-control"),
                s(w, "placeholder", "Team Name"),
                s(i, "class", "form-field mb-3");
        },
        m(d, I) {
            F(d, i, I), t(i, n), t(n, p), t(n, v), t(v, E), t(i, j), t(i, w), qs(w, o[4]), g || ((y = Ct(w, "input", o[18])), (g = !0));
        },
        p(d, I) {
            I[0] & 16 && w.value !== d[4] && qs(w, d[4]);
        },
        d(d) {
            d && e(i), (g = !1), y();
        },
    };
}
function xs(o) {
    let i,
        n,
        p = o[32] + 1 + "",
        v;
    return {
        c() {
            (i = a("button")), (n = _("Application Number: ")), (v = _(p)), this.h();
        },
        l(E) {
            i = l(E, "BUTTON", {
                class: !0,
                type: !0,
                "data-bs-toggle": !0,
                "data-bs-target": !0,
                "aria-expanded": !0,
                "aria-controls": !0,
            });
            var j = r(i);
            (n = b(j, "Application Number: ")), (v = b(j, p)), j.forEach(e), this.h();
        },
        h() {
            s(i, "class", "btn btn-light border-0 rounded-0 btn-block"),
                s(i, "type", "button"),
                s(i, "data-bs-toggle", "collapse"),
                s(i, "data-bs-target", "#appLicationNum" + o[32]),
                s(i, "aria-expanded", "false"),
                s(i, "aria-controls", "appLicationNum" + o[32]);
        },
        m(E, j) {
            F(E, i, j), t(i, n), t(i, v);
        },
        d(E) {
            E && e(i);
        },
    };
}
function $s(o) {
    let i, n, p, v, E, j, w;
    return {
        c() {
            (i = a("div")), (n = a("label")), (p = _("Applicant Id ")), (v = a("span")), (E = _("*")), (j = h()), (w = a("input")), this.h();
        },
        l(g) {
            i = l(g, "DIV", { class: !0 });
            var y = r(i);
            n = l(y, "LABEL", { for: !0 });
            var d = r(n);
            (p = b(d, "Applicant Id ")), (v = l(d, "SPAN", { class: !0 }));
            var I = r(v);
            (E = b(I, "*")), I.forEach(e), d.forEach(e), (j = m(y)), (w = l(y, "INPUT", { type: !0, class: !0, placeholder: !0 })), y.forEach(e), this.h();
        },
        h() {
            s(v, "class", "text-danger"),
                st(v, "font-size", "19px", !1),
                s(n, "for", "teamName"),
                s(w, "type", "text"),
                s(w, "class", "form-control"),
                s(w, "placeholder", "Enter applicant Id ..."),
                s(i, "class", "form-field mb-3");
        },
        m(g, y) {
            F(g, i, y), t(i, n), t(n, p), t(n, v), t(v, E), t(i, j), t(i, w);
        },
        d(g) {
            g && e(i);
        },
    };
}
function Rs(o) {
    let i,
        n,
        p,
        v,
        E = o[8].request_template + "",
        j,
        w = o[32],
        g = o[8].persons_amount > 1 && xs(o),
        y = o[8].persons_amount > 1 && $s();
    const d = () => o[19](n, w),
        I = () => o[19](null, w);
    return {
        c() {
            g && g.c(), (i = h()), (n = a("div")), y && y.c(), (p = h()), (v = a("div")), (j = h()), this.h();
        },
        l(A) {
            g && g.l(A), (i = m(A)), (n = l(A, "DIV", { class: !0, id: !0 }));
            var S = r(n);
            y && y.l(S), (p = m(S)), (v = l(S, "DIV", {}));
            var D = r(v);
            D.forEach(e), (j = m(S)), S.forEach(e), this.h();
        },
        h() {
            s(n, "class", "collapse multi-collapse " + (o[32] == 0 ? "show" : "")), s(n, "id", "appLicationNum" + o[32]);
        },
        m(A, S) {
            g && g.m(A, S), F(A, i, S), F(A, n, S), y && y.m(n, null), t(n, p), t(n, v), (v.innerHTML = E), t(n, j), d();
        },
        p(A, S) {
            (o = A), w !== o[32] && (I(), (w = o[32]), d());
        },
        d(A) {
            g && g.d(A), A && e(i), A && e(n), y && y.d(), I();
        },
    };
}
function ta(o) {
    let i,
        n,
        p,
        v,
        E,
        j,
        w,
        g,
        y,
        d,
        I,
        A,
        S,
        D,
        q,
        K,
        M,
        at,
        L,
        Rt,
        O,
        U,
        z,
        Q,
        dt,
        Mt,
        Ot,
        lt,
        Y,
        G,
        yt,
        f,
        c,
        T,
        k,
        J,
        V,
        B,
        W = o[5].id + "",
        Tt,
        At,
        ut,
        It,
        pe,
        fe,
        Dt,
        os = o[5].status + "",
        he,
        me,
        pt,
        ft,
        ve,
        X,
        _e,
        be,
        rt,
        Ee,
        we,
        is = o[5].owner + "",
        ge,
        ye,
        ht,
        Nt,
        Te,
        Ae,
        jt,
        cs = o[5].description + "",
        Ie,
        De,
        mt,
        St,
        Ne,
        je,
        kt,
        Kt,
        Se,
        vt,
        Vt,
        ke,
        Ve,
        Pt,
        ds = new Date(Date.parse(o[5].created_at)).toDateString() + "",
        Pe,
        Le,
        _t,
        Lt,
        He,
        qe,
        Ht,
        us = o[8].name + "",
        Be,
        Ce,
        C,
        Z,
        Ut,
        Re,
        Me,
        x,
        zt,
        Oe,
        Ue,
        $,
        Jt,
        ze,
        Je,
        nt,
        Ft,
        Fe,
        Ye,
        ot,
        bt,
        Yt,
        Ge,
        Ke,
        tt,
        Qe,
        Et,
        Qt,
        it,
        wt,
        qt,
        We,
        Wt,
        gt,
        Xe,
        ps,
        et = o[8].persons_amount > 1 && Zs(o),
        Bt = Array(o[8].persons_amount),
        P = [];
    for (let u = 0; u < Bt.length; u += 1) P[u] = Rs(Cs(o, Bt, u));
    return {
        c() {
            (i = h()),
                (n = a("div")),
                (p = a("img")),
                (E = h()),
                (j = a("div")),
                (w = h()),
                (g = a("nav")),
                (y = a("div")),
                (d = a("div")),
                (I = a("span")),
                (A = h()),
                (S = a("h4")),
                (D = _("Application")),
                (q = h()),
                (K = a("div")),
                (M = a("button")),
                (at = a("i")),
                (L = _(`
					Back`)),
                (Rt = h()),
                (O = a("div")),
                (U = a("div")),
                (z = a("div")),
                (Q = a("h3")),
                (dt = a("span")),
                (Mt = _(`
					Basic Information`)),
                (Ot = h()),
                (lt = a("div")),
                (Y = a("div")),
                (G = a("table")),
                (yt = a("thead")),
                (f = h()),
                (c = a("tbody")),
                (T = a("tr")),
                (k = a("th")),
                (J = _("ID")),
                (V = h()),
                (B = a("td")),
                (Tt = _(W)),
                (At = h()),
                (ut = a("tr")),
                (It = a("th")),
                (pe = _("Status")),
                (fe = h()),
                (Dt = a("td")),
                (he = _(os)),
                (me = h()),
                (pt = a("tr")),
                (ft = a("th")),
                (ve = _("Owner")),
                (X = a("small")),
                (_e = _(">> (N-ID)")),
                (be = h()),
                (rt = a("td")),
                (Ee = _(o[7])),
                (we = _(" - ")),
                (ge = _(is)),
                (ye = h()),
                (ht = a("tr")),
                (Nt = a("th")),
                (Te = _("Description")),
                (Ae = h()),
                (jt = a("td")),
                (Ie = _(cs)),
                (De = h()),
                (mt = a("tr")),
                (St = a("th")),
                (Ne = _("Participants IDs")),
                (je = h()),
                (kt = a("td")),
                (Kt = _(o[1])),
                (Se = h()),
                (vt = a("tr")),
                (Vt = a("th")),
                (ke = _("Created on")),
                (Ve = h()),
                (Pt = a("td")),
                (Pe = _(ds)),
                (Le = h()),
                (_t = a("tr")),
                (Lt = a("th")),
                (He = _("Competition")),
                (qe = h()),
                (Ht = a("td")),
                (Be = _(us)),
                (Ce = h()),
                (C = a("div")),
                (Z = a("button")),
                (Ut = a("span")),
                (Re = _(`
								Accept`)),
                (Me = h()),
                (x = a("button")),
                (zt = a("span")),
                (Oe = _(`
								Reject`)),
                (Ue = h()),
                ($ = a("button")),
                (Jt = a("span")),
                (ze = _(`
								Update`)),
                (Je = h()),
                (nt = a("button")),
                (Ft = a("li")),
                (Fe = _(`
								Remove`)),
                (Ye = h()),
                (ot = a("div")),
                (bt = a("h3")),
                (Yt = a("span")),
                (Ge = _(`
					Application Form`)),
                (Ke = h()),
                (tt = a("div")),
                et && et.c(),
                (Qe = h()),
                (Et = a("div"));
            for (let u = 0; u < P.length; u += 1) P[u].c();
            (Qt = h()), (it = a("div")), (wt = a("div")), (qt = a("span")), (We = _("Loading...")), (Wt = h()), (gt = a("div")), this.h();
        },
        l(u) {
            zs('[data-svelte="svelte-6pg8q6"]', document.head).forEach(e), (i = m(u)), (n = l(u, "DIV", { class: !0 }));
            var N = r(n);
            (p = l(N, "IMG", { class: !0, src: !0, alt: !0 })), (E = m(N)), (j = l(N, "DIV", { class: !0 })), r(j).forEach(e), (w = m(N)), (g = l(N, "NAV", { class: !0 }));
            var Gt = r(g);
            y = l(Gt, "DIV", { class: !0 });
            var Xt = r(y);
            d = l(Xt, "DIV", { class: !0 });
            var Zt = r(d);
            (I = l(Zt, "SPAN", { class: !0 })), r(I).forEach(e), (A = m(Zt)), (S = l(Zt, "H4", { class: !0 }));
            var fs = r(S);
            (D = b(fs, "Application")), fs.forEach(e), Zt.forEach(e), (q = m(Xt)), (K = l(Xt, "DIV", { class: !0 }));
            var hs = r(K);
            M = l(hs, "BUTTON", { class: !0 });
            var Ze = r(M);
            (at = l(Ze, "I", { class: !0 })),
                r(at).forEach(e),
                (L = b(
                    Ze,
                    `
					Back`
                )),
                Ze.forEach(e),
                hs.forEach(e),
                Xt.forEach(e),
                Gt.forEach(e),
                (Rt = m(N)),
                (O = l(N, "DIV", { class: !0, style: !0 }));
            var ms = r(O);
            U = l(ms, "DIV", { class: !0 });
            var xt = r(U);
            z = l(xt, "DIV", { class: !0, style: !0 });
            var $t = r(z);
            Q = l($t, "H3", { class: !0 });
            var xe = r(Q);
            (dt = l(xe, "SPAN", { class: !0 })),
                r(dt).forEach(e),
                (Mt = b(
                    xe,
                    `
					Basic Information`
                )),
                xe.forEach(e),
                (Ot = m($t)),
                (lt = l($t, "DIV", { class: !0 }));
            var vs = r(lt);
            Y = l(vs, "DIV", { class: !0 });
            var te = r(Y);
            G = l(te, "TABLE", { class: !0 });
            var ee = r(G);
            (yt = l(ee, "THEAD", {})), r(yt).forEach(e), (f = m(ee)), (c = l(ee, "TBODY", {}));
            var H = r(c);
            T = l(H, "TR", {});
            var se = r(T);
            k = l(se, "TH", { scope: !0 });
            var _s = r(k);
            (J = b(_s, "ID")), _s.forEach(e), (V = m(se)), (B = l(se, "TD", { colspan: !0 }));
            var bs = r(B);
            (Tt = b(bs, W)), bs.forEach(e), se.forEach(e), (At = m(H)), (ut = l(H, "TR", {}));
            var ae = r(ut);
            It = l(ae, "TH", { scope: !0 });
            var Es = r(It);
            (pe = b(Es, "Status")), Es.forEach(e), (fe = m(ae)), (Dt = l(ae, "TD", { colspan: !0 }));
            var ws = r(Dt);
            (he = b(ws, os)), ws.forEach(e), ae.forEach(e), (me = m(H)), (pt = l(H, "TR", {}));
            var le = r(pt);
            ft = l(le, "TH", { scope: !0 });
            var $e = r(ft);
            (ve = b($e, "Owner")), (X = l($e, "SMALL", { class: !0, style: !0 }));
            var gs = r(X);
            (_e = b(gs, ">> (N-ID)")), gs.forEach(e), $e.forEach(e), (be = m(le)), (rt = l(le, "TD", { colspan: !0 }));
            var re = r(rt);
            (Ee = b(re, o[7])), (we = b(re, " - ")), (ge = b(re, is)), re.forEach(e), le.forEach(e), (ye = m(H)), (ht = l(H, "TR", {}));
            var ne = r(ht);
            Nt = l(ne, "TH", { scope: !0 });
            var ys = r(Nt);
            (Te = b(ys, "Description")), ys.forEach(e), (Ae = m(ne)), (jt = l(ne, "TD", { colspan: !0 }));
            var Ts = r(jt);
            (Ie = b(Ts, cs)), Ts.forEach(e), ne.forEach(e), (De = m(H)), (mt = l(H, "TR", {}));
            var oe = r(mt);
            St = l(oe, "TH", { scope: !0 });
            var As = r(St);
            (Ne = b(As, "Participants IDs")), As.forEach(e), (je = m(oe)), (kt = l(oe, "TD", { colspan: !0 }));
            var Is = r(kt);
            (Kt = b(Is, o[1])), Is.forEach(e), oe.forEach(e), (Se = m(H)), (vt = l(H, "TR", {}));
            var ie = r(vt);
            Vt = l(ie, "TH", { scope: !0 });
            var Ds = r(Vt);
            (ke = b(Ds, "Created on")), Ds.forEach(e), (Ve = m(ie)), (Pt = l(ie, "TD", { colspan: !0 }));
            var Ns = r(Pt);
            (Pe = b(Ns, ds)), Ns.forEach(e), ie.forEach(e), (Le = m(H)), (_t = l(H, "TR", {}));
            var ce = r(_t);
            Lt = l(ce, "TH", { scope: !0 });
            var js = r(Lt);
            (He = b(js, "Competition")), js.forEach(e), (qe = m(ce)), (Ht = l(ce, "TD", { colspan: !0 }));
            var Ss = r(Ht);
            (Be = b(Ss, us)), Ss.forEach(e), ce.forEach(e), H.forEach(e), ee.forEach(e), (Ce = m(te)), (C = l(te, "DIV", { class: !0 }));
            var ct = r(C);
            Z = l(ct, "BUTTON", { type: !0, class: !0 });
            var ts = r(Z);
            (Ut = l(ts, "SPAN", { class: !0 })),
                r(Ut).forEach(e),
                (Re = b(
                    ts,
                    `
								Accept`
                )),
                ts.forEach(e),
                (Me = m(ct)),
                (x = l(ct, "BUTTON", { type: !0, class: !0 }));
            var es = r(x);
            (zt = l(es, "SPAN", { class: !0 })),
                r(zt).forEach(e),
                (Oe = b(
                    es,
                    `
								Reject`
                )),
                es.forEach(e),
                (Ue = m(ct)),
                ($ = l(ct, "BUTTON", { type: !0, class: !0 }));
            var ss = r($);
            (Jt = l(ss, "SPAN", { class: !0 })),
                r(Jt).forEach(e),
                (ze = b(
                    ss,
                    `
								Update`
                )),
                ss.forEach(e),
                (Je = m(ct)),
                (nt = l(ct, "BUTTON", { class: !0 }));
            var as = r(nt);
            (Ft = l(as, "LI", { class: !0 })),
                r(Ft).forEach(e),
                (Fe = b(
                    as,
                    `
								Remove`
                )),
                as.forEach(e),
                ct.forEach(e),
                te.forEach(e),
                vs.forEach(e),
                $t.forEach(e),
                (Ye = m(xt)),
                (ot = l(xt, "DIV", { class: !0 }));
            var de = r(ot);
            bt = l(de, "H3", { class: !0 });
            var ls = r(bt);
            (Yt = l(ls, "SPAN", { class: !0 })),
                r(Yt).forEach(e),
                (Ge = b(
                    ls,
                    `
					Application Form`
                )),
                ls.forEach(e),
                (Ke = m(de)),
                (tt = l(de, "DIV", { class: !0, style: !0 }));
            var ue = r(tt);
            et && et.l(ue), (Qe = m(ue)), (Et = l(ue, "DIV", { class: !0 }));
            var ks = r(Et);
            for (let rs = 0; rs < P.length; rs += 1) P[rs].l(ks);
            ks.forEach(e), ue.forEach(e), de.forEach(e), xt.forEach(e), ms.forEach(e), N.forEach(e), (Qt = m(u)), (it = l(u, "DIV", { class: !0 }));
            var Vs = r(it);
            wt = l(Vs, "DIV", { class: !0, role: !0 });
            var Ps = r(wt);
            qt = l(Ps, "SPAN", { class: !0 });
            var Ls = r(qt);
            (We = b(Ls, "Loading...")), Ls.forEach(e), Ps.forEach(e), Vs.forEach(e), (Wt = m(u)), (gt = l(u, "DIV", { class: !0 })), r(gt).forEach(e), this.h();
        },
        h() {
            (document.title = " Requests "),
                s(p, "class", "d1 svelte-wnp09j"),
                Js(p.src, (v = Ws)) || s(p, "src", v),
                s(p, "alt", ""),
                s(j, "class", "d2 svelte-wnp09j"),
                s(I, "class", "fa-brands fa-wpforms ms-3 me-3"),
                s(S, "class", "p-0 m-0"),
                s(d, "class", "navbar-brand d-flex col align-items-center svelte-wnp09j"),
                s(at, "class", "fa fa-arrow-left svelte-wnp09j"),
                s(M, "class", "btn d-flex gap-3 align-items-center"),
                s(K, "class", "navbar-nav"),
                s(y, "class", "container"),
                s(g, "class", "navbar navbar-expand-sm col-12 navbar-light sticky-top shadow-sm svelte-wnp09j"),
                s(dt, "class", "fa fa-info-circle ms-0 me-2 svelte-wnp09j"),
                s(Q, "class", "card-title mb-2 mt-4 ms-1 me-5"),
                s(k, "scope", "row"),
                s(B, "colspan", "3"),
                s(It, "scope", "row"),
                s(Dt, "colspan", "3"),
                s(X, "class", "ms-1"),
                st(X, "font-weight", "100"),
                st(X, "font-style", "italic"),
                st(X, "font-size", "12px"),
                s(ft, "scope", "row"),
                s(rt, "colspan", "3"),
                s(Nt, "scope", "row"),
                s(jt, "colspan", "3"),
                s(St, "scope", "row"),
                s(kt, "colspan", "3"),
                s(Vt, "scope", "row"),
                s(Pt, "colspan", "3"),
                s(Lt, "scope", "row"),
                s(Ht, "colspan", "3"),
                s(G, "class", "table"),
                s(Ut, "class", "fa fa-check svelte-wnp09j"),
                s(Z, "type", "button"),
                s(Z, "class", "btn btn-success"),
                s(zt, "class", "fa fa-trash svelte-wnp09j"),
                s(x, "type", "button"),
                s(x, "class", "btn btn-secondary"),
                s(Jt, "class", "fa fa-edit svelte-wnp09j"),
                s($, "type", "button"),
                s($, "class", "btn btn-primary"),
                s(Ft, "class", "fa fa-trash svelte-wnp09j"),
                s(nt, "class", "btn btn-danger"),
                s(C, "class", "btns col-12 svelte-wnp09j"),
                s(Y, "class", "row"),
                s(lt, "class", "card-body"),
                s(z, "class", "card col-md border-0 rounded-0 basic-app-info svelte-wnp09j"),
                st(z, "min-width", "min-content"),
                s(Yt, "class", "fa fa-file-alt ms-0 me-2 svelte-wnp09j"),
                s(bt, "class", "card-title mb-2 mt-4 ms-1"),
                s(Et, "class", "row gap-1"),
                s(tt, "class", "card-body"),
                st(tt, "position", "relative"),
                s(ot, "class", "card col-md border-0 rounded-0 application-form"),
                s(U, "class", "row m-0 justify-content-center align-items-stretch gap-0"),
                s(O, "class", "container-fluid d-flex justify-content-center align-items-center"),
                st(O, "min-height", "calc(100vh - 38px)"),
                st(O, "width", "100vw"),
                s(n, "class", "application svelte-wnp09j"),
                s(qt, "class", "visually-hidden"),
                s(wt, "class", "spinner-border svelte-wnp09j"),
                s(wt, "role", "status"),
                s(it, "class", "loading svelte-wnp09j"),
                s(gt, "class", "alert svelte-wnp09j");
        },
        m(u, R) {
            F(u, i, R),
                F(u, n, R),
                t(n, p),
                t(n, E),
                t(n, j),
                t(n, w),
                t(n, g),
                t(g, y),
                t(y, d),
                t(d, I),
                t(d, A),
                t(d, S),
                t(S, D),
                t(y, q),
                t(y, K),
                t(K, M),
                t(M, at),
                t(M, L),
                t(n, Rt),
                t(n, O),
                t(O, U),
                t(U, z),
                t(z, Q),
                t(Q, dt),
                t(Q, Mt),
                t(z, Ot),
                t(z, lt),
                t(lt, Y),
                t(Y, G),
                t(G, yt),
                t(G, f),
                t(G, c),
                t(c, T),
                t(T, k),
                t(k, J),
                t(T, V),
                t(T, B),
                t(B, Tt),
                t(c, At),
                t(c, ut),
                t(ut, It),
                t(It, pe),
                t(ut, fe),
                t(ut, Dt),
                t(Dt, he),
                t(c, me),
                t(c, pt),
                t(pt, ft),
                t(ft, ve),
                t(ft, X),
                t(X, _e),
                t(pt, be),
                t(pt, rt),
                t(rt, Ee),
                t(rt, we),
                t(rt, ge),
                t(c, ye),
                t(c, ht),
                t(ht, Nt),
                t(Nt, Te),
                t(ht, Ae),
                t(ht, jt),
                t(jt, Ie),
                t(c, De),
                t(c, mt),
                t(mt, St),
                t(St, Ne),
                t(mt, je),
                t(mt, kt),
                t(kt, Kt),
                t(c, Se),
                t(c, vt),
                t(vt, Vt),
                t(Vt, ke),
                t(vt, Ve),
                t(vt, Pt),
                t(Pt, Pe),
                t(c, Le),
                t(c, _t),
                t(_t, Lt),
                t(Lt, He),
                t(_t, qe),
                t(_t, Ht),
                t(Ht, Be),
                t(Y, Ce),
                t(Y, C),
                t(C, Z),
                t(Z, Ut),
                t(Z, Re),
                t(C, Me),
                t(C, x),
                t(x, zt),
                t(x, Oe),
                t(C, Ue),
                t(C, $),
                t($, Jt),
                t($, ze),
                t(C, Je),
                t(C, nt),
                t(nt, Ft),
                t(nt, Fe),
                t(U, Ye),
                t(U, ot),
                t(ot, bt),
                t(bt, Yt),
                t(bt, Ge),
                t(ot, Ke),
                t(ot, tt),
                et && et.m(tt, null),
                t(tt, Qe),
                t(tt, Et);
            for (let N = 0; N < P.length; N += 1) P[N].m(Et, null);
            F(u, Qt, R),
                F(u, it, R),
                t(it, wt),
                t(wt, qt),
                t(qt, We),
                o[20](it),
                F(u, Wt, R),
                F(u, gt, R),
                o[21](gt),
                Xe || ((ps = [Ct(M, "click", o[13]), Ct(Z, "click", o[14]), Ct(x, "click", o[15]), Ct($, "click", o[16]), Ct(nt, "click", o[17])]), (Xe = !0));
        },
        p(u, R) {
            if ((R[0] & 2 && Fs(Kt, u[1]), u[8].persons_amount > 1 && et.p(u, R), R[0] & 264)) {
                Bt = Array(u[8].persons_amount);
                let N;
                for (N = 0; N < Bt.length; N += 1) {
                    const Gt = Cs(u, Bt, N);
                    P[N] ? P[N].p(Gt, R) : ((P[N] = Rs(Gt)), P[N].c(), P[N].m(Et, null));
                }
                for (; N < P.length; N += 1) P[N].d(1);
                P.length = Bt.length;
            }
        },
        i: Hs,
        o: Hs,
        d(u) {
            u && e(i), u && e(n), et && et.d(), Ys(P, u), u && e(Qt), u && e(it), o[20](null), u && e(Wt), u && e(gt), o[21](null), (Xe = !1), Gs(ps);
        },
    };
}
function ea(o, i, n) {
    let p, v;
    Ks(o, Xs, (f) => n(23, (v = f)));
    const { app: E, permission: j, real_id: w, access_token: g, ownerName: y, comp: d, API: I } = v.data;
    v.data;
    let A,
        S = "",
        D = "",
        q = [];
    function K(f, c) {
        f === "Success"
            ? n(
                  2,
                  (D.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
										<strong>Success</strong> ${c}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                  D
              )
            : n(
                  2,
                  (D.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
										<strong>Error</strong> ${c}
										<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
									</div>`),
                  D
              ),
            setTimeout(() => {
                n(2, (D.innerHTML = ""), D);
            }, 2e3);
    }
    async function M(f) {
        if (!confirm("Are you sure you want to accept this application?")) return;
        let T = prompt("Enter description:", "Accepted");
        await fetch(`${I}/requests/${f}/process`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + g,
            },
            body: JSON.stringify({ status: "accepted", description: T }),
        })
            .then((k) => {
                k.status == 200
                    ? (n(
                          2,
                          (D.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
											<strong>Success!</strong>
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                          D
                      ),
                      window.location.reload())
                    : n(
                          2,
                          (D.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
											<strong>Error!</strong> Something went wrong.
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                          D
                      );
            })
            .catch((k) => {
                console.error(k);
            });
    }
    async function at(f) {
        if (!confirm("Are you sure you want to reject this application?")) return;
        let T = prompt("Enter description:", "Rejected");
        await fetch(`${I}/requests/${f}/process`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + g,
            },
            body: JSON.stringify({ status: "rejected", description: T }),
        })
            .then((k) => {
                k.status == 200
                    ? (n(
                          2,
                          (D.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
											<strong>Success!</strong>
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                          D
                      ),
                      window.location.reload())
                    : n(
                          2,
                          (D.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
											<strong>Error!</strong> Something went wrong.
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
										</div>`),
                          D
                      );
            })
            .catch((k) => {
                console.error(k);
            });
    }
    let L = { team_name: p, team: [], competition: d.id };
    function Rt(f, c = "msg") {
        let T = [],
            k;
        d.persons_amount > 1 ? (k = q[f].children[1].children) : (k = q[f].children[0].children);
        for (let V = 0; V < k.length; V++) {
            let B = k[V].dataset.id,
                W = k[V].children[1].value;
            if (d.fields.find((At) => At.id == B).is_required && W == "") return n(2, (D.style.display = "block"), D), "error";
            T.push({ field_id: B, value: W });
        }
        let J = d.persons_amount;
        if (J == 1) L.team = [{ user_id: E.id, form: T }];
        else if (J > 1) {
            let V = q[f].children[0].children[1].value;
            if (V == "") return "error";
            if (isNaN(parseInt(V))) return "error";
            let B = L.team.find((W) => W.user_id == parseInt(V));
            if (B) {
                let W = 0;
                L.team.every((Tt, At) => {
                    Tt.user_id == parseInt(V);
                }),
                    (L.team[W].form = T);
            } else if (!B && L.team.length < J) L.team.push({ user_id: parseInt(V), form: T });
            else return "error";
        }
        return "success";
    }
    async function O() {
        for (let c = 0; c < d.persons_amount; c++)
            if (Rt(c, "noMsg") == "error") {
                alert("Please fill all the required fields");
                return;
            }
        if (L.team.length < d.persons_amount) {
            alert("Please add save all the applications first");
            return;
        }
        if (((L.team_name = p), L.team_name === "" && d.persons_amount > 1)) {
            alert("Please enter a team name");
            return;
        }
        const f = await fetch(`${I}/requests/${E.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${g}`,
            },
            body: JSON.stringify(L),
        });
        if (f.status == 200)
            K("Success", "Your request has been updated successfully"),
                setTimeout(() => {
                    window.location.href = `${Bs}/participant/requests`;
                }, 1e3);
        else {
            let c = await f.json();
            K("Error", Array.isArray(c.detail) ? (c.detail[0] ? c.detail[0].msg : "Something went wrong!") : c.detail);
        }
    }
    function U(f) {
        !confirm("Are you sure you want to delete this application?") ||
            fetch(`${I}/requests/${f}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
            }).then((T) => {
                T.status == 200 ? window.location.reload() : console.error(T);
            });
    }
    Qs(() => {
        n(1, (S = E.participants.map((f) => f.user_id).join(" ,")));
        for (let f = 0; f < d.persons_amount; f++) {
            let c = q[f].children[d.persons_amount > 1 ? 1 : 0].children;
            n(4, (p = E.team_name));
            for (let T = 0; T < c.length; T++) {
                d.persons_amount > 1 && n(3, (q[T].children[1].value = E.participants[T].user_id.toString()), q);
                let k = c[T].dataset.id,
                    J = E.participants[T].form.find((V) => V.field_id == k).value;
                J || (J = ""), (c[T].children[1].value = J);
            }
        }
        n(0, (A.style.display = "none"), A);
    });
    const z = () => (window.location.href = `${Bs}/admin/${w}`),
        Q = () => M(E.id),
        dt = () => at(E.id),
        Mt = () => O(),
        Ot = () => U(E.id);
    function lt() {
        (p = this.value), n(4, p);
    }
    function Y(f, c) {
        ns[f ? "unshift" : "push"](() => {
            (q[c] = f), n(3, q);
        });
    }
    function G(f) {
        ns[f ? "unshift" : "push"](() => {
            (A = f), n(0, A);
        });
    }
    function yt(f) {
        ns[f ? "unshift" : "push"](() => {
            (D = f), n(2, D);
        });
    }
    return n(4, (p = "")), [A, S, D, q, p, E, w, y, d, M, at, O, U, z, Q, dt, Mt, Ot, lt, Y, G, yt];
}
class na extends Ms {
    constructor(i) {
        super(), Os(this, i, ea, ta, Us, {}, null, [-1, -1]);
    }
}
export { na as default };
