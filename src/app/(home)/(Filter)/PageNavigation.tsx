"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const GRID_ITEM_COUNT = 12;
const disable = "text-[#ccc] cursor-not-allowed";

export default function PageNavigation({ courseCount }: { courseCount: number }) {
	const [page, setPage] = useState(1);
	const lastPage = Math.ceil(courseCount / GRID_ITEM_COUNT);
	const pages = Array.from({ length: lastPage }).map((_, i) => i + 1);

	return (
		<div className="flex justify-center my-5 font-bold">
			<button className={`layout-center mx-5 ${page === 1 ? disable : ""}`}>
				<FontAwesomeIcon icon={faChevronLeft} size="1x" />
			</button>
			{pages.map((pageNum) => (
				<div
					className={`size-[24px] m-2 pb-1 layout-center cursor-pointer rounded-lg ${
						page === pageNum ? "bg-accent text-white" : "text-[#ccc]"
					}`}
					onClick={() => setPage(pageNum)}
				>
					{pageNum}
				</div>
			))}
			<button>
				<FontAwesomeIcon
					className={`layout-center mx-5 ${page === lastPage ? disable : ""}`}
					icon={faChevronRight}
					size="1x"
				/>
			</button>
		</div>
	);
}
