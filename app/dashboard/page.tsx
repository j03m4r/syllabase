import getUserCourses from "@/actions/getUserCourses";
import DashboardContent from "./components/DashboardContent";
import Container from "@/components/general/Container";

export default async function Dashboard() {
	const courses = await getUserCourses();
	return (
		<Container>
			<DashboardContent courses={courses} />
		</Container>
	)
}
