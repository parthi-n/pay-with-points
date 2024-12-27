import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import * as citiServices from "./services/citiServices";
import * as sneakersServices from "./services/sneakersServices";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

function App() {
	const [balancePoints, setBalancePoints] = useState(0);
	const [nikeSneakers, setNikeSneakers] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		const fetchPointBalance = async () => {
			try {
				const citiPointBalance = await citiServices.citiPointBalance();
				//console.log(citiPointBalance.rewardAccounts[0].availablePointBalance);
				setBalancePoints(citiPointBalance.rewardAccounts[0].availablePointBalance);
			} catch (error) {
				console.log(error);
			}
		};

		const fetchNikeSneakers = async () => {
			try {
				const nikeSneakerData = await sneakersServices.nikeList();
				console.log(nikeSneakerData);
				setNikeSneakers(nikeSneakerData.data);
			} catch (err) {
				console.log(error);
			}
		};

		fetchPointBalance();
		fetchNikeSneakers();
	}, []);

	const handleAddToCart = (product) => {
		const checkItem = cartItems.filter((item) => item.id === product.id);

		if (!checkItem || cartItems.length === 0) {
			const newItem = { ...product, quantity: 1 };
			console.log(newItem.quantity);
			setCartItems([...cartItems, newItem]);
		} else {
			const remainingItems = cartItems.filter((el) => el.id !== product.id);
			const currentQty = checkItem[0]?.quantity || 0;
			const newQty = currentQty + 1;
			const updateItem = { ...product, quantity: newQty };
			setCartItems([...remainingItems, updateItem]);
		}
	};

	const handleAddQuantity = (product) => {
		const checkItem = cartItems.filter((item) => item.id === product.id);
		const remainingItems = cartItems.filter((el) => el.id !== product.id);
		const currentQty = checkItem[0]?.quantity || 0;
		const newQty = currentQty + 1;
		const updateItem = { ...product, quantity: newQty };
		setCartItems([...remainingItems, updateItem]);
	};

	const handleRemoveQuantity = (product) => {
		const checkItem = cartItems.filter((item) => item.id === product.id);
		const remainingItems = cartItems.filter((el) => el.id !== product.id);
		const currentQty = checkItem[0]?.quantity || 0;
		const newQty = currentQty - 1;
		const updateItem = { ...product, quantity: newQty };
		setCartItems([...remainingItems, updateItem]);
	};

	return (
		<>
			<Navbar balancePoints={balancePoints} />
			<Routes>
				<Route
					path="/"
					element={
						<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<ProductList products={nikeSneakers} handleAddToCart={handleAddToCart} />
						</div>
					}
				/>
				<Route
					path="/cart"
					element={
						<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<Cart cartItems={cartItems} handleAddQuantity={handleAddQuantity} handleRemoveQuantity={handleRemoveQuantity} />
						</div>
					}
				/>
				<Route
					path="/sneakers"
					element={
						<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<ProductList products={nikeSneakers} />
						</div>
					}
				/>
				<Route
					path="/sneakers/:sneakerSlug"
					element={
						<div className="mx-auto z-0 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
							<ProductDetails />
						</div>
					}
				/>
				<Route path="*" element={<h2>Whoops, nothing here!</h2>} />
			</Routes>
		</>
	);
}

export default App;
