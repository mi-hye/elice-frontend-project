interface Res {
	courseCount: number;
	courses: Array<Course>;
}

interface Course {
	id: number;
	title: string;
	imgUrl: string | null;
	logoUrl: string;
	description: string;
	enrollType: number;
	isFree: boolean;
	tags: Array<Tag>;
}

interface Tag {
	id: number;
	tag_type: number;
	name: string;
}

const apiURL = process.env.NEXT_PUBLIC_API_URL;
type FetchCourse = () => Promise<Res>;

const fetchCourses: FetchCourse = async () => {
	const res = await fetch(`${apiURL}/api/course`);
	return res.json();
};

export { fetchCourses };
export type { Course,Tag };
