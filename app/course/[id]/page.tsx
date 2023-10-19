import getCourseById from "@/actions/getCourseById";

interface IParams {
    id: number;
};

const CoursePage = async ({ params }: { params: IParams }) => {
    const course = await getCourseById(params.id);
    return (
        <div>{course.full_class_title}</div>
    );
};

export default CoursePage;