jui.define("chart.draw", [ "jquery", "util.base" ], function($, _) {
    /**
     * @class chart.draw
     *
     * Base Draw Class
     *
     * @alias Draw
     * @requires util.base
     * @requires jquery
     *
     */
	var Draw = function() {

        /**
         * @method drawBefore
         *
         * run before draw object
         *
         */

        /**
         * @method draw
         *
         * draw object
         *
         * @return {Object}
         *
         */

        /**
         * @method drawAfter
         *
         * run after draw object
         */

        /**
         * @method drawAnimate
         *
         * implements animate code after draw object
         */

		/**
		 * @method render
         *
         * 모든 Draw 객체는  render 함수를 통해서 그려진다.
		 * 
		 */
		this.render = function() {
            if(!_.typeCheck("function", this.draw) || !_.typeCheck("function", this.drawAfter)) {
                throw new Error("JUI_CRITICAL_ERR: 'draw & drawAfter' method must be implemented");
            }

            // Call drawBefore method (All)
            if(_.typeCheck("function", this.drawBefore)) {
                this.drawBefore();
            }

            // Call draw method (All)
			var obj = this.draw();

            // Call drawAnimate method (All)
            if(_.typeCheck("function", this.drawAnimate)) {
                var draw = this.grid || this.brush || this.widget;

                if(draw.animate !== false) {
                    this.drawAnimate(obj);
                }
            }

            if(!_.typeCheck("object", obj)) {
                throw new Error("JUI_CRITICAL_ERR: 'draw' method should return the object");
            } else {
                this.drawAfter(obj);
            }

            return obj;
		}

        /**
         * Draw 객체 기본 포맷 메소드
         *
         */
        this.format = function() {
            var draw = this.grid || this.brush || this.widget,
                callback = draw.format || this.chart.format;

            return callback.apply(this.chart, arguments);
        }

        /**
         * 말풍선 그리그 메소드
         *
         * @param type
         * @param w
         * @param h
         * @param anchor
         * @returns {string}
         */
        this.balloonPoints = function(type, w, h, anchor) {
            var points = [];

            if(type == "top") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, h ].join(","));
                points.push([ (w / 2) + (anchor / 2), h ].join(","));
                points.push([ (w / 2), h + anchor ].join(","));
                points.push([ (w / 2) - (anchor / 2), h ].join(","))
                points.push([ 0, h ].join(","));
                points.push([ 0, 0 ].join(","));
            } else if(type == "bottom") {
                points.push([ 0, anchor ].join(","));
                points.push([ (w / 2) - (anchor / 2), anchor ].join(","));
                points.push([ (w / 2), 0 ].join(","));
                points.push([ (w / 2) + (anchor / 2), anchor ].join(","));
                points.push([ w, anchor ].join(","));
                points.push([ w, anchor + h ].join(","))
                points.push([ 0, anchor + h ].join(","));
                points.push([ 0, anchor ].join(","));
            } else if(type == "left") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, (h / 2) - (anchor / 2) ].join(","));
                points.push([ w + anchor, (h / 2) ].join(","));
                points.push([ w, (h / 2) + (anchor / 2) ].join(","));
                points.push([ w, h ].join(","));
                points.push([ 0, h ].join(","));
                points.push([ 0, 0 ].join(","));
            } else if(type == "right") {
                points.push([ 0, 0 ].join(","));
                points.push([ w, 0 ].join(","));
                points.push([ w, h ].join(","));
                points.push([ 0, h ].join(","));
                points.push([ 0, (h / 2) + (anchor / 2) ].join(","));
                points.push([ 0 - anchor, (h / 2) ].join(","));
                points.push([ 0, (h / 2) - (anchor / 2) ].join(","));
                points.push([ 0, 0 ].join(","));
            }

            return points.join(" ");
        }
	}

    Draw.setup = function() {
        return {
            type: null,
            animate: false
        }
    }

	return Draw;
});
