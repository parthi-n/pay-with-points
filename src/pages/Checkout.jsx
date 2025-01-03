import React from "react";
import { useState, useEffect } from "react";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutSummary from "../components/CheckoutSummary";
import * as orderServices from "../services/orderServices";

export default function Checkout({ cartItems, setCartItems, totalPricePts }) {



	return (
		<div class="font-sans  mx-auto bg-white py-4">
			<div class="grid md:grid-cols-5 gap-8 mt-8">
				<div className="col-span-3">
					<CheckoutForm cartItems={cartItems} setCartItems={setCartItems} totalPricePts={totalPricePts} />
				</div>
				<div className="col-span-2">
					<CheckoutSummary cartItems={cartItems} totalPricePts={totalPricePts} />
				</div>
			</div>
		</div>
	);
}
