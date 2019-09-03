import * as THREE from "three";

export default function PaperAirplane(child) {

	var gameObject = null;
	var originalPosition = null;
	var previousPosition = null;

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
		previousPosition = originalPosition.clone();
	}
	this.init();

	this.fly = function (deltaX) {
		// 𝑦 = 0.001𝑥2−2𝑥 (quadratic function)
		var flightPath = new THREE.Vector3(deltaX, 0, 0);
		var newPosition = new THREE.Vector3();
		newPosition.addVectors(originalPosition, flightPath);
		gameObject.position.copy(newPosition);
		previousPosition = newPosition.clone();
	}
	
	this.update = function(time) {
		this.prevTime = time;
		// this.fly(time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}