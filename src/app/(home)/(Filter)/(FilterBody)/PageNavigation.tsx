import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
	courseCount: number;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

const GRID_ITEM_COUNT = 12;
const FIRST_NAVIGATION_NUM = 1;
const LAST_NAVIGATION_NUM = 5;
const disable = "disabled:text-[#ccc] disabled:cursor-not-allowed";

const calculateNavigation = (currentPage: number, lastPage: number) => {
	if (currentPage === lastPage) return [lastPage - 4, lastPage];
	if (currentPage > lastPage - 2) return [currentPage - 3, lastPage];
	if (currentPage > 3) return [currentPage - 2, currentPage + 2];
	return [FIRST_NAVIGATION_NUM, LAST_NAVIGATION_NUM];
};

export default function PageNavigation({ courseCount, page, setPage }: Props) {
	const lastPage = Math.ceil(courseCount / GRID_ITEM_COUNT);
	const pages = Array.from({ length: lastPage }).map((_, i) => i + 1);
	const [firstNum, lastNum] = calculateNavigation(page, lastPage);

	return (
		<div className="flex justify-center my-5 font-bold">
			<button
				className={`layout-center mx-5 transition-colors ${disable}`}
				disabled={page === 1}
				onClick={() => setPage(page - 1)}
			>
				<FontAwesomeIcon icon={faChevronLeft} size="1x" />
			</button>
			{pages.slice(firstNum - 1, lastNum).map((pageNum) => (
				<div
					key={pageNum}
					className={`size-[25px] m-2 pb-1 layout-center cursor-pointer rounded-lg ${
						page === pageNum ? "bg-accent text-white" : "text-[#ccc]"
					}`}
					onClick={() => setPage(pageNum)}
				>
					{pageNum}
				</div>
			))}
			<button
				className={`layout-center mx-5 transition-colors ${disable}`}
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				<FontAwesomeIcon icon={faChevronRight} size="1x" />
			</button>
		</div>
	);
}
