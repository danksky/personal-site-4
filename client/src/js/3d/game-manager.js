import {isMobile} from "react-device-detect";

import SceneManager from './scene-manager.js'

export default function GameManager (context) {
	
	this.canvas = null;
	var sceneManager = null;

	var LandscapeScreen;

	function render () {
		requestAnimationFrame(render);
		sceneManager.update();
	}

	this.resizeCanvas = function () {
		if (!this.canvas) { // if unset, runs init, which eventually leads back to here through this.bindEventListeners.
			this.init();
			return;
		}

		if (isMobile) {// tablet or phone
			console.log("sceneManager.init() isMobile");
			if (window.innerWidth > window.innerHeight) {  // landscape
				console.log("sceneManager.init() isMobile landscape");
				LandscapeScreen.style.display = "block";
				return;
			} 
		}
		// portrait
		LandscapeScreen.style.display = "none";

		console.log("GameManager.resizeCanvas()");
		// this.canvas.style.width = '100%';
		// this.canvas.style.height= '100%';
		this.canvas.width  = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight * (isMobile ? 2 : 1);
		sceneManager.onWindowResize();
	};

	this.bindEventListeners = function () {
		// window.onresize = this.resizeCanvas();
		window.addEventListener		( 'scroll'		, sceneManager.onScroll, 	false );
		this.canvas.addEventListener( 'mousemove'	, sceneManager.onMouseMove,	false );
		this.canvas.addEventListener( 'mousedown'	, sceneManager.onMouseDown, false );
		this.canvas.addEventListener( 'mouseup'		, sceneManager.onMouseUp, 	false );
		this.canvas.addEventListener( 'mouseenter'	, sceneManager.onMouseEnter,false );
		this.canvas.addEventListener( 'mouseleave'	, sceneManager.onMouseLeave,false );
		this.canvas.addEventListener( 'touchstart' 	, sceneManager.onTouchStart,false );
		this.canvas.addEventListener( 'touchmove' 	, sceneManager.onTouchMove,	false );
		this.canvas.addEventListener( 'touchend' 	, sceneManager.onTouchEnd,	false );
		this.resizeCanvas();
	};

	this.init = function() {
		if (this.canvas || sceneManager) // prevents multiple instances. 
			return;



		LandscapeScreen = document.getElementById('Landscape');
		if (isMobile) {// tablet or phone
			console.log("sceneManager.init() isMobile");
			if (window.innerWidth > window.innerHeight) {  // landscape
				console.log("sceneManager.init() isMobile landscape");
				LandscapeScreen.style.display = "block";
				return;
			} 
		}
		// portrait
		LandscapeScreen.style.display = "none";

		sceneManager = new SceneManager(this);
		context.mount.appendChild( this.canvas );
		this.bindEventListeners();
		render();
	};

	this.init(); 
};

/*
 function HeaderManager() {

	var LandscapeScreen;

	var this.canvas;
	var sceneManager;

	function render() {
		requestAnimationFrame(render);
		sceneManager.update();
	};

	this.resizeCanvas = function () {
		if (!this.canvas) { // if unset, runs init, which eventually leads back to here through this.bindEventListeners.
			this.init();
			return;
		}

		if (isMobile) {// tablet or phone
			console.log("sceneManager.init() isMobile");
			if (window.innerWidth > window.innerHeight) {  // landscape
				console.log("sceneManager.init() isMobile landscape");
				LandscapeScreen.style.display = "block";
				return;
			} 
		}
		// portrait
		LandscapeScreen.style.display = "none";

		console.log("this.resizeCanvas()");
		this.canvas.style.width = '100%';
		this.canvas.style.height= '100%';
		this.canvas.width  = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;	    
		sceneManager.onWindowResize();
	};

	this.bindEventListeners = function () {
		// window.onresize = this.resizeCanvas();
		this.canvas.addEventListener( 'mousemove'	, sceneManager.onMouseMove,	false );
		this.canvas.addEventListener( 'mousedown'	, sceneManager.onMouseDown, false );
		this.canvas.addEventListener( 'mouseup'		, sceneManager.onMouseUp, 	false );
		this.canvas.addEventListener( 'mouseenter'	, sceneManager.onMouseEnter,false );
		this.canvas.addEventListener( 'mouseleave'	, sceneManager.onMouseLeave,false );
		this.canvas.addEventListener( 'touchstart' 	, sceneManager.onTouchStart,false );
		this.canvas.addEventListener( 'touchmove' 	, sceneManager.onTouchMove,	false );
		this.canvas.addEventListener( 'touchend' 	, sceneManager.onTouchEnd,	false );
		this.resizeCanvas();
	};

	this.init = function() {
		if (this.canvas || sceneManager) // prevents multiple instances. 
			return;

		LandscapeScreen = document.getElementById('Landscape');
		if (isMobile) {// tablet or phone
			console.log("sceneManager.init() isMobile");
			if (window.innerWidth > window.innerHeight) {  // landscape
				console.log("sceneManager.init() isMobile landscape");
				LandscapeScreen.style.display = "block";
				return;
			} 
		}
		// portrait
		LandscapeScreen.style.display = "none";

		this.canvas = document.getElementById("header-this.canvas");
		sceneManager = new SceneManager(this.canvas);

		this.bindEventListeners();
		render();
	};

	this.init(); 
}


*/