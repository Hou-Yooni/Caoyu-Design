var pJS = function(d, b) {
    var a = document.querySelector("#" + d + " > .particles-js-canvas-el");
    this.pJS = {
        canvas: {
            el: a,
            w: a.offsetWidth,
            h: a.offsetHeight
        },
        particles: {
            number: {
                value: 400,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#fff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#ff0000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: 1,
                random: false,
                anim: {
                    enable: false,
                    speed: 2,
                    opacity_min: 0,
                    sync: false
                }
            },
            size: {
                value: 20,
                random: false,
                anim: {
                    enable: false,
                    speed: 20,
                    size_min: 0,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 100,
                color: "#fff",
                opacity: 1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 3000,
                    rotateY: 3000
                }
            },
            array: []
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 100,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 200,
                    size: 80,
                    duration: 0.4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            },
            mouse: {}
        },
        retina_detect: false,
        fn: {
            interact: {},
            modes: {},
            vendors: {}
        },
        tmp: {}
    };
    var c = this.pJS;
    if (b) {
        Object.deepExtend(c, b)
    }
    c.tmp.obj = {
        size_value: c.particles.size.value,
        size_anim_speed: c.particles.size.anim.speed,
        move_speed: c.particles.move.speed,
        line_linked_distance: c.particles.line_linked.distance,
        line_linked_width: c.particles.line_linked.width,
        mode_grab_distance: c.interactivity.modes.grab.distance,
        mode_bubble_distance: c.interactivity.modes.bubble.distance,
        mode_bubble_size: c.interactivity.modes.bubble.size,
        mode_repulse_distance: c.interactivity.modes.repulse.distance
    };
    c.fn.retinaInit = function() {
        if (c.retina_detect && window.devicePixelRatio > 1) {
            c.canvas.pxratio = window.devicePixelRatio;
            c.tmp.retina = true
        } else {
            c.canvas.pxratio = 1;
            c.tmp.retina = false
        }
        c.canvas.w = c.canvas.el.offsetWidth * c.canvas.pxratio;
        c.canvas.h = c.canvas.el.offsetHeight * c.canvas.pxratio;
        c.particles.size.value = c.tmp.obj.size_value * c.canvas.pxratio;
        c.particles.size.anim.speed = c.tmp.obj.size_anim_speed * c.canvas.pxratio;
        c.particles.move.speed = c.tmp.obj.move_speed * c.canvas.pxratio;
        c.particles.line_linked.distance = c.tmp.obj.line_linked_distance * c.canvas.pxratio;
        c.interactivity.modes.grab.distance = c.tmp.obj.mode_grab_distance * c.canvas.pxratio;
        c.interactivity.modes.bubble.distance = c.tmp.obj.mode_bubble_distance * c.canvas.pxratio;
        c.particles.line_linked.width = c.tmp.obj.line_linked_width * c.canvas.pxratio;
        c.interactivity.modes.bubble.size = c.tmp.obj.mode_bubble_size * c.canvas.pxratio;
        c.interactivity.modes.repulse.distance = c.tmp.obj.mode_repulse_distance * c.canvas.pxratio
    };
    c.fn.canvasInit = function() {
        c.canvas.ctx = c.canvas.el.getContext("2d")
    };
    c.fn.canvasSize = function() {
        c.canvas.el.width = c.canvas.w;
        c.canvas.el.height = c.canvas.h;
        if (c && c.interactivity.events.resize) {
            window.addEventListener("resize", function() {
                c.canvas.w = c.canvas.el.offsetWidth;
                c.canvas.h = c.canvas.el.offsetHeight;
                if (c.tmp.retina) {
                    c.canvas.w *= c.canvas.pxratio;
                    c.canvas.h *= c.canvas.pxratio
                }
                c.canvas.el.width = c.canvas.w;
                c.canvas.el.height = c.canvas.h;
                if (!c.particles.move.enable) {
                    c.fn.particlesEmpty();
                    c.fn.particlesCreate();
                    c.fn.particlesDraw();
                    c.fn.vendors.densityAutoParticles()
                }
                c.fn.vendors.densityAutoParticles()
            })
        }
    };
    c.fn.canvasPaint = function() {
        c.canvas.ctx.fillRect(0, 0, c.canvas.w, c.canvas.h)
    };
    c.fn.canvasClear = function() {
        c.canvas.ctx.clearRect(0, 0, c.canvas.w, c.canvas.h)
    };
    c.fn.particle = function(e, g, h) {
        this.radius = (c.particles.size.random ? Math.random() : 1) * c.particles.size.value;
        if (c.particles.size.anim.enable) {
            this.size_status = false;
            this.vs = c.particles.size.anim.speed / 100;
            if (!c.particles.size.anim.sync) {
                this.vs = this.vs * Math.random()
            }
        }
        this.x = h ? h.x : Math.random() * c.canvas.w;
        this.y = h ? h.y : Math.random() * c.canvas.h;
        if (this.x > c.canvas.w - this.radius * 2) {
            this.x = this.x - this.radius
        } else {
            if (this.x < this.radius * 2) {
                this.x = this.x + this.radius
            }
        }
        if (this.y > c.canvas.h - this.radius * 2) {
            this.y = this.y - this.radius
        } else {
            if (this.y < this.radius * 2) {
                this.y = this.y + this.radius
            }
        }
        if (c.particles.move.bounce) {
            c.fn.vendors.checkOverlap(this, h)
        }
        this.color = {};
        if (typeof(e.value) == "object") {
            if (e.value instanceof Array) {
                var f = e.value[Math.floor(Math.random() * c.particles.color.value.length)];
                this.color.rgb = hexToRgb(f)
            } else {
                if (e.value.r != undefined && e.value.g != undefined && e.value.b != undefined) {
                    this.color.rgb = {
                        r: e.value.r,
                        g: e.value.g,
                        b: e.value.b
                    }
                }
                if (e.value.h != undefined && e.value.s != undefined && e.value.l != undefined) {
                    this.color.hsl = {
                        h: e.value.h,
                        s: e.value.s,
                        l: e.value.l
                    }
                }
            }
        } else {
            if (e.value == "random") {
                this.color.rgb = {
                    r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
                    g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
                    b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
                }
            } else {
                if (typeof(e.value) == "string") {
                    this.color = e;
                    this.color.rgb = hexToRgb(this.color.value)
                }
            }
        }
        this.opacity = (c.particles.opacity.random ? Math.random() : 1) * c.particles.opacity.value;
        if (c.particles.opacity.anim.enable) {
            this.opacity_status = false;
            this.vo = c.particles.opacity.anim.speed / 100;
            if (!c.particles.opacity.anim.sync) {
                this.vo = this.vo * Math.random()
            }
        }
        var l = {};
        switch (c.particles.move.direction) {
            case "top":
                l = {
                    x: 0,
                    y: -1
                };
                break;
            case "top-right":
                l = {
                    x: 0.5,
                    y: -0.5
                };
                break;
            case "right":
                l = {
                    x: 1,
                    y: -0
                };
                break;
            case "bottom-right":
                l = {
                    x: 0.5,
                    y: 0.5
                };
                break;
            case "bottom":
                l = {
                    x: 0,
                    y: 1
                };
                break;
            case "bottom-left":
                l = {
                    x: -0.5,
                    y: 1
                };
                break;
            case "left":
                l = {
                    x: -1,
                    y: 0
                };
                break;
            case "top-left":
                l = {
                    x: -0.5,
                    y: -0.5
                };
                break;
            default:
                l = {
                    x: 0,
                    y: 0
                };
                break
        }
        if (c.particles.move.straight) {
            this.vx = l.x;
            this.vy = l.y;
            if (c.particles.move.random) {
                this.vx = this.vx * (Math.random());
                this.vy = this.vy * (Math.random())
            }
        } else {
            this.vx = l.x + Math.random() - 0.5;
            this.vy = l.y + Math.random() - 0.5
        }
        this.vx_i = this.vx;
        this.vy_i = this.vy;
        var k = c.particles.shape.type;
        if (typeof(k) == "object") {
            if (k instanceof Array) {
                var j = k[Math.floor(Math.random() * k.length)];
                this.shape = j
            }
        } else {
            this.shape = k
        }
        if (this.shape == "image") {
            var i = c.particles.shape;
            this.img = {
                src: i.image.src,
                ratio: i.image.width / i.image.height
            };
            if (!this.img.ratio) {
                this.img.ratio = 1
            }
            if (c.tmp.img_type == "svg" && c.tmp.source_svg != undefined) {
                c.fn.vendors.createSvgImg(this);
                if (c.tmp.pushing) {
                    this.img.loaded = false
                }
            }
        }
    };
    c.fn.particle.prototype.draw = function() {
        var i = this;
        if (i.radius_bubble != undefined) {
            var j = i.radius_bubble
        } else {
            var j = i.radius
        }
        if (i.opacity_bubble != undefined) {
            var h = i.opacity_bubble
        } else {
            var h = i.opacity
        }
        if (i.color.rgb) {
            var e = "rgba(" + i.color.rgb.r + "," + i.color.rgb.g + "," + i.color.rgb.b + "," + h + ")"
        } else {
            var e = "hsla(" + i.color.hsl.h + "," + i.color.hsl.s + "%," + i.color.hsl.l + "%," + h + ")"
        }
        c.canvas.ctx.fillStyle = e;
        c.canvas.ctx.beginPath();
        switch (i.shape) {
            case "circle":
                c.canvas.ctx.arc(i.x, i.y, j, 0, Math.PI * 2, false);
                break;
            case "edge":
                c.canvas.ctx.rect(i.x - j, i.y - j, j * 2, j * 2);
                break;
            case "triangle":
                c.fn.vendors.drawShape(c.canvas.ctx, i.x - j, i.y + j / 1.66, j * 2, 3, 2);
                break;
            case "polygon":
                c.fn.vendors.drawShape(c.canvas.ctx, i.x - j / (c.particles.shape.polygon.nb_sides / 3.5), i.y - j / (2.66 / 3.5), j * 2.66 / (c.particles.shape.polygon.nb_sides / 3), c.particles.shape.polygon.nb_sides, 1);
                break;
            case "star":
                c.fn.vendors.drawShape(c.canvas.ctx, i.x - j * 2 / (c.particles.shape.polygon.nb_sides / 4), i.y - j / (2 * 2.66 / 3.5), j * 2 * 2.66 / (c.particles.shape.polygon.nb_sides / 3), c.particles.shape.polygon.nb_sides, 2);
                break;
            case "image":
                function f() {
                    c.canvas.ctx.drawImage(g, i.x - j, i.y - j, j * 2, j * 2 / i.img.ratio)
                }
                if (c.tmp.img_type == "svg") {
                    var g = i.img.obj
                } else {
                    var g = c.tmp.img_obj
                }
                if (g) {
                    f()
                }
                break
        }
        c.canvas.ctx.closePath();
        if (c.particles.shape.stroke.width > 0) {
            c.canvas.ctx.strokeStyle = c.particles.shape.stroke.color;
            c.canvas.ctx.lineWidth = c.particles.shape.stroke.width;
            c.canvas.ctx.stroke()
        }
        c.canvas.ctx.fill()
    };
    c.fn.particlesCreate = function() {
        for (var e = 0; e < c.particles.number.value; e++) {
            c.particles.array.push(new c.fn.particle(c.particles.color, c.particles.opacity.value))
        }
    };
    c.fn.particlesUpdate = function() {
        for (var e = 0; e < c.particles.array.length; e++) {
            var k = c.particles.array[e];
            if (c.particles.move.enable) {
                var g = c.particles.move.speed / 2;
                k.x += k.vx * g;
                k.y += k.vy * g
            }
            if (c.particles.opacity.anim.enable) {
                if (k.opacity_status == true) {
                    if (k.opacity >= c.particles.opacity.value) {
                        k.opacity_status = false
                    }
                    k.opacity += k.vo
                } else {
                    if (k.opacity <= c.particles.opacity.anim.opacity_min) {
                        k.opacity_status = true
                    }
                    k.opacity -= k.vo
                }
                if (k.opacity < 0) {
                    k.opacity = 0
                }
            }
            if (c.particles.size.anim.enable) {
                if (k.size_status == true) {
                    if (k.radius >= c.particles.size.value) {
                        k.size_status = false
                    }
                    k.radius += k.vs
                } else {
                    if (k.radius <= c.particles.size.anim.size_min) {
                        k.size_status = true
                    }
                    k.radius -= k.vs
                }
                if (k.radius < 0) {
                    k.radius = 0
                }
            }
            if (c.particles.move.out_mode == "bounce") {
                var h = {
                    x_left: k.radius,
                    x_right: c.canvas.w,
                    y_top: k.radius,
                    y_bottom: c.canvas.h
                }
            } else {
                var h = {
                    x_left: -k.radius,
                    x_right: c.canvas.w + k.radius,
                    y_top: -k.radius,
                    y_bottom: c.canvas.h + k.radius
                }
            }
            if (k.x - k.radius > c.canvas.w) {
                k.x = h.x_left;
                k.y = Math.random() * c.canvas.h
            } else {
                if (k.x + k.radius < 0) {
                    k.x = h.x_right;
                    k.y = Math.random() * c.canvas.h
                }
            }
            if (k.y - k.radius > c.canvas.h) {
                k.y = h.y_top;
                k.x = Math.random() * c.canvas.w
            } else {
                if (k.y + k.radius < 0) {
                    k.y = h.y_bottom;
                    k.x = Math.random() * c.canvas.w
                }
            }
            switch (c.particles.move.out_mode) {
                case "bounce":
                    if (k.x + k.radius > c.canvas.w) {
                        k.vx = -k.vx
                    } else {
                        if (k.x - k.radius < 0) {
                            k.vx = -k.vx
                        }
                    }
                    if (k.y + k.radius > c.canvas.h) {
                        k.vy = -k.vy
                    } else {
                        if (k.y - k.radius < 0) {
                            k.vy = -k.vy
                        }
                    }
                    break
            }
            if (isInArray("grab", c.interactivity.events.onhover.mode)) {
                c.fn.modes.grabParticle(k)
            }
            if (isInArray("bubble", c.interactivity.events.onhover.mode) || isInArray("bubble", c.interactivity.events.onclick.mode)) {
                c.fn.modes.bubbleParticle(k)
            }
            if (isInArray("repulse", c.interactivity.events.onhover.mode) || isInArray("repulse", c.interactivity.events.onclick.mode)) {
                c.fn.modes.repulseParticle(k)
            }
            if (c.particles.line_linked.enable || c.particles.move.attract.enable) {
                for (var f = e + 1; f < c.particles.array.length; f++) {
                    var l = c.particles.array[f];
                    if (c.particles.line_linked.enable) {
                        c.fn.interact.linkParticles(k, l)
                    }
                    if (c.particles.move.attract.enable) {
                        c.fn.interact.attractParticles(k, l)
                    }
                    if (c.particles.move.bounce) {
                        c.fn.interact.bounceParticles(k, l)
                    }
                }
            }
        }
    };
    c.fn.particlesDraw = function() {
        c.canvas.ctx.clearRect(0, 0, c.canvas.w, c.canvas.h);
        c.fn.particlesUpdate();
        for (var e = 0; e < c.particles.array.length; e++) {
            var f = c.particles.array[e];
            f.draw()
        }
    };
    c.fn.particlesEmpty = function() {
        c.particles.array = []
    };
    c.fn.particlesRefresh = function() {
        cancelRequestAnimFrame(c.fn.checkAnimFrame);
        cancelRequestAnimFrame(c.fn.drawAnimFrame);
        c.tmp.source_svg = undefined;
        c.tmp.img_obj = undefined;
        c.tmp.count_svg = 0;
        c.fn.particlesEmpty();
        c.fn.canvasClear();
        c.fn.vendors.start()
    };
    c.fn.interact.linkParticles = function(j, k) {
        var g = j.x - k.x,
            h = j.y - k.y,
            f = Math.sqrt(g * g + h * h);
        if (f <= c.particles.line_linked.distance) {
            var i = c.particles.line_linked.opacity - (f / (1 / c.particles.line_linked.opacity)) / c.particles.line_linked.distance;
            if (i > 0) {
                var e = c.particles.line_linked.color_rgb_line;
                c.canvas.ctx.strokeStyle = "rgba(" + e.r + "," + e.g + "," + e.b + "," + i + ")";
                c.canvas.ctx.lineWidth = c.particles.line_linked.width;
                c.canvas.ctx.beginPath();
                c.canvas.ctx.moveTo(j.x, j.y);
                c.canvas.ctx.lineTo(k.x, k.y);
                c.canvas.ctx.stroke();
                c.canvas.ctx.closePath()
            }
        }
    };
    c.fn.interact.attractParticles = function(j, k) {
        var h = j.x - k.x,
            i = j.y - k.y,
            g = Math.sqrt(h * h + i * i);
        if (g <= c.particles.line_linked.distance) {
            var e = h / (c.particles.move.attract.rotateX * 1000),
                f = i / (c.particles.move.attract.rotateY * 1000);
            j.vx -= e;
            j.vy -= f;
            k.vx += e;
            k.vy += f
        }
    };
    c.fn.interact.bounceParticles = function(i, j) {
        var g = i.x - j.x,
            h = i.y - j.y,
            e = Math.sqrt(g * g + h * h),
            f = i.radius + j.radius;
        if (e <= f) {
            i.vx = -i.vx;
            i.vy = -i.vy;
            j.vx = -j.vx;
            j.vy = -j.vy
        }
    };
    c.fn.modes.pushParticles = function(f, g) {
        c.tmp.pushing = true;
        for (var e = 0; e < f; e++) {
            c.particles.array.push(new c.fn.particle(c.particles.color, c.particles.opacity.value, {
                x: g ? g.pos_x : Math.random() * c.canvas.w,
                y: g ? g.pos_y : Math.random() * c.canvas.h
            }));
            if (e == f - 1) {
                if (!c.particles.move.enable) {
                    c.fn.particlesDraw()
                }
                c.tmp.pushing = false
            }
        }
    };
    c.fn.modes.removeParticles = function(e) {
        c.particles.array.splice(0, e);
        if (!c.particles.move.enable) {
            c.fn.particlesDraw()
        }
    };
    c.fn.modes.bubbleParticle = function(k) {
        if (c.interactivity.events.onhover.enable && isInArray("bubble", c.interactivity.events.onhover.mode)) {
            var g = k.x - c.interactivity.mouse.pos_x,
                h = k.y - c.interactivity.mouse.pos_y,
                f = Math.sqrt(g * g + h * h),
                m = 1 - f / c.interactivity.modes.bubble.distance;

            function i() {
                k.opacity_bubble = k.opacity;
                k.radius_bubble = k.radius
            }
            if (f <= c.interactivity.modes.bubble.distance) {
                if (m >= 0 && c.interactivity.status == "mousemove") {
                    if (c.interactivity.modes.bubble.size != c.particles.size.value) {
                        if (c.interactivity.modes.bubble.size > c.particles.size.value) {
                            var n = k.radius + (c.interactivity.modes.bubble.size * m);
                            if (n >= 0) {
                                k.radius_bubble = n
                            }
                        } else {
                            var e = k.radius - c.interactivity.modes.bubble.size,
                                n = k.radius - (e * m);
                            if (n > 0) {
                                k.radius_bubble = n
                            } else {
                                k.radius_bubble = 0
                            }
                        }
                    }
                    if (c.interactivity.modes.bubble.opacity != c.particles.opacity.value) {
                        if (c.interactivity.modes.bubble.opacity > c.particles.opacity.value) {
                            var j = c.interactivity.modes.bubble.opacity * m;
                            if (j > k.opacity && j <= c.interactivity.modes.bubble.opacity) {
                                k.opacity_bubble = j
                            }
                        } else {
                            var j = k.opacity - (c.particles.opacity.value - c.interactivity.modes.bubble.opacity) * m;
                            if (j < k.opacity && j >= c.interactivity.modes.bubble.opacity) {
                                k.opacity_bubble = j
                            }
                        }
                    }
                }
            } else {
                i()
            }
            if (c.interactivity.status == "mouseleave") {
                i()
            }
        } else {
            if (c.interactivity.events.onclick.enable && isInArray("bubble", c.interactivity.events.onclick.mode)) {
                if (c.tmp.bubble_clicking) {
                    var g = k.x - c.interactivity.mouse.click_pos_x,
                        h = k.y - c.interactivity.mouse.click_pos_y,
                        f = Math.sqrt(g * g + h * h),
                        o = (new Date().getTime() - c.interactivity.mouse.click_time) / 1000;
                    if (o > c.interactivity.modes.bubble.duration) {
                        c.tmp.bubble_duration_end = true
                    }
                    if (o > c.interactivity.modes.bubble.duration * 2) {
                        c.tmp.bubble_clicking = false;
                        c.tmp.bubble_duration_end = false
                    }
                }

                function l(p, v, u, t, r) {
                    if (p != v) {
                        if (!c.tmp.bubble_duration_end) {
                            if (f <= c.interactivity.modes.bubble.distance) {
                                if (u != undefined) {
                                    var s = u
                                } else {
                                    var s = t
                                }
                                if (s != p) {
                                    var w = t - (o * (t - p) / c.interactivity.modes.bubble.duration);
                                    if (r == "size") {
                                        k.radius_bubble = w
                                    }
                                    if (r == "opacity") {
                                        k.opacity_bubble = w
                                    }
                                }
                            } else {
                                if (r == "size") {
                                    k.radius_bubble = undefined
                                }
                                if (r == "opacity") {
                                    k.opacity_bubble = undefined
                                }
                            }
                        } else {
                            if (u != undefined) {
                                var x = t - (o * (t - p) / c.interactivity.modes.bubble.duration),
                                    q = p - x;
                                w = p + q;
                                if (r == "size") {
                                    k.radius_bubble = w
                                }
                                if (r == "opacity") {
                                    k.opacity_bubble = w
                                }
                            }
                        }
                    }
                }
                if (c.tmp.bubble_clicking) {
                    l(c.interactivity.modes.bubble.size, c.particles.size.value, k.radius_bubble, k.radius, "size");
                    l(c.interactivity.modes.bubble.opacity, c.particles.opacity.value, k.opacity_bubble, k.opacity, "opacity")
                }
            }
        }
    };
    c.fn.modes.repulseParticle = function(m) {
        if (c.interactivity.events.onhover.enable && isInArray("repulse", c.interactivity.events.onhover.mode) && c.interactivity.status == "mousemove") {
            var h = m.x - c.interactivity.mouse.pos_x,
                j = m.y - c.interactivity.mouse.pos_y,
                f = Math.sqrt(h * h + j * j);
            var l = {
                    x: h / f,
                    y: j / f
                },
                r = c.interactivity.modes.repulse.distance,
                s = 100,
                q = clamp((1 / r) * (-1 * Math.pow(f / r, 2) + 1) * r * s, 0, 50);
            var n = {
                x: m.x + l.x * q,
                y: m.y + l.y * q
            };
            if (c.particles.move.out_mode == "bounce") {
                if (n.x - m.radius > 0 && n.x + m.radius < c.canvas.w) {
                    m.x = n.x
                }
                if (n.y - m.radius > 0 && n.y + m.radius < c.canvas.h) {
                    m.y = n.y
                }
            } else {
                m.x = n.x;
                m.y = n.y
            }
        } else {
            if (c.interactivity.events.onclick.enable && isInArray("repulse", c.interactivity.events.onclick.mode)) {
                if (!c.tmp.repulse_finish) {
                    c.tmp.repulse_count++;
                    if (c.tmp.repulse_count == c.particles.array.length) {
                        c.tmp.repulse_finish = true
                    }
                }
                if (c.tmp.repulse_clicking) {
                    var r = Math.pow(c.interactivity.modes.repulse.distance / 6, 3);
                    var g = c.interactivity.mouse.click_pos_x - m.x,
                        i = c.interactivity.mouse.click_pos_y - m.y,
                        e = g * g + i * i;
                    var k = -r / e * 1;

                    function o() {
                        var p = Math.atan2(i, g);
                        m.vx = k * Math.cos(p);
                        m.vy = k * Math.sin(p);
                        if (c.particles.move.out_mode == "bounce") {
                            var t = {
                                x: m.x + m.vx,
                                y: m.y + m.vy
                            };
                            if (t.x + m.radius > c.canvas.w) {
                                m.vx = -m.vx
                            } else {
                                if (t.x - m.radius < 0) {
                                    m.vx = -m.vx
                                }
                            }
                            if (t.y + m.radius > c.canvas.h) {
                                m.vy = -m.vy
                            } else {
                                if (t.y - m.radius < 0) {
                                    m.vy = -m.vy
                                }
                            }
                        }
                    }
                    if (e <= r) {
                        o()
                    }
                } else {
                    if (c.tmp.repulse_clicking == false) {
                        m.vx = m.vx_i;
                        m.vy = m.vy_i
                    }
                }
            }
        }
    };
    c.fn.modes.grabParticle = function(j) {
        if (c.interactivity.events.onhover.enable && c.interactivity.status == "mousemove") {
            var g = j.x - c.interactivity.mouse.pos_x,
                h = j.y - c.interactivity.mouse.pos_y,
                f = Math.sqrt(g * g + h * h);
            if (f <= c.interactivity.modes.grab.distance) {
                var i = c.interactivity.modes.grab.line_linked.opacity - (f / (1 / c.interactivity.modes.grab.line_linked.opacity)) / c.interactivity.modes.grab.distance;
                if (i > 0) {
                    var e = c.particles.line_linked.color_rgb_line;
                    c.canvas.ctx.strokeStyle = "rgba(" + e.r + "," + e.g + "," + e.b + "," + i + ")";
                    c.canvas.ctx.lineWidth = c.particles.line_linked.width;
                    c.canvas.ctx.beginPath();
                    c.canvas.ctx.moveTo(j.x, j.y);
                    c.canvas.ctx.lineTo(c.interactivity.mouse.pos_x, c.interactivity.mouse.pos_y);
                    c.canvas.ctx.stroke();
                    c.canvas.ctx.closePath()
                }
            }
        }
    };
    c.fn.vendors.eventsListeners = function() {
        if (c.interactivity.detect_on == "window") {
            c.interactivity.el = window
        } else {
            c.interactivity.el = c.canvas.el
        }
        if (c.interactivity.events.onhover.enable || c.interactivity.events.onclick.enable) {
            c.interactivity.el.addEventListener("mousemove", function(f) {
                if (c.interactivity.el == window) {
                    var g = f.clientX,
                        h = f.clientY
                } else {
                    var g = f.offsetX || f.clientX,
                        h = f.offsetY || f.clientY
                }
                c.interactivity.mouse.pos_x = g;
                c.interactivity.mouse.pos_y = h;
                if (c.tmp.retina) {
                    c.interactivity.mouse.pos_x *= c.canvas.pxratio;
                    c.interactivity.mouse.pos_y *= c.canvas.pxratio
                }
                c.interactivity.status = "mousemove"
            });
            c.interactivity.el.addEventListener("mouseleave", function(f) {
                c.interactivity.mouse.pos_x = null;
                c.interactivity.mouse.pos_y = null;
                c.interactivity.status = "mouseleave"
            })
        }
        if (c.interactivity.events.onclick.enable) {
            c.interactivity.el.addEventListener("click", function() {
                c.interactivity.mouse.click_pos_x = c.interactivity.mouse.pos_x;
                c.interactivity.mouse.click_pos_y = c.interactivity.mouse.pos_y;
                c.interactivity.mouse.click_time = new Date().getTime();
                if (c.interactivity.events.onclick.enable) {
                    switch (c.interactivity.events.onclick.mode) {
                        case "push":
                            if (c.particles.move.enable) {
                                c.fn.modes.pushParticles(c.interactivity.modes.push.particles_nb, c.interactivity.mouse)
                            } else {
                                if (c.interactivity.modes.push.particles_nb == 1) {
                                    c.fn.modes.pushParticles(c.interactivity.modes.push.particles_nb, c.interactivity.mouse)
                                } else {
                                    if (c.interactivity.modes.push.particles_nb > 1) {
                                        c.fn.modes.pushParticles(c.interactivity.modes.push.particles_nb)
                                    }
                                }
                            }
                            break;
                        case "remove":
                            c.fn.modes.removeParticles(c.interactivity.modes.remove.particles_nb);
                            break;
                        case "bubble":
                            c.tmp.bubble_clicking = true;
                            break;
                        case "repulse":
                            c.tmp.repulse_clicking = true;
                            c.tmp.repulse_count = 0;
                            c.tmp.repulse_finish = false;
                            setTimeout(function() {
                                c.tmp.repulse_clicking = false
                            }, c.interactivity.modes.repulse.duration * 1000);
                            break
                    }
                }
            })
        }
    };
    c.fn.vendors.densityAutoParticles = function() {
        if (c.particles.number.density.enable) {
            var e = c.canvas.el.width * c.canvas.el.height / 1000;
            if (c.tmp.retina) {
                e = e / (c.canvas.pxratio * 2)
            }
            var g = e * c.particles.number.value / c.particles.number.density.value_area;
            var f = c.particles.array.length - g;
            if (f < 0) {
                c.fn.modes.pushParticles(Math.abs(f))
            } else {
                c.fn.modes.removeParticles(f)
            }
        }
    };
    c.fn.vendors.checkOverlap = function(j, l) {
        for (var h = 0; h < c.particles.array.length; h++) {
            var k = c.particles.array[h];
            var f = j.x - k.x,
                g = j.y - k.y,
                e = Math.sqrt(f * f + g * g);
            if (e <= j.radius + k.radius) {
                j.x = l ? l.x : Math.random() * c.canvas.w;
                j.y = l ? l.y : Math.random() * c.canvas.h;
                c.fn.vendors.checkOverlap(j)
            }
        }
    };
    c.fn.vendors.createSvgImg = function(h) {
        var k = c.tmp.source_svg,
            i = /#([0-9A-F]{3,6})/gi,
            e = k.replace(i, function(q, s, p, n) {
                if (h.color.rgb) {
                    var o = "rgba(" + h.color.rgb.r + "," + h.color.rgb.g + "," + h.color.rgb.b + "," + h.opacity + ")"
                } else {
                    var o = "hsla(" + h.color.hsl.h + "," + h.color.hsl.s + "%," + h.color.hsl.l + "%," + h.opacity + ")"
                }
                return o
            });
        var j = new Blob([e], {
                type: "image/svg+xml;charset=utf-8"
            }),
            f = window.URL || window.webkitURL || window,
            l = f.createObjectURL(j);
        var g = new Image();
        g.addEventListener("load", function() {
            h.img.obj = g;
            h.img.loaded = true;
            f.revokeObjectURL(l);
            c.tmp.count_svg++
        });
        g.src = l
    };
    c.fn.vendors.destroypJS = function() {
        cancelAnimationFrame(c.fn.drawAnimFrame);
        a.remove();
        pJSDom = null
    };
    c.fn.vendors.drawShape = function(e, o, p, n, m, l) {
        var k = m * l;
        var f = m / l;
        var j = (180 * (f - 2)) / f;
        var h = Math.PI - Math.PI * j / 180;
        e.save();
        e.beginPath();
        e.translate(o, p);
        e.moveTo(0, 0);
        for (var g = 0; g < k; g++) {
            e.lineTo(n, 0);
            e.translate(n, 0);
            e.rotate(h)
        }
        e.fill();
        e.restore()
    };
    c.fn.vendors.exportImg = function() {
        window.open(c.canvas.el.toDataURL("image/png"), "_blank")
    };
    c.fn.vendors.loadImg = function(f) {
        c.tmp.img_error = undefined;
        if (c.particles.shape.image.src != "") {
            if (f == "svg") {
                var g = new XMLHttpRequest();
                g.open("GET", c.particles.shape.image.src);
                g.onreadystatechange = function(h) {
                    if (g.readyState == 4) {
                        if (g.status == 200) {
                            c.tmp.source_svg = h.currentTarget.response;
                            c.fn.vendors.checkBeforeDraw()
                        } else {
                            console.log("Error pJS - Image not found");
                            c.tmp.img_error = true
                        }
                    }
                };
                g.send()
            } else {
                var e = new Image();
                e.addEventListener("load", function() {
                    c.tmp.img_obj = e;
                    c.fn.vendors.checkBeforeDraw()
                });
                e.src = c.particles.shape.image.src
            }
        } else {
            console.log("Error pJS - No image.src");
            c.tmp.img_error = true
        }
    };
    c.fn.vendors.draw = function() {
        if (c.particles.shape.type == "image") {
            if (c.tmp.img_type == "svg") {
                if (c.tmp.count_svg >= c.particles.number.value) {
                    c.fn.particlesDraw();
                    if (!c.particles.move.enable) {
                        cancelRequestAnimFrame(c.fn.drawAnimFrame)
                    } else {
                        c.fn.drawAnimFrame = requestAnimFrame(c.fn.vendors.draw)
                    }
                } else {
                    if (!c.tmp.img_error) {
                        c.fn.drawAnimFrame = requestAnimFrame(c.fn.vendors.draw)
                    }
                }
            } else {
                if (c.tmp.img_obj != undefined) {
                    c.fn.particlesDraw();
                    if (!c.particles.move.enable) {
                        cancelRequestAnimFrame(c.fn.drawAnimFrame)
                    } else {
                        c.fn.drawAnimFrame = requestAnimFrame(c.fn.vendors.draw)
                    }
                } else {
                    if (!c.tmp.img_error) {
                        c.fn.drawAnimFrame = requestAnimFrame(c.fn.vendors.draw)
                    }
                }
            }
        } else {
            c.fn.particlesDraw();
            if (!c.particles.move.enable) {
                cancelRequestAnimFrame(c.fn.drawAnimFrame)
            } else {
                c.fn.drawAnimFrame = requestAnimFrame(c.fn.vendors.draw)
            }
        }
    };
    c.fn.vendors.checkBeforeDraw = function() {
        if (c.particles.shape.type == "image") {
            if (c.tmp.img_type == "svg" && c.tmp.source_svg == undefined) {
                c.tmp.checkAnimFrame = requestAnimFrame(check)
            } else {
                cancelRequestAnimFrame(c.tmp.checkAnimFrame);
                if (!c.tmp.img_error) {
                    c.fn.vendors.init();
                    c.fn.vendors.draw()
                }
            }
        } else {
            c.fn.vendors.init();
            c.fn.vendors.draw()
        }
    };
    c.fn.vendors.init = function() {
        c.fn.retinaInit();
        c.fn.canvasInit();
        c.fn.canvasSize();
        c.fn.canvasPaint();
        c.fn.particlesCreate();
        c.fn.vendors.densityAutoParticles();
        c.particles.line_linked.color_rgb_line = hexToRgb(c.particles.line_linked.color)
    };
    c.fn.vendors.start = function() {
        if (isInArray("image", c.particles.shape.type)) {
            c.tmp.img_type = c.particles.shape.image.src.substr(c.particles.shape.image.src.length - 3);
            c.fn.vendors.loadImg(c.tmp.img_type)
        } else {
            c.fn.vendors.checkBeforeDraw()
        }
    };
    c.fn.vendors.eventsListeners();
    c.fn.vendors.start()
};
Object.deepExtend = function(a, c) {
    for (var b in c) {
        if (c[b] && c[b].constructor && c[b].constructor === Object) {
            a[b] = a[b] || {};
            arguments.callee(a[b], c[b])
        } else {
            a[b] = c[b]
        }
    }
    return a
};
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
        window.setTimeout(a, 1000 / 60)
    }
})();
window.cancelRequestAnimFrame = (function() {
    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
})();

