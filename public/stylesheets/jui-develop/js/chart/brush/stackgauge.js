jui.define("chart.brush.stackgauge", [ "util.math" ], function(math) {

	/**
	 * @class chart.brush.stackgauge
	 *
	 * stack 형태의 gauge 브러쉬
	 *
	 * @extends chart.brush.donut
	 */
	var StackGaugeBrush = function(chart, axis, brush) {
        var w, centerX, centerY, outerRadius;

		this.drawBefore = function() {
			if (!axis.c) {
				axis.c = function() {
					return {
						x : 0,
						y : 0,
						width : chart.area("width"),
						height : chart.area("height")
					};
				}
			}

			var obj = axis.c(),
				width = obj.width,
				height = obj.height,
				x = obj.x,
				y = obj.y,
				min = width;

			if (height < min) {
				min = height;
			}

			w = min / 2;
			centerX = width / 2 + x;
			centerY = height / 2 + y;
			outerRadius = w;
		}

		this.draw = function() {
			var group = chart.svg.group();
			
			this.eachData(function(i, data) {
				var rate = (data[brush.target] - brush.min) / (brush.max - brush.min),
                    currentAngle = (brush.endAngle) * rate,
                    innerRadius = outerRadius - brush.size + brush.cut;
				
				if (brush.endAngle >= 360) {
                    brush.endAngle = 359.99999;
				}
				
				// 빈 공간 그리기 
				var g = this.drawDonut(centerX, centerY, innerRadius, outerRadius, brush.startAngle + currentAngle, brush.endAngle - currentAngle, {
					fill : chart.theme("gaugeBackgroundColor")
				});
	
				group.append(g);
				
				// 채워진 공간 그리기 
				g = this.drawDonut(centerX, centerY, innerRadius, outerRadius, brush.startAngle, currentAngle,{
					fill : this.color(i)
				}, true);
	
				group.append(g);
				
				// draw text 
				group.append(chart.text({
					x : centerX + 2,
					y : centerY + Math.abs(outerRadius) - 5,
					fill : this.color(i),
					"font-size" : "12px",
					"font-weight" : "bold"
				}, data[brush.title] || ""))
				
				outerRadius -= brush.size;
			});

            return group;
		}
	}

	StackGaugeBrush.setup = function() {
		return {
			/** @cfg {Number} [min=0] */
			min: 0,
			/** @cfg {Number} [max=100] */
			max: 100,
			/** @cfg {Number} [cut=5] */
			cut: 5,
			/** @cfg {Number} [size=24] */
			size: 24,
			/** @cfg {Number} [startAngle=-180] */
			startAngle: -180,
			/** @cfg {Number} [endAngle=360] */
			endAngle: 360,
			/** @cfg {String} [title="title"] */
			title: "title"
		};
	}

	return StackGaugeBrush;
}, "chart.brush.donut");
