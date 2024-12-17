const SNEAKERS_URL = `${import.meta.env.VITE_SNEAKERS_URL}`;
const SNEAKERS_ACCESS_TOKEN = `${import.meta.env.VITE_SNEAKERS_ACCESS_TOKEN}`;
const nikeQuery = "brand=Nike";
const categoryQuery = "category=sneakers";
const options = { method: "GET", headers: { Authorization: SNEAKERS_ACCESS_TOKEN } };

const nikeList = async () => {
	try {
		const res = await fetch(`${SNEAKERS_URL + "?" + categoryQuery + "&" + nikeQuery}`, options);
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

export { nikeList };