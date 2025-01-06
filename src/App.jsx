import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import * as citiServices from "./services/citiServices";
import * as sneakersServices from "./services/sneakersServices";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
	const [availablePoints, setAvailablePoints] = useState(0);
	const [nikeSneakers, setNikeSneakers] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	const fetchPointBalance = async () => {
		try {
			const citiPointBalance = await citiServices.citiPointBalance();
			//console.log(citiPointBalance.rewardAccounts[0].availablePointBalance);
			setAvailablePoints(citiPointBalance.rewardAccounts[0].availablePointBalance);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchNikeSneakers = async () => {
		try {
			const nikeSneakerData = await sneakersServices.nikeList(1);
			//console.log(nikeSneakerData);
			setNikeSneakers(nikeSneakerData.data);
		} catch (err) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchPointBalance();
		fetchNikeSneakers();
	}, []);

	const handleAddToCart = (product) => {
		const checkItem = cartItems.find((item) => item.id === product.id && item.size === product.size);

		if (!checkItem) {
			const newItem = { ...product, quantity: 1 };
			//console.log(newItem.quantity);
			setCartItems([...cartItems, newItem]);
		} else {
			const updatedCartItems = cartItems.map((item) => {
				if (item.id === product.id && item.size === product.size) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			setCartItems(updatedCartItems);
		}
	};

	const handleAddQuantity = (productId, productSize) => {
		const productIndex = cartItems.findIndex((item) => item.id === productId && item.size === productSize);
		const updatedCartItems = [...cartItems];
		const currentQty = updatedCartItems[productIndex]?.quantity || 0;
		updatedCartItems[productIndex].quantity = currentQty + 1;
		setCartItems(updatedCartItems);
	};

	const handleRemoveQuantity = (productId, productSize) => {
		const productIndex = cartItems.findIndex((item) => item.id === productId && item.size === productSize);
		const newCartArray = [...cartItems];
		const currentQty = newCartArray[productIndex]?.quantity || 0;
		const newQty = currentQty - 1;

		if (currentQty > 0) {
			if (newQty > 0) {
				newCartArray[productIndex].quantity = newQty;
				setCartItems([...newCartArray]);
			} else {
				const updatedCart = newCartArray.filter((item) => item !== cartItems[productIndex]);
				setCartItems(updatedCart);
			}
		}
	};

	const handleRemoveItem = (productId, productSize) => {
		const productIndex = cartItems.findIndex((item) => item.id === productId && item.size === productSize);
		const updatedCart = cartItems.filter((item) => item !== cartItems[productIndex]);
		setCartItems([...updatedCart]);
	};

	const totalPricePts = cartItems.reduce((acc, obj) => acc + obj.sneakerPoints * obj.quantity, 0);

	return (
		<>
			<Navbar availablePoints={availablePoints} totalItems={cartItems.length} />
			<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<Routes>
					<Route path="/" element={<ProductList nikeSneakers={nikeSneakers} setNikeSneakers={setNikeSneakers} handleAddToCart={handleAddToCart} />} />
					<Route
						path="/cart"
						element={
							<Cart
								cartItems={cartItems}
								handleAddQuantity={handleAddQuantity}
								handleRemoveQuantity={handleRemoveQuantity}
								handleRemoveItem={handleRemoveItem}
								availablePoints={availablePoints}
								totalPricePts={totalPricePts}
							/>
						}
					/>
					<Route path="/sneakers" element={<ProductList products={nikeSneakers} />} />
					<Route path="/sneakers/:sneakerSlug" element={<ProductDetails handleAddToCart={handleAddToCart} />} />
					<Route
						path="/checkout"
						element={
							<Checkout
								cartItems={cartItems}
								setCartItems={setCartItems}
								totalPricePts={totalPricePts}
								fetchPointBalance={fetchPointBalance}
								availablePoints={availablePoints}
							/>
						}
					/>
					<Route path="/orders" element={<Orders />} />
					<Route path="*" element={<h2>Whoops, nothing here!</h2>} />
				</Routes>
			</div>
		</>
	);
}

export default App;
