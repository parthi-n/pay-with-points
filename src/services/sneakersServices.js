const SNEAKERS_URL = `${import.meta.env.VITE_SNEAKERS_URL}`;
const SNEAKERS_ACCESS_TOKEN = `${import.meta.env.VITE_SNEAKERS_ACCESS_TOKEN}`;
const nikeQuery = "brand=Nike";
const categoryQuery = "category=sneakers";
const page = "page=";
const trending = "trending=true";
const ranking="sort=rank"
const options = { method: "GET", headers: { Authorization: SNEAKERS_ACCESS_TOKEN } };

const nikeList = async (pageNum) => {
	try {
		const res = await fetch(`${SNEAKERS_URL + "?" + page + pageNum + "&" + categoryQuery + "&" + nikeQuery}`, options);
		return res.json();
	} catch (error) {
		console.log("Fetch nikeList error", error);
	}
};

const trendingNikeList = async () => {
	try {
		const res = await fetch(`${SNEAKERS_URL + "?" + categoryQuery + "&" + nikeQuery + "&" + ranking}`, options);
		return res.json();
	} catch (error) {
		console.log("Fetch trendingNikeList error", error);
	}
};

const sneakerDetails = async (sneakerID) => {
	try {
		const res = await fetch(`${SNEAKERS_URL + "/" + sneakerID}`, options);
		return res.json();
	} catch (error) {
		console.log("Fetch sneakerDetails error", error);
	}
};

export { nikeList, sneakerDetails, trendingNikeList };
