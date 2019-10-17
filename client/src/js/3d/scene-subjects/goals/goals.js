import * as THREE from "three";
import ArcheryArrow from './archery-arrow.js';
import Transition from '../../utils/transition.js';

export default function Goals(group) {

	var children = {};
	var center = new THREE.Vector2(0.62, 0.8);
	this.gameObject = null;
	var scrollTarget = 0.44;
	var transition = {};

	var initialPosition = null;
	var bouncing = false;
	var bounceStart = false;
	var bounceDuration = 0.66;

	this.state = {
		dragging: false
	};

	this.prevTime = -1;

	this.init = function() {
		if (group) {
			assignChildren();
			this.gameObject = group;
			transition = new Transition();
			initialPosition = this.gameObject.position.clone();
		} else 
			console.warn("'group' is empty. Not assigning children to Office");
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

	this.approachWithMouse = function (mousePosition) {
		if (transition) {
			var t = transition.Desktop.easeIn(mousePosition, center)
			if (children.archeryArrow)
				children.archeryArrow.fly(t);
		}
	}

	this.approachWithScroll = function (scrollPosition) {
		if (transition && scrollPosition < scrollTarget) {
			var t = transition.Mobile.easeIn(scrollPosition, scrollTarget);
			if (children.archeryArrow)
				children.archeryArrow.fly(t);
		}
	}

	function assignChildren () {
		children.archeryArrow = new ArcheryArrow(group.children[1].children[4]);
	}
	
	this.update = function(time) {
		Object.keys(children).forEach(key => {
			children[key].update(time);
		});
		this.prevTime = time;
		this.bounce("trivial", time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}
