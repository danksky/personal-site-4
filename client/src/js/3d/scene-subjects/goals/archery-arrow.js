import * as THREE from "three";

export default function ArcheryArrow(child) {

	var gameObject = null;
	var originalPosition = null;
	var finalPosition = null;

	var flightPath = null;
	var newPosition = null;
	var delta = null;

	this.state = {
		flying: false
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		// Not sure how this assignment works, but trying to copy value not address by copying primitives.
		originalPosition = gameObject.position.clone();
		finalPosition = new THREE.Vector3(8.8, 2, originalPosition.z);
		flightPath = new THREE.Vector3();
		newPosition = new THREE.Vector3();
		delta = new THREE.Vector3();
	}
	this.init();

	this.fly = function (t) {
		flightPath.subVectors(finalPosition, originalPosition);
		delta.set(t,t,t);
		newPosition.addVectors(originalPosition, flightPath.multiply(delta));
		gameObject.position.copy(newPosition);
	}
	
	this.update = function(time) {
		this.prevTime = time;
	}

	this.onWindowResize = function() {
		this.init();
	}
}