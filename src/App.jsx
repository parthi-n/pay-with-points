import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import * as citiServices from "./services/citiServices";
import * as sneakersServices from "./services/sneakersServices";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

function App() {
	const [balancePoints, setBalancePoints] = useState(0);
	const [nikeSneakers, setNikeSneakers] = useState([]);

	useEffect(() => {
		const fetchPointBalance = async () => {
			try {
				const citiPointBalance = await citiServices.citiPointBalance();
				//console.log(citiPointBalance.rewardAccounts[0].availablePointBalance);
				setBalancePoints(citiPointBalance.rewardAccounts[0].availablePointBalance);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchNikeSneakers = async () => {
			try {
				const nikeSneakerData = await sneakersServices.nikeList();
				console.log(nikeSneakerData);
				setNikeSneakers(nikeSneakerData.data);
			} catch (err) {
				console.log(error);
			}
		};

		fetchPointBalance();
		fetchNikeSneakers();
	}, []);

	return (
		<>
			<Navbar balancePoints={balancePoints} />
			<Routes>
				<Route
					path="/"
					element={
						<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<ProductList products={nikeSneakers} />
						</div>
					}
				/>
				<Route
					path="/cart"
					element={
						<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<h2>Cart Page</h2>
						</div>
					}
				/>
				<Route
					path="/sneakers"
					element={
						<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<ProductList products={nikeSneakers} />
						</div>
					}
				/>
				<Route
					path="/sneakers/:sneakerSlug"
					element={
						<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<ProductDetails />
						</div>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
