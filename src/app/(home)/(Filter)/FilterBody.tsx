"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon as Spinner } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Card from "./(FilterBody)/Card";
import PageNavigation from "./(FilterBody)/PageNavigation";
import { fetchCourses, type Course, type Res } from "@/app/helper/fetchCourses";
import useCustomSearchParams from "@/app/hooks/useCustomSearchParams";

const OFFSET_COUNT = 12;

export default function FilterBody() {
	const [page, setPage] = useState(1);
	const [data, setData] = useState<Res | undefined>();
	const { searchParams } = useCustomSearchParams();

	useEffect(() => {
		(async () => {
			const fetchedData = await fetchCourses((page - 1) * OFFSET_COUNT, searchParams.toString());
			setData(fetchedData);
		})();
	}, [page, searchParams]);

	if (!data)
		return (
			<div className="w-full h-[500px] layout-center">
				<Spinner icon={faSpinner} spin size="2x" />
				<span className="m-5 text-lg font-extrabold">Loading...</span>
			</div>
		);

	const { courseCount, courses } = data;
	return (
		<>
			<div className="w-full my-1 h-full">
				<div className="w-full py-3 border-b-2 border-gray-300 text-black font-bold text-xs">
					전체 {courseCount}개
				</div>
			</div>
			<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{courses.map((course: Course) => (
					<Card key={course.id} course={course} />
				))}
			</div>
			<div>
				<PageNavigation courseCount={courseCount} page={page} setPage={setPage} />
			</div>
		</>
	);
}
