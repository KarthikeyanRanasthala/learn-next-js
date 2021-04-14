const CustomApp = ({ Component, pageProps }) => (
    <>
        <style jsx global>
            {`
                a {
                    color: maroon;
                }
            `}
        </style>
        <Component {...pageProps} />
    </>
);

export default CustomApp;