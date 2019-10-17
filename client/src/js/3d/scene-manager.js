import * as THREE from "three";
import {isMobile, isAndroid} from "react-device-detect";

import Preload from '../../media/3D/complete-scene.json';
import PreloadMobile from '../../media/3D/complete-scene-mobile.json';
import NameConstructionSite from './scene-subjects/name-construction-site/name-construction-site.js';
import Goals from './scene-subjects/goals/goals.js';
import Office from './scene-subjects/office/office.js';
import Travel from './scene-subjects/travel/travel.js';
import Hobbies from './scene-subjects/hobbies/hobbies.js';

export default function SceneManager(gameManager) {
	var clock;
	var screenDimensions;
	var scene;
	var renderer;
	var camera;
	var sceneSubjects;
	var raycaster;
	var mouse;
	var DPR;

	var subjectMap = {};

	this.init = function () {
		console.log("sceneManager.init()");

		if (clock) // prevents multiple instances
			return;
		
		clock = new THREE.Clock();
		screenDimensions = {
			width: window.innerWidth,
			height: window.innerHeight * (isMobile ? 4 : 1)
		};
		console.log(screenDimensions);
		scene = buildScene();
		renderer = buildRender(screenDimensions);
		gameManager.canvas = renderer.domElement;
		camera = buildCamera(screenDimensions);
		raycaster = new THREE.Raycaster();
		mouse = {
			position: new THREE.Vector2(),
			prevPosition: new THREE.Vector2(),
			down: false,
			over: true
		};
		sceneSubjects = addSceneSubjects(scene);
		subjectMap = {
			"Bumblebee": sceneSubjects[4],
			"Beehive": sceneSubjects[4],
			"Bulldozer": sceneSubjects[0],
			"Cone": sceneSubjects[0],
			"mailbox": sceneSubjects[0],
			"Hobby": sceneSubjects[4],
			"Goals": sceneSubjects[2],
			"Office": sceneSubjects[1],
			"Travel": sceneSubjects[3],
			"Daniel Kawalsky": sceneSubjects[0],
		};

		if (this.onWindowResize)
			this.onWindowResize();
	};

	this.init();

	function buildScene() {
		const scene = new THREE.Scene();
		window.scene = scene;
		return scene;
	}

	function buildRender({ width, height }) {
		const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, depth: false }); 
		DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
		renderer.setPixelRatio(isAndroid ? 1 : DPR);
		renderer.setSize(width / (isAndroid ? 1 : DPR), height / (isAndroid ? 1 : DPR));
		renderer.gammaInput = true;
		renderer.shadowMap.enabled = true;
		renderer.gammaFactor = 2.2;
		renderer.gammaOutput = true;
		renderer.powerPreference = "high-performance";
		renderer.precision = "lowp";
		renderer.setClearColor( 0xffffff, 0);

		return renderer;
	}

	function buildCamera({ width, height }) {
		const 	left = window.innerWidth / -2, 
				right =  window.innerWidth / 2, 
				top = window.innerHeight / 2, 
				bottom = window.innerHeight / -2;
		const nearPlane = 1;
		const farPlane = 10; 
		const camera = new THREE.OrthographicCamera(left, right, top, bottom, nearPlane, farPlane);
		camera.position.z = 100;
		return camera;
	}

	function addSceneSubjects(scene) {
		var loader = new THREE.ObjectLoader();
		// Parse a previously loaded JSON structure
		var sceneObject = loader.parse( isMobile ? PreloadMobile : Preload );
		console.log(sceneObject);
		scene.add( sceneObject );
		camera = sceneObject.children[0];
		const sceneSubjects = [
			new NameConstructionSite(sceneObject.children[3]),
			new Office(sceneObject.children[4]),
			new Goals(sceneObject.children[5]),
			new Travel(sceneObject.children[6]),
			new Hobbies(sceneObject.children[7]),
		];

		return sceneSubjects;
	}

	// onRaycast - handle the event of a raycast collision
	function onRaycast(intersects) {
		// check if any of the intersected elements or (recursively) their parents have an associated handler
		for ( var i = 0; i < intersects.length; i++ ) {
			var object = intersects[i].object;
			while (object.parent) {
				if (subjectMap[object.name]) {
					return object.name;
				}
				object = object.parent;
			}
		}
		return null;
	}

	this.onMouseDown = function (event) {
		console.log('onMouseDown');
		mouse.down = true;
		mouse.over = true;

		var rect = renderer.domElement.getBoundingClientRect();
		mouse.prevPosition.x = mouse.position.x;
		mouse.prevPosition.y = mouse.position.y;
		mouse.position.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
		mouse.position.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

		console.log(mouse.position.x, mouse.position.y);

		raycaster.setFromCamera( mouse.position, camera );
		var objectName = onRaycast(raycaster.intersectObjects( scene.children, true ));
		gameManager.handleCollisionEvent(objectName);
	};

	this.onMouseUp = function (event) {
		console.log('onMouseUp');
		mouse.down = false;
		mouse.over = true;
		
		// sceneSubjects[1].state.dragging = false;
	};

	this.onMouseEnter = function (event) {
		console.log('onMouseEnter');
		mouse.down = false;
		mouse.over = true;
	}

	this.onMouseLeave = function (event) {
		console.log('onMouseLeave');
		mouse.down = false;
		mouse.over = false;

		// sceneSubjects[1].state.dragging = false;
	};

	this.onMouseMove = function ( event ) {
		if (isMobile)
			return;
		var rect = renderer.domElement.getBoundingClientRect();
		mouse.prevPosition.x = mouse.position.x;
		mouse.prevPosition.y = mouse.position.y;
		mouse.position.x = ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
		mouse.position.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;
		// Doesn't make sense to put this in the raycast after already activated. 
		sceneSubjects.forEach((sceneSubject) => {
			sceneSubject.approachWithMouse(mouse.position);
		});
		raycaster.setFromCamera( mouse.position, camera );
		var objectName = onRaycast(raycaster.intersectObjects( scene.children, true ));
		if (objectName !== null) 
			subjectMap[objectName].nudge(objectName, clock.getElapsedTime());
	};

	this.reminder = function () {

	};

	this.onTouchStart = function ( event ) {
		console.log('onTouchStart');
		mouse.down = true;
		mouse.over = true;

		var rect = renderer.domElement.getBoundingClientRect();
		mouse.prevPosition.x = mouse.position.x;
		mouse.prevPosition.y = mouse.position.y;
		mouse.position.x = ( ( event.targetTouches[0].clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
		mouse.position.y = - ( ( event.targetTouches[0].clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;

		raycaster.setFromCamera( mouse.position, camera );
		var objectName = onRaycast(raycaster.intersectObjects( scene.children, true ));
		gameManager.handleCollisionEvent(objectName);
	};

	this.onTouchMove = function ( event ) {
		// Could interfere with scroll interaction
		if (isMobile)
			return;
	};

	this.onTouchEnd = function ( event ) {
		console.log('onTouchEnd');
		mouse.down = false;
		mouse.over = false;
	};

	this.onScroll = function ( event ) {
		// Desktop doesn't interact with scroll interaction on the desktop 
		if (!isMobile)
			return;
		var rect = renderer.domElement.getBoundingClientRect();
		var scrollPosition = window.pageYOffset / rect.height;
		sceneSubjects.forEach((sceneSubject) => {
			sceneSubject.approachWithScroll(scrollPosition);
		});
	};

	this.update = function() {
		if (!clock) // init hasn't been run. 
			return;
		const elapsedTime = clock.getElapsedTime();
		for(let i=0; i<sceneSubjects.length; i++)
			sceneSubjects[i].update(elapsedTime);
		renderer.render(scene, camera);
	};

	this.onWindowResize = function() {
		const { width, height } = gameManager.canvas;
		if (renderer.domElement.getBoundingClientRect().top < 0) 
			renderer.domElement.style.top = 0;
		console.log(`SceneManager.onWindowResize(width=${width}, height=${height})`);
		if (sceneSubjects) {
			screenDimensions.width = width;
			screenDimensions.height = height;

			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			
			renderer.setSize(width, height);
			for(let i=0; i<sceneSubjects.length; i++)
				sceneSubjects[i].onWindowResize();
		}
		else {
			this.init();
		}
	};
}