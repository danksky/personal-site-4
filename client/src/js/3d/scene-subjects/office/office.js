import * as THREE from "three";
import LaptopScreen from './laptop-screen.js';
import PaperAirplane from './paper-airplane.js';
import SwivelChair from './swivel-chair.js';
import Transition from '../../utils/transition.js';

export default function Office(group) {

	var children = {};
	var center = new THREE.Vector2(-0.6, 0.25);
	this.gameObject = null;
	var scrollTarget = 0.6;
	var transition = null;

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

	this.approachWithMouse = function (mousePosition) {
		if (transition) {
			var t = transition.Desktop.easeIn(mousePosition, center)
			if (children.paperAirplane)
				children.paperAirplane.fly(t);
			if (children.swivelChair)
				children.swivelChair.swivel(t);
		}
	}

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

	this.approachWithScroll = function (scrollPosition) {
		if (transition && scrollPosition < scrollTarget) {
			var t = transition.Mobile.easeIn(scrollPosition, scrollTarget);
			if (children.paperAirplane)
				children.paperAirplane.fly(t);
			if (children.swivelChair)
				children.swivelChair.swivel(t);
		}
	}

	function assignChildren () {
		children.laptopScreen = new LaptopScreen(group.children[1].children[0].children[1]);
		children.paperAirplane = new PaperAirplane(group.children[7]);
		children.swivelChair = new SwivelChair(group.children[3]);
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