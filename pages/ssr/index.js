import Link from 'next/link';

const Page = () => (
    <>
        <Link href="/ssr/getInitialProps-example">Goto /getInitialProps Page</Link>
        <br />
        <Link href="/ssr/getServerSideProps-example">Goto /getServerSideProp Page</Link>
    </>
);

export default Page;