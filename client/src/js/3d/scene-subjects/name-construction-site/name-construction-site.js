import Bumblebee from './bumblebee.js';

export default function NameConstructionSite(group) {

	var children = {};

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

	this.drag = function (deltaX) {
		
	}

	function assignChildren () {
		children.bumblebee = new Bumblebee(group.children[12]);
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