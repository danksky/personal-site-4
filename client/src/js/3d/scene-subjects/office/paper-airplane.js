import * as THREE from "three";

export default function PaperAirplane(child) {

	var gameObject = null;
	var originalPosition = null;
	var finalPosition = null;

	this.state = {
		flying: false
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		originalPosition = gameObject.position.clone();
		finalPosition = new THREE.Vector3(-4.2, originalPosition.y, -4.729);
	}
	this.init();

	this.fly = function (t) {
		var flightPath = new THREE.Vector3();
		flightPath.subVectors(finalPosition, originalPosition);
		var newPosition = new THREE.Vector3();
		var delta = new THREE.Vector3(t, t, t);
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