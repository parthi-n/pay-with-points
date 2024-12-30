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

function App() {
	const [availablePoints, setAvailablePoints] = useState(0);
	const [nikeSneakers, setNikeSneakers] = useState([]);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
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

	const handleAddQuantity = (productId) => {
		const productIndex = cartItems.findIndex((item) => item.id === productId);
		const newCartArray = [...cartItems];
		const currentQty = newCartArray[productIndex]?.quantity || 0;
		newCartArray[productIndex].quantity = currentQty + 1;
		setCartItems([...newCartArray]);
	};

	const handleRemoveQuantity = (productId) => {
		const productIndex = cartItems.findIndex((item) => item.id === productId);
		const newCartArray = [...cartItems];
		const currentQty = newCartArray[productIndex]?.quantity || 0;
		const newQty = currentQty - 1;

		if (currentQty > 0) {
			if (newQty > 0) {
				newCartArray[productIndex].quantity = newQty;
				setCartItems([...newCartArray]);
			} else {
				const updatedCart = newCartArray.filter((item) => item.id !== productId);
				setCartItems(updatedCart);
			}
		}
	};

	const handleRemoveItem = (productId) => {
		const updatedCart = cartItems.filter((item) => item.id !== productId);
		setCartItems([...updatedCart]);
	};

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
							/>
						}
					/>
					<Route path="/sneakers" element={<ProductList products={nikeSneakers} />} />
					<Route path="/sneakers/:sneakerSlug" element={<ProductDetails handleAddToCart={handleAddToCart} />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="*" element={<h2>Whoops, nothing here!</h2>} />
				</Routes>
			</div>
		</>
	);
}

export default App;
