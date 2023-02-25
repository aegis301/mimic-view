import Vitals from "./components/Vitals";
import NavBar from "./components/NavBar";
import React from "react";
import "./static/App.css";

function App() {
	return (
		<div className="App">
			<NavBar />
			<header className="App-header">
				<p>MIMICView</p>
				<p>Visualize MIMIC data</p>
				<Vitals />
			</header>
		</div>
	);
}

export default App;
