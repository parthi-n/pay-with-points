import React from "react";
import { useState, useEffect } from "react";
import * as orderServices from "../services/orderServices";
import * as citiServices from "../services/citiServices";
import { Link } from "react-router-dom";

export default function CheckoutForm({
	totalPricePts,
	cartItems,
	setCartItems,
	orderComplete,
	setOrderComplete,
	setAvailablePoints,
}) {
	const initialState = {
		firstName: "",
		lastName: "",
		addressLine1: "",
		addressLine2: "",
		city: "",
		postalCode: "",
		orderSummary: JSON.stringify(cartItems),
		totalPoints: totalPricePts,
		totalAmount: "",
		status: "Processing Payment",
		transactionId: "",
		orderId: "",
	};

	const [orderData, setOrderData] = useState(initialState);

	const handleChange = (evt) => {
		setOrderData({ ...orderData, [evt.target.name]: evt.target.value });
	};

	const createOrder = async (Data) => {
		try {
			const newOrder = await orderServices.createOrder(Data);
			console.log("newOrder:", newOrder);

			setOrderData(initialState);
			console.log(newOrder);
		} catch (error) {
			console.error("Error creating order:", error);
		}
	};

	const generateTransactionId = () => {
		const timestamp = Date.now();
		const randomNum = Math.floor(Math.random() * 10000);
		return `${timestamp}${randomNum}`;
	};

	const processPayment = async () => {
		try {
			const transactionId = await generateTransactionId();
			const totalAmount = await citiServices.convertToCash(totalPricePts);
			const shopWithPointsResponse = await citiServices.redeemPoints(transactionId, totalAmount, totalPricePts);

			if (!shopWithPointsResponse || !shopWithPointsResponse.redemptionDetails?.[0]?.orderId) {
				console.error("Failed to redeem points or retrieve redemption details.");
				return;
			}

			const { orderId } = shopWithPointsResponse.redemptionDetails[0];
			createOrder({ ...orderData, orderId, transactionId });

			console.log("Shop with points response:", shopWithPointsResponse);
			setAvailablePoints(shopWithPointsResponse.availablePointBalance);
		} catch (error) {
			console.error("processPayment error:", error);
			throw error;
		}
	};

	const handleSubmitForm = (evt) => {
		evt.preventDefault();
		processPayment();
		setCartItems([]);
		setOrderData(initialState);
		setOrderComplete(true);
	};

	return (
		<div className="bg-gray-100 rounded-2xl px-10 py-10 h-max">
			{!orderComplete ? (
				<form onSubmit={handleSubmitForm}>
					<h1 className="text-3xl font-bold text-gray-800 ">Checkout</h1>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
						<h3 className="col-span-full text-lg font-bold">Enter your name and address:</h3>
						<div className="sm:col-span-3 sm:col-start-1">
							<label htmlFor="firstName" className="block text-sm/6 font-medium text-gray-900">
								First Name
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									value={orderData.firstName}
									required
									id="firstName"
									name="firstName"
									type="text"
									autoComplete="firstName"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>
						<div className="sm:col-span-3 sm:col-start-4">
							<label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
								Last Name
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									value={orderData.lastName}
									required
									id="lastName"
									name="lastName"
									type="text"
									autoComplete="lastName"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="col-span-full">
							<label htmlFor="addressLine1" className="block text-sm/6 font-medium text-gray-900">
								Street address
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									value={orderData.addressLine1}
									required
									id="addressLine1"
									name="addressLine1"
									type="text"
									autoComplete="addressLine1"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="addressLine2" className="block text-sm/6 font-medium text-gray-900">
								Apt, Suite, ect. (optional)
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									value={orderData.addressLine2}
									required
									id="addressLine2"
									name="addressLine2"
									type="text"
									autoComplete="addressLine2"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3 sm:col-start-1">
							<label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
								City
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									value={orderData.city}
									required
									id="city"
									name="city"
									type="text"
									autoComplete="city"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label onChange={handleChange} htmlFor="postalCode" className="block text-sm/6 font-medium text-gray-900">
								ZIP / Postal code
							</label>
							<div className="mt-2">
								<input
									onChange={handleChange}
									value={orderData.postalCode}
									required
									id="postalCode"
									name="postalCode"
									type="text"
									autoComplete="postalCode"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<button
							type="submit"
							
							className="text-sm mt-6 px-4 py-3 w-80 font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-full"
						>
							Pay with Points
						</button>
					</div>
				</form>
			) : (
				<div className=" grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
					<h1 className="text-3xl font-bold text-gray-800 mb-5 col-span-full">Thanks for shopping</h1>

					<p className="text-lg col-span-full">We have received your order and are getting ready it to be shipped.</p>

					<div className="mt-4 text-sm sm:col-span-3">
						<Link to="/orders">
							<button
								type="button"
								className="w-full px-4 py-3 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-full"
							>
								View Orders
							</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
