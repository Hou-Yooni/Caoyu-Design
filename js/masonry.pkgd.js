/*
 * Masonry PACKAGED v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define("jquery-bridget/jquery-bridget", ["jquery"], function(c) {
            a(b, c)
        })
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a(b, require("jquery"))
        } else {
            b.jQueryBridget = a(b, b.jQuery)
        }
    }
}(window, function factory(g, c) {
    var a = Array.prototype.slice;
    var b = g.console;
    var e = typeof b == "undefined" ? function() {} : function(h) {
        b.error(h)
    };

    function d(j, l, h) {
        h = h || c || g.jQuery;
        if (!h) {
            return
        }
        if (!l.prototype.option) {
            l.prototype.option = function(m) {
                if (!h.isPlainObject(m)) {
                    return
                }
                this.options = h.extend(true, this.options, m)
            }
        }
        h.fn[j] = function(m) {
            if (typeof m == "string") {
                var n = a.call(arguments, 1);
                return i(this, m, n)
            }
            k(this, m);
            return this
        };

        function i(m, o, n) {
            var q;
            var p = "$()." + j + '("' + o + '")';
            m.each(function(s, r) {
                var t = h.data(r, j);
                if (!t) {
                    e(j + " not initialized. Cannot call methods, i.e. " + p);
                    return
                }
                var u = t[o];
                if (!u || o.charAt(0) == "_") {
                    e(p + " is not a valid method");
                    return
                }
                var v = u.apply(t, n);
                q = q === undefined ? v : q
            });
            return q !== undefined ? q : m
        }

        function k(m, n) {
            m.each(function(p, o) {
                var q = h.data(o, j);
                if (q) {
                    q.option(n);
                    q._init()
                } else {
                    q = new l(o, n);
                    h.data(o, j, q)
                }
            })
        }
        f(h)
    }

    function f(h) {
        if (!h || (h && h.bridget)) {
            return
        }
        h.bridget = d
    }
    f(c || g.jQuery);
    return d
}));
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define("ev-emitter/ev-emitter", a)
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a()
        } else {
            b.EvEmitter = a()
        }
    }
}(this, function() {
    function a() {}
    var b = a.prototype;
    b.on = function(c, e) {
        if (!c || !e) {
            return
        }
        var d = this._events = this._events || {};
        var f = d[c] = d[c] || [];
        if (f.indexOf(e) == -1) {
            f.push(e)
        }
        return this
    };
    b.once = function(c, d) {
        if (!c || !d) {
            return
        }
        this.on(c, d);
        var e = this._onceEvents = this._onceEvents || {};
        var f = e[c] = e[c] || [];
        f[d] = true;
        return this
    };
    b.off = function(c, e) {
        var f = this._events && this._events[c];
        if (!f || !f.length) {
            return
        }
        var d = f.indexOf(e);
        if (d != -1) {
            f.splice(d, 1)
        }
        return this
    };
    b.emitEvent = function(d, c) {
        var h = this._events && this._events[d];
        if (!h || !h.length) {
            return
        }
        var e = 0;
        var g = h[e];
        c = c || [];
        var j = this._onceEvents && this._onceEvents[d];
        while (g) {
            var f = j && j[g];
            if (f) {
                this.off(d, g);
                delete j[g]
            }
            g.apply(this, c);
            e += f ? 0 : 1;
            g = h[e]
        }
        return this
    };
    return a
}));
/*
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define("get-size/get-size", [], function() {
            return a()
        })
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a()
        } else {
            b.getSize = a()
        }
    }
})(window, function factory() {
    function c(n) {
        var m = parseFloat(n);
        var l = n.indexOf("%") == -1 && !isNaN(m);
        return l && m
    }

    function j() {}
    var g = typeof console == "undefined" ? j : function(l) {
        console.error(l)
    };
    var h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    var i = h.length;

    function d() {
        var n = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var l = 0; l < i; l++) {
            var m = h[l];
            n[m] = 0
        }
        return n
    }

    function b(l) {
        var m = getComputedStyle(l);
        if (!m) {
            g("Style returned " + m + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1")
        }
        return m
    }
    var f = false;
    var e;

    function k() {
        if (f) {
            return
        }
        f = true;
        var m = document.createElement("div");
        m.style.width = "200px";
        m.style.padding = "1px 2px 3px 4px";
        m.style.borderStyle = "solid";
        m.style.borderWidth = "1px 2px 3px 4px";
        m.style.boxSizing = "border-box";
        var l = document.body || document.documentElement;
        l.appendChild(m);
        var n = b(m);
        a.isBoxSizeOuter = e = c(n.width) == 200;
        l.removeChild(m)
    }

    function a(n) {
        k();
        if (typeof n == "string") {
            n = document.querySelector(n)
        }
        if (!n || typeof n != "object" || !n.nodeType) {
            return
        }
        var y = b(n);
        if (y.display == "none") {
            return d()
        }
        var x = {};
        x.width = n.offsetWidth;
        x.height = n.offsetHeight;
        var p = x.isBorderBox = y.boxSizing == "border-box";
        for (var o = 0; o < i; o++) {
            var t = h[o];
            var B = y[t];
            var u = parseFloat(B);
            x[t] = !isNaN(u) ? u : 0
        }
        var w = x.paddingLeft + x.paddingRight;
        var v = x.paddingTop + x.paddingBottom;
        var s = x.marginLeft + x.marginRight;
        var r = x.marginTop + x.marginBottom;
        var m = x.borderLeftWidth + x.borderRightWidth;
        var l = x.borderTopWidth + x.borderBottomWidth;
        var q = p && e;
        var A = c(y.width);
        if (A !== false) {
            x.width = A + (q ? 0 : w + m)
        }
        var z = c(y.height);
        if (z !== false) {
            x.height = z + (q ? 0 : v + l)
        }
        x.innerWidth = x.width - (w + m);
        x.innerHeight = x.height - (v + l);
        x.outerWidth = x.width + s;
        x.outerHeight = x.height + r;
        return x
    }
    return a
});
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define("matches-selector/matches-selector", a)
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a()
        } else {
            b.matchesSelector = a()
        }
    }
}(window, function factory() {
    var a = (function() {
        var c = Element.prototype;
        if (c.matches) {
            return "matches"
        }
        if (c.matchesSelector) {
            return "matchesSelector"
        }
        var g = ["webkit", "moz", "ms", "o"];
        for (var d = 0; d < g.length; d++) {
            var f = g[d];
            var e = f + "MatchesSelector";
            if (c[e]) {
                return e
            }
        }
    })();
    return function b(c, d) {
        return c[a](d)
    }
}));
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define("fizzy-ui-utils/utils", ["matches-selector/matches-selector"], function(c) {
            return a(b, c)
        })
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a(b, require("desandro-matches-selector"))
        } else {
            b.fizzyUIUtils = a(b, b.matchesSelector)
        }
    }
}(window, function factory(d, b) {
    var c = {};
    c.extend = function(e, f) {
        for (var g in f) {
            e[g] = f[g]
        }
        return e
    };
    c.modulo = function(f, e) {
        return ((f % e) + e) % e
    };
    c.makeArray = function(g) {
        var e = [];
        if (Array.isArray(g)) {
            e = g
        } else {
            if (g && typeof g.length == "number") {
                for (var f = 0; f < g.length; f++) {
                    e.push(g[f])
                }
            } else {
                e.push(g)
            }
        }
        return e
    };
    c.removeFrom = function(e, g) {
        var f = e.indexOf(g);
        if (f != -1) {
            e.splice(f, 1)
        }
    };
    c.getParent = function(e, f) {
        while (e != document.body) {
            e = e.parentNode;
            if (b(e, f)) {
                return e
            }
        }
    };
    c.getQueryElement = function(e) {
        if (typeof e == "string") {
            return document.querySelector(e)
        }
        return e
    };
    c.handleEvent = function(e) {
        var f = "on" + e.type;
        if (this[f]) {
            this[f](e)
        }
    };
    c.filterFindElements = function(e, g) {
        e = c.makeArray(e);
        var f = [];
        e.forEach(function(j) {
            if (!(j instanceof HTMLElement)) {
                return
            }
            if (!g) {
                f.push(j);
                return
            }
            if (b(j, g)) {
                f.push(j)
            }
            var h = j.querySelectorAll(g);
            for (var k = 0; k < h.length; k++) {
                f.push(h[k])
            }
        });
        return f
    };
    c.debounceMethod = function(e, g, h) {
        var f = e.prototype[g];
        var i = g + "Timeout";
        e.prototype[g] = function() {
            var l = this[i];
            if (l) {
                clearTimeout(l)
            }
            var k = arguments;
            var j = this;
            this[i] = setTimeout(function() {
                f.apply(j, k);
                delete j[i]
            }, h || 100)
        }
    };
    c.docReady = function(e) {
        if (document.readyState == "complete") {
            e()
        } else {
            document.addEventListener("DOMContentLoaded", e)
        }
    };
    c.toDashed = function(e) {
        return e.replace(/(.)([A-Z])/g, function(h, f, g) {
            return f + "-" + g
        }).toLowerCase()
    };
    var a = d.console;
    c.htmlInit = function(f, e) {
        c.docReady(function() {
            var g = c.toDashed(e);
            var h = "data-" + g;
            var i = document.querySelectorAll("[" + h + "]");
            var m = document.querySelectorAll(".js-" + g);
            var k = c.makeArray(i).concat(c.makeArray(m));
            var j = h + "-options";
            var l = d.jQuery;
            k.forEach(function(o) {
                var n = o.getAttribute(h) || o.getAttribute(j);
                var r;
                try {
                    r = n && JSON.parse(n)
                } catch (p) {
                    if (a) {
                        a.error("Error parsing " + h + " on " + o.className + ": " + p)
                    }
                    return
                }
                var q = new f(o, r);
                if (l) {
                    l.data(o, e, q)
                }
            })
        })
    };
    return c
}));
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], function(c, d) {
            return a(b, c, d)
        })
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a(b, require("ev-emitter"), require("get-size"))
        } else {
            b.Outlayer = {};
            b.Outlayer.Item = a(b, b.EvEmitter, b.getSize)
        }
    }
}(window, function factory(o, d, e) {
    function f(p) {
        for (var q in p) {
            return false
        }
        q = null;
        return true
    }
    var c = document.documentElement.style;
    var l = typeof c.transition == "string" ? "transition" : "WebkitTransition";
    var j = typeof c.transform == "string" ? "transform" : "WebkitTransform";
    var k = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[l];
    var n = [j, l, l + "Duration", l + "Property"];

    function g(p, q) {
        if (!p) {
            return
        }
        this.element = p;
        this.layout = q;
        this.position = {
            x: 0,
            y: 0
        };
        this._create()
    }
    var h = g.prototype = Object.create(d.prototype);
    h.constructor = g;
    h._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        };
        this.css({
            position: "absolute"
        })
    };
    h.handleEvent = function(p) {
        var q = "on" + p.type;
        if (this[q]) {
            this[q](p)
        }
    };
    h.getSize = function() {
        this.size = e(this.element)
    };
    h.css = function(r) {
        var p = this.element.style;
        for (var q in r) {
            var s = n[q] || q;
            p[s] = r[q]
        }
    };
    h.getPosition = function() {
        var s = getComputedStyle(this.element);
        var p = this.layout._getOption("originLeft");
        var q = this.layout._getOption("originTop");
        var u = s[p ? "left" : "right"];
        var w = s[q ? "top" : "bottom"];
        var r = this.layout.size;
        var t = u.indexOf("%") != -1 ? (parseFloat(u) / 100) * r.width : parseInt(u, 10);
        var v = w.indexOf("%") != -1 ? (parseFloat(w) / 100) * r.height : parseInt(w, 10);
        t = isNaN(t) ? 0 : t;
        v = isNaN(v) ? 0 : v;
        t -= p ? r.paddingLeft : r.paddingRight;
        v -= q ? r.paddingTop : r.paddingBottom;
        this.position.x = t;
        this.position.y = v
    };
    h.layoutPosition = function() {
        var r = this.layout.size;
        var s = {};
        var p = this.layout._getOption("originLeft");
        var q = this.layout._getOption("originTop");
        var u = p ? "paddingLeft" : "paddingRight";
        var v = p ? "left" : "right";
        var w = p ? "right" : "left";
        var t = this.position.x + r[u];
        s[v] = this.getXValue(t);
        s[w] = "";
        var A = q ? "paddingTop" : "paddingBottom";
        var B = q ? "top" : "bottom";
        var C = q ? "bottom" : "top";
        var z = this.position.y + r[A];
        s[B] = this.getYValue(z);
        s[C] = "";
        this.css(s);
        this.emitEvent("layout", [this])
    };
    h.getXValue = function(q) {
        var p = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !p ? ((q / this.layout.size.width) * 100) + "%" : q + "px"
    };
    h.getYValue = function(q) {
        var p = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && p ? ((q / this.layout.size.height) * 100) + "%" : q + "px"
    };
    h._transitionTo = function(z, A) {
        this.getPosition();
        var r = this.position.x;
        var s = this.position.y;
        var p = parseInt(z, 10);
        var q = parseInt(A, 10);
        var t = p === this.position.x && q === this.position.y;
        this.setPosition(z, A);
        if (t && !this.isTransitioning) {
            this.layoutPosition();
            return
        }
        var v = z - r;
        var w = A - s;
        var u = {};
        u.transform = this.getTranslate(v, w);
        this.transition({
            to: u,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: true
        })
    };
    h.getTranslate = function(r, s) {
        var p = this.layout._getOption("originLeft");
        var q = this.layout._getOption("originTop");
        r = p ? r : -r;
        s = q ? s : -s;
        return "translate3d(" + r + "px, " + s + "px, 0)"
    };
    h.goTo = function(p, q) {
        this.setPosition(p, q);
        this.layoutPosition()
    };
    h.moveTo = h._transitionTo;
    h.setPosition = function(p, q) {
        this.position.x = parseInt(p, 10);
        this.position.y = parseInt(q, 10)
    };
    h._nonTransition = function(p) {
        this.css(p.to);
        if (p.isCleaning) {
            this._removeStyles(p.to)
        }
        for (var q in p.onTransitionEnd) {
            p.onTransitionEnd[q].call(this)
        }
    };
    h._transition = function(q) {
        if (!parseFloat(this.layout.options.transitionDuration)) {
            this._nonTransition(q);
            return
        }
        var p = this._transn;
        for (var s in q.onTransitionEnd) {
            p.onEnd[s] = q.onTransitionEnd[s]
        }
        for (s in q.to) {
            p.ingProperties[s] = true;
            if (q.isCleaning) {
                p.clean[s] = true
            }
        }
        if (q.from) {
            this.css(q.from);
            var r = this.element.offsetHeight;
            r = null
        }
        this.enableTransition(q.to);
        this.css(q.to);
        this.isTransitioning = true
    };

    function i(p) {
        return p.replace(/([A-Z])/g, function(q) {
            return "-" + q.toLowerCase()
        })
    }
    var m = "opacity," + i(n.transform || "transform");
    h.enableTransition = function() {
        if (this.isTransitioning) {
            return
        }
        this.css({
            transitionProperty: m,
            transitionDuration: this.layout.options.transitionDuration
        });
        this.element.addEventListener(k, this, false)
    };
    h.transition = g.prototype[l ? "_transition" : "_nonTransition"];
    h.onwebkitTransitionEnd = function(p) {
        this.ontransitionend(p)
    };
    h.onotransitionend = function(p) {
        this.ontransitionend(p)
    };
    var b = {
        "-webkit-transform": "transform"
    };
    h.ontransitionend = function(q) {
        if (q.target !== this.element) {
            return
        }
        var p = this._transn;
        var s = b[q.propertyName] || q.propertyName;
        delete p.ingProperties[s];
        if (f(p.ingProperties)) {
            this.disableTransition()
        }
        if (s in p.clean) {
            this.element.style[q.propertyName] = "";
            delete p.clean[s]
        }
        if (s in p.onEnd) {
            var r = p.onEnd[s];
            r.call(this);
            delete p.onEnd[s]
        }
        this.emitEvent("transitionEnd", [this])
    };
    h.disableTransition = function() {
        this.removeTransitionStyles();
        this.element.removeEventListener(k, this, false);
        this.isTransitioning = false
    };
    h._removeStyles = function(r) {
        var p = {};
        for (var q in r) {
            p[q] = ""
        }
        this.css(p)
    };
    var a = {
        transitionProperty: "",
        transitionDuration: ""
    };
    h.removeTransitionStyles = function() {
        this.css(a)
    };
    h.removeElem = function() {
        this.element.parentNode.removeChild(this.element);
        this.css({
            display: ""
        });
        this.emitEvent("remove", [this])
    };
    h.remove = function() {
        if (!l || !parseFloat(this.layout.options.transitionDuration)) {
            this.removeElem();
            return
        }
        this.once("transitionEnd", function() {
            this.removeElem()
        });
        this.hide()
    };
    h.reveal = function() {
        delete this.isHidden;
        this.css({
            display: ""
        });
        var q = this.layout.options;
        var p = {};
        var r = this.getHideRevealTransitionEndProperty("visibleStyle");
        p[r] = this.onRevealTransitionEnd;
        this.transition({
            from: q.hiddenStyle,
            to: q.visibleStyle,
            isCleaning: true,
            onTransitionEnd: p
        })
    };
    h.onRevealTransitionEnd = function() {
        if (!this.isHidden) {
            this.emitEvent("reveal")
        }
    };
    h.getHideRevealTransitionEndProperty = function(r) {
        var p = this.layout.options[r];
        if (p.opacity) {
            return "opacity"
        }
        for (var q in p) {
            return q
        }
    };
    h.hide = function() {
        this.isHidden = true;
        this.css({
            display: ""
        });
        var q = this.layout.options;
        var p = {};
        var r = this.getHideRevealTransitionEndProperty("hiddenStyle");
        p[r] = this.onHideTransitionEnd;
        this.transition({
            from: q.visibleStyle,
            to: q.hiddenStyle,
            isCleaning: true,
            onTransitionEnd: p
        })
    };
    h.onHideTransitionEnd = function() {
        if (this.isHidden) {
            this.css({
                display: "none"
            });
            this.emitEvent("hide")
        }
    };
    h.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    };
    return g
}));
/*
 * Outlayer v2.0.0
 * the brains and guts of a layout library
 * MIT license
 */
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(c, d, f, e) {
            return a(b, c, d, f, e)
        })
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a(b, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item"))
        } else {
            b.Outlayer = a(b, b.EvEmitter, b.getSize, b.fizzyUIUtils, b.Outlayer.Item)
        }
    }
}(window, function factory(m, b, c, l, f) {
    var a = m.console;
    var g = m.jQuery;
    var h = function() {};
    var d = 0;
    var e = {};

    function i(n, q) {
        var r = l.getQueryElement(n);
        if (!r) {
            if (a) {
                a.error("Bad element for " + this.constructor.namespace + ": " + (r || n))
            }
            return
        }
        this.element = r;
        if (g) {
            this.$element = g(this.element)
        }
        this.options = l.extend({}, this.constructor.defaults);
        this.option(q);
        var o = ++d;
        this.element.outlayerGUID = o;
        e[o] = this;
        this._create();
        var p = this._getOption("initLayout");
        if (p) {
            this.layout()
        }
    }
    i.namespace = "outlayer";
    i.Item = f;
    i.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: true,
        originLeft: true,
        originTop: true,
        resize: true,
        resizeContainer: true,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var j = i.prototype;
    l.extend(j, b.prototype);
    j.option = function(n) {
        l.extend(this.options, n)
    };
    j._getOption = function(o) {
        var n = this.constructor.compatOptions[o];
        return n && this.options[n] !== undefined ? this.options[n] : this.options[o]
    };
    i.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    };
    j._create = function() {
        this.reloadItems();
        this.stamps = [];
        this.stamp(this.options.stamp);
        l.extend(this.element.style, this.options.containerStyle);
        var n = this._getOption("resize");
        if (n) {
            this.bindResize()
        }
    };
    j.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    };
    j._itemize = function(o) {
        var s = this._filterFindItemElements(o);
        var r = this.constructor.Item;
        var t = [];
        for (var p = 0; p < s.length; p++) {
            var n = s[p];
            var q = new r(n, this);
            t.push(q)
        }
        return t
    };
    j._filterFindItemElements = function(n) {
        return l.filterFindElements(n, this.options.itemSelector)
    };
    j.getItemElements = function() {
        return this.items.map(function(n) {
            return n.element
        })
    };
    j.layout = function() {
        this._resetLayout();
        this._manageStamps();
        var o = this._getOption("layoutInstant");
        var n = o !== undefined ? o : !this._isLayoutInited;
        this.layoutItems(this.items, n);
        this._isLayoutInited = true
    };
    j._init = j.layout;
    j._resetLayout = function() {
        this.getSize()
    };
    j.getSize = function() {
        this.size = c(this.element)
    };
    j._getMeasurement = function(o, q) {
        var p = this.options[o];
        var n;
        if (!p) {
            this[o] = 0
        } else {
            if (typeof p == "string") {
                n = this.element.querySelector(p)
            } else {
                if (p instanceof HTMLElement) {
                    n = p
                }
            }
            this[o] = n ? c(n)[q] : p
        }
    };
    j.layoutItems = function(o, n) {
        o = this._getItemsForLayout(o);
        this._layoutItems(o, n);
        this._postLayout()
    };
    j._getItemsForLayout = function(n) {
        return n.filter(function(o) {
            return !o.isIgnored
        })
    };
    j._layoutItems = function(o, n) {
        this._emitCompleteOnItems("layout", o);
        if (!o || !o.length) {
            return
        }
        var p = [];
        o.forEach(function(q) {
            var r = this._getItemLayoutPosition(q);
            r.item = q;
            r.isInstant = n || q.isLayoutInstant;
            p.push(r)
        }, this);
        this._processLayoutQueue(p)
    };
    j._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    };
    j._processLayoutQueue = function(n) {
        n.forEach(function(o) {
            this._positionItem(o.item, o.x, o.y, o.isInstant)
        }, this)
    };
    j._positionItem = function(o, p, q, n) {
        if (n) {
            o.goTo(p, q)
        } else {
            o.moveTo(p, q)
        }
    };
    j._postLayout = function() {
        this.resizeContainer()
    };
    j.resizeContainer = function() {
        var n = this._getOption("resizeContainer");
        if (!n) {
            return
        }
        var o = this._getContainerSize();
        if (o) {
            this._setContainerMeasure(o.width, true);
            this._setContainerMeasure(o.height, false)
        }
    };
    j._getContainerSize = h;
    j._setContainerMeasure = function(p, o) {
        if (p === undefined) {
            return
        }
        var n = this.size;
        if (n.isBorderBox) {
            p += o ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth
        }
        p = Math.max(p, 0);
        this.element.style[o ? "width" : "height"] = p + "px"
    };
    j._emitCompleteOnItems = function(q, r) {
        var n = this;

        function s() {
            n.dispatchEvent(q + "Complete", null, [r])
        }
        var o = r.length;
        if (!r || !o) {
            s();
            return
        }
        var p = 0;

        function t() {
            p++;
            if (p == o) {
                s()
            }
        }
        r.forEach(function(u) {
            u.once(q, t)
        })
    };
    j.dispatchEvent = function(r, q, o) {
        var p = q ? [q].concat(o) : o;
        this.emitEvent(r, p);
        if (g) {
            this.$element = this.$element || g(this.element);
            if (q) {
                var n = g.Event(q);
                n.type = r;
                this.$element.trigger(n, o)
            } else {
                this.$element.trigger(r, o)
            }
        }
    };
    j.ignore = function(n) {
        var o = this.getItem(n);
        if (o) {
            o.isIgnored = true
        }
    };
    j.unignore = function(n) {
        var o = this.getItem(n);
        if (o) {
            delete o.isIgnored
        }
    };
    j.stamp = function(n) {
        n = this._find(n);
        if (!n) {
            return
        }
        this.stamps = this.stamps.concat(n);
        n.forEach(this.ignore, this)
    };
    j.unstamp = function(n) {
        n = this._find(n);
        if (!n) {
            return
        }
        n.forEach(function(o) {
            l.removeFrom(this.stamps, o);
            this.unignore(o)
        }, this)
    };
    j._find = function(n) {
        if (!n) {
            return
        }
        if (typeof n == "string") {
            n = this.element.querySelectorAll(n)
        }
        n = l.makeArray(n);
        return n
    };
    j._manageStamps = function() {
        if (!this.stamps || !this.stamps.length) {
            return
        }
        this._getBoundingRect();
        this.stamps.forEach(this._manageStamp, this)
    };
    j._getBoundingRect = function() {
        var n = this.element.getBoundingClientRect();
        var o = this.size;
        this._boundingRect = {
            left: n.left + o.paddingLeft + o.borderLeftWidth,
            top: n.top + o.paddingTop + o.borderTopWidth,
            right: n.right - (o.paddingRight + o.borderRightWidth),
            bottom: n.bottom - (o.paddingBottom + o.borderBottomWidth)
        }
    };
    j._manageStamp = h;
    j._getElementOffset = function(o) {
        var n = o.getBoundingClientRect();
        var r = this._boundingRect;
        var q = c(o);
        var p = {
            left: n.left - r.left - q.marginLeft,
            top: n.top - r.top - q.marginTop,
            right: r.right - n.right - q.marginRight,
            bottom: r.bottom - n.bottom - q.marginBottom
        };
        return p
    };
    j.handleEvent = l.handleEvent;
    j.bindResize = function() {
        m.addEventListener("resize", this);
        this.isResizeBound = true
    };
    j.unbindResize = function() {
        m.removeEventListener("resize", this);
        this.isResizeBound = false
    };
    j.onresize = function() {
        this.resize()
    };
    l.debounceMethod(i, "onresize", 100);
    j.resize = function() {
        if (!this.isResizeBound || !this.needsResizeLayout()) {
            return
        }
        this.layout()
    };
    j.needsResizeLayout = function() {
        var o = c(this.element);
        var n = this.size && o;
        return n && o.innerWidth !== this.size.innerWidth
    };
    j.addItems = function(n) {
        var o = this._itemize(n);
        if (o.length) {
            this.items = this.items.concat(o)
        }
        return o
    };
    j.appended = function(n) {
        var o = this.addItems(n);
        if (!o.length) {
            return
        }
        this.layoutItems(o, true);
        this.reveal(o)
    };
    j.prepended = function(n) {
        var o = this._itemize(n);
        if (!o.length) {
            return
        }
        var p = this.items.slice(0);
        this.items = o.concat(p);
        this._resetLayout();
        this._manageStamps();
        this.layoutItems(o, true);
        this.reveal(o);
        this.layoutItems(p)
    };
    j.reveal = function(n) {
        this._emitCompleteOnItems("reveal", n);
        if (!n || !n.length) {
            return
        }
        n.forEach(function(o) {
            o.reveal()
        })
    };
    j.hide = function(n) {
        this._emitCompleteOnItems("hide", n);
        if (!n || !n.length) {
            return
        }
        n.forEach(function(o) {
            o.hide()
        })
    };
    j.revealItemElements = function(n) {
        var o = this.getItems(n);
        this.reveal(o)
    };
    j.hideItemElements = function(n) {
        var o = this.getItems(n);
        this.hide(o)
    };
    j.getItem = function(n) {
        for (var o = 0; o < this.items.length; o++) {
            var p = this.items[o];
            if (p.element == n) {
                return p
            }
        }
    };
    j.getItems = function(n) {
        n = l.makeArray(n);
        var o = [];
        n.forEach(function(p) {
            var q = this.getItem(p);
            if (q) {
                o.push(q)
            }
        }, this);
        return o
    };
    j.remove = function(n) {
        var o = this.getItems(n);
        this._emitCompleteOnItems("remove", o);
        if (!o || !o.length) {
            return
        }
        o.forEach(function(p) {
            p.remove();
            l.removeFrom(this.items, p)
        }, this)
    };
    j.destroy = function() {
        var o = this.element.style;
        o.height = "";
        o.position = "";
        o.width = "";
        this.items.forEach(function(p) {
            p.destroy()
        });
        this.unbindResize();
        var n = this.element.outlayerGUID;
        delete e[n];
        delete this.element.outlayerGUID;
        if (g) {
            g.removeData(this.element, this.constructor.namespace)
        }
    };
    i.data = function(n) {
        n = l.getQueryElement(n);
        var o = n && n.outlayerGUID;
        return o && e[o]
    };
    i.create = function(o, p) {
        var n = k(i);
        n.defaults = l.extend({}, i.defaults);
        l.extend(n.defaults, p);
        n.compatOptions = l.extend({}, i.compatOptions);
        n.namespace = o;
        n.data = i.data;
        n.Item = k(f);
        l.htmlInit(n, o);
        if (g && g.bridget) {
            g.bridget(o, n)
        }
        return n
    };

    function k(n) {
        function o() {
            n.apply(this, arguments)
        }
        o.prototype = Object.create(n.prototype);
        o.prototype.constructor = o;
        return o
    }
    i.Item = f;
    return i
}));
/*
 * Masonry v4.0.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define(["outlayer/outlayer", "get-size/get-size"], a)
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a(require("outlayer"), require("get-size"))
        } else {
            b.Masonry = a(b.Outlayer, b.getSize)
        }
    }
}(window, function factory(c, a) {
    var b = c.create("masonry");
    b.compatOptions.fitWidth = "isFitWidth";
    b.prototype._resetLayout = function() {
        this.getSize();
        this._getMeasurement("columnWidth", "outerWidth");
        this._getMeasurement("gutter", "outerWidth");
        this.measureColumns();
        this.colYs = [];
        for (var d = 0; d < this.cols; d++) {
            this.colYs.push(0)
        }
        this.maxY = 0
    };
    b.prototype.measureColumns = function() {
        this.getContainerWidth();
        if (!this.columnWidth) {
            var h = this.items[0];
            var i = h && h.element;
            this.columnWidth = i && a(i).outerWidth || this.containerWidth
        }
        var e = this.columnWidth += this.gutter;
        var f = this.containerWidth + this.gutter;
        var d = f / e;
        var g = e - f % e;
        var j = g && g < 1 ? "round" : "floor";
        d = Math[j](d);
        this.cols = Math.max(d, 1)
    };
    b.prototype.getContainerWidth = function() {
        var e = this._getOption("fitWidth");
        var d = e ? this.element.parentNode : this.element;
        var f = a(d);
        this.containerWidth = f && f.innerWidth
    };
    b.prototype._getItemLayoutPosition = function(g) {
        g.getSize();
        var l = g.size.outerWidth % this.columnWidth;
        var h = l && l < 1 ? "round" : "ceil";
        var e = Math[h](g.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        var d = this._getColGroup(e);
        var j = Math.min.apply(Math, d);
        var o = d.indexOf(j);
        var k = {
            x: this.columnWidth * o,
            y: j
        };
        var m = j + g.size.outerHeight;
        var n = this.cols + 1 - d.length;
        for (var f = 0; f < n; f++) {
            this.colYs[o + f] = m
        }
        return k
    };
    b.prototype._getColGroup = function(e) {
        if (e < 2) {
            return this.colYs
        }
        var d = [];
        var g = this.cols + 1 - e;
        for (var h = 0; h < g; h++) {
            var f = this.colYs.slice(h, h + e);
            d[h] = Math.max.apply(Math, f)
        }
        return d
    };
    b.prototype._manageStamp = function(m) {
        var o = a(m);
        var l = this._getElementOffset(m);
        var g = this._getOption("originLeft");
        var e = g ? l.left : l.right;
        var k = e + o.outerWidth;
        var d = Math.floor(e / this.columnWidth);
        d = Math.max(0, d);
        var j = Math.floor(k / this.columnWidth);
        j -= k % this.columnWidth ? 0 : 1;
        j = Math.min(this.cols - 1, j);
        var h = this._getOption("originTop");
        var n = (h ? l.top : l.bottom) + o.outerHeight;
        for (var f = d; f <= j; f++) {
            this.colYs[f] = Math.max(n, this.colYs[f])
        }
    };
    b.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var d = {
            height: this.maxY
        };
        if (this._getOption("fitWidth")) {
            d.width = this._getContainerFitWidth()
        }
        return d
    };
    b.prototype._getContainerFitWidth = function() {
        var e = 0;
        var d = this.cols;
        while (--d) {
            if (this.colYs[d] !== 0) {
                break
            }
            e++
        }
        return (this.cols - e) * this.columnWidth - this.gutter
    };
    b.prototype.needsResizeLayout = function() {
        var d = this.containerWidth;
        this.getContainerWidth();
        return d != this.containerWidth
    };
    return b
}));