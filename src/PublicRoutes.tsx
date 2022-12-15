import { Redirect, Route } from "react-router"
import { useAppSelector } from "./reduxHooks"

interface ContainerProps {
    component: any;
    path: any;
    exact: any;
  }

const PublicRoutes: React.FC<ContainerProps> = ({ ...rest }) => {

    const { datos } = useAppSelector((state) => state.login)

    const component = () => {
        return datos.token !== "" ? <Redirect to="/user/noticias"/> : <Route {...rest}></Route>;
    }

    return (
        component()
    )
}

export default PublicRoutes
