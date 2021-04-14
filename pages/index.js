import Link from 'next/link';
import { withRouter } from 'next/router';

import styles from '../src/styles/index.module.css';

const IndexPage = (props) => (
    <>
        <style jsx>
            {`
                .icecream-container {
                    width: 500px;
                    margin: 32px auto;
                }
                .icecream-container img {
                    width: 100%;
                }
            `}
        </style>
        <h1 className={styles.heading}>Index Page</h1>
        <div className={styles.linksContainer}>
            <Link href="/about">Goto About</Link>
            <button onClick={() => props.router.push('/courses')}>Goto Courses</button>
        </div>
        <div className="icecream-container">
            <img src="/icecream-by-pexels.jpeg" />
        </div>
    </>
);

export default withRouter(IndexPage);