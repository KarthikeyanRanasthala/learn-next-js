import { withRouter } from "next/router";

const coursesMap = {
  "full-stack-web-development": "Full Stack Web Development",
  "full-stack-android-development": "Full Stack Android Development",
};

const FSDCoursePage = (props) => {
  console.log(props.router.query);

  return (
    <>
      <h1>{coursesMap[props.router.query.id] || "Unknown"} Course</h1>
    </>
  );
};

export const getStaticProps = async (context) => {
  return {
    props: {
      id: context.params.id,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "full-stack-web-development" },
      },
      {
        params: { id: "full-stack-android-development" },
      },
    ],
    fallback: false,
  };
};

export default withRouter(FSDCoursePage);
