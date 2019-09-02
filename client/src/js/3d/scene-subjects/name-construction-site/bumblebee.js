import * as THREE from "three";

export default function Bumblebee(child) {

	var gameObject = null;
	var originalPosition = null;
	var previousPosition = null;

	this.state = {
		dragging: false
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		// Not sure how this assignment works, but trying to copy value not address by copying primitives.
		originalPosition = new THREE.Vector3().clone(gameObject.position);
		previousPosition = new THREE.Vector3().clone(originalPosition);
	}
	this.init();

	this.drag = function (deltaX) {
		
	}
	
	this.update = function(time) {
		var figureEight = new THREE.Vector3(
			(Math.sin(time) * Math.cos(time))/(1 + Math.pow(Math.sin(time), 2)) - 0.75, 
			0.6, // 0.1 * Math.sin(time),
			Math.cos(time)/(1 + Math.pow(Math.sin(time), 2)) - 0.5
		);
		var newPosition = new THREE.Vector3();
		newPosition.addVectors(originalPosition, figureEight);
		gameObject.rotation.y = Math.atan((newPosition.z - previousPosition.z)/(newPosition.x - previousPosition.x));
		gameObject.position.copy(newPosition);
		this.prevTime = time;
		previousPosition = new THREE.Vector3().clone(newPosition);
	}

	this.onWindowResize = function() {
		this.init();
	}
}