/* Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (typeof exports === "object") {
            a(require("jquery"))
        } else {
            a(window.jQuery || window.Zepto)
        }
    }
}(function(a) {
    var F = "Close",
        D = "BeforeClose",
        A = "AfterClose",
        C = "BeforeAppend",
        M = "MarkupParse",
        P = "Open",
        E = "Change",
        O = "mfp",
        G = "." + O,
        R = "mfp-ready",
        S = "mfp-removing",
        Q = "mfp-prevent-close";
    var N, L = function() {},
        p = !!(window.jQuery),
        u, y = a(window),
        f, t, z, d;
    var r = function(W, V) {
            N.ev.on(O + W + G, V)
        },
        j = function(W, V, Y, Z) {
            var X = document.createElement("div");
            X.className = "mfp-" + W;
            if (Y) {
                X.innerHTML = Y
            }
            if (!Z) {
                X = a(X);
                if (V) {
                    X.appendTo(V)
                }
            } else {
                if (V) {
                    V.appendChild(X)
                }
            }
            return X
        },
        s = function(W, V) {
            N.ev.triggerHandler(O + W, V);
            if (N.st.callbacks) {
                W = W.charAt(0).toLowerCase() + W.slice(1);
                if (N.st.callbacks[W]) {
                    N.st.callbacks[W].apply(N, a.isArray(V) ? V : [V])
                }
            }
        },
        i = function(V) {
            if (V !== d || !N.currTemplate.closeBtn) {
                N.currTemplate.closeBtn = a(N.st.closeMarkup.replace("%title%", N.st.tClose));
                d = V
            }
            return N.currTemplate.closeBtn
        },
        c = function() {
            if (!a.magnificPopup.instance) {
                N = new L();
                N.init();
                a.magnificPopup.instance = N
            }
        },
        U = function() {
            var V = document.createElement("p").style,
                W = ["ms", "O", "Moz", "Webkit"];
            if (V.transition !== undefined) {
                return true
            }
            while (W.length) {
                if (W.pop() + "Transition" in V) {
                    return true
                }
            }
            return false
        };
    L.prototype = {
        constructor: L,
        init: function() {
            var V = navigator.appVersion;
            N.isLowIE = N.isIE8 = document.all && !document.addEventListener;
            N.isAndroid = (/android/gi).test(V);
            N.isIOS = (/iphone|ipad|ipod/gi).test(V);
            N.supportsTransition = U();
            N.probablyMobile = (N.isAndroid || N.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent));
            f = a(document);
            N.popupsCache = {}
        },
        open: function(W) {
            var X;
            if (W.isObj === false) {
                N.items = W.items.toArray();
                N.index = 0;
                var Z = W.items,
                    Y;
                for (X = 0; X < Z.length; X++) {
                    Y = Z[X];
                    if (Y.parsed) {
                        Y = Y.el[0]
                    }
                    if (Y === W.el[0]) {
                        N.index = X;
                        break
                    }
                }
            } else {
                N.items = a.isArray(W.items) ? W.items : [W.items];
                N.index = W.index || 0
            }
            if (N.isOpen) {
                N.updateItemHTML();
                return
            }
            N.types = [];
            z = "";
            if (W.mainEl && W.mainEl.length) {
                N.ev = W.mainEl.eq(0)
            } else {
                N.ev = f
            }
            if (W.key) {
                if (!N.popupsCache[W.key]) {
                    N.popupsCache[W.key] = {}
                }
                N.currTemplate = N.popupsCache[W.key]
            } else {
                N.currTemplate = {}
            }
            N.st = a.extend(true, {}, a.magnificPopup.defaults, W);
            N.fixedContentPos = N.st.fixedContentPos === "auto" ? !N.probablyMobile : N.st.fixedContentPos;
            if (N.st.modal) {
                N.st.closeOnContentClick = false;
                N.st.closeOnBgClick = false;
                N.st.showCloseBtn = false;
                N.st.enableEscapeKey = false
            }
            if (!N.bgOverlay) {
                N.bgOverlay = j("bg").on("click" + G, function() {
                    N.close()
                });
                N.wrap = j("wrap").attr("tabindex", -1).on("click" + G, function(af) {
                    if (N._checkIfClose(af.target)) {
                        N.close()
                    }
                });
                N.container = j("container", N.wrap)
            }
            N.contentContainer = j("content");
            if (N.st.preloader) {
                N.preloader = j("preloader", N.container, N.st.tLoading)
            }
            var aa = a.magnificPopup.modules;
            for (X = 0; X < aa.length; X++) {
                var ab = aa[X];
                ab = ab.charAt(0).toUpperCase() + ab.slice(1);
                N["init" + ab].call(N)
            }
            s("BeforeOpen");
            if (N.st.showCloseBtn) {
                if (!N.st.closeBtnInside) {
                    N.wrap.append(i())
                } else {
                    r(M, function(af, ah, ai, ag) {
                        ai.close_replaceWith = i(ag.type)
                    });
                    z += " mfp-close-btn-in"
                }
            }
            if (N.st.alignTop) {
                z += " mfp-align-top"
            }
            if (N.fixedContentPos) {
                N.wrap.css({
                    overflow: N.st.overflowY,
                    overflowX: "hidden",
                    overflowY: N.st.overflowY
                })
            } else {
                N.wrap.css({
                    top: y.scrollTop(),
                    position: "absolute"
                })
            }
            if (N.st.fixedBgPos === false || (N.st.fixedBgPos === "auto" && !N.fixedContentPos)) {
                N.bgOverlay.css({
                    height: f.height(),
                    position: "absolute"
                })
            }
            if (N.st.enableEscapeKey) {
                f.on("keyup" + G, function(af) {
                    if (af.keyCode === 27) {
                        N.close()
                    }
                })
            }
            y.on("resize" + G, function() {
                N.updateSize()
            });
            if (!N.st.closeOnContentClick) {
                z += " mfp-auto-cursor"
            }
            if (z) {
                N.wrap.addClass(z)
            }
            var ad = N.wH = y.height();
            var ae = {};
            if (N.fixedContentPos) {
                if (N._hasScrollBar(ad)) {
                    var ac = N._getScrollbarSize();
                    if (ac) {
                        ae.marginRight = ac
                    }
                }
            }
            if (N.fixedContentPos) {
                if (!N.isIE7) {
                    ae.overflow = "hidden"
                } else {
                    a("body, html").css("overflow", "hidden")
                }
            }
            var V = N.st.mainClass;
            if (N.isIE7) {
                V += " mfp-ie7"
            }
            if (V) {
                N._addClassToMFP(V)
            }
            N.updateItemHTML();
            s("BuildControls");
            a("html").css(ae);
            N.bgOverlay.add(N.wrap).prependTo(N.st.prependTo || a(document.body));
            N._lastFocusedEl = document.activeElement;
            setTimeout(function() {
                if (N.content) {
                    N._addClassToMFP(R);
                    N._setFocus()
                } else {
                    N.bgOverlay.addClass(R)
                }
                f.on("focusin" + G, N._onFocusIn)
            }, 16);
            N.isOpen = true;
            N.updateSize(ad);
            s(P);
            return W
        },
        close: function() {
            if (!N.isOpen) {
                return
            }
            s(D);
            N.isOpen = false;
            if (N.st.removalDelay && !N.isLowIE && N.supportsTransition) {
                N._addClassToMFP(S);
                setTimeout(function() {
                    N._close()
                }, N.st.removalDelay)
            } else {
                N._close()
            }
        },
        _close: function() {
            s(F);
            var V = S + " " + R + " ";
            N.bgOverlay.detach();
            N.wrap.detach();
            N.container.empty();
            if (N.st.mainClass) {
                V += N.st.mainClass + " "
            }
            N._removeClassFromMFP(V);
            if (N.fixedContentPos) {
                var W = {
                    marginRight: ""
                };
                if (N.isIE7) {
                    a("body, html").css("overflow", "")
                } else {
                    W.overflow = ""
                }
                a("html").css(W)
            }
            f.off("keyup" + G + " focusin" + G);
            N.ev.off(G);
            N.wrap.attr("class", "mfp-wrap").removeAttr("style");
            N.bgOverlay.attr("class", "mfp-bg");
            N.container.attr("class", "mfp-container");
            if (N.st.showCloseBtn && (!N.st.closeBtnInside || N.currTemplate[N.currItem.type] === true)) {
                if (N.currTemplate.closeBtn) {
                    N.currTemplate.closeBtn.detach()
                }
            }
            if (N.st.autoFocusLast && N._lastFocusedEl) {
                a(N._lastFocusedEl).focus()
            }
            N.currItem = null;
            N.content = null;
            N.currTemplate = null;
            N.prevHeight = 0;
            s(A)
        },
        updateSize: function(W) {
            if (N.isIOS) {
                var X = document.documentElement.clientWidth / window.innerWidth;
                var V = window.innerHeight * X;
                N.wrap.css("height", V);
                N.wH = V
            } else {
                N.wH = W || y.height()
            }
            if (!N.fixedContentPos) {
                N.wrap.css("height", N.wH)
            }
            s("Resize")
        },
        updateItemHTML: function() {
            var V = N.items[N.index];
            N.contentContainer.detach();
            if (N.content) {
                N.content.detach()
            }
            if (!V.parsed) {
                V = N.parseEl(N.index)
            }
            var Y = V.type;
            s("BeforeChange", [N.currItem ? N.currItem.type : "", Y]);
            N.currItem = V;
            if (!N.currTemplate[Y]) {
                var W = N.st[Y] ? N.st[Y].markup : false;
                s("FirstMarkupParse", W);
                if (W) {
                    N.currTemplate[Y] = a(W)
                } else {
                    N.currTemplate[Y] = true
                }
            }
            if (t && t !== V.type) {
                N.container.removeClass("mfp-" + t + "-holder")
            }
            var X = N["get" + Y.charAt(0).toUpperCase() + Y.slice(1)](V, N.currTemplate[Y]);
            N.appendContent(X, Y);
            V.preloaded = true;
            s(E, V);
            t = V.type;
            N.container.prepend(N.contentContainer);
            s("AfterChange")
        },
        appendContent: function(V, W) {
            N.content = V;
            if (V) {
                if (N.st.showCloseBtn && N.st.closeBtnInside && N.currTemplate[W] === true) {
                    if (!N.content.find(".mfp-close").length) {
                        N.content.append(i())
                    }
                } else {
                    N.content = V
                }
            } else {
                N.content = ""
            }
            s(C);
            N.container.addClass("mfp-" + W + "-holder");
            N.contentContainer.append(N.content)
        },
        parseEl: function(W) {
            var X = N.items[W],
                Y;
            if (X.tagName) {
                X = {
                    el: a(X)
                }
            } else {
                Y = X.type;
                X = {
                    data: X,
                    src: X.src
                }
            }
            if (X.el) {
                var Z = N.types;
                for (var V = 0; V < Z.length; V++) {
                    if (X.el.hasClass("mfp-" + Z[V])) {
                        Y = Z[V];
                        break
                    }
                }
                X.src = X.el.attr("data-mfp-src");
                if (!X.src) {
                    X.src = X.el.attr("href")
                }
            }
            X.type = Y || N.st.type || "inline";
            X.index = W;
            X.parsed = true;
            N.items[W] = X;
            s("ElementParse", X);
            return N.items[W]
        },
        addGroup: function(W, Y) {
            var V = function(Z) {
                Z.mfpEl = this;
                N._openClick(Z, W, Y)
            };
            if (!Y) {
                Y = {}
            }
            var X = "click.magnificPopup";
            Y.mainEl = W;
            if (Y.items) {
                Y.isObj = true;
                W.off(X).on(X, V)
            } else {
                Y.isObj = false;
                if (Y.delegate) {
                    W.off(X).on(X, Y.delegate, V)
                } else {
                    Y.items = W;
                    W.off(X).on(X, V)
                }
            }
        },
        _openClick: function(W, X, Z) {
            var Y = Z.midClick !== undefined ? Z.midClick : a.magnificPopup.defaults.midClick;
            if (!Y && (W.which === 2 || W.ctrlKey || W.metaKey || W.altKey || W.shiftKey)) {
                return
            }
            var V = Z.disableOn !== undefined ? Z.disableOn : a.magnificPopup.defaults.disableOn;
            if (V) {
                if (a.isFunction(V)) {
                    if (!V.call(N)) {
                        return true
                    }
                } else {
                    if (y.width() < V) {
                        return true
                    }
                }
            }
            if (W.type) {
                W.preventDefault();
                if (N.isOpen) {
                    W.stopPropagation()
                }
            }
            Z.el = a(W.mfpEl);
            if (Z.delegate) {
                Z.items = X.find(Z.delegate)
            }
            N.open(Z)
        },
        updateStatus: function(W, X) {
            if (N.preloader) {
                if (u !== W) {
                    N.container.removeClass("mfp-s-" + u)
                }
                if (!X && W === "loading") {
                    X = N.st.tLoading
                }
                var V = {
                    status: W,
                    text: X
                };
                s("UpdateStatus", V);
                W = V.status;
                X = V.text;
                N.preloader.html(X);
                N.preloader.find("a").on("click", function(Y) {
                    Y.stopImmediatePropagation()
                });
                N.container.addClass("mfp-s-" + W);
                u = W
            }
        },
        _checkIfClose: function(X) {
            if (a(X).hasClass(Q)) {
                return
            }
            var W = N.st.closeOnContentClick;
            var V = N.st.closeOnBgClick;
            if (W && V) {
                return true
            } else {
                if (!N.content || a(X).hasClass("mfp-close") || (N.preloader && X === N.preloader[0])) {
                    return true
                }
                if ((X !== N.content[0] && !a.contains(N.content[0], X))) {
                    if (V) {
                        if (a.contains(document, X)) {
                            return true
                        }
                    }
                } else {
                    if (W) {
                        return true
                    }
                }
            }
            return false
        },
        _addClassToMFP: function(V) {
            N.bgOverlay.addClass(V);
            N.wrap.addClass(V)
        },
        _removeClassFromMFP: function(V) {
            this.bgOverlay.removeClass(V);
            N.wrap.removeClass(V)
        },
        _hasScrollBar: function(V) {
            return ((N.isIE7 ? f.height() : document.body.scrollHeight) > (V || y.height()))
        },
        _setFocus: function() {
            (N.st.focus ? N.content.find(N.st.focus).eq(0) : N.wrap).focus()
        },
        _onFocusIn: function(V) {
            if (V.target !== N.wrap[0] && !a.contains(N.wrap[0], V.target)) {
                N._setFocus();
                return false
            }
        },
        _parseMarkup: function(X, Y, W) {
            var V;
            if (W.data) {
                Y = a.extend(W.data, Y)
            }
            s(M, [X, Y, W]);
            a.each(Y, function(ab, ac) {
                if (ac === undefined || ac === false) {
                    return true
                }
                V = ab.split("_");
                if (V.length > 1) {
                    var aa = X.find(G + "-" + V[0]);
                    if (aa.length > 0) {
                        var Z = V[1];
                        if (Z === "replaceWith") {
                            if (aa[0] !== ac[0]) {
                                aa.replaceWith(ac)
                            }
                        } else {
                            if (Z === "img") {
                                if (aa.is("img")) {
                                    aa.attr("src", ac)
                                } else {
                                    aa.replaceWith(a("<img>").attr("src", ac).attr("class", aa.attr("class")))
                                }
                            } else {
                                aa.attr(V[1], ac)
                            }
                        }
                    }
                } else {
                    X.find(G + "-" + ab).html(ac)
                }
            })
        },
        _getScrollbarSize: function() {
            if (N.scrollbarSize === undefined) {
                var V = document.createElement("div");
                V.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
                document.body.appendChild(V);
                N.scrollbarSize = V.offsetWidth - V.clientWidth;
                document.body.removeChild(V)
            }
            return N.scrollbarSize
        }
    };
    a.magnificPopup = {
        instance: null,
        proto: L.prototype,
        modules: [],
        open: function(W, V) {
            c();
            if (!W) {
                W = {}
            } else {
                W = a.extend(true, {}, W)
            }
            W.isObj = true;
            W.index = V || 0;
            return this.instance.open(W)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(W, V) {
            if (V.options) {
                a.magnificPopup.defaults[W] = V.options
            }
            a.extend(this.proto, V.proto);
            this.modules.push(W)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: false,
            mainClass: "",
            preloader: true,
            focus: "",
            closeOnContentClick: false,
            closeOnBgClick: true,
            closeBtnInside: true,
            showCloseBtn: true,
            enableEscapeKey: true,
            modal: false,
            alignTop: false,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: true
        }
    };
    a.fn.magnificPopup = function(Z) {
        c();
        var Y = a(this);
        if (typeof Z === "string") {
            if (Z === "open") {
                var X, W = p ? Y.data("magnificPopup") : Y[0].magnificPopup,
                    V = parseInt(arguments[1], 10) || 0;
                if (W.items) {
                    X = W.items[V]
                } else {
                    X = Y;
                    if (W.delegate) {
                        X = X.find(W.delegate)
                    }
                    X = X.eq(V)
                }
                N._openClick({
                    mfpEl: X
                }, Y, W)
            } else {
                if (N.isOpen) {
                    N[Z].apply(N, Array.prototype.slice.call(arguments, 1))
                }
            }
        } else {
            Z = a.extend(true, {}, Z);
            if (p) {
                Y.data("magnificPopup", Z)
            } else {
                Y[0].magnificPopup = Z
            }
            N.addGroup(Y, Z)
        }
        return Y
    };
    var K = "inline",
        m, o, q, v = function() {
            if (q) {
                o.after(q.addClass(m)).detach();
                q = null
            }
        };
    a.magnificPopup.registerModule(K, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                N.types.push(K);
                r(F + "." + K, function() {
                    v()
                })
            },
            getInline: function(X, Z) {
                v();
                if (X.src) {
                    var W = N.st.inline,
                        V = a(X.src);
                    if (V.length) {
                        var Y = V[0].parentNode;
                        if (Y && Y.tagName) {
                            if (!o) {
                                m = W.hiddenClass;
                                o = j(m);
                                m = "mfp-" + m
                            }
                            q = V.after(o).detach().removeClass(m)
                        }
                        N.updateStatus("ready")
                    } else {
                        N.updateStatus("error", W.tNotFound);
                        V = a("<div>")
                    }
                    X.inlineElement = V;
                    return V
                }
                N.updateStatus("ready");
                N._parseMarkup(Z, {}, X);
                return Z
            }
        }
    });
    var B = "ajax",
        b, w = function() {
            if (b) {
                a(document.body).removeClass(b)
            }
        },
        e = function() {
            w();
            if (N.req) {
                N.req.abort()
            }
        };
    a.magnificPopup.registerModule(B, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                N.types.push(B);
                b = N.st.ajax.cursor;
                r(F + "." + B, e);
                r("BeforeChange." + B, e)
            },
            getAjax: function(V) {
                if (b) {
                    a(document.body).addClass(b)
                }
                N.updateStatus("loading");
                var W = a.extend({
                    url: V.src,
                    success: function(X, aa, Y) {
                        var Z = {
                            data: X,
                            xhr: Y
                        };
                        s("ParseAjax", Z);
                        N.appendContent(a(Z.data), B);
                        V.finished = true;
                        w();
                        N._setFocus();
                        setTimeout(function() {
                            N.wrap.addClass(R)
                        }, 16);
                        N.updateStatus("ready");
                        s("AjaxContentAdded")
                    },
                    error: function() {
                        w();
                        V.finished = V.loadError = true;
                        N.updateStatus("error", N.st.ajax.tError.replace("%url%", V.src))
                    }
                }, N.st.ajax.settings);
                N.req = a.ajax(W);
                return ""
            }
        }
    });
    var n, l = function(V) {
        if (V.data && V.data.title !== undefined) {
            return V.data.title
        }
        var W = N.st.image.titleSrc;
        if (W) {
            if (a.isFunction(W)) {
                return W.call(N, V)
            } else {
                if (V.el) {
                    return V.el.attr(W) || ""
                }
            }
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: true,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var V = N.st.image,
                    W = ".image";
                N.types.push("image");
                r(P + W, function() {
                    if (N.currItem.type === "image" && V.cursor) {
                        a(document.body).addClass(V.cursor)
                    }
                });
                r(F + W, function() {
                    if (V.cursor) {
                        a(document.body).removeClass(V.cursor)
                    }
                    y.off("resize" + G)
                });
                r("Resize" + W, N.resizeImage);
                if (N.isLowIE) {
                    r("AfterChange", N.resizeImage)
                }
            },
            resizeImage: function() {
                var W = N.currItem;
                if (!W || !W.img) {
                    return
                }
                if (N.st.image.verticalFit) {
                    var V = 0;
                    if (N.isLowIE) {
                        V = parseInt(W.img.css("padding-top"), 10) + parseInt(W.img.css("padding-bottom"), 10)
                    }
                    W.img.css("max-height", N.wH - V)
                }
            },
            _onImageHasSize: function(V) {
                if (V.img) {
                    V.hasSize = true;
                    if (n) {
                        clearInterval(n)
                    }
                    V.isCheckingImgSize = false;
                    s("ImageHasSize", V);
                    if (V.imgHidden) {
                        if (N.content) {
                            N.content.removeClass("mfp-loading")
                        }
                        V.imgHidden = false
                    }
                }
            },
            findImageSize: function(X) {
                var V = 0,
                    W = X.img[0],
                    Y = function(Z) {
                        if (n) {
                            clearInterval(n)
                        }
                        n = setInterval(function() {
                            if (W.naturalWidth > 0) {
                                N._onImageHasSize(X);
                                return
                            }
                            if (V > 200) {
                                clearInterval(n)
                            }
                            V++;
                            if (V === 3) {
                                Y(10)
                            } else {
                                if (V === 40) {
                                    Y(50)
                                } else {
                                    if (V === 100) {
                                        Y(500)
                                    }
                                }
                            }
                        }, Z)
                    };
                Y(1)
            },
            getImage: function(Z, ac) {
                var W = 0,
                    aa = function() {
                        if (Z) {
                            if (Z.img[0].complete) {
                                Z.img.off(".mfploader");
                                if (Z === N.currItem) {
                                    N._onImageHasSize(Z);
                                    N.updateStatus("ready")
                                }
                                Z.hasSize = true;
                                Z.loaded = true;
                                s("ImageLoadComplete")
                            } else {
                                W++;
                                if (W < 200) {
                                    setTimeout(aa, 100)
                                } else {
                                    ab()
                                }
                            }
                        }
                    },
                    ab = function() {
                        if (Z) {
                            Z.img.off(".mfploader");
                            if (Z === N.currItem) {
                                N._onImageHasSize(Z);
                                N.updateStatus("error", Y.tError.replace("%url%", Z.src))
                            }
                            Z.hasSize = true;
                            Z.loaded = true;
                            Z.loadError = true
                        }
                    },
                    Y = N.st.image;
                var V = ac.find(".mfp-img");
                if (V.length) {
                    var X = document.createElement("img");
                    X.className = "mfp-img";
                    if (Z.el && Z.el.find("img").length) {
                        X.alt = Z.el.find("img").attr("alt")
                    }
                    Z.img = a(X).on("load.mfploader", aa).on("error.mfploader", ab);
                    X.src = Z.src;
                    if (V.is("img")) {
                        Z.img = Z.img.clone()
                    }
                    X = Z.img[0];
                    if (X.naturalWidth > 0) {
                        Z.hasSize = true
                    } else {
                        if (!X.width) {
                            Z.hasSize = false
                        }
                    }
                }
                N._parseMarkup(ac, {
                    title: l(Z),
                    img_replaceWith: Z.img
                }, Z);
                N.resizeImage();
                if (Z.hasSize) {
                    if (n) {
                        clearInterval(n)
                    }
                    if (Z.loadError) {
                        ac.addClass("mfp-loading");
                        N.updateStatus("error", Y.tError.replace("%url%", Z.src))
                    } else {
                        ac.removeClass("mfp-loading");
                        N.updateStatus("ready")
                    }
                    return ac
                }
                N.updateStatus("loading");
                Z.loading = true;
                if (!Z.hasSize) {
                    Z.imgHidden = true;
                    ac.addClass("mfp-loading");
                    N.findImageSize(Z)
                }
                return ac
            }
        }
    });
    var I, H = function() {
        if (I === undefined) {
            I = document.createElement("p").style.MozTransform !== undefined
        }
        return I
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: false,
            easing: "ease-in-out",
            duration: 300,
            opener: function(V) {
                return V.is("img") ? V : V.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var ac = N.st.zoom,
                    Z = ".zoom",
                    Y;
                if (!ac.enabled || !N.supportsTransition) {
                    return
                }
                var W = ac.duration,
                    X = function(ae) {
                        var af = ae.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            ah = "all " + (ac.duration / 1000) + "s " + ac.easing,
                            ad = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            },
                            ag = "transition";
                        ad["-webkit-" + ag] = ad["-moz-" + ag] = ad["-o-" + ag] = ad[ag] = ah;
                        af.css(ad);
                        return af
                    },
                    ab = function() {
                        N.content.css("visibility", "visible")
                    },
                    aa, V;
                r("BuildControls" + Z, function() {
                    if (N._allowZoom()) {
                        clearTimeout(aa);
                        N.content.css("visibility", "hidden");
                        Y = N._getItemToZoom();
                        if (!Y) {
                            ab();
                            return
                        }
                        V = X(Y);
                        V.css(N._getOffset());
                        N.wrap.append(V);
                        aa = setTimeout(function() {
                            V.css(N._getOffset(true));
                            aa = setTimeout(function() {
                                ab();
                                setTimeout(function() {
                                    V.remove();
                                    Y = V = null;
                                    s("ZoomAnimationEnded")
                                }, 16)
                            }, W)
                        }, 16)
                    }
                });
                r(D + Z, function() {
                    if (N._allowZoom()) {
                        clearTimeout(aa);
                        N.st.removalDelay = W;
                        if (!Y) {
                            Y = N._getItemToZoom();
                            if (!Y) {
                                return
                            }
                            V = X(Y)
                        }
                        V.css(N._getOffset(true));
                        N.wrap.append(V);
                        N.content.css("visibility", "hidden");
                        setTimeout(function() {
                            V.css(N._getOffset())
                        }, 16)
                    }
                });
                r(F + Z, function() {
                    if (N._allowZoom()) {
                        ab();
                        if (V) {
                            V.remove()
                        }
                        Y = null
                    }
                })
            },
            _allowZoom: function() {
                return N.currItem.type === "image"
            },
            _getItemToZoom: function() {
                if (N.currItem.hasSize) {
                    return N.currItem.img
                } else {
                    return false
                }
            },
            _getOffset: function(W) {
                var V;
                if (W) {
                    V = N.currItem.img
                } else {
                    V = N.st.zoom.opener(N.currItem.el || N.currItem)
                }
                var Y = V.offset();
                var aa = parseInt(V.css("padding-top"), 10);
                var Z = parseInt(V.css("padding-bottom"), 10);
                Y.top -= (a(window).scrollTop() - aa);
                var X = {
                    width: V.width(),
                    height: (p ? V.innerHeight() : V[0].offsetHeight) - Z - aa
                };
                if (H()) {
                    X["-moz-transform"] = X.transform = "translate(" + Y.left + "px," + Y.top + "px)"
                } else {
                    X.left = Y.left;
                    X.top = Y.top
                }
                return X
            }
        }
    });
    var J = "iframe",
        g = "//about:blank",
        h = function(W) {
            if (N.currTemplate[J]) {
                var V = N.currTemplate[J].find("iframe");
                if (V.length) {
                    if (!W) {
                        V[0].src = g
                    }
                    if (N.isIE8) {
                        V.css("display", W ? "block" : "none")
                    }
                }
            }
        };
    a.magnificPopup.registerModule(J, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                N.types.push(J);
                r("BeforeChange", function(V, X, W) {
                    if (X !== W) {
                        if (X === J) {
                            h()
                        } else {
                            if (W === J) {
                                h(true)
                            }
                        }
                    }
                });
                r(F + "." + J, function() {
                    h()
                })
            },
            getIframe: function(Y, Z) {
                var W = Y.src;
                var X = N.st.iframe;
                a.each(X.patterns, function() {
                    if (W.indexOf(this.index) > -1) {
                        if (this.id) {
                            if (typeof this.id === "string") {
                                W = W.substr(W.lastIndexOf(this.id) + this.id.length, W.length)
                            } else {
                                W = this.id.call(this, W)
                            }
                        }
                        W = this.src.replace("%id%", W);
                        return false
                    }
                });
                var V = {};
                if (X.srcAction) {
                    V[X.srcAction] = W
                }
                N._parseMarkup(Z, V, Y);
                N.updateStatus("ready");
                return Z
            }
        }
    });
    var k = function(V) {
            var W = N.items.length;
            if (V > W - 1) {
                return V - W
            } else {
                if (V < 0) {
                    return W + V
                }
            }
            return V
        },
        x = function(W, V, X) {
            return W.replace(/%curr%/gi, V + 1).replace(/%total%/gi, X)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: false,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: true,
            arrows: true,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var V = N.st.gallery,
                    W = ".mfp-gallery";
                N.direction = true;
                if (!V || !V.enabled) {
                    return false
                }
                z += " mfp-gallery";
                r(P + W, function() {
                    if (V.navigateByImgClick) {
                        N.wrap.on("click" + W, ".mfp-img", function() {
                            if (N.items.length > 1) {
                                N.next();
                                return false
                            }
                        })
                    }
                    f.on("keydown" + W, function(X) {
                        if (X.keyCode === 37) {
                            N.prev()
                        } else {
                            if (X.keyCode === 39) {
                                N.next()
                            }
                        }
                    })
                });
                r("UpdateStatus" + W, function(Y, X) {
                    if (X.text) {
                        X.text = x(X.text, N.currItem.index, N.items.length)
                    }
                });
                r(M + W, function(X, Y, ab, Z) {
                    var aa = N.items.length;
                    ab.counter = aa > 1 ? x(V.tCounter, Z.index, aa) : ""
                });
                r("BuildControls" + W, function() {
                    if (N.items.length > 1 && V.arrows && !N.arrowLeft) {
                        var Z = V.arrowMarkup,
                            X = N.arrowLeft = a(Z.replace(/%title%/gi, V.tPrev).replace(/%dir%/gi, "left")).addClass(Q),
                            Y = N.arrowRight = a(Z.replace(/%title%/gi, V.tNext).replace(/%dir%/gi, "right")).addClass(Q);
                        X.click(function() {
                            N.prev()
                        });
                        Y.click(function() {
                            N.next()
                        });
                        N.container.append(X.add(Y))
                    }
                });
                r(E + W, function() {
                    if (N._preloadTimeout) {
                        clearTimeout(N._preloadTimeout)
                    }
                    N._preloadTimeout = setTimeout(function() {
                        N.preloadNearbyImages();
                        N._preloadTimeout = null
                    }, 16)
                });
                r(F + W, function() {
                    f.off(W);
                    N.wrap.off("click" + W);
                    N.arrowRight = N.arrowLeft = null
                })
            },
            next: function() {
                N.direction = true;
                N.index = k(N.index + 1);
                N.updateItemHTML()
            },
            prev: function() {
                N.direction = false;
                N.index = k(N.index - 1);
                N.updateItemHTML()
            },
            goTo: function(V) {
                N.direction = (V >= N.index);
                N.index = V;
                N.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var W = N.st.gallery.preload,
                    Y = Math.min(W[0], N.items.length),
                    X = Math.min(W[1], N.items.length),
                    V;
                for (V = 1; V <= (N.direction ? X : Y); V++) {
                    N._preloadItem(N.index + V)
                }
                for (V = 1; V <= (N.direction ? Y : X); V++) {
                    N._preloadItem(N.index - V)
                }
            },
            _preloadItem: function(V) {
                V = k(V);
                if (N.items[V].preloaded) {
                    return
                }
                var W = N.items[V];
                if (!W.parsed) {
                    W = N.parseEl(V)
                }
                s("LazyLoad", W);
                if (W.type === "image") {
                    W.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        W.hasSize = true
                    }).on("error.mfploader", function() {
                        W.hasSize = true;
                        W.loadError = true;
                        s("LazyLoadError", W)
                    }).attr("src", W.src)
                }
                W.preloaded = true
            }
        }
    });
    var T = "retina";
    a.magnificPopup.registerModule(T, {
        options: {
            replaceSrc: function(V) {
                return V.src.replace(/\.\w+$/, function(W) {
                    return "@2x" + W
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var W = N.st.retina,
                        V = W.ratio;
                    V = !isNaN(V) ? V : V();
                    if (V > 1) {
                        r("ImageHasSize." + T, function(X, Y) {
                            Y.img.css({
                                "max-width": Y.img[0].naturalWidth / V,
                                width: "100%"
                            })
                        });
                        r("ElementParse." + T, function(X, Y) {
                            Y.src = W.replaceSrc(Y, V)
                        })
                    }
                }
            }
        }
    });
    c()
}));