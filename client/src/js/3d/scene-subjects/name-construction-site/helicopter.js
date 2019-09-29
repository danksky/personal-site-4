import * as THREE from "three";

export default function Helicopter(child) {

	var gameObject = null;
	var propeller = null;
	var blockW = null;
	var originalPosition = null;
	var originalPaintColor = null;
	var dippedPaintColor = null;

	this.state = {
		flying: false,
		stage: -1
	};

	this.prevTime = -1;

	this.init = function() {
		gameObject = child;
		propeller = child.children[2];
		blockW = child.children[7];
		blockW.material = blockW.material.clone();
		originalPaintColor = blockW.material.color.clone();
		dippedPaintColor = new THREE.Color(0x15aec6);
		originalPosition = new THREE.Vector3(-0.5, 2, 2.25);
		gameObject.position.copy(originalPosition);
	}
	this.init();

	this.fly = function (t) {
		var y = 3 - Math.cos(t * 2 * Math.PI);
		var newPosition = new THREE.Vector3(originalPosition.x, y, originalPosition.z);
		gameObject.position.copy(newPosition);
		if (t < 0.5 && this.state.stage !== 0) {
			this.state.stage = 0;
			blockW.material.color = dippedPaintColor;
		} else if (t >= 0.5 && this.state.stage !== 1) {
			this.state.stage = 1;
			blockW.material.color = originalPaintColor;
		} 
	}
	
	this.update = function(time) {
		this.prevTime = time;
		propeller.rotation.setFromVector3(new THREE.Vector3(0,time,0));
	}

	this.onWindowResize = function() {
		this.init();
	}
}