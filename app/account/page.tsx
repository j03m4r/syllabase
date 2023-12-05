import getUserCourses from "@/actions/getUserCourses";
import Container from "@/components/general/Container";
import AccountContent from "./components/AccountContent";

export default async function Dashboard() {
	const courses = await getUserCourses();
	return (
		<Container>
			<div className="py-28 w-full h-full">
				<AccountContent courses={courses} />
			</div>
		</Container>
	)
}
