import { useDispatch } from "react-redux";
import FormRegisterDefault from "./FormRegisterDefault";
import { formActions } from "../store/change_form";

function RegisterForm() {
  const dispatch = useDispatch();
  function changeRoute() {
    dispatch(formActions.changeForm());
  }

  return (
    <>
      <div className="label">REGISTER</div>
      <FormRegisterDefault />
      <div className="d-flex justify-content-center mt-4">
        <label className="form-label mb-0 ">Already have an account ? </label>
        <div className="form-label register" onClick={changeRoute}>
          Login
        </div>
      </div>
    </>
  );
}
export default RegisterForm;
