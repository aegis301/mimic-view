import NavBar from "./components/NavBar";
import "./static/App.css";
import Dashboard from "./components/Dashboard";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<p>MIMICView</p>
				<p>Visualize MIMIC data</p>
			</header>
			<NavBar />
			<Dashboard />
		</div>
	);
}

export default App;
