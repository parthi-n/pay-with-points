import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/nike-white.svg"

export default function Navbar({ balancePoints, totalItems }) {
	return (
		<header className="bg-white w-screen fixed z-50">
			<nav aria-label="Global" className="w-screen left-0 right-0 mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 ">
				<div className="flex lg:flex-1 gap-6">
					<Link to="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img alt="" src={logo} className="h-8 w-auto" />
					</Link>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					<div className="relative">
						<Link to="/cart">Cart</Link>
						{totalItems > 0 && (
							<span class="bg-red-500 text-[10px] px-1.5 font-semibold min-w-[16px] h-4 flex items-center justify-center text-white rounded-full absolute -top-1 left-[110%]">
								{totalItems}
							</span>
						)}
					</div>

					<div>Available CITI Points {balancePoints}</div>
				</div>
			</nav>
		</header>
	);
}
