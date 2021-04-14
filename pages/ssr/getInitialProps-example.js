
const Page = (props) => (
    <>
       {props.data.map(ele => <p key={ele}>{ele}</p>)} 
    </>
);

Page.getInitialProps = async () => {
    return {
        data: ['a', 'b', 'c', 'd']
    }
}

export default Page;