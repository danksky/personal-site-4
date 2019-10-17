import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Landscape from './Landscape';
import Modal from './Modal.jsx';
import Game from './Game.jsx';

import '../../stylesheets/App.css';
import '../../stylesheets/Landscape.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			response: '',
			post: '',
			responseToPost: '',
			selected: null,
			scrollPosition: 0
		};
		this.handleCollisionEvent = this.handleCollisionEvent.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		document.addEventListener("keydown", this.handleKeyPress, false);
	}

	componentDidMount() {
		/*
		this.callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));
			*/
	}

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();

		if (response.status !== 200) throw Error(body.message);

		return body;
	};

	handleSubmit = async e => {
		e.preventDefault();
		const response = await fetch('/api/world', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ post: this.state.post }),
		});
		const body = await response.text();

		this.setState({ responseToPost: body });
	};

	handleCollisionEvent(objectName) {
		if (objectName !== null) {
			console.log(objectName);
			this.setState({
				selected: objectName,
				scrollPosition: window.scrollY
			})
			document.body.style.position = 'fixed';
			document.body.style.cursor = "default";
		}
	}

	handleKeyPress(event) {
		if(event.keyCode === 27) { // ESCAPE
			this.closeModal();
		} 
	}

	closeModal() {
		this.setState({
			selected: null,
		});
		// When the modal is hidden... we have to retrieve the scroll position.
		
		document.body.style.position = '';
		window.scrollTo(0, this.state.scrollPosition)
	}

	render() {
		return (
			<div className="App">
				<div className="title">DANIEL KAWALSKY</div>
				<Game handler={this.handleCollisionEvent}></Game>
				<Modal topic={this.state.selected} closer={this.closeModal}></Modal>
				<Landscape></Landscape>
			</div>
		)
	}
}

const App = () => (
	<Router>
		<div>
			<Switch>
				<Route path="/" component={Home} />
			</Switch>
		</div>
	</Router>
);

export default App;

/*
<header className="App-header">
	<p>DROP A LINE{this.state.response}</p>
	<form onSubmit={this.handleSubmit}>
		<p>
			<strong>Post to Server:</strong>
		</p>
		<input
			type="text"
			value={this.state.post}
			onChange={e => this.setState({ post: e.target.value })}
		/>
		<button type="submit">Submit</button>
	</form>
	<p>{this.state.responseToPost}</p>
</header>
*/