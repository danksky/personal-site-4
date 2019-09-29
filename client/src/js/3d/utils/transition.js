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
		}
	};
	this.Mobile =  {
		easeIn: function (scrollPosition, scrollTarget) {
			// t will always be within [0,1]
			var t = Math.abs(scrollTarget - scrollPosition);
			return 1-Math.pow(t,1.25);
		},
		easeOut: function (scrollPosition, scrollTarget) {
			// t will always be within [0,1]
			var t = Math.abs(scrollTarget - scrollPosition);
			return Math.pow(t,-1.25);
		}
	} 
}