export default function Transition () {

	this.easeIn = function (mousePosition, center) {
		// t will always be within [0,1]
		var t = mousePosition.distanceTo(center)/2;
		return 1-Math.pow(t,3);
	}
	this.easeOut = function (mousePosition, center) {
		// t will always be within [0,1]
		var t = mousePosition.distanceTo(center);
		return Math.pow(t,-1.25);
	}

}