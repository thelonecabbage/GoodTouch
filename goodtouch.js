$(function () {
	var distanceXY = function (pointA, pointB) {
		var x = Math.abs(pointA.x - pointB.x);
		var y = Math.abs(pointA.y - pointB.y);
		return Math.sqrt(x*x + y*y);
	}
	var touches = false;
	var touchme = function (e) {
			var action = '';
			var $target = false;

			if (e.type === 'touchmove' && window.event.touches.length == 1) {
				var p = {x: window.event.pageX, y: window.event.pageY, t: Date.now().valueOf()};
				if (! touches ) {
					touches = [p];
				} else {
					touches[1] = p;
				}
				console.log(window.event.pageX);
			} else if (e.type === 'touchend') {
				var t_start = e.originalEvent.timeStamp;
				var t_end = e.timeStamp;
				var pointA = touches[0] || {x: window.event.pageX, y: window.event.pageY, t: Date.now().valueOf()};
				var pointB = touches[1] || {x: window.event.pageX, y: window.event.pageY, t: Date.now().valueOf()};

				var distance = distanceXY (pointA, pointB);
				var dX = pointB.x - pointA.x;
				var dY = pointB.y - pointA.y;

				var tspan = pointB.t - pointA.t;

				if (Math.abs(dX) > 75 && tspan < 500) {
					action = 'swipe';
					action += (dX < 0) ? 'left' : 'right';
				}

				if (distance < 10 && tspan < 200) {
					action = 'tap'
				}

				$target =  $(e.originalEvent.target);
				touches = false;


			}

			$(e.target).trigger(action);			

		};

	$('body').on('touchmove', touchme);
	$('body').on('touchend',touchme);
});