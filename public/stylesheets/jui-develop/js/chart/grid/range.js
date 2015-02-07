jui.define("chart.grid.range", [ "util.scale", "util.base" ], function(UtilScale, _) {

	/**
	 * @class chart.grid.range
	 *
	 * implements range grid
	 *
	 * @extends chart.grid.core
	 */
	var RangeGrid = function() {
		this.top = function(g) {
			if (!this.grid.line) {
				g.append(this.axisLine({
					x2 : this.size
				}));
			}

			var min = this.scale.min(),
				ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0, len = ticks.length; i < len; i++) {

				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0 && ticks[i] != min);

				var axis = this.chart.svg.group({
					"transform" : "translate(" + values[i] + ", 0)"
				});

				axis.append(this.line({
					y2 : (this.grid.line) ? this.axis.area('height') : -bar,
					stroke : this.color(isZero, "gridActiveBorderColor", "gridAxisBorderColor"),
					"stroke-width" : this.chart.theme(isZero, "gridActiveBorderWidth", "gridBorderWidth")
				}));

				axis.append(this.getTextRotate(this.chart.text({
					x : 0,
					y : -bar - 4,
					"text-anchor" : "middle",
					fill : this.chart.theme(isZero, "gridActiveFontColor", "gridFontColor")
				}, domain)));

				g.append(axis);
			}
		}

		this.bottom = function(g) {
			if (!this.grid.line) {
				g.append(this.axisLine({
					x1 : this.start,
					x2 : this.end
				}));
			}

			var min = this.scale.min(),
				ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {

				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0 && ticks[i] != min);

				var axis = this.chart.svg.group({
					"transform" : "translate(" + values[i] + ", 0)"
				});

				axis.append(this.line({
					y2 : (this.grid.line) ? -this.axis.area('height') : bar,
					stroke : this.color(isZero, "gridActiveBorderColor", "gridAxisBorderColor"),
					"stroke-width" : this.chart.theme(isZero, "gridActiveBorderWidth", "gridBorderWidth")
				}));

				axis.append(this.getTextRotate(this.chart.text({
					x : 0,
					y : bar * 3,
					"text-anchor" : "middle",
					fill : this.chart.theme(isZero, "gridActiveFontColor", "gridFontColor")
				}, domain)))

				g.append(axis);
			}
		}

		this.left = function(g) {
			if (!this.grid.line) {
				g.append(this.axisLine({
					y1 : this.start,
					y2 : this.end
				}));

			}

			var min = this.scale.min(),
				ticks = this.ticks,
				values = this.values,
				bar = this.bar;
            
            var activeBorderColor = this.color("gridActiveBorderColor");
            var borderColor = this.color("gridBorderColor");

			for (var i = 0; i < ticks.length; i++) {

				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0 && ticks[i] != min);

				var axis = this.chart.svg.group({
					"transform" : "translate(0, " + values[i] + ")"
				})

				axis.append(this.line({
					x2 : (this.grid.line) ? this.axis.area('width') : -bar,
					stroke : isZero ? activeBorderColor : borderColor,
					"stroke-width" : this.chart.theme(isZero, "gridActiveBorderWidth", "gridBorderWidth")
				}));

				if (!this.grid.hideText) {
					axis.append(this.getTextRotate(this.chart.text({
						x : -bar - 4,
						y : bar,
						"text-anchor" : "end",
						fill : this.chart.theme(isZero, "gridActiveFontColor", "gridFontColor")
					}, domain)));
				}

				g.append(axis);

			}
		}

		this.right = function(g) {
			if (!this.grid.line) {
				g.append(this.axisLine({
					y1 : this.start,
					y2 : this.end
				}));
			}

			var min = this.scale.min(),
				ticks = this.ticks,
				values = this.values,
				bar = this.bar;

			for (var i = 0; i < ticks.length; i++) {
				var domain = this.format(ticks[i], i);

				if (!domain && domain !== 0) {
					continue;
				}

				var isZero = (ticks[i] == 0 && ticks[i] != min);

				var axis = this.chart.svg.group({
					"transform" : "translate(0, " + values[i] + ")"
				});

				axis.append(this.line({
					x2 : (this.grid.line) ? -this.axis.area('width') : bar,
					stroke : this.color(isZero, "gridActiveBorderColor", "gridAxisBorderColor"),
					"stroke-width" : this.chart.theme(isZero, "gridActiveBorderWidth", "gridBorderWidth")
				}));

				axis.append(this.getTextRotate(this.chart.text({
					x : bar + 4,
					y : bar,
					"text-anchor" : "start",
					fill : this.chart.theme(isZero, "gridActiveFontColor", "gridFontColor")
				}, domain)));

				g.append(axis);
			}
		}

        this.wrapper = function(scale, key) {
            var old_scale = scale;
            var self = this;

            function new_scale(i) {
                return old_scale(self.axis.data[i][key]);
            }

            return (key) ? $.extend(new_scale, old_scale) : old_scale;
        }

		/**
		 * range grid 의 domain 설정
		 *
		 * grid 속성중에 domain 이 없고 target 만 있을 때  target 을 기준으로  domain 생성
		 *
		 */
		this.initDomain = function() {

			var domain = [];
			var min = this.grid.min || undefined,
				max = this.grid.max || undefined,
				data = this.data();
			var value_list = [];
			var isArray = false;

			if (_.typeCheck("string", this.grid.domain)) {
				var field = this.grid.domain;

				value_list = new Array(data.length);
				var index = data.length;
				while(index--) {
					var value = data[index][field];

					if (_.typeCheck("array", value)) {
						value_list[index] = Math.max(value);
						value_list.push(Math.min(value));
					} else {
						value_list[index]  = value;
						value_list.push(0);
					}
				}
			} else if (_.typeCheck("function", this.grid.domain)) {
				value_list = new Array(data.length);

                var isCheck = false;
				var index = data.length;
				while(index--) {

					var value = this.grid.domain.call(this.chart, data[index]);

					if (_.typeCheck("array", value)) {

						value_list[index] = Math.max.apply(Math, value);
						value_list.push(Math.min.apply(Math, value));
					} else {
						value_list[index]  = value;

                        if (!isCheck) {
                            value_list.push(0);
                            isCheck = true;
                        }

					}
				}
			} else {
				value_list = this.grid.domain;
				isArray = true;
			}

			var tempMin = Math.min.apply(Math, value_list);
			var tempMax = Math.max.apply(Math, value_list);

			if (isArray) {
				min = tempMin;
				max = tempMax;
			} else {
				if (typeof min == 'undefined' || min > tempMin) min = tempMin;
				if (typeof max == 'undefined' || max < tempMax) max = tempMax;
			}

			this.grid.max = max;
			this.grid.min = min;

			var unit;

			if (_.typeCheck("function", this.grid.unit)) {
				unit = this.grid.unit.call(this.chart, this.grid);
			} else if (_.typeCheck("number", this.grid.unit)) {
				unit = this.grid.unit;
			} else {
				unit = Math.ceil((max - min) / this.grid.step);
			}

			if (unit == 0) {
				domain = [0, 0];
			} else {

				var start = 0;

				while (start < max) {
					start += unit;
				}

				var end = start;
				while (end > min) {
					end -= unit;
				}

				domain = [end, start];

				this.grid.step = (Math.abs(end - start) / unit);
			}

			if (this.grid.reverse) {
				domain.reverse();
			}
            
			return domain;
		}

		this.drawBefore = function() {
			var domain = this.initDomain();

			var obj = this.getGridSize();

			this.scale = UtilScale.linear().domain(domain);

			if (this.grid.orient == "left" || this.grid.orient == "right") {
                var arr = [obj.end, obj.start];
			} else {
                var arr = [obj.start, obj.end]
			}
            this.scale.range(arr);
			this.scale.clamp(this.grid.clamp)

			this.start = obj.start;
			this.size = obj.size;
			this.end = obj.end;
			this.step = this.grid.step;
			this.nice = this.grid.nice;
			this.ticks = this.scale.ticks(this.step, this.nice);

			this.bar = 6;

			this.values = [];

			for (var i = 0, len = this.ticks.length; i < len; i++) {
				this.values[i] = this.scale(this.ticks[i]);
			}

		}

		this.draw = function() {
			return this.drawGrid("range");
		}
	}

	RangeGrid.setup = function() {
		return {
			/** @cfg {Array} [domain=null]  보이는 값(min, max) 설정 */
			domain: null,
			/** @cfg {Number} [step=10] 나누는 숫자 */
			step: 10,
			/** @cfg {Number} [min=0] 최소값 설정 */
			min: 0,
			/** @cfg {Number} [max=0] 최대값 설정 */
			max: 0,
			/** @cfg {Number} [unit=null] 단계별 사이즈  */
			unit: null,
			/**
			 * @cfg {Boolean} [clamp=true]
			 *
			 * max 나 min 을 넘어가는 값에 대한 체크,
			 * true 이면 넘어가는 값도 min, max 에서 조정, false 이면  비율로 계산해서 넘어가는 값 적용
			 */
			clamp : true,
			/**
			 * @cfg {Boolean} [reverse=false]
			 *
			 * 도메인을 거꾸로 정렬한다.
			 * true 이면 도메인이  [0,300] 이라고 할 때 [300, 0] 으로 변경된다.
			 * 화면상에 300 에서 0 값으로 차례로 나타나게 된다.
			 */
			reverse: false,
			/** @cfg {String} [key=null] a field for value */
			key: null,
			/** @cfg {Boolean} [hideText=false] 텍스트 보이기 여부 */
			hideText: false,
			/** @cfg {Boolean} [nice=false] 그리드 간격 적당히 분할하기  */
			nice: false
		};
	}

	return RangeGrid;
}, "chart.grid.core");
