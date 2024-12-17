import { useState, useEffect } from "react";
import "./App.css";
import * as citiServices from "./services/citiServices";
import * as sneakersServices from "./services/sneakersServices";

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
			<h1>
				My CITI Balance Points <br />
				{balancePoints}
			</h1>

			<div>
				<div>
					{nikeSneakers.map((sneaker) => (
						<div>
							<img src={sneaker.image} alt={sneaker.title} />
							<p>{sneaker.title}</p>
							<p>Price: {sneaker.avg_price.toFixed(2)}</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
