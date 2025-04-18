/*
 Highcharts JS v10.2.0 (2022-07-05)

 Highcharts Drilldown module

 Author: Torstein Honsi
 License: www.highcharts.com/license

*/
(function (a) {
    "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/drilldown", ["highcharts"], function (x) {
        a(x);
        a.Highcharts = x;
        return a
    }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (a) {
    function x(a, w, m, q) {
        a.hasOwnProperty(w) || (a[w] = q.apply(null, m), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", {
            detail: {
                path: w,
                module: a[w]
            }
        })))
    }
    a = a ? a._modules : {};
    x(a,
        "Extensions/Breadcrumbs.js", [a["Core/Chart/Chart.js"], a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Utilities.js"], a["Core/FormatUtilities.js"]],
        function (a, w, m, q, p) {
            var x = p.format;
            p = q.addEvent;
            var C = q.objectEach,
                G = q.extend,
                z = q.fireEvent,
                A = q.merge,
                y = q.pick,
                H = q.defined,
                E = q.isString;
            G(m.defaultOptions.lang, {
                mainBreadcrumb: "Main"
            });
            m = function () {
                function a(b, d) {
                    this.group = void 0;
                    this.list = [];
                    this.elementList = {};
                    this.isDirty = !0;
                    this.level = 0;
                    this.options = void 0;
                    d = A(b.options.drilldown && b.options.drilldown.drillUpButton,
                        a.defaultBreadcrumbsOptions, b.options.navigation && b.options.navigation.breadcrumbs, d);
                    this.chart = b;
                    this.options = d || {}
                }
                a.prototype.updateProperties = function (b) {
                    this.setList(b);
                    this.setLevel();
                    this.isDirty = !0
                };
                a.prototype.setList = function (b) {
                    this.list = b
                };
                a.prototype.setLevel = function () {
                    this.level = this.list.length && this.list.length - 1
                };
                a.prototype.getLevel = function () {
                    return this.level
                };
                a.prototype.getButtonText = function (b) {
                    var a = this.chart,
                        e = this.options,
                        h = a.options.lang,
                        g = y(e.format, e.showFullPath ? "{level.name}" :
                            "\u2190 {level.name}");
                    h = h && y(h.drillUpText, h.mainBreadcrumb);
                    b = e.formatter && e.formatter(b) || x(g, {
                        level: b.levelOptions
                    }, a) || "";
                    (E(b) && !b.length || "\u2190 " === b) && H(h) && (b = e.showFullPath ? h : "\u2190 " + h);
                    return b
                };
                a.prototype.redraw = function () {
                    this.isDirty && this.render();
                    this.group && this.group.align();
                    this.isDirty = !1
                };
                a.prototype.render = function () {
                    var a = this.chart,
                        d = this.options;
                    !this.group && d && (this.group = a.renderer.g("breadcrumbs-group").addClass("highcharts-no-tooltip highcharts-breadcrumbs").attr({
                        zIndex: d.zIndex
                    }).add());
                    d.showFullPath ? this.renderFullPathButtons() : this.renderSingleButton();
                    this.alignBreadcrumbsGroup()
                };
                a.prototype.renderFullPathButtons = function () {
                    this.destroySingleButton();
                    this.resetElementListState();
                    this.updateListElements();
                    this.destroyListElements()
                };
                a.prototype.renderSingleButton = function () {
                    var a = this.chart,
                        d = this.list,
                        e = this.options.buttonSpacing;
                    this.destroyListElements();
                    var h = this.group ? this.group.getBBox().width : e;
                    d = d[d.length - 2];
                    !a.drillUpButton && 0 < this.level ? a.drillUpButton = this.renderButton(d,
                        h, e) : a.drillUpButton && (0 < this.level ? this.updateSingleButton() : this.destroySingleButton())
                };
                a.prototype.alignBreadcrumbsGroup = function (a) {
                    if (this.group) {
                        var b = this.options,
                            e = b.buttonTheme,
                            h = b.position,
                            g = "chart" === b.relativeTo || "spacingBox" === b.relativeTo ? void 0 : "scrollablePlotBox",
                            k = this.group.getBBox();
                        b = 2 * (e.padding || 0) + b.buttonSpacing;
                        h.width = k.width + b;
                        h.height = k.height + b;
                        k = A(h);
                        a && (k.x += a);
                        this.options.rtl && (k.x += h.width);
                        k.y = y(k.y, this.yOffset, 0);
                        this.group.align(k, !0, g)
                    }
                };
                a.prototype.renderButton =
                    function (a, d, e) {
                        var b = this,
                            g = this.chart,
                            k = b.options,
                            u = A(k.buttonTheme);
                        d = g.renderer.button(b.getButtonText(a), d, e, function (d) {
                            var e = k.events && k.events.click,
                                g;
                            e && (g = e.call(b, d, a));
                            !1 !== g && (d.newLevel = k.showFullPath ? a.level : b.level - 1, z(b, "up", d))
                        }, u).addClass("highcharts-breadcrumbs-button").add(b.group);
                        g.styledMode || d.attr(k.style);
                        return d
                    };
                a.prototype.renderSeparator = function (a, d) {
                    var b = this.chart,
                        h = this.options.separator;
                    a = b.renderer.label(h.text, a, d, void 0, void 0, void 0, !1).addClass("highcharts-breadcrumbs-separator").add(this.group);
                    b.styledMode || a.css(h.style);
                    return a
                };
                a.prototype.update = function (a) {
                    A(!0, this.options, a);
                    this.destroy();
                    this.isDirty = !0
                };
                a.prototype.updateSingleButton = function () {
                    var a = this.chart,
                        d = this.list[this.level - 1];
                    a.drillUpButton && a.drillUpButton.attr({
                        text: this.getButtonText(d)
                    })
                };
                a.prototype.destroy = function () {
                    this.destroySingleButton();
                    this.destroyListElements(!0);
                    this.group && this.group.destroy();
                    this.group = void 0
                };
                a.prototype.destroyListElements = function (a) {
                    var b = this.elementList;
                    C(b, function (d, h) {
                        if (a ||
                            !b[h].updated) d = b[h], d.button && d.button.destroy(), d.separator && d.separator.destroy(), delete d.button, delete d.separator, delete b[h]
                    });
                    a && (this.elementList = {})
                };
                a.prototype.destroySingleButton = function () {
                    this.chart.drillUpButton && (this.chart.drillUpButton.destroy(), this.chart.drillUpButton = void 0)
                };
                a.prototype.resetElementListState = function () {
                    C(this.elementList, function (a) {
                        a.updated = !1
                    })
                };
                a.prototype.updateListElements = function () {
                    var a = this,
                        d = a.elementList,
                        e = a.options.buttonSpacing,
                        h = a.list,
                        g = a.options.rtl,
                        u = g ? -1 : 1,
                        m = function (a, b) {
                            return u * a.getBBox().width + u * b
                        },
                        r = a.group ? m(a.group, e) : e,
                        t;
                    h.forEach(function (b, k) {
                        k = k === h.length - 1;
                        if (d[b.level]) {
                            t = d[b.level];
                            var p = t.button;
                            if (t.separator || k) t.separator && k && (t.separator.destroy(), delete t.separator);
                            else {
                                r += u * e;
                                t.separator = a.renderSeparator(r, e);
                                if (g) {
                                    var q = t.separator;
                                    q.translate(r - q.getBBox().width, e)
                                }
                                r += m(t.separator, e)
                            }
                            d[b.level].updated = !0
                        } else p = a.renderButton(b, r, e), g && p.translate(r - p.getBBox().width, e), r += m(p, e), k || (q = a.renderSeparator(r, e), g &&
                            q.translate(r - q.getBBox().width, e), r += m(q, e)), d[b.level] = {
                            button: p,
                            separator: q,
                            updated: !0
                        };
                        p && p.setState(k ? 2 : 0)
                    })
                };
                a.defaultBreadcrumbsOptions = {
                    buttonTheme: {
                        fill: "none",
                        height: 18,
                        padding: 2,
                        "stroke-width": 0,
                        zIndex: 7,
                        states: {
                            select: {
                                fill: "none"
                            }
                        },
                        style: {
                            color: "#335cad"
                        }
                    },
                    buttonSpacing: 5,
                    floating: !1,
                    format: void 0,
                    relativeTo: "plotBox",
                    rtl: !1,
                    position: {
                        align: "left",
                        verticalAlign: "top",
                        x: 0,
                        y: void 0
                    },
                    separator: {
                        text: "/",
                        style: {
                            color: "#666666"
                        }
                    },
                    showFullPath: !0,
                    style: {},
                    useHTML: !1,
                    zIndex: 7
                };
                return a
            }();
            w.Breadcrumbs ||
                (w.Breadcrumbs = m, p(a, "getMargins", function () {
                    var a = this.breadcrumbs;
                    if (a && !a.options.floating && a.level) {
                        var b = a.options,
                            d = b.buttonTheme;
                        d = (d.height || 0) + 2 * (d.padding || 0) + b.buttonSpacing;
                        b = b.position.verticalAlign;
                        "bottom" === b ? (this.marginBottom = (this.marginBottom || 0) + d, a.yOffset = d) : "middle" !== b ? (this.plotTop += d, a.yOffset = -d) : a.yOffset = void 0
                    }
                }), p(a, "redraw", function () {
                    this.breadcrumbs && this.breadcrumbs.redraw()
                }), p(a, "destroy", function () {
                    this.breadcrumbs && (this.breadcrumbs.destroy(), this.breadcrumbs =
                        void 0)
                }), p(a, "afterShowResetZoom", function () {
                    if (this.breadcrumbs) {
                        var a = this.resetZoomButton && this.resetZoomButton.getBBox(),
                            b = this.breadcrumbs.options;
                        a && "right" === b.position.align && "plotBox" === b.relativeTo && this.breadcrumbs.alignBreadcrumbsGroup(-a.width - b.buttonSpacing)
                    }
                }), p(a, "selection", function (a) {
                    !0 === a.resetSelection && this.breadcrumbs && this.breadcrumbs.alignBreadcrumbsGroup()
                }));
            "";
            return m
        });
    x(a, "Extensions/Drilldown.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Axis/Axis.js"],
        a["Core/Chart/Chart.js"], a["Core/Color/Color.js"], a["Series/Column/ColumnSeries.js"], a["Core/FormatUtilities.js"], a["Core/Globals.js"], a["Core/DefaultOptions.js"], a["Core/Series/Point.js"], a["Core/Series/Series.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Axis/Tick.js"], a["Core/Utilities.js"], a["Extensions/Breadcrumbs.js"]
    ], function (a, w, m, q, p, x, C, N, z, A, y, H, E, u, b) {
        function d(a) {
            var f = e(this.chart.options.drilldown.animation);
            a && (a.hide(), J(function () {
                a && a.added &&
                    a.fadeIn()
            }, Math.max(f.duration - 50, 0)))
        }
        var e = a.animObject,
            h = C.noop;
        a = N.defaultOptions;
        var g = u.addEvent,
            k = u.removeEvent,
            B = u.extend,
            r = u.fireEvent,
            t = u.merge,
            G = u.objectEach,
            D = u.pick,
            J = u.syncTimeout;
        y = y.seriesTypes.pie;
        var K = 1;
        B(a.lang, {});
        a.drilldown = {
            activeAxisLabelStyle: {
                cursor: "pointer",
                color: "#003399",
                fontWeight: "bold",
                textDecoration: "underline"
            },
            activeDataLabelStyle: {
                cursor: "pointer",
                color: "#003399",
                fontWeight: "bold",
                textDecoration: "underline"
            },
            animation: {
                duration: 500
            },
            drillUpButton: {
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        };
        H.prototype.Element.prototype.fadeIn = function (a) {
            this.attr({
                opacity: .1,
                visibility: "inherit"
            }).animate({
                opacity: D(this.newOpacity, 1)
            }, a || {
                duration: 250
            })
        };
        m.prototype.addSeriesAsDrilldown = function (a, c) {
            this.addSingleSeriesAsDrilldown(a, c);
            this.applyDrilldown()
        };
        m.prototype.addSingleSeriesAsDrilldown = function (a, c) {
            var f = a.series,
                l = f.xAxis,
                b = f.yAxis,
                v = [],
                d = [],
                n;
            var F = this.styledMode ? {
                colorIndex: D(a.colorIndex, f.colorIndex)
            } : {
                color: a.color || f.color
            };
            this.drilldownLevels || (this.drilldownLevels = []);
            var e = f.options._levelNumber || 0;
            (n = this.drilldownLevels[this.drilldownLevels.length - 1]) && n.levelNumber !== e && (n = void 0);
            c = B(B({
                _ddSeriesId: K++
            }, F), c);
            var g = f.points.indexOf(a);
            f.chart.series.forEach(function (a) {
                a.xAxis !== l || a.isDrilling || (a.options._ddSeriesId = a.options._ddSeriesId || K++, a.options._colorIndex = a.userOptions._colorIndex, a.options._levelNumber = a.options._levelNumber || e, n ? (v = n.levelSeries, d = n.levelSeriesOptions) : (v.push(a), a.purgedOptions = t({
                    _ddSeriesId: a.options._ddSeriesId,
                    _levelNumber: a.options._levelNumber,
                    selected: a.options.selected
                }, a.userOptions), d.push(a.purgedOptions)))
            });
            a = B({
                levelNumber: e,
                seriesOptions: f.options,
                seriesPurgedOptions: f.purgedOptions,
                levelSeriesOptions: d,
                levelSeries: v,
                shapeArgs: a.shapeArgs,
                bBox: a.graphic ? a.graphic.getBBox() : {},
                color: a.isNull ? q.parse(F.color).setOpacity(0).get() : F.color,
                lowerSeriesOptions: c,
                pointOptions: f.options.data[g],
                pointIndex: g,
                oldExtremes: {
                    xMin: l && l.userMin,
                    xMax: l && l.userMax,
                    yMin: b && b.userMin,
                    yMax: b && b.userMax
                },
                resetZoomButton: this.resetZoomButton
            }, F);
            this.drilldownLevels.push(a);
            l && l.names && (l.names.length = 0);
            c = a.lowerSeries = this.addSeries(c, !1);
            c.options._levelNumber = e + 1;
            l && (l.oldPos = l.pos, l.userMin = l.userMax = null, b.userMin = b.userMax = null);
            f.type === c.type && (c.animate = c.animateDrilldown || h, c.options.animation = !0)
        };
        m.prototype.applyDrilldown = function () {
            var a = this.drilldownLevels;
            if (a && 0 < a.length) {
                var c = a[a.length - 1].levelNumber;
                this.drilldownLevels.forEach(function (a) {
                    a.levelNumber === c && a.levelSeries.forEach(function (a) {
                        a.options && a.options._levelNumber === c && a.remove(!1)
                    })
                })
            }
            this.resetZoomButton &&
                (this.resetZoomButton.hide(), delete this.resetZoomButton);
            this.pointer.reset();
            r(this, "afterDrilldown");
            this.redraw();
            r(this, "afterApplyDrilldown")
        };
        var L = function (a) {
            var c = [];
            (a = a.drilldownLevels) && a.length && (c[0] || c.push({
                level: 0,
                levelOptions: a[0].seriesOptions
            }), a.forEach(function (a, f) {
                a.levelNumber + 1 > c[c.length - 1].level && c.push({
                    level: a.levelNumber + 1,
                    levelOptions: t({
                        name: a.lowerSeries.name
                    }, a.pointOptions)
                })
            }));
            return c
        };
        m.prototype.drillUp = function () {
            if (this.drilldownLevels && 0 !== this.drilldownLevels.length) {
                r(this,
                    "beforeDrillUp");
                for (var a = this, c = a.drilldownLevels, b = c[c.length - 1].levelNumber, l = c.length, d = a.series, v, e, n, g, h = function (c) {
                        d.forEach(function (a) {
                            a.options._ddSeriesId === c._ddSeriesId && (f = a)
                        });
                        var f = f || a.addSeries(c, !1);
                        f.type === n.type && f.animateDrillupTo && (f.animate = f.animateDrillupTo);
                        c === e.seriesPurgedOptions && (g = f)
                    }, k = a.drilldownLevels.length; l--;)
                    if (e = c[l], e.levelNumber === b) {
                        c.pop();
                        n = e.lowerSeries;
                        if (!n.chart)
                            for (v = d.length; v--;)
                                if (d[v].options.id === e.lowerSeriesOptions.id && d[v].options._levelNumber ===
                                    b + 1) {
                                    n = d[v];
                                    break
                                } n.xData = [];
                        n.xAxis && n.xAxis.names && (0 === k || l === k) && (n.xAxis.names.length = 0);
                        e.levelSeriesOptions.forEach(h);
                        r(a, "drillup", {
                            seriesOptions: e.seriesPurgedOptions || e.seriesOptions
                        });
                        g.type === n.type && (g.drilldownLevel = e, g.options.animation = a.options.drilldown.animation, n.animateDrillupFrom && n.chart && n.animateDrillupFrom(e));
                        g.options._levelNumber = b;
                        n.remove(!1);
                        g.xAxis && (v = e.oldExtremes, g.xAxis.setExtremes(v.xMin, v.xMax, !1), g.yAxis.setExtremes(v.yMin, v.yMax, !1));
                        e.resetZoomButton && (a.resetZoomButton =
                            e.resetZoomButton)
                    } r(a, "afterDrillUp");
                this.redraw();
                this.ddDupes && (this.ddDupes.length = 0);
                r(a, "drillupall")
            }
        };
        g(m, "afterInit", function () {
            var a = this;
            a.drilldown = {
                chart: a,
                fadeInGroup: d,
                update: function (c, f) {
                    t(!0, a.options.drilldown, c);
                    D(f, !0) && a.redraw()
                }
            }
        });
        g(m, "render", function () {
            (this.xAxis || []).forEach(function (a) {
                a.ddPoints = {};
                a.series.forEach(function (c) {
                    var f, b = c.xData || [],
                        d = c.points;
                    for (f = 0; f < b.length; f++) {
                        var e = c.options.data[f];
                        "number" !== typeof e && (e = c.pointClass.prototype.optionsToObject.call({
                                series: c
                            },
                            e), e.drilldown && (a.ddPoints[b[f]] || (a.ddPoints[b[f]] = []), e = f - (c.cropStart || 0), a.ddPoints[b[f]].push(d && 0 <= e && e < d.length ? d[e] : !0)))
                    }
                });
                G(a.ticks, E.prototype.drillable)
            })
        });
        g(C.Breadcrumbs, "up", function (a) {
            var c = this.chart;
            a = this.getLevel() - a.newLevel;
            for (var f = 0; f < a; f++) c.drillUp()
        });
        g(m, "afterDrilldown", function () {
            var a = this.options.drilldown;
            a = a && a.breadcrumbs;
            this.breadcrumbs || (this.breadcrumbs = new b(this, a));
            this.breadcrumbs.updateProperties(L(this))
        });
        g(m, "afterDrillUp", function () {
            this.breadcrumbs &&
                this.breadcrumbs.updateProperties(L(this))
        });
        g(m, "update", function (a) {
            var c = this.breadcrumbs,
                b = a.options.drilldown && a.options.drilldown.breadcrumbs;
            c && b && c.update(a.options.drilldown.breadcrumbs)
        });
        p.prototype.animateDrillupTo = function (a) {
            if (!a) {
                var c = this,
                    b = c.drilldownLevel;
                this.points.forEach(function (a) {
                    var c = a.dataLabel;
                    a.graphic && a.graphic.hide();
                    c && (c.hidden = "hidden" === c.attr("visibility"), c.hidden || (c.hide(), a.connector && a.connector.hide()))
                });
                J(function () {
                    if (c.points) {
                        var a = [];
                        c.data.forEach(function (c) {
                            a.push(c)
                        });
                        c.nodes && (a = a.concat(c.nodes));
                        a.forEach(function (a, c) {
                            c = c === (b && b.pointIndex) ? "show" : "fadeIn";
                            var f = "show" === c ? !0 : void 0,
                                d = a.dataLabel;
                            if (a.graphic) a.graphic[c](f);
                            d && !d.hidden && (d.fadeIn(), a.connector && a.connector.fadeIn())
                        })
                    }
                }, Math.max(this.chart.options.drilldown.animation.duration - 50, 0));
                delete this.animate
            }
        };
        p.prototype.animateDrilldown = function (a) {
            var c = this,
                b = this.chart,
                f = b.drilldownLevels,
                d, g = e(b.options.drilldown.animation),
                h = this.xAxis,
                n = b.styledMode;
            a || (f.forEach(function (a) {
                c.options._ddSeriesId ===
                    a.lowerSeriesOptions._ddSeriesId && (d = a.shapeArgs, n || (d.fill = a.color))
            }), d.x += D(h.oldPos, h.pos) - h.pos, this.points.forEach(function (a) {
                var b = a.shapeArgs;
                n || (b.fill = a.color);
                a.graphic && a.graphic.attr(d).animate(B(a.shapeArgs, {
                    fill: a.color || c.color
                }), g)
            }), b.drilldown && b.drilldown.fadeInGroup(this.dataLabelsGroup), delete this.animate)
        };
        p.prototype.animateDrillupFrom = function (a) {
            var c = e(this.chart.options.drilldown.animation),
                b = this.group,
                d = b !== this.chart.columnGroup,
                f = this;
            f.trackerGroups.forEach(function (a) {
                if (f[a]) f[a].on("mouseover")
            });
            d && delete this.group;
            this.points.forEach(function (e) {
                var g = e.graphic,
                    l = a.shapeArgs,
                    h = function () {
                        g.destroy();
                        b && d && (b = b.destroy())
                    };
                g && l && (delete e.graphic, f.chart.styledMode || (l.fill = a.color), c.duration ? g.animate(l, t(c, {
                    complete: h
                })) : (g.attr(l), h()))
            })
        };
        y && B(y.prototype, {
            animateDrillupTo: p.prototype.animateDrillupTo,
            animateDrillupFrom: p.prototype.animateDrillupFrom,
            animateDrilldown: function (a) {
                var c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1],
                    b = this.chart.options.drilldown.animation;
                this.is("item") && (b.duration = 0);
                if (this.center) {
                    var d = c.shapeArgs,
                        f = d.start,
                        e = (d.end - f) / this.points.length,
                        g = this.chart.styledMode;
                    a || (this.points.forEach(function (a, l) {
                        var h = a.shapeArgs;
                        g || (d.fill = c.color, h.fill = a.color);
                        if (a.graphic) a.graphic.attr(t(d, {
                            start: f + l * e,
                            end: f + (l + 1) * e
                        }))[b ? "animate" : "attr"](h, b)
                    }), this.chart.drilldown && this.chart.drilldown.fadeInGroup(this.dataLabelsGroup), delete this.animate)
                }
            }
        });
        z.prototype.doDrilldown = function () {
            this.runDrilldown()
        };
        z.prototype.runDrilldown = function (a,
            c, b) {
            var d = this.series.chart,
                f = d.options.drilldown,
                e = (f.series || []).length;
            d.ddDupes || (d.ddDupes = []);
            for (; e-- && !g;)
                if (f.series[e].id === this.drilldown && -1 === d.ddDupes.indexOf(this.drilldown)) {
                    var g = f.series[e];
                    d.ddDupes.push(this.drilldown)
                } r(d, "drilldown", {
                point: this,
                seriesOptions: g,
                category: c,
                originalEvent: b,
                points: "undefined" !== typeof c && this.series.xAxis.getDDPoints(c).slice(0)
            }, function (c) {
                var b = c.point.series && c.point.series.chart,
                    d = c.seriesOptions;
                b && d && (a ? b.addSingleSeriesAsDrilldown(c.point,
                    d) : b.addSeriesAsDrilldown(c.point, d))
            })
        };
        w.prototype.drilldownCategory = function (a, c) {
            this.getDDPoints(a).forEach(function (b) {
                b && b.series && b.series.visible && b.runDrilldown && b.runDrilldown(!0, a, c)
            });
            this.chart.applyDrilldown()
        };
        w.prototype.getDDPoints = function (a) {
            return this.ddPoints && this.ddPoints[a] || []
        };
        E.prototype.drillable = function () {
            var a = this.pos,
                c = this.label,
                b = this.axis,
                d = "xAxis" === b.coll && b.getDDPoints,
                e = d && b.getDDPoints(a),
                h = b.chart.styledMode;
            d && (c && e && e.length ? (c.drillable = !0, c.basicStyles ||
                h || (c.basicStyles = t(c.styles)), c.addClass("highcharts-drilldown-axis-label"), c.removeOnDrillableClick && k(c.element, "click"), c.removeOnDrillableClick = g(c.element, "click", function (c) {
                    c.preventDefault();
                    b.drilldownCategory(a, c)
                }), h || c.css(b.chart.options.drilldown.activeAxisLabelStyle)) : c && c.drillable && c.removeOnDrillableClick && (h || (c.styles = {}, c.css(c.basicStyles)), c.removeOnDrillableClick(), c.removeClass("highcharts-drilldown-axis-label")))
        };
        g(z, "afterInit", function () {
            this.drilldown && !this.unbindDrilldownClick &&
                (this.unbindDrilldownClick = g(this, "click", M));
            return this
        });
        g(z, "update", function (a) {
            a = a.options || {};
            a.drilldown && !this.unbindDrilldownClick ? this.unbindDrilldownClick = g(this, "click", M) : !a.drilldown && void 0 !== a.drilldown && this.unbindDrilldownClick && (this.unbindDrilldownClick = this.unbindDrilldownClick())
        });
        var M = function (a) {
            var c = this.series;
            c.xAxis && !1 === c.chart.options.drilldown.allowPointDrilldown ? c.xAxis.drilldownCategory(this.x, a) : this.runDrilldown(void 0, void 0, a)
        };
        g(A, "afterDrawDataLabels", function () {
            var a =
                this.chart.options.drilldown.activeDataLabelStyle,
                c = this.chart.renderer,
                b = this.chart.styledMode;
            this.points.forEach(function (d) {
                var e = d.options.dataLabels,
                    f = D(d.dlOptions, e && e.style, {});
                d.drilldown && d.dataLabel && ("contrast" !== a.color || b || (f.color = c.getContrast(d.color || this.color)), e && e.color && (f.color = e.color), d.dataLabel.addClass("highcharts-drilldown-data-label"), b || d.dataLabel.css(a).css(f))
            }, this)
        });
        var I = function (a, b, d, e) {
            a[d ? "addClass" : "removeClass"]("highcharts-drilldown-point");
            e || a.css({
                cursor: b
            })
        };
        g(A, "afterDrawTracker", function () {
            var a = this.chart.styledMode;
            this.points.forEach(function (b) {
                b.drilldown && b.graphic && I(b.graphic, "pointer", !0, a)
            })
        });
        g(z, "afterSetState", function () {
            var a = this.series.chart.styledMode;
            this.drilldown && this.series.halo && "hover" === this.state ? I(this.series.halo, "pointer", !0, a) : this.series.halo && I(this.series.halo, "auto", !1, a)
        });
        g(m, "drillup", function () {
            this.resetZoomButton && (this.resetZoomButton = this.resetZoomButton.destroy())
        });
        g(m, "drillupall", function () {
            this.resetZoomButton &&
                this.showResetZoom()
        })
    });
    x(a, "masters/modules/drilldown.src.js", [], function () {})
});
//# sourceMappingURL=drilldown.js.map
