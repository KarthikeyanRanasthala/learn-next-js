import Link from 'next/link';
import { withRouter } from 'next/router';

const IndexPage = (props) => (
    <>
        <h1>Index Page</h1>
        <Link href="/about">Goto About</Link>
        <button style={{ marginLeft: '10px' }} onClick={() => props.router.push('/courses')}>Goto Courses</button>
    </>
);

export default withRouter(IndexPage);