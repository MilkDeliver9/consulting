jui.define("chart.brush.candlestick", [], function() {

    /**
     * @class chart.brush.candlestick 
     * 
     * implements candlestick brush 
     * @extends chart.brush.core
     */
    var CandleStickBrush = function() {
        var g, width = 0, barWidth = 0, barPadding = 0;

        this.getTargetData = function(data) {
            var target = {
                low: data[this.brush.low],
                high: data[this.brush.high],
                open: data[this.brush.open],
                close: data[this.brush.close]
            };

            return target;
        }

        this.drawBefore = function() {
            g = this.chart.svg.group();
            width = this.axis.x.rangeBand();
            barWidth = width * 0.7;
            barPadding = barWidth / 2;
        }

        this.draw = function() {
            this.eachData(function(i, data) {
                var data = this.getTargetData(data),
                    startX = this.axis.x(i),
                    r = null,
                    l = null;

                if(data.open > data.close) { // 시가가 종가보다 높을 때 (Red)
                    var y = this.axis.y(data.open);

                    l = this.chart.svg.line({
                        x1: startX,
                        y1: this.axis.y(data.high),
                        x2: startX,
                        y2: this.axis.y(data.low),
                        stroke: this.chart.theme("candlestickInvertBorderColor"),
                        "stroke-width": 1
                    });

                    r = this.chart.svg.rect({
                        x : startX - barPadding,
                        y : y,
                        width : barWidth,
                        height : Math.abs(this.axis.y(data.close) - y),
                        fill : this.chart.theme("candlestickInvertBackgroundColor"),
                        stroke: this.chart.theme("candlestickInvertBorderColor"),
                        "stroke-width": 1
                    });

                } else {
                    var y = this.axis.y(data.close);

                    l = this.chart.svg.line({
                        x1: startX,
                        y1: this.axis.y(data.high),
                        x2: startX,
                        y2: this.axis.y(data.low),
                        stroke: this.chart.theme("candlestickBorderColor"),
                        "stroke-width":1
                    });

                    r = this.chart.svg.rect({
                        x : startX - barPadding,
                        y : y,
                        width : barWidth,
                        height : Math.abs(this.axis.y(data.open) - y),
                        fill : this.chart.theme("candlestickBackgroundColor"),
                        stroke: this.chart.theme("candlestickBorderColor"),
                        "stroke-width": 1
                    });
                }

                this.addEvent(r, i, null);

                g.append(l);
                g.append(r);
            });

            return g;
        }
    }

    CandleStickBrush.setup = function() {
        return {
            /** @cfg {String} [low=low] a field for low value   */ 
            low: "low",
            /** @cfg {String} [high=high] a field for high value   */
            high: "high",
            /** @cfg {String} [open=open] a field for open value   */
            open: "open",
            /** @cfg {String} [close=close] a field for close value   */
            close: "close"
        }
    }

    return CandleStickBrush;
}, "chart.brush.core");
