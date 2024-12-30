import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ sneaker }) {
	const { title, image, slug, avg_price, gender } = sneaker;
	return (
		<div key={sneaker.id}>
			<div className="group relative">
				<img
					alt={title}
					src={image}
					className="aspect-square w-full rounded-md bg-white object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
				/>
				<div className="mt-4 flex justify-between">
					<div className="">
						<h3 className="text-sm text-gray-700">
							<Link to={`/sneakers/${slug}`}>
								<span aria-hidden="true" className="absolute inset-0" />
								{title}
							</Link>
						</h3>
						<p className="mt-1 mb-1 text-sm text-gray-500">{gender === "male" ? "Men" : "Womens"}'s Shoes</p>
						<p className="text-sm font-medium text-gray-900">S$ {avg_price}</p>
					</div>
				</div>
			</div>
			{/* <button
				type="button"
				onClick={() =>
					handleAddToCart({
						id: sneaker.id,
						title: sneaker.title,
						image: sneaker.image,
						price: sneaker.avg_price.toFixed(2),
						size: 0,
						slug: sneaker.slug,
					})
				}
				className="inline-flex w-full mt-2 justify-center rounded-md bg-black px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-black/70  sm:w-auto"
			>
				Add to cart
			</button> */}
		</div>
	);
}
