import React from "react";



export default function ProductList({ products }) {
	return (
		<div className="bg-white">
			
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
					{products.map((sneaker) => (
						<div key={sneaker.id} className="group relative">
							<img
								alt={sneaker.title}
								src={sneaker.image}
								className="aspect-square w-full rounded-md bg-white object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
							/>
							<div className="mt-4 flex justify-between">
								<div className="lg:max-w-52">
									<h3 className="text-sm text-gray-700">
										<a href="/">
											<span aria-hidden="true" className="absolute inset-0" />
											{sneaker.title}
										</a>
									</h3>
									<p className="mt-1 text-sm text-gray-500">{sneaker.color}</p>
								</div>
								<p className="text-sm font-medium text-gray-900">S$ {sneaker.avg_price.toFixed(2)}</p>
							</div>
						</div>
					))}
				</div>
			</div>
	
	);
}
