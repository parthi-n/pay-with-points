import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSummary({ cartItems, totalPricePts }) {
	console.log(cartItems);
	return (
		<div>
			<h2 className="text-xl font-bold text-gray-800 ">Order Summary</h2>
			<div className="flex flex-col gap-4 mt-8">
				{cartItems.map((item) => (
					<div key={item.id} className="grid grid-cols-3 items-start gap-4  border-gray-100 border-2 p-3 rounded-lg">
						<div className="col-span-full flex items-start gap-4">
							<div className="w-40 h-40 max-sm:w-24 max-sm:h-24 shrink-0 border-gray-100 border-2 p-2 rounded-md">
								<img src={item.image} className="w-full h-full object-contain" />
							</div>

							<div className="flex flex-col py-4">
								<h3 className="text-base font-bold text-gray-800 max-w-60">{item.title}</h3>
								<p className="text-xs font-semibold text-gray-500 mt-0.5">Size: {item.size}</p>
								<p className="text-xs font-semibold text-gray-500 mt-0.5">Quantity : {item.quantity}</p>

								<h4 className="text-lg mt-5 max-sm:text-base font-bold text-gray-800">
									{item.sneakerPoints * item.quantity}
									<span className="text-sm font-bold"> pts</span>
								</h4>
							</div>
						</div>
					</div>
				))}
			</div>
			<div>
				<ul className="text-gray-800 mt-6 space-y-3">
					<hr className="border-gray-300" />
					<li className="flex flex-wrap gap-4 text-xl font-bold">
						Total <span className="ml-auto">{totalPricePts} pts</span>
					</li>
					{/* <li className="flex flex-wrap gap-4 text-sm">
						Remaining Points <span className="ml-auto font-bold">{totalPricePts - totalPrice} pts</span>
					</li> */}
				</ul>
			</div>
		</div>
	);
}
