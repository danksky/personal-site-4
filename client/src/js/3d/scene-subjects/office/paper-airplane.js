import * as THREE from "three";

export default function PaperAirplane(child) {

	var gameObject = null;
	var originalPosition = null;
	var finalPosition = null;

	this.state = {
		flying: false
	};

	// x: 660, z: -500

	// x0: -12, z0: -3.553
	// x1: -4.2, z1: -4.729

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		// Not sure how this assignment works, but trying to copy value not address by copying primitives.
		originalPosition = gameObject.position.clone();
		finalPosition = new THREE.Vector3(-4.2, originalPosition.y, -4.729);
	}
	this.init();

	this.fly = function (t) {
		// 𝑦 = 0.001𝑥2−2𝑥 (quadratic function) - for later iterations...


		var flightPath = new THREE.Vector3();
		flightPath.subVectors(finalPosition, originalPosition);
		var newPosition = new THREE.Vector3();
		var delta = new THREE.Vector3(t, t, t);
		newPosition.addVectors(originalPosition, flightPath.multiply(delta));
		gameObject.position.copy(newPosition);
		
		/*

		Functions:
		x = exponential function determined by two points: (0,0) and (1, rangeofxvalues=(xmax - xmin))
		z = quadratic function with relation to x determined by two points: (x0, z0) and (x1, z1)
		*/
	}
	
	this.update = function(time) {
		this.prevTime = time;
		// this.fly(time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}