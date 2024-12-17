import React from "react";
import { Link } from 'react-router-dom';

export default function Navbar({ balancePoints }) {
	return (
		<header className="bg-white w-screen fixed z-50">
			<nav aria-label="Global" className="w-screen left-0 right-0 mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 ">
				<div className="flex lg:flex-1 gap-6">
					{/* <a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img alt="" src="src/assets/citi.svg" className="h-8 w-auto" />
					</a> */}
					<Link to="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img alt="" src="src/assets/nike-white.svg" className="h-8 w-auto" />
					</Link>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					<div>
						<Link to="/cart">Cart</Link>
					</div>

					<div>Available CITI Points {balancePoints}</div>
				</div>
			</nav>
		</header>
	);
}
