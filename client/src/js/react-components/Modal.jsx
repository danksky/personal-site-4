import React, { Component } from 'react';
import {isMobile} from "react-device-detect";

import '../../stylesheets/Modal.css';

function adjustTitle(objectName)  {
	objectName = objectName.toLowerCase();
	if (objectName === "bumblee" || objectName === "beehive") 
		return "Beekeeping";
	 else if (objectName === "bulldozer" || objectName === "cone") 
		return "Construction";
	 else if (objectName === "mailbox") 
		return "Contact";
	 else if (objectName === "hobby") 
		return "Hobbies";
	 else if (objectName === "goals") 
		return "Goals";
	 else if (objectName === "work") 
		return "Work";
	 else if (objectName === "travel") 
		return "Travel";
}

function SubtopicsComponent(props) {
	const objectName = props.objectName.toLowerCase();
	const title = adjustTitle(props.objectName)
	var SubtopicsComponent; 
	if (objectName === "bumblee" || objectName === "beehive") {

	} else if (objectName === "bulldozer" || objectName === "cone") {

	} else if (objectName === "mailbox") {

	} else if (objectName === "hobby") {
		SubtopicsComponent = Object.keys(ModalMap[title.toLowerCase()]).map(subtopic => {
			const SubtopicList = Object.entries(ModalMap[title.toLowerCase()][subtopic]).map(subtopicItemTuple => {
				return (
					<div className="listitem">
						<div className="key">{subtopicItemTuple[0]}</div><div className="value"><a href={subtopicItemTuple[1].link}>{subtopicItemTuple[1].text}</a></div>
					</div>
				);
			});
			return (
				<div className="Subtopic">
					<div className="centerpiece-container">
						<img className="centerpiece" alt="modal graphic" src={require('../../media/2D/'+title.toLowerCase()+'.png')}/>
					</div>
					<div className="title">- {subtopic.toUpperCase()} -</div>
					{SubtopicList}
				</div>
			);
		});
	} else if (objectName === "goals") {
		
	} else if (objectName === "work") {
		
	} else if (objectName === "travel") {
		
	}

	return SubtopicsComponent;
}

export default class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: adjustTitle(this.props.objectName)
		}
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="Modal">
				<img className="x" alt="close button" src={require('../../media/2D/x-close.png')} />
				<div className="centerpiece-container">
					<img className="centerpiece" alt="modal graphic" src={require('../../media/2D/'+this.state.title.toLowerCase()+'.png')}/>
				</div>
				<div className="title">{this.state.title}</div>
				<SubtopicsComponent objectName={this.props.objectName}></SubtopicsComponent>
			</div>
		);
	}
}



const ModalMap = {
	hobbies: {
		surf: {
			skill: {
				text: "2",
				link: "https://surfsimply.com/what-level-surfer-are-you/"
			},
			home: {
				text: "El Porto",
				link: "https://goo.gl/maps/D3rEVcj4ZSr1uTeZA"
			}
		},
		bike: {
			model: {
				text: "Nishiki Anasazi",
				link: "https://www.dickssportinggoods.com/p/nishiki-mens-anasazi-hybrid-bike-16nisanshknsz15xxdsb/16nisanshknsz15xxdsb"
			}
		},
		joke: {
			shows: {
				text: "none",
				link: "/"
			}
		},
		play: {
			favorite: {
				text: "Melee",
				link: "https://www.ssbwiki.com/Peach_(SSBM)"
			}
		}, 
		bee: {
			company: {
				text: "none",
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