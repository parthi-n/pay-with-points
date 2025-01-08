import React from "react";
import ProductCard from "./ProductCard";



export default function RelatedProducts({ relatedItems }) {
	return (
		<div className="bg-white">
			<div className="mx-auto   py-16 sm:py-24 w-full ">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">You might also like</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
					{relatedItems.map((sneaker) => (
						<ProductCard key={sneaker.id} sneaker={sneaker} />
					))}
				</div>
			</div>
		</div>
	);
}
