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
type FetchCourse = (offset: number) => Promise<Res>;

const fetchCourses: FetchCourse = async (offset: number) => {
	const res = await fetch(`${apiURL}/api/course?offset=${offset}`);
	return res.json();
};

export { fetchCourses };
export type { Course, Tag, Res };
