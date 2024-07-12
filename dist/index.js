(() => {
  // bin/live-reload.js
  new EventSource(`http://localhost:3000/esbuild`).addEventListener(
    "change",
    () => location.reload()
  );

  // node_modules/lenis/dist/lenis.mjs
  function clamp(t2, i, e) {
    return Math.max(t2, Math.min(i, e));
  }
  var Animate = class {
    constructor() {
      this.isRunning = false, this.value = 0, this.from = 0, this.to = 0, this.duration = 0, this.currentTime = 0;
    }
    advance(t2) {
      var i;
      if (!this.isRunning) return;
      let e = false;
      if (this.duration && this.easing) {
        this.currentTime += t2;
        const i2 = clamp(0, this.currentTime / this.duration, 1);
        e = i2 >= 1;
        const s = e ? 1 : this.easing(i2);
        this.value = this.from + (this.to - this.from) * s;
      } else this.lerp ? (this.value = function damp(t3, i2, e2, s) {
        return function lerp(t4, i3, e3) {
          return (1 - e3) * t4 + e3 * i3;
        }(t3, i2, 1 - Math.exp(-e2 * s));
      }(this.value, this.to, 60 * this.lerp, t2), Math.round(this.value) === this.to && (this.value = this.to, e = true)) : (this.value = this.to, e = true);
      e && this.stop(), null === (i = this.onUpdate) || void 0 === i || i.call(this, this.value, e);
    }
    stop() {
      this.isRunning = false;
    }
    fromTo(t2, i, { lerp: e, duration: s, easing: o, onStart: n, onUpdate: l }) {
      this.from = this.value = t2, this.to = i, this.lerp = e, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = true, null == n || n(), this.onUpdate = l;
    }
  };
  var Dimensions = class {
    constructor({ wrapper: t2, content: i, autoResize: e = true, debounce: s = 250 } = {}) {
      this.width = 0, this.height = 0, this.scrollWidth = 0, this.scrollHeight = 0, this.resize = () => {
        this.onWrapperResize(), this.onContentResize();
      }, this.onWrapperResize = () => {
        this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : this.wrapper instanceof HTMLElement && (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
      }, this.onContentResize = () => {
        this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : this.wrapper instanceof HTMLElement && (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
      }, this.wrapper = t2, this.content = i, e && (this.debouncedResize = /* @__PURE__ */ function debounce(t3, i2) {
        let e2;
        return function() {
          let s2 = arguments, o = this;
          clearTimeout(e2), e2 = setTimeout(function() {
            t3.apply(o, s2);
          }, i2);
        };
      }(this.resize, s), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
    }
    destroy() {
      var t2, i;
      null === (t2 = this.wrapperResizeObserver) || void 0 === t2 || t2.disconnect(), null === (i = this.contentResizeObserver) || void 0 === i || i.disconnect(), window.removeEventListener("resize", this.debouncedResize, false);
    }
    get limit() {
      return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
    }
  };
  var Emitter = class {
    constructor() {
      this.events = {};
    }
    emit(t2, ...i) {
      let e = this.events[t2] || [];
      for (let t3 = 0, s = e.length; t3 < s; t3++) e[t3](...i);
    }
    on(t2, i) {
      var e;
      return (null === (e = this.events[t2]) || void 0 === e ? void 0 : e.push(i)) || (this.events[t2] = [i]), () => {
        var e2;
        this.events[t2] = null === (e2 = this.events[t2]) || void 0 === e2 ? void 0 : e2.filter((t3) => i !== t3);
      };
    }
    off(t2, i) {
      var e;
      this.events[t2] = null === (e = this.events[t2]) || void 0 === e ? void 0 : e.filter((t3) => i !== t3);
    }
    destroy() {
      this.events = {};
    }
  };
  var t = 100 / 6;
  var VirtualScroll = class {
    constructor(i, { wheelMultiplier: e = 1, touchMultiplier: s = 1 }) {
      this.lastDelta = { x: 0, y: 0 }, this.windowWidth = 0, this.windowHeight = 0, this.onTouchStart = (t2) => {
        const { clientX: i2, clientY: e2 } = t2.targetTouches ? t2.targetTouches[0] : t2;
        this.touchStart.x = i2, this.touchStart.y = e2, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
      }, this.onTouchMove = (t2) => {
        var i2, e2, s2, o;
        const { clientX: n, clientY: l } = t2.targetTouches ? t2.targetTouches[0] : t2, r = -(n - (null !== (e2 = null === (i2 = this.touchStart) || void 0 === i2 ? void 0 : i2.x) && void 0 !== e2 ? e2 : 0)) * this.touchMultiplier, h = -(l - (null !== (o = null === (s2 = this.touchStart) || void 0 === s2 ? void 0 : s2.y) && void 0 !== o ? o : 0)) * this.touchMultiplier;
        this.touchStart.x = n, this.touchStart.y = l, this.lastDelta = { x: r, y: h }, this.emitter.emit("scroll", { deltaX: r, deltaY: h, event: t2 });
      }, this.onTouchEnd = (t2) => {
        this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
      }, this.onWheel = (i2) => {
        let { deltaX: e2, deltaY: s2, deltaMode: o } = i2;
        e2 *= 1 === o ? t : 2 === o ? this.windowWidth : 1, s2 *= 1 === o ? t : 2 === o ? this.windowHeight : 1, e2 *= this.wheelMultiplier, s2 *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: e2, deltaY: s2, event: i2 });
      }, this.onWindowResize = () => {
        this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
      }, this.element = i, this.wheelMultiplier = e, this.touchMultiplier = s, this.touchStart = { x: null, y: null }, this.emitter = new Emitter(), window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
    }
    on(t2, i) {
      return this.emitter.on(t2, i);
    }
    destroy() {
      this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel), this.element.removeEventListener("touchstart", this.onTouchStart), this.element.removeEventListener("touchmove", this.onTouchMove), this.element.removeEventListener("touchend", this.onTouchEnd);
    }
  };
  var Lenis = class {
    constructor({ wrapper: t2 = window, content: i = document.documentElement, wheelEventsTarget: e = t2, eventsTarget: s = e, smoothWheel: o = true, syncTouch: n = false, syncTouchLerp: l = 0.075, touchInertiaMultiplier: r = 35, duration: h, easing: a = (t3) => Math.min(1, 1.001 - Math.pow(2, -10 * t3)), lerp: c = 0.1, infinite: d = false, orientation: u = "vertical", gestureOrientation: p = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = true, prevent: w, virtualScroll: S, __experimental__naiveDimensions: f = false } = {}) {
      this.__isScrolling = false, this.__isStopped = false, this.__isLocked = false, this.userData = {}, this.lastVelocity = 0, this.velocity = 0, this.direction = 0, this.onPointerDown = (t3) => {
        1 === t3.button && this.reset();
      }, this.onVirtualScroll = (t3) => {
        if ("function" == typeof this.options.virtualScroll && false === this.options.virtualScroll(t3)) return;
        const { deltaX: i2, deltaY: e2, event: s2 } = t3;
        if (this.emitter.emit("virtual-scroll", { deltaX: i2, deltaY: e2, event: s2 }), s2.ctrlKey) return;
        const o2 = s2.type.includes("touch"), n2 = s2.type.includes("wheel");
        this.isTouching = "touchstart" === s2.type || "touchmove" === s2.type;
        if (this.options.syncTouch && o2 && "touchstart" === s2.type && !this.isStopped && !this.isLocked) return void this.reset();
        const l2 = 0 === i2 && 0 === e2, r2 = "vertical" === this.options.gestureOrientation && 0 === e2 || "horizontal" === this.options.gestureOrientation && 0 === i2;
        if (l2 || r2) return;
        let h2 = s2.composedPath();
        h2 = h2.slice(0, h2.indexOf(this.rootElement));
        const a2 = this.options.prevent;
        if (h2.find((t4) => {
          var i3, e3, s3, l3, r3;
          return t4 instanceof Element && ("function" == typeof a2 && (null == a2 ? void 0 : a2(t4)) || (null === (i3 = t4.hasAttribute) || void 0 === i3 ? void 0 : i3.call(t4, "data-lenis-prevent")) || o2 && (null === (e3 = t4.hasAttribute) || void 0 === e3 ? void 0 : e3.call(t4, "data-lenis-prevent-touch")) || n2 && (null === (s3 = t4.hasAttribute) || void 0 === s3 ? void 0 : s3.call(t4, "data-lenis-prevent-wheel")) || (null === (l3 = t4.classList) || void 0 === l3 ? void 0 : l3.contains("lenis")) && !(null === (r3 = t4.classList) || void 0 === r3 ? void 0 : r3.contains("lenis-stopped")));
        })) return;
        if (this.isStopped || this.isLocked) return void s2.preventDefault();
        if (!(this.options.syncTouch && o2 || this.options.smoothWheel && n2)) return this.isScrolling = "native", void this.animate.stop();
        s2.preventDefault();
        let c2 = e2;
        "both" === this.options.gestureOrientation ? c2 = Math.abs(e2) > Math.abs(i2) ? e2 : i2 : "horizontal" === this.options.gestureOrientation && (c2 = i2);
        const d2 = o2 && this.options.syncTouch, u2 = o2 && "touchend" === s2.type && Math.abs(c2) > 5;
        u2 && (c2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + c2, Object.assign({ programmatic: false }, d2 ? { lerp: u2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }));
      }, this.onNativeScroll = () => {
        if (clearTimeout(this.__resetVelocityTimeout), delete this.__resetVelocityTimeout, this.__preventNextNativeScrollEvent) delete this.__preventNextNativeScrollEvent;
        else if (false === this.isScrolling || "native" === this.isScrolling) {
          const t3 = this.animatedScroll;
          this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - t3, this.direction = Math.sign(this.animatedScroll - t3), this.isScrolling = "native", this.emit(), 0 !== this.velocity && (this.__resetVelocityTimeout = setTimeout(() => {
            this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = false, this.emit();
          }, 400));
        }
      }, window.lenisVersion = "1.1.6", t2 && t2 !== document.documentElement && t2 !== document.body || (t2 = window), this.options = { wrapper: t2, content: i, wheelEventsTarget: e, eventsTarget: s, smoothWheel: o, syncTouch: n, syncTouchLerp: l, touchInertiaMultiplier: r, duration: h, easing: a, lerp: c, infinite: d, gestureOrientation: p, orientation: u, touchMultiplier: m, wheelMultiplier: v, autoResize: g, prevent: w, virtualScroll: S, __experimental__naiveDimensions: f }, this.animate = new Animate(), this.emitter = new Emitter(), this.dimensions = new Dimensions({ wrapper: t2, content: i, autoResize: g }), this.updateClassName(), this.userData = {}, this.time = 0, this.velocity = this.lastVelocity = 0, this.isLocked = false, this.isStopped = false, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll = new VirtualScroll(s, { touchMultiplier: m, wheelMultiplier: v }), this.virtualScroll.on("scroll", this.onVirtualScroll);
    }
    destroy() {
      this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName();
    }
    on(t2, i) {
      return this.emitter.on(t2, i);
    }
    off(t2, i) {
      return this.emitter.off(t2, i);
    }
    setScroll(t2) {
      this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
    }
    resize() {
      this.dimensions.resize();
    }
    emit() {
      this.emitter.emit("scroll", this);
    }
    reset() {
      this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
    }
    start() {
      this.isStopped && (this.isStopped = false, this.reset());
    }
    stop() {
      this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
    }
    raf(t2) {
      const i = t2 - (this.time || t2);
      this.time = t2, this.animate.advance(1e-3 * i);
    }
    scrollTo(t2, { offset: i = 0, immediate: e = false, lock: s = false, duration: o = this.options.duration, easing: n = this.options.easing, lerp: l = this.options.lerp, onStart: r, onComplete: h, force: a = false, programmatic: c = true, userData: d = {} } = {}) {
      if (!this.isStopped && !this.isLocked || a) {
        if ("string" == typeof t2 && ["top", "left", "start"].includes(t2)) t2 = 0;
        else if ("string" == typeof t2 && ["bottom", "right", "end"].includes(t2)) t2 = this.limit;
        else {
          let e2;
          if ("string" == typeof t2 ? e2 = document.querySelector(t2) : t2 instanceof HTMLElement && (null == t2 ? void 0 : t2.nodeType) && (e2 = t2), e2) {
            if (this.options.wrapper !== window) {
              const t3 = this.rootElement.getBoundingClientRect();
              i -= this.isHorizontal ? t3.left : t3.top;
            }
            const s2 = e2.getBoundingClientRect();
            t2 = (this.isHorizontal ? s2.left : s2.top) + this.animatedScroll;
          }
        }
        if ("number" == typeof t2 && (t2 += i, t2 = Math.round(t2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = clamp(0, t2, this.limit), t2 !== this.targetScroll)) {
          if (this.userData = d, e) return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), null == h || h(this), void (this.userData = {});
          c || (this.targetScroll = t2), this.animate.fromTo(this.animatedScroll, t2, { duration: o, easing: n, lerp: l, onStart: () => {
            s && (this.isLocked = true), this.isScrolling = "smooth", null == r || r(this);
          }, onUpdate: (t3, i2) => {
            this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c && (this.targetScroll = t3), i2 || this.emit(), i2 && (this.reset(), this.emit(), null == h || h(this), this.userData = {}, this.preventNextNativeScrollEvent());
          } });
        }
      }
    }
    preventNextNativeScrollEvent() {
      this.__preventNextNativeScrollEvent = true, requestAnimationFrame(() => {
        delete this.__preventNextNativeScrollEvent;
      });
    }
    get rootElement() {
      return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
    }
    get limit() {
      return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
    }
    get isHorizontal() {
      return "horizontal" === this.options.orientation;
    }
    get actualScroll() {
      return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
    }
    get scroll() {
      return this.options.infinite ? function modulo(t2, i) {
        return (t2 % i + i) % i;
      }(this.animatedScroll, this.limit) : this.animatedScroll;
    }
    get progress() {
      return 0 === this.limit ? 1 : this.scroll / this.limit;
    }
    get isScrolling() {
      return this.__isScrolling;
    }
    set isScrolling(t2) {
      this.__isScrolling !== t2 && (this.__isScrolling = t2, this.updateClassName());
    }
    get isStopped() {
      return this.__isStopped;
    }
    set isStopped(t2) {
      this.__isStopped !== t2 && (this.__isStopped = t2, this.updateClassName());
    }
    get isLocked() {
      return this.__isLocked;
    }
    set isLocked(t2) {
      this.__isLocked !== t2 && (this.__isLocked = t2, this.updateClassName());
    }
    get isSmooth() {
      return "smooth" === this.isScrolling;
    }
    get className() {
      let t2 = "lenis";
      return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), "smooth" === this.isScrolling && (t2 += " lenis-smooth"), t2;
    }
    updateClassName() {
      this.cleanUpClassName(), this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim();
    }
    cleanUpClassName() {
      this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim();
    }
  };

  // node_modules/split-type/dist/index.js
  (function() {
    function append() {
      var length = arguments.length;
      for (var i = 0; i < length; i++) {
        var node = i < 0 || arguments.length <= i ? void 0 : arguments[i];
        if (node.nodeType === 1 || node.nodeType === 11) this.appendChild(node);
        else this.appendChild(document.createTextNode(String(node)));
      }
    }
    function replaceChildren() {
      while (this.lastChild) {
        this.removeChild(this.lastChild);
      }
      if (arguments.length) this.append.apply(this, arguments);
    }
    function replaceWith() {
      var parent = this.parentNode;
      for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }
      var i = nodes.length;
      if (!parent) return;
      if (!i) parent.removeChild(this);
      while (i--) {
        var node = nodes[i];
        if (typeof node !== "object") {
          node = this.ownerDocument.createTextNode(node);
        } else if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
        if (!i) {
          parent.replaceChild(node, this);
        } else {
          parent.insertBefore(this.previousSibling, node);
        }
      }
    }
    if (typeof Element !== "undefined") {
      if (!Element.prototype.append) {
        Element.prototype.append = append;
        DocumentFragment.prototype.append = append;
      }
      if (!Element.prototype.replaceChildren) {
        Element.prototype.replaceChildren = replaceChildren;
        DocumentFragment.prototype.replaceChildren = replaceChildren;
      }
      if (!Element.prototype.replaceWith) {
        Element.prototype.replaceWith = replaceWith;
        DocumentFragment.prototype.replaceWith = replaceWith;
      }
    }
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function extend(target, object) {
    return Object.getOwnPropertyNames(Object(target)).reduce(function(extended, key) {
      var currentValue = Object.getOwnPropertyDescriptor(Object(target), key);
      var newValue = Object.getOwnPropertyDescriptor(Object(object), key);
      return Object.defineProperty(extended, key, newValue || currentValue);
    }, {});
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function parseSettings() {
    var settings = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var object = extend(settings);
    var types;
    if (object.types !== void 0) {
      types = object.types;
    } else if (object.split !== void 0) {
      types = object.split;
    }
    if (types !== void 0) {
      object.types = (isString(types) || isArray(types) ? String(types) : "").split(",").map(function(type) {
        return String(type).trim();
      }).filter(function(type) {
        return /((line)|(word)|(char))/i.test(type);
      });
    }
    if (object.absolute || object.position) {
      object.absolute = object.absolute || /absolute/.test(settings.position);
    }
    return object;
  }
  function parseTypes(value) {
    var types = isString(value) || isArray(value) ? String(value) : "";
    return {
      none: !types,
      lines: /line/i.test(types),
      words: /word/i.test(types),
      chars: /char/i.test(types)
    };
  }
  function isObject(value) {
    return value !== null && typeof value === "object";
  }
  function isNode(input) {
    return isObject(input) && /^(1|3|11)$/.test(input.nodeType);
  }
  function isLength(value) {
    return typeof value === "number" && value > -1 && value % 1 === 0;
  }
  function isArrayLike(value) {
    return isObject(value) && isLength(value.length);
  }
  function toArray(value) {
    if (isArray(value)) return value;
    if (value == null) return [];
    return isArrayLike(value) ? Array.prototype.slice.call(value) : [value];
  }
  function getTargetElements(target) {
    var elements = target;
    if (isString(target)) {
      if (/^(#[a-z]\w+)$/.test(target.trim())) {
        elements = document.getElementById(target.trim().slice(1));
      } else {
        elements = document.querySelectorAll(target);
      }
    }
    return toArray(elements).reduce(function(result, element) {
      return [].concat(_toConsumableArray(result), _toConsumableArray(toArray(element).filter(isNode)));
    }, []);
  }
  var entries = Object.entries;
  var expando = "_splittype";
  var cache = {};
  var uid = 0;
  function set(owner, key, value) {
    if (!isObject(owner)) {
      console.warn("[data.set] owner is not an object");
      return null;
    }
    var id = owner[expando] || (owner[expando] = ++uid);
    var data = cache[id] || (cache[id] = {});
    if (value === void 0) {
      if (!!key && Object.getPrototypeOf(key) === Object.prototype) {
        cache[id] = _objectSpread2(_objectSpread2({}, data), key);
      }
    } else if (key !== void 0) {
      data[key] = value;
    }
    return value;
  }
  function get(owner, key) {
    var id = isObject(owner) ? owner[expando] : null;
    var data = id && cache[id] || {};
    if (key === void 0) {
      return data;
    }
    return data[key];
  }
  function remove(element) {
    var id = element && element[expando];
    if (id) {
      delete element[id];
      delete cache[id];
    }
  }
  function clear() {
    Object.keys(cache).forEach(function(key) {
      delete cache[key];
    });
  }
  function cleanup() {
    entries(cache).forEach(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), id = _ref2[0], _ref2$ = _ref2[1], isRoot = _ref2$.isRoot, isSplit = _ref2$.isSplit;
      if (!isRoot || !isSplit) {
        cache[id] = null;
        delete cache[id];
      }
    });
  }
  function toWords(value) {
    var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : " ";
    var string = value ? String(value) : "";
    return string.trim().replace(/\s+/g, " ").split(separator);
  }
  var rsAstralRange = "\\ud800-\\udfff";
  var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
  var rsComboSymbolsRange = "\\u20d0-\\u20f0";
  var rsVarRange = "\\ufe0e\\ufe0f";
  var rsAstral = "[".concat(rsAstralRange, "]");
  var rsCombo = "[".concat(rsComboMarksRange).concat(rsComboSymbolsRange, "]");
  var rsFitz = "\\ud83c[\\udffb-\\udfff]";
  var rsModifier = "(?:".concat(rsCombo, "|").concat(rsFitz, ")");
  var rsNonAstral = "[^".concat(rsAstralRange, "]");
  var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
  var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
  var rsZWJ = "\\u200d";
  var reOptMod = "".concat(rsModifier, "?");
  var rsOptVar = "[".concat(rsVarRange, "]?");
  var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
  var rsSeq = rsOptVar + reOptMod + rsOptJoin;
  var rsSymbol = "(?:".concat(["".concat(rsNonAstral).concat(rsCombo, "?"), rsCombo, rsRegional, rsSurrPair, rsAstral].join("|"), "\n)");
  var reUnicode = RegExp("".concat(rsFitz, "(?=").concat(rsFitz, ")|").concat(rsSymbol).concat(rsSeq), "g");
  var unicodeRange = [rsZWJ, rsAstralRange, rsComboMarksRange, rsComboSymbolsRange, rsVarRange];
  var reHasUnicode = RegExp("[".concat(unicodeRange.join(""), "]"));
  function asciiToArray(string) {
    return string.split("");
  }
  function hasUnicode(string) {
    return reHasUnicode.test(string);
  }
  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }
  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }
  function toString(value) {
    return value == null ? "" : String(value);
  }
  function toChars(string) {
    var separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    string = toString(string);
    if (string && isString(string)) {
      if (!separator && hasUnicode(string)) {
        return stringToArray(string);
      }
    }
    return string.split(separator);
  }
  function createElement(name, attributes) {
    var element = document.createElement(name);
    if (!attributes) {
      return element;
    }
    Object.keys(attributes).forEach(function(attribute) {
      var rawValue = attributes[attribute];
      var value = isString(rawValue) ? rawValue.trim() : rawValue;
      if (value === null || value === "") return;
      if (attribute === "children") {
        element.append.apply(element, _toConsumableArray(toArray(value)));
      } else {
        element.setAttribute(attribute, value);
      }
    });
    return element;
  }
  var defaults = {
    splitClass: "",
    lineClass: "line",
    wordClass: "word",
    charClass: "char",
    types: ["lines", "words", "chars"],
    absolute: false,
    tagName: "div"
  };
  function splitWordsAndChars(textNode, settings) {
    settings = extend(defaults, settings);
    var types = parseTypes(settings.types);
    var TAG_NAME = settings.tagName;
    var VALUE = textNode.nodeValue;
    var splitText = document.createDocumentFragment();
    var words = [];
    var chars = [];
    if (/^\s/.test(VALUE)) {
      splitText.append(" ");
    }
    words = toWords(VALUE).reduce(function(result, WORD, idx, arr) {
      var wordElement;
      var characterElementsForCurrentWord;
      if (types.chars) {
        characterElementsForCurrentWord = toChars(WORD).map(function(CHAR) {
          var characterElement = createElement(TAG_NAME, {
            "class": "".concat(settings.splitClass, " ").concat(settings.charClass),
            style: "display: inline-block;",
            children: CHAR
          });
          set(characterElement, "isChar", true);
          chars = [].concat(_toConsumableArray(chars), [characterElement]);
          return characterElement;
        });
      }
      if (types.words || types.lines) {
        wordElement = createElement(TAG_NAME, {
          "class": "".concat(settings.wordClass, " ").concat(settings.splitClass),
          style: "display: inline-block; ".concat(types.words && settings.absolute ? "position: relative;" : ""),
          children: types.chars ? characterElementsForCurrentWord : WORD
        });
        set(wordElement, {
          isWord: true,
          isWordStart: true,
          isWordEnd: true
        });
        splitText.appendChild(wordElement);
      } else {
        characterElementsForCurrentWord.forEach(function(characterElement) {
          splitText.appendChild(characterElement);
        });
      }
      if (idx < arr.length - 1) {
        splitText.append(" ");
      }
      return types.words ? result.concat(wordElement) : result;
    }, []);
    if (/\s$/.test(VALUE)) {
      splitText.append(" ");
    }
    textNode.replaceWith(splitText);
    return {
      words,
      chars
    };
  }
  function split(node, settings) {
    var type = node.nodeType;
    var wordsAndChars = {
      words: [],
      chars: []
    };
    if (!/(1|3|11)/.test(type)) {
      return wordsAndChars;
    }
    if (type === 3 && /\S/.test(node.nodeValue)) {
      return splitWordsAndChars(node, settings);
    }
    var childNodes = toArray(node.childNodes);
    if (childNodes.length) {
      set(node, "isSplit", true);
      if (!get(node).isRoot) {
        node.style.display = "inline-block";
        node.style.position = "relative";
        var nextSibling = node.nextSibling;
        var prevSibling = node.previousSibling;
        var text = node.textContent || "";
        var textAfter = nextSibling ? nextSibling.textContent : " ";
        var textBefore = prevSibling ? prevSibling.textContent : " ";
        set(node, {
          isWordEnd: /\s$/.test(text) || /^\s/.test(textAfter),
          isWordStart: /^\s/.test(text) || /\s$/.test(textBefore)
        });
      }
    }
    return childNodes.reduce(function(result, child) {
      var _split = split(child, settings), words = _split.words, chars = _split.chars;
      return {
        words: [].concat(_toConsumableArray(result.words), _toConsumableArray(words)),
        chars: [].concat(_toConsumableArray(result.chars), _toConsumableArray(chars))
      };
    }, wordsAndChars);
  }
  function getPosition(node, isWord, settings, scrollPos) {
    if (!settings.absolute) {
      return {
        top: isWord ? node.offsetTop : null
      };
    }
    var parent = node.offsetParent;
    var _scrollPos = _slicedToArray(scrollPos, 2), scrollX = _scrollPos[0], scrollY = _scrollPos[1];
    var parentX = 0;
    var parentY = 0;
    if (parent && parent !== document.body) {
      var parentRect = parent.getBoundingClientRect();
      parentX = parentRect.x + scrollX;
      parentY = parentRect.y + scrollY;
    }
    var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height, x = _node$getBoundingClie.x, y = _node$getBoundingClie.y;
    var top = y + scrollY - parentY;
    var left = x + scrollX - parentX;
    return {
      width,
      height,
      top,
      left
    };
  }
  function unSplitWords(element) {
    if (!get(element).isWord) {
      toArray(element.children).forEach(function(child) {
        return unSplitWords(child);
      });
    } else {
      remove(element);
      element.replaceWith.apply(element, _toConsumableArray(element.childNodes));
    }
  }
  var createFragment = function createFragment2() {
    return document.createDocumentFragment();
  };
  function repositionAfterSplit(element, settings, scrollPos) {
    var types = parseTypes(settings.types);
    var TAG_NAME = settings.tagName;
    var nodes = element.getElementsByTagName("*");
    var wordsInEachLine = [];
    var wordsInCurrentLine = [];
    var lineOffsetY = null;
    var elementHeight;
    var elementWidth;
    var contentBox;
    var lines = [];
    var parent = element.parentElement;
    var nextSibling = element.nextElementSibling;
    var splitText = createFragment();
    var cs = window.getComputedStyle(element);
    var align = cs.textAlign;
    var fontSize = parseFloat(cs.fontSize);
    var lineThreshold = fontSize * 0.2;
    if (settings.absolute) {
      contentBox = {
        left: element.offsetLeft,
        top: element.offsetTop,
        width: element.offsetWidth
      };
      elementWidth = element.offsetWidth;
      elementHeight = element.offsetHeight;
      set(element, {
        cssWidth: element.style.width,
        cssHeight: element.style.height
      });
    }
    toArray(nodes).forEach(function(node) {
      var isWordLike = node.parentElement === element;
      var _getPosition = getPosition(node, isWordLike, settings, scrollPos), width = _getPosition.width, height = _getPosition.height, top = _getPosition.top, left = _getPosition.left;
      if (/^br$/i.test(node.nodeName)) return;
      if (types.lines && isWordLike) {
        if (lineOffsetY === null || top - lineOffsetY >= lineThreshold) {
          lineOffsetY = top;
          wordsInEachLine.push(wordsInCurrentLine = []);
        }
        wordsInCurrentLine.push(node);
      }
      if (settings.absolute) {
        set(node, {
          top,
          left,
          width,
          height
        });
      }
    });
    if (parent) {
      parent.removeChild(element);
    }
    if (types.lines) {
      lines = wordsInEachLine.map(function(wordsInThisLine) {
        var lineElement = createElement(TAG_NAME, {
          "class": "".concat(settings.splitClass, " ").concat(settings.lineClass),
          style: "display: block; text-align: ".concat(align, "; width: 100%;")
        });
        set(lineElement, "isLine", true);
        var lineDimensions = {
          height: 0,
          top: 1e4
        };
        splitText.appendChild(lineElement);
        wordsInThisLine.forEach(function(wordOrElement, idx, arr) {
          var _data$get = get(wordOrElement), isWordEnd = _data$get.isWordEnd, top = _data$get.top, height = _data$get.height;
          var next = arr[idx + 1];
          lineDimensions.height = Math.max(lineDimensions.height, height);
          lineDimensions.top = Math.min(lineDimensions.top, top);
          lineElement.appendChild(wordOrElement);
          if (isWordEnd && get(next).isWordStart) {
            lineElement.append(" ");
          }
        });
        if (settings.absolute) {
          set(lineElement, {
            height: lineDimensions.height,
            top: lineDimensions.top
          });
        }
        return lineElement;
      });
      if (!types.words) {
        unSplitWords(splitText);
      }
      element.replaceChildren(splitText);
    }
    if (settings.absolute) {
      element.style.width = "".concat(element.style.width || elementWidth, "px");
      element.style.height = "".concat(elementHeight, "px");
      toArray(nodes).forEach(function(node) {
        var _data$get2 = get(node), isLine = _data$get2.isLine, top = _data$get2.top, left = _data$get2.left, width = _data$get2.width, height = _data$get2.height;
        var parentData = get(node.parentElement);
        var isChildOfLineNode = !isLine && parentData.isLine;
        node.style.top = "".concat(isChildOfLineNode ? top - parentData.top : top, "px");
        node.style.left = isLine ? "".concat(contentBox.left, "px") : "".concat(left - (isChildOfLineNode ? contentBox.left : 0), "px");
        node.style.height = "".concat(height, "px");
        node.style.width = isLine ? "".concat(contentBox.width, "px") : "".concat(width, "px");
        node.style.position = "absolute";
      });
    }
    if (parent) {
      if (nextSibling) parent.insertBefore(element, nextSibling);
      else parent.appendChild(element);
    }
    return lines;
  }
  var _defaults = extend(defaults, {});
  var SplitType = /* @__PURE__ */ function() {
    _createClass(SplitType2, null, [{
      key: "clearData",
      /**
       * CLears all data
       */
      value: function clearData() {
        clear();
      }
      /**
       * The default settings for all splitType instances
       * @static
       */
    }, {
      key: "setDefaults",
      /**
       * Sets the default settings for all SplitType instances.
       * The provided object will be merged with the existing defaults objects.
       *
       * @param {Object} settings an object containing the settings to override
       * @returns {Object} the new default settings
       * @public
       * @static
       * @example
       * SplitType.setDefaults({ "position": "absolute" })
       */
      value: function setDefaults(options) {
        _defaults = extend(_defaults, parseSettings(options));
        return defaults;
      }
      /**
       * Revert target elements to their original html content
       * Has no effect on that
       *
       * @param {any} elements The target elements to revert. One of:
       *  - {string} A css selector
       *  - {HTMLElement} A single element
       * -  {NodeList} A NodeList or collection
       *  - {HTMLElement[]} An array of Elements
       * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
       * @static
       */
    }, {
      key: "revert",
      value: function revert(elements) {
        getTargetElements(elements).forEach(function(element) {
          var _data$get = get(element), isSplit = _data$get.isSplit, html = _data$get.html, cssWidth = _data$get.cssWidth, cssHeight = _data$get.cssHeight;
          if (isSplit) {
            element.innerHTML = html;
            element.style.width = cssWidth || "";
            element.style.height = cssHeight || "";
            remove(element);
          }
        });
      }
      /**
       * Creates a new SplitType instance
       * This static method provides a way to create a `SplitType` instance without
       * using the `new` keyword.
       *
       * @param {any} target The target elements to split. One of:
       *  - {string} A css selector
       *  - {HTMLElement} A single element
       * -  {NodeList} A NodeList or collection
       *  - {HTMLElement[]} An array of Elements
       * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
       * @param {Object} [options] Settings for the SplitType instance
       * @return {SplitType} the SplitType instance
       * @static
       */
    }, {
      key: "create",
      value: function create(target, options) {
        return new SplitType2(target, options);
      }
      /**
       * Creates a new `SplitType` instance
       *
       * @param {any} elements The target elements to split. One of:
       *  - {string} A css selector
       *  - {HTMLElement} A single element
       * -  {NodeList} A NodeList or collection
       *  - {HTMLElement[]} An array of Elements
       * -  {Array<HTMLElement|NodeList|HTMLElement[]>} A nested array of elements
       * @param {Object} [options] Settings for the SplitType instance
       */
    }, {
      key: "data",
      /**
       * The internal data store
       */
      get: function get2() {
        return cache;
      }
    }, {
      key: "defaults",
      get: function get2() {
        return _defaults;
      },
      set: function set2(options) {
        _defaults = extend(_defaults, parseSettings(options));
      }
    }]);
    function SplitType2(elements, options) {
      _classCallCheck(this, SplitType2);
      this.isSplit = false;
      this.settings = extend(_defaults, parseSettings(options));
      this.elements = getTargetElements(elements);
      this.split();
    }
    _createClass(SplitType2, [{
      key: "split",
      value: function split$1(options) {
        var _this = this;
        this.revert();
        this.elements.forEach(function(element) {
          set(element, "html", element.innerHTML);
        });
        this.lines = [];
        this.words = [];
        this.chars = [];
        var scrollPos = [window.pageXOffset, window.pageYOffset];
        if (options !== void 0) {
          this.settings = extend(this.settings, parseSettings(options));
        }
        var types = parseTypes(this.settings.types);
        if (types.none) {
          return;
        }
        this.elements.forEach(function(element) {
          set(element, "isRoot", true);
          var _split2 = split(element, _this.settings), words = _split2.words, chars = _split2.chars;
          _this.words = [].concat(_toConsumableArray(_this.words), _toConsumableArray(words));
          _this.chars = [].concat(_toConsumableArray(_this.chars), _toConsumableArray(chars));
        });
        this.elements.forEach(function(element) {
          if (types.lines || _this.settings.absolute) {
            var lines = repositionAfterSplit(element, _this.settings, scrollPos);
            _this.lines = [].concat(_toConsumableArray(_this.lines), _toConsumableArray(lines));
          }
        });
        this.isSplit = true;
        window.scrollTo(scrollPos[0], scrollPos[1]);
        cleanup();
      }
      /**
       * Reverts target element(s) back to their original html content
       * Deletes all stored data associated with the target elements
       * Resets the properties on the splitType instance
       *
       * @public
       */
    }, {
      key: "revert",
      value: function revert() {
        if (this.isSplit) {
          this.lines = null;
          this.words = null;
          this.chars = null;
          this.isSplit = false;
        }
        SplitType2.revert(this.elements);
      }
    }]);
    return SplitType2;
  }();

  // src/utilities.js
  var attr = function(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  };
  var runSplit = function(text, types = "lines, words") {
    if (!text) return;
    typeSplit = new SplitType(text, {
      types
    });
    return typeSplit;
  };
  var scrollReset = function() {
    const RESET_EL = "[data-ix-reset]";
    const RESET_TIME = "data-ix-reset-time";
    const resetScrollTriggers = document.querySelectorAll(RESET_EL);
    resetScrollTriggers.forEach(function(item) {
      item.addEventListener("click", function(e) {
        ScrollTrigger.refresh();
        if (item.hasAttribute(RESET_TIME)) {
          let time = attr(1e3, item.getAttribute(RESET_TIME));
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, time);
        }
      });
    });
  };
  var checkBreakpoints = function(item, animationID, gsapContext) {
    if (!item || !animationID || !gsapContext) {
      console.error(`GSAP checkBreakpoints Error in ${animationID}`);
      return;
    }
    let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
    if (isMobile === void 0 || isTablet === void 0 || isDesktop === void 0) {
      console.error(`GSAP Match Media Conditions Not Defined`);
      return;
    }
    const RUN_DESKTOP = `data-ix-${animationID}-desktop`;
    const RUN_TABLET = `data-ix-${animationID}-tablet`;
    const RUN_MOBILE = `data-ix-${animationID}-mobile`;
    const RUN_ALL = `data-ix-${animationID}-run`;
    runAll = attr(true, item.getAttribute(RUN_ALL));
    runMobile = attr(true, item.getAttribute(RUN_MOBILE));
    runTablet = attr(true, item.getAttribute(RUN_TABLET));
    runDesktop = attr(true, item.getAttribute(RUN_DESKTOP));
    if (runAll === false) return false;
    if (runMobile === false && isMobile) return false;
    if (runTablet === false && isTablet) return false;
    if (runDesktop === false && isDesktop) return false;
    return true;
  };
  var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  };

  // src/interactions/mouseOver.js
  var mouseOver = function(gsapContext) {
    const ANIMATION_ID = "mouseover";
    const WRAP = '[data-ix-mouseover="wrap"]';
    const LAYER = '[data-ix-mouseover="layer"]';
    const TARGET = '[data-ix-mouseover="target"]';
    const DURATION = "data-ix-mouseover-duration";
    const EASE = "data-ix-mouseover-ease";
    const MOVE_X = "data-ix-mouseover-move-x";
    const MOVE_Y = "data-ix-mouseover-move-y";
    const ROTATE_Z = "data-ix-mouseover-rotate-z";
    const mouseOverItems = document.querySelectorAll(WRAP);
    mouseOverItems.forEach((mouseOverItem) => {
      const layers = mouseOverItem.querySelectorAll(LAYER);
      if (layers.length === 0) return;
      let runOnBreakpoint = checkBreakpoints(mouseOverItem, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;
      let target = mouseOverItem.querySelector(TARGET);
      if (!target) {
        target = mouseOverItem;
      }
      const mouseMove = function() {
        let initialProgress = { x: 0.5, y: 0.5 };
        let progressObject = { x: initialProgress.x, y: initialProgress.y };
        let duration = attr(0.5, mouseOverItem.getAttribute(DURATION));
        let ease = attr("power1.out", mouseOverItem.getAttribute(EASE));
        let cursorXTimeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
        let cursorYTimeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
        layers.forEach((layer) => {
          const processAttribute = function(attributeName, defaultValue) {
            const hasAttribute = layer.hasAttribute(attributeName);
            const attributeValue = attr(defaultValue, layer.getAttribute(attributeName));
            if (hasAttribute) {
              return attributeValue;
            } else {
              return;
            }
          };
          let moveX = processAttribute(MOVE_X, 10);
          let moveY = processAttribute(MOVE_Y, 10);
          let rotateZ = processAttribute(ROTATE_Z, 5);
          if (moveX) {
            cursorXTimeline.fromTo(layer, { xPercent: moveX * -1 }, { xPercent: moveX }, 0);
          }
          if (rotateZ) {
            cursorXTimeline.fromTo(layer, { rotateZ: rotateZ * -1 }, { rotateZ }, 0);
          }
          if (moveY) {
            cursorYTimeline.fromTo(layer, { yPercent: moveY * -1 }, { yPercent: moveY }, 0);
          }
        });
        function setTimelineProgress(xValue, yValue) {
          gsap.to(progressObject, {
            x: xValue,
            y: yValue,
            ease,
            duration,
            onUpdate: () => {
              cursorXTimeline.progress(progressObject.x);
              cursorYTimeline.progress(progressObject.y);
            }
          });
        }
        setTimelineProgress(initialProgress.x, initialProgress.y);
        target.addEventListener("mousemove", function(e) {
          const rect = target.getBoundingClientRect();
          let mousePercentX = gsap.utils.clamp(
            0,
            1,
            gsap.utils.normalize(0, rect.width, e.clientX - rect.left)
          );
          let mousePercentY = gsap.utils.clamp(
            0,
            1,
            gsap.utils.normalize(0, rect.height, e.clientY - rect.top)
          );
          setTimelineProgress(mousePercentX, mousePercentY);
        });
        target.addEventListener("mouseleave", function(e) {
          setTimelineProgress(initialProgress.x, initialProgress.y);
        });
      };
      mouseMove();
    });
  };

  // src/interactions/hoverActive.js
  var hoverActive = function(gsapContext) {
    const ANIMATION_ID = "hoveractive";
    const WRAP = '[data-ix-hoveractive="wrap"]';
    const OPTION_ACTIVE_CLASS = "data-ix-hoveractive-class";
    const ACTIVE_CLASS = "is-active";
    const hoverElements = gsap.utils.toArray(WRAP);
    hoverElements.forEach((item) => {
      if (!item) return;
      let activeClass = attr(ACTIVE_CLASS, item.getAttribute(OPTION_ACTIVE_CLASS));
      item.addEventListener("mouseover", function(e) {
        item.classList.add(activeClass);
      });
      item.addEventListener("mouseleave", function(e) {
        item.classList.remove(activeClass);
      });
    });
  };

  // src/interactions/scrolling.js
  var scrolling = function(gsapContext) {
    const ANIMATION_ID = "scrolling";
    const WRAP = `[data-ix-scrolling="wrap"]`;
    const TRIGGER = `[data-ix-scrolling="trigger"]`;
    const LAYER = '[data-ix-scrolling="layer"]';
    const START = "data-ix-scrolling-start";
    const END = "data-ix-scrolling-end";
    const TABLET_START = "data-ix-scrolling-start-tablet";
    const TABLET_END = "data-ix-scrolling-end-tablet";
    const MOBILE_START = "data-ix-scrolling-start-mobile";
    const MOBILE_END = "data-ix-scrolling-end-mobile";
    const SCRUB = "data-ix-scrolling-scrub";
    const POSITION = "data-ix-scrolling-position";
    const X_START = "data-ix-scrolling-x-start";
    const X_END = "data-ix-scrolling-x-end";
    const Y_START = "data-ix-scrolling-y-start";
    const Y_END = "data-ix-scrolling-y-end";
    const SCALE_START = "data-ix-scrolling-scale-start";
    const SCALE_END = "data-ix-scrolling-scale-end";
    const WIDTH_START = "data-ix-scrolling-width-start";
    const WIDTH_END = "data-ix-scrolling-width-end";
    const HEIGHT_START = "data-ix-scrolling-height-start";
    const HEIGHT_END = "data-ix-scrolling-height-end";
    const ROTATE_X_START = "data-ix-scrolling-rotate-x-start";
    const ROTATE_X_END = "data-ix-scrolling-rotate-x-end";
    const ROTATE_Y_START = "data-ix-scrolling-rotate-y-start";
    const ROTATE_Y_END = "data-ix-scrolling-rotate-y-end";
    const ROTATE_Z_START = "data-ix-scrolling-rotate-z-start";
    const ROTATE_Z_END = "data-ix-scrolling-rotate-z-end";
    const OPACITY_START = "data-ix-scrolling-opacity-start";
    const OPACITY_END = "data-ix-scrolling-opacity-end";
    const CLIP_START = "data-ix-scrolling-clip-start";
    const CLIP_END = "data-ix-scrolling-clip-end";
    const CLIP_TYPE = "data-ix-scrolling-clip-type";
    const scrollingItems = gsap.utils.toArray(WRAP);
    scrollingItems.forEach((scrollingItem) => {
      const layers = gsap.utils.toArray(scrollingItem.querySelectorAll(LAYER));
      if (!scrollingItem || layers.length === 0) return;
      let trigger = scrollingItem.querySelector(TRIGGER);
      if (!trigger) {
        trigger = scrollingItem;
      }
      let runOnBreakpoint = checkBreakpoints(scrollingItem, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;
      let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
      const tlSettings = {
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        toggleActions: null
      };
      tlSettings.start = attr(tlSettings.start, scrollingItem.getAttribute(START));
      tlSettings.end = attr(tlSettings.end, scrollingItem.getAttribute(END));
      tlSettings.scrub = attr(tlSettings.scrub, scrollingItem.getAttribute(SCRUB));
      if (isTablet && scrollingItem.hasAttribute(TABLET_START)) {
        tlSettings.start = attr(tlSettings.start, scrollingItem.getAttribute(TABLET_START));
      }
      if (isTablet && scrollingItem.hasAttribute(TABLET_END)) {
        tlSettings.start = attr(tlSettings.start, scrollingItem.getAttribute(TABLET_END));
      }
      if (isMobile && scrollingItem.hasAttribute(MOBILE_START)) {
        tlSettings.start = attr(tlSettings.start, scrollingItem.getAttribute(MOBILE_START));
      }
      if (isMobile && scrollingItem.hasAttribute(MOBILE_END)) {
        tlSettings.start = attr(tlSettings.start, scrollingItem.getAttribute(MOBILE_END));
      }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: tlSettings.start,
          end: tlSettings.end,
          scrub: tlSettings.scrub,
          markers: false
          // onEnter: () => {
          //   console.log(tl, tl.scrollTrigger.start, tl.scrollTrigger.end);
          // },
        },
        defaults: {
          duration: 1,
          ease: "none"
        }
      });
      layers.forEach((layer) => {
        if (!layer) return;
        const varsFrom = {};
        const varsTo = { immediateRender: true };
        const processAttribute = function(attributeName, defaultValue) {
          const hasAttribute = layer.hasAttribute(attributeName);
          const attributeValue = attr(defaultValue, layer.getAttribute(attributeName));
          if (hasAttribute) {
            return attributeValue;
          } else {
            return;
          }
        };
        varsFrom.x = processAttribute(X_START, "0%");
        varsTo.x = processAttribute(X_END, "0%");
        varsFrom.y = processAttribute(Y_START, "0%");
        varsTo.y = processAttribute(Y_END, "0%");
        varsFrom.scale = processAttribute(SCALE_START, 1);
        varsTo.scale = processAttribute(SCALE_END, 1);
        varsFrom.width = processAttribute(WIDTH_START, "0%");
        varsTo.width = processAttribute(WIDTH_END, "0%");
        varsFrom.height = processAttribute(HEIGHT_START, "0%");
        varsTo.height = processAttribute(HEIGHT_END, "0%");
        varsFrom.rotateX = processAttribute(ROTATE_X_START, 0);
        varsTo.rotateX = processAttribute(ROTATE_X_END, 0);
        varsFrom.rotateY = processAttribute(ROTATE_Y_START, 0);
        varsTo.rotateY = processAttribute(ROTATE_Y_END, 0);
        varsFrom.rotateZ = processAttribute(ROTATE_Z_START, 0);
        varsTo.rotateZ = processAttribute(ROTATE_Z_END, 0);
        varsFrom.opacity = processAttribute(OPACITY_START, 0);
        varsTo.opacity = processAttribute(OPACITY_END, 0);
        varsFrom.clipPath = processAttribute(CLIP_START, "string");
        varsTo.clipPath = processAttribute(CLIP_END, "string");
        const position = attr("<", layer.getAttribute(POSITION));
        let fromTween = tl.fromTo(layer, varsFrom, varsTo, position);
      });
    });
  };

  // src/interactions/scrollIn.js
  var scrollIn = function(gsapContext) {
    const ANIMATION_ID = "scrollin";
    const ELEMENT = "data-ix-scrollin";
    const HEADING = "heading";
    const ITEM = "item";
    const CONTAINER = "container";
    const STAGGER = "stagger";
    const RICH_TEXT = "rich-text";
    const IMAGE_WRAP = "image-wrap";
    const IMAGE = "image";
    const LINE = "line";
    const SCROLL_TOGGLE_ACTIONS = "data-ix-scrollin-toggle-actions";
    const SCROLL_SCRUB = "data-ix-scrollin-scrub";
    const SCROLL_START = "data-ix-scrollin-start";
    const SCROLL_END = "data-ix-scrollin-end";
    const CLIP_DIRECTION = "data-ix-scrollin-direction";
    const scrollInTL = function(item) {
      const settings = {
        scrub: false,
        toggleActions: "play none none none",
        start: "top 90%",
        end: "top 75%"
      };
      settings.toggleActions = attr(settings.toggleActions, item.getAttribute(SCROLL_TOGGLE_ACTIONS));
      settings.scrub = attr(settings.scrub, item.getAttribute(SCROLL_SCRUB));
      settings.start = attr(settings.start, item.getAttribute(SCROLL_START));
      settings.end = attr(settings.end, item.getAttribute(SCROLL_END));
      const tl = gsap.timeline({
        defaults: {
          duration: 0.6,
          ease: "power1.out"
        },
        scrollTrigger: {
          trigger: item,
          start: settings.start,
          end: settings.end,
          toggleActions: settings.toggleActions,
          scrub: settings.scrub
        }
      });
      return tl;
    };
    const defaultTween = function(item, tl, options = {}) {
      const varsFrom = {
        opacity: 0,
        y: "2rem"
      };
      const varsTo = {
        opacity: 1,
        y: "0rem"
      };
      if (options.stagger === true) {
        varsTo.stagger = { each: 0.1, from: "start" };
      }
      const tween = tl.fromTo(item, varsFrom, varsTo);
      return tween;
    };
    const scrollInHeading = function(item) {
      const splitText = runSplit(item);
      if (!splitText) return;
      const tl = scrollInTL(item);
      tl.from(splitText.lines, {
        opacity: 0,
        ease: "power2.In",
        duration: 0.4
      });
      tl.from(
        splitText.lines,
        {
          skewY: -12,
          skewX: -12,
          y: "70%",
          z: "-.5em",
          ease: "power3.Out",
          stagger: { from: "start", each: 0.2 },
          duration: 0.8,
          onComplete: () => {
            splitText.revert();
          }
        },
        "<"
      );
      tl.eventCallback("onComplete", () => {
        splitText.revert();
      });
    };
    const scrollInItem = function(item) {
      if (!item) return;
      const tl = scrollInTL(item);
      const tween = defaultTween(item, tl);
    };
    const getCLipStart = function(item) {
      let defaultDirection = "right";
      let clipStart;
      const direction = attr(defaultDirection, item.getAttribute(CLIP_DIRECTION));
      const clipDirections = {
        left: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        right: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        top: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        bottom: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
      };
      if (direction === "left") {
        clipStart = clipDirections.left;
      }
      if (direction === "right") {
        clipStart = clipDirections.right;
      }
      if (direction === "top") {
        clipStart = clipDirections.top;
      }
      if (direction === "bottom") {
        clipStart = clipDirections.bottom;
      }
      return clipStart;
    };
    const scrollInImage = function(item) {
      if (!item) return;
      const clipStart = getCLipStart(item);
      const clipEnd = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      const tl = scrollInTL(item);
      tl.fromTo(
        item,
        {
          clipPath: clipStart
        },
        {
          clipPath: clipEnd,
          duration: 1
        }
      );
    };
    const scrollInLine = function(item) {
      if (!item) return;
      const clipStart = getCLipStart(item);
      const clipEnd = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
      const tl = scrollInTL(item);
      tl.fromTo(
        item,
        {
          clipPath: clipStart
        },
        {
          clipPath: clipEnd
        }
      );
    };
    const scrollInContainer = function(item) {
      if (!item) return;
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      children.forEach((child) => {
        const tl = scrollInTL(child);
        const tween = defaultTween(child, tl);
      });
    };
    const scrollInStagger = function(item) {
      if (!item) return;
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      const tl = scrollInTL(item);
      const tween = defaultTween(children, tl, { stagger: true });
    };
    const scrollInRichText = function(item) {
      if (!item) return;
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      children.forEach((child) => {
        const childTag = child.tagName;
        if (["H1", "H2", "H3", "H4", "H5", "H6"].includes(childTag)) {
          scrollInHeading(child);
        }
        if (childTag === "FIGURE") {
          scrollInImage(child);
        } else {
          scrollInItem(child);
        }
      });
    };
    const items = gsap.utils.toArray(`[${ELEMENT}]`);
    items.forEach((item) => {
      if (!item) return;
      let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;
      const scrollInType = item.getAttribute(ELEMENT);
      if (scrollInType === HEADING) {
        scrollInHeading(item);
      }
      if (scrollInType === ITEM) {
        scrollInItem(item);
      }
      if (scrollInType === IMAGE) {
        scrollInImage(item);
      }
      if (scrollInType === LINE) {
        scrollInLine(item);
      }
      if (scrollInType === CONTAINER) {
        scrollInContainer(item);
      }
      if (scrollInType === STAGGER) {
        scrollInStagger(item);
      }
      if (scrollInType === RICH_TEXT) {
        scrollInRichText(item);
      }
    });
  };

  // src/interactions/sectionEdge.js
  var sectionEdge = function() {
    const sectionEdgeShrink = function() {
      const elements = document.querySelectorAll("[data-ix-edge='shrink']");
      if (elements.length === 0) return;
      elements.forEach((item) => {
        let targetElement = item;
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: targetElement,
            // trigger element - viewport
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        tl.fromTo(
          targetElement,
          {
            height: "100%",
            duration: 1
          },
          {
            height: "15%",
            duration: 1
          }
        );
      });
    };
    sectionEdgeShrink();
    const sectionEdgeGrow = function() {
      const elements = document.querySelectorAll("[data-ix-edge='grow']");
      if (elements.length === 0) return;
      elements.forEach((item) => {
        let targetElement = item;
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: targetElement,
            // trigger element - viewport
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        tl.fromTo(
          targetElement,
          {
            height: "15%",
            duration: 1
          },
          {
            height: "100%",
            duration: 1
          }
        );
      });
    };
    sectionEdgeGrow();
  };

  // src/interactions/cursor.js
  var cursor = function() {
    const ANIMATION_ID = "cursor";
    const WRAP = '[data-ix-cursor="wrap"]';
    const INNER = '[data-ix-cursor="inner"]';
    const OUTER = '[data-ix-cursor="outer"]';
    const HOVER = '[data-ix-cursor="hover"]';
    const NO_HOVER = '[data-ix-cursor="no-hover"]';
    const HOVER_CLASS = "is-hover";
    const cursorWrap = document.querySelector(WRAP);
    const cursorInner = document.querySelector(INNER);
    const cursorOuter = document.querySelector(OUTER);
    if (!cursorInner || !cursorOuter || !cursorWrap) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints) return;
    const cursorRotate = function() {
    };
    const tl = gsap.timeline({
      repeat: -1
    });
    tl.fromTo(cursorOuter, { rotateZ: 0 }, { rotateZ: 360, duration: 7.2, ease: "none" });
    cursorRotate();
    const cursorHover = function() {
      const cursorElements = [cursorInner, cursorOuter, cursorWrap];
      const MINOR = "minor";
      const VIEW_PAGE = "view-page";
      const VIEW_CASE = "view-case";
      const LETS_GO = "lets-go";
      const NEXT_CASE = "next-case";
      const IMG_WHITE = "image-white";
      const IMG_BLACK = "image-black";
      const minorClass = "is-cursor-minor";
      const vanishedClass = "is-vanished";
      const viewPageClass = "is-view-page";
      const viewCaseClass = "is-view-case";
      const nextCaseClass = "is-next-case";
      const prevCaseClass = "is-prev-case";
      const nextCaseWhiteClass = "is-next-case-w";
      const blackClass = "is-black";
      const letsGoClass = "is-lets-go";
      const imageBlackClass = "is-image-black";
      const imageWhiteClass = "is-image-white";
      const notBlendedClass = "is-not-blended";
      function handleMouseEvents(selector, cursorClasses) {
        const elements = document.querySelectorAll(`[data-ix-cursor="${selector}"]`);
        if (elements.length === 0) return;
        elements.forEach((element) => {
          if (!element) return;
          element.addEventListener("mouseover", () => {
            cursorElements.forEach((element2, index) => {
              if (cursorClasses[index] !== void 0) {
                toggleClass(element2, cursorClasses[index]);
              }
            });
          });
          element.addEventListener("mouseout", () => {
            cursorElements.forEach((element2, index) => {
              if (cursorClasses[index] !== void 0) {
                toggleClass(element2, cursorClasses[index]);
              }
            });
          });
        });
      }
      handleMouseEvents(MINOR, [minorClass, minorClass]);
      handleMouseEvents(VIEW_PAGE, [vanishedClass, viewPageClass, notBlendedClass]);
      handleMouseEvents(VIEW_CASE, [vanishedClass, viewCaseClass, notBlendedClass]);
      handleMouseEvents(LETS_GO, [vanishedClass, letsGoClass, notBlendedClass]);
      handleMouseEvents(IMG_BLACK, [imageBlackClass, minorClass, notBlendedClass]);
      handleMouseEvents(IMG_WHITE, [imageWhiteClass, minorClass, notBlendedClass]);
      handleMouseEvents(NEXT_CASE, [null, nextCaseWhiteClass, , notBlendedClass]);
    };
    cursorHover();
    const cursorMove = function(element, delay = false) {
      let progressObject = { x: 0, y: 0 };
      let cursorXTimeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      cursorXTimeline.fromTo(element, { x: "-50vw" }, { x: "50vw" });
      let cursorYTimeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });
      cursorYTimeline.fromTo(element, { y: "-50vh" }, { y: "50vh" });
      function setTimelineProgress(xValue, yValue) {
        gsap.to(progressObject, {
          x: xValue,
          y: yValue,
          ease: "none",
          duration: delay ? 0.1 : 0,
          onUpdate: () => {
            cursorXTimeline.progress(progressObject.x);
            cursorYTimeline.progress(progressObject.y);
          }
        });
      }
      document.addEventListener("mousemove", function(e) {
        let mousePercentX = e.clientX / window.innerWidth;
        let mousePercentY = e.clientY / window.innerHeight;
        setTimelineProgress(mousePercentX, mousePercentY);
      });
    };
    cursorMove(cursorInner);
    cursorMove(cursorOuter, true);
  };

  // src/interactions/load.js
  var load = function(gsapContext) {
    const ANIMATION_ID = "load";
    const ATTRIBUTE = "data-ix-load";
    const HEADING = "heading";
    const TEXT = "text";
    const ITEM = "item";
    const IMAGE = "image";
    const LINE = "line";
    const STAGGER = "stagger";
    const STAGGER_SPANS = "stagger-spans";
    const POSITION = "data-ix-load-position";
    const DEFAULT_STAGGER = "<0.2";
    const items = gsap.utils.toArray(`[${ATTRIBUTE}]`);
    if (items.length === 0) return;
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power1.out",
        duration: 0.6
      }
    });
    const loadHeading = function(item) {
      const splitText = runSplit(item);
      if (!splitText) return;
      const position = attr("<", item.getAttribute(POSITION));
      tl.set(item, { opacity: 1 });
      tl.fromTo(
        splitText.lines,
        { opacity: 0, y: "50%", rotateX: 45, skewY: -3, skewX: -3 },
        { opacity: 1, y: "0%", rotateX: 0, skewY: 0, skewX: 0, stagger: { each: 0.1, from: "left" } },
        position
      );
    };
    const loadStaggerSpans = function(item) {
      if (!item) return;
      const children = gsap.utils.toArray(item.children);
      const position = attr("<", item.getAttribute(POSITION));
      if (children.length === 0) return;
      tl.set(item, { opacity: 1 });
      tl.fromTo(
        children,
        { opacity: 0, y: "50%", rotateX: 45, skewY: -3, skewX: -3 },
        { opacity: 1, y: "0%", rotateX: 0, skewY: 0, skewX: 0, stagger: { each: 0.1, from: "left" } },
        position
      );
    };
    const loadImage = function(item) {
      const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
      tl.fromTo(item, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1 }, position);
    };
    const loadItem = function(item) {
      const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
      tl.fromTo(item, { opacity: 0, y: "2rem" }, { opacity: 1, y: "0rem" }, position);
    };
    const loadText = function(item) {
      const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
      tl.fromTo(
        item,
        { opacity: 0, y: "2rem", skewY: -3, skewX: -3 },
        { opacity: 1, y: "0rem", skewY: 0, skewX: 0 },
        position
      );
    };
    const loadLine = function(item) {
      const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
      tl.fromTo(item, { opacity: 1, width: "0%" }, { opacity: 1, width: "100%" }, position);
    };
    const loadStagger = function(item) {
      if (!item) return;
      const children = gsap.utils.toArray(item.children);
      if (children.length === 0) return;
      children.forEach((child, index) => {
        if (index === 0) {
          item.style.opacity = 1;
        }
        loadItem(child);
      });
    };
    items.forEach((item) => {
      if (!item) return;
      const loadType = item.getAttribute(ATTRIBUTE);
      if (loadType === HEADING) {
        loadHeading(item);
      }
      if (loadType === TEXT) {
        loadText(item);
      }
      if (loadType === STAGGER_SPANS) {
        loadStaggerSpans(item);
      }
      if (loadType === IMAGE) {
        loadImage(item);
      }
      if (loadType === LINE) {
        loadLine(item);
      }
      if (loadType === ITEM) {
        loadItem(item);
      }
      if (loadType === STAGGER) {
        loadStagger(item);
      }
    });
    tl.play(0);
    return tl;
  };

  // src/pages/home.js
  var homePitchMarquee = function() {
    function pitchScroll() {
      const triggerElement = document.querySelector('[data-ix-pitchslider="row"]');
      const targetElement = document.querySelector('[data-ix-pitchslider="slider"]');
      if (!triggerElement || !targetElement) return;
      let tl = gsap.timeline({
        scrollTrigger: {
          start: "top bottom",
          trigger: triggerElement,
          end: "bottom top",
          scrub: 1.2
        }
      });
      tl.to(targetElement, {
        xPercent: -150,
        duration: 1
      });
    }
    pitchScroll();
    function pitchSliderIn() {
      const triggerElement = document.querySelector('[data-ix-pitchslider="wrap"]');
      if (!triggerElement) return;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          // trigger element - viewport
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none"
        }
      });
      tl.from(triggerElement, {
        width: "0%",
        ease: "power2.In",
        duration: 1
      });
    }
    pitchSliderIn();
  };
  var homeWorkHover = function() {
    const ITEM = ".home_work_item-link";
    const LEFT = ".home_work_left";
    const RIGHT = ".home_work_right";
    const BG = ".home_work_background";
    const VISUAL = ".home_work_visual_wrap";
    const NUMBER_FIRST = ".home_work_number_span.is-one";
    const NUMBER_SECOND = ".home_work_number_span.is-two";
    const items = gsap.utils.toArray(ITEM);
    if (items.length === 0) return;
    items.forEach((item) => {
      const left = item.querySelector(LEFT);
      const right = item.querySelector(RIGHT);
      const bg = item.querySelector(BG);
      const visual = item.querySelector(VISUAL);
      const numberFirst = item.querySelectorAll(NUMBER_FIRST);
      const numberSecond = item.querySelectorAll(NUMBER_SECOND);
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2.out",
          duration: 0.8
        }
      });
      tl.fromTo(visual, { yPercent: 50, scaleY: 1.2 }, { yPercent: 0, scaleY: 1 });
      tl.fromTo(bg, { height: "0%" }, { height: "100%", duration: 0.6, ease: "power1.out" }, "<");
      tl.fromTo(left, { x: "0rem" }, { x: "3rem" }, "<");
      tl.fromTo(right, { x: "0rem" }, { x: "-3rem" }, "<");
      tl.fromTo(numberFirst, { yPercent: 0 }, { yPercent: -110, stagger: 0.1, duration: 0.4 }, "<.1");
      tl.fromTo(visual, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power1.out" }, "<");
      tl.fromTo(numberSecond, { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.4 }, "<.2");
      item.addEventListener("mouseenter", function(e) {
        tl.play();
      });
      item.addEventListener("mouseleave", function(e) {
        tl.reverse();
      });
    });
  };
  var homeHeroCircles = function() {
    const CIRCLE_1 = '[data-ix-homehero="circle-1"]';
    const CIRCLE_2 = '[data-ix-homehero="circle-2"]';
    const circle1 = document.querySelector(CIRCLE_1);
    const circle2 = document.querySelector(CIRCLE_2);
    if (!circle1 || !circle2) return;
    const tl1 = gsap.timeline({
      repeat: -1
    });
    tl1.fromTo(circle1, { rotateZ: 0 }, { rotateZ: 360, ease: "none", duration: 20 });
    const tl2 = gsap.timeline({
      repeat: -1
    });
    tl2.fromTo(circle2, { rotateZ: 0 }, { rotateZ: -360, ease: "none", duration: 32 });
  };

  // src/pages/case.js
  var caseMobile = function() {
    const ANIMATION_ID = "data-ix-casemobile";
    const WRAP = '[data-ix-casemobile="wrap"]';
    const MOBILE_1 = '[data-ix-casemobile="mobile-1"]';
    const MOBILE_2 = '[data-ix-casemobile="mobile-2"]';
    const MOBILE_3 = '[data-ix-casemobile="mobile-3"]';
    const wraps = gsap.utils.toArray(WRAP);
    if (wraps.length === 0) return;
    wraps.forEach((section) => {
      const mobile1 = section.querySelector(MOBILE_1);
      const mobile2 = section.querySelector(MOBILE_2);
      const mobile3 = section.querySelector(MOBILE_3);
      if (!mobile1 || !mobile2 || !mobile3) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          markers: false
        },
        defaults: {
          duration: 1,
          ease: "power1.out"
        }
      });
      tl.fromTo(mobile1, { yPercent: 60 }, { yPercent: 0, delay: 1 }, "<");
      tl.fromTo(mobile2, { yPercent: 40 }, { yPercent: 0 }, "<");
      tl.fromTo(mobile3, { yPercent: 20 }, { yPercent: 0 }, "<");
      tl.to(mobile1, { yPercent: -20, delay: 2 }, "<");
      tl.to(mobile2, { yPercent: -40 }, "<");
      tl.to(mobile3, { yPercent: -60 }, "<");
    });
  };
  var nextCase = function() {
    const ANIMATION_ID = "data-ix-nextcase";
    const WRAP = '[data-ix-nextcase="wrap"]';
    const LINE_1 = '[data-ix-nextcase="line-1"]';
    const LINE_2 = '[data-ix-nextcase="line-2"]';
    const OVERLAY = '[data-ix-nextcase="overlay"]';
    const wraps = gsap.utils.toArray(WRAP);
    if (wraps.length === 0) return;
    wraps.forEach((section) => {
      const line1 = section.querySelector(LINE_1);
      const line2 = section.querySelector(LINE_2);
      const overlay = section.querySelector(OVERLAY);
      if (!line1 || !line2 || !overlay) return;
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.6,
          ease: "power1.out"
        }
      });
      tl.fromTo(overlay, { opacity: 0.5 }, { opacity: 1, duration: 0.8 });
      tl.fromTo(line1, { xPercent: 0 }, { xPercent: 110 }, "<");
      tl.fromTo(line2, { xPercent: -110 }, { xPercent: 0 }, "<.1");
      section.addEventListener("mouseenter", function(e) {
        tl.play();
      });
      section.addEventListener("mouseleave", function(e) {
        tl.reverse();
      });
    });
  };

  // src/pages/contact.js
  var contact = function() {
    const dynamicFormInputs = function() {
      const inputWraps = gsap.utils.toArray(".form_dynamic_field_wrap");
      const FIELD = ".form_dynamic_field";
      const LABEL = ".form_dynamic_label";
      const PLACEHOLDER_CLASS = "is-placeholder";
      if (inputWraps.length === 0) return;
      inputWraps.forEach(function(item) {
        const field = item.querySelector(FIELD);
        const label = item.querySelector(LABEL);
        if (!field || !label) return;
        field.addEventListener("focusin", function() {
          label.classList.remove(PLACEHOLDER_CLASS);
        });
        field.addEventListener("focusout", function() {
          if (field.value.length === 0) {
            label.classList.add(PLACEHOLDER_CLASS);
          }
        });
        field.addEventListener("change", function() {
          if (field.value.length !== 0) {
            label.classList.remove(PLACEHOLDER_CLASS);
          } else {
            label.classList.add(PLACEHOLDER_CLASS);
          }
        });
      });
    };
    dynamicFormInputs();
    function optionFieldFocus(event) {
      const ACTIVE_CLASS = "is-active";
      const OPTION_FIELD = ".form_option_input";
      const OPTION_WRAP = ".form_option_wrap";
      const GROUP_WRAP = ".form_option_list";
      const optionFields = document.querySelectorAll(OPTION_FIELD);
      if (optionFields.length === 0) return;
      optionFields.forEach(function(formField) {
        const fieldParent = formField.closest(OPTION_WRAP);
        const fieldGroup = formField.closest(GROUP_WRAP);
        formField.addEventListener("change", function(event2) {
          const radioGroup = fieldGroup.querySelectorAll(OPTION_FIELD);
          if (formField.type === "checkbox" && formField.checked === true) {
            fieldParent.classList.add(ACTIVE_CLASS);
          }
          if (formField.type === "checkbox" && formField.checked === false) {
            fieldParent.classList.remove(ACTIVE_CLASS);
          }
          if (formField.type === "radio" && formField.checked === true) {
            radioGroup.forEach(function(field) {
              const fieldParent2 = field.closest(OPTION_WRAP);
              if (field !== formField) {
                fieldParent2.classList.remove(ACTIVE_CLASS);
              } else {
                fieldParent2.classList.add(ACTIVE_CLASS);
              }
            });
          }
        });
      });
    }
    optionFieldFocus();
    function dynamicFieldFocus(event) {
      const dyamicFields = document.querySelectorAll(".form_dynamic_field");
      if (dyamicFields.length === 0) return;
      dyamicFields.forEach(function(formField) {
        formField.addEventListener("focus", function(event2) {
          const formFieldParent = event2.currentTarget.closest(".form_dynamic_field_wrap");
          if (!formFieldParent) return;
          formFieldParent.querySelector(".form_dynamic_field_line").click();
        });
      });
    }
    dynamicFieldFocus();
  };

  // src/pages/blog.js
  var blogHeaderScroll = function() {
    const trigger = document.querySelector('[data-ix-bloghero="trigger"]');
    const title = document.querySelector('[data-ix-bloghero="headings"]');
    const squares = document.querySelectorAll('[data-ix-bloghero="square"]');
    if (!trigger || !title || squares.length === 0) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "top top",
        scrub: 0.5
      },
      defaults: {
        ease: "none",
        duration: 1
      }
    });
    tl.to(title, {
      color: "#ffffff",
      ease: "power2.Out"
    });
    tl.fromTo(
      squares,
      {
        rotateZ: 45
      },
      {
        rotateZ: 275
        // stagger: { each: 0.2, from: 'left' },
      },
      "<"
    );
  };
  var blogHeaderBoxes = function() {
    const squares = document.querySelectorAll('[data-ix-bloghero="square"]');
    if (squares.length === 0) return;
    const tl = gsap.timeline({
      //   yoyo: true,
    });
    tl.fromTo(
      squares,
      {
        borderRadius: "100%"
      },
      {
        borderRadius: "0%",
        ease: "power1.Out",
        duration: 1.5,
        stagger: { each: 0.25, from: "start", repeat: -1, yoyo: true }
      },
      "<"
    );
  };

  // src/index.js
  document.addEventListener("DOMContentLoaded", function() {
    let lenis, clickAnimation;
    if (gsap.ScrollTrigger !== void 0) {
      gsap.registerPlugin(ScrollTrigger);
    }
    if (gsap.Flip !== void 0) {
      gsap.registerPlugin(Flip);
    }
    const initLenis = function() {
      lenis = new Lenis({
        duration: 0.8,
        easing: (t2) => t2 === 1 ? 1 : 1 - Math.pow(2, -10 * t2),
        // https://easings.net
        touchMultiplier: 1.5
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      lenis.on("scroll", () => {
        if (!ScrollTrigger) return;
        ScrollTrigger.update();
      });
      gsap.ticker.add((time) => {
        lenis.raf(time * 1e3);
      });
      gsap.ticker.lagSmoothing(0);
      function stopScroll() {
        const stopScrollLinks = document.querySelectorAll('[data-scroll="stop"]');
        if (stopScrollLinks == null) {
          return;
        }
        stopScrollLinks.forEach((item) => {
          item.addEventListener("click", (event) => {
            lenis.stop();
          });
        });
      }
      stopScroll();
      function startScroll() {
        const startScrollLinks = document.querySelectorAll('[data-scroll="start"]');
        if (startScrollLinks == null) {
          return;
        }
        startScrollLinks.forEach((item) => {
          item.addEventListener("click", (event) => {
            lenis.start();
          });
        });
      }
      startScroll();
      function toggleScroll() {
        const toggleScrollLinks = document.querySelectorAll('[data-scroll="toggle"]');
        if (toggleScrollLinks == null) {
          return;
        }
        toggleScrollLinks.forEach((item) => {
          let stopScroll2 = false;
          item.addEventListener("click", (event) => {
            stopScroll2 = !stopScroll2;
            if (stopScroll2) lenis.stop();
            else lenis.start();
          });
        });
      }
      toggleScroll();
    };
    initLenis();
    const pageTransition = function(gsapContext) {
      const wrap = document.querySelector(".transition_wrap");
      const edgeTop = document.querySelector(".transition_edge_top_image");
      const edgeBot = document.querySelector(".transition_edge_bot_image");
      const imageTop = document.querySelector(".transition_image_top");
      const imageBot = document.querySelector(".transition_image_bot");
      let excludedClass = "no-transition";
      if (!wrap) return;
      const tlLoad = gsap.timeline({
        // paused: true,
        defaults: {
          ease: "power1,out",
          duration: 0.6
        }
      });
      tlLoad.set(wrap, { display: "block" });
      tlLoad.fromTo(imageTop, { opacity: 1 }, { opacity: 0, delay: 0.5, duration: 0.3 });
      tlLoad.fromTo(imageBot, { opacity: 1 }, { opacity: 0, duration: 0.3 }, "<");
      tlLoad.fromTo(
        imageTop,
        { yPercent: 0, rotateX: 0, skewX: 0, skewY: 0 },
        { yPercent: -110, rotateX: 90, skewX: -12, skewY: -15 },
        "<"
      );
      tlLoad.fromTo(
        imageBot,
        { yPercent: 0, rotateX: 0, skewX: 0, skewY: 0 },
        { yPercent: -110, rotateX: 90, skewX: -12, skewY: -15 },
        "<.1"
      );
      tlLoad.fromTo(wrap, { yPercent: 0 }, { yPercent: -120, duration: 0.8 }, "<.2");
      tlLoad.fromTo(edgeBot, { height: "100%" }, { height: "0%", duration: 0.6 }, "<.2");
      tlLoad.set(wrap, { display: "none" });
      const introDuration = tlLoad.duration() * 1e3;
      const clickTimeline = function() {
        const tlClick = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power1,out",
            duration: 0.6
          }
        });
        tlClick.set(wrap, { display: "flex" });
        tlClick.fromTo(wrap, { yPercent: 120, duration: 0.8 }, { yPercent: 0, duration: 0.8 });
        tlClick.fromTo(edgeTop, { height: "100%" }, { height: "0%", duration: 0.6 }, "<.2");
        tlClick.fromTo(imageTop, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "<.4");
        tlClick.fromTo(
          imageTop,
          { yPercent: 110, rotateX: -90, skewX: 6, skewY: 10 },
          { yPercent: 0, rotateX: 0, skewX: 0, skewY: 0 },
          "<"
        );
        tlClick.fromTo(imageBot, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "<.1");
        tlClick.fromTo(
          imageBot,
          { yPercent: 110, rotateX: -90, skewX: 6, skewY: 10 },
          { yPercent: 0, rotateX: 0, skewX: 0, skewY: 0 },
          "<"
        );
        return tlClick;
      };
      if (wrap) {
        tlLoad.play();
        document.body.classList.add("no-scroll-transition");
        lenis.stop();
        setTimeout(() => {
          document.body.classList.remove("no-scroll-transition");
          lenis.start();
          load(gsapContext);
          tlLoad.kill();
          clickAnimation = clickTimeline();
        }, introDuration);
      }
      document.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("click", function(e) {
          if (this.hostname == window.location.hostname && this.getAttribute("href").indexOf("#") === -1 && !this.classList.contains(excludedClass) && this.getAttribute("target") !== "_blank" && wrap) {
            e.preventDefault();
            document.body.classList.add("no-scroll-transition");
            let transitionURL = this.getAttribute("href");
            clickAnimation.play();
            const exitDuration = clickAnimation.duration() * 1e3 + 100;
            setTimeout(() => {
              window.location.href = transitionURL;
            }, exitDuration);
          }
        });
      });
      window.onpageshow = function(event) {
        if (event.persisted) {
          window.location.reload();
        }
      };
      setTimeout(() => {
        window.addEventListener("resize", function() {
          setTimeout(() => {
            wrap.style.display = "none";
          }, 50);
        });
      }, introDuration);
    };
    const navMenu = function(gsapContext) {
      let navOpen = false;
      const PRIMARY_LINK = '[data-ix-menu="primary-link"]';
      const PRIMARY_NUMBER = '[data-ix-menu="primary-number"]';
      const PRIMARY_1 = '[data-ix-menu="primary-1"]';
      const PRIMARY_2 = '[data-ix-menu="primary-2"]';
      const button = document.querySelector('[data-ix-menu="button"]');
      const buttonBg = document.querySelector('[data-ix-menu="button-bg"]');
      const buttonLine1 = document.querySelector('[data-ix-menu="button-line-1"]');
      const buttonLine2 = document.querySelector('[data-ix-menu="button-line-2"]');
      const buttonLine3 = document.querySelector('[data-ix-menu="button-line-3"]');
      const buttonLine4 = document.querySelector('[data-ix-menu="button-line-4"]');
      const wrap = document.querySelector('[data-ix-menu="wrap"]');
      const edge = document.querySelector('[data-ix-menu="edge"]');
      const right = document.querySelector('[data-ix-menu="right"]');
      const rightContent = document.querySelector('[data-ix-menu="right-content"]');
      const rightBg = document.querySelector('[data-ix-menu="right-bg"]');
      const rightCircle = document.querySelector('[data-ix-menu="right-circle"]');
      const leftLines = document.querySelector('[data-ix-menu="left-lines"]');
      if (!wrap) return;
      const primaryLinks = gsap.utils.toArray(PRIMARY_LINK);
      const showMenuTL = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2,out",
          duration: 0.8
        }
      });
      showMenuTL.set(wrap, { display: "flex" });
      showMenuTL.fromTo(wrap, { yPercent: -110 }, { yPercent: 0, duration: 1 });
      showMenuTL.fromTo(edge, { height: "100%" }, { height: "0%" }, "<");
      showMenuTL.fromTo(right, { opacity: 0 }, { opacity: 1, duration: 0.3 }, "-=.2");
      showMenuTL.fromTo(right, { xPercent: 110 }, { xPercent: 0 }, "<");
      showMenuTL.fromTo(rightCircle, { width: "0%" }, { width: "100%" }, "<");
      showMenuTL.fromTo(
        primaryLinks,
        { yPercent: 50, opacity: 0, rotateX: -45 },
        { yPercent: 0, opacity: 1, rotateX: 0, stagger: { from: "end", each: 0.1 } },
        "<"
      );
      showMenuTL.fromTo(rightContent, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<.4");
      showMenuTL.fromTo(
        leftLines,
        { opacity: 0, xPercent: -50 },
        { opacity: 1, xPercent: 0, duration: 0.3 },
        "<"
      );
      const buttonClickTL = gsap.timeline({
        paused: true,
        defaults: {
          ease: "expo.inOut",
          duration: 0.6
        }
      });
      buttonClickTL.set(buttonLine3, { display: "block" });
      buttonClickTL.set(buttonLine4, { display: "block" });
      buttonClickTL.fromTo(buttonLine1, { x: "0rem" }, { x: "2rem" });
      buttonClickTL.fromTo(buttonLine2, { x: "0rem" }, { x: "-2rem" }, "<");
      buttonClickTL.fromTo(
        buttonLine3,
        { x: "-2rem", y: "-2rem", rotateZ: 45 },
        { x: "0rem", y: "0rem", rotateZ: 45 }
      );
      buttonClickTL.fromTo(
        buttonLine4,
        { x: "2rem", y: "-2rem", rotateZ: -45 },
        { x: "0rem", y: "0rem", rotateZ: -45 },
        "<.1"
      );
      const buttonHoverTL = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power2.out",
          duration: 0.3
        }
      });
      buttonHoverTL.fromTo(buttonBg, { width: "100%" }, { width: "2.5rem" });
      buttonHoverTL.fromTo(buttonLine1, { width: "1rem" }, { width: "1.25rem" }, "<");
      buttonHoverTL.fromTo(buttonLine2, { width: "1.5rem" }, { width: "1rem" }, "<");
      button.addEventListener("click", function(e) {
        if (navOpen) {
          showMenuTL.timeScale(1.75);
          showMenuTL.reverse();
          buttonClickTL.reverse();
        } else {
          showMenuTL.timeScale(1);
          showMenuTL.play();
          buttonClickTL.play();
        }
        navOpen = !navOpen;
      });
      button.addEventListener("mouseenter", function(e) {
        buttonHoverTL.play();
      });
      button.addEventListener("mouseleave", function(e) {
        buttonHoverTL.reverse();
      });
      primaryLinks.forEach((link) => {
        const number = link.querySelector(PRIMARY_NUMBER);
        const back = link.querySelector(PRIMARY_2);
        const frontText = runSplit(link.querySelector(PRIMARY_1), "lines, chars");
        const backText = runSplit(back, "lines, chars");
        if (!frontText || !backText) return;
        const linksTl = gsap.timeline({
          paused: true,
          defaults: {
            ease: "expo.inOut",
            duration: 0.8
          }
        });
        linksTl.set(back, {
          opacity: 1
        });
        linksTl.fromTo(
          frontText.chars,
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0
          },
          {
            yPercent: -120,
            opacity: 0,
            rotateX: 90,
            stagger: { from: "start", each: 0.05 }
          },
          "<"
        );
        linksTl.from(
          backText.chars,
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -90,
            stagger: { from: "start", each: 0.05 }
          },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0
          },
          "<"
        );
        link.addEventListener("mouseenter", function(e) {
          linksTl.play();
          number.setAttribute("data-theme", "dark");
        });
        link.addEventListener("mouseleave", function(e) {
          linksTl.reverse();
          number.setAttribute("data-theme", "light");
        });
      });
    };
    const toggleCTABlocks = function(event) {
      const ctaBlocks = document.querySelectorAll(".cta_block_item");
      const activeClass = "is-clicked";
      if (ctaBlocks.length === 0) return;
      ctaBlocks.forEach((item) => {
        if (!item) return;
        item.addEventListener("click", function(e) {
          toggleClass(item, activeClass);
        });
      });
    };
    pageTransition();
    let mm = gsap.matchMedia();
    mm.add(
      {
        //This is the conditions object
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px)  and (max-width: 991px)",
        isDesktop: "(min-width: 992px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
      },
      (gsapContext) => {
        let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
        pageTransition(gsapContext);
        if (!reduceMotion) {
          mouseOver(gsapContext);
          scrolling(gsapContext);
          scrollIn(gsapContext);
          homePitchMarquee();
          blogHeaderScroll();
          blogHeaderBoxes();
        }
        navMenu(gsapContext);
        hoverActive(gsapContext);
        sectionEdge();
        contact();
        homeHeroCircles();
        if (!isMobile) {
          homeWorkHover();
        }
        if (!isMobile || !reduceMotion) {
          caseMobile();
          nextCase();
          toggleCTABlocks();
        }
        if (isDesktop || isTablet) {
          cursor();
        }
      }
    );
    scrollReset();
  });
})();
