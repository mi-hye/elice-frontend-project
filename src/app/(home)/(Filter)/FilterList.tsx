import Chip from "./(FilterList)/Chip";
import { type FilterType } from "../Filter";

type Props = { type: FilterType; tags: Array<string> };

export default function FilterList({ type, tags }: Props) {
	return (
		<div className="min-h-[48px] flex text-filter border">
			<div className="flex justify-start pl-4 w-[94px] bg-base layout-center font-bold text-xs border-r">
				{type}
			</div>
			<div className="flex items-center w-full flex-wrap gap-2 bg-white text-sm p-3">
				{tags.map((tag, index) => (
					<Chip key={tag} type={type} tag={tag} index={index} />
				))}
			</div>
		</div>
	);
}
