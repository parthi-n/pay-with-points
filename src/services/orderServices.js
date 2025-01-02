const ORDERLIST_URL = `${import.meta.env.VITE_ORDERLIST_URL}`;
const ORDERLIST_ACCESS_TOKEN = `${import.meta.env.VITE_ORDERLIST_ACCESS_TOKEN}`;

const fetchOrderList = async () => {
	try {
		const res = await fetch(ORDERLIST_URL, {
			headers: {
				Authorization: `Bearer ${ORDERLIST_ACCESS_TOKEN}`,
			},
		});
		if (!res.ok) {
			throw new Error(`Error fetching order list: ${res.statusText}`);
		}
		return res.json();
	} catch (err) {
		console.error("Error in fetchOrderList:", err);
		throw err;
	}
};

const createOrder = async (formData) => {
	const airtablePostObj = {
		fields: formData,
	};
	console.log(airtablePostObj);

	try {
		const res = await fetch(ORDERLIST_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${ORDERLIST_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(airtablePostObj),
		});
		if (!res.ok) {
			throw new Error(`Error creating order: ${res.statusText}`);
		}
	} catch (err) {
		console.error("Error in createOrder:", err);
		throw err;
	}
};

export { fetchOrderList, createOrder };
