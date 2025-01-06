import React, { useState, useEffect } from "react";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

export default function cart({ cartItems, totalPricePts, handleAddQuantity, handleRemoveQuantity, handleRemoveItem, availablePoints }) {
	const [checkoutIsActive, setCheckoutIsActive] = useState(false);

	const handleCheckout = () => setCheckoutIsActive(cartItems.length > 0);

	useEffect(() => {
		handleCheckout();
	}, [cartItems]);

	return (
		<div className="font-sans  mx-auto bg-white py-4">
			<h1 className="text-3xl font-bold text-gray-800 ">Shopping Cart</h1>

			<div className="grid md:grid-cols-3 gap-8 mt-16">
				<div className="md:col-span-2 space-y-4">
					{cartItems.length > 0 ? (
						cartItems.map((item) => (
							<CartItem
								key={item.id + item.size}
								item={item}
								handleAddQuantity={handleAddQuantity}
								handleRemoveQuantity={handleRemoveQuantity}
								handleRemoveItem={handleRemoveItem}
							/>
						))
					) : (
						<p>There are no items in your cart.</p>
					)}
					<hr className="border-gray-300" />
				</div>
				{checkoutIsActive && <OrderSummary availablePoints={availablePoints} totalPricePts={totalPricePts} />}
			</div>
		</div>
	);
}
