import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as sneakersServices from "../services/sneakersServices";
import * as citiServices from "../services/citiServices";
import Loader from "../components/Loader";
import RelatedProducts from "../components/RelatedProducts";

export default function ProductDetails({ handleAddToCart }) {
	const { sneakerSlug } = useParams();
	const [sneakerDetails, setSneakerDetails] = useState([]);
	const [selectedItem, setSelectedItem] = useState({});
	const [relatedItems, setRelatedItems] = useState([]);

	const shoeSize = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];

	const fetchSneakerDetails = async () => {
		try {
			const nikeSneakerData = await sneakersServices.sneakerDetails(sneakerSlug);

			setSneakerDetails(nikeSneakerData.data);
			//setRelatedItems(nikeSneakerData.data.variants);
			setSelectedItem({
				id: nikeSneakerData.data.id,
				title: nikeSneakerData.data.title,
				image: nikeSneakerData.data.image,
				price: nikeSneakerData.data.min_price.toFixed(2),
				sneakerPoints: Math.round(citiServices.convertToPoints(nikeSneakerData.data.min_price)),
				size: null,
				slug: nikeSneakerData.data.slug,
			});
		} catch (error) {
			console.log("fetchSneakerDetails", error);
		}
	};

	const fetchTrendingSneakers = async () => {
		try {
			const trendingSneakersData = await sneakersServices.trendingNikeList();
			//	console.log(trendingSneakersData.data);
			//	console.log(getRandomObjects(trendingSneakersData.data));
			setRelatedItems(getRandomObjects(trendingSneakersData.data));
		} catch (error) {
			console.log("fetchTrendingSneakers", error);
		}
	};

	const getRandomObjects = (arr) => {
		const shuffledArray = [...arr].sort(() => Math.random() - 0.5);
		return shuffledArray.slice(0, 4);
	};

	const sneakerPoints = Math.round(citiServices.convertToPoints(sneakerDetails.min_price));

	const handleChange = (e) => {
		setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleAddToCart(selectedItem);
	};

	useEffect(() => {
		fetchSneakerDetails();
		fetchTrendingSneakers();
	}, [sneakerSlug]);

	return (
		<div>
			{sneakerDetails.id ? (
				<div>
					<div className="grid items-start grid-cols-1 lg:grid-cols-5">
						<div className="lg:col-span-3  lg:sticky top-0 gap-0.5">
							<div className="overflow-hidden border border-gray-200 rounded-md">
								<img
									alt={sneakerDetails.title}
									src={sneakerDetails.image}
									className="w-full aspect-[1/1] object-contain object-top shadow-md  hover:scale-[1.05] transition-all duration-300 lg:p-20"
								/>
							</div>
						</div>

						<div className="py-6 px-8 max-lg:max-w-2xl lg:col-span-2 ">
							<div>
								<h2 className="text-2xl font-bold text-gray-800">{sneakerDetails.title}</h2>
								<p className="text-sm text-gray-500 mt-2">{sneakerDetails.gender === "male" ? "Men" : "Womens"}'s Shoes</p>
							</div>

							<div className="mt-6">
								<div className="flex items-baseline flex-wrap gap-4">
									<p className="text-gray-800 text-xl font-semibold">
										{sneakerPoints}
										<span className="text-sm font-bold"> POINTS</span>
									</p>
									<p className="text-gray-400 text-sm mt-2">
										<span className="ml-1">Actual price </span>
										S$ {sneakerDetails.min_price}
									</p>
								</div>
							</div>

							<form onSubmit={handleSubmit}>
								<div className="my-10">
									<h3 className="text-base font-medium text-gray-800">Choose a Size</h3>
									<div className="flex flex-wrap gap-4 mt-4">
										{shoeSize.map((size, index) => (
											<div key={index}>
												<label
													htmlFor={`size-${size}`}
													className="block w-14 text-center cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-black has-[:checked]:ring-1 has-[:checked]:ring-black"
												>
													<p className="text-gray-700">{size}</p>

													<input required type="radio" name="size" value={size} id={`size-${size}`} className="sr-only" onChange={handleChange} />
												</label>
											</div>
										))}
									</div>
								</div>

								<div className="mt-6 space-y-4">
									<button
										type="button"
										className="w-full px-4 py-3 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-full"
									>
										Favourite
									</button>
									<button
										type="submit"
										className="w-full px-4 py-3 border border-gray-800 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-full"
									>
										Add to cart
									</button>
								</div>
							</form>

							<div className="my-10">
								<div>
									<h3 className="text-xl font-bold text-gray-800">Product Description</h3>
									<p className="text-sm text-gray-500 mt-4">{sneakerDetails.description}</p>
								</div>
							</div>
						</div>
					</div>

					<RelatedProducts relatedItems={relatedItems} />
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
}
