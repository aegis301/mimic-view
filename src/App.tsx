import React from "react";
import Vitals from "./components/Vitals";
import "./App.css";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<p>MIMICView</p>
				<p>Visualize MIMIC data</p>
				<Vitals />
			</header>
		</div>
	);
}

export default App;
