const config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			screens: {
				xl: "1280px",
			},
		},
		extend: {
			colors: {
				base: "#f3f5f8",
				accent: "#524FA1",
				"rgb-gray": "rgb(201, 202, 204)",
			},
		},
	},
	plugins: [],
};
export default config;
