// src/pages/api/hello.ts
import type { NextApiRequest, NextApiResponse } from "next";

// async function getData() {
	// const res = await fetch("https://api-rest.elice.io/org/academy/course/list/?offset=0&count=1");
	// return res.json();
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const data: unknown = await getData();
	// console.log("응답~~", data);
	res.status(200).json({ message: "Hello from API Route!" });
}
