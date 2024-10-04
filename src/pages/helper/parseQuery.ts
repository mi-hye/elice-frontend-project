import type { NextApiRequest } from "next";
import getOptions from "./getFilterOptions";

export default function parseQuery(query: NextApiRequest["query"]) {
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
