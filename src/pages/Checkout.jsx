import React from "react";
import OrderSummary from "../components/OrderSummary";

export default function Checkout() {
	return (
		<div class="font-sans  mx-auto bg-white py-4">
			<h1 class="text-3xl font-bold text-gray-800 ">CheckOut</h1>

			<div class="grid md:grid-cols-3 gap-8 mt-8">
				<form>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="col-span-full">
							<label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
								Street address
							</label>
							<div className="mt-2">
								<input
									id="street-address"
									name="street-address"
									type="text"
									autoComplete="street-address"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2 sm:col-start-1">
							<label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
								City
							</label>
							<div className="mt-2">
								<input
									id="city"
									name="city"
									type="text"
									autoComplete="address-level2"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
								State / Province
							</label>
							<div className="mt-2">
								<input
									id="region"
									name="region"
									type="text"
									autoComplete="address-level1"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
								ZIP / Postal code
							</label>
							<div className="mt-2">
								<input
									id="postal-code"
									name="postal-code"
									type="text"
									autoComplete="postal-code"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>
						<button type="button" class="text-sm px-4 py-3 w-80 font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-full">
							Place Order
						</button>
					</div>
				</form>

				{/* <OrderSummary availablePoints={availablePoints} totalPoints={totalPoints} /> */}
			</div>
		</div>
	);
}
