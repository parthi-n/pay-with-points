import React from "react";
import { Link } from "react-router-dom";

export default function OrderedItemList({ items }) {
	const itemList = JSON.parse(items);
	//console.log(itemList);
	return (
		<div className="flex flex-col gap-4 mt-10">
			{itemList.map((item, index) => (
				<div key={index} className="grid grid-cols-3 items-start gap-4">
					<div className="col-span-2 flex items-start gap-4">
						<div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-white border-gray-100 border-2 p-2 rounded-md">
							<img src={item.image} className="w-full h-full object-contain" />
						</div>

						<div className="flex flex-col">
							<Link to={`/sneakers/${item.slug}`}>
								<h3 className="text-base font-bold text-gray-800">{item.title}</h3>
								<p className="text-xs font-semibold text-gray-500 mt-0.5">Size: {item.size}</p>
								<p className="text-xs font-semibold text-gray-500 mt-0.5">Quantity: {item.quantity}</p>
							</Link>
						</div>
					</div>

					<div className="ml-auto">
						<h4 className="text-lg max-sm:text-base font-bold text-gray-800">
							{item.sneakerPoints * item.quantity}
							<span className="text-sm font-bold"> pts</span>
						</h4>
					</div>

					
				</div>
			))}
		</div>
	);
}
