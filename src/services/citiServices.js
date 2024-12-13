const CITI_POINTBALANCE_URL = `${import.meta.env.VITE_CITI_POINTBALANCE_URL}`;
const CITI_POINTBALANCE_ACCESS_TOKEN = `${import.meta.env.VITE_CITI_POINTBALANCE_ACCESS_TOKEN}`;
const CITI_CLIENT_ID = `${import.meta.env.VITE_CITI_CLIENT_ID}`;
const CITI_CARD_ID = `${import.meta.env.VITE_CITI_CARD_ID}`;

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

export { citiPointBalance };
