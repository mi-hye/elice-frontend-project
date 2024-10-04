import { type Course, type Tag } from "../helper/fetchCourses";

type TageMap = {
	[k: string]: string;
};

const tagMap: TageMap = {
	12: "프로그래밍 기초",
	13: "데이터 분석",
	14: "웹",
	22: "인공지능",
	23: "알고리즘",
};

export default function Card({ course }: { course: Course }) {
	return (
		<div className="h-[338px] rounded-lg bg-white mt-4 flex flex-col">
			{course.imgUrl ? (
				<img className="rounded-t-lg h-[146px]" src={course.imgUrl} alt={course.title}></img>
			) : (
				<div className="rounded-t-lg w-full h-[146px] bg-[#3A3A4C] layout-center">
					<img className="h-[80%]" src={course.logoUrl} alt={course.title} />
				</div>
			)}
			<div className="py-[18px] px-[18px] flex flex-col flex-1 justify-between">
				<div>
					<label className="text-[#524fa1] text-xs font-bold leading-[1.6]">
						{course.tags.length
							? course.tags.map((tag: Tag) => {
									if (course.tags.find((tag) => tag.tag_type === 3)) {
										if (tag.tag_type === 3) {
											return tagMap[tag.id];
										}
									}
									return "";
							  })
							: "미분류"}
					</label>
					<div className="text-black text-[16px] font-bold line-clamp-2 my-1">{course.title}</div>
					<div className="w-full text-[14px] font-bold line-clamp-2 leading-[1.6]">
						{course.description}
					</div>
				</div>
				<div className="border-t text-[#00ab53] font-bold pt-2">
					{course.enrollType === 4 ? "구독" : course.isFree ? "무료" : "유료"}
				</div>
			</div>
		</div>
	);
}
