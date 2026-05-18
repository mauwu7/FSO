const Notification = ({message}) => {

    if(message[0]!=null){
        const styleNotification = {
            textAlign: 'center',
            border: `2px solid ${(message[0]) ? `red`: `green`}`,
            padding: '10px',
            color: `${(message[0]) ? `red`: `green`}`,
            fontSize:'20px',
            fontWeight: 'bold'
        }
        console.log(message[1])
        return(
            <p style={styleNotification}>
                {message[1]}
            </p>
        )
    }
}


export default Notification