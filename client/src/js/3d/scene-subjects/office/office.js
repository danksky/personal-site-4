import * as THREE from "three";
import LaptopScreen from './laptop-screen.js';
import PaperAirplane from './paper-airplane.js';
import SwivelChair from './swivel-chair.js';
import Transition from '../../utils/transition.js';

export default function Office(group) {

	var children = {};
	var center = new THREE.Vector2(-0.6, 0.25);
	var scrollTarget = 0.6;
	var transition = null;

	this.state = {
		dragging: false
	};

	this.prevTime = -1;

	this.init = function() {
		if (group) {
			assignChildren();
			transition = new Transition();
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
	}

	this.onWindowResize = function() {
		this.init();
	}
}