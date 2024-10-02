"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchArea() {
	const [search, setSearch] = useState("");
	const debouncedValue = useDebounce<string>(search, 5000);

	const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	useEffect(() => {
		if (debouncedValue) {
			console.log("검색 단어:", debouncedValue); // TODO 차후 API 추가 예정
		}
	}, [debouncedValue]);

	return (
		<div
			tabIndex={0}
			className="layout-center flex-row-reverse m-3 relative z-10 group bg-white border border-rgb-gray rounded focus-within:border-accent"
		>
			<input
				type="text"
				className="flex-grow placeholder-gray-400 focus:outline-none py-3 peer "
				placeholder="배우고 싶은 언어, 기술을 검색해 보세요"
				value={search}
				onChange={handleInputChange}
			></input>
			<div className="h-full m-4 text-black peer-focus:text-accent">
				<FontAwesomeIcon icon={faSearch} className="size-5 text-xs" />
			</div>
		</div>
	);
}
