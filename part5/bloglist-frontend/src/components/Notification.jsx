const Notification = ({message}) => {

    const styleNotification = {
      textAlign: 'center',
      border: `2px solid red`,
      padding: '10px',
      color: 'red',
      fontSize:'20px',
      fontWeight: 'bold'
    }

    return (
        <>
            {message != null && <p style={styleNotification}>Error al iniciar sesion!</p>}
        </>
    )
}

export default Notification