import ErrorMessage from "../errorMessage/ErrorMessage"
import { lazy, Suspense} from "react" 
import { Link } from "react-router-dom"

const Page404 = () => {
    return (
        <div>
            <ErrorMessage></ErrorMessage>
            <p style={{'textAlign': 'center', 'fontSize': '24px'}}>Страница не существует</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontSize': '24px', 'marginTop': '20px', 'fontWeight': 'bold'}} to='/'>Вернуться на главную</Link>
        </div>
    )
}

export default Page404;