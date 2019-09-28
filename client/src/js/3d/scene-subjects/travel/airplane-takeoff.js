import * as THREE from "three";

export default function AirplaneTakeoff(child) {

	var gameObject = null;
	var originalPosition = null;
	var midPosition = null;
	var finalPosition = null;

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
	}
	this.init();

	this.fly = function (t) {
		// 𝑦 = 0.001𝑥2−2𝑥 (quadratic function) - for later iterations...
		var flightPath = new THREE.Vector3();
		var newPosition = new THREE.Vector3();
		var delta;
		if (t < 0.5) {
			flightPath.subVectors(midPosition, originalPosition);
			delta = new THREE.Vector3(t, t, t);
			newPosition.addVectors(originalPosition, flightPath.multiply(delta.multiplyScalar(2)));
		} else {
			flightPath.subVectors(finalPosition, midPosition);
			delta = new THREE.Vector3(t-0.5, t-0.5, t-0.5);
			newPosition.addVectors(midPosition, flightPath.multiply(delta.multiplyScalar(2)));
		}
		gameObject.position.copy(newPosition);
	}
	
	this.update = function(time) {
		this.prevTime = time;
		// this.fly(time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}