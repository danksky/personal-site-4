import * as THREE from "three";
import Preload from '../../media/3D/pre-complete-scene-2.json';

export default function GameManager (context) {
	// === THREE.JS CODE START ===
	var scene = new THREE.Scene();
	var renderer = new THREE.WebGLRenderer({alpha: true});
	renderer.setSize( /*window.innerWidth*/ 2560, /*window.innerHeight*/ 1600);
	renderer.setPixelRatio( 2 );
	renderer.shadowMap.enabled = true;
	// document.body.appendChild( renderer.domElement );
	// use ref as a mount point of the Three.js scene instead of the document.body
	context.mount.appendChild( renderer.domElement );
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	var loader = new THREE.ObjectLoader();

	// Alternatively, to parse a previously loaded JSON structure
	var object = loader.parse( Preload );

	scene.add( object );
	var camera = object.children[0];
	console.log(object);

	var animate = function () {
		requestAnimationFrame( animate );
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		renderer.render( scene, camera );
	};
	animate();
	// === THREE.JS EXAMPLE CODE END ===
};