import * as THREE from "three";
import Bumblebee from './bumblebee.js';
import Helicopter from './helicopter.js';

export default function NameConstructionSite(group) {

	var children = {};
	var center = new THREE.Vector2(0, 0);

	this.state = {
		dragging: false
	};

	this.prevTime = -1;

	this.init = function() {
		if (group)
			assignChildren();
		else 
			console.warn("'group' is empty. Not assigning children to NameConstructionSite");
	}
	this.init();

	this.easeIn = function (mousePosition) {
		// t will always be within [0,1]
		var t = mousePosition.distanceTo(center)/2;
		return 1-Math.pow(t,3);
	}

	this.approachWithMouse = function (mousePosition) {
		var t = mousePosition.distanceTo(center)/2;
		if (children.helicopter)
			children.helicopter.fly(t);
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