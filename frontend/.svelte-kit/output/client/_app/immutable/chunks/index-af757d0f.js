function N() {}
function z(t, e) {
    for (const n in e) t[n] = e[n];
    return t;
}
function L(t) {
    return t();
}
function q() {
    return Object.create(null);
}
function p(t) {
    t.forEach(L);
}
function F(t) {
    return typeof t == "function";
}
function ut(t, e) {
    return t != t ? e == e : t !== e || (t && typeof t == "object") || typeof t == "function";
}
let g;
function st(t, e) {
    return g || (g = document.createElement("a")), (g.href = e), t === g.href;
}
function H(t) {
    return Object.keys(t).length === 0;
}
function W(t, ...e) {
    if (t == null) return N;
    const n = t.subscribe(...e);
    return n.unsubscribe ? () => n.unsubscribe() : n;
}
function at(t, e, n) {
    t.$$.on_destroy.push(W(e, n));
}
function ft(t, e, n, i) {
    if (t) {
        const r = P(t, e, n, i);
        return t[0](r);
    }
}
function P(t, e, n, i) {
    return t[1] && i ? z(n.ctx.slice(), t[1](i(e))) : n.ctx;
}
function _t(t, e, n, i) {
    if (t[2] && i) {
        const r = t[2](i(n));
        if (e.dirty === void 0) return r;
        if (typeof r == "object") {
            const s = [],
                c = Math.max(e.dirty.length, r.length);
            for (let u = 0; u < c; u += 1) s[u] = e.dirty[u] | r[u];
            return s;
        }
        return e.dirty | r;
    }
    return e.dirty;
}
function dt(t, e, n, i, r, s) {
    if (r) {
        const c = P(e, n, i, s);
        t.p(c, r);
    }
}
function ht(t) {
    if (t.ctx.length > 32) {
        const e = [],
            n = t.ctx.length / 32;
        for (let i = 0; i < n; i++) e[i] = -1;
        return e;
    }
    return -1;
}
let $ = !1;
function G() {
    $ = !0;
}
function J() {
    $ = !1;
}
function K(t, e, n, i) {
    for (; t < e; ) {
        const r = t + ((e - t) >> 1);
        n(r) <= i ? (t = r + 1) : (e = r);
    }
    return t;
}
function Q(t) {
    if (t.hydrate_init) return;
    t.hydrate_init = !0;
    let e = t.childNodes;
    if (t.nodeName === "HEAD") {
        const l = [];
        for (let o = 0; o < e.length; o++) {
            const f = e[o];
            f.claim_order !== void 0 && l.push(f);
        }
        e = l;
    }
    const n = new Int32Array(e.length + 1),
        i = new Int32Array(e.length);
    n[0] = -1;
    let r = 0;
    for (let l = 0; l < e.length; l++) {
        const o = e[l].claim_order,
            f = (r > 0 && e[n[r]].claim_order <= o ? r + 1 : K(1, r, (y) => e[n[y]].claim_order, o)) - 1;
        i[l] = n[f] + 1;
        const a = f + 1;
        (n[a] = l), (r = Math.max(a, r));
    }
    const s = [],
        c = [];
    let u = e.length - 1;
    for (let l = n[r] + 1; l != 0; l = i[l - 1]) {
        for (s.push(e[l - 1]); u >= l; u--) c.push(e[u]);
        u--;
    }
    for (; u >= 0; u--) c.push(e[u]);
    s.reverse(), c.sort((l, o) => l.claim_order - o.claim_order);
    for (let l = 0, o = 0; l < c.length; l++) {
        for (; o < s.length && c[l].claim_order >= s[o].claim_order; ) o++;
        const f = o < s.length ? s[o] : null;
        t.insertBefore(c[l], f);
    }
}
function R(t, e) {
    if ($) {
        for (
            Q(t), (t.actual_end_child === void 0 || (t.actual_end_child !== null && t.actual_end_child.parentNode !== t)) && (t.actual_end_child = t.firstChild);
            t.actual_end_child !== null && t.actual_end_child.claim_order === void 0;

        )
            t.actual_end_child = t.actual_end_child.nextSibling;
        e !== t.actual_end_child ? (e.claim_order !== void 0 || e.parentNode !== t) && t.insertBefore(e, t.actual_end_child) : (t.actual_end_child = e.nextSibling);
    } else (e.parentNode !== t || e.nextSibling !== null) && t.appendChild(e);
}
function mt(t, e, n) {
    $ && !n ? R(t, e) : (e.parentNode !== t || e.nextSibling != n) && t.insertBefore(e, n || null);
}
function U(t) {
    t.parentNode.removeChild(t);
}
function pt(t, e) {
    for (let n = 0; n < t.length; n += 1) t[n] && t[n].d(e);
}
function V(t) {
    return document.createElement(t);
}
function S(t) {
    return document.createTextNode(t);
}
function yt() {
    return S(" ");
}
function gt() {
    return S("");
}
function bt(t, e, n, i) {
    return t.addEventListener(e, n, i), () => t.removeEventListener(e, n, i);
}
function X(t, e, n) {
    n == null ? t.removeAttribute(e) : t.getAttribute(e) !== n && t.setAttribute(e, n);
}
function xt(t, e, n) {
    e in t ? (t[e] = typeof t[e] == "boolean" && n === "" ? !0 : n) : X(t, e, n);
}
function vt(t) {
    return t === "" ? null : +t;
}
function Y(t) {
    return Array.from(t.childNodes);
}
function Z(t) {
    t.claim_info === void 0 && (t.claim_info = { last_index: 0, total_claimed: 0 });
}
function B(t, e, n, i, r = !1) {
    Z(t);
    const s = (() => {
        for (let c = t.claim_info.last_index; c < t.length; c++) {
            const u = t[c];
            if (e(u)) {
                const l = n(u);
                return l === void 0 ? t.splice(c, 1) : (t[c] = l), r || (t.claim_info.last_index = c), u;
            }
        }
        for (let c = t.claim_info.last_index - 1; c >= 0; c--) {
            const u = t[c];
            if (e(u)) {
                const l = n(u);
                return l === void 0 ? t.splice(c, 1) : (t[c] = l), r ? l === void 0 && t.claim_info.last_index-- : (t.claim_info.last_index = c), u;
            }
        }
        return i();
    })();
    return (s.claim_order = t.claim_info.total_claimed), (t.claim_info.total_claimed += 1), s;
}
function tt(t, e, n, i) {
    return B(
        t,
        (r) => r.nodeName === e,
        (r) => {
            const s = [];
            for (let c = 0; c < r.attributes.length; c++) {
                const u = r.attributes[c];
                n[u.name] || s.push(u.name);
            }
            s.forEach((c) => r.removeAttribute(c));
        },
        () => i(e)
    );
}
function $t(t, e, n) {
    return tt(t, e, n, V);
}
function et(t, e) {
    return B(
        t,
        (n) => n.nodeType === 3,
        (n) => {
            const i = "" + e;
            if (n.data.startsWith(i)) {
                if (n.data.length !== i.length) return n.splitText(i.length);
            } else n.data = i;
        },
        () => S(e),
        !0
    );
}
function wt(t) {
    return et(t, " ");
}
function Et(t, e) {
    (e = "" + e), t.wholeText !== e && (t.data = e);
}
function At(t, e) {
    t.value = e == null ? "" : e;
}
function Nt(t, e, n, i) {
    n === null ? t.style.removeProperty(e) : t.style.setProperty(e, n, i ? "important" : "");
}
function St(t, e) {
    for (let n = 0; n < t.options.length; n += 1) {
        const i = t.options[n];
        if (i.__value === e) {
            i.selected = !0;
            return;
        }
    }
    t.selectedIndex = -1;
}
function jt(t) {
    const e = t.querySelector(":checked") || t.options[0];
    return e && e.__value;
}
function kt(t, e, n) {
    t.classList[n ? "add" : "remove"](e);
}
function nt(t, e, { bubbles: n = !1, cancelable: i = !1 } = {}) {
    const r = document.createEvent("CustomEvent");
    return r.initCustomEvent(t, n, i, e), r;
}
function Ct(t, e = document.body) {
    return Array.from(e.querySelectorAll(t));
}
let m;
function h(t) {
    m = t;
}
function j() {
    if (!m) throw new Error("Function called outside component initialization");
    return m;
}
function qt(t) {
    j().$$.on_mount.push(t);
}
function Tt(t) {
    j().$$.after_update.push(t);
}
function Mt() {
    const t = j();
    return (e, n, { cancelable: i = !1 } = {}) => {
        const r = t.$$.callbacks[e];
        if (r) {
            const s = nt(e, n, { cancelable: i });
            return (
                r.slice().forEach((c) => {
                    c.call(t, s);
                }),
                !s.defaultPrevented
            );
        }
        return !0;
    };
}
const d = [],
    T = [],
    x = [],
    M = [],
    O = Promise.resolve();
