import { Metadata } from "next/types";

export const metadata: Metadata = {
	title: "Not found",
};

function NotFound() {
	return <h1>not found</h1>;
}

export default NotFound;
