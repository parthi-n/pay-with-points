import { useState, useEffect } from "react";
import "./App.css";
import * as citiServices from "./services/citiServices";
import * as sneakersServices from "./services/sneakersServices";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
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

		const fecthNikeSneakers = async () => {
			try {
				const nikeSneakerData = await sneakersServices.nikeList();
				console.log(nikeSneakerData);
				setNikeSneakers(nikeSneakerData.data);
			} catch (err) {
				console.log(error);
			}
		};

		fetchPointBalance();
		fecthNikeSneakers();
	}, []);

	return (
		<>
			<div>
				<Navbar balancePoints={balancePoints}/>

				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				
					<ProductList products={nikeSneakers} />
				</div>
			</div>
		</>
	);
}

export default App;
