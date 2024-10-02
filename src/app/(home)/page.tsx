import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default async function HomePage() {
	return (
		<main className="w-screen h-screen bg-sky-200">
			<div className="container p-6 ">
				<div
					tabIndex={0}
					className="layout-center flex-row-reverse m-3 relative z-10 group bg-white border border-rgb-gray rounded focus-within:border-accent"
				>
					<input
						type="text"
						className="flex-grow placeholder-gray-400 focus:outline-none py-3 peer "
						placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
					></input>
					<div className="h-full m-4 text-black peer-focus:text-accent">
						<FontAwesomeIcon icon={faSearch} className="size-5 text-xs" />
					</div>
				</div>
			</div>
		</main>
	);
}
