import { useRouter } from 'next/router'
import Button from '../src/components/Button';

const AboutPage = () => {
    const router = useRouter();
    return (
    <>
        <style jsx>
            {`
                .about-page-container :global(.button) {
                    background: red;
                    color: white;
                }
            `}
        </style>
        <div className="about-page-container">
            <h1>About Page</h1>
            <Button onClick={() => router.push('/')}>Goto Home</Button>
        </div>
    </>
)};

export default AboutPage;