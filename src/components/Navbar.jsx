import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nike-white.svg";

export default function Navbar({ availablePoints, totalItems }) {
	return (
		<header className="bg-white w-screen fixed z-50">
			<nav aria-label="Global" className="w-screen left-0 right-0 mx-auto flex max-w-7xl justify-between p-6 lg:px-8 items-center ">
				<div className="flex lg:flex-1 gap-6">
					<Link to="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img alt="" src={logo} className="h-8 w-auto" />
					</Link>
				</div>
				<div className="hidden lg:flex lg:gap-x-4 font-medium uppercase  items-center">
					<Link to="/">Products</Link>
					<div className="relative mr-3">
						<Link to="/cart" className="">
							Cart
						</Link>
						{totalItems > 0 && (
							<span className="bg-blue-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-1 left-[100%]">
								{totalItems}
							</span>
						)}
					</div>
					<Link to="/orders">Orders</Link>

					<div className="rounded-full border border-blue-500 bg-blue-600/10 text-blue-800 font-medium px-3 py-0.5 flex gap-1 items-center align-baseline">
						<span className="text-xs font-semibold"> CITI PTS:</span>
						<span className="font-semibold">{availablePoints}</span>
					</div>
				</div>
			</nav>
		</header>
	);
}
