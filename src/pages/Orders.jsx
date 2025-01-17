import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as orderServices from "../services/orderServices";
import * as citiServices from "../services/citiServices";
import OrderedItemList from "../components/OrderedItemList";
import Loader from "../components/Loader";

export default function Orders({ fetchPointBalance }) {
	const [orderedList, setOrderedList] = useState([]);
	const [dataRetrieved, setDataRetrieved] = useState([false]);

	const fetchOrderList = async () => {
		try {
			const orderListData = await orderServices.fetchOrderList();
			setOrderedList(orderListData.records);
			setDataRetrieved(true);
			//console.log(orderListData.records);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchOrderList();
	}, []);

	useEffect(() => {
		const checkData = async () => {
			try {
				if (orderedList.length > 0) {
					setDataRetrieved(true);
				} else {
					setDataRetrieved(false);
				}
			} catch (error) {
				console.log(error);
			}
		};
		checkData();
	}, []);

	const cancelOrder = async (transactionId, orderId, recordId) => {
		try {
			await citiServices.redemptionReversal(transactionId, orderId);
			await orderServices.removeOrder(recordId);
			await fetchOrderList();
			await fetchPointBalance();
			await setDataRetrieved(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="font-sans  mx-auto bg-white py-4">
			<h1 className="text-3xl font-bold text-gray-800 ">Orders</h1>

			{!dataRetrieved && <Loader />}
			{dataRetrieved && (
				<div className="grid md:grid-cols-3 gap-8 mt-16  ">
					<div className="md:col-span-2 space-y-4">
						{orderedList.length > 0 ? (
							orderedList.map((order) => (
								<div key={order.id} className=" bg-gray-100 rounded-2xl p-8">
									<div className="mb-6">
										<h3 className="text-xl font-medium">Order ID: #{order.fields.orderId}</h3>
										<p className="text-black/60">Order status: {order.fields.status}</p>
									</div>
									<OrderedItemList items={order.fields.orderSummary} />
									<div className="ml-auto mt-6 flex flex-row justify-between items-center border-t border-black/10 py-4">
										<p>Total Points used</p>
										<p className="text-lg max-sm:text-base font-bold text-gray-800 text-right">
											{order.fields.totalPoints}
											<span className="text-sm font-bold"> pts</span>
										</p>
									</div>
									<div className="mt-9">
										<button
											type="button"
											onClick={() => cancelOrder(order.fields.transactionId, order.fields.orderId, order.id)}
											className="text-sm px-4 py-3 lg:min-w-40 font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-full"
										>
											Cancel Order
										</button>
									</div>
								</div>
							))
						) : (
							<div>
								<p className="mb-8 text-lg">Orders list is empty.</p>
								<Link to="/" className="lg:w-20 mt-12">
									<button
										type="button"
										className="text-sm px-4 py-3 lg:min-w-40  font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-full"
									>
										Continue Shopping
									</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
