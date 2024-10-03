interface Res {
	courseCount: number;
	courses: Array<Course>;
}

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
type FetchCourse = () => Promise<Res>;

const fetchCourses: FetchCourse = async () => {
	const res = await fetch(`${apiURL}/api/course`);
	return res.json();
};

export { fetchCourses };
export type { Course };
