"use client";
import { useState, useEffect } from "react";
import useCustomSearchParams from "../hooks/useCustomSearchParams";

type Props = {
	type: keyof QueryMap;
	tag: string;
	index: number;
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

function Chip({ type, tag, index }: Props) {
	const { newParams, setSearchParams } = useCustomSearchParams();
	const [isSelected, setIsSelected] = useState(false);
	const handleSelected = () => {
		setIsSelected(!isSelected);
	};

	useEffect(() => {
		setSearchParams(`${queryMap[type]}`, index.toString(), isSelected);
	}, [isSelected, newParams.size]);

	useEffect(() => {
		if (newParams.size) {
			const paramsList = [...newParams.entries()];

			paramsList.forEach(([k, v]) => {
				const findedItem = Object.entries(queryMap).find(([_, query]) => query === k) || [];
				if (findedItem[0] === type && v === index.toString()) setIsSelected(true);
			});
		}
	}, []);

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
