import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as sneakersServices from "../services/sneakersServices";

export default function ProductDetails({ sneaker, handleAddToCart }) {
	const { sneakerSlug } = useParams();
	const params = useParams();
	
	const [sneakerDetails, setSneakerDetails] = useState([]);
	const [selectedItem, setSelectedItem] = useState({});

	const shoeSize = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"];

	useEffect(() => {
		const fetchSneakerDetails = async () => {
			try {
				const nikeSneakerData = await sneakersServices.sneakerDetails(sneakerSlug);
				setSneakerDetails(nikeSneakerData.data);
				setSelectedItem({
					id: nikeSneakerData.data.id,
					title: nikeSneakerData.data.title,
					image: nikeSneakerData.data.image,
					price: nikeSneakerData.data.avg_price.toFixed(2),
					size: null,
					slug: nikeSneakerData.data.slug,
				});
			} catch (err) {
				console.log(error);
			}
		};

		fetchSneakerDetails();
	}, []);


	const handleChange = (e) => {
		setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleAddToCart(selectedItem);
	};

	return (
		<div>
			<div className="font-sans">
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
							<h2 className="text-xl font-bold text-gray-800">{sneakerDetails.title}</h2>
							<p className="text-sm text-gray-500 mt-2">{sneakerDetails.gender === "male" ? "Men" : "Womens"}'s Shoes</p>
						</div>

						<div className="mt-6">
							<div className="flex items-center flex-wrap gap-4">
								<p className="text-gray-800 text-4xl font-bold">S$ {Number(sneakerDetails.avg_price)}</p>
								<p className="text-gray-400 text-sm mt-2">
									<strike>$42</strike> <span className="ml-1">Tax included</span>
								</p>
							</div>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="mt-6">
								<h3 className="text-xl font-bold text-gray-800">Choose a Size</h3>
								<div className="flex flex-wrap gap-4 mt-4">
									{shoeSize.map((size, index) => (
										<div>
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
									className="w-full px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-full"
								>
									Favourite
								</button>
								<button
									type="submit"
									className="w-full px-4 py-2.5 border border-gray-800 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-full"
								>
									Add to cart
								</button>
							</div>
						</form>

						<div className="mt-6">
							<div>
								<h3 className="text-xl font-bold text-gray-800">Product Description</h3>
								<p className="text-sm text-gray-500 mt-4">{sneakerDetails.description}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
