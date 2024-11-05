import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./Login/AuthContext";
import UserPage from "./components/User";
import ShowGoodDetail from "./good/ShowGoodDetail";

function App() {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/login") {
      if (auth.isLog) {
        navigate("/");
      } else {
        document.body.style.backgroundImage =
          "url(../images/pexels-pixabay-531880.jpg)";
      }
    } else {
      document.body.style.backgroundImage = "";
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!auth.isLog ? (
          <Route path="/login" element={<LoginPage />} />
        ) : (
          <Route path="/login" element={<Navigate to="/user" />} />
        )}
        {auth.isLog && (
          <>
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/good/:id" element={<ShowGoodDetail />} />
            <Route path="/user/information" element={<UserPage />} />
            <Route path="/user/dashboard" element={<UserPage />} />
            <Route path="/user/shopping" element={<UserPage />} />
            <Route path="/user/selling" element={<UserPage />} />
            <Route path="/user/cart" element={<UserPage />} />
          </>
        )}
      </Routes>
      {/* {auth.isLog ? (
          <Route path="*" element={<Navigate to="/user" />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )} */}
    </>
  );
}
export default App;
