import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as sneakersServices from "../services/sneakersServices";

export default function ProductDetails({ sneaker }) {
	const [sneakerDetails, setSneakerDetails] = useState([]);

	const { sneakerSlug } = useParams();
	const params = useParams();
	console.log(params);
	console.log("param: " + sneakerSlug);

	useEffect(() => {
		const fetchSneakerDetails = async () => {
			try {
				const nikeSneakerData = await sneakersServices.sneakerDetails(sneakerSlug);
				console.log(nikeSneakerData);
				setSneakerDetails(nikeSneakerData.data);
			} catch (err) {
				console.log(error);
			}
		};

		fetchSneakerDetails();
	}, []);

	return (
		<div>
			<div className="group relative">
				<img
					alt={sneakerDetails.title}
					src={sneakerDetails.image}
					className="aspect-square w-full rounded-md bg-white object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
				/>
				<div className="mt-4 flex justify-between">
					<div className="">
						<h3 className="text-sm text-gray-700">
							<span aria-hidden="true" className="absolute inset-0" />
							{sneakerDetails.title}
						</h3>
						<p className="mt-1 text-sm text-gray-500">{sneakerDetails.color}</p>
						<p className="text-sm font-medium text-gray-900">S$ {sneakerDetails.avg_price}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
