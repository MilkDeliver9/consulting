jui.define("chart.brush.scatter", [], function() {

    /**
     * @class chart.brush.scatter
     *
     * 점으로 이루어진 데이타를 표현하는 브러쉬
     *
     * @extends chart.brush.core
     */
    var ScatterBrush = function() {

        /**
         * @method createScatter
         *
         * 좌표별 scatter 생성
         *
         * @param {Object} pos
         * @param {Number} index
         * @return {util.svg.element}
         */
        this.createScatter = function(pos, index) {
            var self = this;
            var elem = null,
                target = this.chart.get("series", this.brush.target[index]),
                symbol = (!target.symbol) ? this.brush.symbol : target.symbol,
                w = h = this.brush.size;

            var color = this.color(index),
                borderColor = this.chart.theme("scatterBorderColor"),
                borderWidth = this.chart.theme("scatterBorderWidth");

            if(symbol == "triangle" || symbol == "cross") {
                elem = this.chart.svg.group({ width: w, height: h }, function() {
                    if(symbol == "triangle") {
                        var poly = self.chart.svg.polygon();

                        poly.point(0, h)
                            .point(w, h)
                            .point(w / 2, 0);
                    } else {
                        self.chart.svg.line({ stroke: color, "stroke-width": borderWidth * 2, x1: 0, y1: 0, x2: w, y2: h });
                        self.chart.svg.line({ stroke: color, "stroke-width": borderWidth * 2, x1: 0, y1: w, x2: h, y2: 0 });
                    }
                }).translate(pos.x - (w / 2), pos.y - (h / 2));
            } else {
                if(symbol == "rectangle") {
                    elem = this.chart.svg.rect({
                        width: w,
                        height: h,
                        x: pos.x - (w / 2),
                        y: pos.y - (h / 2)
                    });
                } else {
                    elem = this.chart.svg.ellipse({
                        rx: w / 2,
                        ry: h / 2,
                        cx: pos.x,
                        cy: pos.y
                    });
                }
            }

            if(symbol != "cross") {
                elem.attr({
                    fill: color,
                    stroke: borderColor,
                    "stroke-width": borderWidth
                })
                .hover(function () {
                    elem.attr({
                        fill: self.chart.theme("scatterHoverColor"),
                        stroke: color,
                        "stroke-width": borderWidth * 2
                    });
                }, function () {
                    elem.attr({
                        fill: color,
                        stroke: borderColor,
                        "stroke-width": borderWidth
                    });
                });
            }

            return elem;
        }

        /**
         * @method drawScatter
         *
         * scatter 그리기
         *
         * @param {Array} points
         * @return {util.svg.element} g element 리턴
         */
        this.drawScatter = function(points) {
            var g = this.chart.svg.group();

            for(var i = 0; i < points.length; i++) {
                for(var j = 0; j < points[i].length; j++) {
                    var p = this.createScatter({
                        x: points[i].x[j],
                        y: points[i].y[j],
                        max: points[i].max[j],
                        min: points[i].min[j],
                        value: points[i].value[j]
                    }, i);

                    this.addEvent(p, j, i);
                    g.append(p);
                }
            }

            return g;
        }

        /**
         * @method draw
         *
         * @return {util.svg.element}
         */
        this.draw = function() {
            return this.drawScatter(this.getXY());
        }


        this.drawAnimate = function() {
            var area = this.chart.area();

            return this.chart.svg.animateTransform({
                attributeName: "transform",
                type: "translate",
                from: area.x + " " + area.height,
                to: area.x + " " + area.y,
                begin: "0s" ,
                dur: "0.4s",
                repeatCount: "1"
            });
        }
    }

    ScatterBrush.setup = function() {
        return {
            /** @cfg {"circle"/"triangle"/"rectangle"/"cross"} [symbol="circle"] 그려질 모양 선택  */
            symbol: "circle", // or triangle, rectangle, cross
            /** @cfg {Number} [size=7]  그려질 모양 크기 */
            size: 7,
            /** @cfg {Boolean} [clip=false] */
            clip: false
        };
    }

    return ScatterBrush;
}, "chart.brush.core");