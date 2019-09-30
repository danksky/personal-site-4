import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {isMobile} from "react-device-detect";

import Modal from './Modal.jsx';

import GameManager from '../3d/game-manager.js';

import '../../stylesheets/App.css';


const AnotherPage = () => <h1>Another Page</h1>;
const NotFound = () => <h1>404 Not Found</h1>;
class Home extends Component {
	state = {
		response: '',
		post: '',
		responseToPost: '',
	};

	componentDidMount() {
		this.callApi()
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.log(err));
		var gameManager = new GameManager(this);
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

	render() {
		return (
			<div className="App">
				<div className="rendererDOMElement" style={{ "height": isMobile ? "400%" : "100%", width: "100%"}} ref={ref => (this.mount = ref)}></div>
				<div className="menu">
					<div className="menu-title">DANIEL KAWALSKY</div>
					<div className="button" id="menu-button-contact">CONTACT</div>
					<div className="button" id="menu-button-why">WHY</div>
					<div className="button" id="menu-button-hobbies">HOBBIES</div>
					<div className="button" id="menu-button-goals">GOALS</div>
					<div className="button" id="menu-button-work">WORK</div>
					<div className="button" id="menu-button-travel">TRAVEL</div>
					<Modal title="hello"></Modal>
				</div>
				<header className="App-header">
					<p>{this.state.response}</p>
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
			</div>
		);
	}
}

const App = () => (
	<Router>
		<div>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/another-page/" component={AnotherPage} />
				<Route component={NotFound} />
			</Switch>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/another-page/">Another Page</Link>
					</li>
				</ul>
			</nav>			
		</div>
	</Router>
);

export default App;
