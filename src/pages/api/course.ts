import type { NextApiRequest, NextApiResponse } from "next";

interface Tag {
	id: number;
	tag_type: number;
	name: string;
}
interface CourseRes {
	id: number;
	enroll_type: 0 | 4;
	title: string;
	short_description: string;
	logo_file_url: string;
	image_file_url: string;
	leaderboard_info: [Object];
	is_free: boolean;
	tags: Array<Tag>;
}

const eliceApi = process.env.ELICE_API;

const filter_conditions = JSON.stringify(
	// 	{
	// 	$and: [
	// 		{ title: "%%" },
	// 		{ $or: [{ status: 2 }, { status: 3 }, { status: 4 }] },
	// 		{ $or: [] },
	// 		{ $or: [{ tag_id: 7 }] },
	// 		{ $or: [{ tag_id: 100 }] },
	// 		{ $or: [{ course_type: 0 }] },
	// 		{ is_datetime_enrollable: true },
	// 	],
	// }
	//과목만 선택  179개
	{
		$and: [
			{ title: "%%" },
			{ $or: [{ status: 2 }, { status: 3 }, { status: 4 }] },
			{ $or: [] },
			{ $or: [{ $or: [{ course_type: 0 }, { course_type: 2 }] }] },
			{ is_datetime_enrollable: true },
		],
	}

	//과목, 프밍기초, 초급 페이징2 17개
	// {
	// 	$and: [
	// 		{ title: "%%" },
	// 		{ $or: [{ tag_id: 12 }] },
	// 		{ $or: [{ status: 2 }, { status: 3 }, { status: 4 }] },
	// 		{ $or: [] },
	// 		{ $or: [{ tag_id: 101 }] },
	// 		{ $or: [{ $or: [{ course_type: 0 }, { course_type: 2 }] }] },
	// 		{ is_datetime_enrollable: true },
	// 	],
	// }
);

async function getData(offset = "0") {
	const res = await fetch(
		`${eliceApi}/?filter_conditions=${filter_conditions}&sort_by=created_datetime.desc&offset=${offset}&count=12`
	);
	return res.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const data = await getData(req.query.offset as string);

	const parsedData = data.courses.map((course: CourseRes) => ({
		id: course.id,
		title: course.title,
		imgUrl: course.image_file_url,
		logoUrl: course.logo_file_url,
		description: course.short_description,
		enrollType: course.enroll_type,
		isFree: course.is_free,
		tags: course.tags,
	}));

	const resData = {
		courseCount: data.course_count,
		courses: parsedData,
	};
	res.status(200).json(resData);
}
