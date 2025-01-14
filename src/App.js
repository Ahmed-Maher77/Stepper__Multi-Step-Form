import "./App.css";
import Footer from "./components/Footer/Footer";
import Stepper from "./pages/Stepper";

function App() {
	return (
		<div className="App">
			<h1>Multi-Step Form</h1>
			<Stepper />
			<Footer />
		</div>
	);
}

export default App;
