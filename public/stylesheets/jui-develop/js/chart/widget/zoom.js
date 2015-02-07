jui.define("chart.widget.zoom", [ "util.base" ], function(_) {

    /**
     * @class chart.widget.zoom
     * implements zoom widget
     * @extends chart.widget.core
     * @alias ZoomWidget
     * @requires util.base
     *
     */
    var ZoomWidget = function(chart, axis, widget) {

        function setDragEvent(self, thumb, bg) {
            var isMove = false,
                mouseStart = 0,
                thumbWidth = 0;

            self.on("chart.mousedown", function(e) {
                if(isMove) return;

                isMove = true;
                mouseStart = e.bgX;
            });

            self.on("chart.mousemove", function(e) {
                if(!isMove) return;

                thumbWidth = e.bgX - mouseStart;

                if(thumbWidth > 0) {
                    thumb.attr({
                        width: thumbWidth
                    });

                    thumb.translate(mouseStart, chart.area("y"));
                } else {
                    thumb.attr({
                        width: Math.abs(thumbWidth)
                    });

                    thumb.translate(mouseStart + thumbWidth, chart.area("y"));
                }
            });

            self.on("chart.mouseup", endZoomAction);
            self.on("bg.mouseup", endZoomAction);
            self.on("bg.mouseout", endZoomAction);

            function endZoomAction() {
                isMove = false;
                if(thumbWidth == 0) return;

                var tick = chart.area("width") / (axis.end - axis.start),
                    x = ((thumbWidth > 0) ? mouseStart : mouseStart + thumbWidth) - chart.padding("left"),
                    start = Math.floor(x / tick) + axis.start,
                    end = Math.ceil((x + Math.abs(thumbWidth)) / tick) + axis.start;

                // 차트 줌
                if(start < end) {
                    axis.zoom(start, end);
                    bg.attr({ "visibility": "visible" });

                    // 차트 렌더링이 활성화되지 않았을 경우
                    if(!chart.isRender()) {
                        chart.render();
                    }
                }

                resetDragStatus();
            }

            function resetDragStatus() { // 엘리먼트 및 데이터 초기화
                isMove = false;
                mouseStart = 0;
                thumbWidth = 0;

                thumb.attr({
                    width: 0
                });
            }
        }

        this.draw = function() {
            var self = this;
            var cw = chart.area("width"),
                ch = chart.area("height"),
                r = 12;

            return chart.svg.group({}, function() {
                var thumb = chart.svg.rect({
                    height: ch,
                    fill: chart.theme("zoomBackgroundColor"),
                    opacity: 0.3
                });

                var bg = chart.svg.group({
                    visibility: "hidden"
                }, function() {
                    chart.svg.rect({
                        width: cw,
                        height: ch,
                        fill: chart.theme("zoomFocusColor"),
                        opacity: 0.2
                    });

                    chart.svg.group({
                        cursor: "pointer"
                    }, function() {
                        chart.svg.circle({
                            r: r,
                            cx: cw,
                            cy: 0,
                            opacity: 0
                        });

                        chart.svg.path({
                            d: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16.9,15.5l-1.4,1.4L12,13.4l-3.5,3.5 l-1.4-1.4l3.5-3.5L7.1,8.5l1.4-1.4l3.5,3.5l3.5-3.5l1.4,1.4L13.4,12L16.9,15.5z",
                            fill: chart.theme("zoomFocusColor")
                        }).translate(cw - r, -r);
                    }).on("click", function(e) {
                        bg.attr({ visibility: "hidden" });
                        axis.screen(1);

                        // 차트 렌더링이 활성화되지 않았을 경우
                        if(!chart.isRender()) {
                            chart.render();
                        }
                    });

                }).translate(chart.area("x"), chart.area("y"));

                setDragEvent(self, thumb, bg);
            });
        }
    }

    return ZoomWidget;
}, "chart.widget.core");