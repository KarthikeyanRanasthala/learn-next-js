
const Page = (props) => (
    <>
       {props.data.map(ele => <p key={ele}>{ele}</p>)} 
    </>
);

export const getServerSideProps = async () => {
    return {
        props: {
            data: ['a', 'b', 'c', 'd']
        }
    }
}

export default Page;