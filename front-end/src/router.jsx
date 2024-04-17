import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BlacklistPage from "./pages/BlacklistPage";
import EmailHistory from "./pages/EmailHistoryPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import MainPage from "./pages/MainPage";
import PhoneHistoryPage from "./pages/PhoneHistoryPage";
import SignUp from "./pages/SignUp";
import WhitelistPage from "./pages/WhitelistPage";
import { userConfirmation } from "./utilities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register/",
        element: <SignUp />,
      },
      {
        path: "/login/",
        element: <LogIn />,
      },
      {
        path: "/main/",
        element: <MainPage />,
      },
      {
        path: "/emailhistory/",
        element: <EmailHistory />,
      },
      {
        path: "/phoneHistory/",
        element: <PhoneHistoryPage />,
      },
      {
        path: "/blacklist/",
        element: <BlacklistPage />,
      },
      {
        path: "/whitelist/",
        element: <WhitelistPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404Page />,
  },
]);

export default router;
