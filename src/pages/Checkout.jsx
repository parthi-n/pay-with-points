import React from "react";
import { useState, useEffect } from "react";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";

export default function Checkout({ cartItems, setCartItems, totalPricePts, availablePoints, setAvailablePoints }) {
	const [orderComplete, setOrderComplete] = useState(false);
	useEffect(() => {
		setOrderComplete(cartItems.length <= 0);
	}, []);

	return (
		<div className="font-sans  mx-auto bg-white py-4">
			<div className="grid md:grid-cols-5 gap-8 mt-8">
				<div className="col-span-3">
					<CheckoutForm
						cartItems={cartItems}
						setCartItems={setCartItems}
						totalPricePts={totalPricePts}
						orderComplete={orderComplete}
						setOrderComplete={setOrderComplete}
						setAvailablePoints={setAvailablePoints}
					/>
				</div>
				{!orderComplete && (
					<div className="col-span-2">
						<CheckoutSummary cartItems={cartItems} totalPricePts={totalPricePts} />
					</div>
				)}
			</div>
		</div>
	);
}
