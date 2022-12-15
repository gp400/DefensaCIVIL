import { Redirect, Route } from "react-router"
import { useAppSelector } from "./reduxHooks"

interface ContainerProps {
    component: any;
    path: any;
    exact: any;
  }

const ProtectedRoutes: React.FC<ContainerProps> = ({ ...rest }) => {

    const { datos } = useAppSelector((state) => state.login)

    const component = () => {
        return datos.token === "" ? <Redirect to="/inicioSesion"/> : <Route {...rest}></Route>;
    }

    return (
        component()
    )
}

export default ProtectedRoutes
