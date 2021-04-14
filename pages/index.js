import Link from 'next/link';
import { withRouter } from 'next/router';
import Image from 'next/image';

import styles from '../src/styles/index.module.css';

const IndexPage = (props) => (
    <>
        <style jsx>
            {`
                .icecream-container {
                    width: 500px;
                    margin: 32px auto;
                }
            `}
        </style>
        <h1 className={styles.heading}>Index Page</h1>
        <div className={styles.linksContainer}>
            <Link href="/about">Goto About</Link>
            <button onClick={() => props.router.push('/courses')}>Goto Courses</button>
        </div>
        <div className="icecream-container">
            <Image src="/icecream-by-pexels.jpeg" width={500} height={750} />
        </div>
    </>
);

export default withRouter(IndexPage);