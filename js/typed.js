! function(a) {
    var b = function(c, d) {
        this.el = a(c);
        this.options = a.extend({}, a.fn.typed.defaults, d);
        this.isInput = this.el.is("input");
        this.attr = this.options.attr;
        this.showCursor = this.isInput ? false : this.options.showCursor;
        this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text();
        this.contentType = this.options.contentType;
        this.typeSpeed = this.options.typeSpeed;
        this.startDelay = this.options.startDelay;
        this.backSpeed = this.options.backSpeed;
        this.backDelay = this.options.backDelay;
        this.stringsElement = this.options.stringsElement;
        this.strings = this.options.strings;
        this.strPos = 0;
        this.arrayPos = 0;
        this.stopNum = 0;
        this.loop = this.options.loop;
        this.loopCount = this.options.loopCount;
        this.curLoop = 0;
        this.stop = false;
        this.cursorChar = this.options.cursorChar;
        this.shuffle = this.options.shuffle;
        this.sequence = [];
        this.build()
    };
    b.prototype = {
        constructor: b,
        init: function() {
            var c = this;
            c.timeout = setTimeout(function() {
                for (var d = 0; d < c.strings.length; ++d) {
                    c.sequence[d] = d
                }
                if (c.shuffle) {
                    c.sequence = c.shuffleArray(c.sequence)
                }
                c.typewrite(c.strings[c.sequence[c.arrayPos]], c.strPos)
            }, c.startDelay)
        },
        build: function() {
            var c = this;
            if (this.showCursor === true) {
                this.cursor = a('<span class="typed-cursor">' + this.cursorChar + "</span>");
                this.el.after(this.cursor)
            }
            if (this.stringsElement) {
                c.strings = [];
                this.stringsElement.hide();
                var d = this.stringsElement.find("p");
                a.each(d, function(e, f) {
                    c.strings.push(a(f).html())
                })
            }
            this.init()
        },
        typewrite: function(c, d) {
            if (this.stop === true) {
                return
            }
            var e = Math.round(Math.random() * (100 - 30)) + this.typeSpeed;
            var f = this;
            f.timeout = setTimeout(function() {
                var g = 0;
                var k = c.substr(d);
                if (k.charAt(0) === "^") {
                    var j = 1;
                    if (/^\^\d+/.test(k)) {
                        k = /\d+/.exec(k)[0];
                        j += k.length;
                        g = parseInt(k)
                    }
                    c = c.substring(0, d) + c.substring(d + j)
                }
                if (f.contentType === "html") {
                    var h = c.substr(d).charAt(0);
                    if (h === "<" || h === "&") {
                        var l = "";
                        var i = "";
                        if (h === "<") {
                            i = ">"
                        } else {
                            i = ";"
                        }
                        while (c.substr(d).charAt(0) !== i) {
                            l += c.substr(d).charAt(0);
                            d++
                        }
                        d++;
                        l += i
                    }
                }
                f.timeout = setTimeout(function() {
                    if (d === c.length) {
                        f.options.onStringTyped(f.arrayPos);
                        if (f.arrayPos === f.strings.length - 1) {
                            f.options.callback();
                            f.curLoop++;
                            if (f.loop === false || f.curLoop === f.loopCount) {
                                return
                            }
                        }
                        f.timeout = setTimeout(function() {
                            f.backspace(c, d)
                        }, f.backDelay)
                    } else {
                        if (d === 0) {
                            f.options.preStringTyped(f.arrayPos)
                        }
                        var m = c.substr(0, d + 1);
                        if (f.attr) {
                            f.el.attr(f.attr, m)
                        } else {
                            if (f.isInput) {
                                f.el.val(m)
                            } else {
                                if (f.contentType === "html") {
                                    f.el.html(m)
                                } else {
                                    f.el.text(m)
                                }
                            }
                        }
                        d++;
                        f.typewrite(c, d)
                    }
                }, g)
            }, e)
        },
        backspace: function(c, d) {
            if (this.stop === true) {
                return
            }
            var e = Math.round(Math.random() * (100 - 30)) + this.backSpeed;
            var f = this;
            f.timeout = setTimeout(function() {
                if (f.contentType === "html") {
                    if (c.substr(d).charAt(0) === ">") {
                        var h = "";
                        while (c.substr(d).charAt(0) !== "<") {
                            h -= c.substr(d).charAt(0);
                            d--
                        }
                        d--;
                        h += "<"
                    }
                }
                var g = c.substr(0, d);
                if (f.attr) {
                    f.el.attr(f.attr, g)
                } else {
                    if (f.isInput) {
                        f.el.val(g)
                    } else {
                        if (f.contentType === "html") {
                            f.el.html(g)
                        } else {
                            f.el.text(g)
                        }
                    }
                }
                if (d > f.stopNum) {
                    d--;
                    f.backspace(c, d)
                } else {
                    if (d <= f.stopNum) {
                        f.arrayPos++;
                        if (f.arrayPos === f.strings.length) {
                            f.arrayPos = 0;
                            if (f.shuffle) {
                                f.sequence = f.shuffleArray(f.sequence)
                            }
                            f.init()
                        } else {
                            f.typewrite(f.strings[f.sequence[f.arrayPos]], d)
                        }
                    }
                }
            }, e)
        },
        shuffleArray: function(c) {
            var e, d, f = c.length;
            if (f) {
                while (--f) {
                    d = Math.floor(Math.random() * (f + 1));
                    e = c[d];
                    c[d] = c[f];
                    c[f] = e
                }
            }
            return c
        },
        reset: function() {
            var d = this;
            clearInterval(d.timeout);
            var c = this.el.attr("id");
            this.el.after('<span id="' + c + '"/>');
            this.el.remove();
            if (typeof this.cursor !== "undefined") {
                this.cursor.remove()
            }
            d.options.resetCallback()
        }
    };
    a.fn.typed = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("typed"),
                f = typeof c == "object" && c;
            if (!e) {
                d.data("typed", (e = new b(this, f)))
            }
            if (typeof c == "string") {
                e[c]()
            }
        })
    };
    a.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: false,
        backDelay: 500,
        loop: false,
        loopCount: false,
        showCursor: true,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery);