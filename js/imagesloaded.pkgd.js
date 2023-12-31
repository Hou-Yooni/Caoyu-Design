/*
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
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
 * imagesLoaded v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(b, a) {
    if (typeof define == "function" && define.amd) {
        define(["ev-emitter/ev-emitter"], function(c) {
            return a(b, c)
        })
    } else {
        if (typeof module == "object" && module.exports) {
            module.exports = a(b, require("ev-emitter"))
        } else {
            b.imagesLoaded = a(b, b.EvEmitter)
        }
    }
})(window, function factory(j, e) {
    var a = j.jQuery;
    var c = j.console;

    function f(k, l) {
        for (var m in l) {
            k[m] = l[m]
        }
        return k
    }

    function i(m) {
        var k = [];
        if (Array.isArray(m)) {
            k = m
        } else {
            if (typeof m.length == "number") {
                for (var l = 0; l < m.length; l++) {
                    k.push(m[l])
                }
            } else {
                k.push(m)
            }
        }
        return k
    }

    function g(k, m, l) {
        if (!(this instanceof g)) {
            return new g(k, m, l)
        }
        if (typeof k == "string") {
            k = document.querySelectorAll(k)
        }
        this.elements = i(k);
        this.options = f({}, this.options);
        if (typeof m == "function") {
            l = m
        } else {
            f(this.options, m)
        }
        if (l) {
            this.on("always", l)
        }
        this.getImages();
        if (a) {
            this.jqDeferred = new a.Deferred()
        }
        setTimeout(function() {
            this.check()
        }.bind(this))
    }
    g.prototype = Object.create(e.prototype);
    g.prototype.options = {};
    g.prototype.getImages = function() {
        this.images = [];
        this.elements.forEach(this.addElementImages, this)
    };
    g.prototype.addElementImages = function(n) {
        if (n.nodeName == "IMG") {
            this.addImage(n)
        }
        if (this.options.background === true) {
            this.addElementBackgroundImages(n)
        }
        var q = n.nodeType;
        if (!q || !d[q]) {
            return
        }
        var l = n.querySelectorAll("img");
        for (var o = 0; o < l.length; o++) {
            var p = l[o];
            this.addImage(p)
        }
        if (typeof this.options.background == "string") {
            var m = n.querySelectorAll(this.options.background);
            for (o = 0; o < m.length; o++) {
                var k = m[o];
                this.addElementBackgroundImages(k)
            }
        }
    };
    var d = {
        1: true,
        9: true,
        11: true
    };
    g.prototype.addElementBackgroundImages = function(k) {
        var n = getComputedStyle(k);
        if (!n) {
            return
        }
        var m = /url\((['"])?(.*?)\1\)/gi;
        var l = m.exec(n.backgroundImage);
        while (l !== null) {
            var o = l && l[2];
            if (o) {
                this.addBackground(o, k)
            }
            l = m.exec(n.backgroundImage)
        }
    };
    g.prototype.addImage = function(k) {
        var l = new h(k);
        this.images.push(l)
    };
    g.prototype.addBackground = function(m, l) {
        var k = new b(m, l);
        this.images.push(k)
    };
    g.prototype.check = function() {
        var k = this;
        this.progressedCount = 0;
        this.hasAnyBroken = false;
        if (!this.images.length) {
            this.complete();
            return
        }

        function l(n, m, o) {
            setTimeout(function() {
                k.progress(n, m, o)
            })
        }
        this.images.forEach(function(m) {
            m.once("progress", l);
            m.check()
        })
    };
    g.prototype.progress = function(l, k, m) {
        this.progressedCount++;
        this.hasAnyBroken = this.hasAnyBroken || !l.isLoaded;
        this.emitEvent("progress", [this, l, k]);
        if (this.jqDeferred && this.jqDeferred.notify) {
            this.jqDeferred.notify(this, l)
        }
        if (this.progressedCount == this.images.length) {
            this.complete()
        }
        if (this.options.debug && c) {
            c.log("progress: " + m, l, k)
        }
    };
    g.prototype.complete = function() {
        var k = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = true;
        this.emitEvent(k, [this]);
        this.emitEvent("always", [this]);
        if (this.jqDeferred) {
            var l = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[l](this)
        }
    };

    function h(k) {
        this.img = k
    }
    h.prototype = Object.create(e.prototype);
    h.prototype.check = function() {
        var k = this.getIsImageComplete();
        if (k) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            return
        }
        this.proxyImage = new Image();
        this.proxyImage.addEventListener("load", this);
        this.proxyImage.addEventListener("error", this);
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.proxyImage.src = this.img.src
    };
    h.prototype.getIsImageComplete = function() {
        return this.img.complete && this.img.naturalWidth !== undefined
    };
    h.prototype.confirm = function(k, l) {
        this.isLoaded = k;
        this.emitEvent("progress", [this, this.img, l])
    };
    h.prototype.handleEvent = function(k) {
        var l = "on" + k.type;
        if (this[l]) {
            this[l](k)
        }
    };
    h.prototype.onload = function() {
        this.confirm(true, "onload");
        this.unbindEvents()
    };
    h.prototype.onerror = function() {
        this.confirm(false, "onerror");
        this.unbindEvents()
    };
    h.prototype.unbindEvents = function() {
        this.proxyImage.removeEventListener("load", this);
        this.proxyImage.removeEventListener("error", this);
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this)
    };

    function b(l, k) {
        this.url = l;
        this.element = k;
        this.img = new Image()
    }
    b.prototype = Object.create(h.prototype);
    b.prototype.check = function() {
        this.img.addEventListener("load", this);
        this.img.addEventListener("error", this);
        this.img.src = this.url;
        var k = this.getIsImageComplete();
        if (k) {
            this.confirm(this.img.naturalWidth !== 0, "naturalWidth");
            this.unbindEvents()
        }
    };
    b.prototype.unbindEvents = function() {
        this.img.removeEventListener("load", this);
        this.img.removeEventListener("error", this)
    };
    b.prototype.confirm = function(k, l) {
        this.isLoaded = k;
        this.emitEvent("progress", [this, this.element, l])
    };
    g.makeJQueryPlugin = function(k) {
        k = k || j.jQuery;
        if (!k) {
            return
        }
        a = k;
        a.fn.imagesLoaded = function(n, l) {
            var m = new g(this, n, l);
            return m.jqDeferred.promise(a(this))
        }
    };
    g.makeJQueryPlugin();
    return g
});