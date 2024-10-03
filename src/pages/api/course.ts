import type { NextApiRequest, NextApiResponse } from "next";

interface CourseRes {
	id: number;
	enroll_type: 0 | 4;
	title: string;
	short_description: string;
	class_type: 0 | 4;
	logo_file_url: string;
	image_file_url: string;
	leaderboard_info: [Object];
	is_free: boolean;
}

const eliceApi = process.env.ELICE_API;

const filter_conditions = JSON.stringify({
	$and: [
		{ title: "%%" },
		{ $or: [{ status: 2 }, { status: 3 }, { status: 4 }] },
		{ $or: [] },
		{ $or: [{ tag_id: 7 }] },
		{ $or: [{ tag_id: 100 }] },
		{ $or: [{ course_type: 0 }] },
		{ is_datetime_enrollable: true },
	],
});

async function getData() {
	const res = await fetch(
		`${eliceApi}/?filter_conditions=${filter_conditions}&sort_by=created_datetime.desc&offset=0&count=12`
	);
	return res.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const data = await getData();
	const parsedData = data.courses.map((course: CourseRes) => ({
		id: course.id,
		title: course.title,
		imgUrl: course.image_file_url,
		logoUrl: course.logo_file_url,
		classType: course.class_type,
		description: course.short_description,
		enrollType: course.enroll_type,
		isFree: course.is_free,
	}));

	const resData = {
		courseCount: data.course_count,
		courses: parsedData,
	};
	res.status(200).json(resData);
}
