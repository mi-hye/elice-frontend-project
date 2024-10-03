"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

type Props = {
	type: keyof QueryMap;
	tag: string;
	index: number;
	paramsRef: React.RefObject<URLSearchParams>;
};
type QueryMap = typeof queryMap;

const selectedStyle = "bg-accent text-white";
const queryMap = {
	유형: "courseType",
	"진행 방식": "format",
	분야: "category",
	난이도: "level",
	언어: "programmingLanguage",
	가격: "price",
};

function Chip({ type, tag, index, paramsRef }: Props) {
	const [isSelected, setIsSelected] = useState(false);
	// const router = useRouter();

	// const searchParams = useSearchParams();
	// console.log("searchParams: ", newSearchParams);

	const handleSelected = () => {
		setIsSelected(!isSelected);
	};

	useEffect(() => {
		if (isSelected) {
			paramsRef.current?.append(`${queryMap[type]}`, index.toString());
			console.log("newSearchParams: ", paramsRef.current);
		}
	}, [isSelected]);

	return (
		<div
			className={`rounded-full bg-[#e6e8ea] py-1 px-3 cursor-pointer transition-all opacity-80 hover:opacity-100 whitespace-nowrap ${
				isSelected ? selectedStyle : ""
			}`}
			onClick={handleSelected}
		>
			{tag}
		</div>
	);
}
export default Chip;
