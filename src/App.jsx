import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import ListingGrid from "./pages/ListingGrid";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About/>} />
					<Route path="/product-listing" element={<ListingGrid/>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
