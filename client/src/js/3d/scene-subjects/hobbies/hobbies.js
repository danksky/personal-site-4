import * as THREE from "three";
import Transition from '../../utils/transition.js';

export default function Hobbies(group) {

	var transition = {};
	this.gameObject = null;

	var initialRotation = null;
	var jostling = false;
	var jostlePoint = -1;
	var jostleDuration = .4;

	this.prevTime = -1;

	this.init = function() {
		if (group) {
			transition = new Transition();
			this.gameObject = group;
			initialRotation = this.gameObject.rotation.toVector3();
		} else 
			console.warn("'group' is empty. Not assigning children to Hobbies");
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

	this.approachWithMouse = function (mousePosition) {
	}

	this.approachWithScroll = function (scrollPosition) {
	}
	
	this.update = function(time) {
		this.prevTime = time;
		this.jostle("trivial", time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}
