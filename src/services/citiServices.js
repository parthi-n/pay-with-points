const CITI_POINTBALANCE_URL = `${import.meta.env.VITE_CITI_POINTBALANCE_URL}`;
const CITI_POINTS_REDEEM_URL = `${import.meta.env.VITE_CITI_POINTS_REDEEM_URL}`;
const CITI_POINTBALANCE_ACCESS_TOKEN = `${import.meta.env.VITE_CITI_POINTBALANCE_ACCESS_TOKEN}`;
const CITI_CLIENT_ID = `${import.meta.env.VITE_CITI_CLIENT_ID}`;
const CITI_CARD_ID = `${import.meta.env.VITE_CITI_CARD_ID}`;
const conversionRate = 25;

const cardDetails = {
	cardDetails: [
		{
			cardId: CITI_CARD_ID,
		},
	],
};

const transactionDetails = {
	cardId: CITI_CARD_ID,
	transactions: [
		{
			transactionReferenceId: "BIMI5180736",
			transactionAmount: 252,
			currencyCode: "SGD",
			pointsToRedeem: 1000,
			transactionDescription: "FOOD BEVERAGE",
		},
	],
};

const citiPointBalance = async () => {
	try {
		const res = await fetch(CITI_POINTBALANCE_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${CITI_POINTBALANCE_ACCESS_TOKEN}`,
				client_id: CITI_CLIENT_ID,
				uuid: "40cabd2c-f224-4ee7-813a-98631255b9f5",
				Accept: "application/json",
				"Accept-Language": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cardDetails),
		});

		return res.json();
	} catch (err) {
		console.log(err);
	}
};

const convertToPoints = (price) => {
	return price * conversionRate;
};

const shopWithPoints = async (transactionsID, transactionAmount, transactionPoints) => {
	try {
		const res = await fetch(CITI_POINTS_REDEEM_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${CITI_POINTBALANCE_ACCESS_TOKEN}`,
				client_id: CITI_CLIENT_ID,
				uuid: "40cabd2c-f224-4ee7-813a-98631255b9f5",
				Accept: "application/json",
				"Accept-Language": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cardId: CITI_CARD_ID,
				transactions: [
					{
						transactionReferenceId: transactionsID,
						transactionAmount: transactionAmount,
						currencyCode: "SGD",
						pointsToRedeem: transactionPoints,
						transactionDescription: "Nike Sneakers",
					},
				],
			}),
		});
		return res.json();
	} catch (error) {}
};

export { citiPointBalance, convertToPoints, shopWithPoints };
