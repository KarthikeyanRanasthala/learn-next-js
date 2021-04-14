import { useRouter } from 'next/router'

const AboutPage = () => {
    const router = useRouter();
    return (
    <>
        <h1>About Page</h1>
        <button onClick={() => router.push('/')}>Goto Home</button>
    </>
)};

export default AboutPage;