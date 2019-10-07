import React, { Component } from 'react';
import {isMobile} from "react-device-detect";

import GameManager from '../3d/game-manager.js';

import '../../stylesheets/Game.css';

function tapToTopic(objectName)  {

}

function TopicComponent(props) {
	
}

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gameManager: null
		}
		this.updateRotation = this.updateRotation.bind(this);

	}

	handleCollisionEvent(objectName) {
		this.props.handler(objectName);
	}

	updateRotation() {
		if (this.state.gameManager === null && (!isMobile || (isMobile && window.innerHeight > window.innerWidth))) {
			var gameManager = new GameManager(this);
			this.setState({
				gameManager: gameManager
			})
		}
	}

	componentDidMount() {
		window.onresize = this.updateRotation;
		if (!isMobile || (isMobile && window.innerHeight > window.innerWidth)) {
			var gameManager = new GameManager(this);
			this.setState({
				gameManager: gameManager
			})
		}
	}

	render() {
		return <div className="Game" ref={ref => (this.mount = ref)}></div>
	}
}
