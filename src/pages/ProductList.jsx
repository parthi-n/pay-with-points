import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import * as sneakersServices from "../services/sneakersServices";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

export default function ProductList({ nikeSneakers, setNikeSneakers }) {
	const [pageNum, setPageNum] = useState(2);

	const fetchMoreData = () => {
		const fetchMoreSneakers = async () => {
			try {
				const nikeSneakerData = await sneakersServices.nikeList(pageNum);
				setNikeSneakers([...nikeSneakers, ...nikeSneakerData.data]);
			} catch (err) {
				console.log(error);
			}
		};

		setPageNum(pageNum + 1);
		fetchMoreSneakers();
	};

	return (
		<div className="bg-white relative">
			<InfiniteScroll dataLength={nikeSneakers.length} next={fetchMoreData} hasMore={true} loader={<Loader />}>
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
					{nikeSneakers.map((sneaker, index) => (
						<ProductCard key={sneaker.id + index} sneaker={sneaker} />
					))}
				</div>
			</InfiniteScroll>
		</div>
	);
}
