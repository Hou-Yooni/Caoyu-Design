/*
 * jQuery Validation Plugin v1.15.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */
(function(a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        if (typeof module === "object" && module.exports) {
            module.exports = a(require("jquery"))
        } else {
            a(jQuery)
        }
    }
}(function(a) {
    a.extend(a.fn, {
        validate: function(d) {
            if (!this.length) {
                if (d && d.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.")
                }
                return
            }
            var e = a.data(this[0], "validator");
            if (e) {
                return e
            }
            this.attr("novalidate", "novalidate");
            e = new a.validator(d, this[0]);
            a.data(this[0], "validator", e);
            if (e.settings.onsubmit) {
                this.on("click.validate", ":submit", function(f) {
                    if (e.settings.submitHandler) {
                        e.submitButton = f.target
                    }
                    if (a(this).hasClass("cancel")) {
                        e.cancelSubmit = true
                    }
                    if (a(this).attr("formnovalidate") !== undefined) {
                        e.cancelSubmit = true
                    }
                });
                this.on("submit.validate", function(f) {
                    if (e.settings.debug) {
                        f.preventDefault()
                    }

                    function g() {
                        var h, i;
                        if (e.settings.submitHandler) {
                            if (e.submitButton) {
                                h = a("<input type='hidden'/>").attr("name", e.submitButton.name).val(a(e.submitButton).val()).appendTo(e.currentForm)
                            }
                            i = e.settings.submitHandler.call(e, e.currentForm, f);
                            if (e.submitButton) {
                                h.remove()
                            }
                            if (i !== undefined) {
                                return i
                            }
                            return false
                        }
                        return true
                    }
                    if (e.cancelSubmit) {
                        e.cancelSubmit = false;
                        return g()
                    }
                    if (e.form()) {
                        if (e.pendingRequest) {
                            e.formSubmitted = true;
                            return false
                        }
                        return g()
                    } else {
                        e.focusInvalid();
                        return false
                    }
                })
            }
            return e
        },
        valid: function() {
            var e, f, d;
            if (a(this[0]).is("form")) {
                e = this.validate().form()
            } else {
                d = [];
                e = true;
                f = a(this[0].form).validate();
                this.each(function() {
                    e = f.element(this) && e;
                    if (!e) {
                        d = d.concat(f.errorList)
                    }
                });
                f.errorList = d
            }
            return e
        },
        rules: function(e, d) {
            if (!this.length) {
                return
            }
            var g = this[0],
                k, l, h, f, j, i;
            if (e) {
                k = a.data(g.form, "validator").settings;
                l = k.rules;
                h = a.validator.staticRules(g);
                switch (e) {
                    case "add":
                        a.extend(h, a.validator.normalizeRule(d));
                        delete h.messages;
                        l[g.name] = h;
                        if (d.messages) {
                            k.messages[g.name] = a.extend(k.messages[g.name], d.messages)
                        }
                        break;
                    case "remove":
                        if (!d) {
                            delete l[g.name];
                            return h
                        }
                        i = {};
                        a.each(d.split(/\s/), function(m, n) {
                            i[n] = h[n];
                            delete h[n];
                            if (n === "required") {
                                a(g).removeAttr("aria-required")
                            }
                        });
                        return i
                }
            }
            f = a.validator.normalizeRules(a.extend({}, a.validator.classRules(g), a.validator.attributeRules(g), a.validator.dataRules(g), a.validator.staticRules(g)), g);
            if (f.required) {
                j = f.required;
                delete f.required;
                f = a.extend({
                    required: j
                }, f);
                a(g).attr("aria-required", "true")
            }
            if (f.remote) {
                j = f.remote;
                delete f.remote;
                f = a.extend(f, {
                    remote: j
                })
            }
            return f
        }
    });
    a.extend(a.expr[":"], {
        blank: function(d) {
            return !a.trim("" + a(d).val())
        },
        filled: function(d) {
            var e = a(d).val();
            return e !== null && !!a.trim("" + e)
        },
        unchecked: function(d) {
            return !a(d).prop("checked")
        }
    });
    a.validator = function(e, d) {
        this.settings = a.extend(true, {}, a.validator.defaults, e);
        this.currentForm = d;
        this.init()
    };
    a.validator.format = function(e, d) {
        if (arguments.length === 1) {
            return function() {
                var f = a.makeArray(arguments);
                f.unshift(e);
                return a.validator.format.apply(this, f)
            }
        }
        if (d === undefined) {
            return e
        }
        if (arguments.length > 2 && d.constructor !== Array) {
            d = a.makeArray(arguments).slice(1)
        }
        if (d.constructor !== Array) {
            d = [d]
        }
        a.each(d, function(f, g) {
            e = e.replace(new RegExp("\\{" + f + "\\}", "g"), function() {
                return g
            })
        });
        return e
    };
    a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: false,
            focusInvalid: true,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function(d) {
                this.lastActive = d;
                if (this.settings.focusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, d, this.settings.errorClass, this.settings.validClass)
                    }
                    this.hideThese(this.errorsFor(d))
                }
            },
            onfocusout: function(d) {
                if (!this.checkable(d) && (d.name in this.submitted || !this.optional(d))) {
                    this.element(d)
                }
            },
            onkeyup: function(d, e) {
                var f = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                if (e.which === 9 && this.elementValue(d) === "" || a.inArray(e.keyCode, f) !== -1) {
                    return
                } else {
                    if (d.name in this.submitted || d.name in this.invalid) {
                        this.element(d)
                    }
                }
            },
            onclick: function(d) {
                if (d.name in this.submitted) {
                    this.element(d)
                } else {
                    if (d.parentNode.name in this.submitted) {
                        this.element(d.parentNode)
                    }
                }
            },
            highlight: function(d, e, f) {
                if (d.type === "radio") {
                    this.findByName(d.name).addClass(e).removeClass(f)
                } else {
                    a(d).addClass(e).removeClass(f)
                }
            },
            unhighlight: function(d, e, f) {
                if (d.type === "radio") {
                    this.findByName(d.name).removeClass(e).addClass(f)
                } else {
                    a(d).removeClass(e).addClass(f)
                }
            }
        },
        setDefaults: function(d) {
            a.extend(a.validator.defaults, d)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}."),
            step: a.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: false,
        prototype: {
            init: function() {
                this.labelContainer = a(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm);
                this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();
                var e = (this.groups = {}),
                    f;
                a.each(this.settings.groups, function(g, h) {
                    if (typeof h === "string") {
                        h = h.split(/\s/)
                    }
                    a.each(h, function(i, j) {
                        e[j] = g
                    })
                });
                f = this.settings.rules;
                a.each(f, function(g, h) {
                    f[g] = a.validator.normalizeRule(h)
                });

                function d(g) {
                    var j = a.data(this.form, "validator"),
                        h = "on" + g.type.replace(/^validate/, ""),
                        i = j.settings;
                    if (i[h] && !a(this).is(i.ignore)) {
                        i[h].call(j, this, g)
                    }
                }
                a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", d).on("click.validate", "select, option, [type='radio'], [type='checkbox']", d);
                if (this.settings.invalidHandler) {
                    a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
                }
                a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                this.checkForm();
                a.extend(this.submitted, this.errorMap);
                this.invalid = a.extend({}, this.errorMap);
                if (!this.valid()) {
                    a(this.currentForm).triggerHandler("invalid-form", [this])
                }
                this.showErrors();
                return this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, d = (this.currentElements = this.elements()); d[e]; e++) {
                    this.check(d[e])
                }
                return this.valid()
            },
            element: function(f) {
                var e = this.clean(f),
                    d = this.validationTargetFor(e),
                    j = this,
                    h = true,
                    i, g;
                if (d === undefined) {
                    delete this.invalid[e.name]
                } else {
                    this.prepareElement(d);
                    this.currentElements = a(d);
                    g = this.groups[d.name];
                    if (g) {
                        a.each(this.groups, function(k, l) {
                            if (l === g && k !== d.name) {
                                e = j.validationTargetFor(j.clean(j.findByName(k)));
                                if (e && e.name in j.invalid) {
                                    j.currentElements.push(e);
                                    h = h && j.check(e)
                                }
                            }
                        })
                    }
                    i = this.check(d) !== false;
                    h = h && i;
                    if (i) {
                        this.invalid[d.name] = false
                    } else {
                        this.invalid[d.name] = true
                    }
                    if (!this.numberOfInvalids()) {
                        this.toHide = this.toHide.add(this.containers)
                    }
                    this.showErrors();
                    a(f).attr("aria-invalid", !i)
                }
                return h
            },
            showErrors: function(d) {
                if (d) {
                    var e = this;
                    a.extend(this.errorMap, d);
                    this.errorList = a.map(this.errorMap, function(f, g) {
                        return {
                            message: f,
                            element: e.findByName(g)[0]
                        }
                    });
                    this.successList = a.grep(this.successList, function(f) {
                        return !(f.name in d)
                    })
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList)
                } else {
                    this.defaultShowErrors()
                }
            },
            resetForm: function() {
                if (a.fn.resetForm) {
                    a(this.currentForm).resetForm()
                }
                this.invalid = {};
                this.submitted = {};
                this.prepareForm();
                this.hideErrors();
                var d = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(d)
            },
            resetElements: function(d) {
                var e;
                if (this.settings.unhighlight) {
                    for (e = 0; d[e]; e++) {
                        this.settings.unhighlight.call(this, d[e], this.settings.errorClass, "");
                        this.findByName(d[e].name).removeClass(this.settings.validClass)
                    }
                } else {
                    d.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
                }
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(f) {
                var d = 0,
                    e;
                for (e in f) {
                    if (f[e]) {
                        d++
                    }
                }
                return d
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(d) {
                d.not(this.containers).text("");
                this.addWrapper(d).hide()
            },
            valid: function() {
                return this.size() === 0
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid) {
                    try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (d) {}
                }
            },
            findLastActive: function() {
                var d = this.lastActive;
                return d && a.grep(this.errorList, function(e) {
                    return e.element.name === d.name
                }).length === 1 && d
            },
            elements: function() {
                var e = this,
                    d = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
                    var f = this.name || a(this).attr("name");
                    if (!f && e.settings.debug && window.console) {
                        console.error("%o has no name assigned", this)
                    }
                    if (this.hasAttribute("contenteditable")) {
                        this.form = a(this).closest("form")[0]
                    }
                    if (f in d || !e.objectLength(a(this).rules())) {
                        return false
                    }
                    d[f] = true;
                    return true
                })
            },
            clean: function(d) {
                return a(d)[0]
            },
            errors: function() {
                var d = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + d, this.errorContext)
            },
            resetInternals: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = a([]);
                this.toHide = a([])
            },
            reset: function() {
                this.resetInternals();
                this.currentElements = a([])
            },
            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(d) {
                this.reset();
                this.toHide = this.errorsFor(d)
            },
            elementValue: function(e) {
                var d = a(e),
                    g = e.type,
                    h, f;
                if (g === "radio" || g === "checkbox") {
                    return this.findByName(e.name).filter(":checked").val()
                } else {
                    if (g === "number" && typeof e.validity !== "undefined") {
                        return e.validity.badInput ? "NaN" : d.val()
                    }
                }
                if (e.hasAttribute("contenteditable")) {
                    h = d.text()
                } else {
                    h = d.val()
                }
                if (g === "file") {
                    if (h.substr(0, 12) === "C:\\fakepath\\") {
                        return h.substr(12)
                    }
                    f = h.lastIndexOf("/");
                    if (f >= 0) {
                        return h.substr(f + 1)
                    }
                    f = h.lastIndexOf("\\");
                    if (f >= 0) {
                        return h.substr(f + 1)
                    }
                    return h
                }
                if (typeof h === "string") {
                    return h.replace(/\r/g, "")
                }
                return h
            },
            check: function(g) {
                g = this.validationTargetFor(this.clean(g));
                var k = a(g).rules(),
                    l = a.map(k, function(o, e) {
                        return e
                    }).length,
                    d = false,
                    m = this.elementValue(g),
                    i, h, j;
                if (typeof k.normalizer === "function") {
                    m = k.normalizer.call(g, m);
                    if (typeof m !== "string") {
                        throw new TypeError("The normalizer should return a string value.")
                    }
                    delete k.normalizer
                }
                for (h in k) {
                    j = {
                        method: h,
                        parameters: k[h]
                    };
                    try {
                        i = a.validator.methods[h].call(this, m, g, j.parameters);
                        if (i === "dependency-mismatch" && l === 1) {
                            d = true;
                            continue
                        }
                        d = false;
                        if (i === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(g));
                            return
                        }
                        if (!i) {
                            this.formatAndAdd(g, j);
                            return false
                        }
                    } catch (f) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + g.id + ", check the '" + j.method + "' method.", f)
                        }
                        if (f instanceof TypeError) {
                            f.message += ".  Exception occurred when checking element " + g.id + ", check the '" + j.method + "' method."
                        }
                        throw f
                    }
                }
                if (d) {
                    return
                }
                if (this.objectLength(k)) {
                    this.successList.push(g)
                }
                return true
            },
            customDataMessage: function(d, e) {
                return a(d).data("msg" + e.charAt(0).toUpperCase() + e.substring(1).toLowerCase()) || a(d).data("msg")
            },
            customMessage: function(f, e) {
                var d = this.settings.messages[f];
                return d && (d.constructor === String ? d : d[e])
            },
            findDefined: function() {
                for (var d = 0; d < arguments.length; d++) {
                    if (arguments[d] !== undefined) {
                        return arguments[d]
                    }
                }
                return undefined
            },
            defaultMessage: function(d, f) {
                var e = this.findDefined(this.customMessage(d.name, f.method), this.customDataMessage(d, f.method), !this.settings.ignoreTitle && d.title || undefined, a.validator.messages[f.method], "<strong>Warning: No message defined for " + d.name + "</strong>"),
                    g = /\$?\{(\d+)\}/g;
                if (typeof e === "function") {
                    e = e.call(this, f.parameters, d)
                } else {
                    if (g.test(e)) {
                        e = a.validator.format(e.replace(g, "{$1}"), f.parameters)
                    }
                }
                return e
            },
            formatAndAdd: function(d, f) {
                var e = this.defaultMessage(d, f);
                this.errorList.push({
                    message: e,
                    element: d,
                    method: f.method
                });
                this.errorMap[d.name] = e;
                this.submitted[d.name] = e
            },
            addWrapper: function(d) {
                if (this.settings.wrapper) {
                    d = d.add(d.parent(this.settings.wrapper))
                }
                return d
            },
            defaultShowErrors: function() {
                var f, d, e;
                for (f = 0; this.errorList[f]; f++) {
                    e = this.errorList[f];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, e.element, this.settings.errorClass, this.settings.validClass)
                    }
                    this.showLabel(e.element, e.message)
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers)
                }
                if (this.settings.success) {
                    for (f = 0; this.successList[f]; f++) {
                        this.showLabel(this.successList[f])
                    }
                }
                if (this.settings.unhighlight) {
                    for (f = 0, d = this.validElements(); d[f]; f++) {
                        this.settings.unhighlight.call(this, d[f], this.settings.errorClass, this.settings.validClass)
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return a(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(e, j) {
                var k, i, h, l, g = this.errorsFor(e),
                    f = this.idOrName(e),
                    d = a(e).attr("aria-describedby");
                if (g.length) {
                    g.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    g.html(j)
                } else {
                    g = a("<" + this.settings.errorElement + ">").attr("id", f + "-error").addClass(this.settings.errorClass).html(j || "");
                    k = g;
                    if (this.settings.wrapper) {
                        k = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()
                    }
                    if (this.labelContainer.length) {
                        this.labelContainer.append(k)
                    } else {
                        if (this.settings.errorPlacement) {
                            this.settings.errorPlacement(k, a(e))
                        } else {
                            k.insertAfter(e)
                        }
                    }
                    if (g.is("label")) {
                        g.attr("for", f)
                    } else {
                        if (g.parents("label[for='" + this.escapeCssMeta(f) + "']").length === 0) {
                            h = g.attr("id");
                            if (!d) {
                                d = h
                            } else {
                                if (!d.match(new RegExp("\\b" + this.escapeCssMeta(h) + "\\b"))) {
                                    d += " " + h
                                }
                            }
                            a(e).attr("aria-describedby", d);
                            i = this.groups[e.name];
                            if (i) {
                                l = this;
                                a.each(l.groups, function(m, n) {
                                    if (n === i) {
                                        a("[name='" + l.escapeCssMeta(m) + "']", l.currentForm).attr("aria-describedby", g.attr("id"))
                                    }
                                })
                            }
                        }
                    }
                }
                if (!j && this.settings.success) {
                    g.text("");
                    if (typeof this.settings.success === "string") {
                        g.addClass(this.settings.success)
                    } else {
                        this.settings.success(g, e)
                    }
                }
                this.toShow = this.toShow.add(g)
            },
            errorsFor: function(e) {
                var f = this.escapeCssMeta(this.idOrName(e)),
                    d = a(e).attr("aria-describedby"),
                    g = "label[for='" + f + "'], label[for='" + f + "'] *";
                if (d) {
                    g = g + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")
                }
                return this.errors().filter(g)
            },
            escapeCssMeta: function(d) {
                return d.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function(d) {
                return this.groups[d.name] || (this.checkable(d) ? d.name : d.id || d.name)
            },
            validationTargetFor: function(d) {
                if (this.checkable(d)) {
                    d = this.findByName(d.name)
                }
                return a(d).not(this.settings.ignore)[0]
            },
            checkable: function(d) {
                return (/radio|checkbox/i).test(d.type)
            },
            findByName: function(d) {
                return a(this.currentForm).find("[name='" + this.escapeCssMeta(d) + "']")
            },
            getLength: function(e, d) {
                switch (d.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", d).length;
                    case "input":
                        if (this.checkable(d)) {
                            return this.findByName(d.name).filter(":checked").length
                        }
                }
                return e.length
            },
            depend: function(e, d) {
                return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, d) : true
            },
            dependTypes: {
                "boolean": function(d) {
                    return d
                },
                string: function(e, d) {
                    return !!a(e, d.form).length
                },
                "function": function(e, d) {
                    return e(d)
                }
            },
            optional: function(d) {
                var e = this.elementValue(d);
                return !a.validator.methods.required.call(this, e, d) && "dependency-mismatch"
            },
            startRequest: function(d) {
                if (!this.pending[d.name]) {
                    this.pendingRequest++;
                    a(d).addClass(this.settings.pendingClass);
                    this.pending[d.name] = true
                }
            },
            stopRequest: function(d, e) {
                this.pendingRequest--;
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0
                }
                delete this.pending[d.name];
                a(d).removeClass(this.settings.pendingClass);
                if (e && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    a(this.currentForm).submit();
                    this.formSubmitted = false
                } else {
                    if (!e && this.pendingRequest === 0 && this.formSubmitted) {
                        a(this.currentForm).triggerHandler("invalid-form", [this]);
                        this.formSubmitted = false
                    }
                }
            },
            previousValue: function(d, e) {
                return a.data(d, "previousValue") || a.data(d, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(d, {
                        method: e
                    })
                })
            },
            destroy: function() {
                this.resetForm();
                a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            number: {
                number: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },
        addClassRules: function(d, e) {
            if (d.constructor === String) {
                this.classRuleSettings[d] = e
            } else {
                a.extend(this.classRuleSettings, d)
            }
        },
        classRules: function(e) {
            var f = {},
                d = a(e).attr("class");
            if (d) {
                a.each(d.split(" "), function() {
                    if (this in a.validator.classRuleSettings) {
                        a.extend(f, a.validator.classRuleSettings[this])
                    }
                })
            }
            return f
        },
        normalizeAttributeRule: function(e, f, d, g) {
            if (/min|max|step/.test(d) && (f === null || /number|range|text/.test(f))) {
                g = Number(g);
                if (isNaN(g)) {
                    g = undefined
                }
            }
            if (g || g === 0) {
                e[d] = g
            } else {
                if (f === d && f !== "range") {
                    e[d] = true
                }
            }
        },
        attributeRules: function(e) {
            var g = {},
                d = a(e),
                h = e.getAttribute("type"),
                f, i;
            for (f in a.validator.methods) {
                if (f === "required") {
                    i = e.getAttribute(f);
                    if (i === "") {
                        i = true
                    }
                    i = !!i
                } else {
                    i = d.attr(f)
                }
                this.normalizeAttributeRule(g, h, f, i)
            }
            if (g.maxlength && /-1|2147483647|524288/.test(g.maxlength)) {
                delete g.maxlength
            }
            return g
        },
        dataRules: function(e) {
            var g = {},
                d = a(e),
                h = e.getAttribute("type"),
                f, i;
            for (f in a.validator.methods) {
                i = d.data("rule" + f.charAt(0).toUpperCase() + f.substring(1).toLowerCase());
                this.normalizeAttributeRule(g, h, f, i)
            }
            return g
        },
        staticRules: function(d) {
            var e = {},
                f = a.data(d.form, "validator");
            if (f.settings.rules) {
                e = a.validator.normalizeRule(f.settings.rules[d.name]) || {}
            }
            return e
        },
        normalizeRules: function(e, d) {
            a.each(e, function(g, h) {
                if (h === false) {
                    delete e[g];
                    return
                }
                if (h.param || h.depends) {
                    var f = true;
                    switch (typeof h.depends) {
                        case "string":
                            f = !!a(h.depends, d.form).length;
                            break;
                        case "function":
                            f = h.depends.call(d, d);
                            break
                    }
                    if (f) {
                        e[g] = h.param !== undefined ? h.param : true
                    } else {
                        a.data(d.form, "validator").resetElements(a(d));
                        delete e[g]
                    }
                }
            });
            a.each(e, function(g, f) {
                e[g] = a.isFunction(f) && g !== "normalizer" ? f(d) : f
            });
            a.each(["minlength", "maxlength"], function() {
                if (e[this]) {
                    e[this] = Number(e[this])
                }
            });
            a.each(["rangelength", "range"], function() {
                var f;
                if (e[this]) {
                    if (a.isArray(e[this])) {
                        e[this] = [Number(e[this][0]), Number(e[this][1])]
                    } else {
                        if (typeof e[this] === "string") {
                            f = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                            e[this] = [Number(f[0]), Number(f[1])]
                        }
                    }
                }
            });
            if (a.validator.autoCreateRanges) {
                if (e.min != null && e.max != null) {
                    e.range = [e.min, e.max];
                    delete e.min;
                    delete e.max
                }
                if (e.minlength != null && e.maxlength != null) {
                    e.rangelength = [e.minlength, e.maxlength];
                    delete e.minlength;
                    delete e.maxlength
                }
            }
            return e
        },
        normalizeRule: function(d) {
            if (typeof d === "string") {
                var e = {};
                a.each(d.split(/\s/), function() {
                    e[this] = true
                });
                d = e
            }
            return d
        },
        addMethod: function(f, e, d) {
            a.validator.methods[f] = e;
            a.validator.messages[f] = d !== undefined ? d : a.validator.messages[f];
            if (e.length < 3) {
                a.validator.addClassRules(f, a.validator.normalizeRule(f))
            }
        },
        methods: {
            required: function(g, d, e) {
                if (!this.depend(e, d)) {
                    return "dependency-mismatch"
                }
                if (d.nodeName.toLowerCase() === "select") {
                    var f = a(d).val();
                    return f && f.length > 0
                }
                if (this.checkable(d)) {
                    return this.getLength(g, d) > 0
                }
                return g.length > 0
            },
            email: function(e, d) {
                return this.optional(d) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            },
            url: function(e, d) {
                return this.optional(d) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)
            },
            date: function(e, d) {
                return this.optional(d) || !/Invalid|NaN/.test(new Date(e).toString())
            },
            dateISO: function(e, d) {
                return this.optional(d) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            },
            number: function(e, d) {
                return this.optional(d) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, d) {
                return this.optional(d) || /^\d+$/.test(e)
            },
            minlength: function(g, d, f) {
                var e = a.isArray(g) ? g.length : this.getLength(g, d);
                return this.optional(d) || e >= f
            },
            maxlength: function(g, d, f) {
                var e = a.isArray(g) ? g.length : this.getLength(g, d);
                return this.optional(d) || e <= f
            },
            rangelength: function(g, d, f) {
                var e = a.isArray(g) ? g.length : this.getLength(g, d);
                return this.optional(d) || (e >= f[0] && e <= f[1])
            },
            min: function(f, d, e) {
                return this.optional(d) || f >= e
            },
            max: function(f, d, e) {
                return this.optional(d) || f <= e
            },
            range: function(f, d, e) {
                return this.optional(d) || (f >= e[0] && f <= e[1])
            },
            step: function(k, d, g) {
                var j = a(d).attr("type"),
                    e = "Step attribute on input type " + j + " is not supported.",
                    i = ["text", "number", "range"],
                    h = new RegExp("\\b" + j + "\\b"),
                    f = j && !h.test(i.join());
                if (f) {
                    throw new Error(e)
                }
                return this.optional(d) || (k % g === 0)
            },
            equalTo: function(g, d, e) {
                var f = a(e);
                if (this.settings.onfocusout && f.not(".validate-equalTo-blur").length) {
                    f.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
                        a(d).valid()
                    })
                }
                return g === f.val()
            },
            remote: function(k, e, h, f) {
                if (this.optional(e)) {
                    return "dependency-mismatch"
                }
                f = typeof f === "string" && f || "remote";
                var i = this.previousValue(e, f),
                    j, d, g;
                if (!this.settings.messages[e.name]) {
                    this.settings.messages[e.name] = {}
                }
                i.originalMessage = i.originalMessage || this.settings.messages[e.name][f];
                this.settings.messages[e.name][f] = i.message;
                h = typeof h === "string" && {
                    url: h
                } || h;
                g = a.param(a.extend({
                    data: k
                }, h.data));
                if (i.old === g) {
                    return i.valid
                }
                i.old = g;
                j = this;
                this.startRequest(e);
                d = {};
                d[e.name] = k;
                a.ajax(a.extend(true, {
                    mode: "abort",
                    port: "validate" + e.name,
                    dataType: "json",
                    data: d,
                    context: j.currentForm,
                    success: function(n) {
                        var p = n === true || n === "true",
                            l, m, o;
                        j.settings.messages[e.name][f] = i.originalMessage;
                        if (p) {
                            o = j.formSubmitted;
                            j.resetInternals();
                            j.toHide = j.errorsFor(e);
                            j.formSubmitted = o;
                            j.successList.push(e);
                            j.invalid[e.name] = false;
                            j.showErrors()
                        } else {
                            l = {};
                            m = n || j.defaultMessage(e, {
                                method: f,
                                parameters: k
                            });
                            l[e.name] = i.message = m;
                            j.invalid[e.name] = true;
                            j.showErrors(l)
                        }
                        i.valid = p;
                        j.stopRequest(e, p)
                    }
                }, h));
                return "pending"
            }
        }
    });
    var c = {},
        b;
    if (a.ajaxPrefilter) {
        a.ajaxPrefilter(function(f, d, g) {
            var e = f.port;
            if (f.mode === "abort") {
                if (c[e]) {
                    c[e].abort()
                }
                c[e] = g
            }
        })
    } else {
        b = a.ajax;
        a.ajax = function(f) {
            var d = ("mode" in f ? f : a.ajaxSettings).mode,
                e = ("port" in f ? f : a.ajaxSettings).port;
            if (d === "abort") {
                if (c[e]) {
                    c[e].abort()
                }
                c[e] = b.apply(this, arguments);
                return c[e]
            }
            return b.apply(this, arguments)
        }
    }
}));