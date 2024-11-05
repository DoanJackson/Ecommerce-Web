import { useDispatch } from "react-redux";
import FormLoginDefault from "./FormLoginDefault";
import LoginWithGoogle from "./LoginWithGoogle";
import { formActions } from "../store/change_form";
function LoginForm() {
  const dispatch = useDispatch();
  function changeRoute() {
    dispatch(formActions.changeForm());
  }

  return (
    <>
      <div className="label">LOGIN</div>
      <FormLoginDefault />
      <div className="d-flex justify-content-center mt-4">
        <label className="form-label mb-0">Or login with</label>
      </div>
      <LoginWithGoogle />
      <div className="d-flex justify-content-center mt-4">
        <label className="form-label mb-0 ">Don't have an account ? </label>
        <div className="form-label register" onClick={changeRoute}>
          Register
        </div>
      </div>
    </>
  );
}
export default LoginForm;
