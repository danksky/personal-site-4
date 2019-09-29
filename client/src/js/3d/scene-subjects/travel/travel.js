import * as THREE from "three";
import AirplaneLand from './airplane-land.js';
import AirplaneTakeoff from './airplane-takeoff.js';
import Transition from '../../utils/transition.js';

export default function Travel(group) {

	var children = {};
	var center = new THREE.Vector2(0.6, -0.4);
	var scrollTarget = 0.8;
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
			var t = transition.Desktop.easeIn(mousePosition, center);
			if (children.airplaneLand)
				children.airplaneLand.fly(t);
			t = transition.Desktop.easeOut(mousePosition, center);
			if (children.airplaneTakeoff)
				children.airplaneTakeoff.fly(t);
		}
	}

	this.approachWithScroll = function (scrollPosition) {
		if (transition) { // no inequality check bc of the t-0.3 below (stops around 0.2 from top)
			var t = transition.Mobile.easeIn(scrollPosition-0.15, scrollTarget);
			if (children.airplaneLand)
				children.airplaneLand.fly(t);
			t = transition.Mobile.easeOut(scrollPosition-0.15, scrollTarget);
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