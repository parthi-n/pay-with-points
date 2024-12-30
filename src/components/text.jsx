import React from "react";

export default function text() {
	return (
		<fieldset className="grid grid-cols-2 gap-4">
			<legend className="sr-only">Delivery</legend>

			<div>
				<label
					htmlFor="DeliveryStandard"
					className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
				>
					<div>
						<p className="text-gray-700">Standard</p>

						<p className="mt-1 text-gray-900">Free</p>
					</div>

					<input type="radio" name="DeliveryOption" value="DeliveryStandard" id="DeliveryStandard" className="sr-only" checked />
				</label>
			</div>

			<div>
				<label
					htmlFor="DeliveryPriority"
					className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
				>
					<div>
						<p className="text-gray-700">Next Day</p>

						<p className="mt-1 text-gray-900">£9.99</p>
					</div>

					<input type="radio" name="DeliveryOption" value="DeliveryPriority" id="DeliveryPriority" className="sr-only" />
				</label>
			</div>
		</fieldset>
	);
}
