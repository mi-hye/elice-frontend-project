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
	is_free: boolean;
	tags: Array<Tag>;
}

interface Map {
	[k: string]: 12 | 13 | 14 | 22 | 23;
}

const eliceApi = process.env.ELICE_API;

async function getData(offset = "0", filter_conditions: string) {
	const res = await fetch(
		`${eliceApi}/?filter_conditions=${filter_conditions}&sort_by=created_datetime.desc&offset=${offset}&count=12`
	);
	return res.json();
}

function getOptions(query: NextApiRequest["query"]) {
	const options = [];

	if (query.courseType) {
		const courseTypes = [...query.courseType];
		const courseType = {
			$or: [
				{
					$or: [
						{ course_type: 0 },
						...courseTypes.map((value) => ({
							course_type: Number(value) + 1,
						})),
					],
				},
			],
		};
		options.push(courseType);
	}

	if (query.format) {
		const formats = [...query.format];
		const format = {
			$or: formats.map((value) => ({
				course_type: Number(value) + 1,
			})),
		};
		options.push(format);
	}

	if (query.category) {
		const categoryMap: Map = {
			0: 12,
			1: 13,
			2: 14,
			3: 22,
			4: 23,
		};
		const categories = [...query.category];
		const category = {
			$or: categories.map((value) => ({
				tag_id: categoryMap[value],
			})),
		};
		options.push(category);
	}

	if (query.level) {
		const levelList = [...query.level];
		const level = {
			$or: levelList.map((value) => ({
				tag_id: 100 + Number(value),
			})),
		};
		options.push(level);
	}

	if (query.programmingLanguage) {
		const langList = [...query.programmingLanguage];
		const languageMap = [7, 8, 9, 10, 19, 20, 21, 24, 25, 26, 28, 29, 30];
		const language = {
			$or: langList.map((val) => ({ tag_id: languageMap[Number(val)] })),
		};
		options.push(language);
	}

	if (query.price) {
		const priceList = [...query.price];
		const enrollTypeMap = [0, 0, 4, 6];
		const price = {
			$or: priceList.map((value) => {
				if (value === "0" || value === "1") {
					return { enroll_type: enrollTypeMap[Number(value)], is_free: !Number(value) };
				} else return { enroll_type: enrollTypeMap[Number(value)] };
			}),
		};
		options.push(price);
	}
	return options;
}

function parseQuery(query: NextApiRequest["query"]) {
	const keyword = { title: `%${query.keyword ? query.keyword : ""}%` };
	const options = getOptions(query);

	const filter_conditions = {
		$and: [
			keyword,
			{ $or: [{ status: 2 }, { status: 3 }, { status: 4 }] },
			{ $or: [] },
			...options,
			{ is_datetime_enrollable: true },
		],
	};

	return { offset: query.offset, filter_conditions: JSON.stringify(filter_conditions) };
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
