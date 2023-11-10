import getUserCourses from "@/actions/getUserCourses";
import DashboardContent from "./components/DashboardContent";
import Container from "@/components/general/Container";

export default async function Dashboard() {
	const courses = await getUserCourses();
	return (
		<Container>
			<div className="py-28 h-full">
				<DashboardContent courses={courses} />
			</div>
		</Container>
	)
}
