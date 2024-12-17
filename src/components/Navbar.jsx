import React from "react";

export default function Navbar({ balancePoints }) {
	return (
		<header className="bg-white w-screen">
			<nav aria-label="Global" className="w-screen left-0 right-0 mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 fixed">
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img alt="" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
					</a>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					<div>
						<a href="/cart">Cart</a>
					</div>

					<div>Balance Points {balancePoints}</div>
				</div>
			</nav>
		</header>
	);
}
