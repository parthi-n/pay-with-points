import { useState, useEffect } from "react";
import "./App.css";
import * as citiServices from "./services/citiServices";

function App() {
	const [balancePoints, setBalancePoints] = useState(0);

	useEffect(() => {
		const fetchPointBalance = async () => {
			try {
				const citiPointBalance = await citiServices.citiPointBalance();

				console.log(citiPointBalance.rewardAccounts[0].availablePointBalance);

				setBalancePoints(citiPointBalance.rewardAccounts[0].availablePointBalance);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPointBalance();
	}, []);

	return (
		<>
			<h1>
				My CITI Balance Points <br />
				{balancePoints}
			</h1>
		</>
	);
}

export default App;
