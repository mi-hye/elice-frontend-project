import Filter from "./Filter";
import SearchArea from "./SearchArea";

export default async function HomePage() {
	return (
		<main className="w-screen h-screen">
			<div className="container p-6 bg-sky-200">
				<SearchArea />
				<Filter />
			</div>
		</main>
	);
}
