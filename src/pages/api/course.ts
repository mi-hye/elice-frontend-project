import type { NextApiRequest, NextApiResponse } from "next";
import parseQuery from "../helper/parseQuery";

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
	is_free: boolean;
	tags: Array<Tag>;
}

const eliceApi = process.env.ELICE_API;

async function getData(offset = "0", filter_conditions: string) {
	const res = await fetch(
		`${eliceApi}/?filter_conditions=${filter_conditions}&sort_by=created_datetime.desc&offset=${offset}&count=12`
	);
	return res.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { offset, filter_conditions } = parseQuery(req.query);
		const data = await getData(offset as string, filter_conditions);

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
	} catch (error) {
		res.status(500).json({ msg: `서버 문제 발생 ${error}` });
	}
}
