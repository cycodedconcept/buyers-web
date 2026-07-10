import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import ListingGrid from "./pages/ListingGrid";
import ListingGrid2 from "./pages/ListingGrid2";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About/>} />
					<Route path="/product-listing" element={<ListingGrid/>} />
					<Route path="/product-listing-grid" element={<ListingGrid2/>} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
