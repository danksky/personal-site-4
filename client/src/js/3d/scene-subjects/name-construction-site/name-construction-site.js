import * as THREE from "three";
import Bumblebee from './bumblebee.js';
import Helicopter from './helicopter.js';
import BlockName from './block-name.js';
import Bulldozer from './bulldozer.js';
import Cones from './cones.js';
import Mailbox from './mailbox.js';
import Transition from '../../utils/transition.js';


export default function NameConstructionSite(group) {

	var children = {};
	var center = new THREE.Vector2(0, 0);
	this.gameObject = null;
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
			this.gameObject = group;
			
		} else 
			console.warn("'group' is empty. Not assigning children to NameConstructionSite");
	}
	this.init();

	this.nudge = function(objectName, eTime) {
		if (children[objectName])
			children[objectName].nudge(objectName, eTime);
	}

	this.approachWithMouse = function (mousePosition) {
		var t = mousePosition.distanceTo(center)/4;
		if (children.Helicopter)
			children.Helicopter.fly(t);
	}

	this.approachWithScroll = function (scrollPosition) {
		if (children.Helicopter)
			children.Helicopter.fly(scrollPosition * 3);
	}

	function assignChildren () {
		children.Bumblebee = new Bumblebee(group.children[12]);
		children.Helicopter = new Helicopter(group.children[6]);
		children["Daniel Kawalsky"] = new BlockName(group.children[1]);
		children.Bulldozer = new Bulldozer(group.children[3]);
		children.mailbox = new Mailbox(group.children[2]);
		children.Cones = new Cones(group.children[4]);
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