import React from "react";
import { Link } from "react-router-dom";

export default function OrderSummary({ availablePoints, totalPricePts }) {
	return (
		<div className="bg-gray-100 rounded-md p-4 h-max">
			<h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Order Summary</h3>

			<ul className="text-gray-800 mt-6 space-y-3">
				<li className="flex flex-wrap gap-4 text-sm">
					Available Point <span className="ml-auto font-bold">{availablePoints} pts</span>
				</li>

				<li className="flex flex-wrap gap-4 text-sm">
					Subtotal <span className="ml-auto font-bold">{totalPricePts} pts</span>
				</li>

				<hr className="border-gray-300" />
				<li className="flex flex-wrap gap-4 text-sm font-bold">
					Total <span className="ml-auto">{totalPricePts} pts</span>
				</li>
				<li className="flex flex-wrap gap-4 text-sm">
					Remaining Points <span className="ml-auto font-bold">{availablePoints - totalPricePts} pts</span>
				</li>
			</ul>

			<div className="mt-10 space-y-2 flex flex-col gap-1">
				{totalPricePts >= 1000 && (
					<Link to="/checkout">
						<button
							type="button"
							className="text-sm px-4 py-3 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-full"
						>
							Checkout
						</button>
					</Link>
				)}

				{totalPricePts < 1000 && (
					<p className="text-center mb-2 text-blue-500">
						Checkout requires a minimum of <br /> <b>1000 points</b> to redeem
					</p>
				)}
				<Link to="/">
					<button
						type="button"
						className="text-sm px-4 py-3 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-full"
					>
						Continue Shopping{" "}
					</button>
				</Link>
			</div>
		</div>
	);
}
