import Card from "@/app/components/Card";

interface Course {
	id: number;
	title: string;
	imgUrl: string;
	logoUrl: string;
	classType: number;
	description: string;
	enrollType: number;
	isFree: boolean;
}

const apiURL = process.env.NEXT_PUBLIC_API_URL;

async function getCourses() {
	const res = await fetch(`${apiURL}/api/course`);
	return res.json();
}
export default async function FilterBody() {
	const { courseCount, courses } = await getCourses();

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
		</>
	);
}