function hexToRgb(a) {
    var c = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    a = a.replace(c, function(f, h, e, d) {
        return h + h + e + e + d + d
    });
    var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
    return b ? {
        r: parseInt(b[1], 16),
        g: parseInt(b[2], 16),
        b: parseInt(b[3], 16)
    } : null
}

function clamp(c, b, a) {
    return Math.min(Math.max(c, b), a)
}

function isInArray(b, a) {
    return a.indexOf(b) > -1
}
window.pJSDom = [];
window.particlesJS = function(g, d) {
    if (typeof(g) != "string") {
        d = g;
        g = "particles-js"
    }
    if (!g) {
        g = "particles-js"
    }
    var f = document.getElementById(g),
        e = "particles-js-canvas-el",
        c = f.getElementsByClassName(e);
    if (c.length) {
        while (c.length > 0) {
            f.removeChild(c[0])
        }
    }
    var b = document.createElement("canvas");
    b.className = e;
    b.style.width = "100%";
    b.style.height = "100%";
    var a = document.getElementById(g).appendChild(b);
    if (a != null) {
        pJSDom.push(new pJS(g, d))
    }
};
window.particlesJS.load = function(c, b, a) {
    var d = new XMLHttpRequest();
    d.open("GET", b);
    d.onreadystatechange = function(e) {
        if (d.readyState == 4) {
            if (d.status == 200) {
                var f = JSON.parse(e.currentTarget.response);
                window.particlesJS(c, f);
                if (a) {
                    a()
                }
            } else {
                console.log("Error pJS - XMLHttpRequest status: " + d.status);
                console.log("Error pJS - File config not found")
            }
        }
    };
    d.send()
};