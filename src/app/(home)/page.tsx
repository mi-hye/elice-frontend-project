import Filter from "./Filter";
import SearchArea from "./SearchArea";

export default async function HomePage() {
	return (
		<main className="w-screen h-screen">
			<div className="container p-6">
				<SearchArea />
				<Filter />
			</div>
		</main>
	);
}
