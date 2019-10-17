import * as THREE from "three";
import ArcheryArrow from './archery-arrow.js';
import Transition from '../../utils/transition.js';

export default function Goals(group) {

	var children = {};
	var center = new THREE.Vector2(0.62, 0.8);
	this.gameObject = null;
	var scrollTarget = 0.44;
	var transition = {};

	var initialRotation = null;
	var jostling = false;
	var jostlePoint = -1;
	var jostleDuration = .4;

	this.state = {
		dragging: false
	};

	this.prevTime = -1;

	this.init = function() {
		if (group) {
			assignChildren();
			this.gameObject = group;
			transition = new Transition();
			initialRotation = this.gameObject.rotation.toVector3();
		} else 
			console.warn("'group' is empty. Not assigning children to Office");
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
		this.jostle("trivial", time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}
