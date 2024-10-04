import FilterBody from "./(Filter)/FilterBody";
import FilterList from "./(Filter)/FilterList";

export type FilterType = "유형" | "진행 방식" | "분야" | "난이도" | "언어" | "가격";

export default async function Filter() {
	return (
		<div>
			<div>
				{FILTER_DATA.map((row) => (
					<FilterList key={row.type} type={row.type as FilterType} tags={row.tags} />
				))}
			</div>
				<FilterBody />
		</div>
	);
}

const FILTER_DATA = [
	{
		type: "유형",
		tags: ["과목", "챌린지", "테스트"],
	},
	{
		type: "진행 방식",
		tags: ["자유 선택형", "순차 완료형"],
	},
	{
		type: "분야",
		tags: ["프로그래밍 기초", "데이터 분석", "웹", "인공지능", "알고리즘"],
	},
	{
		type: "난이도",
		tags: ["입문", "초급", "중급", "고급", "심화"],
	},
	{
		type: "언어",
		tags: [
			"C",
			"C++",
			"자바",
			"파이썬",
			"자바스크립트",
			"R",
			"HTML/CSS",
			"SQL",
			"아두이노",
			"스크래치",
			"코틀린",
			"스위프트",
			"엔트리",
		],
	},
	{
		type: "가격",
		tags: ["무료", "유료", "구독", "학점"],
	},
];
