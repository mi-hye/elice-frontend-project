import Chip from "../../components/Chip";

export default function FilterList({ type, tags }: { type: string; tags: Array<string> }) {
	return (
		<div className="h-[48px] flex text-filter border">
			<div className="flex justify-start pl-4 w-[94px] h-full bg-base layout-center font-bold text-xs border-r">
				{type}
			</div>
			<div className="flex items-center flex-grow h-full bg-white text-sm px-3">
				{tags.map((tag) => (
					<Chip key={tag} tag={tag} />
				))}
			</div>
		</div>
	);
}
