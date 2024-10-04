import { useRouter, useSearchParams } from "next/navigation";

const useCustomSearchParams = () => {
	const router = useRouter();
	const searchParams = useSearchParams()!;
	const newParams = new URLSearchParams(searchParams);

	const setSearchParams = (key: string, value: string, flag: boolean) => {
		const paramsList = [...newParams.entries()];

		if (key === "keyword") {
			newParams.set(key, value);
			router.push(`/?${newParams.toString()}`);
			return;
		}

		if (flag) {
			const exist = paramsList.find(([k, v]) => k === key && v === value);
			if (!exist) {
				newParams.append(key, value);
				router.push(`/?${newParams.toString()}`);
			}
			return;
		}

		const deletedParams = paramsList.filter(([k, v]) => !(k === key && value === v));
		router.push(`/?${new URLSearchParams(deletedParams).toString()}`);
	};

	return { newParams, setSearchParams };
};

export default useCustomSearchParams;
