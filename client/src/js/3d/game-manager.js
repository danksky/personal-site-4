import {isMobile} from "react-device-detect";

import SceneManager from './scene-manager.js'

export default function GameManager (context) {
	
	this.canvas = null;
	var sceneManager = null;
	var instance = this;

	function render () {
		requestAnimationFrame(render);
		sceneManager.update();
	}

	this.handleCollisionEvent = function (objectName) {
		context.handleCollisionEvent(objectName);
	}

	this.resizeCanvas = function () {
		if (isMobile) {// tablet or phone
			console.log("sceneManager.init() isMobile");
			if (window.innerWidth > window.innerHeight) {  // landscape
				console.log("sceneManager.init() isMobile landscape - abort resize");
				return;
			} 
		}

		// if (!this.canvas) { // if unset, runs init, which eventually leads back to here through this.bindEventListeners.
			instance.init();
			// return;
		// }

		console.log("GameManager.resizeCanvas()");
		sceneManager.onWindowResize();
	};

	this.bindEventListeners = function () {
		window.addEventListener		( 'scroll'		, sceneManager.onScroll, 	false );
		if (!isMobile) {
			this.canvas.addEventListener( 'mousemove'	, sceneManager.onMouseMove,	false );
			this.canvas.addEventListener( 'mousedown'	, sceneManager.onMouseDown, false );
			this.canvas.addEventListener( 'mouseup'		, sceneManager.onMouseUp, 	false );
			this.canvas.addEventListener( 'mouseenter'	, sceneManager.onMouseEnter,false );
			this.canvas.addEventListener( 'mouseleave'	, sceneManager.onMouseLeave,false );
		}
		this.canvas.addEventListener( 'touchstart' 	, sceneManager.onTouchStart,false );
		this.canvas.addEventListener( 'touchmove' 	, sceneManager.onTouchMove,	false );
		this.canvas.addEventListener( 'touchend' 	, sceneManager.onTouchEnd,	false );
		this.resizeCanvas();
	};

	this.init = function() {
		if (this.canvas || sceneManager) // prevents multiple instances. 
			return;
		console.log("GameManager.init()");
		sceneManager = new SceneManager(this);
		context.mount.appendChild( this.canvas );
		this.bindEventListeners();
		render();
	};

	this.init(); 
};