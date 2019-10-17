import * as THREE from "three";

export default function AirplaneTakeoff(child) {

	var gameObject = null;
	var originalPosition = null;
	var midPosition = null;
	var finalPosition = null;

	// fly
	var flightPath = null;
	var newPosition = null
	var delta = null;

	this.state = {
		flying: false
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		// Not sure how this assignment works, but trying to copy value not address by copying primitives.
		originalPosition = new THREE.Vector3(4, 0, 7);
		midPosition = new THREE.Vector3(7, 0, 6);
		finalPosition = new THREE.Vector3(8.9, 1, 5.4);

		flightPath = new THREE.Vector3();
		newPosition = new THREE.Vector3();
		delta = new THREE.Vector3();
	}
	this.init();

	this.fly = function (t) {
		if (t < 0.5) {
			flightPath.subVectors(midPosition, originalPosition);
			delta.set(t, t, t);
			newPosition.addVectors(originalPosition, flightPath.multiply(delta.multiplyScalar(2)));
		} else {
			flightPath.subVectors(finalPosition, midPosition);
			delta.set(t-0.5, t-0.5, t-0.5);
			newPosition.addVectors(midPosition, flightPath.multiply(delta.multiplyScalar(2)));
		}
		gameObject.position.copy(newPosition);
	}
	
	this.update = function(time) {
		this.prevTime = time;
	}

	this.onWindowResize = function() {
		this.init();
	}
}