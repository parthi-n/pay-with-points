const CITI_POINTBALANCE_URL = `${import.meta.env.VITE_CITI_POINTBALANCE_URL}`;
const CITI_POINTS_REDEEM_URL = `${import.meta.env.VITE_CITI_POINTS_REDEEM_URL}`;
const CITI_POINTBALANCE_ACCESS_TOKEN = `${import.meta.env.VITE_CITI_POINTBALANCE_ACCESS_TOKEN}`;
const CITI_CLIENT_ID = `${import.meta.env.VITE_CITI_CLIENT_ID}`;
const CITI_CARD_ID = `${import.meta.env.VITE_CITI_CARD_ID}`;
const conversionRate = 0.2521;
const options = {
	Authorization: `Bearer ${CITI_POINTBALANCE_ACCESS_TOKEN}`,
	client_id: CITI_CLIENT_ID,
	uuid: "40cabd2c-f224-4ee7-813a-98631255b9f5",
	Accept: "application/json",
	"Accept-Language": "application/json",
	"Content-Type": "application/json",
	"Content-Type": "application/json",
};

const cardDetails = {
	cardDetails: [
		{
			cardId: CITI_CARD_ID,
		},
	],
};

const citiPointBalance = async () => {
	try {
		const res = await fetch(CITI_POINTBALANCE_URL, {
			method: "POST",
			headers: options,
			body: JSON.stringify(cardDetails),
		});

		return res.json();
	} catch (err) {
		console.log(err);
	}
};

const redeemPoints = async (transactionId, transactionAmount, transactionPoints) => {
	const transactionDetails = {
		cardId: CITI_CARD_ID,
		transactions: [
			{
				transactionReferenceId: transactionId,
				transactionAmount: Number(transactionAmount),
				currencyCode: "SGD",
				pointsToRedeem: Number(transactionPoints),
				transactionDescription: "Sneakers",
			},
		],
	};

	console.log(JSON.stringify(transactionDetails));

	try {
		const res = await fetch(CITI_POINTS_REDEEM_URL, {
			method: "POST",
			headers: options,
			body: JSON.stringify(transactionDetails),
		});

		if (!res.ok) {
			throw new Error(`Error: ${res.statusText}`);
		}

		const data = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("redeemPoints error", error);
		return null;
	}
};

const convertToPoints = (price) => {
	return price / conversionRate;
};

const convertToCash = (points) => {
	return points * conversionRate;
};

export { citiPointBalance, redeemPoints, convertToPoints, convertToCash };
