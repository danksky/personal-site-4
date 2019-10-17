export default function Transition () {
	this.Desktop = {
		easeIn: function (mousePosition, center) {
			// t will always be within [0,1]
			var t = mousePosition.distanceTo(center)/2;
			return 1-Math.pow(t,2);
		},
		easeOut: function (mousePosition, center) {
			// t will always be within [0,1]
			var t = mousePosition.distanceTo(center);
			return Math.pow(t,-1.25);
		},
		amplitude: function (duration, max) {
			return 2 * Math.sin(2 * (2 * Math.PI / max) * duration) / 360 * 2 * Math.PI;
		}
	};
	this.Mobile =  {
		easeIn: function (scrollPosition, scrollTarget) {
			// t will always be within [0,1]
			var t = Math.abs(scrollTarget - scrollPosition);
			return 1-Math.pow(5*t,1.5);
		},
		easeOut: function (scrollPosition, scrollTarget) {
			// t will always be within [0,1]
			var t = Math.abs(scrollTarget - scrollPosition);
			return Math.pow(5*t,-1.5);
		},
		amplitude: function (duration) {
			return 4 * Math.sin(2 * Math.PI / 1.8 * duration)/(1.8+duration) / 360 * 2 * Math.PI;
		}
	} 
}