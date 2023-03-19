function dn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let r = 0; r < o.length; r++)
    n[o[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function Be(e) {
  if (d(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = x(o) ? mn(o) : Be(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else {
    if (x(e))
      return e;
    if (b(e))
      return e;
  }
}
const hn = /;(?![^(]*\))/g, _n = /:([^]+)/, gn = /\/\*.*?\*\//gs;
function mn(e) {
  const t = {};
  return e.replace(gn, "").split(hn).forEach((n) => {
    if (n) {
      const o = n.split(_n);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function se(e) {
  let t = "";
  if (x(e))
    t = e;
  else if (d(e))
    for (let n = 0; n < e.length; n++) {
      const o = se(e[n]);
      o && (t += o + " ");
    }
  else if (b(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Ae = (e) => x(e) ? e : e == null ? "" : d(e) || b(e) && (e.toString === St || !N(e.toString)) ? JSON.stringify(e, yt, 2) : String(e), yt = (e, t) => t && t.__v_isRef ? yt(e, t.value) : L(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [o, r]) => (n[`${o} =>`] = r, n), {})
} : vt(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : b(t) && !d(t) && !Vt(t) ? String(t) : t, M = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, En = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Le = () => {
}, wn = /^on[^a-z]/, Nn = (e) => wn.test(e), C = Object.assign, bn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, On = Object.prototype.hasOwnProperty, g = (e, t) => On.call(e, t), d = Array.isArray, L = (e) => $e(e) === "[object Map]", vt = (e) => $e(e) === "[object Set]", N = (e) => typeof e == "function", x = (e) => typeof e == "string", Ge = (e) => typeof e == "symbol", b = (e) => e !== null && typeof e == "object", yn = (e) => b(e) && N(e.then) && N(e.catch), St = Object.prototype.toString, $e = (e) => St.call(e), xt = (e) => $e(e).slice(8, -1), Vt = (e) => $e(e) === "[object Object]", Je = (e) => x(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Dt = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Rt = Dt((e) => e.charAt(0).toUpperCase() + e.slice(1)), vn = Dt((e) => e ? `on${Rt(e)}` : ""), ie = (e, t) => !Object.is(e, t), Sn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, xn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, it = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ct;
const Vn = () => ct || (ct = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function lt(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let $t;
function Dn(e, t = $t) {
  t && t.active && t.effects.push(e);
}
function Rn() {
  return $t;
}
const ce = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Tt = (e) => (e.w & H) > 0, It = (e) => (e.n & H) > 0, $n = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= H;
}, Tn = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      Tt(r) && !It(r) ? r.delete(e) : t[n++] = r, r.w &= ~H, r.n &= ~H;
    }
    t.length = n;
  }
}, Oe = /* @__PURE__ */ new WeakMap();
let ne = 0, H = 1;
const Fe = 30;
let v;
const G = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), je = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Ct {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Dn(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = v, n = z;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = v, v = this, z = !0, H = 1 << ++ne, ne <= Fe ? $n(this) : ut(this), this.fn();
    } finally {
      ne <= Fe && Tn(this), H = 1 << --ne, v = this.parent, z = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    v === this ? this.deferStop = !0 : this.active && (ut(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ut(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let z = !0;
const Pt = [];
function qe() {
  Pt.push(z), z = !1;
}
function Ye() {
  const e = Pt.pop();
  z = e === void 0 ? !0 : e;
}
function V(e, t, n) {
  if (z && v) {
    let o = Oe.get(e);
    o || Oe.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = ce());
    const s = process.env.NODE_ENV !== "production" ? { effect: v, target: e, type: t, key: n } : void 0;
    Ke(r, s);
  }
}
function Ke(e, t) {
  let n = !1;
  ne <= Fe ? It(e) || (e.n |= H, n = !Tt(e)) : n = !e.has(v), n && (e.add(v), v.deps.push(e), process.env.NODE_ENV !== "production" && v.onTrack && v.onTrack(Object.assign({ effect: v }, t)));
}
function U(e, t, n, o, r, s) {
  const i = Oe.get(e);
  if (!i)
    return;
  let c = [];
  if (t === "clear")
    c = [...i.values()];
  else if (n === "length" && d(e)) {
    const a = Number(o);
    i.forEach((h, l) => {
      (l === "length" || l >= a) && c.push(h);
    });
  } else
    switch (n !== void 0 && c.push(i.get(n)), t) {
      case "add":
        d(e) ? Je(n) && c.push(i.get("length")) : (c.push(i.get(G)), L(e) && c.push(i.get(je)));
        break;
      case "delete":
        d(e) || (c.push(i.get(G)), L(e) && c.push(i.get(je)));
        break;
      case "set":
        L(e) && c.push(i.get(G));
        break;
    }
  const u = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: r, oldTarget: s } : void 0;
  if (c.length === 1)
    c[0] && (process.env.NODE_ENV !== "production" ? Q(c[0], u) : Q(c[0]));
  else {
    const a = [];
    for (const h of c)
      h && a.push(...h);
    process.env.NODE_ENV !== "production" ? Q(ce(a), u) : Q(ce(a));
  }
}
function Q(e, t) {
  const n = d(e) ? e : [...e];
  for (const o of n)
    o.computed && at(o, t);
  for (const o of n)
    o.computed || at(o, t);
}
function at(e, t) {
  (e !== v || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(C({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
function In(e, t) {
  var n;
  return (n = Oe.get(e)) === null || n === void 0 ? void 0 : n.get(t);
}
const Cn = /* @__PURE__ */ dn("__proto__,__v_isRef,__isVue"), Mt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Ge)
), Pn = /* @__PURE__ */ Qe(), Mn = /* @__PURE__ */ Qe(!0), An = /* @__PURE__ */ Qe(!0, !0), ft = /* @__PURE__ */ Fn();
function Fn() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = f(this);
      for (let s = 0, i = this.length; s < i; s++)
        V(o, "get", s + "");
      const r = o[t](...n);
      return r === -1 || r === !1 ? o[t](...n.map(f)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      qe();
      const o = f(this)[t].apply(this, n);
      return Ye(), o;
    };
  }), e;
}
function jn(e) {
  const t = f(this);
  return V(t, "has", e), t.hasOwnProperty(e);
}
function Qe(e = !1, t = !1) {
  return function(o, r, s) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && s === (e ? t ? zt : Kt : t ? er : jt).get(o))
      return o;
    const i = d(o);
    if (!e) {
      if (i && g(ft, r))
        return Reflect.get(ft, r, s);
      if (r === "hasOwnProperty")
        return jn;
    }
    const c = Reflect.get(o, r, s);
    return (Ge(r) ? Mt.has(r) : Cn(r)) || (e || V(o, "get", r), t) ? c : O(c) ? i && Je(r) ? c : c.value : b(c) ? e ? Ut(c) : Ht(c) : c;
  };
}
const Kn = /* @__PURE__ */ zn();
function zn(e = !1) {
  return function(n, o, r, s) {
    let i = n[o];
    if (W(i) && O(i) && !O(r))
      return !1;
    if (!e && (!ye(r) && !W(r) && (i = f(i), r = f(r)), !d(n) && O(i) && !O(r)))
      return i.value = r, !0;
    const c = d(n) && Je(o) ? Number(o) < n.length : g(n, o), u = Reflect.set(n, o, r, s);
    return n === f(s) && (c ? ie(r, i) && U(n, "set", o, r, i) : U(n, "add", o, r)), u;
  };
}
function Hn(e, t) {
  const n = g(e, t), o = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && U(e, "delete", t, void 0, o), r;
}
function Un(e, t) {
  const n = Reflect.has(e, t);
  return (!Ge(t) || !Mt.has(t)) && V(e, "has", t), n;
}
function Wn(e) {
  return V(e, "iterate", d(e) ? "length" : G), Reflect.ownKeys(e);
}
const Bn = {
  get: Pn,
  set: Kn,
  deleteProperty: Hn,
  has: Un,
  ownKeys: Wn
}, At = {
  get: Mn,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && lt(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && lt(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Ln = /* @__PURE__ */ C({}, At, {
  get: An
}), Xe = (e) => e, Te = (e) => Reflect.getPrototypeOf(e);
function pe(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = f(e), s = f(t);
  n || (t !== s && V(r, "get", t), V(r, "get", s));
  const { has: i } = Te(r), c = o ? Xe : n ? et : le;
  if (i.call(r, t))
    return c(e.get(t));
  if (i.call(r, s))
    return c(e.get(s));
  e !== r && e.get(t);
}
function de(e, t = !1) {
  const n = this.__v_raw, o = f(n), r = f(e);
  return t || (e !== r && V(o, "has", e), V(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function he(e, t = !1) {
  return e = e.__v_raw, !t && V(f(e), "iterate", G), Reflect.get(e, "size", e);
}
function pt(e) {
  e = f(e);
  const t = f(this);
  return Te(t).has.call(t, e) || (t.add(e), U(t, "add", e, e)), this;
}
function dt(e, t) {
  t = f(t);
  const n = f(this), { has: o, get: r } = Te(n);
  let s = o.call(n, e);
  s ? process.env.NODE_ENV !== "production" && Ft(n, o, e) : (e = f(e), s = o.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), s ? ie(t, i) && U(n, "set", e, t, i) : U(n, "add", e, t), this;
}
function ht(e) {
  const t = f(this), { has: n, get: o } = Te(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && Ft(t, n, e) : (e = f(e), r = n.call(t, e));
  const s = o ? o.call(t, e) : void 0, i = t.delete(e);
  return r && U(t, "delete", e, void 0, s), i;
}
function _t() {
  const e = f(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? L(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && U(e, "clear", void 0, void 0, n), o;
}
function _e(e, t) {
  return function(o, r) {
    const s = this, i = s.__v_raw, c = f(i), u = t ? Xe : e ? et : le;
    return !e && V(c, "iterate", G), i.forEach((a, h) => o.call(r, u(a), u(h), s));
  };
}
function ge(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = f(r), i = L(s), c = e === "entries" || e === Symbol.iterator && i, u = e === "keys" && i, a = r[e](...o), h = n ? Xe : t ? et : le;
    return !t && V(s, "iterate", u ? je : G), {
      // iterator protocol
      next() {
        const { value: l, done: p } = a.next();
        return p ? { value: l, done: p } : {
          value: c ? [h(l[0]), h(l[1])] : h(l),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function A(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${Rt(e)} operation ${n}failed: target is readonly.`, f(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function Gn() {
  const e = {
    get(s) {
      return pe(this, s);
    },
    get size() {
      return he(this);
    },
    has: de,
    add: pt,
    set: dt,
    delete: ht,
    clear: _t,
    forEach: _e(!1, !1)
  }, t = {
    get(s) {
      return pe(this, s, !1, !0);
    },
    get size() {
      return he(this);
    },
    has: de,
    add: pt,
    set: dt,
    delete: ht,
    clear: _t,
    forEach: _e(!1, !0)
  }, n = {
    get(s) {
      return pe(this, s, !0);
    },
    get size() {
      return he(this, !0);
    },
    has(s) {
      return de.call(this, s, !0);
    },
    add: A(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: A(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: A(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: A(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: _e(!0, !1)
  }, o = {
    get(s) {
      return pe(this, s, !0, !0);
    },
    get size() {
      return he(this, !0);
    },
    has(s) {
      return de.call(this, s, !0);
    },
    add: A(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: A(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: A(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: A(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: _e(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = ge(s, !1, !1), n[s] = ge(s, !0, !1), t[s] = ge(s, !1, !0), o[s] = ge(s, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [Jn, qn, Yn, Qn] = /* @__PURE__ */ Gn();
function Ze(e, t) {
  const n = t ? e ? Qn : Yn : e ? qn : Jn;
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(g(n, r) && r in o ? n : o, r, s);
}
const Xn = {
  get: /* @__PURE__ */ Ze(!1, !1)
}, Zn = {
  get: /* @__PURE__ */ Ze(!0, !1)
}, kn = {
  get: /* @__PURE__ */ Ze(!0, !0)
};
function Ft(e, t, n) {
  const o = f(n);
  if (o !== n && t.call(e, o)) {
    const r = xt(e);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const jt = /* @__PURE__ */ new WeakMap(), er = /* @__PURE__ */ new WeakMap(), Kt = /* @__PURE__ */ new WeakMap(), zt = /* @__PURE__ */ new WeakMap();
function tr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function nr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : tr(xt(e));
}
function Ht(e) {
  return W(e) ? e : ke(e, !1, Bn, Xn, jt);
}
function Ut(e) {
  return ke(e, !0, At, Zn, Kt);
}
function me(e) {
  return ke(e, !0, Ln, kn, zt);
}
function ke(e, t, n, o, r) {
  if (!b(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const i = nr(e);
  if (i === 0)
    return e;
  const c = new Proxy(e, i === 2 ? o : n);
  return r.set(e, c), c;
}
function J(e) {
  return W(e) ? J(e.__v_raw) : !!(e && e.__v_isReactive);
}
function W(e) {
  return !!(e && e.__v_isReadonly);
}
function ye(e) {
  return !!(e && e.__v_isShallow);
}
function ze(e) {
  return J(e) || W(e);
}
function f(e) {
  const t = e && e.__v_raw;
  return t ? f(t) : e;
}
function rr(e) {
  return xn(e, "__v_skip", !0), e;
}
const le = (e) => b(e) ? Ht(e) : e, et = (e) => b(e) ? Ut(e) : e;
function Wt(e) {
  z && v && (e = f(e), process.env.NODE_ENV !== "production" ? Ke(e.dep || (e.dep = ce()), {
    target: e,
    type: "get",
    key: "value"
  }) : Ke(e.dep || (e.dep = ce())));
}
function Bt(e, t) {
  e = f(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? Q(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : Q(n));
}
function O(e) {
  return !!(e && e.__v_isRef === !0);
}
function Lt(e) {
  return or(e, !1);
}
function or(e, t) {
  return O(e) ? e : new sr(e, t);
}
class sr {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : f(t), this._value = n ? t : le(t);
  }
  get value() {
    return Wt(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || ye(t) || W(t);
    t = n ? t : f(t), ie(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : le(t), Bt(this, t));
  }
}
function we(e) {
  return O(e) ? e.value : e;
}
const ir = {
  get: (e, t, n) => we(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return O(r) && !O(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function cr(e) {
  return J(e) ? e : new Proxy(e, ir);
}
class lr {
  constructor(t, n, o) {
    this._object = t, this._key = n, this._defaultValue = o, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return In(f(this._object), this._key);
  }
}
function ur(e, t, n) {
  const o = e[t];
  return O(o) ? o : new lr(e, t, n);
}
var Gt;
class ar {
  constructor(t, n, o, r) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Gt] = !1, this._dirty = !0, this.effect = new Ct(t, () => {
      this._dirty || (this._dirty = !0, Bt(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = o;
  }
  get value() {
    const t = f(this);
    return Wt(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Gt = "__v_isReadonly";
function fr(e, t, n = !1) {
  let o, r;
  const s = N(e);
  s ? (o = e, r = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Le) : (o = e.get, r = e.set);
  const i = new ar(o, r, s || !r, n);
  return process.env.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const q = [];
function pr(e) {
  q.push(e);
}
function dr() {
  q.pop();
}
function w(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  qe();
  const n = q.length ? q[q.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = hr();
  if (o)
    Y(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      r.map(({ vnode: s }) => `at <${un(n, s.type)}>`).join(`
`),
      r
    ]);
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ..._r(r)), console.warn(...s);
  }
  Ye();
}
function hr() {
  let e = q[q.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function _r(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...gr(n));
  }), t;
}
function gr({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${un(e.component, e.type, o)}`, s = ">" + n;
  return e.props ? [r, ...mr(e.props), s] : [r + s];
}
function mr(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Jt(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Jt(e, t, n) {
  return x(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : O(t) ? (t = Jt(e, f(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : N(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = f(t), n ? t : [`${e}=`, t]);
}
const tt = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Y(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    qt(s, t, n);
  }
  return r;
}
function ve(e, t, n, o) {
  if (N(e)) {
    const s = Y(e, t, n, o);
    return s && yn(s) && s.catch((i) => {
      qt(i, t, n);
    }), s;
  }
  const r = [];
  for (let s = 0; s < e.length; s++)
    r.push(ve(e[s], t, n, o));
  return r;
}
function qt(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, c = process.env.NODE_ENV !== "production" ? tt[n] : n;
    for (; s; ) {
      const a = s.ec;
      if (a) {
        for (let h = 0; h < a.length; h++)
          if (a[h](e, i, c) === !1)
            return;
      }
      s = s.parent;
    }
    const u = t.appContext.config.errorHandler;
    if (u) {
      Y(u, null, 10, [e, i, c]);
      return;
    }
  }
  Er(e, n, r, o);
}
function Er(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = tt[t];
    if (n && pr(n), w(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && dr(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Se = !1, He = !1;
const R = [];
let j = 0;
const Z = [];
let P = null, F = 0;
const Yt = /* @__PURE__ */ Promise.resolve();
let nt = null;
const wr = 100;
function Nr(e) {
  const t = nt || Yt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function br(e) {
  let t = j + 1, n = R.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    ue(R[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function rt(e) {
  (!R.length || !R.includes(e, Se && e.allowRecurse ? j + 1 : j)) && (e.id == null ? R.push(e) : R.splice(br(e.id), 0, e), Qt());
}
function Qt() {
  !Se && !He && (He = !0, nt = Yt.then(Zt));
}
function Xt(e) {
  d(e) ? Z.push(...e) : (!P || !P.includes(e, e.allowRecurse ? F + 1 : F)) && Z.push(e), Qt();
}
function Or(e) {
  if (Z.length) {
    const t = [...new Set(Z)];
    if (Z.length = 0, P) {
      P.push(...t);
      return;
    }
    for (P = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), P.sort((n, o) => ue(n) - ue(o)), F = 0; F < P.length; F++)
      process.env.NODE_ENV !== "production" && kt(e, P[F]) || P[F]();
    P = null, F = 0;
  }
}
const ue = (e) => e.id == null ? 1 / 0 : e.id, yr = (e, t) => {
  const n = ue(e) - ue(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function Zt(e) {
  He = !1, Se = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), R.sort(yr);
  const t = process.env.NODE_ENV !== "production" ? (n) => kt(e, n) : Le;
  try {
    for (j = 0; j < R.length; j++) {
      const n = R[j];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        Y(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    j = 0, R.length = 0, Or(e), Se = !1, nt = null, (R.length || Z.length) && Zt(e);
  }
}
function kt(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > wr) {
      const o = t.ownerInstance, r = o && ln(o.type);
      return w(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const ee = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (Vn().__VUE_HMR_RUNTIME__ = {
  createRecord: Ce(vr),
  rerender: Ce(Sr),
  reload: Ce(xr)
});
const xe = /* @__PURE__ */ new Map();
function vr(e, t) {
  return xe.has(e) ? !1 : (xe.set(e, {
    initialDef: re(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function re(e) {
  return an(e) ? e.__vccOpts : e;
}
function Sr(e, t) {
  const n = xe.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, re(o.type).render = t), o.renderCache = [], o.update();
  }));
}
function xr(e, t) {
  const n = xe.get(e);
  if (!n)
    return;
  t = re(t), gt(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const s = re(r.type);
    ee.has(s) || (s !== n.initialDef && gt(s, t), ee.add(s)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (ee.add(s), r.ceReload(t.styles), ee.delete(s)) : r.parent ? rt(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Xt(() => {
    for (const r of o)
      ee.delete(re(r.type));
  });
}
function gt(e, t) {
  C(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ce(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let K = null, Vr = null;
const Dr = (e) => e.__isSuspense;
function Rr(e, t) {
  t && t.pendingBranch ? d(e) ? t.effects.push(...e) : t.effects.push(e) : Xt(e);
}
const Ee = {};
function $r(e, t, { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: i } = M) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && w('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && w('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const c = (_) => {
    w("Invalid watch source: ", _, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, u = Rn() === (I == null ? void 0 : I.scope) ? I : null;
  let a, h = !1, l = !1;
  if (O(e) ? (a = () => e.value, h = ye(e)) : J(e) ? (a = () => e, o = !0) : d(e) ? (l = !0, h = e.some((_) => J(_) || ye(_)), a = () => e.map((_) => {
    if (O(_))
      return _.value;
    if (J(_))
      return X(_);
    if (N(_))
      return Y(
        _,
        u,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && c(_);
  })) : N(e) ? t ? a = () => Y(
    e,
    u,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : a = () => {
    if (!(u && u.isUnmounted))
      return p && p(), ve(e, u, 3, [m]);
  } : (a = Le, process.env.NODE_ENV !== "production" && c(e)), t && o) {
    const _ = a;
    a = () => X(_());
  }
  let p, m = (_) => {
    p = D.onStop = () => {
      Y(
        _,
        u,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, E = l ? new Array(e.length).fill(Ee) : Ee;
  const S = () => {
    if (D.active)
      if (t) {
        const _ = D.run();
        (o || h || (l ? _.some((fn, pn) => ie(fn, E[pn])) : ie(_, E))) && (p && p(), ve(t, u, 3, [
          _,
          // pass undefined as the old value when it's changed for the first time
          E === Ee ? void 0 : l && E[0] === Ee ? [] : E,
          m
        ]), E = _);
      } else
        D.run();
  };
  S.allowRecurse = !!t;
  let fe;
  r === "sync" ? fe = S : r === "post" ? fe = () => wt(S, u && u.suspense) : (S.pre = !0, u && (S.id = u.uid), fe = () => rt(S));
  const D = new Ct(a, fe);
  return process.env.NODE_ENV !== "production" && (D.onTrack = s, D.onTrigger = i), t ? n ? S() : E = D.run() : r === "post" ? wt(D.run.bind(D), u && u.suspense) : D.run(), () => {
    D.stop(), u && u.scope && bn(u.scope.effects, D);
  };
}
function Tr(e, t, n) {
  const o = this.proxy, r = x(e) ? e.includes(".") ? Ir(o, e) : () => o[e] : e.bind(o, o);
  let s;
  N(t) ? s = t : (s = t.handler, n = t);
  const i = I;
  We(this);
  const c = $r(r, s.bind(o), n);
  return i ? We(i) : cn(), c;
}
function Ir(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function X(e, t) {
  if (!b(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), O(e))
    X(e.value, t);
  else if (d(e))
    for (let n = 0; n < e.length; n++)
      X(e[n], t);
  else if (vt(e) || L(e))
    e.forEach((n) => {
      X(n, t);
    });
  else if (Vt(e))
    for (const n in e)
      X(e[n], t);
  return e;
}
function Ie(e) {
  return N(e) ? { setup: e, name: e.name } : e;
}
function Cr(e, t, n = I, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      qe(), We(n);
      const c = ve(t, n, e, i);
      return cn(), Ye(), c;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const r = vn(tt[e].replace(/ hook$/, ""));
    w(`${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const Pr = (e) => (t, n = I) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  Cr(e, (...o) => t(...o), n)
), Mr = Pr(
  "m"
  /* LifecycleHooks.MOUNTED */
);
function Ar(e, t) {
  return process.env.NODE_ENV !== "production" && w("withDirectives can only be used inside render functions."), e;
}
const Fr = Symbol();
function jr(e, t, n, o) {
  let r;
  const s = n && n[o];
  if (d(e) || x(e)) {
    r = new Array(e.length);
    for (let i = 0, c = e.length; i < c; i++)
      r[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && w(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (b(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, c) => t(i, c, void 0, s && s[c]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let c = 0, u = i.length; c < u; c++) {
        const a = i[c];
        r[c] = t(e[a], a, c, s && s[c]);
      }
    }
  else
    r = [];
  return n && (n[o] = r), r;
}
const Ue = (e) => e ? eo(e) ? no(e) || e.proxy : Ue(e.parent) : null, oe = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ C(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? me(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? me(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? me(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? me(e.refs) : e.refs,
    $parent: (e) => Ue(e.parent),
    $root: (e) => Ue(e.root),
    $emit: (e) => e.emit,
    $options: (e) => Hr(e),
    $forceUpdate: (e) => e.f || (e.f = () => rt(e.update)),
    $nextTick: (e) => e.n || (e.n = Nr.bind(e.proxy)),
    $watch: (e) => Tr.bind(e)
  })
), Kr = (e) => e === "_" || e === "$", Pe = (e, t) => e !== M && !e.__isScriptSetup && g(e, t), zr = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: c, appContext: u } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let a;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (Pe(o, t))
          return i[t] = 1, o[t];
        if (r !== M && g(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (a = e.propsOptions[0]) && g(a, t)
        )
          return i[t] = 3, s[t];
        if (n !== M && g(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const h = oe[t];
    let l, p;
    if (h)
      return t === "$attrs" && (V(e, "get", t), process.env.NODE_ENV !== "production" && void 0), h(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== M && g(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = u.config.globalProperties, g(p, t)
    )
      return p[t];
    process.env.NODE_ENV !== "production" && K && (!x(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== M && Kr(t[0]) && g(r, t) ? w(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === K && w(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return Pe(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && g(r, t) ? (w(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== M && g(o, t) ? (o[t] = n, !0) : g(e.props, t) ? (process.env.NODE_ENV !== "production" && w(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && w(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s } }, i) {
    let c;
    return !!n[i] || e !== M && g(e, i) || Pe(t, i) || (c = s[0]) && g(c, i) || g(o, i) || g(oe, i) || g(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : g(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (zr.ownKeys = (e) => (w("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function Hr(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: r, optionsCache: s, config: { optionMergeStrategies: i } } = e.appContext, c = s.get(t);
  let u;
  return c ? u = c : !r.length && !n && !o ? u = t : (u = {}, r.length && r.forEach((a) => Ve(u, a, i, !0)), Ve(u, t, i)), b(t) && s.set(t, u), u;
}
function Ve(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && Ve(e, s, n, !0), r && r.forEach((i) => Ve(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && w('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const c = Ur[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const Ur = {
  data: mt,
  props: B,
  emits: B,
  // objects
  methods: B,
  computed: B,
  // lifecycle
  beforeCreate: y,
  created: y,
  beforeMount: y,
  mounted: y,
  beforeUpdate: y,
  updated: y,
  beforeDestroy: y,
  beforeUnmount: y,
  destroyed: y,
  unmounted: y,
  activated: y,
  deactivated: y,
  errorCaptured: y,
  serverPrefetch: y,
  // assets
  components: B,
  directives: B,
  // watch
  watch: Br,
  // provide / inject
  provide: mt,
  inject: Wr
};
function mt(e, t) {
  return t ? e ? function() {
    return C(N(e) ? e.call(this, this) : e, N(t) ? t.call(this, this) : t);
  } : t : e;
}
function Wr(e, t) {
  return B(Et(e), Et(t));
}
function Et(e) {
  if (d(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function y(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function B(e, t) {
  return e ? C(C(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Br(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = C(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = y(e[o], t[o]);
  return n;
}
const wt = Rr, Lr = (e) => e.__isTeleport, ot = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Gr = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), Jr = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const Ne = [];
let $ = null;
function k(e = !1) {
  Ne.push($ = e ? null : []);
}
function qr() {
  Ne.pop(), $ = Ne[Ne.length - 1] || null;
}
function en(e) {
  return e.dynamicChildren = $ || En, qr(), $ && $.push(e), e;
}
function ae(e, t, n, o, r, s) {
  return en(T(
    e,
    t,
    n,
    o,
    r,
    s,
    !0
    /* isBlock */
  ));
}
function Yr(e, t, n, o, r) {
  return en(De(
    e,
    t,
    n,
    o,
    r,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function Qr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Xr = (...e) => rn(...e), tn = "__vInternal", nn = ({ key: e }) => e ?? null, be = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? x(e) || O(e) || N(e) ? { i: K, r: e, k: t, f: !!n } : e : null;
function T(e, t = null, n = null, o = 0, r = null, s = e === ot ? 0 : 1, i = !1, c = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && nn(t),
    ref: t && be(t),
    scopeId: Vr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: K
  };
  return c ? (st(u, n), s & 128 && e.normalize(u)) : n && (u.shapeFlag |= x(n) ? 8 : 16), process.env.NODE_ENV !== "production" && u.key !== u.key && w("VNode created with invalid key (NaN). VNode type:", u.type), // avoid a block node from tracking itself
  !i && // has current parent block
  $ && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && $.push(u), u;
}
const De = process.env.NODE_ENV !== "production" ? Xr : rn;
function rn(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === Fr) && (process.env.NODE_ENV !== "production" && !e && w(`Invalid vnode type when creating vnode: ${e}.`), e = Jr), Qr(e)) {
    const c = Re(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && st(c, n), !s && $ && (c.shapeFlag & 6 ? $[$.indexOf(e)] = c : $.push(c)), c.patchFlag |= -2, c;
  }
  if (an(e) && (e = e.__vccOpts), t) {
    t = Zr(t);
    let { class: c, style: u } = t;
    c && !x(c) && (t.class = se(c)), b(u) && (ze(u) && !d(u) && (u = C({}, u)), t.style = Be(u));
  }
  const i = x(e) ? 1 : Dr(e) ? 128 : Lr(e) ? 64 : b(e) ? 4 : N(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && ze(e) && (e = f(e), w("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), T(e, t, n, o, r, i, s, !0);
}
function Zr(e) {
  return e ? ze(e) || tn in e ? C({}, e) : e : null;
}
function Re(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e, c = t ? sn(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && nn(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? d(r) ? r.concat(be(t)) : [r, be(t)] : be(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && d(i) ? i.map(on) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ot ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Re(e.ssContent),
    ssFallback: e.ssFallback && Re(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function on(e) {
  const t = Re(e);
  return d(e.children) && (t.children = e.children.map(on)), t;
}
function kr(e = " ", t = 0) {
  return De(Gr, null, e, t);
}
function st(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (d(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), st(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(tn in t) ? t._ctx = K : r === 3 && K && (K.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    N(t) ? (t = { default: t, _ctx: K }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [kr(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function sn(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = se([t.class, o.class]));
      else if (r === "style")
        t.style = Be([t.style, o.style]);
      else if (Nn(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(d(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
let I = null;
const We = (e) => {
  I = e, e.scope.on();
}, cn = () => {
  I && I.scope.off(), I = null;
};
function eo(e) {
  return e.vnode.shapeFlag & 4;
}
let to = !1;
function no(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(cr(rr(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in oe)
          return oe[n](e);
      },
      has(t, n) {
        return n in t || n in oe;
      }
    }));
}
const ro = /(?:^|[-_])(\w)/g, oo = (e) => e.replace(ro, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function ln(e, t = !0) {
  return N(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function un(e, t, n = !1) {
  let o = ln(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    o = r(e.components || e.parent.type.components) || r(e.appContext.components);
  }
  return o ? oo(o) : n ? "App" : "Anonymous";
}
function an(e) {
  return N(e) && "__vccOpts" in e;
}
const Nt = (e, t) => fr(e, t, to);
Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : "");
function Me(e) {
  return !!(e && e.__v_isShallow);
}
function so() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, r = {
    header(l) {
      return b(l) ? l.__isVue ? ["div", e, "VueInstance"] : O(l) ? [
        "div",
        {},
        ["span", e, h(l)],
        "<",
        c(l.value),
        ">"
      ] : J(l) ? [
        "div",
        {},
        ["span", e, Me(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${W(l) ? " (readonly)" : ""}`
      ] : W(l) ? [
        "div",
        {},
        ["span", e, Me(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...s(l.$)
        ];
    }
  };
  function s(l) {
    const p = [];
    l.type.props && l.props && p.push(i("props", f(l.props))), l.setupState !== M && p.push(i("setup", l.setupState)), l.data !== M && p.push(i("data", f(l.data)));
    const m = u(l, "computed");
    m && p.push(i("computed", m));
    const E = u(l, "inject");
    return E && p.push(i("injected", E)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), p;
  }
  function i(l, p) {
    return p = C({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((m) => [
          "div",
          {},
          ["span", o, m + ": "],
          c(p[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, p = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", o, l] : b(l) ? ["object", { object: p ? f(l) : l }] : ["span", n, String(l)];
  }
  function u(l, p) {
    const m = l.type;
    if (N(m))
      return;
    const E = {};
    for (const S in l.ctx)
      a(m, S, p) && (E[S] = l.ctx[S]);
    return E;
  }
  function a(l, p, m) {
    const E = l[m];
    if (d(E) && E.includes(p) || b(E) && p in E || l.extends && a(l.extends, p, m) || l.mixins && l.mixins.some((S) => a(S, p, m)))
      return !0;
  }
  function h(l) {
    return Me(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function te(e, t, n, o) {
  e.addEventListener(t, n, o);
}
const bt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return d(t) ? (n) => Sn(t, n) : t;
};
function io(e) {
  e.target.composing = !0;
}
function Ot(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const co = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, r) {
    e._assign = bt(r);
    const s = o || r.props && r.props.type === "number";
    te(e, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let c = e.value;
      n && (c = c.trim()), s && (c = it(c)), e._assign(c);
    }), n && te(e, "change", () => {
      e.value = e.value.trim();
    }), t || (te(e, "compositionstart", io), te(e, "compositionend", Ot), te(e, "change", Ot));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: o, number: r } }, s) {
    if (e._assign = bt(s), e.composing || document.activeElement === e && e.type !== "range" && (n || o && e.value.trim() === t || (r || e.type === "number") && it(e.value) === t))
      return;
    const i = t ?? "";
    e.value !== i && (e.value = i);
  }
}, lo = ["ctrl", "shift", "alt", "meta"], uo = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => lo.some((n) => e[`${n}Key`] && !t.includes(n))
}, ao = (e, t) => (n, ...o) => {
  for (let r = 0; r < t.length; r++) {
    const s = uo[t[r]];
    if (s && s(n, t))
      return;
  }
  return e(n, ...o);
};
function fo() {
  so();
}
process.env.NODE_ENV !== "production" && fo();
const po = ["onSubmit"], ho = { class: "mx-auto mb-2 flex items-center gap-1 rounded-md border border-white bg-white p-2 shadow-md focus-within:border-slate-400" }, _o = { class: "flex-grow" }, go = /* @__PURE__ */ T("button", {
  type: "submit",
  class: "rounded bg-purple-500 py-2 px-3 font-bold text-white transition-colors duration-300 hover:bg-purple-700"
}, " Add ", -1), mo = /* @__PURE__ */ Ie({
  __name: "NewItem",
  emits: ["create"],
  setup(e, { emit: t }) {
    const n = Lt(""), o = () => {
      t("create", n.value), n.value = "";
    };
    return (r, s) => (k(), ae("form", {
      onSubmit: ao(o, ["prevent"])
    }, [
      T("div", ho, [
        T("div", _o, [
          Ar(T("input", {
            "onUpdate:modelValue": s[0] || (s[0] = (i) => n.value = i),
            class: "w-full pl-3 focus:outline-none",
            type: "text",
            placeholder: "What task do you need to complete?"
          }, null, 512), [
            [co, n.value]
          ])
        ]),
        go
      ])
    ], 40, po));
  }
}), Eo = { class: "m-1 ml-3 flex-shrink-0 align-middle" }, wo = ["checked"], No = { class: "ml-6" }, bo = /* @__PURE__ */ Ie({
  __name: "TodoItem",
  props: {
    id: null,
    text: null,
    completed: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, o = () => {
      t("toggle", n.id);
    };
    return (r, s) => (k(), ae("label", {
      class: se(["flex cursor-pointer items-center rounded-md border border-white p-2 shadow-sm transition-colors duration-500 focus-within:border-slate-400 hover:border-slate-400", e.completed ? "bg-gray-100" : "bg-white"])
    }, [
      T("div", Eo, [
        T("input", {
          type: "checkbox",
          checked: e.completed,
          onChange: o,
          class: "outline-1 outline-purple-400"
        }, null, 40, wo)
      ]),
      T("div", No, [
        T("h4", {
          class: se(["text-md leading-tight", e.completed ? "text-gray-500" : "text-gray-900"])
        }, Ae(e.text), 3)
      ])
    ], 2));
  }
}), Oo = { class: "space-y-2" }, yo = /* @__PURE__ */ Ie({
  __name: "TodoList",
  props: {
    items: null
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = (o) => {
      t("toggle", o);
    };
    return (o, r) => (k(), ae("div", Oo, [
      (k(!0), ae(ot, null, jr(e.items, (s) => (k(), Yr(bo, sn({
        key: s.id
      }, s, { onToggle: n }), null, 16))), 128))
    ]));
  }
}), vo = { "data-todo-app-plugin": "" }, So = { class: "mt-2 text-center" }, xo = /* @__PURE__ */ Ie({
  __name: "TodoApp",
  props: {
    todos: { default: () => [] }
  },
  setup(e) {
    const n = ur(e, "todos"), o = Lt(0), r = Nt(
      () => n.value.filter((u) => u.completed).length
    ), s = Nt(() => n.value.length), i = (u) => {
      const a = n.value.find((h) => h.id === u);
      a && (a.completed = !a.completed);
    }, c = (u) => {
      u && (o.value += 1, n.value.push({
        id: n.value.length + 1,
        text: u,
        completed: !1
      }));
    };
    return Mr(() => {
      o.value = n.value.length;
    }), (u, a) => (k(), ae("div", vo, [
      T("p", So, Ae(we(r)) + " of " + Ae(we(s)) + " completed.", 1),
      De(mo, { onCreate: c }),
      De(yo, {
        items: we(n),
        onToggle: i
      }, null, 8, ["items"])
    ]));
  }
}), Do = {
  install(e) {
    e.component("TodoApp", xo);
  }
};
export {
  xo as TodoApp,
  Do as TodoAppPlugin
};
