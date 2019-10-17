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
		this.bounce("trivial", time);
	}

	this.onWindowResize = function() {
		this.init();
	}
}