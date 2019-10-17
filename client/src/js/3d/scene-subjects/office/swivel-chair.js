import * as THREE from "three";

export default function SwivelChair(child) {

	var gameObject = null;
	var originalRotation = null;
	var finalRotation = null;

	// swivel
	var rotationSpeed = null;
	var newRotation = null;
	var newRotationVector3 = null;
	var delta = null;

	this.state = {
		swiveling: false
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		// Not sure how this assignment works, but trying to copy value not address by copying primitives.
		originalRotation = gameObject.rotation.clone();
		finalRotation = new THREE.Euler(originalRotation._x, -140/360*2*Math.PI, originalRotation._z);

		rotationSpeed = new THREE.Vector3();
		newRotation = new THREE.Euler();
		newRotationVector3 = new THREE.Vector3();
		delta = new THREE.Vector3();
	}
	this.init();

	this.swivel = function (t) {
		//-15.8 -> -140
		rotationSpeed.subVectors(finalRotation.toVector3(), originalRotation.toVector3());
		delta.set(t,t,t);
		newRotationVector3.addVectors(originalRotation.toVector3(), rotationSpeed.multiply(delta));
		newRotation.setFromVector3(newRotationVector3);
		gameObject.rotation.copy(newRotation);
		
	}
	
	this.update = function(time) {
		this.prevTime = time;
		// this.fly(time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}