import Card from "@/app/components/Card";

export default function FilterBody() {
	return (
		<>
			<div className="bg-red-200 w-full">
				<div className="py-3 border-b-1 text-black font-bold text-xs">전체 4개</div>
			</div>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</>
	);
}
