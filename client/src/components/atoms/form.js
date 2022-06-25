const Input = ({type, name, id, val, placeholder, func, label, text}) => {
    if(label){
        return (
            <>
                <label htmlFor={id}>
                    <span>{text}</span>
                    <input type={type} name={name} id={id} placeholder={placeholder}/>
                </label>
            </>
        )
    }
}
