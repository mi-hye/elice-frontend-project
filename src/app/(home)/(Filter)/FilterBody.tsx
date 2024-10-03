import Card from "@/app/components/Card";
import PageNavigation from "./PageNavigation";
import { fetchCourses, type Course } from "@/app/helper/fetchCourses";

export default async function FilterBody() {
	const { courseCount, courses } = await fetchCourses();

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
				<PageNavigation courseCount={courseCount} />
			</div>
		</>
	);
}
