import React, { Component } from 'react';

import {isMobile} from "react-device-detect";
import DeviceOrientation, { Orientation } from 'react-screen-orientation'

import '../../stylesheets/Landscape.css';

export default class Landscape extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		
	}

	render() {
		if (isMobile) {
			return (
				<DeviceOrientation>
					<Orientation orientation='landscape' alwaysRender={false}>
						<div className="Landscape" id="Landscape"> 
							<div className="landscape-text">Please rotate your device.</div>
							<img className="landscape-icon" alt="Icon that suggests rotation clockwise" src={require("../../media/2D/icons/rotate.svg")} />
						</div>
					</Orientation>
				</DeviceOrientation>
			);
		} else {
			return null;
		}
	}
}
