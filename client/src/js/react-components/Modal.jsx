import React, { Component } from 'react';
import {isMobile} from "react-device-detect";

import '../../stylesheets/Modal.css';

export default class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="Modal">
				<img className="x" alt="close button" src={require('../../media/2D/x-close.png')} />
				<div className="centerpiece-container"><img className="centerpiece" src={ModalContent.centerpiecePaths(this.props.title)}/></div>
				<div className="title">{this.props.title.toUpperCase()}</div>
				<br/><br/>
				<div className="subtitle">- {this.props.title.toUpperCase()} -</div>
				<div className="list-item">
					<div className="key">Favorite</div><div className="value">Melee</div>
				</div>
			</div>
		);
	}
}

const ModalContent = {
	centerpiecePaths: function(title) {
		return require(`../../media/2D/${title}.png`);
	},
	contentLists: {
		hobbies: {
			surf: {
				skill: {
					value: "2",
					link: "https://surfsimply.com/what-level-surfer-are-you/"
				},
				home: {
					value: "El Porto",
					link: "https://goo.gl/maps/D3rEVcj4ZSr1uTeZA"
				}
			},
			bike: {
				model: {
					value: "Nishiki Anasazi",
					link: "https://www.dickssportinggoods.com/p/nishiki-mens-anasazi-hybrid-bike-16nisanshknsz15xxdsb/16nisanshknsz15xxdsb"
				}
			},
			joke: {
				shows: {
					value: "none",
					link: "/"
				}
			},
			play: {
				favorite: {
					value: "Melee",
					link: "https://www.ssbwiki.com/Peach_(SSBM)"
				}
			}, 
			bee: {
				company: {
					value: "none",
					link: "none"
				}
			}
		},
		goals: {
			read: {
				"My Life in My Words": 1,
				"TODO": 0
			},
			lift: {
				"bench 225": 0.2
			},
			develop: {
				"this website": 0.2
			}
		},
		work: {
			ibm: "https://www.ibm.com/cloud", //☁️
			lat: "https://www.latimes.com/projects/", //🍔
			spacex:"https://www.spacex.com/news", //🚀
			ict: "http://ict.usc.edu/" //🥽
		}, 
		travel: {
			countries: ["South Africa", "New Zealand", "India", "Isreal", "Cuba", "China", "Vietnam", "Australia", "United Arab Emirates", "Great Britain", "Mexico", "Jamaica"],
			vlogs: []
		}
	}
}