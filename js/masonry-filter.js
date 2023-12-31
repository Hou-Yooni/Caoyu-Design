(function(a) {
    a.fn.multipleFilterMasonry = function(g) {
        var b = [];
        var d = [];
        if (g.selectorType === "list") {
            a(g.filtersGroupSelector).children().each(function() {
                d.push(a(this).data("filter"))
            })
        }
        var f = function(k) {
            k.find(g.itemSelector).each(function() {
                b.push(a(this))
            });
            k.masonry(g)
        };
        var c = function(l) {
            var k = [];
            a(b).each(function(m) {
                a(l).each(function(n, o) {
                    if (b[m].is(o)) {
                        if (a.inArray(b[m], k) === -1) {
                            k.push(b[m])
                        }
                    }
                })
            });
            return k
        };
        var j = function(k, l) {
            k.empty();
            a(l).each(function() {
                a(k).append(a(this))
            });
            k.masonry("reloadItems");
            k.masonry()
        };
        var e = function(k) {
            var l = window.location.hash.replace("#", "");
            if (a.inArray(l, d) !== -1) {
                j(k, a("." + l))
            }
        };
        var h = function(k) {
            a(g.filtersGroupSelector).find("input[type=radio]").each(function() {
                a(this).change(function() {
                    var m = [];
                    a(g.filtersGroupSelector).find("input[type=radio]").each(function() {
                        if (a(this).is(":checked")) {
                            m.push("." + a(this).val())
                        }
                    });
                    var l = b;
                    if (m.length > 0) {
                        l = c(m)
                    }
                    j(k, l)
                })
            })
        };
        var i = function(k) {
            a(g.filtersGroupSelector).children().each(function() {
                a(this).click(function() {
                    a(g.filtersGroupSelector).children().removeClass("selected");
                    window.location.hash = a(this).data("filter");
                    var m = [];
                    m.push("." + a(this).data("filter"));
                    a(this).addClass("selected");
                    var l = b;
                    if (m.length > 0) {
                        l = c(m)
                    }
                    j(k, l)
                })
            });
            e(k);
            a(g.filtersGroupSelector).children().removeClass("selected");
            a(".filters li[data-filter=" + window.location.hash.replace("#", "") + "]").addClass("selected")
        };
        return this.each(function() {
            var k = a(this);
            f(k);
            g.selectorType === "list" ? i(k) : h(k)
        })
    }
}(window.jQuery));