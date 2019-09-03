import * as THREE from "three";

export default function LaptopScreen(child) {

	var gameObject = null;
	var originalScreenColor = null;
	var offScreenColor = null;

	this.state = {
		dragging: false,
		flickering: true,
		stage: -1
	};

	this.prevTime = -1;

	this.init = function() {
		console.log(child);
		gameObject = child;
		originalScreenColor = gameObject.material.color.clone();
		offScreenColor = new THREE.Color(0.2, 0.2, 0.2);
	}
	this.init();

	this.drag = function (deltaX) {
	}
	
	this.update = function(time) {
		if (this.state.flickering) {
			if (time % 2 < 0.9) {
				if (this.state.stage === 0) { // already switched 

				} else {
					gameObject.material.color = offScreenColor;
					this.state.stage = 0;
				}	
			} else if (time % 2 < 1.2) {
				if (this.state.stage === 1) { // already switched 

				} else {
					gameObject.material.color = originalScreenColor;
					this.state.stage = 1;
				}	
			} else if (time % 2 < 1.4) {
				if (this.state.stage === 2) { // already switched 

				} else {
					gameObject.material.color = offScreenColor;
					this.state.stage = 2;
				}	
			} else if (time % 2 > 1.8) {
				if (this.state.stage === 3) { // already switched 

				} else {
					gameObject.material.color = originalScreenColor;
					this.state.stage = 3;
				}	
			}
		}
		
		this.prevTime = time;
	}

	this.changeColors = function (on) {

	}

	this.onWindowResize = function() {
		this.init();
	}
}