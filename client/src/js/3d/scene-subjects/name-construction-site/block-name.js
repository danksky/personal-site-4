import * as THREE from "three";
import Transition from '../../utils/transition.js';

export default function BlockName(child) {

	this.gameObject = null;
	var transition = null;

	var initialRotation = null;
	var jostling = false;
	var jostlePoint = -1;
	var jostleDuration = .4;

	this.prevTime = -1;

	this.init = function() {
		this.gameObject = child;
		transition = new Transition();
		initialRotation = this.gameObject.rotation.toVector3();
	}
	this.init();

	this.nudge = function (objectName, eTime) {
		if (!jostling) {
			jostling = true;
			jostlePoint = eTime;
		}
	}

	this.jostle = function (objectName, eTime) {
		var duration = eTime - jostlePoint;
		if (jostling && transition) {
			if (duration < jostleDuration ) {
				var amplitude = transition.Desktop.amplitude(duration, jostleDuration);
				this.gameObject.rotation.set(initialRotation.x, initialRotation.y, initialRotation.z + amplitude)
				// console.log("amplitude", amplitude)
			} else {
				jostling = false;
			}
		} 
	}
	
	this.update = function(time) {
		this.prevTime = time;
		this.jostle("trivial", time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}