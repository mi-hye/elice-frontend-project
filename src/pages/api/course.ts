import type { NextApiRequest, NextApiResponse } from "next";

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
		`https://api-rest.elice.io/org/academy/course/list/?filter_conditions=${filter_conditions}&sort_by=created_datetime.desc&offset=0&count=12`
	);
	return res.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const data: unknown = await getData();
	res.status(200).json(data);
}
