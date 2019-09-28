import * as THREE from "three";

export default function Helicopter(child) {

	var gameObject = null;
	var originalPosition = null;
	
	this.state = {
		flying: false
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		originalPosition = new THREE.Vector3(-0.5, 4, 2.25);
		gameObject.position.copy(originalPosition);
	}
	this.init();

	this.fly = function (t) {
		var newPosition = new THREE.Vector3(originalPosition.x, 3 + Math.cos(t * 2 * Math.PI), originalPosition.z);
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