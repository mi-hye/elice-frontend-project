import type { NextApiRequest } from "next";

export default function getOptions(query: NextApiRequest["query"]) {
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
		const categoryMap = [12, 13, 14, 22, 23];
		const categories = [...query.category];
		const category = {
			$or: categories.map((value) => ({
				tag_id: categoryMap[Number(value)],
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
