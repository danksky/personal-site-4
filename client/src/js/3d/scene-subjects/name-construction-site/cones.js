import * as THREE from "three";
import Transition from '../../utils/transition.js';

export default function Cones(child) {

	this.gameObject = null;
	var transition = null;

	var initialPosition = null;
	var bouncing = false;
	var bounceStart = false;
	var bounceDuration = 0.66;

	this.prevTime = -1;

	this.init = function() {
		this.gameObject = child;
		transition = new Transition();
		initialPosition = this.gameObject.position.clone();
	}
	this.init();

	this.nudge = function (objectName, eTime) {
		if (!bouncing) {
			bouncing = true;
			bounceStart = eTime;
		}
	}

	this.bounce = function (objectName, eTime) {
		var duration = eTime - bounceStart;
		if (bouncing && transition) {
			if (duration < bounceDuration ) {
				var height = transition.Desktop.bounce(1.5, duration, bounceDuration) /20
				this.gameObject.position.set(initialPosition.x, initialPosition.y + height, initialPosition.z)
			} else {
				bouncing = false;
			}
		} 
	}
	
	this.update = function(time) {
		this.prevTime = time;
		this.bounce("trivial", time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}