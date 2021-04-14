const CoursesMainPage = (props) => {
    console.log(props);

    return (
    <>
        <h1>Courses</h1>
        <ol>
        {props.courses.map(course => <li key={course}>{course}</li>)}
        </ol>
    </>
)};

export const getStaticProps = async () => {
    return {
        props: {
            courses: ['Full Stack Web Development', 'Full Stack Android Development'],
        },
    }
}

export default CoursesMainPage;