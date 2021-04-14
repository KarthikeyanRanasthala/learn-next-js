import Link from 'next/link';
import { withRouter } from 'next/router';

import styles from '../src/styles/index.module.css';

const IndexPage = (props) => (
    <>
        <h1 className={styles.heading}>Index Page</h1>
        <div className={styles.linksContainer}>
            <Link href="/about">Goto About</Link>
            <button onClick={() => props.router.push('/courses')}>Goto Courses</button>
        </div>
    </>
);

export default withRouter(IndexPage);