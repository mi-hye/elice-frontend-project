function Chip({ tag }: { tag: string }) {
	return (
		<div className="rounded-full bg-[#e6e8ea] py-1 px-3 cursor-pointer transition opacity-80 hover:opacity-100 whitespace-nowrap">
			{tag}
		</div>
	);
}
export default Chip;
