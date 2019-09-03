import LaptopScreen from './laptop-screen.js';

export default function Office(group) {

	var children = {};

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

	this.drag = function (deltaX) {
		
	}

	function assignChildren () {
		children.laptopScreen = new LaptopScreen(group.children[1].children[0].children[1]);
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