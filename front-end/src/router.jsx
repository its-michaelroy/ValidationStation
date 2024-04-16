import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Error404Page from "./pages/Error404Page";
import HistoryPage from "./pages/HistoryPage";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import MainPage from "./pages/MainPage";
import PhoneHistoryPage from "./pages/PhoneHistoryPage";
import SignUp from "./pages/SignUp";
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
        path: "/history/",
        element: <HistoryPage />,
      },
      {
        path: "/PhoneHistory/",
        element: <PhoneHistoryPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404Page />,
  },
]);

export default router;
