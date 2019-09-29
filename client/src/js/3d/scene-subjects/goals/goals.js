import * as THREE from "three";
import ArcheryArrow from './archery-arrow.js';
import Transition from '../../utils/transition.js';

export default function Goals(group) {

	var children = {};
	var center = new THREE.Vector2(0.62, 0.8);
	var scrollTarget = 0.55;
	var transition = {};

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
			var t = new transition.Desktop.easeIn(mousePosition, center)
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
	}

	this.onWindowResize = function() {
		this.init();
	}
}
