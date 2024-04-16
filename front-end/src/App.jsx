import { useEffect, useState } from 'react'
// import reactLogo from './assets/wizard.ico'
// import viteLogo from '/vite.svg'
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import './index.css'
import MainPage from './pages/MainPage'
import { api } from './utilities'

function App() {
  const [user, setUser] = useState(useLoaderData())
  const navigate = useNavigate()
  const location = useLocation()

  // const testConnection = async() => {
  //   const response = await api.get("test/")
  //   console.log(response)
  // }

  // useEffect(() => {
  //   testConnection()
  // }, [])

  useEffect(() => {
    let nullUserUrls = ["/login/", "/register/"] // should redirect to homepage if logged in

    // check if current url is one that might need to redirect
    let isAllowed = nullUserUrls.includes(location.pathname)
    console.log('isallowed ', isAllowed)

    // redirect to homepage when
    // logged user tries to go to signup, etc
    if(user && isAllowed) {
      console.log('redirect to homepage')
      navigate("/")
    }

    // not logged in user tries to go anywhere BUT signup or login
    // we redirect because the user needs to log in before they do anything else
    else if (!user && !isAllowed){
      navigate("/")
    }

    console.log('user updated', user);
  }, [user, location.pathname])

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Outlet context={{user, setUser}} />
    </>
  )
}

export default App












// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import {Outlet} from 'react-router-dom'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
