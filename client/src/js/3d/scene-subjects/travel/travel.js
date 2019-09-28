import * as THREE from "three";
import AirplaneLand from './airplane-land.js';
import AirplaneTakeoff from './airplane-takeoff.js';

export default function Travel(group) {

	var children = {};
	var center = new THREE.Vector2(0.6, -0.4)

	this.state = {
		dragging: false
	};

	this.prevTime = -1;

	this.init = function() {
		if (group)
			assignChildren();
		else 
			console.warn("'group' is empty. Not assigning children to Office");
	}
	this.init();

	this.easeIn = function (mousePosition) {
		// t will always be within [0,1]
		var t = mousePosition.distanceTo(center)/2;
		return 1-Math.pow(t,3);
	}
	this.easeOut = function (mousePosition) {
		// t will always be within [0,1]
		var t = mousePosition.distanceTo(center);
		return Math.pow(t,-1.25);
	}

	this.approachWithMouse = function (mousePosition) {
		var t = this.easeIn(mousePosition);
		if (children.airplaneLand)
			children.airplaneLand.fly(t);
		t = this.easeOut(mousePosition);
		if (children.airplaneTakeoff)
			children.airplaneTakeoff.fly(t);
	}

	function assignChildren () {
		children.airplaneTakeoff = new AirplaneTakeoff(group.children[1]);
		children.airplaneLand = new AirplaneLand(group.children[2]);
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