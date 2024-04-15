import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import { userConfirmation } from './utilities'

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        loader: userConfirmation,
        children:[
            {
                index:true,
                element:<HomePage/>,
            },
            {
                path:"/register/",
                element:<register/>
            },
            {
                path:"/login/",
                element: <LogIn/>
            }
        ]
    }
])

export default router;
