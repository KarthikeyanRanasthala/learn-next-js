import { withRouter } from "next/router";

const coursesMap = {
    'full-stack-web-development': 'Full Stack Web Development',
    'full-stack-android-development': 'Full Stack Android Development',
}

const FSDCoursePage = (props) => {
    console.log(props.router.query);

    if (typeof window === 'undefined') {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>{coursesMap[props.router.query.id] || 'Unknown'} Course</h1>
        </>
    )
};

export default withRouter(FSDCoursePage);