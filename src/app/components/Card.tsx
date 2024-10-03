interface Course {
	id: number;
	title: string;
	imgUrl: string | null;
	logoUrl: string;
	classType: number;
	description: string;
	enrollType: number;
	isFree: boolean;
}

const classType = ["프로그래밍 기초"];

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
						{classType[course.classType]}
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
