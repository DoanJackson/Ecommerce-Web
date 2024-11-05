import NavBar from "../Navbar/NavBar";
import { lazy, Suspense, useEffect } from "react";
import reducerManager from "../store/combine_slice";
import formSlice from "../store/change_form";
import store from "../store/store";
import { LoadingUI } from "../Loading/LoadingComponent";
const LoginRegister = lazy(() => import("../Login-Register/Login-Register"));

function LoginPage() {
  useEffect(() => {
    if (!reducerManager.has("formChange")) {
      reducerManager.add("formChange", formSlice.reducer);
      store.replaceReducer(reducerManager.combined);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Suspense fallback={<LoadingUI />}>
        <LoginRegister />
      </Suspense>
    </>
  );
}
export default LoginPage;
