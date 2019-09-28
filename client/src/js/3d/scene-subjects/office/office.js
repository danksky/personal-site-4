import * as THREE from "three";
import LaptopScreen from './laptop-screen.js';
import PaperAirplane from './paper-airplane.js';

export default function Office(group) {

	var children = {};
	var center = new THREE.Vector2(-0.6, 0.25)

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

	this.approachWithMouse = function (mousePosition) {
		if (children.paperAirplane)
			children.paperAirplane.fly(1-mousePosition.distanceTo(center)/2);
	}

	function assignChildren () {
		children.laptopScreen = new LaptopScreen(group.children[1].children[0].children[1]);
		children.paperAirplane = new PaperAirplane(group.children[7]);
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