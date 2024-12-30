const SNEAKERS_URL = `${import.meta.env.VITE_SNEAKERS_URL}`;
const SNEAKERS_ACCESS_TOKEN = `${import.meta.env.VITE_SNEAKERS_ACCESS_TOKEN}`;
const nikeQuery = "brand=Nike";
const categoryQuery = "category=sneakers";
const page = "page=";
const options = { method: "GET", headers: { Authorization: SNEAKERS_ACCESS_TOKEN } };

const nikeList = async (pageNum) => {
	try {
		const res = await fetch(`${SNEAKERS_URL + "?" + page + pageNum + "&" + categoryQuery + "&" + nikeQuery}`, options);
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

const sneakerDetails = async (sneakerID) => {
	try {
		const res = await fetch(`${SNEAKERS_URL + "/" + sneakerID}`, options);
		return res.json();
	} catch (err) {
		console.log(err);
	}
};

export { nikeList, sneakerDetails };
