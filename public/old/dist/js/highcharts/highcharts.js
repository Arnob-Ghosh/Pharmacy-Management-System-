/*
 Highcharts JS v10.2.0 (2022-07-05)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (Y, K) {
    "object" === typeof module && module.exports ? (K["default"] = K, module.exports = Y.document ? K(Y) : K) : "function" === typeof define && define.amd ? define("highcharts/highcharts", function () {
        return K(Y)
    }) : (Y.Highcharts && Y.Highcharts.error(16, !0), Y.Highcharts = K(Y))
})("undefined" !== typeof window ? window : this, function (Y) {
    function K(f, e, l, C) {
        f.hasOwnProperty(e) || (f[e] = C.apply(null, l), "function" === typeof CustomEvent && Y.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: e,
                module: f[e]
            }
        })))
    }
    var l = {};
    K(l, "Core/Globals.js", [], function () {
        var f;
        (function (e) {
            e.SVG_NS = "http://www.w3.org/2000/svg";
            e.product = "Highcharts";
            e.version = "10.2.0";
            e.win = "undefined" !== typeof Y ? Y : {};
            e.doc = e.win.document;
            e.svg = e.doc && e.doc.createElementNS && !!e.doc.createElementNS(e.SVG_NS, "svg").createSVGRect;
            e.userAgent = e.win.navigator && e.win.navigator.userAgent || "";
            e.isChrome = -1 !== e.userAgent.indexOf("Chrome");
            e.isFirefox = -1 !== e.userAgent.indexOf("Firefox");
            e.isMS = /(edge|msie|trident)/i.test(e.userAgent) && !e.win.opera;
            e.isSafari = !e.isChrome && -1 !== e.userAgent.indexOf("Safari");
            e.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(e.userAgent);
            e.isWebKit = -1 !== e.userAgent.indexOf("AppleWebKit");
            e.deg2rad = 2 * Math.PI / 360;
            e.hasBidiBug = e.isFirefox && 4 > parseInt(e.userAgent.split("Firefox/")[1], 10);
            e.hasTouch = !!e.win.TouchEvent;
            e.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
            e.noop = function () {};
            e.supportsPassiveEvents = function () {
                var f = !1;
                if (!e.isMS) {
                    var l = Object.defineProperty({}, "passive", {
                        get: function () {
                            f = !0
                        }
                    });
                    e.win.addEventListener && e.win.removeEventListener && (e.win.addEventListener("testPassive", e.noop, l), e.win.removeEventListener("testPassive", e.noop, l))
                }
                return f
            }();
            e.charts = [];
            e.dateFormats = {};
            e.seriesTypes = {};
            e.symbolSizes = {};
            e.chartCount = 0
        })(f || (f = {}));
        "";
        return f
    });
    K(l, "Core/Utilities.js", [l["Core/Globals.js"]], function (f) {
        function e(c, u, g, k) {
            var A = u ? "Highcharts error" : "Highcharts warning";
            32 === c && (c = "" + A + ": Deprecated member");
            var m = t(c),
                n = m ? "" + A + " #" + c + ": www.highcharts.com/errors/" + c + "/" :
                c.toString();
            if ("undefined" !== typeof k) {
                var b = "";
                m && (n += "?");
                w(k, function (a, c) {
                    b += "\n - ".concat(c, ": ").concat(a);
                    m && (n += encodeURI(c) + "=" + encodeURI(a))
                });
                n += b
            }
            x(f, "displayError", {
                chart: g,
                code: c,
                message: n,
                params: k
            }, function () {
                if (u) throw Error(n);
                a.console && -1 === e.messages.indexOf(n) && console.warn(n)
            });
            e.messages.push(n)
        }

        function l(a, c) {
            var A = {};
            w(a, function (u, g) {
                if (G(a[g], !0) && !a.nodeType && c[g]) u = l(a[g], c[g]), Object.keys(u).length && (A[g] = u);
                else if (G(a[g]) || a[g] !== c[g] || g in a && !(g in c)) A[g] = a[g]
            });
            return A
        }

        function C(a, c) {
            return parseInt(a, c || 10)
        }

        function v(a) {
            return "string" === typeof a
        }

        function E(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        }

        function G(a, c) {
            return !!a && "object" === typeof a && (!c || !E(a))
        }

        function B(a) {
            return G(a) && "number" === typeof a.nodeType
        }

        function y(a) {
            var c = a && a.constructor;
            return !(!G(a, !0) || B(a) || !c || !c.name || "Object" === c.name)
        }

        function t(a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        }

        function h(a) {
            return "undefined" !==
                typeof a && null !== a
        }

        function d(a, c, g) {
            var A = v(c) && !h(g),
                u, k = function (c, g) {
                    h(c) ? a.setAttribute(g, c) : A ? (u = a.getAttribute(g)) || "class" !== g || (u = a.getAttribute(g + "Name")) : a.removeAttribute(g)
                };
            v(c) ? k(g, c) : w(c, k);
            return u
        }

        function b(a, c) {
            var A;
            a || (a = {});
            for (A in c) a[A] = c[A];
            return a
        }

        function p() {
            for (var a = arguments, c = a.length, g = 0; g < c; g++) {
                var k = a[g];
                if ("undefined" !== typeof k && null !== k) return k
            }
        }

        function q(a, c) {
            f.isMS && !f.svg && c && h(c.opacity) && (c.filter = "alpha(opacity=".concat(100 * c.opacity, ")"));
            b(a.style,
                c)
        }

        function r(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        }

        function n(a, c) {
            return 1E14 < a ? a : parseFloat(a.toPrecision(c || 14))
        }

        function J(c, u, g) {
            var A = f.getStyle || J;
            if ("width" === u) return u = Math.min(c.offsetWidth, c.scrollWidth), g = c.getBoundingClientRect && c.getBoundingClientRect().width, g < u && g >= u - 1 && (u = Math.floor(g)), Math.max(0, u - (A(c, "padding-left", !0) || 0) - (A(c, "padding-right", !0) || 0));
            if ("height" === u) return Math.max(0, Math.min(c.offsetHeight, c.scrollHeight) - (A(c, "padding-top", !0) || 0) - (A(c,
                "padding-bottom", !0) || 0));
            a.getComputedStyle || e(27, !0);
            if (c = a.getComputedStyle(c, void 0)) {
                var k = c.getPropertyValue(u);
                p(g, "opacity" !== u) && (k = C(k))
            }
            return k
        }

        function w(a, c, g) {
            for (var A in a) Object.hasOwnProperty.call(a, A) && c.call(g || a[A], a[A], A, a)
        }

        function z(a, c, g) {
            function A(c, I) {
                var A = a.removeEventListener || f.removeEventListenerPolyfill;
                A && A.call(a, c, I, !1)
            }

            function u(u) {
                var I;
                if (a.nodeName) {
                    if (c) {
                        var H = {};
                        H[c] = !0
                    } else H = u;
                    w(H, function (a, c) {
                        if (u[c])
                            for (I = u[c].length; I--;) A(c, u[c][I].fn)
                    })
                }
            }
            var k =
                "function" === typeof a && a.prototype || a;
            if (Object.hasOwnProperty.call(k, "hcEvents")) {
                var m = k.hcEvents;
                c ? (k = m[c] || [], g ? (m[c] = k.filter(function (a) {
                    return g !== a.fn
                }), A(c, g)) : (u(m), m[c] = [])) : (u(m), delete k.hcEvents)
            }
        }

        function x(a, c, g, m) {
            g = g || {};
            if (k.createEvent && (a.dispatchEvent || a.fireEvent && a !== f)) {
                var A = k.createEvent("Events");
                A.initEvent(c, !0, !0);
                g = b(A, g);
                a.dispatchEvent ? a.dispatchEvent(g) : a.fireEvent(c, g)
            } else if (a.hcEvents) {
                g.target || b(g, {
                    preventDefault: function () {
                        g.defaultPrevented = !0
                    },
                    target: a,
                    type: c
                });
                A = [];
                for (var u = a, n = !1; u.hcEvents;) Object.hasOwnProperty.call(u, "hcEvents") && u.hcEvents[c] && (A.length && (n = !0), A.unshift.apply(A, u.hcEvents[c])), u = Object.getPrototypeOf(u);
                n && A.sort(function (a, c) {
                    return a.order - c.order
                });
                A.forEach(function (c) {
                    !1 === c.fn.call(a, g) && g.preventDefault()
                })
            }
            m && !g.defaultPrevented && m.call(a, g)
        }
        var m = f.charts,
            k = f.doc,
            a = f.win;
        (e || (e = {})).messages = [];
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        var g = Array.prototype.find ? function (a, c) {
                return a.find(c)
            } :
            function (a, c) {
                var A, u = a.length;
                for (A = 0; A < u; A++)
                    if (c(a[A], A)) return a[A]
            };
        w({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function (a, c) {
            f[c] = function (A) {
                var u;
                e(32, !1, void 0, (u = {}, u["Highcharts.".concat(c)] = "use Array.".concat(a), u));
                return Array.prototype[a].apply(A, [].slice.call(arguments, 1))
            }
        });
        var c, D = function () {
            var a = Math.random().toString(36).substring(2, 9) + "-",
                u = 0;
            return function () {
                return "highcharts-" + (c ? "" : a) + u++
            }
        }();
        a.jQuery && (a.jQuery.fn.highcharts = function () {
            var a = [].slice.call(arguments);
            if (this[0]) return a[0] ? (new(f[v(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]), this) : m[d(this[0], "data-highcharts-chart")]
        });
        g = {
            addEvent: function (a, c, g, k) {
                void 0 === k && (k = {});
                var u = "function" === typeof a && a.prototype || a;
                Object.hasOwnProperty.call(u, "hcEvents") || (u.hcEvents = {});
                u = u.hcEvents;
                f.Point && a instanceof f.Point && a.series && a.series.chart && (a.series.chart.runTrackerClick = !0);
                var A = a.addEventListener || f.addEventListenerPolyfill;
                A && A.call(a, c, g, f.supportsPassiveEvents ? {
                    passive: void 0 ===
                        k.passive ? -1 !== c.indexOf("touch") : k.passive,
                    capture: !1
                } : !1);
                u[c] || (u[c] = []);
                u[c].push({
                    fn: g,
                    order: "number" === typeof k.order ? k.order : Infinity
                });
                u[c].sort(function (a, c) {
                    return a.order - c.order
                });
                return function () {
                    z(a, c, g)
                }
            },
            arrayMax: function (a) {
                for (var c = a.length, g = a[0]; c--;) a[c] > g && (g = a[c]);
                return g
            },
            arrayMin: function (a) {
                for (var c = a.length, g = a[0]; c--;) a[c] < g && (g = a[c]);
                return g
            },
            attr: d,
            clamp: function (a, c, g) {
                return a > c ? a < g ? a : g : c
            },
            cleanRecursively: l,
            clearTimeout: function (a) {
                h(a) && clearTimeout(a)
            },
            correctFloat: n,
            createElement: function (a, c, g, m, n) {
                a = k.createElement(a);
                c && b(a, c);
                n && q(a, {
                    padding: "0",
                    border: "none",
                    margin: "0"
                });
                g && q(a, g);
                m && m.appendChild(a);
                return a
            },
            css: q,
            defined: h,
            destroyObjectProperties: function (a, c) {
                w(a, function (g, u) {
                    g && g !== c && g.destroy && g.destroy();
                    delete a[u]
                })
            },
            discardElement: function (a) {
                a && a.parentElement && a.parentElement.removeChild(a)
            },
            erase: function (a, c) {
                for (var g = a.length; g--;)
                    if (a[g] === c) {
                        a.splice(g, 1);
                        break
                    }
            },
            error: e,
            extend: b,
            extendClass: function (a, c) {
                var g = function () {};
                g.prototype =
                    new a;
                b(g.prototype, c);
                return g
            },
            find: g,
            fireEvent: x,
            getMagnitude: r,
            getNestedProperty: function (c, g) {
                for (c = c.split("."); c.length && h(g);) {
                    var u = c.shift();
                    if ("undefined" === typeof u || "__proto__" === u) return;
                    g = g[u];
                    if (!h(g) || "function" === typeof g || "number" === typeof g.nodeType || g === a) return
                }
                return g
            },
            getStyle: J,
            inArray: function (a, c, g) {
                e(32, !1, void 0, {
                    "Highcharts.inArray": "use Array.indexOf"
                });
                return c.indexOf(a, g)
            },
            isArray: E,
            isClass: y,
            isDOMElement: B,
            isFunction: function (a) {
                return "function" === typeof a
            },
            isNumber: t,
            isObject: G,
            isString: v,
            keys: function (a) {
                e(32, !1, void 0, {
                    "Highcharts.keys": "use Object.keys"
                });
                return Object.keys(a)
            },
            merge: function () {
                var a, c = arguments,
                    g = {},
                    k = function (a, c) {
                        "object" !== typeof a && (a = {});
                        w(c, function (g, I) {
                            "__proto__" !== I && "constructor" !== I && (!G(g, !0) || y(g) || B(g) ? a[I] = c[I] : a[I] = k(a[I] || {}, g))
                        });
                        return a
                    };
                !0 === c[0] && (g = c[1], c = Array.prototype.slice.call(c, 2));
                var m = c.length;
                for (a = 0; a < m; a++) g = k(g, c[a]);
                return g
            },
            normalizeTickInterval: function (a, c, g, k, m) {
                var u = a;
                g = p(g, r(a));
                var A = a / g;
                c || (c =
                    m ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === k && (1 === g ? c = c.filter(function (a) {
                        return 0 === a % 1
                    }) : .1 >= g && (c = [1 / g])));
                for (k = 0; k < c.length && !(u = c[k], m && u * g >= a || !m && A <= (c[k] + (c[k + 1] || c[k])) / 2); k++);
                return u = n(u * g, -Math.round(Math.log(.001) / Math.LN10))
            },
            objectEach: w,
            offset: function (c) {
                var g = k.documentElement;
                c = c.parentElement || c.parentNode ? c.getBoundingClientRect() : {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0
                };
                return {
                    top: c.top + (a.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                    left: c.left + (a.pageXOffset || g.scrollLeft) -
                        (g.clientLeft || 0),
                    width: c.width,
                    height: c.height
                }
            },
            pad: function (a, c, g) {
                return Array((c || 2) + 1 - String(a).replace("-", "").length).join(g || "0") + a
            },
            pick: p,
            pInt: C,
            relativeLength: function (a, c, g) {
                return /%$/.test(a) ? c * parseFloat(a) / 100 + (g || 0) : parseFloat(a)
            },
            removeEvent: z,
            splat: function (a) {
                return E(a) ? a : [a]
            },
            stableSort: function (a, c) {
                var g = a.length,
                    k, u;
                for (u = 0; u < g; u++) a[u].safeI = u;
                a.sort(function (a, g) {
                    k = c(a, g);
                    return 0 === k ? a.safeI - g.safeI : k
                });
                for (u = 0; u < g; u++) delete a[u].safeI
            },
            syncTimeout: function (a, c, g) {
                if (0 <
                    c) return setTimeout(a, c, g);
                a.call(0, g);
                return -1
            },
            timeUnits: {
                millisecond: 1,
                second: 1E3,
                minute: 6E4,
                hour: 36E5,
                day: 864E5,
                week: 6048E5,
                month: 24192E5,
                year: 314496E5
            },
            uniqueKey: D,
            useSerialIds: function (a) {
                return c = p(a, c)
            },
            wrap: function (a, c, g) {
                var k = a[c];
                a[c] = function () {
                    var a = Array.prototype.slice.call(arguments),
                        c = arguments,
                        u = this;
                    u.proceed = function () {
                        k.apply(u, arguments.length ? arguments : c)
                    };
                    a.unshift(k);
                    a = g.apply(this, a);
                    u.proceed = null;
                    return a
                }
            }
        };
        "";
        return g
    });
    K(l, "Core/Chart/ChartDefaults.js", [], function () {
        return {
            alignThresholds: !1,
            panning: {
                enabled: !1,
                type: "x"
            },
            styledMode: !1,
            borderRadius: 0,
            colorCount: 10,
            allowMutatingData: !0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            resetZoomButton: {
                theme: {
                    zIndex: 6
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            },
            zoomBySingleTouch: !1,
            width: null,
            height: null,
            borderColor: "#335cad",
            backgroundColor: "#ffffff",
            plotBorderColor: "#cccccc"
        }
    });
    K(l, "Core/Color/Color.js", [l["Core/Globals.js"], l["Core/Utilities.js"]], function (f, e) {
        var l = e.isNumber,
            C = e.merge,
            v = e.pInt;
        e = function () {
            function e(l) {
                this.rgba = [NaN, NaN, NaN, NaN];
                this.input = l;
                var B = f.Color;
                if (B && B !== e) return new B(l);
                if (!(this instanceof e)) return new e(l);
                this.init(l)
            }
            e.parse = function (f) {
                return f ? new e(f) : e.None
            };
            e.prototype.init = function (f) {
                var B;
                if ("object" === typeof f && "undefined" !== typeof f.stops) this.stops = f.stops.map(function (d) {
                    return new e(d[1])
                });
                else if ("string" === typeof f) {
                    this.input = f = e.names[f.toLowerCase()] || f;
                    if ("#" === f.charAt(0)) {
                        var y = f.length;
                        var t = parseInt(f.substr(1), 16);
                        7 === y ? B = [(t & 16711680) >> 16, (t & 65280) >> 8, t & 255, 1] :
                            4 === y && (B = [(t & 3840) >> 4 | (t & 3840) >> 8, (t & 240) >> 4 | t & 240, (t & 15) << 4 | t & 15, 1])
                    }
                    if (!B)
                        for (t = e.parsers.length; t-- && !B;) {
                            var h = e.parsers[t];
                            (y = h.regex.exec(f)) && (B = h.parse(y))
                        }
                }
                B && (this.rgba = B)
            };
            e.prototype.get = function (e) {
                var B = this.input,
                    y = this.rgba;
                if ("object" === typeof B && "undefined" !== typeof this.stops) {
                    var t = C(B);
                    t.stops = [].slice.call(t.stops);
                    this.stops.forEach(function (h, d) {
                        t.stops[d] = [t.stops[d][0], h.get(e)]
                    });
                    return t
                }
                return y && l(y[0]) ? "rgb" === e || !e && 1 === y[3] ? "rgb(" + y[0] + "," + y[1] + "," + y[2] + ")" : "a" ===
                    e ? "".concat(y[3]) : "rgba(" + y.join(",") + ")" : B
            };
            e.prototype.brighten = function (e) {
                var B = this.rgba;
                if (this.stops) this.stops.forEach(function (t) {
                    t.brighten(e)
                });
                else if (l(e) && 0 !== e)
                    for (var y = 0; 3 > y; y++) B[y] += v(255 * e), 0 > B[y] && (B[y] = 0), 255 < B[y] && (B[y] = 255);
                return this
            };
            e.prototype.setOpacity = function (e) {
                this.rgba[3] = e;
                return this
            };
            e.prototype.tweenTo = function (e, B) {
                var y = this.rgba,
                    t = e.rgba;
                if (!l(y[0]) || !l(t[0])) return e.input || "none";
                e = 1 !== t[3] || 1 !== y[3];
                return (e ? "rgba(" : "rgb(") + Math.round(t[0] + (y[0] - t[0]) *
                    (1 - B)) + "," + Math.round(t[1] + (y[1] - t[1]) * (1 - B)) + "," + Math.round(t[2] + (y[2] - t[2]) * (1 - B)) + (e ? "," + (t[3] + (y[3] - t[3]) * (1 - B)) : "") + ")"
            };
            e.names = {
                white: "#ffffff",
                black: "#000000"
            };
            e.parsers = [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (e) {
                    return [v(e[1]), v(e[2]), v(e[3]), parseFloat(e[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (e) {
                    return [v(e[1]), v(e[2]), v(e[3]), 1]
                }
            }];
            e.None = new e("");
            return e
        }();
        "";
        return e
    });
    K(l, "Core/Color/Palettes.js", [], function () {
        return {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ")
        }
    });
    K(l, "Core/Time.js", [l["Core/Globals.js"], l["Core/Utilities.js"]], function (f, e) {
        var l = f.win,
            C = e.defined,
            v = e.error,
            E = e.extend,
            G = e.isObject,
            B = e.merge,
            y = e.objectEach,
            t = e.pad,
            h = e.pick,
            d = e.splat,
            b = e.timeUnits,
            p = f.isSafari && l.Intl && l.Intl.DateTimeFormat.prototype.formatRange,
            q = f.isSafari && l.Intl && !l.Intl.DateTimeFormat.prototype.formatRange;
        e = function () {
            function r(n) {
                this.options = {};
                this.variableTimezone = this.useUTC = !1;
                this.Date = l.Date;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.update(n)
            }
            r.prototype.get = function (n, b) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var d = b.getTime(),
                        r = d - this.getTimezoneOffset(b);
                    b.setTime(r);
                    n = b["getUTC" + n]();
                    b.setTime(d);
                    return n
                }
                return this.useUTC ? b["getUTC" + n]() : b["get" + n]()
            };
            r.prototype.set = function (n, b, d) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === n || "Seconds" ===
                        n || "Minutes" === n && 0 === this.getTimezoneOffset(b) % 36E5) return b["setUTC" + n](d);
                    var r = this.getTimezoneOffset(b);
                    r = b.getTime() - r;
                    b.setTime(r);
                    b["setUTC" + n](d);
                    n = this.getTimezoneOffset(b);
                    r = b.getTime() + n;
                    return b.setTime(r)
                }
                return this.useUTC || p && "FullYear" === n ? b["setUTC" + n](d) : b["set" + n](d)
            };
            r.prototype.update = function (b) {
                var n = h(b && b.useUTC, !0);
                this.options = b = B(!0, this.options || {}, b);
                this.Date = b.Date || l.Date || Date;
                this.timezoneOffset = (this.useUTC = n) && b.timezoneOffset || void 0;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                this.variableTimezone = n && !(!b.getTimezoneOffset && !b.timezone)
            };
            r.prototype.makeTime = function (b, d, r, p, x, m) {
                if (this.useUTC) {
                    var k = this.Date.UTC.apply(0, arguments);
                    var a = this.getTimezoneOffset(k);
                    k += a;
                    var g = this.getTimezoneOffset(k);
                    a !== g ? k += g - a : a - 36E5 !== this.getTimezoneOffset(k - 36E5) || q || (k -= 36E5)
                } else k = (new this.Date(b, d, h(r, 1), h(p, 0), h(x, 0), h(m, 0))).getTime();
                return k
            };
            r.prototype.timezoneOffsetFunction = function () {
                var b = this,
                    d = this.options,
                    r = d.getTimezoneOffset,
                    p = d.moment || l.moment;
                if (!this.useUTC) return function (b) {
                    return 6E4 *
                        (new Date(b.toString())).getTimezoneOffset()
                };
                if (d.timezone) {
                    if (p) return function (b) {
                        return 6E4 * -p.tz(b, d.timezone).utcOffset()
                    };
                    v(25)
                }
                return this.useUTC && r ? function (b) {
                    return 6E4 * r(b.valueOf())
                } : function () {
                    return 6E4 * (b.timezoneOffset || 0)
                }
            };
            r.prototype.dateFormat = function (b, d, r) {
                if (!C(d) || isNaN(d)) return f.defaultOptions.lang && f.defaultOptions.lang.invalidDate || "";
                b = h(b, "%Y-%m-%d %H:%M:%S");
                var n = this,
                    p = new this.Date(d),
                    m = this.get("Hours", p),
                    k = this.get("Day", p),
                    a = this.get("Date", p),
                    g = this.get("Month",
                        p),
                    c = this.get("FullYear", p),
                    D = f.defaultOptions.lang,
                    A = D && D.weekdays,
                    u = D && D.shortWeekdays;
                p = E({
                    a: u ? u[k] : A[k].substr(0, 3),
                    A: A[k],
                    d: t(a),
                    e: t(a, 2, " "),
                    w: k,
                    b: D.shortMonths[g],
                    B: D.months[g],
                    m: t(g + 1),
                    o: g + 1,
                    y: c.toString().substr(2, 2),
                    Y: c,
                    H: t(m),
                    k: m,
                    I: t(m % 12 || 12),
                    l: m % 12 || 12,
                    M: t(this.get("Minutes", p)),
                    p: 12 > m ? "AM" : "PM",
                    P: 12 > m ? "am" : "pm",
                    S: t(p.getSeconds()),
                    L: t(Math.floor(d % 1E3), 3)
                }, f.dateFormats);
                y(p, function (a, c) {
                    for (; - 1 !== b.indexOf("%" + c);) b = b.replace("%" + c, "function" === typeof a ? a.call(n, d) : a)
                });
                return r ? b.substr(0,
                    1).toUpperCase() + b.substr(1) : b
            };
            r.prototype.resolveDTLFormat = function (b) {
                return G(b, !0) ? b : (b = d(b), {
                    main: b[0],
                    from: b[1],
                    to: b[2]
                })
            };
            r.prototype.getTimeTicks = function (d, r, p, q) {
                var n = this,
                    m = [],
                    k = {},
                    a = new n.Date(r),
                    g = d.unitRange,
                    c = d.count || 1,
                    D;
                q = h(q, 1);
                if (C(r)) {
                    n.set("Milliseconds", a, g >= b.second ? 0 : c * Math.floor(n.get("Milliseconds", a) / c));
                    g >= b.second && n.set("Seconds", a, g >= b.minute ? 0 : c * Math.floor(n.get("Seconds", a) / c));
                    g >= b.minute && n.set("Minutes", a, g >= b.hour ? 0 : c * Math.floor(n.get("Minutes", a) / c));
                    g >= b.hour &&
                        n.set("Hours", a, g >= b.day ? 0 : c * Math.floor(n.get("Hours", a) / c));
                    g >= b.day && n.set("Date", a, g >= b.month ? 1 : Math.max(1, c * Math.floor(n.get("Date", a) / c)));
                    if (g >= b.month) {
                        n.set("Month", a, g >= b.year ? 0 : c * Math.floor(n.get("Month", a) / c));
                        var A = n.get("FullYear", a)
                    }
                    g >= b.year && n.set("FullYear", a, A - A % c);
                    g === b.week && (A = n.get("Day", a), n.set("Date", a, n.get("Date", a) - A + q + (A < q ? -7 : 0)));
                    A = n.get("FullYear", a);
                    q = n.get("Month", a);
                    var u = n.get("Date", a),
                        z = n.get("Hours", a);
                    r = a.getTime();
                    !n.variableTimezone && n.useUTC || !C(p) || (D = p -
                        r > 4 * b.month || n.getTimezoneOffset(r) !== n.getTimezoneOffset(p));
                    r = a.getTime();
                    for (a = 1; r < p;) m.push(r), r = g === b.year ? n.makeTime(A + a * c, 0) : g === b.month ? n.makeTime(A, q + a * c) : !D || g !== b.day && g !== b.week ? D && g === b.hour && 1 < c ? n.makeTime(A, q, u, z + a * c) : r + g * c : n.makeTime(A, q, u + a * c * (g === b.day ? 1 : 7)), a++;
                    m.push(r);
                    g <= b.hour && 1E4 > m.length && m.forEach(function (a) {
                        0 === a % 18E5 && "000000000" === n.dateFormat("%H%M%S%L", a) && (k[a] = "day")
                    })
                }
                m.info = E(d, {
                    higherRanks: k,
                    totalRange: g * c
                });
                return m
            };
            r.prototype.getDateFormat = function (n, d, r,
                p) {
                var q = this.dateFormat("%m-%d %H:%M:%S.%L", d),
                    m = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    k = "millisecond";
                for (a in b) {
                    if (n === b.week && +this.dateFormat("%w", d) === r && "00:00:00.000" === q.substr(6)) {
                        var a = "week";
                        break
                    }
                    if (b[a] > n) {
                        a = k;
                        break
                    }
                    if (m[a] && q.substr(m[a]) !== "01-01 00:00:00.000".substr(m[a])) break;
                    "week" !== a && (k = a)
                }
                return this.resolveDTLFormat(p[a]).main
            };
            return r
        }();
        "";
        return e
    });
    K(l, "Core/DefaultOptions.js", [l["Core/Chart/ChartDefaults.js"], l["Core/Color/Color.js"], l["Core/Globals.js"],
        l["Core/Color/Palettes.js"], l["Core/Time.js"], l["Core/Utilities.js"]
    ], function (f, e, l, C, v, E) {
        e = e.parse;
        var P = E.merge,
            B = {
                colors: C.colors,
                symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
                lang: {
                    loading: "Loading...",
                    months: "January February March April May June July August September October November December".split(" "),
                    shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                    weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                    decimalPoint: ".",
                    numericSymbols: "kMGTPE".split(""),
                    resetZoom: "Reset zoom",
                    resetZoomTitle: "Reset zoom level 1:1",
                    thousandsSep: " "
                },
                global: {},
                time: {
                    Date: void 0,
                    getTimezoneOffset: void 0,
                    timezone: void 0,
                    timezoneOffset: 0,
                    useUTC: !0
                },
                chart: f,
                title: {
                    text: "Chart title",
                    align: "center",
                    margin: 15,
                    widthAdjust: -44
                },
                subtitle: {
                    text: "",
                    align: "center",
                    widthAdjust: -44
                },
                caption: {
                    margin: 15,
                    text: "",
                    align: "left",
                    verticalAlign: "bottom"
                },
                plotOptions: {},
                labels: {
                    style: {
                        position: "absolute",
                        color: "#333333"
                    }
                },
                legend: {
                    enabled: !0,
                    align: "center",
                    alignColumns: !0,
                    className: "highcharts-no-tooltip",
                    layout: "horizontal",
                    labelFormatter: function () {
                        return this.name
                    },
                    borderColor: "#999999",
                    borderRadius: 0,
                    navigation: {
                        activeColor: "#003399",
                        inactiveColor: "#cccccc"
                    },
                    itemStyle: {
                        color: "#333333",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textOverflow: "ellipsis"
                    },
                    itemHoverStyle: {
                        color: "#000000"
                    },
                    itemHiddenStyle: {
                        color: "#cccccc"
                    },
                    shadow: !1,
                    itemCheckboxStyle: {
                        position: "absolute",
                        width: "13px",
                        height: "13px"
                    },
                    squareSymbol: !0,
                    symbolPadding: 5,
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    title: {
                        style: {
                            fontWeight: "bold"
                        }
                    }
                },
                loading: {
                    labelStyle: {
                        fontWeight: "bold",
                        position: "relative",
                        top: "45%"
                    },
                    style: {
                        position: "absolute",
                        backgroundColor: "#ffffff",
                        opacity: .5,
                        textAlign: "center"
                    }
                },
                tooltip: {
                    enabled: !0,
                    animation: l.svg,
                    borderRadius: 3,
                    dateTimeLabelFormats: {
                        millisecond: "%A, %b %e, %H:%M:%S.%L",
                        second: "%A, %b %e, %H:%M:%S",
                        minute: "%A, %b %e, %H:%M",
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %Y",
                        week: "Week from %A, %b %e, %Y",
                        month: "%B %Y",
                        year: "%Y"
                    },
                    footerFormat: "",
                    headerShape: "callout",
                    hideDelay: 500,
                    padding: 8,
                    shape: "callout",
                    shared: !1,
                    snap: l.isTouchDevice ? 25 : 10,
                    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                    pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                    backgroundColor: e("#f7f7f7").setOpacity(.85).get(),
                    borderWidth: 1,
                    shadow: !0,
                    stickOnContact: !1,
                    style: {
                        color: "#333333",
                        cursor: "default",
                        fontSize: "12px",
                        whiteSpace: "nowrap"
                    },
                    useHTML: !1
                },
                credits: {
                    enabled: !0,
                    href: "https://www.highcharts.com?credits",
                    position: {
                        align: "right",
                        x: -10,
                        verticalAlign: "bottom",
                        y: -5
                    },
                    style: {
                        cursor: "pointer",
                        color: "#999999",
                        fontSize: "9px"
                    },
                    text: "Highcharts.com"
                }
            };
        B.chart.styledMode = !1;
        "";
        var y = new v(P(B.global, B.time));
        f = {
            defaultOptions: B,
            defaultTime: y,
            getOptions: function () {
                return B
            },
            setOptions: function (t) {
                P(!0, B, t);
                if (t.time || t.global) l.time ? l.time.update(P(B.global, B.time, t.global, t.time)) : l.time = y;
                return B
            }
        };
        "";
        return f
    });
    K(l, "Core/Animation/Fx.js", [l["Core/Color/Color.js"], l["Core/Globals.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var P =
            f.parse,
            v = e.win,
            E = l.isNumber,
            G = l.objectEach;
        return function () {
            function e(e, t, h) {
                this.pos = NaN;
                this.options = t;
                this.elem = e;
                this.prop = h
            }
            e.prototype.dSetter = function () {
                var e = this.paths,
                    t = e && e[0];
                e = e && e[1];
                var h = this.now || 0,
                    d = [];
                if (1 !== h && t && e)
                    if (t.length === e.length && 1 > h)
                        for (var b = 0; b < e.length; b++) {
                            for (var p = t[b], q = e[b], r = [], n = 0; n < q.length; n++) {
                                var J = p[n],
                                    w = q[n];
                                E(J) && E(w) && ("A" !== q[0] || 4 !== n && 5 !== n) ? r[n] = J + h * (w - J) : r[n] = w
                            }
                            d.push(r)
                        } else d = e;
                    else d = this.toD || [];
                this.elem.attr("d", d, void 0, !0)
            };
            e.prototype.update =
                function () {
                    var e = this.elem,
                        t = this.prop,
                        h = this.now,
                        d = this.options.step;
                    if (this[t + "Setter"]) this[t + "Setter"]();
                    else e.attr ? e.element && e.attr(t, h, null, !0) : e.style[t] = h + this.unit;
                    d && d.call(e, h, this)
                };
            e.prototype.run = function (y, t, h) {
                var d = this,
                    b = d.options,
                    p = function (b) {
                        return p.stopped ? !1 : d.step(b)
                    },
                    q = v.requestAnimationFrame || function (b) {
                        setTimeout(b, 13)
                    },
                    r = function () {
                        for (var b = 0; b < e.timers.length; b++) e.timers[b]() || e.timers.splice(b--, 1);
                        e.timers.length && q(r)
                    };
                y !== t || this.elem["forceAnimate:" + this.prop] ?
                    (this.startTime = +new Date, this.start = y, this.end = t, this.unit = h, this.now = this.start, this.pos = 0, p.elem = this.elem, p.prop = this.prop, p() && 1 === e.timers.push(p) && q(r)) : (delete b.curAnim[this.prop], b.complete && 0 === Object.keys(b.curAnim).length && b.complete.call(this.elem))
            };
            e.prototype.step = function (e) {
                var t = +new Date,
                    h = this.options,
                    d = this.elem,
                    b = h.complete,
                    p = h.duration,
                    q = h.curAnim;
                if (d.attr && !d.element) e = !1;
                else if (e || t >= p + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    var r = q[this.prop] = !0;
                    G(q,
                        function (b) {
                            !0 !== b && (r = !1)
                        });
                    r && b && b.call(d);
                    e = !1
                } else this.pos = h.easing((t - this.startTime) / p), this.now = this.start + (this.end - this.start) * this.pos, this.update(), e = !0;
                return e
            };
            e.prototype.initPath = function (e, t, h) {
                function d(b, m) {
                    for (; b.length < z;) {
                        var k = b[0],
                            a = m[z - b.length];
                        a && "M" === k[0] && (b[0] = "C" === a[0] ? ["C", k[1], k[2], k[1], k[2], k[1], k[2]] : ["L", k[1], k[2]]);
                        b.unshift(k);
                        r && (k = b.pop(), b.push(b[b.length - 1], k))
                    }
                }

                function b(b, m) {
                    for (; b.length < z;)
                        if (m = b[Math.floor(b.length / n) - 1].slice(), "C" === m[0] && (m[1] =
                                m[5], m[2] = m[6]), r) {
                            var k = b[Math.floor(b.length / n)].slice();
                            b.splice(b.length / 2, 0, m, k)
                        } else b.push(m)
                }
                var p = e.startX,
                    q = e.endX;
                h = h.slice();
                var r = e.isArea,
                    n = r ? 2 : 1;
                t = t && t.slice();
                if (!t) return [h, h];
                if (p && q && q.length) {
                    for (e = 0; e < p.length; e++)
                        if (p[e] === q[0]) {
                            var J = e;
                            break
                        } else if (p[0] === q[q.length - p.length + e]) {
                        J = e;
                        var w = !0;
                        break
                    } else if (p[p.length - 1] === q[q.length - p.length + e]) {
                        J = p.length - e;
                        break
                    }
                    "undefined" === typeof J && (t = [])
                }
                if (t.length && E(J)) {
                    var z = h.length + J * n;
                    w ? (d(t, h), b(h, t)) : (d(h, t), b(t, h))
                }
                return [t,
                    h
                ]
            };
            e.prototype.fillSetter = function () {
                e.prototype.strokeSetter.apply(this, arguments)
            };
            e.prototype.strokeSetter = function () {
                this.elem.attr(this.prop, P(this.start).tweenTo(P(this.end), this.pos), void 0, !0)
            };
            e.timers = [];
            return e
        }()
    });
    K(l, "Core/Animation/AnimationUtilities.js", [l["Core/Animation/Fx.js"], l["Core/Utilities.js"]], function (f, e) {
        function l(b) {
            return y(b) ? t({
                duration: 500,
                defer: 0
            }, b) : {
                duration: b ? 500 : 0,
                defer: 0
            }
        }

        function C(b, d) {
            for (var p = f.timers.length; p--;) f.timers[p].elem !== b || d && d !== f.timers[p].prop ||
                (f.timers[p].stopped = !0)
        }
        var v = e.defined,
            E = e.getStyle,
            G = e.isArray,
            B = e.isNumber,
            y = e.isObject,
            t = e.merge,
            h = e.objectEach,
            d = e.pick;
        return {
            animate: function (b, d, q) {
                var r, n = "",
                    p, w;
                if (!y(q)) {
                    var z = arguments;
                    q = {
                        duration: z[2],
                        easing: z[3],
                        complete: z[4]
                    }
                }
                B(q.duration) || (q.duration = 400);
                q.easing = "function" === typeof q.easing ? q.easing : Math[q.easing] || Math.easeInOutSine;
                q.curAnim = t(d);
                h(d, function (h, m) {
                    C(b, m);
                    w = new f(b, q, m);
                    p = void 0;
                    "d" === m && G(d.d) ? (w.paths = w.initPath(b, b.pathArray, d.d), w.toD = d.d, r = 0, p = 1) : b.attr ?
                        r = b.attr(m) : (r = parseFloat(E(b, m)) || 0, "opacity" !== m && (n = "px"));
                    p || (p = h);
                    "string" === typeof p && p.match("px") && (p = p.replace(/px/g, ""));
                    w.run(r, p, n)
                })
            },
            animObject: l,
            getDeferredAnimation: function (b, d, q) {
                var r = l(d),
                    n = 0,
                    p = 0;
                (q ? [q] : b.series).forEach(function (b) {
                    b = l(b.options.animation);
                    n = d && v(d.defer) ? r.defer : Math.max(n, b.duration + b.defer);
                    p = Math.min(r.duration, b.duration)
                });
                b.renderer.forExport && (n = 0);
                return {
                    defer: Math.max(0, n - p),
                    duration: Math.min(n, p)
                }
            },
            setAnimation: function (b, p) {
                p.renderer.globalAnimation =
                    d(b, p.options.chart.animation, !0)
            },
            stop: C
        }
    });
    K(l, "Core/Renderer/HTML/AST.js", [l["Core/Globals.js"], l["Core/Utilities.js"]], function (f, e) {
        var l = f.SVG_NS,
            C = e.attr,
            v = e.createElement,
            E = e.css,
            G = e.error,
            B = e.isFunction,
            y = e.isString,
            t = e.objectEach,
            h = e.splat,
            d = (e = f.win.trustedTypes) && B(e.createPolicy) && e.createPolicy("highcharts", {
                createHTML: function (b) {
                    return b
                }
            }),
            b = d ? d.createHTML("") : "";
        try {
            var p = !!(new DOMParser).parseFromString(b, "text/html")
        } catch (q) {
            p = !1
        }
        B = function () {
            function q(b) {
                this.nodes = "string" ===
                    typeof b ? this.parseMarkup(b) : b
            }
            q.filterUserAttributes = function (b) {
                t(b, function (d, p) {
                    var n = !0; - 1 === q.allowedAttributes.indexOf(p) && (n = !1); - 1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(p) && (n = y(d) && q.allowedReferences.some(function (b) {
                        return 0 === d.indexOf(b)
                    }));
                    n || (G(33, !1, void 0, {
                        "Invalid attribute in config": "".concat(p)
                    }), delete b[p])
                });
                return b
            };
            q.parseStyle = function (b) {
                return b.split(";").reduce(function (b, d) {
                    d = d.split(":").map(function (b) {
                        return b.trim()
                    });
                    var p = d.shift();
                    p && d.length &&
                        (b[p.replace(/-([a-z])/g, function (b) {
                            return b[1].toUpperCase()
                        })] = d.join(":"));
                    return b
                }, {})
            };
            q.setElementHTML = function (b, d) {
                b.innerHTML = q.emptyHTML;
                d && (new q(d)).addToDOM(b)
            };
            q.prototype.addToDOM = function (b) {
                function d(b, p) {
                    var n;
                    h(b).forEach(function (b) {
                        var m = b.tagName,
                            k = b.textContent ? f.doc.createTextNode(b.textContent) : void 0,
                            a = q.bypassHTMLFiltering;
                        if (m)
                            if ("#text" === m) var g = k;
                            else if (-1 !== q.allowedTags.indexOf(m) || a) {
                            m = f.doc.createElementNS("svg" === m ? l : p.namespaceURI || l, m);
                            var c = b.attributes || {};
                            t(b, function (a, g) {
                                "tagName" !== g && "attributes" !== g && "children" !== g && "style" !== g && "textContent" !== g && (c[g] = a)
                            });
                            C(m, a ? c : q.filterUserAttributes(c));
                            b.style && E(m, b.style);
                            k && m.appendChild(k);
                            d(b.children || [], m);
                            g = m
                        } else G(33, !1, void 0, {
                            "Invalid tagName in config": m
                        });
                        g && p.appendChild(g);
                        n = g
                    });
                    return n
                }
                return d(this.nodes, b)
            };
            q.prototype.parseMarkup = function (b) {
                var n = [];
                b = b.trim().replace(/ style="/g, ' data-style="');
                if (p) b = (new DOMParser).parseFromString(d ? d.createHTML(b) : b, "text/html");
                else {
                    var r =
                        v("div");
                    r.innerHTML = b;
                    b = {
                        body: r
                    }
                }
                var h = function (b, d) {
                    var m = b.nodeName.toLowerCase(),
                        k = {
                            tagName: m
                        };
                    "#text" === m && (k.textContent = b.textContent || "");
                    if (m = b.attributes) {
                        var a = {};
                        [].forEach.call(m, function (c) {
                            "data-style" === c.name ? k.style = q.parseStyle(c.value) : a[c.name] = c.value
                        });
                        k.attributes = a
                    }
                    if (b.childNodes.length) {
                        var g = [];
                        [].forEach.call(b.childNodes, function (a) {
                            h(a, g)
                        });
                        g.length && (k.children = g)
                    }
                    d.push(k)
                };
                [].forEach.call(b.body.childNodes, function (b) {
                    return h(b, n)
                });
                return n
            };
            q.allowedAttributes =
                "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex".split(" ");
            q.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
            q.allowedTags = "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text".split(" ");
            q.emptyHTML = b;
            q.bypassHTMLFiltering = !1;
            return q
        }();
        "";
        return B
    });
    K(l, "Core/FormatUtilities.js", [l["Core/DefaultOptions.js"], l["Core/Utilities.js"]], function (f, e) {
        function l(e, h, d, b) {
            e = +e || 0;
            h = +h;
            var p = C.lang,
                q = (e.toString().split(".")[1] || "").split("e")[0].length,
                r = e.toString().split("e"),
                n = h;
            if (-1 === h) h = Math.min(q, 20);
            else if (!G(h)) h = 2;
            else if (h && r[1] && 0 > r[1]) {
                var J = h + +r[1];
                0 <= J ? (r[0] = (+r[0]).toExponential(J).split("e")[0], h = J) : (r[0] = r[0].split(".")[0] || 0, e = 20 > h ? (r[0] * Math.pow(10, r[1])).toFixed(h) : 0, r[1] = 0)
            }
            J = (Math.abs(r[1] ? r[0] : e) + Math.pow(10, -Math.max(h, q) -
                1)).toFixed(h);
            q = String(y(J));
            var w = 3 < q.length ? q.length % 3 : 0;
            d = B(d, p.decimalPoint);
            b = B(b, p.thousandsSep);
            e = (0 > e ? "-" : "") + (w ? q.substr(0, w) + b : "");
            e = 0 > +r[1] && !n ? "0" : e + q.substr(w).replace(/(\d{3})(?=\d)/g, "$1" + b);
            h && (e += d + J.slice(-h));
            r[1] && 0 !== +e && (e += "e" + r[1]);
            return e
        }
        var C = f.defaultOptions,
            v = f.defaultTime,
            E = e.getNestedProperty,
            G = e.isNumber,
            B = e.pick,
            y = e.pInt;
        return {
            dateFormat: function (e, h, d) {
                return v.dateFormat(e, h, d)
            },
            format: function (e, h, d) {
                var b = "{",
                    p = !1,
                    q = /f$/,
                    r = /\.([0-9])/,
                    n = C.lang,
                    J = d && d.time ||
                    v;
                d = d && d.numberFormatter || l;
                for (var w = []; e;) {
                    var z = e.indexOf(b);
                    if (-1 === z) break;
                    var x = e.slice(0, z);
                    if (p) {
                        x = x.split(":");
                        b = E(x.shift() || "", h);
                        if (x.length && "number" === typeof b)
                            if (x = x.join(":"), q.test(x)) {
                                var m = parseInt((x.match(r) || ["", "-1"])[1], 10);
                                null !== b && (b = d(b, m, n.decimalPoint, -1 < x.indexOf(",") ? n.thousandsSep : ""))
                            } else b = J.dateFormat(x, b);
                        w.push(b)
                    } else w.push(x);
                    e = e.slice(z + 1);
                    b = (p = !p) ? "}" : "{"
                }
                w.push(e);
                return w.join("")
            },
            numberFormat: l
        }
    });
    K(l, "Core/Renderer/RendererUtilities.js", [l["Core/Utilities.js"]],
        function (f) {
            var e = f.clamp,
                l = f.pick,
                C = f.stableSort,
                v;
            (function (f) {
                function v(f, y, t) {
                    var h = f,
                        d = h.reducedLen || y,
                        b = function (b, d) {
                            return (d.rank || 0) - (b.rank || 0)
                        },
                        p = function (b, d) {
                            return b.target - d.target
                        },
                        q, r = !0,
                        n = [],
                        J = 0;
                    for (q = f.length; q--;) J += f[q].size;
                    if (J > d) {
                        C(f, b);
                        for (J = q = 0; J <= d;) J += f[q].size, q++;
                        n = f.splice(q - 1, f.length)
                    }
                    C(f, p);
                    for (f = f.map(function (b) {
                            return {
                                size: b.size,
                                targets: [b.target],
                                align: l(b.align, .5)
                            }
                        }); r;) {
                        for (q = f.length; q--;) d = f[q], b = (Math.min.apply(0, d.targets) + Math.max.apply(0, d.targets)) /
                            2, d.pos = e(b - d.size * d.align, 0, y - d.size);
                        q = f.length;
                        for (r = !1; q--;) 0 < q && f[q - 1].pos + f[q - 1].size > f[q].pos && (f[q - 1].size += f[q].size, f[q - 1].targets = f[q - 1].targets.concat(f[q].targets), f[q - 1].align = .5, f[q - 1].pos + f[q - 1].size > y && (f[q - 1].pos = y - f[q - 1].size), f.splice(q, 1), r = !0)
                    }
                    h.push.apply(h, n);
                    q = 0;
                    f.some(function (b) {
                        var d = 0;
                        return (b.targets || []).some(function () {
                            h[q].pos = b.pos + d;
                            if ("undefined" !== typeof t && Math.abs(h[q].pos - h[q].target) > t) return h.slice(0, q + 1).forEach(function (b) {
                                    return delete b.pos
                                }), h.reducedLen =
                                (h.reducedLen || y) - .1 * y, h.reducedLen > .1 * y && v(h, y, t), !0;
                            d += h[q].size;
                            q++;
                            return !1
                        })
                    });
                    C(h, p);
                    return h
                }
                f.distribute = v
            })(v || (v = {}));
            return v
        });
    K(l, "Core/Renderer/SVG/SVGElement.js", [l["Core/Animation/AnimationUtilities.js"], l["Core/Renderer/HTML/AST.js"], l["Core/Color/Color.js"], l["Core/Globals.js"], l["Core/Utilities.js"]], function (f, e, l, C, v) {
        var P = f.animate,
            G = f.animObject,
            B = f.stop,
            y = C.deg2rad,
            t = C.doc,
            h = C.noop,
            d = C.svg,
            b = C.SVG_NS,
            p = C.win,
            q = v.addEvent,
            r = v.attr,
            n = v.createElement,
            J = v.css,
            w = v.defined,
            z = v.erase,
            x = v.extend,
            m = v.fireEvent,
            k = v.isArray,
            a = v.isFunction,
            g = v.isNumber,
            c = v.isString,
            D = v.merge,
            A = v.objectEach,
            u = v.pick,
            L = v.pInt,
            S = v.syncTimeout,
            R = v.uniqueKey;
        f = function () {
            function f() {
                this.element = void 0;
                this.onEvents = {};
                this.opacity = 1;
                this.renderer = void 0;
                this.SVG_NS = b;
                this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ")
            }
            f.prototype._defaultGetter = function (a) {
                a = u(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) &&
                    (a = parseFloat(a));
                return a
            };
            f.prototype._defaultSetter = function (a, c, g) {
                g.setAttribute(c, a)
            };
            f.prototype.add = function (a) {
                var c = this.renderer,
                    g = this.element;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                "undefined" !== typeof this.textStr && "text" === this.element.nodeName && c.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) var b = this.zIndexSetter();
                b || (a ? a.element : c.box).appendChild(g);
                if (this.onAdd) this.onAdd();
                return this
            };
            f.prototype.addClass = function (a, c) {
                var g = c ? "" : this.attr("class") ||
                    "";
                a = (a || "").split(/ /g).reduce(function (a, c) {
                    -1 === g.indexOf(c) && a.push(c);
                    return a
                }, g ? [g] : []).join(" ");
                a !== g && this.attr("class", a);
                return this
            };
            f.prototype.afterSetters = function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            };
            f.prototype.align = function (a, g, I) {
                var b = {},
                    k = this.renderer,
                    m = k.alignedObjects,
                    d, p, F;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = g, !I || c(I)) this.alignTo = d = I || "renderer", z(m, this), m.push(this), I = void 0
                } else a = this.alignOptions, g = this.alignByTranslate,
                    d = this.alignTo;
                I = u(I, k[d], "scrollablePlotBox" === d ? k.plotBox : void 0, k);
                d = a.align;
                var A = a.verticalAlign;
                k = (I.x || 0) + (a.x || 0);
                m = (I.y || 0) + (a.y || 0);
                "right" === d ? p = 1 : "center" === d && (p = 2);
                p && (k += (I.width - (a.width || 0)) / p);
                b[g ? "translateX" : "x"] = Math.round(k);
                "bottom" === A ? F = 1 : "middle" === A && (F = 2);
                F && (m += (I.height - (a.height || 0)) / F);
                b[g ? "translateY" : "y"] = Math.round(m);
                this[this.placed ? "animate" : "attr"](b);
                this.placed = !0;
                this.alignAttr = b;
                return this
            };
            f.prototype.alignSetter = function (a) {
                var c = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                c[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", c[a]))
            };
            f.prototype.animate = function (a, c, g) {
                var I = this,
                    b = G(u(c, this.renderer.globalAnimation, !0));
                c = b.defer;
                u(t.hidden, t.msHidden, t.webkitHidden, !1) && (b.duration = 0);
                0 !== b.duration ? (g && (b.complete = g), S(function () {
                    I.element && P(I, a, b)
                }, c)) : (this.attr(a, void 0, g || b.complete), A(a, function (a, c) {
                    b.step && b.step.call(this, a, {
                        prop: c,
                        pos: 1,
                        elem: this
                    })
                }, this));
                return this
            };
            f.prototype.applyTextOutline = function (a) {
                var c = this.element; -
                1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(c.style.fill)));
                var g = a.split(" ");
                a = g[g.length - 1];
                if ((g = g[0]) && "none" !== g && C.svg) {
                    this.fakeTS = !0;
                    this.ySetter = this.xSetter;
                    g = g.replace(/(^[\d\.]+)(.*?)$/g, function (a, c, g) {
                        return 2 * Number(c) + g
                    });
                    this.removeTextOutline();
                    var k = t.createElementNS(b, "tspan");
                    r(k, {
                        "class": "highcharts-text-outline",
                        fill: a,
                        stroke: a,
                        "stroke-width": g,
                        "stroke-linejoin": "round"
                    });
                    [].forEach.call(c.childNodes, function (a) {
                        var c = a.cloneNode(!0);
                        c.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(function (a) {
                            return c.removeAttribute(a)
                        });
                        k.appendChild(c)
                    });
                    var u = t.createElementNS(b, "tspan");
                    u.textContent = "\u200b";
                    ["x", "y"].forEach(function (a) {
                        var g = c.getAttribute(a);
                        g && u.setAttribute(a, g)
                    });
                    k.appendChild(u);
                    c.insertBefore(k, c.firstChild)
                }
            };
            f.prototype.attr = function (a, c, g, b) {
                var I = this.element,
                    k = this.symbolCustomAttribs,
                    H, u = this,
                    F, m;
                if ("string" === typeof a && "undefined" !== typeof c) {
                    var d = a;
                    a = {};
                    a[d] = c
                }
                "string" === typeof a ? u = (this[a + "Getter"] ||
                    this._defaultGetter).call(this, a, I) : (A(a, function (c, g) {
                    F = !1;
                    b || B(this, g);
                    this.symbolName && -1 !== k.indexOf(g) && (H || (this.symbolAttr(a), H = !0), F = !0);
                    !this.rotation || "x" !== g && "y" !== g || (this.doTransform = !0);
                    F || (m = this[g + "Setter"] || this._defaultSetter, m.call(this, c, g, I), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(g) && this.updateShadows(g, c, m))
                }, this), this.afterSetters());
                g && g.call(this);
                return u
            };
            f.prototype.clip = function (a) {
                return this.attr("clip-path", a ? "url(" +
                    this.renderer.url + "#" + a.id + ")" : "none")
            };
            f.prototype.crisp = function (a, c) {
                c = c || a.strokeWidth || 0;
                var g = Math.round(c) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + g;
                a.y = Math.floor(a.y || this.y || 0) + g;
                a.width = Math.floor((a.width || this.width || 0) - 2 * g);
                a.height = Math.floor((a.height || this.height || 0) - 2 * g);
                w(a.strokeWidth) && (a.strokeWidth = c);
                return a
            };
            f.prototype.complexColor = function (a, c, g) {
                var b = this.renderer,
                    I, u, d, p, F, n, r, q, h, z, e = [],
                    x;
                m(this.renderer, "complexColor", {
                    args: arguments
                }, function () {
                    a.radialGradient ? u = "radialGradient" :
                        a.linearGradient && (u = "linearGradient");
                    if (u) {
                        d = a[u];
                        F = b.gradients;
                        n = a.stops;
                        h = g.radialReference;
                        k(d) && (a[u] = d = {
                            x1: d[0],
                            y1: d[1],
                            x2: d[2],
                            y2: d[3],
                            gradientUnits: "userSpaceOnUse"
                        });
                        "radialGradient" === u && h && !w(d.gradientUnits) && (p = d, d = D(d, b.getRadialAttr(h, p), {
                            gradientUnits: "userSpaceOnUse"
                        }));
                        A(d, function (a, c) {
                            "id" !== c && e.push(c, a)
                        });
                        A(n, function (a) {
                            e.push(a)
                        });
                        e = e.join(",");
                        if (F[e]) z = F[e].attr("id");
                        else {
                            d.id = z = R();
                            var H = F[e] = b.createElement(u).attr(d).add(b.defs);
                            H.radAttr = p;
                            H.stops = [];
                            n.forEach(function (a) {
                                0 ===
                                    a[1].indexOf("rgba") ? (I = l.parse(a[1]), r = I.get("rgb"), q = I.get("a")) : (r = a[1], q = 1);
                                a = b.createElement("stop").attr({
                                    offset: a[0],
                                    "stop-color": r,
                                    "stop-opacity": q
                                }).add(H);
                                H.stops.push(a)
                            })
                        }
                        x = "url(" + b.url + "#" + z + ")";
                        g.setAttribute(c, x);
                        g.gradient = e;
                        a.toString = function () {
                            return x
                        }
                    }
                })
            };
            f.prototype.css = function (a) {
                var c = this.styles,
                    g = {},
                    b = this.element,
                    k = !c;
                a.color && (a.fill = a.color);
                c && A(a, function (a, b) {
                    c && c[b] !== a && (g[b] = a, k = !0)
                });
                if (k) {
                    c && (a = x(c, g));
                    if (null === a.width || "auto" === a.width) delete this.textWidth;
                    else if ("text" === b.nodeName.toLowerCase() && a.width) var u = this.textWidth = L(a.width);
                    this.styles = a;
                    u && !d && this.renderer.forExport && delete a.width;
                    var m = D(a);
                    b.namespaceURI === this.SVG_NS && ["textOutline", "textOverflow", "width"].forEach(function (a) {
                        return m && delete m[a]
                    });
                    J(b, m);
                    this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a.textOutline && this.applyTextOutline(a.textOutline))
                }
                return this
            };
            f.prototype.dashstyleSetter = function (a) {
                var c = this["stroke-width"];
                "inherit" === c && (c =
                    1);
                if (a = a && a.toLowerCase()) {
                    var g = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (a = g.length; a--;) g[a] = "" + L(g[a]) * u(c, NaN);
                    a = g.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            };
            f.prototype.destroy = function () {
                var a = this,
                    c = a.element || {},
                    g = a.renderer,
                    b = c.ownerSVGElement,
                    k = g.isSVG &&
                    "SPAN" === c.nodeName && a.parentGroup || void 0;
                c.onclick = c.onmouseout = c.onmouseover = c.onmousemove = c.point = null;
                B(a);
                if (a.clipPath && b) {
                    var u = a.clipPath;
                    [].forEach.call(b.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
                        -1 < a.getAttribute("clip-path").indexOf(u.element.id) && a.removeAttribute("clip-path")
                    });
                    a.clipPath = u.destroy()
                }
                if (a.stops) {
                    for (b = 0; b < a.stops.length; b++) a.stops[b].destroy();
                    a.stops.length = 0;
                    a.stops = void 0
                }
                a.safeRemoveChild(c);
                for (g.styledMode || a.destroyShadows(); k && k.div && 0 === k.div.childNodes.length;) c =
                    k.parentGroup, a.safeRemoveChild(k.div), delete k.div, k = c;
                a.alignTo && z(g.alignedObjects, a);
                A(a, function (c, g) {
                    a[g] && a[g].parentGroup === a && a[g].destroy && a[g].destroy();
                    delete a[g]
                })
            };
            f.prototype.destroyShadows = function () {
                (this.shadows || []).forEach(function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            };
            f.prototype.destroyTextPath = function (a, c) {
                var g = a.getElementsByTagName("text")[0];
                if (g) {
                    if (g.removeAttribute("dx"), g.removeAttribute("dy"), c.element.setAttribute("id", ""), this.textPathWrapper &&
                        g.getElementsByTagName("textPath").length) {
                        for (a = this.textPathWrapper.element.childNodes; a.length;) g.appendChild(a[0]);
                        g.removeChild(this.textPathWrapper.element)
                    }
                } else if (a.getAttribute("dx") || a.getAttribute("dy")) a.removeAttribute("dx"), a.removeAttribute("dy");
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            };
            f.prototype.dSetter = function (a, c, g) {
                k(a) && ("string" === typeof a[0] && (a = this.renderer.pathToSegments(a)), this.pathArray = a, a = a.reduce(function (a, c, g) {
                    return c && c.join ?
                        (g ? a + " " : "") + c.join(" ") : (c || "").toString()
                }, ""));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[c] !== a && (g.setAttribute(c, a), this[c] = a)
            };
            f.prototype.fadeOut = function (a) {
                var c = this;
                c.animate({
                    opacity: 0
                }, {
                    duration: u(a, 150),
                    complete: function () {
                        c.hide()
                    }
                })
            };
            f.prototype.fillSetter = function (a, c, g) {
                "string" === typeof a ? g.setAttribute(c, a) : a && this.complexColor(a, c, g)
            };
            f.prototype.getBBox = function (c, g) {
                var b = this.alignValue,
                    k = this.element,
                    d = this.renderer,
                    m = this.styles,
                    p = this.textStr,
                    A = d.cache,
                    F = d.cacheKeys,
                    n = k.namespaceURI ===
                    this.SVG_NS;
                g = u(g, this.rotation, 0);
                var r = d.styledMode ? k && f.prototype.getStyle.call(k, "font-size") : m && m.fontSize,
                    D;
                if (w(p)) {
                    var q = p.toString(); - 1 === q.indexOf("<") && (q = q.replace(/[0-9]/g, "0"));
                    q += ["", g, r, this.textWidth, b, m && m.textOverflow, m && m.fontWeight].join()
                }
                q && !c && (D = A[q]);
                if (!D) {
                    if (n || d.forExport) {
                        try {
                            var h = this.fakeTS && function (a) {
                                var c = k.querySelector(".highcharts-text-outline");
                                c && J(c, {
                                    display: a
                                })
                            };
                            a(h) && h("none");
                            D = k.getBBox ? x({}, k.getBBox()) : {
                                width: k.offsetWidth,
                                height: k.offsetHeight
                            };
                            a(h) &&
                                h("")
                        } catch (Z) {
                            ""
                        }
                        if (!D || 0 > D.width) D = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        }
                    } else D = this.htmlGetBBox();
                    if (d.isSVG && (d = D.width, c = D.height, n && (D.height = c = {
                            "11px,17": 14,
                            "13px,20": 16
                        } ["" + (r || "") + ",".concat(Math.round(c))] || c), g)) {
                        n = Number(k.getAttribute("y") || 0) - D.y;
                        b = {
                            right: 1,
                            center: .5
                        } [b || 0] || 0;
                        m = g * y;
                        r = (g - 90) * y;
                        var z = d * Math.cos(m);
                        g = d * Math.sin(m);
                        h = Math.cos(r);
                        m = Math.sin(r);
                        d = D.x + b * (d - z) + n * h;
                        r = d + z;
                        h = r - c * h;
                        z = h - z;
                        n = D.y + n - b * g + n * m;
                        b = n + g;
                        c = b - c * m;
                        g = c - g;
                        D.x = Math.min(d, r, h, z);
                        D.y = Math.min(n, b, c, g);
                        D.width = Math.max(d, r,
                            h, z) - D.x;
                        D.height = Math.max(n, b, c, g) - D.y
                    }
                    if (q && ("" === p || 0 < D.height)) {
                        for (; 250 < F.length;) delete A[F.shift()];
                        A[q] || F.push(q);
                        A[q] = D
                    }
                }
                return D
            };
            f.prototype.getStyle = function (a) {
                return p.getComputedStyle(this.element || this, "").getPropertyValue(a)
            };
            f.prototype.hasClass = function (a) {
                return -1 !== ("" + this.attr("class")).split(" ").indexOf(a)
            };
            f.prototype.hide = function () {
                return this.attr({
                    visibility: "hidden"
                })
            };
            f.prototype.htmlGetBBox = function () {
                return {
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            };
            f.prototype.init = function (a,
                c) {
                this.element = "span" === c ? n(c) : t.createElementNS(this.SVG_NS, c);
                this.renderer = a;
                m(this, "afterInit")
            };
            f.prototype.invert = function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            };
            f.prototype.on = function (a, c) {
                var g = this.onEvents;
                if (g[a]) g[a]();
                g[a] = q(this.element, a, c);
                return this
            };
            f.prototype.opacitySetter = function (a, c, g) {
                this.opacity = a = Number(Number(a).toFixed(3));
                g.setAttribute(c, a)
            };
            f.prototype.removeClass = function (a) {
                return this.attr("class", ("" + this.attr("class")).replace(c(a) ? new RegExp("(^| )".concat(a,
                    "( |$)")) : a, " ").replace(/ +/g, " ").trim())
            };
            f.prototype.removeTextOutline = function () {
                var a = this.element.querySelector("tspan.highcharts-text-outline");
                a && this.safeRemoveChild(a)
            };
            f.prototype.safeRemoveChild = function (a) {
                var c = a.parentNode;
                c && c.removeChild(a)
            };
            f.prototype.setRadialReference = function (a) {
                var c = this.element.gradient && this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                c && c.radAttr && c.animate(this.renderer.getRadialAttr(a, c.radAttr));
                return this
            };
            f.prototype.setTextPath =
                function (a, c) {
                    var b = this.element,
                        k = this.text ? this.text.element : b,
                        u = {
                            textAnchor: "text-anchor"
                        },
                        d = !1,
                        m = this.textPathWrapper,
                        n = !m;
                    c = D(!0, {
                        enabled: !0,
                        attributes: {
                            dy: -5,
                            startOffset: "50%",
                            textAnchor: "middle"
                        }
                    }, c);
                    var F = e.filterUserAttributes(c.attributes);
                    if (a && c && c.enabled) {
                        m && null === m.element.parentNode ? (n = !0, m = m.destroy()) : m && this.removeTextOutline.call(m.parentGroup);
                        this.options && this.options.padding && (F.dx = -this.options.padding);
                        m || (this.textPathWrapper = m = this.renderer.createElement("textPath"), d = !0);
                        var r = m.element;
                        (c = a.element.getAttribute("id")) || a.element.setAttribute("id", c = R());
                        if (n)
                            for (k.setAttribute("y", 0), g(F.dx) && k.setAttribute("x", -F.dx), a = [].slice.call(k.childNodes), n = 0; n < a.length; n++) {
                                var q = a[n];
                                q.nodeType !== p.Node.TEXT_NODE && "tspan" !== q.nodeName || r.appendChild(q)
                            }
                        d && m && m.add({
                            element: k
                        });
                        r.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + c);
                        w(F.dy) && (r.parentNode.setAttribute("dy", F.dy), delete F.dy);
                        w(F.dx) && (r.parentNode.setAttribute("dx", F.dx), delete F.dx);
                        A(F, function (a, c) {
                            r.setAttribute(u[c] || c, a)
                        });
                        b.removeAttribute("transform");
                        this.removeTextOutline.call(m);
                        this.text && !this.renderer.styledMode && this.attr({
                            fill: "none",
                            "stroke-width": 0
                        });
                        this.applyTextOutline = this.updateTransform = h
                    } else m && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(b, a), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                    return this
                };
            f.prototype.shadow = function (a, c, g) {
                var b = [],
                    k = this.element,
                    I = this.oldShadowOptions,
                    u = {
                        color: "#000000",
                        offsetX: this.parentInverted ? -1 : 1,
                        offsetY: this.parentInverted ? -1 : 1,
                        opacity: .15,
                        width: 3
                    },
                    m = !1,
                    F;
                !0 === a ? F = u : "object" === typeof a && (F = x(u, a));
                F && (F && I && A(F, function (a, c) {
                    a !== I[c] && (m = !0)
                }), m && this.destroyShadows(), this.oldShadowOptions = F);
                if (!F) this.destroyShadows();
                else if (!this.shadows) {
                    var d = F.opacity / F.width;
                    var p = this.parentInverted ? "translate(".concat(F.offsetY, ", ").concat(F.offsetX, ")") : "translate(".concat(F.offsetX, ", ").concat(F.offsetY, ")");
                    for (u = 1; u <=
                        F.width; u++) {
                        var n = k.cloneNode(!1);
                        var D = 2 * F.width + 1 - 2 * u;
                        r(n, {
                            stroke: a.color || "#000000",
                            "stroke-opacity": d * u,
                            "stroke-width": D,
                            transform: p,
                            fill: "none"
                        });
                        n.setAttribute("class", (n.getAttribute("class") || "") + " highcharts-shadow");
                        g && (r(n, "height", Math.max(r(n, "height") - D, 0)), n.cutHeight = D);
                        c ? c.element.appendChild(n) : k.parentNode && k.parentNode.insertBefore(n, k);
                        b.push(n)
                    }
                    this.shadows = b
                }
                return this
            };
            f.prototype.show = function (a) {
                void 0 === a && (a = !0);
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            };
            f.prototype.strokeSetter =
                function (a, c, g) {
                    this[c] = a;
                    this.stroke && this["stroke-width"] ? (f.prototype.fillSetter.call(this, this.stroke, "stroke", g), g.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === c && 0 === a && this.hasStroke ? (g.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (g.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
                };
            f.prototype.strokeWidth = function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a =
                    this.getStyle("stroke-width"),
                    c = 0;
                if (a.indexOf("px") === a.length - 2) c = L(a);
                else if ("" !== a) {
                    var g = t.createElementNS(b, "rect");
                    r(g, {
                        width: a,
                        "stroke-width": 0
                    });
                    this.element.parentNode.appendChild(g);
                    c = g.getBBox().width;
                    g.parentNode.removeChild(g)
                }
                return c
            };
            f.prototype.symbolAttr = function (a) {
                var c = this;
                "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (g) {
                    c[g] = u(a[g], c[g])
                });
                c.attr({
                    d: c.renderer.symbols[c.symbolName](c.x, c.y, c.width, c.height, c)
                })
            };
            f.prototype.textSetter =
                function (a) {
                    a !== this.textStr && (delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this))
                };
            f.prototype.titleSetter = function (a) {
                var c = this.element,
                    g = c.getElementsByTagName("title")[0] || t.createElementNS(this.SVG_NS, "title");
                c.insertBefore ? c.insertBefore(g, c.firstChild) : c.appendChild(g);
                g.textContent = String(u(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
            };
            f.prototype.toFront = function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            };
            f.prototype.translate =
                function (a, c) {
                    return this.attr({
                        translateX: a,
                        translateY: c
                    })
                };
            f.prototype.updateShadows = function (a, c, g) {
                var b = this.shadows;
                if (b)
                    for (var k = b.length; k--;) g.call(b[k], "height" === a ? Math.max(c - (b[k].cutHeight || 0), 0) : "d" === a ? this.d : c, a, b[k])
            };
            f.prototype.updateTransform = function () {
                var a = this.scaleX,
                    c = this.scaleY,
                    g = this.inverted,
                    b = this.rotation,
                    k = this.matrix,
                    m = this.element,
                    d = this.translateX || 0,
                    n = this.translateY || 0;
                g && (d += this.width, n += this.height);
                d = ["translate(" + d + "," + n + ")"];
                w(k) && d.push("matrix(" + k.join(",") +
                    ")");
                g ? d.push("rotate(90) scale(-1,1)") : b && d.push("rotate(" + b + " " + u(this.rotationOriginX, m.getAttribute("x"), 0) + " " + u(this.rotationOriginY, m.getAttribute("y") || 0) + ")");
                (w(a) || w(c)) && d.push("scale(" + u(a, 1) + " " + u(c, 1) + ")");
                d.length && m.setAttribute("transform", d.join(" "))
            };
            f.prototype.visibilitySetter = function (a, c, g) {
                "inherit" === a ? g.removeAttribute(c) : this[c] !== a && g.setAttribute(c, a);
                this[c] = a
            };
            f.prototype.xGetter = function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            };
            f.prototype.zIndexSetter = function (a, c) {
                var g = this.renderer,
                    b = this.parentGroup,
                    k = (b || g).element || g.box,
                    u = this.element;
                g = k === g.box;
                var d = !1;
                var m = this.added;
                var F;
                w(a) ? (u.setAttribute("data-z-index", a), a = +a, this[c] === a && (m = !1)) : w(this[c]) && u.removeAttribute("data-z-index");
                this[c] = a;
                if (m) {
                    (a = this.zIndex) && b && (b.handleZ = !0);
                    c = k.childNodes;
                    for (F = c.length - 1; 0 <= F && !d; F--) {
                        b = c[F];
                        m = b.getAttribute("data-z-index");
                        var n = !w(m);
                        if (b !== u)
                            if (0 > a && n && !g && !F) k.insertBefore(u, c[F]), d = !0;
                            else if (L(m) <= a || n && (!w(a) ||
                                0 <= a)) k.insertBefore(u, c[F + 1] || null), d = !0
                    }
                    d || (k.insertBefore(u, c[g ? 3 : 0] || null), d = !0)
                }
                return d
            };
            return f
        }();
        f.prototype["stroke-widthSetter"] = f.prototype.strokeSetter;
        f.prototype.yGetter = f.prototype.xGetter;
        f.prototype.matrixSetter = f.prototype.rotationOriginXSetter = f.prototype.rotationOriginYSetter = f.prototype.rotationSetter = f.prototype.scaleXSetter = f.prototype.scaleYSetter = f.prototype.translateXSetter = f.prototype.translateYSetter = f.prototype.verticalAlignSetter = function (a, c) {
            this[c] = a;
            this.doTransform = !0
        };
        "";
        return f
    });
    K(l, "Core/Renderer/RendererRegistry.js", [l["Core/Globals.js"]], function (f) {
        var e;
        (function (e) {
            e.rendererTypes = {};
            var l;
            e.getRendererType = function (f) {
                void 0 === f && (f = l);
                return e.rendererTypes[f] || e.rendererTypes[l]
            };
            e.registerRendererType = function (v, P, G) {
                e.rendererTypes[v] = P;
                if (!l || G) l = v, f.Renderer = P
            }
        })(e || (e = {}));
        return e
    });
    K(l, "Core/Renderer/SVG/SVGLabel.js", [l["Core/Renderer/SVG/SVGElement.js"], l["Core/Utilities.js"]], function (f, e) {
        var l = this && this.__extends || function () {
                var e = function (h,
                    d) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (b, d) {
                        b.__proto__ = d
                    } || function (b, d) {
                        for (var p in d) d.hasOwnProperty(p) && (b[p] = d[p])
                    };
                    return e(h, d)
                };
                return function (h, d) {
                    function b() {
                        this.constructor = h
                    }
                    e(h, d);
                    h.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b)
                }
            }(),
            C = e.defined,
            v = e.extend,
            E = e.isNumber,
            G = e.merge,
            B = e.pick,
            y = e.removeEvent;
        return function (e) {
            function h(d, b, p, q, r, n, f, w, z, x) {
                var m = e.call(this) || this;
                m.paddingLeftSetter = m.paddingSetter;
                m.paddingRightSetter =
                    m.paddingSetter;
                m.init(d, "g");
                m.textStr = b;
                m.x = p;
                m.y = q;
                m.anchorX = n;
                m.anchorY = f;
                m.baseline = z;
                m.className = x;
                m.addClass("button" === x ? "highcharts-no-tooltip" : "highcharts-label");
                x && m.addClass("highcharts-" + x);
                m.text = d.text(void 0, 0, 0, w).attr({
                    zIndex: 1
                });
                var k;
                "string" === typeof r && ((k = /^url\((.*?)\)$/.test(r)) || m.renderer.symbols[r]) && (m.symbolKey = r);
                m.bBox = h.emptyBBox;
                m.padding = 3;
                m.baselineOffset = 0;
                m.needsBox = d.styledMode || k;
                m.deferredAttr = {};
                m.alignFactor = 0;
                return m
            }
            l(h, e);
            h.prototype.alignSetter = function (d) {
                d = {
                    left: 0,
                    center: .5,
                    right: 1
                } [d];
                d !== this.alignFactor && (this.alignFactor = d, this.bBox && E(this.xSetting) && this.attr({
                    x: this.xSetting
                }))
            };
            h.prototype.anchorXSetter = function (d, b) {
                this.anchorX = d;
                this.boxAttr(b, Math.round(d) - this.getCrispAdjust() - this.xSetting)
            };
            h.prototype.anchorYSetter = function (d, b) {
                this.anchorY = d;
                this.boxAttr(b, d - this.ySetting)
            };
            h.prototype.boxAttr = function (d, b) {
                this.box ? this.box.attr(d, b) : this.deferredAttr[d] = b
            };
            h.prototype.css = function (d) {
                if (d) {
                    var b = {};
                    d = G(d);
                    h.textProps.forEach(function (p) {
                        "undefined" !==
                        typeof d[p] && (b[p] = d[p], delete d[p])
                    });
                    this.text.css(b);
                    var p = "width" in b;
                    "fontSize" in b || "fontWeight" in b ? this.updateTextPadding() : p && this.updateBoxSize()
                }
                return f.prototype.css.call(this, d)
            };
            h.prototype.destroy = function () {
                y(this.element, "mouseenter");
                y(this.element, "mouseleave");
                this.text && this.text.destroy();
                this.box && (this.box = this.box.destroy());
                f.prototype.destroy.call(this)
            };
            h.prototype.fillSetter = function (d, b) {
                d && (this.needsBox = !0);
                this.fill = d;
                this.boxAttr(b, d)
            };
            h.prototype.getBBox = function () {
                this.textStr &&
                    0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
                var d = this.padding,
                    b = B(this.paddingLeft, d);
                return {
                    width: this.width,
                    height: this.height,
                    x: this.bBox.x - b,
                    y: this.bBox.y - d
                }
            };
            h.prototype.getCrispAdjust = function () {
                return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2
            };
            h.prototype.heightSetter = function (d) {
                this.heightSetting = d
            };
            h.prototype.onAdd = function () {
                var d = this.textStr;
                this.text.add(this);
                this.attr({
                    text: C(d) ?
                        d : "",
                    x: this.x,
                    y: this.y
                });
                this.box && C(this.anchorX) && this.attr({
                    anchorX: this.anchorX,
                    anchorY: this.anchorY
                })
            };
            h.prototype.paddingSetter = function (d, b) {
                E(d) ? d !== this[b] && (this[b] = d, this.updateTextPadding()) : this[b] = void 0
            };
            h.prototype.rSetter = function (d, b) {
                this.boxAttr(b, d)
            };
            h.prototype.shadow = function (d) {
                d && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(d));
                return this
            };
            h.prototype.strokeSetter = function (d, b) {
                this.stroke = d;
                this.boxAttr(b, d)
            };
            h.prototype["stroke-widthSetter"] =
                function (d, b) {
                    d && (this.needsBox = !0);
                    this["stroke-width"] = d;
                    this.boxAttr(b, d)
                };
            h.prototype["text-alignSetter"] = function (d) {
                this.textAlign = d
            };
            h.prototype.textSetter = function (d) {
                "undefined" !== typeof d && this.text.attr({
                    text: d
                });
                this.updateTextPadding()
            };
            h.prototype.updateBoxSize = function () {
                var d = this.text.element.style,
                    b = {},
                    p = this.padding,
                    q = this.bBox = E(this.widthSetting) && E(this.heightSetting) && !this.textAlign || !C(this.text.textStr) ? h.emptyBBox : this.text.getBBox();
                this.width = this.getPaddedWidth();
                this.height =
                    (this.heightSetting || q.height || 0) + 2 * p;
                d = this.renderer.fontMetrics(d && d.fontSize, this.text);
                this.baselineOffset = p + Math.min((this.text.firstLineMetrics || d).b, q.height || Infinity);
                this.heightSetting && (this.baselineOffset += (this.heightSetting - d.h) / 2);
                this.needsBox && (this.box || (p = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), p.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), p.add(this)), p = this.getCrispAdjust(),
                    b.x = p, b.y = (this.baseline ? -this.baselineOffset : 0) + p, b.width = Math.round(this.width), b.height = Math.round(this.height), this.box.attr(v(b, this.deferredAttr)), this.deferredAttr = {})
            };
            h.prototype.updateTextPadding = function () {
                var d = this.text;
                this.updateBoxSize();
                var b = this.baseline ? 0 : this.baselineOffset,
                    p = B(this.paddingLeft, this.padding);
                C(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (p += {
                    center: .5,
                    right: 1
                } [this.textAlign] * (this.widthSetting - this.bBox.width));
                if (p !==
                    d.x || b !== d.y) d.attr("x", p), d.hasBoxWidthChanged && (this.bBox = d.getBBox(!0)), "undefined" !== typeof b && d.attr("y", b);
                d.x = p;
                d.y = b
            };
            h.prototype.widthSetter = function (d) {
                this.widthSetting = E(d) ? d : void 0
            };
            h.prototype.getPaddedWidth = function () {
                var d = this.padding,
                    b = B(this.paddingLeft, d);
                d = B(this.paddingRight, d);
                return (this.widthSetting || this.bBox.width || 0) + b + d
            };
            h.prototype.xSetter = function (d) {
                this.x = d;
                this.alignFactor && (d -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = !0);
                this.xSetting = Math.round(d);
                this.attr("translateX", this.xSetting)
            };
            h.prototype.ySetter = function (d) {
                this.ySetting = this.y = Math.round(d);
                this.attr("translateY", this.ySetting)
            };
            h.emptyBBox = {
                width: 0,
                height: 0,
                x: 0,
                y: 0
            };
            h.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
            return h
        }(f)
    });
    K(l, "Core/Renderer/SVG/Symbols.js", [l["Core/Utilities.js"]], function (f) {
        function e(e, f, t, h, d) {
            var b = [];
            if (d) {
                var p = d.start || 0,
                    q = G(d.r, t);
                t = G(d.r, h || t);
                var r =
                    (d.end || 0) - .001;
                h = d.innerR;
                var n = G(d.open, .001 > Math.abs((d.end || 0) - p - 2 * Math.PI)),
                    J = Math.cos(p),
                    w = Math.sin(p),
                    z = Math.cos(r),
                    x = Math.sin(r);
                p = G(d.longArc, .001 > r - p - Math.PI ? 0 : 1);
                b.push(["M", e + q * J, f + t * w], ["A", q, t, 0, p, G(d.clockwise, 1), e + q * z, f + t * x]);
                v(h) && b.push(n ? ["M", e + h * z, f + h * x] : ["L", e + h * z, f + h * x], ["A", h, h, 0, p, v(d.clockwise) ? 1 - d.clockwise : 0, e + h * J, f + h * w]);
                n || b.push(["Z"])
            }
            return b
        }

        function l(e, f, t, h, d) {
            return d && d.r ? C(e, f, t, h, d) : [
                ["M", e, f],
                ["L", e + t, f],
                ["L", e + t, f + h],
                ["L", e, f + h],
                ["Z"]
            ]
        }

        function C(e, f, t, h,
            d) {
            d = d && d.r || 0;
            return [
                ["M", e + d, f],
                ["L", e + t - d, f],
                ["C", e + t, f, e + t, f, e + t, f + d],
                ["L", e + t, f + h - d],
                ["C", e + t, f + h, e + t, f + h, e + t - d, f + h],
                ["L", e + d, f + h],
                ["C", e, f + h, e, f + h, e, f + h - d],
                ["L", e, f + d],
                ["C", e, f, e, f, e + d, f]
            ]
        }
        var v = f.defined,
            E = f.isNumber,
            G = f.pick;
        return {
            arc: e,
            callout: function (e, f, t, h, d) {
                var b = Math.min(d && d.r || 0, t, h),
                    p = b + 6,
                    q = d && d.anchorX;
                d = d && d.anchorY || 0;
                var r = C(e, f, t, h, {
                    r: b
                });
                if (!E(q)) return r;
                e + q >= t ? d > f + p && d < f + h - p ? r.splice(3, 1, ["L", e + t, d - 6], ["L", e + t + 6, d], ["L", e + t, d + 6], ["L", e + t, f + h - b]) : r.splice(3, 1, ["L", e + t, h /
                    2
                ], ["L", q, d], ["L", e + t, h / 2], ["L", e + t, f + h - b]) : 0 >= e + q ? d > f + p && d < f + h - p ? r.splice(7, 1, ["L", e, d + 6], ["L", e - 6, d], ["L", e, d - 6], ["L", e, f + b]) : r.splice(7, 1, ["L", e, h / 2], ["L", q, d], ["L", e, h / 2], ["L", e, f + b]) : d && d > h && q > e + p && q < e + t - p ? r.splice(5, 1, ["L", q + 6, f + h], ["L", q, f + h + 6], ["L", q - 6, f + h], ["L", e + b, f + h]) : d && 0 > d && q > e + p && q < e + t - p && r.splice(1, 1, ["L", q - 6, f], ["L", q, f - 6], ["L", q + 6, f], ["L", t - b, f]);
                return r
            },
            circle: function (f, l, t, h) {
                return e(f + t / 2, l + h / 2, t / 2, h / 2, {
                    start: .5 * Math.PI,
                    end: 2.5 * Math.PI,
                    open: !1
                })
            },
            diamond: function (e, f, t, h) {
                return [
                    ["M",
                        e + t / 2, f
                    ],
                    ["L", e + t, f + h / 2],
                    ["L", e + t / 2, f + h],
                    ["L", e, f + h / 2],
                    ["Z"]
                ]
            },
            rect: l,
            roundedRect: C,
            square: l,
            triangle: function (e, f, t, h) {
                return [
                    ["M", e + t / 2, f],
                    ["L", e + t, f + h],
                    ["L", e, f + h],
                    ["Z"]
                ]
            },
            "triangle-down": function (e, f, t, h) {
                return [
                    ["M", e, f],
                    ["L", e + t, f],
                    ["L", e + t / 2, f + h],
                    ["Z"]
                ]
            }
        }
    });
    K(l, "Core/Renderer/SVG/TextBuilder.js", [l["Core/Renderer/HTML/AST.js"], l["Core/Globals.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var P = e.doc,
            v = e.SVG_NS,
            E = e.win,
            G = l.attr,
            B = l.extend,
            y = l.isString,
            t = l.objectEach,
            h = l.pick;
        return function () {
            function d(b) {
                var d =
                    b.styles;
                this.renderer = b.renderer;
                this.svgElement = b;
                this.width = b.textWidth;
                this.textLineHeight = d && d.lineHeight;
                this.textOutline = d && d.textOutline;
                this.ellipsis = !(!d || "ellipsis" !== d.textOverflow);
                this.noWrap = !(!d || "nowrap" !== d.whiteSpace);
                this.fontSize = d && d.fontSize
            }
            d.prototype.buildSVG = function () {
                var b = this.svgElement,
                    d = b.element,
                    e = b.renderer,
                    r = h(b.textStr, "").toString(),
                    n = -1 !== r.indexOf("<"),
                    J = d.childNodes;
                e = this.width && !b.added && e.box;
                var w = /<br.*?>/g,
                    z = [r, this.ellipsis, this.noWrap, this.textLineHeight,
                        this.textOutline, this.fontSize, this.width
                    ].join();
                if (z !== b.textCache) {
                    b.textCache = z;
                    delete b.actualWidth;
                    for (z = J.length; z--;) d.removeChild(J[z]);
                    n || this.ellipsis || this.width || -1 !== r.indexOf(" ") && (!this.noWrap || w.test(r)) ? "" !== r && (e && e.appendChild(d), r = new f(r), this.modifyTree(r.nodes), r.addToDOM(b.element), this.modifyDOM(), this.ellipsis && -1 !== (d.textContent || "").indexOf("\u2026") && b.attr("title", this.unescapeEntities(b.textStr || "", ["&lt;", "&gt;"])), e && e.removeChild(d)) : d.appendChild(P.createTextNode(this.unescapeEntities(r)));
                    y(this.textOutline) && b.applyTextOutline && b.applyTextOutline(this.textOutline)
                }
            };
            d.prototype.modifyDOM = function () {
                var b = this,
                    d = this.svgElement,
                    e = G(d.element, "x");
                d.firstLineMetrics = void 0;
                for (var r; r = d.element.firstChild;)
                    if (/^[\s\u200B]*$/.test(r.textContent || " ")) d.element.removeChild(r);
                    else break;
                [].forEach.call(d.element.querySelectorAll("tspan.highcharts-br"), function (n, r) {
                    n.nextSibling && n.previousSibling && (0 === r && 1 === n.previousSibling.nodeType && (d.firstLineMetrics = d.renderer.fontMetrics(void 0,
                        n.previousSibling)), G(n, {
                        dy: b.getLineHeight(n.nextSibling),
                        x: e
                    }))
                });
                var n = this.width || 0;
                if (n) {
                    var h = function (r, p) {
                            var m = r.textContent || "",
                                k = m.replace(/([^\^])-/g, "$1- ").split(" "),
                                a = !b.noWrap && (1 < k.length || 1 < d.element.childNodes.length),
                                g = b.getLineHeight(p),
                                c = 0,
                                D = d.actualWidth;
                            if (b.ellipsis) m && b.truncate(r, m, void 0, 0, Math.max(0, n - parseInt(b.fontSize || 12, 10)), function (a, c) {
                                return a.substring(0, c) + "\u2026"
                            });
                            else if (a) {
                                m = [];
                                for (a = []; p.firstChild && p.firstChild !== r;) a.push(p.firstChild), p.removeChild(p.firstChild);
                                for (; k.length;) k.length && !b.noWrap && 0 < c && (m.push(r.textContent || ""), r.textContent = k.join(" ").replace(/- /g, "-")), b.truncate(r, void 0, k, 0 === c ? D || 0 : 0, n, function (a, c) {
                                    return k.slice(0, c).join(" ").replace(/- /g, "-")
                                }), D = d.actualWidth, c++;
                                a.forEach(function (a) {
                                    p.insertBefore(a, r)
                                });
                                m.forEach(function (a) {
                                    p.insertBefore(P.createTextNode(a), r);
                                    a = P.createElementNS(v, "tspan");
                                    a.textContent = "\u200b";
                                    G(a, {
                                        dy: g,
                                        x: e
                                    });
                                    p.insertBefore(a, r)
                                })
                            }
                        },
                        f = function (b) {
                            [].slice.call(b.childNodes).forEach(function (n) {
                                n.nodeType ===
                                    E.Node.TEXT_NODE ? h(n, b) : (-1 !== n.className.baseVal.indexOf("highcharts-br") && (d.actualWidth = 0), f(n))
                            })
                        };
                    f(d.element)
                }
            };
            d.prototype.getLineHeight = function (b) {
                var d;
                b = b.nodeType === E.Node.TEXT_NODE ? b.parentElement : b;
                this.renderer.styledMode || (d = b && /(px|em)$/.test(b.style.fontSize) ? b.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
                return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(d, b || this.svgElement.element).h
            };
            d.prototype.modifyTree = function (b) {
                var d =
                    this,
                    e = function (r, n) {
                        var p = r.attributes;
                        p = void 0 === p ? {} : p;
                        var h = r.children,
                            q = r.style;
                        q = void 0 === q ? {} : q;
                        var f = r.tagName,
                            m = d.renderer.styledMode;
                        if ("b" === f || "strong" === f) m ? p["class"] = "highcharts-strong" : q.fontWeight = "bold";
                        else if ("i" === f || "em" === f) m ? p["class"] = "highcharts-emphasized" : q.fontStyle = "italic";
                        q && q.color && (q.fill = q.color);
                        "br" === f ? (p["class"] = "highcharts-br", r.textContent = "\u200b", (n = b[n + 1]) && n.textContent && (n.textContent = n.textContent.replace(/^ +/gm, ""))) : "a" === f && h && h.some(function (b) {
                            return "#text" ===
                                b.tagName
                        }) && (r.children = [{
                            children: h,
                            tagName: "tspan"
                        }]);
                        "#text" !== f && "a" !== f && (r.tagName = "tspan");
                        B(r, {
                            attributes: p,
                            style: q
                        });
                        h && h.filter(function (b) {
                            return "#text" !== b.tagName
                        }).forEach(e)
                    };
                b.forEach(e)
            };
            d.prototype.truncate = function (b, d, e, r, n, h) {
                var p = this.svgElement,
                    f = p.renderer,
                    q = p.rotation,
                    m = [],
                    k = e ? 1 : 0,
                    a = (d || e || "").length,
                    g = a,
                    c, D = function (a, c) {
                        c = c || a;
                        var g = b.parentNode;
                        if (g && "undefined" === typeof m[c])
                            if (g.getSubStringLength) try {
                                m[c] = r + g.getSubStringLength(0, e ? c + 1 : c)
                            } catch (R) {
                                ""
                            } else f.getSpanWidth &&
                                (b.textContent = h(d || e, a), m[c] = r + f.getSpanWidth(p, b));
                        return m[c]
                    };
                p.rotation = 0;
                var A = D(b.textContent.length);
                if (r + A > n) {
                    for (; k <= a;) g = Math.ceil((k + a) / 2), e && (c = h(e, g)), A = D(g, c && c.length - 1), k === a ? k = a + 1 : A > n ? a = g - 1 : k = g;
                    0 === a ? b.textContent = "" : d && a === d.length - 1 || (b.textContent = c || h(d || e, g))
                }
                e && e.splice(0, g);
                p.actualWidth = A;
                p.rotation = q
            };
            d.prototype.unescapeEntities = function (b, d) {
                t(this.renderer.escapes, function (e, r) {
                    d && -1 !== d.indexOf(e) || (b = b.toString().replace(new RegExp(e, "g"), r))
                });
                return b
            };
            return d
        }()
    });
    K(l, "Core/Renderer/SVG/SVGRenderer.js", [l["Core/Renderer/HTML/AST.js"], l["Core/Color/Color.js"], l["Core/Globals.js"], l["Core/Renderer/RendererRegistry.js"], l["Core/Renderer/SVG/SVGElement.js"], l["Core/Renderer/SVG/SVGLabel.js"], l["Core/Renderer/SVG/Symbols.js"], l["Core/Renderer/SVG/TextBuilder.js"], l["Core/Utilities.js"]], function (f, e, l, C, v, E, G, B, y) {
        var t = l.charts,
            h = l.deg2rad,
            d = l.doc,
            b = l.isFirefox,
            p = l.isMS,
            q = l.isWebKit,
            r = l.noop,
            n = l.SVG_NS,
            J = l.symbolSizes,
            w = l.win,
            z = y.addEvent,
            x = y.attr,
            m = y.createElement,
            k = y.css,
            a = y.defined,
            g = y.destroyObjectProperties,
            c = y.extend,
            D = y.isArray,
            A = y.isNumber,
            u = y.isObject,
            L = y.isString,
            S = y.merge,
            R = y.pick,
            M = y.pInt,
            U = y.uniqueKey,
            aa;
        l = function () {
            function I(a, c, g, b, d, k, m) {
                this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
                this.init(a, c, g, b, d, k, m)
            }
            I.prototype.init = function (a, c, g, m, u, F, I) {
                var n = this.createElement("svg").attr({
                        version: "1.1",
                        "class": "highcharts-root"
                    }),
                    H = n.element;
                I || n.css(this.getStyle(m));
                a.appendChild(H);
                x(a, "dir", "ltr"); - 1 === a.innerHTML.indexOf("xmlns") && x(H, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = H;
                this.boxWrapper = n;
                this.alignedObjects = [];
                this.url = this.getReferenceURL();
                this.createElement("desc").add().element.appendChild(d.createTextNode("Created with Highcharts 10.2.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = F;
                this.forExport = u;
                this.styledMode = I;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(c, g, !1);
                var e;
                b && a.getBoundingClientRect && (c = function () {
                    k(a, {
                        left: 0,
                        top: 0
                    });
                    e = a.getBoundingClientRect();
                    k(a, {
                        left: Math.ceil(e.left) - e.left + "px",
                        top: Math.ceil(e.top) - e.top + "px"
                    })
                }, c(), this.unSubPixelFix = z(w, "resize", c))
            };
            I.prototype.definition = function (a) {
                return (new f([a])).addToDOM(this.defs.element)
            };
            I.prototype.getReferenceURL = function () {
                if ((b || q) && d.getElementsByTagName("base").length) {
                    if (!a(aa)) {
                        var c = U();
                        c = (new f([{
                            tagName: "svg",
                            attributes: {
                                width: 8,
                                height: 8
                            },
                            children: [{
                                tagName: "defs",
                                children: [{
                                    tagName: "clipPath",
                                    attributes: {
                                        id: c
                                    },
                                    children: [{
                                        tagName: "rect",
                                        attributes: {
                                            width: 4,
                                            height: 4
                                        }
                                    }]
                                }]
                            }, {
                                tagName: "rect",
                                attributes: {
                                    id: "hitme",
                                    width: 8,
                                    height: 8,
                                    "clip-path": "url(#".concat(c, ")"),
                                    fill: "rgba(0,0,0,0.001)"
                                }
                            }]
                        }])).addToDOM(d.body);
                        k(c, {
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 9E5
                        });
                        var g = d.elementFromPoint(6, 6);
                        aa = "hitme" === (g && g.id);
                        d.body.removeChild(c)
                    }
                    if (aa) return w.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20")
                }
                return ""
            };
            I.prototype.getStyle =
                function (a) {
                    return this.style = c({
                        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                        fontSize: "12px"
                    }, a)
                };
            I.prototype.setStyle = function (a) {
                this.boxWrapper.css(this.getStyle(a))
            };
            I.prototype.isHidden = function () {
                return !this.boxWrapper.getBBox().width
            };
            I.prototype.destroy = function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                g(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects =
                    null
            };
            I.prototype.createElement = function (a) {
                var c = new this.Element;
                c.init(this, a);
                return c
            };
            I.prototype.getRadialAttr = function (a, c) {
                return {
                    cx: a[0] - a[2] / 2 + (c.cx || 0) * a[2],
                    cy: a[1] - a[2] / 2 + (c.cy || 0) * a[2],
                    r: (c.r || 0) * a[2]
                }
            };
            I.prototype.buildText = function (a) {
                (new B(a)).buildSVG()
            };
            I.prototype.getContrast = function (a) {
                a = e.parse(a).rgba.map(function (a) {
                    a /= 255;
                    return .03928 >= a ? a / 12.92 : Math.pow((a + .055) / 1.055, 2.4)
                });
                a = .2126 * a[0] + .7152 * a[1] + .0722 * a[2];
                return 1.05 / (a + .05) > (a + .05) / .05 ? "#FFFFFF" : "#000000"
            };
            I.prototype.button =
                function (a, g, b, d, k, m, I, n, e, r) {
                    void 0 === k && (k = {});
                    var F = this.label(a, g, b, e, void 0, void 0, r, void 0, "button"),
                        D = this.styledMode;
                    a = k.states || {};
                    var A = 0;
                    k = S(k);
                    delete k.states;
                    var H = S({
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }, k.style);
                    delete k.style;
                    var h = f.filterUserAttributes(k);
                    F.attr(S({
                        padding: 8,
                        r: 2
                    }, h));
                    if (!D) {
                        h = S({
                            fill: "#f7f7f7",
                            stroke: "#cccccc",
                            "stroke-width": 1
                        }, h);
                        m = S(h, {
                            fill: "#e6e6e6"
                        }, f.filterUserAttributes(m || a.hover || {}));
                        var q = m.style;
                        delete m.style;
                        I = S(h, {
                            fill: "#e6ebf5",
                            style: {
                                color: "#000000",
                                fontWeight: "bold"
                            }
                        }, f.filterUserAttributes(I || a.select || {}));
                        var N = I.style;
                        delete I.style;
                        n = S(h, {
                            style: {
                                color: "#cccccc"
                            }
                        }, f.filterUserAttributes(n || a.disabled || {}));
                        var w = n.style;
                        delete n.style
                    }
                    z(F.element, p ? "mouseover" : "mouseenter", function () {
                        3 !== A && F.setState(1)
                    });
                    z(F.element, p ? "mouseout" : "mouseleave", function () {
                        3 !== A && F.setState(A)
                    });
                    F.setState = function (a) {
                        1 !== a && (F.state = A = a);
                        F.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed",
                            "disabled"
                        ][a || 0]);
                        D || (F.attr([h, m, I, n][a || 0]), a = [H, q, N, w][a || 0], u(a) && F.css(a))
                    };
                    D || F.attr(h).css(c({
                        cursor: "default"
                    }, H));
                    return F.on("touchstart", function (a) {
                        return a.stopPropagation()
                    }).on("click", function (a) {
                        3 !== A && d.call(F, a)
                    })
                };
            I.prototype.crispLine = function (c, g, b) {
                void 0 === b && (b = "round");
                var d = c[0],
                    k = c[1];
                a(d[1]) && d[1] === k[1] && (d[1] = k[1] = Math[b](d[1]) - g % 2 / 2);
                a(d[2]) && d[2] === k[2] && (d[2] = k[2] = Math[b](d[2]) + g % 2 / 2);
                return c
            };
            I.prototype.path = function (a) {
                var g = this.styledMode ? {} : {
                    fill: "none"
                };
                D(a) ? g.d = a : u(a) && c(g, a);
                return this.createElement("path").attr(g)
            };
            I.prototype.circle = function (a, c, g) {
                a = u(a) ? a : "undefined" === typeof a ? {} : {
                    x: a,
                    y: c,
                    r: g
                };
                c = this.createElement("circle");
                c.xSetter = c.ySetter = function (a, c, g) {
                    g.setAttribute("c" + c, a)
                };
                return c.attr(a)
            };
            I.prototype.arc = function (a, c, g, b, d, k) {
                u(a) ? (b = a, c = b.y, g = b.r, a = b.x) : b = {
                    innerR: b,
                    start: d,
                    end: k
                };
                a = this.symbol("arc", a, c, g, g, b);
                a.r = g;
                return a
            };
            I.prototype.rect = function (a, c, g, b, d, k) {
                d = u(a) ? a.r : d;
                var m = this.createElement("rect");
                a = u(a) ? a : "undefined" ===
                    typeof a ? {} : {
                        x: a,
                        y: c,
                        width: Math.max(g, 0),
                        height: Math.max(b, 0)
                    };
                this.styledMode || ("undefined" !== typeof k && (a["stroke-width"] = k, a = m.crisp(a)), a.fill = "none");
                d && (a.r = d);
                m.rSetter = function (a, c, g) {
                    m.r = a;
                    x(g, {
                        rx: a,
                        ry: a
                    })
                };
                m.rGetter = function () {
                    return m.r || 0
                };
                return m.attr(a)
            };
            I.prototype.setSize = function (a, c, g) {
                this.width = a;
                this.height = c;
                this.boxWrapper.animate({
                    width: a,
                    height: c
                }, {
                    step: function () {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        })
                    },
                    duration: R(g, !0) ? void 0 : 0
                });
                this.alignElements()
            };
            I.prototype.g = function (a) {
                var c = this.createElement("g");
                return a ? c.attr({
                    "class": "highcharts-" + a
                }) : c
            };
            I.prototype.image = function (a, c, g, b, d, k) {
                var m = {
                        preserveAspectRatio: "none"
                    },
                    u = function (a, c) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", c) : a.setAttribute("hc-svg-href", c)
                    };
                A(c) && (m.x = c);
                A(g) && (m.y = g);
                A(b) && (m.width = b);
                A(d) && (m.height = d);
                var F = this.createElement("image").attr(m);
                c = function (c) {
                    u(F.element, a);
                    k.call(F, c)
                };
                k ? (u(F.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                    g = new w.Image, z(g, "load", c), g.src = a, g.complete && c({})) : u(F.element, a);
                return F
            };
            I.prototype.symbol = function (g, b, u, I, n, F) {
                var e = this,
                    r = /^url\((.*?)\)$/,
                    D = r.test(g),
                    p = !D && (this.symbols[g] ? g : "circle"),
                    A = p && this.symbols[p],
                    h;
                if (A) {
                    "number" === typeof b && (h = A.call(this.symbols, Math.round(b || 0), Math.round(u || 0), I || 0, n || 0, F));
                    var f = this.path(h);
                    e.styledMode || f.attr("fill", "none");
                    c(f, {
                        symbolName: p || void 0,
                        x: b,
                        y: u,
                        width: I,
                        height: n
                    });
                    F && c(f, F)
                } else if (D) {
                    var q = g.match(r)[1];
                    var H = f = this.image(q);
                    H.imgwidth =
                        R(J[q] && J[q].width, F && F.width);
                    H.imgheight = R(J[q] && J[q].height, F && F.height);
                    var z = function (a) {
                        return a.attr({
                            width: a.width,
                            height: a.height
                        })
                    };
                    ["width", "height"].forEach(function (c) {
                        H[c + "Setter"] = function (c, g) {
                            var b = this["img" + g];
                            this[g] = c;
                            a(b) && (F && "within" === F.backgroundSize && this.width && this.height && (b = Math.round(b * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(g, b), this.alignByTranslate || (c = ((this[g] || 0) - b) / 2, this.attr("width" === g ? {
                                translateX: c
                            } : {
                                translateY: c
                            })))
                        }
                    });
                    a(b) && H.attr({
                        x: b,
                        y: u
                    });
                    H.isImg = !0;
                    a(H.imgwidth) && a(H.imgheight) ? z(H) : (H.attr({
                        width: 0,
                        height: 0
                    }), m("img", {
                        onload: function () {
                            var a = t[e.chartIndex];
                            0 === this.width && (k(this, {
                                position: "absolute",
                                top: "-999em"
                            }), d.body.appendChild(this));
                            J[q] = {
                                width: this.width,
                                height: this.height
                            };
                            H.imgwidth = this.width;
                            H.imgheight = this.height;
                            H.element && z(H);
                            this.parentNode && this.parentNode.removeChild(this);
                            e.imgCount--;
                            if (!e.imgCount && a && !a.hasLoaded) a.onload()
                        },
                        src: q
                    }), this.imgCount++)
                }
                return f
            };
            I.prototype.clipRect = function (a, c, g, b) {
                var d = U() + "-",
                    k = this.createElement("clipPath").attr({
                        id: d
                    }).add(this.defs);
                a = this.rect(a, c, g, b, 0).add(k);
                a.id = d;
                a.clipPath = k;
                a.count = 0;
                return a
            };
            I.prototype.text = function (c, g, b, d) {
                var k = {};
                if (d && (this.allowHTML || !this.forExport)) return this.html(c, g, b);
                k.x = Math.round(g || 0);
                b && (k.y = Math.round(b));
                a(c) && (k.text = c);
                c = this.createElement("text").attr(k);
                if (!d || this.forExport && !this.allowHTML) c.xSetter = function (a, c, g) {
                    for (var b = g.getElementsByTagName("tspan"), d = g.getAttribute(c),
                            k = 0, m; k < b.length; k++) m = b[k], m.getAttribute(c) === d && m.setAttribute(c, a);
                    g.setAttribute(c, a)
                };
                return c
            };
            I.prototype.fontMetrics = function (a, c) {
                a = !this.styledMode && /px/.test(a) || !w.getComputedStyle ? a || c && c.style && c.style.fontSize || this.style && this.style.fontSize : c && v.prototype.getStyle.call(c, "font-size");
                a = /px/.test(a) ? M(a) : 12;
                c = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: c,
                    b: Math.round(.8 * c),
                    f: a
                }
            };
            I.prototype.rotCorr = function (a, c, g) {
                var b = a;
                c && g && (b = Math.max(b * Math.cos(c * h), 4));
                return {
                    x: -a / 3 * Math.sin(c * h),
                    y: b
                }
            };
            I.prototype.pathToSegments = function (a) {
                for (var c = [], g = [], b = {
                        A: 8,
                        C: 7,
                        H: 2,
                        L: 3,
                        M: 3,
                        Q: 5,
                        S: 5,
                        T: 3,
                        V: 2
                    }, d = 0; d < a.length; d++) L(g[0]) && A(a[d]) && g.length === b[g[0].toUpperCase()] && a.splice(d, 0, g[0].replace("M", "L").replace("m", "l")), "string" === typeof a[d] && (g.length && c.push(g.slice(0)), g.length = 0), g.push(a[d]);
                c.push(g.slice(0));
                return c
            };
            I.prototype.label = function (a, c, g, b, d, k, m, u, I) {
                return new E(this, a, c, g, b, d, k, m, u, I)
            };
            I.prototype.alignElements = function () {
                this.alignedObjects.forEach(function (a) {
                    return a.align()
                })
            };
            return I
        }();
        c(l.prototype, {
            Element: v,
            SVG_NS: n,
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            symbols: G,
            draw: r
        });
        C.registerRendererType("svg", l, !0);
        "";
        return l
    });
    K(l, "Core/Renderer/HTML/HTMLElement.js", [l["Core/Globals.js"], l["Core/Renderer/SVG/SVGElement.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var C = this && this.__extends || function () {
                var b = function (d, e) {
                    b = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (b, d) {
                        b.__proto__ = d
                    } || function (b, d) {
                        for (var n in d) d.hasOwnProperty(n) &&
                            (b[n] = d[n])
                    };
                    return b(d, e)
                };
                return function (d, e) {
                    function n() {
                        this.constructor = d
                    }
                    b(d, e);
                    d.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, new n)
                }
            }(),
            v = f.isFirefox,
            E = f.isMS,
            G = f.isWebKit,
            B = f.win,
            y = l.css,
            t = l.defined,
            h = l.extend,
            d = l.pick,
            b = l.pInt;
        return function (e) {
            function p() {
                return null !== e && e.apply(this, arguments) || this
            }
            C(p, e);
            p.compose = function (b) {
                if (-1 === p.composedClasses.indexOf(b)) {
                    p.composedClasses.push(b);
                    var d = p.prototype,
                        e = b.prototype;
                    e.getSpanCorrection = d.getSpanCorrection;
                    e.htmlCss =
                        d.htmlCss;
                    e.htmlGetBBox = d.htmlGetBBox;
                    e.htmlUpdateTransform = d.htmlUpdateTransform;
                    e.setSpanRotation = d.setSpanRotation
                }
                return b
            };
            p.prototype.getSpanCorrection = function (b, d, e) {
                this.xCorr = -b * e;
                this.yCorr = -d
            };
            p.prototype.htmlCss = function (b) {
                var n = "SPAN" === this.element.tagName && b && "width" in b,
                    e = d(n && b.width, void 0);
                if (n) {
                    delete b.width;
                    this.textWidth = e;
                    var p = !0
                }
                b && "ellipsis" === b.textOverflow && (b.whiteSpace = "nowrap", b.overflow = "hidden");
                this.styles = h(this.styles, b);
                y(this.element, b);
                p && this.htmlUpdateTransform();
                return this
            };
            p.prototype.htmlGetBBox = function () {
                var b = this.element;
                return {
                    x: b.offsetLeft,
                    y: b.offsetTop,
                    width: b.offsetWidth,
                    height: b.offsetHeight
                }
            };
            p.prototype.htmlUpdateTransform = function () {
                if (this.added) {
                    var d = this.renderer,
                        n = this.element,
                        e = this.translateX || 0,
                        p = this.translateY || 0,
                        h = this.x || 0,
                        f = this.y || 0,
                        m = this.textAlign || "left",
                        k = {
                            left: 0,
                            center: .5,
                            right: 1
                        } [m],
                        a = this.styles;
                    a = a && a.whiteSpace;
                    y(n, {
                        marginLeft: e,
                        marginTop: p
                    });
                    !d.styledMode && this.shadows && this.shadows.forEach(function (a) {
                        y(a, {
                            marginLeft: e +
                                1,
                            marginTop: p + 1
                        })
                    });
                    this.inverted && [].forEach.call(n.childNodes, function (a) {
                        d.invertChild(a, n)
                    });
                    if ("SPAN" === n.tagName) {
                        var g = this.rotation,
                            c = this.textWidth && b(this.textWidth),
                            D = [g, m, n.innerHTML, this.textWidth, this.textAlign].join(),
                            A = void 0;
                        A = !1;
                        if (c !== this.oldTextWidth) {
                            if (this.textPxLength) var u = this.textPxLength;
                            else y(n, {
                                width: "",
                                whiteSpace: a || "nowrap"
                            }), u = n.offsetWidth;
                            (c > this.oldTextWidth || u > c) && (/[ \-]/.test(n.textContent || n.innerText) || "ellipsis" === n.style.textOverflow) && (y(n, {
                                width: u > c ||
                                    g ? c + "px" : "auto",
                                display: "block",
                                whiteSpace: a || "normal"
                            }), this.oldTextWidth = c, A = !0)
                        }
                        this.hasBoxWidthChanged = A;
                        D !== this.cTT && (A = d.fontMetrics(n.style.fontSize, n).b, !t(g) || g === (this.oldRotation || 0) && m === this.oldAlign || this.setSpanRotation(g, k, A), this.getSpanCorrection(!t(g) && this.textPxLength || n.offsetWidth, A, k, g, m));
                        y(n, {
                            left: h + (this.xCorr || 0) + "px",
                            top: f + (this.yCorr || 0) + "px"
                        });
                        this.cTT = D;
                        this.oldRotation = g;
                        this.oldAlign = m
                    }
                } else this.alignOnAdd = !0
            };
            p.prototype.setSpanRotation = function (b, d, e) {
                var n = {},
                    p = E && !/Edge/.test(B.navigator.userAgent) ? "-ms-transform" : G ? "-webkit-transform" : v ? "MozTransform" : B.opera ? "-o-transform" : void 0;
                p && (n[p] = n.transform = "rotate(" + b + "deg)", n[p + (v ? "Origin" : "-origin")] = n.transformOrigin = 100 * d + "% " + e + "px", y(this.element, n))
            };
            p.composedClasses = [];
            return p
        }(e)
    });
    K(l, "Core/Renderer/HTML/HTMLRenderer.js", [l["Core/Renderer/HTML/AST.js"], l["Core/Renderer/SVG/SVGElement.js"], l["Core/Renderer/SVG/SVGRenderer.js"], l["Core/Utilities.js"]], function (f, e, l, C) {
        var v = this && this.__extends ||
            function () {
                var e = function (h, d) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (b, d) {
                        b.__proto__ = d
                    } || function (b, d) {
                        for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                    };
                    return e(h, d)
                };
                return function (h, d) {
                    function b() {
                        this.constructor = h
                    }
                    e(h, d);
                    h.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b)
                }
            }(),
            E = C.attr,
            G = C.createElement,
            B = C.extend,
            y = C.pick;
        return function (t) {
            function h() {
                return null !== t && t.apply(this, arguments) || this
            }
            v(h, t);
            h.compose = function (d) {
                -1 === h.composedClasses.indexOf(d) &&
                    (h.composedClasses.push(d), d.prototype.html = h.prototype.html);
                return d
            };
            h.prototype.html = function (d, b, p) {
                var h = this.createElement("span"),
                    r = h.element,
                    n = h.renderer,
                    t = n.isSVG,
                    w = function (b, d) {
                        ["opacity", "visibility"].forEach(function (m) {
                            b[m + "Setter"] = function (k, a, g) {
                                var c = b.div ? b.div.style : d;
                                e.prototype[m + "Setter"].call(this, k, a, g);
                                c && (c[a] = k)
                            }
                        });
                        b.addedSetters = !0
                    };
                h.textSetter = function (b) {
                    b !== this.textStr && (delete this.bBox, delete this.oldTextWidth, f.setElementHTML(this.element, y(b, "")), this.textStr =
                        b, h.doTransform = !0)
                };
                t && w(h, h.element.style);
                h.xSetter = h.ySetter = h.alignSetter = h.rotationSetter = function (b, d) {
                    "align" === d ? h.alignValue = h.textAlign = b : h[d] = b;
                    h.doTransform = !0
                };
                h.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                h.attr({
                    text: d,
                    x: Math.round(b),
                    y: Math.round(p)
                }).css({
                    position: "absolute"
                });
                n.styledMode || h.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                });
                r.style.whiteSpace = "nowrap";
                h.css = h.htmlCss;
                t && (h.add = function (b) {
                    var d =
                        n.box.parentNode,
                        m = [];
                    if (this.parentGroup = b) {
                        var k = b.div;
                        if (!k) {
                            for (; b;) m.push(b), b = b.parentGroup;
                            m.reverse().forEach(function (a) {
                                function g(c, g) {
                                    a[g] = c;
                                    "translateX" === g ? e.left = c + "px" : e.top = c + "px";
                                    a.doTransform = !0
                                }
                                var c = E(a.element, "class"),
                                    b = a.styles || {};
                                k = a.div = a.div || G("div", c ? {
                                    className: c
                                } : void 0, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    cursor: b.cursor,
                                    pointerEvents: b.pointerEvents,
                                    visibility: a.visibility
                                }, k || d);
                                var e = k.style;
                                B(a, {
                                    classSetter: function (a) {
                                        return function (c) {
                                            this.element.setAttribute("class", c);
                                            a.className = c
                                        }
                                    }(k),
                                    on: function () {
                                        m[0].div && h.on.apply({
                                            element: m[0].div,
                                            onEvents: a.onEvents
                                        }, arguments);
                                        return a
                                    },
                                    translateXSetter: g,
                                    translateYSetter: g
                                });
                                a.addedSetters || w(a)
                            })
                        }
                    } else k = d;
                    k.appendChild(r);
                    h.added = !0;
                    h.alignOnAdd && h.htmlUpdateTransform();
                    return h
                });
                return h
            };
            h.composedClasses = [];
            return h
        }(l)
    });
    K(l, "Core/Axis/AxisDefaults.js", [], function () {
        var f;
        (function (e) {
            e.defaultXAxisOptions = {
                alignTicks: !0,
                allowDecimals: void 0,
                panningEnabled: !0,
                zIndex: 2,
                zoomEnabled: !0,
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                gridLineDashStyle: "Solid",
                gridZIndex: 1,
                labels: {
                    autoRotation: void 0,
                    autoRotationLimit: 80,
                    distance: void 0,
                    enabled: !0,
                    indentation: 10,
                    overflow: "justify",
                    padding: 5,
                    reserveSpace: void 0,
                    rotation: void 0,
                    staggerLines: 0,
                    step: 0,
                    useHTML: !1,
                    x: 0,
                    zIndex: 7,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorGridLineDashStyle: "Solid",
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                offset: void 0,
                opposite: !1,
                reversed: void 0,
                reversedStacks: !1,
                showEmpty: !0,
                showFirstLabel: !0,
                showLastLabel: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    rotation: 0,
                    useHTML: !1,
                    x: 0,
                    y: 0,
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                uniqueNames: !0,
                visible: !0,
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                gridLineWidth: void 0,
                tickColor: "#ccd6eb"
            };
            e.defaultYAxisOptions = {
                reversedStacks: !0,
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    animation: {},
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function () {
                        var e = this.axis.chart.numberFormatter;
                        return e(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            };
            e.defaultLeftAxisOptions = {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            };
            e.defaultRightAxisOptions = {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            };
            e.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            };
            e.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            }
        })(f || (f = {}));
        return f
    });
    K(l, "Core/Foundation.js", [l["Core/Utilities.js"]],
        function (f) {
            var e = f.addEvent,
                l = f.isFunction,
                C = f.objectEach,
                v = f.removeEvent,
                E;
            (function (f) {
                f.registerEventOptions = function (f, y) {
                    f.eventOptions = f.eventOptions || {};
                    C(y.events, function (t, h) {
                        f.eventOptions[h] !== t && (f.eventOptions[h] && (v(f, h, f.eventOptions[h]), delete f.eventOptions[h]), l(t) && (f.eventOptions[h] = t, e(f, h, t)))
                    })
                }
            })(E || (E = {}));
            return E
        });
    K(l, "Core/Axis/Tick.js", [l["Core/FormatUtilities.js"], l["Core/Globals.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var C = e.deg2rad,
            v = l.clamp,
            E = l.correctFloat,
            G = l.defined,
            B = l.destroyObjectProperties,
            y = l.extend,
            t = l.fireEvent,
            h = l.isNumber,
            d = l.merge,
            b = l.objectEach,
            p = l.pick;
        e = function () {
            function e(b, d, e, p, h) {
                this.isNewLabel = this.isNew = !0;
                this.axis = b;
                this.pos = d;
                this.type = e || "";
                this.parameters = h || {};
                this.tickmarkOffset = this.parameters.tickmarkOffset;
                this.options = this.parameters.options;
                t(this, "init");
                e || p || this.addLabel()
            }
            e.prototype.addLabel = function () {
                var b = this,
                    d = b.axis,
                    e = d.options,
                    q = d.chart,
                    z = d.categories,
                    x = d.logarithmic,
                    m = d.names,
                    k = b.pos,
                    a = p(b.options &&
                        b.options.labels, e.labels),
                    g = d.tickPositions,
                    c = k === g[0],
                    D = k === g[g.length - 1],
                    A = (!a.step || 1 === a.step) && 1 === d.tickInterval;
                g = g.info;
                var u = b.label,
                    l;
                z = this.parameters.category || (z ? p(z[k], m[k], k) : k);
                x && h(z) && (z = E(x.lin2log(z)));
                if (d.dateTime)
                    if (g) {
                        var S = q.time.resolveDTLFormat(e.dateTimeLabelFormats[!e.grid && g.higherRanks[k] || g.unitName]);
                        var R = S.main
                    } else h(z) && (R = d.dateTime.getXDateFormat(z, e.dateTimeLabelFormats || {}));
                b.isFirst = c;
                b.isLast = D;
                var M = {
                    axis: d,
                    chart: q,
                    dateTimeLabelFormat: R,
                    isFirst: c,
                    isLast: D,
                    pos: k,
                    tick: b,
                    tickPositionInfo: g,
                    value: z
                };
                t(this, "labelFormat", M);
                var B = function (c) {
                    return a.formatter ? a.formatter.call(c, c) : a.format ? (c.text = d.defaultLabelFormatter.call(c), f.format(a.format, c, q)) : d.defaultLabelFormatter.call(c, c)
                };
                e = B.call(M, M);
                var aa = S && S.list;
                b.shortenLabel = aa ? function () {
                    for (l = 0; l < aa.length; l++)
                        if (y(M, {
                                dateTimeLabelFormat: aa[l]
                            }), u.attr({
                                text: B.call(M, M)
                            }), u.getBBox().width < d.getSlotWidth(b) - 2 * a.padding) return;
                    u.attr({
                        text: ""
                    })
                } : void 0;
                A && d._addedPlotLB && b.moveLabel(e, a);
                G(u) ||
                    b.movedLabel ? u && u.textStr !== e && !A && (!u.textWidth || a.style.width || u.styles.width || u.css({
                        width: null
                    }), u.attr({
                        text: e
                    }), u.textPxLength = u.getBBox().width) : (b.label = u = b.createLabel({
                        x: 0,
                        y: 0
                    }, e, a), b.rotation = 0)
            };
            e.prototype.createLabel = function (b, e, p) {
                var n = this.axis,
                    h = n.chart;
                if (b = G(e) && p.enabled ? h.renderer.text(e, b.x, b.y, p.useHTML).add(n.labelGroup) : null) h.styledMode || b.css(d(p.style)), b.textPxLength = b.getBBox().width;
                return b
            };
            e.prototype.destroy = function () {
                B(this, this.axis)
            };
            e.prototype.getPosition =
                function (b, d, e, p) {
                    var n = this.axis,
                        h = n.chart,
                        m = p && h.oldChartHeight || h.chartHeight;
                    b = {
                        x: b ? E(n.translate(d + e, void 0, void 0, p) + n.transB) : n.left + n.offset + (n.opposite ? (p && h.oldChartWidth || h.chartWidth) - n.right - n.left : 0),
                        y: b ? m - n.bottom + n.offset - (n.opposite ? n.height : 0) : E(m - n.translate(d + e, void 0, void 0, p) - n.transB)
                    };
                    b.y = v(b.y, -1E5, 1E5);
                    t(this, "afterGetPosition", {
                        pos: b
                    });
                    return b
                };
            e.prototype.getLabelPosition = function (b, d, e, p, h, f, m, k) {
                var a = this.axis,
                    g = a.transA,
                    c = a.isLinked && a.linkedParent ? a.linkedParent.reversed :
                    a.reversed,
                    n = a.staggerLines,
                    A = a.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    u = p || a.reserveSpaceDefault ? 0 : -a.labelOffset * ("center" === a.labelAlign ? .5 : 1),
                    r = {};
                e = 0 === a.side ? e.rotation ? -8 : -e.getBBox().height : 2 === a.side ? A.y + 8 : Math.cos(e.rotation * C) * (A.y - e.getBBox(!1, 0).height / 2);
                G(h.y) && (e = 0 === a.side && a.horiz ? h.y + e : h.y);
                b = b + h.x + u + A.x - (f && p ? f * g * (c ? -1 : 1) : 0);
                d = d + e - (f && !p ? f * g * (c ? 1 : -1) : 0);
                n && (p = m / (k || 1) % n, a.opposite && (p = n - p - 1), d += a.labelOffset / n * p);
                r.x = b;
                r.y = Math.round(d);
                t(this, "afterGetLabelPosition", {
                    pos: r,
                    tickmarkOffset: f,
                    index: m
                });
                return r
            };
            e.prototype.getLabelSize = function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            };
            e.prototype.getMarkPath = function (b, d, e, p, h, f) {
                return f.crispLine([
                    ["M", b, d],
                    ["L", b + (h ? 0 : -e), d + (h ? e : 0)]
                ], p)
            };
            e.prototype.handleOverflow = function (b) {
                var d = this.axis,
                    e = d.options.labels,
                    h = b.x,
                    f = d.chart.chartWidth,
                    r = d.chart.spacing,
                    m = p(d.labelLeft, Math.min(d.pos, r[3]));
                r = p(d.labelRight, Math.max(d.isRadial ? 0 : d.pos + d.len, f - r[1]));
                var k = this.label,
                    a = this.rotation,
                    g = {
                        left: 0,
                        center: .5,
                        right: 1
                    } [d.labelAlign ||
                        k.attr("align")
                    ],
                    c = k.getBBox().width,
                    D = d.getSlotWidth(this),
                    A = {},
                    u = D,
                    q = 1,
                    l;
                if (a || "justify" !== e.overflow) 0 > a && h - g * c < m ? l = Math.round(h / Math.cos(a * C) - m) : 0 < a && h + g * c > r && (l = Math.round((f - h) / Math.cos(a * C)));
                else if (f = h + (1 - g) * c, h - g * c < m ? u = b.x + u * (1 - g) - m : f > r && (u = r - b.x + u * g, q = -1), u = Math.min(D, u), u < D && "center" === d.labelAlign && (b.x += q * (D - u - g * (D - Math.min(c, u)))), c > u || d.autoRotation && (k.styles || {}).width) l = u;
                l && (this.shortenLabel ? this.shortenLabel() : (A.width = Math.floor(l) + "px", (e.style || {}).textOverflow || (A.textOverflow =
                    "ellipsis"), k.css(A)))
            };
            e.prototype.moveLabel = function (d, e) {
                var h = this,
                    p = h.label,
                    n = h.axis,
                    f = n.reversed,
                    m = !1;
                p && p.textStr === d ? (h.movedLabel = p, m = !0, delete h.label) : b(n.ticks, function (a) {
                    m || a.isNew || a === h || !a.label || a.label.textStr !== d || (h.movedLabel = a.label, m = !0, a.labelPos = h.movedLabel.xy, delete a.label)
                });
                if (!m && (h.labelPos || p)) {
                    var k = h.labelPos || p.xy;
                    p = n.horiz ? f ? 0 : n.width + n.left : k.x;
                    n = n.horiz ? k.y : f ? n.width + n.left : 0;
                    h.movedLabel = h.createLabel({
                        x: p,
                        y: n
                    }, d, e);
                    h.movedLabel && h.movedLabel.attr({
                        opacity: 0
                    })
                }
            };
            e.prototype.render = function (b, d, e) {
                var h = this.axis,
                    n = h.horiz,
                    f = this.pos,
                    m = p(this.tickmarkOffset, h.tickmarkOffset);
                f = this.getPosition(n, f, m, d);
                m = f.x;
                var k = f.y;
                h = n && m === h.pos + h.len || !n && k === h.pos ? -1 : 1;
                n = p(e, this.label && this.label.newOpacity, 1);
                e = p(e, 1);
                this.isActive = !0;
                this.renderGridLine(d, e, h);
                this.renderMark(f, e, h);
                this.renderLabel(f, d, n, b);
                this.isNew = !1;
                t(this, "afterRender")
            };
            e.prototype.renderGridLine = function (b, d, e) {
                var h = this.axis,
                    n = h.options,
                    f = {},
                    m = this.pos,
                    k = this.type,
                    a = p(this.tickmarkOffset,
                        h.tickmarkOffset),
                    g = h.chart.renderer,
                    c = this.gridLine,
                    D = n.gridLineWidth,
                    A = n.gridLineColor,
                    u = n.gridLineDashStyle;
                "minor" === this.type && (D = n.minorGridLineWidth, A = n.minorGridLineColor, u = n.minorGridLineDashStyle);
                c || (h.chart.styledMode || (f.stroke = A, f["stroke-width"] = D || 0, f.dashstyle = u), k || (f.zIndex = 1), b && (d = 0), this.gridLine = c = g.path().attr(f).addClass("highcharts-" + (k ? k + "-" : "") + "grid-line").add(h.gridGroup));
                if (c && (e = h.getPlotLinePath({
                        value: m + a,
                        lineWidth: c.strokeWidth() * e,
                        force: "pass",
                        old: b
                    }))) c[b || this.isNew ?
                    "attr" : "animate"]({
                    d: e,
                    opacity: d
                })
            };
            e.prototype.renderMark = function (b, d, e) {
                var h = this.axis,
                    n = h.options,
                    f = h.chart.renderer,
                    m = this.type,
                    k = h.tickSize(m ? m + "Tick" : "tick"),
                    a = b.x;
                b = b.y;
                var g = p(n["minor" !== m ? "tickWidth" : "minorTickWidth"], !m && h.isXAxis ? 1 : 0);
                n = n["minor" !== m ? "tickColor" : "minorTickColor"];
                var c = this.mark,
                    D = !c;
                k && (h.opposite && (k[0] = -k[0]), c || (this.mark = c = f.path().addClass("highcharts-" + (m ? m + "-" : "") + "tick").add(h.axisGroup), h.chart.styledMode || c.attr({
                    stroke: n,
                    "stroke-width": g
                })), c[D ? "attr" : "animate"]({
                    d: this.getMarkPath(a,
                        b, k[0], c.strokeWidth() * e, h.horiz, f),
                    opacity: d
                }))
            };
            e.prototype.renderLabel = function (b, d, e, f) {
                var n = this.axis,
                    r = n.horiz,
                    m = n.options,
                    k = this.label,
                    a = m.labels,
                    g = a.step;
                n = p(this.tickmarkOffset, n.tickmarkOffset);
                var c = b.x;
                b = b.y;
                var D = !0;
                k && h(c) && (k.xy = b = this.getLabelPosition(c, b, k, r, a, n, f, g), this.isFirst && !this.isLast && !m.showFirstLabel || this.isLast && !this.isFirst && !m.showLastLabel ? D = !1 : !r || a.step || a.rotation || d || 0 === e || this.handleOverflow(b), g && f % g && (D = !1), D && h(b.y) ? (b.opacity = e, k[this.isNewLabel ? "attr" :
                    "animate"](b).show(!0), this.isNewLabel = !1) : (k.hide(), this.isNewLabel = !0))
            };
            e.prototype.replaceMovedLabel = function () {
                var b = this.label,
                    d = this.axis,
                    e = d.reversed;
                if (b && !this.isNew) {
                    var h = d.horiz ? e ? d.left : d.width + d.left : b.xy.x;
                    e = d.horiz ? b.xy.y : e ? d.width + d.top : d.top;
                    b.animate({
                        x: h,
                        y: e,
                        opacity: 0
                    }, void 0, b.destroy);
                    delete this.label
                }
                d.isDirty = !0;
                this.label = this.movedLabel;
                delete this.movedLabel
            };
            return e
        }();
        "";
        return e
    });
    K(l, "Core/Axis/Axis.js", [l["Core/Animation/AnimationUtilities.js"], l["Core/Axis/AxisDefaults.js"],
        l["Core/Color/Color.js"], l["Core/DefaultOptions.js"], l["Core/Foundation.js"], l["Core/Globals.js"], l["Core/Axis/Tick.js"], l["Core/Utilities.js"]
    ], function (f, e, l, C, v, E, G, B) {
        var y = f.animObject,
            t = C.defaultOptions,
            h = v.registerEventOptions,
            d = E.deg2rad,
            b = B.arrayMax,
            p = B.arrayMin,
            q = B.clamp,
            r = B.correctFloat,
            n = B.defined,
            J = B.destroyObjectProperties,
            w = B.erase,
            z = B.error,
            x = B.extend,
            m = B.fireEvent,
            k = B.isArray,
            a = B.isNumber,
            g = B.isString,
            c = B.merge,
            D = B.normalizeTickInterval,
            A = B.objectEach,
            u = B.pick,
            L = B.relativeLength,
            S = B.removeEvent,
            R = B.splat,
            M = B.syncTimeout,
            U = function (a, c) {
                return D(c, void 0, void 0, u(a.options.allowDecimals, .5 > c || void 0 !== a.tickAmount), !!a.tickAmount)
            };
        f = function () {
            function f(a, c) {
                this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange =
                    this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.bottom = this.alternateBands = void 0;
                this.init(a, c)
            }
            f.prototype.init = function (c, b) {
                var g = b.isX;
                this.chart =
                    c;
                this.horiz = c.inverted && !this.isZAxis ? !g : g;
                this.isXAxis = g;
                this.coll = this.coll || (g ? "xAxis" : "yAxis");
                m(this, "init", {
                    userOptions: b
                });
                this.opposite = u(b.opposite, this.opposite);
                this.side = u(b.side, this.side, this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(b);
                var d = this.options,
                    k = d.labels,
                    e = d.type;
                this.userOptions = b;
                this.minPixelPadding = 0;
                this.reversed = u(d.reversed, this.reversed);
                this.visible = d.visible;
                this.zoomEnabled = d.zoomEnabled;
                this.hasNames = "category" === e || !0 === d.categories;
                this.categories =
                    d.categories || (this.hasNames ? [] : void 0);
                this.names || (this.names = [], this.names.keys = {});
                this.plotLinesAndBandsGroups = {};
                this.positiveValuesOnly = !!this.logarithmic;
                this.isLinked = n(d.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = d.minRange || d.maxZoom;
                this.range = d.range;
                this.offset = d.offset || 0;
                this.min = this.max = null;
                b = u(d.crosshair, R(c.options.tooltip.crosshairs)[g ? 0 : 1]);
                this.crosshair = !0 === b ? {} :
                    b; - 1 === c.axes.indexOf(this) && (g ? c.axes.splice(c.xAxis.length, 0, this) : c.axes.push(this), c[this.coll].push(this));
                this.series = this.series || [];
                c.inverted && !this.isZAxis && g && "undefined" === typeof this.reversed && (this.reversed = !0);
                this.labelRotation = a(k.rotation) ? k.rotation : void 0;
                h(this, d);
                m(this, "afterInit")
            };
            f.prototype.setOptions = function (a) {
                this.options = c(e.defaultXAxisOptions, "yAxis" === this.coll && e.defaultYAxisOptions, [e.defaultTopAxisOptions, e.defaultRightAxisOptions, e.defaultBottomAxisOptions, e.defaultLeftAxisOptions][this.side],
                    c(t[this.coll], a));
                m(this, "afterSetOptions", {
                    userOptions: a
                })
            };
            f.prototype.defaultLabelFormatter = function (c) {
                var b = this.axis;
                c = this.chart.numberFormatter;
                var g = a(this.value) ? this.value : NaN,
                    d = b.chart.time,
                    k = this.dateTimeLabelFormat,
                    e = t.lang,
                    m = e.numericSymbols;
                e = e.numericSymbolMagnitude || 1E3;
                var u = b.logarithmic ? Math.abs(g) : b.tickInterval,
                    h = m && m.length;
                if (b.categories) var f = "".concat(this.value);
                else if (k) f = d.dateFormat(k, g);
                else if (h && 1E3 <= u)
                    for (; h-- && "undefined" === typeof f;) b = Math.pow(e, h + 1), u >= b &&
                        0 === 10 * g % b && null !== m[h] && 0 !== g && (f = c(g / b, -1) + m[h]);
                "undefined" === typeof f && (f = 1E4 <= Math.abs(g) ? c(g, -1) : c(g, -1, void 0, ""));
                return f
            };
            f.prototype.getSeriesExtremes = function () {
                var c = this,
                    b = c.chart,
                    g;
                m(this, "getSeriesExtremes", null, function () {
                    c.hasVisibleSeries = !1;
                    c.dataMin = c.dataMax = c.threshold = null;
                    c.softThreshold = !c.isXAxis;
                    c.stacking && c.stacking.buildStacks();
                    c.series.forEach(function (d) {
                        if (d.visible || !b.options.chart.ignoreHiddenSeries) {
                            var k = d.options,
                                e = k.threshold;
                            c.hasVisibleSeries = !0;
                            c.positiveValuesOnly &&
                                0 >= e && (e = null);
                            if (c.isXAxis) {
                                if (k = d.xData, k.length) {
                                    k = c.logarithmic ? k.filter(c.validatePositiveValue) : k;
                                    g = d.getXExtremes(k);
                                    var m = g.min;
                                    var h = g.max;
                                    a(m) || m instanceof Date || (k = k.filter(a), g = d.getXExtremes(k), m = g.min, h = g.max);
                                    k.length && (c.dataMin = Math.min(u(c.dataMin, m), m), c.dataMax = Math.max(u(c.dataMax, h), h))
                                }
                            } else if (d = d.applyExtremes(), a(d.dataMin) && (m = d.dataMin, c.dataMin = Math.min(u(c.dataMin, m), m)), a(d.dataMax) && (h = d.dataMax, c.dataMax = Math.max(u(c.dataMax, h), h)), n(e) && (c.threshold = e), !k.softThreshold ||
                                c.positiveValuesOnly) c.softThreshold = !1
                        }
                    })
                });
                m(this, "afterGetSeriesExtremes")
            };
            f.prototype.translate = function (c, b, g, d, k, e) {
                var m = this.linkedParent || this,
                    u = d && m.old ? m.old.min : m.min;
                if (!a(u)) return NaN;
                var h = m.minPixelPadding;
                k = (m.isOrdinal || m.brokenAxis && m.brokenAxis.hasBreaks || m.logarithmic && k) && m.lin2val;
                var f = 1,
                    p = 0;
                d = d && m.old ? m.old.transA : m.transA;
                d || (d = m.transA);
                g && (f *= -1, p = m.len);
                m.reversed && (f *= -1, p -= f * (m.sector || m.len));
                b ? (e = (c * f + p - h) / d + u, k && (e = m.lin2val(e))) : (k && (c = m.val2lin(c)), c = f * (c - u) *
                    d, e = (m.isRadial ? c : r(c)) + p + f * h + (a(e) ? d * e : 0));
                return e
            };
            f.prototype.toPixels = function (a, c) {
                return this.translate(a, !1, !this.horiz, void 0, !0) + (c ? 0 : this.pos)
            };
            f.prototype.toValue = function (a, c) {
                return this.translate(a - (c ? 0 : this.pos), !0, !this.horiz, void 0, !0)
            };
            f.prototype.getPlotLinePath = function (c) {
                function b(a, c, g) {
                    if ("pass" !== r && a < c || a > g) r ? a = q(a, c, g) : L = !0;
                    return a
                }
                var g = this,
                    d = g.chart,
                    k = g.left,
                    e = g.top,
                    h = c.old,
                    f = c.value,
                    p = c.lineWidth,
                    n = h && d.oldChartHeight || d.chartHeight,
                    I = h && d.oldChartWidth || d.chartWidth,
                    D = g.transB,
                    A = c.translatedValue,
                    r = c.force,
                    l, t, x, z, L;
                c = {
                    value: f,
                    lineWidth: p,
                    old: h,
                    force: r,
                    acrossPanes: c.acrossPanes,
                    translatedValue: A
                };
                m(this, "getPlotLinePath", c, function (c) {
                    A = u(A, g.translate(f, void 0, void 0, h));
                    A = q(A, -1E5, 1E5);
                    l = x = Math.round(A + D);
                    t = z = Math.round(n - A - D);
                    a(A) ? g.horiz ? (t = e, z = n - g.bottom, l = x = b(l, k, k + g.width)) : (l = k, x = I - g.right, t = z = b(t, e, e + g.height)) : (L = !0, r = !1);
                    c.path = L && !r ? null : d.renderer.crispLine([
                        ["M", l, t],
                        ["L", x, z]
                    ], p || 1)
                });
                return c.path
            };
            f.prototype.getLinearTickPositions = function (a,
                c, g) {
                var b = r(Math.floor(c / a) * a);
                g = r(Math.ceil(g / a) * a);
                var d = [],
                    k;
                r(b + a) === b && (k = 20);
                if (this.single) return [c];
                for (c = b; c <= g;) {
                    d.push(c);
                    c = r(c + a, k);
                    if (c === m) break;
                    var m = c
                }
                return d
            };
            f.prototype.getMinorTickInterval = function () {
                var a = this.options;
                return !0 === a.minorTicks ? u(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            };
            f.prototype.getMinorTickPositions = function () {
                var a = this.options,
                    c = this.tickPositions,
                    g = this.minorTickInterval,
                    b = this.pointRangePadding || 0,
                    d = this.min - b;
                b = this.max +
                    b;
                var k = b - d,
                    m = [];
                if (k && k / g < this.len / 3) {
                    var e = this.logarithmic;
                    if (e) this.paddedTicks.forEach(function (a, c, b) {
                        c && m.push.apply(m, e.getLogTickPositions(g, b[c - 1], b[c], !0))
                    });
                    else if (this.dateTime && "auto" === this.getMinorTickInterval()) m = m.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(g), d, b, a.startOfWeek));
                    else
                        for (a = d + (c[0] - d) % g; a <= b && a !== m[0]; a += g) m.push(a)
                }
                0 !== m.length && this.trimTicks(m);
                return m
            };
            f.prototype.adjustForMinRange = function () {
                var a = this.options,
                    c = this.logarithmic,
                    g = this.min,
                    d = this.max,
                    k = 0,
                    m, e, h, f;
                this.isXAxis && "undefined" === typeof this.minRange && !c && (n(a.min) || n(a.max) || n(a.floor) || n(a.ceiling) ? this.minRange = null : (this.series.forEach(function (a) {
                    h = a.xData;
                    f = a.xIncrement ? 1 : h.length - 1;
                    if (1 < h.length)
                        for (m = f; 0 < m; m--)
                            if (e = h[m] - h[m - 1], !k || e < k) k = e
                }), this.minRange = Math.min(5 * k, this.dataMax - this.dataMin)));
                if (d - g < this.minRange) {
                    var A = this.dataMax - this.dataMin >= this.minRange;
                    var D = this.minRange;
                    var r = (D - d + g) / 2;
                    r = [g - r, u(a.min, g - r)];
                    A && (r[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) :
                        this.dataMin);
                    g = b(r);
                    d = [g + D, u(a.max, g + D)];
                    A && (d[2] = c ? c.log2lin(this.dataMax) : this.dataMax);
                    d = p(d);
                    d - g < D && (r[0] = d - D, r[1] = u(a.min, d - D), g = b(r))
                }
                this.min = g;
                this.max = d
            };
            f.prototype.getClosest = function () {
                var a;
                this.categories ? a = 1 : this.series.forEach(function (c) {
                    var g = c.closestPointRange,
                        b = c.visible || !c.chart.options.chart.ignoreHiddenSeries;
                    !c.noSharedTooltip && n(g) && b && (a = n(a) ? Math.min(a, g) : g)
                });
                return a
            };
            f.prototype.nameToX = function (a) {
                var c = k(this.options.categories),
                    g = c ? this.categories : this.names,
                    b =
                    a.options.x;
                a.series.requireSorting = !1;
                n(b) || (b = this.options.uniqueNames && g ? c ? g.indexOf(a.name) : u(g.keys[a.name], -1) : a.series.autoIncrement());
                if (-1 === b) {
                    if (!c && g) var d = g.length
                } else d = b;
                "undefined" !== typeof d && (this.names[d] = a.name, this.names.keys[a.name] = d);
                return d
            };
            f.prototype.updateNames = function () {
                var a = this,
                    c = this.names;
                0 < c.length && (Object.keys(c.keys).forEach(function (a) {
                    delete c.keys[a]
                }), c.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (c) {
                    c.xIncrement = null;
                    if (!c.points ||
                        c.isDirtyData) a.max = Math.max(a.max, c.xData.length - 1), c.processData(), c.generatePoints();
                    c.data.forEach(function (g, b) {
                        if (g && g.options && "undefined" !== typeof g.name) {
                            var d = a.nameToX(g);
                            "undefined" !== typeof d && d !== g.x && (g.x = d, c.xData[b] = d)
                        }
                    })
                }))
            };
            f.prototype.setAxisTranslation = function () {
                var a = this,
                    c = a.max - a.min,
                    b = a.linkedParent,
                    d = !!a.categories,
                    k = a.isXAxis,
                    e = a.axisPointRange || 0,
                    h = 0,
                    f = 0,
                    p = a.transA;
                if (k || d || e) {
                    var n = a.getClosest();
                    b ? (h = b.minPointOffset, f = b.pointRangePadding) : a.series.forEach(function (c) {
                        var b =
                            d ? 1 : k ? u(c.options.pointRange, n, 0) : a.axisPointRange || 0,
                            m = c.options.pointPlacement;
                        e = Math.max(e, b);
                        if (!a.single || d) c = c.is("xrange") ? !k : k, h = Math.max(h, c && g(m) ? 0 : b / 2), f = Math.max(f, c && "on" === m ? 0 : b)
                    });
                    b = a.ordinal && a.ordinal.slope && n ? a.ordinal.slope / n : 1;
                    a.minPointOffset = h *= b;
                    a.pointRangePadding = f *= b;
                    a.pointRange = Math.min(e, a.single && d ? 1 : c);
                    k && (a.closestPointRange = n)
                }
                a.translationSlope = a.transA = p = a.staticScale || a.len / (c + f || 1);
                a.transB = a.horiz ? a.left : a.bottom;
                a.minPixelPadding = p * h;
                m(this, "afterSetAxisTranslation")
            };
            f.prototype.minFromRange = function () {
                return this.max - this.range
            };
            f.prototype.setTickInterval = function (c) {
                var g = this.chart,
                    b = this.logarithmic,
                    d = this.options,
                    k = this.isXAxis,
                    e = this.isLinked,
                    h = d.tickPixelInterval,
                    f = this.categories,
                    p = this.softThreshold,
                    A = d.maxPadding,
                    D = d.minPadding,
                    I = a(d.tickInterval) && 0 <= d.tickInterval ? d.tickInterval : void 0,
                    q = a(this.threshold) ? this.threshold : null;
                this.dateTime || f || e || this.getTickAmount();
                var l = u(this.userMin, d.min);
                var t = u(this.userMax, d.max);
                if (e) {
                    this.linkedParent = g[this.coll][d.linkedTo];
                    var x = this.linkedParent.getExtremes();
                    this.min = u(x.min, x.dataMin);
                    this.max = u(x.max, x.dataMax);
                    d.type !== this.linkedParent.options.type && z(11, 1, g)
                } else {
                    if (p && n(q))
                        if (this.dataMin >= q) x = q, D = 0;
                        else if (this.dataMax <= q) {
                        var L = q;
                        A = 0
                    }
                    this.min = u(l, x, this.dataMin);
                    this.max = u(t, L, this.dataMax)
                }
                b && (this.positiveValuesOnly && !c && 0 >= Math.min(this.min, u(this.dataMin, this.min)) && z(10, 1, g), this.min = r(b.log2lin(this.min), 16), this.max = r(b.log2lin(this.max), 16));
                this.range && n(this.max) && (this.userMin = this.min = l = Math.max(this.dataMin,
                    this.minFromRange()), this.userMax = t = this.max, this.range = null);
                m(this, "foundExtremes");
                this.beforePadding && this.beforePadding();
                this.adjustForMinRange();
                !(f || this.axisPointRange || this.stacking && this.stacking.usePercentage || e) && n(this.min) && n(this.max) && (g = this.max - this.min) && (!n(l) && D && (this.min -= g * D), !n(t) && A && (this.max += g * A));
                a(this.userMin) || (a(d.softMin) && d.softMin < this.min && (this.min = l = d.softMin), a(d.floor) && (this.min = Math.max(this.min, d.floor)));
                a(this.userMax) || (a(d.softMax) && d.softMax > this.max &&
                    (this.max = t = d.softMax), a(d.ceiling) && (this.max = Math.min(this.max, d.ceiling)));
                p && n(this.dataMin) && (q = q || 0, !n(l) && this.min < q && this.dataMin >= q ? this.min = this.options.minRange ? Math.min(q, this.max - this.minRange) : q : !n(t) && this.max > q && this.dataMax <= q && (this.max = this.options.minRange ? Math.max(q, this.min + this.minRange) : q));
                a(this.min) && a(this.max) && !this.chart.polar && this.min > this.max && (n(this.options.min) ? this.max = this.min : n(this.options.max) && (this.min = this.max));
                this.tickInterval = this.min === this.max || "undefined" ===
                    typeof this.min || "undefined" === typeof this.max ? 1 : e && this.linkedParent && !I && h === this.linkedParent.options.tickPixelInterval ? I = this.linkedParent.tickInterval : u(I, this.tickAmount ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1) : void 0, f ? 1 : (this.max - this.min) * h / Math.max(this.len, h));
                if (k && !c) {
                    var w = this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max);
                    this.series.forEach(function (a) {
                        a.forceCrop = a.forceCropping && a.forceCropping();
                        a.processData(w)
                    });
                    m(this, "postProcessData", {
                        hasExtemesChanged: w
                    })
                }
                this.setAxisTranslation();
                m(this, "initialAxisTranslation");
                this.pointRange && !I && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
                c = u(d.minTickInterval, this.dateTime && !this.series.some(function (a) {
                    return a.noSharedTooltip
                }) ? this.closestPointRange : 0);
                !I && this.tickInterval < c && (this.tickInterval = c);
                this.dateTime || this.logarithmic || I || (this.tickInterval = U(this, this.tickInterval));
                this.tickAmount || (this.tickInterval = this.unsquish());
                this.setTickPositions()
            };
            f.prototype.setTickPositions = function () {
                var a = this.options,
                    c = a.tickPositions,
                    g = this.getMinorTickInterval(),
                    b = this.hasVerticalPanning(),
                    d = "colorAxis" === this.coll,
                    k = (d || !b) && a.startOnTick;
                b = (d || !b) && a.endOnTick;
                d = a.tickPositioner;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === g && this.tickInterval ? this.tickInterval / 5 : g;
                this.single = this.min === this.max && n(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = g = c && c.slice();
                if (!g) {
                    if (this.ordinal &&
                        this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)))
                        if (this.dateTime) g = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, !0);
                        else if (this.logarithmic) g = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
                    else
                        for (var e = a = this.tickInterval; e <= 2 * a;)
                            if (g = this.getLinearTickPositions(this.tickInterval, this.min, this.max),
                                this.tickAmount && g.length > this.tickAmount) this.tickInterval = U(this, e *= 1.1);
                            else break;
                    else g = [this.min, this.max], z(19, !1, this.chart);
                    g.length > this.len && (g = [g[0], g.pop()], g[0] === g[1] && (g.length = 1));
                    this.tickPositions = g;
                    d && (d = d.apply(this, [this.min, this.max])) && (this.tickPositions = g = d)
                }
                this.paddedTicks = g.slice(0);
                this.trimTicks(g, k, b);
                this.isLinked || (this.single && 2 > g.length && !this.categories && !this.series.some(function (a) {
                    return a.is("heatmap") && "between" === a.options.pointPlacement
                }) && (this.min -= .5,
                    this.max += .5), c || d || this.adjustTickAmount());
                m(this, "afterSetTickPositions")
            };
            f.prototype.trimTicks = function (a, c, g) {
                var b = a[0],
                    d = a[a.length - 1],
                    k = !this.isOrdinal && this.minPointOffset || 0;
                m(this, "trimTicks");
                if (!this.isLinked) {
                    if (c && -Infinity !== b) this.min = b;
                    else
                        for (; this.min - k > a[0];) a.shift();
                    if (g) this.max = d;
                    else
                        for (; this.max + k < a[a.length - 1];) a.pop();
                    0 === a.length && n(b) && !this.options.tickPositions && a.push((d + b) / 2)
                }
            };
            f.prototype.alignToOthers = function () {
                var c = this,
                    g = [this],
                    b = c.options,
                    d = "yAxis" === this.coll &&
                    this.chart.options.chart.alignThresholds,
                    k = [],
                    m;
                c.thresholdAlignment = void 0;
                if ((!1 !== this.chart.options.chart.alignTicks && b.alignTicks || d) && !1 !== b.startOnTick && !1 !== b.endOnTick && !c.logarithmic) {
                    var e = function (a) {
                            var c = a.options;
                            return [a.horiz ? c.left : c.top, c.width, c.height, c.pane].join()
                        },
                        h = e(this);
                    this.chart[this.coll].forEach(function (a) {
                        var b = a.series;
                        b.length && b.some(function (a) {
                            return a.visible
                        }) && a !== c && e(a) === h && (m = !0, g.push(a))
                    })
                }
                if (m && d) {
                    g.forEach(function (g) {
                        g = g.getThresholdAlignment(c);
                        a(g) && k.push(g)
                    });
                    var u = 1 < k.length ? k.reduce(function (a, c) {
                        return a + c
                    }, 0) / k.length : void 0;
                    g.forEach(function (a) {
                        a.thresholdAlignment = u
                    })
                }
                return m
            };
            f.prototype.getThresholdAlignment = function (c) {
                (!a(this.dataMin) || this !== c && this.series.some(function (a) {
                    return a.isDirty || a.isDirtyData
                })) && this.getSeriesExtremes();
                if (a(this.threshold)) return c = q((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1), this.options.reversed && (c = 1 - c), c
            };
            f.prototype.getTickAmount = function () {
                var a = this.options,
                    c = a.tickPixelInterval,
                    g = a.tickAmount;
                !n(a.tickInterval) && !g && this.len < c && !this.isRadial && !this.logarithmic && a.startOnTick && a.endOnTick && (g = 2);
                !g && this.alignToOthers() && (g = Math.ceil(this.len / c) + 1);
                4 > g && (this.finalTickAmt = g, g = 5);
                this.tickAmount = g
            };
            f.prototype.adjustTickAmount = function () {
                var c = this,
                    g = c.finalTickAmt,
                    b = c.max,
                    d = c.min,
                    k = c.options,
                    m = c.tickPositions,
                    e = c.tickAmount,
                    h = c.thresholdAlignment,
                    f = m && m.length,
                    p = u(c.threshold, c.softThreshold ? 0 : null);
                var A = c.tickInterval;
                if (a(h)) {
                    var D = .5 > h ? Math.ceil(h *
                        (e - 1)) : Math.floor(h * (e - 1));
                    k.reversed && (D = e - 1 - D)
                }
                if (c.hasData() && a(d) && a(b)) {
                    h = function () {
                        c.transA *= (f - 1) / (e - 1);
                        c.min = k.startOnTick ? m[0] : Math.min(d, m[0]);
                        c.max = k.endOnTick ? m[m.length - 1] : Math.max(b, m[m.length - 1])
                    };
                    if (a(D) && a(c.threshold)) {
                        for (; m[D] !== p || m.length !== e || m[0] > d || m[m.length - 1] < b;) {
                            m.length = 0;
                            for (m.push(c.threshold); m.length < e;) void 0 === m[D] || m[D] > c.threshold ? m.unshift(r(m[0] - A)) : m.push(r(m[m.length - 1] + A));
                            if (A > 8 * c.tickInterval) break;
                            A *= 2
                        }
                        h()
                    } else if (f < e) {
                        for (; m.length < e;) m.length % 2 || d ===
                            p ? m.push(r(m[m.length - 1] + A)) : m.unshift(r(m[0] - A));
                        h()
                    }
                    if (n(g)) {
                        for (A = p = m.length; A--;)(3 === g && 1 === A % 2 || 2 >= g && 0 < A && A < p - 1) && m.splice(A, 1);
                        c.finalTickAmt = void 0
                    }
                }
            };
            f.prototype.setScale = function () {
                var a = !1,
                    c = !1;
                this.series.forEach(function (g) {
                    a = a || g.isDirtyData || g.isDirty;
                    c = c || g.xAxis && g.xAxis.isDirty || !1
                });
                this.setAxisSize();
                var g = this.len !== (this.old && this.old.len);
                g || a || c || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ?
                    (this.stacking && this.stacking.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty = g || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks();
                a && this.panningState && (this.panningState.isDirty = !0);
                m(this, "afterSetScale")
            };
            f.prototype.setExtremes = function (a, c, g, b, d) {
                var k = this,
                    e = k.chart;
                g = u(g, !0);
                k.series.forEach(function (a) {
                    delete a.kdTree
                });
                d = x(d, {
                    min: a,
                    max: c
                });
                m(k, "setExtremes", d,
                    function () {
                        k.userMin = a;
                        k.userMax = c;
                        k.eventArgs = d;
                        g && e.redraw(b)
                    })
            };
            f.prototype.zoom = function (a, c) {
                var g = this,
                    b = this.dataMin,
                    d = this.dataMax,
                    k = this.options,
                    e = Math.min(b, u(k.min, b)),
                    h = Math.max(d, u(k.max, d));
                a = {
                    newMin: a,
                    newMax: c
                };
                m(this, "zoom", a, function (a) {
                    var c = a.newMin,
                        k = a.newMax;
                    if (c !== g.min || k !== g.max) g.allowZoomOutside || (n(b) && (c < e && (c = e), c > h && (c = h)), n(d) && (k < e && (k = e), k > h && (k = h))), g.displayBtn = "undefined" !== typeof c || "undefined" !== typeof k, g.setExtremes(c, k, !1, void 0, {
                        trigger: "zoom"
                    });
                    a.zoomed = !0
                });
                return a.zoomed
            };
            f.prototype.setAxisSize = function () {
                var a = this.chart,
                    c = this.options,
                    g = c.offsets || [0, 0, 0, 0],
                    b = this.horiz,
                    d = this.width = Math.round(L(u(c.width, a.plotWidth - g[3] + g[1]), a.plotWidth)),
                    k = this.height = Math.round(L(u(c.height, a.plotHeight - g[0] + g[2]), a.plotHeight)),
                    m = this.top = Math.round(L(u(c.top, a.plotTop + g[0]), a.plotHeight, a.plotTop));
                c = this.left = Math.round(L(u(c.left, a.plotLeft + g[3]), a.plotWidth, a.plotLeft));
                this.bottom = a.chartHeight - k - m;
                this.right = a.chartWidth - d - c;
                this.len = Math.max(b ?
                    d : k, 0);
                this.pos = b ? c : m
            };
            f.prototype.getExtremes = function () {
                var a = this.logarithmic;
                return {
                    min: a ? r(a.lin2log(this.min)) : this.min,
                    max: a ? r(a.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            };
            f.prototype.getThreshold = function (a) {
                var c = this.logarithmic,
                    g = c ? c.lin2log(this.min) : this.min;
                c = c ? c.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = g : Infinity === a ? a = c : g > a ? a = g : c < a && (a = c);
                return this.translate(a, 0, 1, 0, 1)
            };
            f.prototype.autoLabelAlign =
                function (a) {
                    var c = (u(a, 0) - 90 * this.side + 720) % 360;
                    a = {
                        align: "center"
                    };
                    m(this, "autoLabelAlign", a, function (a) {
                        15 < c && 165 > c ? a.align = "right" : 195 < c && 345 > c && (a.align = "left")
                    });
                    return a.align
                };
            f.prototype.tickSize = function (a) {
                var c = this.options,
                    g = u(c["tick" === a ? "tickWidth" : "minorTickWidth"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0),
                    b = c["tick" === a ? "tickLength" : "minorTickLength"];
                if (g && b) {
                    "inside" === c[a + "Position"] && (b = -b);
                    var d = [b, g]
                }
                a = {
                    tickSize: d
                };
                m(this, "afterTickSize", a);
                return a.tickSize
            };
            f.prototype.labelMetrics =
                function () {
                    var a = this.tickPositions && this.tickPositions[0] || 0;
                    return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
                };
            f.prototype.unsquish = function () {
                var c = this.options.labels,
                    g = this.horiz,
                    b = this.tickInterval,
                    k = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b),
                    m = c.rotation,
                    e = this.labelMetrics(),
                    h = Math.max(this.max - this.min, 0),
                    f = function (a) {
                        var c = a / (k || 1);
                        c = 1 < c ? Math.ceil(c) : 1;
                        c * b > h && Infinity !== a && Infinity !== k && h && (c = Math.ceil(h / b));
                        return r(c *
                            b)
                    },
                    p = b,
                    n, A, D = Number.MAX_VALUE;
                if (g) {
                    if (!c.staggerLines && !c.step)
                        if (a(m)) var q = [m];
                        else k < c.autoRotationLimit && (q = c.autoRotation);
                    q && q.forEach(function (a) {
                        if (a === m || a && -90 <= a && 90 >= a) {
                            A = f(Math.abs(e.h / Math.sin(d * a)));
                            var c = A + Math.abs(a / 360);
                            c < D && (D = c, n = a, p = A)
                        }
                    })
                } else c.step || (p = f(e.h));
                this.autoRotation = q;
                this.labelRotation = u(n, a(m) ? m : 0);
                return p
            };
            f.prototype.getSlotWidth = function (c) {
                var g = this.chart,
                    b = this.horiz,
                    d = this.options.labels,
                    k = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    m =
                    g.margin[3];
                if (c && a(c.slotWidth)) return c.slotWidth;
                if (b && 2 > d.step) return d.rotation ? 0 : (this.staggerLines || 1) * this.len / k;
                if (!b) {
                    c = d.style.width;
                    if (void 0 !== c) return parseInt(String(c), 10);
                    if (m) return m - g.spacing[3]
                }
                return .33 * g.chartWidth
            };
            f.prototype.renderUnsquish = function () {
                var a = this.chart,
                    c = a.renderer,
                    b = this.tickPositions,
                    d = this.ticks,
                    k = this.options.labels,
                    m = k.style,
                    e = this.horiz,
                    h = this.getSlotWidth(),
                    u = Math.max(1, Math.round(h - 2 * k.padding)),
                    f = {},
                    p = this.labelMetrics(),
                    n = m.textOverflow,
                    A = 0;
                g(k.rotation) ||
                    (f.rotation = k.rotation || 0);
                b.forEach(function (a) {
                    a = d[a];
                    a.movedLabel && a.replaceMovedLabel();
                    a && a.label && a.label.textPxLength > A && (A = a.label.textPxLength)
                });
                this.maxLabelLength = A;
                if (this.autoRotation) A > u && A > p.h ? f.rotation = this.labelRotation : this.labelRotation = 0;
                else if (h) {
                    var D = u;
                    if (!n) {
                        var r = "clip";
                        for (u = b.length; !e && u--;) {
                            var q = b[u];
                            if (q = d[q].label) q.styles && "ellipsis" === q.styles.textOverflow ? q.css({
                                    textOverflow: "clip"
                                }) : q.textPxLength > h && q.css({
                                    width: h + "px"
                                }), q.getBBox().height > this.len / b.length -
                                (p.h - p.f) && (q.specificTextOverflow = "ellipsis")
                        }
                    }
                }
                f.rotation && (D = A > .5 * a.chartHeight ? .33 * a.chartHeight : A, n || (r = "ellipsis"));
                if (this.labelAlign = k.align || this.autoLabelAlign(this.labelRotation)) f.align = this.labelAlign;
                b.forEach(function (a) {
                    var c = (a = d[a]) && a.label,
                        g = m.width,
                        b = {};
                    c && (c.attr(f), a.shortenLabel ? a.shortenLabel() : D && !g && "nowrap" !== m.whiteSpace && (D < c.textPxLength || "SPAN" === c.element.tagName) ? (b.width = D + "px", n || (b.textOverflow = c.specificTextOverflow || r), c.css(b)) : c.styles && c.styles.width && !b.width &&
                        !g && c.css({
                            width: null
                        }), delete c.specificTextOverflow, a.rotation = f.rotation)
                }, this);
                this.tickRotCorr = c.rotCorr(p.b, this.labelRotation || 0, 0 !== this.side)
            };
            f.prototype.hasData = function () {
                return this.series.some(function (a) {
                    return a.hasData()
                }) || this.options.showEmpty && n(this.min) && n(this.max)
            };
            f.prototype.addTitle = function (a) {
                var g = this.chart.renderer,
                    b = this.horiz,
                    d = this.opposite,
                    k = this.options.title,
                    m = this.chart.styledMode,
                    e;
                this.axisTitle || ((e = k.textAlign) || (e = (b ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: d ? "right" : "left",
                    middle: "center",
                    high: d ? "left" : "right"
                })[k.align]), this.axisTitle = g.text(k.text || "", 0, 0, k.useHTML).attr({
                    zIndex: 7,
                    rotation: k.rotation,
                    align: e
                }).addClass("highcharts-axis-title"), m || this.axisTitle.css(c(k.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                m || k.style.width || this.isRadial || this.axisTitle.css({
                    width: this.len + "px"
                });
                this.axisTitle[a ? "show" : "hide"](a)
            };
            f.prototype.generateTick = function (a) {
                var c = this.ticks;
                c[a] ? c[a].addLabel() : c[a] = new G(this, a)
            };
            f.prototype.getOffset =
                function () {
                    var a = this,
                        c = this,
                        g = c.chart,
                        b = c.horiz,
                        d = c.options,
                        k = c.side,
                        e = c.ticks,
                        h = c.tickPositions,
                        f = c.coll,
                        p = c.axisParent,
                        D = g.renderer,
                        q = g.inverted && !c.isZAxis ? [1, 0, 3, 2][k] : k,
                        r = c.hasData(),
                        l = d.title,
                        t = d.labels,
                        x = g.axisOffset;
                    g = g.clipOffset;
                    var z = [-1, 1, 1, -1][k],
                        L = d.className,
                        w, S = 0,
                        ja = 0,
                        ca = 0;
                    c.showAxis = w = r || d.showEmpty;
                    c.staggerLines = c.horiz && t.staggerLines || void 0;
                    if (!c.axisGroup) {
                        var J = function (c, g, b) {
                            return D.g(c).attr({
                                zIndex: b
                            }).addClass("highcharts-".concat(f.toLowerCase()).concat(g, " ") + (a.isRadial ?
                                "highcharts-radial-axis".concat(g, " ") : "") + (L || "")).add(p)
                        };
                        c.gridGroup = J("grid", "-grid", d.gridZIndex);
                        c.axisGroup = J("axis", "", d.zIndex);
                        c.labelGroup = J("axis-labels", "-labels", t.zIndex)
                    }
                    r || c.isLinked ? (h.forEach(function (a) {
                            c.generateTick(a)
                        }), c.renderUnsquish(), c.reserveSpaceDefault = 0 === k || 2 === k || {
                            1: "left",
                            3: "right"
                        } [k] === c.labelAlign, u(t.reserveSpace, "center" === c.labelAlign ? !0 : null, c.reserveSpaceDefault) && h.forEach(function (a) {
                            ca = Math.max(e[a].getLabelSize(), ca)
                        }), c.staggerLines && (ca *= c.staggerLines),
                        c.labelOffset = ca * (c.opposite ? -1 : 1)) : A(e, function (a, c) {
                        a.destroy();
                        delete e[c]
                    });
                    if (l && l.text && !1 !== l.enabled && (c.addTitle(w), w && !1 !== l.reserveSpace)) {
                        c.titleOffset = S = c.axisTitle.getBBox()[b ? "height" : "width"];
                        var M = l.offset;
                        ja = n(M) ? 0 : u(l.margin, b ? 5 : 10)
                    }
                    c.renderLine();
                    c.offset = z * u(d.offset, x[k] ? x[k] + (d.margin || 0) : 0);
                    c.tickRotCorr = c.tickRotCorr || {
                        x: 0,
                        y: 0
                    };
                    l = 0 === k ? -c.labelMetrics().h : 2 === k ? c.tickRotCorr.y : 0;
                    r = Math.abs(ca) + ja;
                    ca && (r = r - l + z * (b ? u(t.y, c.tickRotCorr.y + 8 * z) : t.x));
                    c.axisTitleMargin = u(M, r);
                    c.getMaxLabelDimensions &&
                        (c.maxLabelDimensions = c.getMaxLabelDimensions(e, h));
                    "colorAxis" !== f && (b = this.tickSize("tick"), x[k] = Math.max(x[k], (c.axisTitleMargin || 0) + S + z * c.offset, r, h && h.length && b ? b[0] + z * c.offset : 0), d = !c.axisLine || d.offset ? 0 : 2 * Math.floor(c.axisLine.strokeWidth() / 2), g[q] = Math.max(g[q], d));
                    m(this, "afterGetOffset")
                };
            f.prototype.getLinePath = function (a) {
                var c = this.chart,
                    g = this.opposite,
                    b = this.offset,
                    d = this.horiz,
                    k = this.left + (g ? this.width : 0) + b;
                b = c.chartHeight - this.bottom - (g ? this.height : 0) + b;
                g && (a *= -1);
                return c.renderer.crispLine([
                    ["M",
                        d ? this.left : k, d ? b : this.top
                    ],
                    ["L", d ? c.chartWidth - this.right : k, d ? b : c.chartHeight - this.bottom]
                ], a)
            };
            f.prototype.renderLine = function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            };
            f.prototype.getTitlePosition = function () {
                var a = this.horiz,
                    c = this.left,
                    g = this.top,
                    b = this.len,
                    d = this.options.title,
                    k = a ? c : g,
                    e = this.opposite,
                    h = this.offset,
                    f = d.x,
                    u = d.y,
                    p = this.axisTitle,
                    n = this.chart.renderer.fontMetrics(d.style.fontSize, p);
                p = p ? Math.max(p.getBBox(!1, 0).height - n.h - 1, 0) : 0;
                b = {
                    low: k + (a ? 0 : b),
                    middle: k + b / 2,
                    high: k + (a ? b : 0)
                } [d.align];
                c = (a ? g + this.height : c) + (a ? 1 : -1) * (e ? -1 : 1) * (this.axisTitleMargin || 0) + [-p, p, n.f, -p][this.side];
                a = {
                    x: a ? b + f : c + (e ? this.width : 0) + h + f,
                    y: a ? c + u - (e ? this.height : 0) + h : b + u
                };
                m(this, "afterGetTitlePosition", {
                    titlePosition: a
                });
                return a
            };
            f.prototype.renderMinorTick = function (a, c) {
                var g = this.minorTicks;
                g[a] || (g[a] = new G(this,
                    a, "minor"));
                c && g[a].isNew && g[a].render(null, !0);
                g[a].render(null, !1, 1)
            };
            f.prototype.renderTick = function (a, c, g) {
                var b = this.ticks;
                if (!this.isLinked || a >= this.min && a <= this.max || this.grid && this.grid.isColumn) b[a] || (b[a] = new G(this, a)), g && b[a].isNew && b[a].render(c, !0, -1), b[a].render(c)
            };
            f.prototype.render = function () {
                var c = this,
                    g = c.chart,
                    b = c.logarithmic,
                    d = c.options,
                    k = c.isLinked,
                    e = c.tickPositions,
                    h = c.axisTitle,
                    f = c.ticks,
                    u = c.minorTicks,
                    p = c.alternateBands,
                    n = d.stackLabels,
                    D = d.alternateGridColor,
                    r = c.tickmarkOffset,
                    q = c.axisLine,
                    l = c.showAxis,
                    t = y(g.renderer.globalAnimation),
                    x, z;
                c.labelEdge.length = 0;
                c.overlap = !1;
                [f, u, p].forEach(function (a) {
                    A(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (c.hasData() || k) {
                    var L = c.chart.hasRendered && c.old && a(c.old.min);
                    c.minorTickInterval && !c.categories && c.getMinorTickPositions().forEach(function (a) {
                        c.renderMinorTick(a, L)
                    });
                    e.length && (e.forEach(function (a, g) {
                        c.renderTick(a, g, L)
                    }), r && (0 === c.min || c.single) && (f[-1] || (f[-1] = new G(c, -1, null, !0)), f[-1].render(-1)));
                    D && e.forEach(function (a, d) {
                        z = "undefined" !==
                            typeof e[d + 1] ? e[d + 1] + r : c.max - r;
                        0 === d % 2 && a < c.max && z <= c.max + (g.polar ? -r : r) && (p[a] || (p[a] = new E.PlotLineOrBand(c)), x = a + r, p[a].options = {
                            from: b ? b.lin2log(x) : x,
                            to: b ? b.lin2log(z) : z,
                            color: D,
                            className: "highcharts-alternate-grid"
                        }, p[a].render(), p[a].isActive = !0)
                    });
                    c._addedPlotLB || (c._addedPlotLB = !0, (d.plotLines || []).concat(d.plotBands || []).forEach(function (a) {
                        c.addPlotBandOrLine(a)
                    }))
                } [f, u, p].forEach(function (a) {
                    var c = [],
                        b = t.duration;
                    A(a, function (a, g) {
                        a.isActive || (a.render(g, !1, 0), a.isActive = !1, c.push(g))
                    });
                    M(function () {
                        for (var g = c.length; g--;) a[c[g]] && !a[c[g]].isActive && (a[c[g]].destroy(), delete a[c[g]])
                    }, a !== p && g.hasRendered && b ? b : 0)
                });
                q && (q[q.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(q.strokeWidth())
                }), q.isPlaced = !0, q[l ? "show" : "hide"](l));
                h && l && (d = c.getTitlePosition(), h[h.isNew ? "attr" : "animate"](d), h.isNew = !1);
                n && n.enabled && c.stacking && c.stacking.renderStackTotals();
                c.old = {
                    len: c.len,
                    max: c.max,
                    min: c.min,
                    transA: c.transA,
                    userMax: c.userMax,
                    userMin: c.userMin
                };
                c.isDirty = !1;
                m(this, "afterRender")
            };
            f.prototype.redraw =
                function () {
                    this.visible && (this.render(), this.plotLinesAndBands.forEach(function (a) {
                        a.render()
                    }));
                    this.series.forEach(function (a) {
                        a.isDirty = !0
                    })
                };
            f.prototype.getKeepProps = function () {
                return this.keepProps || f.keepProps
            };
            f.prototype.destroy = function (a) {
                var c = this,
                    g = c.plotLinesAndBands,
                    b = this.eventOptions;
                m(this, "destroy", {
                    keepEvents: a
                });
                a || S(c);
                [c.ticks, c.minorTicks, c.alternateBands].forEach(function (a) {
                    J(a)
                });
                if (g)
                    for (a = g.length; a--;) g[a].destroy();
                "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) {
                    c[a] &&
                        (c[a] = c[a].destroy())
                });
                for (var d in c.plotLinesAndBandsGroups) c.plotLinesAndBandsGroups[d] = c.plotLinesAndBandsGroups[d].destroy();
                A(c, function (a, g) {
                    -1 === c.getKeepProps().indexOf(g) && delete c[g]
                });
                this.eventOptions = b
            };
            f.prototype.drawCrosshair = function (a, c) {
                var g = this.crosshair,
                    b = u(g && g.snap, !0),
                    d = this.chart,
                    k, e = this.cross;
                m(this, "drawCrosshair", {
                    e: a,
                    point: c
                });
                a || (a = this.cross && this.cross.e);
                if (g && !1 !== (n(c) || !b)) {
                    b ? n(c) && (k = u("colorAxis" !== this.coll ? c.crosshairPos : null, this.isXAxis ? c.plotX : this.len -
                        c.plotY)) : k = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    if (n(k)) {
                        var h = {
                            value: c && (this.isXAxis ? c.x : u(c.stackY, c.y)),
                            translatedValue: k
                        };
                        d.polar && x(h, {
                            isCrosshair: !0,
                            chartX: a && a.chartX,
                            chartY: a && a.chartY,
                            point: c
                        });
                        h = this.getPlotLinePath(h) || null
                    }
                    if (!n(h)) {
                        this.hideCrosshair();
                        return
                    }
                    b = this.categories && !this.isRadial;
                    e || (this.cross = e = d.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + (g.className || "")).attr({
                            zIndex: u(g.zIndex, 2)
                        }).add(), d.styledMode ||
                        (e.attr({
                            stroke: g.color || (b ? l.parse("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                            "stroke-width": u(g.width, 1)
                        }).css({
                            "pointer-events": "none"
                        }), g.dashStyle && e.attr({
                            dashstyle: g.dashStyle
                        })));
                    e.show().attr({
                        d: h
                    });
                    b && !g.width && e.attr({
                        "stroke-width": this.transA
                    });
                    this.cross.e = a
                } else this.hideCrosshair();
                m(this, "afterDrawCrosshair", {
                    e: a,
                    point: c
                })
            };
            f.prototype.hideCrosshair = function () {
                this.cross && this.cross.hide();
                m(this, "afterHideCrosshair")
            };
            f.prototype.hasVerticalPanning = function () {
                var a = this.chart.options.chart.panning;
                return !!(a && a.enabled && /y/.test(a.type))
            };
            f.prototype.validatePositiveValue = function (c) {
                return a(c) && 0 < c
            };
            f.prototype.update = function (a, g) {
                var b = this.chart;
                a = c(this.userOptions, a);
                this.destroy(!0);
                this.init(b, a);
                b.isDirtyBox = !0;
                u(g, !0) && b.redraw()
            };
            f.prototype.remove = function (a) {
                for (var c = this.chart, g = this.coll, b = this.series, d = b.length; d--;) b[d] && b[d].remove(!1);
                w(c.axes, this);
                w(c[g], this);
                c[g].forEach(function (a, c) {
                    a.options.index = a.userOptions.index = c
                });
                this.destroy();
                c.isDirtyBox = !0;
                u(a, !0) && c.redraw()
            };
            f.prototype.setTitle = function (a, c) {
                this.update({
                    title: a
                }, c)
            };
            f.prototype.setCategories = function (a, c) {
                this.update({
                    categories: a
                }, c)
            };
            f.defaultOptions = e.defaultXAxisOptions;
            f.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
            return f
        }();
        "";
        return f
    });
    K(l, "Core/Axis/DateTimeAxis.js", [l["Core/Utilities.js"]], function (f) {
        var e = f.addEvent,
            l = f.getMagnitude,
            C = f.normalizeTickInterval,
            v = f.timeUnits,
            E;
        (function (f) {
            function B() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            }

            function y(d) {
                "datetime" !== d.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new h(this))
            }
            var t = [];
            f.compose = function (d) {
                -1 === t.indexOf(d) && (t.push(d), d.keepProps.push("dateTime"), d.prototype.getTimeTicks = B, e(d, "init", y));
                return d
            };
            var h = function () {
                function d(b) {
                    this.axis = b
                }
                d.prototype.normalizeTimeTickInterval = function (b, d) {
                    var e = d || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null]
                    ];
                    d = e[e.length - 1];
                    var h = v[d[0]],
                        f = d[1],
                        p;
                    for (p = 0; p < e.length && !(d = e[p], h = v[d[0]], f = d[1], e[p + 1] && b <= (h * f[f.length - 1] + v[e[p + 1][0]]) / 2); p++);
                    h === v.year && b < 5 * h && (f = [1, 2, 5]);
                    b = C(b / h, f, "year" === d[0] ? Math.max(l(b / h), 1) : 1);
                    return {
                        unitRange: h,
                        count: b,
                        unitName: d[0]
                    }
                };
                d.prototype.getXDateFormat = function (b, d) {
                    var e = this.axis,
                        h = e.chart.time;
                    return e.closestPointRange ? h.getDateFormat(e.closestPointRange, b, e.options.startOfWeek, d) || h.resolveDTLFormat(d.year).main :
                        h.resolveDTLFormat(d.day).main
                };
                return d
            }();
            f.Additions = h
        })(E || (E = {}));
        return E
    });
    K(l, "Core/Axis/LogarithmicAxis.js", [l["Core/Utilities.js"]], function (f) {
        var e = f.addEvent,
            l = f.normalizeTickInterval,
            C = f.pick,
            v;
        (function (f) {
            function v(e) {
                var d = this.logarithmic;
                "logarithmic" !== e.userOptions.type ? this.logarithmic = void 0 : d || (this.logarithmic = new t(this))
            }

            function B() {
                var e = this.logarithmic;
                e && (this.lin2val = function (d) {
                    return e.lin2log(d)
                }, this.val2lin = function (d) {
                    return e.log2lin(d)
                })
            }
            var y = [];
            f.compose =
                function (h) {
                    -1 === y.indexOf(h) && (y.push(h), h.keepProps.push("logarithmic"), e(h, "init", v), e(h, "afterInit", B));
                    return h
                };
            var t = function () {
                function e(d) {
                    this.axis = d
                }
                e.prototype.getLogTickPositions = function (d, b, e, h) {
                    var f = this.axis,
                        p = f.len,
                        q = f.options,
                        t = [];
                    h || (this.minorAutoInterval = void 0);
                    if (.5 <= d) d = Math.round(d), t = f.getLinearTickPositions(d, b, e);
                    else if (.08 <= d) {
                        var z = Math.floor(b),
                            x, m = q = void 0;
                        for (p = .3 < d ? [1, 2, 4] : .15 < d ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; z < e + 1 && !m; z++) {
                            var k = p.length;
                            for (x = 0; x < k && !m; x++) {
                                var a =
                                    this.log2lin(this.lin2log(z) * p[x]);
                                a > b && (!h || q <= e) && "undefined" !== typeof q && t.push(q);
                                q > e && (m = !0);
                                q = a
                            }
                        }
                    } else b = this.lin2log(b), e = this.lin2log(e), d = h ? f.getMinorTickInterval() : q.tickInterval, d = C("auto" === d ? null : d, this.minorAutoInterval, q.tickPixelInterval / (h ? 5 : 1) * (e - b) / ((h ? p / f.tickPositions.length : p) || 1)), d = l(d), t = f.getLinearTickPositions(d, b, e).map(this.log2lin), h || (this.minorAutoInterval = d / 5);
                    h || (f.tickInterval = d);
                    return t
                };
                e.prototype.lin2log = function (d) {
                    return Math.pow(10, d)
                };
                e.prototype.log2lin =
                    function (d) {
                        return Math.log(d) / Math.LN10
                    };
                return e
            }();
            f.Additions = t
        })(v || (v = {}));
        return v
    });
    K(l, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [l["Core/Utilities.js"]], function (f) {
        var e = f.erase,
            l = f.extend,
            C = f.isNumber,
            v;
        (function (f) {
            var v = [],
                B;
            f.compose = function (e, h) {
                B || (B = e); - 1 === v.indexOf(h) && (v.push(h), l(h.prototype, y.prototype));
                return h
            };
            var y = function () {
                function f() {}
                f.prototype.getPlotBandPath = function (e, d, b) {
                    void 0 === b && (b = this.options);
                    var h = this.getPlotLinePath({
                            value: d,
                            force: !0,
                            acrossPanes: b.acrossPanes
                        }),
                        f = [],
                        r = this.horiz;
                    d = !C(this.min) || !C(this.max) || e < this.min && d < this.min || e > this.max && d > this.max;
                    e = this.getPlotLinePath({
                        value: e,
                        force: !0,
                        acrossPanes: b.acrossPanes
                    });
                    b = 1;
                    if (e && h) {
                        if (d) {
                            var n = e.toString() === h.toString();
                            b = 0
                        }
                        for (d = 0; d < e.length; d += 2) {
                            var l = e[d],
                                t = e[d + 1],
                                z = h[d],
                                x = h[d + 1];
                            "M" !== l[0] && "L" !== l[0] || "M" !== t[0] && "L" !== t[0] || "M" !== z[0] && "L" !== z[0] || "M" !== x[0] && "L" !== x[0] || (r && z[1] === l[1] ? (z[1] += b, x[1] += b) : r || z[2] !== l[2] || (z[2] += b, x[2] += b), f.push(["M", l[1], l[2]], ["L", t[1], t[2]], ["L", x[1], x[2]],
                                ["L", z[1], z[2]], ["Z"]));
                            f.isFlat = n
                        }
                    }
                    return f
                };
                f.prototype.addPlotBand = function (e) {
                    return this.addPlotBandOrLine(e, "plotBands")
                };
                f.prototype.addPlotLine = function (e) {
                    return this.addPlotBandOrLine(e, "plotLines")
                };
                f.prototype.addPlotBandOrLine = function (e, d) {
                    var b = this,
                        f = this.userOptions,
                        h = new B(this, e);
                    this.visible && (h = h.render());
                    if (h) {
                        this._addedPlotLB || (this._addedPlotLB = !0, (f.plotLines || []).concat(f.plotBands || []).forEach(function (d) {
                            b.addPlotBandOrLine(d)
                        }));
                        if (d) {
                            var r = f[d] || [];
                            r.push(e);
                            f[d] = r
                        }
                        this.plotLinesAndBands.push(h)
                    }
                    return h
                };
                f.prototype.removePlotBandOrLine = function (f) {
                    var d = this.plotLinesAndBands,
                        b = this.options,
                        h = this.userOptions;
                    if (d) {
                        for (var q = d.length; q--;) d[q].id === f && d[q].destroy();
                        [b.plotLines || [], h.plotLines || [], b.plotBands || [], h.plotBands || []].forEach(function (b) {
                            for (q = b.length; q--;)(b[q] || {}).id === f && e(b, b[q])
                        })
                    }
                };
                f.prototype.removePlotBand = function (e) {
                    this.removePlotBandOrLine(e)
                };
                f.prototype.removePlotLine = function (e) {
                    this.removePlotBandOrLine(e)
                };
                return f
            }()
        })(v || (v = {}));
        return v
    });
    K(l, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js",
        [l["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], l["Core/Utilities.js"]],
        function (f, e) {
            var l = e.arrayMax,
                C = e.arrayMin,
                v = e.defined,
                E = e.destroyObjectProperties,
                G = e.erase,
                B = e.fireEvent,
                y = e.merge,
                t = e.objectEach,
                h = e.pick;
            e = function () {
                function d(b, d) {
                    this.axis = b;
                    d && (this.options = d, this.id = d.id)
                }
                d.compose = function (b) {
                    return f.compose(d, b)
                };
                d.prototype.render = function () {
                    B(this, "render");
                    var b = this,
                        d = b.axis,
                        e = d.horiz,
                        f = d.logarithmic,
                        n = b.options,
                        l = n.color,
                        w = h(n.zIndex, 0),
                        z = n.events,
                        x = {},
                        m = d.chart.renderer,
                        k = n.label,
                        a = b.label,
                        g = n.to,
                        c = n.from,
                        D = n.value,
                        A = b.svgElem,
                        u = [],
                        L = v(c) && v(g);
                    u = v(D);
                    var S = !A,
                        R = {
                            "class": "highcharts-plot-" + (L ? "band " : "line ") + (n.className || "")
                        },
                        M = L ? "bands" : "lines";
                    f && (c = f.log2lin(c), g = f.log2lin(g), D = f.log2lin(D));
                    d.chart.styledMode || (u ? (R.stroke = l || "#999999", R["stroke-width"] = h(n.width, 1), n.dashStyle && (R.dashstyle = n.dashStyle)) : L && (R.fill = l || "#e6ebf5", n.borderWidth && (R.stroke = n.borderColor, R["stroke-width"] = n.borderWidth)));
                    x.zIndex = w;
                    M += "-" + w;
                    (f = d.plotLinesAndBandsGroups[M]) || (d.plotLinesAndBandsGroups[M] =
                        f = m.g("plot-" + M).attr(x).add());
                    S && (b.svgElem = A = m.path().attr(R).add(f));
                    if (u) u = d.getPlotLinePath({
                        value: D,
                        lineWidth: A.strokeWidth(),
                        acrossPanes: n.acrossPanes
                    });
                    else if (L) u = d.getPlotBandPath(c, g, n);
                    else return;
                    !b.eventsAdded && z && (t(z, function (a, c) {
                        A.on(c, function (a) {
                            z[c].apply(b, [a])
                        })
                    }), b.eventsAdded = !0);
                    (S || !A.d) && u && u.length ? A.attr({
                        d: u
                    }) : A && (u ? (A.show(), A.animate({
                        d: u
                    })) : A.d && (A.hide(), a && (b.label = a = a.destroy())));
                    k && (v(k.text) || v(k.formatter)) && u && u.length && 0 < d.width && 0 < d.height && !u.isFlat ? (k =
                        y({
                            align: e && L && "center",
                            x: e ? !L && 4 : 10,
                            verticalAlign: !e && L && "middle",
                            y: e ? L ? 16 : 10 : L ? 6 : -4,
                            rotation: e && !L && 90
                        }, k), this.renderLabel(k, u, L, w)) : a && a.hide();
                    return b
                };
                d.prototype.renderLabel = function (b, d, e, f) {
                    var h = this.axis,
                        p = h.chart.renderer,
                        r = this.label;
                    r || (this.label = r = p.text(this.getLabelText(b), 0, 0, b.useHTML).attr({
                        align: b.textAlign || b.align,
                        rotation: b.rotation,
                        "class": "highcharts-plot-" + (e ? "band" : "line") + "-label " + (b.className || ""),
                        zIndex: f
                    }).add(), h.chart.styledMode || r.css(y({
                            textOverflow: "ellipsis"
                        },
                        b.style)));
                    f = d.xBounds || [d[0][1], d[1][1], e ? d[2][1] : d[0][1]];
                    d = d.yBounds || [d[0][2], d[1][2], e ? d[2][2] : d[0][2]];
                    e = C(f);
                    p = C(d);
                    r.align(b, !1, {
                        x: e,
                        y: p,
                        width: l(f) - e,
                        height: l(d) - p
                    });
                    r.alignValue && "left" !== r.alignValue || r.css({
                        width: (90 === r.rotation ? h.height - (r.alignAttr.y - h.top) : h.width - (r.alignAttr.x - h.left)) + "px"
                    });
                    r.show(!0)
                };
                d.prototype.getLabelText = function (b) {
                    return v(b.formatter) ? b.formatter.call(this) : b.text
                };
                d.prototype.destroy = function () {
                    G(this.axis.plotLinesAndBands, this);
                    delete this.axis;
                    E(this)
                };
                return d
            }();
            "";
            "";
            return e
        });
    K(l, "Core/Tooltip.js", [l["Core/FormatUtilities.js"], l["Core/Globals.js"], l["Core/Renderer/RendererUtilities.js"], l["Core/Renderer/RendererRegistry.js"], l["Core/Utilities.js"]], function (f, e, l, C, v) {
        var E = f.format,
            G = e.doc,
            B = l.distribute,
            y = v.addEvent,
            t = v.clamp,
            h = v.css,
            d = v.defined,
            b = v.discardElement,
            p = v.extend,
            q = v.fireEvent,
            r = v.isArray,
            n = v.isNumber,
            J = v.isString,
            w = v.merge,
            z = v.pick,
            x = v.splat,
            m = v.syncTimeout;
        f = function () {
            function k(a, g) {
                this.allowShared = !0;
                this.container = void 0;
                this.crosshairs = [];
                this.distance = 0;
                this.isHidden = !0;
                this.isSticky = !1;
                this.now = {};
                this.options = {};
                this.outside = !1;
                this.chart = a;
                this.init(a, g)
            }
            k.prototype.applyFilter = function () {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    attributes: {
                        id: "drop-shadow-" + a.index,
                        opacity: .5
                    },
                    children: [{
                            tagName: "feGaussianBlur",
                            attributes: {
                                "in": "SourceAlpha",
                                stdDeviation: 1
                            }
                        }, {
                            tagName: "feOffset",
                            attributes: {
                                dx: 1,
                                dy: 1
                            }
                        }, {
                            tagName: "feComponentTransfer",
                            children: [{
                                tagName: "feFuncA",
                                attributes: {
                                    type: "linear",
                                    slope: .3
                                }
                            }]
                        },
                        {
                            tagName: "feMerge",
                            children: [{
                                tagName: "feMergeNode"
                            }, {
                                tagName: "feMergeNode",
                                attributes: {
                                    "in": "SourceGraphic"
                                }
                            }]
                        }
                    ]
                })
            };
            k.prototype.bodyFormatter = function (a) {
                return a.map(function (a) {
                    var c = a.series.tooltipOptions;
                    return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"] || "")
                })
            };
            k.prototype.cleanSplit = function (a) {
                this.chart.series.forEach(function (g) {
                    var c = g && g.tt;
                    c && (!c.isActive || a ? g.tt = c.destroy() : c.isActive = !1)
                })
            };
            k.prototype.defaultFormatter =
                function (a) {
                    var g = this.points || x(this);
                    var c = [a.tooltipFooterHeaderFormatter(g[0])];
                    c = c.concat(a.bodyFormatter(g));
                    c.push(a.tooltipFooterHeaderFormatter(g[0], !0));
                    return c
                };
            k.prototype.destroy = function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(!0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), b(this.container));
                v.clearTimeout(this.hideTimer);
                v.clearTimeout(this.tooltipTimeout)
            };
            k.prototype.getAnchor = function (a, g) {
                var c =
                    this.chart,
                    b = c.pointer,
                    d = c.inverted,
                    k = c.plotTop,
                    e = c.plotLeft,
                    m, f, h = 0,
                    p = 0;
                a = x(a);
                this.followPointer && g ? ("undefined" === typeof g.chartX && (g = b.normalize(g)), b = [g.chartX - e, g.chartY - k]) : a[0].tooltipPos ? b = a[0].tooltipPos : (a.forEach(function (a) {
                        m = a.series.yAxis;
                        f = a.series.xAxis;
                        h += a.plotX || 0;
                        p += a.plotLow ? (a.plotLow + (a.plotHigh || 0)) / 2 : a.plotY || 0;
                        f && m && (d ? (h += k + c.plotHeight - f.len - f.pos, p += e + c.plotWidth - m.len - m.pos) : (h += f.pos - e, p += m.pos - k))
                    }), h /= a.length, p /= a.length, b = [d ? c.plotWidth - p : h, d ? c.plotHeight - h : p],
                    this.shared && 1 < a.length && g && (d ? b[0] = g.chartX - e : b[1] = g.chartY - k));
                return b.map(Math.round)
            };
            k.prototype.getLabel = function () {
                var a = this,
                    g = this.chart.styledMode,
                    c = this.options,
                    b = this.split && this.allowShared,
                    k = "tooltip" + (d(c.className) ? " " + c.className : ""),
                    m = c.style.pointerEvents || (!this.followPointer && c.stickOnContact ? "auto" : "none"),
                    f = function () {
                        a.inContact = !0
                    },
                    p = function (c) {
                        var g = a.chart.hoverSeries;
                        a.inContact = a.shouldStickOnContact() && a.chart.pointer.inClass(c.relatedTarget, "highcharts-tooltip");
                        if (!a.inContact &&
                            g && g.onMouseOut) g.onMouseOut()
                    },
                    n, r = this.chart.renderer;
                if (a.label) {
                    var q = !a.label.hasClass("highcharts-label");
                    (b && !q || !b && q) && a.destroy()
                }
                if (!this.label) {
                    if (this.outside) {
                        q = this.chart.options.chart.style;
                        var l = C.getRendererType();
                        this.container = n = e.doc.createElement("div");
                        n.className = "highcharts-tooltip-container";
                        h(n, {
                            position: "absolute",
                            top: "1px",
                            pointerEvents: m,
                            zIndex: Math.max(this.options.style.zIndex || 0, (q && q.zIndex || 0) + 3)
                        });
                        y(n, "mouseenter", f);
                        y(n, "mouseleave", p);
                        e.doc.body.appendChild(n);
                        this.renderer = r = new l(n, 0, 0, q, void 0, void 0, r.styledMode)
                    }
                    b ? this.label = r.g(k) : (this.label = r.label("", 0, 0, c.shape, void 0, void 0, c.useHTML, void 0, k).attr({
                        padding: c.padding,
                        r: c.borderRadius
                    }), g || this.label.attr({
                        fill: c.backgroundColor,
                        "stroke-width": c.borderWidth
                    }).css(c.style).css({
                        pointerEvents: m
                    }).shadow(c.shadow));
                    g && c.shadow && (this.applyFilter(), this.label.attr({
                        filter: "url(#drop-shadow-" + this.chart.index + ")"
                    }));
                    if (a.outside && !a.split) {
                        var t = this.label,
                            x = t.xSetter,
                            z = t.ySetter;
                        t.xSetter = function (c) {
                            x.call(t,
                                a.distance);
                            n.style.left = c + "px"
                        };
                        t.ySetter = function (c) {
                            z.call(t, a.distance);
                            n.style.top = c + "px"
                        }
                    }
                    this.label.on("mouseenter", f).on("mouseleave", p).attr({
                        zIndex: 8
                    }).add()
                }
                return this.label
            };
            k.prototype.getPosition = function (a, g, c) {
                var b = this.chart,
                    d = this.distance,
                    k = {},
                    e = b.inverted && c.h || 0,
                    m = this.outside,
                    f = m ? G.documentElement.clientWidth - 2 * d : b.chartWidth,
                    h = m ? Math.max(G.body.scrollHeight, G.documentElement.scrollHeight, G.body.offsetHeight, G.documentElement.offsetHeight, G.documentElement.clientHeight) : b.chartHeight,
                    p = b.pointer.getChartPosition(),
                    n = function (k) {
                        var e = "x" === k;
                        return [k, e ? f : h, e ? a : g].concat(m ? [e ? a * p.scaleX : g * p.scaleY, e ? p.left - d + (c.plotX + b.plotLeft) * p.scaleX : p.top - d + (c.plotY + b.plotTop) * p.scaleY, 0, e ? f : h] : [e ? a : g, e ? c.plotX + b.plotLeft : c.plotY + b.plotTop, e ? b.plotLeft : b.plotTop, e ? b.plotLeft + b.plotWidth : b.plotTop + b.plotHeight])
                    },
                    r = n("y"),
                    q = n("x"),
                    l;
                n = !!c.negative;
                !b.polar && b.hoverSeries && b.hoverSeries.yAxis && b.hoverSeries.yAxis.reversed && (n = !n);
                var t = !this.followPointer && z(c.ttBelow, !b.inverted === n),
                    x = function (a,
                        c, g, b, f, h, u) {
                        var n = m ? "y" === a ? d * p.scaleY : d * p.scaleX : d,
                            A = (g - b) / 2,
                            D = b < f - d,
                            F = f + d + b < c,
                            r = f - n - g + A;
                        f = f + n - A;
                        if (t && F) k[a] = f;
                        else if (!t && D) k[a] = r;
                        else if (D) k[a] = Math.min(u - b, 0 > r - e ? r : r - e);
                        else if (F) k[a] = Math.max(h, f + e + g > c ? f : f + e);
                        else return !1
                    },
                    w = function (a, c, g, b, e) {
                        var m;
                        e < d || e > c - d ? m = !1 : k[a] = e < g / 2 ? 1 : e > c - b / 2 ? c - b - 2 : e - g / 2;
                        return m
                    },
                    F = function (a) {
                        var c = r;
                        r = q;
                        q = c;
                        l = a
                    },
                    T = function () {
                        !1 !== x.apply(0, r) ? !1 !== w.apply(0, q) || l || (F(!0), T()) : l ? k.x = k.y = 0 : (F(!0), T())
                    };
                (b.inverted || 1 < this.len) && F();
                T();
                return k
            };
            k.prototype.hide =
                function (a) {
                    var g = this;
                    v.clearTimeout(this.hideTimer);
                    a = z(a, this.options.hideDelay);
                    this.isHidden || (this.hideTimer = m(function () {
                        g.getLabel().fadeOut(a ? void 0 : a);
                        g.isHidden = !0
                    }, a))
                };
            k.prototype.init = function (a, g) {
                this.chart = a;
                this.options = g;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = g.split && !a.inverted && !a.polar;
                this.shared = g.shared || this.split;
                this.outside = z(g.outside, !(!a.scrollablePixelsX && !a.scrollablePixelsY))
            };
            k.prototype.shouldStickOnContact = function () {
                return !(this.followPointer ||
                    !this.options.stickOnContact)
            };
            k.prototype.isStickyOnContact = function () {
                return !(!this.shouldStickOnContact() || !this.inContact)
            };
            k.prototype.move = function (a, g, c, b) {
                var d = this,
                    k = d.now,
                    e = !1 !== d.options.animation && !d.isHidden && (1 < Math.abs(a - k.x) || 1 < Math.abs(g - k.y)),
                    m = d.followPointer || 1 < d.len;
                p(k, {
                    x: e ? (2 * k.x + a) / 3 : a,
                    y: e ? (k.y + g) / 2 : g,
                    anchorX: m ? void 0 : e ? (2 * k.anchorX + c) / 3 : c,
                    anchorY: m ? void 0 : e ? (k.anchorY + b) / 2 : b
                });
                d.getLabel().attr(k);
                d.drawTracker();
                e && (v.clearTimeout(this.tooltipTimeout), this.tooltipTimeout =
                    setTimeout(function () {
                        d && d.move(a, g, c, b)
                    }, 32))
            };
            k.prototype.refresh = function (a, g) {
                var c = this.chart,
                    b = this.options,
                    d = x(a),
                    k = d[0],
                    e = [],
                    m = b.formatter || this.defaultFormatter,
                    f = this.shared,
                    h = c.styledMode,
                    p = {};
                if (b.enabled && k.series) {
                    v.clearTimeout(this.hideTimer);
                    this.allowShared = !(!r(a) && a.series && a.series.noSharedTooltip);
                    this.followPointer = !this.split && k.series.tooltipOptions.followPointer;
                    a = this.getAnchor(a, g);
                    var n = a[0],
                        l = a[1];
                    f && this.allowShared ? (c.pointer.applyInactiveState(d), d.forEach(function (a) {
                        a.setState("hover");
                        e.push(a.getLabelConfig())
                    }), p = {
                        x: k.category,
                        y: k.y
                    }, p.points = e) : p = k.getLabelConfig();
                    this.len = e.length;
                    m = m.call(p, this);
                    f = k.series;
                    this.distance = z(f.tooltipOptions.distance, 16);
                    if (!1 === m) this.hide();
                    else {
                        if (this.split && this.allowShared) this.renderSplit(m, d);
                        else {
                            var t = n,
                                w = l;
                            g && c.pointer.isDirectTouch && (t = g.chartX - c.plotLeft, w = g.chartY - c.plotTop);
                            if (c.polar || !1 === f.options.clip || d.some(function (a) {
                                    return a.series.shouldShowTooltip(t, w)
                                })) g = this.getLabel(), b.style.width && !h || g.css({
                                width: this.chart.spacingBox.width +
                                    "px"
                            }), g.attr({
                                text: m && m.join ? m.join("") : m
                            }), g.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + z(k.colorIndex, f.colorIndex)), h || g.attr({
                                stroke: b.borderColor || k.color || f.color || "#666666"
                            }), this.updatePosition({
                                plotX: n,
                                plotY: l,
                                negative: k.negative,
                                ttBelow: k.ttBelow,
                                h: a[2] || 0
                            });
                            else {
                                this.hide();
                                return
                            }
                        }
                        this.isHidden && this.label && this.label.attr({
                            opacity: 1
                        }).show();
                        this.isHidden = !1
                    }
                    q(this, "refresh")
                }
            };
            k.prototype.renderSplit = function (a, g) {
                function c(a, c, g, d, k) {
                    void 0 === k && (k = !0);
                    g ?
                        (c = X ? 0 : E, a = t(a - d / 2, N.left, N.right - d - (b.outside ? Q : 0))) : (c -= Z, a = k ? a - d - v : a + v, a = t(a, k ? a : N.left, N.right));
                    return {
                        x: a,
                        y: c
                    }
                }
                var b = this,
                    d = b.chart,
                    k = b.chart,
                    e = k.chartWidth,
                    m = k.chartHeight,
                    f = k.plotHeight,
                    h = k.plotLeft,
                    n = k.plotTop,
                    r = k.pointer,
                    q = k.scrollablePixelsY;
                q = void 0 === q ? 0 : q;
                var l = k.scrollablePixelsX,
                    x = k.scrollingContainer;
                x = void 0 === x ? {
                    scrollLeft: 0,
                    scrollTop: 0
                } : x;
                var w = x.scrollLeft;
                x = x.scrollTop;
                var y = k.styledMode,
                    v = b.distance,
                    F = b.options,
                    T = b.options.positioner,
                    N = b.outside && "number" !== typeof l ? G.documentElement.getBoundingClientRect() : {
                        left: w,
                        right: w + e,
                        top: x,
                        bottom: x + m
                    },
                    V = b.getLabel(),
                    W = this.renderer || d.renderer,
                    X = !(!d.xAxis[0] || !d.xAxis[0].opposite);
                d = r.getChartPosition();
                var Q = d.left;
                d = d.top;
                var Z = n + x,
                    ba = 0,
                    E = f - q;
                J(a) && (a = [!1, a]);
                a = a.slice(0, g.length + 1).reduce(function (a, d, k) {
                    if (!1 !== d && "" !== d) {
                        k = g[k - 1] || {
                            isHeader: !0,
                            plotX: g[0].plotX,
                            plotY: f,
                            series: {}
                        };
                        var e = k.isHeader,
                            m = e ? b : k.series;
                        d = d.toString();
                        var u = m.tt,
                            p = k.isHeader;
                        var A = k.series;
                        var D = "highcharts-color-" + z(k.colorIndex, A.colorIndex, "none");
                        u || (u = {
                                padding: F.padding,
                                r: F.borderRadius
                            },
                            y || (u.fill = F.backgroundColor, u["stroke-width"] = F.borderWidth), u = W.label("", 0, 0, F[p ? "headerShape" : "shape"], void 0, void 0, F.useHTML).addClass((p ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + D).attr(u).add(V));
                        u.isActive = !0;
                        u.attr({
                            text: d
                        });
                        y || u.css(F.style).shadow(F.shadow).attr({
                            stroke: F.borderColor || k.color || A.color || "#333333"
                        });
                        m = m.tt = u;
                        p = m.getBBox();
                        d = p.width + m.strokeWidth();
                        e && (ba = p.height, E += ba, X && (Z -= ba));
                        A = k.plotX;
                        A = void 0 === A ? 0 : A;
                        D = k.plotY;
                        D = void 0 === D ? 0 : D;
                        u = k.series;
                        if (k.isHeader) {
                            A =
                                h + A;
                            var r = n + f / 2
                        } else {
                            var q = u.xAxis,
                                l = u.yAxis;
                            A = q.pos + t(A, -v, q.len + v);
                            u.shouldShowTooltip(0, l.pos - n + D, {
                                ignoreX: !0
                            }) && (r = l.pos + D)
                        }
                        A = t(A, N.left - v, N.right + v);
                        "number" === typeof r ? (p = p.height + 1, D = T ? T.call(b, d, p, k) : c(A, r, e, d), a.push({
                            align: T ? 0 : void 0,
                            anchorX: A,
                            anchorY: r,
                            boxWidth: d,
                            point: k,
                            rank: z(D.rank, e ? 1 : 0),
                            size: p,
                            target: D.y,
                            tt: m,
                            x: D.x
                        })) : m.isActive = !1
                    }
                    return a
                }, []);
                !T && a.some(function (a) {
                    var c = (b.outside ? Q : 0) + a.anchorX;
                    return c < N.left && c + a.boxWidth < N.right ? !0 : c < Q - N.left + a.boxWidth && N.right - c > c
                }) && (a =
                    a.map(function (a) {
                        var b = c(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1);
                        return p(a, {
                            target: b.y,
                            x: b.x
                        })
                    }));
                b.cleanSplit();
                B(a, E);
                var C = Q,
                    P = Q;
                a.forEach(function (a) {
                    var c = a.x,
                        g = a.boxWidth;
                    a = a.isHeader;
                    a || (b.outside && Q + c < C && (C = Q + c), !a && b.outside && C + g > P && (P = Q + c))
                });
                a.forEach(function (a) {
                    var c = a.x,
                        g = a.anchorX,
                        d = a.pos,
                        k = a.point.isHeader;
                    d = {
                        visibility: "undefined" === typeof d ? "hidden" : "inherit",
                        x: c,
                        y: d + Z,
                        anchorX: g,
                        anchorY: a.anchorY
                    };
                    if (b.outside && c < g) {
                        var e = Q - C;
                        0 < e && (k || (d.x = c + e, d.anchorX = g + e), k && (d.x =
                            (P - C) / 2, d.anchorX = g + e))
                    }
                    a.tt.attr(d)
                });
                a = b.container;
                q = b.renderer;
                b.outside && a && q && (k = V.getBBox(), q.setSize(k.width + k.x, k.height + k.y, !1), a.style.left = C + "px", a.style.top = d + "px")
            };
            k.prototype.drawTracker = function () {
                if (this.followPointer || !this.options.stickOnContact) this.tracker && this.tracker.destroy();
                else {
                    var a = this.chart,
                        b = this.label,
                        c = this.shared ? a.hoverPoints : a.hoverPoint;
                    if (b && c) {
                        var d = {
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0
                        };
                        c = this.getAnchor(c);
                        var k = b.getBBox();
                        c[0] += a.plotLeft - b.translateX;
                        c[1] += a.plotTop -
                            b.translateY;
                        d.x = Math.min(0, c[0]);
                        d.y = Math.min(0, c[1]);
                        d.width = 0 > c[0] ? Math.max(Math.abs(c[0]), k.width - c[0]) : Math.max(Math.abs(c[0]), k.width);
                        d.height = 0 > c[1] ? Math.max(Math.abs(c[1]), k.height - Math.abs(c[1])) : Math.max(Math.abs(c[1]), k.height);
                        this.tracker ? this.tracker.attr(d) : (this.tracker = b.renderer.rect(d).addClass("highcharts-tracker").add(b), a.styledMode || this.tracker.attr({
                            fill: "rgba(0,0,0,0)"
                        }))
                    }
                }
            };
            k.prototype.styledModeFormat = function (a) {
                return a.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,
                    'class="highcharts-color-{$1.colorIndex}"')
            };
            k.prototype.tooltipFooterHeaderFormatter = function (a, b) {
                var c = a.series,
                    g = c.tooltipOptions,
                    d = c.xAxis,
                    k = d && d.dateTime;
                d = {
                    isFooter: b,
                    labelConfig: a
                };
                var e = g.xDateFormat,
                    m = g[b ? "footerFormat" : "headerFormat"];
                q(this, "headerFormatter", d, function (b) {
                    k && !e && n(a.key) && (e = k.getXDateFormat(a.key, g.dateTimeLabelFormats));
                    k && e && (a.point && a.point.tooltipDateKeys || ["key"]).forEach(function (a) {
                        m = m.replace("{point." + a + "}", "{point." + a + ":" + e + "}")
                    });
                    c.chart.styledMode && (m = this.styledModeFormat(m));
                    b.text = E(m, {
                        point: a,
                        series: c
                    }, this.chart)
                });
                return d.text
            };
            k.prototype.update = function (a) {
                this.destroy();
                w(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, w(!0, this.options, a))
            };
            k.prototype.updatePosition = function (a) {
                var b = this.chart,
                    c = this.options,
                    d = b.pointer,
                    k = this.getLabel();
                d = d.getChartPosition();
                var e = (c.positioner || this.getPosition).call(this, k.width, k.height, a),
                    m = a.plotX + b.plotLeft;
                a = a.plotY + b.plotTop;
                if (this.outside) {
                    c = c.borderWidth + 2 * this.distance;
                    this.renderer.setSize(k.width +
                        c, k.height + c, !1);
                    if (1 !== d.scaleX || 1 !== d.scaleY) h(this.container, {
                        transform: "scale(".concat(d.scaleX, ", ").concat(d.scaleY, ")")
                    }), m *= d.scaleX, a *= d.scaleY;
                    m += d.left - e.x;
                    a += d.top - e.y
                }
                this.move(Math.round(e.x), Math.round(e.y || 0), m, a)
            };
            return k
        }();
        "";
        return f
    });
    K(l, "Core/Series/Point.js", [l["Core/Renderer/HTML/AST.js"], l["Core/Animation/AnimationUtilities.js"], l["Core/DefaultOptions.js"], l["Core/FormatUtilities.js"], l["Core/Utilities.js"]], function (f, e, l, C, v) {
        var E = e.animObject,
            G = l.defaultOptions,
            B = C.format,
            y = v.addEvent,
            t = v.defined,
            h = v.erase,
            d = v.extend,
            b = v.fireEvent,
            p = v.getNestedProperty,
            q = v.isArray,
            r = v.isFunction,
            n = v.isNumber,
            J = v.isObject,
            w = v.merge,
            z = v.objectEach,
            x = v.pick,
            m = v.syncTimeout,
            k = v.removeEvent,
            a = v.uniqueKey;
        e = function () {
            function g() {
                this.colorIndex = this.category = void 0;
                this.formatPrefix = "point";
                this.id = void 0;
                this.isNull = !1;
                this.percentage = this.options = this.name = void 0;
                this.selected = !1;
                this.total = this.shapeArgs = this.series = void 0;
                this.visible = !0;
                this.x = void 0
            }
            g.prototype.animateBeforeDestroy =
                function () {
                    var a = this,
                        b = {
                            x: a.startXPos,
                            opacity: 0
                        },
                        g = a.getGraphicalProps();
                    g.singular.forEach(function (c) {
                        a[c] = a[c].animate("dataLabel" === c ? {
                            x: a[c].startXPos,
                            y: a[c].startYPos,
                            opacity: 0
                        } : b)
                    });
                    g.plural.forEach(function (c) {
                        a[c].forEach(function (c) {
                            c.element && c.animate(d({
                                x: a.startXPos
                            }, c.startYPos ? {
                                x: c.startXPos,
                                y: c.startYPos
                            } : {}))
                        })
                    })
                };
            g.prototype.applyOptions = function (a, b) {
                var c = this.series,
                    k = c.options.pointValKey || c.pointValKey;
                a = g.prototype.optionsToObject.call(this, a);
                d(this, a);
                this.options = this.options ?
                    d(this.options, a) : a;
                a.group && delete this.group;
                a.dataLabels && delete this.dataLabels;
                k && (this.y = g.prototype.getNestedProperty.call(this, k));
                this.formatPrefix = (this.isNull = x(this.isValid && !this.isValid(), null === this.x || !n(this.y))) ? "null" : "point";
                this.selected && (this.state = "select");
                "name" in this && "undefined" === typeof b && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this));
                "undefined" === typeof this.x && c ? this.x = "undefined" === typeof b ? c.autoIncrement() : b : n(a.x) && c.options.relativeXValue && (this.x =
                    c.autoIncrement(a.x));
                return this
            };
            g.prototype.destroy = function () {
                function a() {
                    if (b.graphic || b.dataLabel || b.dataLabels) k(b), b.destroyElements();
                    for (p in b) b[p] = null
                }
                var b = this,
                    g = b.series,
                    d = g.chart;
                g = g.options.dataSorting;
                var e = d.hoverPoints,
                    f = E(b.series.chart.renderer.globalAnimation),
                    p;
                b.legendItem && d.legend.destroyItem(b);
                e && (b.setState(), h(e, b), e.length || (d.hoverPoints = null));
                if (b === d.hoverPoint) b.onMouseOut();
                g && g.enabled ? (this.animateBeforeDestroy(), m(a, f.duration)) : a();
                d.pointCount--
            };
            g.prototype.destroyElements =
                function (a) {
                    var c = this;
                    a = c.getGraphicalProps(a);
                    a.singular.forEach(function (a) {
                        c[a] = c[a].destroy()
                    });
                    a.plural.forEach(function (a) {
                        c[a].forEach(function (a) {
                            a.element && a.destroy()
                        });
                        delete c[a]
                    })
                };
            g.prototype.firePointEvent = function (a, g, d) {
                var c = this,
                    k = this.series.options;
                (k.point.events[a] || c.options && c.options.events && c.options.events[a]) && c.importEvents();
                "click" === a && k.allowPointSelect && (d = function (a) {
                    c.select && c.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                b(c, a, g, d)
            };
            g.prototype.getClassName =
                function () {
                    return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                };
            g.prototype.getGraphicalProps = function (a) {
                var c = this,
                    b = [],
                    g = {
                        singular: [],
                        plural: []
                    },
                    d;
                a = a || {
                    graphic: 1,
                    dataLabel: 1
                };
                a.graphic && b.push("graphic", "upperGraphic", "shadowGroup");
                a.dataLabel && b.push("dataLabel", "dataLabelUpper", "connector");
                for (d = b.length; d--;) {
                    var k = b[d];
                    c[k] && g.singular.push(k)
                } ["dataLabel", "connector"].forEach(function (b) {
                    var d = b + "s";
                    a[b] && c[d] && g.plural.push(d)
                });
                return g
            };
            g.prototype.getLabelConfig = function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            };
            g.prototype.getNestedProperty = function (a) {
                if (a) return 0 === a.indexOf("custom.") ? p(a, this.options) : this[a]
            };
            g.prototype.getZone = function () {
                var a = this.series,
                    b = a.zones;
                a = a.zoneAxis || "y";
                var g, d = 0;
                for (g = b[d]; this[a] >= g.value;) g = b[++d];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = g && g.color && !this.options.color ? g.color : this.nonZonedColor;
                return g
            };
            g.prototype.hasNewShapeType = function () {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            };
            g.prototype.init =
                function (c, g, d) {
                    this.series = c;
                    this.applyOptions(g, d);
                    this.id = t(this.id) ? this.id : a();
                    this.resolveColor();
                    c.chart.pointCount++;
                    b(this, "afterInit");
                    return this
                };
            g.prototype.optionsToObject = function (a) {
                var c = this.series,
                    b = c.options.keys,
                    d = b || c.pointArrayMap || ["y"],
                    k = d.length,
                    e = {},
                    m = 0,
                    f = 0;
                if (n(a) || null === a) e[d[0]] = a;
                else if (q(a))
                    for (!b && a.length > k && (c = typeof a[0], "string" === c ? e.name = a[0] : "number" === c && (e.x = a[0]), m++); f < k;) b && "undefined" === typeof a[m] || (0 < d[f].indexOf(".") ? g.prototype.setNestedProperty(e,
                        a[m], d[f]) : e[d[f]] = a[m]), m++, f++;
                else "object" === typeof a && (e = a, a.dataLabels && (c._hasPointLabels = !0), a.marker && (c._hasPointMarkers = !0));
                return e
            };
            g.prototype.resolveColor = function () {
                var a = this.series,
                    b = a.chart.styledMode;
                var g = a.chart.options.chart.colorCount;
                delete this.nonZonedColor;
                if (a.options.colorByPoint) {
                    if (!b) {
                        g = a.options.colors || a.chart.options.colors;
                        var d = g[a.colorCounter];
                        g = g.length
                    }
                    b = a.colorCounter;
                    a.colorCounter++;
                    a.colorCounter === g && (a.colorCounter = 0)
                } else b || (d = a.color), b = a.colorIndex;
                this.colorIndex = x(this.options.colorIndex, b);
                this.color = x(this.options.color, d)
            };
            g.prototype.setNestedProperty = function (a, b, g) {
                g.split(".").reduce(function (a, c, g, d) {
                    a[c] = d.length - 1 === g ? b : J(a[c], !0) ? a[c] : {};
                    return a[c]
                }, a);
                return a
            };
            g.prototype.tooltipFormatter = function (a) {
                var c = this.series,
                    b = c.tooltipOptions,
                    g = x(b.valueDecimals, ""),
                    d = b.valuePrefix || "",
                    k = b.valueSuffix || "";
                c.chart.styledMode && (a = c.chart.tooltip.styledModeFormat(a));
                (c.pointArrayMap || ["y"]).forEach(function (c) {
                    c = "{point." + c;
                    if (d || k) a =
                        a.replace(RegExp(c + "}", "g"), d + c + "}" + k);
                    a = a.replace(RegExp(c + "}", "g"), c + ":,." + g + "f}")
                });
                return B(a, {
                    point: this,
                    series: this.series
                }, c.chart)
            };
            g.prototype.update = function (a, b, g, d) {
                function c() {
                    k.applyOptions(a);
                    var c = m && k.hasDummyGraphic;
                    c = null === k.y ? !c : c;
                    m && c && (k.graphic = m.destroy(), delete k.hasDummyGraphic);
                    J(a, !0) && (m && m.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (k.graphic = m.destroy()), a && a.dataLabels && k.dataLabel && (k.dataLabel = k.dataLabel.destroy()), k.connector && (k.connector = k.connector.destroy()));
                    p = k.index;
                    e.updateParallelArrays(k, p);
                    h.data[p] = J(h.data[p], !0) || J(a, !0) ? k.options : x(a, h.data[p]);
                    e.isDirty = e.isDirtyData = !0;
                    !e.fixedBox && e.hasCartesianSeries && (f.isDirtyBox = !0);
                    "point" === h.legendType && (f.isDirtyLegend = !0);
                    b && f.redraw(g)
                }
                var k = this,
                    e = k.series,
                    m = k.graphic,
                    f = e.chart,
                    h = e.options,
                    p;
                b = x(b, !0);
                !1 === d ? c() : k.firePointEvent("update", {
                    options: a
                }, c)
            };
            g.prototype.remove = function (a, b) {
                this.series.removePoint(this.series.data.indexOf(this), a, b)
            };
            g.prototype.select = function (a, b) {
                var c = this,
                    g = c.series,
                    d = g.chart;
                this.selectedStaging = a = x(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function () {
                    c.selected = c.options.selected = a;
                    g.options.data[g.data.indexOf(c)] = c.options;
                    c.setState(a && "select");
                    b || d.getSelectedPoints().forEach(function (a) {
                        var b = a.series;
                        a.selected && a !== c && (a.selected = a.options.selected = !1, b.options.data[b.data.indexOf(a)] = a.options, a.setState(d.hoverPoints && b.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                });
                delete this.selectedStaging
            };
            g.prototype.onMouseOver = function (a) {
                var c = this.series.chart,
                    b = c.pointer;
                a = a ? b.normalize(a) : b.getChartCoordinatesFromPoint(this, c.inverted);
                b.runPointActions(a, this)
            };
            g.prototype.onMouseOut = function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            };
            g.prototype.importEvents = function () {
                if (!this.hasImportedEvents) {
                    var a = this,
                        b = w(a.series.options.point, a.options).events;
                    a.events = b;
                    z(b, function (c, b) {
                        r(c) && y(a, b, c)
                    });
                    this.hasImportedEvents = !0
                }
            };
            g.prototype.setState = function (a, g) {
                var c = this.series,
                    k = this.state,
                    e = c.options.states[a || "normal"] || {},
                    m = G.plotOptions[c.type].marker && c.options.marker,
                    h = m && !1 === m.enabled,
                    p = m && m.states && m.states[a || "normal"] || {},
                    r = !1 === p.enabled,
                    q = this.marker || {},
                    l = c.chart,
                    D = m && c.markerAttribs,
                    t = c.halo,
                    z, w = c.stateMarkerGraphic;
                a = a || "";
                if (!(a === this.state && !g || this.selected && "select" !== a || !1 === e.enabled || a && (r || h && !1 === p.enabled) || a && q.states &&
                        q.states[a] && !1 === q.states[a].enabled)) {
                    this.state = a;
                    D && (z = c.markerAttribs(this, a));
                    if (this.graphic && !this.hasDummyGraphic) {
                        k && this.graphic.removeClass("highcharts-point-" + k);
                        a && this.graphic.addClass("highcharts-point-" + a);
                        if (!l.styledMode) {
                            var y = c.pointAttribs(this, a);
                            var F = x(l.options.chart.animation, e.animation);
                            c.options.inactiveOtherPoints && n(y.opacity) && ((this.dataLabels || []).forEach(function (a) {
                                a && a.animate({
                                    opacity: y.opacity
                                }, F)
                            }), this.connector && this.connector.animate({
                                    opacity: y.opacity
                                },
                                F));
                            this.graphic.animate(y, F)
                        }
                        z && this.graphic.animate(z, x(l.options.chart.animation, p.animation, m.animation));
                        w && w.hide()
                    } else {
                        if (a && p) {
                            k = q.symbol || c.symbol;
                            w && w.currentSymbol !== k && (w = w.destroy());
                            if (z)
                                if (w) w[g ? "animate" : "attr"]({
                                    x: z.x,
                                    y: z.y
                                });
                                else k && (c.stateMarkerGraphic = w = l.renderer.symbol(k, z.x, z.y, z.width, z.height).add(c.markerGroup), w.currentSymbol = k);
                            !l.styledMode && w && "inactive" !== this.state && w.attr(c.pointAttribs(this, a))
                        }
                        w && (w[a && this.isInside ? "show" : "hide"](), w.element.point = this, w.addClass(this.getClassName(),
                            !0))
                    }
                    e = e.halo;
                    z = (w = this.graphic || w) && w.visibility || "inherit";
                    e && e.size && w && "hidden" !== z && !this.isCluster ? (t || (c.halo = t = l.renderer.path().add(w.parentGroup)), t.show()[g ? "animate" : "attr"]({
                            d: this.haloPath(e.size)
                        }), t.attr({
                            "class": "highcharts-halo highcharts-color-" + x(this.colorIndex, c.colorIndex) + (this.className ? " " + this.className : ""),
                            visibility: z,
                            zIndex: -1
                        }), t.point = this, l.styledMode || t.attr(d({
                            fill: this.color || c.color,
                            "fill-opacity": e.opacity
                        }, f.filterUserAttributes(e.attributes || {})))) : t && t.point &&
                        t.point.haloPath && t.animate({
                            d: t.point.haloPath(0)
                        }, null, t.hide);
                    b(this, "afterSetState", {
                        state: a
                    })
                }
            };
            g.prototype.haloPath = function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            };
            return g
        }();
        "";
        return e
    });
    K(l, "Core/Pointer.js", [l["Core/Color/Color.js"], l["Core/Globals.js"], l["Core/Tooltip.js"], l["Core/Utilities.js"]], function (f, e, l, C) {
        var v = f.parse,
            E = e.charts,
            G = e.noop,
            B = C.addEvent,
            y = C.attr,
            t = C.css,
            h = C.defined,
            d = C.extend,
            b = C.find,
            p = C.fireEvent,
            q =
            C.isNumber,
            r = C.isObject,
            n = C.objectEach,
            J = C.offset,
            w = C.pick,
            z = C.splat;
        f = function () {
            function f(b, d) {
                this.lastValidTouch = {};
                this.pinchDown = [];
                this.runChartClick = !1;
                this.eventsToUnbind = [];
                this.chart = b;
                this.hasDragged = !1;
                this.options = d;
                this.init(b, d)
            }
            f.prototype.applyInactiveState = function (b) {
                var d = [],
                    a;
                (b || []).forEach(function (b) {
                    a = b.series;
                    d.push(a);
                    a.linkedParent && d.push(a.linkedParent);
                    a.linkedSeries && (d = d.concat(a.linkedSeries));
                    a.navigatorSeries && d.push(a.navigatorSeries)
                });
                this.chart.series.forEach(function (a) {
                    -1 ===
                        d.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive")
                })
            };
            f.prototype.destroy = function () {
                var b = this;
                this.eventsToUnbind.forEach(function (b) {
                    return b()
                });
                this.eventsToUnbind = [];
                e.chartCount || (f.unbindDocumentMouseUp && (f.unbindDocumentMouseUp = f.unbindDocumentMouseUp()), f.unbindDocumentTouchEnd && (f.unbindDocumentTouchEnd = f.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                n(b, function (d, a) {
                    b[a] = void 0
                })
            };
            f.prototype.drag = function (b) {
                var d = this.chart,
                    a = d.options.chart,
                    g = this.zoomHor,
                    c = this.zoomVert,
                    e = d.plotLeft,
                    m = d.plotTop,
                    f = d.plotWidth,
                    h = d.plotHeight,
                    p = this.mouseDownX || 0,
                    n = this.mouseDownY || 0,
                    q = r(a.panning) ? a.panning && a.panning.enabled : a.panning,
                    l = a.panKey && b[a.panKey + "Key"],
                    t = b.chartX,
                    z = b.chartY,
                    w = this.selectionMarker;
                if (!w || !w.touch)
                    if (t < e ? t = e : t > e + f && (t = e + f), z < m ? z = m : z > m + h && (z = m + h), this.hasDragged = Math.sqrt(Math.pow(p - t, 2) + Math.pow(n - z, 2)), 10 < this.hasDragged) {
                        var x = d.isInsidePlot(p - e, n - m, {
                            visiblePlotOnly: !0
                        });
                        !d.hasCartesianSeries && !d.mapView ||
                            !this.zoomX && !this.zoomY || !x || l || w || (this.selectionMarker = w = d.renderer.rect(e, m, g ? 1 : f, c ? 1 : h, 0).attr({
                                "class": "highcharts-selection-marker",
                                zIndex: 7
                            }).add(), d.styledMode || w.attr({
                                fill: a.selectionMarkerFill || v("#335cad").setOpacity(.25).get()
                            }));
                        w && g && (g = t - p, w.attr({
                            width: Math.abs(g),
                            x: (0 < g ? 0 : g) + p
                        }));
                        w && c && (g = z - n, w.attr({
                            height: Math.abs(g),
                            y: (0 < g ? 0 : g) + n
                        }));
                        x && !w && q && d.pan(b, a.panning)
                    }
            };
            f.prototype.dragStart = function (b) {
                var d = this.chart;
                d.mouseIsDown = b.type;
                d.cancelClick = !1;
                d.mouseDownX = this.mouseDownX =
                    b.chartX;
                d.mouseDownY = this.mouseDownY = b.chartY
            };
            f.prototype.drop = function (b) {
                var k = this,
                    a = this.chart,
                    g = this.hasPinched;
                if (this.selectionMarker) {
                    var c = this.selectionMarker,
                        e = c.attr ? c.attr("x") : c.x,
                        m = c.attr ? c.attr("y") : c.y,
                        f = c.attr ? c.attr("width") : c.width,
                        n = c.attr ? c.attr("height") : c.height,
                        r = {
                            originalEvent: b,
                            xAxis: [],
                            yAxis: [],
                            x: e,
                            y: m,
                            width: f,
                            height: n
                        },
                        l = !!a.mapView;
                    if (this.hasDragged || g) a.axes.forEach(function (a) {
                        if (a.zoomEnabled && h(a.min) && (g || k[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            } [a.coll]]) && q(e) && q(m)) {
                            var c =
                                a.horiz,
                                d = "touchend" === b.type ? a.minPixelPadding : 0,
                                p = a.toValue((c ? e : m) + d);
                            c = a.toValue((c ? e + f : m + n) - d);
                            r[a.coll].push({
                                axis: a,
                                min: Math.min(p, c),
                                max: Math.max(p, c)
                            });
                            l = !0
                        }
                    }), l && p(a, "selection", r, function (c) {
                        a.zoom(d(c, g ? {
                            animation: !1
                        } : null))
                    });
                    q(a.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    g && this.scaleGroups()
                }
                a && q(a.index) && (t(a.container, {
                    cursor: a._cursor
                }), a.cancelClick = 10 < this.hasDragged, a.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            };
            f.prototype.findNearestKDPoint =
                function (b, d, a) {
                    var g = this.chart,
                        c = g.hoverPoint;
                    g = g.tooltip;
                    if (c && g && g.isStickyOnContact()) return c;
                    var k;
                    b.forEach(function (c) {
                        var b = !(c.noSharedTooltip && d) && 0 > c.options.findNearestPointBy.indexOf("y");
                        c = c.searchPoint(a, b);
                        if ((b = r(c, !0) && c.series) && !(b = !r(k, !0))) {
                            b = k.distX - c.distX;
                            var g = k.dist - c.dist,
                                e = (c.series.group && c.series.group.zIndex) - (k.series.group && k.series.group.zIndex);
                            b = 0 < (0 !== b && d ? b : 0 !== g ? g : 0 !== e ? e : k.series.index > c.series.index ? -1 : 1)
                        }
                        b && (k = c)
                    });
                    return k
                };
            f.prototype.getChartCoordinatesFromPoint =
                function (b, d) {
                    var a = b.series,
                        g = a.xAxis;
                    a = a.yAxis;
                    var c = b.shapeArgs;
                    if (g && a) {
                        var k = w(b.clientX, b.plotX),
                            e = b.plotY || 0;
                        b.isNode && c && q(c.x) && q(c.y) && (k = c.x, e = c.y);
                        return d ? {
                            chartX: a.len + a.pos - e,
                            chartY: g.len + g.pos - k
                        } : {
                            chartX: k + g.pos,
                            chartY: e + a.pos
                        }
                    }
                    if (c && c.x && c.y) return {
                        chartX: c.x,
                        chartY: c.y
                    }
                };
            f.prototype.getChartPosition = function () {
                if (this.chartPosition) return this.chartPosition;
                var b = this.chart.container,
                    d = J(b);
                this.chartPosition = {
                    left: d.left,
                    top: d.top,
                    scaleX: 1,
                    scaleY: 1
                };
                var a = b.offsetWidth;
                b = b.offsetHeight;
                2 < a && 2 < b && (this.chartPosition.scaleX = d.width / a, this.chartPosition.scaleY = d.height / b);
                return this.chartPosition
            };
            f.prototype.getCoordinates = function (b) {
                var d = {
                    xAxis: [],
                    yAxis: []
                };
                this.chart.axes.forEach(function (a) {
                    d[a.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: a,
                        value: a.toValue(b[a.horiz ? "chartX" : "chartY"])
                    })
                });
                return d
            };
            f.prototype.getHoverData = function (d, k, a, g, c, e) {
                var f = [];
                g = !(!g || !d);
                var m = {
                    chartX: e ? e.chartX : void 0,
                    chartY: e ? e.chartY : void 0,
                    shared: c
                };
                p(this, "beforeGetHoverData", m);
                var h = k && !k.stickyTracking ? [k] : a.filter(function (a) {
                    return m.filter ? m.filter(a) : a.visible && !(!c && a.directTouch) && w(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                var n = g || !e ? d : this.findNearestKDPoint(h, c, e);
                k = n && n.series;
                n && (c && !k.noSharedTooltip ? (h = a.filter(function (a) {
                        return m.filter ? m.filter(a) : a.visible && !(!c && a.directTouch) && w(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                    }), h.forEach(function (a) {
                        var c = b(a.points, function (a) {
                            return a.x === n.x && !a.isNull
                        });
                        r(c) && (a.chart.isBoosting && (c = a.getPoint(c)), f.push(c))
                    })) :
                    f.push(n));
                m = {
                    hoverPoint: n
                };
                p(this, "afterGetHoverData", m);
                return {
                    hoverPoint: m.hoverPoint,
                    hoverSeries: k,
                    hoverPoints: f
                }
            };
            f.prototype.getPointFromEvent = function (b) {
                b = b.target;
                for (var d; b && !d;) d = b.point, b = b.parentNode;
                return d
            };
            f.prototype.onTrackerMouseOut = function (b) {
                b = b.relatedTarget || b.toElement;
                var d = this.chart.hoverSeries;
                this.isDirectTouch = !1;
                if (!(!d || !b || d.stickyTracking || this.inClass(b, "highcharts-tooltip") || this.inClass(b, "highcharts-series-" + d.index) && this.inClass(b, "highcharts-tracker"))) d.onMouseOut()
            };
            f.prototype.inClass = function (b, d) {
                for (var a; b;) {
                    if (a = y(b, "class")) {
                        if (-1 !== a.indexOf(d)) return !0;
                        if (-1 !== a.indexOf("highcharts-container")) return !1
                    }
                    b = b.parentElement
                }
            };
            f.prototype.init = function (b, d) {
                this.options = d;
                this.chart = b;
                this.runChartClick = !(!d.chart.events || !d.chart.events.click);
                this.pinchDown = [];
                this.lastValidTouch = {};
                l && (b.tooltip = new l(b, d.tooltip), this.followTouchMove = w(d.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            };
            f.prototype.normalize = function (b, e) {
                var a = b.touches,
                    g = a ? a.length ?
                    a.item(0) : w(a.changedTouches, b.changedTouches)[0] : b;
                e || (e = this.getChartPosition());
                a = g.pageX - e.left;
                g = g.pageY - e.top;
                a /= e.scaleX;
                g /= e.scaleY;
                return d(b, {
                    chartX: Math.round(a),
                    chartY: Math.round(g)
                })
            };
            f.prototype.onContainerClick = function (b) {
                var e = this.chart,
                    a = e.hoverPoint;
                b = this.normalize(b);
                var g = e.plotLeft,
                    c = e.plotTop;
                e.cancelClick || (a && this.inClass(b.target, "highcharts-tracker") ? (p(a.series, "click", d(b, {
                    point: a
                })), e.hoverPoint && a.firePointEvent("click", b)) : (d(b, this.getCoordinates(b)), e.isInsidePlot(b.chartX -
                    g, b.chartY - c, {
                        visiblePlotOnly: !0
                    }) && p(e, "click", b)))
            };
            f.prototype.onContainerMouseDown = function (b) {
                var d = 1 === ((b.buttons || b.button) & 1);
                b = this.normalize(b);
                if (e.isFirefox && 0 !== b.button) this.onContainerMouseMove(b);
                if ("undefined" === typeof b.button || d) this.zoomOption(b), d && b.preventDefault && b.preventDefault(), this.dragStart(b)
            };
            f.prototype.onContainerMouseLeave = function (b) {
                var d = E[w(f.hoverChartIndex, -1)],
                    a = this.chart.tooltip;
                a && a.shouldStickOnContact() && this.inClass(b.relatedTarget, "highcharts-tooltip-container") ||
                    (b = this.normalize(b), d && (b.relatedTarget || b.toElement) && (d.pointer.reset(), d.pointer.chartPosition = void 0), a && !a.isHidden && this.reset())
            };
            f.prototype.onContainerMouseEnter = function (b) {
                delete this.chartPosition
            };
            f.prototype.onContainerMouseMove = function (b) {
                var d = this.chart;
                b = this.normalize(b);
                this.setHoverChartIndex();
                b.preventDefault || (b.returnValue = !1);
                ("mousedown" === d.mouseIsDown || this.touchSelect(b)) && this.drag(b);
                d.openMenu || !this.inClass(b.target, "highcharts-tracker") && !d.isInsidePlot(b.chartX -
                    d.plotLeft, b.chartY - d.plotTop, {
                        visiblePlotOnly: !0
                    }) || (this.inClass(b.target, "highcharts-no-tooltip") ? this.reset(!1, 0) : this.runPointActions(b))
            };
            f.prototype.onDocumentTouchEnd = function (b) {
                var d = E[w(f.hoverChartIndex, -1)];
                d && d.pointer.drop(b)
            };
            f.prototype.onContainerTouchMove = function (b) {
                if (this.touchSelect(b)) this.onContainerMouseMove(b);
                else this.touch(b)
            };
            f.prototype.onContainerTouchStart = function (b) {
                if (this.touchSelect(b)) this.onContainerMouseDown(b);
                else this.zoomOption(b), this.touch(b, !0)
            };
            f.prototype.onDocumentMouseMove =
                function (b) {
                    var d = this.chart,
                        a = this.chartPosition;
                    b = this.normalize(b, a);
                    var g = d.tooltip;
                    !a || g && g.isStickyOnContact() || d.isInsidePlot(b.chartX - d.plotLeft, b.chartY - d.plotTop, {
                        visiblePlotOnly: !0
                    }) || this.inClass(b.target, "highcharts-tracker") || this.reset()
                };
            f.prototype.onDocumentMouseUp = function (b) {
                var d = E[w(f.hoverChartIndex, -1)];
                d && d.pointer.drop(b)
            };
            f.prototype.pinch = function (b) {
                var e = this,
                    a = e.chart,
                    g = e.pinchDown,
                    c = b.touches || [],
                    f = c.length,
                    h = e.lastValidTouch,
                    m = e.hasZoom,
                    n = {},
                    r = 1 === f && (e.inClass(b.target,
                        "highcharts-tracker") && a.runTrackerClick || e.runChartClick),
                    q = {},
                    l = e.selectionMarker;
                1 < f ? e.initiated = !0 : 1 === f && this.followTouchMove && (e.initiated = !1);
                m && e.initiated && !r && !1 !== b.cancelable && b.preventDefault();
                [].map.call(c, function (a) {
                    return e.normalize(a)
                });
                "touchstart" === b.type ? ([].forEach.call(c, function (a, c) {
                    g[c] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), h.x = [g[0].chartX, g[1] && g[1].chartX], h.y = [g[0].chartY, g[1] && g[1].chartY], a.axes.forEach(function (c) {
                    if (c.zoomEnabled) {
                        var b = a.bounds[c.horiz ? "h" : "v"],
                            d = c.minPixelPadding,
                            g = c.toPixels(Math.min(w(c.options.min, c.dataMin), c.dataMin)),
                            e = c.toPixels(Math.max(w(c.options.max, c.dataMax), c.dataMax)),
                            k = Math.max(g, e);
                        b.min = Math.min(c.pos, Math.min(g, e) - d);
                        b.max = Math.max(c.pos + c.len, k + d)
                    }
                }), e.res = !0) : e.followTouchMove && 1 === f ? this.runPointActions(e.normalize(b)) : g.length && (p(a, "touchpan", {
                    originalEvent: b
                }, function () {
                    l || (e.selectionMarker = l = d({
                        destroy: G,
                        touch: !0
                    }, a.plotBox));
                    e.pinchTranslate(g, c, n, l, q, h);
                    e.hasPinched = m;
                    e.scaleGroups(n, q)
                }), e.res && (e.res = !1, this.reset(!1,
                    0)))
            };
            f.prototype.pinchTranslate = function (b, d, a, g, c, e) {
                this.zoomHor && this.pinchTranslateDirection(!0, b, d, a, g, c, e);
                this.zoomVert && this.pinchTranslateDirection(!1, b, d, a, g, c, e)
            };
            f.prototype.pinchTranslateDirection = function (b, d, a, g, c, e, f, h) {
                var k = this.chart,
                    m = b ? "x" : "y",
                    p = b ? "X" : "Y",
                    n = "chart" + p,
                    u = b ? "width" : "height",
                    r = k["plot" + (b ? "Left" : "Top")],
                    q = k.inverted,
                    l = k.bounds[b ? "h" : "v"],
                    t = 1 === d.length,
                    A = d[0][n],
                    D = !t && d[1][n];
                d = function () {
                    "number" === typeof x && 20 < Math.abs(A - D) && (w = h || Math.abs(N - x) / Math.abs(A - D));
                    F = (r - N) / w + A;
                    z = k["plot" + (b ? "Width" : "Height")] / w
                };
                var z, F, w = h || 1,
                    N = a[0][n],
                    x = !t && a[1][n];
                d();
                a = F;
                if (a < l.min) {
                    a = l.min;
                    var y = !0
                } else a + z > l.max && (a = l.max - z, y = !0);
                y ? (N -= .8 * (N - f[m][0]), "number" === typeof x && (x -= .8 * (x - f[m][1])), d()) : f[m] = [N, x];
                q || (e[m] = F - r, e[u] = z);
                e = q ? 1 / w : w;
                c[u] = z;
                c[m] = a;
                g[q ? b ? "scaleY" : "scaleX" : "scale" + p] = w;
                g["translate" + p] = e * r + (N - e * A)
            };
            f.prototype.reset = function (b, d) {
                var a = this.chart,
                    g = a.hoverSeries,
                    c = a.hoverPoint,
                    e = a.hoverPoints,
                    k = a.tooltip,
                    f = k && k.shared ? e : c;
                b && f && z(f).forEach(function (a) {
                    a.series.isCartesian &&
                        "undefined" === typeof a.plotX && (b = !1)
                });
                if (b) k && f && z(f).length && (k.refresh(f), k.shared && e ? e.forEach(function (a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair && a.series.yAxis.drawCrosshair(null, a))
                }) : c && (c.setState(c.state, !0), a.axes.forEach(function (a) {
                    a.crosshair && c.series[a.coll] === a && a.drawCrosshair(null, c)
                })));
                else {
                    if (c) c.onMouseOut();
                    e && e.forEach(function (a) {
                        a.setState()
                    });
                    if (g) g.onMouseOut();
                    k && k.hide(d);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    a.axes.forEach(function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = a.hoverPoints = a.hoverPoint = null
                }
            };
            f.prototype.runPointActions = function (d, e) {
                var a = this.chart,
                    g = a.tooltip && a.tooltip.options.enabled ? a.tooltip : void 0,
                    c = g ? g.shared : !1,
                    k = e || a.hoverPoint,
                    h = k && k.series || a.hoverSeries;
                e = this.getHoverData(k, h, a.series, (!d || "touchmove" !== d.type) && (!!e || h && h.directTouch && this.isDirectTouch), c, d);
                k = e.hoverPoint;
                h = e.hoverSeries;
                var m = e.hoverPoints;
                e = h &&
                    h.tooltipOptions.followPointer && !h.tooltipOptions.split;
                var p = c && h && !h.noSharedTooltip;
                if (k && (k !== a.hoverPoint || g && g.isHidden)) {
                    (a.hoverPoints || []).forEach(function (a) {
                        -1 === m.indexOf(a) && a.setState()
                    });
                    if (a.hoverSeries !== h) h.onMouseOver();
                    this.applyInactiveState(m);
                    (m || []).forEach(function (a) {
                        a.setState("hover")
                    });
                    a.hoverPoint && a.hoverPoint.firePointEvent("mouseOut");
                    if (!k.series) return;
                    a.hoverPoints = m;
                    a.hoverPoint = k;
                    k.firePointEvent("mouseOver", void 0, function () {
                        g && k && g.refresh(p ? m : k, d)
                    })
                } else e &&
                    g && !g.isHidden && (c = g.getAnchor([{}], d), a.isInsidePlot(c[0], c[1], {
                        visiblePlotOnly: !0
                    }) && g.updatePosition({
                        plotX: c[0],
                        plotY: c[1]
                    }));
                this.unDocMouseMove || (this.unDocMouseMove = B(a.container.ownerDocument, "mousemove", function (a) {
                    var c = E[f.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(a)
                }), this.eventsToUnbind.push(this.unDocMouseMove));
                a.axes.forEach(function (c) {
                    var g = w((c.crosshair || {}).snap, !0),
                        e;
                    g && ((e = a.hoverPoint) && e.series[c.coll] === c || (e = b(m, function (a) {
                        return a.series && a.series[c.coll] ===
                            c
                    })));
                    e || !g ? c.drawCrosshair(d, e) : c.hideCrosshair()
                })
            };
            f.prototype.scaleGroups = function (b, d) {
                var a = this.chart;
                a.series.forEach(function (g) {
                    var c = b || g.getPlotBox();
                    g.group && (g.xAxis && g.xAxis.zoomEnabled || a.mapView) && (g.group.attr(c), g.markerGroup && (g.markerGroup.attr(c), g.markerGroup.clip(d ? a.clipRect : null)), g.dataLabelsGroup && g.dataLabelsGroup.attr(c))
                });
                a.clipRect.attr(d || a.clipBox)
            };
            f.prototype.setDOMEvents = function () {
                var b = this,
                    d = this.chart.container,
                    a = d.ownerDocument;
                d.onmousedown = this.onContainerMouseDown.bind(this);
                d.onmousemove = this.onContainerMouseMove.bind(this);
                d.onclick = this.onContainerClick.bind(this);
                this.eventsToUnbind.push(B(d, "mouseenter", this.onContainerMouseEnter.bind(this)));
                this.eventsToUnbind.push(B(d, "mouseleave", this.onContainerMouseLeave.bind(this)));
                f.unbindDocumentMouseUp || (f.unbindDocumentMouseUp = B(a, "mouseup", this.onDocumentMouseUp.bind(this)));
                for (var g = this.chart.renderTo.parentElement; g && "BODY" !== g.tagName;) this.eventsToUnbind.push(B(g, "scroll", function () {
                        delete b.chartPosition
                    })), g =
                    g.parentElement;
                e.hasTouch && (this.eventsToUnbind.push(B(d, "touchstart", this.onContainerTouchStart.bind(this), {
                    passive: !1
                })), this.eventsToUnbind.push(B(d, "touchmove", this.onContainerTouchMove.bind(this), {
                    passive: !1
                })), f.unbindDocumentTouchEnd || (f.unbindDocumentTouchEnd = B(a, "touchend", this.onDocumentTouchEnd.bind(this), {
                    passive: !1
                })))
            };
            f.prototype.setHoverChartIndex = function () {
                var b = this.chart,
                    d = e.charts[w(f.hoverChartIndex, -1)];
                if (d && d !== b) d.pointer.onContainerMouseLeave({
                    relatedTarget: b.container
                });
                d && d.mouseIsDown || (f.hoverChartIndex = b.index)
            };
            f.prototype.touch = function (b, d) {
                var a = this.chart,
                    g;
                this.setHoverChartIndex();
                if (1 === b.touches.length)
                    if (b = this.normalize(b), (g = a.isInsidePlot(b.chartX - a.plotLeft, b.chartY - a.plotTop, {
                            visiblePlotOnly: !0
                        })) && !a.openMenu) {
                        d && this.runPointActions(b);
                        if ("touchmove" === b.type) {
                            d = this.pinchDown;
                            var c = d[0] ? 4 <= Math.sqrt(Math.pow(d[0].chartX - b.chartX, 2) + Math.pow(d[0].chartY - b.chartY, 2)) : !1
                        }
                        w(c, !0) && this.pinch(b)
                    } else d && this.reset();
                else 2 === b.touches.length && this.pinch(b)
            };
            f.prototype.touchSelect = function (b) {
                return !(!this.chart.options.chart.zoomBySingleTouch || !b.touches || 1 !== b.touches.length)
            };
            f.prototype.zoomOption = function (b) {
                var d = this.chart,
                    a = d.options.chart;
                d = d.inverted;
                var g = a.zoomType || "";
                /touch/.test(b.type) && (g = w(a.pinchType, g));
                this.zoomX = b = /x/.test(g);
                this.zoomY = a = /y/.test(g);
                this.zoomHor = b && !d || a && d;
                this.zoomVert = a && !d || b && d;
                this.hasZoom = b || a
            };
            return f
        }();
        "";
        return f
    });
    K(l, "Core/MSPointer.js", [l["Core/Globals.js"], l["Core/Pointer.js"], l["Core/Utilities.js"]],
        function (f, e, l) {
            function C() {
                var d = [];
                d.item = function (b) {
                    return this[b]
                };
                b(q, function (b) {
                    d.push({
                        pageX: b.pageX,
                        pageY: b.pageY,
                        target: b.target
                    })
                });
                return d
            }

            function v(b, d, f, h) {
                var p = G[e.hoverChartIndex || NaN];
                "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !p || (p = p.pointer, h(b), p[d]({
                    type: f,
                    target: b.currentTarget,
                    preventDefault: y,
                    touches: C()
                }))
            }
            var E = this && this.__extends || function () {
                    var b = function (d, e) {
                        b = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (b, d) {
                            b.__proto__ =
                                d
                        } || function (b, d) {
                            for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                        };
                        return b(d, e)
                    };
                    return function (d, e) {
                        function f() {
                            this.constructor = d
                        }
                        b(d, e);
                        d.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
                    }
                }(),
                G = f.charts,
                B = f.doc,
                y = f.noop,
                t = f.win,
                h = l.addEvent,
                d = l.css,
                b = l.objectEach,
                p = l.removeEvent,
                q = {},
                r = !!t.PointerEvent;
            return function (b) {
                function e() {
                    return null !== b && b.apply(this, arguments) || this
                }
                E(e, b);
                e.isRequired = function () {
                    return !(f.hasTouch || !t.PointerEvent && !t.MSPointerEvent)
                };
                e.prototype.batchMSEvents =
                    function (b) {
                        b(this.chart.container, r ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                        b(this.chart.container, r ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                        b(B, r ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                    };
                e.prototype.destroy = function () {
                    this.batchMSEvents(p);
                    b.prototype.destroy.call(this)
                };
                e.prototype.init = function (e, f) {
                    b.prototype.init.call(this, e, f);
                    this.hasZoom && d(e.container, {
                        "-ms-touch-action": "none",
                        "touch-action": "none"
                    })
                };
                e.prototype.onContainerPointerDown =
                    function (b) {
                        v(b, "onContainerTouchStart", "touchstart", function (b) {
                            q[b.pointerId] = {
                                pageX: b.pageX,
                                pageY: b.pageY,
                                target: b.currentTarget
                            }
                        })
                    };
                e.prototype.onContainerPointerMove = function (b) {
                    v(b, "onContainerTouchMove", "touchmove", function (b) {
                        q[b.pointerId] = {
                            pageX: b.pageX,
                            pageY: b.pageY
                        };
                        q[b.pointerId].target || (q[b.pointerId].target = b.currentTarget)
                    })
                };
                e.prototype.onDocumentPointerUp = function (b) {
                    v(b, "onDocumentTouchEnd", "touchend", function (b) {
                        delete q[b.pointerId]
                    })
                };
                e.prototype.setDOMEvents = function () {
                    b.prototype.setDOMEvents.call(this);
                    (this.hasZoom || this.followTouchMove) && this.batchMSEvents(h)
                };
                return e
            }(e)
        });
    K(l, "Core/Legend/Legend.js", [l["Core/Animation/AnimationUtilities.js"], l["Core/FormatUtilities.js"], l["Core/Globals.js"], l["Core/Series/Point.js"], l["Core/Renderer/RendererUtilities.js"], l["Core/Utilities.js"]], function (f, e, l, C, v, E) {
        var G = f.animObject,
            B = f.setAnimation,
            y = e.format;
        f = l.isFirefox;
        var t = l.marginNames;
        l = l.win;
        var h = v.distribute,
            d = E.addEvent,
            b = E.createElement,
            p = E.css,
            q = E.defined,
            r = E.discardElement,
            n = E.find,
            J = E.fireEvent,
            w = E.isNumber,
            z = E.merge,
            x = E.pick,
            m = E.relativeLength,
            k = E.stableSort,
            a = E.syncTimeout;
        v = E.wrap;
        E = function () {
            function g(a, b) {
                this.allItems = [];
                this.contentGroup = this.box = void 0;
                this.display = !1;
                this.group = void 0;
                this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
                this.options = void 0;
                this.padding = 0;
                this.pages = [];
                this.proximate = !1;
                this.scrollGroup =
                    void 0;
                this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
                this.chart = a;
                this.init(a, b)
            }
            g.prototype.init = function (a, b) {
                this.chart = a;
                this.setOptions(b);
                b.enabled && (this.render(), d(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = d(this.chart, "render", function () {
                    this.legend.proximatePositions();
                    this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            };
            g.prototype.setOptions = function (a) {
                var c = x(a.padding,
                    8);
                this.options = a;
                this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = z(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop = a.itemMarginTop || 0;
                this.itemMarginBottom = a.itemMarginBottom || 0;
                this.padding = c;
                this.initialItemY = c - 5;
                this.symbolWidth = x(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted;
                this.baseline = void 0
            };
            g.prototype.update = function (a, b) {
                var c = this.chart;
                this.setOptions(z(!0, this.options, a));
                this.destroy();
                c.isDirtyLegend = c.isDirtyBox = !0;
                x(b, !0) && c.redraw();
                J(this, "afterUpdate")
            };
            g.prototype.colorizeItem = function (a, b) {
                a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var c = this.options,
                        d = a.legendItem,
                        g = a.legendLine,
                        e = a.legendSymbol,
                        f = this.itemHiddenStyle.color;
                    c = b ? c.itemStyle.color : f;
                    var k = b ? a.color || f : f,
                        h = a.options && a.options.marker,
                        m = {
                            fill: k
                        };
                    d && d.css({
                        fill: c,
                        color: c
                    });
                    g && g.attr({
                        stroke: k
                    });
                    e && (h && e.isMarker && (m = a.pointAttribs(), b || (m.stroke = m.fill = f)), e.attr(m))
                }
                J(this, "afterColorizeItem", {
                    item: a,
                    visible: b
                })
            };
            g.prototype.positionItems = function () {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            };
            g.prototype.positionItem = function (a) {
                var c = this,
                    b = this.options,
                    d = b.symbolPadding,
                    g = !b.rtl,
                    e = a._legendItemPos;
                b = e[0];
                e = e[1];
                var f = a.checkbox,
                    k = a.legendGroup;
                k && k.element && (d = {
                    translateX: g ? b : this.legendWidth - b - 2 * d - 4,
                    translateY: e
                }, g = function () {
                    J(c, "afterPositionItem", {
                        item: a
                    })
                }, q(k.translateY) ? k.animate(d, void 0, g) : (k.attr(d), g()));
                f && (f.x = b, f.y = e)
            };
            g.prototype.destroyItem = function (a) {
                var c = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (c) {
                    a[c] && (a[c] = a[c].destroy())
                });
                c && r(a.checkbox)
            };
            g.prototype.destroy = function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                this.getAllItems().forEach(function (c) {
                    ["legendItem", "legendGroup"].forEach(a, c)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a, this);
                this.display = null
            };
            g.prototype.positionCheckboxes = function () {
                var a = this.group && this.group.alignAttr,
                    b = this.clipHeight || this.legendHeight,
                    d = this.titleHeight;
                if (a) {
                    var g = a.translateY;
                    this.allItems.forEach(function (c) {
                        var e = c.checkbox;
                        if (e) {
                            var f = g + d + e.y + (this.scrollOffset || 0) + 3;
                            p(e, {
                                left: a.translateX + c.checkboxOffset + e.x - 20 + "px",
                                top: f + "px",
                                display: this.proximate || f > g - 6 && f < g + b - 6 ? "" : "none"
                            })
                        }
                    }, this)
                }
            };
            g.prototype.renderTitle = function () {
                var a = this.options,
                    b = this.padding,
                    d = a.title,
                    g = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, b - 3, b - 4, void 0, void 0, void 0, a.useHTML, void 0, "legend-title").attr({
                        zIndex: 1
                    }),
                    this.chart.styledMode || this.title.css(d.style), this.title.add(this.group)), d.width || this.title.css({
                    width: this.maxLegendWidth + "px"
                }), a = this.title.getBBox(), g = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: g
                }));
                this.titleHeight = g
            };
            g.prototype.setText = function (a) {
                var c = this.options;
                a.legendItem.attr({
                    text: c.labelFormat ? y(c.labelFormat, a, this.chart) : c.labelFormatter.call(a)
                })
            };
            g.prototype.renderItem = function (a) {
                var c = this.chart,
                    b = c.renderer,
                    d = this.options,
                    g = this.symbolWidth,
                    e = d.symbolPadding ||
                    0,
                    f = this.itemStyle,
                    k = this.itemHiddenStyle,
                    h = "horizontal" === d.layout ? x(d.itemDistance, 20) : 0,
                    m = !d.rtl,
                    p = !a.series,
                    n = !p && a.series.drawLegendSymbol ? a.series : a,
                    l = n.options,
                    r = this.createCheckboxForItem && l && l.showCheckbox,
                    q = d.useHTML,
                    t = a.options.className,
                    F = a.legendItem;
                l = g + e + h + (r ? 20 : 0);
                F || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + n.type + "-series highcharts-color-" + a.colorIndex + (t ? " " + t : "") + (p ? " highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = F = b.text("",
                    m ? g + e : -e, this.baseline || 0, q), c.styledMode || F.css(z(a.visible ? f : k)), F.attr({
                    align: m ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = b.fontMetrics(c.styledMode ? 12 : f.fontSize, F), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, F.attr("y", this.baseline), this.symbolHeight = d.symbolHeight || this.fontMetrics.f, d.squareSymbol && (this.symbolWidth = x(d.symbolWidth, Math.max(this.symbolHeight, 16)), l = this.symbolWidth + e + h + (r ? 20 : 0), m && F.attr("x", this.symbolWidth + e))), n.drawLegendSymbol(this,
                    a), this.setItemEvents && this.setItemEvents(a, F, q));
                r && !a.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(a);
                this.colorizeItem(a, a.visible);
                !c.styledMode && f.width || F.css({
                    width: (d.itemWidth || this.widthOption || c.spacingBox.width) - l + "px"
                });
                this.setText(a);
                c = F.getBBox();
                b = this.fontMetrics && this.fontMetrics.h || 0;
                a.itemWidth = a.checkboxOffset = d.itemWidth || a.legendItemWidth || c.width + l;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight =
                    a.itemHeight = Math.round(a.legendItemHeight || (c.height > 1.5 * b ? c.height : b))
            };
            g.prototype.layoutItem = function (a) {
                var c = this.options,
                    b = this.padding,
                    d = "horizontal" === c.layout,
                    g = a.itemHeight,
                    e = this.itemMarginBottom,
                    f = this.itemMarginTop,
                    k = d ? x(c.itemDistance, 20) : 0,
                    h = this.maxLegendWidth;
                c = c.alignColumns && this.totalItemWidth > h ? this.maxItemWidth : a.itemWidth;
                d && this.itemX - b + c > h && (this.itemX = b, this.lastLineHeight && (this.itemY += f + this.lastLineHeight + e), this.lastLineHeight = 0);
                this.lastItemY = f + this.itemY + e;
                this.lastLineHeight =
                    Math.max(g, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                d ? this.itemX += c : (this.itemY += f + g + e, this.lastLineHeight = g);
                this.offsetWidth = this.widthOption || Math.max((d ? this.itemX - b - (a.checkbox ? 0 : k) : c) + b, this.offsetWidth)
            };
            g.prototype.getAllItems = function () {
                var a = [];
                this.chart.series.forEach(function (c) {
                    var b = c && c.options;
                    c && x(b.showInLegend, q(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                });
                J(this, "afterGetAllItems", {
                    allItems: a
                });
                return a
            };
            g.prototype.getAlignment =
                function () {
                    var a = this.options;
                    return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
                };
            g.prototype.adjustMargins = function (a, b) {
                var c = this.chart,
                    d = this.options,
                    g = this.getAlignment();
                g && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (e, f) {
                    e.test(g) && !q(a[f]) && (c[t[f]] = Math.max(c[t[f]], c.legend[(f + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][f] * d[f % 2 ? "x" : "y"] + x(d.margin, 12) + b[f] + (c.titleOffset[f] || 0)))
                })
            };
            g.prototype.proximatePositions = function () {
                var a = this.chart,
                    b = [],
                    d = "left" === this.options.align;
                this.allItems.forEach(function (c) {
                    var g;
                    var e = d;
                    if (c.yAxis) {
                        c.xAxis.options.reversed && (e = !e);
                        c.points && (g = n(e ? c.points : c.points.slice(0).reverse(), function (a) {
                            return w(a.plotY)
                        }));
                        e = this.itemMarginTop + c.legendItem.getBBox().height + this.itemMarginBottom;
                        var f = c.yAxis.top - a.plotTop;
                        c.visible ? (g = g ? g.plotY : c.yAxis.height, g += f - .3 * e) : g = f + c.yAxis.height;
                        b.push({
                            target: g,
                            size: e,
                            item: c
                        })
                    }
                }, this);
                h(b, a.plotHeight).forEach(function (c) {
                    c.item._legendItemPos &&
                        c.pos && (c.item._legendItemPos[1] = a.plotTop - a.spacing[0] + c.pos)
                })
            };
            g.prototype.render = function () {
                var a = this.chart,
                    b = a.renderer,
                    d = this.options,
                    g = this.padding,
                    e = this.getAllItems(),
                    f = this.group,
                    h = this.box;
                this.itemX = g;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption = m(d.width, a.spacingBox.width - g);
                var p = a.spacingBox.width - 2 * g - d.x; - 1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (p /= 2);
                this.maxLegendWidth = this.widthOption || p;
                f || (this.group = f = b.g("legend").addClass(d.className ||
                    "").attr({
                    zIndex: 7
                }).add(), this.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(f), this.scrollGroup = b.g().add(this.contentGroup));
                this.renderTitle();
                k(e, function (a, c) {
                    return (a.options && a.options.legendIndex || 0) - (c.options && c.options.legendIndex || 0)
                });
                d.reversed && e.reverse();
                this.allItems = e;
                this.display = p = !!e.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                e.forEach(this.renderItem, this);
                e.forEach(this.layoutItem, this);
                e = (this.widthOption || this.offsetWidth) + g;
                var n = this.lastItemY +
                    this.lastLineHeight + this.titleHeight;
                n = this.handleOverflow(n);
                n += g;
                h || (this.box = h = b.rect().addClass("highcharts-legend-box").attr({
                    r: d.borderRadius
                }).add(f));
                a.styledMode || h.attr({
                    stroke: d.borderColor,
                    "stroke-width": d.borderWidth || 0,
                    fill: d.backgroundColor || "none"
                }).shadow(d.shadow);
                if (0 < e && 0 < n) h[h.placed ? "animate" : "attr"](h.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: e,
                    height: n
                }, h.strokeWidth()));
                f[p ? "show" : "hide"]();
                a.styledMode && "none" === f.getStyle("display") && (e = n = 0);
                this.legendWidth = e;
                this.legendHeight = n;
                p &&
                    this.align();
                this.proximate || this.positionItems();
                J(this, "afterRender")
            };
            g.prototype.align = function (a) {
                void 0 === a && (a = this.chart.spacingBox);
                var c = this.chart,
                    b = this.options,
                    d = a.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < c.titleOffset[0] ? d += c.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < c.titleOffset[2] && (d -= c.titleOffset[2]);
                d !== a.y && (a = z(a, {
                    y: d
                }));
                c.hasRendered || (this.group.placed = !1);
                this.group.align(z(b, {
                    width: this.legendWidth,
                    height: this.legendHeight,
                    verticalAlign: this.proximate ?
                        "top" : b.verticalAlign
                }), !0, a)
            };
            g.prototype.handleOverflow = function (a) {
                var c = this,
                    b = this.chart,
                    d = b.renderer,
                    g = this.options,
                    e = g.y,
                    f = "top" === g.verticalAlign,
                    k = this.padding,
                    h = g.maxHeight,
                    m = g.navigation,
                    p = x(m.animation, !0),
                    n = m.arrowSize || 12,
                    l = this.pages,
                    r = this.allItems,
                    q = function (a) {
                        "number" === typeof a ? w.attr({
                            height: a
                        }) : w && (c.clipRect = w.destroy(), c.contentGroup.clip());
                        c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + k + "px,9999px," + (k + a) + "px,0)" : "auto")
                    },
                    t = function (a) {
                        c[a] = d.circle(0, 0, 1.3 *
                            n).translate(n / 2, n / 2).add(N);
                        b.styledMode || c[a].attr("fill", "rgba(0,0,0,0.0001)");
                        return c[a]
                    },
                    F, z;
                e = b.spacingBox.height + (f ? -e : e) - k;
                var N = this.nav,
                    w = this.clipRect;
                "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (e /= 2);
                h && (e = Math.min(e, h));
                l.length = 0;
                a && 0 < e && a > e && !1 !== m.enabled ? (this.clipHeight = F = Math.max(e - 20 - this.titleHeight - k, 0), this.currentPage = x(this.currentPage, 1), this.fullHeight = a, r.forEach(function (a, c) {
                    var b = a._legendItemPos[1],
                        d = Math.round(a.legendItem.getBBox().height),
                        g = l.length;
                    if (!g || b - l[g - 1] > F && (z || b) !== l[g - 1]) l.push(z || b), g++;
                    a.pageIx = g - 1;
                    z && (r[c - 1].pageIx = g - 1);
                    c === r.length - 1 && b + d - l[g - 1] > F && d <= F && (l.push(b), a.pageIx = g);
                    b !== z && (z = b)
                }), w || (w = c.clipRect = d.clipRect(0, k, 9999, 0), c.contentGroup.clip(w)), q(F), N || (this.nav = N = d.g().attr({
                        zIndex: 1
                    }).add(this.group), this.up = d.symbol("triangle", 0, 0, n, n).add(N), t("upTracker").on("click", function () {
                        c.scroll(-1, p)
                    }), this.pager = d.text("", 15, 10).addClass("highcharts-legend-navigation"), !b.styledMode && m.style && this.pager.css(m.style),
                    this.pager.add(N), this.down = d.symbol("triangle-down", 0, 0, n, n).add(N), t("downTracker").on("click", function () {
                        c.scroll(1, p)
                    })), c.scroll(0), a = e) : N && (q(), this.nav = N.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            };
            g.prototype.scroll = function (c, b) {
                var d = this,
                    g = this.chart,
                    e = this.pages,
                    f = e.length,
                    k = this.clipHeight,
                    h = this.options.navigation,
                    m = this.pager,
                    p = this.padding,
                    n = this.currentPage + c;
                n > f && (n = f);
                0 < n && ("undefined" !== typeof b && B(b, g), this.nav.attr({
                    translateX: p,
                    translateY: k +
                        this.padding + 7 + this.titleHeight,
                    visibility: "inherit"
                }), [this.up, this.upTracker].forEach(function (a) {
                    a.attr({
                        "class": 1 === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }), m.attr({
                    text: n + "/" + f
                }), [this.down, this.downTracker].forEach(function (a) {
                    a.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": n === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }, this), g.styledMode || (this.up.attr({
                    fill: 1 === n ? h.inactiveColor : h.activeColor
                }), this.upTracker.css({
                    cursor: 1 === n ? "default" : "pointer"
                }), this.down.attr({
                    fill: n === f ? h.inactiveColor : h.activeColor
                }), this.downTracker.css({
                    cursor: n === f ? "default" : "pointer"
                })), this.scrollOffset = -e[n - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = n, this.positionCheckboxes(), c = G(x(b, g.renderer.globalAnimation, !0)), a(function () {
                    J(d, "afterScroll", {
                        currentPage: n
                    })
                }, c.duration))
            };
            g.prototype.setItemEvents = function (a, b, d) {
                var c = this,
                    g = c.chart.renderer.boxWrapper,
                    e = a instanceof C,
                    f = "highcharts-legend-" +
                    (e ? "point" : "series") + "-active",
                    k = c.chart.styledMode,
                    h = function (b) {
                        c.allItems.forEach(function (c) {
                            a !== c && [c].concat(c.linkedSeries || []).forEach(function (a) {
                                a.setState(b, !e)
                            })
                        })
                    };
                (d ? [b, a.legendSymbol] : [a.legendGroup]).forEach(function (d) {
                    if (d) d.on("mouseover", function () {
                        a.visible && h("inactive");
                        a.setState("hover");
                        a.visible && g.addClass(f);
                        k || b.css(c.options.itemHoverStyle)
                    }).on("mouseout", function () {
                        c.chart.styledMode || b.css(z(a.visible ? c.itemStyle : c.itemHiddenStyle));
                        h("");
                        g.removeClass(f);
                        a.setState()
                    }).on("click",
                        function (c) {
                            var b = function () {
                                a.setVisible && a.setVisible();
                                h(a.visible ? "inactive" : "")
                            };
                            g.removeClass(f);
                            c = {
                                browserEvent: c
                            };
                            a.firePointEvent ? a.firePointEvent("legendItemClick", c, b) : J(a, "legendItemClick", c, b)
                        })
                })
            };
            g.prototype.createCheckboxForItem = function (a) {
                a.checkbox = b("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                d(a.checkbox, "click", function (c) {
                    J(a.series || a, "checkboxClick", {
                        checked: c.target.checked,
                        item: a
                    }, function () {
                        a.select()
                    })
                })
            };
            return g
        }();
        (/Trident\/7\.0/.test(l.navigator && l.navigator.userAgent) || f) && v(E.prototype, "positionItem", function (a, c) {
            var b = this,
                d = function () {
                    c._legendItemPos && a.call(b, c)
                };
            d();
            b.bubbleLegend || setTimeout(d)
        });
        "";
        return E
    });
    K(l, "Core/Series/SeriesRegistry.js", [l["Core/Globals.js"], l["Core/DefaultOptions.js"], l["Core/Series/Point.js"], l["Core/Utilities.js"]], function (f, e, l, C) {
        var v = e.defaultOptions,
            E = C.error,
            G = C.extendClass,
            B = C.merge,
            y;
        (function (e) {
            function h(d, b) {
                var f =
                    v.plotOptions || {},
                    h = b.defaultOptions;
                b.prototype.pointClass || (b.prototype.pointClass = l);
                b.prototype.type = d;
                h && (f[d] = h);
                e.seriesTypes[d] = b
            }
            e.seriesTypes = f.seriesTypes;
            e.getSeries = function (d, b) {
                void 0 === b && (b = {});
                var f = d.options.chart;
                f = b.type || f.type || f.defaultSeriesType || "";
                var h = e.seriesTypes[f];
                e || E(17, !0, d, {
                    missingModuleFor: f
                });
                f = new h;
                "function" === typeof f.init && f.init(d, b);
                return f
            };
            e.registerSeriesType = h;
            e.seriesType = function (d, b, f, q, r) {
                var p = v.plotOptions || {};
                b = b || "";
                p[d] = B(p[b], f);
                h(d, G(e.seriesTypes[b] ||
                    function () {}, q));
                e.seriesTypes[d].prototype.type = d;
                r && (e.seriesTypes[d].prototype.pointClass = G(l, r));
                return e.seriesTypes[d]
            }
        })(y || (y = {}));
        return y
    });
    K(l, "Core/Chart/Chart.js", [l["Core/Animation/AnimationUtilities.js"], l["Core/Axis/Axis.js"], l["Core/FormatUtilities.js"], l["Core/Foundation.js"], l["Core/Globals.js"], l["Core/Legend/Legend.js"], l["Core/MSPointer.js"], l["Core/DefaultOptions.js"], l["Core/Pointer.js"], l["Core/Renderer/RendererRegistry.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Renderer/SVG/SVGRenderer.js"],
        l["Core/Time.js"], l["Core/Utilities.js"], l["Core/Renderer/HTML/AST.js"]
    ], function (f, e, l, C, v, E, G, B, y, t, h, d, b, p, q) {
        var r = f.animate,
            n = f.animObject,
            J = f.setAnimation,
            w = l.numberFormat,
            z = C.registerEventOptions,
            x = v.charts,
            m = v.doc,
            k = v.marginNames,
            a = v.svg,
            g = v.win,
            c = B.defaultOptions,
            D = B.defaultTime,
            A = h.seriesTypes,
            u = p.addEvent,
            L = p.attr,
            S = p.cleanRecursively,
            R = p.createElement,
            M = p.css,
            U = p.defined,
            P = p.discardElement,
            I = p.erase,
            H = p.error,
            K = p.extend,
            da = p.find,
            O = p.fireEvent,
            ea = p.getStyle,
            F = p.isArray,
            T = p.isNumber,
            N =
            p.isObject,
            V = p.isString,
            W = p.merge,
            X = p.objectEach,
            Q = p.pick,
            Z = p.pInt,
            ba = p.relativeLength,
            ha = p.removeEvent,
            fa = p.splat,
            ia = p.syncTimeout,
            ka = p.uniqueKey;
        f = function () {
            function f(a, c, b) {
                this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth =
                    this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
                this.sharedClips = {};
                this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
                this.getArgs(a, c, b)
            }
            f.chart = function (a, c, b) {
                return new f(a, c, b)
            };
            f.prototype.getArgs = function (a, c, b) {
                V(a) || a.nodeName ? (this.renderTo = a, this.init(c, b)) : this.init(a, c)
            };
            f.prototype.init = function (a, d) {
                var g = a.plotOptions || {};
                O(this, "init", {
                    args: arguments
                }, function () {
                    var e = W(c, a),
                        f = e.chart;
                    X(e.plotOptions,
                        function (a, c) {
                            N(a) && (a.tooltip = g[c] && W(g[c].tooltip) || void 0)
                        });
                    e.tooltip.userOptions = a.chart && a.chart.forExport && a.tooltip.userOptions || a.tooltip;
                    this.userOptions = a;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {
                        h: {},
                        v: {}
                    };
                    this.labelCollectors = [];
                    this.callback = d;
                    this.isResizing = 0;
                    this.options = e;
                    this.axes = [];
                    this.series = [];
                    this.time = a.time && Object.keys(a.time).length ? new b(a.time) : v.time;
                    this.numberFormatter = f.numberFormatter || w;
                    this.styledMode = f.styledMode;
                    this.hasCartesianSeries = f.showAxes;
                    this.index =
                        x.length;
                    x.push(this);
                    v.chartCount++;
                    z(this, f);
                    this.xAxis = [];
                    this.yAxis = [];
                    this.pointCount = this.colorCounter = this.symbolCounter = 0;
                    O(this, "afterInit");
                    this.firstRender()
                })
            };
            f.prototype.initSeries = function (a) {
                var c = this.options.chart;
                c = a.type || c.type || c.defaultSeriesType;
                var b = A[c];
                b || H(17, !0, this, {
                    missingModuleFor: c
                });
                c = new b;
                "function" === typeof c.init && c.init(this, a);
                return c
            };
            f.prototype.setSeriesData = function () {
                this.getSeriesOrderByLinks().forEach(function (a) {
                    a.points || a.data || !a.enabledDataSorting ||
                        a.setData(a.options.data, !1)
                })
            };
            f.prototype.getSeriesOrderByLinks = function () {
                return this.series.concat().sort(function (a, c) {
                    return a.linkedSeries.length || c.linkedSeries.length ? c.linkedSeries.length - a.linkedSeries.length : 0
                })
            };
            f.prototype.orderSeries = function (a) {
                var c = this.series;
                a = a || 0;
                for (var b = c.length; a < b; ++a) c[a] && (c[a].index = a, c[a].name = c[a].getName())
            };
            f.prototype.isInsidePlot = function (a, c, b) {
                void 0 === b && (b = {});
                var d = this.inverted,
                    g = this.plotBox,
                    e = this.plotLeft,
                    f = this.plotTop,
                    k = this.scrollablePlotBox,
                    h = 0;
                var m = 0;
                b.visiblePlotOnly && this.scrollingContainer && (m = this.scrollingContainer, h = m.scrollLeft, m = m.scrollTop);
                var p = b.series;
                g = b.visiblePlotOnly && k || g;
                k = b.inverted ? c : a;
                c = b.inverted ? a : c;
                a = {
                    x: k,
                    y: c,
                    isInsidePlot: !0
                };
                if (!b.ignoreX) {
                    var n = p && (d ? p.yAxis : p.xAxis) || {
                        pos: e,
                        len: Infinity
                    };
                    k = b.paneCoordinates ? n.pos + k : e + k;
                    k >= Math.max(h + e, n.pos) && k <= Math.min(h + e + g.width, n.pos + n.len) || (a.isInsidePlot = !1)
                }!b.ignoreY && a.isInsidePlot && (d = p && (d ? p.xAxis : p.yAxis) || {
                        pos: f,
                        len: Infinity
                    }, b = b.paneCoordinates ? d.pos + c : f +
                    c, b >= Math.max(m + f, d.pos) && b <= Math.min(m + f + g.height, d.pos + d.len) || (a.isInsidePlot = !1));
                O(this, "afterIsInsidePlot", a);
                return a.isInsidePlot
            };
            f.prototype.redraw = function (a) {
                O(this, "beforeRedraw");
                var c = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
                    b = this.series,
                    d = this.pointer,
                    g = this.legend,
                    e = this.userOptions.legend,
                    f = this.renderer,
                    k = f.isHidden(),
                    h = [],
                    m = this.isDirtyBox,
                    p = this.isDirtyLegend;
                this.setResponsive && this.setResponsive(!1);
                J(this.hasRendered ? a : !1, this);
                k && this.temporaryDisplay();
                this.layOutTitles();
                for (a = b.length; a--;) {
                    var n = b[a];
                    if (n.options.stacking || n.options.centerInCategory) {
                        var l = !0;
                        if (n.isDirty) {
                            var F = !0;
                            break
                        }
                    }
                }
                if (F)
                    for (a = b.length; a--;) n = b[a], n.options.stacking && (n.isDirty = !0);
                b.forEach(function (a) {
                    a.isDirty && ("point" === a.options.legendType ? ("function" === typeof a.updateTotals && a.updateTotals(), p = !0) : e && (e.labelFormatter || e.labelFormat) && (p = !0));
                    a.isDirtyData && O(a, "updatedData")
                });
                p && g && g.options.enabled && (g.render(), this.isDirtyLegend = !1);
                l && this.getStacks();
                c.forEach(function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                c.forEach(function (a) {
                    a.isDirty && (m = !0)
                });
                c.forEach(function (a) {
                    var c = a.min + "," + a.max;
                    a.extKey !== c && (a.extKey = c, h.push(function () {
                        O(a, "afterSetExtremes", K(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (m || l) && a.redraw()
                });
                m && this.drawChartBox();
                O(this, "predraw");
                b.forEach(function (a) {
                    (m || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                d && d.reset(!0);
                f.draw();
                O(this, "redraw");
                O(this, "render");
                k && this.temporaryDisplay(!0);
                h.forEach(function (a) {
                    a.call()
                })
            };
            f.prototype.get = function (a) {
                function c(c) {
                    return c.id === a || c.options && c.options.id === a
                }
                for (var b = this.series, d = da(this.axes, c) || da(this.series, c), g = 0; !d && g < b.length; g++) d = da(b[g].points || [], c);
                return d
            };
            f.prototype.getAxes = function () {
                var a = this,
                    c = this.options,
                    b = c.xAxis = fa(c.xAxis || {});
                c = c.yAxis = fa(c.yAxis || {});
                O(this, "getAxes");
                b.forEach(function (a, c) {
                    a.index = c;
                    a.isX = !0
                });
                c.forEach(function (a, c) {
                    a.index = c
                });
                b.concat(c).forEach(function (c) {
                    new e(a, c)
                });
                O(this, "afterGetAxes")
            };
            f.prototype.getSelectedPoints =
                function () {
                    return this.series.reduce(function (a, c) {
                        c.getPointsCollection().forEach(function (c) {
                            Q(c.selectedStaging, c.selected) && a.push(c)
                        });
                        return a
                    }, [])
                };
            f.prototype.getSelectedSeries = function () {
                return this.series.filter(function (a) {
                    return a.selected
                })
            };
            f.prototype.setTitle = function (a, c, b) {
                this.applyDescription("title", a);
                this.applyDescription("subtitle", c);
                this.applyDescription("caption", void 0);
                this.layOutTitles(b)
            };
            f.prototype.applyDescription = function (a, c) {
                var b = this,
                    d = "title" === a ? {
                        color: "#333333",
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {
                        color: "#666666"
                    };
                d = this.options[a] = W(!this.styledMode && {
                    style: d
                }, this.options[a], c);
                var g = this[a];
                g && c && (this[a] = g = g.destroy());
                d && !g && (g = this.renderer.text(d.text, 0, 0, d.useHTML).attr({
                    align: d.align,
                    "class": "highcharts-" + a,
                    zIndex: d.zIndex || 4
                }).add(), g.update = function (c) {
                    b[{
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    } [a]](c)
                }, this.styledMode || g.css(d.style), this[a] = g)
            };
            f.prototype.layOutTitles = function (a) {
                var c = [0, 0, 0],
                    b = this.renderer,
                    d = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function (a) {
                    var g = this[a],
                        e = this.options[a],
                        f = e.verticalAlign || "top";
                    a = "title" === a ? "top" === f ? -3 : 0 : "top" === f ? c[0] + 2 : 0;
                    var k;
                    if (g) {
                        this.styledMode || (k = e.style && e.style.fontSize);
                        k = b.fontMetrics(k, g).b;
                        g.css({
                            width: (e.width || d.width + (e.widthAdjust || 0)) + "px"
                        });
                        var h = Math.round(g.getBBox(e.useHTML).height);
                        g.align(K({
                            y: "bottom" === f ? k : a + k,
                            height: h
                        }, e), !1, "spacingBox");
                        e.floating || ("top" === f ? c[0] = Math.ceil(c[0] + h) : "bottom" === f && (c[2] = Math.ceil(c[2] +
                            h)))
                    }
                }, this);
                c[0] && "top" === (this.options.title.verticalAlign || "top") && (c[0] += this.options.title.margin);
                c[2] && "bottom" === this.options.caption.verticalAlign && (c[2] += this.options.caption.margin);
                var g = !this.titleOffset || this.titleOffset.join(",") !== c.join(",");
                this.titleOffset = c;
                O(this, "afterLayOutTitles");
                !this.isDirtyBox && g && (this.isDirtyBox = this.isDirtyLegend = g, this.hasRendered && Q(a, !0) && this.isDirtyBox && this.redraw())
            };
            f.prototype.getChartSize = function () {
                var a = this.options.chart,
                    c = a.width;
                a = a.height;
                var b = this.renderTo;
                U(c) || (this.containerWidth = ea(b, "width"));
                U(a) || (this.containerHeight = ea(b, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, ba(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            };
            f.prototype.temporaryDisplay = function (a) {
                var c = this.renderTo;
                if (a)
                    for (; c && c.style;) c.hcOrigStyle && (M(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (m.body.removeChild(c), c.hcOrigDetached = !1), c = c.parentNode;
                else
                    for (; c && c.style;) {
                        m.body.contains(c) ||
                            c.parentNode || (c.hcOrigDetached = !0, m.body.appendChild(c));
                        if ("none" === ea(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                            display: c.style.display,
                            height: c.style.height,
                            overflow: c.style.overflow
                        }, a = {
                            display: "block",
                            overflow: "hidden"
                        }, c !== this.renderTo && (a.height = 0), M(c, a), c.offsetWidth || c.style.setProperty("display", "block", "important");
                        c = c.parentNode;
                        if (c === m.body) break
                    }
            };
            f.prototype.setClassName = function (a) {
                this.container.className = "highcharts-container " + (a || "")
            };
            f.prototype.getContainer = function () {
                var c =
                    this.options,
                    b = c.chart,
                    g = ka(),
                    e, f = this.renderTo;
                f || (this.renderTo = f = b.renderTo);
                V(f) && (this.renderTo = f = m.getElementById(f));
                f || H(13, !0, this);
                var k = Z(L(f, "data-highcharts-chart"));
                T(k) && x[k] && x[k].hasRendered && x[k].destroy();
                L(f, "data-highcharts-chart", this.index);
                f.innerHTML = q.emptyHTML;
                b.skipClone || f.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                k = this.chartWidth;
                var h = this.chartHeight;
                M(f, {
                    overflow: "hidden"
                });
                this.styledMode || (e = K({
                    position: "relative",
                    overflow: "hidden",
                    width: k + "px",
                    height: h +
                        "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    userSelect: "none",
                    "touch-action": "manipulation",
                    outline: "none"
                }, b.style || {}));
                this.container = g = R("div", {
                    id: g
                }, e, f);
                this._cursor = g.style.cursor;
                this.renderer = new(b.renderer || !a ? t.getRendererType(b.renderer) : d)(g, k, h, void 0, b.forExport, c.exporting && c.exporting.allowHTML, this.styledMode);
                J(void 0, this);
                this.setClassName(b.className);
                if (this.styledMode)
                    for (var p in c.defs) this.renderer.definition(c.defs[p]);
                else this.renderer.setStyle(b.style);
                this.renderer.chartIndex = this.index;
                O(this, "afterGetContainer")
            };
            f.prototype.getMargins = function (a) {
                var c = this.spacing,
                    b = this.margin,
                    d = this.titleOffset;
                this.resetMargins();
                d[0] && !U(b[0]) && (this.plotTop = Math.max(this.plotTop, d[0] + c[0]));
                d[2] && !U(b[2]) && (this.marginBottom = Math.max(this.marginBottom, d[2] + c[2]));
                this.legend && this.legend.display && this.legend.adjustMargins(b, c);
                O(this, "getMargins");
                a || this.getAxisMargins()
            };
            f.prototype.getAxisMargins = function () {
                var a =
                    this,
                    c = a.axisOffset = [0, 0, 0, 0],
                    b = a.colorAxis,
                    d = a.margin,
                    g = function (a) {
                        a.forEach(function (a) {
                            a.visible && a.getOffset()
                        })
                    };
                a.hasCartesianSeries ? g(a.axes) : b && b.length && g(b);
                k.forEach(function (b, g) {
                    U(d[g]) || (a[b] += c[g])
                });
                a.setChartSize()
            };
            f.prototype.reflow = function (a) {
                var c = this,
                    b = c.options.chart,
                    d = c.renderTo,
                    e = U(b.width) && U(b.height),
                    f = b.width || ea(d, "width");
                b = b.height || ea(d, "height");
                d = a ? a.target : g;
                delete c.pointer.chartPosition;
                if (!e && !c.isPrinting && f && b && (d === g || d === m)) {
                    if (f !== c.containerWidth || b !==
                        c.containerHeight) p.clearTimeout(c.reflowTimeout), c.reflowTimeout = ia(function () {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    c.containerWidth = f;
                    c.containerHeight = b
                }
            };
            f.prototype.setReflow = function (a) {
                var c = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = u(g, "resize", function (a) {
                    c.options && c.reflow(a)
                }), u(this, "destroy", this.unbindReflow))
            };
            f.prototype.setSize = function (a, c, b) {
                var d = this,
                    g = d.renderer;
                d.isResizing += 1;
                J(b, d);
                b =
                    g.globalAnimation;
                d.oldChartHeight = d.chartHeight;
                d.oldChartWidth = d.chartWidth;
                "undefined" !== typeof a && (d.options.chart.width = a);
                "undefined" !== typeof c && (d.options.chart.height = c);
                d.getChartSize();
                d.styledMode || (b ? r : M)(d.container, {
                    width: d.chartWidth + "px",
                    height: d.chartHeight + "px"
                }, b);
                d.setChartSize(!0);
                g.setSize(d.chartWidth, d.chartHeight, b);
                d.axes.forEach(function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                d.isDirtyLegend = !0;
                d.isDirtyBox = !0;
                d.layOutTitles();
                d.getMargins();
                d.redraw(b);
                d.oldChartHeight = null;
                O(d,
                    "resize");
                ia(function () {
                    d && O(d, "endResize", null, function () {
                        --d.isResizing
                    })
                }, n(b).duration)
            };
            f.prototype.setChartSize = function (a) {
                var c = this.inverted,
                    b = this.renderer,
                    d = this.chartWidth,
                    g = this.chartHeight,
                    e = this.options.chart,
                    f = this.spacing,
                    k = this.clipOffset,
                    h, m, p, n;
                this.plotLeft = h = Math.round(this.plotLeft);
                this.plotTop = m = Math.round(this.plotTop);
                this.plotWidth = p = Math.max(0, Math.round(d - h - this.marginRight));
                this.plotHeight = n = Math.max(0, Math.round(g - m - this.marginBottom));
                this.plotSizeX = c ? n : p;
                this.plotSizeY =
                    c ? p : n;
                this.plotBorderWidth = e.plotBorderWidth || 0;
                this.spacingBox = b.spacingBox = {
                    x: f[3],
                    y: f[0],
                    width: d - f[3] - f[1],
                    height: g - f[0] - f[2]
                };
                this.plotBox = b.plotBox = {
                    x: h,
                    y: m,
                    width: p,
                    height: n
                };
                c = 2 * Math.floor(this.plotBorderWidth / 2);
                d = Math.ceil(Math.max(c, k[3]) / 2);
                g = Math.ceil(Math.max(c, k[0]) / 2);
                this.clipBox = {
                    x: d,
                    y: g,
                    width: Math.floor(this.plotSizeX - Math.max(c, k[1]) / 2 - d),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(c, k[2]) / 2 - g))
                };
                a || (this.axes.forEach(function (a) {
                        a.setAxisSize();
                        a.setAxisTranslation()
                    }),
                    b.alignElements());
                O(this, "afterSetChartSize", {
                    skipAxes: a
                })
            };
            f.prototype.resetMargins = function () {
                O(this, "resetMargins");
                var a = this,
                    c = a.options.chart;
                ["margin", "spacing"].forEach(function (b) {
                    var d = c[b],
                        g = N(d) ? d : [d, d, d, d];
                    ["Top", "Right", "Bottom", "Left"].forEach(function (d, e) {
                        a[b][e] = Q(c[b + d], g[e])
                    })
                });
                k.forEach(function (c, b) {
                    a[c] = Q(a.margin[b], a.spacing[b])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            };
            f.prototype.drawChartBox = function () {
                var a = this.options.chart,
                    c = this.renderer,
                    b = this.chartWidth,
                    d = this.chartHeight,
                    g = this.styledMode,
                    e = this.plotBGImage,
                    f = a.backgroundColor,
                    k = a.plotBackgroundColor,
                    h = a.plotBackgroundImage,
                    m = this.plotLeft,
                    p = this.plotTop,
                    n = this.plotWidth,
                    l = this.plotHeight,
                    F = this.plotBox,
                    r = this.clipRect,
                    q = this.clipBox,
                    u = this.chartBackground,
                    t = this.plotBackground,
                    N = this.plotBorder,
                    z, w = "animate";
                u || (this.chartBackground = u = c.rect().addClass("highcharts-background").add(), w = "attr");
                if (g) var x = z = u.strokeWidth();
                else {
                    x = a.borderWidth || 0;
                    z = x + (a.shadow ? 8 : 0);
                    f = {
                        fill: f || "none"
                    };
                    if (x || u["stroke-width"]) f.stroke =
                        a.borderColor, f["stroke-width"] = x;
                    u.attr(f).shadow(a.shadow)
                }
                u[w]({
                    x: z / 2,
                    y: z / 2,
                    width: b - z - x % 2,
                    height: d - z - x % 2,
                    r: a.borderRadius
                });
                w = "animate";
                t || (w = "attr", this.plotBackground = t = c.rect().addClass("highcharts-plot-background").add());
                t[w](F);
                g || (t.attr({
                    fill: k || "none"
                }).shadow(a.plotShadow), h && (e ? (h !== e.attr("href") && e.attr("href", h), e.animate(F)) : this.plotBGImage = c.image(h, m, p, n, l).add()));
                r ? r.animate({
                    width: q.width,
                    height: q.height
                }) : this.clipRect = c.clipRect(q);
                w = "animate";
                N || (w = "attr", this.plotBorder =
                    N = c.rect().addClass("highcharts-plot-border").attr({
                        zIndex: 1
                    }).add());
                g || N.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                N[w](N.crisp({
                    x: m,
                    y: p,
                    width: n,
                    height: l
                }, -N.strokeWidth()));
                this.isDirtyBox = !1;
                O(this, "afterDrawChartBox")
            };
            f.prototype.propFromSeries = function () {
                var a = this,
                    c = a.options.chart,
                    b = a.options.series,
                    d, g, e;
                ["inverted", "angular", "polar"].forEach(function (f) {
                    g = A[c.type || c.defaultSeriesType];
                    e = c[f] || g && g.prototype[f];
                    for (d = b && b.length; !e && d--;)(g = A[b[d].type]) &&
                        g.prototype[f] && (e = !0);
                    a[f] = e
                })
            };
            f.prototype.linkSeries = function () {
                var a = this,
                    c = a.series;
                c.forEach(function (a) {
                    a.linkedSeries.length = 0
                });
                c.forEach(function (c) {
                    var b = c.options.linkedTo;
                    V(b) && (b = ":previous" === b ? a.series[c.index - 1] : a.get(b)) && b.linkedParent !== c && (b.linkedSeries.push(c), c.linkedParent = b, b.enabledDataSorting && c.setDataSortingOptions(), c.visible = Q(c.options.visible, b.options.visible, c.visible))
                });
                O(this, "afterLinkSeries")
            };
            f.prototype.renderSeries = function () {
                this.series.forEach(function (a) {
                    a.translate();
                    a.render()
                })
            };
            f.prototype.renderLabels = function () {
                var a = this,
                    c = a.options.labels;
                c.items && c.items.forEach(function (b) {
                    var d = K(c.style, b.style),
                        g = Z(d.left) + a.plotLeft,
                        e = Z(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(b.html, g, e).attr({
                        zIndex: 2
                    }).css(d).add()
                })
            };
            f.prototype.render = function () {
                var a = this.axes,
                    c = this.colorAxis,
                    b = this.renderer,
                    d = this.options,
                    g = function (a) {
                        a.forEach(function (a) {
                            a.visible && a.render()
                        })
                    },
                    e = 0;
                this.setTitle();
                this.legend = new E(this, d.legend);
                this.getStacks &&
                    this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                d = this.plotWidth;
                a.some(function (a) {
                    if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return e = 21, !0
                });
                var f = this.plotHeight = Math.max(this.plotHeight - e, 0);
                a.forEach(function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                var k = 1.1 < d / this.plotWidth,
                    h = 1.05 < f / this.plotHeight;
                if (k || h) a.forEach(function (a) {
                    (a.horiz && k || !a.horiz && h) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries ? g(a) : c && c.length && g(c);
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            };
            f.prototype.addCredits = function (a) {
                var c = this,
                    b = W(!0, this.options.credits, a);
                b.enabled && !this.credits && (this.credits = this.renderer.text(b.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                        b.href && (g.location.href = b.href)
                    }).attr({
                        align: b.position.align,
                        zIndex: 8
                    }), c.styledMode ||
                    this.credits.css(b.style), this.credits.add().align(b.position), this.credits.update = function (a) {
                        c.credits = c.credits.destroy();
                        c.addCredits(a)
                    })
            };
            f.prototype.destroy = function () {
                var a = this,
                    c = a.axes,
                    b = a.series,
                    d = a.container,
                    g = d && d.parentNode,
                    e;
                O(a, "destroy");
                a.renderer.forExport ? I(x, a) : x[a.index] = void 0;
                v.chartCount--;
                a.renderTo.removeAttribute("data-highcharts-chart");
                ha(a);
                for (e = c.length; e--;) c[e] = c[e].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (e = b.length; e--;) b[e] =
                    b[e].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (c) {
                    var b = a[c];
                    b && b.destroy && (a[c] = b.destroy())
                });
                d && (d.innerHTML = q.emptyHTML, ha(d), g && P(d));
                X(a, function (c, b) {
                    delete a[b]
                })
            };
            f.prototype.firstRender = function () {
                var a = this,
                    c = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    (F(c.series) ? c.series : []).forEach(function (c) {
                        a.initSeries(c)
                    });
                    a.linkSeries();
                    a.setSeriesData();
                    O(a, "beforeRender");
                    y && (G.isRequired() ? a.pointer = new G(a, c) : a.pointer = new y(a, c));
                    a.render();
                    a.pointer.getChartPosition();
                    if (!a.renderer.imgCount && !a.hasLoaded) a.onload();
                    a.temporaryDisplay(!0)
                }
            };
            f.prototype.onload = function () {
                this.callbacks.concat([this.callback]).forEach(function (a) {
                    a && "undefined" !== typeof this.index && a.apply(this, [this])
                }, this);
                O(this, "load");
                O(this, "render");
                U(this.index) &&
                    this.setReflow(this.options.chart.reflow);
                this.warnIfA11yModuleNotLoaded();
                this.hasLoaded = !0
            };
            f.prototype.warnIfA11yModuleNotLoaded = function () {
                var a = this.options,
                    c = this.title;
                a && !this.accessibility && (this.renderer.boxWrapper.attr({
                    role: "img",
                    "aria-label": c && c.element.textContent || ""
                }), a.accessibility && !1 === a.accessibility.enabled || H('Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
                    !1, this))
            };
            f.prototype.addSeries = function (a, c, b) {
                var d = this,
                    g;
                a && (c = Q(c, !0), O(d, "addSeries", {
                    options: a
                }, function () {
                    g = d.initSeries(a);
                    d.isDirtyLegend = !0;
                    d.linkSeries();
                    g.enabledDataSorting && g.setData(a.data, !1);
                    O(d, "afterAddSeries", {
                        series: g
                    });
                    c && d.redraw(b)
                }));
                return g
            };
            f.prototype.addAxis = function (a, c, b, d) {
                return this.createAxis(c ? "xAxis" : "yAxis", {
                    axis: a,
                    redraw: b,
                    animation: d
                })
            };
            f.prototype.addColorAxis = function (a, c, b) {
                return this.createAxis("colorAxis", {
                    axis: a,
                    redraw: c,
                    animation: b
                })
            };
            f.prototype.createAxis =
                function (a, c) {
                    a = new e(this, W(c.axis, {
                        index: this[a].length,
                        isX: "xAxis" === a
                    }));
                    Q(c.redraw, !0) && this.redraw(c.animation);
                    return a
                };
            f.prototype.showLoading = function (a) {
                var c = this,
                    b = c.options,
                    d = b.loading,
                    g = function () {
                        e && M(e, {
                            left: c.plotLeft + "px",
                            top: c.plotTop + "px",
                            width: c.plotWidth + "px",
                            height: c.plotHeight + "px"
                        })
                    },
                    e = c.loadingDiv,
                    f = c.loadingSpan;
                e || (c.loadingDiv = e = R("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, c.container));
                f || (c.loadingSpan = f = R("span", {
                        className: "highcharts-loading-inner"
                    },
                    null, e), u(c, "redraw", g));
                e.className = "highcharts-loading";
                q.setElementHTML(f, Q(a, b.lang.loading, ""));
                c.styledMode || (M(e, K(d.style, {
                    zIndex: 10
                })), M(f, d.labelStyle), c.loadingShown || (M(e, {
                    opacity: 0,
                    display: ""
                }), r(e, {
                    opacity: d.style.opacity || .5
                }, {
                    duration: d.showDuration || 0
                })));
                c.loadingShown = !0;
                g()
            };
            f.prototype.hideLoading = function () {
                var a = this.options,
                    c = this.loadingDiv;
                c && (c.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || r(c, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        M(c, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            };
            f.prototype.update = function (a, c, d, g) {
                var e = this,
                    f = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    k = a.isResponsiveOptions,
                    h = [],
                    m, p;
                O(e, "update", {
                    options: a
                });
                k || e.setResponsive(!1, !0);
                a = S(a, e.options);
                e.userOptions = W(e.userOptions, a);
                var n = a.chart;
                if (n) {
                    W(!0, e.options.chart, n);
                    "className" in n && e.setClassName(n.className);
                    "reflow" in n && e.setReflow(n.reflow);
                    if ("inverted" in n || "polar" in n || "type" in
                        n) {
                        e.propFromSeries();
                        var l = !0
                    }
                    "alignTicks" in n && (l = !0);
                    "events" in n && z(this, n);
                    X(n, function (a, c) {
                        -1 !== e.propsRequireUpdateSeries.indexOf("chart." + c) && (m = !0); - 1 !== e.propsRequireDirtyBox.indexOf(c) && (e.isDirtyBox = !0); - 1 !== e.propsRequireReflow.indexOf(c) && (k ? e.isDirtyBox = !0 : p = !0)
                    });
                    !e.styledMode && n.style && e.renderer.setStyle(e.options.chart.style || {})
                }!e.styledMode && a.colors && (this.options.colors = a.colors);
                a.time && (this.time === D && (this.time = new b(a.time)), W(!0, e.options.time, a.time));
                X(a, function (c,
                    b) {
                    if (e[b] && "function" === typeof e[b].update) e[b].update(c, !1);
                    else if ("function" === typeof e[f[b]]) e[f[b]](c);
                    else "colors" !== b && -1 === e.collectionsWithUpdate.indexOf(b) && W(!0, e.options[b], a[b]);
                    "chart" !== b && -1 !== e.propsRequireUpdateSeries.indexOf(b) && (m = !0)
                });
                this.collectionsWithUpdate.forEach(function (c) {
                    if (a[c]) {
                        var b = [];
                        e[c].forEach(function (a, c) {
                            a.options.isInternal || b.push(Q(a.options.index, c))
                        });
                        fa(a[c]).forEach(function (a, g) {
                            var f = U(a.id),
                                k;
                            f && (k = e.get(a.id));
                            !k && e[c] && (k = e[c][b ? b[g] : g]) && f &&
                                U(k.options.id) && (k = void 0);
                            k && k.coll === c && (k.update(a, !1), d && (k.touched = !0));
                            !k && d && e.collectionsWithInit[c] && (e.collectionsWithInit[c][0].apply(e, [a].concat(e.collectionsWithInit[c][1] || []).concat([!1])).touched = !0)
                        });
                        d && e[c].forEach(function (a) {
                            a.touched || a.options.isInternal ? delete a.touched : h.push(a)
                        })
                    }
                });
                h.forEach(function (a) {
                    a.chart && a.remove && a.remove(!1)
                });
                l && e.axes.forEach(function (a) {
                    a.update({}, !1)
                });
                m && e.getSeriesOrderByLinks().forEach(function (a) {
                    a.chart && a.update({}, !1)
                }, this);
                l = n &&
                    n.width;
                n = n && (V(n.height) ? ba(n.height, l || e.chartWidth) : n.height);
                p || T(l) && l !== e.chartWidth || T(n) && n !== e.chartHeight ? e.setSize(l, n, g) : Q(c, !0) && e.redraw(g);
                O(e, "afterUpdate", {
                    options: a,
                    redraw: c,
                    animation: g
                })
            };
            f.prototype.setSubtitle = function (a, c) {
                this.applyDescription("subtitle", a);
                this.layOutTitles(c)
            };
            f.prototype.setCaption = function (a, c) {
                this.applyDescription("caption", a);
                this.layOutTitles(c)
            };
            f.prototype.showResetZoom = function () {
                function a() {
                    b.zoomOut()
                }
                var b = this,
                    d = c.lang,
                    g = b.options.chart.resetZoomButton,
                    e = g.theme,
                    f = "chart" === g.relativeTo || "spacingBox" === g.relativeTo ? null : "scrollablePlotBox";
                O(this, "beforeShowResetZoom", null, function () {
                    b.resetZoomButton = b.renderer.button(d.resetZoom, null, null, a, e).attr({
                        align: g.position.align,
                        title: d.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(g.position, !1, f)
                });
                O(this, "afterShowResetZoom")
            };
            f.prototype.zoomOut = function () {
                O(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            };
            f.prototype.zoom = function (a) {
                var c = this,
                    b = c.pointer,
                    d = c.inverted ? b.mouseDownX :
                    b.mouseDownY,
                    g = !1,
                    e;
                !a || a.resetSelection ? (c.axes.forEach(function (a) {
                    e = a.zoom()
                }), b.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                    var f = a.axis,
                        k = c.inverted ? f.left : f.top,
                        h = c.inverted ? k + f.width : k + f.height,
                        m = f.isXAxis,
                        n = !1;
                    if (!m && d >= k && d <= h || m || !U(d)) n = !0;
                    b[m ? "zoomX" : "zoomY"] && n && (e = f.zoom(a.min, a.max), f.displayBtn && (g = !0))
                });
                var f = c.resetZoomButton;
                g && !f ? c.showResetZoom() : !g && N(f) && (c.resetZoomButton = f.destroy());
                e && c.redraw(Q(c.options.chart.animation, a && a.animation, 100 > c.pointCount))
            };
            f.prototype.pan = function (a, c) {
                var b = this,
                    d = b.hoverPoints;
                c = "object" === typeof c ? c : {
                    enabled: c,
                    type: "x"
                };
                var g = b.options.chart;
                g && g.panning && (g.panning = c);
                var e = c.type,
                    f;
                O(this, "pan", {
                    originalEvent: a
                }, function () {
                    d && d.forEach(function (a) {
                        a.setState()
                    });
                    var c = b.xAxis;
                    "xy" === e ? c = c.concat(b.yAxis) : "y" === e && (c = b.yAxis);
                    var g = {};
                    c.forEach(function (c) {
                        if (c.options.panningEnabled && !c.options.isInternal) {
                            var d = c.horiz,
                                k = a[d ? "chartX" : "chartY"];
                            d = d ? "mouseDownX" : "mouseDownY";
                            var h = b[d],
                                m = c.minPointOffset || 0,
                                n = c.reversed &&
                                !b.inverted || !c.reversed && b.inverted ? -1 : 1,
                                p = c.getExtremes(),
                                l = c.toValue(h - k, !0) + m * n,
                                F = c.toValue(h + c.len - k, !0) - (m * n || c.isXAxis && c.pointRangePadding || 0),
                                r = F < l;
                            n = c.hasVerticalPanning();
                            h = r ? F : l;
                            l = r ? l : F;
                            var q = c.panningState;
                            !n || c.isXAxis || q && !q.isDirty || c.series.forEach(function (a) {
                                var c = a.getProcessedData(!0);
                                c = a.getExtremes(c.yData, !0);
                                q || (q = {
                                    startMin: Number.MAX_VALUE,
                                    startMax: -Number.MAX_VALUE
                                });
                                T(c.dataMin) && T(c.dataMax) && (q.startMin = Math.min(Q(a.options.threshold, Infinity), c.dataMin, q.startMin), q.startMax =
                                    Math.max(Q(a.options.threshold, -Infinity), c.dataMax, q.startMax))
                            });
                            n = Math.min(Q(q && q.startMin, p.dataMin), m ? p.min : c.toValue(c.toPixels(p.min) - c.minPixelPadding));
                            F = Math.max(Q(q && q.startMax, p.dataMax), m ? p.max : c.toValue(c.toPixels(p.max) + c.minPixelPadding));
                            c.panningState = q;
                            c.isOrdinal || (m = n - h, 0 < m && (l += m, h = n), m = l - F, 0 < m && (l = F, h -= m), c.series.length && h !== p.min && l !== p.max && h >= n && l <= F && (c.setExtremes(h, l, !1, !1, {
                                trigger: "pan"
                            }), !b.resetZoomButton && h !== n && l !== F && e.match("y") && (b.showResetZoom(), c.displayBtn = !1), f = !0), g[d] = k)
                        }
                    });
                    X(g, function (a, c) {
                        b[c] = a
                    });
                    f && b.redraw(!1);
                    M(b.container, {
                        cursor: "move"
                    })
                })
            };
            return f
        }();
        K(f.prototype, {
            callbacks: [],
            collectionsWithInit: {
                xAxis: [f.prototype.addAxis, [!0]],
                yAxis: [f.prototype.addAxis, [!1]],
                series: [f.prototype.addSeries]
            },
            collectionsWithUpdate: ["xAxis", "yAxis", "series"],
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
        });
        "";
        return f
    });
    K(l, "Core/Legend/LegendSymbol.js", [l["Core/Utilities.js"]], function (f) {
        var e = f.merge,
            l = f.pick,
            C;
        (function (f) {
            f.drawLineMarker = function (f) {
                var v = this.options,
                    B = f.symbolWidth,
                    y = f.symbolHeight,
                    t = y / 2,
                    h = this.chart.renderer,
                    d = this.legendGroup;
                f = f.baseline - Math.round(.3 * f.fontMetrics.b);
                var b = {},
                    p = v.marker;
                this.chart.styledMode || (b = {
                    "stroke-width": v.lineWidth ||
                        0
                }, v.dashStyle && (b.dashstyle = v.dashStyle));
                this.legendLine = h.path([
                    ["M", 0, f],
                    ["L", B, f]
                ]).addClass("highcharts-graph").attr(b).add(d);
                p && !1 !== p.enabled && B && (v = Math.min(l(p.radius, t), t), 0 === this.symbol.indexOf("url") && (p = e(p, {
                    width: y,
                    height: y
                }), v = 0), this.legendSymbol = B = h.symbol(this.symbol, B / 2 - v, f - v, 2 * v, 2 * v, p).addClass("highcharts-point").add(d), B.isMarker = !0)
            };
            f.drawRectangle = function (e, f) {
                var v = e.symbolHeight,
                    y = e.options.squareSymbol;
                f.legendSymbol = this.chart.renderer.rect(y ? (e.symbolWidth - v) / 2 : 0,
                    e.baseline - v + 1, y ? v : e.symbolWidth, v, l(e.options.symbolRadius, v / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(f.legendGroup)
            }
        })(C || (C = {}));
        return C
    });
    K(l, "Core/Series/SeriesDefaults.js", [], function () {
        return {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: "#ffffff",
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                animation: {},
                align: "center",
                defer: !0,
                formatter: function () {
                    var f = this.series.chart.numberFormatter;
                    return "number" !== typeof this.y ? "" : f(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }
    });
    K(l, "Core/Series/Series.js", [l["Core/Animation/AnimationUtilities.js"], l["Core/DefaultOptions.js"], l["Core/Foundation.js"], l["Core/Globals.js"], l["Core/Legend/LegendSymbol.js"], l["Core/Series/Point.js"], l["Core/Series/SeriesDefaults.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Renderer/SVG/SVGElement.js"], l["Core/Utilities.js"]], function (f, e, l, C, v, E, G, B,
        y, t) {
        var h = f.animObject,
            d = f.setAnimation,
            b = e.defaultOptions,
            p = l.registerEventOptions,
            q = C.hasTouch,
            r = C.svg,
            n = C.win,
            J = B.seriesTypes,
            w = t.addEvent,
            z = t.arrayMax,
            x = t.arrayMin,
            m = t.clamp,
            k = t.cleanRecursively,
            a = t.correctFloat,
            g = t.defined,
            c = t.erase,
            D = t.error,
            A = t.extend,
            u = t.find,
            L = t.fireEvent,
            S = t.getNestedProperty,
            R = t.isArray,
            M = t.isNumber,
            U = t.isString,
            P = t.merge,
            I = t.objectEach,
            H = t.pick,
            K = t.removeEvent,
            da = t.splat,
            O = t.syncTimeout;
        f = function () {
            function e() {
                this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions =
                    this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0
            }
            e.prototype.init = function (a, c) {
                L(this, "init", {
                    options: c
                });
                var b = this,
                    d = a.series;
                this.eventsToUnbind = [];
                b.chart = a;
                b.options = b.setOptions(c);
                c = b.options;
                b.linkedSeries = [];
                b.bindAxes();
                A(b, {
                    name: c.name,
                    state: "",
                    visible: !1 !== c.visible,
                    selected: !0 === c.selected
                });
                p(this, c);
                var g = c.events;
                if (g && g.click || c.point && c.point.events && c.point.events.click ||
                    c.allowPointSelect) a.runTrackerClick = !0;
                b.getColor();
                b.getSymbol();
                b.parallelArrays.forEach(function (a) {
                    b[a + "Data"] || (b[a + "Data"] = [])
                });
                b.isCartesian && (a.hasCartesianSeries = !0);
                var e;
                d.length && (e = d[d.length - 1]);
                b._i = H(e && e._i, -1) + 1;
                b.opacity = b.options.opacity;
                a.orderSeries(this.insert(d));
                c.dataSorting && c.dataSorting.enabled ? b.setDataSortingOptions() : b.points || b.data || b.setData(c.data, !1);
                L(this, "afterInit")
            };
            e.prototype.is = function (a) {
                return J[a] && this instanceof J[a]
            };
            e.prototype.insert = function (a) {
                var c =
                    this.options.index,
                    b;
                if (M(c)) {
                    for (b = a.length; b--;)
                        if (c >= H(a[b].options.index, a[b]._i)) {
                            a.splice(b + 1, 0, this);
                            break
                        } - 1 === b && a.unshift(this);
                    b += 1
                } else a.push(this);
                return H(b, a.length - 1)
            };
            e.prototype.bindAxes = function () {
                var a = this,
                    c = a.options,
                    b = a.chart,
                    d;
                L(this, "bindAxes", null, function () {
                    (a.axisTypes || []).forEach(function (g) {
                        var e = 0;
                        b[g].forEach(function (b) {
                            d = b.options;
                            if (c[g] === e && !d.isInternal || "undefined" !== typeof c[g] && c[g] === d.id || "undefined" === typeof c[g] && 0 === d.index) a.insert(b.series), a[g] = b,
                                b.isDirty = !0;
                            d.isInternal || e++
                        });
                        a[g] || a.optionalAxis === g || D(18, !0, b)
                    })
                });
                L(this, "afterBindAxes")
            };
            e.prototype.updateParallelArrays = function (a, c) {
                var b = a.series,
                    d = arguments,
                    g = M(c) ? function (d) {
                        var g = "y" === d && b.toYData ? b.toYData(a) : a[d];
                        b[d + "Data"][c] = g
                    } : function (a) {
                        Array.prototype[c].apply(b[a + "Data"], Array.prototype.slice.call(d, 2))
                    };
                b.parallelArrays.forEach(g)
            };
            e.prototype.hasData = function () {
                return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible &&
                    this.yData && 0 < this.yData.length
            };
            e.prototype.autoIncrement = function (a) {
                var c = this.options,
                    b = c.pointIntervalUnit,
                    d = c.relativeXValue,
                    g = this.chart.time,
                    e = this.xIncrement,
                    f;
                e = H(e, c.pointStart, 0);
                this.pointInterval = f = H(this.pointInterval, c.pointInterval, 1);
                d && M(a) && (f *= a);
                b && (c = new g.Date(e), "day" === b ? g.set("Date", c, g.get("Date", c) + f) : "month" === b ? g.set("Month", c, g.get("Month", c) + f) : "year" === b && g.set("FullYear", c, g.get("FullYear", c) + f), f = c.getTime() - e);
                if (d && M(a)) return e + f;
                this.xIncrement = e + f;
                return e
            };
            e.prototype.setDataSortingOptions = function () {
                var a = this.options;
                A(this, {
                    requireSorting: !1,
                    sorted: !1,
                    enabledDataSorting: !0,
                    allowDG: !1
                });
                g(a.pointRange) || (a.pointRange = 1)
            };
            e.prototype.setOptions = function (a) {
                var c = this.chart,
                    d = c.options,
                    e = d.plotOptions,
                    f = c.userOptions || {};
                a = P(a);
                c = c.styledMode;
                var k = {
                    plotOptions: e,
                    userOptions: a
                };
                L(this, "setOptions", k);
                var h = k.plotOptions[this.type],
                    m = f.plotOptions || {};
                this.userOptions = k.userOptions;
                f = P(h, e.series, f.plotOptions && f.plotOptions[this.type], a);
                this.tooltipOptions =
                    P(b.tooltip, b.plotOptions.series && b.plotOptions.series.tooltip, b.plotOptions[this.type].tooltip, d.tooltip.userOptions, e.series && e.series.tooltip, e[this.type].tooltip, a.tooltip);
                this.stickyTracking = H(a.stickyTracking, m[this.type] && m[this.type].stickyTracking, m.series && m.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : f.stickyTracking);
                null === h.marker && delete f.marker;
                this.zoneAxis = f.zoneAxis;
                e = this.zones = (f.zones || []).slice();
                !f.negativeColor && !f.negativeFillColor || f.zones ||
                    (d = {
                        value: f[this.zoneAxis + "Threshold"] || f.threshold || 0,
                        className: "highcharts-negative"
                    }, c || (d.color = f.negativeColor, d.fillColor = f.negativeFillColor), e.push(d));
                e.length && g(e[e.length - 1].value) && e.push(c ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                });
                L(this, "afterSetOptions", {
                    options: f
                });
                return f
            };
            e.prototype.getName = function () {
                return H(this.options.name, "Series " + (this.index + 1))
            };
            e.prototype.getCyclic = function (a, c, b) {
                var d = this.chart,
                    e = this.userOptions,
                    f = a + "Index",
                    k = a + "Counter",
                    h = b ? b.length : H(d.options.chart[a +
                        "Count"], d[a + "Count"]);
                if (!c) {
                    var m = H(e[f], e["_" + f]);
                    g(m) || (d.series.length || (d[k] = 0), e["_" + f] = m = d[k] % h, d[k] += 1);
                    b && (c = b[m])
                }
                "undefined" !== typeof m && (this[f] = m);
                this[a] = c
            };
            e.prototype.getColor = function () {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic("color", this.options.color || b.plotOptions[this.type].color, this.chart.options.colors)
            };
            e.prototype.getPointsCollection = function () {
                return (this.hasGroupedData ? this.points : this.data) || []
            };
            e.prototype.getSymbol =
                function () {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                };
            e.prototype.findPointIndex = function (a, c) {
                var b = a.id,
                    d = a.x,
                    g = this.points,
                    e = this.options.dataSorting,
                    f, k;
                if (b) e = this.chart.get(b), e instanceof E && (f = e);
                else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue)
                    if (f = function (c) {
                            return !c.touched && c.index === a.index
                        }, e && e.matchByName ? f = function (c) {
                            return !c.touched && c.name === a.name
                        } : this.options.relativeXValue && (f = function (c) {
                            return !c.touched &&
                                c.options.x === a.x
                        }), f = u(g, f), !f) return;
                if (f) {
                    var h = f && f.index;
                    "undefined" !== typeof h && (k = !0)
                }
                "undefined" === typeof h && M(d) && (h = this.xData.indexOf(d, c)); - 1 !== h && "undefined" !== typeof h && this.cropped && (h = h >= this.cropStart ? h - this.cropStart : h);
                !k && M(h) && g[h] && g[h].touched && (h = void 0);
                return h
            };
            e.prototype.updateData = function (a, c) {
                var b = this.options,
                    d = b.dataSorting,
                    e = this.points,
                    f = [],
                    k = this.requireSorting,
                    h = a.length === e.length,
                    m, n, p, l = !0;
                this.xIncrement = null;
                a.forEach(function (a, c) {
                    var n = g(a) && this.pointClass.prototype.optionsToObject.call({
                                series: this
                            },
                            a) || {},
                        l = n.x;
                    if (n.id || M(l)) {
                        if (n = this.findPointIndex(n, p), -1 === n || "undefined" === typeof n ? f.push(a) : e[n] && a !== b.data[n] ? (e[n].update(a, !1, null, !1), e[n].touched = !0, k && (p = n + 1)) : e[n] && (e[n].touched = !0), !h || c !== n || d && d.enabled || this.hasDerivedData) m = !0
                    } else f.push(a)
                }, this);
                if (m)
                    for (a = e.length; a--;)(n = e[a]) && !n.touched && n.remove && n.remove(!1, c);
                else !h || d && d.enabled ? l = !1 : (a.forEach(function (a, c) {
                    a !== e[c].y && e[c].update && e[c].update(a, !1, null, !1)
                }), f.length = 0);
                e.forEach(function (a) {
                    a && (a.touched = !1)
                });
                if (!l) return !1;
                f.forEach(function (a) {
                    this.addPoint(a, !1, null, null, !1)
                }, this);
                null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = z(this.xData), this.autoIncrement());
                return !0
            };
            e.prototype.setData = function (a, c, b, d) {
                var g = this,
                    e = g.points,
                    f = e && e.length || 0,
                    k = g.options,
                    h = g.chart,
                    m = k.dataSorting,
                    n = g.xAxis,
                    p = k.turboThreshold,
                    l = this.xData,
                    r = this.yData,
                    q = g.pointArrayMap;
                q = q && q.length;
                var F = k.keys,
                    u, t = 0,
                    z = 1,
                    w = null;
                if (!h.options.chart.allowMutatingData) {
                    k.data && delete g.options.data;
                    g.userOptions.data &&
                        delete g.userOptions.data;
                    var x = P(!0, a)
                }
                a = x || a || [];
                x = a.length;
                c = H(c, !0);
                m && m.enabled && (a = this.sortData(a));
                h.options.chart.allowMutatingData && !1 !== d && x && f && !g.cropped && !g.hasGroupedData && g.visible && !g.isSeriesBoosting && (u = this.updateData(a, b));
                if (!u) {
                    g.xIncrement = null;
                    g.colorCounter = 0;
                    this.parallelArrays.forEach(function (a) {
                        g[a + "Data"].length = 0
                    });
                    if (p && x > p)
                        if (w = g.getFirstValidPoint(a), M(w))
                            for (b = 0; b < x; b++) l[b] = this.autoIncrement(), r[b] = a[b];
                        else if (R(w))
                        if (q)
                            if (w.length === q)
                                for (b = 0; b < x; b++) l[b] = this.autoIncrement(),
                                    r[b] = a[b];
                            else
                                for (b = 0; b < x; b++) d = a[b], l[b] = d[0], r[b] = d.slice(1, q + 1);
                    else if (F && (t = F.indexOf("x"), z = F.indexOf("y"), t = 0 <= t ? t : 0, z = 0 <= z ? z : 1), 1 === w.length && (z = 0), t === z)
                        for (b = 0; b < x; b++) l[b] = this.autoIncrement(), r[b] = a[b][z];
                    else
                        for (b = 0; b < x; b++) d = a[b], l[b] = d[t], r[b] = d[z];
                    else D(12, !1, h);
                    else
                        for (b = 0; b < x; b++) "undefined" !== typeof a[b] && (d = {
                            series: g
                        }, g.pointClass.prototype.applyOptions.apply(d, [a[b]]), g.updateParallelArrays(d, b));
                    r && U(r[0]) && D(14, !0, h);
                    g.data = [];
                    g.options.data = g.userOptions.data = a;
                    for (b = f; b--;) e[b] &&
                        e[b].destroy && e[b].destroy();
                    n && (n.minRange = n.userMinRange);
                    g.isDirty = h.isDirtyBox = !0;
                    g.isDirtyData = !!e;
                    b = !1
                }
                "point" === k.legendType && (this.processData(), this.generatePoints());
                c && h.redraw(b)
            };
            e.prototype.sortData = function (a) {
                var c = this,
                    b = c.options.dataSorting.sortKey || "y",
                    d = function (a, c) {
                        return g(c) && a.pointClass.prototype.optionsToObject.call({
                            series: a
                        }, c) || {}
                    };
                a.forEach(function (b, g) {
                    a[g] = d(c, b);
                    a[g].index = g
                }, this);
                a.concat().sort(function (a, c) {
                    a = S(b, a);
                    c = S(b, c);
                    return c < a ? -1 : c > a ? 1 : 0
                }).forEach(function (a,
                    c) {
                    a.x = c
                }, this);
                c.linkedSeries && c.linkedSeries.forEach(function (c) {
                    var b = c.options,
                        g = b.data;
                    b.dataSorting && b.dataSorting.enabled || !g || (g.forEach(function (b, e) {
                        g[e] = d(c, b);
                        a[e] && (g[e].x = a[e].x, g[e].index = e)
                    }), c.setData(g, !1))
                });
                return a
            };
            e.prototype.getProcessedData = function (a) {
                var c = this.xAxis,
                    b = this.options,
                    d = b.cropThreshold,
                    g = a || this.getExtremesFromAll || b.getExtremesFromAll,
                    e = this.isCartesian;
                a = c && c.val2lin;
                b = !(!c || !c.logarithmic);
                var f = 0,
                    k = this.xData,
                    h = this.yData,
                    m = this.requireSorting;
                var n = !1;
                var p = k.length;
                if (c) {
                    n = c.getExtremes();
                    var l = n.min;
                    var r = n.max;
                    n = !(!c.categories || c.names.length)
                }
                if (e && this.sorted && !g && (!d || p > d || this.forceCrop))
                    if (k[p - 1] < l || k[0] > r) k = [], h = [];
                    else if (this.yData && (k[0] < l || k[p - 1] > r)) {
                    var q = this.cropData(this.xData, this.yData, l, r);
                    k = q.xData;
                    h = q.yData;
                    f = q.start;
                    q = !0
                }
                for (d = k.length || 1; --d;)
                    if (c = b ? a(k[d]) - a(k[d - 1]) : k[d] - k[d - 1], 0 < c && ("undefined" === typeof u || c < u)) var u = c;
                    else 0 > c && m && !n && (D(15, !1, this.chart), m = !1);
                return {
                    xData: k,
                    yData: h,
                    cropped: q,
                    cropStart: f,
                    closestPointRange: u
                }
            };
            e.prototype.processData = function (a) {
                var c = this.xAxis;
                if (this.isCartesian && !this.isDirty && !c.isDirty && !this.yAxis.isDirty && !a) return !1;
                a = this.getProcessedData();
                this.cropped = a.cropped;
                this.cropStart = a.cropStart;
                this.processedXData = a.xData;
                this.processedYData = a.yData;
                this.closestPointRange = this.basePointRange = a.closestPointRange;
                L(this, "afterProcessData")
            };
            e.prototype.cropData = function (a, c, b, d, g) {
                var e = a.length,
                    f, k = 0,
                    h = e;
                g = H(g, this.cropShoulder);
                for (f = 0; f < e; f++)
                    if (a[f] >= b) {
                        k = Math.max(0, f - g);
                        break
                    } for (b =
                    f; b < e; b++)
                    if (a[b] > d) {
                        h = b + g;
                        break
                    } return {
                    xData: a.slice(k, h),
                    yData: c.slice(k, h),
                    start: k,
                    end: h
                }
            };
            e.prototype.generatePoints = function () {
                var a = this.options,
                    c = this.processedData || a.data,
                    b = this.processedXData,
                    d = this.processedYData,
                    g = this.pointClass,
                    e = b.length,
                    f = this.cropStart || 0,
                    k = this.hasGroupedData,
                    h = a.keys,
                    m = [];
                a = a.dataGrouping && a.dataGrouping.groupAll ? f : 0;
                var n, p, l = this.data;
                if (!l && !k) {
                    var r = [];
                    r.length = c.length;
                    l = this.data = r
                }
                h && k && (this.options.keys = !1);
                for (p = 0; p < e; p++) {
                    r = f + p;
                    if (k) {
                        var q = (new g).init(this,
                            [b[p]].concat(da(d[p])));
                        q.dataGroup = this.groupMap[a + p];
                        q.dataGroup.options && (q.options = q.dataGroup.options, A(q, q.dataGroup.options), delete q.dataLabels)
                    } else(q = l[r]) || "undefined" === typeof c[r] || (l[r] = q = (new g).init(this, c[r], b[p]));
                    q && (q.index = k ? a + p : r, m[p] = q)
                }
                this.options.keys = h;
                if (l && (e !== (n = l.length) || k))
                    for (p = 0; p < n; p++) p !== f || k || (p += e), l[p] && (l[p].destroyElements(), l[p].plotX = void 0);
                this.data = l;
                this.points = m;
                L(this, "afterGeneratePoints")
            };
            e.prototype.getXExtremes = function (a) {
                return {
                    min: x(a),
                    max: z(a)
                }
            };
            e.prototype.getExtremes = function (a, c) {
                var b = this.xAxis,
                    d = this.yAxis,
                    g = this.processedXData || this.xData,
                    e = [],
                    f = this.requireSorting ? this.cropShoulder : 0;
                d = d ? d.positiveValuesOnly : !1;
                var k, h = 0,
                    m = 0,
                    n = 0;
                a = a || this.stackedYData || this.processedYData || [];
                var p = a.length;
                if (b) {
                    var l = b.getExtremes();
                    h = l.min;
                    m = l.max
                }
                for (k = 0; k < p; k++) {
                    var q = g[k];
                    l = a[k];
                    var r = (M(l) || R(l)) && (l.length || 0 < l || !d);
                    q = c || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !b || (g[k + f] || q) >= h && (g[k - f] || q) <= m;
                    if (r &&
                        q)
                        if (r = l.length)
                            for (; r--;) M(l[r]) && (e[n++] = l[r]);
                        else e[n++] = l
                }
                a = {
                    activeYData: e,
                    dataMin: x(e),
                    dataMax: z(e)
                };
                L(this, "afterGetExtremes", {
                    dataExtremes: a
                });
                return a
            };
            e.prototype.applyExtremes = function () {
                var a = this.getExtremes();
                this.dataMin = a.dataMin;
                this.dataMax = a.dataMax;
                return a
            };
            e.prototype.getFirstValidPoint = function (a) {
                for (var c = a.length, b = 0, d = null; null === d && b < c;) d = a[b], b++;
                return d
            };
            e.prototype.translate = function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var c = this.options,
                    b = c.stacking,
                    d = this.xAxis,
                    e = d.categories,
                    f = this.enabledDataSorting,
                    k = this.yAxis,
                    h = this.points,
                    n = h.length,
                    p = this.pointPlacementToXValue(),
                    l = !!p,
                    q = c.threshold,
                    r = c.startFromThreshold ? q : 0,
                    u = this.zoneAxis || "y",
                    t, z, w = Number.MAX_VALUE;
                for (t = 0; t < n; t++) {
                    var x = h[t],
                        A = x.x,
                        y = void 0,
                        D = void 0,
                        v = x.y,
                        J = x.low,
                        B = b && k.stacking && k.stacking.stacks[(this.negStacks && v < (r ? 0 : q) ? "-" : "") + this.stackKey];
                    if (k.positiveValuesOnly && !k.validatePositiveValue(v) || d.positiveValuesOnly && !d.validatePositiveValue(A)) x.isNull = !0;
                    x.plotX =
                        z = a(m(d.translate(A, 0, 0, 0, 1, p, "flags" === this.type), -1E5, 1E5));
                    if (b && this.visible && B && B[A]) {
                        var C = this.getStackIndicator(C, A, this.index);
                        x.isNull || (y = B[A], D = y.points[C.key])
                    }
                    R(D) && (J = D[0], v = D[1], J === r && C.key === B[A].base && (J = H(M(q) && q, k.min)), k.positiveValuesOnly && 0 >= J && (J = null), x.total = x.stackTotal = y.total, x.percentage = y.total && x.y / y.total * 100, x.stackY = v, this.irregularWidths || y.setOffset(this.pointXOffset || 0, this.barW || 0));
                    x.yBottom = g(J) ? m(k.translate(J, 0, 1, 0, 1), -1E5, 1E5) : null;
                    this.dataModify && (v =
                        this.dataModify.modifyValue(v, t));
                    x.plotY = void 0;
                    M(v) && (y = k.translate(v, !1, !0, !1, !0), "undefined" !== typeof y && (x.plotY = m(y, -1E5, 1E5)));
                    x.isInside = this.isPointInside(x);
                    x.clientX = l ? a(d.translate(A, 0, 0, 0, 1, p)) : z;
                    x.negative = x[u] < (c[u + "Threshold"] || q || 0);
                    x.category = H(e && e[x.x], x.x);
                    if (!x.isNull && !1 !== x.visible) {
                        "undefined" !== typeof G && (w = Math.min(w, Math.abs(z - G)));
                        var G = z
                    }
                    x.zone = this.zones.length ? x.getZone() : void 0;
                    !x.graphic && this.group && f && (x.isNew = !0)
                }
                this.closestPointRangePx = w;
                L(this, "afterTranslate")
            };
            e.prototype.getValidPoints = function (a, c, b) {
                var d = this.chart;
                return (a || this.points || []).filter(function (a) {
                    return c && !d.isInsidePlot(a.plotX, a.plotY, {
                        inverted: d.inverted
                    }) ? !1 : !1 !== a.visible && (b || !a.isNull)
                })
            };
            e.prototype.getClipBox = function () {
                var a = this.chart,
                    c = this.xAxis,
                    b = this.yAxis,
                    d = P(a.clipBox);
                c && c.len !== a.plotSizeX && (d.width = c.len);
                b && b.len !== a.plotSizeY && (d.height = b.len);
                return d
            };
            e.prototype.getSharedClipKey = function () {
                return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis ||
                    0)
            };
            e.prototype.setClip = function () {
                var a = this.chart,
                    c = this.group,
                    b = this.markerGroup,
                    d = a.sharedClips;
                a = a.renderer;
                var g = this.getClipBox(),
                    e = this.getSharedClipKey(),
                    f = d[e];
                f ? f.animate(g) : d[e] = f = a.clipRect(g);
                c && c.clip(!1 === this.options.clip ? void 0 : f);
                b && b.clip()
            };
            e.prototype.animate = function (a) {
                var c = this.chart,
                    b = this.group,
                    d = this.markerGroup,
                    g = c.inverted,
                    e = h(this.options.animation),
                    f = [this.getSharedClipKey(), e.duration, e.easing, e.defer].join(),
                    k = c.sharedClips[f],
                    m = c.sharedClips[f + "m"];
                if (a && b) e = this.getClipBox(),
                    k ? k.attr("height", e.height) : (e.width = 0, g && (e.x = c.plotHeight), k = c.renderer.clipRect(e), c.sharedClips[f] = k, m = c.renderer.clipRect({
                        x: g ? (c.plotSizeX || 0) + 99 : -99,
                        y: g ? -c.plotLeft : -c.plotTop,
                        width: 99,
                        height: g ? c.chartWidth : c.chartHeight
                    }), c.sharedClips[f + "m"] = m), b.clip(k), d && d.clip(m);
                else if (k && !k.hasClass("highcharts-animating")) {
                    c = this.getClipBox();
                    var n = e.step;
                    d && d.element.childNodes.length && (e.step = function (a, c) {
                        n && n.apply(c, arguments);
                        m && m.element && m.attr(c.prop, "width" === c.prop ? a + 99 : a)
                    });
                    k.addClass("highcharts-animating").animate(c,
                        e)
                }
            };
            e.prototype.afterAnimate = function () {
                var a = this;
                this.setClip();
                I(this.chart.sharedClips, function (c, b, d) {
                    c && !a.chart.container.querySelector('[clip-path="url(#'.concat(c.id, ')"]')) && (c.destroy(), delete d[b])
                });
                this.finishedAnimating = !0;
                L(this, "afterAnimate")
            };
            e.prototype.drawPoints = function () {
                var a = this.points,
                    c = this.chart,
                    b = this.options.marker,
                    d = this[this.specialGroup] || this.markerGroup,
                    g = this.xAxis,
                    e = H(b.enabled, !g || g.isRadial ? !0 : null, this.closestPointRangePx >= b.enabledThreshold * b.radius),
                    f,
                    k;
                if (!1 !== b.enabled || this._hasPointMarkers)
                    for (f = 0; f < a.length; f++) {
                        var h = a[f];
                        var m = (k = h.graphic) ? "animate" : "attr";
                        var n = h.marker || {};
                        var p = !!h.marker;
                        if ((e && "undefined" === typeof n.enabled || n.enabled) && !h.isNull && !1 !== h.visible) {
                            var l = H(n.symbol, this.symbol, "rect");
                            var q = this.markerAttribs(h, h.selected && "select");
                            this.enabledDataSorting && (h.startXPos = g.reversed ? -(q.width || 0) : g.width);
                            var r = !1 !== h.isInside;
                            k ? k[r ? "show" : "hide"](r).animate(q) : r && (0 < (q.width || 0) || h.hasImage) && (h.graphic = k = c.renderer.symbol(l,
                                q.x, q.y, q.width, q.height, p ? n : b).add(d), this.enabledDataSorting && c.hasRendered && (k.attr({
                                x: h.startXPos
                            }), m = "animate"));
                            k && "animate" === m && k[r ? "show" : "hide"](r).animate(q);
                            if (k && !c.styledMode) k[m](this.pointAttribs(h, h.selected && "select"));
                            k && k.addClass(h.getClassName(), !0)
                        } else k && (h.graphic = k.destroy())
                    }
            };
            e.prototype.markerAttribs = function (a, c) {
                var b = this.options,
                    d = b.marker,
                    g = a.marker || {},
                    e = g.symbol || d.symbol,
                    f = H(g.radius, d && d.radius);
                c && (d = d.states[c], c = g.states && g.states[c], f = H(c && c.radius, d && d.radius,
                    f && f + (d && d.radiusPlus || 0)));
                a.hasImage = e && 0 === e.indexOf("url");
                a.hasImage && (f = 0);
                a = M(f) ? {
                    x: b.crisp ? Math.floor(a.plotX - f) : a.plotX - f,
                    y: a.plotY - f
                } : {};
                f && (a.width = a.height = 2 * f);
                return a
            };
            e.prototype.pointAttribs = function (a, c) {
                var b = this.options.marker,
                    d = a && a.options,
                    g = d && d.marker || {},
                    e = d && d.color,
                    f = a && a.color,
                    k = a && a.zone && a.zone.color,
                    h = this.color;
                a = H(g.lineWidth, b.lineWidth);
                d = 1;
                h = e || k || f || h;
                e = g.fillColor || b.fillColor || h;
                f = g.lineColor || b.lineColor || h;
                c = c || "normal";
                b = b.states[c] || {};
                c = g.states && g.states[c] || {};
                a = H(c.lineWidth, b.lineWidth, a + H(c.lineWidthPlus, b.lineWidthPlus, 0));
                e = c.fillColor || b.fillColor || e;
                f = c.lineColor || b.lineColor || f;
                d = H(c.opacity, b.opacity, d);
                return {
                    stroke: f,
                    "stroke-width": a,
                    fill: e,
                    opacity: d
                }
            };
            e.prototype.destroy = function (a) {
                var b = this,
                    d = b.chart,
                    g = /AppleWebKit\/533/.test(n.navigator.userAgent),
                    e = b.data || [],
                    f, k, h, m;
                L(b, "destroy", {
                    keepEventsForUpdate: a
                });
                this.removeEvents(a);
                (b.axisTypes || []).forEach(function (a) {
                    (m = b[a]) && m.series && (c(m.series, b), m.isDirty = m.forceRedraw = !0)
                });
                b.legendItem &&
                    b.chart.legend.destroyItem(b);
                for (k = e.length; k--;)(h = e[k]) && h.destroy && h.destroy();
                b.clips && b.clips.forEach(function (a) {
                    return a.destroy()
                });
                t.clearTimeout(b.animationTimeout);
                I(b, function (a, c) {
                    a instanceof y && !a.survive && (f = g && "group" === c ? "hide" : "destroy", a[f]())
                });
                d.hoverSeries === b && (d.hoverSeries = void 0);
                c(d.series, b);
                d.orderSeries();
                I(b, function (c, d) {
                    a && "hcEvents" === d || delete b[d]
                })
            };
            e.prototype.applyZones = function () {
                var a = this,
                    c = this.chart,
                    b = c.renderer,
                    d = this.zones,
                    g = this.clips || [],
                    e = this.graph,
                    f = this.area,
                    k = Math.max(c.chartWidth, c.chartHeight),
                    h = this[(this.zoneAxis || "y") + "Axis"],
                    n = c.inverted,
                    p, l, q, r, u, t, z, x, w = !1;
                if (d.length && (e || f) && h && "undefined" !== typeof h.min) {
                    var A = h.reversed;
                    var y = h.horiz;
                    e && !this.showLine && e.hide();
                    f && f.hide();
                    var D = h.getExtremes();
                    d.forEach(function (d, F) {
                        p = A ? y ? c.plotWidth : 0 : y ? 0 : h.toPixels(D.min) || 0;
                        p = m(H(l, p), 0, k);
                        l = m(Math.round(h.toPixels(H(d.value, D.max), !0) || 0), 0, k);
                        w && (p = l = h.toPixels(D.max));
                        r = Math.abs(p - l);
                        u = Math.min(p, l);
                        t = Math.max(p, l);
                        h.isXAxis ? (q = {
                            x: n ? t : u,
                            y: 0,
                            width: r,
                            height: k
                        }, y || (q.x = c.plotHeight - q.x)) : (q = {
                            x: 0,
                            y: n ? t : u,
                            width: k,
                            height: r
                        }, y && (q.y = c.plotWidth - q.y));
                        n && b.isVML && (q = h.isXAxis ? {
                            x: 0,
                            y: A ? u : t,
                            height: q.width,
                            width: c.chartWidth
                        } : {
                            x: q.y - c.plotLeft - c.spacingBox.x,
                            y: 0,
                            width: q.height,
                            height: c.chartHeight
                        });
                        g[F] ? g[F].animate(q) : g[F] = b.clipRect(q);
                        z = a["zone-area-" + F];
                        x = a["zone-graph-" + F];
                        e && x && x.clip(g[F]);
                        f && z && z.clip(g[F]);
                        w = d.value > D.max;
                        a.resetZones && 0 === l && (l = void 0)
                    });
                    this.clips = g
                } else a.visible && (e && e.show(), f && f.show())
            };
            e.prototype.invertGroups =
                function (a) {
                    function c() {
                        ["group", "markerGroup"].forEach(function (c) {
                            b[c] && (d.renderer.isVML && b[c].attr({
                                width: b.yAxis.len,
                                height: b.xAxis.len
                            }), b[c].width = b.yAxis.len, b[c].height = b.xAxis.len, b[c].invert(b.isRadialSeries ? !1 : a))
                        })
                    }
                    var b = this,
                        d = b.chart;
                    b.xAxis && (b.eventsToUnbind.push(w(d, "resize", c)), c(), b.invertGroups = c)
                };
            e.prototype.plotGroup = function (a, c, b, d, e) {
                var f = this[a],
                    k = !f;
                b = {
                    visibility: b,
                    zIndex: d || .1
                };
                "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (b.opacity =
                    this.opacity);
                k && (this[a] = f = this.chart.renderer.g().add(e));
                f.addClass("highcharts-" + c + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (g(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (f.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                f.attr(b)[k ? "attr" : "animate"](this.getPlotBox());
                return f
            };
            e.prototype.getPlotBox = function () {
                var a = this.chart,
                    c = this.xAxis,
                    b = this.yAxis;
                a.inverted && (c = b, b = this.xAxis);
                return {
                    translateX: c ? c.left : a.plotLeft,
                    translateY: b ? b.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            };
            e.prototype.removeEvents = function (a) {
                a || K(this);
                this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (a) {
                    a()
                }), this.eventsToUnbind.length = 0)
            };
            e.prototype.render = function () {
                var a = this,
                    c = a.chart,
                    b = a.options,
                    d = h(b.animation),
                    g = a.visible ? "inherit" : "hidden",
                    e = b.zIndex,
                    f = a.hasRendered,
                    k = c.seriesGroup,
                    m = c.inverted;
                c = !a.finishedAnimating && c.renderer.isSVG ? d.duration : 0;
                L(this, "render");
                var n = a.plotGroup("group", "series", g, e, k);
                a.markerGroup =
                    a.plotGroup("markerGroup", "markers", g, e, k);
                !1 !== b.clip && a.setClip();
                a.animate && c && a.animate(!0);
                n.inverted = H(a.invertible, a.isCartesian) ? m : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.visible && a.drawPoints();
                a.drawDataLabels && a.drawDataLabels();
                a.redrawPoints && a.redrawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(m);
                a.animate && c && a.animate();
                f || (c && d.defer && (c += d.defer), a.animationTimeout = O(function () {
                    a.afterAnimate()
                }, c || 0));
                a.isDirty = !1;
                a.hasRendered = !0;
                L(a, "afterRender")
            };
            e.prototype.redraw = function () {
                var a = this.chart,
                    c = this.isDirty || this.isDirtyData,
                    b = this.group,
                    d = this.xAxis,
                    g = this.yAxis;
                b && (a.inverted && b.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), b.animate({
                    translateX: H(d && d.left, a.plotLeft),
                    translateY: H(g && g.top, a.plotTop)
                }));
                this.translate();
                this.render();
                c && delete this.kdTree
            };
            e.prototype.searchPoint = function (a, c) {
                var b = this.xAxis,
                    d = this.yAxis,
                    g = this.chart.inverted;
                return this.searchKDTree({
                    clientX: g ? b.len - a.chartY + b.pos : a.chartX - b.pos,
                    plotY: g ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, c, a)
            };
            e.prototype.buildKDTree = function (a) {
                function c(a, d, g) {
                    var e = a && a.length;
                    if (e) {
                        var f = b.kdAxisArray[d % g];
                        a.sort(function (a, c) {
                            return a[f] - c[f]
                        });
                        e = Math.floor(e / 2);
                        return {
                            point: a[e],
                            left: c(a.slice(0, e), d + 1, g),
                            right: c(a.slice(e + 1), d + 1, g)
                        }
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    d = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                O(function () {
                        b.kdTree = c(b.getValidPoints(null, !b.directTouch), d, d);
                        b.buildingKdTree = !1
                    }, b.options.kdNow || a && "touchstart" ===
                    a.type ? 0 : 1)
            };
            e.prototype.searchKDTree = function (a, c, b) {
                function d(a, c, b, m) {
                    var n = c.point,
                        p = e.kdAxisArray[b % m],
                        l = n,
                        q = g(a[f]) && g(n[f]) ? Math.pow(a[f] - n[f], 2) : null;
                    var r = g(a[k]) && g(n[k]) ? Math.pow(a[k] - n[k], 2) : null;
                    r = (q || 0) + (r || 0);
                    n.dist = g(r) ? Math.sqrt(r) : Number.MAX_VALUE;
                    n.distX = g(q) ? Math.sqrt(q) : Number.MAX_VALUE;
                    p = a[p] - n[p];
                    r = 0 > p ? "left" : "right";
                    q = 0 > p ? "right" : "left";
                    c[r] && (r = d(a, c[r], b + 1, m), l = r[h] < l[h] ? r : n);
                    c[q] && Math.sqrt(p * p) < l[h] && (a = d(a, c[q], b + 1, m), l = a[h] < l[h] ? a : l);
                    return l
                }
                var e = this,
                    f = this.kdAxisArray[0],
                    k = this.kdAxisArray[1],
                    h = c ? "distX" : "dist";
                c = -1 < e.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree(b);
                if (this.kdTree) return d(a, this.kdTree, c, c)
            };
            e.prototype.pointPlacementToXValue = function () {
                var a = this.options,
                    c = a.pointRange,
                    b = this.xAxis;
                a = a.pointPlacement;
                "between" === a && (a = b.reversed ? -.5 : .5);
                return M(a) ? a * (c || b.pointRange) : 0
            };
            e.prototype.isPointInside = function (a) {
                var c = this.chart,
                    b = this.xAxis,
                    d = this.yAxis;
                return "undefined" !== typeof a.plotY && "undefined" !==
                    typeof a.plotX && 0 <= a.plotY && a.plotY <= (d ? d.len : c.plotHeight) && 0 <= a.plotX && a.plotX <= (b ? b.len : c.plotWidth)
            };
            e.prototype.drawTracker = function () {
                var a = this,
                    c = a.options,
                    b = c.trackByArea,
                    d = [].concat(b ? a.areaPath : a.graphPath),
                    g = a.chart,
                    e = g.pointer,
                    f = g.renderer,
                    k = g.options.tooltip.snap,
                    h = a.tracker,
                    m = function (c) {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    },
                    n = "rgba(192,192,192," + (r ? .0001 : .002) + ")";
                h ? h.attr({
                    d: d
                }) : a.graph && (a.tracker = f.path(d).attr({
                    visibility: a.visible ? "inherit" : "hidden",
                    zIndex: 2
                }).addClass(b ? "highcharts-tracker-area" :
                    "highcharts-tracker-line").add(a.group), g.styledMode || a.tracker.attr({
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    stroke: n,
                    fill: b ? n : "none",
                    "stroke-width": a.graph.strokeWidth() + (b ? 0 : 2 * k)
                }), [a.tracker, a.markerGroup, a.dataLabelsGroup].forEach(function (a) {
                    if (a && (a.addClass("highcharts-tracker").on("mouseover", m).on("mouseout", function (a) {
                            e.onTrackerMouseOut(a)
                        }), c.cursor && !g.styledMode && a.css({
                            cursor: c.cursor
                        }), q)) a.on("touchstart", m)
                }));
                L(this, "afterDrawTracker")
            };
            e.prototype.addPoint = function (a,
                c, b, d, g) {
                var e = this.options,
                    f = this.data,
                    k = this.chart,
                    h = this.xAxis;
                h = h && h.hasNames && h.names;
                var m = e.data,
                    n = this.xData,
                    p;
                c = H(c, !0);
                var l = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(l, [a]);
                var q = l.x;
                var r = n.length;
                if (this.requireSorting && q < n[r - 1])
                    for (p = !0; r && n[r - 1] > q;) r--;
                this.updateParallelArrays(l, "splice", r, 0, 0);
                this.updateParallelArrays(l, r);
                h && l.name && (h[q] = l.name);
                m.splice(r, 0, a);
                if (p || this.processedData) this.data.splice(r, 0, null), this.processData();
                "point" === e.legendType && this.generatePoints();
                b && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(l, "shift"), m.shift()));
                !1 !== g && L(this, "addPoint", {
                    point: l
                });
                this.isDirtyData = this.isDirty = !0;
                c && k.redraw(d)
            };
            e.prototype.removePoint = function (a, c, b) {
                var g = this,
                    e = g.data,
                    f = e[a],
                    k = g.points,
                    h = g.chart,
                    m = function () {
                        k && k.length === e.length && k.splice(a, 1);
                        e.splice(a, 1);
                        g.options.data.splice(a, 1);
                        g.updateParallelArrays(f || {
                            series: g
                        }, "splice", a, 1);
                        f && f.destroy();
                        g.isDirty = !0;
                        g.isDirtyData = !0;
                        c && h.redraw()
                    };
                d(b, h);
                c = H(c, !0);
                f ? f.firePointEvent("remove",
                    null, m) : m()
            };
            e.prototype.remove = function (a, c, b, d) {
                function g() {
                    e.destroy(d);
                    f.isDirtyLegend = f.isDirtyBox = !0;
                    f.linkSeries();
                    H(a, !0) && f.redraw(c)
                }
                var e = this,
                    f = e.chart;
                !1 !== b ? L(e, "remove", null, g) : g()
            };
            e.prototype.update = function (a, c) {
                a = k(a, this.userOptions);
                L(this, "update", {
                    options: a
                });
                var b = this,
                    d = b.chart,
                    g = b.userOptions,
                    e = b.initialType || b.type,
                    f = d.options.plotOptions,
                    h = J[e].prototype,
                    m = b.finishedAnimating && {
                        animation: !1
                    },
                    n = {},
                    p, l = ["eventOptions", "navigatorSeries", "baseSeries"],
                    q = a.type || g.type || d.options.chart.type,
                    r = !(this.hasDerivedData || q && q !== this.type || "undefined" !== typeof a.pointStart || "undefined" !== typeof a.pointInterval || "undefined" !== typeof a.relativeXValue || a.joinBy || a.mapData || b.hasOptionChanged("dataGrouping") || b.hasOptionChanged("pointStart") || b.hasOptionChanged("pointInterval") || b.hasOptionChanged("pointIntervalUnit") || b.hasOptionChanged("keys"));
                q = q || e;
                r && (l.push("data", "isDirtyData", "points", "processedData", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels",
                    "clips", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && l.push("area", "graph"), b.parallelArrays.forEach(function (a) {
                    l.push(a + "Data")
                }), a.data && (a.dataSorting && A(b.options.dataSorting, a.dataSorting), this.setData(a.data, !1)));
                a = P(g, m, {
                    index: "undefined" === typeof g.index ? b.index : g.index,
                    pointStart: H(f && f.series && f.series.pointStart, g.pointStart, b.xData[0])
                }, !r && {
                    data: b.options.data
                }, a);
                r && a.data && (a.data = b.options.data);
                l = ["group", "markerGroup", "dataLabelsGroup",
                    "transformGroup"
                ].concat(l);
                l.forEach(function (a) {
                    l[a] = b[a];
                    delete b[a]
                });
                f = !1;
                if (J[q]) {
                    if (f = q !== b.type, b.remove(!1, !1, !1, !0), f)
                        if (Object.setPrototypeOf) Object.setPrototypeOf(b, J[q].prototype);
                        else {
                            m = Object.hasOwnProperty.call(b, "hcEvents") && b.hcEvents;
                            for (p in h) b[p] = void 0;
                            A(b, J[q].prototype);
                            m ? b.hcEvents = m : delete b.hcEvents
                        }
                } else D(17, !0, d, {
                    missingModuleFor: q
                });
                l.forEach(function (a) {
                    b[a] = l[a]
                });
                b.init(d, a);
                if (r && this.points) {
                    var u = b.options;
                    !1 === u.visible ? (n.graphic = 1, n.dataLabel = 1) : b._hasPointLabels ||
                        (a = u.marker, h = u.dataLabels, !a || !1 !== a.enabled && (g.marker && g.marker.symbol) === a.symbol || (n.graphic = 1), h && !1 === h.enabled && (n.dataLabel = 1));
                    this.points.forEach(function (a) {
                        a && a.series && (a.resolveColor(), Object.keys(n).length && a.destroyElements(n), !1 === u.showInLegend && a.legendItem && d.legend.destroyItem(a))
                    }, this)
                }
                b.initialType = e;
                d.linkSeries();
                f && b.linkedSeries.length && (b.isDirtyData = !0);
                L(this, "afterUpdate");
                H(c, !0) && d.redraw(r ? void 0 : !1)
            };
            e.prototype.setName = function (a) {
                this.name = this.options.name =
                    this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            };
            e.prototype.hasOptionChanged = function (a) {
                var c = this.options[a],
                    b = this.chart.options.plotOptions,
                    d = this.userOptions[a];
                return d ? c !== d : c !== H(b && b[this.type] && b[this.type][a], b && b.series && b.series[a], c)
            };
            e.prototype.onMouseOver = function () {
                var a = this.chart,
                    c = a.hoverSeries;
                a.pointer.setHoverChartIndex();
                if (c && c !== this) c.onMouseOut();
                this.options.events.mouseOver && L(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            };
            e.prototype.onMouseOut = function () {
                var a =
                    this.options,
                    c = this.chart,
                    b = c.tooltip,
                    d = c.hoverPoint;
                c.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && L(this, "mouseOut");
                !b || this.stickyTracking || b.shared && !this.noSharedTooltip || b.hide();
                c.series.forEach(function (a) {
                    a.setState("", !0)
                })
            };
            e.prototype.setState = function (a, c) {
                var b = this,
                    d = b.options,
                    g = b.graph,
                    e = d.inactiveOtherPoints,
                    f = d.states,
                    k = H(f[a || "normal"] && f[a || "normal"].animation, b.chart.options.chart.animation),
                    h = d.lineWidth,
                    m = 0,
                    n = d.opacity;
                a = a || "";
                if (b.state !== a && ([b.group, b.markerGroup,
                        b.dataLabelsGroup
                    ].forEach(function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !b.chart.styledMode)) {
                    if (f[a] && !1 === f[a].enabled) return;
                    a && (h = f[a].lineWidth || h + (f[a].lineWidthPlus || 0), n = H(f[a].opacity, n));
                    if (g && !g.dashstyle)
                        for (d = {
                                "stroke-width": h
                            }, g.animate(d, k); b["zone-graph-" + m];) b["zone-graph-" + m].animate(d, k), m += 1;
                    e || [b.group, b.markerGroup, b.dataLabelsGroup, b.labelBySeries].forEach(function (a) {
                        a && a.animate({
                            opacity: n
                        }, k)
                    })
                }
                c &&
                    e && b.points && b.setAllPointsToState(a || void 0)
            };
            e.prototype.setAllPointsToState = function (a) {
                this.points.forEach(function (c) {
                    c.setState && c.setState(a)
                })
            };
            e.prototype.setVisible = function (a, c) {
                var b = this,
                    d = b.chart,
                    g = b.legendItem,
                    e = d.options.chart.ignoreHiddenSeries,
                    f = b.visible,
                    k = (b.visible = a = b.options.visible = b.userOptions.visible = "undefined" === typeof a ? !f : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
                    if (b[a]) b[a][k]()
                });
                if (d.hoverSeries === b || (d.hoverPoint &&
                        d.hoverPoint.series) === b) b.onMouseOut();
                g && d.legend.colorizeItem(b, a);
                b.isDirty = !0;
                b.options.stacking && d.series.forEach(function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                b.linkedSeries.forEach(function (c) {
                    c.setVisible(a, !1)
                });
                e && (d.isDirtyBox = !0);
                L(b, k);
                !1 !== c && d.redraw()
            };
            e.prototype.show = function () {
                this.setVisible(!0)
            };
            e.prototype.hide = function () {
                this.setVisible(!1)
            };
            e.prototype.select = function (a) {
                this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a;
                this.checkbox &&
                    (this.checkbox.checked = a);
                L(this, a ? "select" : "unselect")
            };
            e.prototype.shouldShowTooltip = function (a, c, b) {
                void 0 === b && (b = {});
                b.series = this;
                b.visiblePlotOnly = !0;
                return this.chart.isInsidePlot(a, c, b)
            };
            e.defaultOptions = G;
            return e
        }();
        A(f.prototype, {
            axisTypes: ["xAxis", "yAxis"],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            drawLegendSymbol: v.drawLineMarker,
            isCartesian: !0,
            kdAxisArray: ["clientX", "plotY"],
            parallelArrays: ["x", "y"],
            pointClass: E,
            requireSorting: !0,
            sorted: !0
        });
        B.series = f;
        "";
        "";
        return f
    });
    K(l, "Extensions/ScrollablePlotArea.js", [l["Core/Animation/AnimationUtilities.js"], l["Core/Axis/Axis.js"], l["Core/Chart/Chart.js"], l["Core/Series/Series.js"], l["Core/Renderer/RendererRegistry.js"], l["Core/Utilities.js"]], function (f, e, l, C, v, E) {
        var G = f.stop,
            B = E.addEvent,
            y = E.createElement,
            t = E.defined,
            h = E.merge,
            d = E.pick;
        B(l, "afterSetChartSize", function (b) {
            var d = this.options.chart.scrollablePlotArea,
                f = d && d.minWidth;
            d = d && d.minHeight;
            if (!this.renderer.forExport) {
                if (f) {
                    if (this.scrollablePixelsX = f = Math.max(0,
                            f - this.chartWidth)) {
                        this.scrollablePlotBox = this.renderer.scrollablePlotBox = h(this.plotBox);
                        this.plotBox.width = this.plotWidth += f;
                        this.inverted ? this.clipBox.height += f : this.clipBox.width += f;
                        var l = {
                            1: {
                                name: "right",
                                value: f
                            }
                        }
                    }
                } else d && (this.scrollablePixelsY = f = Math.max(0, d - this.chartHeight), t(f) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = h(this.plotBox), this.plotBox.height = this.plotHeight += f, this.inverted ? this.clipBox.width += f : this.clipBox.height += f, l = {
                    2: {
                        name: "bottom",
                        value: f
                    }
                }));
                l && !b.skipAxes &&
                    this.axes.forEach(function (b) {
                        l[b.side] ? b.getPlotLinePath = function () {
                            var d = l[b.side].name,
                                f = this[d];
                            this[d] = f - l[b.side].value;
                            var h = e.prototype.getPlotLinePath.apply(this, arguments);
                            this[d] = f;
                            return h
                        } : (b.setAxisSize(), b.setAxisTranslation())
                    })
            }
        });
        B(l, "render", function () {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        l.prototype.setUpScrolling = function () {
            var b = this,
                d = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (d.overflowX = "auto");
            this.scrollablePixelsY && (d.overflowY = "auto");
            this.scrollingParent = y("div", {
                className: "highcharts-scrolling-parent"
            }, {
                position: "relative"
            }, this.renderTo);
            this.scrollingContainer = y("div", {
                className: "highcharts-scrolling"
            }, d, this.scrollingParent);
            B(this.scrollingContainer, "scroll", function () {
                b.pointer && delete b.pointer.chartPosition
            });
            this.innerContainer = y("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        l.prototype.moveFixedElements = function () {
            var b = this.container,
                d = this.fixedRenderer,
                e = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "),
                f;
            this.scrollablePixelsX &&
                !this.inverted ? f = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? f = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? f = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (f = ".highcharts-yaxis");
            f && e.push("" + f + ":not(.highcharts-radial-axis)", "" + f + "-labels:not(.highcharts-radial-axis-labels)");
            e.forEach(function (e) {
                [].forEach.call(b.querySelectorAll(e), function (b) {
                    (b.namespaceURI === d.SVG_NS ? d.box : d.box.parentNode).appendChild(b);
                    b.style.pointerEvents = "auto"
                })
            })
        };
        l.prototype.applyFixed =
            function () {
                var b = !this.fixedDiv,
                    e = this.options.chart,
                    f = e.scrollablePlotArea,
                    h = v.getRendererType();
                b ? (this.fixedDiv = y("div", {
                        className: "highcharts-fixed"
                    }, {
                        position: "absolute",
                        overflow: "hidden",
                        pointerEvents: "none",
                        zIndex: (e.style && e.style.zIndex || 0) + 2,
                        top: 0
                    }, null, !0), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = e = new h(this.fixedDiv, this.chartWidth, this.chartHeight, this.options.chart.style),
                    this.scrollableMask = e.path().attr({
                        fill: this.options.chart.backgroundColor || "#fff",
                        "fill-opacity": d(f.opacity, .85),
                        zIndex: -1
                    }).addClass("highcharts-scrollable-mask").add(), B(this, "afterShowResetZoom", this.moveFixedElements), B(this, "afterApplyDrilldown", this.moveFixedElements), B(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
                if (this.scrollableDirty || b) this.scrollableDirty = !1, this.moveFixedElements();
                e = this.chartWidth + (this.scrollablePixelsX ||
                    0);
                h = this.chartHeight + (this.scrollablePixelsY || 0);
                G(this.container);
                this.container.style.width = e + "px";
                this.container.style.height = h + "px";
                this.renderer.boxWrapper.attr({
                    width: e,
                    height: h,
                    viewBox: [0, 0, e, h].join(" ")
                });
                this.chartBackground.attr({
                    width: e,
                    height: h
                });
                this.scrollingContainer.style.height = this.chartHeight + "px";
                b && (f.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * f.scrollPositionX), f.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * f.scrollPositionY));
                h = this.axisOffset;
                b = this.plotTop - h[0] - 1;
                f = this.plotLeft - h[3] - 1;
                e = this.plotTop + this.plotHeight + h[2] + 1;
                h = this.plotLeft + this.plotWidth + h[1] + 1;
                var n = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                    l = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
                b = this.scrollablePixelsX ? [
                    ["M", 0, b],
                    ["L", this.plotLeft - 1, b],
                    ["L", this.plotLeft - 1, e],
                    ["L", 0, e],
                    ["Z"],
                    ["M", n, b],
                    ["L", this.chartWidth, b],
                    ["L", this.chartWidth, e],
                    ["L", n, e],
                    ["Z"]
                ] : this.scrollablePixelsY ? [
                    ["M", f, 0],
                    ["L", f, this.plotTop - 1],
                    ["L", h, this.plotTop -
                        1
                    ],
                    ["L", h, 0],
                    ["Z"],
                    ["M", f, l],
                    ["L", f, this.chartHeight],
                    ["L", h, this.chartHeight],
                    ["L", h, l],
                    ["Z"]
                ] : [
                    ["M", 0, 0]
                ];
                "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                    d: b
                })
            };
        B(e, "afterInit", function () {
            this.chart.scrollableDirty = !0
        });
        B(C, "show", function () {
            this.chart.scrollableDirty = !0
        });
        ""
    });
    K(l, "Core/Axis/StackingAxis.js", [l["Core/Animation/AnimationUtilities.js"], l["Core/Axis/Axis.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var C = f.getDeferredAnimation,
            v = l.addEvent,
            E = l.destroyObjectProperties,
            G = l.fireEvent,
            B = l.isNumber,
            y = l.objectEach,
            t;
        (function (e) {
            function d() {
                var b = this.stacking;
                if (b) {
                    var d = b.stacks;
                    y(d, function (b, e) {
                        E(b);
                        d[e] = null
                    });
                    b && b.stackTotalGroup && b.stackTotalGroup.destroy()
                }
            }

            function b() {
                this.stacking || (this.stacking = new h(this))
            }
            var f = [];
            e.compose = function (e) {
                -1 === f.indexOf(e) && (f.push(e), v(e, "init", b), v(e, "destroy", d));
                return e
            };
            var h = function () {
                function b(b) {
                    this.oldStacks = {};
                    this.stacks = {};
                    this.stacksTouched = 0;
                    this.axis = b
                }
                b.prototype.buildStacks = function () {
                    var b = this.axis,
                        d = b.series,
                        e = b.options.reversedStacks,
                        f = d.length,
                        h;
                    if (!b.isXAxis) {
                        this.usePercentage = !1;
                        for (h = f; h--;) {
                            var m = d[e ? h : f - h - 1];
                            m.setStackedPoints();
                            m.setGroupedPoints()
                        }
                        for (h = 0; h < f; h++) d[h].modifyStacks();
                        G(b, "afterBuildStacks")
                    }
                };
                b.prototype.cleanStacks = function () {
                    if (!this.axis.isXAxis) {
                        if (this.oldStacks) var b = this.stacks = this.oldStacks;
                        y(b, function (b) {
                            y(b, function (b) {
                                b.cumulative = b.total
                            })
                        })
                    }
                };
                b.prototype.resetStacks = function () {
                    var b = this,
                        d = b.stacks;
                    b.axis.isXAxis || y(d, function (d) {
                        y(d, function (e, f) {
                            B(e.touched) &&
                                e.touched < b.stacksTouched ? (e.destroy(), delete d[f]) : (e.total = null, e.cumulative = null)
                        })
                    })
                };
                b.prototype.renderStackTotals = function () {
                    var b = this.axis,
                        d = b.chart,
                        e = d.renderer,
                        f = this.stacks;
                    b = C(d, b.options.stackLabels && b.options.stackLabels.animation || !1);
                    var h = this.stackTotalGroup = this.stackTotalGroup || e.g("stack-labels").attr({
                        zIndex: 6,
                        opacity: 0
                    }).add();
                    h.translate(d.plotLeft, d.plotTop);
                    y(f, function (b) {
                        y(b, function (b) {
                            b.render(h)
                        })
                    });
                    h.animate({
                        opacity: 1
                    }, b)
                };
                return b
            }();
            e.Additions = h
        })(t || (t = {}));
        return t
    });
    K(l, "Extensions/Stacking.js", [l["Core/Axis/Axis.js"], l["Core/Chart/Chart.js"], l["Core/FormatUtilities.js"], l["Core/Globals.js"], l["Core/Series/Series.js"], l["Core/Axis/StackingAxis.js"], l["Core/Utilities.js"]], function (f, e, l, C, v, E, G) {
        var B = l.format,
            y = G.correctFloat,
            t = G.defined,
            h = G.destroyObjectProperties,
            d = G.isArray,
            b = G.isNumber,
            p = G.objectEach,
            q = G.pick,
            r = function () {
                function d(b, d, e, f, h) {
                    var k = b.chart.inverted;
                    this.axis = b;
                    this.isNegative = e;
                    this.options = d = d || {};
                    this.x = f;
                    this.total = null;
                    this.points = {};
                    this.hasValidPoints = !1;
                    this.stack = h;
                    this.rightCliff = this.leftCliff = 0;
                    this.alignOptions = {
                        align: d.align || (k ? e ? "left" : "right" : "center"),
                        verticalAlign: d.verticalAlign || (k ? "middle" : e ? "bottom" : "top"),
                        y: d.y,
                        x: d.x
                    };
                    this.textAlign = d.textAlign || (k ? e ? "right" : "left" : "center")
                }
                d.prototype.destroy = function () {
                    h(this, this.axis)
                };
                d.prototype.render = function (b) {
                    var d = this.axis.chart,
                        e = this.options,
                        f = e.format;
                    f = f ? B(f, this, d) : e.formatter.call(this);
                    this.label ? this.label.attr({
                        text: f,
                        visibility: "hidden"
                    }) : (this.label =
                        d.renderer.label(f, null, null, e.shape, null, null, e.useHTML, !1, "stack-labels"), f = {
                            r: e.borderRadius || 0,
                            text: f,
                            rotation: e.rotation,
                            padding: q(e.padding, 5),
                            visibility: "hidden"
                        }, d.styledMode || (f.fill = e.backgroundColor, f.stroke = e.borderColor, f["stroke-width"] = e.borderWidth, this.label.css(e.style)), this.label.attr(f), this.label.added || this.label.add(b));
                    this.label.labelrank = d.plotSizeY
                };
                d.prototype.setOffset = function (d, e, f, h, m) {
                    var k = this.axis,
                        a = k.chart;
                    h = k.translate(k.stacking.usePercentage ? 100 : h ? h : this.total,
                        0, 0, 0, 1);
                    f = k.translate(f ? f : 0);
                    f = t(h) && Math.abs(h - f);
                    d = q(m, a.xAxis[0].translate(this.x)) + d;
                    k = t(h) && this.getStackBox(a, this, d, h, e, f, k);
                    e = this.label;
                    f = this.isNegative;
                    d = "justify" === q(this.options.overflow, "justify");
                    var g = this.textAlign;
                    e && k && (m = e.getBBox(), h = e.padding, g = "left" === g ? a.inverted ? -h : h : "right" === g ? m.width : a.inverted && "center" === g ? m.width / 2 : a.inverted ? f ? m.width + h : -h : m.width / 2, f = a.inverted ? m.height / 2 : f ? -h : m.height, this.alignOptions.x = q(this.options.x, 0), this.alignOptions.y = q(this.options.y,
                        0), k.x -= g, k.y -= f, e.align(this.alignOptions, null, k), a.isInsidePlot(e.alignAttr.x + g - this.alignOptions.x, e.alignAttr.y + f - this.alignOptions.y) ? e.show() : (e.hide(), d = !1), d && v.prototype.justifyDataLabel.call(this.axis, e, this.alignOptions, e.alignAttr, m, k), e.attr({
                        x: e.alignAttr.x,
                        y: e.alignAttr.y
                    }), q(!d && this.options.crop, !0) && ((a = b(e.x) && b(e.y) && a.isInsidePlot(e.x - h + e.width, e.y) && a.isInsidePlot(e.x + h, e.y)) || e.hide()))
                };
                d.prototype.getStackBox = function (b, d, e, f, h, k, a) {
                    var g = d.axis.reversed,
                        c = b.inverted,
                        m = a.height +
                        a.pos - (c ? b.plotLeft : b.plotTop);
                    d = d.isNegative && !g || !d.isNegative && g;
                    return {
                        x: c ? d ? f - a.right : f - k + a.pos - b.plotLeft : e + b.xAxis[0].transB - b.plotLeft,
                        y: c ? a.height - e - h : d ? m - f - k : m - f,
                        width: c ? k : h,
                        height: c ? h : k
                    }
                };
                return d
            }();
        e.prototype.getStacks = function () {
            var b = this,
                d = b.inverted;
            b.yAxis.forEach(function (b) {
                b.stacking && b.stacking.stacks && b.hasVisibleSeries && (b.stacking.oldStacks = b.stacking.stacks)
            });
            b.series.forEach(function (e) {
                var f = e.xAxis && e.xAxis.options || {};
                !e.options.stacking || !0 !== e.visible && !1 !== b.options.chart.ignoreHiddenSeries ||
                    (e.stackKey = [e.type, q(e.options.stack, ""), d ? f.top : f.left, d ? f.height : f.width].join())
            })
        };
        E.compose(f);
        v.prototype.setGroupedPoints = function () {
            var b = this.yAxis.stacking;
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? v.prototype.setStackedPoints.call(this, "group") : b && p(b.stacks, function (d, e) {
                "group" === e.slice(-5) && (p(d, function (b) {
                    return b.destroy()
                }), delete b.stacks[e])
            })
        };
        v.prototype.setStackedPoints = function (b) {
            var e =
                b || this.options.stacking;
            if (e && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var f = this.processedXData,
                    h = this.processedYData,
                    n = [],
                    m = h.length,
                    k = this.options,
                    a = k.threshold,
                    g = q(k.startFromThreshold && a, 0);
                k = k.stack;
                b = b ? "" + this.type + ",".concat(e) : this.stackKey;
                var c = "-" + b,
                    p = this.negStacks,
                    l = this.yAxis,
                    u = l.stacking.stacks,
                    v = l.stacking.oldStacks,
                    B, C;
                l.stacking.stacksTouched += 1;
                for (C = 0; C < m; C++) {
                    var M = f[C];
                    var G = h[C];
                    var E = this.getStackIndicator(E, M, this.index);
                    var I = E.key;
                    var H = (B =
                        p && G < (g ? 0 : a)) ? c : b;
                    u[H] || (u[H] = {});
                    u[H][M] || (v[H] && v[H][M] ? (u[H][M] = v[H][M], u[H][M].total = null) : u[H][M] = new r(l, l.options.stackLabels, B, M, k));
                    H = u[H][M];
                    null !== G ? (H.points[I] = H.points[this.index] = [q(H.cumulative, g)], t(H.cumulative) || (H.base = I), H.touched = l.stacking.stacksTouched, 0 < E.index && !1 === this.singleStacks && (H.points[I][0] = H.points[this.index + "," + M + ",0"][0])) : H.points[I] = H.points[this.index] = null;
                    "percent" === e ? (B = B ? b : c, p && u[B] && u[B][M] ? (B = u[B][M], H.total = B.total = Math.max(B.total, H.total) + Math.abs(G) ||
                        0) : H.total = y(H.total + (Math.abs(G) || 0))) : "group" === e ? (d(G) && (G = G[0]), null !== G && (H.total = (H.total || 0) + 1)) : H.total = y(H.total + (G || 0));
                    H.cumulative = "group" === e ? (H.total || 1) - 1 : q(H.cumulative, g) + (G || 0);
                    null !== G && (H.points[I].push(H.cumulative), n[C] = H.cumulative, H.hasValidPoints = !0)
                }
                "percent" === e && (l.stacking.usePercentage = !0);
                "group" !== e && (this.stackedYData = n);
                l.stacking.oldStacks = {}
            }
        };
        v.prototype.modifyStacks = function () {
            var b = this,
                d = b.stackKey,
                e = b.yAxis.stacking.stacks,
                f = b.processedXData,
                h, m = b.options.stacking;
            b[m + "Stacker"] && [d, "-" + d].forEach(function (d) {
                for (var a = f.length, g, c; a--;)
                    if (g = f[a], h = b.getStackIndicator(h, g, b.index, d), c = (g = e[d] && e[d][g]) && g.points[h.key]) b[m + "Stacker"](c, g, a)
            })
        };
        v.prototype.percentStacker = function (b, d, e) {
            d = d.total ? 100 / d.total : 0;
            b[0] = y(b[0] * d);
            b[1] = y(b[1] * d);
            this.stackedYData[e] = b[1]
        };
        v.prototype.getStackIndicator = function (b, d, e, f) {
            !t(b) || b.x !== d || f && b.stackKey !== f ? b = {
                x: d,
                index: 0,
                key: f,
                stackKey: f
            } : b.index++;
            b.key = [e, d, b.index].join();
            return b
        };
        C.StackItem = r;
        "";
        return C.StackItem
    });
    K(l, "Series/Line/LineSeries.js", [l["Core/Series/Series.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var C = this && this.__extends || function () {
                var e = function (f, l) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (e, f) {
                        e.__proto__ = f
                    } || function (e, f) {
                        for (var d in f) f.hasOwnProperty(d) && (e[d] = f[d])
                    };
                    return e(f, l)
                };
                return function (f, l) {
                    function t() {
                        this.constructor = f
                    }
                    e(f, l);
                    f.prototype = null === l ? Object.create(l) : (t.prototype = l.prototype, new t)
                }
            }(),
            v = l.defined,
            E = l.merge;
        l = function (e) {
            function l() {
                var f = null !== e && e.apply(this, arguments) || this;
                f.data = void 0;
                f.options = void 0;
                f.points = void 0;
                return f
            }
            C(l, e);
            l.prototype.drawGraph = function () {
                var e = this,
                    f = this.options,
                    h = (this.gappedPath || this.getGraphPath).call(this),
                    d = this.chart.styledMode,
                    b = [
                        ["graph", "highcharts-graph"]
                    ];
                d || b[0].push(f.lineColor || this.color || "#cccccc", f.dashStyle);
                b = e.getZonesGraphs(b);
                b.forEach(function (b, l) {
                    var p = b[0],
                        n = e[p],
                        q = n ? "animate" : "attr";
                    n ? (n.endX = e.preventGraphAnimation ? null : h.xMap,
                        n.animate({
                            d: h
                        })) : h.length && (e[p] = n = e.chart.renderer.path(h).addClass(b[1]).attr({
                        zIndex: 1
                    }).add(e.group));
                    n && !d && (p = {
                        stroke: b[2],
                        "stroke-width": f.lineWidth,
                        fill: e.fillGraph && e.color || "none"
                    }, b[3] ? p.dashstyle = b[3] : "square" !== f.linecap && (p["stroke-linecap"] = p["stroke-linejoin"] = "round"), n[q](p).shadow(2 > l && f.shadow));
                    n && (n.startX = h.xMap, n.isArea = h.isArea)
                })
            };
            l.prototype.getGraphPath = function (e, f, h) {
                var d = this,
                    b = d.options,
                    p = [],
                    l = [],
                    r, n = b.step;
                e = e || d.points;
                var t = e.reversed;
                t && e.reverse();
                (n = {
                    right: 1,
                    center: 2
                } [n] || n && 3) && t && (n = 4 - n);
                e = this.getValidPoints(e, !1, !(b.connectNulls && !f && !h));
                e.forEach(function (q, t) {
                    var x = q.plotX,
                        m = q.plotY,
                        k = e[t - 1];
                    (q.leftCliff || k && k.rightCliff) && !h && (r = !0);
                    q.isNull && !v(f) && 0 < t ? r = !b.connectNulls : q.isNull && !f ? r = !0 : (0 === t || r ? t = [
                            ["M", q.plotX, q.plotY]
                        ] : d.getPointSpline ? t = [d.getPointSpline(e, q, t)] : n ? (t = 1 === n ? [
                            ["L", k.plotX, m]
                        ] : 2 === n ? [
                            ["L", (k.plotX + x) / 2, k.plotY],
                            ["L", (k.plotX + x) / 2, m]
                        ] : [
                            ["L", x, k.plotY]
                        ], t.push(["L", x, m])) : t = [
                            ["L", x, m]
                        ], l.push(q.x), n && (l.push(q.x), 2 === n && l.push(q.x)),
                        p.push.apply(p, t), r = !1)
                });
                p.xMap = l;
                return d.graphPath = p
            };
            l.prototype.getZonesGraphs = function (e) {
                this.zones.forEach(function (f, h) {
                    h = ["zone-graph-" + h, "highcharts-graph highcharts-zone-graph-" + h + " " + (f.className || "")];
                    this.chart.styledMode || h.push(f.color || this.color, f.dashStyle || this.options.dashStyle);
                    e.push(h)
                }, this);
                return e
            };
            l.defaultOptions = E(f.defaultOptions, {});
            return l
        }(f);
        e.registerSeriesType("line", l);
        "";
        return l
    });
    K(l, "Series/Area/AreaSeries.js", [l["Core/Color/Color.js"], l["Core/Legend/LegendSymbol.js"],
        l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]
    ], function (f, e, l, C) {
        var v = this && this.__extends || function () {
                var e = function (d, b) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (b, d) {
                        b.__proto__ = d
                    } || function (b, d) {
                        for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                    };
                    return e(d, b)
                };
                return function (d, b) {
                    function f() {
                        this.constructor = d
                    }
                    e(d, b);
                    d.prototype = null === b ? Object.create(b) : (f.prototype = b.prototype, new f)
                }
            }(),
            E = f.parse,
            G = l.seriesTypes.line;
        f = C.extend;
        var B = C.merge,
            y = C.objectEach,
            t = C.pick;
        C = function (e) {
            function d() {
                var b = null !== e && e.apply(this, arguments) || this;
                b.data = void 0;
                b.options = void 0;
                b.points = void 0;
                return b
            }
            v(d, e);
            d.prototype.drawGraph = function () {
                this.areaPath = [];
                e.prototype.drawGraph.apply(this);
                var b = this,
                    d = this.areaPath,
                    f = this.options,
                    h = [
                        ["area", "highcharts-area", this.color, f.fillColor]
                    ];
                this.zones.forEach(function (d, e) {
                    h.push(["zone-area-" + e, "highcharts-area highcharts-zone-area-" + e + " " + d.className, d.color || b.color, d.fillColor || f.fillColor])
                });
                h.forEach(function (e) {
                    var h =
                        e[0],
                        p = {},
                        n = b[h],
                        l = n ? "animate" : "attr";
                    n ? (n.endX = b.preventGraphAnimation ? null : d.xMap, n.animate({
                        d: d
                    })) : (p.zIndex = 0, n = b[h] = b.chart.renderer.path(d).addClass(e[1]).add(b.group), n.isArea = !0);
                    b.chart.styledMode || (p.fill = t(e[3], E(e[2]).setOpacity(t(f.fillOpacity, .75)).get()));
                    n[l](p);
                    n.startX = d.xMap;
                    n.shiftUnit = f.step ? 2 : 1
                })
            };
            d.prototype.getGraphPath = function (b) {
                var d = G.prototype.getGraphPath,
                    e = this.options,
                    f = e.stacking,
                    h = this.yAxis,
                    l = [],
                    w = [],
                    z = this.index,
                    x = h.stacking.stacks[this.stackKey],
                    m = e.threshold,
                    k = Math.round(h.getThreshold(e.threshold));
                e = t(e.connectNulls, "percent" === f);
                var a = function (a, c, d) {
                    var e = b[a];
                    a = f && x[e.x].points[z];
                    var g = e[d + "Null"] || 0;
                    d = e[d + "Cliff"] || 0;
                    e = !0;
                    if (d || g) {
                        var p = (g ? a[0] : a[1]) + d;
                        var n = a[0] + d;
                        e = !!g
                    } else !f && b[c] && b[c].isNull && (p = n = m);
                    "undefined" !== typeof p && (w.push({
                        plotX: A,
                        plotY: null === p ? k : h.getThreshold(p),
                        isNull: e,
                        isCliff: !0
                    }), l.push({
                        plotX: A,
                        plotY: null === n ? k : h.getThreshold(n),
                        doCurve: !1
                    }))
                };
                b = b || this.points;
                f && (b = this.getStackPoints(b));
                for (var g = 0, c = b.length; g < c; ++g) {
                    f ||
                        (b[g].leftCliff = b[g].rightCliff = b[g].leftNull = b[g].rightNull = void 0);
                    var D = b[g].isNull;
                    var A = t(b[g].rectPlotX, b[g].plotX);
                    var u = f ? t(b[g].yBottom, k) : k;
                    if (!D || e) e || a(g, g - 1, "left"), D && !f && e || (w.push(b[g]), l.push({
                        x: g,
                        plotX: A,
                        plotY: u
                    })), e || a(g, g + 1, "right")
                }
                a = d.call(this, w, !0, !0);
                l.reversed = !0;
                D = d.call(this, l, !0, !0);
                (u = D[0]) && "M" === u[0] && (D[0] = ["L", u[1], u[2]]);
                D = a.concat(D);
                D.length && D.push(["Z"]);
                d = d.call(this, w, !1, e);
                D.xMap = a.xMap;
                this.areaPath = D;
                return d
            };
            d.prototype.getStackPoints = function (b) {
                var d =
                    this,
                    e = [],
                    f = [],
                    h = this.xAxis,
                    l = this.yAxis,
                    w = l.stacking.stacks[this.stackKey],
                    z = {},
                    x = l.series,
                    m = x.length,
                    k = l.options.reversedStacks ? 1 : -1,
                    a = x.indexOf(d);
                b = b || this.points;
                if (this.options.stacking) {
                    for (var g = 0; g < b.length; g++) b[g].leftNull = b[g].rightNull = void 0, z[b[g].x] = b[g];
                    y(w, function (a, c) {
                        null !== a.total && f.push(c)
                    });
                    f.sort(function (a, c) {
                        return a - c
                    });
                    var c = x.map(function (a) {
                        return a.visible
                    });
                    f.forEach(function (b, g) {
                        var p = 0,
                            n, q;
                        if (z[b] && !z[b].isNull) e.push(z[b]), [-1, 1].forEach(function (e) {
                            var h = 1 ===
                                e ? "rightNull" : "leftNull",
                                p = w[f[g + e]],
                                l = 0;
                            if (p)
                                for (var r = a; 0 <= r && r < m;) {
                                    var u = x[r].index;
                                    n = p.points[u];
                                    n || (u === d.index ? z[b][h] = !0 : c[r] && (q = w[b].points[u]) && (l -= q[1] - q[0]));
                                    r += k
                                }
                            z[b][1 === e ? "rightCliff" : "leftCliff"] = l
                        });
                        else {
                            for (var r = a; 0 <= r && r < m;) {
                                if (n = w[b].points[x[r].index]) {
                                    p = n[1];
                                    break
                                }
                                r += k
                            }
                            p = t(p, 0);
                            p = l.translate(p, 0, 1, 0, 1);
                            e.push({
                                isNull: !0,
                                plotX: h.translate(b, 0, 0, 0, 1),
                                x: b,
                                plotY: p,
                                yBottom: p
                            })
                        }
                    })
                }
                return e
            };
            d.defaultOptions = B(G.defaultOptions, {
                threshold: 0
            });
            return d
        }(G);
        f(C.prototype, {
            singleStacks: !1,
            drawLegendSymbol: e.drawRectangle
        });
        l.registerSeriesType("area", C);
        "";
        return C
    });
    K(l, "Series/Spline/SplineSeries.js", [l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]], function (f, e) {
        var l = this && this.__extends || function () {
                var e = function (f, l) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (e, f) {
                        e.__proto__ = f
                    } || function (e, f) {
                        for (var d in f) f.hasOwnProperty(d) && (e[d] = f[d])
                    };
                    return e(f, l)
                };
                return function (f, l) {
                    function t() {
                        this.constructor = f
                    }
                    e(f, l);
                    f.prototype = null === l ? Object.create(l) :
                        (t.prototype = l.prototype, new t)
                }
            }(),
            C = f.seriesTypes.line,
            v = e.merge,
            E = e.pick;
        e = function (e) {
            function f() {
                var f = null !== e && e.apply(this, arguments) || this;
                f.data = void 0;
                f.options = void 0;
                f.points = void 0;
                return f
            }
            l(f, e);
            f.prototype.getPointSpline = function (e, f, h) {
                var d = f.plotX || 0,
                    b = f.plotY || 0,
                    p = e[h - 1];
                h = e[h + 1];
                if (p && !p.isNull && !1 !== p.doCurve && !f.isCliff && h && !h.isNull && !1 !== h.doCurve && !f.isCliff) {
                    e = p.plotY || 0;
                    var l = h.plotX || 0;
                    h = h.plotY || 0;
                    var r = 0;
                    var n = (1.5 * d + (p.plotX || 0)) / 2.5;
                    var t = (1.5 * b + e) / 2.5;
                    l = (1.5 * d +
                        l) / 2.5;
                    var w = (1.5 * b + h) / 2.5;
                    l !== n && (r = (w - t) * (l - d) / (l - n) + b - w);
                    t += r;
                    w += r;
                    t > e && t > b ? (t = Math.max(e, b), w = 2 * b - t) : t < e && t < b && (t = Math.min(e, b), w = 2 * b - t);
                    w > h && w > b ? (w = Math.max(h, b), t = 2 * b - w) : w < h && w < b && (w = Math.min(h, b), t = 2 * b - w);
                    f.rightContX = l;
                    f.rightContY = w
                }
                f = ["C", E(p.rightContX, p.plotX, 0), E(p.rightContY, p.plotY, 0), E(n, d, 0), E(t, b, 0), d, b];
                p.rightContX = p.rightContY = void 0;
                return f
            };
            f.defaultOptions = v(C.defaultOptions);
            return f
        }(C);
        f.registerSeriesType("spline", e);
        "";
        return e
    });
    K(l, "Series/AreaSpline/AreaSplineSeries.js",
        [l["Series/Spline/SplineSeries.js"], l["Core/Legend/LegendSymbol.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]],
        function (f, e, l, C) {
            var v = this && this.__extends || function () {
                    var e = function (f, d) {
                        e = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function (b, d) {
                            b.__proto__ = d
                        } || function (b, d) {
                            for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                        };
                        return e(f, d)
                    };
                    return function (f, d) {
                        function b() {
                            this.constructor = f
                        }
                        e(f, d);
                        f.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b)
                    }
                }(),
                E = l.seriesTypes,
                G = E.area;
            E = E.area.prototype;
            var B = C.extend,
                y = C.merge;
            C = function (e) {
                function h() {
                    var d = null !== e && e.apply(this, arguments) || this;
                    d.data = void 0;
                    d.points = void 0;
                    d.options = void 0;
                    return d
                }
                v(h, e);
                h.defaultOptions = y(f.defaultOptions, G.defaultOptions);
                return h
            }(f);
            B(C.prototype, {
                getGraphPath: E.getGraphPath,
                getStackPoints: E.getStackPoints,
                drawGraph: E.drawGraph,
                drawLegendSymbol: e.drawRectangle
            });
            l.registerSeriesType("areaspline", C);
            "";
            return C
        });
    K(l, "Series/Column/ColumnSeries.js", [l["Core/Animation/AnimationUtilities.js"],
        l["Core/Color/Color.js"], l["Core/Globals.js"], l["Core/Legend/LegendSymbol.js"], l["Core/Series/Series.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]
    ], function (f, e, l, C, v, E, G) {
        var B = this && this.__extends || function () {
                var b = function (d, a) {
                    b = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (a, c) {
                        a.__proto__ = c
                    } || function (a, c) {
                        for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b])
                    };
                    return b(d, a)
                };
                return function (d, a) {
                    function e() {
                        this.constructor = d
                    }
                    b(d, a);
                    d.prototype = null === a ? Object.create(a) :
                        (e.prototype = a.prototype, new e)
                }
            }(),
            y = f.animObject,
            t = e.parse,
            h = l.hasTouch;
        f = l.noop;
        var d = G.clamp,
            b = G.css,
            p = G.defined,
            q = G.extend,
            r = G.fireEvent,
            n = G.isArray,
            J = G.isNumber,
            w = G.merge,
            z = G.pick,
            x = G.objectEach;
        G = function (e) {
            function f() {
                var a = null !== e && e.apply(this, arguments) || this;
                a.borderWidth = void 0;
                a.data = void 0;
                a.group = void 0;
                a.options = void 0;
                a.points = void 0;
                return a
            }
            B(f, e);
            f.prototype.animate = function (a) {
                var b = this,
                    c = this.yAxis,
                    e = b.options,
                    f = this.chart.inverted,
                    k = {},
                    h = f ? "translateX" : "translateY";
                if (a) k.scaleY =
                    .001, a = d(c.toPixels(e.threshold), c.pos, c.pos + c.len), f ? k.translateX = a - c.len : k.translateY = a, b.clipBox && b.setClip(), b.group.attr(k);
                else {
                    var m = Number(b.group.attr(h));
                    b.group.animate({
                        scaleY: 1
                    }, q(y(b.options.animation), {
                        step: function (a, d) {
                            b.group && (k[h] = m + d.pos * (c.pos - m), b.group.attr(k))
                        }
                    }))
                }
            };
            f.prototype.init = function (a, b) {
                e.prototype.init.apply(this, arguments);
                var c = this;
                a = c.chart;
                a.hasRendered && a.series.forEach(function (a) {
                    a.type === c.type && (a.isDirty = !0)
                })
            };
            f.prototype.getColumnMetrics = function () {
                var a =
                    this,
                    b = a.options,
                    c = a.xAxis,
                    d = a.yAxis,
                    e = c.options.reversedStacks;
                e = c.reversed && !e || !c.reversed && e;
                var f = {},
                    k, h = 0;
                !1 === b.grouping ? h = 1 : a.chart.series.forEach(function (b) {
                    var c = b.yAxis,
                        e = b.options;
                    if (b.type === a.type && (b.visible || !a.chart.options.chart.ignoreHiddenSeries) && d.len === c.len && d.pos === c.pos) {
                        if (e.stacking && "group" !== e.stacking) {
                            k = b.stackKey;
                            "undefined" === typeof f[k] && (f[k] = h++);
                            var g = f[k]
                        } else !1 !== e.grouping && (g = h++);
                        b.columnIndex = g
                    }
                });
                var m = Math.min(Math.abs(c.transA) * (c.ordinal && c.ordinal.slope ||
                        b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
                    l = m * b.groupPadding,
                    p = (m - 2 * l) / (h || 1);
                b = Math.min(b.maxPointWidth || c.len, z(b.pointWidth, p * (1 - 2 * b.pointPadding)));
                a.columnMetrics = {
                    width: b,
                    offset: (p - b) / 2 + (l + ((a.columnIndex || 0) + (e ? 1 : 0)) * p - m / 2) * (e ? -1 : 1),
                    paddedWidth: p,
                    columnCount: h
                };
                return a.columnMetrics
            };
            f.prototype.crispCol = function (a, b, c, d) {
                var e = this.chart,
                    g = this.borderWidth,
                    f = -(g % 2 ? .5 : 0);
                g = g % 2 ? .5 : 1;
                e.inverted && e.renderer.isVML && (g += 1);
                this.options.crisp && (c = Math.round(a + c) + f, a = Math.round(a) +
                    f, c -= a);
                d = Math.round(b + d) + g;
                f = .5 >= Math.abs(b) && .5 < d;
                b = Math.round(b) + g;
                d -= b;
                f && d && (--b, d += 1);
                return {
                    x: a,
                    y: b,
                    width: c,
                    height: d
                }
            };
            f.prototype.adjustForMissingColumns = function (a, b, c, d) {
                var e = this,
                    g = this.options.stacking;
                if (!c.isNull && 1 < d.columnCount) {
                    var f = this.yAxis.options.reversedStacks,
                        k = 0,
                        h = f ? 0 : -d.columnCount;
                    x(this.yAxis.stacking && this.yAxis.stacking.stacks, function (a) {
                        if ("number" === typeof c.x && (a = a[c.x.toString()])) {
                            var b = a.points[e.index],
                                d = a.total;
                            g ? (b && (k = h), a.hasValidPoints && (f ? h++ : h--)) : n(b) &&
                                (k = b[1], h = d || 0)
                        }
                    });
                    a = (c.plotX || 0) + ((h - 1) * d.paddedWidth + b) / 2 - b - k * d.paddedWidth
                }
                return a
            };
            f.prototype.translate = function () {
                var a = this,
                    b = a.chart,
                    c = a.options,
                    e = a.dense = 2 > a.closestPointRange * a.xAxis.transA;
                e = a.borderWidth = z(c.borderWidth, e ? 0 : 1);
                var f = a.xAxis,
                    k = a.yAxis,
                    h = c.threshold,
                    m = a.translatedThreshold = k.getThreshold(h),
                    l = z(c.minPointLength, 5),
                    n = a.getColumnMetrics(),
                    q = n.width,
                    r = a.pointXOffset = n.offset,
                    t = a.dataMin,
                    x = a.dataMax,
                    w = a.barW = Math.max(q, 1 + 2 * e);
                b.inverted && (m -= .5);
                c.pointPadding && (w = Math.ceil(w));
                v.prototype.translate.apply(a);
                a.points.forEach(function (e) {
                    var g = z(e.yBottom, m),
                        u = 999 + Math.abs(g),
                        A = e.plotX || 0;
                    u = d(e.plotY, -u, k.len + u);
                    var v = Math.min(u, g),
                        y = Math.max(u, g) - v,
                        D = q,
                        B = A + r,
                        C = w;
                    l && Math.abs(y) < l && (y = l, A = !k.reversed && !e.negative || k.reversed && e.negative, J(h) && J(x) && e.y === h && x <= h && (k.min || 0) < h && (t !== x || (k.max || 0) <= h) && (A = !A), v = Math.abs(v - m) > l ? g - l : m - (A ? l : 0));
                    p(e.options.pointWidth) && (D = C = Math.ceil(e.options.pointWidth), B -= Math.round((D - q) / 2));
                    c.centerInCategory && (B = a.adjustForMissingColumns(B,
                        D, e, n));
                    e.barX = B;
                    e.pointWidth = D;
                    e.tooltipPos = b.inverted ? [d(k.len + k.pos - b.plotLeft - u, k.pos - b.plotLeft, k.len + k.pos - b.plotLeft), f.len + f.pos - b.plotTop - B - C / 2, y] : [f.left - b.plotLeft + B + C / 2, d(u + k.pos - b.plotTop, k.pos - b.plotTop, k.len + k.pos - b.plotTop), y];
                    e.shapeType = a.pointClass.prototype.shapeType || "rect";
                    e.shapeArgs = a.crispCol.apply(a, e.isNull ? [B, m, C, 0] : [B, v, C, y])
                })
            };
            f.prototype.drawGraph = function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            };
            f.prototype.pointAttribs = function (a,
                b) {
                var c = this.options,
                    d = this.pointAttrToOptions || {},
                    e = d.stroke || "borderColor",
                    g = d["stroke-width"] || "borderWidth",
                    f = a && a.color || this.color,
                    k = a && a[e] || c[e] || f;
                d = a && a.options.dashStyle || c.dashStyle;
                var h = a && a[g] || c[g] || this[g] || 0,
                    m = z(a && a.opacity, c.opacity, 1);
                if (a && this.zones.length) {
                    var l = a.getZone();
                    f = a.options.color || l && (l.color || a.nonZonedColor) || this.color;
                    l && (k = l.borderColor || k, d = l.dashStyle || d, h = l.borderWidth || h)
                }
                b && a && (a = w(c.states[b], a.options.states && a.options.states[b] || {}), b = a.brightness,
                    f = a.color || "undefined" !== typeof b && t(f).brighten(a.brightness).get() || f, k = a[e] || k, h = a[g] || h, d = a.dashStyle || d, m = z(a.opacity, m));
                e = {
                    fill: f,
                    stroke: k,
                    "stroke-width": h,
                    opacity: m
                };
                d && (e.dashstyle = d);
                return e
            };
            f.prototype.drawPoints = function () {
                var a = this,
                    b = this.chart,
                    c = a.options,
                    d = b.renderer,
                    e = c.animationLimit || 250,
                    f;
                a.points.forEach(function (g) {
                    var k = g.graphic,
                        h = !!k,
                        m = k && b.pointCount < e ? "animate" : "attr";
                    if (J(g.plotY) && null !== g.y) {
                        f = g.shapeArgs;
                        k && g.hasNewShapeType() && (k = k.destroy());
                        a.enabledDataSorting &&
                            (g.startXPos = a.xAxis.reversed ? -(f ? f.width || 0 : 0) : a.xAxis.width);
                        k || (g.graphic = k = d[g.shapeType](f).add(g.group || a.group)) && a.enabledDataSorting && b.hasRendered && b.pointCount < e && (k.attr({
                            x: g.startXPos
                        }), h = !0, m = "animate");
                        if (k && h) k[m](w(f));
                        if (c.borderRadius) k[m]({
                            r: c.borderRadius
                        });
                        b.styledMode || k[m](a.pointAttribs(g, g.selected && "select")).shadow(!1 !== g.allowShadow && c.shadow, null, c.stacking && !c.borderRadius);
                        k && (k.addClass(g.getClassName(), !0), k.attr({
                            visibility: g.visible ? "inherit" : "hidden"
                        }))
                    } else k &&
                        (g.graphic = k.destroy())
                })
            };
            f.prototype.drawTracker = function () {
                var a = this,
                    d = a.chart,
                    c = d.pointer,
                    e = function (a) {
                        var b = c.getPointFromEvent(a);
                        "undefined" !== typeof b && (c.isDirectTouch = !0, b.onMouseOver(a))
                    },
                    f;
                a.points.forEach(function (a) {
                    f = n(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [];
                    a.graphic && (a.graphic.element.point = a);
                    f.forEach(function (b) {
                        b.div ? b.div.point = a : b.element.point = a
                    })
                });
                a._hasTracking || (a.trackerGroups.forEach(function (g) {
                    if (a[g]) {
                        a[g].addClass("highcharts-tracker").on("mouseover",
                            e).on("mouseout", function (a) {
                            c.onTrackerMouseOut(a)
                        });
                        if (h) a[g].on("touchstart", e);
                        !d.styledMode && a.options.cursor && a[g].css(b).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0);
                r(this, "afterDrawTracker")
            };
            f.prototype.remove = function () {
                var a = this,
                    b = a.chart;
                b.hasRendered && b.series.forEach(function (b) {
                    b.type === a.type && (b.isDirty = !0)
                });
                v.prototype.remove.apply(a, arguments)
            };
            f.defaultOptions = w(v.defaultOptions, {
                borderRadius: 0,
                centerInCategory: !1,
                groupPadding: .2,
                marker: null,
                pointPadding: .1,
                minPointLength: 0,
                cropThreshold: 50,
                pointRange: null,
                states: {
                    hover: {
                        halo: !1,
                        brightness: .1
                    },
                    select: {
                        color: "#cccccc",
                        borderColor: "#000000"
                    }
                },
                dataLabels: {
                    align: void 0,
                    verticalAlign: void 0,
                    y: void 0
                },
                startFromThreshold: !0,
                stickyTracking: !1,
                tooltip: {
                    distance: 6
                },
                threshold: 0,
                borderColor: "#ffffff"
            });
            return f
        }(v);
        q(G.prototype, {
            cropShoulder: 0,
            directTouch: !0,
            drawLegendSymbol: C.drawRectangle,
            getSymbol: f,
            negStacks: !0,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        E.registerSeriesType("column", G);
        "";
        "";
        return G
    });
    K(l, "Core/Series/DataLabel.js",
        [l["Core/Animation/AnimationUtilities.js"], l["Core/FormatUtilities.js"], l["Core/Utilities.js"]],
        function (f, e, l) {
            var C = f.getDeferredAnimation,
                v = e.format,
                E = l.defined,
                G = l.extend,
                B = l.fireEvent,
                y = l.isArray,
                t = l.merge,
                h = l.objectEach,
                d = l.pick,
                b = l.splat,
                p;
            (function (e) {
                function f(b, a, e, c, f) {
                    var g = this,
                        k = this.chart,
                        h = this.isCartesian && k.inverted,
                        m = this.enabledDataSorting,
                        l = d(b.dlBox && b.dlBox.centerX, b.plotX),
                        p = b.plotY,
                        n = e.rotation,
                        q = e.align,
                        r = E(l) && E(p) && k.isInsidePlot(l, Math.round(p), {
                            inverted: h,
                            paneCoordinates: !0,
                            series: g
                        }),
                        t = function (c) {
                            m && g.xAxis && !x && g.setDataLabelStartPos(b, a, f, r, c)
                        },
                        x = "justify" === d(e.overflow, m ? "none" : "justify"),
                        z = this.visible && !1 !== b.visible && (b.series.forceDL || m && !x || r || d(e.inside, !!this.options.stacking) && c && k.isInsidePlot(l, h ? c.x + 1 : c.y + c.height - 1, {
                            inverted: h,
                            paneCoordinates: !0,
                            series: g
                        }));
                    if (z && E(l) && E(p)) {
                        n && a.attr({
                            align: q
                        });
                        q = a.getBBox(!0);
                        var w = [0, 0];
                        var v = k.renderer.fontMetrics(k.styledMode ? void 0 : e.style.fontSize, a).b;
                        c = G({
                            x: h ? this.yAxis.len - p : l,
                            y: Math.round(h ? this.xAxis.len -
                                l : p),
                            width: 0,
                            height: 0
                        }, c);
                        G(e, {
                            width: q.width,
                            height: q.height
                        });
                        n ? (x = !1, w = k.renderer.rotCorr(v, n), l = {
                            x: c.x + (e.x || 0) + c.width / 2 + w.x,
                            y: c.y + (e.y || 0) + {
                                top: 0,
                                middle: .5,
                                bottom: 1
                            } [e.verticalAlign] * c.height
                        }, w = [q.x - Number(a.attr("x")), q.y - Number(a.attr("y"))], t(l), a[f ? "attr" : "animate"](l)) : (t(c), a.align(e, void 0, c), l = a.alignAttr);
                        x && 0 <= c.height ? this.justifyDataLabel(a, e, l, q, c, f) : d(e.crop, !0) && (c = l.x, t = l.y, c += w[0], t += w[1], z = k.isInsidePlot(c, t, {
                            paneCoordinates: !0,
                            series: g
                        }) && k.isInsidePlot(c + q.width, t + q.height, {
                            paneCoordinates: !0,
                            series: g
                        }));
                        if (e.shape && !n) a[f ? "attr" : "animate"]({
                            anchorX: h ? k.plotWidth - b.plotY : b.plotX,
                            anchorY: h ? k.plotHeight - b.plotX : b.plotY
                        })
                    }
                    f && m && (a.placed = !1);
                    z || m && !x ? a.show() : (a.hide(), a.placed = !1)
                }

                function l(b, a) {
                    var d = a.filter;
                    return d ? (a = d.operator, b = b[d.property], d = d.value, ">" === a && b > d || "<" === a && b < d || ">=" === a && b >= d || "<=" === a && b <= d || "==" === a && b == d || "===" === a && b === d ? !0 : !1) : !0
                }

                function p() {
                    var e = this,
                        a = e.chart,
                        g = e.options,
                        c = e.points,
                        f = e.hasRendered || 0,
                        m = a.renderer,
                        p = g.dataLabels,
                        n, q =
                        p.animation;
                    q = p.defer ? C(a, q, e) : {
                        defer: 0,
                        duration: 0
                    };
                    p = z(z(a.options.plotOptions && a.options.plotOptions.series && a.options.plotOptions.series.dataLabels, a.options.plotOptions && a.options.plotOptions[e.type] && a.options.plotOptions[e.type].dataLabels), p);
                    B(this, "drawDataLabels");
                    if (y(p) || p.enabled || e._hasPointLabels) {
                        var r = e.plotGroup("dataLabelsGroup", "data-labels", f ? "inherit" : "hidden", p.zIndex || 6);
                        r.attr({
                            opacity: +f
                        });
                        !f && (f = e.dataLabelsGroup) && (e.visible && r.show(), f[g.animation ? "animate" : "attr"]({
                                opacity: 1
                            },
                            q));
                        c.forEach(function (c) {
                            n = b(z(p, c.dlOptions || c.options && c.options.dataLabels));
                            n.forEach(function (b, f) {
                                var k = b.enabled && (!c.isNull || c.dataLabelOnNull) && l(c, b),
                                    p = c.connectors ? c.connectors[f] : c.connector,
                                    n = c.dataLabels ? c.dataLabels[f] : c.dataLabel,
                                    q = !n,
                                    t = d(b.distance, c.labelDistance);
                                if (k) {
                                    var u = c.getLabelConfig();
                                    var x = d(b[c.formatPrefix + "Format"], b.format);
                                    u = E(x) ? v(x, u, a) : (b[c.formatPrefix + "Formatter"] || b.formatter).call(u, b);
                                    x = b.style;
                                    var z = b.rotation;
                                    a.styledMode || (x.color = d(b.color, x.color, e.color,
                                        "#000000"), "contrast" === x.color ? (c.contrastColor = m.getContrast(c.color || e.color), x.color = !E(t) && b.inside || 0 > t || g.stacking ? c.contrastColor : "#000000") : delete c.contrastColor, g.cursor && (x.cursor = g.cursor));
                                    var w = {
                                        r: b.borderRadius || 0,
                                        rotation: z,
                                        padding: b.padding,
                                        zIndex: 1
                                    };
                                    a.styledMode || (w.fill = b.backgroundColor, w.stroke = b.borderColor, w["stroke-width"] = b.borderWidth);
                                    h(w, function (a, b) {
                                        "undefined" === typeof a && delete w[b]
                                    })
                                }!n || k && E(u) && !!n.div === !!b.useHTML && (n.rotation && b.rotation || n.rotation === b.rotation) ||
                                    (q = !0, c.dataLabel = n = c.dataLabel && c.dataLabel.destroy(), c.dataLabels && (1 === c.dataLabels.length ? delete c.dataLabels : delete c.dataLabels[f]), f || delete c.dataLabel, p && (c.connector = c.connector.destroy(), c.connectors && (1 === c.connectors.length ? delete c.connectors : delete c.connectors[f])));
                                k && E(u) ? (n ? w.text = u : (c.dataLabels = c.dataLabels || [], n = c.dataLabels[f] = z ? m.text(u, 0, 0, b.useHTML).addClass("highcharts-data-label") : m.label(u, 0, 0, b.shape, null, null, b.useHTML, null, "data-label"), f || (c.dataLabel = n), n.addClass(" highcharts-data-label-color-" +
                                    c.colorIndex + " " + (b.className || "") + (b.useHTML ? " highcharts-tracker" : ""))), n.options = b, n.attr(w), a.styledMode || n.css(x).shadow(b.shadow), n.added || n.add(r), b.textPath && !b.useHTML && (n.setTextPath(c.getDataLabelPath && c.getDataLabelPath(n) || c.graphic, b.textPath), c.dataLabelPath && !b.textPath.enabled && (c.dataLabelPath = c.dataLabelPath.destroy())), e.alignDataLabel(c, n, b, null, q)) : n && n.hide()
                            })
                        })
                    }
                    B(this, "afterDrawDataLabels")
                }

                function q(b, a, d, c, e, f) {
                    var g = this.chart,
                        k = a.align,
                        h = a.verticalAlign,
                        m = b.box ? 0 : b.padding ||
                        0,
                        l = a.x;
                    l = void 0 === l ? 0 : l;
                    var n = a.y;
                    n = void 0 === n ? 0 : n;
                    var p = (d.x || 0) + m;
                    if (0 > p) {
                        "right" === k && 0 <= l ? (a.align = "left", a.inside = !0) : l -= p;
                        var q = !0
                    }
                    p = (d.x || 0) + c.width - m;
                    p > g.plotWidth && ("left" === k && 0 >= l ? (a.align = "right", a.inside = !0) : l += g.plotWidth - p, q = !0);
                    p = d.y + m;
                    0 > p && ("bottom" === h && 0 <= n ? (a.verticalAlign = "top", a.inside = !0) : n -= p, q = !0);
                    p = (d.y || 0) + c.height - m;
                    p > g.plotHeight && ("top" === h && 0 >= n ? (a.verticalAlign = "bottom", a.inside = !0) : n += g.plotHeight - p, q = !0);
                    q && (a.x = l, a.y = n, b.placed = !f, b.align(a, void 0, e));
                    return q
                }

                function z(b, a) {
                    var d = [],
                        c;
                    if (y(b) && !y(a)) d = b.map(function (b) {
                        return t(b, a)
                    });
                    else if (y(a) && !y(b)) d = a.map(function (a) {
                        return t(b, a)
                    });
                    else if (y(b) || y(a))
                        for (c = Math.max(b.length, a.length); c--;) d[c] = t(b[c], a[c]);
                    else d = t(b, a);
                    return d
                }

                function x(b, a, d, c, e) {
                    var g = this.chart,
                        f = g.inverted,
                        h = this.xAxis,
                        k = h.reversed,
                        m = f ? a.height / 2 : a.width / 2;
                    b = (b = b.pointWidth) ? b / 2 : 0;
                    a.startXPos = f ? e.x : k ? -m - b : h.width - m + b;
                    a.startYPos = f ? k ? this.yAxis.height - m + b : -m - b : e.y;
                    c ? "hidden" === a.visibility && (a.show(), a.attr({
                            opacity: 0
                        }).animate({
                            opacity: 1
                        })) :
                        a.attr({
                            opacity: 1
                        }).animate({
                            opacity: 0
                        }, void 0, a.hide);
                    g.hasRendered && (d && a.attr({
                        x: a.startXPos,
                        y: a.startYPos
                    }), a.placed = !0)
                }
                var m = [];
                e.compose = function (b) {
                    if (-1 === m.indexOf(b)) {
                        var a = b.prototype;
                        m.push(b);
                        a.alignDataLabel = f;
                        a.drawDataLabels = p;
                        a.justifyDataLabel = q;
                        a.setDataLabelStartPos = x
                    }
                }
            })(p || (p = {}));
            "";
            return p
        });
    K(l, "Series/Column/ColumnDataLabel.js", [l["Core/Series/DataLabel.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var C = e.series,
            v = l.merge,
            E = l.pick,
            G;
        (function (e) {
            function l(e,
                d, b, f, l) {
                var h = this.chart.inverted,
                    n = e.series,
                    p = (n.xAxis ? n.xAxis.len : this.chart.plotSizeX) || 0;
                n = (n.yAxis ? n.yAxis.len : this.chart.plotSizeY) || 0;
                var q = e.dlBox || e.shapeArgs,
                    t = E(e.below, e.plotY > E(this.translatedThreshold, n)),
                    x = E(b.inside, !!this.options.stacking);
                q && (f = v(q), 0 > f.y && (f.height += f.y, f.y = 0), q = f.y + f.height - n, 0 < q && q < f.height && (f.height -= q), h && (f = {
                    x: n - f.y - f.height,
                    y: p - f.x - f.width,
                    width: f.height,
                    height: f.width
                }), x || (h ? (f.x += t ? 0 : f.width, f.width = 0) : (f.y += t ? f.height : 0, f.height = 0)));
                b.align = E(b.align,
                    !h || x ? "center" : t ? "right" : "left");
                b.verticalAlign = E(b.verticalAlign, h || x ? "middle" : t ? "top" : "bottom");
                C.prototype.alignDataLabel.call(this, e, d, b, f, l);
                b.inside && e.contrastColor && d.css({
                    color: e.contrastColor
                })
            }
            var t = [];
            e.compose = function (e) {
                f.compose(C); - 1 === t.indexOf(e) && (t.push(e), e.prototype.alignDataLabel = l)
            }
        })(G || (G = {}));
        return G
    });
    K(l, "Series/Bar/BarSeries.js", [l["Series/Column/ColumnSeries.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var C = this && this.__extends ||
            function () {
                var e = function (f, l) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (e, f) {
                        e.__proto__ = f
                    } || function (e, f) {
                        for (var d in f) f.hasOwnProperty(d) && (e[d] = f[d])
                    };
                    return e(f, l)
                };
                return function (f, l) {
                    function t() {
                        this.constructor = f
                    }
                    e(f, l);
                    f.prototype = null === l ? Object.create(l) : (t.prototype = l.prototype, new t)
                }
            }(),
            v = l.extend,
            E = l.merge;
        l = function (e) {
            function l() {
                var f = null !== e && e.apply(this, arguments) || this;
                f.data = void 0;
                f.options = void 0;
                f.points = void 0;
                return f
            }
            C(l, e);
            l.defaultOptions =
                E(f.defaultOptions, {});
            return l
        }(f);
        v(l.prototype, {
            inverted: !0
        });
        e.registerSeriesType("bar", l);
        "";
        return l
    });
    K(l, "Series/Scatter/ScatterSeries.js", [l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]], function (f, e) {
        var l = this && this.__extends || function () {
                var e = function (f, h) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (d, b) {
                        d.__proto__ = b
                    } || function (d, b) {
                        for (var e in b) b.hasOwnProperty(e) && (d[e] = b[e])
                    };
                    return e(f, h)
                };
                return function (f, h) {
                    function d() {
                        this.constructor = f
                    }
                    e(f,
                        h);
                    f.prototype = null === h ? Object.create(h) : (d.prototype = h.prototype, new d)
                }
            }(),
            C = f.seriesTypes,
            v = C.column,
            E = C.line;
        C = e.addEvent;
        var G = e.extend,
            B = e.merge;
        e = function (e) {
            function f() {
                var f = null !== e && e.apply(this, arguments) || this;
                f.data = void 0;
                f.options = void 0;
                f.points = void 0;
                return f
            }
            l(f, e);
            f.prototype.applyJitter = function () {
                var e = this,
                    d = this.options.jitter,
                    b = this.points.length;
                d && this.points.forEach(function (f, h) {
                    ["x", "y"].forEach(function (l, n) {
                        var p = "plot" + l.toUpperCase();
                        if (d[l] && !f.isNull) {
                            var q = e[l +
                                "Axis"];
                            var r = d[l] * q.transA;
                            if (q && !q.isLog) {
                                var t = Math.max(0, f[p] - r);
                                q = Math.min(q.len, f[p] + r);
                                n = 1E4 * Math.sin(h + n * b);
                                f[p] = t + (q - t) * (n - Math.floor(n));
                                "x" === l && (f.clientX = f.plotX)
                            }
                        }
                    })
                })
            };
            f.prototype.drawGraph = function () {
                this.options.lineWidth ? e.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy())
            };
            f.defaultOptions = B(E.defaultOptions, {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {
                    x: 0,
                    y: 0
                },
                marker: {
                    enabled: !0
                },
                tooltip: {
                    headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                    pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                }
            });
            return f
        }(E);
        G(e.prototype, {
            drawTracker: v.prototype.drawTracker,
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1
        });
        C(e, "afterTranslate", function () {
            this.applyJitter()
        });
        f.registerSeriesType("scatter", e);
        "";
        return e
    });
    K(l, "Series/CenteredUtilities.js", [l["Core/Globals.js"], l["Core/Series/Series.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var C = f.deg2rad,
            v = l.fireEvent,
            E = l.isNumber,
            G = l.pick,
            B = l.relativeLength,
            y;
        (function (f) {
            f.getCenter = function () {
                var f = this.options,
                    d = this.chart,
                    b = 2 * (f.slicedOffset || 0),
                    l = d.plotWidth - 2 * b,
                    q = d.plotHeight - 2 * b,
                    r = f.center,
                    n = Math.min(l, q),
                    t = f.thickness,
                    w = f.size,
                    z = f.innerSize || 0;
                "string" === typeof w && (w = parseFloat(w));
                "string" === typeof z && (z = parseFloat(z));
                f = [G(r[0], "50%"), G(r[1], "50%"), G(w && 0 > w ? void 0 : f.size, "100%"), G(z && 0 > z ? void 0 : f.innerSize || 0, "0%")];
                !d.angular || this instanceof e || (f[3] = 0);
                for (r = 0; 4 > r; ++r) w = f[r], d = 2 > r || 2 === r && /%$/.test(w),
                    f[r] = B(w, [l, q, n, f[2]][r]) + (d ? b : 0);
                f[3] > f[2] && (f[3] = f[2]);
                E(t) && 2 * t < f[2] && 0 < t && (f[3] = f[2] - 2 * t);
                v(this, "afterGetCenter", {
                    positions: f
                });
                return f
            };
            f.getStartAndEndRadians = function (e, d) {
                e = E(e) ? e : 0;
                d = E(d) && d > e && 360 > d - e ? d : e + 360;
                return {
                    start: C * (e + -90),
                    end: C * (d + -90)
                }
            }
        })(y || (y = {}));
        "";
        return y
    });
    K(l, "Series/Pie/PiePoint.js", [l["Core/Animation/AnimationUtilities.js"], l["Core/Series/Point.js"], l["Core/Utilities.js"]], function (f, e, l) {
        var C = this && this.__extends || function () {
                var e = function (d, b) {
                    e = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (b, d) {
                        b.__proto__ = d
                    } || function (b, d) {
                        for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                    };
                    return e(d, b)
                };
                return function (d, b) {
                    function f() {
                        this.constructor = d
                    }
                    e(d, b);
                    d.prototype = null === b ? Object.create(b) : (f.prototype = b.prototype, new f)
                }
            }(),
            v = f.setAnimation,
            E = l.addEvent,
            G = l.defined;
        f = l.extend;
        var B = l.isNumber,
            y = l.pick,
            t = l.relativeLength;
        e = function (e) {
            function d() {
                var b = null !== e && e.apply(this, arguments) || this;
                b.labelDistance = void 0;
                b.options = void 0;
                b.series = void 0;
                return b
            }
            C(d, e);
            d.prototype.getConnectorPath = function () {
                var b = this.labelPosition,
                    d = this.series.options.dataLabels,
                    e = this.connectorShapes,
                    f = d.connectorShape;
                e[f] && (f = e[f]);
                return f.call(this, {
                    x: b.final.x,
                    y: b.final.y,
                    alignment: b.alignment
                }, b.connectorPosition, d)
            };
            d.prototype.getTranslate = function () {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            };
            d.prototype.haloPath = function (b) {
                var d = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d.x,
                    d.y, d.r + b, d.r + b, {
                        innerR: d.r - 1,
                        start: d.start,
                        end: d.end
                    })
            };
            d.prototype.init = function () {
                var b = this;
                e.prototype.init.apply(this, arguments);
                this.name = y(this.name, "Slice");
                var d = function (d) {
                    b.slice("select" === d.type)
                };
                E(this, "select", d);
                E(this, "unselect", d);
                return this
            };
            d.prototype.isValid = function () {
                return B(this.y) && 0 <= this.y
            };
            d.prototype.setVisible = function (b, d) {
                var e = this,
                    f = this.series,
                    h = f.chart,
                    l = f.options.ignoreHiddenPoint;
                d = y(d, l);
                b !== this.visible && (this.visible = this.options.visible = b = "undefined" ===
                    typeof b ? !this.visible : b, f.options.data[f.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (d) {
                        if (e[d]) e[d][b ? "show" : "hide"](b)
                    }), this.legendItem && h.legend.colorizeItem(this, b), b || "hover" !== this.state || this.setState(""), l && (f.isDirty = !0), d && h.redraw())
            };
            d.prototype.slice = function (b, d, e) {
                var f = this.series;
                v(e, f.chart);
                y(d, !0);
                this.sliced = this.options.sliced = G(b) ? b : !this.sliced;
                f.options.data[f.data.indexOf(this)] = this.options;
                this.graphic && this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            };
            return d
        }(e);
        f(e.prototype, {
            connectorShapes: {
                fixedOffset: function (e, d, b) {
                    var f = d.breakAt;
                    d = d.touchingSliceAt;
                    return [
                        ["M", e.x, e.y], b.softConnector ? ["C", e.x + ("left" === e.alignment ? -5 : 5), e.y, 2 * f.x - d.x, 2 * f.y - d.y, f.x, f.y] : ["L", f.x, f.y],
                        ["L", d.x, d.y]
                    ]
                },
                straight: function (e, d) {
                    d = d.touchingSliceAt;
                    return [
                        ["M", e.x, e.y],
                        ["L", d.x, d.y]
                    ]
                },
                crookedLine: function (e, d, b) {
                    d = d.touchingSliceAt;
                    var f = this.series,
                        h = f.center[0],
                        l = f.chart.plotWidth,
                        n = f.chart.plotLeft;
                    f = e.alignment;
                    var v = this.shapeArgs.r;
                    b = t(b.crookDistance, 1);
                    l = "left" === f ? h + v + (l + n - h - v) * (1 - b) : n + (h - v) * b;
                    b = ["L", l, e.y];
                    h = !0;
                    if ("left" === f ? l > e.x || l < d.x : l < e.x || l > d.x) h = !1;
                    e = [
                        ["M", e.x, e.y]
                    ];
                    h && e.push(b);
                    e.push(["L", d.x, d.y]);
                    return e
                }
            }
        });
        return e
    });
    K(l, "Series/Pie/PieSeries.js", [l["Series/CenteredUtilities.js"], l["Series/Column/ColumnSeries.js"], l["Core/Globals.js"], l["Core/Legend/LegendSymbol.js"], l["Series/Pie/PiePoint.js"], l["Core/Series/Series.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Renderer/SVG/Symbols.js"],
        l["Core/Utilities.js"]
    ], function (f, e, l, C, v, E, G, B, y) {
        var t = this && this.__extends || function () {
                var b = function (d, e) {
                    b = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function (b, d) {
                        b.__proto__ = d
                    } || function (b, d) {
                        for (var e in d) d.hasOwnProperty(e) && (b[e] = d[e])
                    };
                    return b(d, e)
                };
                return function (d, e) {
                    function f() {
                        this.constructor = d
                    }
                    b(d, e);
                    d.prototype = null === e ? Object.create(e) : (f.prototype = e.prototype, new f)
                }
            }(),
            h = f.getStartAndEndRadians;
        l = l.noop;
        var d = y.clamp,
            b = y.extend,
            p = y.fireEvent,
            q = y.merge,
            r = y.pick,
            n = y.relativeLength;
        y = function (b) {
            function e() {
                var d = null !== b && b.apply(this, arguments) || this;
                d.center = void 0;
                d.data = void 0;
                d.maxLabelDistance = void 0;
                d.options = void 0;
                d.points = void 0;
                return d
            }
            t(e, b);
            e.prototype.animate = function (b) {
                var d = this,
                    e = d.points,
                    f = d.startAngleRad;
                b || e.forEach(function (a) {
                    var b = a.graphic,
                        c = a.shapeArgs;
                    b && c && (b.attr({
                        r: r(a.startR, d.center && d.center[3] / 2),
                        start: f,
                        end: f
                    }), b.animate({
                        r: c.r,
                        start: c.start,
                        end: c.end
                    }, d.options.animation))
                })
            };
            e.prototype.drawEmpty = function () {
                var b = this.startAngleRad,
                    d = this.endAngleRad,
                    e = this.options;
                if (0 === this.total && this.center) {
                    var f = this.center[0];
                    var a = this.center[1];
                    this.graph || (this.graph = this.chart.renderer.arc(f, a, this.center[1] / 2, 0, b, d).addClass("highcharts-empty-series").add(this.group));
                    this.graph.attr({
                        d: B.arc(f, a, this.center[2] / 2, 0, {
                            start: b,
                            end: d,
                            innerR: this.center[3] / 2
                        })
                    });
                    this.chart.styledMode || this.graph.attr({
                        "stroke-width": e.borderWidth,
                        fill: e.fillColor || "none",
                        stroke: e.color || "#cccccc"
                    })
                } else this.graph && (this.graph = this.graph.destroy())
            };
            e.prototype.drawPoints = function () {
                var b = this.chart.renderer;
                this.points.forEach(function (d) {
                    d.graphic && d.hasNewShapeType() && (d.graphic = d.graphic.destroy());
                    d.graphic || (d.graphic = b[d.shapeType](d.shapeArgs).add(d.series.group), d.delayedRendering = !0)
                })
            };
            e.prototype.generatePoints = function () {
                b.prototype.generatePoints.call(this);
                this.updateTotals()
            };
            e.prototype.getX = function (b, e, f) {
                var k = this.center,
                    a = this.radii ? this.radii[f.index] || 0 : k[2] / 2;
                b = Math.asin(d((b - k[1]) / (a + f.labelDistance), -1, 1));
                return k[0] +
                    (e ? -1 : 1) * Math.cos(b) * (a + f.labelDistance) + (0 < f.labelDistance ? (e ? -1 : 1) * this.options.dataLabels.padding : 0)
            };
            e.prototype.hasData = function () {
                return !!this.processedXData.length
            };
            e.prototype.redrawPoints = function () {
                var b = this,
                    d = b.chart,
                    e = d.renderer,
                    f = b.options.shadow,
                    a, g, c, h;
                this.drawEmpty();
                !f || b.shadowGroup || d.styledMode || (b.shadowGroup = e.g("shadow").attr({
                    zIndex: -1
                }).add(b.group));
                b.points.forEach(function (k) {
                    var l = {};
                    g = k.graphic;
                    if (!k.isNull && g) {
                        var m = void 0;
                        h = k.shapeArgs;
                        a = k.getTranslate();
                        d.styledMode ||
                            (m = k.shadowGroup, f && !m && (m = k.shadowGroup = e.g("shadow").add(b.shadowGroup)), m && m.attr(a), c = b.pointAttribs(k, k.selected && "select"));
                        k.delayedRendering ? (g.setRadialReference(b.center).attr(h).attr(a), d.styledMode || g.attr(c).attr({
                            "stroke-linejoin": "round"
                        }).shadow(f, m), k.delayedRendering = !1) : (g.setRadialReference(b.center), d.styledMode || q(!0, l, c), q(!0, l, h, a), g.animate(l));
                        g.attr({
                            visibility: k.visible ? "inherit" : "hidden"
                        });
                        g.addClass(k.getClassName(), !0)
                    } else g && (k.graphic = g.destroy())
                })
            };
            e.prototype.sortByAngle =
                function (b, d) {
                    b.sort(function (b, e) {
                        return "undefined" !== typeof b.angle && (e.angle - b.angle) * d
                    })
                };
            e.prototype.translate = function (b) {
                p(this, "translate");
                this.generatePoints();
                var d = this.options,
                    e = d.slicedOffset,
                    f = e + (d.borderWidth || 0),
                    a = h(d.startAngle, d.endAngle),
                    g = this.startAngleRad = a.start;
                a = (this.endAngleRad = a.end) - g;
                var c = this.points,
                    l = d.dataLabels.distance;
                d = d.ignoreHiddenPoint;
                var q = c.length,
                    t, v = 0;
                b || (this.center = b = this.getCenter());
                for (t = 0; t < q; t++) {
                    var w = c[t];
                    var z = g + v * a;
                    !w.isValid() || d && !w.visible ||
                        (v += w.percentage / 100);
                    var y = g + v * a;
                    var B = {
                        x: b[0],
                        y: b[1],
                        r: b[2] / 2,
                        innerR: b[3] / 2,
                        start: Math.round(1E3 * z) / 1E3,
                        end: Math.round(1E3 * y) / 1E3
                    };
                    w.shapeType = "arc";
                    w.shapeArgs = B;
                    w.labelDistance = r(w.options.dataLabels && w.options.dataLabels.distance, l);
                    w.labelDistance = n(w.labelDistance, B.r);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, w.labelDistance);
                    y = (y + z) / 2;
                    y > 1.5 * Math.PI ? y -= 2 * Math.PI : y < -Math.PI / 2 && (y += 2 * Math.PI);
                    w.slicedTranslation = {
                        translateX: Math.round(Math.cos(y) * e),
                        translateY: Math.round(Math.sin(y) *
                            e)
                    };
                    B = Math.cos(y) * b[2] / 2;
                    var C = Math.sin(y) * b[2] / 2;
                    w.tooltipPos = [b[0] + .7 * B, b[1] + .7 * C];
                    w.half = y < -Math.PI / 2 || y > Math.PI / 2 ? 1 : 0;
                    w.angle = y;
                    z = Math.min(f, w.labelDistance / 5);
                    w.labelPosition = {
                        natural: {
                            x: b[0] + B + Math.cos(y) * w.labelDistance,
                            y: b[1] + C + Math.sin(y) * w.labelDistance
                        },
                        "final": {},
                        alignment: 0 > w.labelDistance ? "center" : w.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {
                                x: b[0] + B + Math.cos(y) * z,
                                y: b[1] + C + Math.sin(y) * z
                            },
                            touchingSliceAt: {
                                x: b[0] + B,
                                y: b[1] + C
                            }
                        }
                    }
                }
                p(this, "afterTranslate")
            };
            e.prototype.updateTotals = function () {
                var b =
                    this.points,
                    d = b.length,
                    e = this.options.ignoreHiddenPoint,
                    f, a = 0;
                for (f = 0; f < d; f++) {
                    var g = b[f];
                    !g.isValid() || e && !g.visible || (a += g.y)
                }
                this.total = a;
                for (f = 0; f < d; f++) g = b[f], g.percentage = 0 < a && (g.visible || !e) ? g.y / a * 100 : 0, g.total = a
            };
            e.defaultOptions = q(E.defaultOptions, {
                center: [null, null],
                clip: !1,
                colorByPoint: !0,
                dataLabels: {
                    allowOverlap: !0,
                    connectorPadding: 5,
                    connectorShape: "fixedOffset",
                    crookDistance: "70%",
                    distance: 30,
                    enabled: !0,
                    formatter: function () {
                        return this.point.isNull ? void 0 : this.point.name
                    },
                    softConnector: !0,
                    x: 0
                },
                fillColor: void 0,
                ignoreHiddenPoint: !0,
                inactiveOtherPoints: !0,
                legendType: "point",
                marker: null,
                size: null,
                showInLegend: !1,
                slicedOffset: 10,
                stickyTracking: !1,
                tooltip: {
                    followPointer: !0
                },
                borderColor: "#ffffff",
                borderWidth: 1,
                lineWidth: void 0,
                states: {
                    hover: {
                        brightness: .1
                    }
                }
            });
            return e
        }(E);
        b(y.prototype, {
            axisTypes: [],
            directTouch: !0,
            drawGraph: void 0,
            drawLegendSymbol: C.drawRectangle,
            drawTracker: e.prototype.drawTracker,
            getCenter: f.getCenter,
            getSymbol: l,
            isCartesian: !1,
            noSharedTooltip: !0,
            pointAttribs: e.prototype.pointAttribs,
            pointClass: v,
            requireSorting: !1,
            searchPoint: l,
            trackerGroups: ["group", "dataLabelsGroup"]
        });
        G.registerSeriesType("pie", y);
        "";
        return y
    });
    K(l, "Series/Pie/PieDataLabel.js", [l["Core/Series/DataLabel.js"], l["Core/Globals.js"], l["Core/Renderer/RendererUtilities.js"], l["Core/Series/SeriesRegistry.js"], l["Core/Utilities.js"]], function (f, e, l, C, v) {
        var E = e.noop,
            G = l.distribute,
            B = C.series,
            y = v.arrayMax,
            t = v.clamp,
            h = v.defined,
            d = v.merge,
            b = v.pick,
            p = v.relativeLength,
            q;
        (function (e) {
            function l() {
                var e = this,
                    f = e.data,
                    a = e.chart,
                    g = e.options.dataLabels || {},
                    c = g.connectorPadding,
                    l = a.plotWidth,
                    n = a.plotHeight,
                    p = a.plotLeft,
                    q = Math.round(a.chartWidth / 3),
                    r = e.center,
                    t = r[2] / 2,
                    x = r[1],
                    v = [
                        [],
                        []
                    ],
                    w = [0, 0, 0, 0],
                    z = e.dataLabelPositioners,
                    C, E, J, K, P, F, T, N, V, W, X, Q;
                e.visible && (g.enabled || e._hasPointLabels) && (f.forEach(function (a) {
                    a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                        width: "auto"
                    }).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), a.dataLabel.shortened = !1)
                }), B.prototype.drawDataLabels.apply(e), f.forEach(function (a) {
                    a.dataLabel &&
                        (a.visible ? (v[a.half].push(a), a.dataLabel._pos = null, !h(g.style.width) && !h(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > q && (a.dataLabel.css({
                            width: Math.round(.7 * q) + "px"
                        }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
                }), v.forEach(function (d, f) {
                    var k = d.length,
                        m = [],
                        q;
                    if (k) {
                        e.sortByAngle(d, f - .5);
                        if (0 < e.maxLabelDistance) {
                            var u = Math.max(0, x - t - e.maxLabelDistance);
                            var v = Math.min(x + t + e.maxLabelDistance, a.plotHeight);
                            d.forEach(function (b) {
                                0 < b.labelDistance && b.dataLabel && (b.top = Math.max(0, x - t - b.labelDistance), b.bottom = Math.min(x + t + b.labelDistance, a.plotHeight), q = b.dataLabel.getBBox().height || 21, b.distributeBox = {
                                    target: b.labelPosition.natural.y - b.top + q / 2,
                                    size: q,
                                    rank: b.y
                                }, m.push(b.distributeBox))
                            });
                            u = v + q - u;
                            G(m, u, u / 5)
                        }
                        for (X = 0; X < k; X++) {
                            C = d[X];
                            F = C.labelPosition;
                            K = C.dataLabel;
                            W = !1 === C.visible ? "hidden" : "inherit";
                            V = u = F.natural.y;
                            m && h(C.distributeBox) && ("undefined" ===
                                typeof C.distributeBox.pos ? W = "hidden" : (T = C.distributeBox.size, V = z.radialDistributionY(C)));
                            delete C.positionIndex;
                            if (g.justify) N = z.justify(C, t, r);
                            else switch (g.alignTo) {
                                case "connectors":
                                    N = z.alignToConnectors(d, f, l, p);
                                    break;
                                case "plotEdges":
                                    N = z.alignToPlotEdges(K, f, l, p);
                                    break;
                                default:
                                    N = z.radialDistributionX(e, C, V, u)
                            }
                            K._attr = {
                                visibility: W,
                                align: F.alignment
                            };
                            Q = C.options.dataLabels || {};
                            K._pos = {
                                x: N + b(Q.x, g.x) + ({
                                    left: c,
                                    right: -c
                                } [F.alignment] || 0),
                                y: V + b(Q.y, g.y) - 10
                            };
                            F.final.x = N;
                            F.final.y = V;
                            b(g.crop, !0) &&
                                (P = K.getBBox().width, u = null, N - P < c && 1 === f ? (u = Math.round(P - N + c), w[3] = Math.max(u, w[3])) : N + P > l - c && 0 === f && (u = Math.round(N + P - l + c), w[1] = Math.max(u, w[1])), 0 > V - T / 2 ? w[0] = Math.max(Math.round(-V + T / 2), w[0]) : V + T / 2 > n && (w[2] = Math.max(Math.round(V + T / 2 - n), w[2])), K.sideOverflow = u)
                        }
                    }
                }), 0 === y(w) || this.verifyDataLabelOverflow(w)) && (this.placeDataLabels(), this.points.forEach(function (c) {
                    Q = d(g, c.options.dataLabels);
                    if (E = b(Q.connectorWidth, 1)) {
                        var f;
                        J = c.connector;
                        if ((K = c.dataLabel) && K._pos && c.visible && 0 < c.labelDistance) {
                            W =
                                K._attr.visibility;
                            if (f = !J) c.connector = J = a.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + c.colorIndex + (c.className ? " " + c.className : "")).add(e.dataLabelsGroup), a.styledMode || J.attr({
                                "stroke-width": E,
                                stroke: Q.connectorColor || c.color || "#666666"
                            });
                            J[f ? "attr" : "animate"]({
                                d: c.getConnectorPath()
                            });
                            J.attr("visibility", W)
                        } else J && (c.connector = J.destroy())
                    }
                }))
            }

            function q() {
                this.points.forEach(function (b) {
                    var d = b.dataLabel,
                        a;
                    d && b.visible && ((a = d._pos) ? (d.sideOverflow && (d._attr.width =
                        Math.max(d.getBBox().width - d.sideOverflow, 0), d.css({
                            width: d._attr.width + "px",
                            textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                        }), d.shortened = !0), d.attr(d._attr), d[d.moved ? "animate" : "attr"](a), d.moved = !0) : d && d.attr({
                        y: -9999
                    }));
                    delete b.distributeBox
                }, this)
            }

            function r(b) {
                var d = this.center,
                    a = this.options,
                    e = a.center,
                    c = a.minSize || 80,
                    f = null !== a.size;
                if (!f) {
                    if (null !== e[0]) var h = Math.max(d[2] - Math.max(b[1], b[3]), c);
                    else h = Math.max(d[2] - b[1] - b[3], c), d[0] += (b[3] - b[1]) / 2;
                    null !== e[1] ?
                        h = t(h, c, d[2] - Math.max(b[0], b[2])) : (h = t(h, c, d[2] - b[0] - b[2]), d[1] += (b[0] - b[2]) / 2);
                    h < d[2] ? (d[2] = h, d[3] = Math.min(a.thickness ? Math.max(0, h - 2 * a.thickness) : Math.max(0, p(a.innerSize || 0, h)), h), this.translate(d), this.drawDataLabels && this.drawDataLabels()) : f = !0
                }
                return f
            }
            var v = [],
                x = {
                    radialDistributionY: function (b) {
                        return b.top + b.distributeBox.pos
                    },
                    radialDistributionX: function (b, d, a, e) {
                        return b.getX(a < d.top + 2 || a > d.bottom - 2 ? e : a, d.half, d)
                    },
                    justify: function (b, d, a) {
                        return a[0] + (b.half ? -1 : 1) * (d + b.labelDistance)
                    },
                    alignToPlotEdges: function (b,
                        d, a, e) {
                        b = b.getBBox().width;
                        return d ? b + e : a - b - e
                    },
                    alignToConnectors: function (b, d, a, e) {
                        var c = 0,
                            f;
                        b.forEach(function (a) {
                            f = a.dataLabel.getBBox().width;
                            f > c && (c = f)
                        });
                        return d ? c + e : a - c - e
                    }
                };
            e.compose = function (b) {
                f.compose(B); - 1 === v.indexOf(b) && (v.push(b), b = b.prototype, b.dataLabelPositioners = x, b.alignDataLabel = E, b.drawDataLabels = l, b.placeDataLabels = q, b.verifyDataLabelOverflow = r)
            }
        })(q || (q = {}));
        return q
    });
    K(l, "Extensions/OverlappingDataLabels.js", [l["Core/Chart/Chart.js"], l["Core/Utilities.js"]], function (f, e) {
        function l(e,
            f) {
            var d = !1;
            if (e) {
                var b = e.newOpacity;
                e.oldOpacity !== b && (e.alignAttr && e.placed ? (e[b ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), d = !0, e.alignAttr.opacity = b, e[e.isOld ? "animate" : "attr"](e.alignAttr, null, function () {
                    f.styledMode || e.css({
                        pointerEvents: b ? "auto" : "none"
                    })
                }), v(f, "afterHideOverlappingLabel")) : e.attr({
                    opacity: b
                }));
                e.isOld = !0
            }
            return d
        }
        var C = e.addEvent,
            v = e.fireEvent,
            E = e.isArray,
            G = e.isNumber,
            B = e.objectEach,
            y = e.pick;
        C(f, "render", function () {
            var e = this,
                f = [];
            (this.labelCollectors || []).forEach(function (d) {
                f =
                    f.concat(d())
            });
            (this.yAxis || []).forEach(function (d) {
                d.stacking && d.options.stackLabels && !d.options.stackLabels.allowOverlap && B(d.stacking.stacks, function (b) {
                    B(b, function (b) {
                        b.label && f.push(b.label)
                    })
                })
            });
            (this.series || []).forEach(function (d) {
                var b = d.options.dataLabels;
                d.visible && (!1 !== b.enabled || d._hasPointLabels) && (b = function (b) {
                    return b.forEach(function (b) {
                        b.visible && (E(b.dataLabels) ? b.dataLabels : b.dataLabel ? [b.dataLabel] : []).forEach(function (d) {
                            var h = d.options;
                            d.labelrank = y(h.labelrank, b.labelrank,
                                b.shapeArgs && b.shapeArgs.height);
                            h.allowOverlap ? (d.oldOpacity = d.opacity, d.newOpacity = 1, l(d, e)) : f.push(d)
                        })
                    })
                }, b(d.nodes || []), b(d.points))
            });
            this.hideOverlappingLabels(f)
        });
        f.prototype.hideOverlappingLabels = function (e) {
            var f = this,
                d = e.length,
                b = f.renderer,
                p, q, r, n = !1;
            var t = function (d) {
                var e, f = d.box ? 0 : d.padding || 0,
                    a = e = 0,
                    g;
                if (d && (!d.alignAttr || d.placed)) {
                    var c = d.alignAttr || {
                        x: d.attr("x"),
                        y: d.attr("y")
                    };
                    var h = d.parentGroup;
                    d.width || (e = d.getBBox(), d.width = e.width, d.height = e.height, e = b.fontMetrics(null, d.element).h);
                    var l = d.width - 2 * f;
                    (g = {
                        left: "0",
                        center: "0.5",
                        right: "1"
                    } [d.alignValue]) ? a = +g * l: G(d.x) && Math.round(d.x) !== d.translateX && (a = d.x - d.translateX);
                    return {
                        x: c.x + (h.translateX || 0) + f - (a || 0),
                        y: c.y + (h.translateY || 0) + f - e,
                        width: d.width - 2 * f,
                        height: d.height - 2 * f
                    }
                }
            };
            for (q = 0; q < d; q++)
                if (p = e[q]) p.oldOpacity = p.opacity, p.newOpacity = 1, p.absoluteBox = t(p);
            e.sort(function (b, d) {
                return (d.labelrank || 0) - (b.labelrank || 0)
            });
            for (q = 0; q < d; q++) {
                var w = (t = e[q]) && t.absoluteBox;
                for (p = q + 1; p < d; ++p) {
                    var z = (r = e[p]) && r.absoluteBox;
                    !w || !z || t ===
                        r || 0 === t.newOpacity || 0 === r.newOpacity || "hidden" === t.visibility || "hidden" === r.visibility || z.x >= w.x + w.width || z.x + z.width <= w.x || z.y >= w.y + w.height || z.y + z.height <= w.y || ((t.labelrank < r.labelrank ? t : r).newOpacity = 0)
                }
            }
            e.forEach(function (b) {
                l(b, f) && (n = !0)
            });
            n && v(f, "afterHideAllOverlappingLabels")
        }
    });
    K(l, "Core/Responsive.js", [l["Core/Utilities.js"]], function (f) {
        var e = f.extend,
            l = f.find,
            C = f.isArray,
            v = f.isObject,
            E = f.merge,
            G = f.objectEach,
            B = f.pick,
            y = f.splat,
            t = f.uniqueKey,
            h;
        (function (d) {
            var b = [];
            d.compose = function (d) {
                -1 ===
                    b.indexOf(d) && (b.push(d), e(d.prototype, f.prototype));
                return d
            };
            var f = function () {
                function b() {}
                b.prototype.currentOptions = function (b) {
                    function d(b, f, h, k) {
                        var a;
                        G(b, function (b, c) {
                            if (!k && -1 < e.collectionsWithUpdate.indexOf(c) && f[c])
                                for (b = y(b), h[c] = [], a = 0; a < Math.max(b.length, f[c].length); a++) f[c][a] && (void 0 === b[a] ? h[c][a] = f[c][a] : (h[c][a] = {}, d(b[a], f[c][a], h[c][a], k + 1)));
                            else v(b) ? (h[c] = C(b) ? [] : {}, d(b, f[c] || {}, h[c], k + 1)) : h[c] = "undefined" === typeof f[c] ? null : f[c]
                        })
                    }
                    var e = this,
                        f = {};
                    d(b, this.options, f, 0);
                    return f
                };
                b.prototype.matchResponsiveRule = function (b, d) {
                    var e = b.condition;
                    (e.callback || function () {
                        return this.chartWidth <= B(e.maxWidth, Number.MAX_VALUE) && this.chartHeight <= B(e.maxHeight, Number.MAX_VALUE) && this.chartWidth >= B(e.minWidth, 0) && this.chartHeight >= B(e.minHeight, 0)
                    }).call(this) && d.push(b._id)
                };
                b.prototype.setResponsive = function (b, d) {
                    var e = this,
                        f = this.options.responsive,
                        h = this.currentResponsive,
                        n = [];
                    !d && f && f.rules && f.rules.forEach(function (b) {
                        "undefined" === typeof b._id && (b._id = t());
                        e.matchResponsiveRule(b,
                            n)
                    }, this);
                    d = E.apply(void 0, n.map(function (b) {
                        return l((f || {}).rules || [], function (d) {
                            return d._id === b
                        })
                    }).map(function (b) {
                        return b && b.chartOptions
                    }));
                    d.isResponsiveOptions = !0;
                    n = n.toString() || void 0;
                    n !== (h && h.ruleIds) && (h && this.update(h.undoOptions, b, !0), n ? (h = this.currentOptions(d), h.isResponsiveOptions = !0, this.currentResponsive = {
                        ruleIds: n,
                        mergedOptions: d,
                        undoOptions: h
                    }, this.update(d, b, !0)) : this.currentResponsive = void 0)
                };
                return b
            }()
        })(h || (h = {}));
        "";
        "";
        return h
    });
    K(l, "masters/highcharts.src.js", [l["Core/Globals.js"],
        l["Core/Utilities.js"], l["Core/DefaultOptions.js"], l["Core/Animation/Fx.js"], l["Core/Animation/AnimationUtilities.js"], l["Core/Renderer/HTML/AST.js"], l["Core/FormatUtilities.js"], l["Core/Renderer/RendererUtilities.js"], l["Core/Renderer/SVG/SVGElement.js"], l["Core/Renderer/SVG/SVGRenderer.js"], l["Core/Renderer/HTML/HTMLElement.js"], l["Core/Renderer/HTML/HTMLRenderer.js"], l["Core/Axis/Axis.js"], l["Core/Axis/DateTimeAxis.js"], l["Core/Axis/LogarithmicAxis.js"], l["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
        l["Core/Axis/Tick.js"], l["Core/Tooltip.js"], l["Core/Series/Point.js"], l["Core/Pointer.js"], l["Core/MSPointer.js"], l["Core/Legend/Legend.js"], l["Core/Chart/Chart.js"], l["Core/Series/Series.js"], l["Core/Series/SeriesRegistry.js"], l["Series/Column/ColumnSeries.js"], l["Series/Column/ColumnDataLabel.js"], l["Series/Pie/PieSeries.js"], l["Series/Pie/PieDataLabel.js"], l["Core/Series/DataLabel.js"], l["Core/Responsive.js"], l["Core/Color/Color.js"], l["Core/Time.js"]
    ], function (f, e, l, C, v, E, G, B, y, t, h, d, b, p, q, r,
        n, J, w, z, x, m, k, a, g, c, D, A, u, K, S, R, M) {
        f.animate = v.animate;
        f.animObject = v.animObject;
        f.getDeferredAnimation = v.getDeferredAnimation;
        f.setAnimation = v.setAnimation;
        f.stop = v.stop;
        f.timers = C.timers;
        f.AST = E;
        f.Axis = b;
        f.Chart = k;
        f.chart = k.chart;
        f.Fx = C;
        f.Legend = m;
        f.PlotLineOrBand = r;
        f.Point = w;
        f.Pointer = x.isRequired() ? x : z;
        f.Series = a;
        f.SVGElement = y;
        f.SVGRenderer = t;
        f.Tick = n;
        f.Time = M;
        f.Tooltip = J;
        f.Color = R;
        f.color = R.parse;
        d.compose(t);
        h.compose(y);
        f.defaultOptions = l.defaultOptions;
        f.getOptions = l.getOptions;
        f.time = l.defaultTime;
        f.setOptions = l.setOptions;
        f.dateFormat = G.dateFormat;
        f.format = G.format;
        f.numberFormat = G.numberFormat;
        f.addEvent = e.addEvent;
        f.arrayMax = e.arrayMax;
        f.arrayMin = e.arrayMin;
        f.attr = e.attr;
        f.clearTimeout = e.clearTimeout;
        f.correctFloat = e.correctFloat;
        f.createElement = e.createElement;
        f.css = e.css;
        f.defined = e.defined;
        f.destroyObjectProperties = e.destroyObjectProperties;
        f.discardElement = e.discardElement;
        f.distribute = B.distribute;
        f.erase = e.erase;
        f.error = e.error;
        f.extend = e.extend;
        f.extendClass = e.extendClass;
        f.find =
            e.find;
        f.fireEvent = e.fireEvent;
        f.getMagnitude = e.getMagnitude;
        f.getStyle = e.getStyle;
        f.inArray = e.inArray;
        f.isArray = e.isArray;
        f.isClass = e.isClass;
        f.isDOMElement = e.isDOMElement;
        f.isFunction = e.isFunction;
        f.isNumber = e.isNumber;
        f.isObject = e.isObject;
        f.isString = e.isString;
        f.keys = e.keys;
        f.merge = e.merge;
        f.normalizeTickInterval = e.normalizeTickInterval;
        f.objectEach = e.objectEach;
        f.offset = e.offset;
        f.pad = e.pad;
        f.pick = e.pick;
        f.pInt = e.pInt;
        f.relativeLength = e.relativeLength;
        f.removeEvent = e.removeEvent;
        f.seriesType =
            g.seriesType;
        f.splat = e.splat;
        f.stableSort = e.stableSort;
        f.syncTimeout = e.syncTimeout;
        f.timeUnits = e.timeUnits;
        f.uniqueKey = e.uniqueKey;
        f.useSerialIds = e.useSerialIds;
        f.wrap = e.wrap;
        D.compose(c);
        K.compose(a);
        p.compose(b);
        q.compose(b);
        u.compose(A);
        r.compose(b);
        S.compose(k);
        return f
    });
    l["masters/highcharts.src.js"]._modules = l;
    return l["masters/highcharts.src.js"]
});
//# sourceMappingURL=highcharts.js.map
