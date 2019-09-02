export default function Goals(group) {

	var children = {};

	this.state = {
		dragging: false
	};

	this.prevTime = -1;

	this.init = function() {
		
	}
	this.init();

	this.drag = function (deltaX) {
		
	}
	
	this.update = function(time) {
		Object.keys(children).forEach(key => {
			children[key].update();
		});
		this.prevTime = time;
	}

	this.onWindowResize = function() {
		this.init();
	}
}