import * as THREE from "three";

export default function PaperAirplane(child) {

	var gameObject = null;
	var originalPosition = null;
	var finalPosition = null;

	// fly
	var flightPath = null;
	var newPosition = null;
	var delta = null;

	this.state = {
		flying: false
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		originalPosition = gameObject.position.clone();
		finalPosition = new THREE.Vector3(-4.2, originalPosition.y, -4.729);

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