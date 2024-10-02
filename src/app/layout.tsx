import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "엘리스 미니 프로젝트",
	description: "프론트엔드 미니 프로젝트",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
