import * as THREE from "three";

export default function SwivelChair(child) {

	var gameObject = null;
	var originalRotation = null;
	var finalRotation = null;

	this.state = {
		swiveling: false
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		// Not sure how this assignment works, but trying to copy value not address by copying primitives.
		originalRotation = gameObject.rotation.clone();
		finalRotation = new THREE.Euler(originalRotation._x, -140/360*2*Math.PI, originalRotation._z);
	}
	this.init();

	this.swivel = function (distanceFromCursor) {
		//-15.8 -> -140

		var rotationSpeed = new THREE.Vector3();
		rotationSpeed.subVectors(finalRotation.toVector3(), originalRotation.toVector3());
		var newRotation = new THREE.Euler();
		var newRotationVector3 = new THREE.Vector3();
		var delta = new THREE.Vector3(distanceFromCursor, distanceFromCursor, distanceFromCursor);
		newRotationVector3.addVectors(originalRotation.toVector3(), rotationSpeed.multiply(delta));
		newRotation.setFromVector3(newRotationVector3);
		gameObject.rotation.copy(newRotation);
		
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