let E = !1;
function D() {
    E || ((E = !0), O.then(I));
}
function Lt() {
    return D(), O;
}
function A(t) {
    x.push(t);
}
const w = new Set();
let b = 0;
function I() {
    const t = m;
    do {
        for (; b < d.length; ) {
            const e = d[b];
            b++, h(e), it(e.$$);
        }
        for (h(null), d.length = 0, b = 0; T.length; ) T.pop()();
        for (let e = 0; e < x.length; e += 1) {
            const n = x[e];
            w.has(n) || (w.add(n), n());
        }
        x.length = 0;
    } while (d.length);
    for (; M.length; ) M.pop()();
    (E = !1), w.clear(), h(t);
}
function it(t) {
    if (t.fragment !== null) {
        t.update(), p(t.before_update);
        const e = t.dirty;
        (t.dirty = [-1]), t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(A);
    }
}
const v = new Set();
let _;
function Pt() {
    _ = { r: 0, c: [], p: _ };
}
function Bt() {
    _.r || p(_.c), (_ = _.p);
}
function rt(t, e) {
    t && t.i && (v.delete(t), t.i(e));
}
function Ot(t, e, n, i) {
    if (t && t.o) {
        if (v.has(t)) return;
        v.add(t),
            _.c.push(() => {
                v.delete(t), i && (n && t.d(1), i());
            }),
            t.o(e);
    } else i && i();
}
const Dt = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global;
function It(t) {
    t && t.c();
}
function zt(t, e) {
    t && t.l(e);
}
function ct(t, e, n, i) {
    const { fragment: r, on_mount: s, on_destroy: c, after_update: u } = t.$$;
    r && r.m(e, n),
        i ||
            A(() => {
                const l = s.map(L).filter(F);
                c ? c.push(...l) : p(l), (t.$$.on_mount = []);
            }),
        u.forEach(A);
}
function lt(t, e) {
    const n = t.$$;
    n.fragment !== null && (p(n.on_destroy), n.fragment && n.fragment.d(e), (n.on_destroy = n.fragment = null), (n.ctx = []));
}
function ot(t, e) {
    t.$$.dirty[0] === -1 && (d.push(t), D(), t.$$.dirty.fill(0)), (t.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
}
function Ft(t, e, n, i, r, s, c, u = [-1]) {
    const l = m;
    h(t);
    const o = (t.$$ = {
        fragment: null,
        ctx: null,
        props: s,
        update: N,
        not_equal: r,
        bound: q(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(e.context || (l ? l.$$.context : [])),
        callbacks: q(),
        dirty: u,
        skip_bound: !1,
        root: e.target || l.$$.root,
    });
    c && c(o.root);
    let f = !1;
    if (
        ((o.ctx = n
            ? n(t, e.props || {}, (a, y, ...k) => {
                  const C = k.length ? k[0] : y;
                  return o.ctx && r(o.ctx[a], (o.ctx[a] = C)) && (!o.skip_bound && o.bound[a] && o.bound[a](C), f && ot(t, a)), y;
              })
            : []),
        o.update(),
        (f = !0),
        p(o.before_update),
        (o.fragment = i ? i(o.ctx) : !1),
        e.target)
    ) {
        if (e.hydrate) {
            G();
            const a = Y(e.target);
            o.fragment && o.fragment.l(a), a.forEach(U);
        } else o.fragment && o.fragment.c();
        e.intro && rt(t.$$.fragment), ct(t, e.target, e.anchor, e.customElement), J(), I();
    }
    h(l);
}
class Ht {
    $destroy() {
        lt(this, 1), (this.$destroy = N);
    }
    $on(e, n) {
        const i = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return (
            i.push(n),
            () => {
                const r = i.indexOf(n);
                r !== -1 && i.splice(r, 1);
            }
        );
    }
    $set(e) {
        this.$$set && !H(e) && ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
    }
}
export {
    N as A,
    R as B,
    ft as C,
    Ct as D,
    st as E,
    dt as F,
    ht as G,
    _t as H,
    at as I,
    Dt as J,
    T as K,
    jt as L,
    A as M,
    At as N,
    St as O,
    bt as P,
    pt as Q,
    p as R,
    Ht as S,
    xt as T,
    kt as U,
    vt as V,
    Mt as W,
    yt as a,
    mt as b,
    wt as c,
    Bt as d,
    gt as e,
    rt as f,
    Pt as g,
    U as h,
    Ft as i,
    Tt as j,
    V as k,
    $t as l,
    Y as m,
    X as n,
    qt as o,
    Nt as p,
    S as q,
    et as r,
    ut as s,
    Ot as t,
    Et as u,
    It as v,
    zt as w,
    ct as x,
    lt as y,
    Lt as z,
};
