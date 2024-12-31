import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";

export default function Checkout({ cartItems, totalPricePts }) {
	return (
		<div class="font-sans  mx-auto bg-white py-4">
		

			<div class="grid md:grid-cols-5 gap-8 mt-8">
				<div className="col-span-3">
					<CheckoutForm />
				</div>
				<div className="col-span-2">
					<CheckoutSummary cartItems={cartItems} totalPricePts={totalPricePts} />
				</div>
			</div>
		</div>
	);
}
