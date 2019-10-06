import React, { Component } from 'react';
import {isMobile} from "react-device-detect";

import { Line, Circle } from 'rc-progress';

import '../../stylesheets/Modal.css';

function tapToTopic(objectName)  {
	objectName = objectName.toLowerCase();
	if (objectName === "bumblee" || objectName === "beehive") 
		return "Hobbies";
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

function TopicComponent(props) {
	const topic = tapToTopic(props.objectName)
	var TopicComponent; 
	if (topic === "Construction") {
		
	} else if (topic === "Contact") {

	} else {
		var Topic = ModalMap[topic];
		var subtopicListNames= Object.keys(Topic);
		var SubtopicListComponent = subtopicListNames.map(subtopicName => {
			if (subtopicName === "image")
				return null;
			var Subtopic = Topic[subtopicName];
			var detailsSubtopicNames = Object.keys(Subtopic);
			var DetailsSubtopicComponent = detailsSubtopicNames.map(detailsName => {
				if (detailsName === "image")
					return null;
				// Details format varies from Topic to Topic
				var Detail = Subtopic[detailsName];
				var DetailComponent;
				if (topic === "Hobbies") {
					DetailComponent = (
						<div className="detail">
							<div className="detail-name">{detailsName} 🔗</div>
							<div className="detail-value"><a className="detail-link" href={Detail.link}>{Detail.text}</a></div>
						</div>
					);
				} else if (topic === "Goals") {
					DetailComponent = (
						<div className="detail">
							<div className="detail-name">{detailsName}</div>
							<Line percent={Detail.current/Detail.target*100} strokeWidth="4" strokeColor="lightblue" style={{width: "90vw", marginLeft: "4.5vw"}} />
						</div>
					);
				} else if (topic === "Work") {
					DetailComponent = (
						<div className="detail">
							<div className="detail-name">{detailsName} 🔗</div>
							<div className="detail-value"><a className="detail-link" href={Detail.link}>{Detail.text}</a></div>
						</div>
					);
				} else if (topic === "Travel") {
					DetailComponent = (
						<div className="detail">
							<div className="detail-name">Days</div>
							<div className="detail-value">{Detail}</div>
						</div>
					);
				} 
				return DetailComponent;
			});
			var SubtopicComonent = (
				<div className="subtopic">
					<div className="subtopic-centerpiece-container">
						<img className="subtopic-centerpiece" alt="modal graphic" src={require('../../media/2D/centerpieces/'+Subtopic.image)}/>
					</div>
					<div className="subtopic-title">{subtopicName}</div>
					{DetailsSubtopicComponent}
					<div className="subtopic-separator"></div>
				</div>
			);
			return SubtopicComonent;
		});
		return SubtopicListComponent;
	}
	
	return TopicComponent;
}

export default class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topic: tapToTopic(this.props.objectName)
		}
	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div className="Modal">
				<img className="x" alt="close button" src={require('../../media/2D/x-close.png')} />
				<div className="topic-centerpiece-container">
					<img className="topic-centerpiece" alt="modal graphic" src={require('../../media/2D/centerpieces/'+ModalMap[this.state.topic].image)}/>
				</div>
				<div className="topic-title">{this.state.topic}</div>
				<TopicComponent objectName={this.props.objectName}></TopicComponent>
			</div>
		);
	}
}



const ModalMap = {
	Construction: {

	},
	Contact: {

	},
	Hobbies: {
		image: "hobbies.png",
		surf: {
			image: "surfboard.png",
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
			image: "bike.png",
			model: {
				text: "Nishiki Anasazi",
				link: "https://www.dickssportinggoods.com/p/nishiki-mens-anasazi-hybrid-bike-16nisanshknsz15xxdsb/16nisanshknsz15xxdsb"
			}
		},
		joke: {
			image: "microphone.png",
			shows: {
				text: "none",
				link: "/"
			}
		},
		play: {
			image: "sword.png",
			favorite: {
				text: "Melee",
				link: "https://www.ssbwiki.com/Peach_(SSBM)"
			}
		}, 
		bee: {
			image: "honeybee.png",
			company: {
				text: "none",
				link: "none"
			}
		}
	},
	Goals: {
		image: "goals.png",
		read: {
			image: "books.png",
			books: {
				current: 2,
				target: 5,
				// completed: ["Austerlitz", "My Life in My Words", "Factfulness"]
			},
		},
		lift: {
			image: "barbell.png",
			"bench": {
				current: 185,
				target: 225
			},
			"squat": {
				current: 225,
				target: 315
			},
			"deadlift": {
				current: 245,
				target: 315
			},
		},
		develop: {
			image: "laptop.png",
			"website": {
				current: 50,
				target: 60
			},
		}
	},
	Work: {
		image: "Office.png",
		ibm: {
			image: "ibm.png",
			company: {
				text: "ibm ☁️",
				link:"https://www.ibm.com/cloud",
			}
		},
		lat: {
			image: "cheeseburger.png",
			company: {
				text: "los angeles times 🍔",
				link: "https://www.latimes.com/projects/",
			}
		},
		spacex: {
			image: "shuttle.png",
			company: {
				text: "spacex 🚀",
				link: "https://www.spacex.com/news",
			}
		},
		ict: {
			image: "vr.png",
			company: {
				text: "usc institute of creative technology 🥽",
				link: "http://ict.usc.edu/"
			}
		},
	}, 
	Travel: {
		image: "plane.png",
		"South Africa": {
			image: "za.svg",
			duration: 200
		},
		"New Zealand": {
			image: "nz.svg",
			duration: 125
		},
		"India": {
			image: "in.svg",
			duration: 24
		},
		"Israel": {
			image: "il.svg",
			duration: 23
		},
		"Cuba": {
			image: "cu.svg",
			duration: 16
		},
		"China": {
			image: "cn.svg",
			duration: 16
		},
		"Vietnam": {
			image: "vn.svg",
			duration: 10
		},
		"Australia": {
			image: "au.svg",
			duration: 8
		},
		"Hong Kong": {
			image: "hk.svg",
			duration: 1
		},
		"Great Britain": {
			image: "gb.svg",
			duration: 1
		},
		"United Arab Emirates": {
			image: "ae.svg",
			duration: 0.5
		},
		"Mexico": {
			image: "mx.svg",
			duration: 0.5
		},
		"Jamaica": {
			image: "jm.svg",
			duration: 0.5
		},
	},
}



// modals:
/*

constructoin
contact
hobbies
work
travel
goals
bees --> hobbies

*/