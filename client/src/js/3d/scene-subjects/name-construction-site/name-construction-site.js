import * as THREE from "three";
import Bumblebee from './bumblebee.js';
import Helicopter from './helicopter.js';
import Transition from '../../utils/transition.js';

export default function NameConstructionSite(group) {

	var children = {};
	var center = new THREE.Vector2(0, 0);
	var scrollTarget = 0.11;
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
			console.warn("'group' is empty. Not assigning children to NameConstructionSite");
	}
	this.init();

	this.approachWithMouse = function (mousePosition) {
		var t = mousePosition.distanceTo(center)/4;
		if (children.helicopter)
			children.helicopter.fly(t);
	}

	this.approachWithScroll = function (scrollPosition) {
		if (children.helicopter)
			children.helicopter.fly(scrollPosition * 3);
	}

	function assignChildren () {
		children.bumblebee = new Bumblebee(group.children[12]);
		children.helicopter = new Helicopter(group.children[6]);
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