import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import '../../stylesheets/App.css';
import GameManager from '../3d/game-manager.js';

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
				<div style={{ "height": "100%", width: "100%"}} ref={ref => (this.mount = ref)}></div>
				<div style={{fontSize: "30px", position: "absolute", top: "100px", "textAlign": "center", margin: "auto", zIndex: 10}}>
					My personal website is currently under construction. Please check back again soon, or contact me at <br/>[first . last @ gmail . com]
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
