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
type FetchCourse = (offset: number, searchParams: string) => Promise<Res>;

const fetchCourses: FetchCourse = async (offset, searchParams) => {
	try {
		const res = await fetch(
			`${apiURL}/api/course?offset=${offset}${searchParams ? `&${searchParams}` : ""}`
		);
		if (!res.ok) throw new Error(`${(await res.json()).msg}`);
		return await res.json();
	} catch (error) {
		console.error(error);
	}
};

export { fetchCourses };
export type { Course, Tag, Res };
