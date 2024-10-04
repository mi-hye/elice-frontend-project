"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";
import useCustomSearchParams from "../hooks/useCustomSearchParams";

export default function SearchArea() {
	const [search, setSearch] = useState("");
	const debouncedValue = useDebounce<string>(search, 300);
	const { newParams, setSearchParams } = useCustomSearchParams();

	const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	}, []);

	useEffect(() => {
		if (debouncedValue) {
			setSearchParams("keyword", debouncedValue, true);
		}
	}, [debouncedValue]);

	useEffect(() => {
		const keywordValue = newParams.get("keyword");
		if (keywordValue) setSearch(keywordValue);
	}, []);

	return (
		<div
			tabIndex={0}
			className="layout-center flex-row-reverse my-3 bg-white border border-rgb-gray rounded focus-within:border-accent"
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
