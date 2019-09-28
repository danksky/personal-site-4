import * as THREE from "three";
import LaptopScreen from './laptop-screen.js';
import PaperAirplane from './paper-airplane.js';
import SwivelChair from './swivel-chair.js';

export default function Office(group) {

	var children = {};
	var center = new THREE.Vector2(-0.6, 0.25);

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

	this.approachWithMouse = function (mousePosition) {
		var t = this.easeIn(mousePosition)
		if (children.paperAirplane)
			children.paperAirplane.fly(t);
		if (children.swivelChair)
			children.swivelChair.swivel(t);
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