import foto from "../assets/images/foto_2x2.jpg";

const ContratameContent: React.FC = () => {
    return (
        <main className="container ion-text-center ion-padding-top">
            <img src={foto} alt="" />
            <p><span className="bold">Nombre Completo: </span>Gabriel Peña</p>
            <p><span className="bold">Correo: </span>20209498@itla.edu.do</p>
            <p><span className="bold">Telefono: </span> <a target="_blank" href="https://wa.me/18296547841">829-654-7841</a></p>
            <p><span className="bold">Telegram: </span> <a target="_blank" href="https://t.me/gp400">Ir</a></p>
        </main>
    )
}

export default ContratameContent
