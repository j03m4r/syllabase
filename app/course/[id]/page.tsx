import getCourseById from "@/actions/getCourseById";
import CoursePageContent from "./components/CoursePageContent";
import Container from "@/components/general/Container";

interface IParams {
    id: number;
};

const CoursePage = async ({ params }: { params: IParams }) => {
    const course = await getCourseById(params.id);
    return (
        <Container>
            <div className="py-28">
                <CoursePageContent course={course} />
            </div>
        </Container>
    );
};

export default CoursePage;