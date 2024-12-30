import React from "react";
import { Link } from "react-router-dom";

export default function OrderSummary({ totalPoints, availablePoints }) {
	return (
		<div class="bg-gray-100 rounded-md p-4 h-max">
			<h3 class="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">Order Summary</h3>

			<ul class="text-gray-800 mt-6 space-y-3">
				<li class="flex flex-wrap gap-4 text-sm">
					Available Point <span class="ml-auto font-bold">{availablePoints} pts</span>
				</li>

				<li class="flex flex-wrap gap-4 text-sm">
					Subtotal <span class="ml-auto font-bold">{totalPoints} pts</span>
				</li>

				<hr class="border-gray-300" />
				<li class="flex flex-wrap gap-4 text-sm font-bold">
					Total <span class="ml-auto">{totalPoints} pts</span>
				</li>
				<li class="flex flex-wrap gap-4 text-sm">
					Remaining Points <span class="ml-auto font-bold">{availablePoints - totalPoints} pts</span>
				</li>
			</ul>

			<div class="mt-10 space-y-2 flex flex-col gap-1">
				<Link to="/checkout">
					<button type="button" class="text-sm px-4 py-3 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-full">
						Checkout
					</button>
				</Link>
				<Link to="/">
					<button
						type="button"
						class="text-sm px-4 py-3 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-full"
					>
						Continue Shopping{" "}
					</button>
				</Link>
			</div>
		</div>
	);
}
