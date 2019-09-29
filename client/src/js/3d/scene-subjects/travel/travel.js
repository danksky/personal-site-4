import * as THREE from "three";
import AirplaneLand from './airplane-land.js';
import AirplaneTakeoff from './airplane-takeoff.js';
import Transition from '../../utils/transition.js';

export default function Travel(group) {

	var children = {};
	var center = new THREE.Vector2(0.6, -0.4);
	var transition = null;

	this.state = {
		dragging: false
	};

	this.prevTime = -1;

	this.init = function() {
		if (group){
			assignChildren();
			transition = new Transition();
		} else 
			console.warn("'group' is empty. Not assigning children to Office");
	}
	this.init();

	this.approachWithMouse = function (mousePosition) {
		if (transition) {
			var t = transition.easeIn(mousePosition, center);
			if (children.airplaneLand)
				children.airplaneLand.fly(t);
			t = transition.easeOut(mousePosition, center);
			if (children.airplaneTakeoff)
				children.airplaneTakeoff.fly(t);
		}
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