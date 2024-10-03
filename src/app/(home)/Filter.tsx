import FilterBody from "./(Filter)/FilterBody";
import FilterList from "./(Filter)/FilterList";

export default async function Filter() {
	return (
		<div>
			<FilterList />
			<FilterBody />
		</div>
	);
}
