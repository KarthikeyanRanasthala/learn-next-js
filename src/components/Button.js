const Button = (props) => (
    <>
        <style jsx>
            {`
                .button {
                    padding: 6px 8px;
                    background: black;
                    color: white;
                    border-radius: 4px;
                    border: none;
                }
                .button:hover {
                    transform: translateY(-1px);
                    cursor: pointer;
                }
            `}
        </style>
        <button
            onClick={props.onClick}
            className="button"
        >
            {props.children}
        </button>
    </>
);

export default Button;