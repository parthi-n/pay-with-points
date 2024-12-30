import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";
import * as sneakersServices from "../services/sneakersServices";
import ProductCard from "./ProductCard";
import Preloader from "../assets/loader.gif"


export default function ProductList({ nikeSneakers, setNikeSneakers, handleAddToCart }) {
	const [pageNum, setPageNum] = useState(2);

	const fetchMoreData = () => {
		const fetchMoreSneakers = async () => {
			try {
				const nikeSneakerData = await sneakersServices.nikeList(pageNum);
				console.log(nikeSneakerData);
				setNikeSneakers([...nikeSneakers, ...nikeSneakerData.data]);
				console.log([...nikeSneakers, ...nikeSneakerData.data]);
			} catch (err) {
				console.log(error);
			}
		};

		setPageNum(pageNum + 1);
		fetchMoreSneakers();
	};

	const loader = (
		<div className="mx-auto my-20 text-center flex justify-center" >
			<img alt="" src={Preloader} className="h-5 w-14" />
		</div>
	);
	return (
		<div className="bg-white relative">
			{/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
				{products.map((sneaker) => (
					<ProductCard key={sneaker.id} sneaker={sneaker} />
				))}
			</div> */}

			<InfiniteScroll dataLength={nikeSneakers.length} next={fetchMoreData} hasMore={true} loader={loader}>
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
					{nikeSneakers.map((sneaker) => (
						<ProductCard key={sneaker.id} sneaker={sneaker} />
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}
