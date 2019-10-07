import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Landscape from './Landscape';
import Modal from './Modal.jsx';
import Game from './Game.jsx';

import '../../stylesheets/App.css';
import '../../stylesheets/Landscape.css';

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
		console.log(objectName);
	}

	render() {
		return (
			<div className="App">
				<div className="title">DANIEL KAWALSKY</div>
				<Game></Game>
				<Modal objectName="Credits"></Modal>
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
