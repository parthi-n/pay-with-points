import React from "react";
import { Link } from "react-router-dom";

export default function ProductList({ products, handleAddToCart }) {
	return (
		<div className="bg-white relative">
			<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
				{products.map((sneaker) => (
					<div key={sneaker.id}>
						<div className="group relative">
							<img
								alt={sneaker.title}
								src={sneaker.image}
								className="aspect-square w-full rounded-md bg-white object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
							/>
							<div className="mt-4 flex justify-between">
								<div className="">
									<h3 className="text-sm text-gray-700">
										<Link to={`/sneakers/${sneaker.slug}`}>
											<span aria-hidden="true" className="absolute inset-0" />
											{sneaker.title}
										</Link>
									</h3>
									<p className="mt-1 mb-1 text-sm text-gray-500">{sneaker.gender === "male" ? "Men" : "Womens"}'s Shoes</p>
									<p className="text-sm font-medium text-gray-900">S$ {sneaker.avg_price.toFixed(2)}</p>
								</div>
							</div>
						</div>
						<button
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
						</button>
					</div>
				))}
			</div>

			<div className="mt-20">
				<ul class="font-[sans-serif] flex mx-auto border divide-x-2 border-black rounded w-max overflow-hidden">
					<li class="px-4 py-2.5 flex items-center justify-center shrink-0 cursor-pointer text-sm font-semibold text-gray-800 hover:bg-gray-50">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-current mr-3" viewBox="0 0 55.753 55.753">
							<path
								d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
								data-original="#000000"
							/>
						</svg>
						Previous
					</li>
					<li class="px-4 py-2.5 flex items-center justify-center shrink-0 cursor-pointer text-sm font-semibold text-gray-800 hover:bg-gray-50">
						Next
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3 fill-current ml-3 rotate-180" viewBox="0 0 55.753 55.753">
							<path
								d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
								data-original="#000000"
							/>
						</svg>
					</li>
				</ul>
			</div>
		</div>
	);
}
