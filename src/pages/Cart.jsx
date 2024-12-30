import React, { useState } from "react";

import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";

export default function cart({ cartItems, handleAddQuantity, handleRemoveQuantity, handleRemoveItem, availablePoints }) {
	const totalPoints = cartItems.reduce((acc, obj) => acc + obj.sneakerPoints * obj.quantity, 0);

	return (
		<div class="font-sans  mx-auto bg-white py-4">
			<h1 class="text-3xl font-bold text-gray-800 ">Shopping Cart</h1>

			<div class="grid md:grid-cols-3 gap-8 mt-16">
				<div class="md:col-span-2 space-y-4">
					{cartItems.length > 0 ? (
						cartItems.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								handleAddQuantity={handleAddQuantity}
								handleRemoveQuantity={handleRemoveQuantity}
								handleRemoveItem={handleRemoveItem}
							/>
						))
					) : (
						<p>There are no items in your cart.</p>
					)}
					<hr class="border-gray-300" />
				</div>

				<OrderSummary availablePoints={availablePoints} totalPoints={totalPoints} />
			</div>
		</div>
	);
}
